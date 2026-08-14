/**
 * Existing Pages Upgrade Generator
 * S4: T3.1 – T3.8
 */

const fs = require('fs');
const path = require('path');
const { buildHtmlPage, buildJsonLdGraph, publicDir } = require('./build-seo');

// ── T3.2: /free-iq-test-online ────────────────────────────────────────────────
buildHtmlPage({
  relPath: 'free-iq-test-online.html',
  title: 'Free IQ Test Online: How They Work & What to Trust | IQ Test',
  description: 'How do free online IQ tests actually work? Compare scoring methods, calibration, and the warning signs that separate a real assessment from a paywall.',
  canonical: 'https://iq-test.icu/free-iq-test-online',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Free IQ Test Online' }
  ],
  article: {
    headline: 'Free IQ Tests Online: How They Work and How to Judge One',
    about: [
      { "@type": "Thing", "name": "Intelligence quotient", "sameAs": "https://en.wikipedia.org/wiki/Intelligence_quotient" },
      { "@type": "Thing", "name": "Psychometrics", "sameAs": "https://en.wikipedia.org/wiki/Psychometrics" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Intelligence_quotient"]
  },
  h1: 'Free IQ Tests Online: How They Work and How to Judge One',
  answerBlock: 'Free online IQ tests range from rigorous self-insight tools to deceptive paywalled quizzes. A trustworthy online test states its scoring methodology openly, calibrates raw scores on a standard mean-100 / SD-15 scale, displays baseline results without forced signups, and never claims clinical diagnostic validity.',
  bodyHtml: `
    <h2>How online IQ scores are calibrated</h2>
    <p>When you take a test online, your raw point total (for example, 13 out of 16 correct items) must be converted into a meaningful number. Legitimate cognitive platforms achieve this by mapping raw scores to a Gaussian normal distribution with a mean of 100 and a standard deviation of 15.</p>
    <p>On a calibrated test, a median performance maps to 100 (50th percentile), an above-average performance of 115 lands at the 84th percentile, and top-tier performance of 130 reaches the 98th percentile. Without psychometric calibration, numbers displayed on online tests are completely arbitrary.</p>

    <h2>Free score vs. paid report: what should be behind a paywall?</h2>
    <p>Many online test seekers feel frustrated when a test advertises itself as "free" only to demand payment after 20 minutes of effort. Here is the ethical standard that separates honest cognitive tools from deceptive traps:</p>
    <ul>
      <li><strong>What SHOULD be free:</strong> Your overall cognitive index score, your broad percentile placement, and your performance category. If a site promises a free score, that score must be shown on-screen immediately upon completion.</li>
      <li><strong>What is reasonable to pay for:</strong> Deep item-by-item analysis, cognitive domain sub-scores (verbal, numerical, spatial, logical), tailored reasoning pattern breakdowns, and comparative historical figure profiles.</li>
    </ul>

    <h2>Seven warning signs of a low-quality IQ test site</h2>
    <p>When evaluating free online tests, be aware of these common deceptive industry patterns:</p>
    <ol>
      <li><strong>Automatic Hidden Subscription Traps:</strong> Sites that advertise a "$0.99 trial score" but secretly enroll your credit card into a recurring $39.99 monthly subscription.</li>
      <li><strong>Score Flattery & Artificial Inflation:</strong> Quizzes where 90% of test takers are told their IQ is 135 or higher to encourage social media bragging and certificate sales.</li>
      <li><strong>False Clinical Claims:</strong> Websites claiming their 10-minute online quiz is an "official diagnostic test certified for Mensa or job placement."</li>
      <li><strong>Overly Simplistic Trick Riddles:</strong> Items that rely on word puns or cultural trivia rather than standardized nonverbal matrix transformations.</li>
      <li><strong>No Methodology or Psychometric Documentation:</strong> Sites that offer zero explanation of their scoring distribution, standard deviation, or references.</li>
      <li><strong>Anonymous Operating Entity:</strong> Websites with no corporate ownership, physical location, or reachable support email.</li>
      <li><strong>Forced Contact Capture Before Score Display:</strong> Requiring phone numbers or extensive personal information before revealing baseline results.</li>
    </ol>

    <h2>How IQ Test compares to typical online testing sites</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Dimension</th>
          <th>Typical Online Quiz</th>
          <th>IQ Test (This Property)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Baseline Result Access</td>
          <td>Often locked behind sudden paywall</td>
          <td>100% free score and percentile on completion screen</td>
        </tr>
        <tr>
          <td>Billing Terms</td>
          <td>Recurring monthly subscriptions ($29–$49/mo)</td>
          <td>Transparent one-time flat purchases ($1.99–$6.99) — zero subscriptions</td>
        </tr>
        <tr>
          <td>Clinical Transparency</td>
          <td>Vague or inflated clinical claims</td>
          <td>Explicitly states test is for self-insight and reflection only</td>
        </tr>
        <tr>
          <td>Reasoning Domain Breakdown</td>
          <td>Generic aggregate number</td>
          <td>Detailed breakdown across 4 specific cognitive domains</td>
        </tr>
      </tbody>
    </table>

    <h2>Explore more on testing standards</h2>
    <p>To understand the science behind intelligence assessment, read our comprehensive overview of <a href="/what-is-an-iq-test">what is an IQ test</a>, explore <a href="/are-online-iq-tests-accurate">whether online tests are accurate</a>, or check our detailed <a href="/methodology">scoring methodology</a>.</p>
  `,
  faqs: [
    {
      q: "Is the IQ score on this website completely free to see?",
      a: "Yes. Your cognitive index score and percentile ranking are shown immediately on-screen after the final question without requiring any payment."
    },
    {
      q: "Do you charge recurring subscription fees?",
      a: "No. All optional detailed reports are strictly one-time purchases with zero recurring charges."
    },
    {
      q: "Can I prepare for an online cognitive quiz?",
      a: "Familiarizing yourself with matrix puzzles and logic sequences can help you navigate test formats with greater confidence."
    }
  ]
});

// ── T3.3: /what-is-an-iq-test ─────────────────────────────────────────────────
buildHtmlPage({
  relPath: 'what-is-an-iq-test.html',
  title: 'What Is an IQ Test? Meaning, History & Types | IQ Test',
  description: 'An IQ test is a standardised measure of reasoning ability scored against a population mean of 100. Here is what it measures, how it is scaled, and its limits.',
  canonical: 'https://iq-test.icu/what-is-an-iq-test',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'What is an IQ Test?' }
  ],
  article: {
    headline: 'What is an IQ Test? Meaning, History, Psychometrics and Scale Standards',
    about: [
      { "@type": "Thing", "name": "Intelligence quotient", "sameAs": "https://en.wikipedia.org/wiki/Intelligence_quotient" },
      { "@type": "Thing", "name": "Alfred Binet", "sameAs": "https://en.wikipedia.org/wiki/Alfred_Binet" },
      { "@type": "Thing", "name": "David Wechsler", "sameAs": "https://en.wikipedia.org/wiki/David_Wechsler" },
      { "@type": "Thing", "name": "Charles Spearman", "sameAs": "https://en.wikipedia.org/wiki/Charles_Spearman" },
      { "@type": "Thing", "name": "g factor (psychometrics)", "sameAs": "https://en.wikipedia.org/wiki/G_factor_(psychometrics)" },
      { "@type": "Thing", "name": "Flynn effect", "sameAs": "https://en.wikipedia.org/wiki/Flynn_effect" },
      { "@type": "Thing", "name": "Raven's Progressive Matrices", "sameAs": "https://en.wikipedia.org/wiki/Raven%27s_Progressive_Matrices" }
    ],
    citation: [
      "https://en.wikipedia.org/wiki/Intelligence_quotient",
      "https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale",
      "https://en.wikipedia.org/wiki/Stanford%E2%80%93Binet_Intelligence_Scales"
    ]
  },
  h1: 'What is an IQ Test? History, Psychometrics and Meaning',
  answerBlock: 'An IQ (intelligence quotient) test is a standardized psychological assessment designed to measure human reasoning efficiency, working memory, spatial processing, and abstract problem-solving ability relative to a normative population sample calibrated to a mean of 100 and a standard deviation of 15.',
  bodyHtml: `
    <h2>The foundational definition of an intelligence quotient</h2>
    <p>An intelligence quotient (IQ) is not an absolute measure of total brain capacity or human worth. In contemporary psychometrics, it is a <strong>standardised deviation score</strong> indicating where an individual's cognitive performance ranks relative to a representative sample of age peers.</p>
    <p>Modern cognitive psychology views intelligence through the lens of the <strong>Cattell–Horn–Carroll (CHC) theory</strong>, which recognizes general intelligence (the <em>g factor</em>, first identified by Charles Spearman in 1904) as an overarching construct supported by broad cognitive domains including fluid reasoning (<em>Gf</em>), crystallised intelligence (<em>Gc</em>), working memory (<em>Gwm</em>), and visual processing (<em>Gv</em>).</p>

    <h2>A short history of intelligence testing (1905 to modern era)</h2>
    <ol>
      <li><strong>Alfred Binet & Théodore Simon (1905):</strong> Commissioned by the French Ministry of Education to identify school children needing academic support, Binet and Simon developed the first practical intelligence scale. They introduced the concept of "mental age."</li>
      <li><strong>Lewis Terman & The Stanford–Binet Scale (1916):</strong> Stanford psychologist Lewis Terman adapted Binet's test for American subjects, establishing the Stanford–Binet Intelligence Scale and popularising the "ratio IQ" formula (Mental Age / Chronological Age × 100) formulated by William Stern.</li>
      <li><strong>David Wechsler & Deviation IQ (1939):</strong> Recognizing that ratio IQ was mathematically invalid for adults, David Wechsler introduced the Wechsler–Bellevue scale (precursor to the WAIS-IV and WISC-V). Wechsler replaced mental age with the statistical <strong>deviation IQ</strong>, anchoring the population mean at 100 with a standard deviation of 15.</li>
      <li><strong>John C. Raven & Progressive Matrices (1936):</strong> Raven developed nonverbal matrix tests to assess pure fluid intelligence across diverse cultures without linguistic barriers.</li>
      <li><strong>Cattell–Horn–Carroll Integration (1990s–Present):</strong> Contemporary psychometrics unified Raymond Cattell and John Horn's fluid/crystallized model with John Carroll's three-stratum hierarchy into the CHC framework, which underpins all modern clinical test revisions.</li>
    </ol>

    <h2>How IQ scores are scaled on the normal distribution</h2>
    <p>All major modern clinical intelligence tests calibrate scores to follow a Gaussian normal distribution curve:</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Standard Deviation (z-Score)</th>
          <th>IQ Score (SD 15)</th>
          <th>Percentile Placement</th>
          <th>Population Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>+3.00 SD</td>
          <td>145</td>
          <td>99.87th percentile</td>
          <td>Extremely high / highly gifted (top 0.1%)</td>
        </tr>
        <tr>
          <td>+2.00 SD</td>
          <td>130</td>
          <td>97.72nd percentile</td>
          <td>Very superior / Mensa qualifying threshold (top 2.3%)</td>
        </tr>
        <tr>
          <td>+1.00 SD</td>
          <td>115</td>
          <td>84.13th percentile</td>
          <td>High average range (top 16%)</td>
        </tr>
        <tr>
          <td>0.00 SD (Mean)</td>
          <td>100</td>
          <td>50.00th percentile</td>
          <td>Exact population average / median</td>
        </tr>
        <tr>
          <td>-1.00 SD</td>
          <td>85</td>
          <td>15.87th percentile</td>
          <td>Low average threshold</td>
        </tr>
        <tr>
          <td>-2.00 SD</td>
          <td>70</td>
          <td>2.28th percentile</td>
          <td>Borderline / clinical evaluation benchmark</td>
        </tr>
      </tbody>
    </table>

    <h2>The Flynn effect: why scores drift over generations</h2>
    <p>In 1987, researcher James Flynn documented that raw performance on intelligence tests increased worldwide at approximately 3 IQ points per decade throughout the 20th century. This phenomenon, known as the <strong>Flynn effect</strong>, was most pronounced on tests of abstract fluid reasoning (like matrix puzzles) rather than arithmetic or vocabulary.</p>
    <p>Because cognitive familiarity with visual symbols and formal schooling expanded over generations, test publishers must continuously re-standardise intelligence batteries with fresh normative samples every decade to ensure that an IQ of 100 always represents contemporary average performance.</p>

    <h2>What an IQ test measures vs. what it does not</h2>
    <p>Understanding the boundaries of psychometric testing is essential for maintaining scientific perspective:</p>
    <ul>
      <li><strong>What it measures:</strong> Abstract pattern deduction, working memory capacity, verbal comprehension speed, and quantitative logic.</li>
      <li><strong>What it does NOT measure:</strong> Creativity, emotional intelligence (EQ), moral character, grit, practical common sense, domain-specific wisdom, or career success.</li>
    </ul>

    <h2>Explore more on cognitive testing</h2>
    <p>To learn more about cognitive assessment categories, explore our guides to <a href="/cognitive-skills/pattern-recognition">pattern recognition</a>, <a href="/cognitive-skills/logical-reasoning">logical reasoning</a>, <a href="/iq-scores/what-is-a-good-iq-score">what is a good IQ score</a>, or compare <a href="/cognitive-test-vs-iq-test">cognitive tests vs. IQ tests</a>.</p>
  `,
  faqs: [
    {
      q: "Who invented the first IQ test?",
      a: "Alfred Binet and Théodore Simon created the first practical intelligence scale in France in 1905 to identify children needing academic assistance."
    },
    {
      q: "What does an IQ of 100 mean?",
      a: "An IQ of 100 represents the exact statistical median and average of the general population on a standardized bell curve."
    },
    {
      q: "Can you fail an IQ test?",
      a: "No. An IQ test is a measurement of relative performance, not a pass/fail exam."
    }
  ]
});



