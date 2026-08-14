# _i18n/OWNERSHIP.md — Asset & Generator Ownership Mapping

**Contract:** APEX-I18N-IQT-2026-08-14-v1.0  
**Date:** 2026-08-14  
**Audit Scope:** 33 English static HTML pages + dynamic surfaces in `worker/`

---

## 1. Page-to-Generator Ownership Matrix

Every single HTML file in `public/` is owned by exactly ONE canonical build script in `_seo/`. Zero hand-maintained HTML files exist.

| Generator Script | Target Output Path(s) | Page Count | Content Classification |
| :--- | :--- | :--- | :--- |
| `_seo/upgrade-index.js` | `public/index.html` | 1 | Homepage, Hero, 16 Assessment Items, Paywall, FAQs |
| `_seo/generate-hub-a.js` | `public/iq-scores/index.html`<br>`public/iq-scores/what-is-a-good-iq-score.html`<br>`public/iq-scores/iq-scale-chart.html`<br>`public/iq-scores/average-iq.html`<br>`public/iq-scores/iq-percentile-calculator.html`<br>`public/iq-scores/high-iq-genius-range.html`<br>`public/iq-scores/iq-score-by-age.html` | 7 | Hub A: Psychometric Scales, Gaussian Bell Curve Visualizer, Percentiles |
| `_seo/generate-hub-b.js` | `public/historical-figures-iq.html`<br>`public/historical-figures/albert-einstein-iq.html`<br>`public/historical-figures/leonardo-da-vinci-iq.html`<br>`public/historical-figures/nikola-tesla-iq.html`<br>`public/historical-figures/marie-curie-iq.html`<br>`public/historical-figures/isaac-newton-iq.html`<br>`public/historical-figures/stephen-hawking-iq.html`<br>`public/historical-figures/highest-iq-in-history.html` | 8 | Hub B: Historical Figure Cognitive Profiles, Thinking Style Filtering |
| `_seo/generate-hub-c.js` | `public/cognitive-skills/index.html`<br>`public/cognitive-skills/logical-reasoning.html`<br>`public/cognitive-skills/numerical-reasoning.html`<br>`public/cognitive-skills/verbal-reasoning.html`<br>`public/cognitive-skills/pattern-recognition.html` | 5 | Hub C: Four Cognitive Reasoning Domains, Worked Interactive Solvers |
| `_seo/generate-trust-and-utility.js` | `public/are-online-iq-tests-accurate.html`<br>`public/types-of-iq-tests.html`<br>`public/editorial-standards.html`<br>`public/contact.html`<br>`public/terms.html` | 5 | Trust & Utility Pages: Editorial Policies, Contact, Terms |
| `_seo/generate-existing-upgrades.js` | `public/free-iq-test-online.html`<br>`public/what-is-an-iq-test.html`<br>`public/cognitive-test-vs-iq-test.html`<br>`public/methodology.html`<br>`public/about.html`<br>`public/support.html`<br>`public/privacy.html` | 7 | Core Informational & Compliance Pages |
| **Total HTML Pages** | | **33** | **100% Owned by Generators** |

---

## 2. Dynamic & Backend Surface Inventory

The following user-facing strings live outside `public/**/*.html` and are in scope for internationalization:

| Surface | File & Handler | Function / Purpose | Translation Strategy |
| :--- | :--- | :--- | :--- |
| **16 Assessment Items** | `public/index.html:1659-1676` | `const QUESTIONS` array (Numeric, Pattern, Logic, Verbal) | Sourced from `_i18n/items/bank.<locale>.json` per Decision A |
| **Raw Score Map** | `public/index.html:1683+` | `RAW_PCT_TABLE` raw-to-percentile lookup | English-calibrated baseline; flagged per locale |
| **Report Generation Prompt** | `worker/worker.js:558` | `generateReport()` system prompt to Groq LLaMA 3.3 70B | Native target language prompt instruction; no MT round-trip |
| **Transactional Report Email** | `worker/worker.js:624` | `sendReportEmail()` HTML & plaintext delivery | Localised subject and footer via `_i18n/catalog/<locale>.json` |
| **Recovery Follow-Up Email** | `worker/worker.js:683` | `sendRecoveryEmail()` abandoned-lead email | Localised copy with CASL sender ID in target language |
| **Unsubscribe Page** | `worker/worker.js:389` | `handleUnsubscribe()` GET & RFC 8058 POST | Localised HTML confirmation rendered based on `session.locale` |
| **Stripe Checkout** | `worker/worker.js:324` | `handleCheckout()` session creation | Pass `locale` parameter to Stripe Checkout API |

---

## 3. Build & Deployment Verification

- **Pages Deployment:** `.github/workflows/deploy.yml` executes `wrangler pages deploy public --project-name=apex-iqtest`.
- **Exclusion Guarantee:** Only files inside `public/` are published to Cloudflare Pages edge. All root-level meta-directories (`_seo/`, `_i18n/`, `worker/`, `supabase/`) are strictly excluded from the static build upload.
- **Groq Credential:** Confirmed available in `GROQ_API_KEY` for build-time translation.
- **Generator Drift:** Zero drift verified (`git status --porcelain public/` is empty).
