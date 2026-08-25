# APEX IQ·Test

A modern, high-performance cognitive skills self-insight assessment platform. Built on serverless architecture with a focus on speed, compliance, and user engagement.

## Tech Stack
- **Frontend**: Vanilla JS SPA with responsive CSS layout, optimized for fast first-contentful paint.
- **Backend**: Cloudflare Workers routed under `iq-test.icu/api/*` (same-origin architecture).
- **Database**: Supabase (PostgreSQL) for secure session storage.
- **Payments**: Stripe Checkout and Webhooks.
- **AI Engine**: Groq (Llama-3.3-70b-versatile) for generating narrative feedback.
- **Emails**: Resend API.

---

## Key Features
- **16-Question Assessment**: Evaluates Verbal, Numeric, Logic, and Pattern Recognition domains with script-neutral, homonym-free items.
- **Bubble Answer Sheet Theme**: A clean, luxury paper-textured layout with responsive UI elements and interactive visual charts (including dynamic SVG radar and Gaussian bell curve charts).
- **Persistent Header Language Switcher**: Persistent language switcher anchored to the top right of the header with centered brand logo across Desktop, Tablet, and Mobile viewports.
- **13-Locale Internationalization Engine (`_i18n/`)**: Full static translation and routing across 13 languages (English, German, French, Spanish, Portuguese, Italian, Dutch, Japanese, Korean, Simplified Chinese, Arabic [RTL], Hindi, Tagalog) with bidirectional `hreflang` tags and XML sitemap index.
- **Semantic SEO Multi-Hub Architecture (`_seo/`)**: 33 canonical pages with structured JSON-LD schemas, breadcrumb navigation, interactive puzzle step solvers, and calibrated title/description budgets.
- **RFC 8058 & CASL Compliance**: `POST /api/unsubscribe` one-click unsubscription endpoint, safe unsubscription confirmation page, and bounded recovery email lookbacks with sender physical address disclosure.
- **Zero Generator Drift**: Deterministic build pipeline verified by `_seo/verify-all.js` (492 checks) and `_i18n/verify-i18n.js` (185 checks).

---

## Deploy Checklist

### 1. Domain Configuration
- Point the domain DNS to Cloudflare and ensure the SSL/TLS zone is active.

### 2. Cloudflare Pages
- Connect the repository to Cloudflare Pages.
- Set the publish directory to `public/`.

### 3. Database Initialization
- Execute `supabase/schema.sql` in your Supabase SQL editor to provision the `sessions` table. Re-running is safe — every migration in the file is `add column if not exists` / `create index if not exists`.

### 4. Worker Deployment
- Deploy the Cloudflare Worker from the `worker/` directory:
  ```bash
  cd worker
  wrangler deploy
  ```
- Provision the required secrets on Cloudflare:
  - `SUPABASE_SERVICE_KEY`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `GROQ_API_KEY`
  - `RESEND_API_KEY`

### 5. Webhook Integration
- Configure a Stripe Webhook pointing to `https://iq-test.icu/api/webhook` subscribed to the `checkout.session.completed` event.

### 6. Email Services
- Verify the sending domain on Resend and add the necessary SPF/DKIM records to your DNS zone.

### 7. Abandoned-Lead Recovery Sweep
- Runs automatically once deployed — `wrangler deploy` registers the Cron Trigger defined in `wrangler.toml` (`[triggers]`, daily at 15:00 UTC). No new secrets required; reuses `RESEND_API_KEY`/`RESEND_FROM`.
- Only emails leads who checked "Also send me occasional cognitive-science content" (`marketing_opt_in=true`) — the mandatory score-delivery consent alone does not qualify under CASL for a promotional message. Every send carries a working one-click unsubscribe link (`/api/unsubscribe?id=`) and a `List-Unsubscribe` header.
- To verify locally before relying on the schedule: `cd worker && wrangler dev --test-scheduled`, then trigger `http://localhost:8787/__scheduled`.
