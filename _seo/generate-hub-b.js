/**
 * HUB B Generator — Historical Figures & Cognitive Matching
 * Enhanced with Cognitive Profile Snapshot Cards and Interactive Style Filter
 */

const { buildHtmlPage } = require('./build-seo');

// T4.1 — /historical-figures/albert-einstein-iq
buildHtmlPage({
  relPath: 'historical-figures/albert-einstein-iq.html',
  title: "Albert Einstein's IQ: Where the 160 Came From | IQ Test",
  description: "Albert Einstein never took an IQ test. The quoted score of 160 is an estimate, not a measurement — here is where the number came from and what it means.",
  canonical: 'https://iq-test.icu/historical-figures/albert-einstein-iq',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Historical Minds', url: 'https://iq-test.icu/historical-figures-iq' },
    { name: "Albert Einstein's IQ" }
  ],
  article: {
    headline: "Albert Einstein's IQ Score: Estimate, Not Measurement",
    about: [
      { "@type": "Person", "name": "Albert Einstein", "sameAs": "https://en.wikipedia.org/wiki/Albert_Einstein" },
      { "@type": "Thing", "name": "Intelligence quotient", "sameAs": "https://en.wikipedia.org/wiki/Intelligence_quotient" },
      { "@type": "Thing", "name": "Thought experiment", "sameAs": "https://en.wikipedia.org/wiki/Thought_experiment" }
    ],
    citation: [
      "https://en.wikipedia.org/wiki/Genetic_Studies_of_Genius",
      "https://en.wikipedia.org/wiki/Albert_Einstein"
    ]
  },
  h1: "Albert Einstein's IQ Score: Estimate, Not Measurement",
  answerBlock: "Albert Einstein never took a modern IQ test. The figure of 160 that circulates widely is a retrospective estimate, not a recorded score, and no primary source documents Einstein sitting any standardised intelligence assessment. What is documented is the reasoning style behind his work: visual-spatial thought experiments combined with abstract mathematical modelling.",
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">🧠 Cognitive Profile Snapshot: Albert Einstein</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">Lifespan & Field</div>
          <div class="fact-value">1879–1955 · Theoretical Physics</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Psychometric Status</div>
          <div class="fact-value">Never Tested (Posthumous Estimate: 160)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Dominant Cognitive Mode</div>
          <div class="fact-value">Visual Gedankenexperimente & Invariance</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Major Breakthroughs</div>
          <div class="fact-value">Special & General Relativity, Photoelectric Effect</div>
        </div>
      </div>
    </div>

    <h2>Did Einstein ever take an IQ test?</h2>
    <p>There is no historical record of Albert Einstein ever taking an intelligence test. Modern psychometric testing was in its earliest infancy during Einstein's formative years. The first practical intelligence scale, created by Alfred Binet and Théodore Simon, was published in France in 1905 — the exact same year Einstein published his four groundbreaking <em>Annus Mirabilis</em> papers on the photoelectric effect, Brownian motion, special relativity, and mass-energy equivalence.</p>
    <p>Standardised adult intelligence batteries like David Wechsler's Bellevue test did not appear until 1939. By that time, Einstein was already a globally renowned theoretical physicist at the Institute for Advanced Study in Princeton. He had no practical reason or interest in sitting for a formal psychometric examination.</p>

    <h2>Where the number 160 came from</h2>
    <p>The popular claim that Einstein possessed an IQ of 160 stems from mid-20th-century biographical estimates rather than clinical psychometrics. In 1926, psychologist Catharine Cox Miles published <em>The Early Mental Traits of Three Hundred Geniuses</em> (Volume II of Lewis Terman's <em>Genetic Studies of Genius</em>). Cox examined biographical records, childhood achievements, and correspondence of historical figures who lived between 1450 and 1850 to estimate what their childhood and adult IQ scores might have been.</p>
    <p>While Cox did not evaluate Einstein directly because he was still alive at the time of her study, subsequent writers and popular science columnists applied her retrospective methodology to Einstein. They assigned him an estimated score between 160 and 180 based on his mastery of complex theoretical physics, his early comprehension of advanced Euclidean geometry at age 12, and his formulation of general relativity.</p>

    <h2>Estimated IQ vs. documented cognitive style</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Cognitive Dimension</th>
          <th>Popular Claim</th>
          <th>Documented Historical Reality</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Standardised IQ Score</td>
          <td>160 (or higher)</td>
          <td>Never tested; score is a posthumous estimate</td>
        </tr>
        <tr>
          <td>Dominant Reasoning Mode</td>
          <td>Raw numerical calculation</td>
          <td>Visual-spatial thought experiments (Gedankenexperimente)</td>
        </tr>
        <tr>
          <td>Mathematical Approach</td>
          <td>Effortless mental arithmetic</td>
          <td>Abstract conceptual geometry; collaborated with mathematicians</td>
        </tr>
        <tr>
          <td>Linguistic Expression</td>
          <td>Precocious verbal development</td>
          <td>Late talker in early childhood; expressed ideas in internal visual models</td>
        </tr>
      </tbody>
    </table>

    <h2>What Einstein's actual reasoning style looked like</h2>
    <p>Einstein's cognitive strengths were characterised by an extraordinary capacity for visual-spatial simulation rather than mere arithmetic speed. In his personal letters and autobiographical reflections, Einstein described his thinking process not as a sequence of linguistic sentences or mathematical formulas, but as a dynamic interplay of visual images and conceptual tensions:</p>
    <ol>
      <li><strong>Visual Gedankenexperimente (Thought Experiments):</strong> At age 16, Einstein imagined what it would look like to ride alongside a beam of light, discovering an apparent paradox that eventually led to special relativity.</li>
      <li><strong>Structural Invariance and Symmetry:</strong> He focused on finding universal conservation laws and invariant principles rather than accumulating isolated empirical data.</li>
      <li><strong>Conceptual Tenacity:</strong> Einstein spent over ten years wrestling with the mathematics of general relativity, working extensively with mathematician Marcel Grossmann to master Riemannian differential geometry.</li>
    </ol>
    <p>To explore how modern cognitive science assesses these foundational skills, read our overview on <a href="/cognitive-skills/pattern-recognition">pattern recognition tests</a> and <a href="/cognitive-skills/logical-reasoning">logical deduction methods</a>.</p>

    <h2>Why estimating a historical IQ does not work</h2>
    <p>Modern psychometricians agree that assigning numeric IQ scores to historical figures is unscientific. Standardised IQ is a relative rank-order measurement scored against a normative sample of peers tested under identical, timed conditions. Retrospective estimation relies on surviving written records, which introduces severe historical survival bias and conflates lifelong scientific accomplishment with raw fluid intelligence.</p>
    <p>To learn more about how cognitive scales are structured and why clinical assessments require strict standardisation, explore our guide on <a href="/what-is-an-iq-test">what is an IQ test</a> or browse our index of <a href="/historical-figures-iq">historical figures' IQ scores</a>.</p>
  `,
  faqs: [
    {
      q: "What was Albert Einstein's officially recorded IQ score?",
      a: "Einstein never took an IQ test, so no official score exists. The widely cited score of 160 is an estimate created by biographers and popular writers."
    },
    {
      q: "Did Einstein struggle in school or fail math as a child?",
      a: "No, that is an urban legend. School records from Munich and Aarau show Einstein excelled in mathematics and physics from an early age."
    },
    {
      q: "How does IQ Test match users to historical figures like Einstein?",
      a: "Our cognitive quiz evaluates your relative strengths across four domains (visual pattern recognition, logic, verbal, and numeric) and matches your profile pattern to the documented reasoning habits of historical thinkers."
    }
  ]
});

// T4.2 — /historical-figures/leonardo-da-vinci-iq
buildHtmlPage({
  relPath: 'historical-figures/leonardo-da-vinci-iq.html',
  title: "Leonardo da Vinci's IQ: Truth Behind the Claims | IQ Test",
  description: "Was Leonardo da Vinci's IQ really 200? Discover how biographers estimated his score, what his notebooks reveal, and how his mind actually worked.",
  canonical: 'https://iq-test.icu/historical-figures/leonardo-da-vinci-iq',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Historical Minds', url: 'https://iq-test.icu/historical-figures-iq' },
    { name: "Leonardo da Vinci's IQ" }
  ],
  article: {
    headline: "Leonardo da Vinci's IQ: Cross-Domain Polymathy and Estimated Scores",
    about: [
      { "@type": "Person", "name": "Leonardo da Vinci", "sameAs": "https://en.wikipedia.org/wiki/Leonardo_da_Vinci" },
      { "@type": "Thing", "name": "Polymath", "sameAs": "https://en.wikipedia.org/wiki/Polymath" }
    ],
    citation: [
      "https://en.wikipedia.org/wiki/Leonardo_da_Vinci",
      "https://en.wikipedia.org/wiki/Genetic_Studies_of_Genius"
    ]
  },
  h1: "Leonardo da Vinci's IQ: The Anatomy of a Polymath's Mind",
  answerBlock: "Leonardo da Vinci lived centuries before the invention of intelligence testing, meaning any claim that his IQ was 180, 200, or 220 is purely speculative. No test record exists. His documented genius lay in cross-domain analogical synthesis — seamlessly transferring anatomical insights into mechanical engineering, optics, and painting.",
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">🧠 Cognitive Profile Snapshot: Leonardo da Vinci</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">Lifespan & Era</div>
          <div class="fact-value">1452–1519 · Italian Renaissance Polymath</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Psychometric Status</div>
          <div class="fact-value">Never Tested (Cox 1926 Estimate: 180)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Dominant Cognitive Mode</div>
          <div class="fact-value">Cross-Domain Analogical Synthesis & Observation</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Major Notebook Studies</div>
          <div class="fact-value">Anatomy, Fluid Dynamics, Aeronautics, Optics</div>
        </div>
      </div>
    </div>

    <h2>Did Leonardo da Vinci ever take an IQ test?</h2>
    <p>No. Leonardo da Vinci lived from 1452 to 1519 during the Italian Renaissance, more than 380 years before the development of psychometrics and intelligence testing. Any specific numerical score attributed to Da Vinci is an estimate generated centuries after his death.</p>
    <p>In her landmark 1926 study <em>The Early Mental Traits of Three Hundred Geniuses</em>, psychologist Catharine Cox assigned Leonardo an estimated childhood IQ of 135 and an adult IQ of 180. Subsequent popular accounts inflated this estimate to 200 or 220 without any new psychometric evidence.</p>

    <h2>The documented architecture of Da Vinci's cognition</h2>
    <p>Rather than a single static score, Leonardo's surviving notebooks (over 7,000 pages of drawings, observations, and mirror-script notes) reveal four distinct cognitive pillars:</p>
    <ol>
      <li><strong>Cross-Domain Analogical Transfer:</strong> Da Vinci used fluid dynamics observations of flowing water to understand blood circulation through the human aortic valve and air currents beneath bird wings.</li>
      <li><strong>Empirical Observation over Scholastic Authority:</strong> He described himself as an <em>omo sanza lettere</em> (an unlettered man), prioritising direct physical observation and experimentation over Latin academic dogma.</li>
      <li><strong>Hyper-Detailed Visual Memory:</strong> He produced anatomical studies of musculature, vascular branching, and embryology with structural accuracy that remained unmatched for centuries.</li>
      <li><strong>Spatial Mechanical Simulation:</strong> He designed complex mechanical linkages, flying machines, and hydraulic systems directly on paper, mentally simulating their movement before construction.</li>
    </ol>

    <h2>Estimated metrics vs. historical notebook evidence</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Cognitive Field</th>
          <th>Modern IQ Score Claim</th>
          <th>Notebook & Artifact Evidence</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Overall IQ Rating</td>
          <td>180–220 (popular lore)</td>
          <td>Cox (1926) retrospective estimate; not a test measurement</td>
        </tr>
        <tr>
          <td>Spatial & Pattern Reasoning</td>
          <td>Exceptional (>99th percentile)</td>
          <td>Exquisite 3D sectional drawings, perspective geometry, anatomical studies</td>
        </tr>
        <tr>
          <td>Formal Mathematical Proof</td>
          <td>Advanced analytical calculus</td>
          <td>Applied geometric proportions (Pacioli collaboration); limited algebraic theory</td>
        </tr>
        <tr>
          <td>Verbal / Linguistic Expression</td>
          <td>High academic Latin fluency</td>
          <td>Vernacular Italian mirror script; primarily visual-spatial thinker</td>
        </tr>
      </tbody>
    </table>

    <h2>How Leonardo's cognitive profile translates today</h2>
    <p>In modern cognitive assessment terminology, Leonardo da Vinci represents the peak of high-dimensional <a href="/cognitive-skills/pattern-recognition">pattern recognition</a> and nonverbal inductive reasoning. His capacity to map structural patterns across diverse domains is the hallmark of fluid intelligence.</p>
    <p>To understand the difference between fluid problem-solving and acquired academic knowledge, explore our analysis of <a href="/cognitive-test-vs-iq-test">cognitive tests vs. IQ tests</a> and review our hub on <a href="/historical-figures-iq">historical figures' IQ estimates</a>.</p>
  `,
  faqs: [
    {
      q: "What was Leonardo da Vinci's estimated IQ score?",
      a: "Cox (1926) estimated Da Vinci's adult IQ at 180 based on biographical records. Popular culture claims of 200–220 have no scientific validation."
    },
    {
      q: "Why is Da Vinci considered the ultimate polymath?",
      a: "He achieved foundational mastery across visual art, anatomy, civil engineering, hydrodynamics, optics, and paleontology through empirical observation."
    },
    {
      q: "Can taking an online cognitive test tell me if I think like Da Vinci?",
      a: "Our cognitive quiz evaluates your relative visual-spatial and pattern reasoning strengths to highlight whether your thinking style shares Da Vinci's cross-disciplinary approach."
    }
  ]
});

