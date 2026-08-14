# BASELINE AUDIT — iq-test.icu
**Contract ID:** APEX-SEO-IQT-2026-08-14-v1.0  
**Capture Date:** 2026-08-14  
**Property:** https://iq-test.icu  
**Branch:** seo/semantic-elevation-v1  

---

## 1. REPOSITORY MAP (T0.1)

- **Framework & Rendering Mode:** Static HTML (SSG / Static Assets) hosted via Cloudflare Pages (`public/` directory) with a Cloudflare Worker (`worker/worker.js`) serving `iq-test.icu/api/*`. Page HTML is server-delivered as pre-rendered static markup.
- **Routing Convention:** Clean URL extensionless routing configured via Cloudflare Pages and `public/_redirects`. Files in `public/<page>.html` map to `https://iq-test.icu/<page>`.
- **Metadata Authoring:** Authored statically inside the `<head>` of each independent HTML file in `public/`.
- **Sitemap & Robots Location:** Static files located at `public/sitemap.xml` and `public/robots.txt`.
- **Existing Shared Components / Design Tokens:**
  - Typography: `Space Grotesk` (display/headings), `Fraunces` (serif body)
  - Color Tokens: `--bg` / `--bg-dark` (oklch(0.06 0.002 95)), `--gold` (oklch(0.72 0.12 95)), `--text` / `--text-primary` (oklch(0.97 0.002 95)), `--muted` (oklch(0.62 0.008 95)), `--border` / `--border-color` (oklch(0.18 0.008 95 / 0.7)), `--bg-card` (oklch(0.10 0.006 95 / 0.85))
  - Components: `.faq-item` / `.faq-question` / `.faq-answer` (accordions), `.company-block` / `.card` (containers), `.cta-btn` / `.btn-primary` (buttons), `.back` (breadcrumbs/back links).
- **Middleware & Redirects:** `public/_redirects` enforces 301 redirects from `/*.html` to extensionless canonical paths. No i18n middleware.

---

## 2. BASELINE URL CAPTURE (T0.2)

### URL: `https://iq-test.icu/` (File: `public/index.html`)
- **HTTP Status:** 200 (Static)
- **Title (75 chars):** `Free Cognitive Test — Which Historical Figure Matches Your Score? | IQ·Test`
- **Meta Description (172 chars):** `Free 16-question cognitive skills test. Get your instant score. One-time payment ($1.99–$6.99). No subscription. No surprise charges. Discover your historical figure match.`
- **Canonical:** `https://iq-test.icu/`
- **Robots:** `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`
- **Word Count:** ~1273 words
- **Heading Tree:**
- **H1**: Free Cognitive Test — Which Historical Figure Matches Your Score?
- **H2**: How it works
- **H2**: About the test
- **H2**: Frequently Asked Questions
- **H1**: Which mind matches yours?
- **H2**: Free Cognitive Test — Which Historical Figure Matches Your Score?
- **H2**: How it works
- **H2**: What you get: free vs paid
- **H2**: Learn more
- **H2**: Frequently asked questions
- **H3**: Want your free score snapshot emailed to you?
- **H2**: Choose your report tier
- **H1**: Your full report
- **H3**: 🔗 Share your result

### URL: `https://iq-test.icu/about` (File: `public/about.html`)
- **HTTP Status:** 200 (Static)
- **Title (18 chars):** `About Us | IQ·Test`
- **Meta Description (123 chars):** `Learn about APEX Business Systems, the team behind IQ·Test, our mission to build engaging cognitive tools, and our history.`
- **Canonical:** `https://iq-test.icu/about`
- **Robots:** `default`
- **Word Count:** ~275 words
- **Heading Tree:**
- **H1**: About IQ·Test
- **H2**: The historical matching
- **H2**: Who built this

### URL: `https://iq-test.icu/methodology` (File: `public/methodology.html`)
- **HTTP Status:** 200 (Static)
- **Title (39 chars):** `Methodology & Technical Notes | IQ·Test`
- **Meta Description (116 chars):** `Technical details, limitations, and score reference scale documentation for the IQ·Test cognitive self-insight quiz.`
- **Canonical:** `https://iq-test.icu/methodology`
- **Robots:** `index, follow`
- **Word Count:** ~633 words
- **Heading Tree:**
- **H1**: Methodology & Technical Notes
- **H2**: Categories measured
- **H2**: Raw score to cognitive index mapping
- **H2**: Percentile framing
- **H2**: Why the scale is a familiar reference, not diagnosis
- **H2**: How historical figure matching works
- **H2**: Data collection and limitations
- **H2**: Frequently Asked Questions
- **H2**: Ready to check your cognitive baseline?

### URL: `https://iq-test.icu/what-is-an-iq-test` (File: `public/what-is-an-iq-test.html`)
- **HTTP Status:** 200 (Static)
- **Title (54 chars):** `What is an IQ Test? History, Meaning & Types | IQ·Test`
- **Meta Description (153 chars):** `What is an IQ test? Understand the history of intelligence scales, Wechsler scores, g-factor, and how clinical cognitive tests compare to online quizzes.`
- **Canonical:** `https://iq-test.icu/what-is-an-iq-test`
- **Robots:** `index, follow`
- **Word Count:** ~585 words
- **Heading Tree:**
- **H1**: What is an IQ Test?
- **H2**: What an IQ test measures
- **H2**: Common question types
- **H2**: How IQ scores are usually scaled
- **H2**: How this site differs
- **H2**: Limits of entertainment and self-insight tests
- **H2**: Frequently Asked Questions
- **H2**: Want to test your cognitive skills?

