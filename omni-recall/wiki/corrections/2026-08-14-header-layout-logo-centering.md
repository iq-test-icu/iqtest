# Correction Record: 2026-08-14 Header Layout & Language Switcher Placement

- **Date:** 2026-08-14
- **Context:** iq-test.icu persistent language switcher elevation
- **Correction Request:** "MOVE THE LANGUAGE SWITCHER TO THE RIGHT SO THAT THE LOGO REMAINS CENTERED."
- **Root Cause:** When language switcher button was placed inside a standard flex container next to the logo, it displaced the logo off-center relative to the page and hero card.
- **Permanent Solution:**
  - Placed the IQ·Test logo in a centered container (`margin: 0 auto; justify-content: center;`).
  - Anchored the `.header-lang-wrapper` to the far right using absolute/fixed positioning (`right: 24px; top: 20px; z-index: 1000;`).
  - Maintained full responsiveness on Desktop ($1440\text{px}$), Tablet ($768\text{px}$), and Mobile ($375\text{px}$) with scaled button padding and RTL support (`[dir="rtl"] { right: auto; left: 24px; }`).
- **Status:** Verified and permanently integrated into `_seo/upgrade-index.js` and `_seo/build-seo.js`.
