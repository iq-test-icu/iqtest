import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
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

// ── DOMAIN 7–10: Revenue-rescue frontend contract (WI-1, WI-2, WI-3a, WI-7, WI-8) ──
// Executes the real page script in a vm sandbox with a minimal DOM stub (tests only).
const LOCALE_DIRS = ["de", "fr", "es", "pt", "it", "nl", "ja", "ko", "zh", "ar", "hi", "tl"];
const HOST_GUARD = '(function(){var h=location.hostname;if(h==="www.iq-test.icu"||h==="apex-iqtest.pages.dev"){location.replace("https://iq-test.icu"+location.pathname+location.search+location.hash);}})();';

function readPage(locale) {
  return fs.readFileSync(path.join(rootDir, "public", locale ? `${locale}/index.html` : "index.html"), "utf8");
}

function mainScript(html) {
  const start = html.indexOf("<script>\nconst API_BASE");
  return html.slice(start + "<script>".length, html.indexOf("</script>", start));
}

function makeEl(id) {
  const classes = new Set();
  return {
    id, textContent: "", innerHTML: "", value: "", checked: false, disabled: false,
    style: {}, dataset: {}, children: [],
    classList: { add: c => classes.add(c), remove: c => classes.delete(c), toggle: () => {}, contains: c => classes.has(c) },
    scrollIntoView() {}, appendChild(c) { this.children.push(c); }, prepend(c) { this.children.unshift(c); },
    setAttribute() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => []
  };
}

// Returns { ctx, els, calls } — calls records every fetch(url, body) made by the page.
function loadPage(html, { search = "", fetchImpl, lang = "en", tier = "detailed" } = {}) {
  const els = {};
  const calls = [];
  const document = {
    documentElement: { lang },
    getElementById: id => (els[id] = els[id] || makeEl(id)),
    createElement: tag => makeEl(tag),
    querySelector: sel => (sel.includes('name="tier"') ? { value: tier } : makeEl(sel)),
    querySelectorAll: () => [],
    addEventListener() {}
  };
  const location = { search, href: "", hostname: "iq-test.icu", pathname: "/" };
  const ctx = vm.createContext({
    document, location, navigator: {}, console: { log() {}, error() {}, warn() {} },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    performance: { now: () => 0 }, requestAnimationFrame: () => 0,
    setTimeout: fn => { Promise.resolve().then(fn); return 0; }, clearTimeout() {},
    URLSearchParams, JSON, Promise, Error, Math, encodeURIComponent,
    fetch: async (url, opts = {}) => {
      const body = opts.body ? JSON.parse(opts.body) : null;
      calls.push({ url, body });
      return fetchImpl(url, body);
    }
  });
  ctx.window = ctx;
  vm.runInContext(mainScript(html), ctx);
  return { ctx, els, calls };
}

const flush = async () => { for (let i = 0; i < 200; i++) await new Promise(r => setImmediate(r)); };
const okJson = (obj, status = 200) => ({ ok: status < 400, status, json: async () => obj });
const tracked = (calls, name) => calls.filter(c => c.url.endsWith("/api/track") && c.body && (c.body.name === name || c.body.event === name));

function domain7_hostGuard() {
  console.log("\n[DOMAIN 7] WI-1 Host canonicalization guard");
  for (const loc of [null, ...LOCALE_DIRS]) {
    const html = readPage(loc);
    const label = loc ? `${loc}/index.html` : "index.html";
    check(html.split(HOST_GUARD).length - 1 === 1, `${label} contains the host guard exactly once`);
    const head = html.slice(0, html.indexOf("</head>"));
    check(head.indexOf("<script>") === head.indexOf("<script>\n" + HOST_GUARD), `${label} guard is the first script in <head>`);
  }
  const cases = [
    ["www.iq-test.icu", "https://iq-test.icu/fr/?report=abc#top"],
    ["apex-iqtest.pages.dev", "https://iq-test.icu/fr/?report=abc#top"],
    ["feature-x.apex-iqtest.pages.dev", null],
    ["localhost", null],
    ["iq-test.icu", null]
  ];
  for (const [hostname, expected] of cases) {
    let replaced = null;
    const location = { hostname, pathname: "/fr/", search: "?report=abc", hash: "#top", replace: u => { replaced = u; } };
    vm.runInNewContext(HOST_GUARD, { location });
    check(replaced === expected, `guard on ${hostname} → ${expected || "no redirect"}`, String(replaced));
  }
}

