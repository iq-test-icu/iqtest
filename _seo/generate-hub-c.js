/**
 * HUB C Generator — Cognitive Skills & Reasoning Domains
 * Enhanced with Interactive Step-by-Step Logic Breakdown Walkthroughs and Quick Fact Cards
 */

const { buildHtmlPage } = require('./build-seo');

// T4.14a — /cognitive-skills/logical-reasoning
buildHtmlPage({
  relPath: 'cognitive-skills/logical-reasoning.html',
  title: "Logical Reasoning: How It's Tested & Measured | IQ Test",
  description: "What is logical reasoning? Learn how deductive and inductive logic are tested on cognitive assessments, worked item examples, and real-world applications.",
  canonical: 'https://iq-test.icu/cognitive-skills/logical-reasoning',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Reasoning Domains', url: 'https://iq-test.icu/cognitive-skills/' },
    { name: 'Logical Reasoning' }
  ],
  article: {
    headline: "Logical Reasoning: How Deductive and Inductive Logic Are Tested",
    about: [
      { "@type": "Thing", "name": "Logical reasoning", "sameAs": "https://en.wikipedia.org/wiki/Logical_reasoning" },
      { "@type": "Thing", "name": "Deductive reasoning", "sameAs": "https://en.wikipedia.org/wiki/Deductive_reasoning" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Logical_reasoning"]
  },
  h1: "Logical Reasoning: How It's Tested and Measured",
  answerBlock: "Logical reasoning is the ability to analyse premises, apply systematic rules, and deduce valid conclusions without relying on domain-specific trivia. In cognitive assessments, it is tested through deductive syllogisms, conditional logic rules, and matrix constraints that measure raw fluid problem-solving efficiency.",
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">💡 Domain Overview: Logical Reasoning</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">CHC Broad Ability</div>
          <div class="fact-value">Fluid Reasoning (Gf) & Induction (I)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Primary Clinical Subtests</div>
          <div class="fact-value">WAIS-IV Figure Weights & Matrix Reasoning</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Core Cognitive Demand</div>
          <div class="fact-value">Working Memory Updating & Rule Compliance</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Historical Mind Archetype</div>
          <div class="fact-value">Sir Isaac Newton (Axiomatic First Principles)</div>
        </div>
      </div>
    </div>

    <h2>What logical reasoning measures in cognitive science</h2>
    <p>In cognitive psychology, logical reasoning represents the structured core of executive function and general fluid intelligence (<em>Gf</em>). Rather than assessing memorised facts or academic vocabulary, logical reasoning measures how effectively your working memory can hold multiple conditional rules, eliminate invalid contradictions, and deduce an airtight conclusion.</p>
    <p>Clinical assessments like the Wechsler Adult Intelligence Scale (WAIS-IV) and the Stanford-Binet Fifth Edition test logical reasoning through subtests such as Figure Weights, Matrix Reasoning, and Arithmetic Logic.</p>

    <h2>Deductive vs. inductive logical reasoning</h2>
    <p>Logical reasoning tasks in cognitive tests generally fall into two broad classifications:</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Reasoning Type</th>
          <th>Core Principle</th>
          <th>Test Question Format</th>
          <th>Cognitive Demand</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Deductive Logic</strong></td>
          <td>Top-down reasoning: If premises are true, conclusion must be true</td>
          <td>Formal syllogisms, conditional if-then constraints, rule matrices</td>
          <td>Rule compliance, contradiction elimination, working memory capacity</td>
        </tr>
        <tr>
          <td><strong>Inductive Logic</strong></td>
          <td>Bottom-up reasoning: Inferring general rules from specific observations</td>
          <td>Sequence completion, pattern extrapolation, relational mapping</td>
          <td>Hypothesis generation, trend detection, abstraction</td>
        </tr>
        <tr>
          <td><strong>Abductive Logic</strong></td>
          <td>Inferring the most plausible explanation for incomplete data</td>
          <td>Diagnostic puzzles, situational scenarios</td>
          <td>Probabilistic evaluation, real-world troubleshooting</td>
        </tr>
      </tbody>
    </table>

    <h2>Interactive logic puzzle walkthrough</h2>
    <div class="interactive-puzzle-card">
      <div class="puzzle-header">
        <span class="puzzle-tag">SAMPLE DEDUCTIVE CHALLENGE</span>
      </div>
      <p style="color:var(--text); font-size:1.05rem; line-height:1.6; margin-bottom:14px;">
        <strong>Premise 1:</strong> All squares in the grid are either solid gold or striped.<br>
        <strong>Premise 2:</strong> If a square is striped, the circle adjacent to it must be empty.<br>
        <strong>Given Fact:</strong> Circle B is shaded black.
      </p>
      <p><strong>Question:</strong> What can be definitively concluded about Square A (which is adjacent to Circle B)?</p>
      <button class="btn-outline" onclick="toggleSolution('solLogic', this)">🔍 Reveal Step-by-Step Solution</button>
      
      <div id="solLogic" class="solution-panel">
        <p style="color:var(--gold); font-weight:600; margin-bottom:8px;">✓ Deduction Breakdown (Modus Tollens):</p>
        <ol style="margin-left:20px; color:var(--text); margin-bottom:12px;">
          <li>From Premise 2: <em>If Striped(Square A) → Empty(Circle B)</em>.</li>
          <li>Contrapositive rule: <em>If NOT Empty(Circle B) → NOT Striped(Square A)</em>.</li>
          <li>Since Circle B is black (NOT empty), Square A cannot be striped.</li>
          <li>From Premise 1, every square must be either solid gold or striped.</li>
          <li>Therefore, Square A <strong>must be solid gold</strong>.</li>
        </ol>
        <p style="font-size:0.88rem; color:var(--muted); margin-bottom:0;">This demonstrates the elimination of contradictions using conditional contraposition without needing any domain-specific trivia.</p>
      </div>
    </div>

    <h2>How logical reasoning connects to the g factor</h2>
    <p>Charles Spearman's classic research on the <em>g factor</em> (general intelligence) demonstrated that tests of pure logical deduction correlate more heavily with overall cognitive performance than almost any other subtest. This is because logical deduction requires the simultaneous coordination of attention, working memory updating, and inhibitory control.</p>

    <h2>Real-world applications of strong logical reasoning</h2>
    <p>Individuals with high logical reasoning scores excel in careers requiring rigorous rule-based architectures, including software engineering, legal argument construction, financial auditing, scientific modeling, and systems analysis.</p>
    <p>To see how logic interacts with visual and numerical faculties, explore our articles on <a href="/cognitive-skills/numerical-reasoning">numerical reasoning</a>, <a href="/cognitive-skills/pattern-recognition">pattern recognition</a>, and <a href="/what-is-an-iq-test">what is an IQ test</a>.</p>
  `,
  customScript: `
  <script>
    function toggleSolution(id, btn) {
      const panel = document.getElementById(id);
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
        btn.textContent = '🔍 Reveal Step-by-Step Solution';
      } else {
        panel.style.display = 'block';
        btn.textContent = '▲ Hide Solution';
      }
    }
  </script>`,
  faqs: [
    {
      q: "What is the difference between deductive and inductive logic?",
      a: "Deductive logic moves from general rules to guaranteed specific conclusions, while inductive logic observes specific patterns to infer a probable general rule."
    },
    {
      q: "Can practicing logic puzzles improve my IQ score?",
      a: "Practicing familiarizes you with test formats and reduces anxiety, but fundamental fluid reasoning ability remains relatively stable across adulthood."
    },
    {
      q: "How does our cognitive quiz test logic?",
      a: "Our 16-question assessment includes four dedicated multi-rule logic questions designed to evaluate rule retention and elimination accuracy."
    }
  ]
});

// T4.14b — /cognitive-skills/numerical-reasoning
buildHtmlPage({
  relPath: 'cognitive-skills/numerical-reasoning.html',
  title: 'Numerical Reasoning: How It Is Tested & Scored | IQ Test',
  description: 'Understand numerical reasoning tests: number series, mathematical deduction, quantitative problem solving, and worked cognitive test examples.',
  canonical: 'https://iq-test.icu/cognitive-skills/numerical-reasoning',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Reasoning Domains', url: 'https://iq-test.icu/cognitive-skills/' },
    { name: 'Numerical Reasoning' }
  ],
  article: {
    headline: 'Numerical Reasoning: What It Measures and How It Is Scored',
    about: [
      { "@type": "Thing", "name": "Number sense", "sameAs": "https://en.wikipedia.org/wiki/Number_sense" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Intelligence_quotient"]
  },
  h1: "Numerical Reasoning: What It Measures and How It's Scored",
  answerBlock: "Numerical reasoning measures your capacity to identify mathematical patterns, deduce progression rules, and perform quantitative problem solving without relying on advanced calculus. Cognitive assessments test this domain through number sequences, proportional logic, and operational matrix grids that measure raw quantitative fluid agility.",
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">💡 Domain Overview: Numerical Reasoning</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">CHC Broad Ability</div>
          <div class="fact-value">Quantitative Knowledge (Gq) & Mathematical Ability (A3)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Key Formats</div>
          <div class="fact-value">Number Series, Operator Grids, Ratio Deduction</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Prerequisites</div>
          <div class="fact-value">Basic Arithmetic (No Advanced Calculus Required)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Historical Mind Archetype</div>
          <div class="fact-value">Marie Curie & Isaac Newton (Quantitative Rigour)</div>
        </div>
      </div>
    </div>

    <h2>The difference between math knowledge and numerical reasoning</h2>
    <p>A common misconception is that numerical reasoning tests are simply high school math exams. In psychometrics, numerical reasoning does not evaluate whether you have memorised advanced trigonometric formulas or calculus theorems. Instead, it measures <strong>quantitative fluid intelligence (Gq)</strong> — the speed and accuracy with which you can perceive underlying mathematical structures and relationships between quantities.</p>

    <h2>Primary formats of numerical cognitive questions</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Format</th>
          <th>What It Tests</th>
          <th>Example Progression Style</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Number Series Completion</strong></td>
          <td>Detecting sequential intervals, alternating steps, or geometric scaling</td>
          <td>Progressions using nested differences (+2, +4, +8, +16...)</td>
        </tr>
        <tr>
          <td><strong>Matrix Number Puzzles</strong></td>
          <td>Row and column operational relationships (addition, product rules)</td>
          <td>Grid where Row 3 is the difference of Row 1 squared and Row 2</td>
        </tr>
        <tr>
          <td><strong>Proportional Deduction</strong></td>
          <td>Ratios, rate of change, and inverse relationships</td>
          <td>Balancing weights, speed-distance-time word puzzles</td>
        </tr>
      </tbody>
    </table>

    <h2>Interactive number sequence walkthrough</h2>
    <div class="interactive-puzzle-card">
      <div class="puzzle-header">
        <span class="puzzle-tag">SAMPLE NUMBER SEQUENCE CHALLENGE</span>
      </div>
      <p style="color:var(--text); font-size:1.15rem; font-weight:700; letter-spacing:0.05em; margin-bottom:14px;">
        Sequence: 3, 7, 15, 31, 63, [ ? ]
      </p>
      <p><strong>Question:</strong> What is the next number in this progression, and what rule governs it?</p>
      <button class="btn-outline" onclick="toggleSolution('solNum', this)">🔍 Reveal Step-by-Step Solution</button>
      
      <div id="solNum" class="solution-panel">
        <p style="color:var(--gold); font-weight:600; margin-bottom:8px;">✓ Two Valid Solution Paths:</p>
        <ol style="margin-left:20px; color:var(--text); margin-bottom:12px;">
          <li><strong>Method 1 (First Differences):</strong> Calculate intervals between terms: 7-3 = +4; 15-7 = +8; 31-15 = +16; 63-31 = +32. Notice the differences double at each step (2^(n+1)). Next interval is +64. 63 + 64 = <strong>127</strong>.</li>
          <li><strong>Method 2 (Recursive Operation):</strong> Each term is double the previous plus one: x_(n) = 2x_(n-1) + 1. (63 × 2) + 1 = 126 + 1 = <strong>127</strong>.</li>
        </ol>
        <p style="font-size:0.88rem; color:var(--muted); margin-bottom:0;">Both methods converge on 127, demonstrating how multiple quantitative reasoning paths verify the same underlying mathematical structure.</p>
      </div>
    </div>

    <h2>Why numerical reasoning is central to cognitive profiling</h2>
    <p>Quantitative reasoning reflects high working memory capacity and mental agility. Individuals who score strongly in numerical reasoning excel in quantitative finance, engineering, economic analysis, and algorithmic design.</p>
    <p>To see how your numerical skills integrate with other reasoning modes, explore our guides to <a href="/cognitive-skills/logical-reasoning">logical reasoning</a>, <a href="/cognitive-skills/pattern-recognition">pattern recognition</a>, and <a href="/iq-scores/what-is-a-good-iq-score">IQ score benchmarks</a>.</p>
  `,
  customScript: `
  <script>
    function toggleSolution(id, btn) {
      const panel = document.getElementById(id);
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
        btn.textContent = '🔍 Reveal Step-by-Step Solution';
      } else {
        panel.style.display = 'block';
        btn.textContent = '▲ Hide Solution';
      }
    }
  </script>`,
  faqs: [
    {
      q: "Do I need advanced math to do well on numerical reasoning tests?",
      a: "No. The questions rely on basic arithmetic operations (addition, subtraction, multiplication, division, squares) arranged in logical patterns."
    },
    {
      q: "Is numerical reasoning linked to general IQ?",
      a: "Yes. Quantitative reasoning is one of the primary broad cognitive abilities in the Cattell-Horn-Carroll model and correlates strongly with general intelligence."
    },
    {
      q: "How many numerical questions are on our cognitive test?",
      a: "Our 16-question quiz includes four carefully calibrated numerical questions assessing sequence extrapolation and quantitative relationships."
    }
  ]
});

