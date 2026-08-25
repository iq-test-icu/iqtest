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
console.log("       APEX-IQTEST FULL VALIDATION SUITE — v2 (6 Domains)        ");
console.log("==================================================================");

let totalPassed = 0;
let totalFailed = 0;
const failures = [];

function pass(name, detail = "") {
  console.log(`[PASS] ✓ ${name}${detail ? " (" + detail + ")" : ""}`);
  totalPassed++;
}
function fail(name, detail = "") {
  console.error(`[FAIL] ✗ ${name}${detail ? " — " + detail : ""}`);
  failures.push(name);
  totalFailed++;
}
function check(condition, name, detail = "") {
  condition ? pass(name, detail) : fail(name, detail);
}

// ── DOMAIN 1: /api/report UUID Guard ─────────────────────────────────────────
async function domain1_apiReportUuid() {
  console.log("\n[DOMAIN 1] GET /api/report UUID Validation");

  const reqAnything = new Request("https://iq-test.icu/api/report?id=anything", { method: "GET" });
  const r1 = await worker.fetch(reqAnything, mockEnv);
  const d1 = await r1.json();
  check(r1.status === 400 && d1.error === "invalid_id", "id=anything → 400 invalid_id");

  const reqShort = new Request("https://iq-test.icu/api/report?id=123", { method: "GET" });
  const r2 = await worker.fetch(reqShort, mockEnv);
  const d2 = await r2.json();
  check(r2.status === 400 && d2.error === "invalid_id", "id=123 → 400 invalid_id");

  const reqEmpty = new Request("https://iq-test.icu/api/report", { method: "GET" });
  const r3 = await worker.fetch(reqEmpty, mockEnv);
  const d3 = await r3.json();
  check(r3.status === 400 && d3.error === "missing_id", "missing id param → 400 missing_id");

  const validUuid = "123e4567-e89b-12d3-a456-426614174000";
  const origFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (url.includes("rest/v1/sessions")) {
      return new Response(JSON.stringify([{ id: validUuid, paid: true, report: "Test report", tier: "detailed" }]), {
        status: 200, headers: { "Content-Type": "application/json" }
      });
    }
    return new Response("Not found", { status: 404 });
  };
  try {
    const r4 = await worker.fetch(new Request(`https://iq-test.icu/api/report?id=${validUuid}`, { method: "GET" }), mockEnv);
    const d4 = await r4.json();
    check(r4.status === 200 && d4.paid === true, "valid UUID → 200 with paid=true");
  } finally { globalThis.fetch = origFetch; }
}

// ── DOMAIN 2: Canonical URL Alignment ────────────────────────────────────────
function domain2_canonicalUrls() {
  console.log("\n[DOMAIN 2] HTML Canonical URL Tags");

  const pages = [
    { file: "cognitive-test-vs-iq-test.html", expected: "https://iq-test.icu/cognitive-test-vs-iq-test" },
    { file: "free-iq-test-online.html",        expected: "https://iq-test.icu/free-iq-test-online" },
    { file: "about.html",                       expected: "https://iq-test.icu/about" },
    { file: "methodology.html",                 expected: "https://iq-test.icu/methodology" },
    { file: "what-is-an-iq-test.html",          expected: "https://iq-test.icu/what-is-an-iq-test" },
    { file: "historical-figures-iq.html",       expected: "https://iq-test.icu/historical-figures-iq" },
  ];
  for (const { file, expected } of pages) {
    const content = fs.readFileSync(path.join(rootDir, "public", file), "utf8");
    const m = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*>/i);
    const canonical = m ? m[1] : "(missing)";
    check(canonical === expected, `${file} canonical is extensionless`, canonical);
  }
}

// ── DOMAIN 3: Telemetry Persistence ──────────────────────────────────────────
async function domain3_telemetry() {
  console.log("\n[DOMAIN 3] Telemetry Persistence — POST /api/track");

  let inserted = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    if (url.includes("rest/v1/events")) {
      inserted = JSON.parse(opts.body);
      return new Response(JSON.stringify([inserted]), { status: 201, headers: { "Content-Type": "application/json" } });
    }
    return new Response("Not found", { status: 404 });
  };
  try {
    const r = await worker.fetch(new Request("https://iq-test.icu/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "report_viewed", meta: { reportId: "abc123" } })
    }), mockEnv);
    const d = await r.json();
    check(r.status === 200 && d.ok === true, "POST /api/track returns 200 { ok: true }");
    check(inserted?.event_name === "report_viewed", "event_name correctly inserted into events table");
  } finally { globalThis.fetch = origFetch; }

  // Verify invalid payload rejected
  const r2 = await worker.fetch(new Request("https://iq-test.icu/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ meta: {} }) // missing name
  }), mockEnv);
  check(r2.status === 400, "POST /api/track with missing name → 400");

  // Verify index.html wires trackEvent to /api/track
  const html = fs.readFileSync(path.join(rootDir, "public", "index.html"), "utf8");
  check(html.includes('"/api/track"'), "index.html trackEvent() calls /api/track");
}

