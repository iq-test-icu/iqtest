/**
 * Trust & Utility Pages Generator
 * Priority: 4 (E-E-A-T & Commercial Conversion Anchors)
 */

const { buildHtmlPage } = require('./build-seo');

// T4.15 — /are-online-iq-tests-accurate
buildHtmlPage({
  relPath: 'are-online-iq-tests-accurate.html',
  title: 'Are Online IQ Tests Accurate? An Honest Answer | IQ Test',
  description: 'Online IQ tests are not clinically valid, but a well-calibrated one can still tell you something real. Here is exactly what they can and cannot measure.',
  canonical: 'https://iq-test.icu/are-online-iq-tests-accurate',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Test Accuracy' }
  ],
  article: {
    headline: 'Are Online IQ Tests Accurate? Psychometric Reliability and Online Limits',
    about: [
      { "@type": "Thing", "name": "Psychometrics", "sameAs": "https://en.wikipedia.org/wiki/Psychometrics" },
      { "@type": "Thing", "name": "Wechsler Adult Intelligence Scale", "sameAs": "https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Intelligence_quotient"]
  },
  h1: 'Are Online IQ Tests Accurate? An Honest Answer',
  answerBlock: 'Online IQ tests are not clinically valid and cannot substitute for a professionally administered assessment such as the WAIS-IV. A well-constructed online test can still give a reasonable indication of relative reasoning performance, provided it is properly calibrated, states its scoring method, and does not promise a diagnostic result.',
  bodyHtml: `
    <h2>What 'accurate' means in psychometrics: reliability vs. validity</h2>
    <p>To evaluate whether any cognitive test is accurate, psychologists evaluate two distinct scientific properties:</p>
    <ul>
      <li><strong>Reliability:</strong> Consistency of measurement. If you take the test twice under identical conditions without learning the answers, does it yield roughly the same score?</li>
      <li><strong>Validity:</strong> Construct accuracy. Does the test actually measure general intelligence (the <em>g factor</em>), or does it merely measure computer literacy, reaction speed, or familiarity with specific riddles?</li>
    </ul>
    <p>Clinical gold-standard assessments — like the Wechsler Adult Intelligence Scale (WAIS-IV) — spend years in research development to achieve reliability coefficients exceeding 0.95 and construct validity validated against thousands of diverse test subjects.</p>

    <h2>What online cognitive tests genuinely CAN measure</h2>
    <p>A well-designed, un-padded online cognitive quiz can effectively evaluate:</p>
    <ol>
      <li><strong>Relative Fluid Reasoning (Gf):</strong> The ability to identify visual transformations, sequence progressions, and rule contradictions in real time.</li>
      <li><strong>Processing Speed & Focus:</strong> How quickly and accurately you solve structured puzzles under time pressure.</li>
      <li><strong>Categorical Strengths:</strong> Your relative balance between spatial-pattern logic and numerical/verbal deduction.</li>
    </ol>

    <h2>What online tests CANNOT measure</h2>
    <p>No browser-based quiz can replicate a comprehensive clinical psychological battery. Specifically, online tests cannot:</p>
    <ul>
      <li><strong>Provide Diagnostic Evaluations:</strong> Online scores cannot be used for clinical diagnoses of learning disabilities, intellectual giftedness, or cognitive impairments.</li>
      <li><strong>Supervise Test Conditions:</strong> An online test cannot ensure that the environment is quiet, that external calculators or search engines are not used, or that the test taker is fully rested.</li>
      <li><strong>Measure Interactive Abilities:</strong> Clinical tests evaluate open-ended oral explanations, working memory digit spans backwards and forwards, and physical block design manipulation under a psychologist's direct observation.</li>
    </ul>

    <h2>Seven warning signs of a misleading IQ test website</h2>
    <p>When searching for cognitive assessments online, watch out for these seven common red flags:</p>
    <ol>
      <li><strong>Hidden Subscription Traps:</strong> Sites that advertise "Free IQ Test" but force you into an automatic recurring $39.99/month billing loop upon checkout.</li>
      <li><strong>Inflated Score Flattery:</strong> Tests where virtually everyone scores between 135 and 150 to encourage social media sharing.</li>
      <li><strong>Claims of Official Clinical Validity:</strong> Any website claiming its 10-minute quiz is an "official clinical IQ test accepted by Mensa or universities."</li>
      <li><strong>Overly Simplistic Riddles:</strong> Quizzes relying on trick trivia questions or puns rather than psychometrically sound matrix transformations.</li>
      <li><strong>Zero Methodology Transparency:</strong> No published explanation of the underlying scoring distribution, mean, or standard deviation.</li>
      <li><strong>Missing Company Information:</strong> No physical address, support contact, or identifiable organization accountable for the website.</li>
      <li><strong>Forced Email Collection Prior to Score:</strong> Demanding personal contact data before displaying basic baseline results.</li>
    </ol>

    <h2>How IQ Test compares</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Standard Feature</th>
          <th>Typical Online Quiz Site</th>
          <th>IQ Test (This Property)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Free Baseline Score</td>
          <td>Often paywalled after completion</td>
          <td>Instant free score and percentile on completion screen</td>
        </tr>
        <tr>
          <td>Pricing Model</td>
          <td>Recurring monthly subscriptions ($29–$49/mo)</td>
          <td>One-time, flat report purchase ($1.99–$6.99) — zero subscriptions</td>
        </tr>
        <tr>
          <td>Clinical Claims</td>
          <td>Often falsely claims clinical equivalence</td>
          <td>Explicitly transparent: self-insight and reflection only</td>
        </tr>
        <tr>
          <td>Historical Figure Matching</td>
          <td>Absent or arbitrary</td>
          <td>Thematic profile matching based on documented reasoning styles</td>
        </tr>
      </tbody>
    </table>

    <h2>Explore related guides</h2>
    <p>To learn more about how cognitive instruments are constructed, read our breakdown of <a href="/types-of-iq-tests">types of IQ tests</a>, explore <a href="/what-is-an-iq-test">what is an IQ test</a>, or check our <a href="/methodology">scoring methodology</a>.</p>
  `,
  faqs: [
    {
      q: "Can I use an online IQ test score for job applications or Mensa?",
      a: "No. Formal institutions require proctored, clinically administered evaluations such as the WAIS-IV or Stanford-Binet."
    },
    {
      q: "Why do some online tests give everyone high scores?",
      a: "Many sites deliberately inflate scores to flatter users into purchasing certificates or sharing results on social media."
    },
    {
      q: "How does our test ensure scoring honesty?",
      a: "We calibrate raw scores against the standard mean-100/SD-15 distribution without score inflation, and provide free baseline results immediately."
    }
  ]
});