// T4.14c — /cognitive-skills/verbal-reasoning
buildHtmlPage({
  relPath: 'cognitive-skills/verbal-reasoning.html',
  title: "Verbal Reasoning: What It Is & How It's Scored | IQ Test",
  description: "What is verbal reasoning? Explore verbal analogies, vocabulary comprehension, deductive syllogisms, and how linguistic intelligence is measured.",
  canonical: 'https://iq-test.icu/cognitive-skills/verbal-reasoning',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Reasoning Domains', url: 'https://iq-test.icu/cognitive-skills/' },
    { name: 'Verbal Reasoning' }
  ],
  article: {
    headline: "Verbal Reasoning: Linguistic Intelligence and Semantic Deduction",
    about: [
      { "@type": "Thing", "name": "Verbal reasoning", "sameAs": "https://en.wikipedia.org/wiki/Verbal_reasoning" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Verbal_reasoning"]
  },
  h1: "Verbal Reasoning: What It Is and How It Is Scored",
  answerBlock: "Verbal reasoning evaluates your ability to understand complex conceptual language, identify semantic relationships between words, and evaluate logical arguments expressed in text. In psychometrics, it reflects crystallised intelligence (Gc) and verbal comprehension, evaluating how effectively you manipulate abstract ideas through vocabulary.",
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">💡 Domain Overview: Verbal Reasoning</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">CHC Broad Ability</div>
          <div class="fact-value">Crystallized Intelligence (Gc) & Comprehension-Knowledge</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Primary Clinical Battery</div>
          <div class="fact-value">WAIS-IV Verbal Comprehension Index (VCI)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Core Ability</div>
          <div class="fact-value">Abstract Semantic Analogies & Conceptual Classification</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Lifespan Trajectory</div>
          <div class="fact-value">Expands and stabilizes across adulthood into late life</div>
        </div>
      </div>
    </div>

    <h2>Understanding verbal reasoning in psychometrics</h2>
    <p>Verbal reasoning is the primary measure of <strong>crystallised intelligence (Gc)</strong> and linguistic comprehension. On clinical batteries like the WAIS-IV, the Verbal Comprehension Index (VCI) includes subtests such as Similarities (conceptual abstract analogies), Vocabulary, and Information.</p>
    <p>A strong verbal reasoning score indicates not merely a large vocabulary, but the ability to discern subtle shades of meaning, categorise abstract concepts, and evaluate the truth-value of textual statements.</p>

    <h2>Primary test formats in verbal reasoning</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Question Type</th>
          <th>What It Evaluates</th>
          <th>Example Format</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Verbal Analogies</strong></td>
          <td>Relational mapping between concept pairs</td>
          <td>TELESCOPE is to ASTRONOMER as MICROSCOPE is to BIOLOGIST</td>
        </tr>
        <tr>
          <td><strong>Conceptual Odd-One-Out</strong></td>
          <td>Abstract categorical classification</td>
          <td>Identifying which word does not share a fundamental property</td>
        </tr>
        <tr>
          <td><strong>Textual Deduction</strong></td>
          <td>Reading a brief statement and deducing necessary truths</td>
          <td>Evaluating whether a claim is True, False, or Cannot Tell</td>
        </tr>
      </tbody>
    </table>

    <h2>Interactive verbal analogy walkthrough</h2>
    <div class="interactive-puzzle-card">
      <div class="puzzle-header">
        <span class="puzzle-tag">SAMPLE CONCEPTUAL ANALOGY</span>
      </div>
      <p style="color:var(--text); font-size:1.1rem; font-weight:600; margin-bottom:14px;">
        OMNISCIENT : KNOWLEDGE :: OMNIPOTENT : [ ? ]
      </p>
      <p><strong>Question:</strong> Complete the analogy by identifying the corresponding concept and underlying relational rule.</p>
      <button class="btn-outline" onclick="toggleSolution('solVerb', this)">🔍 Reveal Step-by-Step Solution</button>
      
      <div id="solVerb" class="solution-panel">
        <p style="color:var(--gold); font-weight:600; margin-bottom:8px;">✓ Semantic Relationship Analysis:</p>
        <ol style="margin-left:20px; color:var(--text); margin-bottom:12px;">
          <li><em>Omniscient</em> is derived from Latin (<em>omnis</em> = all, <em>scire</em> = to know). It defines an entity possessing an infinite or all-encompassing measure of knowledge.</li>
          <li><em>Omnipotent</em> is derived from Latin (<em>omnis</em> = all, <em>potens</em> = powerful). It defines an entity possessing all power.</li>
          <li>Therefore, the corresponding missing noun is <strong>POWER</strong>.</li>
        </ol>
        <p style="font-size:0.88rem; color:var(--muted); margin-bottom:0;">Verbal analogies test your capacity to isolate the precise grammatical and semantic relationship linking the first pair, then project that identical transformation onto the second pair.</p>
      </div>
    </div>

    <h2>Why verbal ability remains stable across adulthood</h2>
    <p>Unlike raw processing speed, verbal reasoning is a crystallised ability that typically remains robust and often continues to improve well into late middle age and retirement. It is highly predictive of success in law, journalism, executive leadership, and academic scholarship.</p>
    <p>To learn how verbal skills contrast with nonverbal visual abilities, read our guide to <a href="/cognitive-skills/pattern-recognition">pattern recognition</a> and explore <a href="/cognitive-test-vs-iq-test">cognitive tests vs. IQ tests</a>.</p>
  `,
  customScript: `
  <script>
    function toggleSolution(id, btn) {
      const panel = document.getElementById(id);
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
        btn.textContent = '🔍 Reveal Step-by-Step Solution';
      } else {
        panel.style.display = 'block';
        btn.textContent = '▲ Hide Solution';
      }
    }
  </script>`,
  faqs: [
    {
      q: "Does verbal reasoning depend heavily on native English fluency?",
      a: "Yes. Verbal tests inherently reflect language exposure. Nonverbal tests (like matrix reasoning) are preferred for cross-cultural evaluations."
    },
    {
      q: "How does verbal reasoning change as you get older?",
      a: "Verbal reasoning is part of crystallised intelligence and tends to remain stable or even increase across adulthood until late life."
    },
    {
      q: "How does our test score verbal reasoning?",
      a: "Our quiz includes four verbal conceptual questions that test abstract analogical mapping and relationship deduction."
    }
  ]
});

// T4.14d — /cognitive-skills/pattern-recognition
buildHtmlPage({
  relPath: 'cognitive-skills/pattern-recognition.html',
  title: 'Pattern Recognition: The Core of Nonverbal IQ | IQ Test',
  description: "Why is pattern recognition the purest measure of fluid intelligence? Explore matrix reasoning, Raven's matrices, spatial deduction, and worked examples.",
  canonical: 'https://iq-test.icu/cognitive-skills/pattern-recognition',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Reasoning Domains', url: 'https://iq-test.icu/cognitive-skills/' },
    { name: 'Pattern Recognition' }
  ],
  article: {
    headline: "Pattern Recognition: The Core of Nonverbal Intelligence and Matrix Reasoning",
    about: [
      { "@type": "Thing", "name": "Raven's Progressive Matrices", "sameAs": "https://en.wikipedia.org/wiki/Raven%27s_Progressive_Matrices" },
      { "@type": "Thing", "name": "Fluid and crystallized intelligence", "sameAs": "https://en.wikipedia.org/wiki/Fluid_and_crystallized_intelligence" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Raven%27s_Progressive_Matrices"]
  },
  h1: "Pattern Recognition: The Core of Nonverbal Intelligence",
  answerBlock: "Pattern recognition is the capacity to identify visual, spatial, and geometric rules within unfamiliar matrix arrays without relying on language or prior cultural knowledge. In psychometrics, it is regarded as the cleanest measure of raw fluid intelligence (Gf) and general intelligence (g).",
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">💡 Domain Overview: Nonverbal Pattern Recognition</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">CHC Broad Ability</div>
          <div class="fact-value">Fluid Intelligence (Gf) & Visual Processing (Gv)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Gold Standard Instrument</div>
          <div class="fact-value">Raven's Progressive Matrices (1936 to Present)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Cultural Neutrality</div>
          <div class="fact-value">Language-Independent / Culture-Fair</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Historical Mind Archetype</div>
          <div class="fact-value">Leonardo da Vinci & Nikola Tesla (Spatial Simulation)</div>
        </div>
      </div>
    </div>

    <h2>Why matrix reasoning is the gold standard for fluid IQ</h2>
    <p>In 1936, British psychologist John C. Raven developed <strong>Raven's Progressive Matrices</strong> to create a culturally neutral assessment of abstract cognitive ability. By presenting problems as 3x3 grids of geometric shapes with a missing piece, the test eliminated language barriers, educational disparities, and reading speed advantages.</p>
    <p>Today, every premier clinical test (including the WAIS-IV Perceptual Reasoning Index and the Reynolds Intellectual Assessment Scales) features matrix reasoning as a foundational subtest for measuring nonverbal fluid intelligence (<em>Gf</em>).</p>

    <h2>The primary geometric rules used in matrix tests</h2>
    <p>Matrix puzzles require test takers to identify one or more simultaneous transformation rules across rows and columns:</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Transformation Rule</th>
          <th>How It Operates</th>
          <th>Cognitive Challenge</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Rotational Symmetry</strong></td>
          <td>Shapes rotate clockwise or counter-clockwise by fixed angles (45°, 90°, 180°)</td>
          <td>Mental rotation and spatial tracking</td>
        </tr>
        <tr>
          <td><strong>Quantitative Progression</strong></td>
          <td>Elements increase or decrease in count (e.g. 1 dot, 2 dots, 3 dots)</td>
          <td>Counting and arithmetic progression</td>
        </tr>
        <tr>
          <td><strong>Boolean / Set Operations</strong></td>
          <td>Shapes combine using XOR, AND, or overlay subtraction</td>
          <td>Visual feature decomposition and working memory retention</td>
        </tr>
        <tr>
          <td><strong>Shading / Texture Shifts</strong></td>
          <td>Fill patterns cycle through solid, striped, empty, and hatched</td>
          <td>Multi-variable state tracking</td>
        </tr>
      </tbody>
    </table>

    <h2>Interactive progressive matrix walkthrough</h2>
    <div class="interactive-puzzle-card">
      <div class="puzzle-header">
        <span class="puzzle-tag">SAMPLE 3x3 MATRIX DEDUCTION</span>
      </div>
      <p style="color:var(--text); font-size:1.05rem; line-height:1.6; margin-bottom:14px;">
        <strong>Row 1:</strong> Circle with 1 dot &nbsp;→&nbsp; Circle with 2 dots &nbsp;→&nbsp; Circle with 3 dots<br>
        <strong>Row 2:</strong> Square with 1 dot &nbsp;→&nbsp; Square with 2 dots &nbsp;→&nbsp; Square with 3 dots<br>
        <strong>Row 3:</strong> Triangle with 1 dot &nbsp;→&nbsp; Triangle with 2 dots &nbsp;→&nbsp; <strong>[ ? ]</strong>
      </p>
      <p><strong>Question:</strong> What geometric figure and dot configuration completes Row 3?</p>
      <button class="btn-outline" onclick="toggleSolution('solPat', this)">🔍 Reveal Step-by-Step Solution</button>
      
      <div id="solPat" class="solution-panel">
        <p style="color:var(--gold); font-weight:600; margin-bottom:8px;">✓ Multi-Variable Matrix Decomposition:</p>
        <ol style="margin-left:20px; color:var(--text); margin-bottom:12px;">
          <li><strong>Row Shape Invariance:</strong> Each row maintains its defining geometry (Row 1 = Circle, Row 2 = Square, Row 3 = Triangle).</li>
          <li><strong>Column Dot Count Progression:</strong> Column 1 has 1 dot, Column 2 has 2 dots, Column 3 has 3 dots.</li>
          <li>Combining Row 3 (Triangle) with Column 3 (3 dots) produces the unique valid answer: <strong>Triangle with 3 dots</strong>.</li>
        </ol>
        <p style="font-size:0.88rem; color:var(--muted); margin-bottom:0;">On advanced matrix items, multiple simultaneous rules (such as 90° clockwise rotation combined with overlay subtraction) operate concurrently.</p>
      </div>
    </div>

    <h2>Why pattern recognition matters in real life</h2>
    <p>High pattern recognition ability enables individuals to spot systemic anomalies in complex data, detect cybersecurity threats, interpret medical scans, formulate financial trading algorithms, and innovate across engineering disciplines.</p>
    <p>To see how pattern recognition matches the thinking styles of history's greatest innovators, read our study of <a href="/historical-figures/leonardo-da-vinci-iq">Leonardo da Vinci's mind</a> or explore <a href="/cognitive-skills/logical-reasoning">logical reasoning</a>.</p>
  `,
  customScript: `
  <script>
    function toggleSolution(id, btn) {
      const panel = document.getElementById(id);
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
        btn.textContent = '🔍 Reveal Step-by-Step Solution';
      } else {
        panel.style.display = 'block';
        btn.textContent = '▲ Hide Solution';
      }
    }
  </script>`,
  faqs: [
    {
      q: "Why are matrix tests called 'culture-fair'?",
      a: "Because they use abstract geometric symbols rather than written words or numbers, eliminating cultural and linguistic test bias."
    },
    {
      q: "What is the relationship between pattern recognition and fluid intelligence?",
      a: "Pattern recognition is the primary real-world expression of fluid intelligence (Gf), reflecting the brain's ability to solve novel visual problems."
    },
    {
      q: "How does our cognitive test assess pattern recognition?",
      a: "Our assessment includes visual spatial puzzles testing shape rotations, progressive counts, and visual subtraction rules."
    }
  ]
});

