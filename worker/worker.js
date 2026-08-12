/**
 * IQ·Test API Worker — apex-iqtest-worker
 * Routes:
 *   POST /api/save-result   -> insert session row, return {id}
 *   POST /api/checkout      -> Stripe Checkout Session (tier: basic|detailed), return {url}
 *   POST /api/webhook       -> Stripe webhook (checkout.session.completed) -> report + email
 *   GET  /api/report?id=    -> {paid, report, tier}
 *   GET  /api/unsubscribe?id= -> one-click CASL unsubscribe, sets marketing_opt_in=false
 *
 * Scheduled (Cron Trigger, see wrangler.toml [triggers]):
 *   Daily recovery sweep — one follow-up email to opted-in, unpaid leads 48h+ old.
 *
 * Secrets (wrangler secret put <NAME>):
 *   SUPABASE_URL, SUPABASE_SERVICE_KEY
 *   STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
 *   RESEND_API_KEY, RESEND_FROM  (e.g. "IQ·Test <report@iq-test.icu>")
 *   GROQ_API_KEY
 *   ALLOWED_ORIGIN  (e.g. "https://iq-test.icu")
 *
 * Hard constraints honoured in this file:
 *   - No clinical/psychometric validity claims in any generated text.
 *   - No fabricated statistics (no social proof numbers).
 *   - CASL: consent_given_at is always set server-side; client timestamp is never trusted.
 *   - No npm SDK dependencies — raw fetch() only.
 *   - Historical figure pairing in Detailed is THEMATIC, never numeric (no "Einstein's IQ was X").
 *   - Recovery sweep only emails marketing_opt_in=true rows (promotional message under CASL,
 *     not covered by the mandatory "send my score" consent) and every send carries a working
 *     one-click unsubscribe link + List-Unsubscribe header. Engineering judgment, not legal
 *     advice — confirm with counsel before relying on this for a live CASL obligation.
 */

// ── Tier config ──────────────────────────────────────────────────────────────
const PRICE_CENTS   = { basic: 199, detailed: 399, complete: 699 };
const PRODUCT_NAME  = { basic: "IQ·Test Basic Result", detailed: "IQ·Test Detailed Result", complete: "IQ·Test Complete Report + Printable Certificate" };
const VALID_TIERS   = new Set(["basic", "detailed", "complete"]);

// ── CORS ─────────────────────────────────────────────────────────────────────
const corsHeaders = (origin) => ({
  "Access-Control-Allow-Origin":  origin,
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});

// ── Entry ────────────────────────────────────────────────────────────────────
const ipCache = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60000;
  const maxRequests = 15;

  if (!ipCache.has(ip)) {
    ipCache.set(ip, [now]);
    return false;
  }

  const timestamps = ipCache.get(ip).filter(t => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return true;
  }

  timestamps.push(now);
  ipCache.set(ip, timestamps);
  return false;
}

