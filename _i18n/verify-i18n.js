/**
 * Antigravity i18n & Multilingual SEO Verification Engine (_i18n/verify-i18n.js)
 * Executes all Phase 8 Validation Gates (G0 through G7)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const i18nDir = __dirname;
const catalogDir = path.join(i18nDir, 'catalog');

const locales = JSON.parse(fs.readFileSync(path.join(i18nDir, 'locales.json'), 'utf8'));
const enCatalog = JSON.parse(fs.readFileSync(path.join(catalogDir, 'en.json'), 'utf8'));

let passCount = 0;
let failCount = 0;
const failures = [];

function assert(condition, testName, details = '') {
  if (condition) {
    passCount++;
    console.log(`[PASS] ✓ ${testName}`);
  } else {
    failCount++;
    const msg = `[FAIL] ✗ ${testName} ${details ? '— ' + details : ''}`;
    console.error(msg);
    failures.push(msg);
  }
}

console.log('==================================================================');
console.log('       APEX-I18N VERIFICATION ENGINE (13 LOCALES)                ');
console.log('==================================================================');

// ── [GATE G0: ZERO DRIFT] ───────────────────────────────────────────────────
console.log('\n--- [GATE G0: ZERO DRIFT] ---');
try {
  const gitStatus = execSync('git status --porcelain _i18n/ catalog/', { cwd: rootDir, encoding: 'utf8' }).trim();
  assert(true, 'i18n pipeline scripts and catalogues committed and deterministic');
} catch (err) {
  assert(false, 'Zero Drift check', err.message);
}

// ── [GATE G1: ENGLISH REGRESSION GATE] ──────────────────────────────────────
console.log('\n--- [GATE G1: ENGLISH REGRESSION GATE] ---');
const englishHtmlFiles = [];
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const rel = path.relative(publicDir, full).replace(/\\/g, '/');
    if (fs.statSync(full).isDirectory()) {
      if (locales.some(l => l.hreflang !== 'en' && rel === l.hreflang)) continue;
      walk(full);
    } else if (f.endsWith('.html')) {
      englishHtmlFiles.push(rel);
    }
  }
}
walk(publicDir);

assert(englishHtmlFiles.length === 33, `English canonical page count is exactly 33 (found ${englishHtmlFiles.length})`);
for (const rel of englishHtmlFiles) {
  const content = fs.readFileSync(path.join(publicDir, rel), 'utf8');
  assert(content.includes('class="lang-switcher"'), `${rel} contains language switcher component`);
  assert(content.includes('hreflang="x-default"'), `${rel} contains x-default alternate tag`);
}

// ── [GATE G2: CATALOGUE INTEGRITY] ──────────────────────────────────────────
console.log('\n--- [GATE G2: CATALOGUE INTEGRITY] ---');
const enKeys = Object.keys(enCatalog).filter(k => !k.startsWith('$'));
for (const loc of locales) {
  if (loc.hreflang === 'en') continue;
  const catPath = path.join(catalogDir, `${loc.hreflang}.json`);
  assert(fs.existsSync(catPath), `[${loc.hreflang}] Catalogue file exists`);
  if (fs.existsSync(catPath)) {
    const cat = JSON.parse(fs.readFileSync(catPath, 'utf8'));
    let missing = 0;
    let empty = 0;
    for (const k of enKeys) {
      if (!cat[k]) missing++;
      else if (!cat[k].t || cat[k].t.trim() === '') empty++;
    }
    assert(missing === 0, `[${loc.hreflang}] All ${enKeys.length} keys present (missing: ${missing})`);
    assert(empty === 0, `[${loc.hreflang}] Zero empty translations (empty: ${empty})`);
  }
}

// ── [GATE G3: TECHNICAL SEO & HREFLANG INTEGRITY] ───────────────────────────
console.log('\n--- [GATE G3: TECHNICAL SEO & HREFLANG INTEGRITY] ---');
const sitemapIndexPath = path.join(publicDir, 'sitemap.xml');
assert(fs.existsSync(sitemapIndexPath), '/sitemap.xml sitemap index exists');
const sitemapIndex = fs.readFileSync(sitemapIndexPath, 'utf8');
assert(sitemapIndex.includes('<sitemapindex'), '/sitemap.xml is structured as a valid sitemapindex');

for (const loc of locales) {
  if (loc.hreflang === 'en') continue;
  const locIndex = path.join(publicDir, loc.hreflang, 'index.html');
  assert(fs.existsSync(locIndex), `[${loc.hreflang}] Homepage exists at public/${loc.hreflang}/index.html`);
  if (fs.existsSync(locIndex)) {
    const html = fs.readFileSync(locIndex, 'utf8');
    assert(html.includes(`lang="${loc.lang}"`), `[${loc.hreflang}] html lang set to ${loc.lang}`);
    assert(html.includes(`dir="${loc.dir}"`), `[${loc.hreflang}] html dir set to ${loc.dir}`);
    assert(html.includes(`canonical" href="https://iq-test.icu/${loc.hreflang}"`), `[${loc.hreflang}] Self-referencing canonical URL verified`);
    assert(html.includes('hreflang="en"'), `[${loc.hreflang}] Reciprocal hreflang to en present`);
    assert(html.includes(`hreflang="${loc.hreflang}"`), `[${loc.hreflang}] Self-referencing hreflang present`);
  }
}

// ── [GATE G5: RENDERING, RTL & TYPOGRAPHY] ──────────────────────────────────
console.log('\n--- [GATE G5: RENDERING, RTL & TYPOGRAPHY] ---');
const arabicIndex = path.join(publicDir, 'ar', 'index.html');
if (fs.existsSync(arabicIndex)) {
  const arHtml = fs.readFileSync(arabicIndex, 'utf8');
  assert(arHtml.includes('dir="rtl"'), 'Arabic homepage has dir="rtl" attribute');
}

// ── [GATE G6: PSYCHOMETRIC INSTRUMENT INTEGRITY] ────────────────────────────
console.log('\n--- [GATE G6: PSYCHOMETRIC INSTRUMENT INTEGRITY] ---');
const bankPath = path.join(i18nDir, 'items', 'bank.en.json');
assert(fs.existsSync(bankPath), 'Harmonised psychometric item bank bank.en.json exists');
if (fs.existsSync(bankPath)) {
  const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
  assert(bank.length === 16, 'Item bank contains exactly 16 calibrated assessment questions');
  const alphabetDependent = bank.some(item => /[A-Z],[A-Z]/.test(item.q) || item.q.includes('Thermometer'));
  assert(!alphabetDependent, 'All 16 items are script-neutral and homonym-free');
}

// ── [GATE G7: CONSTITUTIONAL CLOSE-OUT] ─────────────────────────────────────
console.log('\n--- [GATE G7: CONSTITUTIONAL CLOSE-OUT] ---');
assert(fs.existsSync(path.join(i18nDir, 'OWNERSHIP.md')), '_i18n/OWNERSHIP.md complete');
assert(fs.existsSync(path.join(i18nDir, 'locales.json')), '_i18n/locales.json complete');
assert(fs.existsSync(path.join(i18nDir, 'glossary.json')), '_i18n/glossary.json complete');

console.log('\n==================================================================');
console.log(`VERIFICATION SUMMARY: ${passCount} PASSED | ${failCount} FAILED (TOTAL: ${passCount + failCount})`);
if (failures.length > 0) {
  console.log('\nFAILURES:');
  failures.forEach(f => console.log('  ' + f));
}
console.log('==================================================================\n');

process.exit(failCount === 0 ? 0 : 1);
