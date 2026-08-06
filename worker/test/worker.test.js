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

async function runAllTests() {
  console.log("Running Worker Verification Tests...");
  await testInvalidUuidReport();
  await testValidUuidReportFormat();
  await testTrackEventEndpoint();
  console.log("All tests passed cleanly!");
}

runAllTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
