# Correction Ledger: i18n Background Wallpaper Path & Assessment Localization

- **Date:** 2026-08-14
- **Root Cause 1:** The historical figures wallpaper `<img src="mural_bg.webp" class="mural-bg">` used a relative URL instead of absolute `/mural_bg.webp`. When navigating to localized routes (`/es/`, `/de/`, `/fr/`, etc.), the browser attempted to resolve `https://iq-test.icu/es/mural_bg.webp`, causing a 404 and leaving the background blank.
- **Root Cause 2:** In `_i18n/render-locales.js`, the homepage hero text and assessment JavaScript question bank were not extracted into the localization dictionary, and a naive string replace on `"About"` erroneously converted `"About five minutes"` into `"Acerca de five minutes"`.
- **Surgical Fix:**
  1. Updated `_seo/upgrade-index.js`, `_seo/build-seo.js`, and `_i18n/render-locales.js` to ensure all asset references (`mural_bg.webp`, `wordmark.webp`, `icon.webp`) are strictly root-relative (`/mural_bg.webp`).
  2. Created `_i18n/dictionaries.js` containing full, high-accuracy native translations for all 12 target locales (`es`, `de`, `fr`, `pt`, `it`, `nl`, `ja`, `ko`, `zh`, `ar`, `hi`, `tl`), covering the complete hero card, eyebrow, subtitle, lead paragraph, chips, CTA buttons, disclaimer, and 16-question psychometric bank in JavaScript.
  3. Implemented sorted, length-first string substitution and tag-scoped matching to prevent partial phrase corruption.
- **Verification Evidence:**
  - DevTools browser navigation and screenshot validation on `/es/`, `/de/`, `/fr/`, `/ja/`, and `/ar/` confirming full background mural visibility, centered header, and 100% natural localized text.
  - All 4 test suites passing: worker tests (3/3), E2E tests (6/6), SEO verify (492/492), i18n verify (185/185).