// ── T3.5: /cognitive-test-vs-iq-test ─────────────────────────────────────────
buildHtmlPage({
  relPath: 'cognitive-test-vs-iq-test.html',
  title: "Cognitive Test vs IQ Test: What's the Difference? | IQ Test",
  description: "Understand the difference between online cognitive tests and clinical IQ tests: what each measures, how they are scored, and when to use them.",
  canonical: 'https://iq-test.icu/cognitive-test-vs-iq-test',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Cognitive Test vs IQ Test' }
  ],
  article: {
    headline: "Cognitive Test vs. IQ Test: Comprehensive Differences and Comparisons",
    about: [
      { "@type": "Thing", "name": "Cognitive assessment", "sameAs": "https://en.wikipedia.org/wiki/Cognitive_assessment" },
      { "@type": "Thing", "name": "Intelligence quotient", "sameAs": "https://en.wikipedia.org/wiki/Intelligence_quotient" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Psychometrics"]
  },
  h1: "Cognitive Test vs. IQ Test: Key Differences Explained",
  answerBlock: "A clinical IQ test is a comprehensive, proctored psychological battery (such as the WAIS-IV) administered to measure general intelligence (g) for diagnostic, legal, or placement purposes. A cognitive test is a targeted assessment of specific reasoning functions — such as working memory, pattern logic, or processing speed — used for personal self-insight, skills training, or clinical screening.",
  bodyHtml: `
    <h2>Comparing cognitive tests and clinical IQ assessments</h2>
    <p>While the terms "cognitive test" and "IQ test" are often used interchangeably in everyday conversation, they serve distinct functions in psychology and psychometrics. The comparison table below highlights their key operational differences:</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>Evaluation Dimension</th>
          <th>Clinical IQ Test (e.g. WAIS-IV)</th>
          <th>Online Cognitive Skills Assessment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Primary Objective</strong></td>
          <td>Diagnostic evaluation, cognitive deficit assessment, Mensa qualification</td>
          <td>Personal self-reflection, baseline problem-solving profile, entertainment</td>
        </tr>
        <tr>
          <td><strong>Administration Mode</strong></td>
          <td>One-on-one proctored by a licensed clinical psychologist</td>
          <td>Self-administered via web browser</td>
        </tr>
        <tr>
          <td><strong>Testing Duration</strong></td>
          <td>60 to 120 minutes of multi-battery evaluation</td>
          <td>5 to 15 minutes of focused puzzle solving</td>
        </tr>
        <tr>
          <td><strong>Subtest Breadth</strong></td>
          <td>10–15 subtests (oral vocabulary, block design, digit span, matrix reasoning)</td>
          <td>4 core domains (numerical, verbal, logical, pattern recognition)</td>
        </tr>
        <tr>
          <td><strong>Scoring Benchmark</strong></td>
          <td>Normed against thousands of demographically matched clinical subjects</td>
          <td>Calibrated on the 85–145 index scale based on the normal distribution</td>
        </tr>
        <tr>
          <td><strong>Legal & Medical Standing</strong></td>
          <td>Legally recognized clinical document</td>
          <td>Informational self-insight only; non-diagnostic</td>
        </tr>
      </tbody>
    </table>

    <h2>When to seek a formal clinical IQ test</h2>
    <p>A formal, supervised clinical assessment from a licensed psychologist is required when you need:</p>
    <ul>
      <li>Diagnostic assessment for neurodevelopmental conditions (ADHD, learning differences).</li>
      <li>Official documentation for school gifted-and-talented placement or disability accommodations.</li>
      <li>Formal qualification for high-IQ societies like Mensa.</li>
      <li>Neuropsychological evaluations following head trauma or cognitive changes.</li>
    </ul>

    <h2>When an online cognitive skills test is ideal</h2>
    <p>An online cognitive skills assessment is the ideal tool when you want:</p>
    <ul>
      <li>A rapid, engaging look at how your brain approaches novel problem solving.</li>
      <li>To discover your relative balance across spatial, numerical, verbal, and logical domains.</li>
      <li>To understand whether your thinking profile aligns with historical innovators like Da Vinci or Newton.</li>
      <li>A fun, intellectually stimulating mental challenge without high clinical testing fees.</li>
    </ul>

    <h2>Explore related resources</h2>
    <p>To learn more about cognitive science, explore our guides on <a href="/what-is-an-iq-test">what is an IQ test</a>, <a href="/types-of-iq-tests">types of IQ tests</a>, and <a href="/are-online-iq-tests-accurate">whether online IQ tests are accurate</a>.</p>
  `,
  faqs: [
    {
      q: "Is a cognitive test the exact same thing as an IQ test?",
      a: "Not necessarily. An IQ test is a specific comprehensive battery measuring general intelligence (g), while cognitive tests can evaluate specific isolated functions like working memory or spatial logic."
    },
    {
      q: "Can an online cognitive test diagnose cognitive conditions?",
      a: "No. Diagnostic evaluations require in-person proctored testing by a licensed psychologist."
    }
  ]
});

// ── T3.6: /methodology ────────────────────────────────────────────────────────
buildHtmlPage({
  relPath: 'methodology.html',
  title: 'Methodology: How We Score the IQ Test | IQ Test',
  description: 'Learn how the IQ Test cognitive score is calculated, mapped to the 85-145 scale, calibrated against the normal distribution, and matched to historical minds.',
  canonical: 'https://iq-test.icu/methodology',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Methodology' }
  ],
  article: {
    headline: 'Methodology & Technical Notes: Scoring Calibration and Historical Profile Matching',
    about: [
      { "@type": "Thing", "name": "Psychometrics", "sameAs": "https://en.wikipedia.org/wiki/Psychometrics" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Intelligence_quotient"]
  },
  h1: 'Methodology & Technical Notes',
  answerBlock: 'Our 16-question cognitive assessment evaluates four core reasoning domains: numerical patterns, verbal analogies, logical deduction, and spatial matrix reasoning. Raw scores are calibrated to the familiar 85–145 cognitive index scale modeled on the standard mean-100 / SD-15 Gaussian distribution.',
  bodyHtml: `
    <h2>The four cognitive categories measured</h2>
    <p>Our assessment presents 16 evenly weighted puzzle items across four distinct reasoning categories:</p>
    <ol>
      <li><a href="/cognitive-skills/numerical-reasoning">Numerical Reasoning</a> (4 items): Sequence progression, arithmetic rule detection, and quantitative relationships.</li>
      <li><a href="/cognitive-skills/verbal-reasoning">Verbal Reasoning</a> (4 items): Conceptual analogies, semantic odd-one-out, and linguistic deduction.</li>
      <li><a href="/cognitive-skills/logical-reasoning">Logical Reasoning</a> (4 items): Formal deductive syllogisms, conditional rule sets, and contradiction elimination.</li>
      <li><a href="/cognitive-skills/pattern-recognition">Pattern Recognition</a> (4 items): Visual-spatial matrix transformations, rotational symmetry, and nonverbal fluid logic.</li>
    </ol>

    <h2>Raw score to cognitive index mapping</h2>
    <p>Raw point scores (0 to 16 correct) are converted into a scaled cognitive index on the familiar 85–145 scale using standard normal distribution modeling:</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Raw Score (out of 16)</th>
          <th>Cognitive Index</th>
          <th>Percentile Placement</th>
          <th>Classification</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>16 / 16</td>
          <td>142 – 145</td>
          <td>99th percentile</td>
          <td>Extremely Superior</td>
        </tr>
        <tr>
          <td>14 – 15 / 16</td>
          <td>130 – 138</td>
          <td>98th percentile</td>
          <td>Very Superior</td>
        </tr>
        <tr>
          <td>12 – 13 / 16</td>
          <td>120 – 128</td>
          <td>91st – 97th percentile</td>
          <td>Superior</td>
        </tr>
        <tr>
          <td>10 – 11 / 16</td>
          <td>110 – 118</td>
          <td>75th – 88th percentile</td>
          <td>High Average</td>
        </tr>
        <tr>
          <td>8 – 9 / 16</td>
          <td>100 – 106</td>
          <td>50th – 66th percentile</td>
          <td>Average (Median)</td>
        </tr>
        <tr>
          <td>6 – 7 / 16</td>
          <td>90 – 96</td>
          <td>25th – 40th percentile</td>
          <td>Average</td>
        </tr>
        <tr>
          <td>4 – 5 / 16</td>
          <td>85 – 88</td>
          <td>16th – 21st percentile</td>
          <td>Low Average</td>
        </tr>
      </tbody>
    </table>

    <h2>How historical figure matching operates</h2>
    <p>When a user purchases the Detailed or Deep Report, the system evaluates their sub-score distribution across the four categories. The system matches the user's highest relative domain to historical figures whose documented methods relied primarily on those cognitive faculties (e.g. Leonardo da Vinci for pattern recognition, Isaac Newton for deductive logic, Marie Curie for empirical perseverance, and Nikola Tesla for internal spatial simulation).</p>

    <h2>Explicit limitations and transparency</h2>
    <p>We maintain full transparency regarding the scope of this test:</p>
    <ul>
      <li><strong>Non-Clinical Status:</strong> This test is not a diagnostic medical or psychological instrument.</li>
      <li><strong>Score Precision:</strong> Online baseline assessments provide personal self-insight but cannot replace a comprehensive 2-hour clinical examination by a licensed psychologist.</li>
    </ul>

    <h2>References & Psychometric Foundation</h2>
    <ul>
      <li>Wechsler, D. (2008). <em>Wechsler Adult Intelligence Scale – Fourth Edition (WAIS-IV)</em>. Pearson.</li>
      <li>Raven, J. C. (1938). <em>Progressive Matrices: A Perceptual Test of Intelligence</em>. H. K. Lewis & Co.</li>
      <li>Cox, C. M. (1926). <em>The Early Mental Traits of Three Hundred Geniuses</em>. Stanford University Press.</li>
      <li>Flynn, J. R. (1987). <em>Massive IQ gains in 14 nations: What IQ tests really measure</em>. Psychological Bulletin, 101(2), 171–191.</li>
    </ul>
  `,
  faqs: [
    {
      q: "How is the 85-145 scale calibrated?",
      a: "It is calibrated to mirror the standard mean-100 / SD-15 distribution used by major psychometric intelligence scales."
    },
    {
      q: "Is my test score permanent?",
      a: "Adult cognitive rankings tend to remain relatively stable, though individual test performance can vary based on fatigue and focus."
    }
  ]
});

// ── T3.7: /about ─────────────────────────────────────────────────────────────
buildHtmlPage({
  relPath: 'about.html',
  title: 'About IQ Test — Built by APEX Business Systems | IQ Test',
  description: 'Learn about APEX Business Systems Ltd., the team behind IQ Test, our methodology, editorial standards, and our mission to build honest cognitive tools.',
  canonical: 'https://iq-test.icu/about',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'About' }
  ],
  article: {
    headline: 'About IQ Test: Built by APEX Business Systems Ltd.',
    about: [
      { "@type": "Organization", "name": "APEX Business Systems Ltd.", "sameAs": "https://apexbusiness.systems" }
    ]
  },
  h1: 'About IQ Test',
  answerBlock: 'IQ Test is an engaging, transparent cognitive self-insight tool developed by APEX Business Systems Ltd. in Edmonton, Alberta. Our mission is to provide an intellectually honest cognitive assessment that delivers instant, un-paywalled baseline scores and fascinating historical mind matching without subscription traps.',
  bodyHtml: `
    <h2>Our mission and principles</h2>
    <p>We built IQ Test because the online intelligence testing category is crowded with deceptive subscription billing traps, inflated scores, and dishonest clinical claims. We set out to create a cognitive tool that treats users with respect:</p>
    <ul>
      <li><strong>Immediate Free Results:</strong> Your baseline score and percentile appear immediately when you finish the 16 questions.</li>
      <li><strong>No Subscription Traps:</strong> Optional detailed reports are one-time, flat-fee purchases ($1.99 to $6.99). We never store credit cards for recurring charges.</li>
      <li><strong>Psychometric Honesty:</strong> We state clearly that this is an entertainment and self-reflection quiz, not a clinical diagnostic assessment.</li>
      <li><strong>Meaningful Historical Matching:</strong> We connect your cognitive balance to the documented reasoning habits of history's greatest thinkers.</li>
    </ul>

    <h2>Who builds this: APEX Business Systems Ltd.</h2>
    <p>IQ Test is developed and operated by <strong><a href="https://apexbusiness.systems">APEX Business Systems Ltd.</a></strong>, a software company based in Edmonton, Alberta, Canada. We build focused, enterprise-grade digital platforms with zero bloat and absolute transparency.</p>

    <div class="company-block" style="text-align:left;">
      <h3 style="margin-top:0; color:var(--gold);">APEX Business Systems Ltd.</h3>
      <p style="margin-bottom:12px;">Headquarters: Edmonton, AB, Canada</p>
      <p><strong>Customer Support:</strong> <a href="mailto:support@iq-test.icu">support@iq-test.icu</a><br>
      <strong>Billing Inquiries:</strong> <a href="mailto:billing@iq-test.icu">billing@iq-test.icu</a><br>
      <strong>Privacy & Data Inquiries:</strong> <a href="mailto:privacy@iq-test.icu">privacy@iq-test.icu</a></p>
    </div>

    <h2>Our editorial and psychometric standards</h2>
    <p>All content and scoring algorithms on this property are constructed in alignment with published cognitive science research, including the Cattell–Horn–Carroll (CHC) theory and standard deviation-15 Gaussian normal distribution models. For complete details on our source verification, review policies, and correction protocols, please review our <a href="/editorial-standards">Editorial Standards</a>.</p>
  `
});

