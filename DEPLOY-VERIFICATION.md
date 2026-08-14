# Deploy Verification Runbook — recovery sweep release

**Release:** `03423ab` feat(revenue): abandoned-lead recovery sweep + CASL unsubscribe
**Prepared:** 2026-08-11 · **Owner:** JR
**Rule:** every gate below is pass/fail. A fail stops the release — do not proceed to the next gate. Rollback is at the bottom.

---

## ⚠️ Read this first — the sequence you asked for is wrong in two ways

**1. `wrangler deploy` is not the deploy. `git push origin main` is.**
`.github/workflows/deploy.yml` deploys *both* the Worker and Pages on every push to `main`. Running `wrangler deploy` by hand as well just pushes a second, redundant deploy from your laptop that can drift from what CI ships. Push once; let CI do it.

**2. The migration must run BEFORE the push, not after.**
The new code queries `sessions.recovery_sent`. That column does not exist in your database yet. If the Worker ships first and the 15:00 UTC cron fires, `sbSelectRecoveryCandidates` gets a PostgREST 400.

That failure *is* handled — it's caught, logged as `recovery_sweep_query_failed`, and returns without sending anything or crashing. So it fails safe. But you'd burn a day and log a false alarm for no reason.

**Correct order: Gate 1 (migration) → Gate 2 (local end-to-end) → Gate 3 (push/deploy) → Gates 4–7 (verify).**

---

## Gate 0 — Pre-flight

| # | Check | Pass criteria |
|---|---|---|
| 0.1 | `git log --oneline -1` | Shows `03423ab` or later |
| 0.2 | `git status --porcelain` | Empty output |
| 0.3 | Worker tests | `7/7` passing |
| 0.4 | Resend sending domain | `iq-test.icu` verified in Resend, SPF + DKIM live |

Test command (no `package.json` in `worker/`, so run it in a temp ESM dir):

```bash
T=$(mktemp -d) && mkdir -p "$T/test" && cp worker/worker.js "$T/" && \
cp worker/test/worker.test.js "$T/test/" && echo '{"type":"module"}' > "$T/package.json" && \
(cd "$T" && node test/worker.test.js)
```

**FAIL → stop.** Nothing below is meaningful if the tree is dirty or tests are red.

---

## Gate 1 — Database migration

Supabase → SQL Editor → New query. Paste the **whole** of `supabase/schema.sql` (every statement is `if not exists` / `add column if not exists`, so re-running is safe).

Then verify — do not trust the "Success" toast:

```sql
-- 1.1 Column exists, correct type, correct default
select column_name, data_type, column_default, is_nullable
from information_schema.columns
where table_name = 'sessions' and column_name = 'recovery_sent';

-- 1.2 Partial index exists and its predicate matches the sweep's WHERE clause
select indexname, indexdef
from pg_indexes
where tablename = 'sessions' and indexname = 'sessions_recovery_sweep_idx';

-- 1.3 No pre-existing row is accidentally eligible (should be 0 on a zero-traffic site)
select count(*) from sessions
where paid = false and recovery_sent = false and marketing_opt_in = true
  and created_at < now() - interval '48 hours';
```

| Check | PASS | FAIL |
|---|---|---|
| 1.1 | one row: `boolean`, default `false`, `NO` | column missing → migration didn't run |
| 1.2 | one row, `indexdef` contains `paid = false`, `recovery_sent = false`, `marketing_opt_in = true` | index missing → sweep will do a full table scan |
| 1.3 | any number — **write it down** | — |

**Record the 1.3 count.** That is exactly how many emails your first real sweep will send. If it's larger than you expected, stop and look at the rows before deploying.

---

## Gate 2 — Local end-to-end with real integrations (the one that actually proves it)

This is the highest-value gate: it exercises the real Supabase and real Resend against the new code, on your machine, **before** anything reaches production.

