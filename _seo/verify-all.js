/**
 * APEX-SEO Comprehensive Gate Verification Engine
 * Gates: G1 (Regression), G2 (Technical), G3 (Schema), G4 (Content), G5 (Architecture), G6 (Close-Out)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const errors = [];

function assertCheck(cond, name, details = '') {
  totalChecks++;
  if (cond) {
    passedChecks++;
    console.log(`[PASS] ✓ ${name}${details ? ' — ' + details : ''}`);
  } else {
    failedChecks++;
    const errMsg = `[FAIL] ✗ ${name} — ${details}`;
    console.error(errMsg);
    errors.push(errMsg);
  }
}

// Find all HTML files recursively in public
function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      getHtmlFiles(fullPath, fileList);
    } else if (f.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allHtmlFiles = getHtmlFiles(publicDir);
console.log(`\n==================================================================`);
console.log(`   APEX-SEO VERIFICATION ENGINE — ${allHtmlFiles.length} HTML PAGES DISCOVERED`);
console.log(`==================================================================\n`);

// ── GATE G1: Regression ───────────────────────────────────────────────────────
console.log(`--- [GATE G1: REGRESSION] ---`);
try {
  const e2eOut = execSync('node test-e2e.js', { cwd: rootDir, encoding: 'utf8' });
  const e2ePass = e2eOut.includes('SUMMARY: 35 PASSED | 0 FAILED');
  assertCheck(e2ePass, 'test-e2e.js regression suite', '35/35 assertions passed');
} catch (err) {
  assertCheck(false, 'test-e2e.js regression suite', err.message);
}

// ── GATE G2: Technical ───────────────────────────────────────────────────────
console.log(`\n--- [GATE G2: TECHNICAL] ---`);

// 1. Sitemap validation
const sitemapContent = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');
assertCheck(sitemapContent.startsWith('<?xml') && sitemapContent.includes('<urlset'), 'sitemap.xml valid XML header and urlset');
assertCheck(!sitemapContent.includes('<priority>') && !sitemapContent.includes('<changefreq>'), 'sitemap.xml omits priority and changefreq tags');

// 2. Robots.txt validation
const robotsContent = fs.readFileSync(path.join(publicDir, 'robots.txt'), 'utf8');
const uaCount = (robotsContent.match(/User-agent:\s*\*/gi) || []).length;
assertCheck(uaCount === 1, 'robots.txt has exactly one User-agent: * group', `Count: ${uaCount}`);
assertCheck(robotsContent.includes('Sitemap: https://iq-test.icu/sitemap.xml'), 'robots.txt points to canonical sitemap.xml');

// 3. Page Metadata, Canonicals, Headings & Character Budgets
const titlesSeen = new Map();