// ── T3.8: /support ───────────────────────────────────────────────────────────
buildHtmlPage({
  relPath: 'support.html',
  title: 'Support & Report Retrieval | IQ Test Support',
  description: 'Need help retrieving a purchased cognitive report or have a billing question? Find instant answers and customer support from APEX Business Systems Ltd.',
  canonical: 'https://iq-test.icu/support',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Support' }
  ],
  h1: 'Customer Support & Report Retrieval',
  answerBlock: 'Need help finding your report, have a question about a Stripe transaction, or need technical assistance? Our support team at APEX Business Systems Ltd. responds to all inquiries within 24 business hours.',
  bodyHtml: `
    <h2>Missing your report?</h2>
    <p>Purchased reports are displayed on-screen immediately upon payment completion and sent via automated email to the address provided during Stripe checkout. If you haven't received your report email, please check your spam or promotions folder, or email <a href="mailto:support@iq-test.icu">support@iq-test.icu</a> with your checkout email address for instant re-delivery.</p>

    <h2>Billing and charge inquiries</h2>
    <p>All transactions on this property appear on your bank or credit card statement with a descriptor identifying APEX Business Systems / IQ Test. We do not operate subscriptions — all transactions are one-time payments. If you have any billing questions, contact <a href="mailto:billing@iq-test.icu">billing@iq-test.icu</a>.</p>

    <h2>Frequently Asked Questions</h2>
    <div class="faq-accordion">
      <div class="faq-item">
        <div class="faq-q">How long does it take for my report email to arrive?</div>
        <div class="faq-a">Reports are generated and emailed automatically within 30 to 60 seconds of payment confirmation.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Do you charge recurring monthly fees?</div>
        <div class="faq-a">No. Every report purchase on this site is a strict one-time flat fee. We do not have subscriptions.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">What if I made a typo in my checkout email address?</div>
        <div class="faq-a">Email support@iq-test.icu with your approximate time of purchase and name on the card, and we will locate and forward your report.</div>
      </div>
    </div>
  `
});

