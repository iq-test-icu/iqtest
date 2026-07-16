/**
 * APEX IQ-Test — Client Application
 * iq-test.icu | "The Answer Sheet"
 * Zero npm deps, vanilla JS, SPA hash router
 * Client collects answers ONLY — never scores.
 */

const API_BASE = 'https://iq-test.icu/api';

// ─── QUESTION BANK (16 original items, own IP) ────────────────────────────
// Client holds question text + choices. Correct answers are SERVER-ONLY.

const QUESTIONS = [
  // ──── VERBAL (Q1–Q4) ────
  {
    id: 'q1',
    category: 'Verbal Reasoning',
    text: 'BOOK is to CHAPTER as SONG is to:',
    choices: [
      { key: 'A', text: 'Music' },
      { key: 'B', text: 'Verse' },
      { key: 'C', text: 'Singer' },
      { key: 'D', text: 'Rhythm' },
    ],
  },
  {
    id: 'q2',
    category: 'Verbal Reasoning',
    text: 'Which word does NOT belong with the others?',
    choices: [
      { key: 'A', text: 'Spruce' },
      { key: 'B', text: 'Mahogany' },
      { key: 'C', text: 'Granite' },
      { key: 'D', text: 'Cedar' },
    ],
  },
  {
    id: 'q3',
    category: 'Verbal Reasoning',
    text: 'OBSCURE is to CLEAR as TURBULENT is to:',
    choices: [
      { key: 'A', text: 'Calm' },
      { key: 'B', text: 'Stormy' },
      { key: 'C', text: 'Rapid' },
      { key: 'D', text: 'Cloudy' },
    ],
  },
  {
    id: 'q4',
    category: 'Verbal Reasoning',
    text: 'If the word TRANSPORT is rearranged, what category does the rearranged word most closely relate to?',
    choices: [
      { key: 'A', text: 'Geography' },
      { key: 'B', text: 'Music' },
      { key: 'C', text: 'None — it cannot form a meaningful word' },
      { key: 'D', text: 'Science' },
    ],
  },

  // ──── NUMERICAL (Q5–Q8) ────
  {
    id: 'q5',
    category: 'Numerical Reasoning',
    text: 'What comes next in the sequence: 3, 7, 15, 31, ?',
    choices: [
      { key: 'A', text: '47' },
      { key: 'B', text: '55' },
      { key: 'C', text: '63' },
      { key: 'D', text: '59' },
    ],
  },
  {
    id: 'q6',
    category: 'Numerical Reasoning',
    text: 'If 5 machines can produce 5 widgets in 5 minutes, how many minutes would it take 100 machines to produce 100 widgets?',
    choices: [
      { key: 'A', text: '5 minutes' },
      { key: 'B', text: '100 minutes' },
      { key: 'C', text: '20 minutes' },
      { key: 'D', text: '50 minutes' },
    ],
  },
  {
    id: 'q7',
    category: 'Numerical Reasoning',
    text: 'What is the missing number: 2, 6, 12, 20, 30, ?',
    choices: [
      { key: 'A', text: '40' },
      { key: 'B', text: '42' },
      { key: 'C', text: '36' },
      { key: 'D', text: '44' },
    ],
  },
  {
    id: 'q8',
    category: 'Numerical Reasoning',
    text: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?',
    choices: [
      { key: 'A', text: '$0.10' },
      { key: 'B', text: '$0.15' },
      { key: 'C', text: '$0.01' },
      { key: 'D', text: '$0.05' },
    ],
  },

  // ──── LOGICAL (Q9–Q12) ────
  {
    id: 'q9',
    category: 'Logical Deduction',
    text: 'All roses are flowers. Some flowers fade quickly. Which conclusion is valid?',
    choices: [
      { key: 'A', text: 'All roses fade quickly' },
      { key: 'B', text: 'Some roses may fade quickly' },
      { key: 'C', text: 'No roses fade quickly' },
      { key: 'D', text: 'Roses are not flowers' },
    ],
  },
  {
    id: 'q10',
    category: 'Logical Deduction',
    text: 'If it rains, the ground is wet. The ground is not wet. What can you conclude?',
    choices: [
      { key: 'A', text: 'It is raining' },
      { key: 'B', text: 'The ground is dry for another reason' },
      { key: 'C', text: 'It is not raining' },
      { key: 'D', text: 'Nothing can be concluded' },
    ],
  },
  {
    id: 'q11',
    category: 'Logical Deduction',
    text: 'P is taller than Q. R is shorter than Q. S is taller than P. Who is the shortest?',
    choices: [
      { key: 'A', text: 'R' },
      { key: 'B', text: 'Q' },
      { key: 'C', text: 'P' },
      { key: 'D', text: 'S' },
    ],
  },
  {
    id: 'q12',
    category: 'Logical Deduction',
    text: 'In a certain code, LEAF is written as MFBG. How is TREE written in the same code?',
    choices: [
      { key: 'A', text: 'USSF' },
      { key: 'B', text: 'USFF' },
      { key: 'C', text: 'USFG' },
      { key: 'D', text: 'USSG' },
    ],
  },

  // ──── SPATIAL (Q13–Q16) — SVG matrix items ────
  {
    id: 'q13',
    category: 'Spatial Visualization',
    type: 'spatial',
    text: 'Which shape completes the pattern?',
    grid: [
      // Row 1: circle, circle rotated 90, circle rotated 180
      { shape: 'circle-quarter', rotation: 0 },
      { shape: 'circle-quarter', rotation: 90 },
      { shape: 'circle-quarter', rotation: 180 },
      // Row 2: square, square rotated 90, square rotated 180
      { shape: 'square-half', rotation: 0 },
      { shape: 'square-half', rotation: 90 },
      { shape: 'square-half', rotation: 180 },
      // Row 3: triangle, triangle rotated 90, ?
      { shape: 'triangle-half', rotation: 0 },
      { shape: 'triangle-half', rotation: 90 },
      null, // missing
    ],
    choices: [
      { key: 'A', text: '', spatial: { shape: 'triangle-half', rotation: 0 } },
      { key: 'B', text: '', spatial: { shape: 'triangle-half', rotation: 270 } },
      { key: 'C', text: '', spatial: { shape: 'square-half', rotation: 180 } },
      { key: 'D', text: '', spatial: { shape: 'triangle-half', rotation: 180 } },
    ],
  },
  {
    id: 'q14',
    category: 'Spatial Visualization',
    type: 'spatial',
    text: 'Which option completes the 3×3 grid?',
    grid: [
      { shape: 'dots', count: 1 },
      { shape: 'dots', count: 2 },
      { shape: 'dots', count: 3 },
      { shape: 'dots', count: 2 },
      { shape: 'dots', count: 3 },
      { shape: 'dots', count: 4 },
      { shape: 'dots', count: 3 },
      { shape: 'dots', count: 4 },
      null,
    ],
    choices: [
      { key: 'A', text: '', spatial: { shape: 'dots', count: 5 } },
      { key: 'B', text: '', spatial: { shape: 'dots', count: 4 } },
      { key: 'C', text: '', spatial: { shape: 'dots', count: 6 } },
      { key: 'D', text: '', spatial: { shape: 'dots', count: 3 } },
    ],
  },
  {
    id: 'q15',
    category: 'Spatial Visualization',
    type: 'spatial',
    text: 'Identify the missing piece in the matrix.',
    grid: [
      { shape: 'arrow', rotation: 0, fill: false },
      { shape: 'arrow', rotation: 90, fill: false },
      { shape: 'arrow', rotation: 0, fill: true },
      { shape: 'arrow', rotation: 90, fill: true },
      { shape: 'arrow', rotation: 180, fill: false },
      { shape: 'arrow', rotation: 180, fill: true },
      { shape: 'arrow', rotation: 270, fill: false },
      { shape: 'arrow', rotation: 270, fill: true },
      null,
    ],
    choices: [
      { key: 'A', text: '', spatial: { shape: 'arrow', rotation: 0, fill: false } },
      { key: 'B', text: '', spatial: { shape: 'arrow', rotation: 180, fill: false } },
      { key: 'C', text: '', spatial: { shape: 'arrow', rotation: 270, fill: true } },
      { key: 'D', text: '', spatial: { shape: 'arrow', rotation: 90, fill: false } },
    ],
  },
  {
    id: 'q16',
    category: 'Spatial Visualization',
    type: 'spatial',
    text: 'Which shape completes the sequence?',
    grid: [
      { shape: 'nested', outer: 'circle', inner: 'square' },
      { shape: 'nested', outer: 'square', inner: 'triangle' },
      { shape: 'nested', outer: 'triangle', inner: 'circle' },
      { shape: 'nested', outer: 'square', inner: 'circle' },
      { shape: 'nested', outer: 'triangle', inner: 'square' },
      { shape: 'nested', outer: 'circle', inner: 'triangle' },
      { shape: 'nested', outer: 'triangle', inner: 'circle' },
      { shape: 'nested', outer: 'circle', inner: 'square' },
      null,
    ],
    choices: [
      { key: 'A', text: '', spatial: { shape: 'nested', outer: 'circle', inner: 'circle' } },
      { key: 'B', text: '', spatial: { shape: 'nested', outer: 'square', inner: 'triangle' } },
      { key: 'C', text: '', spatial: { shape: 'nested', outer: 'triangle', inner: 'square' } },
      { key: 'D', text: '', spatial: { shape: 'nested', outer: 'square', inner: 'circle' } },
    ],
  },
];

