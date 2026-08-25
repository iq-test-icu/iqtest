const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = [
  'index.html',
  'about.html',
  'methodology.html',
  'what-is-an-iq-test.html',
  'free-iq-test-online.html',
  'historical-figures-iq.html',
  'cognitive-test-vs-iq-test.html',
  'support.html',
  'privacy.html'
];

let md = `# BASELINE AUDIT — iq-test.icu
**Contract ID:** APEX-SEO-IQT-2026-08-14-v1.0  
**Capture Date:** 2026-08-14  
**Property:** https://iq-test.icu  
**Branch:** seo/semantic-elevation-v1  

---

## 1. REPOSITORY MAP (T0.1)

- **Framework & Rendering Mode:** Static HTML (SSG / Static Assets) hosted via Cloudflare Pages (\`public/\` directory) with a Cloudflare Worker (\`worker/worker.js\`) serving \`iq-test.icu/api/*\`. Page HTML is server-delivered as pre-rendered static markup.
- **Routing Convention:** Clean URL extensionless routing configured via Cloudflare Pages and \`public/_redirects\`. Files in \`public/<page>.html\` map to \`https://iq-test.icu/<page>\`.
- **Metadata Authoring:** Authored statically inside the \`<head>\` of each independent HTML file in \`public/\`.
- **Sitemap & Robots Location:** Static files located at \`public/sitemap.xml\` and \`public/robots.txt\`.
- **Existing Shared Components / Design Tokens:**
  - Typography: \`Space Grotesk\` (display/headings), \`Fraunces\` (serif body)
  - Color Tokens: \`--bg\` / \`--bg-dark\` (oklch(0.06 0.002 95)), \`--gold\` (oklch(0.72 0.12 95)), \`--text\` / \`--text-primary\` (oklch(0.97 0.002 95)), \`--muted\` (oklch(0.62 0.008 95)), \`--border\` / \`--border-color\` (oklch(0.18 0.008 95 / 0.7)), \`--bg-card\` (oklch(0.10 0.006 95 / 0.85))
  - Components: \`.faq-item\` / \`.faq-question\` / \`.faq-answer\` (accordions), \`.company-block\` / \`.card\` (containers), \`.cta-btn\` / \`.btn-primary\` (buttons), \`.back\` (breadcrumbs/back links).
- **Middleware & Redirects:** \`public/_redirects\` enforces 301 redirects from \`/*.html\` to extensionless canonical paths. No i18n middleware.

---

## 2. BASELINE URL CAPTURE (T0.2)

`;

for (const file of files) {
  const filePath = path.join(publicDir, file);
  if (!fs.existsSync(filePath)) continue;
  const html = fs.readFileSync(filePath, 'utf8');

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                    html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
                         html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);

  const headingRegex = /<(h[1-6])(?:\s+[^>]*)?>([\s\S]*?)<\/\1>/gi;
  const headings = [];
  let hMatch;
  while ((hMatch = headingRegex.exec(html)) !== null) {
    const text = hMatch[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    headings.push(`- **${hMatch[1].toUpperCase()}**: ${text}`);
  }

  const textOnly = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = textOnly.length > 0 ? textOnly.split(' ').filter(Boolean).length : 0;
  const url = file === 'index.html' ? 'https://iq-test.icu/' : `https://iq-test.icu/${file.replace('.html', '')}`;

  md += `### URL: \`${url}\` (File: \`public/${file}\`)
- **HTTP Status:** 200 (Static)
- **Title (${titleMatch ? titleMatch[1].length : 0} chars):** \`${titleMatch ? titleMatch[1] : 'MISSING'}\`
- **Meta Description (${descMatch ? descMatch[1].length : 0} chars):** \`${descMatch ? descMatch[1] : 'MISSING'}\`
- **Canonical:** \`${canonicalMatch ? canonicalMatch[1] : 'MISSING'}\`
- **Robots:** \`${robotsMatch ? robotsMatch[1] : 'default'}\`
- **Word Count:** ~${words} words
- **Heading Tree:**
${headings.length > 0 ? headings.join('\n') : '- *(No headings)*'}

`;
}

md += `---

## 3. CONFIRMATION OF OPEN FINDINGS (T0.3)

| Finding | Check | Status | Evidence / Root Cause |
| :--- | :--- | :--- | :--- |
| **Homepage duplicate H1/H2 (§1.2.4)** | Inspect rendered DOM for repeated heading strings | **CONFIRMED** | \`index.html\` contains an off-screen \`<div class="seo-content">\` (lines 1184-1215) with \`<h1>Free Cognitive Test — Which Historical Figure Matches Your Score?</h1>\` and \`<h2>How it works</h2>\`, which duplicate the visible hero \`<h1>Which mind matches yours?</h1>\` and visible section headings \`<h2>Free Cognitive Test — ...</h2>\` and \`<h2>How it works</h2>\`. |
| **sitemap.xml unparseable (§1.2.3)** | Check response headers, compression & XML body | **CONFIRMED** | Live endpoint served with \`content-encoding: br\` (Brotli compression). File contains deprecated \`<priority>\` and \`<changefreq>\` tags and static \`2026-07-18\` dates. |
| **Canonical coverage** | Audit self-referencing absolute canonical tags | **CONFIRMED** | All existing HTML files emit canonical links, but trailing-slash and domain formatting must be rigorously standardized sitewide. |
| **Index status** | Read Google Search Console indexed pages & coverage | **NO GSC ACCESS** | GSC API/dashboard access is not configured in local environment. Baseline recorded as: \`baseline: not yet measured\` (requires JR). |
`;

fs.writeFileSync(path.join(__dirname, 'BASELINE.md'), md, 'utf8');
console.log('BASELINE.md generated successfully.');
