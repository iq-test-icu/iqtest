#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# IQ-Test deploy + verification driver
#
# Runs the pass/fail gates from DEPLOY-VERIFICATION.md that can be automated.
# Dependency-free: needs only git, curl and node (all already on this machine).
# No secrets are read, written, or embedded anywhere in this script.
#
# Usage (Git Bash, from the repo root):
#     bash deploy-verify.sh            # full run: preflight -> push -> verify
#     bash deploy-verify.sh --verify   # skip the push, just re-run verification
#
# Gates that CANNOT be automated and are prompted for instead:
#   Gate 1  database migration      (Supabase SQL Editor)
#   Gate 5  paid path smoke test    ($1.99 purchase with a real card)
#   Gate 6  Stripe wallet check     (Dashboard toggles + a real phone)
# ---------------------------------------------------------------------------
set -uo pipefail

SITE="https://iq-test.icu"
PASS=0; FAIL=0; SKIP=0

c_g() { printf '\033[32m%s\033[0m' "$1"; }
c_r() { printf '\033[31m%s\033[0m' "$1"; }
c_y() { printf '\033[33m%s\033[0m' "$1"; }
hdr() { printf '\n\033[1m── %s ─────────────────────────────────\033[0m\n' "$1"; }

ok()   { printf '  [%s] %s\n' "$(c_g PASS)" "$1"; PASS=$((PASS+1)); }
bad()  { printf '  [%s] %s\n' "$(c_r FAIL)" "$1"; printf '         ↳ %s\n' "$2"; FAIL=$((FAIL+1)); }
skip() { printf '  [%s] %s\n' "$(c_y SKIP)" "$1"; SKIP=$((SKIP+1)); }

ask() {  # ask "question" -> returns 0 for yes
  local reply
  read -r -p "  $1 [y/N] " reply </dev/tty
  [[ "$reply" =~ ^[Yy]$ ]]
}

cd "$(dirname "$0")" || exit 1

# ── Gate 0: pre-flight ──────────────────────────────────────────────────────
hdr "Gate 0 — Pre-flight"

if [ -z "$(git status --porcelain)" ]; then
  ok "working tree clean"
else
  bad "working tree is dirty" "commit or stash before deploying: git status"
fi

RECENT_LOG=$(git log --oneline -20)
if [[ "$RECENT_LOG" == *"recovery sweep"* ]]; then
  ok "recovery sweep commit present ($(git log --oneline -1 --format=%h))"
else
  bad "recovery sweep commit not found in the last 20 commits" "are you on the right branch? current: $(git branch --show-current)"
fi

# Worker tests — worker/ has no package.json, so run them in a temp ESM dir.
T=$(mktemp -d) && mkdir -p "$T/test"
cp worker/worker.js "$T/" 2>/dev/null
cp worker/test/worker.test.js "$T/test/" 2>/dev/null
echo '{"type":"module"}' > "$T/package.json"
TEST_OUT=$( cd "$T" && node test/worker.test.js 2>&1 )
TEST_N=$(printf '%s\n' "$TEST_OUT" | grep -c '^✓' || true)
if [[ "$TEST_OUT" == *"All tests passed cleanly"* ]]; then
  ok "worker tests: $TEST_N/$TEST_N passing"
else
  bad "worker tests failing" "$(printf '%s' "$TEST_OUT" | tail -3)"
fi
rm -rf "$T"

if [ "$FAIL" -gt 0 ]; then
  printf '\n%s Pre-flight failed. Fix the above before deploying.\n' "$(c_r '✗')"
  exit 1
fi

# ── Gate 1: migration (manual, but gated) ───────────────────────────────────
if [ "${1:-}" != "--verify" ]; then
  hdr "Gate 1 — Database migration"
  cat <<'EOF'
  The Worker queries sessions.recovery_sent, which does not exist yet.
  Run the migration BEFORE pushing.

    1. Supabase -> SQL Editor -> New query
    2. Paste the entire contents of supabase/schema.sql, Run
       (every statement is "if not exists" — safe to re-run)
    3. Then run these three verification queries:

  -- 1.1 column exists
  select column_name, data_type, column_default, is_nullable
  from information_schema.columns
  where table_name='sessions' and column_name='recovery_sent';

  -- 1.2 partial index exists
  select indexname, indexdef from pg_indexes
  where tablename='sessions' and indexname='sessions_recovery_sweep_idx';

  -- 1.3 how many emails your FIRST live sweep will send — write this down
  select count(*) from sessions
  where paid=false and recovery_sent=false and marketing_opt_in=true
    and created_at < now() - interval '48 hours';