function logEvent(env, eventName, { sessionId = null, tier = null, status, errorCode = null, email = null, ip = null, meta = null } = {}) {
  const logObj = {
    timestamp: new Date().toISOString(),
    event_name: eventName,
    session_id: sessionId,
    tier,
    environment: env.ENVIRONMENT || "production",
    status,
    error_code: errorCode,
  };
  if (email) logObj.email = email;
  if (ip) logObj.ip = ip;
  if (meta) logObj.meta = meta; // optional structured extras (e.g. batch counts) — never required
  console.log(JSON.stringify(logObj));
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === "string" && email.length <= 254 && re.test(email);
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUuid(id) {
  return typeof id === "string" && UUID_REGEX.test(id);
}

export default {
  async fetch(req, env) {
    const url  = new URL(req.url);
    const cors = corsHeaders(env.ALLOWED_ORIGIN || "*");

    if (req.method === "OPTIONS") return new Response(null, { headers: cors });

    const clientIp = req.headers.get("CF-Connecting-IP") || "127.0.0.1";

    try {
      let body = null;
      if (req.method === "POST") {
        const rawBody = await req.text();
        if (rawBody.length > 10240 && url.pathname !== "/api/webhook") {
          logEvent(env, "payload_too_large", { status: "failed", errorCode: "payload_too_large" });
          return new Response(JSON.stringify({ error: "payload_too_large" }), {
            status: 413,
            headers: { ...cors, "Content-Type": "application/json" }
          });
        }

        if (url.pathname !== "/api/webhook") {
          try {
            body = JSON.parse(rawBody);
          } catch (err) {
            return new Response(JSON.stringify({ error: "invalid_json" }), {
              status: 400,
              headers: { ...cors, "Content-Type": "application/json" }
            });
          }
        } else {
          // Pass rawBody for signature checking in webhook
          req.rawBody = rawBody;
        }
      }

      if (req.method === "POST" && isRateLimited(clientIp)) {
        logEvent(env, "rate_limit_exceeded", { status: "failed", errorCode: "too_many_requests", ip: clientIp });
        return new Response(JSON.stringify({ error: "too_many_requests" }), {
          status: 429,
          headers: { ...cors, "Content-Type": "application/json" }
        });
      }

      if (url.pathname === "/api/save-result" && req.method === "POST")
        return await handleSaveResult(body, env, cors);
      if (url.pathname === "/api/track" && req.method === "POST")
        return await handleTrackEvent(body, env, cors);
      if (url.pathname === "/api/checkout" && req.method === "POST")
        return await handleCheckout(body, env, cors);
      if (url.pathname === "/api/webhook" && req.method === "POST")
        return await handleWebhook(req, env, cors);
      if (url.pathname === "/api/report" && req.method === "GET")
        return await handleGetReport(url, env, cors);
      if (url.pathname === "/api/unsubscribe" && req.method === "GET")
        return await handleUnsubscribe(url, env, cors);

      return new Response("Not found", { status: 404, headers: cors });
    } catch (err) {
      console.error("Unhandled Worker exception:", err);
      logEvent(env, "unhandled_exception", { status: "failed", errorCode: err.message });
      return json({ error: "internal_error" }, 500, cors);
    }
  },

  // Cloudflare Cron Trigger entry point — see wrangler.toml [triggers].
  async scheduled(event, env, ctx) {
    ctx.waitUntil(handleRecoverySweep(env));
  },
};

// ── Supabase helpers (PostgREST, no SDK) ─────────────────────────────────────
async function sbInsert(env, table, row) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey:          env.SUPABASE_SERVICE_KEY,
      Authorization:  `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      Prefer:          "return=representation",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`supabase insert failed: ${await res.text()}`);
  const [inserted] = await res.json();
  return inserted;
}

async function sbSelect(env, id) {
  if (!isUuid(id)) return null;
  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/sessions?id=eq.${id}&select=*`,
    {
      headers: {
        apikey:        env.SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      },
    }
  );
  if (!res.ok) throw new Error(`supabase select failed: ${await res.text()}`);
  const rows = await res.json();
  return rows[0] || null;
}

/** Rows eligible for the recovery sweep — mirrors sessions_recovery_sweep_idx
 *  in supabase/schema.sql exactly, so the query stays index-backed. */
async function sbSelectRecoveryCandidates(env, cutoffIso, limit) {
  const params = new URLSearchParams({
    paid:             "eq.false",
    recovery_sent:    "eq.false",
    marketing_opt_in: "eq.true",
    created_at:       `lt.${cutoffIso}`,
    select:           "id,email,cognitive_index,percentile_estimate",
    limit:            String(limit),
  });
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/sessions?${params.toString()}`, {
    headers: {
      apikey:        env.SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`supabase recovery query failed: ${await res.text()}`);
  return await res.json();
}

async function sbUpdate(env, id, patch) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/sessions?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey:          env.SUPABASE_SERVICE_KEY,
      Authorization:  `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      Prefer:          "return=representation",
    },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`supabase update failed: ${await res.text()}`);
  const [updated] = await res.json();
  return updated;
}

