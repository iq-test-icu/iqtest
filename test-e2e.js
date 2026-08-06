import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import worker from "./worker/worker.js";

const rootDir = process.cwd();
const mockEnv = {
  SUPABASE_URL: "https://buaxjmahjinuowoidhmn.supabase.co",
  SUPABASE_SERVICE_KEY: "mock_service_key",
  ALLOWED_ORIGIN: "https://iq-test.icu"
};

console.log("==================================================================");
console.log("       APEX-IQTEST COMPREHENSIVE END-TO-END VALIDATION SUITE      ");
console.log("==================================================================");

let totalPassed = 0;
let totalFailed = 0;

function assertTest(condition, name, details = "") {
  if (condition) {
    console.log(`[PASS] ✓ ${name} ${details ? "(" + details + ")" : ""}`);
    totalPassed++;
  } else {
    console.error(`[FAIL] ✗ ${name} ${details ? "(" + details + ")" : ""}`);
    totalFailed++;
  }
}

// ── 1. API /api/report UUID Guard Test ────────────────────────────────────────
async function validateApiReportUuidGuard() {
  console.log("\n--- 1. Testing GET /api/report UUID Validation Guard ---");
  
  // Case A: Invalid UUID format ("anything")
  const reqInvalid = new Request("https://iq-test.icu/api/report?id=anything", { method: "GET" });
  const resInvalid = await worker.fetch(reqInvalid, mockEnv);
  const dataInvalid = await resInvalid.json();
  assertTest(resInvalid.status === 400 && dataInvalid.error === "invalid_id", "GET /api/report?id=anything returns HTTP 400 (invalid_id)");

  // Case B: Invalid UUID format ("123")
  const reqShort = new Request("https://iq-test.icu/api/report?id=123", { method: "GET" });
  const resShort = await worker.fetch(reqShort, mockEnv);
  const dataShort = await resShort.json();
  assertTest(resShort.status === 400 && dataShort.error === "invalid_id", "GET /api/report?id=123 returns HTTP 400 (invalid_id)");

  // Case C: Valid UUID format
  const validUuid = "123e4567-e89b-12d3-a456-426614174000";
  const origFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (url.includes("rest/v1/sessions")) {
      return new Response(JSON.stringify([{ id: validUuid, paid: true, report: "Sample report", tier: "detailed" }]), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response("Not found", { status: 404 });
  };

  try {
    const reqValid = new Request(`https://iq-test.icu/api/report?id=${validUuid}`, { method: "GET" });
    const resValid = await worker.fetch(reqValid, mockEnv);
    const dataValid = await resValid.json();
    assertTest(resValid.status === 200 && dataValid.paid === true, "GET /api/report?id=<valid_uuid> succeeds with HTTP 200");
  } finally {
    globalThis.fetch = origFetch;
  }
}

// ── 2. Canonical URL Tags Test ────────────────────────────────────────────────
function validateCanonicalUrls() {
  console.log("\n--- 2. Testing HTML Canonical Tag Alignment ---");

  const page1Path = path.join(rootDir, "public", "cognitive-test-vs-iq-test.html");
  const page1Content = fs.readFileSync(page1Path, "utf8");
  const page1Match = page1Content.match(/<link\s+rel="canonical"\s+href="([^"]+)">/i);
  const page1Canonical = page1Match ? page1Match[1] : "";
  assertTest(page1Canonical === "https://iq-test.icu/cognitive-test-vs-iq-test", "cognitive-test-vs-iq-test.html canonical URL is extensionless", page1Canonical);

  const page2Path = path.join(rootDir, "public", "free-iq-test-online.html");
  const page2Content = fs.readFileSync(page2Path, "utf8");
  const page2Match = page2Content.match(/<link\s+rel="canonical"\s+href="([^"]+)">/i);
  const page2Canonical = page2Match ? page2Match[1] : "";
  assertTest(page2Canonical === "https://iq-test.icu/free-iq-test-online", "free-iq-test-online.html canonical URL is extensionless", page2Canonical);
}

// ── 3. Telemetry Event Persistence Test ──────────────────────────────────────
async function validateTelemetryPersistence() {
  console.log("\n--- 3. Testing Telemetry Persistence (POST /api/track & Supabase) ---");

  let payloadInserted = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    if (url.includes("rest/v1/events")) {
      payloadInserted = JSON.parse(opts.body);
      return new Response(JSON.stringify([payloadInserted]), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response("Not found", { status: 404 });
  };

  try {
    const reqTrack = new Request("https://iq-test.icu/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "lead_captured", meta: { email: "user@apex.com" } })
    });
    const resTrack = await worker.fetch(reqTrack, mockEnv);
    const dataTrack = await resTrack.json();
    assertTest(resTrack.status === 200 && dataTrack.ok === true, "POST /api/track returns HTTP 200 { ok: true }");
    assertTest(payloadInserted && payloadInserted.event_name === "lead_captured", "Payload correctly routed to Supabase events table");
  } finally {
    globalThis.fetch = origFetch;
  }

  // Verify trackEvent in public/index.html includes fetch to /api/track
  const indexPath = path.join(rootDir, "public", "index.html");
  const indexContent = fs.readFileSync(indexPath, "utf8");
  assertTest(indexContent.includes('fetch((typeof API_BASE !== "undefined" ? API_BASE : "") + "/api/track"'), "index.html trackEvent() executes POST to /api/track");
}

// ── 4. Lead Row Deduplication Test ───────────────────────────────────────────
function validateLeadDeduplication() {
  console.log("\n--- 4. Testing Lead Row Deduplication in startCheckout() ---");

  const indexPath = path.join(rootDir, "public", "index.html");
  const indexContent = fs.readFileSync(indexPath, "utf8");
  const leadCheckCode = indexContent.includes("let id = window.__leadSavedId;") && indexContent.includes("if (!id) {");
  assertTest(leadCheckCode, "startCheckout() reuses window.__leadSavedId if set, skipping duplicate save-result calls");
}

// ── 5. Dead Anti-Bot Code Removal Test ───────────────────────────────────────
function validateAntiBotCleanup() {
  console.log("\n--- 5. Testing Anti-Bot Code Cleanup in worker.js ---");

  const workerPath = path.join(rootDir, "worker", "worker.js");
  const workerContent = fs.readFileSync(workerPath, "utf8");
  const scannerPresent = workerContent.includes("scannerRegex") || workerContent.includes("bot_probe_blocked");
  assertTest(!scannerPresent, "Unreachable anti-bot scanner code (wp-admin, .env, xmlrpc) removed from worker.js");
}

async function runE2E() {
  await validateApiReportUuidGuard();
  validateCanonicalUrls();
  await validateTelemetryPersistence();
  validateLeadDeduplication();
  validateAntiBotCleanup();

  console.log("\n==================================================================");
  console.log(`SUMMARY: ${totalPassed} PASSED | ${totalFailed} FAILED`);
  console.log("==================================================================");

  if (totalFailed > 0) {
    process.exit(1);
  }
}

runE2E().catch((err) => {
  console.error("E2E Test execution failed:", err);
  process.exit(1);
});
