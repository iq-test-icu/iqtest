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
- **16-Question Assessment**: Evaluates Verbal, Numeric, Logic, and Pattern Recognition domains.
- **Bubble Answer Sheet Theme**: A clean, paper-textured layout with responsive UI elements and interactive visual charts (including an SVG radar chart of score breakdowns).
- **Secure API Validation**: 10KB payload limits, client IP rate-limiting, and payload validation.
- **Structured Funnel Tracking**: Event logging for user session registration, checkout flows, and email fulfillment.
- **Privacy & Compliance**: Server-stamped consent logs compliant with PIPEDA and CASL.

---

## Deploy Checklist

### 1. Domain Configuration
- Point the domain DNS to Cloudflare and ensure the SSL/TLS zone is active.

### 2. Cloudflare Pages
- Connect the repository to Cloudflare Pages.
- Set the publish directory to `public/`.

### 3. Database Initialization
- Execute `supabase/schema.sql` in your Supabase SQL editor to provision the `sessions` table.

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
