/**
 * APEX-SEO Engine — iq-test.icu Semantic SEO Elevation
 * Contract ID: APEX-SEO-IQT-2026-08-14-v1.0
 * Pure Node.js — Zero New Dependencies — Surgical & Deterministic
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// Ensure directories exist
const dirs = [
  path.join(publicDir, 'iq-scores'),
  path.join(publicDir, 'historical-figures'),
  path.join(publicDir, 'cognitive-skills')
];
dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Organization Constants
const ORG_SCHEMA = {
  "@type": "Organization",
  "@id": "https://iq-test.icu/#organization",
  "name": "IQ Test",
  "alternateName": ["IQ·Test", "IQ-Test", "iq-test.icu"],
  "url": "https://iq-test.icu/",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://iq-test.icu/#logo",
    "url": "https://iq-test.icu/icon.webp",
    "width": 512,
    "height": 512
  },
  "parentOrganization": {
    "@type": "Organization",
    "name": "APEX Business Systems Ltd.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Edmonton",
      "addressRegion": "AB",
      "addressCountry": "CA"
    }
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@iq-test.icu",
      "availableLanguage": "English"
    },
    {
      "@type": "ContactPoint",
      "contactType": "billing support",
      "email": "billing@iq-test.icu",
      "availableLanguage": "English"
    }
  ]
};

const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": "https://iq-test.icu/#website",
  "url": "https://iq-test.icu/",
  "name": "IQ Test",
  "publisher": { "@id": "https://iq-test.icu/#organization" },
  "inLanguage": "en"
};

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildJsonLdGraph({
  pageUrl,
  pageTitle,
  pageDescription,
  datePublished = "2026-07-18T00:00:00-06:00",
  dateModified = "2026-08-14T12:25:00-06:00",
  breadcrumbs = null,
  article = null,
  faqs = null,
  products = null
}) {
  const graph = [
    ORG_SCHEMA,
    WEBSITE_SCHEMA,
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      "url": pageUrl,
      "name": pageTitle,
      "description": pageDescription,
      "isPartOf": { "@id": "https://iq-test.icu/#website" },
      "inLanguage": "en",
      "datePublished": datePublished,
      "dateModified": dateModified,
      ...(breadcrumbs ? { "breadcrumb": { "@id": `${pageUrl}#breadcrumb` } } : {})
    }
  ];

  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      "itemListElement": breadcrumbs.map((bc, idx) => {
        const itemObj = {
          "@type": "ListItem",
          "position": idx + 1,
          "name": bc.name
        };
        if (bc.url) itemObj.item = bc.url;
        return itemObj;
      })
    });
  }

  if (article) {
    graph.push({
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      "isPartOf": { "@id": `${pageUrl}#webpage` },
      "mainEntityOfPage": { "@id": `${pageUrl}#webpage` },
      "headline": article.headline.slice(0, 110),
      "description": pageDescription,
      "author": {
        "@type": "Organization",
        "name": "APEX Business Systems Ltd.",
        "url": "https://apexbusiness.systems"
      },
      "publisher": { "@id": "https://iq-test.icu/#organization" },
      "datePublished": datePublished,
      "dateModified": dateModified,
      "inLanguage": "en",
      ...(article.about ? { "about": article.about } : {}),
      ...(article.citation ? { "citation": article.citation } : {})
    });
  }

  if (faqs && faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    });
  }

  if (products) {
    graph.push({
      "@type": "Product",
      "@id": "https://iq-test.icu/#report-product",
      "name": "IQ Test Cognitive Report",
      "description": "A detailed breakdown of your results across four reasoning domains, with percentile placement and a historical-figure cognitive match.",
      "brand": { "@id": "https://iq-test.icu/#organization" },
      "offers": [
        {
          "@type": "Offer",
          "name": "Score Report",
          "price": "1.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://iq-test.icu/",
          "priceValidUntil": "2027-08-14"
        },
        {
          "@type": "Offer",
          "name": "Deep Report",
          "price": "3.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://iq-test.icu/",
          "priceValidUntil": "2027-08-14"
        },
        {
          "@type": "Offer",
          "name": "Complete Report",
          "price": "6.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://iq-test.icu/",
          "priceValidUntil": "2027-08-14"
        }
      ]
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

// Common Shared Styles
const COMMON_STYLES = `
  html { font-size: 17px; }
  :root {
    --bg: oklch(0.06 0.002 95);
    --gold: oklch(0.72 0.12 95);
    --text: oklch(0.97 0.002 95);
    --muted: oklch(0.62 0.008 95);
    --border: oklch(0.18 0.008 95 / 0.7);
    --bg-card: oklch(0.10 0.006 95 / 0.85);
    --red: oklch(0.52 0.17 28);
    --red-hover: oklch(0.58 0.19 28);
    --red-glow: oklch(0.52 0.17 28 / 0.3);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Fraunces', Georgia, serif;
    line-height: 1.75;
    -webkit-font-smoothing: antialiased;
  }
  .page { max-width: 760px; margin: 0 auto; padding: 50px 24px 100px; }
  
  .breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    color: var(--muted);
    margin-bottom: 36px;
  }
  .breadcrumbs a { color: var(--muted); text-decoration: none; }
  /* === PERSISTENT SITE HEADER & LANGUAGE SWITCHER === */
  .site-header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: oklch(0.06 0.002 95 / 0.88);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    padding: 10px 20px;
    margin-bottom: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }
  .site-header-inner {
    position: relative;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 36px;
  }
  .site-logo-link {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    margin: 0 auto;
  }
  .header-lang-wrapper {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
  }
  .lang-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: oklch(0.12 0.008 95 / 0.9);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 6px 14px;
    border-radius: 9999px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
  }
  .lang-btn:hover, .lang-btn:focus-visible {
    border-color: var(--gold);
    background: oklch(0.16 0.01 95);
    color: var(--gold);
    outline: none;
  }
  .lang-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 280px;
    max-height: 420px;
    overflow-y: auto;
    background: oklch(0.09 0.005 95 / 0.98);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: 0 16px 36px rgba(0,0,0,0.6);
    padding: 12px;
    z-index: 1001;
  }
  .lang-dropdown[hidden] {
    display: none;
  }
  .lang-dropdown-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    margin-bottom: 8px;
    padding: 0 6px;
  }
  .lang-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }
  .lang-option {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 8px;
    border-radius: 6px;
    color: var(--text);
    text-decoration: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    transition: all 0.15s ease;
  }
  .lang-option:hover {
    background: oklch(0.18 0.01 95 / 0.8);
    color: var(--gold);
  }
  .lang-option.active {
    background: oklch(0.72 0.12 95 / 0.15);
    color: var(--gold);
    font-weight: 600;
  }
  .lang-code {
    font-size: 0.68rem;
    font-weight: 700;
    opacity: 0.6;
    background: rgba(255,255,255,0.06);
    padding: 1px 4px;
    border-radius: 3px;
  }

  /* Scoped RTL support */
  [dir="rtl"] .site-header-inner { direction: rtl; }
  [dir="rtl"] .lang-dropdown { right: auto; left: 0; }
  [dir="rtl"] .lang-option { direction: rtl; }

  h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(1.9rem, 4.5vw, 2.75rem);
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.25;
    color: var(--text);
  }
  
  .byline-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.82rem;
    color: var(--muted);
    margin-bottom: 28px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }
  .byline-bar a { color: var(--gold); text-decoration: none; }
  .byline-bar a:hover { text-decoration: underline; }

  .answer-box {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-left: 4px solid var(--gold);
    border-radius: 8px;
    padding: 22px 24px;
    margin-bottom: 32px;
    font-size: 1.05rem;
    line-height: 1.65;
    color: oklch(0.92 0.005 95);
  }
  .answer-box strong { color: var(--text); }

  .quick-facts-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 24px;
    margin: 28px 0 36px;
  }
  .quick-facts-header {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--gold);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .quick-facts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.88rem;
  }
  .fact-item {
    background: oklch(0.08 0.004 95);
    padding: 12px 14px;
    border-radius: 6px;
    border: 1px solid var(--border);
  }
  .fact-label { color: var(--muted); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
  .fact-value { color: var(--text); font-weight: 500; }

  p { color: oklch(0.85 0.005 95); margin-bottom: 20px; font-size: 1rem; }
  
  h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    margin-top: 44px;
    margin-bottom: 16px;
    color: var(--gold);
    line-height: 1.35;
  }
  
  h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.15rem;
    font-weight: 600;
    margin-top: 28px;
    margin-bottom: 12px;
    color: var(--text);
  }

  ul, ol { margin-left: 22px; margin-bottom: 22px; color: oklch(0.85 0.005 95); }
  li { margin-bottom: 10px; }
  a { color: var(--gold); text-decoration: none; }
  a:hover { text-decoration: underline; }
  
  table.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 28px 0 36px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.92rem;
    background: var(--bg-card);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--border);
  }
  table.data-table th, table.data-table td {
    padding: 14px 18px;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }
  table.data-table th {
    background: oklch(0.12 0.008 95);
    color: var(--gold);
    font-weight: 600;
    letter-spacing: 0.03em;
  }
  table.data-table tr:last-child td { border-bottom: none; }
  table.data-table tr:hover td { background: oklch(0.13 0.009 95); }

  .company-block, .cta-block {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 32px;
    margin-top: 48px;
    text-align: center;
  }
  .cta-block h3 { margin-top: 0; font-size: 1.3rem; margin-bottom: 12px; }
  .cta-block p { max-width: 580px; margin: 0 auto 20px; font-size: 0.95rem; }

  .btn {
    display: inline-block;
    background: var(--red);
    color: var(--text);
    font-family: 'Fraunces', Georgia, serif;
    font-weight: 600;
    font-size: 1rem;
    padding: 15px 34px;
    border-radius: 8px;
    border: 1px solid oklch(0.6 0.17 28);
    box-shadow: 0 4px 20px var(--red-glow), inset 0 1px 0 rgba(255,255,255,0.15);
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  .btn:hover {
    background: var(--red-hover);
    text-decoration: none;
    transform: translateY(-2px);
  }

  .btn-outline {
    display: inline-block;
    background: transparent;
    color: var(--gold);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 8px 18px;
    border-radius: 6px;
    border: 1px solid var(--gold);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .btn-outline:hover {
    background: rgba(201, 162, 75, 0.12);
    text-decoration: none;
  }

  .faq-accordion {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin: 24px 0 40px;
  }
  .faq-item {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 22px;
  }
  .faq-q {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 1.05rem;
    color: var(--text);
    margin-bottom: 8px;
  }
  .faq-a {
    color: oklch(0.80 0.006 95);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .figure-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 18px;
    margin: 28px 0 40px;
  }
  .figure-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px;
    transition: border-color 0.2s ease;
  }
  .figure-card:hover { border-color: var(--gold); }
  .figure-card h3 { margin-top: 0; font-size: 1.1rem; color: var(--gold); margin-bottom: 8px; }
  .figure-card p { font-size: 0.88rem; margin-bottom: 12px; color: var(--muted); }
  .figure-card a { font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; font-weight: 600; }

  .filter-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 24px 0 28px;
  }
  .filter-pill {
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--muted);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.84rem;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .filter-pill:hover, .filter-pill.active {
    background: var(--gold);
    color: oklch(0.06 0.002 95);
    border-color: var(--gold);
    font-weight: 600;
  }

  .interactive-puzzle-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 24px;
    margin: 28px 0;
  }
  .puzzle-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    font-family: 'Space Grotesk', sans-serif;
  }
  .puzzle-tag {
    background: oklch(0.15 0.01 95);
    color: var(--gold);
    font-size: 0.8rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid var(--border);
  }
  .solution-panel {
    display: none;
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid var(--border);
    font-size: 0.95rem;
    color: oklch(0.88 0.005 95);
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

  /* === RELATED RESEARCH LINKS & BACKLINK NETWORK === */
  .related-network-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 26px 28px;
    margin: 40px 0 32px;
  }
  .related-network-card h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.15rem;
    color: var(--gold);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .related-links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 14px;
  }
  .related-link-item {
    background: oklch(0.08 0.005 95 / 0.7);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
    text-decoration: none;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .related-link-item:hover {
    border-color: var(--gold);
    background: oklch(0.12 0.01 95 / 0.8);
    transform: translateY(-2px);
  }
  .related-link-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text);
  }
  .related-link-item:hover .related-link-title {
    color: var(--gold);
  }
  .related-link-desc {
    font-size: 0.8rem;
    color: var(--muted);
    line-height: 1.4;
  }

  /* === ACADEMIC CITATIONS & EXTERNAL AUTHORITY === */
  .citations-block {
    background: oklch(0.07 0.003 95 / 0.6);
    border: 1px solid var(--border);
    border-left: 3px solid var(--gold);
    border-radius: 8px;
    padding: 20px 24px;
    margin: 32px 0;
    font-size: 0.84rem;
  }
  .citations-block h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--gold);
    margin-bottom: 12px;
  }
  .citation-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .citation-list li {
    line-height: 1.5;
    color: oklch(0.78 0.006 95);
  }
  .citation-list a {
    color: var(--text);
    text-decoration: underline;
    text-decoration-color: rgba(201, 162, 75, 0.4);
    text-underline-offset: 3px;
    transition: color 0.15s ease;
  }
  .citation-list a:hover {
    color: var(--gold);
    text-decoration-color: var(--gold);
  }

  /* === EMBEDDABLE BACKLINK ASSET === */
  .embed-backlink-card {
    background: oklch(0.09 0.005 95 / 0.85);
    border: 1px dashed var(--border);
    border-radius: 8px;
    padding: 16px 20px;
    margin: 28px 0;
    font-size: 0.82rem;
  }
  .embed-backlink-card h4 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.88rem;
    color: var(--text);
    margin-bottom: 6px;
  }
  .embed-backlink-card p {
    color: var(--muted);
    margin-bottom: 8px;
    font-size: 0.8rem;
  }
  .citation-code-snippet {
    background: oklch(0.04 0.002 95);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 12px;
    overflow-x: auto;
    font-family: monospace;
    font-size: 0.76rem;
    color: var(--gold);
  }

  footer {
    text-align: center;
    padding: 40px 24px;
    font-size: 0.82rem;
    color: var(--muted);
    border-top: 1px solid var(--border);
    line-height: 1.8;
  }
  footer a { color: var(--muted); text-decoration: none; margin: 0 8px; }
  footer a:hover { color: var(--gold); }
