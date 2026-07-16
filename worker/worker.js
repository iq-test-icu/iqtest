/**
 * IQ Test API Worker
 * Routes:
 *   POST /api/save-result   -> insert session row in Supabase, return {id}
 *   POST /api/checkout      -> create Stripe Checkout Session, return {url}
 *   POST /api/webhook       -> Stripe webhook (checkout.session.completed) -> generate report, email it
 *   GET  /api/report?id=    -> return {paid, report}
 *
 * Required secrets (wrangler secret put <NAME>):
 *   SUPABASE_URL, SUPABASE_SERVICE_KEY
 *   STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID (or amount-based, see checkout)
 *   RESEND_API_KEY, RESEND_FROM (e.g. "IQ Test <report@iq-test.icu>")
 *   GROQ_API_KEY
 *   ALLOWED_ORIGIN (e.g. "https://iq-test.icu")
 */

const CORS = (origin) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const cors = CORS(env.ALLOWED_ORIGIN || "*");

    if (req.method === "OPTIONS") return new Response(null, { headers: cors });

    try {
      if (url.pathname === "/api/save-result" && req.method === "POST") {
        return await handleSaveResult(req, env, cors);
      }
      if (url.pathname === "/api/checkout" && req.method === "POST") {
        return await handleCheckout(req, env, cors);
      }
      if (url.pathname === "/api/webhook" && req.method === "POST") {
        return await handleWebhook(req, env, cors);
      }
      if (url.pathname === "/api/report" && req.method === "GET") {
        return await handleGetReport(url, env, cors);
      }
      return new Response("Not found", { status: 404, headers: cors });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: "internal_error" }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
  },
};

// ---------- Supabase (raw REST/PostgREST, no SDK) ----------
async function sbInsert(env, row) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`supabase insert failed: ${await res.text()}`);
  const [inserted] = await res.json();
  return inserted;
}

async function sbSelect(env, id) {
  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/sessions?id=eq.${id}&select=*`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      },
    }
  );
  if (!res.ok) throw new Error(`supabase select failed: ${await res.text()}`);
  const rows = await res.json();
  return rows[0] || null;
}

async function sbUpdate(env, id, patch) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/sessions?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: env.SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`supabase update failed: ${await res.text()}`);
  const [updated] = await res.json();
  return updated;
}

// ---------- Handlers ----------
async function handleSaveResult(req, env, cors) {
  const body = await req.json();
  const { email, raw, index, percentile, catScores, catMax, answers, consentGiven } = body;
  if (!email || typeof raw !== "number") {
    return json({ error: "invalid_payload" }, 400, cors);
  }
  if (consentGiven !== true) {
    return json({ error: "consent_required" }, 400, cors); // CASL: no email send without explicit consent on record
  }
  const row = await sbInsert(env, {
    email,
    answers,
    raw_score: raw,
    cognitive_index: index,
    percentile_estimate: percentile ?? null,
    category_breakdown: { catScores, catMax },
    paid: false,
    consent_given_at: new Date().toISOString(),
    consent_text_version: "v1",
  });
  return json({ id: row.id }, 200, cors);
}

async function handleCheckout(req, env, cors) {
  const { id, email } = await req.json();
  if (!id || !email) return json({ error: "invalid_payload" }, 400, cors);

  const successUrl = `${env.ALLOWED_ORIGIN}/?report=${id}`;
  const cancelUrl = `${env.ALLOWED_ORIGIN}/`;

  const params = new URLSearchParams({
    "mode": "payment",
    "success_url": successUrl,
    "cancel_url": cancelUrl,
    "customer_email": email,
    "metadata[session_id]": id,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": "499",
    "line_items[0][price_data][product_data][name]": "IQ Test Full Cognitive Report",
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  if (!res.ok) return json({ error: "stripe_error", detail: await res.text() }, 502, cors);
  const session = await res.json();
  return json({ url: session.url }, 200, cors);
}

async function handleWebhook(req, env, cors) {
  const sig = req.headers.get("stripe-signature");
  const payload = await req.text();
  const valid = await verifyStripeSignature(payload, sig, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) return new Response("invalid signature", { status: 400 });

  const event = JSON.parse(payload);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const sessionId = session.metadata?.session_id;
    const email = session.customer_email || session.customer_details?.email;
    if (sessionId) {
      const row = await sbSelect(env, sessionId);
      if (row && !row.paid) {
        const report = await generateReport(env, row);
        await sendReportEmail(env, email, report, row.cognitive_index);
        await sbUpdate(env, sessionId, {
          paid: true,
          report,
          stripe_session_id: session.id,
          report_sent_at: new Date().toISOString(),
        });
      }
    }
  }
  return new Response("ok", { status: 200 });
}

async function handleGetReport(url, env, cors) {
  const id = url.searchParams.get("id");
  if (!id) return json({ error: "missing_id" }, 400, cors);
  const row = await sbSelect(env, id);
  if (!row) return json({ error: "not_found" }, 404, cors);
  return json({ paid: row.paid, report: row.report || null }, 200, cors);
}

// ---------- Groq report generation ----------
async function generateReport(env, row) {
  const { category_breakdown, cognitive_index, raw_score } = row;
  const prompt = `You are writing a short, friendly, non-clinical cognitive-skills report for a consumer quiz app called IQ Test.
The user scored ${raw_score}/16 overall (index estimate: ${cognitive_index}).
Category breakdown: ${JSON.stringify(category_breakdown)}.
Write ~180 words: 2 sentences on overall pattern, then one short observation per category (NUMERIC, VERBAL, LOGIC, PATTERN) framed constructively, then a 1-sentence closer.
Do not claim this is a clinical or validated psychometric result. Do not invent percentiles beyond what the scores support. Plain, warm, specific tone — no filler.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      max_tokens: 400,
    }),
  });
  if (!res.ok) throw new Error(`groq error: ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

// ---------- Resend email ----------
async function sendReportEmail(env, to, report, index) {
  if (!to) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to,
      subject: `Your IQ Test report — Cognitive Index ${index}`,
      text: `${report}\n\n— IQ Test\nQuestions or refund? Reply to this email.`,
    }),
  });
}

// ---------- Stripe webhook signature verification (Web Crypto, no SDK) ----------
async function verifyStripeSignature(payload, sigHeader, secret) {
  if (!sigHeader) return false;
  const parts = Object.fromEntries(
    sigHeader.split(",").map((p) => p.split("="))
  );
  const timestamp = parts["t"];
  const sig = parts["v1"];
  if (!timestamp || !sig) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload));
  const expected = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return expected === sig;
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