**2.1 — Create `worker/.dev.vars`** (already covered by `.gitignore`'s `.dev.vars*` — confirm with `git check-ignore -v worker/.dev.vars` before you paste secrets):

```
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_KEY=<service key>
RESEND_API_KEY=<resend key>
RESEND_FROM=IQ Test <report@iq-test.icu>
ALLOWED_ORIGIN=https://iq-test.icu
```

**2.2 — Seed one real test row** addressed to an inbox you control. This is a genuine record exercising the real path, not mock data:

```sql
insert into sessions (email, raw_score, cognitive_index, percentile_estimate,
                      consent_given_at, marketing_opt_in, paid, created_at)
values ('YOUR-REAL-EMAIL@example.com', 12, 112, 78,
        now(), true, false, now() - interval '49 hours')
returning id;
```

Save the returned `id`.

**2.3 — Fire the sweep locally:**

```bash
cd worker && wrangler dev --test-scheduled
# in a second terminal:
curl "http://localhost:8787/__scheduled?cron=0+15+*+*+*"
```

**2.4 — Pass/fail:**

| # | Check | PASS |
|---|---|---|
| a | Console logs | `recovery_sweep_started` → `recovery_email_sent` → `recovery_sweep_completed`, `candidateCount` matches Gate 1.3 + 1 |
| b | Inbox | **Exactly one** email, subject `Your IQ·Test score is still saved` |
| c | Email body | Shows your real index (112) and percentile (78) — not `Your result is still saved.` |
| d | "View my saved result" button | Opens `https://iq-test.icu/?report=<id>` |
| e | Unsubscribe link | Loads the dark confirmation page, no error |
| f | After clicking unsubscribe | `select marketing_opt_in from sessions where id='<id>'` → `false` |
| g | Row state | `select recovery_sent from sessions where id='<id>'` → `true` |
| h | Re-run 2.3 | **Zero** additional emails — no double-send |

**FAIL on (b) with two emails → stop.** Double-send is a CASL problem, not a bug report.
**FAIL on (a) with `recovery_sweep_query_failed` → Gate 1 didn't actually apply.**

**2.5 — Clean up the test row:**

```sql
delete from sessions where id = '<id>';
```

---

## Gate 3 — Deploy

```bash
git push origin main
```

Then GitHub → Actions → the `Deploy` run.

| Check | PASS |
|---|---|
| 3.1 | Both jobs green: `Deploy Worker → iq-test.icu/api/*` **and** `Deploy Pages → iq-test.icu` |
| 3.2 | Worker job log shows the cron being registered: `Triggers: 0 15 * * *` (wording varies by wrangler version) |

**FAIL → check `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` repo secrets first.** That's the usual cause.

---

## Gate 4 — Production smoke (read-only, ~2 min)

```bash
# 4.1 Unsubscribe endpoint is live and fails safe on a garbage id
curl -s -o /dev/null -w "%{http_code}\n" "https://iq-test.icu/api/unsubscribe?id=not-a-uuid"

# 4.2 Existing API surface is untouched
curl -s "https://iq-test.icu/api/report?id=not-a-uuid"

# 4.3 FAQ copy fix is live
curl -s https://iq-test.icu/ | grep -c "one-click unsubscribe"
```

| # | PASS | Meaning |
|---|---|---|
| 4.1 | `200` | Endpoint live, invalid id returns the friendly page (by design — never leaks whether an id exists) |
| 4.2 | `{"error":"invalid_id"}` | No regression on the pre-existing route |
| 4.3 | `2` | Both the visible FAQ and the `<noscript>` mirror shipped |

Also confirm in Cloudflare → Workers & Pages → your worker → **Settings → Trigger Events**: cron `0 15 * * *` is listed.

---

## Gate 5 — Paid path smoke test (spend $1.99 of your own money)

The `postResend()` fix touched the paid path. That path handles real money and has never been re-verified since. **Do not skip this.**

1. Take the quiz on production, enter a real email at the free-score step.
2. Buy the **$1.99 Score Report** with a real card.
3. Verify:

| # | Check | PASS |
|---|---|---|
| 5.1 | Report email arrives | Within ~60s |
| 5.2 | Report content | Reflects your actual answers, no placeholder text |
| 5.3 | DB row | `paid=true`, `report_sent_at` set, `tier='basic'` |
| 5.4 | Stripe Dashboard | Payment succeeded, webhook `checkout.session.completed` delivered `200` |

**FAIL on 5.1 with 5.4 showing a webhook retry** → that is the `postResend` fix working as designed (Resend rejected, Stripe re-delivers). Fix the Resend cause; do not revert the guard.

Refund yourself in Stripe afterward if you want the books clean.

---

## Gate 6 — Stripe wallet check (5 min, zero code)

Stripe Dashboard → **Settings → Payment methods**.

| # | Check | Action if off |
|---|---|---|
| 6.1 | Apple Pay — enabled | Enable |
| 6.2 | Google Pay — enabled | Enable |
| 6.3 | Link — enabled | Enable |
| 6.4 | `iq-test.icu` registered under Apple Pay domains | Add the domain |

Then re-open the checkout on a **real iPhone or Android device** (desktop won't show wallets) and confirm the wallet button renders above the card fields.

Why this matters at your price point: a $1.99–$6.99 impulse purchase on mobile lives or dies on whether the buyer has to type a card number. This is the cheapest conversion lever available to you and it costs nothing but a toggle.

---

## Gate 7 — First live sweep (T+1 day, 15:00 UTC / ~09:00 Edmonton)

```bash
cd worker && wrangler tail --format pretty
```

| # | Check | PASS |
|---|---|---|
| 7.1 | `recovery_sweep_started` fires at 15:00 UTC | Present |
| 7.2 | `candidateCount` | Matches your Gate 1.3 number |
| 7.3 | `recovery_email_failed` count | `0` |
| 7.4 | `recovery_sweep_completed` | Present |

If `candidateCount` is `0`, that's expected on a zero-traffic site and **is still a pass** — it proves the cron fires and the query works. Real sends begin once distribution starts.

---

## Rollback

| Scenario | Action |
|---|---|
| Sweep misbehaving, site otherwise fine | Comment out `[triggers]` in both `wrangler.toml` files, push. Cron stops; nothing else changes. |
| Worker broken | Cloudflare → Workers → Deployments → **Rollback** to the previous version (instant, no git needed) |
| Need full code revert | `git revert 03423ab && git push` — the LF commit `b0ba08e` is whitespace-only, leave it alone |

**The migration needs no rollback.** `recovery_sent` is additive with a default; nothing reads it but the sweep.

---

## Day-2 monitoring

Run weekly in Supabase:

```sql
-- Recovery funnel: sent vs. converted
select
  count(*) filter (where recovery_sent)                      as swept,
  count(*) filter (where recovery_sent and paid)             as converted,
  round(100.0 * count(*) filter (where recovery_sent and paid)
        / nullif(count(*) filter (where recovery_sent), 0), 2) as pct
from sessions;
```

**Kill criteria (from the CRO audit):** if 30 days of sends produce **< 1%** conversion, disable the cron. Below that floor the copy-maintenance overhead isn't worth it.

Caveat: `paid` doesn't record *why* someone paid, so this over-attributes — a lead who was going to buy anyway counts as converted. Treat it as a ceiling, not a measurement. Attribution needs a tagged link (`?src=recovery`) if you want the real number.

---

## What I could not verify

I have no Cloudflare, Supabase, Stripe, or Resend credentials in this environment. Everything above is derived from reading the code, schema, and CI config — **not** from a live run. Gates 1, 2, and 5 are the ones that convert this from reasoning into evidence. The commit is verified (7/7 tests, syntax-checked); the deployment is not.