// ── Handlers ─────────────────────────────────────────────────────────────────

/** POST /api/save-result
 *  body: { email, consentGiven, marketingOptIn, leadOnly, raw, index, percentile, catScores, catMax, answers }
 *  -> { id }
 */
async function handleSaveResult(body, env, cors) {
  if (!body) return json({ error: "invalid_payload" }, 400, cors);
  const { email, raw, index, percentile, catScores, catMax, answers, consentGiven, marketingOptIn, leadOnly } = body;

  if (!validateEmail(email) || typeof raw !== "number") {
    logEvent(env, "save_result_failed", { status: "failed", errorCode: "invalid_payload", email });
    return json({ error: "invalid_payload" }, 400, cors);
  }
  // CASL: consent must be explicit — never trust a client timestamp
  if (consentGiven !== true) {
    logEvent(env, "save_result_failed", { status: "failed", errorCode: "consent_required", email });
    return json({ error: "consent_required" }, 400, cors);
  }

  const row = await sbInsert(env, "sessions", {
    email,
    answers,
    raw_score:            raw,
    cognitive_index:      index,
    percentile_estimate:  percentile ?? null,
    category_breakdown:   { catScores, catMax },
    paid:                 false,
    lead_only:            Boolean(leadOnly),
    marketing_opt_in:     Boolean(marketingOptIn),
    consent_given_at:     new Date().toISOString(), // server-stamped, not client
    consent_text_version: "v1",
  });

  logEvent(env, leadOnly ? "lead_captured" : "result_saved", { sessionId: row.id, status: "success", email, marketingOptIn: Boolean(marketingOptIn) });
  return json({ id: row.id }, 200, cors);
}

/** POST /api/checkout
 *  body: { id, email, tier }   tier: "basic" | "detailed"
 *  -> { url }
 */
