/**
 * Homepage Upgrade Script — public/index.html
 * T3.1 & S1/S2/S4/S5/S9 requirements
 */

const fs = require('fs');
const path = require('path');
const { buildJsonLdGraph } = require('./build-seo');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update <head> metadata (title, meta description, robots, canonical, social tags)
const newTitle = "Free IQ Test — Get Your Score in 5 Minutes | IQ Test";
const newDesc = "Take a free 16-question IQ test and get your cognitive index, percentile, and category breakdown instantly. Optional detailed reports from $1.99.";
const newCanonical = "https://iq-test.icu/";

html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${newTitle}</title>`);
html = html.replace(/<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']>/i, `<meta name="description" content="${newDesc}">`);
html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']>/i, `<link rel="canonical" href="${newCanonical}">`);

// Replace og:title, og:description, twitter:title, twitter:description
html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']>/i, `<meta property="og:title" content="${newTitle}">`);
html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']>/i, `<meta property="og:description" content="${newDesc}">`);
html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']>/i, `<meta name="twitter:title" content="${newTitle}">`);
html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']>/i, `<meta name="twitter:description" content="${newDesc}">`);

// Replace meta robots
html = html.replace(/<meta\s+name=["']robots["']\s+content=["'][\s\S]*?["']>/i, `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`);

// 2. Replace old JSON-LD scripts with single consolidated sitewide @graph + FAQPage + Product/Offer
const homepageFaqs = [
  {
    q: "Is this a real IQ test?",
    a: "It is a real cognitive skills test that reports your result on the familiar 85–145 scale used by traditional IQ scoring. It is not a clinical IQ assessment — those are administered one-to-one by a licensed psychologist using instruments such as the WAIS-IV."
  },
  {
    q: "Do I have to pay to see my score?",
    a: "No. Your cognitive index score and percentile are shown free, immediately after the final question. Detailed reports are an optional one-time purchase, and there is no subscription."
  },
  {
    q: "How long does the IQ test take?",
    a: "Sixteen questions across four reasoning domains. Most people finish in under five minutes."
  },
  {
    q: "How is the score calculated?",
    a: "Each of the 16 items falls into one of four categories: numeric reasoning, verbal reasoning, logic, and pattern recognition. Your raw score across all four is converted into a cognitive index on a 85-145 scale, modeled on a standard mean-100 / SD-15 distribution, purely as a familiar frame of reference."
  },
  {
    q: "What is the difference between the report tiers?",
    a: "The Score Report ($1.99) unlocks your full 4-category percentile breakdown. The Deep Report ($3.99) adds a written analysis of your reasoning pattern and a thematic historical figure match based on your strongest category. The Complete Report ($6.99) includes everything plus a printable certificate."
  },
  {
    q: "What happens to my data?",
    a: "Your answers and email (if purchasing) are never sold or shared. Payment is processed by Stripe. Optional cognitive-science emails are sent only if you tick that box, and each one has a one-click unsubscribe."
  }
];

const newJsonLd = buildJsonLdGraph({
  pageUrl: "https://iq-test.icu/",
  pageTitle: newTitle,
  pageDescription: newDesc,
  faqs: homepageFaqs,
  products: true
});

// Remove existing json-ld blocks in head
html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>\s*/gi, '');

// Insert consolidated JSON-LD right before </head>
html = html.replace('</head>', `<script type="application/ld+json">\n${newJsonLd}\n</script>\n</head>`);

// 3. Update Noscript block to avoid duplicate heading strings and keep it clean
const noscriptReplacement = `<noscript>
  <main style="max-width:660px;margin:0 auto;padding:24px;font-family:sans-serif;">
    <p style="font-size:1.4rem; font-weight:bold; color:#C9A24B;">Free IQ Test — 16-Question Cognitive Assessment</p>
    <p>Take our free 16-question cognitive skills test covering numeric reasoning, verbal reasoning, logical deduction, and pattern recognition. Most people finish in under 5 minutes. Your score is instant and free. Optionally unlock a detailed report ($1.99–$6.99) revealing which historical figure — Einstein, Newton, Da Vinci, or others — thinks most like you.</p>
  </main>