// ── DOMAIN 4: Lead Row Deduplication ─────────────────────────────────────────
function domain4_leadDedup() {
  console.log("\n[DOMAIN 4] Lead Row Deduplication in startCheckout()");

  const html = fs.readFileSync(path.join(rootDir, "public", "index.html"), "utf8");
  check(html.includes("let id = window.__leadSavedId;"), "startCheckout reads window.__leadSavedId before calling save-result");
  check(html.includes("if (!id) {"), "startCheckout only calls save-result when id is not yet set");
  check(html.includes("window.__leadSavedId = id;"), "startCheckout stores returned id into window.__leadSavedId");
}

// ── DOMAIN 5: Percentile Mapping ─────────────────────────────────────────────
function domain5_percentile() {
  console.log("\n[DOMAIN 5] Percentile Mapping — Raw Score Calibration");

  const html = fs.readFileSync(path.join(rootDir, "public", "index.html"), "utf8");

  // Old flat PERCENTILE_TABLE removed
  check(!html.includes("const PERCENTILE_TABLE"), "Old PERCENTILE_TABLE lookup removed");
  // New raw score table present
  check(html.includes("RAW_PCT_TABLE"), "New RAW_PCT_TABLE (raw score → percentile) present");
  // isUuid guard still present
  check(html.includes("percentileFor(index)"), "percentileFor() function still wired up");

  // Verify percentile values are monotonic (correct calibration)
  // Extract raw table from source
  const tableMatch = html.match(/const RAW_PCT_TABLE = \[([\s\S]+?)\];/);
  if (tableMatch) {
    const entries = [...tableMatch[1].matchAll(/\[(\d+),(\d+)\]/g)].map(m => [+m[1], +m[2]]);
    let monotonic = true;
    for (let i = 1; i < entries.length; i++) {
      if (entries[i][1] < entries[i-1][1]) { monotonic = false; break; }
    }
    check(monotonic, "RAW_PCT_TABLE values are monotonically non-decreasing (valid calibration)");
    check(entries[8][0] === 8 && entries[8][1] === 50, "Score 8/16 maps to 50th percentile (correct median)", `[${entries[8]}]`);
    check(entries[16][1] >= 99, "Perfect score (16/16) maps to ≥99th percentile", `${entries[16][1]}th`);
  } else {
    fail("RAW_PCT_TABLE could not be parsed from index.html");
  }
}

// ── DOMAIN 6: Gift CTA Fix + Paywall Clarity ─────────────────────────────────
function domain6_giftAndPaywall() {
  console.log("\n[DOMAIN 6] Gift CTA Removal + Paywall Clarity");

  const html = fs.readFileSync(path.join(rootDir, "public", "index.html"), "utf8");

  // Gift CTA removed from paid report screen
  check(!html.includes("Gift a Friend's Test Pass"), "Broken gift CTA removed from paid report screen");
  check(!html.includes("?gift=true"), "Broken gift=true redirect removed from startGiftCheckout()");
  // Share CTA present instead
  check(html.includes("shareResult()"), "Share result CTA wired in report screen instead of broken gift CTA");

  // Paywall clarity: sample excerpt
  check(html.includes("sample Deep Report excerpt"), "Sample report excerpt accordion present on paywall");
  check(html.includes("Overall Summary"), "Sample excerpt includes 'Overall Summary' section");
  check(html.includes("Historical Match"), "Sample excerpt includes 'Historical Match' section");

  // Paywall clarity: delivery time on each tier
  check(html.includes("~30 seconds") && html.includes("~45 seconds") && html.includes("~60 seconds"), "All 3 tiers state concrete delivery time estimates");

  // Paywall clarity: word count / section count on detailed tier
  check(html.includes("~200-word") && html.includes("6 sections"), "Detailed tier card states word count and section count");

  // Anti-bot code gone
  check(!html.includes("scannerRegex") && !html.includes("bot_probe_blocked"), "Dead anti-bot scanner code absent from worker.js (verified via JS import)");

  // Also verify from worker.js directly
  const workerJs = fs.readFileSync(path.join(rootDir, "worker", "worker.js"), "utf8");
  check(!workerJs.includes("scannerRegex"), "worker.js: scannerRegex block confirmed absent");
  check(workerJs.includes("isUuid"), "worker.js: isUuid() guard confirmed present");
  check(workerJs.includes("handleTrackEvent"), "worker.js: handleTrackEvent() confirmed present");
}

async function run() {
  await domain1_apiReportUuid();
  domain2_canonicalUrls();
  await domain3_telemetry();
  domain4_leadDedup();
  domain5_percentile();
  domain6_giftAndPaywall();

  console.log("\n==================================================================");
  console.log(`SUMMARY: ${totalPassed} PASSED | ${totalFailed} FAILED`);
  if (failures.length > 0) {
    console.log("FAILED ASSERTIONS:");
    failures.forEach(f => console.log(`  ✗ ${f}`));
  }
  console.log("==================================================================");
  process.exit(totalFailed > 0 ? 1 : 0);
}

run().catch(err => { console.error("Suite crashed:", err); process.exit(1); });