async function handleCheckout(body, env, cors) {
  if (!body) return json({ error: "invalid_payload" }, 400, cors);
  const { id, email, tier } = body;

  if (!id || !validateEmail(email)) {
    logEvent(env, "checkout_failed", { status: "failed", errorCode: "invalid_payload", email });
    return json({ error: "invalid_payload" }, 400, cors);
  }
  if (!VALID_TIERS.has(tier)) {
    logEvent(env, "checkout_failed", { status: "failed", errorCode: "invalid_tier", email });
    return json({ error: "invalid_tier", detail: "tier must be 'basic' or 'detailed'" }, 400, cors);
  }

  logEvent(env, "checkout_started", { sessionId: id, tier, status: "success", email });

  // Store tier on the session row so the webhook can read it reliably
  await sbUpdate(env, id, { tier });

  const successUrl = `${env.ALLOWED_ORIGIN}/?report=${id}`;
  const cancelUrl  = `${env.ALLOWED_ORIGIN}/`;

  const params = new URLSearchParams({
    "mode":                                          "payment",
    "success_url":                                   successUrl,
    "cancel_url":                                    cancelUrl,
    "customer_email":                                email,
    "metadata[session_id]":                          id,
    "metadata[tier]":                                tier,             // webhook reads this
    "line_items[0][quantity]":                       "1",
    "line_items[0][price_data][currency]":           "usd",
    "line_items[0][price_data][unit_amount]":        String(PRICE_CENTS[tier]),
    "line_items[0][price_data][product_data][name]": PRODUCT_NAME[tier],
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization:  `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  if (!res.ok) {
    logEvent(env, "checkout_failed", { sessionId: id, tier, status: "failed", errorCode: "stripe_error", email });
    return json({ error: "stripe_error", detail: await res.text() }, 502, cors);
  }
  const session = await res.json();
  return json({ url: session.url }, 200, cors);
}

/** POST /api/webhook  (Stripe checkout.session.completed)
 *  Idempotent: skips rows already marked paid.
 */
async function handleWebhook(req, env, cors) {
  const sig     = req.headers.get("stripe-signature");
  const payload = req.rawBody || await req.text();
  const valid   = await verifyStripeSignature(payload, sig, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) {
    logEvent(env, "webhook_signature_failed", { status: "failed", errorCode: "invalid_signature" });
    return new Response("invalid signature", { status: 400 });
  }

  const event = JSON.parse(payload);

  if (event.type === "checkout.session.completed") {
    const session   = event.data.object;
    const sessionId = session.metadata?.session_id;
    const tier      = session.metadata?.tier || "detailed"; // safe default
    const email     = session.customer_email || session.customer_details?.email;

    if (sessionId) {
      const row = await sbSelect(env, sessionId);
      if (row && !row.paid) {
        // Use tier from DB (set at checkout time) as source of truth; fall back to webhook metadata
        const resolvedTier = row.tier || tier;
        logEvent(env, "checkout_completed", { sessionId, tier: resolvedTier, status: "success", email });
        const report = await generateReport(env, row, resolvedTier);
        logEvent(env, "report_generated", { sessionId, tier: resolvedTier, status: "success", email });

        await sendReportEmail(env, email, report, row.cognitive_index, resolvedTier);
        logEvent(env, "report_emailed", { sessionId, tier: resolvedTier, status: "success", email });
        await sbUpdate(env, sessionId, {
          paid:             true,
          tier:             resolvedTier,
          report,
          stripe_session_id: session.id,
          report_sent_at:   new Date().toISOString(),
        });
      }
    }
  }

  return new Response("ok", { status: 200 });
}

/** GET /api/report?id=<uuid>
 *  -> { paid, report, tier }
 */
async function handleGetReport(url, env, cors) {
  const id = url.searchParams.get("id");
  if (!id) return json({ error: "missing_id" }, 400, cors);
  if (!isUuid(id)) return json({ error: "invalid_id" }, 400, cors);
  const row = await sbSelect(env, id);
  if (!row) return json({ error: "not_found" }, 404, cors);
  return json({ paid: row.paid, report: row.report || null, tier: row.tier || null }, 200, cors);
}

/** GET /api/unsubscribe?id=<uuid>
 *  One-click CASL unsubscribe — sets marketing_opt_in=false. Always returns a
 *  friendly HTML confirmation, even for an invalid/missing id, so the link
 *  never surfaces a broken page or leaks whether an id exists.
 */
async function handleUnsubscribe(url, env, cors) {
  const id = url.searchParams.get("id");
  if (isUuid(id)) {
    try {
      await sbUpdate(env, id, { marketing_opt_in: false });
      logEvent(env, "unsubscribed", { sessionId: id, status: "success" });
    } catch (err) {
      logEvent(env, "unsubscribe_failed", { sessionId: id, status: "failed", errorCode: err.message });
    }
  }
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Unsubscribed | IQ·Test</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; background:#0d0d0d; color:#eee; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; text-align:center; padding:24px;">
<div><h1 style="color:#B49048; font-size:1.4rem;">You're unsubscribed</h1>
<p style="color:#aaa; max-width:360px; margin:0 auto;">You won't receive any more optional emails from IQ·Test. Your saved score, if any, is unaffected.</p>
<p style="margin-top:20px;"><a href="https://iq-test.icu" style="color:#B49048;">Return to iq-test.icu</a></p></div>
</body></html>`;
  return new Response(html, { status: 200, headers: { ...cors, "Content-Type": "text/html; charset=utf-8" } });
}

/** POST /api/track
 *  body: { name, meta }
 *  -> { ok: true }
 */
async function handleTrackEvent(body, env, cors) {
  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return json({ error: "invalid_payload" }, 400, cors);
  }
  const { name, meta } = body;
  await sbInsert(env, "events", {
    event_name: name,
    meta:       meta || {},
  });
  return json({ ok: true }, 200, cors);
}

// ── Report generation ─────────────────────────────────────────────────────────

function validateReportContent(content) {
  if (!content || typeof content !== "string" || content.length < 100) return false;
  const lower = content.toLowerCase();
  const banned = ["your iq is", "clinical", "diagnostic", "whose iq was", "certified iq", "official iq", "iq score"];
  for (const word of banned) {
    if (lower.includes(word)) return false;
  }
  return true;
}

function fallbackDetailedTemplate(row) {
  const { category_breakdown, cognitive_index, raw_score, percentile_estimate } = row;
  const { catScores, catMax } = category_breakdown || {};
  
  let strongestCat = "LOGIC";
  let maxRatio = -1;
  if (catScores && catMax) {
    for (const cat of ["NUMERIC", "VERBAL", "LOGIC", "PATTERN"]) {
      const score = catScores[cat] ?? 0;
      const max = catMax[cat] ?? 4;
      const ratio = score / max;
      if (ratio > maxRatio) {
        maxRatio = ratio;
        strongestCat = cat;
      }
    }
  }

  const matches = {
    NUMERIC: { name: "Ada Lovelace", desc: "pattern synthesis and analytical foresight in computing systems" },
    VERBAL: { name: "Mary Shelley", desc: "creative synthesis, comparative semantics, and nuanced literary structure" },
    LOGIC: { name: "Aristotle", desc: "systematic deduction, statement relationships, and structured formal logic" },
    PATTERN: { name: "Leonardo da Vinci", desc: "visual consistency, spatial transformations, and artistic pattern recognition" }
  };

  const match = matches[strongestCat] || matches.LOGIC;

  return `### Overall Summary
Your puzzle responses indicate a highly constructive reasoning pattern characterized by balanced problem-solving and structured deduction. You approach complex cognitive tasks with a blend of analytical curiosity and systematic focus.

### Domain Observations
- Numeric Reasoning: Demonstrated clear capability in identifying sequence intervals and structural progression.
- Verbal Reasoning: Analyzed word analogies and definition relationships with semantic precision.
- Logic: Synthesized structured premises to deduce valid conclusions from logical statements.
- Pattern Recognition: Maintained spatial tracking and letters pattern alignment consistently.

### Strongest Reasoning Signal
Your performance was most pronounced in the ${strongestCat} reasoning domain. This indicates an innate capability for ${match.desc.split(",")[0]}, allowing you to resolve complex structures efficiently.

### Caveats and Context
Online puzzle tasks are highly sensitive to variables like temporal fatigue, ambient noise, and interface familiarity. A 16-item snapshot is a temporary measure of focus and logic rather than a permanent ceiling on cognitive potential.

### Reflective Takeaway
Focus on leveraging your strong ${strongestCat.toLowerCase()} reasoning style in daily workflow tasks, while practicing other categories under timed settings to refine your overall pattern flexibility.

### Thematic Comparison
Your ${strongestCat} results echo the kind of thinking associated with ${match.name}, known for ${match.desc}. This conceptual pairing represents shared cognitive themes rather than a direct quantitative comparison.

### Disclaimer
This narrative reflection is purely for curiosity and self-insight. It is not a clinical or psychometric diagnostic evaluation.`;
}

/**
 * basic:    No Groq call — format the percentile/category data into clean plain text.
 * detailed: Groq (llama-3.3-70b-versatile) — written analysis + thematic historical figure match.
 *           The figure pairing is THEMATIC only — no numeric IQ claims about real people.
 */
async function generateReport(env, row, tier) {
  const { category_breakdown, cognitive_index, raw_score, percentile_estimate } = row;
  const { catScores, catMax } = category_breakdown || {};

  if (tier === "basic") {
    // Pure formatting — no LLM cost, no latency
    const lines = ["Your full category breakdown:", ""];
    if (catScores && catMax) {
      for (const cat of ["NUMERIC", "VERBAL", "LOGIC", "PATTERN"]) {
        const score = catScores[cat] ?? 0;
        const max   = catMax[cat]   ?? 4;
        const pct   = Math.round((score / max) * 100);
        lines.push(`  ${cat}: ${score}/${max} (${pct}th percentile in this category)`);
      }
    }
    lines.push("");
    lines.push(`Overall cognitive index: ${cognitive_index}`);
    if (percentile_estimate != null) {
      lines.push(`Estimated population percentile: roughly the ${percentile_estimate}th percentile.`);
    }
    lines.push("");
    lines.push("This is a self-insight snapshot for entertainment and reflection — not a clinical assessment.");
    return lines.join("\n");
  }

  // detailed: call Groq, single prompt for analysis + historical figure match
  const breakdown = catScores && catMax
    ? Object.keys(catScores).map(c => `${c}: ${catScores[c]}/${catMax[c]}`).join(", ")
    : "breakdown unavailable";

  const prompt = `You are writing a short, warm, non-clinical cognitive-skills report for a consumer quiz called IQ·Test.

The user scored ${raw_score}/16 overall (cognitive index: ${cognitive_index}, roughly the ${percentile_estimate ?? "?"}th percentile).
Category breakdown: ${breakdown}.

Write approximately 200 words structured strictly as:
### Overall Summary
Two sentences describing the overall reasoning pattern you observe (constructive, honest, not clinical).

### Domain Observations
One sentence per category (NUMERIC, VERBAL, LOGIC, PATTERN) — a specific, grounded observation based on their score.

### Strongest Reasoning Signal
Analysis of the category where the user scored highest.

### Caveats and Context
Influence of fatigue, environment, and limitation of 16-question set.

### Reflective Takeaway
Practical personal reflection.

### Thematic Comparison
Name ONE real historical figure (scientist, artist, writer, inventor, leader — any field) whose general reputation for the SAME reasoning strength this person showed (use their strongest category) is well known. Explain the connection in 1–2 sentences. Frame it as a thematic pairing: "Your [category] result echoes the kind of thinking associated with [figure]..." NOT as a numeric comparison.

### Disclaimer
Strict disclosure of non-clinical nature.

STRICT RULES — violations are not acceptable:
- Do NOT state or imply any numeric IQ score for the historical figure. Historical IQ estimates for real people are unreliable and must not appear.
- Do NOT say "your IQ is X" or "clinical" or "diagnostic" — use "cognitive index" or "score" only.
- Do NOT claim this is a clinical or validated psychometric result.
- Do NOT invent statistics. Plain, warm, specific tone. No filler.`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:  `Bearer ${env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:       "llama-3.3-70b-versatile",
        messages:    [{ role: "user", content: prompt }],
        temperature: 0.6,
        max_tokens:  600,
      }),
    });

    if (!res.ok) throw new Error(`groq error: ${await res.text()}`);
    const data = await res.json();
    const content = data.choices[0].message.content.trim();

    if (validateReportContent(content)) {
      if (tier === "complete") {
        return content + `\n\n---\n### Printable Certificate of Cognitive Assessment\n**IQ·TEST COGNITIVE ASSESSMENT INDEX: ${cognitive_index}**\n*Estimated Population Percentile: ${percentile_estimate ?? 'N/A'}th Percentile*\n*Issued by APEX Business Systems Ltd. (Edmonton, AB)*\n*Verification ID: ${row.id}*\n\nThis certificate verifies completion of the 16-item self-insight cognitive reasoning evaluation across numeric, verbal, logical, and spatial reasoning domains.`;
      }
      return content;
    }
  } catch (err) {
    console.error("Groq generation or validation failed, using fallback template:", err);
  }

  const fallback = fallbackDetailedTemplate(row);
  if (tier === "complete") {
    return fallback + `\n\n---\n### Printable Certificate of Cognitive Assessment\n**IQ·TEST COGNITIVE ASSESSMENT INDEX: ${cognitive_index}**\n*Estimated Population Percentile: ${percentile_estimate ?? 'N/A'}th Percentile*\n*Issued by APEX Business Systems Ltd. (Edmonton, AB)*\n*Verification ID: ${row.id}*\n\nThis certificate verifies completion of the 16-item self-insight cognitive reasoning evaluation across numeric, verbal, logical, and spatial reasoning domains.`;
  }
  return fallback;
}