// ─── SVG RENDERER ─────────────────────────────────────────────────────────

function renderSVG(config) {
  if (!config) return '';
  const size = 80;
  const half = size / 2;

  let inner = '';

  switch (config.shape) {
    case 'circle-quarter': {
      const r = config.rotation || 0;
      inner = `<g transform="rotate(${r}, ${half}, ${half})">
        <path d="M ${half} ${half} L ${half} ${half * 0.2} A ${half * 0.8} ${half * 0.8} 0 0 1 ${half + half * 0.8} ${half} Z"
              fill="#2D2D2D" stroke="#2D2D2D" stroke-width="1.5"/>
      </g>`;
      break;
    }
    case 'square-half': {
      const r = config.rotation || 0;
      inner = `<g transform="rotate(${r}, ${half}, ${half})">
        <rect x="${half * 0.3}" y="${half * 0.3}" width="${size * 0.4}" height="${size * 0.7}"
              fill="#2D2D2D" stroke="#2D2D2D" stroke-width="1.5"/>
      </g>`;
      break;
    }
    case 'triangle-half': {
      const r = config.rotation || 0;
      inner = `<g transform="rotate(${r}, ${half}, ${half})">
        <polygon points="${half},${half * 0.3} ${half + half * 0.6},${half + half * 0.5} ${half - half * 0.6},${half + half * 0.5}"
                 fill="#2D2D2D" stroke="#2D2D2D" stroke-width="1.5"/>
      </g>`;
      break;
    }
    case 'dots': {
      const count = config.count || 1;
      const positions = getDotPositions(count, half, half * 0.6);
      inner = positions.map(([cx, cy]) =>
        `<circle cx="${cx}" cy="${cy}" r="5" fill="#2D2D2D"/>`
      ).join('');
      break;
    }
    case 'arrow': {
      const r = config.rotation || 0;
      const f = config.fill ? '#2D2D2D' : 'none';
      inner = `<g transform="rotate(${r}, ${half}, ${half})">
        <polygon points="${half},${half * 0.25} ${half + half * 0.5},${half} ${half + half * 0.2},${half}
                          ${half + half * 0.2},${half + half * 0.6} ${half - half * 0.2},${half + half * 0.6}
                          ${half - half * 0.2},${half} ${half - half * 0.5},${half}"
                 fill="${f}" stroke="#2D2D2D" stroke-width="1.5"/>
      </g>`;
      break;
    }
    case 'nested': {
      const outerShape = renderOuterShape(config.outer, half, size);
      const innerShape = renderInnerShape(config.inner, half);
      inner = outerShape + innerShape;
      break;
    }
    default:
      inner = '';
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

function getDotPositions(count, center, radius) {
  if (count === 1) return [[center, center]];
  const positions = [];
  for (let i = 0; i < count; i++) {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    positions.push([
      center + radius * Math.cos(angle) * 0.7,
      center + radius * Math.sin(angle) * 0.7,
    ]);
  }
  return positions;
}

function renderOuterShape(type, half, size) {
  switch (type) {
    case 'circle':
      return `<circle cx="${half}" cy="${half}" r="${half * 0.75}" fill="none" stroke="#2D2D2D" stroke-width="2"/>`;
    case 'square':
      return `<rect x="${half * 0.3}" y="${half * 0.3}" width="${size * 0.35}" height="${size * 0.35}"
                    fill="none" stroke="#2D2D2D" stroke-width="2" rx="2"/>`;
    case 'triangle':
      return `<polygon points="${half},${half * 0.3} ${half + half * 0.65},${half + half * 0.6} ${half - half * 0.65},${half + half * 0.6}"
                       fill="none" stroke="#2D2D2D" stroke-width="2"/>`;
    default: return '';
  }
}

function renderInnerShape(type, half) {
  switch (type) {
    case 'circle':
      return `<circle cx="${half}" cy="${half}" r="${half * 0.3}" fill="#2D2D2D"/>`;
    case 'square':
      return `<rect x="${half - half * 0.2}" y="${half - half * 0.2}" width="${half * 0.4}" height="${half * 0.4}"
                    fill="#2D2D2D" rx="1"/>`;
    case 'triangle':
      return `<polygon points="${half},${half - half * 0.25} ${half + half * 0.25},${half + half * 0.2} ${half - half * 0.25},${half + half * 0.2}"
                       fill="#2D2D2D"/>`;
    default: return '';
  }
}

// ─── APPLICATION STATE ────────────────────────────────────────────────────

const App = {
  currentQuestion: 0,
  answers: {},
  sessionId: null,

  // ── SPA Router ──
  init() {
    // Enable consent → checkout button binding
    const consentCb = document.getElementById('consent-checkbox');
    const checkoutBtn = document.getElementById('checkout-btn');
    if (consentCb && checkoutBtn) {
      consentCb.addEventListener('change', () => {
        const email = document.getElementById('email-input').value.trim();
        checkoutBtn.disabled = !(consentCb.checked && email.length > 0);
      });
    }
    const emailInput = document.getElementById('email-input');
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        checkoutBtn.disabled = !(consentCb.checked && email.length > 0);
      });
    }

    // Check for returning from Stripe
    this.checkPostPayment();

    // Show FAQ alongside results if hash is #faq
    this.route();
    window.addEventListener('hashchange', () => this.route());
  },

  route() {
    const hash = window.location.hash.split('?')[0] || '#hero';
    const sections = document.querySelectorAll('section');
    sections.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(hash.replace('#', ''));
    if (target) {
      target.classList.add('active');
    } else {
      document.getElementById('hero').classList.add('active');
    }

    // FAQ is always visible alongside results
    if (hash === '#results' || hash === '#faq') {
      document.getElementById('faq').classList.add('active');
    }
  },

  show(sectionId) {
    window.location.hash = sectionId;
  },

  // ── Quiz Engine ──
  startQuiz() {
    this.currentQuestion = 0;
    this.answers = {};
    this.show('quiz');
    this.renderQuestion();
  },

  renderQuestion() {
    const q = QUESTIONS[this.currentQuestion];
    const container = document.getElementById('question-container');
    const total = QUESTIONS.length;
    const current = this.currentQuestion + 1;

    // Progress
    document.getElementById('progress-text').textContent = `Question ${current} of ${total}`;
    document.getElementById('progress-fill').style.width = `${(current / total) * 100}%`;

    // Navigation
    document.getElementById('prev-btn').style.visibility = this.currentQuestion === 0 ? 'hidden' : 'visible';
    const nextBtn = document.getElementById('next-btn');
    nextBtn.textContent = this.currentQuestion === total - 1 ? 'Submit' : 'Next →';

    if (q.type === 'spatial') {
      container.innerHTML = this.renderSpatialQuestion(q);
    } else {
      container.innerHTML = this.renderTextQuestion(q);
    }
  },

  renderTextQuestion(q) {
    const selected = this.answers[q.id] || null;
    return `
      <div class="question">
        <div class="question__category">${q.category}</div>
        <div class="question__text">${q.text}</div>
        <div class="bubble-grid">
          ${q.choices.map(c => `
            <div class="bubble-option ${selected === c.key ? 'selected' : ''}"
                 onclick="App.selectAnswer('${q.id}', '${c.key}')">
              <div class="bubble-option__circle"></div>
              <span class="bubble-option__label">${c.key}</span>
              <span class="bubble-option__text">${c.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderSpatialQuestion(q) {
    const selected = this.answers[q.id] || null;
    return `
      <div class="question">
        <div class="question__category">${q.category}</div>
        <div class="question__text">${q.text}</div>
        <div class="spatial-grid">
          ${q.grid.map(cell =>
            cell === null
              ? '<div class="spatial-cell spatial-cell--empty">?</div>'
              : `<div class="spatial-cell">${renderSVG(cell)}</div>`
          ).join('')}
        </div>
        <div class="spatial-options">
          ${q.choices.map(c => `
            <div class="spatial-option ${selected === c.key ? 'selected' : ''}"
                 onclick="App.selectAnswer('${q.id}', '${c.key}')"
                 title="Option ${c.key}">
              ${renderSVG(c.spatial)}
              <span style="position:absolute;bottom:2px;right:6px;font-family:var(--font-mono);font-size:0.65rem;color:var(--ink-faint);">${c.key}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  selectAnswer(questionId, key) {
    this.answers[questionId] = key;
    this.renderQuestion();
  },

  nextQuestion() {
    const q = QUESTIONS[this.currentQuestion];
    if (!this.answers[q.id]) {
      // Subtle shake if no answer selected
      const container = document.getElementById('question-container');
      container.style.animation = 'none';
      container.offsetHeight; // trigger reflow
      container.style.animation = 'fadeSlideIn 0.3s ease';
      return;
    }

    if (this.currentQuestion < QUESTIONS.length - 1) {
      this.currentQuestion++;
      this.renderQuestion();
    } else {
      this.submitQuiz();
    }
  },

  prevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.renderQuestion();
    }
  },

  // ── Submit ──
  async submitQuiz() {
    const nextBtn = document.getElementById('next-btn');
    nextBtn.disabled = true;
    nextBtn.innerHTML = '<span class="spinner"></span> Scoring…';

    try {
      const resp = await fetch(`${API_BASE}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: this.answers }),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Submission failed');

      this.sessionId = data.sessionId;
      document.getElementById('score-band').textContent = data.scoreBand;
      this.show('results');
    } catch (err) {
      nextBtn.disabled = false;
      nextBtn.textContent = 'Submit';
      alert('An error occurred. Please try again.');
    }
  },

  // ── Checkout ──
  async checkout() {
    const email = document.getElementById('email-input').value.trim();
    const consent = document.getElementById('consent-checkbox').checked;
    const btn = document.getElementById('checkout-btn');

    if (!email || !consent || !this.sessionId) return;

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Redirecting…';

    try {
      const resp = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          email,
          consentGiven: true,
        }),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Checkout failed');

      window.location.href = data.checkoutUrl;
    } catch (err) {
      btn.disabled = false;
      btn.textContent = 'Unlock Full Report — $4.99 USD';
      alert('An error occurred. Please try again.');
    }
  },

  // ── Post-payment check ──
  checkPostPayment() {
    const hash = window.location.hash;
    const match = hash.match(/session_id=([^&]+)/);
    if (!match) return;

    const stripeSessionId = match[1];
    this.show('results');

    // Hide premium CTA, show status
    document.getElementById('premium-cta').style.display = 'none';
    const statusEl = document.getElementById('post-payment-status');
    const statusText = document.getElementById('status-text');
    statusEl.style.display = 'block';
    statusText.textContent = '✓ Payment received. Your detailed cognitive report is being generated and will be sent to your email shortly.';

    // Attempt to load session info for score band
    if (stripeSessionId) {
      this.pollSession(stripeSessionId);
    }
  },

  async pollSession(stripeSessionId) {
    // We store sessionId in localStorage before redirect for retrieval
    const localSessionId = this.sessionId || localStorage.getItem('iqtest_session_id');
    if (!localSessionId) return;

    try {
      const resp = await fetch(`${API_BASE}/session?id=${localSessionId}`);
      const data = await resp.json();
      if (data.scoreBand) {
        document.getElementById('score-band').textContent = data.scoreBand;
      }
      if (data.reportSent) {
        document.getElementById('status-text').textContent =
          '✓ Your detailed cognitive report has been sent to your email. Check your inbox!';
      }
    } catch (e) {
      // Silent fail — status message already shown
    }
  },

  // ── FAQ Toggle ──
  toggleFaq(el) {
    const item = el.closest('.faq__item');
    item.classList.toggle('open');
  },
};

// Persist sessionId across Stripe redirect
const _origCheckout = App.checkout.bind(App);
App.checkout = async function () {
  if (this.sessionId) {
    localStorage.setItem('iqtest_session_id', this.sessionId);
  }
  return _origCheckout();
};

// ── Initialize ──
document.addEventListener('DOMContentLoaded', () => App.init());