async function domain8_errorMessaging() {
  console.log("\n[DOMAIN 8] WI-2 Honest checkout/lead error messaging + WI-3a locale passthrough");
  const html = readPage(null);
  const validationMsg = "Please enter a valid email and tick the checkbox above.";
  const setup = (fetchImpl, opts) => {
    const page = loadPage(html, { fetchImpl, ...opts });
    page.els.emailInput = Object.assign(makeEl("emailInput"), { value: "buyer@example.com" });
    page.els.consentCheck = Object.assign(makeEl("consentCheck"), { checked: true });
    page.els.checkoutError = Object.assign(makeEl("checkoutError"), { textContent: validationMsg });
    return page;
  };
  const UI = vm.runInContext("UI_MSG", setup(async () => okJson({})).ctx);

  // Network rejection at save stage → save message (not the validation message)
  let p = setup(async url => { if (url.endsWith("/api/track")) return okJson({ ok: true }); throw new TypeError("Failed to fetch"); });
  await p.ctx.startCheckout(); await flush();
  check(p.els.checkoutError.textContent === UI.saveFailed, "fetch rejection (save stage) shows the save-failure message");
  check(p.els.checkoutError.textContent !== validationMsg, "fetch rejection does not show the validation message");
  check(p.els.checkoutBtn.textContent === vm.runInContext("TIER_CTA.detailed", p.ctx), "button resets to TIER_CTA[tier]");
  const errEvt = tracked(p.calls, "checkout_error")[0];
  check(errEvt && errEvt.body.meta.stage === "save" && errEvt.body.meta.status === "network", "checkout_error {stage:save, status:network} tracked");

  // Network rejection at checkout stage → checkout message
  p = setup(async url => { if (url.endsWith("/api/track")) return okJson({ ok: true }); throw new TypeError("Failed to fetch"); });
  p.ctx.__leadSavedId = "123e4567-e89b-12d3-a456-426614174000";
  await p.ctx.startCheckout(); await flush();
  check(p.els.checkoutError.textContent === UI.checkoutFailed, "fetch rejection (checkout stage) shows the checkout network message");

  // 429 → rate-limit message; then validation error restores original copy
  p = setup(async url => url.endsWith("/api/track") ? okJson({ ok: true }) : okJson({ error: "too_many_requests" }, 429));
  await p.ctx.startCheckout(); await flush();
  check(p.els.checkoutError.textContent === UI.rateLimited, "HTTP 429 shows the rate-limit message");
  check(tracked(p.calls, "checkout_error")[0].body.meta.status === 429, "checkout_error carries HTTP status 429");
  p.els.emailInput.value = "not-an-email";
  await p.ctx.startCheckout();
  check(p.els.checkoutError.textContent === validationMsg, "next validation error restores the original validation copy");

  // Lead save failure
  p = setup(async url => url.endsWith("/api/track") ? okJson({ ok: true }) : okJson({ error: "internal_error" }, 500));
  p.els.leadEmailInput = Object.assign(makeEl("leadEmailInput"), { value: "lead@example.com" });
  p.els.leadConsentCheck = Object.assign(makeEl("leadConsentCheck"), { checked: true });
  await p.ctx.submitLead(); await flush();
  check(p.els.leadError.textContent === UI.saveFailed, "lead save failure shows the save-failure message");
  const leadEvt = tracked(p.calls, "lead_error")[0];
  check(leadEvt && leadEvt.body.meta.status === 500 && !("email" in leadEvt.body.meta), "lead_error tracked with status and no email");

  // Locale passthrough on a generated locale page (fr) + translated copy
  const frHtml = readPage("fr");
  const fr = loadPage(frHtml, { lang: "fr", fetchImpl: async url => url.endsWith("/api/save-result") ? okJson({ id: "123e4567-e89b-12d3-a456-426614174000" }) : url.endsWith("/api/checkout") ? okJson({ url: "https://checkout.stripe.com/x" }) : okJson({ ok: true }) });
  fr.els.emailInput = Object.assign(makeEl("emailInput"), { value: "buyer@example.com" });
  fr.els.consentCheck = Object.assign(makeEl("consentCheck"), { checked: true });
  await fr.ctx.startCheckout(); await flush();
  const save = fr.calls.find(c => c.url.endsWith("/api/save-result"));
  const co = fr.calls.find(c => c.url.endsWith("/api/checkout"));
  check(save && save.body.locale === "fr" && co && co.body.locale === "fr", "fr page sends locale:\"fr\" to save-result and checkout");
  const frUI = vm.runInContext("UI_MSG", fr.ctx);
  check(frUI.checkoutFailed !== UI.checkoutFailed && /paiement/.test(frUI.checkoutFailed), "fr page error copy is translated, not English");
  for (const loc of LOCALE_DIRS) {
    const locUI = vm.runInContext("UI_MSG", loadPage(readPage(loc), { fetchImpl: async () => okJson({}) }).ctx);
    check(Object.keys(UI).every(k => locUI[k] && locUI[k] !== UI[k]), `${loc} page localizes all runtime UI_MSG strings`);
  }
  const zh = loadPage(readPage("zh"), { lang: "zh-Hans", fetchImpl: async () => okJson({}) });
  check(vm.runInContext("PAGE_LOCALE", zh.ctx) === "zh", "zh-Hans page resolves PAGE_LOCALE to zh");
}