### URL: `https://iq-test.icu/free-iq-test-online` (File: `public/free-iq-test-online.html`)
- **HTTP Status:** 200 (Static)
- **Title (64 chars):** `Free IQ Test Online — What to Look For & How They Work | IQ·Test`
- **Meta Description (152 chars):** `Looking for a free IQ test online? Discover how online cognitive assessments are structured, what domains they measure, and why peer calibration is key.`
- **Canonical:** `https://iq-test.icu/free-iq-test-online`
- **Robots:** `default`
- **Word Count:** ~631 words
- **Heading Tree:**
- **H1**: Free IQ Test Online: What You Need to Know
- **H2**: What a Good Online Test Measures
- **H2**: How Online Scores are Standardized
- **H2**: The Warning Signs of Low-Quality Sites
- **H2**: The Value of a Historical Figure Match

### URL: `https://iq-test.icu/historical-figures-iq` (File: `public/historical-figures-iq.html`)
- **HTTP Status:** 200 (Static)
- **Title (62 chars):** `Historical Figures' IQ Scores: Estimates and Reality | IQ·Test`
- **Meta Description (34 chars):** `What were the IQ scores of history`
- **Canonical:** `https://iq-test.icu/historical-figures-iq`
- **Robots:** `index, follow`
- **Word Count:** ~521 words
- **Heading Tree:**
- **H1**: Historical Figures' IQ Scores: Estimates and Reality
- **H2**: Why most genius IQ claims are speculative
- **H2**: Why style-of-thinking comparison is more honest
- **H2**: How IQ·Test builds historical matches
- **H2**: Frequently Asked Questions
- **H2**: Which historical mind matches your cognitive fingerprint?

### URL: `https://iq-test.icu/cognitive-test-vs-iq-test` (File: `public/cognitive-test-vs-iq-test.html`)
- **HTTP Status:** 200 (Static)
- **Title (63 chars):** `Cognitive Test vs. IQ Test: Key Differences Explained | IQ·Test`
- **Meta Description (152 chars):** `What is the difference between a cognitive test and an IQ test? Learn how domain-specific cognitive screenings differ from general intelligence indices.`
- **Canonical:** `https://iq-test.icu/cognitive-test-vs-iq-test`
- **Robots:** `default`
- **Word Count:** ~684 words
- **Heading Tree:**
- **H1**: Cognitive Test vs. IQ Test: What is the Difference?
- **H2**: What is an IQ Test?
- **H2**: What is a Cognitive Test?
- **H2**: Comparing the Key Differences
- **H2**: Where does IQ·Test fit?

### URL: `https://iq-test.icu/support` (File: `public/support.html`)
- **HTTP Status:** 200 (Static)
- **Title (17 chars):** `Support | IQ·Test`
- **Meta Description (77 chars):** `Questions about your report, a payment issue, or anything else — we are here.`
- **Canonical:** `https://iq-test.icu/support`
- **Robots:** `default`
- **Word Count:** ~293 words
- **Heading Tree:**
- **H1**: Support
- **H2**: Missing your report?
- **H2**: Payment question or charge you don't recognise?
- **H2**: Anything else
- **H2**: Common questions

### URL: `https://iq-test.icu/privacy` (File: `public/privacy.html`)
- **HTTP Status:** 200 (Static)
- **Title (24 chars):** `Privacy Policy | IQ·Test`
- **Meta Description (82 chars):** `How IQ·Test handles your data. Short version: we collect only what we need, we don`
- **Canonical:** `https://iq-test.icu/privacy`
- **Robots:** `default`
- **Word Count:** ~351 words
- **Heading Tree:**
- **H1**: Privacy Policy
- **H2**: What we collect
- **H2**: What we do not do
- **H2**: How long we keep it
- **H2**: Third-party services
- **H2**: Cookies
- **H2**: Your rights
- **H2**: Questions

---

## 3. CONFIRMATION OF OPEN FINDINGS (T0.3)

| Finding | Check | Status | Evidence / Root Cause |
| :--- | :--- | :--- | :--- |
| **Homepage duplicate H1/H2 (§1.2.4)** | Inspect rendered DOM for repeated heading strings | **CONFIRMED** | `index.html` contains an off-screen `<div class="seo-content">` (lines 1184-1215) with `<h1>Free Cognitive Test — Which Historical Figure Matches Your Score?</h1>` and `<h2>How it works</h2>`, which duplicate the visible hero `<h1>Which mind matches yours?</h1>` and visible section headings `<h2>Free Cognitive Test — ...</h2>` and `<h2>How it works</h2>`. |
| **sitemap.xml unparseable (§1.2.3)** | Check response headers, compression & XML body | **CONFIRMED** | Live endpoint served with `content-encoding: br` (Brotli compression). File contains deprecated `<priority>` and `<changefreq>` tags and static `2026-07-18` dates. |
| **Canonical coverage** | Audit self-referencing absolute canonical tags | **CONFIRMED** | All existing HTML files emit canonical links, but trailing-slash and domain formatting must be rigorously standardized sitewide. |
| **Index status** | Read Google Search Console indexed pages & coverage | **NO GSC ACCESS** | GSC API/dashboard access is not configured in local environment. Baseline recorded as: `baseline: not yet measured` (requires JR). |