// T4.16 — /types-of-iq-tests
buildHtmlPage({
  relPath: 'types-of-iq-tests.html',
  title: 'Types of IQ Tests: WAIS, Stanford-Binet & More | IQ Test',
  description: "Compare the primary types of IQ tests: WAIS-IV, Stanford-Binet 5, Raven's Progressive Matrices, WISC-V, and modern online cognitive assessments.",
  canonical: 'https://iq-test.icu/types-of-iq-tests',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Types of Tests' }
  ],
  article: {
    headline: 'Types of IQ Tests: Comparison of Major Clinical and Standardised Scales',
    about: [
      { "@type": "Thing", "name": "Wechsler Adult Intelligence Scale", "sameAs": "https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale" },
      { "@type": "Thing", "name": "Stanford%E2%80%93Binet_Intelligence_Scales", "sameAs": "https://en.wikipedia.org/wiki/Stanford%E2%80%93Binet_Intelligence_Scales" },
      { "@type": "Thing", "name": "Raven's Progressive Matrices", "sameAs": "https://en.wikipedia.org/wiki/Raven%27s_Progressive_Matrices" }
    ],
    citation: [
      "https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale",
      "https://en.wikipedia.org/wiki/Stanford%E2%80%93Binet_Intelligence_Scales"
    ]
  },
  h1: 'Types of IQ Tests: WAIS, Stanford-Binet and Modern Scales',
  answerBlock: 'Intelligence tests vary widely in their target age groups, administration methods, and specific cognitive domains measured. The primary clinical batteries are the Wechsler Adult Intelligence Scale (WAIS-IV), the Stanford-Binet 5 (SB5), and Raven\'s Progressive Matrices, alongside non-clinical online self-insight assessments.',
  bodyHtml: `
    <h2>Overview of major clinical intelligence instruments</h2>
    <p>Psychologists use distinct psychometric instruments depending on the subject's age, language background, and clinical evaluation requirements. Below is a comprehensive comparison of the most widely recognized clinical and cognitive assessments:</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>Test Name</th>
          <th>Target Age</th>
          <th>Administration Mode</th>
          <th>Primary Scales Measured</th>
          <th>Standard Deviation</th>
          <th>Primary Clinical Use</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>WAIS-IV</strong> (Wechsler Adult)</td>
          <td>Ages 16 – 90</td>
          <td>1-on-1 Proctored (60–90 min)</td>
          <td>Verbal Comprehension, Perceptual Reasoning, Working Memory, Processing Speed</td>
          <td>SD 15</td>
          <td>Gold-standard adult clinical & neuropsychological assessment</td>
        </tr>
        <tr>
          <td><strong>WISC-V</strong> (Wechsler Children)</td>
          <td>Ages 6 – 16</td>
          <td>1-on-1 Proctored (45–65 min)</td>
          <td>Verbal, Visual-Spatial, Fluid Reasoning, Working Memory, Processing Speed</td>
          <td>SD 15</td>
          <td>Educational placement & learning disability diagnostics</td>
        </tr>
        <tr>
          <td><strong>Stanford-Binet 5</strong> (SB5)</td>
          <td>Ages 2 – 85+</td>
          <td>1-on-1 Proctored (45–75 min)</td>
          <td>Fluid Reasoning, Knowledge, Quantitative Reasoning, Visual-Spatial, Working Memory</td>
          <td>SD 15</td>
          <td>Assessment of giftedness, cognitive delay, and developmental tracking</td>
        </tr>
        <tr>
          <td><strong>Raven's Progressive Matrices</strong></td>
          <td>Ages 5 – Adult</td>
          <td>Individual or Group (45 min)</td>
          <td>Pure Nonverbal Fluid Reasoning (Gf) via 3x3 geometric matrices</td>
          <td>SD 15</td>
          <td>Cross-cultural evaluation & nonverbal intelligence measurement</td>
        </tr>
        <tr>
          <td><strong>CAT4</strong> (Cognitive Abilities Test)</td>
          <td>Ages 6 – 17</td>
          <td>School Group Testing</td>
          <td>Verbal, Nonverbal, Quantitative, Spatial Reasoning</td>
          <td>Standard Age Scores</td>
          <td>UK and international school academic benchmarking</td>
        </tr>
        <tr>
          <td><strong>Online Cognitive Quiz</strong> (IQ Test)</td>
          <td>Adults (18+)</td>
          <td>Self-Administered (5 min)</td>
          <td>Numeric, Verbal, Logic, and Pattern Recognition Domains</td>
          <td>SD 15 (Index Scale)</td>
          <td>Self-insight, reasoning profile reflection & entertainment</td>
        </tr>
      </tbody>
    </table>

    <h2>Individual vs. group intelligence tests</h2>
    <p>Intelligence tests are broadly categorized by how they are administered:</p>
    <ul>
      <li><strong>Individual Proctored Tests:</strong> Administered face-to-face by a qualified clinical psychologist. The examiner observes problem-solving strategies, fatigue, emotional frustration, and physical dexterity.</li>
      <li><strong>Group-Administered Tests:</strong> Paper-and-pencil or computer-based exams (such as the Wonderlic or CAT4) used for military classification, corporate recruitment, or school placement.</li>
      <li><strong>Self-Administered Online Assessments:</strong> Rapid interactive evaluations designed for personal reflection and baseline estimation.</li>
    </ul>

    <h2>Language-dependent vs. culture-fair nonverbal tests</h2>
    <p>Another crucial psychometric distinction is the degree of linguistic loading:</p>
    <ol>
      <li><strong>Verbal-Heavy Tests:</strong> Subtests assessing vocabulary definitions, conceptual similarities, and cultural knowledge inherently favor native speakers with formal education.</li>
      <li><strong>Culture-Fair / Nonverbal Tests:</strong> Assessments using abstract geometric patterns (such as <a href="/cognitive-skills/pattern-recognition">matrix reasoning</a>) minimize linguistic and cultural biases, providing an accurate evaluation of fluid cognitive capacity across diverse backgrounds.</li>
    </ol>

    <h2>Explore related cognitive resources</h2>
    <p>To learn more about how test scores translate into population percentiles, explore our <a href="/iq-scores/iq-scale-chart">IQ scale chart</a>, read about <a href="/are-online-iq-tests-accurate">online test accuracy</a>, or check our <a href="/what-is-an-iq-test">history of IQ testing</a>.</p>
  `,
  faqs: [
    {
      q: "Which IQ test is considered the most accurate for adults?",
      a: "The Wechsler Adult Intelligence Scale (WAIS-IV) is widely regarded by neuropsychologists as the clinical gold standard for adult assessment."
    },
    {
      q: "What is the difference between WAIS-IV and Stanford-Binet?",
      a: "Both are premier clinical batteries; WAIS-IV is specialized for adolescents and adults, while Stanford-Binet 5 spans from age 2 to 85+ and evaluates nonverbal and verbal factors across 5 cognitive domains."
    },
    {
      q: "How does our online test differ from clinical batteries?",
      a: "Our test is a short, 16-question self-insight tool calibrated on the 85–145 scale for personal reflection, not a diagnostic clinical evaluation."
    }
  ]
});