// ── Resend email ──────────────────────────────────────────────────────────────

/**
 * Single POST path to Resend for every outbound email.
 *
 * fetch() resolves normally on a 4xx/5xx, so an unchecked call silently reports
 * success on a rejected send. That mattered in both call sites below: the paid
 * path would mark the row paid + report_sent_at with no report ever delivered,
 * and the recovery sweep would set recovery_sent=true and burn the lead forever.
 * Throwing here pushes both into their existing retry paths — Stripe re-delivers
 * the webhook (guarded by `!row.paid`, so it stays idempotent) and the next
 * nightly sweep re-picks the untouched row.
 */
async function postResend(env, payload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization:  `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: env.RESEND_FROM, ...payload }),
  });
  if (!res.ok) throw new Error(`resend send failed (${res.status}): ${await res.text()}`);
  return res;
}

async function sendReportEmail(env, to, report, index, tier) {
  if (!to) return;

  const subjectLabel = tier === "basic" ? "Basic Result" : tier === "complete" ? "Complete Report & Certificate" : "Detailed Result";
  
  const htmlBody = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; line-height:1.6; color:#1a1a1a; max-width:600px; margin:0 auto; padding:24px; background-color:#ffffff; border:1px solid #eaeaea; border-radius:12px;">
      <div style="text-align:center; margin-bottom:24px; border-bottom:1px solid #eaeaea; padding-bottom:16px;">
        <span style="font-family:Georgia,serif; font-size:24px; font-weight:bold; letter-spacing:0.05em; color:#B49048;">IQ&middot;TEST</span>
        <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#666666; margin-top:4px;">COGNITIVE ASSESSMENT</div>
      </div>
      <div style="font-size:15px; margin-bottom:24px; white-space: pre-wrap;">${report}</div>
      <div style="margin-top:32px; border-top:1px solid #eaeaea; padding-top:16px; font-size:12px; color:#888888; text-align:center; line-height:1.5;">
        This is a self-insight quiz, not a clinical IQ test.<br>
        &copy; 2026 APEX Business Systems Ltd. &nbsp;&middot;&nbsp; Edmonton, AB<br>
        <a href="https://iq-test.icu" style="color:#B49048; text-decoration:none;">iq-test.icu</a>
      </div>
    </div>
  `;

  await postResend(env, {
    to,
    subject: `Your IQ·Test ${subjectLabel} — Cognitive Index ${index}`,
    text:    `${report}\n\n---\n— IQ·Test\niq-test.icu`,
    html:    htmlBody,
  });
}

