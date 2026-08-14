const fs = require('fs');
const path = require('path');
const { DICTIONARIES } = require('./dictionaries');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const i18nDir = __dirname;
const catalogDir = path.join(i18nDir, 'catalog');

const locales = JSON.parse(fs.readFileSync(path.join(i18nDir, 'locales.json'), 'utf8'));

// Build bidirectional hreflang tags for a given canonical subpath
function buildHreflangTags(pageSubPath) {
  const cleanSub = pageSubPath.replace(/^\//, '').replace(/\.html$/, '');
  const pathSuffix = cleanSub ? `/${cleanSub}` : '';
  
  const tags = [];
  tags.push(`  <link rel="alternate" hreflang="en" href="https://iq-test.icu${pathSuffix}">`);
  
  for (const loc of locales) {
    if (loc.hreflang === 'en') continue;
    tags.push(`  <link rel="alternate" hreflang="${loc.hreflang}" href="https://iq-test.icu/${loc.hreflang}${pathSuffix}">`);
  }
  
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

  for (const loc of locales) {
    if (loc.hreflang === 'en') continue;
    
    const catPath = path.join(catalogDir, `${loc.hreflang}.json`);
    const catalog = fs.existsSync(catPath) ? JSON.parse(fs.readFileSync(catPath, 'utf8')) : {};
    const dict = DICTIONARIES[loc.hreflang] || null;
    
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

      // 2. Fix all relative asset paths to root absolute
      html = html.replace(/src="mural_bg\.webp"/g, 'src="/mural_bg.webp"');
      html = html.replace(/src="wordmark\.webp"/g, 'src="/wordmark.webp"');
      html = html.replace(/src="icon\.webp"/g, 'src="/icon.webp"');

      // 3. Self-referencing canonical
      const cleanSub = relFile === 'index.html' ? '' : relFile.replace(/\.html$/, '').replace(/\/index$/, '');
      const canonicalUrl = `https://iq-test.icu/${loc.hreflang}${cleanSub ? '/' + cleanSub : ''}`;
      html = html.replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonicalUrl}">`);

      // 4. Inject full bidirectional hreflang set
      const hreflangBlock = buildHreflangTags(cleanSub);
      if (html.includes('<link rel="alternate"')) {
        html = html.replace(/(<link rel="alternate"[^>]*>\s*)+/i, hreflangBlock + '\n');
      } else {
        html = html.replace('</head>', `${hreflangBlock}\n</head>`);
      }

      // 5. Update robots to noindex during review phase
      html = html.replace(/<meta name="robots" content="[^"]*">/i, '<meta name="robots" content="noindex, follow">');

      // 6. Update Header Language Switcher for this locale
      html = html.replace(/<span class="lang-current-label">English<\/span>/i, `<span class="lang-current-label">${loc.endonym}</span>`);
      html = html.replace(/(<a href="[^"]*" class="lang-option) active(" hreflang="en")/i, '$1$2');
      const activeLocaleRegex = new RegExp(`(<a href="[^"]*" class="lang-option)(" hreflang="${loc.hreflang}")`, 'i');
      html = html.replace(activeLocaleRegex, '$1 active$2');

      // 7. Inject suggestion banner script
      html = html.replace('</body>', `${suggestionBannerScript}\n</body>`);

      // 8. If index.html, apply full rich dictionary localization
      if (relFile === 'index.html' && dict) {
        // Localize Hero Section
        html = html.replace(/<div class="eyebrow">Cognitive Assessment<\/div>/i, `<div class="eyebrow">${dict.heroEyebrow}</div>`);
        html = html.replace(/<h1 style="text-align:center;">Free IQ Test — See Your Score and the Mind That Matches It<\/h1>/i, `<h1 style="text-align:center;">${dict.heroH1}</h1>`);
        html = html.replace(/<p style="text-align:center; font-size:0.92rem; color:var\(--text-secondary\); margin-top:-10px; margin-bottom:18px;">A 16-question cognitive skills test for self-insight and entertainment\. Not a clinical or diagnostic IQ assessment\.<\/p>/i, `<p style="text-align:center; font-size:0.92rem; color:var(--text-secondary); margin-top:-10px; margin-bottom:18px;">${dict.heroSubtitle}</p>`);
        html = html.replace(/<p class="lead" style="text-align:center;">16 questions\. About five minutes\. Your score is free the moment you finish\. Then decide if you want to know which historical figure you actually think like\.<\/p>/i, `<p class="lead" style="text-align:center;">${dict.heroLead}</p>`);
        html = html.replace(/<span class="chip"><b>16<\/b> questions<\/span>\s*<span class="chip"><b>4<\/b> categories<\/span>\s*<span class="chip"><b>5 min<\/b> average<\/span>/i, `<span class="chip">${dict.chipQuestions}</span>\n        <span class="chip">${dict.chipCategories}</span>\n        <span class="chip">${dict.chipTime}</span>`);
        html = html.replace(/<button class="btn btn-primary" onclick="startTest\(\)">Start the test<\/button>/i, `<button class="btn btn-primary" onclick="startTest()">${dict.startBtn}</button>`);
        html = html.replace(/<p class="disclaimer" style="text-align:center;">This is a self-insight quiz, not a clinical IQ test\. Your score is for personal reflection only\. See the FAQ below for full methodology details\.<\/p>/i, `<p class="disclaimer" style="text-align:center;">${dict.heroDisclaimer}</p>`);

        // Localize Question Bank in JavaScript
        const questionsJs = `const QUESTIONS = ${JSON.stringify(dict.questions, null, 2)};`;
        html = html.replace(/const QUESTIONS = \[[^\]]*(\{[^\}]*\}[^\]]*)*\];/s, questionsJs);
      }

      // 9. Apply catalogue translations sorted by longest source phrase first
      const catalogEntries = Object.entries(catalog)
        .filter(([k, v]) => !k.startsWith('$') && v.src && v.t && v.src !== v.t)
        .sort((a, b) => b[1].src.length - a[1].src.length);

      for (const [key, entry] of catalogEntries) {
        // Perform safe contextual replace
        if (entry.src.length > 10) {
          html = html.split(entry.src).join(entry.t);
        } else {
          // For shorter words (like "About", "Home", "Privacy"), replace only inside HTML tags / links
          const tagRegex = new RegExp(`(>\\s*)${escapeRegex(entry.src)}(\\s*<)`, 'g');
          html = html.replace(tagRegex, `$1${entry.t}$2`);
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
    
    // Ensure absolute image paths
    html = html.replace(/src="mural_bg\.webp"/g, 'src="/mural_bg.webp"');
    html = html.replace(/src="wordmark\.webp"/g, 'src="/wordmark.webp"');
    html = html.replace(/src="icon\.webp"/g, 'src="/icon.webp"');

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

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { renderAllLocales };

if (require.main === module) {
  renderAllLocales();
}