// T4.17 — /editorial-standards
buildHtmlPage({
  relPath: 'editorial-standards.html',
  title: 'Editorial Standards & Review Policy | IQ Test',
  description: 'Our editorial standards: content authorship, psychometric source verification, correction policy, and our explicit commitment to non-clinical transparency.',
  canonical: 'https://iq-test.icu/editorial-standards',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Editorial Standards' }
  ],
  article: {
    headline: 'Editorial Standards, Content Integrity and Psychometric Transparency',
    about: [
      { "@type": "Thing", "name": "Editorial policy", "sameAs": "https://en.wikipedia.org/wiki/Editorial_policy" }
    ]
  },
  h1: 'Editorial Standards and Psychometric Principles',
  answerBlock: 'IQ Test is committed to rigorous factual integrity, psychometric accuracy, and complete consumer transparency. Every guide on this property is grounded in established cognitive science, cites peer-reviewed research, and upholds our explicit position that online self-insight quizzes are not clinical diagnostic instruments.',
  bodyHtml: `
    <h2>Our core editorial commitments</h2>
    <p>At IQ Test (published by <strong><a href="https://apexbusiness.systems">APEX Business Systems Ltd.</a></strong> in Edmonton, Alberta), we believe cognitive tools should be informative, engaging, and ruthlessly honest about their capabilities and limitations.</p>

    <h2>1. Psychometric accuracy and evidence-based content</h2>
    <p>All explanations of score distributions, standard deviations, and cognitive domains adhere strictly to published psychometric literature, including:</p>
    <ul>
      <li>The Cattell–Horn–Carroll (CHC) theory of cognitive abilities.</li>
      <li>Standard deviation-15 Gaussian normal distribution models.</li>
      <li>Published historical research on intelligence testing (Binet, Terman, Wechsler, Cox, Flynn).</li>
    </ul>

    <h2>2. Complete non-clinical transparency</h2>
    <p>We maintain an absolute legal and ethical boundary: <strong>this property does not provide clinical, psychological, or medical diagnoses.</strong> We will never:</p>
    <ul>
      <li>Claim that an online quiz score can diagnose cognitive impairments or ADHD.</li>
      <li>Advertise our assessment as an official clinical evaluation.</li>
      <li>Conflate self-reflection quiz scores with supervised clinical psychologist evaluations.</li>
    </ul>

    <h2>3. Zero fabrication and historical honesty</h2>
    <p>When presenting historical figures, we state plainly that no modern IQ test records exist for figures like Einstein, Newton, or Da Vinci. All historical figures are discussed through the lens of their documented problem-solving styles, not fictitious numbers presented as clinical fact.</p>

    <h2>4. Pricing transparency and anti-subscription guarantee</h2>
    <p>We reject deceptive subscription billing. Our business model is straightforward:</p>
    <ul>
      <li>Free cognitive index score and percentile shown immediately on completion.</li>
      <li>Optional detailed reports available for flat, one-time fees ($1.99 to $6.99).</li>
      <li>Zero hidden recurring charges or subscription traps.</li>
    </ul>

    <h2>5. Corrections and editorial inquiries</h2>
    <p>If you identify an error, broken citation, or factual inaccuracy in any of our technical guides, please contact our editorial team directly at <a href="mailto:support@iq-test.icu">support@iq-test.icu</a>. Corrections are reviewed and updated promptly.</p>
  `,
  faqs: [
    {
      q: "Who reviews content published on IQ Test?",
      a: "Content is authored and reviewed by the technical and editorial team at APEX Business Systems Ltd., referencing peer-reviewed psychometric literature."
    },
    {
      q: "How often is content updated?",
      a: "Articles are reviewed annually or whenever major updates to psychometric test editions (e.g. WAIS or Stanford-Binet revisions) are published."
    }
  ]
});