// ── T3.8: /privacy ───────────────────────────────────────────────────────────
buildHtmlPage({
  relPath: 'privacy.html',
  title: 'Privacy Policy | IQ Test (APEX Business Systems)',
  description: 'Read the IQ Test privacy policy. Understand how session data is handled, our strict no-sale-of-data pledge, Stripe encryption, and CASL compliance.',
  canonical: 'https://iq-test.icu/privacy',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'Privacy Policy' }
  ],
  h1: 'Privacy Policy',
  answerBlock: 'At IQ Test (operated by APEX Business Systems Ltd.), we respect your digital privacy. We collect only the data necessary to score your assessment and deliver optional reports. We never sell, rent, or trade your personal data with third parties.',
  bodyHtml: `
    <h2>1. Information we collect</h2>
    <ul>
      <li><strong>Assessment Responses:</strong> Raw item answers are stored temporarily in session storage to calculate your cognitive score and percentile.</li>
      <li><strong>Email Address:</strong> If you purchase a report or opt in for cognitive science updates, your email is stored securely to deliver your report.</li>
      <li><strong>Payment Data:</strong> All financial transactions are handled directly through Stripe's encrypted payment gateway. We never view or store complete credit card numbers.</li>
    </ul>

    <h2>2. How we use your information</h2>
    <p>Your information is used strictly to compute your test results, deliver purchased reports, and process one-time payments. If you explicitly opt in to receive cognitive-science articles, every email contains a direct, one-click CASL-compliant unsubscribe link.</p>

    <h2>3. Data retention and third parties</h2>
    <p>We do not share your information with advertisers, data brokers, or third-party marketers. We retain customer transaction records only as required by applicable tax and accounting laws.</p>

    <h2>4. Contact our privacy officer</h2>
    <p>For data access, correction, or deletion requests, contact our privacy officer at <a href="mailto:privacy@iq-test.icu">privacy@iq-test.icu</a>.</p>
  `
});

console.log('Existing content pages upgraded.');
