/**
 * APEX IQ-Test — Cloudflare Worker (Scoring Authority)
 * Endpoints: /api/submit, /api/checkout, /api/webhook/stripe
 * Security: Answer key server-only, Web Crypto HMAC-SHA256 webhook verification
 * Scoring: IRT 3PL model with Newton-Raphson MLE
 */

// ─── ANSWER KEY (server-only — NEVER transmitted to client) ────────────────
const ANSWER_KEY = [
  // Verbal (Q1–Q4)
  { id: 'q1',  correct: 'B', category: 'verbal',    a: 1.2, b: -1.0, c: 0.25 },
  { id: 'q2',  correct: 'D', category: 'verbal',    a: 1.0, b: -0.3, c: 0.25 },
  { id: 'q3',  correct: 'A', category: 'verbal',    a: 1.4, b:  0.5, c: 0.25 },
  { id: 'q4',  correct: 'C', category: 'verbal',    a: 1.1, b:  1.2, c: 0.25 },
  // Numerical (Q5–Q8)
  { id: 'q5',  correct: 'C', category: 'numerical',  a: 1.3, b: -0.8, c: 0.25 },
  { id: 'q6',  correct: 'A', category: 'numerical',  a: 1.1, b:  0.0, c: 0.25 },
  { id: 'q7',  correct: 'B', category: 'numerical',  a: 1.5, b:  0.7, c: 0.25 },
  { id: 'q8',  correct: 'D', category: 'numerical',  a: 1.2, b:  1.5, c: 0.25 },
  // Logical (Q9–Q12)
  { id: 'q9',  correct: 'B', category: 'logical',    a: 1.0, b: -0.5, c: 0.25 },
  { id: 'q10', correct: 'C', category: 'logical',    a: 1.3, b:  0.2, c: 0.25 },
  { id: 'q11', correct: 'A', category: 'logical',    a: 1.6, b:  1.0, c: 0.25 },
  { id: 'q12', correct: 'D', category: 'logical',    a: 1.4, b:  1.8, c: 0.25 },
  // Spatial (Q13–Q16)
  { id: 'q13', correct: 'D', category: 'spatial',    a: 1.1, b: -0.6, c: 0.25 },
  { id: 'q14', correct: 'A', category: 'spatial',    a: 1.4, b:  0.3, c: 0.25 },
  { id: 'q15', correct: 'C', category: 'spatial',    a: 1.7, b:  1.1, c: 0.25 },
  { id: 'q16', correct: 'B', category: 'spatial',    a: 1.5, b:  2.0, c: 0.25 },
];

const D = 1.702; // Scaling constant for logistic-to-normal ogive alignment

// ─── IRT 3PL SCORING ENGINE ───────────────────────────────────────────────

function irt3PL(theta, a, b, c) {
  return c + (1 - c) / (1 + Math.exp(-D * a * (theta - b)));
}

function estimateTheta(responses) {
  let theta = 0.0;
  const maxIter = 25;
  const tol = 1e-5;

  for (let iter = 0; iter < maxIter; iter++) {
    let sumL1 = 0;
    let sumL2 = 0;

    for (let i = 0; i < ANSWER_KEY.length; i++) {
      const item = ANSWER_KEY[i];
      const x = responses[i];
      const p = irt3PL(theta, item.a, item.b, item.c);
      const q = 1 - p;
      const pStar = (p - item.c) / (1 - item.c);
      const w = pStar * q;
      const dP = D * item.a * w;

      sumL1 += dP * (x - p) / (p * q);
      sumL2 += dP * dP * ((p * (1 - p) - (x - p) * (q - p)) / (p * p * q * q));
    }

    if (Math.abs(sumL2) < 1e-10) break;
    const delta = sumL1 / (-sumL2);
    theta -= delta;
    theta = Math.max(-4, Math.min(4, theta));
    if (Math.abs(delta) < tol) break;
  }

  return theta;
}

function computeScoreBand(iq) {
  if (iq >= 130) return 'Exceptional';
  if (iq >= 115) return 'Above Average';
  if (iq >= 85)  return 'Average';
  if (iq >= 70)  return 'Below Average';
  return 'Significantly Below Average';
}