// T4.3 — /historical-figures/nikola-tesla-iq
buildHtmlPage({
  relPath: 'historical-figures/nikola-tesla-iq.html',
  title: "Nikola Tesla's IQ: Visual Simulation & Estimates | IQ Test",
  description: "Was Nikola Tesla's IQ score 160 or 200? Learn how Tesla's mental simulation ability worked, what is documented, and why his IQ was never formally tested.",
  canonical: 'https://iq-test.icu/historical-figures/nikola-tesla-iq',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Historical Minds', url: 'https://iq-test.icu/historical-figures-iq' },
    { name: "Nikola Tesla's IQ" }
  ],
  article: {
    headline: "Nikola Tesla's IQ: Internal Mental Simulation and Invention",
    about: [
      { "@type": "Person", "name": "Nikola Tesla", "sameAs": "https://en.wikipedia.org/wiki/Nikola_Tesla" },
      { "@type": "Thing", "name": "Invention", "sameAs": "https://en.wikipedia.org/wiki/Invention" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Nikola_Tesla"]
  },
  h1: "Nikola Tesla's IQ: The Power of Internal Simulation",
  answerBlock: "Nikola Tesla never took a formal IQ test during his lifetime, and the popular figures of 160 to 200 attributed to him are retrospective estimates. What historical records and his own writings document is an extraordinary faculty for internal eidetic visualisation, allowing him to construct, test, and troubleshoot complex alternating current machines entirely in his mind.",
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">🧠 Cognitive Profile Snapshot: Nikola Tesla</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">Lifespan & Field</div>
          <div class="fact-value">1856–1943 · Electrical & Mechanical Engineering</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Psychometric Status</div>
          <div class="fact-value">Never Tested (Posthumous Estimates: 160–200)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Dominant Cognitive Mode</div>
          <div class="fact-value">Eidetic Visualisation & Internal Mental Simulation</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Major Patents</div>
          <div class="fact-value">Polyphase AC Power, Induction Motor, Tesla Coil</div>
        </div>
      </div>
    </div>

    <h2>The truth about Nikola Tesla's IQ claims</h2>
    <p>Popular online articles routinely claim that Nikola Tesla possessed an IQ between 160 and 200. However, Tesla (1856–1943) was never administered a clinical IQ test. Intelligence testing in the late 19th and early 20th centuries focused primarily on school-age children in France and the United States, not professional electrical engineers working in private laboratories.</p>
    <p>Posthumous estimates of Tesla's IQ reflect his prolific output of over 300 patents, including the rotating magnetic field, polyphase alternating current (AC) power distribution systems, the Tesla coil, and early radio transmission principles.</p>

    <h2>Tesla's documented mental simulation method</h2>
    <p>In his 1919 autobiography <em>My Inventions</em>, Tesla provided an unusually detailed first-person description of his cognitive processes. He described possessing a vivid form of mental simulation that bypassed the need for preliminary physical prototypes:</p>
    <ol>
      <li><strong>Complete Mental Construction:</strong> When Tesla conceived an idea for a motor or turbine, he built the entire machine in his imagination, specifying every screw and coil dimension without drafting a blueprint.</li>
      <li><strong>Simulated Runtime Testing:</strong> He ran the mental machine over weeks, observing where virtual components suffered mechanical wear or magnetic saturation, then corrected the design before machining a single piece of steel.</li>
      <li><strong>Eidetic Memory:</strong> Tesla could memorise entire books, complex logarithmic tables, and multistage engineering calculations at a glance, recalling them with photographic clarity decades later.</li>
    </ol>

    <h2>Comparing popular IQ estimates with documented achievements</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Claimed Number</th>
          <th>Documented Engineering Evidence</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>IQ Score Range</td>
          <td>160–200 (estimated)</td>
          <td>No test on file; score inferred from engineering innovation</td>
        </tr>
        <tr>
          <td>Mental Visualisation</td>
          <td>Unquantified</td>
          <td>Detailed in <em>My Inventions</em> (1919); built AC motor in mental simulation</td>
        </tr>
        <tr>
          <td>Patent Portfolio</td>
          <td>300+ worldwide</td>
          <td>US Patent 381,968 (Electro-Magnetic Motor) and 100+ US utility patents</td>
        </tr>
        <tr>
          <td>Mathematical Reasoning</td>
          <td>Advanced Theoretical</td>
          <td>Mastery of integral calculus and electromagnetic wave theory at Graz Polytechnic</td>
        </tr>
      </tbody>
    </table>

    <h2>What Tesla's cognitive style teaches us about intelligence</h2>
    <p>Tesla's distinct mind illustrates how spatial reasoning and working memory capacity interact to generate technical breakthroughs. To explore how your own spatial and deductive abilities compare, read about <a href="/cognitive-skills/numerical-reasoning">numerical reasoning</a>, <a href="/cognitive-skills/logical-reasoning">logical deduction</a>, and the broader <a href="/historical-figures-iq">historical figures IQ overview</a>.</p>
  `,
  faqs: [
    {
      q: "What was Nikola Tesla's IQ score?",
      a: "Tesla never took an IQ test. The scores of 160–200 often quoted online are posthumous estimates based on his technological breakthroughs."
    },
    {
      q: "Could Tesla really design machines entirely in his mind?",
      a: "Yes. In his autobiography, Tesla documented that he refined and tested complex AC motors in visual mental simulations before ever building physical models."
    },
    {
      q: "How does our cognitive test relate to Tesla's thinking style?",
      a: "Our assessment tests pattern recognition and logical deduction — two fundamental components of the spatial simulation mode Tesla excelled at."
    }
  ]
});

// T4.4 — /historical-figures/marie-curie-iq
buildHtmlPage({
  relPath: 'historical-figures/marie-curie-iq.html',
  title: "Marie Curie's IQ: Scientific Method & Estimates | IQ Test",
  description: "Was Marie Curie's IQ score 180? Explore the evidence behind Marie Curie's estimated IQ, her two Nobel Prizes, and her relentless empirical reasoning.",
  canonical: 'https://iq-test.icu/historical-figures/marie-curie-iq',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Historical Minds', url: 'https://iq-test.icu/historical-figures-iq' },
    { name: "Marie Curie's IQ" }
  ],
  article: {
    headline: "Marie Curie's IQ: Empirical Rigour and Nobel Achievements",
    about: [
      { "@type": "Person", "name": "Marie Curie", "sameAs": "https://en.wikipedia.org/wiki/Marie_Curie" },
      { "@type": "Thing", "name": "Nobel Prize", "sameAs": "https://en.wikipedia.org/wiki/Nobel_Prize" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Marie_Curie"]
  },
  h1: "Marie Curie's IQ: Empirical Rigour and Two Nobel Prizes",
  answerBlock: "Marie Curie was never administered an IQ test, making the frequently quoted estimates of 180 to 185 speculative. Her documented cognitive legacy is the most formidable empirical track record in scientific history: the only person to win Nobel Prizes in two distinct scientific fields (Physics and Chemistry), driven by meticulous experimental discipline and inductive clarity.",
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">🧠 Cognitive Profile Snapshot: Marie Curie</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">Lifespan & Field</div>
          <div class="fact-value">1867–1934 · Physics & Radiochemistry</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Psychometric Status</div>
          <div class="fact-value">Never Tested (Posthumous Estimates: 180–185)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Dominant Cognitive Mode</div>
          <div class="fact-value">Meticulous Inductive Precision & Quantitative Fractionation</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Nobel Distinctions</div>
          <div class="fact-value">Nobel in Physics (1903) & Nobel in Chemistry (1911)</div>
        </div>
      </div>
    </div>

    <h2>The truth regarding Marie Curie's IQ estimates</h2>
    <p>Popular rankings often assign Marie Skłodowska Curie (1867–1934) an estimated IQ of 180 or 185. As with Einstein and Tesla, this number has no clinical basis — Curie never sat for a psychometric assessment. Standardised testing for adults had not been developed when Curie conducted her foundational radiation research in Paris in the late 1890s.</p>
    <p>Retrospective biographers assign Curie high estimates because of her unmatched academic velocity: finishing top of her class in physics at the Sorbonne in 1893, second in mathematics in 1894, and discovering two new chemical elements (polonium and radium) by 1898.</p>

    <h2>Curie's documented reasoning strengths</h2>
    <p>Curie's intellectual power was grounded in rigorous empirical methodology, systematic chemical fractionation, and deep physical intuition:</p>
    <ol>
      <li><strong>Meticulous Inductive Precision:</strong> Over four grueling years in a drafty shed, Curie manually processed tonnes of pitchblende ore to isolate a tenth of a gram of pure radium chloride, measuring radioactivity with precision electrometers designed by Pierre and Jacques Curie.</li>
      <li><strong>Hypothesis-Driven Theoretical Insight:</strong> She formulated the revolutionary hypothesis that radiation was an intrinsic atomic property of the uranium atom itself, dismantling the ancient concept of the indivisible atom.</li>
      <li><strong>Dual-Disciplinary Mastery:</strong> She synthesised principles across atomic physics (1903 Nobel Prize) and pure chemistry (1911 Nobel Prize), establishing the entire field of radiochemistry.</li>
    </ol>

    <h2>Documented achievements vs. speculative IQ figures</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Dimension</th>
          <th>Popular Claim</th>
          <th>Historical Evidence</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Numeric IQ Score</td>
          <td>180–185</td>
          <td>Unmeasured; posthumously estimated from academic records</td>
        </tr>
        <tr>
          <td>Nobel Recognition</td>
          <td>Unprecedented</td>
          <td>Physics (1903, shared) & Chemistry (1911, sole recipient)</td>
        </tr>
        <tr>
          <td>Mathematical & Physical Training</td>
          <td>Top percentile at Sorbonne</td>
          <td>Licence ès sciences physiques (1893) & mathématiques (1894)</td>
        </tr>
        <tr>
          <td>Applied Innovation</td>
          <td>Mobile medical X-ray units</td>
          <td>Developed "Petites Curies" radiological vehicles during World War I</td>
        </tr>
      </tbody>
    </table>

    <h2>Connecting Curie's empirical method to cognitive skills</h2>
    <p>Curie's cognitive profile exemplifies focused inductive reasoning and quantitative analysis. To understand how quantitative problem solving is measured on modern scales, explore our articles on <a href="/cognitive-skills/numerical-reasoning">numerical reasoning</a>, <a href="/iq-scores/what-is-a-good-iq-score">what is a good IQ score</a>, and our central <a href="/historical-figures-iq">historical figures guide</a>.</p>
  `,
  faqs: [
    {
      q: "Did Marie Curie ever take an IQ test?",
      a: "No. Standardised IQ tests were not available for adults during her university or research years."
    },
    {
      q: "What makes Marie Curie unique among historical scientists?",
      a: "She remains the only person in history to win Nobel Prizes in two different scientific fields: Physics and Chemistry."
    },
    {
      q: "How does our cognitive test reflect Curie's thinking style?",
      a: "Our test evaluates methodical logic, pattern recognition, and numerical deduction — the core analytical faculties Curie used in experimental research."
    }
  ]
});

// T4.5 — /historical-figures/isaac-newton-iq
buildHtmlPage({
  relPath: 'historical-figures/isaac-newton-iq.html',
  title: "Isaac Newton's IQ: First-Principles Deduction | IQ Test",
  description: "Was Isaac Newton's IQ score 190? Learn how biographers estimated Newton's IQ, how his mathematical deduction worked, and what history actually records.",
  canonical: 'https://iq-test.icu/historical-figures/isaac-newton-iq',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Historical Minds', url: 'https://iq-test.icu/historical-figures-iq' },
    { name: "Isaac Newton's IQ" }
  ],
  article: {
    headline: "Isaac Newton's IQ: First-Principles Deduction and Mathematical Synthesis",
    about: [
      { "@type": "Person", "name": "Isaac Newton", "sameAs": "https://en.wikipedia.org/wiki/Isaac_Newton" },
      { "@type": "Thing", "name": "Philosophiæ Naturalis Principia Mathematica", "sameAs": "https://en.wikipedia.org/wiki/Philosophi%C3%A6_Naturalis_Principia_Mathematica" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Isaac_Newton", "https://en.wikipedia.org/wiki/Genetic_Studies_of_Genius"]
  },
  h1: "Isaac Newton's IQ: Mathematical Synthesis from First Principles",
  answerBlock: "Sir Isaac Newton lived in the 17th and 18th centuries, hundreds of years before intelligence testing was invented, so no verified IQ score exists. The popular estimates of 190 to 200 derive from Catharine Cox's 1926 retrospective study, reflecting Newton's single-handed creation of infinitesimal calculus, classical mechanics, and the universal law of gravitation.",
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">🧠 Cognitive Profile Snapshot: Sir Isaac Newton</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">Lifespan & Field</div>
          <div class="fact-value">1642–1727 · Mathematics, Physics, Astronomy</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Psychometric Status</div>
          <div class="fact-value">Never Tested (Cox 1926 Estimate: 190)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Dominant Cognitive Mode</div>
          <div class="fact-value">Axiomatic Deduction & Infinitesimal Calculus</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Magnum Opus</div>
          <div class="fact-value">Philosophiæ Naturalis Principia Mathematica (1687)</div>
        </div>
      </div>
    </div>

    <h2>Where Newton's estimated IQ of 190 originated</h2>
    <p>Sir Isaac Newton (1642–1727) lived during the Scientific Revolution. In 1926, psychologist Catharine Cox Miles estimated Newton's childhood IQ at 130 and his adult IQ at 190 in Volume II of Terman's <em>Genetic Studies of Genius</em>. Cox based her evaluation on Newton's early mechanical inventions (water clocks, windmills, sundials), his swift mastery of Cartesian geometry, and his explosive burst of discovery during the 1665–1666 Great Plague of London.</p>
    <p>While 190 is often cited as fact today, it is an academic estimate designed to quantify the sheer density of Newton's intellectual breakthroughs, not a test score.</p>

    <h2>The mechanics of Newton's cognitive architecture</h2>
    <p>Newton's intellectual output was characterised by unmatched sustained concentration and rigorous axiomatic deduction:</p>
    <ol>
      <li><strong>Inventing New Mathematical Systems:</strong> When existing mathematics proved inadequate to calculate planetary trajectories and continuous motion, Newton developed fluxions (infinitesimal calculus).</li>
      <li><strong>Axiomatic Physics in the <em>Principia</em>:</strong> In 1687, Newton published <em>Philosophiæ Naturalis Principia Mathematica</em>, laying out the three universal laws of motion and gravitation with mathematical proofs structured after Euclidean geometry.</li>
      <li><strong>Experimental Optics:</strong> Newton proved that white light is a composite spectrum using glass prisms and built the first functional reflecting telescope (the Newtonian reflector).</li>
    </ol>

    <h2>Historical milestones vs. estimated metrics</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Cognitive Field</th>
          <th>Popular Claim</th>
          <th>Historical Reality</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>IQ Score Rating</td>
          <td>190–200</td>
          <td>Cox (1926) retrospective estimate; unmeasured during life</td>
        </tr>
        <tr>
          <td>Calculus Formulation</td>
          <td>Instantaneous discovery</td>
          <td>Developed 'method of fluxions' in 1665–1666; published decades later</td>
        </tr>
        <tr>
          <td>Logical Structure</td>
          <td>Supreme mathematical rigor</td>
          <td>Constructed classical physics using rigorous geometric proofs</td>
        </tr>
        <tr>
          <td>Concentration Style</td>
          <td>Hyper-focused problem immersion</td>
          <td>Documented working 18+ hours a day for months during <em>Principia</em> drafting</td>
        </tr>
      </tbody>
    </table>

    <h2>How deductive reasoning is tested today</h2>
    <p>Newton's thought process represents the pinnacle of formal <a href="/cognitive-skills/logical-reasoning">logical reasoning</a> and mathematical modeling. To see how these reasoning domains are assessed on modern psychometric scales, visit our guides on <a href="/types-of-iq-tests">types of IQ tests</a>, <a href="/what-is-an-iq-test">what is an IQ test</a>, and our central <a href="/historical-figures-iq">historical figures roster</a>.</p>
  `,
  faqs: [
    {
      q: "What was Isaac Newton's recorded IQ score?",
      a: "Newton never took an IQ test. The score of 190 is a retrospective estimate published by psychologist Catharine Cox in 1926."
    },
    {
      q: "What were Newton's greatest intellectual contributions?",
      a: "He developed infinitesimal calculus, formulated the three universal laws of motion, established universal gravitation, and proved the composite nature of white light."
    },
    {
      q: "How does our cognitive test relate to Newton's style of thinking?",
      a: "Our assessment tests formal logical deduction and numeric pattern recognition, which correspond to the systematic problem-solving methods Newton pioneered."
    }
  ]
});

// T4.6 — /historical-figures/stephen-hawking-iq
buildHtmlPage({
  relPath: 'historical-figures/stephen-hawking-iq.html',
  title: "Stephen Hawking's IQ: What Hawking Actually Said | IQ Test",
  description: "What was Stephen Hawking's IQ? Discover why Hawking dismissed IQ claims, where the 160 estimate came from, and his extraordinary theoretical mind.",
  canonical: 'https://iq-test.icu/historical-figures/stephen-hawking-iq',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Historical Minds', url: 'https://iq-test.icu/historical-figures-iq' },
    { name: "Stephen Hawking's IQ" }
  ],
  article: {
    headline: "Stephen Hawking's IQ: Theoretical Physics and the Question of Scores",
    about: [
      { "@type": "Person", "name": "Stephen Hawking", "sameAs": "https://en.wikipedia.org/wiki/Stephen_Hawking" },
      { "@type": "Thing", "name": "Hawking radiation", "sameAs": "https://en.wikipedia.org/wiki/Hawking_radiation" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Stephen_Hawking"]
  },
  h1: "Stephen Hawking's IQ: Abstract Reasoning Under Physical Constraint",
  answerBlock: "Stephen Hawking never revealed an official IQ score and famously dismissed the obsession with numerical ratings in a 2004 interview, stating that people who boast about their IQs are losers. The popular score of 160 attributed to Hawking is an estimate based on his theoretical breakthroughs in singularity theorems and Hawking radiation.",
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">🧠 Cognitive Profile Snapshot: Stephen Hawking</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">Lifespan & Chair</div>
          <div class="fact-value">1942–2018 · Lucasian Professor of Mathematics</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Psychometric Status</div>
          <div class="fact-value">Never Disclosed / Dismissed ("Losers boast about IQ")</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Dominant Cognitive Mode</div>
          <div class="fact-value">High-Dimensional Topological & Geometric Visualization</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Key Discoveries</div>
          <div class="fact-value">Hawking Radiation, Penrose-Hawking Singularity Theorems</div>
        </div>
      </div>
    </div>

    <h2>What Stephen Hawking actually said about IQ tests</h2>
    <p>In December 2004, a reporter for <em>The New York Times</em> asked theoretical physicist Stephen Hawking (1942–2018) what his IQ score was. Hawking's response was characteristically blunt and insightful:</p>
    <blockquote style="background:var(--bg-card); border-left:4px solid var(--gold); padding:16px 20px; margin:20px 0; font-style:italic; color:var(--text);">
      "I have no idea. People who boast about their IQ are losers."
    </blockquote>
    <p>Hawking understood that a single psychometric number cannot capture the creative intuition, spatial visualization, and sustained theoretical grit required to solve quantum gravity and cosmological singularities.</p>

    <h2>Where the 160 estimate came from</h2>
    <p>Despite Hawking's own disinterest in IQ numbers, media outlets and online aggregators routinely assign him an estimated IQ of 160. This number was calculated posthumously by matching Hawking's academic trajectory (Oxford first-class degree, Cambridge PhD, Lucasian Professor of Mathematics) to standard genius-level psychometric benchmarks.</p>

    <h2>Hawking's extraordinary visual-geometric cognitive mode</h2>
    <p>Following his diagnosis with amyotrophic lateral sclerosis (ALS) at age 21, Hawking gradually lost the physical ability to write equations by hand. This extreme constraint forced him to develop a specialized cognitive methodology:</p>
    <ol>
      <li><strong>Geometric Visualization of Spacetime:</strong> Unable to manipulate long algebraic formulas on paper, Hawking translated complex mathematical problems into high-dimensional geometric shapes that he could manipulate in his mind.</li>
      <li><strong>Penrose–Hawking Singularity Theorems:</strong> Together with Roger Penrose, he applied topological and differential geometry techniques to prove that general relativity predicts singularities at the center of black holes and the Big Bang.</li>
      <li><strong>Hawking Radiation (1974):</strong> He combined quantum field theory with general relativity to show that black holes emit thermal radiation and can eventually evaporate.</li>
    </ol>

    <h2>Hawking's documented achievements vs. media score claims</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Dimension</th>
          <th>Claimed Number</th>
          <th>Documented Reality</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Standardised IQ Score</td>
          <td>160 (media estimate)</td>
          <td>Never disclosed by Hawking; famously dismissed in 2004 interview</td>
        </tr>
        <tr>
          <td>Academic Position</td>
          <td>Peak theoretical mathematics</td>
          <td>Lucasian Professor of Mathematics at Cambridge (1979–2009)</td>
        </tr>
        <tr>
          <td>Primary Method</td>
          <td>High-speed calculation</td>
          <td>Visual-geometric mental modeling of curved spacetime</td>
        </tr>
        <tr>
          <td>Public Science Legacy</td>
          <td>Bestselling author</td>
          <td><em>A Brief History of Time</em> (over 25 million copies sold)</td>
        </tr>
      </tbody>
    </table>

    <h2>Connecting abstract reasoning to cognitive assessments</h2>
    <p>Hawking's ability to manipulate multidimensional spaces mentally is an example of advanced <a href="/cognitive-skills/pattern-recognition">pattern recognition</a> and nonverbal reasoning. To learn more about how cognitive testing evaluates these capabilities, explore our guide to <a href="/what-is-an-iq-test">what is an IQ test</a> and check our <a href="/historical-figures-iq">historical figures directory</a>.</p>
  `,
  faqs: [
    {
      q: "What was Stephen Hawking's official IQ?",
      a: "Hawking never publicly disclosed an IQ score and stated in 2004 that he had no idea what it was, adding that people who boast about their IQ are losers."
    },
    {
      q: "How did Hawking do complex physics without writing equations?",
      a: "He trained himself to visualize mathematical relationships in terms of geometric surfaces and topological structures in his mind."
    },
    {
      q: "How does our cognitive quiz relate to Hawking's thinking?",
      a: "Our assessment measures visual pattern reasoning and spatial deduction — the same fundamental faculties Hawking used to understand theoretical physics."
    }
  ]
});

// T4.7 — /historical-figures/highest-iq-in-history
buildHtmlPage({
  relPath: 'historical-figures/highest-iq-in-history.html',
  title: "The Highest IQ in History: Why No One Really Knows | IQ Test",
  description: "Who has the highest IQ ever recorded? The honest answer is that no verified record exists — here is why the famous numbers fall apart under scrutiny.",
  canonical: 'https://iq-test.icu/historical-figures/highest-iq-in-history',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Historical Minds', url: 'https://iq-test.icu/historical-figures-iq' },
    { name: "Highest IQ in History" }
  ],
  article: {
    headline: "The Highest IQ in History: What the Records Actually Show",
    about: [
      { "@type": "Thing", "name": "Intelligence quotient", "sameAs": "https://en.wikipedia.org/wiki/Intelligence_quotient" },
      { "@type": "Person", "name": "William James Sidis", "sameAs": "https://en.wikipedia.org/wiki/William_James_Sidis" }
    ],
    citation: ["https://en.wikipedia.org/wiki/William_James_Sidis", "https://en.wikipedia.org/wiki/Guinness_World_Records"]
  },
  h1: "The Highest IQ in History: What the Records Actually Show",
  answerBlock: "There is no verified record of the highest IQ ever measured. Guinness World Records retired its \"highest IQ\" category in 1990 because the claims could not be reliably compared across different tests and scoring scales. The famous figures attached to historical names are estimates, self-reports, or childhood extrapolations — not standardised measurements.",
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">📜 Psychometric Record Status: Extreme IQs</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">Official Guinness Category</div>
          <div class="fact-value">Retired in 1990 (Unstandardized / Incomparable)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Clinical WAIS-IV Ceiling</div>
          <div class="fact-value">IQ 160 (99.997th Percentile, +4 SD)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">William Sidis (Claimed 250+)</div>
          <div class="fact-value">Publicity Extrapolation; Never Tested as Adult</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Marilyn vos Savant (228)</div>
          <div class="fact-value">Childhood Ratio Score; Incomparable to Deviation IQ</div>
        </div>
      </div>
    </div>

    <h2>Why there is no official 'highest IQ' record</h2>
    <p>From the mid-1980s until 1990, the <em>Guinness Book of World Records</em> listed high-IQ category holders, featuring scores ranging from 190 to 228. However, Guinness formally retired the category in 1990 after consulting leading psychometricians. The reason was clear: extreme high-IQ scores are statistically unstandardised and impossible to compare across different testing instruments.</p>
    <p>On modern deviation IQ scales (such as the WAIS-IV with a mean of 100 and a standard deviation of 15), a score of 160 represents +4 standard deviations above the mean. Mathematically, this corresponds to roughly the 99.997th percentile, or about 1 in 31,500 people. Standardisation normative samples are simply too small to measure scores at +5 or +6 standard deviations (175–190+) with any statistical reliability.</p>

    <h2>The names that come up most often — and the documented facts</h2>
    <p>Several historical figures are frequently cited as possessing the highest IQs ever recorded. Here is what historical documents and psychometric records actually verify about each:</p>
    <ol>
      <li><strong>William James Sidis (claimed 250–300):</strong> Sidis entered Harvard University at age 11 in 1909 and gave lectures on four-dimensional mathematics. However, biographer Amy Wallace confirmed that the claim of an IQ near 300 was an exaggerated publicity number popularized by his father, psychologist Boris Sidis. William never took a modern adult deviation IQ test.</li>
      <li><strong>Marilyn vos Savant (claimed 228):</strong> Listed in Guinness before the category was retired. Her score was calculated from a childhood Stanford–Binet ratio test (mental age divided by chronological age), which produces inflated numbers compared to modern adult deviation scales.</li>
      <li><strong>Terence Tao (claimed 220–230):</strong> Fields Medalist mathematician Terence Tao scored 760 on the SAT math section at age 8. While Tao took childhood talent search tests, psychometricians emphasize that childhood extrapolation scores do not equal adult deviation IQ points.</li>
      <li><strong>Leonardo da Vinci & Johann Wolfgang von Goethe (claimed 200–225):</strong> Purely retrospective estimates derived from Catharine Cox's 1926 study based on biographical records, not real clinical test data.</li>
    </ol>

    <h2>Comparing famous extreme IQ claims with psychometric reality</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Individual</th>
          <th>Claimed Score</th>
          <th>Testing Source</th>
          <th>Psychometric Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>William James Sidis</td>
          <td>250–300</td>
          <td>Childhood media claims</td>
          <td>Unverified; no formal test records exist</td>
        </tr>
        <tr>
          <td>Marilyn vos Savant</td>
          <td>228</td>
          <td>1956 Stanford-Binet (childhood)</td>
          <td>Ratio IQ score; not comparable to adult deviation scales</td>
        </tr>
        <tr>
          <td>Terence Tao</td>
          <td>220–230</td>
          <td>Childhood Johns Hopkins talent search</td>
          <td>Extrapolated childhood score; Tao rejects adult rankings</td>
        </tr>
        <tr>
          <td>Johann Wolfgang von Goethe</td>
          <td>210–225</td>
          <td>Cox (1926) retrospective study</td>
          <td>Historical biographical estimate; unmeasured</td>
        </tr>
        <tr>
          <td>Albert Einstein</td>
          <td>160–180</td>
          <td>Biographical estimate</td>
          <td>Never tested during his lifetime</td>
        </tr>
      </tbody>
    </table>

    <h2>Why scores above 160 are statistically unstable</h2>
    <p>To establish a valid psychometric test, researchers must calibrate questions against a massive representative population sample. Testing a score of 180 (more than five standard deviations above the mean) would require a norming group of tens of millions of individuals to calibrate the top few test questions accurately. No commercial test conducts norming on that scale.</p>
    <p>Furthermore, intelligence tests have a score ceiling. Once a test taker answers all difficult questions correctly, the test cannot differentiate between an IQ of 165 and an IQ of 190. At that extreme, real-world intellectual achievement is determined far more by creativity, perseverance, and domain-specific knowledge than by incremental points on a test.</p>

    <h2>Percentile placement vs. arbitrary raw numbers</h2>
    <p>In modern cognitive psychology, percentile rank is considered far more informative and scientifically meaningful than an uncalibrated high number. Knowing that a performance ranks in the top 2% (Mensa threshold, 130+) or top 0.1% (145+) provides a concrete mathematical reference point without the distortions of speculative claims.</p>
    <p>To learn more about how normal distribution curves and standard deviations work, explore our <a href="/iq-scores/iq-scale-chart">IQ scale chart</a>, test your score with our <a href="/iq-scores/iq-percentile-calculator">percentile calculator</a>, or read our overview of <a href="/iq-scores/high-iq-genius-range">the high IQ and genius range</a>.</p>
  `,
  faqs: [
    {
      q: "Who holds the official world record for the highest IQ?",
      a: "No one. Guinness World Records retired the highest IQ category in 1990 because extreme claims cannot be standardized or verified across different scales."
    },
    {
      q: "Did William James Sidis have an IQ of 300?",
      a: "No. The claim of an IQ of 250–300 was an exaggerated public relations estimate, not a verified score from a standardised test."
    },
    {
      q: "What is the highest possible score on a modern clinical IQ test?",
      a: "Most modern clinical instruments (like the WAIS-IV) cap their standard scoring scale at an IQ of 160 (the 99.997th percentile) due to standardisation limits."
    }
  ]
});

// Hub B Index — /historical-figures-iq (public/historical-figures-iq.html)
buildHtmlPage({
  relPath: 'historical-figures-iq.html',
  title: 'Historical Figures IQ: Estimates & Thinking Styles | IQ Test',
  description: 'What were the IQ scores of Einstein, Da Vinci, Tesla, and Curie? Discover the truth behind historical IQ estimates and explore documented cognitive styles.',
  canonical: 'https://iq-test.icu/historical-figures-iq',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Historical Minds' }
  ],
  article: {
    headline: 'Historical Figures IQ Scores: Estimates, Methodologies, and Cognitive Profiles',
    about: [
      { "@type": "Thing", "name": "Intelligence quotient", "sameAs": "https://en.wikipedia.org/wiki/Intelligence_quotient" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Genetic_Studies_of_Genius"]
  },
  h1: 'Historical Figures IQ: Estimates and Cognitive Styles',
  answerBlock: 'No major historical figure — including Albert Einstein, Leonardo da Vinci, Nikola Tesla, or Isaac Newton — ever took a modern standardised IQ test. All widely circulated figures are posthumous estimates, not recorded scores. This hub explores where those estimates came from and examines the documented problem-solving styles behind history’s greatest minds.',
  bodyHtml: `
    <h2>The history of estimating historical IQs</h2>
    <p>In 1926, psychologist Catharine Cox published a foundational study in retrospective historiometry: <em>The Early Mental Traits of Three Hundred Geniuses</em>. By analyzing biographical writings, childhood intellectual milestones, and correspondence from individuals living between 1450 and 1850, Cox and her team assigned estimated childhood and adult IQ scores to quantify their historical impact.</p>
    <p>While Cox's methodology was an impressive academic effort, contemporary psychometricians emphasize that estimating historical scores is not clinically valid. A true IQ score requires a standardised, timed examination scored against a representative peer group.</p>

    <h2>Explore historical cognitive profiles</h2>
    <p>Filter historical figures by their primary cognitive problem-solving modality:</p>
    
    <div class="filter-pills">
      <button class="filter-pill active" onclick="filterThinkers('all', this)">All Thinkers (7)</button>
      <button class="filter-pill" onclick="filterThinkers('visual', this)">Visual-Spatial & Simulation</button>
      <button class="filter-pill" onclick="filterThinkers('logic', this)">Deductive Logic</button>
      <button class="filter-pill" onclick="filterThinkers('empirical', this)">Empirical Science</button>
      <button class="filter-pill" onclick="filterThinkers('polymath', this)">Polymathic Synthesis</button>
    </div>

    <div class="figure-grid" id="thinkersGrid">
      <div class="figure-card" data-category="visual">
        <h3><a href="/historical-figures/albert-einstein-iq">Albert Einstein (Est. 160)</a></h3>
        <p>Master of visual-spatial Gedankenexperimente and conceptual invariance principles.</p>
        <a href="/historical-figures/albert-einstein-iq">Read Cognitive Profile →</a>
      </div>

      <div class="figure-card" data-category="polymath">
        <h3><a href="/historical-figures/leonardo-da-vinci-iq">Leonardo da Vinci (Est. 180–200)</a></h3>
        <p>The ultimate polymath: cross-domain analogical synthesis and hyper-detailed observation.</p>
        <a href="/historical-figures/leonardo-da-vinci-iq">Read Cognitive Profile →</a>
      </div>

      <div class="figure-card" data-category="visual">
        <h3><a href="/historical-figures/nikola-tesla-iq">Nikola Tesla (Est. 160–200)</a></h3>
        <p>Eidetic visualization and complete internal mental simulation of AC machinery.</p>
        <a href="/historical-figures/nikola-tesla-iq">Read Cognitive Profile →</a>
      </div>

      <div class="figure-card" data-category="empirical">
        <h3><a href="/historical-figures/marie-curie-iq">Marie Curie (Est. 180–185)</a></h3>
        <p>Meticulous experimental precision and inductive rigor; only dual-science Nobel laureate.</p>
        <a href="/historical-figures/marie-curie-iq">Read Cognitive Profile →</a>
      </div>

      <div class="figure-card" data-category="logic">
        <h3><a href="/historical-figures/isaac-newton-iq">Isaac Newton (Est. 190)</a></h3>
        <p>Axiomatic first-principles deduction; invented infinitesimal calculus and classical mechanics.</p>
        <a href="/historical-figures/isaac-newton-iq">Read Cognitive Profile →</a>
      </div>

      <div class="figure-card" data-category="visual">
        <h3><a href="/historical-figures/stephen-hawking-iq">Stephen Hawking (Est. 160)</a></h3>
        <p>High-dimensional topological visualization of curved spacetime and black hole physics.</p>
        <a href="/historical-figures/stephen-hawking-iq">Read Cognitive Profile →</a>
      </div>

      <div class="figure-card" data-category="all">
        <h3><a href="/historical-figures/highest-iq-in-history">The Highest IQ in History</a></h3>
        <p>Why Guinness retired the category and what the records actually show about Sidis, Tao, and others.</p>
        <a href="/historical-figures/highest-iq-in-history">Read the Analysis →</a>
      </div>
    </div>

    <h2>How our assessment matches your cognitive style</h2>
    <p>Our 16-question cognitive assessment analyzes your relative performance across four distinct reasoning domains: numeric logic, verbal reasoning, deductive analysis, and visual pattern recognition. Rather than claiming to measure a clinical IQ, we compare your relative strengths to the documented thinking habits of these iconic innovators.</p>
    <p>To learn more about cognitive benchmarks, browse our <a href="/iq-scores/">IQ scores reference guide</a> and explore <a href="/cognitive-skills/">the four reasoning domains</a>.</p>
  `,
  customScript: `
  <script>
    function filterThinkers(category, btn) {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const cards = document.querySelectorAll('#thinkersGrid .figure-card');
      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category || card.getAttribute('data-category') === 'all') {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
  </script>`,
  faqs: [
    {
      q: "Did any of these historical figures ever take an IQ test?",
      a: "No. Standardised adult intelligence testing was developed after their formative scientific work had already been completed."
    },
    {
      q: "How does our cognitive match work?",
      a: "Our optional Deep Report maps your strongest sub-score domain against the documented problem-solving methods of historical figures."
    }
  ]
});

console.log('HUB B (Historical Figures) generation complete.');