// ── Recovery sweep (abandoned-lead follow-up, CASL-gated) ────────────────────

/**
 * Fires once per Cron Trigger (see wrangler.toml [triggers]). Sends ONE
 * follow-up email to leads who completed the free score, opted in to
 * "occasional cognitive-science content" (marketing_opt_in=true), haven't
 * purchased, haven't already been swept, and are 48h+ old. Capped at 200
 * rows/run and never throws past a single row — one bad send must not block
 * the rest of the batch or the next scheduled run.
 */
async function handleRecoverySweep(env) {
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

  let candidates;
  try {
    candidates = await sbSelectRecoveryCandidates(env, cutoff, 200);
  } catch (err) {
    logEvent(env, "recovery_sweep_query_failed", { status: "failed", errorCode: err.message });
    return;
  }

  logEvent(env, "recovery_sweep_started", { status: "success", meta: { candidateCount: candidates.length } });

  for (const row of candidates) {
    try {
      await sendRecoveryEmail(env, row.email, row);
      await sbUpdate(env, row.id, { recovery_sent: true });
      logEvent(env, "recovery_email_sent", { sessionId: row.id, status: "success", email: row.email });
    } catch (err) {
      logEvent(env, "recovery_email_failed", { sessionId: row.id, status: "failed", errorCode: err.message, email: row.email });
    }
  }

  logEvent(env, "recovery_sweep_completed", { status: "success", meta: { candidateCount: candidates.length } });
}