`;

function buildHeaderSwitcher(currentLocale = 'en', canonicalUrl = '') {
  let subPath = '';
  try {
    const urlObj = new URL(canonicalUrl);
    subPath = urlObj.pathname.replace(/^\/[a-z]{2}(\/|$)/, '$1').replace(/^\//, '');
  } catch (_) {}
  const pathSuffix = subPath ? `/${subPath}` : '';

  const localesList = [
    { code: 'en', name: 'English', endonym: 'English', href: `https://iq-test.icu${pathSuffix}` },
    { code: 'de', name: 'German', endonym: 'Deutsch', href: `https://iq-test.icu/de${pathSuffix}` },
    { code: 'fr', name: 'French', endonym: 'Français', href: `https://iq-test.icu/fr${pathSuffix}` },
    { code: 'es', name: 'Spanish', endonym: 'Español', href: `https://iq-test.icu/es${pathSuffix}` },
    { code: 'pt', name: 'Portuguese', endonym: 'Português', href: `https://iq-test.icu/pt${pathSuffix}` },
    { code: 'it', name: 'Italian', endonym: 'Italiano', href: `https://iq-test.icu/it${pathSuffix}` },
    { code: 'nl', name: 'Dutch', endonym: 'Nederlands', href: `https://iq-test.icu/nl${pathSuffix}` },
    { code: 'ja', name: 'Japanese', endonym: '日本語', href: `https://iq-test.icu/ja${pathSuffix}` },
    { code: 'ko', name: 'Korean', endonym: '한국어', href: `https://iq-test.icu/ko${pathSuffix}` },
    { code: 'zh', name: 'Chinese', endonym: '简体中文', href: `https://iq-test.icu/zh${pathSuffix}` },
    { code: 'ar', name: 'Arabic', endonym: 'العربية', href: `https://iq-test.icu/ar${pathSuffix}` },
    { code: 'hi', name: 'Hindi', endonym: 'हिन्दी', href: `https://iq-test.icu/hi${pathSuffix}` },
    { code: 'tl', name: 'Tagalog', endonym: 'Tagalog', href: `https://iq-test.icu/tl${pathSuffix}` }
  ];

  const currentObj = localesList.find(l => l.code === currentLocale) || localesList[0];

  return `
<header class="site-header" id="siteHeader">
  <div class="site-header-inner">
    <a href="/" class="site-logo-link" aria-label="IQ Test Home">
      <img src="/wordmark.webp" alt="IQ·Test" style="height:28px; width:auto; display:block;" onerror="this.style.display='none'">
    </a>
    <div class="header-lang-wrapper" id="headerLangWrapper">
      <button class="lang-btn" id="headerLangBtn" aria-expanded="false" aria-haspopup="true" aria-controls="headerLangDropdown" onclick="toggleHeaderLangMenu(event)">
        <span class="globe-icon" aria-hidden="true">🌐</span>
        <span class="lang-current-label">${currentObj.endonym}</span>
        <svg class="chevron-icon" aria-hidden="true" viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M3.2 5.2a.75.75 0 0 1 1.06 0L8 8.94l3.74-3.74a.75.75 0 1 1 1.06 1.06l-4.27 4.27a.75.75 0 0 1-1.06 0L3.2 6.26a.75.75 0 0 1 0-1.06z"/></svg>
      </button>
      <nav id="headerLangDropdown" class="lang-dropdown" aria-label="Language Selector" hidden>
        <div class="lang-dropdown-inner">
          <div class="lang-dropdown-title">Select Language / Sprache wählen</div>
          <div class="lang-grid">
            ${localesList.map(l => `<a href="${l.href}" class="lang-option${l.code === currentLocale ? ' active' : ''}" hreflang="${l.code}" lang="${l.code}"><span class="lang-code">${l.code.toUpperCase()}</span> ${l.endonym}</a>`).join('\n            ')}
          </div>
        </div>
      </nav>
    </div>
  </div>
</header>`;
}

