# IQ·Test (iq-test.icu) — Execution Contract

**Repo:** `apexbusiness-systems/apex-iqtest`, branch `main`, current HEAD `e7f2c00`.
**Scope of this contract:** backend + deploy work only. The frontend (`public/index.html`) is done and pushed — do not redesign it. Your job is to make the worker, schema, and Stripe setup match what the frontend already expects, then get the whole thing live.

## 1. Objective
Ship a working two-tier paid result flow on iq-test.icu:
- Free: instant client-scored index + category breakdown (already works)
- **Basic — $1.99**: unlocks the percentile breakdown server-side
- **Detailed — $3.99**: unlocks percentile + written reasoning analysis + a historical-figure match

## 2. Hard constraints — do not violate
- No claim of clinical/psychometric validity anywhere (copy, emails, JSON-LD). This is a self-insight entertainment tool. Legal exposure if violated.
- No fabricated statistics (user counts, "X people scored higher", social proof numbers). If you want a real counter, wire it to an actual `count(*)` on `sessions`, don't hardcode a number.
- CASL consent is mandatory before any email send — `consent_given_at` must be set server-side, never trust a client timestamp.
- Keep the Worker dependency-free (raw `fetch()` calls only — Stripe, Supabase, Groq, Resend all have REST APIs already used in the current `worker.js`; don't add their npm SDKs).
- Don't touch `public/index.html` design/copy beyond what's needed to keep it wired to the API contract below.

## 3. Current blocker — fix this FIRST, before any code changes matter
The Cloudflare Worker `apex-iqtest-worker` has a **Custom Domain** bound to the full `iq-test.icu` zone (Workers & Pages → apex-iqtest-worker → Domains → Custom Domains and Routes shows `iq-test.icu` / Production / zone `iq-test.icu`). A Custom Domain claims 100% of traffic on that domain ahead of Pages, which is why the live site currently returns the Worker's own `{"error":"Not found"}` JSON instead of the landing page.

**Fix:** Remove that Custom Domain binding. Replace it with a **Route** scoped to `iq-test.icu/api/*` only (this already matches `worker/wrangler.toml`'s `[[routes]]` block — redeploying with `wrangler deploy` after removing the Custom Domain should self-correct this, but verify in the dashboard). Then connect `apex-iqtest` repo → Cloudflare Pages, publish directory `public/`, custom domain `iq-test.icu`. Confirm both coexist: `iq-test.icu/` serves Pages, `iq-test.icu/api/*` serves the Worker.

## 4. API contract the frontend already expects
`public/index.html` calls these three endpoints, same-origin (`API_BASE = ""`):

```
POST /api/save-result
  body: { email, consentGiven, raw, index, percentile, catScores, catMax, answers }
  -> { id }

POST /api/checkout
  body: { id, email, tier }        // tier: "basic" | "detailed"  <-- NEW, worker.js does not read this yet
  -> { url }                        // Stripe Checkout URL

GET /api/report?id=<id>
  -> { paid: bool, report: string|null, tier: string|null }
```

## 5. Required changes to `worker/worker.js`

**`handleCheckout`** — currently hardcodes `unit_amount: "499"` for one product. Change to branch on `tier`:
```
const PRICE_CENTS = { basic: 199, detailed: 399 };
const PRODUCT_NAME = { basic: "IQ·Test Basic Result", detailed: "IQ·Test Detailed Result" };
```
Reject with 400 if `tier` isn't one of those two keys. Add `"metadata[tier]": tier` to the Checkout Session params so the webhook knows which tier was purchased. Store `tier` on the `sessions` row too (via `handleSaveResult` or an update at checkout time — either works, pick one and be consistent).

**`generateReport`** — must branch on tier:
- `basic`: no Groq call needed at all — just format the existing percentile/category data into plain text. Skip the LLM call entirely for basic (saves cost, and there's no "report" to write).
- `detailed`: keep the existing Groq call, but the prompt must ALSO produce a historical figure match. Two-call or single-call, your choice, but single call is cheaper — extend the existing prompt:

```
...(existing prompt content)...
Additionally, name ONE real historical figure (scientist, artist, writer, inventor,
leader — any field) whose general reputation for the SAME reasoning strength this
person showed (e.g. strongest category) is well known, and explain the connection in
1-2 sentences. Do not claim this person's actual IQ or test score — historical IQ
estimates for real people are not scientifically reliable and must not be presented as
fact. Frame it as "your [category] result echoes the kind of thinking associated with
[figure]" — a thematic pairing, not a numeric claim.
```
This is a real constraint, not a suggestion: DO NOT let the model output "Einstein's IQ was X and yours is Y" — that's a fabricated-precision claim about a real person. The pairing must be framed as thematic/stylistic, never numeric.

**`handleWebhook`** — after generating the report, `paid=true` should reflect which tier was purchased (`row.tier` or `session.metadata.tier`). If tier is `basic`, the "report" field can just be the formatted percentile text; `sendReportEmail` subject/body should say "Basic Result" vs "Detailed Result" accordingly.

## 6. Required changes to `supabase/schema.sql`
Add one column, migration-style (don't drop/recreate the table if it's already live with data):
```sql
alter table sessions add column if not exists tier text check (tier in ('basic','detailed'));
```

## 7. Stripe setup
No dashboard Products needed — checkout uses inline `price_data` (see existing `handleCheckout`), so nothing to pre-configure in Stripe beyond the account itself and the webhook endpoint (`https://iq-test.icu/api/webhook`, event `checkout.session.completed`) which should already be set up per the earlier deploy pass. Confirm it still resolves correctly with the new metadata field added.

## 8. Deploy checklist
1. Fix the Custom Domain / Route issue (§3) — verify by visiting `iq-test.icu` and seeing the actual landing page, not JSON.
2. Apply schema migration (§6) in Supabase SQL editor.
3. Update and redeploy the worker: `cd worker && wrangler deploy`.
4. Confirm Pages is serving `public/index.html` at the root.
5. End-to-end test with Stripe test-mode keys: complete the quiz → pick Basic → verify checkout → verify email arrives → repeat for Detailed → verify the historical-figure text reads as thematic, not numeric.
6. Only after a clean test-mode pass, switch Stripe keys to live mode.

## 9. Acceptance criteria (what "done" means)
- [ ] `iq-test.icu` loads the actual landing page (not the Worker's 404 JSON)
- [ ] Both `/api/*` and `/` resolve correctly on the same domain
- [ ] Basic tier charges $1.99, delivers percentile breakdown by email, no LLM call made
- [ ] Detailed tier charges $3.99, delivers written analysis + historical figure match, framed thematically with no numeric IQ claim about the real person
- [ ] Consent checkbox is enforced server-side, not just client-side
- [ ] No fabricated stats anywhere in copy or email content
- [ ] Refund promise in the UI ("self-serve link in your receipt email") is either wired to a real Stripe refund flow, or the copy is softened to match what actually exists — pick one, don't ship the mismatch
- [ ] Full loop tested in Stripe test mode before going live

## 10. Explicitly out of scope for this pass
Rate limiting on `/api/*`, server-side answer-key scoring (client-trusted score remains a known, accepted gap at this price point), long-tail SEO content pages. Flag these as follow-ups, don't silently expand scope to cover them now.