EOF
  if ask "Migration applied and all three queries returned as expected?"; then
    ok "Gate 1 confirmed by operator"
  else
    printf '\n%s Stopping. Run the migration first — pushing before it just logs a false alarm.\n' "$(c_y '‖')"
    exit 1
  fi

  # ── Gate 3: deploy ────────────────────────────────────────────────────────
  hdr "Gate 3 — Deploy"
  echo "  NOTE: 'git push origin main' IS the deploy — .github/workflows/deploy.yml"
  echo "        ships both the Worker and Pages. Do not also run 'wrangler deploy'."
  echo
  if ask "Push to origin/main now and trigger the production deploy?"; then
    if git push origin main; then
      ok "pushed to origin/main"
    else
      bad "push failed" "check your remote and credentials, then re-run"
      exit 1
    fi
    echo
    echo "  Watch the run: https://github.com/apexbusiness-systems/apex-iqtest/actions"
    echo "  Both jobs must go green: 'Deploy Worker' AND 'Deploy Pages'."
    echo
    read -r -p "  Press Enter once BOTH jobs are green to run production verification... " _ </dev/tty
  else
    skip "push declined — running verification against whatever is currently live"
  fi
fi

# ── Gate 4: production smoke ────────────────────────────────────────────────
hdr "Gate 4 — Production smoke"

code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$SITE/api/unsubscribe?id=not-a-uuid")
if [ "$code" = "200" ]; then
  ok "/api/unsubscribe live, invalid id returns the friendly page (200)"
else
  bad "/api/unsubscribe returned $code, expected 200" "worker deploy likely did not ship — check the Actions log"
fi

body=$(curl -s --max-time 15 "$SITE/api/report?id=not-a-uuid")
if [[ "$body" == *"invalid_id"* ]]; then
  ok "/api/report unchanged, still returns invalid_id (no regression)"
else
  bad "/api/report did not return invalid_id" "got: $body"
fi

n=$(curl -s --max-time 15 "$SITE/" | grep -c 'one-click unsubscribe' || true)
if [ "$n" = "2" ]; then
  ok "FAQ copy fix live in both the visible FAQ and the <noscript> mirror"
elif [ "$n" = "0" ]; then
  bad "FAQ copy fix not live" "Pages deploy did not ship, or CDN cache is stale — purge and retry"
else
  bad "FAQ copy found $n times, expected 2" "the visible FAQ and noscript mirror have drifted apart"
fi

hdr "Manual gates still outstanding"
echo "  Gate 2  local end-to-end sweep   see DEPLOY-VERIFICATION.md §Gate 2"
echo "  Gate 5  \$1.99 paid smoke test    the postResend fix touched the paid path — do not skip"
echo "  Gate 6  Stripe wallet check      Settings -> Payment methods, verify on a real phone"
echo "  Gate 7  first live sweep         wrangler tail at 15:00 UTC tomorrow"

# ── Summary ────────────────────────────────────────────────────────────────
printf '\n\033[1m── Result ─────────────────────────────────\033[0m\n'
printf '  %s passed   %s failed   %s skipped\n\n' "$(c_g "$PASS")" "$(c_r "$FAIL")" "$(c_y "$SKIP")"

if [ "$FAIL" -gt 0 ]; then
  printf '%s Deployment NOT verified. See the failures above.\n' "$(c_r '✗')"
  printf '  Rollback: Cloudflare -> Workers -> Deployments -> Rollback (instant)\n\n'
  exit 1
fi

printf '%s Automated gates green. Finish the manual gates before calling this shipped.\n\n' "$(c_g '✓')"