// Utility: /contact
buildHtmlPage({
  relPath: 'contact.html',
  title: 'Contact Us | IQ Test Support & Billing',
  description: 'Get in touch with the IQ Test team at APEX Business Systems Ltd. for customer support, billing questions, data inquiries, or technical feedback.',
  canonical: 'https://iq-test.icu/contact',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Contact' }
  ],
  h1: 'Contact IQ Test',
  answerBlock: 'Have a question about your cognitive report, a payment query, or feedback on our assessment? Our customer support and billing team is here to help.',
  bodyHtml: `
    <h2>How to reach our team</h2>
    <p>IQ Test is operated by <strong><a href="https://apexbusiness.systems">APEX Business Systems Ltd.</a></strong> based in Edmonton, Alberta, Canada. We respond to all customer inquiries within 24 business hours.</p>

    <div class="company-block" style="text-align:left;">
      <h3 style="margin-top:0; color:var(--gold);">APEX Business Systems Ltd.</h3>
      <p style="margin-bottom:12px;">Edmonton, AB, Canada</p>
      
      <p><strong>Customer Support & Report Delivery:</strong><br>
      <a href="mailto:support@iq-test.icu">support@iq-test.icu</a></p>
      
      <p><strong>Billing & Stripe Inquiries:</strong><br>
      <a href="mailto:billing@iq-test.icu">billing@iq-test.icu</a></p>
      
      <p><strong>Privacy & Data Compliance:</strong><br>
      <a href="mailto:privacy@iq-test.icu">privacy@iq-test.icu</a></p>
    </div>

    <h2>Common support topics</h2>
    <p>Before emailing, you may find instant answers on our dedicated pages:</p>
    <ul>
      <li><a href="/support">Support & Report Lookup FAQ</a> — Missing report retrieval and common questions.</li>
      <li><a href="/methodology">Scoring Methodology</a> — Technical explanation of the 85–145 index scale.</li>
      <li><a href="/privacy">Privacy Policy</a> — How we handle session data and Stripe transactions.</li>
    </ul>
  `
});