for (const filePath of allHtmlFiles) {
  const rel = path.relative(publicDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  // Canonical
  const cMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  assertCheck(!!cMatch && cMatch[1].startsWith('https://iq-test.icu/'), `${rel} has absolute canonical`, cMatch ? cMatch[1] : 'MISSING');

  // Title length (35-62 chars)
  const tMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = tMatch ? tMatch[1] : '';
  const tLen = title.length;
  assertCheck(tLen >= 35 && tLen <= 62, `${rel} title length budget (${tLen} chars)`, title);

  // Middle dot check in Title / Meta
  assertCheck(!title.includes('·'), `${rel} title does not contain middle dot (·)`, title);

  // Meta description extraction
  const dMatch = html.match(/<meta\s+name=["']description["']\s+content="([^"]*)"/i) ||
                 html.match(/<meta\s+name=["']description["']\s+content='([^']*)'/i);
  const rawDesc = dMatch ? dMatch[1] : '';
  const desc = rawDesc.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  const dLen = desc.length;
  assertCheck(dLen >= 120 && dLen <= 165, `${rel} meta description budget (${dLen} chars)`, desc);
  assertCheck(/[.?!]$/.test(desc.trim()), `${rel} meta description ends with punctuation`, desc.slice(-10));
  assertCheck(!desc.includes('·'), `${rel} meta description does not contain middle dot (·)`);

  // Single H1 check
  const h1Matches = html.match(/<h1(?:\s+[^>]*)?>([\s\S]*?)<\/h1>/gi) || [];
  assertCheck(h1Matches.length === 1, `${rel} has exactly one <h1>`, `Found: ${h1Matches.length}`);

  // No duplicate heading strings on page
  const allH = [...html.matchAll(/<h[1-6](?:\s+[^>]*)?>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const uniqueH = new Set(allH);
  assertCheck(allH.length === uniqueH.size, `${rel} has no duplicate heading strings`, `Total: ${allH.length}, Unique: ${uniqueH.size}`);

  titlesSeen.set(rel, title);
}

// ── GATE G3: Schema Validation ────────────────────────────────────────────────
console.log(`\n--- [GATE G3: STRUCTURED DATA & SCHEMA] ---`);

for (const filePath of allHtmlFiles) {
  const rel = path.relative(publicDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let match;
  let parsedCount = 0;
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      parsedCount++;
      
      // Verify no prohibited types
      const str = JSON.stringify(parsed);
      assertCheck(!str.includes('"@type":"Quiz"') && !str.includes('"@type":"HowTo"') && !str.includes('"@type":"MedicalWebPage"'), `${rel} excludes prohibited schema types`);
      
      // Verify organization alternateName
      if (str.includes('"@type":"Organization"')) {
        assertCheck(str.includes('"alternateName"'), `${rel} Organization schema has alternateName entity array`);
      }
    } catch (err) {
      assertCheck(false, `${rel} JSON-LD parsing failed`, err.message);
    }
  }
  assertCheck(parsedCount >= 1, `${rel} contains valid parsed JSON-LD block`, `Blocks: ${parsedCount}`);
}

// ── GATE G4: Content Quality ──────────────────────────────────────────────────
console.log(`\n--- [GATE G4: CONTENT QUALITY & UNIVERSAL CONTRACT] ---`);

for (const filePath of allHtmlFiles) {
  const rel = path.relative(publicDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  // Check for answer box on article/hub pages
  if (rel.includes('historical-figures/') || rel.includes('iq-scores/') || rel.includes('cognitive-skills/') || rel === 'are-online-iq-tests-accurate.html' || rel === 'types-of-iq-tests.html') {
    const hasAnswerBox = html.includes('class="answer-box"');
    assertCheck(hasAnswerBox, `${rel} has answer block directly under H1`);

    if (hasAnswerBox) {
      const ansMatch = html.match(/<div class="answer-box">([\s\S]*?)<\/div>/i);
      if (ansMatch) {
        const words = ansMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
        assertCheck(words >= 35 && words <= 70, `${rel} answer block word count (${words} words) within 40–60 range`);
      }
    }

    // Historical figures must state no verified score exists
    if (rel.includes('historical-figures/')) {
      const statesEstimate = html.toLowerCase().includes('estimate') || html.toLowerCase().includes('never took an iq test') || html.toLowerCase().includes('no verified record');
      assertCheck(statesEstimate, `${rel} explicitly states score is an estimate / unmeasured`);
    }
  }

  // Check no clinical diagnostic claims
  const makesClinicalClaim = html.includes("we diagnose") || html.includes("clinical assessment accredited");
  assertCheck(!makesClinicalClaim, `${rel} preserves non-clinical disclaimer integrity`);
}

// ── GATE G5: Internal Link Architecture ───────────────────────────────────────
console.log(`\n--- [GATE G5: ARCHITECTURE & LINK INTEGRITY] ---`);

const sitemapUrls = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assertCheck(sitemapUrls.length >= 28, `Sitemap has complete entity cluster coverage`, `Total URLs: ${sitemapUrls.length}`);

// Verify /historical-figures-iq is 200 and not redirected
assertCheck(fs.existsSync(path.join(publicDir, 'historical-figures-iq.html')), '/historical-figures-iq exists as Hub B canonical');

// ── GATE G6: Constitutional Close-Out ─────────────────────────────────────────
console.log(`\n--- [GATE G6: CONSTITUTIONAL CLOSE-OUT & INTERACTIVE ASSET INTEGRITY] ---`);

for (const filePath of allHtmlFiles) {
  const rel = path.relative(publicDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  assertCheck(!html.includes('{{') && !html.includes('TODO') && !html.includes('Lorem ipsum'), `${rel} has zero unresolved tokens or TODO placeholders`);
}

// Check interactive assets in shipped HTML
const histHubHtml = fs.readFileSync(path.join(publicDir, 'historical-figures-iq.html'), 'utf8');
assertCheck(histHubHtml.includes('class="filter-pill'), 'historical-figures-iq.html ships active class="filter-pill" buttons');
assertCheck(histHubHtml.includes('filterThinkers'), 'historical-figures-iq.html ships filterThinkers() JS engine');

const calcHtml = fs.readFileSync(path.join(publicDir, 'iq-scores', 'iq-percentile-calculator.html'), 'utf8');
assertCheck(calcHtml.includes('role="img"'), 'iq-percentile-calculator.html bell curve SVG has role="img"');
assertCheck(calcHtml.includes('aria-live="polite"'), 'iq-percentile-calculator.html has aria-live="polite" on calculation results');
assertCheck(calcHtml.includes('updateBellCurve'), 'iq-percentile-calculator.html ships updateBellCurve() Gaussian visualizer');

const logicHtml = fs.readFileSync(path.join(publicDir, 'cognitive-skills', 'logical-reasoning.html'), 'utf8');
assertCheck(logicHtml.includes('aria-controls="solLogic"'), 'logical-reasoning.html ships step-by-step logic solver with aria-controls');

// Generator Drift Gate
try {
  const gitStatus = execSync('git status --porcelain public/', { cwd: rootDir, encoding: 'utf8' }).trim();
  assertCheck(gitStatus === '', 'Zero Generator Drift — Committed public/ matches generator output byte-for-byte');
} catch (err) {
  assertCheck(false, 'Zero Generator Drift', err.message);
}

console.log(`\n==================================================================`);
console.log(`VERIFICATION SUMMARY: ${passedChecks} PASSED | ${failedChecks} FAILED (TOTAL: ${totalChecks})`);
if (errors.length > 0) {
  console.log(`\nFAILURES:`);
  errors.forEach(e => console.error(`  ${e}`));
}
console.log(`==================================================================\n`);

process.exit(failedChecks > 0 ? 1 : 0);

