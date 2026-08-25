const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const results = [];

for (const file of files) {
  const filePath = path.join(publicDir, file);
  const html = fs.readFileSync(filePath, 'utf8');

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                    html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
                         html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);

  // Extract headings in DOM order
  const headingRegex = /<(h[1-6])(?:\s+[^>]*)?>([\s\S]*?)<\/\1>/gi;
  const headings = [];
  let hMatch;
  while ((hMatch = headingRegex.exec(html)) !== null) {
    const text = hMatch[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    headings.push(`${hMatch[1].toUpperCase()}: ${text}`);
  }

  // Strip scripts, styles, html tags to get approx word count of visible text
  const textOnly = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = textOnly.length > 0 ? textOnly.split(' ').filter(Boolean).length : 0;

  // Check JSON-LD
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  const jsonLdBlocks = [];
  let jMatch;
  while ((jMatch = jsonLdRegex.exec(html)) !== null) {
    jsonLdBlocks.push(jMatch[1].trim());
  }

  results.push({
    file,
    url: file === 'index.html' ? 'https://iq-test.icu/' : `https://iq-test.icu/${file.replace('.html', '')}`,
    title: titleMatch ? titleMatch[1] : null,
    titleLength: titleMatch ? titleMatch[1].length : 0,
    description: descMatch ? descMatch[1] : null,
    descLength: descMatch ? descMatch[1].length : 0,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    robots: robotsMatch ? robotsMatch[1] : null,
    headings,
    wordCount: words,
    jsonLdCount: jsonLdBlocks.length,
    jsonLdBlocks
  });
}

console.log(JSON.stringify(results, null, 2));
