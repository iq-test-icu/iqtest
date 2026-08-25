/**
 * Sitemap & Redirects Generator
 * T1.1, T1.2, T5.1
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// List all 28 target canonical URLs (§4.1 Target Architecture)
const canonicalUrls = [
  { path: '', file: 'index.html', date: '2026-08-14' },
  
  // Hub A — IQ Scores
  { path: 'iq-scores/', file: 'iq-scores/index.html', date: '2026-08-14' },
  { path: 'iq-scores/what-is-a-good-iq-score', file: 'iq-scores/what-is-a-good-iq-score.html', date: '2026-08-14' },
  { path: 'iq-scores/iq-scale-chart', file: 'iq-scores/iq-scale-chart.html', date: '2026-08-14' },
  { path: 'iq-scores/average-iq', file: 'iq-scores/average-iq.html', date: '2026-08-14' },
  { path: 'iq-scores/iq-percentile-calculator', file: 'iq-scores/iq-percentile-calculator.html', date: '2026-08-14' },
  { path: 'iq-scores/high-iq-genius-range', file: 'iq-scores/high-iq-genius-range.html', date: '2026-08-14' },
  { path: 'iq-scores/iq-score-by-age', file: 'iq-scores/iq-score-by-age.html', date: '2026-08-14' },

  // Hub B — Historical Figures
  { path: 'historical-figures-iq', file: 'historical-figures-iq.html', date: '2026-08-14' },
  { path: 'historical-figures/albert-einstein-iq', file: 'historical-figures/albert-einstein-iq.html', date: '2026-08-14' },
  { path: 'historical-figures/leonardo-da-vinci-iq', file: 'historical-figures/leonardo-da-vinci-iq.html', date: '2026-08-14' },
  { path: 'historical-figures/nikola-tesla-iq', file: 'historical-figures/nikola-tesla-iq.html', date: '2026-08-14' },
  { path: 'historical-figures/marie-curie-iq', file: 'historical-figures/marie-curie-iq.html', date: '2026-08-14' },
  { path: 'historical-figures/isaac-newton-iq', file: 'historical-figures/isaac-newton-iq.html', date: '2026-08-14' },
  { path: 'historical-figures/stephen-hawking-iq', file: 'historical-figures/stephen-hawking-iq.html', date: '2026-08-14' },
  { path: 'historical-figures/highest-iq-in-history', file: 'historical-figures/highest-iq-in-history.html', date: '2026-08-14' },

  // Hub C — Cognitive Skills
  { path: 'cognitive-skills/', file: 'cognitive-skills/index.html', date: '2026-08-14' },
  { path: 'cognitive-skills/logical-reasoning', file: 'cognitive-skills/logical-reasoning.html', date: '2026-08-14' },
  { path: 'cognitive-skills/numerical-reasoning', file: 'cognitive-skills/numerical-reasoning.html', date: '2026-08-14' },
  { path: 'cognitive-skills/verbal-reasoning', file: 'cognitive-skills/verbal-reasoning.html', date: '2026-08-14' },
  { path: 'cognitive-skills/pattern-recognition', file: 'cognitive-skills/pattern-recognition.html', date: '2026-08-14' },

  // Core Explanatory & Trust Pages
  { path: 'what-is-an-iq-test', file: 'what-is-an-iq-test.html', date: '2026-08-14' },
  { path: 'free-iq-test-online', file: 'free-iq-test-online.html', date: '2026-08-14' },
  { path: 'cognitive-test-vs-iq-test', file: 'cognitive-test-vs-iq-test.html', date: '2026-08-14' },
  { path: 'methodology', file: 'methodology.html', date: '2026-08-14' },
  { path: 'are-online-iq-tests-accurate', file: 'are-online-iq-tests-accurate.html', date: '2026-08-14' },
  { path: 'types-of-iq-tests', file: 'types-of-iq-tests.html', date: '2026-08-14' },
  { path: 'editorial-standards', file: 'editorial-standards.html', date: '2026-08-14' },

  // Utility Pages
  { path: 'about', file: 'about.html', date: '2026-08-14' },
  { path: 'support', file: 'support.html', date: '2026-08-14' },
  { path: 'contact', file: 'contact.html', date: '2026-08-14' },
  { path: 'privacy', file: 'privacy.html', date: '2026-08-14' },
  { path: 'terms', file: 'terms.html', date: '2026-08-14' }
];

// 1. Generate sitemap.xml
let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

canonicalUrls.forEach(item => {
  const fullUrl = `https://iq-test.icu/${item.path}`;
  sitemapXml += `  <url>\n    <loc>${fullUrl}</loc>\n    <lastmod>${item.date}</lastmod>\n  </url>\n`;
});

sitemapXml += '</urlset>\n';

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`sitemap.xml generated with ${canonicalUrls.length} canonical URLs.`);

// 2. Generate _redirects
let redirects = `# 301 Redirects: .html extension removal for clean URLs\n`;
redirects += `/about.html /about 301\n`;
redirects += `/cognitive-test-vs-iq-test.html /cognitive-test-vs-iq-test 301\n`;
redirects += `/free-iq-test-online.html /free-iq-test-online 301\n`;
redirects += `/historical-figures-iq.html /historical-figures-iq 301\n`;
redirects += `/methodology.html /methodology 301\n`;
redirects += `/privacy.html /privacy 301\n`;
redirects += `/support.html /support 301\n`;
redirects += `/what-is-an-iq-test.html /what-is-an-iq-test 301\n`;
redirects += `/are-online-iq-tests-accurate.html /are-online-iq-tests-accurate 301\n`;
redirects += `/types-of-iq-tests.html /types-of-iq-tests 301\n`;
redirects += `/editorial-standards.html /editorial-standards 301\n`;
redirects += `/contact.html /contact 301\n`;
redirects += `/terms.html /terms 301\n`;

// Hub A redirects
redirects += `/iq-scores/what-is-a-good-iq-score.html /iq-scores/what-is-a-good-iq-score 301\n`;
redirects += `/iq-scores/iq-scale-chart.html /iq-scores/iq-scale-chart 301\n`;
redirects += `/iq-scores/average-iq.html /iq-scores/average-iq 301\n`;
redirects += `/iq-scores/iq-percentile-calculator.html /iq-scores/iq-percentile-calculator 301\n`;
redirects += `/iq-scores/high-iq-genius-range.html /iq-scores/high-iq-genius-range 301\n`;
redirects += `/iq-scores/iq-score-by-age.html /iq-scores/iq-score-by-age 301\n`;

// Hub B redirects
redirects += `/historical-figures/albert-einstein-iq.html /historical-figures/albert-einstein-iq 301\n`;
redirects += `/historical-figures/leonardo-da-vinci-iq.html /historical-figures/leonardo-da-vinci-iq 301\n`;
redirects += `/historical-figures/nikola-tesla-iq.html /historical-figures/nikola-tesla-iq 301\n`;
redirects += `/historical-figures/marie-curie-iq.html /historical-figures/marie-curie-iq 301\n`;
redirects += `/historical-figures/isaac-newton-iq.html /historical-figures/isaac-newton-iq 301\n`;
redirects += `/historical-figures/stephen-hawking-iq.html /historical-figures/stephen-hawking-iq 301\n`;
redirects += `/historical-figures/highest-iq-in-history.html /historical-figures/highest-iq-in-history 301\n`;

// Hub C redirects
redirects += `/cognitive-skills/logical-reasoning.html /cognitive-skills/logical-reasoning 301\n`;
redirects += `/cognitive-skills/numerical-reasoning.html /cognitive-skills/numerical-reasoning 301\n`;
redirects += `/cognitive-skills/verbal-reasoning.html /cognitive-skills/verbal-reasoning 301\n`;
redirects += `/cognitive-skills/pattern-recognition.html /cognitive-skills/pattern-recognition 301\n`;

fs.writeFileSync(path.join(publicDir, '_redirects'), redirects, 'utf8');
console.log('_redirects generated with all 301 clean URL mappings.');
