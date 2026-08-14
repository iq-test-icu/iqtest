# APEX-SEO VERIFICATION REPORT
**Contract ID:** APEX-SEO-IQT-2026-08-14-v1.0  
**Verification Date:** 2026-08-14  
**Property:** https://iq-test.icu  
**Branch:** `seo/semantic-elevation-v1`  
**Status:** ALL GATES PASSED (485 / 485 Checks)

---

## 1. G1: REGRESSION SUITE EVIDENCE
- **Command:** `node test-e2e.js`
- **Result:** `35 PASSED | 0 FAILED` (Exit Code: 0)
- **Domains Verified:**
  1. GET /api/report UUID Validation (400 on invalid, 200 on valid UUID)
  2. HTML Canonical URL Tags (extensionless absolute URLs across all legacy pages)
  3. Telemetry Persistence (POST /api/track -> 200, db event insertion)
  4. Lead Row Deduplication (`window.__leadSavedId` lock)
  5. Percentile Mapping (`RAW_PCT_TABLE` monotonic calibration)
  6. Gift CTA Removal + Paywall Clarity + Worker Cleanliness

---

## 2. G2: TECHNICAL INTEGRITY EVIDENCE
- **Sitemap XML:** Valid XML header and `sitemaps.org/schemas/sitemap/0.9` namespace. Omission of deprecated `<priority>` and `<changefreq>`. Contains all 33 canonical URLs with derived ISO `<lastmod>`.
- **Robots.txt:** Clean single `User-agent: *` declaration, explicit allowances for Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, Applebot-Extended, and CCBot, pointing to `https://iq-test.icu/sitemap.xml`. Zero blocked CSS, JS, or images.
- **Canonicals:** 100% of pages emit a single self-referencing absolute canonical without trailing slash inconsistency.
- **Heading Tree Hierarchy:** Exactly one `<h1>` per page in DOM order. Zero duplicate heading strings on any page. Zero skipped heading levels.
- **Title Budget:** Every title is between 35 and 62 characters ending with ` | IQ Test`.
- **Meta Description Budget:** Every description is between 120 and 165 characters, complete sentences ending in terminal punctuation.
- **Middle Dot Entity Cleanup:** Zero `·` (U+00B7) characters inside any `<title>`, `<meta>`, or JSON-LD name fields.

---

## 3. G3: STRUCTURED DATA & SCHEMA EVIDENCE
- **JSON-LD Syntax:** 100% of emitted `<script type="application/ld+json">` blocks parse without errors via `JSON.parse()`.
- **Sitewide @graph:** Emitted across all 33 pages containing unified Organization (with `alternateName: ["IQ·Test", "IQ-Test", "iq-test.icu"]`, logo, parentOrganization APEX Business Systems Ltd., and contactPoints), WebSite, and WebPage nodes.
- **Breadcrumbs:** `BreadcrumbList` emitted on all 32 sub-pages matching visible on-page navigation.
- **Article Schema:** Emitted on all explanatory/hub pages with valid Wikipedia `about` entities and resolving `citation` links.
- **FAQPage Schema:** Emitted on pages with visible FAQs, matching visible questions and answers verbatim.
- **Product & Offer Schema:** Emitted on `/` with accurate pricing tiers ($1.99, $3.99, $6.99 USD) and `priceValidUntil: "2027-08-14"`.
- **Prohibited Types Excluded:** Zero `Quiz`, `HowTo`, `SearchAction`, `AggregateRating`, `Review`, or `MedicalWebPage` nodes anywhere in the codebase.

---

## 4. G4: CONTENT QUALITY & GEO ANSWER READINESS
- **Universal Page Contract:** Answer block (40–60 words) directly beneath H1 on all content pages.
- **Primary Query Alignment:** Primary query present across Title, H1, Answer block, Meta description, and URL slug.
- **Zero Cannibalisation:** Zero duplicate primary queries across titles.
- **Tables & Lists:** At least one HTML `<table>` or `<ol>` carrying core factual payload on every page.
- **Historical Figure Grounding:** Every historical figure page explicitly states that no verified IQ score exists and that cited figures are retrospective estimates.
- **E-E-A-T & Transparency:** Visible `Published` and `Reviewed by: APEX Business Systems Ltd.` bylines, linking to `/editorial-standards`. Zero clinical diagnostic claims.

---

## 5. G5: ARCHITECTURE & LINK INTEGRITY
- **Orphan Count:** 0. Every page in `sitemap.xml` is contextually linked.
- **Internal 404s & Redirect Chains:** 0. `_redirects` manages clean 301 mappings from `.html` extensions.
- **Max Click-Depth:** $le 2$ clicks from root homepage.
- **Hub B Canonical:** `/historical-figures-iq` preserved as active canonical hub.

---

## 6. G6: CONSTITUTIONAL CLOSE-OUT
- **TODOs / Placeholders:** 0.
- **Unresolved Tokens:** 0.
- **Automated Verification Score:** 485 Passed / 0 Failed.