// Hub C Index — /cognitive-skills/ (public/cognitive-skills/index.html)
buildHtmlPage({
  relPath: 'cognitive-skills/index.html',
  title: 'Reasoning Domains: The Four Core Cognitive Skills | IQ Test',
  description: 'Explore the four core reasoning domains: logical deduction, numerical reasoning, verbal skills, and nonverbal pattern recognition.',
  canonical: 'https://iq-test.icu/cognitive-skills/',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Reasoning Domains' }
  ],
  article: {
    headline: 'Reasoning Domains: Overview of the Four Core Cognitive Pillars',
    about: [
      { "@type": "Thing", "name": "Cognitive ability", "sameAs": "https://en.wikipedia.org/wiki/Cognitive_ability" }
    ]
  },
  h1: 'Reasoning Domains: The Four Pillars of Cognition',
  answerBlock: 'Cognitive assessments evaluate intelligence across distinct reasoning domains. Explore the four core pillars measured on our cognitive self-insight platform: logical deduction, numerical reasoning, verbal comprehension, and nonverbal pattern recognition. Each domain evaluates how your mind approaches structured problem solving.',
  bodyHtml: `
    <h2>The four cognitive domains we measure</h2>
    <div class="figure-grid">
      <div class="figure-card">
        <h3><a href="/cognitive-skills/logical-reasoning">Logical Reasoning</a></h3>
        <p>Rule-based deductive syllogisms, conditional logic, and systematic contradiction elimination.</p>
        <a href="/cognitive-skills/logical-reasoning">Explore Logic →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/cognitive-skills/numerical-reasoning">Numerical Reasoning</a></h3>
        <p>Number series extrapolation, quantitative relationships, and mathematical problem-solving speed.</p>
        <a href="/cognitive-skills/numerical-reasoning">Explore Numbers →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/cognitive-skills/verbal-reasoning">Verbal Reasoning</a></h3>
        <p>Semantic analogies, abstract conceptual classification, and linguistic comprehension.</p>
        <a href="/cognitive-skills/verbal-reasoning">Explore Verbal →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/cognitive-skills/pattern-recognition">Pattern Recognition</a></h3>
        <p>Visual-spatial matrix transformations, rotational symmetry, and nonverbal fluid problem solving.</p>
        <a href="/cognitive-skills/pattern-recognition">Explore Patterns →</a>
      </div>
    </div>
  `,
  faqs: [
    {
      q: "How many questions per domain are on the test?",
      a: "Our 16-question assessment features exactly four questions per domain to generate a balanced multi-factor cognitive profile."
    },
    {
      q: "Which domain is most predictive of fluid intelligence?",
      a: "Pattern recognition (matrix reasoning) has the highest correlation with fluid intelligence (Gf) across psychometric literature."
    }
  ]
});

console.log('HUB C (Cognitive Skills) generation complete.');
