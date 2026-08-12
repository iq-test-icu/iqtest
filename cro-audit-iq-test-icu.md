# CRO Audit — iq-test.icu

**Date:** 2026-08-10 · **Prepared by:** APEX operating partner · **Scope:** conversion-rate optimization only (no clinical/legal review)
**Method:** live site fetch (production HTML/copy), full inspection of `apex-iqtest` repo (`public/index.html`, `worker/worker.js`, `_headers`, `supabase/schema.sql`, `execution-contract.md`, commit history). No Stripe Dashboard, Supabase table data, GA/Search Console, or real conversion numbers were accessible — findings are code/copy-level and marked accordingly. No code was changed in this pass.

---

## 1. What's already working — don't touch, don't duplicate

Commit history (`033abaf feat(cro): P0 conversion & revenue uplift`, `841b389 fix: Production Hardening…`) shows a prior CRO pass already landed. Confirmed live and in code:

| Element | Evidence |
|---|---|
| 3-tier decoy-anchored pricing ($1.99 / $3.99 "Most Popular" / $6.99 "Best Value") | Live copy + `worker.js:26` `PRICE_CENTS` |
| 2-step lead capture — free score email collected *before* the paywall, with email auto-filled into the paid checkout field | `index.html:1859` — `emailInput.value = email` reuses the lead email, no re-typing |
| Sample Deep Report excerpt shown pre-purchase | Live copy, "click to expand" excerpt block |
| Single, unambiguous primary CTA ("Start the test") | One `.btn-primary` above the fold |
| Progress bar + number-key shortcuts (1–4) during the quiz | `index.html:1360, 1619` |
| Responsive breakpoints at 900/600/500px + `prefers-reduced-motion` support | `index.html:257,261,660,740,1176` |
| Hardened security headers (CSP, X-Frame-Options, nosniff, referrer policy) | `public/_headers` |
| SEO foundation: 4 JSON-LD blocks, canonical URLs, sitemap, 5 supporting long-tail content pages | `index.html`, `sitemap.xml`, `public/*.html` |
| Compliance-safe copy: no fabricated stats, no clinical claims, CASL consent enforced server-side | `execution-contract.md` §2, `worker.js` consent handling |

This is a real moat, not filler — the honesty constraint ("no fabricated user counts," "no clinical claim") is legally load-bearing for a self-insight product and should stay a hard line in every recommendation below.

---

## 2. Verified gaps — ranked by ICE

`ICE = (Impact + Confidence + Ease) / 3`, each 1–10, Ease = 10 − effort. Ranked high to low; ties broken by Impact.

| # | Lever | Evidence | Impact | Conf. | Ease | ICE | New vendor? |
|---|---|---|---|---|---|---|---|
| 1 | **Zero analytics/behavioral instrumentation** — no GA4, Meta/TikTok Pixel, Clarity, Hotjar, or PostHog anywhere in `public/*.html`. Only an internal Supabase `events` log. | `grep` across every page + worker returned no matches for any tracking script | 9 | 9 | 8 | 8.7 | **Yes — needs your sign-off** |
| 2 | **Stripe Checkout wallet methods unverified** — `handleCheckout` sends no `payment_method_types` and no `automatic_payment_methods` flag; whether Apple Pay/Google Pay/Link render is a Stripe *Dashboard* toggle invisible from the repo | `worker.js:261-272` | 7 | 6 | 10 | 7.7 | No |
| 3 | **No abandoned-lead recovery** — email is captured pre-paywall (step 2 of the funnel) but nothing re-engages leads who saw their free score and didn't buy | `worker.js` has Resend wired for paid delivery only; no follow-up send path | 7 | 6 | 7 | 6.7 | No — reuses Resend, already in stack |
| 4 | **No real social proof** — zero testimonials or live counters on the page, even though `report_generated` events are already logged server-side | Live copy has no counter; `worker.js:317` logs the exact event a real counter would read | 6 | 7 | 8 | 7.0 | No |
| 5 | **No quiz/session persistence** — zero `localStorage` usage; a user who closes the tab mid-quiz or after their free score has no way back except manually clicking "Copy/Share My Result" | `grep -n localStorage public/index.html` → no results | 5 | 7 | 9 | 7.0 | No |
| 6 | **OG image 4.5x heavier than the rest of the asset pipeline** — `og.png` is 375KB vs. `mural_bg.webp` at 84KB; still PNG, not WebP | `ls -la public/*` | 2 | 9 | 10 | 7.0 | No |
| 7 | **Fonts add a render-blocking third-party hop** — Google Fonts loaded via `<link rel="stylesheet">` with only `preconnect`, no `preload` on the actual woff2, no self-hosting | `index.html:30-31` | 3 | 7 | 8 | 6.0 | No — self-hosting *removes* a vendor dependency |

**Explicitly not a gap:** no exit-intent popup, no countdown timer, no fabricated urgency. That's correct given the "no fabricated stats" constraint — flagging so it isn't mistaken for an oversight. Item 3 above (recovery email) is the honest substitute: it re-engages real leads you already collected, not manufactured scarcity.

---

## 3. Recommendation — pick + 2 backups

