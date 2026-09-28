import assert from "node:assert";
import worker from "../worker.js";

const mockEnv = {
  SUPABASE_URL: "https://mock.supabase.co",
  SUPABASE_SERVICE_KEY: "mock_service_key",
  ALLOWED_ORIGIN: "https://iq-test.icu"
};

async function testInvalidUuidReport() {
  const req = new Request("https://iq-test.icu/api/report?id=anything", { method: "GET" });
  const res = await worker.fetch(req, mockEnv);
  assert.strictEqual(res.status, 400, "Invalid UUID should return status 400");
  const data = await res.json();
  assert.strictEqual(data.error, "invalid_id", "Expected error 'invalid_id'");
  console.log("✓ GET /api/report?id=anything returns 400 invalid_id");
}

async function testValidUuidReportFormat() {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (url.includes("rest/v1/sessions")) {
      return new Response(JSON.stringify([{ id: "123e4567-e89b-12d3-a456-426614174000", paid: false, report: null, tier: null }]), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response("Not found", { status: 404 });
  };

  try {
    const validUuid = "123e4567-e89b-12d3-a456-426614174000";
    const req = new Request(`https://iq-test.icu/api/report?id=${validUuid}`, { method: "GET" });
    const res = await worker.fetch(req, mockEnv);
    assert.strictEqual(res.status, 200, "Valid UUID should return status 200 when found");
    const data = await res.json();
    assert.strictEqual(data.paid, false, "Expected paid field to match");
    console.log("✓ GET /api/report?id=<valid_uuid> returns 200 OK");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testTrackEventEndpoint() {
  const originalFetch = globalThis.fetch;
  let insertedData = null;
  globalThis.fetch = async (url, opts) => {
    if (url.includes("rest/v1/events")) {
      insertedData = JSON.parse(opts.body);
      return new Response(JSON.stringify([insertedData]), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response("Not found", { status: 404 });
  };

  try {
    const req = new Request("https://iq-test.icu/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "checkout_started", meta: { tier: "detailed" } })
    });
    const res = await worker.fetch(req, mockEnv);
    assert.strictEqual(res.status, 200, "Track event should return status 200");
    const data = await res.json();
    assert.strictEqual(data.ok, true, "Expected ok: true");
    assert.strictEqual(insertedData.event_name, "checkout_started", "Event name should match");
    console.log("✓ POST /api/track persists event into Supabase");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testUnsubscribeInvalidId() {
  const req = new Request("https://iq-test.icu/api/unsubscribe?id=not-a-uuid", { method: "GET" });
  const res = await worker.fetch(req, mockEnv);
  assert.strictEqual(res.status, 200, "Unsubscribe should always return 200, even for a bad id");
  const html = await res.text();
  assert.ok(html.includes("unsubscribed"), "Response should render the confirmation page");
  console.log("✓ GET /api/unsubscribe?id=<invalid> still returns a confirmation page, no Supabase call");
}

async function testUnsubscribeValidIdPatchesRow() {
  const originalFetch = globalThis.fetch;
  let patchedRow = null;
  globalThis.fetch = async (url, opts) => {
    if (url.includes("rest/v1/sessions") && opts && opts.method === "PATCH") {
      patchedRow = JSON.parse(opts.body);
      return new Response(JSON.stringify([{ id: "123e4567-e89b-12d3-a456-426614174000", ...patchedRow }]), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response("Not found", { status: 404 });
  };

  try {
    const validUuid = "123e4567-e89b-12d3-a456-426614174000";
    const req = new Request(`https://iq-test.icu/api/unsubscribe?id=${validUuid}`, { method: "GET" });
    const res = await worker.fetch(req, mockEnv);
    assert.strictEqual(res.status, 200, "Unsubscribe should return 200");
    assert.strictEqual(patchedRow.marketing_opt_in, false, "marketing_opt_in should be patched to false");
    console.log("✓ GET /api/unsubscribe?id=<valid_uuid> sets marketing_opt_in=false");

    // Test RFC 8058 POST One-Click Unsubscribe
    const postReq = new Request(`https://iq-test.icu/api/unsubscribe?id=${validUuid}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "List-Unsubscribe=One-Click"
    });
    const postRes = await worker.fetch(postReq, mockEnv);
    assert.strictEqual(postRes.status, 200, "RFC 8058 POST unsubscribe should return 200");
    const jsonRes = await postRes.json();
    assert.strictEqual(jsonRes.ok, true, "Response json ok should be true");
    console.log("✓ POST /api/unsubscribe?id=<valid_uuid> (RFC 8058) sets marketing_opt_in=false and returns 200 { ok: true }");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testRecoverySweepSendsAndMarksSent() {
  const originalFetch = globalThis.fetch;
  let emailSent = false;
  let patchedRow = null;

  globalThis.fetch = async (url, opts) => {
    if (url.includes("rest/v1/sessions") && (!opts || opts.method === undefined)) {
      // sbSelectRecoveryCandidates — one eligible lead
      return new Response(JSON.stringify([
        { id: "123e4567-e89b-12d3-a456-426614174000", email: "lead@example.com", cognitive_index: 112, percentile_estimate: 78 }
      ]), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/sessions") && opts && opts.method === "PATCH") {
      patchedRow = JSON.parse(opts.body);
      return new Response(JSON.stringify([{ id: "123e4567-e89b-12d3-a456-426614174000", ...patchedRow }]), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (url.includes("api.resend.com/emails")) {
      emailSent = true;
      return new Response(JSON.stringify({ id: "mock_email_id" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response("Not found", { status: 404 });
  };

  try {
    let capturedPromise = Promise.resolve();
    const ctx = { waitUntil: (p) => { capturedPromise = p; } };
    const env = { ...mockEnv, RESEND_API_KEY: "mock_key", RESEND_FROM: "IQ Test <report@iq-test.icu>" };
    await worker.scheduled({}, env, ctx);
    await capturedPromise;
    assert.strictEqual(emailSent, true, "Recovery email should be sent to the eligible lead");
    assert.strictEqual(patchedRow.recovery_sent, true, "Session row should be marked recovery_sent=true after send");
    console.log("✓ scheduled() recovery sweep emails eligible leads and marks recovery_sent=true");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

/** Regression shield for the unchecked-fetch bug (fixed 2026-08-11).
 *  fetch() resolves on a 4xx from Resend, so the sweep used to treat a rejected
 *  send as a success and set recovery_sent=true — permanently burning the lead
 *  with no email ever delivered. The row must stay untouched so the next
 *  nightly sweep re-picks it. */
async function testRecoverySweepDoesNotMarkSentWhenResendFails() {
  const originalFetch = globalThis.fetch;
  let patchAttempted = false;

  globalThis.fetch = async (url, opts) => {
    if (url.includes("rest/v1/sessions") && (!opts || opts.method === undefined)) {
      return new Response(JSON.stringify([
        { id: "123e4567-e89b-12d3-a456-426614174000", email: "lead@example.com", cognitive_index: 112, percentile_estimate: 78 }
      ]), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/sessions") && opts && opts.method === "PATCH") {
      patchAttempted = true;
      return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("api.resend.com/emails")) {
      // Resend rejects the send — fetch still RESOLVES, it does not throw.
      return new Response(JSON.stringify({ message: "domain not verified" }), { status: 403 });
    }
    return new Response("Not found", { status: 404 });
  };

  try {
    let capturedPromise = Promise.resolve();
    const ctx = { waitUntil: (p) => { capturedPromise = p; } };
    const env = { ...mockEnv, RESEND_API_KEY: "mock_key", RESEND_FROM: "IQ Test <report@iq-test.icu>" };
    await worker.scheduled({}, env, ctx);
    await capturedPromise;
    assert.strictEqual(patchAttempted, false, "A failed Resend send must NOT mark the row recovery_sent");
    console.log("\u2713 recovery sweep leaves the row retryable when Resend rejects the send");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function generateMockStripeSignature(payload, secret) {
  const timestamp = Math.floor(Date.now() / 1000);
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
  return `t=${timestamp},v1=${expected}`;
}

async function testWebhookFulfillWithoutReportSentAtOnResendFailure() {
  const originalFetch = globalThis.fetch;
  const webhookSecret = "whsec_test_secret";
  const env = {
    ...mockEnv,
    STRIPE_WEBHOOK_SECRET: webhookSecret,
    RESEND_API_KEY: "mock_key",
    RESEND_FROM: "IQ Test <report@iq-test.icu>",
    GROQ_API_KEY: "mock_groq_key"
  };

  const sessionId = "123e4567-e89b-12d3-a456-426614174000";
  const payloadObj = {
    id: "evt_test",
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_test_123",
        customer_email: "buyer@example.com",
        metadata: { session_id: sessionId, tier: "basic" }
      }
    }
  };
  const rawPayload = JSON.stringify(payloadObj);
  const sig = await generateMockStripeSignature(rawPayload, webhookSecret);

  let patches = [];
  let loggedEvents = [];

  globalThis.fetch = async (url, opts) => {
    if (url.includes("rest/v1/sessions?id=eq.") && (!opts || opts.method === undefined)) {
      return new Response(JSON.stringify([{
        id: sessionId,
        paid: false,
        email: "buyer@example.com",
        raw_score: 12,
        cognitive_index: 110,
        percentile_estimate: 75,
        category_breakdown: { catScores: { NUMERIC: 3 }, catMax: { NUMERIC: 4 } },
        tier: "basic"
      }]), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/sessions") && opts && opts.method === "PATCH") {
      const body = JSON.parse(opts.body);
      patches.push(body);
      return new Response(JSON.stringify([{ id: sessionId, ...body }]), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/events") && opts && opts.method === "POST") {
      const evt = JSON.parse(opts.body);
      loggedEvents.push(evt.event_name);
      return new Response(JSON.stringify([evt]), { status: 201, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("api.resend.com/emails")) {
      return new Response(JSON.stringify({ message: "rate limited" }), { status: 429 });
    }
    return new Response("Not found", { status: 404 });
  };

  try {
    const req = new Request("https://iq-test.icu/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": sig
      },
      body: rawPayload
    });
    const res = await worker.fetch(req, env);
    assert.strictEqual(res.status, 200, "Webhook should return 200 ok to prevent Stripe webhook failure storms");

    const fulfillPatch = patches.find(p => p.paid === true);
    assert.ok(fulfillPatch, "Session must be unlocked with paid=true");
    assert.strictEqual(fulfillPatch.report_sent_at, undefined, "report_sent_at must NOT be set when Resend fails");

    const sentAtPatch = patches.find(p => p.report_sent_at !== undefined);
    assert.strictEqual(sentAtPatch, undefined, "report_sent_at must never be marked on failed send");

    assert.ok(loggedEvents.includes("resend_send_failed"), "resend_send_failed event must be logged");
    console.log("✓ handleWebhook unlocks paid report on screen without marking report_sent_at when Resend fails");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testPaidReportsRetrySweepSendsAndMarksSent() {
  const originalFetch = globalThis.fetch;
  let emailSent = false;
  let patchedRow = null;
  let loggedEvents = [];

  globalThis.fetch = async (url, opts) => {
    if (url.includes("rest/v1/sessions") && url.includes("report_sent_at=is.null") && (!opts || opts.method === undefined)) {
      return new Response(JSON.stringify([
        { id: "123e4567-e89b-12d3-a456-426614174000", email: "buyer@example.com", report: "Your Detailed Cognitive Report...", cognitive_index: 125, tier: "detailed" }
      ]), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/sessions") && (!opts || opts.method === undefined)) {
      return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/sessions") && opts && opts.method === "PATCH") {
      patchedRow = JSON.parse(opts.body);
      return new Response(JSON.stringify([{ id: "123e4567-e89b-12d3-a456-426614174000", ...patchedRow }]), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (url.includes("rest/v1/events") && opts && opts.method === "POST") {
      const evt = JSON.parse(opts.body);
      loggedEvents.push(evt.event_name);
      return new Response(JSON.stringify([evt]), { status: 201, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("api.resend.com/emails")) {
      emailSent = true;
      return new Response(JSON.stringify({ id: "mock_resend_id" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response("Not found", { status: 404 });
  };

  try {
    let capturedPromise = Promise.resolve();
    const ctx = { waitUntil: (p) => { capturedPromise = p; } };
    const env = { ...mockEnv, RESEND_API_KEY: "mock_key", RESEND_FROM: "IQ Test <report@iq-test.icu>" };
    await worker.scheduled({}, env, ctx);
    await capturedPromise;

    assert.strictEqual(emailSent, true, "Paid report retry email should be sent via Resend");
    assert.ok(patchedRow && typeof patchedRow.report_sent_at === "string", "Row must be updated with report_sent_at timestamp");
    assert.ok(loggedEvents.includes("report_emailed"), "report_emailed event must be logged on successful retry");
    console.log("✓ scheduled() paid retry sweep retries undelivered reports and sets report_sent_at");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testPaidReportsRetrySweepDoesNotMarkSentWhenResendFails() {
  const originalFetch = globalThis.fetch;
  let patchAttempted = false;
  let loggedEvents = [];

  globalThis.fetch = async (url, opts) => {
    if (url.includes("rest/v1/sessions") && url.includes("report_sent_at=is.null") && (!opts || opts.method === undefined)) {
      return new Response(JSON.stringify([
        { id: "123e4567-e89b-12d3-a456-426614174000", email: "buyer@example.com", report: "Report text", cognitive_index: 125, tier: "detailed" }
      ]), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/sessions") && (!opts || opts.method === undefined)) {
      return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/sessions") && opts && opts.method === "PATCH") {
      patchAttempted = true;
      return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/events") && opts && opts.method === "POST") {
      const evt = JSON.parse(opts.body);
      loggedEvents.push(evt.event_name);
      return new Response(JSON.stringify([evt]), { status: 201, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("api.resend.com/emails")) {
      return new Response(JSON.stringify({ message: "internal error" }), { status: 500 });
    }
    return new Response("Not found", { status: 404 });
  };

  try {
    let capturedPromise = Promise.resolve();
    const ctx = { waitUntil: (p) => { capturedPromise = p; } };
    const env = { ...mockEnv, RESEND_API_KEY: "mock_key", RESEND_FROM: "IQ Test <report@iq-test.icu>" };
    await worker.scheduled({}, env, ctx);
    await capturedPromise;

    assert.strictEqual(patchAttempted, false, "Row must not be marked sent when retry fails");
    assert.ok(loggedEvents.includes("resend_send_failed"), "resend_send_failed event must be logged on failed retry");
    console.log("✓ paid retry sweep leaves the row retryable when Resend rejects the send");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testStatsQueriesSessionsCount() {
  const originalFetch = globalThis.fetch;
  let queriedUrl = null;
  let requestedHeaders = null;

  globalThis.fetch = async (url, opts) => {
    if (url.includes("rest/v1/sessions")) {
      queriedUrl = url;
      requestedHeaders = opts?.headers || {};
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "content-range": "0-0/42"
        }
      });
    }
    return new Response("Not found", { status: 404 });
  };

  try {
    const req = new Request("https://iq-test.icu/api/stats", { method: "GET" });
    const res = await worker.fetch(req, mockEnv);
    assert.strictEqual(res.status, 200, "Stats endpoint must return 200");
    const data = await res.json();
    assert.strictEqual(data.reportsGenerated, 42, "Must parse count=42 from content-range header");
    assert.ok(queriedUrl.includes("/rest/v1/sessions?paid=eq.true&select=count"), "Must query sessions where paid=true");
    assert.strictEqual(requestedHeaders.Prefer, "count=exact", "Must request exact count");
    console.log("✓ GET /api/stats queries sessions where paid=true and returns exact count");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

// ── Revenue-rescue contract (WI-3 … WI-6) ────────────────────────────────────

const RR_SESSION_ID = "123e4567-e89b-12d3-a456-426614174000";

function rrPost(path, body, ip, extraHeaders = {}) {
  return new Request(`https://iq-test.icu${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "CF-Connecting-IP": ip, ...extraHeaders },
    body: typeof body === "string" ? body : JSON.stringify(body)
  });
}

// Generic Supabase/Stripe/Groq/Resend stub. `row` is returned by session selects.
function rrStub({ row = null, groqContent = null, captures }) {
  return async (url, opts = {}) => {
    if (url.includes("rest/v1/sessions?id=eq.") && !opts.method) {
      return new Response(JSON.stringify(row ? [row] : []), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/sessions") && opts.method === "PATCH") {
      const body = JSON.parse(opts.body);
      captures.patches.push(body);
      return new Response(JSON.stringify([{ id: RR_SESSION_ID, ...body }]), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/sessions") && opts.method === "POST") {
      return new Response(JSON.stringify([{ id: RR_SESSION_ID }]), { status: 201, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("rest/v1/events")) {
      captures.events.push(JSON.parse(opts.body));
      return new Response("[{}]", { status: 201, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("api.stripe.com/v1/checkout/sessions")) {
      captures.stripe.push(new URLSearchParams(opts.body));
      return new Response(JSON.stringify({ url: "https://checkout.stripe.com/c/pay/cs_test" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("api.groq.com")) {
      captures.groq.push(JSON.parse(opts.body));
      return new Response(JSON.stringify({ choices: [{ message: { content: groqContent } }] }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.includes("api.resend.com/emails")) {
      captures.emails.push(JSON.parse(opts.body));
      return new Response(JSON.stringify({ id: "email_1" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response("Not found", { status: 404 });
  };
}

function rrCaptures() {
  return { patches: [], events: [], stripe: [], groq: [], emails: [] };
}

const RR_ROW = {
  id: RR_SESSION_ID,
  paid: false,
  email: "buyer@example.com",
  raw_score: 12,
  cognitive_index: 130,
  percentile_estimate: 90,
  category_breakdown: { catScores: { NUMERIC: 3, VERBAL: 2, LOGIC: 4, PATTERN: 3 }, catMax: { NUMERIC: 4, VERBAL: 4, LOGIC: 4, PATTERN: 4 } },
};

async function rrWebhook(env, tier, ip) {
  const rawPayload = JSON.stringify({
    id: "evt_rr",
    type: "checkout.session.completed",
    data: { object: { id: "cs_test_rr", customer_email: "buyer@example.com", metadata: { session_id: RR_SESSION_ID, tier } } }
  });
  const sig = await generateMockStripeSignature(rawPayload, env.STRIPE_WEBHOOK_SECRET);
  return worker.fetch(rrPost("/api/webhook", rawPayload, ip, { "stripe-signature": sig }), env);
}

const RR_ENV = {
  ...mockEnv,
  STRIPE_SECRET_KEY: "sk_test_mock",
  STRIPE_WEBHOOK_SECRET: "whsec_test_secret",
  RESEND_API_KEY: "mock_key",
  RESEND_FROM: "IQ Test <report@iq-test.icu>",
  GROQ_API_KEY: "mock_groq_key"
};

async function testCheckoutStripeLocaleMapping() {
  const originalFetch = globalThis.fetch;
  const captures = rrCaptures();
  globalThis.fetch = rrStub({ captures });
  try {
    const cases = [["zh", "zh"], ["ar", "auto"], ["tl", "fil"], ["fr", "fr"], ["xx", null]];
    for (const [i, [locale, expected]] of cases.entries()) {
      const res = await worker.fetch(rrPost("/api/checkout", { id: RR_SESSION_ID, email: "buyer@example.com", tier: "basic", locale }, `10.1.0.${i}`), RR_ENV);
      assert.strictEqual(res.status, 200, `checkout (${locale}) should return 200`);
      const params = captures.stripe[i];
      assert.strictEqual(params.get("locale"), expected, `locale=${locale} → Stripe locale ${expected}`);
      assert.ok(!params.toString().includes("zh-Hans"), "zh-Hans must never be sent (not in Stripe enum)");
    }
    assert.strictEqual(captures.patches[0].locale, "zh", "checkout must still persist sessions.locale");
    assert.strictEqual(captures.patches[4].locale, undefined, "invalid locale must not be persisted");
    console.log("✓ POST /api/checkout maps locale → Stripe enum (zh→zh, ar→auto, tl→fil, xx→omitted) and persists sessions.locale");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testGroqPromptLanguageAndLocalizedCompliance() {
  const originalFetch = globalThis.fetch;
  const captures = rrCaptures();
  const frenchClinical = "### Résumé global\nCe rapport est une évaluation clinique de vos capacités de raisonnement, avec des observations détaillées par domaine et une conclusion utile.";
  globalThis.fetch = rrStub({ row: { ...RR_ROW, tier: "detailed", locale: "fr" }, groqContent: frenchClinical, captures });
  try {
    const res = await rrWebhook(RR_ENV, "detailed", "10.2.0.1");
    assert.strictEqual(res.status, 200, "webhook should return 200");
    const prompt = captures.groq[0].messages[0].content;
    assert.ok(prompt.includes("natively in French"), "Groq prompt must name the language (French), not the code");
    assert.ok(prompt.includes('keep "###" as the heading marker'), "Groq prompt must keep ### heading markers");
    const report = captures.patches.find(p => p.paid === true).report;
    assert.ok(!report.includes("clinique"), "French report containing 'clinique' must be rejected");
    assert.ok(report.includes("Your puzzle responses"), "Rejected report must fall back to the safe template");
    console.log("✓ Groq prompt names the output language; French 'clinique' output is rejected → safe fallback");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testBasicReportSaysPercentCorrect() {
  const originalFetch = globalThis.fetch;
  const captures = rrCaptures();
  globalThis.fetch = rrStub({ row: { ...RR_ROW, tier: "basic" }, captures });
  try {
    const res = await rrWebhook(RR_ENV, "basic", "10.3.0.1");
    assert.strictEqual(res.status, 200, "webhook should return 200");
    const report = captures.patches.find(p => p.paid === true).report;
    assert.ok(report.includes("LOGIC: 4/4 (100% correct)"), "basic report must label category accuracy as % correct");
    assert.ok(!report.includes("percentile in this category"), "basic report must not mislabel % correct as a percentile");
    assert.strictEqual(captures.groq.length, 0, "basic tier must not call Groq");
    console.log("✓ basic report labels category results as '% correct' (not 'percentile')");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testReportHtmlEscapesAndRendersSubset() {
  const originalFetch = globalThis.fetch;
  const captures = rrCaptures();
  const md = [
    "<script>alert(1)</script>",
    "### Overall Summary",
    "A **bold** claim and an *italic* aside.",
    "",
    "- first point",
    "- second point",
    "",
    "---",
    "### Printable Certificate of Cognitive Assessment",
    "**IQ·TEST COGNITIVE ASSESSMENT INDEX: 130**",
    "*Estimated Population Percentile: 90th Percentile*",
    "*Verification ID: abc*"
  ].join("\n");
  globalThis.fetch = rrStub({ row: { ...RR_ROW, paid: true, tier: "complete", report: md }, captures });
  try {
    const res = await worker.fetch(new Request(`https://iq-test.icu/api/report?id=${RR_SESSION_ID}`), RR_ENV);
    const data = await res.json();
    assert.strictEqual(data.paid, true, "paid field intact");
    assert.strictEqual(data.report, md, "raw report field intact");
    assert.strictEqual(data.tier, "complete", "tier field intact");
    const html = data.report_html;
    assert.ok(html.includes("&lt;script&gt;alert(1)&lt;/script&gt;") && !html.includes("<script>"), "<script> must be escaped");
    assert.ok(html.includes("<h4>Overall Summary</h4>"), "### heading → <h4>");
    assert.ok(html.includes("<strong>bold</strong>") && html.includes("<em>italic</em>"), "bold/italic converted");
    assert.ok(html.includes("<ul><li>first point</li><li>second point</li></ul>"), "list wrapped in <ul>");
    assert.ok(html.includes("<hr>"), "--- → <hr>");
    assert.ok(!/[#*]/.test(html), "certificate block renders with no literal # or *");

    globalThis.fetch = rrStub({ row: { ...RR_ROW, paid: false, report: null }, captures });
    const unpaid = await (await worker.fetch(new Request(`https://iq-test.icu/api/report?id=${RR_SESSION_ID}`), RR_ENV)).json();
    assert.strictEqual(unpaid.report_html, null, "unpaid report_html must be null");
    console.log("✓ GET /api/report adds escaped report_html (headings, bold, italic, lists, hr) with old fields intact");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testReportEmailRendersHtmlNotRawMarkdown() {
  const originalFetch = globalThis.fetch;
  const captures = rrCaptures();
  const content = "### Overall Summary\nYour answers show **steady** structured reasoning across the four puzzle areas <b>today</b>.\n\n### Reflective Takeaway\nKeep practising timed pattern puzzles to build flexibility.";
  globalThis.fetch = rrStub({ row: { ...RR_ROW, tier: "complete" }, groqContent: content, captures });
  try {
    const res = await rrWebhook(RR_ENV, "complete", "10.4.0.1");
    assert.strictEqual(res.status, 200, "webhook should return 200");
    const email = captures.emails[0];
    assert.ok(email.html.includes('<h4 style="'), "email headings carry inline styles");
    assert.ok(email.html.includes("&lt;b&gt;today&lt;/b&gt;"), "email HTML escapes model output");
    assert.ok(!email.html.includes("white-space: pre-wrap"), "email body no longer uses pre-wrap raw text");
    assert.ok(!email.html.includes("###"), "email HTML contains no raw markdown headings");
    assert.ok(email.text.includes("### Overall Summary"), "plain-text part stays raw markdown");
    console.log("✓ report email renders escaped, inline-styled HTML; text part stays markdown");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testRateLimiterBuckets() {
  const originalFetch = globalThis.fetch;
  const captures = rrCaptures();
  globalThis.fetch = rrStub({ captures });
  try {
    const ip = "10.5.0.1";
    for (let i = 0; i < 20; i++) {
      const r = await worker.fetch(rrPost("/api/track", { event: "page_view" }, ip), RR_ENV);
      assert.strictEqual(r.status, 200, "track under 60/min must succeed");
    }
    const checkout = await worker.fetch(rrPost("/api/checkout", { id: RR_SESSION_ID, email: "buyer@example.com", tier: "basic" }, ip), RR_ENV);
    assert.notStrictEqual(checkout.status, 429, "20 track POSTs must not throttle checkout");

    const ip2 = "10.5.0.2";
    const saveBody = { email: "lead@example.com", raw: 10, consentGiven: true };
    const statuses = [];
    for (let i = 0; i < 16; i++) statuses.push((await worker.fetch(rrPost("/api/save-result", saveBody, ip2), RR_ENV)).status);
    assert.ok(statuses.slice(0, 15).every(s => s === 200), "first 15 core POSTs succeed");
    assert.strictEqual(statuses[15], 429, "16th core POST is 429");

    const webhook = await worker.fetch(rrPost("/api/webhook", "{}", ip2, { "stripe-signature": "t=1,v1=bad" }), RR_ENV);
    assert.notStrictEqual(webhook.status, 429, "webhook must never be rate limited");
    assert.strictEqual(webhook.status, 400, "webhook still enforces its signature check");

    const ip3 = "10.5.0.3";
    const eventsBefore = captures.events.length;
    let last;
    for (let i = 0; i < 61; i++) last = await worker.fetch(rrPost("/api/track", { event: "page_view" }, ip3), RR_ENV);
    assert.strictEqual(last.status, 204, "61st track POST is quietly dropped with 204");
    assert.strictEqual(captures.events.length - eventsBefore, 60, "rate-limited telemetry is not written to Supabase");
    console.log("✓ rate limiter: track bucket (60/min, quiet 204) never starves checkout; core 15/min; webhook exempt");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function testLogEventsRegisteredWithWaitUntil() {
  const originalFetch = globalThis.fetch;
  const captures = rrCaptures();
  globalThis.fetch = async (url, opts = {}) => {
    if (url.includes("rest/v1/sessions?") && !opts.method) {
      return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return rrStub({ captures })(url, opts);
  };
  try {
    const pending = [];
    const ctx = { waitUntil: (p) => { pending.push(p); } };
    const res = await worker.fetch(rrPost("/api/save-result", { email: "lead@example.com", raw: 10, consentGiven: true, leadOnly: true }, "10.6.0.1"), RR_ENV, ctx);
    assert.strictEqual(res.status, 200, "save-result should succeed");
    assert.ok(pending.length >= 1, "logEvent must register its Supabase write with ctx.waitUntil");
    await Promise.all(pending);
    assert.ok(captures.events.some(e => e.event_name === "lead_captured"), "lead_captured must be persisted, not dropped after the response");

    const cronPending = [];
    await worker.scheduled({}, RR_ENV, { waitUntil: (p) => { cronPending.push(p); } });
    for (let i = 0; i < cronPending.length; i++) await cronPending[i]; // later entries are registered while earlier ones run
    assert.ok(captures.events.some(e => e.event_name === "recovery_sweep_completed"), "cron events must survive until the write completes");
    console.log("✓ server-side events are registered with ctx.waitUntil (request + cron) so they are not dropped");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function runAllTests() {
  console.log("Running Worker Verification Tests...");
  await testInvalidUuidReport();
  await testValidUuidReportFormat();
  await testTrackEventEndpoint();
  await testUnsubscribeInvalidId();
  await testUnsubscribeValidIdPatchesRow();
  await testRecoverySweepSendsAndMarksSent();
  await testRecoverySweepDoesNotMarkSentWhenResendFails();
  await testWebhookFulfillWithoutReportSentAtOnResendFailure();
  await testPaidReportsRetrySweepSendsAndMarksSent();
  await testPaidReportsRetrySweepDoesNotMarkSentWhenResendFails();
  await testStatsQueriesSessionsCount();
  await testCheckoutStripeLocaleMapping();
  await testGroqPromptLanguageAndLocalizedCompliance();
  await testBasicReportSaysPercentCorrect();
  await testReportHtmlEscapesAndRendersSubset();
  await testReportEmailRendersHtmlNotRawMarkdown();
  await testRateLimiterBuckets();
  await testLogEventsRegisteredWithWaitUntil();
  console.log("All tests passed cleanly!");
}

runAllTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
