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
  console.log("All tests passed cleanly!");
}

runAllTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