**Pick: ship the abandoned-lead recovery email.**
Hypothesis: leads who submit their email for the free score but don't purchase within 48h will convert at a meaningfully non-zero rate if sent one plain, honest follow-up ("your score is saved — here's what the historical match report adds"). Zero new vendors (Resend is already wired), zero new UI, uses inventory you're already paying to collect and currently discarding.
- Method: Cloudflare Cron Trigger (already in your stack — Workers has native cron, no new vendor) queries `sessions` for `consent_given_at IS NOT NULL AND paid = false AND created_at < now() - 48h AND recovery_sent = false`, sends one Resend email, sets `recovery_sent = true`.
- Metric: recovery-email → purchase conversion rate, tracked via existing `logEvent`.
- Kill criteria: if 30 days of sends produce <1% conversion, kill it — the send cost (Resend is already paid-for-usage in your stack) isn't worth the copy-maintenance overhead below that floor.
- Owner: you decide send cadence/copy tone; I can draft both on approval.

**Backup 1: verify Stripe wallet payment methods are live** (item 2). Five-minute Dashboard check, zero code risk, plausible checkout-completion lift on mobile impulse purchases at this price point. Do this regardless of what else gets prioritized — it's free to check.

**Backup 2: real live counter using the existing `report_generated` event** (item 4). "X reports generated" sourced from an actual `count(*)` — this is the exact pattern `execution-contract.md` already pre-approved ("wire it to a real count, don't hardcode a number"), so it's consistent with standing constraints, not a new one.

---

## 4. Gated decision — analytics/behavioral instrumentation

This is the single highest-ICE item (8.7) and the most consequential gap: without it, you can't see where in the funnel (landing → quiz start → quiz complete → lead capture → checkout → paid) people actually drop off, can't retarget cart-abandoners, and can't run any future A/B test with statistical confidence — everything else in this audit is a reasoned guess without it.

It's also a new vendor, which your standing operating rule requires explicit sign-off on before I touch anything. Flagged below as a direct question rather than assumed.

---

## 5. Explicitly out of scope for this pass

Full Verification Package (a11y contrast audit, WCAG pass, Lighthouse perf run against a live URL) — the sandbox has no verified network path to `iq-test.icu` (outbound `curl` failed; findings above come from the earlier `web_fetch` snapshot and static code inspection, not a live browser render). If you want a real Lighthouse/axe pass, that needs either Chrome DevTools access on your machine or a CI step — flag if you want that added as a follow-up.

---

## 6. Real Search Console data (added 2026-08-10, from your GSC export)

Property has data from 2026-07-16 (site launch) through 2026-08-08 — the full history that exists. Verbatim totals, "Last 3 months" filter:

| Metric | Value |
|---|---|
| Clicks | **0** |
| Impressions | **5** |
| Distinct queries reported | **0** (below GSC's reporting threshold) |
| Pages with any impressions | `https://iq-test.icu/` (3) + `http://iq-test.icu/` (2) — homepage only, no content page has ever shown |
| Countries | US, Zimbabwe, Philippines, Vietnam — 1 impression each except US (2) |
| Avg. position when shown | 5–17, no pattern (too few data points to mean anything) |

**Read:** this isn't underperforming SEO, it's pre-discovery. Zero backlinks + zero social signal + a 3.5-week-old domain on a TLD (`.icu`) with an elevated spam prior gives Google's crawler nothing pulling it toward this site, so it isn't finding reasons to crawl or rank it yet. This is normal for a domain at this age with this link profile — not a bug, not a technical SEO defect (robots.txt/sitemap/canonical/JSON-LD all check out per §2 of this audit). It also fully confirms the reprioritization below: there is no funnel to instrument yet, because there is no traffic. Distribution is the entire game until that changes.

**One small, low-priority technical note:** both the `http://` and `https://` homepage are showing separate impressions in GSC, which usually means the http→https redirect isn't fully enforced at the Cloudflare edge (Zone → SSL/TLS → "Always Use HTTPS"). Not the cause of the visibility gap — 5 total impressions either way — but worth a 2-minute dashboard check so it doesn't quietly split signal once real traffic starts.

## 7. Status (updated post-review)

- **Shipped:** abandoned-lead recovery email — `worker.js` `scheduled()` handler + daily Cron Trigger, `GET /api/unsubscribe` (one-click, CASL-compliant), `recovery_sent` migration + partial index in `supabase/schema.sql`, cron config in both `wrangler.toml` files, README ops notes. 6/6 worker tests passing (3 new, 3 pre-existing, all green). Zero new vendors, zero changes to checkout/quiz logic. **Not yet committed or deployed** — review the diff, run `wrangler deploy` from `worker/` when ready.
- **On hold:** GA4 instrumentation (item 1) — needs a real Measurement ID from you; no code touched. Still the highest-ICE (8.7) open item whenever you're ready — 60 seconds at analytics.google.com → Admin → Create Property gets you the ID.
- **Open, no code risk:** Stripe Dashboard → Settings → Payment methods check for Apple Pay/Google Pay/Link (5 min, no code needed regardless of outcome).
- **Queued, not started:** real live counter using `report_generated`, `localStorage` quiz-session resume, `og.png` → WebP compression, font self-hosting. All zero-vendor, surgical — say the word and I'll batch them.
