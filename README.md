# IQ·Test — iq-test.icu

Cognitive-skills quiz: free instant score, $4.99 full report (percentile + written
analysis) emailed via Groq-generated narrative + Resend.

**Stack:** Cloudflare Pages (`public/`, static) + Cloudflare Worker (`worker/`, routed
at `iq-test.icu/api/*`, same-origin — no separate API subdomain) + Supabase (data) +
Stripe (payment) + Groq (report text) + Resend (email). No npm SDKs on the Worker —
every integration is a raw `fetch()`.

## Why this version replaced the previous build
The prior copy claimed "scientifically scored with Item Response Theory" — that's not
what this app does, and an unsubstantiated clinical-accuracy claim on a paid product is
real FTC/false-advertising exposure. This version keeps the same mechanic (free score →
paid report) but positions it honestly: a self-insight quiz, not a validated instrument.
Also dropped the generic near-black-plus-neon template look for something grounded in
the actual subject — an exam answer sheet.

## Deploy checklist
1. `iq-test.icu` DNS → Cloudflare (zone must be active before Pages/Worker routes work —
   the 525 error on the live domain right now means this step isn't done yet).
2. Cloudflare Pages → connect this repo, publish directory = `public/`.
3. Supabase → SQL Editor → run `supabase/schema.sql` (already pointed at the real
   project via `worker/wrangler.toml`).
4. `cd worker && wrangler deploy`, then set secrets:
   `SUPABASE_SERVICE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `GROQ_API_KEY`,
   `RESEND_API_KEY`.
5. Stripe webhook → `https://iq-test.icu/api/webhook`, event `checkout.session.completed`.
6. Resend → verify `iq-test.icu` sending domain (SPF/DKIM in Cloudflare DNS).

## Known gaps (not hidden, not yet fixed)
- Score is trusted client-side on submit — fine at $4.99, but spoofable. Next hardening
  pass: score server-side in the Worker.
- Refund copy promises a self-serve link; that flow isn't wired yet. Build it or soften
  the copy before real traffic.
- No rate limiting yet on `/api/checkout` or `/api/save-result`.

## SEO/GEO — realistic version
"IQ test" as a bare head-term won't hit page 1 on a new domain regardless of on-page
work — that's a backlink-age problem, not fixable in code. What's built in instead:
`FAQPage` + `WebApplication` JSON-LD (the actual GEO lever — AI answer engines favor
structured, quotable Q&A over raw authority), static About/FAQ content that renders on
first paint rather than hiding behind the quiz's JS state, plus `robots.txt` and
`sitemap.xml`. Long-tail terms ("free cognitive skills test," "pattern reasoning test")
are winnable in weeks. The head term isn't, on any timeline code controls.

**Not deployed or tested against live Stripe/Supabase/Groq/Resend as of this commit.**
