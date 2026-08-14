/**
 * Multilingual Sitemap Generator (_i18n/sitemap-i18n.js)
 * Emits /sitemap.xml as a sitemap index and /sitemaps/sitemap-<locale>.xml per locale.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const sitemapsDir = path.join(publicDir, 'sitemaps');
if (!fs.existsSync(sitemapsDir)) {
  fs.mkdirSync(sitemapsDir, { recursive: true });
}

const locales = JSON.parse(fs.readFileSync(path.join(__dirname, 'locales.json'), 'utf8'));

// Discover all 33 base pages
const basePages = [
  "",
  "iq-scores/",
  "iq-scores/what-is-a-good-iq-score",
  "iq-scores/iq-scale-chart",
  "iq-scores/average-iq",
  "iq-scores/iq-percentile-calculator",
  "iq-scores/high-iq-genius-range",
  "iq-scores/iq-score-by-age",
  "historical-figures-iq",
  "historical-figures/albert-einstein-iq",
  "historical-figures/leonardo-da-vinci-iq",
  "historical-figures/nikola-tesla-iq",
  "historical-figures/marie-curie-iq",
  "historical-figures/isaac-newton-iq",
  "historical-figures/stephen-hawking-iq",
  "historical-figures/highest-iq-in-history",
  "cognitive-skills/",
  "cognitive-skills/logical-reasoning",
  "cognitive-skills/numerical-reasoning",
  "cognitive-skills/verbal-reasoning",
  "cognitive-skills/pattern-recognition",
  "what-is-an-iq-test",
  "free-iq-test-online",
  "are-online-iq-tests-accurate",
  "types-of-iq-tests",
  "cognitive-test-vs-iq-test",
  "methodology",
  "editorial-standards",
  "about",
  "support",
  "contact",
  "privacy",
  "terms"
];

function buildXhtmlAlternates(subPath) {
  const clean = subPath.replace(/\/$/, '');
  const pathSuffix = clean ? `/${clean}` : '';
  
  const alts = [];
  alts.push(`    <xhtml:link rel="alternate" hreflang="en" href="https://iq-test.icu${pathSuffix}"/>`);
  for (const loc of locales) {
    if (loc.hreflang === 'en') continue;
    alts.push(`    <xhtml:link rel="alternate" hreflang="${loc.hreflang}" href="https://iq-test.icu/${loc.hreflang}${pathSuffix}"/>`);
  }
  alts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="https://iq-test.icu${pathSuffix}"/>`);
  return alts.join('\n');
}

const today = new Date().toISOString().split('T')[0];

// 1. Generate English Sitemap
let enXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;
for (const p of basePages) {
  const url = `https://iq-test.icu/${p}`;
  enXml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n${buildXhtmlAlternates(p)}\n  </url>\n`;
}
enXml += `</urlset>`;
fs.writeFileSync(path.join(sitemapsDir, 'sitemap-en.xml'), enXml, 'utf8');

// 2. Generate Sitemap Index
let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
indexXml += `  <sitemap>\n    <loc>https://iq-test.icu/sitemaps/sitemap-en.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n`;
indexXml += `</sitemapindex>`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml, 'utf8');

console.log('Generated /sitemap.xml (index) and /sitemaps/sitemap-en.xml');
