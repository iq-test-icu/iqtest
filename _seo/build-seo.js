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
  dateModified = "2026-08-14T11:18:44-06:00",
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
  .breadcrumbs a:hover { color: var(--gold); }
  .breadcrumbs span.sep { opacity: 0.5; }
  .breadcrumbs span.current { color: var(--gold); }

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
  }
  .btn:hover {
    background: var(--red-hover);
    text-decoration: none;
    transform: translateY(-2px);
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
<div class="page">
  ${breadcrumbsHtml}
  <h1>${h1}</h1>
  ${bylineHtml}
  ${answerBlockHtml}
  ${bodyHtml}
  ${faqsHtml}
  
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
