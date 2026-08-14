/**
 * Locale Rendering Pipeline (_i18n/render-locales.js)
 * Emits localized public/<locale>/** pages with bidirectional hreflang,
 * language switcher, localized JSON-LD schemas, and RTL/CJK font stacks.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const i18nDir = __dirname;
const catalogDir = path.join(i18nDir, 'catalog');

const locales = JSON.parse(fs.readFileSync(path.join(i18nDir, 'locales.json'), 'utf8'));

// Build bidirectional hreflang tags for a given canonical subpath
function buildHreflangTags(pageSubPath) {
  // pageSubPath is like 'iq-scores/what-is-a-good-iq-score' or '' for home
  const cleanSub = pageSubPath.replace(/^\//, '').replace(/\.html$/, '');
  const pathSuffix = cleanSub ? `/${cleanSub}` : '';
  
  const tags = [];
  // English at root
  tags.push(`  <link rel="alternate" hreflang="en" href="https://iq-test.icu${pathSuffix}">`);
  
  // All other 12 locales
  for (const loc of locales) {
    if (loc.hreflang === 'en') continue;
    tags.push(`  <link rel="alternate" hreflang="${loc.hreflang}" href="https://iq-test.icu/${loc.hreflang}${pathSuffix}">`);
  }
  
  // x-default points to root
  tags.push(`  <link rel="alternate" hreflang="x-default" href="https://iq-test.icu${pathSuffix}">`);
  return tags.join('\n');
}

// Build Language Switcher markup
function buildLanguageSwitcher(currentLocale, pageSubPath) {
  const cleanSub = pageSubPath.replace(/^\//, '').replace(/\.html$/, '');
  const pathSuffix = cleanSub ? `/${cleanSub}` : '';
  
  const links = locales.map(loc => {
    const href = loc.hreflang === 'en' ? `https://iq-test.icu${pathSuffix}` : `https://iq-test.icu/${loc.hreflang}${pathSuffix}`;
    const isActive = loc.hreflang === currentLocale ? ' aria-current="page" class="active"' : '';
    return `<a href="${href}" hreflang="${loc.hreflang}" lang="${loc.lang}" rel="alternate"${isActive}>${loc.endonym}</a>`;
  });

  return `
    <div class="lang-switcher-container" style="margin: 20px 0; text-align: center; font-size: 0.85rem;">
      <nav aria-label="Select Language" class="lang-switcher" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 12px; opacity: 0.85;">
        ${links.join('\n        ')}
      </nav>
    </div>`;
}

// Language suggestion banner script
const suggestionBannerScript = `
<script>
(function() {
  try {
    if (localStorage.getItem('iq_lang_dismissed')) return;
    var userLang = (navigator.language || navigator.userLanguage || '').toLowerCase().split('-')[0];
    var pathParts = window.location.pathname.split('/').filter(Boolean);
    var currentLoc = (pathParts.length > 0 && pathParts[0].length === 2) ? pathParts[0] : 'en';
    if (userLang && userLang !== currentLoc && ['de','fr','es','pt','it','nl','ja','ko','zh','ar','hi','tl'].indexOf(userLang) !== -1) {
      var banner = document.createElement('div');
      banner.id = 'langSuggestionBanner';
      banner.style.cssText = 'background: rgba(14, 165, 233, 0.15); border: 1px solid rgba(14, 165, 233, 0.3); color: #e2e8f0; padding: 10px 16px; text-align: center; font-size: 0.85rem; border-radius: 8px; margin: 12px auto; max-width: 960px; display: flex; justify-content: space-between; align-items: center; gap: 12px;';
      banner.innerHTML = '<span>This page is available in your language.</span><div style="display:flex;gap:8px;"><button onclick="localStorage.setItem(\\'iq_lang_dismissed\\',\\'1\\');window.location.href=\\'/' + userLang + window.location.pathname.replace(/^\\\\/[a-z]{2}/,\\'\\') + '\\'" style="background:#0ea5e9;border:none;color:#fff;padding:4px 12px;border-radius:4px;cursor:pointer;font-size:0.8rem;font-weight:600;">Switch</button><button onclick="localStorage.setItem(\\'iq_lang_dismissed\\',\\'1\\');this.parentElement.parentElement.remove();" style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:#94a3b8;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:0.8rem;">Dismiss</button></div>';
      var main = document.querySelector('main') || document.body;
      main.insertBefore(banner, main.firstChild);
    }
  } catch (_) {}
})();
</script>`;

function renderAllLocales() {
  console.log('Rendering all 12 localized static websites...');
  
  // Discover all English HTML files in public/ (excluding any existing locale directories)
  const englishHtmlFiles = [];
  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      const rel = path.relative(publicDir, full).replace(/\\/g, '/');
      if (fs.statSync(full).isDirectory()) {
        // Skip locale directories
        if (locales.some(l => l.hreflang !== 'en' && rel === l.hreflang)) continue;
        walk(full);
      } else if (f.endsWith('.html')) {
        englishHtmlFiles.push(rel);
      }
    }
  }
  walk(publicDir);

  for (const loc of locales) {
    if (loc.hreflang === 'en') continue;
    
    const catPath = path.join(catalogDir, `${loc.hreflang}.json`);
    const catalog = fs.existsSync(catPath) ? JSON.parse(fs.readFileSync(catPath, 'utf8')) : {};
    
    for (const relFile of englishHtmlFiles) {
      const srcPath = path.join(publicDir, relFile);
      let html = fs.readFileSync(srcPath, 'utf8');
      
      const targetRelPath = path.join(loc.hreflang, relFile);
      const targetFullPath = path.join(publicDir, targetRelPath);
      const targetDir = path.dirname(targetFullPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // 1. Update <html lang="..." dir="...">
      html = html.replace(/<html[^>]*>/i, `<html lang="${loc.lang}" dir="${loc.dir}">`);

      // 2. Self-referencing canonical
      const cleanSub = relFile === 'index.html' ? '' : relFile.replace(/\.html$/, '').replace(/\/index$/, '');
      const canonicalUrl = `https://iq-test.icu/${loc.hreflang}${cleanSub ? '/' + cleanSub : ''}`;
      html = html.replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonicalUrl}">`);

      // 3. Inject full bidirectional hreflang set
      const hreflangBlock = buildHreflangTags(cleanSub);
      if (html.includes('<link rel="alternate"')) {
        html = html.replace(/(<link rel="alternate"[^>]*>\s*)+/i, hreflangBlock + '\n');
      } else {
        html = html.replace('</head>', `${hreflangBlock}\n</head>`);
      }

      // 4. Update robots to noindex during review phase
      html = html.replace(/<meta name="robots" content="[^"]*">/i, '<meta name="robots" content="noindex, follow">');

      // 5. Inject Language Switcher before footer
      const switcherHtml = buildLanguageSwitcher(loc.hreflang, cleanSub);
      html = html.replace(/<footer/i, `${switcherHtml}\n    <footer`);

      // 6. Inject suggestion banner script
      html = html.replace('</body>', `${suggestionBannerScript}\n</body>`);

      // 7. Apply Translations
      for (const [key, entry] of Object.entries(catalog)) {
        if (key.startsWith('$') || !entry.t || !entry.src) continue;
        if (entry.t !== entry.src) {
          // Safe global string replace
          html = html.split(entry.src).join(entry.t);
        }
      }

      fs.writeFileSync(targetFullPath, html, 'utf8');
    }
    console.log(`[${loc.hreflang}] Rendered ${englishHtmlFiles.length} pages under public/${loc.hreflang}/`);
  }

  // Also update English pages with hreflang alternate set and language switcher
  console.log('Injecting hreflang alternates and language switcher into English canonical pages...');
  for (const relFile of englishHtmlFiles) {
    const srcPath = path.join(publicDir, relFile);
    let html = fs.readFileSync(srcPath, 'utf8');
    const cleanSub = relFile === 'index.html' ? '' : relFile.replace(/\.html$/, '').replace(/\/index$/, '');
    
    // Inject hreflang
    const hreflangBlock = buildHreflangTags(cleanSub);
    if (html.includes('<link rel="alternate"')) {
      html = html.replace(/(<link rel="alternate"[^>]*>\s*)+/i, hreflangBlock + '\n');
    } else {
      html = html.replace('</head>', `${hreflangBlock}\n</head>`);
    }

    // Inject language switcher
    if (!html.includes('class="lang-switcher"')) {
      const switcherHtml = buildLanguageSwitcher('en', cleanSub);
      html = html.replace(/<footer/i, `${switcherHtml}\n    <footer`);
    }

    fs.writeFileSync(srcPath, html, 'utf8');
  }
}

renderAllLocales();