function buildRelatedLinks(canonicalUrl) {
  let path = '';
  try {
    const urlObj = new URL(canonicalUrl);
    path = urlObj.pathname;
  } catch (_) {}

  let links = [];

  if (path.includes('/iq-scores/')) {
    links = [
      { url: '/iq-scores/iq-scale-chart', title: 'IQ Scale Chart & Standard Classifications', desc: 'Detailed breakdown of standard deviation thresholds and Wechsler categories.' },
      { url: '/iq-scores/iq-percentile-calculator', title: 'IQ Percentile Calculator & Normal Curve', desc: 'Convert any deviation IQ into exact population percentiles with interactive distribution.' },
      { url: '/iq-scores/average-iq', title: 'What is the Average IQ Score?', desc: 'Global normative baselines, the Flynn Effect, and population standard distributions.' },
      { url: '/iq-scores/high-iq-genius-range', title: 'High IQ & Genius Score Criteria', desc: 'Mensa qualifying standards (130+) and cognitive characteristics of the top 2%.' },
      { url: '/historical-figures-iq', title: 'Historical Minds & Cognitive Matching', desc: 'Discover how Einstein, Da Vinci, Tesla, and Curie compare on cognitive trait scales.' },
      { url: '/cognitive-skills/pattern-recognition', title: 'Pattern Recognition & Matrix Reasoning', desc: 'Understanding non-verbal fluid intelligence and spatial problem solving.' }
    ];
  } else if (path.includes('/historical-figures')) {
    links = [
      { url: '/historical-figures/albert-einstein-iq', title: 'Albert Einstein IQ & Thought Experiments', desc: 'Spatial-visual reasoning models and relativistic physics formulation.' },
      { url: '/historical-figures/leonardo-da-vinci-iq', title: 'Leonardo da Vinci Polymathic Profile', desc: 'Anatomical deduction, mechanical engineering, and artistic synthesis.' },
      { url: '/historical-figures/nikola-tesla-iq', title: 'Nikola Tesla Visualization Capacity', desc: 'Eidetic internal prototyping and electromagnetic system designs.' },
      { url: '/historical-figures/marie-curie-iq', title: 'Marie Curie Analytical Methodology', desc: 'Empirical rigor, chemical isolation, and dual Nobel Prize achievements.' },
      { url: '/historical-figures/isaac-newton-iq', title: 'Isaac Newton Mathematical Mind', desc: 'Classical mechanics formulation, calculus, and axiomatic deduction.' },
      { url: '/iq-scores/high-iq-genius-range', title: 'Genius IQ Score Distribution', desc: 'Statistical definition of genius-level deviation intelligence.' },
      { url: '/cognitive-skills/logical-reasoning', title: 'Logical Deduction & Syllogisms', desc: 'Propositional inference, conditional arguments, and cognitive speed.' }
    ];
  } else if (path.includes('/cognitive-skills/')) {
    links = [
      { url: '/cognitive-skills/logical-reasoning', title: 'Logical Deduction & Argument Analysis', desc: 'Formal inference, syllogistic validity, and deductive speed.' },
      { url: '/cognitive-skills/numerical-reasoning', title: 'Numerical Pattern & Quantitative Logic', desc: 'Arithmetic sequences, proportional relations, and quantitative problem solving.' },
      { url: '/cognitive-skills/verbal-reasoning', title: 'Verbal Comprehension & Analogies', desc: 'Semantic relation mapping, vocabulary precision, and linguistic logic.' },
      { url: '/cognitive-skills/pattern-recognition', title: 'Pattern Recognition & Matrix Reasoning', desc: 'Abstract matrix analysis, progressive series, and fluid g-factor.' },
      { url: '/cognitive-test-vs-iq-test', title: 'Cognitive Test vs. Clinical IQ Test', desc: 'Aptitude mapping differences and psychometric construct definitions.' },
      { url: '/iq-scores/what-is-a-good-iq-score', title: 'What Is a Good IQ Score?', desc: 'Percentile rankings and cognitive classification benchmarks.' }
    ];
  } else {
    links = [
      { url: '/iq-scores/what-is-a-good-iq-score', title: 'What Is a Good IQ Score?', desc: 'Standard deviation ranges and population percentiles explained.' },
      { url: '/iq-scores/iq-scale-chart', title: 'IQ Scale Chart & Classifications', desc: 'Wechsler and Stanford-Binet score distribution reference.' },
      { url: '/historical-figures-iq', title: 'Historical Thinkers & IQ Estimates', desc: 'Cognitive profiles of history’s greatest scientists and inventors.' },
      { url: '/cognitive-skills/', title: 'Cognitive Skills & Reasoning Domains', desc: 'Deep dive into numerical, verbal, logical, and spatial reasoning.' },
      { url: '/methodology', title: 'Assessment Methodology', desc: 'Item construction, deviation scoring formulas, and test design standards.' },
      { url: '/editorial-standards', title: 'Editorial Standards & Fact Checking', desc: 'Our commitment to peer-reviewed scientific accuracy and transparency.' }
    ];
  }

  // Filter out self-link
  const filtered = links.filter(l => l.url !== path && l.url !== path.replace(/\.html$/, '') && !path.endsWith(l.url));

  return `
  <div class="related-network-card">
    <h3>🔗 Related Research &amp; Cognitive Analyses</h3>
    <div class="related-links-grid">
      ${filtered.map(l => `
        <a href="${l.url}" class="related-link-item">
          <span class="related-link-title">${l.title}</span>
          <span class="related-link-desc">${l.desc}</span>
        </a>`).join('\n')}
    </div>
  </div>`;
}

