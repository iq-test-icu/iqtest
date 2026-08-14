# Project: iq-test.icu

## 1. Executive Summary
`iq-test.icu` is a commercial cognitive assessment platform owned and operated by APEX Business Systems Ltd. (Edmonton, AB, Canada). It provides a free 16-question cognitive assessment across four domains (numerical reasoning, verbal reasoning, pattern recognition, and logical deduction) followed by optional tiered commercial insight reports ($1.99 Score Report, $3.99 Deep Analysis Report, $6.99 Complete Report with Certificate).

## 2. Technology Stack & Infrastructure
- **Frontend Surface:** Static HTML5, Vanilla JavaScript, responsive CSS with OKLCH color spaces, Google Fonts (Space Grotesk + Fraunces), hosted on Cloudflare Pages.
- **Backend API & Orchestrator:** Cloudflare Worker on `/api/*` handling `/api/create-checkout-session`, `/api/stripe-webhook`, `/api/report`, `/api/unsubscribe`, and cron triggers.
- **Database:** Supabase PostgreSQL (`sessions` table with UUID session tokens, score breakdowns, locale capture, tier flags, and marketing consent tracking).
- **Payment Processing:** Stripe Checkout with dynamic locale forwarding, webhook idempotency, and fail-safe metadata fulfillment.
- **Email Delivery:** Resend API with RFC 8058 compliant `List-Unsubscribe` headers, CASL-compliant physical address footers, and double-opt-in consent scope.
- **Translation Engine:** 13-locale pipeline (`_i18n/`) supporting English (en), German (de), French (fr), Spanish (es), Portuguese (pt), Italian (it), Dutch (nl), Japanese (ja), Korean (ko), Simplified Chinese (zh), Arabic (ar, RTL), Hindi (hi), and Tagalog (tl).

## 3. SEO Architecture & Hub Structure
- **Hub A (IQ Scores & Statistics):** `/iq-scores/` + 6 spoke pages (`/what-is-a-good-iq-score`, `/iq-scale-chart`, `/average-iq`, `/iq-percentile-calculator`, `/high-iq-genius-range`, `/iq-score-by-age`) featuring Gaussian bell curve SVG visualizers.
- **Hub B (Historical Thinkers):** `/historical-figures-iq` + 7 spoke pages (`/albert-einstein-iq`, `/leonardo-da-vinci-iq`, `/nikola-tesla-iq`, `/marie-curie-iq`, `/isaac-newton-iq`, `/stephen-hawking-iq`, `/highest-iq-in-history`) with interactive filter pills.
- **Hub C (Cognitive Domains):** `/cognitive-skills/` + 4 spoke pages (`/logical-reasoning`, `/numerical-reasoning`, `/verbal-reasoning`, `/pattern-recognition`) with interactive puzzle solvers.
- **Trust & Utility Pages:** `/methodology`, `/are-online-iq-tests-accurate`, `/types-of-iq-tests`, `/editorial-standards`, `/about`, `/support`, `/contact`, `/privacy`, `/terms`.

## 4. Key Operating Directives
- **Zero Generator Drift:** All static pages must be rendered from deterministic generator scripts (`_seo/build.js`, `_i18n/render-locales.js`). Manual edits to generated HTML files are prohibited.
- **Fail-Closed Verification:** Every pull request must pass all four validation suites (`worker.test.js`, `test-e2e.js`, `verify-all.js`, `verify-i18n.js`) with 0 failures and 0 warnings.
- **Header Aesthetics:** The IQ·Test brand logo must remain centered on all viewports, with the persistent language switcher button anchored to the far right.
