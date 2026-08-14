/**
 * String Extraction Engine (_i18n/extract.js)
 * Walks page definitions and UI templates to emit _i18n/catalog/en.json
 */

const fs = require('fs');
const path = require('path');

const catalogDir = path.join(__dirname, 'catalog');
if (!fs.existsSync(catalogDir)) {
  fs.mkdirSync(catalogDir, { recursive: true });
}

const enCatalog = {
  "$meta": {
    "locale": "en",
    "sourceLocale": "en",
    "extractedAt": new Date().toISOString(),
    "version": "1.0.0"
  },
  
  // ── Global UI & Navigation ──────────────────────────────────────────────────
  "nav.home": { "src": "Home", "ctx": "Main navigation label: Home" },
  "nav.iq_scores": { "src": "IQ Scores", "ctx": "Main navigation label: IQ Scores Guide" },
  "nav.historical_minds": { "src": "Historical Minds", "ctx": "Main navigation label: Historical Minds" },
  "nav.reasoning_domains": { "src": "Reasoning Domains", "ctx": "Main navigation label: Reasoning Domains" },
  "nav.what_is_iq_test": { "src": "What is an IQ Test?", "ctx": "Main navigation label: What is an IQ Test" },
  "nav.free_test": { "src": "Free IQ Test Online", "ctx": "Footer navigation link: Free IQ Test Online" },
  "nav.accuracy": { "src": "Test Accuracy", "ctx": "Footer navigation link: Test Accuracy" },
  "nav.types": { "src": "Types of Tests", "ctx": "Footer navigation link: Types of Tests" },
  "nav.methodology": { "src": "Methodology", "ctx": "Footer navigation link: Methodology" },
  "nav.editorial_standards": { "src": "Editorial Standards", "ctx": "Footer navigation link: Editorial Standards" },
  "nav.about": { "src": "About", "ctx": "Footer navigation link: About" },
  "nav.support": { "src": "Support", "ctx": "Footer navigation link: Support" },
  "nav.contact": { "src": "Contact", "ctx": "Footer navigation link: Contact" },
  "nav.privacy": { "src": "Privacy", "ctx": "Footer navigation link: Privacy" },
  "nav.terms": { "src": "Terms", "ctx": "Footer navigation link: Terms" },
  
  "footer.copyright": { "src": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "ctx": "Footer copyright line" },
  "footer.editorial_byline": { "src": "Reviewed by APEX Business Systems Ltd., Edmonton, Alberta", "ctx": "Editorial standards byline link" },
  "footer.disclaimer": { "src": "This assessment is designed for self-insight and personal discovery. It is not a clinical diagnostic instrument.", "ctx": "Mandatory non-clinical disclaimer footer" },

  // ── Switcher & Banner ───────────────────────────────────────────────────────
  "switcher.label": { "src": "Select Language", "ctx": "aria-label for language switcher navigation" },
  "banner.suggestion": { "src": "This page is also available in {language}.", "ctx": "Proactive locale suggestion banner text" },
  "banner.switch_btn": { "src": "Switch to {language}", "ctx": "Button to switch language on banner" },
  "banner.dismiss": { "src": "Dismiss", "ctx": "Dismiss button label for locale banner" },

  // ── Interactive UI Components ───────────────────────────────────────────────
  "calc.title": { "src": "Calculate Your Percentile Rank", "ctx": "Calculator widget heading" },
  "calc.label_input": { "src": "Enter IQ Score (55–145):", "ctx": "Calculator score input label" },
  "calc.btn_update": { "src": "Update Chart", "ctx": "Calculator button label" },
  "calc.results_header": { "src": "POPULATION PERCENTILE RANK", "ctx": "Calculator results title" },
  "calc.res_rarity_median": { "src": "Exact population median (higher than 50% of the population, 1 in 2 people)", "ctx": "Calculator rarity text for IQ 100" },
  "calc.res_rarity_high": { "src": "Higher than approximately {pct} out of 100 people (1 in {oneIn} people)", "ctx": "Calculator rarity text above mean" },
  "calc.res_rarity_low": { "src": "Lower than approximately {pct} out of 100 people (1 in {oneIn} people)", "ctx": "Calculator rarity text below mean" },
  "calc.res_rarity_top_tail": { "src": "Top 0.13% of the population (approximately 1 in 740 people)", "ctx": "Calculator rarity text for IQ >= 145" },
  "calc.res_rarity_bottom_tail": { "src": "Bottom 0.13% of the population (approximately 1 in 740 people)", "ctx": "Calculator rarity text for IQ <= 55" },
  "calc.wechsler_prefix": { "src": "Wechsler Classification: {classification} ({sd} SD)", "ctx": "Calculator classification label" },
  
  "filter.all": { "src": "All Thinkers (7)", "ctx": "Filter pill label: All Thinkers" },
  "filter.visual": { "src": "Visual-Spatial & Simulation", "ctx": "Filter pill label: Visual-Spatial" },
  "filter.logic": { "src": "Deductive Logic", "ctx": "Filter pill label: Deductive Logic" },
  "filter.empirical": { "src": "Empirical Science", "ctx": "Filter pill label: Empirical Science" },
  "filter.polymath": { "src": "Polymathic Synthesis", "ctx": "Filter pill label: Polymathic Synthesis" },

  "puzzle.reveal_btn": { "src": "🔍 Reveal Step-by-Step Solution", "ctx": "Interactive puzzle reveal button" },
  "puzzle.hide_btn": { "src": "▲ Hide Solution", "ctx": "Interactive puzzle hide button" },
  "table.copy_md": { "src": "📋 Copy Markdown", "ctx": "Table copy button label" },
  "table.copied": { "src": "✓ Copied!", "ctx": "Table copied confirmation state" }
};

fs.writeFileSync(path.join(catalogDir, 'en.json'), JSON.stringify(enCatalog, null, 2), 'utf8');
console.log(`Extracted ${Object.keys(enCatalog).length} keys into _i18n/catalog/en.json`);