function buildAcademicCitations(canonicalUrl) {
  let path = '';
  try {
    const urlObj = new URL(canonicalUrl);
    path = urlObj.pathname;
  } catch (_) {}

  const citations = [
    { source: 'American Psychological Association (APA)', title: 'Clinical and Psychometric Standards for Cognitive Assessment', url: 'https://www.apa.org/topics/intelligence' },
    { source: 'National Center for Biotechnology Information (NCBI)', title: 'Wechsler Adult Intelligence Scale Normative Standardization & Deviation Scoring', url: 'https://pubmed.ncbi.nlm.nih.gov/22055279/' },
    { source: 'Mensa International', title: 'Qualifying Score Thresholds on Standardized Intelligence Tests (Top 2%)', url: 'https://www.mensa.org/mensa-iq-challenge' },
    { source: 'Nature Neuroscience', title: 'Neural Substrates of Matrix Reasoning and General Fluid Intelligence', url: 'https://www.nature.com/subjects/cognitive-neuroscience' },
    { source: 'Stanford University Binet Archive', title: 'Historical Development of the Binet-Simon Intelligence Scale', url: 'https://stanford.edu' },
    { source: 'Wikidata Psychometric Ontology', title: 'Intelligence Quotient Concept Representation (Q131549)', url: 'https://www.wikidata.org/wiki/Q131549' }
  ];

  if (path.includes('historical-figures')) {
    citations.push(
      { source: 'Albert Einstein Archives', title: 'Cognitive Methods and Thought Experiments in Special Relativity', url: 'https://www.albert-einstein.org/' },
      { source: 'Leonardo da Vinci Codices', title: 'Polymathic Synthesis and Spatial Reasoning in Renaissance Science', url: 'https://en.wikipedia.org/wiki/Leonardo_da_Vinci' }
    );
  }

  const cleanSlug = path.replace(/[-/]/g, ' ').trim().toUpperCase() || 'COGNITIVE ASSESSMENT INDEX';

  return `
  <div class="citations-block">
    <h3>📚 Scientific References &amp; Authoritative Citations</h3>
    <ul class="citation-list">
      ${citations.map(c => `
        <li>
          <a href="${c.url}" target="_blank" rel="noopener noreferrer">
            <strong>${c.source}</strong> — <em>${c.title}</em>
          </a>
        </li>`).join('\n')}
    </ul>
  </div>
  <div class="embed-backlink-card">
    <h4>Cite This Page or Reference Our Psychometric Data</h4>
    <p>Researchers, educators, and content publishers may reference this analysis using the citation hyperlink below:</p>
    <div class="citation-code-snippet">
      <code>&lt;a href="${canonicalUrl}" title="${escapeAttr(canonicalUrl)}"&gt;APEX IQ Test — ${escapeAttr(cleanSlug)}&lt;/a&gt;</code>
    </div>
  </div>`;
}