// Utility: /terms
buildHtmlPage({
  relPath: 'terms.html',
  title: 'Terms of Service | IQ Test (APEX Business Systems)',
  description: 'Read the terms of service for IQ Test. Understand user agreements, one-time payment policies, refund terms, and non-clinical entertainment disclaimers.',
  canonical: 'https://iq-test.icu/terms',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Terms of Service' }
  ],
  h1: 'Terms of Service',
  answerBlock: 'These Terms of Service govern your use of the IQ Test cognitive assessment website operated by APEX Business Systems Ltd. By taking the quiz or purchasing a report, you agree to these transparent terms.',
  bodyHtml: `
    <h2>1. Nature of the service</h2>
    <p>IQ Test is a digital cognitive self-insight and entertainment assessment. <strong>It is not a clinical, medical, psychiatric, or diagnostic evaluation.</strong> Scores are provided for personal curiosity and self-reflection only and must not be used for employment placement, educational diagnostics, or clinical decisions.</p>

    <h2>2. Purchases and pricing</h2>
    <p>All report upgrades on this website are one-time payments processed securely via Stripe. We do not operate recurring subscriptions or automatic renewal charges. Prices are clearly displayed before payment ($1.99 for Score Report, $3.99 for Deep Report, $6.99 for Complete Report).</p>

    <h2>3. Report delivery and refunds</h2>
    <p>Purchased reports are displayed on-screen immediately upon transaction confirmation and delivered via automated email. If you experience technical difficulties receiving your report, please email <a href="mailto:billing@iq-test.icu">billing@iq-test.icu</a> with your checkout email address for prompt delivery or a full refund.</p>

    <h2>4. Intellectual property</h2>
    <p>All assessment items, scoring algorithms, custom graphics, and written content on this website are the intellectual property of APEX Business Systems Ltd. Unauthorized scraping, reproduction, or distribution is strictly prohibited.</p>

    <h2>5. Governing law</h2>
    <p>These terms are governed by the laws of the Province of Alberta and the federal laws of Canada applicable therein.</p>
  `
});

console.log('Trust & Utility pages generation complete.');