function scoreSubmission(answers) {
  const responses = [];
  const categoryCorrect = { verbal: 0, numerical: 0, logical: 0, spatial: 0 };
  const categoryTotal = { verbal: 4, numerical: 4, logical: 4, spatial: 4 };
  let rawScore = 0;

  for (const item of ANSWER_KEY) {
    const userAnswer = answers[item.id];
    const correct = userAnswer && userAnswer.toUpperCase() === item.correct ? 1 : 0;
    responses.push(correct);
    rawScore += correct;
    if (correct) categoryCorrect[item.category]++;
  }

  const theta = estimateTheta(responses);
  const iq = Math.round(theta * 15 + 100);
  const band = computeScoreBand(iq);

  const categoryScores = {};
  for (const cat of Object.keys(categoryCorrect)) {
    categoryScores[cat] = {
      correct: categoryCorrect[cat],
      total: categoryTotal[cat],
      percent: Math.round((categoryCorrect[cat] / categoryTotal[cat]) * 100),
    };
  }

  const percentile = Math.round(normalCDF(theta) * 100);

  return { rawScore, theta, iq, band, categoryScores, percentile, responses };
}

function normalCDF(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327;
  const p = d * Math.exp(-x * x / 2) *
    (t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.8212560 + t * 1.3302744)))));
  return x > 0 ? 1 - p : p;
}

// ─── STRIPE WEBHOOK VERIFICATION (Web Crypto API) ─────────────────────────

async function verifyStripeSignature(rawBody, sigHeader, secret) {
  const parts = {};
  for (const pair of sigHeader.split(',')) {
    const [key, val] = pair.split('=');
    parts[key.trim()] = val.trim();
  }

  const timestamp = parts['t'];
  const signature = parts['v1'];
  if (!timestamp || !signature) return false;

  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
  if (Math.abs(age) > 300) return false;

  const payload = `${timestamp}.${rawBody}`;
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sigBytes = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const computed = Array.from(new Uint8Array(sigBytes))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return computed === signature;
}

// ─── GROQ NARRATIVE GENERATION ─────────────────────────────────────────────

async function generateReport(categoryScores, band, env) {
  const v = categoryScores.verbal.percent;
  const n = categoryScores.numerical.percent;
  const l = categoryScores.logical.percent;
  const s = categoryScores.spatial.percent;

  const prompt = `You are writing a personalized cognitive skills report.
Category scores: verbal=${v}%, numerical=${n}%, logical=${l}%, spatial=${s}%.
Overall band: ${band}. Write 4 short sections: Verbal, Numerical, Logical, Spatial —
2-3 sentences each, plain language, no clinical claims. End with one paragraph
of practical suggestions. Never claim this is a validated clinical instrument.`;

  const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    }),
  });

  const data = await resp.json();
  return data.choices[0].message.content;
}

// ─── RESEND EMAIL (CASL-COMPLIANT) ─────────────────────────────────────────

async function sendReportEmail(email, report, band, iq, env) {
  const htmlBody = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAFAF8; color: #2D2D2D;">
      <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; margin-bottom: 4px;">Your Cognitive Report</h1>
      <p style="font-size: 14px; color: #666; margin-top: 0;">iq-test.icu — The Answer Sheet</p>
      <hr style="border: none; border-top: 1px solid #E0E0E0; margin: 24px 0;" />
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 28px; color: #D94141; text-align: center; margin: 24px 0;">
        IQ Estimate: ${iq} — ${band}
      </p>
      <hr style="border: none; border-top: 1px solid #E0E0E0; margin: 24px 0;" />
      <div style="white-space: pre-wrap; line-height: 1.7; font-size: 15px;">${report}</div>
      <hr style="border: none; border-top: 1px solid #E0E0E0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #999; line-height: 1.6;">
        <strong>Disclaimer:</strong> This is not a clinical or professionally validated IQ assessment.
        It should not be used for diagnostic, employment, educational placement, or legal purposes.<br/><br/>
        Sent by Apex Business Systems Ltd., Edmonton, AB, Canada<br/>
        <a href="https://iq-test.icu/unsubscribe" style="color: #D94141;">Unsubscribe</a>
      </p>
    </div>
  `;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'IQ Test <report@iq-test.icu>',
      to: [email],
      subject: `Your Cognitive Report — ${band}`,
      html: htmlBody,
    }),
  });
}

// ─── SUPABASE HELPERS ──────────────────────────────────────────────────────

async function supabaseInsert(table, data, env) {
  const resp = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  });
  const rows = await resp.json();
  return rows[0];
}

async function supabaseUpdate(table, id, data, env) {
  await fetch(`${env.SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

async function supabaseSelect(table, query, env) {
  const resp = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: {
      'apikey': env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    },
  });
  return resp.json();
}

// ─── CORS HEADERS ──────────────────────────────────────────────────────────

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://iq-test.icu',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function corsResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

// ─── ROUTE HANDLER ─────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    try {
      if (path === '/api/submit' && request.method === 'POST') {
        return await handleSubmit(request, env);
      }
      if (path === '/api/checkout' && request.method === 'POST') {
        return await handleCheckout(request, env);
      }
      if (path === '/api/webhook/stripe' && request.method === 'POST') {
        return await handleWebhook(request, env);
      }
      if (path === '/api/session' && request.method === 'GET') {
        return await handleGetSession(url, env);
      }

      return corsResponse({ error: 'Not found' }, 404);
    } catch (err) {
      return corsResponse({ error: 'Internal server error' }, 500);
    }
  },
};