</noscript>`;
html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscriptReplacement);

// 4. Update Hero H1 and Hero disclaimer in DOM
const heroOldH1 = '<h1 style="text-align:center;">Which mind matches yours?</h1>';
const heroNewH1 = `<h1 style="text-align:center;">Free IQ Test — See Your Score and the Mind That Matches It</h1>
      <p style="text-align:center; font-size:0.92rem; color:var(--text-secondary); margin-top:-10px; margin-bottom:18px;">A 16-question cognitive skills test for self-insight and entertainment. Not a clinical or diagnostic IQ assessment.</p>`;
if (html.includes(heroOldH1)) {
  html = html.replace(heroOldH1, heroNewH1);
}

// 5. Update secondary H1 on report screen to div so single H1 rule is strictly respected
html = html.replace(/<h1 style="text-align:center;" id="resH1">/gi, '<div style="text-align:center; font-size:1.8rem; font-weight:700; color:var(--text); margin-bottom:12px;" id="resH1">');
html = html.replace(/<\/h1>(\s*<p class="lead" style="text-align:center;" id="resSubtitle">)/gi, '</div>$1');

// 6. Add Header Language Switcher Styles and Markup
const indexSwitcherStyles = `
  /* === HEADER LANGUAGE SWITCHER === */
  header {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    position: relative !important;
    width: 100% !important;
    max-width: 960px;
    margin: 0 auto 20px;
    padding: 10px 16px;
  }
  .logo-wrap {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 0 auto !important;
  }
  .header-lang-wrapper {
    position: absolute !important;
    right: 16px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    z-index: 1000;
  }
  .lang-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: oklch(0.12 0.008 95 / 0.9);
    border: 1px solid var(--border, rgba(255,255,255,0.15));
    color: var(--text, #fff);
    padding: 6px 14px;
    border-radius: 9999px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
  }
  .lang-btn:hover, .lang-btn:focus-visible {
    border-color: #C9A24B;
    background: oklch(0.16 0.01 95);
    color: #C9A24B;
    outline: none;
  }
  .lang-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 280px;
    max-height: 420px;
    overflow-y: auto;
    background: oklch(0.09 0.005 95 / 0.98);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border, rgba(255,255,255,0.15));
    border-radius: 12px;
    box-shadow: 0 16px 36px rgba(0,0,0,0.6);
    padding: 12px;
    z-index: 1001;
  }
  .lang-dropdown[hidden] {
    display: none;
  }
  .lang-dropdown-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-secondary, #94a3b8);
    margin-bottom: 8px;
    padding: 0 6px;
  }
  .lang-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }
  .lang-option {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 8px;
    border-radius: 6px;
    color: var(--text, #e2e8f0);
    text-decoration: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    transition: all 0.15s ease;
  }
  .lang-option:hover {
    background: oklch(0.18 0.01 95 / 0.8);
    color: #C9A24B;
  }
  .lang-option.active {
    background: rgba(201, 162, 75, 0.15);
    color: #C9A24B;
    font-weight: 600;
  }
  .lang-code {
    font-size: 0.68rem;
    font-weight: 700;
    opacity: 0.6;
    background: rgba(255,255,255,0.06);
    padding: 1px 4px;
    border-radius: 3px;
  }
  [dir="rtl"] .lang-dropdown { right: auto; left: 0; }
`;

if (!html.includes('/* === HEADER LANGUAGE SWITCHER === */')) {
  html = html.replace('</style>', `${indexSwitcherStyles}\n</style>`);
}

const headerSwitcherMarkup = `  <header>
    <div class="logo-wrap">
      <img src="/wordmark.webp" alt="IQ·Test" style="height:56px; width:auto; object-fit:contain; display:block;" onerror="this.style.display='none'">
    </div>
    <div class="header-lang-wrapper" id="headerLangWrapper">
      <button class="lang-btn" id="headerLangBtn" aria-expanded="false" aria-haspopup="true" aria-controls="headerLangDropdown" onclick="toggleHeaderLangMenu(event)">
        <span class="globe-icon" aria-hidden="true">🌐</span>
        <span class="lang-current-label">English</span>
        <svg class="chevron-icon" aria-hidden="true" viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M3.2 5.2a.75.75 0 0 1 1.06 0L8 8.94l3.74-3.74a.75.75 0 1 1 1.06 1.06l-4.27 4.27a.75.75 0 0 1-1.06 0L3.2 6.26a.75.75 0 0 1 0-1.06z"/></svg>
      </button>
      <nav id="headerLangDropdown" class="lang-dropdown" aria-label="Language Selector" hidden>
        <div class="lang-dropdown-inner">
          <div class="lang-dropdown-title">Select Language</div>
          <div class="lang-grid">
            <a href="/" class="lang-option active" hreflang="en" lang="en"><span class="lang-code">EN</span> English</a>
            <a href="/de/" class="lang-option" hreflang="de" lang="de"><span class="lang-code">DE</span> Deutsch</a>
            <a href="/fr/" class="lang-option" hreflang="fr" lang="fr"><span class="lang-code">FR</span> Français</a>
            <a href="/es/" class="lang-option" hreflang="es" lang="es"><span class="lang-code">ES</span> Español</a>
            <a href="/pt/" class="lang-option" hreflang="pt" lang="pt"><span class="lang-code">PT</span> Português</a>
            <a href="/it/" class="lang-option" hreflang="it" lang="it"><span class="lang-code">IT</span> Italiano</a>
            <a href="/nl/" class="lang-option" hreflang="nl" lang="nl"><span class="lang-code">NL</span> Nederlands</a>
            <a href="/ja/" class="lang-option" hreflang="ja" lang="ja"><span class="lang-code">JA</span> 日本語</a>
            <a href="/ko/" class="lang-option" hreflang="ko" lang="ko"><span class="lang-code">KO</span> 한국어</a>
            <a href="/zh/" class="lang-option" hreflang="zh-Hans" lang="zh-Hans"><span class="lang-code">ZH</span> 简体中文</a>
            <a href="/ar/" class="lang-option" hreflang="ar" lang="ar"><span class="lang-code">AR</span> العربية</a>
            <a href="/hi/" class="lang-option" hreflang="hi" lang="hi"><span class="lang-code">HI</span> हिन्दी</a>
            <a href="/tl/" class="lang-option" hreflang="tl" lang="tl"><span class="lang-code">TL</span> Tagalog</a>
          </div>
        </div>
      </nav>
    </div>
  </header>`;

html = html.replace(/<header>[\s\S]*?<\/header>/i, headerSwitcherMarkup);

const indexHeaderScript = `
<script>
function toggleHeaderLangMenu(e) {
  if (e) e.stopPropagation();
  var btn = document.getElementById('headerLangBtn');
  var menu = document.getElementById('headerLangDropdown');
  if (!btn || !menu) return;
  var isExpanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !isExpanded);
  menu.hidden = isExpanded;
}
document.addEventListener('click', function(e) {
  var wrapper = document.getElementById('headerLangWrapper');
  if (wrapper && !wrapper.contains(e.target)) {
    var btn = document.getElementById('headerLangBtn');
    var menu = document.getElementById('headerLangDropdown');
    if (btn && menu) {
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  }
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var btn = document.getElementById('headerLangBtn');
    var menu = document.getElementById('headerLangDropdown');
    if (btn && menu) {
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      btn.focus();
    }
  }
});
</script>`;

if (!html.includes('function toggleHeaderLangMenu')) {
  html = html.replace('</body>', `${indexHeaderScript}\n</body>`);
}

// 6. Update and expand #content-hub with the required 4 depth sections and verbatim FAQs
const contentHubReplacement = `<div class="info-block" id="content-hub">
      <h2>Cognitive Self-Insight: Understand Your Problem-Solving Profile</h2>
      <p>This free 16-question cognitive skills assessment evaluates your spatial reasoning, logical deduction, verbal comprehension, and numerical pattern recognition. Designed for anyone curious about how their mind works, the test maps your raw cognitive index across four distinct domains to create a unique reasoning profile. Unlike a clinical IQ test, this quiz focuses on engaging self-insight and problem-solving styles rather than clinical diagnostics. In about five minutes, you will receive a free, instant snapshot of your cognitive index score on the familiar 85–145 scale. After viewing your free baseline score, you can optionally unlock a detailed reasoning analysis that compares your exact style of thinking to history’s greatest scientists, philosophers, and inventors.</p>

      <h2>What your cognitive index score actually means</h2>
      <p>When you complete this assessment, your performance is expressed on the familiar 85–145 scale. In modern psychometrics, intelligence scores follow a standard Gaussian normal distribution where the population average is set to 100 with a standard deviation of 15. A score is not an absolute measure of brain capacity, but a relative index indicating your statistical percentile ranking compared to the broader population.</p>
      
      <table style="width:100%; border-collapse:collapse; margin:20px 0; font-family:var(--font-display); font-size:0.9rem; background:var(--bg-card); border-radius:8px; overflow:hidden; border:1px solid var(--border-color);">
        <thead>
          <tr style="background:rgba(255,255,255,0.05); color:var(--gold); text-align:left;">
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Cognitive Index</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Population Percentile</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Standard Classification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>130 and above</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">98th percentile and above</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Very Superior (Top 2%)</td>
          </tr>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>115 – 129</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">84th to 97th percentile</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">High Average / Superior</td>
          </tr>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>100</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">50th percentile (Median)</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Average (Exact Population Center)</td>
          </tr>
          <tr>
            <td style="padding:10px 16px;"><strong>85 – 99</strong></td>
            <td style="padding:10px 16px;">16th to 49th percentile</td>
            <td style="padding:10px 16px;">Average / Low Average</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:28px;">These percentiles follow directly from the normal distribution curve and standard statistical conventions, not proprietary formulas.</p>

      <h2>The four reasoning domains we measure</h2>
      <p>Human intelligence is multidimensional. Our assessment evaluates four foundational cognitive pillars grounded in the Cattell–Horn–Carroll theory of human cognitive abilities:</p>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/cognitive-skills/numerical-reasoning" style="color:var(--gold);">Numerical Reasoning</a>:</strong> Evaluates mathematical pattern detection, progression extrapolation, and quantitative problem-solving speed without requiring advanced calculus.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/cognitive-skills/verbal-reasoning" style="color:var(--gold);">Verbal Reasoning</a>:</strong> Measures semantic comprehension, relational concept analogies, and the deductive analysis of linguistic statements.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/cognitive-skills/logical-reasoning" style="color:var(--gold);">Logical Deduction</a>:</strong> Tests rule-based syllogisms, conditional constraint tracking, and systematic contradiction elimination.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/cognitive-skills/pattern-recognition" style="color:var(--gold);">Pattern Recognition</a>:</strong> Assesses visual-spatial matrix transformations, rotational symmetry, and nonverbal fluid intelligence (Gf).</li>
      </ul>

      <h2>Why we match you to a historical mind</h2>
      <p>Unlike conventional tests that reduce your intellect to a cold number, our optional Deep Report matches your domain balance to history's most creative thinkers. This is an engaging storytelling and self-reflection device based on documented problem-solving styles. Whether you share the visual mental simulation of <a href="/historical-figures/nikola-tesla-iq" style="color:var(--gold);">Nikola Tesla</a>, the empirical perseverance of <a href="/historical-figures/marie-curie-iq" style="color:var(--gold);">Marie Curie</a>, the cross-domain polymathy of <a href="/historical-figures/leonardo-da-vinci-iq" style="color:var(--gold);">Leonardo da Vinci</a>, or the mathematical deduction of <a href="/historical-figures/isaac-newton-iq" style="color:var(--gold);">Isaac Newton</a>, your cognitive profile highlights how your unique mind processes information. Explore our full library of <a href="/historical-figures-iq" style="color:var(--gold);">historical figures' IQ profiles</a>.</p>

      <h2>How this test is different from a clinical IQ test</h2>
      <p>We believe in absolute transparency: <strong>this assessment is not a clinical diagnostic instrument.</strong> A clinical IQ test (such as the WAIS-IV or Stanford-Binet 5) is administered one-on-one by a licensed clinical psychologist over 60 to 90 minutes. Clinical tests are required for diagnostic evaluations, educational placement, and legal documentation. In contrast, our test is a rapid, accessible 5-minute self-insight tool designed to provide an entertaining baseline reflection of your reasoning strengths. To learn more, read our guide on <a href="/cognitive-test-vs-iq-test" style="color:var(--gold);">cognitive tests vs. IQ tests</a> and review the <a href="/types-of-iq-tests" style="color:var(--gold);">major types of IQ tests</a>.</p>

      <h2>Frequently asked questions</h2>
      <div class="faq-accordion">
        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            Is this a real IQ test?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              It is a real cognitive skills test that reports your result on the familiar 85–145 scale used by traditional IQ scoring. It is not a clinical IQ assessment — those are administered one-to-one by a licensed psychologist using instruments such as the WAIS-IV.
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            Do I have to pay to see my score?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              No. Your cognitive index score and percentile are shown free, immediately after the final question. Detailed reports are an optional one-time purchase, and there is no subscription.
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            How long does the IQ test take?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              Sixteen questions across four reasoning domains. Most people finish in under five minutes.
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            How is the score calculated?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              Each of the 16 items falls into one of four categories: numeric reasoning, verbal reasoning, logic, and pattern recognition. Your raw score across all four is converted into a cognitive index on a 85-145 scale, modeled on a standard mean-100 / SD-15 distribution, purely as a familiar frame of reference.
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            What is the difference between the report tiers?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              The Score Report ($1.99) unlocks your full 4-category percentile breakdown. The Deep Report ($3.99) adds a written analysis of your reasoning pattern and a thematic historical figure match based on your strongest category. The Complete Report ($6.99) includes everything plus a printable certificate.
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            What happens to my data?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              We collect your answers and, if you buy a report, your email. We never sell or share it, and payment is processed by Stripe. The only other email we ever send is the optional cognitive-science note you can tick a box for — and every one of those carries a one-click unsubscribe.
            </div>
          </div>
        </div>
      </div>

      <div class="related-network-card" style="margin-top:32px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; padding:24px;">
        <h3 style="font-family:var(--font-display); font-size:1.15rem; color:var(--gold); margin-bottom:16px;">🔗 Cognitive Research &amp; Assessment Hubs</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
          <a href="/iq-scores/what-is-a-good-iq-score" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">What Is a Good IQ Score?</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">Wechsler classifications, standard deviation ranges, and percentiles.</span>
          </a>
          <a href="/iq-scores/iq-percentile-calculator" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">IQ Percentile Calculator &amp; Curve</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">Interactive Gaussian normal distribution percentile converter.</span>
          </a>
          <a href="/historical-figures-iq" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">Historical Minds &amp; IQ Profiles</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">Cognitive matching against Einstein, Da Vinci, Tesla, and Curie.</span>
          </a>
          <a href="/cognitive-skills/" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">Reasoning Domains &amp; Skills</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">Deep dive into numerical, verbal, logical, and spatial reasoning.</span>
          </a>
        </div>
      </div>

      <div class="citations-block" style="margin-top:24px; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-left:3px solid var(--gold); border-radius:8px; padding:18px 20px; font-size:0.84rem;">
        <h3 style="font-family:var(--font-display); font-size:0.95rem; font-weight:600; color:var(--gold); margin-bottom:10px;">📚 Scientific References &amp; Authoritative Citations</h3>
        <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
          <li><a href="https://www.apa.org/topics/intelligence" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>American Psychological Association (APA)</strong> — <em>Intelligence Testing &amp; Psychometric Standards</em></a></li>
          <li><a href="https://pubmed.ncbi.nlm.nih.gov/22055279/" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>National Center for Biotechnology Information (NCBI)</strong> — <em>WAIS-IV Normative Standardization and Deviation Scoring</em></a></li>
          <li><a href="https://www.mensa.org/mensa-iq-challenge" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>Mensa International</strong> — <em>Upper 2nd Percentile Qualification Thresholds</em></a></li>
          <li><a href="https://www.wikidata.org/wiki/Q131549" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>Wikidata Knowledge Graph (Q131549)</strong> — <em>Intelligence Quotient Psychometric Ontology</em></a></li>
        </ul>
      </div>
    </div>`;

html = html.replace(/<div class="info-block" id="content-hub">[\s\S]*?<\/div>\s*<\/section>/i, `${contentHubReplacement}\n  </section>`);

// 7. Update Footer links in index.html to include new Hubs & Trust pages
const newFooterContent = `  <footer>
    <img src="/wordmark.webp" alt="IQ Test" style="height:20px; width:auto; display:block; margin:0 auto 16px; opacity:0.7;" onerror="this.style.display='none'">
    <div style="margin-bottom:15px; line-height: 1.8;">
      <a href="/">Home</a> &nbsp;&middot;&nbsp;
      <a href="/iq-scores/">IQ Scores</a> &nbsp;&middot;&nbsp;
      <a href="/historical-figures-iq">Historical Minds</a> &nbsp;&middot;&nbsp;
      <a href="/cognitive-skills/">Reasoning Domains</a> &nbsp;&middot;&nbsp;
      <a href="/what-is-an-iq-test">What is an IQ Test?</a>
      <br>
      <a href="/free-iq-test-online">Free IQ Test Online</a> &nbsp;&middot;&nbsp;
      <a href="/are-online-iq-tests-accurate">Test Accuracy</a> &nbsp;&middot;&nbsp;
      <a href="/types-of-iq-tests">Types of Tests</a> &nbsp;&middot;&nbsp;
      <a href="/methodology">Methodology</a> &nbsp;&middot;&nbsp;
      <a href="/editorial-standards">Editorial Standards</a>
      <br>
      <a href="/about">About</a> &nbsp;&middot;&nbsp;
      <a href="/support">Support</a> &nbsp;&middot;&nbsp;
      <a href="/contact">Contact</a> &nbsp;&middot;&nbsp;
      <a href="/privacy">Privacy</a> &nbsp;&middot;&nbsp;
      <a href="/terms">Terms</a>
    </div>
    <div>&copy; 2026 APEX Business Systems Ltd. &nbsp;&middot;&nbsp; Edmonton, AB &nbsp;&middot;&nbsp; <a href="mailto:support@iq-test.icu">support@iq-test.icu</a></div>
    
    <div class="powered-by">
      <span>powered by:</span>
      <div class="powered-by-logos">
        <a href="https://stripe.com" target="_blank" rel="noopener" aria-label="Stripe" style="margin:0; display:inline-flex;">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Stripe</title><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/></svg>
        </a>
        <a href="https://cloudflare.com" target="_blank" rel="noopener" aria-label="Cloudflare" style="margin:0; display:inline-flex;">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Cloudflare</title><path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727"/></svg>
        </a>
        <a href="https://supabase.com" target="_blank" rel="noopener" aria-label="Supabase" style="margin:0; display:inline-flex;">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Supabase</title><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"/></svg>
        </a>
      </div>
    </div>
  </footer>`;

html = html.replace(/[ \t]*<footer>[\s\S]*?<\/footer>/i, newFooterContent);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Homepage (public/index.html) successfully upgraded.');