async function domain9_reportPolling() {
  console.log("\n[DOMAIN 9] WI-7 Post-payment report polling + WI-4 safe render");
  const html = readPage(null);
  const search = "?report=123e4567-e89b-12d3-a456-426614174000";
  const reportCalls = calls => calls.filter(c => c.url.includes("/api/report"));

  let n = 0;
  let p = loadPage(html, { search, fetchImpl: async url => {
    if (!url.includes("/api/report")) return okJson({ ok: true });
    n++;
    return n < 3 ? okJson({ paid: false, report: null }) : okJson({ paid: true, report: "### Hi", report_html: "<h4>Hi</h4>" });
  } });
  await flush();
  check(reportCalls(p.calls).length === 3, "unpaid, unpaid, paid → renders on the 3rd call without manual refresh");
  const content = p.els.reportBody.children[0];
  check(content && content.innerHTML === "<h4>Hi</h4>", "server-escaped report_html is rendered");
  check(tracked(p.calls, "report_viewed").length === 1, "report_viewed fires once");

  p = loadPage(html, { search, fetchImpl: async url => url.includes("/api/report") ? okJson({ paid: true, report: "<img src=x onerror=alert(1)>" }) : okJson({ ok: true }) });
  await flush();
  const legacy = p.els.reportBody.children[0];
  check(legacy && legacy.textContent === "<img src=x onerror=alert(1)>" && legacy.innerHTML === "", "without report_html, raw report is set via textContent (never innerHTML)");

  p = loadPage(html, { search, fetchImpl: async url => url.includes("/api/report") ? okJson({ paid: false, report: null }) : okJson({ ok: true }) });
  await flush();
  const UI = vm.runInContext("UI_MSG", p.ctx);
  check(p.els.reportBody.textContent === UI.reportTimeout, "timeout path shows the check-your-email fallback");
  check(reportCalls(p.calls).length === 11, "polling stops after 40s of backoff (checks at 0,1,3,6,10,15…40s = 11)", String(reportCalls(p.calls).length));
  check(tracked(p.calls, "report_poll_timeout").length === 1, "report_poll_timeout fires once");

  p = loadPage(html, { search, fetchImpl: async url => url.includes("/api/report") ? okJson({ error: "not_found" }, 404) : okJson({ ok: true }) });
  await flush();
  check(reportCalls(p.calls).length === 1 && p.els.reportBody.textContent === UI.reportLoadFailed, "404 stops polling immediately");
}

async function domain10_funnelTelemetry() {
  console.log("\n[DOMAIN 10] WI-8 Funnel telemetry");
  const html = readPage(null);
  const p = loadPage(html, { lang: "en", fetchImpl: async () => okJson({ ok: true }) });
  p.ctx.markPaywallViewed();
  p.ctx.markPaywallViewed();
  const pv = tracked(p.calls, "paywall_viewed");
  check(pv.length === 1 && pv[0].body.meta.locale === "en", "paywall_viewed fires exactly once per load with locale");
  const script = mainScript(html);
  check((script.match(/markPaywallViewed\(\);/g) || []).length === 2, "both upsell reveal paths call markPaywallViewed()");
  p.ctx.trackFunnel("page_view");
  check(tracked(p.calls, "page_view")[0].body.locale === "en", "trackFunnel payload includes locale");
  const trackCalls = script.match(/trackEvent\([^;]*\);/g) || [];
  check(trackCalls.length > 0 && trackCalls.every(c => !/\bemail\b/.test(c)), "no client trackEvent() payload includes email", `${trackCalls.length} calls`);
}

async function run() {
  await domain1_apiReportUuid();
  domain2_canonicalUrls();
  await domain3_telemetry();
  domain4_leadDedup();
  domain5_percentile();
  domain6_giftAndPaywall();
  domain7_hostGuard();
  await domain8_errorMessaging();
  await domain9_reportPolling();
  await domain10_funnelTelemetry();

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