// ─── POST /api/submit ──────────────────────────────────────────────────────

async function handleSubmit(request, env) {
  const { answers } = await request.json();
  if (!answers || typeof answers !== 'object') {
    return corsResponse({ error: 'Invalid answers payload' }, 400);
  }

  const result = scoreSubmission(answers);

  const row = await supabaseInsert('sessions', {
    answers,
    raw_score: result.rawScore,
    irt_theta: result.theta,
    iq_estimate: result.iq,
    category_scores: result.categoryScores,
    score_band: result.band,
    percentile_estimate: result.percentile,
  }, env);

  // Return teaser only — no answer key, no category breakdown, no theta
  return corsResponse({
    sessionId: row.id,
    scoreBand: result.band,
  });
}

// ─── POST /api/checkout ────────────────────────────────────────────────────

async function handleCheckout(request, env) {
  const { sessionId, email, consentGiven } = await request.json();

  if (!sessionId || !email) {
    return corsResponse({ error: 'Missing sessionId or email' }, 400);
  }
  if (consentGiven !== true) {
    return corsResponse({ error: 'Consent is required' }, 400);
  }

  await supabaseUpdate('sessions', sessionId, {
    email,
    consent_given_at: new Date().toISOString(),
    consent_text_version: 'v1',
  }, env);

  const stripeResp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(env.STRIPE_SECRET_KEY + ':')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'mode': 'payment',
      'currency': 'usd',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][product_data][name]': 'iq-test.icu — Premium Cognitive Report',
      'line_items[0][price_data][unit_amount]': '499',
      'line_items[0][quantity]': '1',
      'metadata[sessionId]': sessionId,
      'customer_email': email,
      'success_url': 'https://iq-test.icu/#results?session_id={CHECKOUT_SESSION_ID}',
      'cancel_url': 'https://iq-test.icu/#premium-report',
    }),
  });

  const session = await stripeResp.json();
  if (session.error) {
    return corsResponse({ error: session.error.message }, 400);
  }

  await supabaseUpdate('sessions', sessionId, {
    stripe_session_id: session.id,
  }, env);

  return corsResponse({ checkoutUrl: session.url });
}

// ─── POST /api/webhook/stripe ──────────────────────────────────────────────

async function handleWebhook(request, env) {
  const rawBody = await request.text();
  const sigHeader = request.headers.get('Stripe-Signature');

  if (!sigHeader) {
    return new Response('Missing signature', { status: 400 });
  }

  const valid = await verifyStripeSignature(rawBody, sigHeader, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.type !== 'checkout.session.completed') {
    return new Response('OK', { status: 200 });
  }

  const stripeSession = event.data.object;
  const sessionId = stripeSession.metadata?.sessionId;
  if (!sessionId) {
    return new Response('Missing sessionId in metadata', { status: 400 });
  }

  // Idempotency guard: check report_sent_at IS NULL
  const rows = await supabaseSelect(
    'sessions',
    `id=eq.${sessionId}&select=id,email,category_scores,score_band,iq_estimate,report_sent_at`,
    env
  );

  if (!rows.length) {
    return new Response('Session not found', { status: 404 });
  }

  const session = rows[0];

  if (session.report_sent_at) {
    return new Response('Report already sent', { status: 200 });
  }

  await supabaseUpdate('sessions', sessionId, {
    premium_purchased: true,
  }, env);

  // Generate AI narrative via Groq
  const report = await generateReport(session.category_scores, session.score_band, env);

  // Send email via Resend
  if (session.email) {
    await sendReportEmail(session.email, report, session.score_band, session.iq_estimate, env);
  }

  await supabaseUpdate('sessions', sessionId, {
    report_sent_at: new Date().toISOString(),
  }, env);

  return new Response('OK', { status: 200 });
}

// ─── GET /api/session?id=... ───────────────────────────────────────────────

async function handleGetSession(url, env) {
  const sessionId = url.searchParams.get('id');
  if (!sessionId) {
    return corsResponse({ error: 'Missing session id' }, 400);
  }

  const rows = await supabaseSelect(
    'sessions',
    `id=eq.${sessionId}&select=id,score_band,premium_purchased,report_sent_at`,
    env
  );

  if (!rows.length) {
    return corsResponse({ error: 'Not found' }, 404);
  }

  return corsResponse({
    sessionId: rows[0].id,
    scoreBand: rows[0].score_band,
    premiumPurchased: rows[0].premium_purchased,
    reportSent: !!rows[0].report_sent_at,
  });
}