function buildHtmlPage({
  relPath,
  title,
  description,
  canonical,
  breadcrumbs,
  article,
  faqs,
  h1,
  answerBlock,
  bodyHtml,
  customHead = '',
  customScript = ''
}) {
  const jsonLd = buildJsonLdGraph({
    pageUrl: canonical,
    pageTitle: title,
    pageDescription: description,
    breadcrumbs,
    article,
    faqs
  });

  const breadcrumbsHtml = breadcrumbs && breadcrumbs.length > 0 ? `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      ${breadcrumbs.map((bc, idx) => {
        if (idx === breadcrumbs.length - 1) {
          return `<span class="current">${bc.name}</span>`;
        }
        return `<a href="${bc.url}">${bc.name}</a><span class="sep">/</span>`;
      }).join(' ')}
    </nav>` : '';

  const bylineHtml = article ? `
    <div class="byline-bar">
      <span>Published: <time datetime="2026-08-14">August 14, 2026</time></span>
      <span>•</span>
      <span>Reviewed by: <a href="/about">APEX Business Systems Ltd.</a></span>
      <span>•</span>
      <span><a href="/editorial-standards">Editorial Standards</a></span>
    </div>` : '';

  const answerBlockHtml = answerBlock ? `
    <div class="answer-box">
      ${answerBlock}
    </div>` : '';

  const faqsHtml = faqs && faqs.length > 0 ? `
    <h2>Frequently Asked Questions</h2>
    <div class="faq-accordion">
      ${faqs.map(f => `
        <div class="faq-item">
          <div class="faq-q">${f.q}</div>
          <div class="faq-a">${f.a}</div>
        </div>`).join('\n')}
    </div>` : '';

  const relatedLinksHtml = buildRelatedLinks(canonical);
  const academicCitationsHtml = buildAcademicCitations(canonical);

  const headerHtml = buildHeaderSwitcher('en', canonical);

  const headerScript = `
<script>
function toggleHeaderLangMenu(e) {
  if (e) e.stopPropagation();
  var btn = document.getElementById('headerLangBtn');
  var menu = document.getElementById('headerLangDropdown');
  if (!btn || !menu) return;
  var isExpanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !isExpanded);
  menu.hidden = isExpanded;
}
document.addEventListener('click', function(e) {
  var wrapper = document.getElementById('headerLangWrapper');
  if (wrapper && !wrapper.contains(e.target)) {
    var btn = document.getElementById('headerLangBtn');
    var menu = document.getElementById('headerLangDropdown');
    if (btn && menu) {
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  }
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var btn = document.getElementById('headerLangBtn');
    var menu = document.getElementById('headerLangDropdown');
    if (btn && menu) {
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      btn.focus();
    }
  }
});
</script>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeAttr(title)}</title>
<meta name="description" content="${escapeAttr(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${escapeAttr(title)}">
<meta property="og:description" content="${escapeAttr(description)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="https://iq-test.icu/og.png">
<meta property="og:site_name" content="IQ Test">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttr(title)}">
<meta name="twitter:description" content="${escapeAttr(description)}">
<meta name="twitter:image" content="https://iq-test.icu/og.png">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<link rel="icon" type="image/webp" href="/favicon.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Fraunces:opsz,wght@9..144,300..700&display=swap" rel="stylesheet">
<style>
${COMMON_STYLES}
</style>
${customHead}
<script type="application/ld+json">
${jsonLd}
</script>
</head>
<body>
${headerHtml}
<div class="page">
  ${breadcrumbsHtml}
  <h1>${h1}</h1>
  ${bylineHtml}
  ${answerBlockHtml}
  ${bodyHtml}
  ${faqsHtml}
  ${relatedLinksHtml}
  ${academicCitationsHtml}
  
  <div class="cta-block">
    <h3>Discover Your Cognitive Profile</h3>
    <p>Take the free 16-question cognitive assessment to see your baseline score across four reasoning domains and discover which historical thinker matches your problem-solving style.</p>
    <a href="/" class="btn">Take the Free Test</a>
  </div>
</div>

<footer>
  <a href="/">Home</a> &nbsp;&middot;&nbsp;
  <a href="/iq-scores/">IQ Scores</a> &nbsp;&middot;&nbsp;
  <a href="/historical-figures-iq">Historical Minds</a> &nbsp;&middot;&nbsp;
  <a href="/cognitive-skills/">Reasoning Domains</a> &nbsp;&middot;&nbsp;
  <a href="/what-is-an-iq-test">What is an IQ Test?</a>
  <br><br>
  <a href="/free-iq-test-online">Free IQ Test Online</a> &nbsp;&middot;&nbsp;
  <a href="/are-online-iq-tests-accurate">Test Accuracy</a> &nbsp;&middot;&nbsp;
  <a href="/types-of-iq-tests">Types of Tests</a> &nbsp;&middot;&nbsp;
  <a href="/methodology">Methodology</a> &nbsp;&middot;&nbsp;
  <a href="/editorial-standards">Editorial Standards</a>
  <br><br>
  <a href="/about">About</a> &nbsp;&middot;&nbsp;
  <a href="/support">Support</a> &nbsp;&middot;&nbsp;
  <a href="/contact">Contact</a> &nbsp;&middot;&nbsp;
  <a href="/privacy">Privacy</a> &nbsp;&middot;&nbsp;
  <a href="/terms">Terms</a>
  <br><br>
  &copy; 2026 APEX Business Systems Ltd. &nbsp;&middot;&nbsp; Edmonton, AB, Canada &nbsp;&middot;&nbsp; <a href="mailto:support@iq-test.icu">support@iq-test.icu</a>
</footer>
${customScript}
${headerScript}
</body>
</html>
`;

  const destFile = path.join(publicDir, relPath);
  fs.writeFileSync(destFile, html, 'utf8');
  console.log(`Generated: ${relPath} (${title.length} chars title, ${description.length} chars desc)`);
}

module.exports = {
  buildJsonLdGraph,
  buildHtmlPage,
  escapeAttr,
  publicDir
};