async function sendRecoveryEmail(env, to, row) {
  if (!to) return;

  const reportUrl = `${env.ALLOWED_ORIGIN}/?report=${row.id}`;
  const unsubUrl  = `${env.ALLOWED_ORIGIN}/api/unsubscribe?id=${row.id}`;
  const indexLine = row.cognitive_index != null
    ? `Your cognitive index was ${row.cognitive_index}${row.percentile_estimate != null ? ` (around the ${row.percentile_estimate}th percentile)` : ""}.`
    : "Your result is still saved.";

  const text = `Hi,

A little while ago you took the IQ·Test cognitive assessment and got your free score. ${indexLine}

If you'd like the full percentile breakdown, or the written reasoning analysis and historical figure match, you can pick it up from the same link:

${reportUrl}

No pressure — if you're not interested, no action needed. You're getting this because you opted in to occasional cognitive-science content when you took the test.

Unsubscribe from these emails: ${unsubUrl}

— IQ·Test
iq-test.icu`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; line-height:1.6; color:#1a1a1a; max-width:600px; margin:0 auto; padding:24px; background-color:#ffffff; border:1px solid #eaeaea; border-radius:12px;">
      <div style="text-align:center; margin-bottom:24px; border-bottom:1px solid #eaeaea; padding-bottom:16px;">
        <span style="font-family:Georgia,serif; font-size:24px; font-weight:bold; letter-spacing:0.05em; color:#B49048;">IQ&middot;TEST</span>
        <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#666666; margin-top:4px;">YOUR SAVED RESULT</div>
      </div>
      <div style="font-size:15px; margin-bottom:24px;">
        <p>A little while ago you took the IQ·Test cognitive assessment and got your free score. ${indexLine}</p>
        <p>If you'd like the full percentile breakdown, or the written reasoning analysis and historical figure match, you can pick it up from the same link:</p>
        <p style="text-align:center; margin:24px 0;"><a href="${reportUrl}" style="background:#B49048; color:#ffffff; text-decoration:none; padding:12px 28px; border-radius:8px; font-weight:600; display:inline-block;">View my saved result</a></p>
        <p style="font-size:13px; color:#666666;">No pressure — if you're not interested, no action needed.</p>
      </div>
      <div style="margin-top:32px; border-top:1px solid #eaeaea; padding-top:16px; font-size:12px; color:#888888; text-align:center; line-height:1.5;">
        This is a self-insight quiz, not a clinical IQ test.<br>
        &copy; 2026 APEX Business Systems Ltd. &nbsp;&middot;&nbsp; Edmonton, AB<br>
        <a href="https://iq-test.icu" style="color:#B49048; text-decoration:none;">iq-test.icu</a> &nbsp;&middot;&nbsp;
        <a href="${unsubUrl}" style="color:#888888;">Unsubscribe</a>
      </div>
    </div>
  `;

  await postResend(env, {
    to,
    subject: "Your IQ·Test score is still saved",
    text,
    html,
    headers: {
      "List-Unsubscribe":      `<${unsubUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
}

// ── Stripe HMAC signature verification (Web Crypto, no SDK) ──────────────────

async function verifyStripeSignature(payload, sigHeader, secret) {
  if (!sigHeader || !secret) return false;

  const parts     = Object.fromEntries(sigHeader.split(",").map((p) => p.split("=")));
  const timestamp = parts["t"];
  const sig       = parts["v1"];
  if (!timestamp || !sig) return false;

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - Number(timestamp)) > 300) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac      = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload));
  const expected = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return expected === sig;
}

// ── Util ──────────────────────────────────────────────────────────────────────

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
