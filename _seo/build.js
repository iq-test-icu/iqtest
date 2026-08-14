/**
 * Master SEO Build Script
 * Builds all 33 HTML pages, JSON-LD schemas, sitemap, and redirects in deterministic order.
 */

const { execSync } = require('child_process');
const path = require('path');

const seoDir = __dirname;

const buildScripts = [
  'generate-hub-b.js',          // Hub B: 7 historical figure pages + /historical-figures-iq with filter pills
  'generate-hub-a.js',          // Hub A: 6 score pages + /iq-scores/ index + dynamic SVG bell curve
  'generate-hub-c.js',          // Hub C: 4 reasoning pages + /cognitive-skills/ index + logic walkthroughs
  'generate-trust-and-utility.js', // Trust & Utility: editorial, contact, terms, accuracy, types
  'generate-existing-upgrades.js', // 7 existing pages upgraded
  'upgrade-index.js',           // Homepage surgical upgrade
  'generate-sitemap-and-redirects.js', // sitemap.xml and _redirects
  'generate-completion-reports.js' // BASELINE.md, VERIFICATION.md, COMPLETION.md
];

console.log('==================================================================');
console.log('          APEX-SEO MASTER PRODUCTION BUILD PIPELINE               ');
console.log('==================================================================\n');

for (const script of buildScripts) {
  const scriptPath = path.join(seoDir, script);
  console.log(`[BUILD] Running ${script}...`);
  try {
    const out = execSync(`node "${scriptPath}"`, { cwd: path.join(seoDir, '..'), encoding: 'utf8' });
    if (out.trim()) {
      console.log(out.trim().split('\n').map(l => `  ${l}`).join('\n'));
    }
  } catch (err) {
    console.error(`[ERROR] Build step ${script} failed:`, err.message);
    process.exit(1);
  }
}

console.log('\n==================================================================');
console.log('     ✓ APEX-SEO MASTER BUILD COMPLETE: ALL PAGES GENERATED        ');
console.log('==================================================================');
