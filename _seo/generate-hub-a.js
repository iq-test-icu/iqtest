/**
 * HUB A Generator — IQ Scores, Ranges, Calibration & Interactive Calculator
 * Priority: 2 (Volume & Tool Asset)
 */

const { buildHtmlPage } = require('./build-seo');

// T4.8 — /iq-scores/what-is-a-good-iq-score
buildHtmlPage({
  relPath: 'iq-scores/what-is-a-good-iq-score.html',
  title: 'What Is a Good IQ Score? Ranges Explained | IQ Test',
  description: 'A good IQ score is generally 110 or above, placing you in the top 25 percent. Here is what every range from 70 to 145 means — and what it cannot tell you.',
  canonical: 'https://iq-test.icu/iq-scores/what-is-a-good-iq-score',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'What Is a Good IQ Score?' }
  ],
  article: {
    headline: 'What Is a Good IQ Score? Ranges and Classifications Explained',
    about: [
      { "@type": "Thing", "name": "Intelligence quotient", "sameAs": "https://en.wikipedia.org/wiki/Intelligence_quotient" },
      { "@type": "Thing", "name": "Wechsler Adult Intelligence Scale", "sameAs": "https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale" },
      { "@type": "Thing", "name": "Normal distribution", "sameAs": "https://en.wikipedia.org/wiki/Normal_distribution" }
    ],
    citation: [
      "https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale",
      "https://en.wikipedia.org/wiki/Normal_distribution"
    ]
  },
  h1: 'What Is a Good IQ Score? Ranges and Meaning Explained',
  answerBlock: 'A score of 100 is exactly average by design, because IQ scales are standardised to a mean of 100 with a standard deviation of 15. Scores from 90 to 109 are considered average, 110 to 119 high average, and 120 to 129 superior. Roughly two percent of people score 130 or above.',
  bodyHtml: `
    <h2>Understanding what an IQ number actually represents</h2>
    <p>When people ask what constitutes a "good" IQ score, they are usually asking how their cognitive performance compares to the general population. In modern psychometrics, intelligence scores are not percentage grades or absolute tallies of knowledge. Instead, they are <em>deviation scores</em> that describe an individual's relative statistical position along a standard bell curve.</p>
    <p>Every major standardised intelligence battery — including the Wechsler Adult Intelligence Scale (WAIS-IV) and Stanford–Binet Intelligence Scales (SB5) — sets the population mean to 100 with a standard deviation of 15. Because human cognitive test scores follow a normal Gaussian distribution, approximately 68% of all individuals fall within one standard deviation of the mean (between 85 and 115), and 95% fall within two standard deviations (between 70 and 130).</p>

    <h2>Standard IQ score ranges and Wechsler classifications</h2>
    <p>The table below outlines the traditional psychometric score bands established by David Wechsler, their corresponding percentile ranks, and their statistical share of the population on a standard mean-100 / SD-15 scale:</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>Score Range</th>
          <th>Wechsler Classification</th>
          <th>Approx. Percentile</th>
          <th>Share of Population</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>130 and above</strong></td>
          <td>Very Superior (Gifted)</td>
          <td>98th percentile and above</td>
          <td>~2.2%</td>
        </tr>
        <tr>
          <td><strong>120 – 129</strong></td>
          <td>Superior</td>
          <td>91st to 97th percentile</td>
          <td>~6.7%</td>
        </tr>
        <tr>
          <td><strong>110 – 119</strong></td>
          <td>High Average</td>
          <td>75th to 90th percentile</td>
          <td>~16.1%</td>
        </tr>
        <tr>
          <td><strong>90 – 109</strong></td>
          <td>Average (Normal)</td>
          <td>25th to 74th percentile</td>
          <td>~50.0%</td>
        </tr>
        <tr>
          <td><strong>80 – 89</strong></td>
          <td>Low Average</td>
          <td>9th to 24th percentile</td>
          <td>~16.1%</td>
        </tr>
        <tr>
          <td><strong>70 – 79</strong></td>
          <td>Borderline</td>
          <td>2nd to 8th percentile</td>
          <td>~6.7%</td>
        </tr>
        <tr>
          <td><strong>Below 70</strong></td>
          <td>Extremely Low</td>
          <td>Below 2nd percentile</td>
          <td>~2.2%</td>
        </tr>
      </tbody>
    </table>
    <p><em>Note: These descriptive labels originate from published Wechsler psychometric norms and the mathematical properties of the normal distribution.</em></p>

    <h2>What determines whether a score is 'good'?</h2>
    <p>From a psychometric perspective, any score within the average band (90 to 109) is completely normal and represents the cognitive capacity required to succeed in virtually all professional, academic, and daily pursuits. Scores of 110 or above (High Average and Superior) place an individual in the top quarter of the population, reflecting strong problem-solving and analytical reasoning efficiency.</p>
    <p>However, an IQ score is always contextual and depends on several critical factors:</p>
    <ol>
      <li><strong>Age Norming:</strong> Raw scores are always compared against an individual's specific age peer group. A 25-year-old and a 60-year-old who solve different numbers of items can receive the exact same IQ score of 115 because each is evaluated against their own age cohort.</li>
      <li><strong>Subtest Profile vs. Composite Score:</strong> Two people with identical Full-Scale IQ scores of 115 can have vastly different cognitive strengths. One may excel in <a href="/cognitive-skills/verbal-reasoning">verbal reasoning</a> while the other dominates in <a href="/cognitive-skills/pattern-recognition">visual pattern recognition</a>.</li>
      <li><strong>Testing Environment & Administration:</strong> Clinical evaluations take 60 to 90 minutes under strict supervision. Short online quizzes provide valuable self-reflection and baseline estimates but do not replace clinical diagnostics.</li>
    </ol>

    <h2>What an IQ score does not measure</h2>
    <p>Psychologists emphasise that an intelligence score measures specific facets of cognitive efficiency — primarily fluid reasoning, working memory, processing speed, and verbal comprehension. It does not measure:</p>
    <ul>
      <li><strong>Emotional Intelligence (EQ):</strong> Empathy, social perception, communication, and interpersonal leadership.</li>
      <li><strong>Creativity and Divergent Thinking:</strong> The ability to generate novel ideas and cross-disciplinary innovations.</li>
      <li><strong>Practical Wisdom and Domain Expertise:</strong> Years of specialised professional knowledge and practical problem solving.</li>
      <li><strong>Grit, Motivation, and Conscientiousness:</strong> Long-term persistence, which empirical research shows is often a stronger predictor of lifetime achievement than raw IQ points.</li>
    </ul>
    <p>To see how different cognitive tests are administered, read our detailed comparison of <a href="/types-of-iq-tests">types of IQ tests</a>, review our <a href="/iq-scores/iq-scale-chart">full IQ scale chart</a>, or check your score using our <a href="/iq-scores/iq-percentile-calculator">interactive IQ percentile calculator</a>.</p>
  `,
  faqs: [
    {
      q: "Is an IQ score of 115 considered good?",
      a: "Yes. An IQ of 115 falls into the 'High Average' category, placing you at the 84th percentile — higher than approximately 84% of the general population."
    },
    {
      q: "What is the average IQ score for adults?",
      a: "The average score is exactly 100 by mathematical definition, with a normal range spanning from 90 to 109 (covering 50% of the population)."
    },
    {
      q: "Can an online test give me a clinical IQ score?",
      a: "No. Online tests are self-insight tools. Clinical IQ scores require one-on-one administration by a licensed psychologist using standardized instruments like the WAIS-IV."
    }
  ]
});

// T4.9 — /iq-scores/iq-scale-chart
buildHtmlPage({
  relPath: 'iq-scores/iq-scale-chart.html',
  title: 'IQ Scale Chart: Every Score Range Explained | IQ Test',
  description: 'Explore the complete IQ scale chart from 55 to 145. Understand bell curve distributions, standard deviations, and exact score-to-percentile conversions.',
  canonical: 'https://iq-test.icu/iq-scores/iq-scale-chart',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'IQ Scale Chart' }
  ],
  article: {
    headline: 'IQ Scale Chart: Complete Score-to-Percentile Conversion and Bell Curve',
    about: [
      { "@type": "Thing", "name": "Standard score", "sameAs": "https://en.wikipedia.org/wiki/Standard_score" },
      { "@type": "Thing", "name": "Normal distribution", "sameAs": "https://en.wikipedia.org/wiki/Normal_distribution" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Intelligence_quotient"]
  },
  h1: 'IQ Scale Chart: Complete Score and Percentile Distribution',
  answerBlock: 'The IQ scale is calibrated on a standard normal bell curve with a mean of 100 and a standard deviation of 15. The middle 68% of the population scores between 85 and 115, while scores of 130 and above represent the top 2.2% (gifted range). Below is the comprehensive score-to-percentile conversion chart.',
  bodyHtml: `
    <h2>The mathematics of the IQ bell curve</h2>
    <p>Modern intelligence scales use the <em>deviation IQ</em> method, developed by David Wechsler in 1939. Prior to Wechsler, intelligence was calculated as a "ratio IQ" (mental age divided by chronological age multiplied by 100), which broke down in adulthood. Under deviation IQ, your score represents where your raw performance falls relative to the normal distribution of your age peers.</p>
    <p>Because the normal distribution is defined by standard mathematical formulas, every IQ score corresponds to an exact percentile rank. A standard deviation (SD) of 15 means:</p>
    <ul>
      <li><strong>Mean (100):</strong> Exactly 50% of the population scores above and 50% below.</li>
      <li><strong>±1 SD (85 to 115):</strong> Contains 68.26% of the population (the broad average range).</li>
      <li><strong>±2 SD (70 to 130):</strong> Contains 95.44% of the population.</li>
      <li><strong>±3 SD (55 to 145):</strong> Contains 99.74% of the population.</li>
    </ul>

    <h2>Complete IQ score-to-percentile conversion table</h2>
    <p>The table below shows the exact statistical percentile and rarity corresponding to each score in 5-point increments across the standard 55–145 scale (computed from the cumulative normal distribution function):</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>IQ Score (SD 15)</th>
          <th>Standard Deviations (z-score)</th>
          <th>Exact Percentile</th>
          <th>Rarity in Population</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>145</strong></td>
          <td>+3.00 SD</td>
          <td>99.87th percentile</td>
          <td>1 in 740 people</td>
        </tr>
        <tr>
          <td><strong>140</strong></td>
          <td>+2.67 SD</td>
          <td>99.62nd percentile</td>
          <td>1 in 261 people</td>
        </tr>
        <tr>
          <td><strong>135</strong></td>
          <td>+2.33 SD</td>
          <td>99.02nd percentile</td>
          <td>1 in 102 people</td>
        </tr>
        <tr>
          <td><strong>130</strong></td>
          <td>+2.00 SD</td>
          <td>97.72nd percentile</td>
          <td>1 in 44 people (Mensa threshold)</td>
        </tr>
        <tr>
          <td><strong>125</strong></td>
          <td>+1.67 SD</td>
          <td>95.22nd percentile</td>
          <td>1 in 21 people</td>
        </tr>
        <tr>
          <td><strong>120</strong></td>
          <td>+1.33 SD</td>
          <td>90.88th percentile</td>
          <td>1 in 11 people</td>
        </tr>
        <tr>
          <td><strong>115</strong></td>
          <td>+1.00 SD</td>
          <td>84.13th percentile</td>
          <td>1 in 6.3 people</td>
        </tr>
        <tr>
          <td><strong>110</strong></td>
          <td>+0.67 SD</td>
          <td>74.75th percentile</td>
          <td>1 in 4 people</td>
        </tr>
        <tr>
          <td><strong>105</strong></td>
          <td>+0.33 SD</td>
          <td>63.06th percentile</td>
          <td>1 in 2.7 people</td>
        </tr>
        <tr>
          <td><strong>100</strong></td>
          <td>0.00 SD (Mean)</td>
          <td>50.00th percentile</td>
          <td>1 in 2 people (Exact median)</td>
        </tr>
        <tr>
          <td><strong>95</strong></td>
          <td>-0.33 SD</td>
          <td>36.94th percentile</td>
          <td>Higher than 37% of population</td>
        </tr>
        <tr>
          <td><strong>90</strong></td>
          <td>-0.67 SD</td>
          <td>25.25th percentile</td>
          <td>Higher than 25% of population</td>
        </tr>
        <tr>
          <td><strong>85</strong></td>
          <td>-1.00 SD</td>
          <td>15.87th percentile</td>
          <td>Lower bound of broad average</td>
        </tr>
        <tr>
          <td><strong>80</strong></td>
          <td>-1.33 SD</td>
          <td>9.12th percentile</td>
          <td>Low average range</td>
        </tr>
        <tr>
          <td><strong>75</strong></td>
          <td>-1.67 SD</td>
          <td>4.78th percentile</td>
          <td>Borderline range</td>
        </tr>
        <tr>
          <td><strong>70</strong></td>
          <td>-2.00 SD</td>
          <td>2.28th percentile</td>
          <td>Clinical cut-off benchmark</td>
        </tr>
        <tr>
          <td><strong>65</strong></td>
          <td>-2.33 SD</td>
          <td>0.98th percentile</td>
          <td>Extremely low range</td>
        </tr>
        <tr>
          <td><strong>60</strong></td>
          <td>-2.67 SD</td>
          <td>0.38th percentile</td>
          <td>Extremely low range</td>
        </tr>
        <tr>
          <td><strong>55</strong></td>
          <td>-3.00 SD</td>
          <td>0.13th percentile</td>
          <td>Extremely low range</td>
        </tr>
      </tbody>
    </table>

    <h2>How to interpret your placement on the chart</h2>
    <p>When you complete a cognitive test, placing your score on this chart provides instant context. If you score 120, you are performing in the 91st percentile — meaning your reasoning speed and accuracy on those specific puzzle types exceeded 91 out of 100 people in the reference norm.</p>
    <p>To convert specific custom scores into exact decimal percentiles, use our <a href="/iq-scores/iq-percentile-calculator">interactive IQ percentile calculator</a>, learn more about <a href="/iq-scores/what-is-a-good-iq-score">what is a good IQ score</a>, or explore the <a href="/iq-scores/high-iq-genius-range">high IQ genius range</a>.</p>
  `,
  faqs: [
    {
      q: "What is the standard deviation on most IQ tests?",
      a: "Most modern intelligence tests (such as the WAIS-IV and Cattell Culture Fair) use a standard deviation of 15. The Stanford-Binet Fifth Edition also uses SD 15, while older Stanford-Binet Form L-M used SD 16."
    },
    {
      q: "What percentage of people have an IQ between 85 and 115?",
      a: "Exactly 68.26% of the population falls within one standard deviation (85 to 115) on a standard normal distribution curve."
    },
    {
      q: "Why do tests stop scoring reliably above 145 or 160?",
      a: "At extreme scores (+3 to +4 standard deviations), the population sample size becomes so small that question calibration loses statistical reliability."
    }
  ]
});

// T4.10 — /iq-scores/average-iq
buildHtmlPage({
  relPath: 'iq-scores/average-iq.html',
  title: 'What Is the Average IQ Score? Normal Ranges | IQ Test',
  description: 'What is the average IQ score? Learn why 100 is the mean by definition, how standard deviation works, and why scores are calibrated over time.',
  canonical: 'https://iq-test.icu/iq-scores/average-iq',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'Average IQ' }
  ],
  article: {
    headline: 'What Is the Average IQ Score? Standardization and the Flynn Effect',
    about: [
      { "@type": "Thing", "name": "Flynn effect", "sameAs": "https://en.wikipedia.org/wiki/Flynn_effect" },
      { "@type": "Thing", "name": "Psychometrics", "sameAs": "https://en.wikipedia.org/wiki/Psychometrics" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Flynn_effect", "https://en.wikipedia.org/wiki/Intelligence_quotient"]
  },
  h1: 'What Is the Average IQ Score? Meaning and Normal Range',
  answerBlock: 'The average IQ score is 100. This is true by construction rather than by discovery: IQ tests are periodically re-standardised so that the mean of the reference population is set to 100 with a standard deviation of 15. Roughly 68 percent of people score between 85 and 115.',
  bodyHtml: `
    <h2>Why 100 is always the average IQ by definition</h2>
    <p>Many people assume that an average IQ of 100 is a natural discovery — like the boiling point of water or the speed of light. In reality, 100 is a mathematical convention established by psychometric design. When psychologists create a new edition of an intelligence test, they administer the raw items to a large, demographically representative sample of the population. They then mathematically scale the raw results so that the median and mean of that population sample land precisely on 100.</p>
    <p>Because of this calibration, an IQ score is not a fixed unit of absolute measurement. It is a relative rank-order benchmark showing where you sit relative to contemporary peers.</p>

    <h2>The normal range: what 'average' looks like in practice</h2>
    <p>On standard deviation-15 scales (such as the WAIS-IV and SB5), the average category spans scores from 90 to 109, encompassing exactly half the global population:</p>
    <ul>
      <li><strong>Core Average (90 – 109):</strong> Covers 50% of people (25th to 74th percentile). Individuals in this range possess the cognitive capabilities needed for secondary and higher education, complex workplace problem solving, and adaptive daily functioning.</li>
      <li><strong>Broad Normal Range (85 – 115):</strong> Covers 68.2% of people (within 1 standard deviation). Most individuals you interact with on a daily basis score inside this band.</li>
    </ul>

    <h2>The Flynn Effect: why average scores drift over time</h2>
    <p>In the 1980s, political scientist and psychometrician James R. Flynn discovered a remarkable phenomenon: across the 20th century, raw scores on intelligence tests increased steadily at a rate of roughly 3 IQ points per decade in developed nations. This trend is known worldwide as the <strong>Flynn effect</strong>.</p>
    <p>If a person in 1990 took an IQ test normed in 1950 without re-calibration, their raw performance would score around 112 instead of 100. The gain was largest on nonverbal tests of abstract problem solving, such as <a href="/cognitive-skills/pattern-recognition">Raven's Progressive Matrices</a>.</p>

    <h2>Why psychometricians re-standardise tests</h2>
    <p>Because human populations gradually improved at solving abstract visual puzzles due to expanded formal education, visual media, improved childhood nutrition, and technology immersion, test publishers must periodically re-standardise their tests every 10 to 15 years. Re-standardisation resets the average back to 100, ensuring the scale maintains its normative meaning.</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>Factor</th>
          <th>Impact on Average IQ</th>
          <th>Psychometric Solution</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Generational Score Drift (Flynn Effect)</td>
          <td>Raw test performance increases ~3 points per decade</td>
          <td>Periodic test re-norming with fresh demographic samples</td>
        </tr>
        <tr>
          <td>Age-Related Cognitive Shifts</td>
          <td>Fluid reasoning naturally shifts across adulthood</td>
          <td>Age-normed scoring tables for each age group</td>
        </tr>
        <tr>
          <td>Cultural & Linguistic Differences</td>
          <td>Language familiarity affects verbal subtests</td>
          <td>Culture-fair nonverbal testing matrices</td>
        </tr>
      </tbody>
    </table>

    <h2>Explore related cognitive guides</h2>
    <p>To see the full distribution of scores across the population, review our <a href="/iq-scores/iq-scale-chart">complete IQ scale chart</a>, read about <a href="/iq-scores/iq-score-by-age">how IQ changes with age</a>, or learn <a href="/iq-scores/what-is-a-good-iq-score">what qualifies as a good IQ score</a>.</p>
  `,
  faqs: [
    {
      q: "Can the average IQ of a population ever be 105 or 95?",
      a: "No. By definition, a standardised IQ test is calibrated so that the average of the reference population is set to 100."
    },
    {
      q: "What is the Flynn effect?",
      a: "The Flynn effect is the documented historical rise in raw intelligence test scores over the 20th century, averaging about 3 IQ points per decade, which requires tests to be periodically re-standardized."
    },
    {
      q: "What score is considered normal on our cognitive quiz?",
      a: "Scores between 90 and 109 represent the standard normal range on our 85–145 cognitive index scale, matching the standard psychometric distribution."
    }
  ]
});

// T4.11 — /iq-scores/iq-percentile-calculator
buildHtmlPage({
  relPath: 'iq-scores/iq-percentile-calculator.html',
  title: 'IQ Percentile Calculator — Score to Percentile | IQ Test',
  description: 'Convert any IQ score (55–145) to its exact population percentile. Fast, client-side calculator based on the standard normal distribution curve.',
  canonical: 'https://iq-test.icu/iq-scores/iq-percentile-calculator',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'IQ Percentile Calculator' }
  ],
  article: {
    headline: 'IQ Percentile Calculator: Normal Cumulative Distribution Conversion',
    about: [
      { "@type": "Thing", "name": "Percentile", "sameAs": "https://en.wikipedia.org/wiki/Percentile" },
      { "@type": "Thing", "name": "Cumulative distribution function", "sameAs": "https://en.wikipedia.org/wiki/Cumulative_distribution_function" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Standard_score"]
  },
  h1: 'IQ Percentile Calculator: Score to Percentile Conversion',
  answerBlock: 'Use this interactive calculator to convert any IQ score on a standard mean-100 / SD-15 scale into its exact population percentile and rarity ranking. An IQ of 100 corresponds to the 50th percentile (exact median), 115 to the 84th percentile, and 130 to the 98th percentile.',
  bodyHtml: `
    <!-- Interactive Calculator UI (Vanilla JS, Zero Dependencies, Progressive Enhancement) -->
    <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:12px; padding:28px 24px; margin:28px 0 36px;">
      <h3 style="margin-top:0; color:var(--gold); font-size:1.25rem;">Interactive Score Calculator</h3>
      <p style="font-size:0.92rem; color:var(--muted); margin-bottom:20px;">Enter an IQ score between 55 and 145 to compute its exact percentile and population rarity:</p>
      
      <div style="display:flex; flex-wrap:wrap; gap:16px; align-items:center; margin-bottom:24px;">
        <label for="iqInput" style="font-family:'Space Grotesk',sans-serif; font-size:0.95rem; font-weight:600;">IQ Score (Mean 100, SD 15):</label>
        <input type="number" id="iqInput" min="55" max="145" value="115" style="background:rgba(255,255,255,0.06); border:1px solid var(--border); border-radius:6px; color:var(--text); font-family:'Space Grotesk',sans-serif; font-size:1.1rem; padding:8px 14px; width:100px; text-align:center;">
        <button id="calcBtn" class="btn" style="padding:10px 22px; font-size:0.9rem;">Calculate</button>
      </div>

      <div id="calcOutput" style="background:rgba(0,0,0,0.3); border:1px solid var(--border); border-radius:8px; padding:20px; text-align:center;">
        <div style="font-family:'Space Grotesk',sans-serif; font-size:0.9rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.05em;">Estimated Placement</div>
        <div id="resPercentile" style="font-family:'Space Grotesk',sans-serif; font-size:2.2rem; font-weight:700; color:var(--gold); margin:6px 0;">84.1th Percentile</div>
        <div id="resRarity" style="font-size:0.95rem; color:var(--text);">Higher than approximately 84 out of 100 people (1 in 6.3 people)</div>
        <div id="resClassification" style="font-size:0.85rem; color:var(--muted); margin-top:8px;">Wechsler Classification: High Average (+1.00 SD)</div>
      </div>
    </div>

    <h2>How the percentile calculation works</h2>
    <p>This calculator computes percentiles directly from the standard normal cumulative distribution function (CDF) using the formula:</p>
    <p style="text-align:center; font-family:'Space Grotesk',sans-serif; font-size:1.1rem; color:var(--gold); padding:12px; background:var(--bg-card); border-radius:6px;">
      z = (IQ - 100) / 15
    </p>
    <p>Where <em>z</em> is the standard deviation score. The percentile represents the area under the Gaussian bell curve to the left of <em>z</em>. For client-side computation, we implement the high-precision Abramowitz and Stegun rational polynomial approximation, ensuring mathematical accuracy to within 0.01 percentile points without requiring external libraries.</p>

    <h2>Reference percentile conversion table</h2>
    <p>If you prefer a static reference, the table below highlights standard benchmark conversions:</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>IQ Score (SD 15)</th>
          <th>z-Score</th>
          <th>Population Percentile</th>
          <th>Rarity Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>145</strong></td>
          <td>+3.00</td>
          <td>99.87th</td>
          <td>Top 0.1% (1 in 740)</td>
        </tr>
        <tr>
          <td><strong>130</strong></td>
          <td>+2.00</td>
          <td>97.72nd</td>
          <td>Top 2.3% (Mensa cutoff)</td>
        </tr>
        <tr>
          <td><strong>120</strong></td>
          <td>+1.33</td>
          <td>90.88th</td>
          <td>Top 9% (Superior)</td>
        </tr>
        <tr>
          <td><strong>115</strong></td>
          <td>+1.00</td>
          <td>84.13th</td>
          <td>Top 16% (High Average)</td>
        </tr>
        <tr>
          <td><strong>100</strong></td>
          <td>0.00</td>
          <td>50.00th</td>
          <td>Exact Population Median</td>
        </tr>
        <tr>
          <td><strong>85</strong></td>
          <td>-1.00</td>
          <td>15.87th</td>
          <td>Lower 16%</td>
        </tr>
        <tr>
          <td><strong>70</strong></td>
          <td>-2.00</td>
          <td>2.28th</td>
          <td>Bottom 2.3%</td>
        </tr>
      </tbody>
    </table>

    <h2>Explore more score resources</h2>
    <p>To learn more about cognitive benchmarks, see our <a href="/iq-scores/what-is-a-good-iq-score">guide to good IQ scores</a>, browse the <a href="/iq-scores/iq-scale-chart">full IQ scale chart</a>, or examine <a href="/iq-scores/average-iq">average IQ metrics</a>.</p>
  `,
  customScript: `
  <script>
    function normalCdf(z) {
      if (z === 0) return 0.5;
      const sign = z < 0 ? -1 : 1;
      const x = Math.abs(z);
      // Abramowitz & Stegun formula 26.2.17
      const p = 0.2316419;
      const b1 = 0.319381530;
      const b2 = -0.356563782;
      const b3 = 1.781477937;
      const b4 = -1.821255978;
      const b5 = 1.330274429;
      const t = 1.0 / (1.0 + p * x);
      const phi = (1.0 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
      const poly = t * (b1 + t * (b2 + t * (b3 + t * (b4 + t * b5))));
      const cdf = 1.0 - phi * poly;
      return sign === 1 ? cdf : 1.0 - cdf;
    }

    function getClassification(score) {
      if (score >= 130) return "Very Superior / Gifted";
      if (score >= 120) return "Superior";
      if (score >= 110) return "High Average";
      if (score >= 90) return "Average";
      if (score >= 80) return "Low Average";
      if (score >= 70) return "Borderline";
      return "Extremely Low";
    }

    function calculate() {
      const input = document.getElementById('iqInput');
      let score = parseFloat(input.value);
      if (isNaN(score) || score < 55) score = 55;
      if (score > 145) score = 145;
      input.value = score;

      const z = (score - 100) / 15;
      const cdf = normalCdf(z);
      const pct = (cdf * 100).toFixed(1);
      
      let rarityText = "";
      if (score >= 100) {
        const oneIn = (1.0 / (1.0 - cdf)).toFixed(1);
        rarityText = "Higher than approximately " + Math.round(cdf * 100) + " out of 100 people (1 in " + (oneIn < 2 ? "2" : oneIn) + " people)";
      } else {
        const lowerThan = ((1.0 - cdf) * 100).toFixed(1);
        rarityText = "Lower than approximately " + Math.round(lowerThan) + " out of 100 people in the population";
      }

      document.getElementById('resPercentile').textContent = pct + "th Percentile";
      document.getElementById('resRarity').textContent = rarityText;
      document.getElementById('resClassification').textContent = "Wechsler Classification: " + getClassification(score) + " (" + (z >= 0 ? "+" : "") + z.toFixed(2) + " SD)";
    }

    document.getElementById('calcBtn').addEventListener('click', calculate);
    document.getElementById('iqInput').addEventListener('input', calculate);
  </script>
  `,
  faqs: [
    {
      q: "How accurate is this percentile calculation?",
      a: "It uses the standard Gaussian normal distribution formula (Abramowitz & Stegun approximation) accurate to within 0.01 percentile points for any score on the standard SD 15 scale."
    },
    {
      q: "What percentile is an IQ of 130?",
      a: "An IQ of 130 corresponds to the 97.72nd percentile (+2.00 standard deviations), meaning it ranks in the top 2.28% of the population."
    },
    {
      q: "What percentile is an average IQ of 100?",
      a: "An IQ of 100 is exactly at the 50.00th percentile — the precise median and mean of the population."
    }
  ]
});

// T4.12 — /iq-scores/high-iq-genius-range
buildHtmlPage({
  relPath: 'iq-scores/high-iq-genius-range.html',
  title: 'What IQ Is Considered Genius? Scores Explained | IQ Test',
  description: 'What score qualifies as a genius IQ? Learn why genius is not a clinical term, how the top 2% is defined, and how Mensa thresholds are measured.',
  canonical: 'https://iq-test.icu/iq-scores/high-iq-genius-range',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'High IQ & Genius Range' }
  ],
  article: {
    headline: 'What IQ Is Considered Genius? Psychometric Realities and High-IQ Societies',
    about: [
      { "@type": "Thing", "name": "Genius", "sameAs": "https://en.wikipedia.org/wiki/Genius" },
      { "@type": "Organization", "name": "Mensa International", "sameAs": "https://en.wikipedia.org/wiki/Mensa_International" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Mensa_International", "https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale"]
  },
  h1: 'What IQ Is Considered Genius? High IQ Scores Explained',
  answerBlock: "In clinical psychometrics, \"genius\" is not a formal diagnostic term. Modern intelligence tests classify scores of 130 and above as \"Very Superior\" or \"Gifted\" (the top 2.2% of the population on an SD-15 scale). High-IQ societies like Mensa require a verified score at or above the 98th percentile (IQ 130 on SD 15 or 132 on SD 16).",
  bodyHtml: `
    <h2>The difference between 'gifted' and 'genius'</h2>
    <p>While popular culture frequently uses "genius" to describe anyone with an IQ over 140, contemporary psychologists avoid the term in clinical reports. In the early 20th century, psychologist Lewis Terman (creator of the Stanford–Binet test) labeled scores above 140 as "near genius or genius." However, modern psychometric batteries (including the WAIS-IV and SB5) replaced these subjective labels with standardized statistical classifications such as <em>Very Superior</em> or <em>Extremely High</em>.</p>
    <p>True genius is generally understood by psychologists to require not just high fluid intelligence, but a rare combination of exceptional creativity, domain mastery, and transformative real-world productivity.</p>

    <h2>Standard deviation differences: SD 15 vs SD 16</h2>
    <p>A common point of confusion when discussing high-IQ thresholds is the standard deviation (SD) of the test. Different intelligence tests use slightly different standard deviation scales:</p>
    <ul>
      <li><strong>Wechsler Scales & Modern Tests (SD 15):</strong> The 98th percentile cutoff is an IQ of <strong>130</strong> (+2.00 SD).</li>
      <li><strong>Stanford-Binet Form L-M & Older Tests (SD 16):</strong> The 98th percentile cutoff is an IQ of <strong>132</strong> (+2.00 SD).</li>
      <li><strong>Cattell Culture Fair (SD 24):</strong> The 98th percentile cutoff is an IQ of <strong>148</strong> (+2.00 SD).</li>
    </ul>
    <p>An IQ of 148 on Cattell represents the exact same rarity (the top 2%) as an IQ of 130 on the WAIS-IV. Stating an IQ score without specifying the standard deviation is statistically incomplete.</p>

    <h2>High-IQ society qualification thresholds</h2>
    <p>Various international high-IQ societies select members based strictly on standardized percentile thresholds:</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>Society</th>
          <th>Percentile Threshold</th>
          <th>IQ Equivalent (SD 15)</th>
          <th>Population Rarity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Mensa International</strong></td>
          <td>98th percentile</td>
          <td>130 (SD 15) / 132 (SD 16)</td>
          <td>Top 1 in 50 people (2%)</td>
        </tr>
        <tr>
          <td><strong>Intertel</strong></td>
          <td>99th percentile</td>
          <td>135 (SD 15) / 137 (SD 16)</td>
          <td>Top 1 in 100 people (1%)</td>
        </tr>
        <tr>
          <td><strong>Triple Nine Society</strong></td>
          <td>99.9th percentile</td>
          <td>146 (SD 15) / 149 (SD 16)</td>
          <td>Top 1 in 1,000 people (0.1%)</td>
        </tr>
        <tr>
          <td><strong>Prometheus Society</strong></td>
          <td>99.997th percentile</td>
          <td>160 (SD 15) / 164 (SD 16)</td>
          <td>Top 1 in 30,000 people (0.003%)</td>
        </tr>
      </tbody>
    </table>

    <h2>Does a high IQ guarantee exceptional success?</h2>
    <p>Psychological research — including Lewis Terman's longitudinal study of 1,500 high-IQ children and subsequent work by researchers like David Lubinski and Camilla Benbow (Study of Mathematically Precocious Youth) — demonstrates that high cognitive ability provides a substantial advantage in academic learning speed and complex technical fields. However, beyond an IQ of approximately 120, non-cognitive factors such as emotional resilience, task commitment, creativity, and social intelligence become equally decisive in determining long-term creative and professional impact.</p>
    <p>To explore how cognitive strengths are distributed, see our guide on <a href="/iq-scores/what-is-a-good-iq-score">what is a good IQ score</a>, check our <a href="/iq-scores/iq-scale-chart">IQ scale chart</a>, or read how history's greatest minds approached problems on our <a href="/historical-figures-iq">historical figures IQ hub</a>.</p>
  `,
  faqs: [
    {
      q: "What IQ score is required to join Mensa?",
      a: "Mensa requires a score at or above the 98th percentile on an approved, supervised intelligence test. This corresponds to an IQ of 130 on an SD-15 test (like the WAIS-IV) or 132 on an SD-16 test."
    },
    {
      q: "Is genius defined as an IQ of 140?",
      a: "Lewis Terman used 140 as a cutoff in 1916, but modern clinical psychometrics does not use 'genius' as an official category, preferring terms like 'Very Superior' (130+)."
    },
    {
      q: "Why do some people claim IQs over 200?",
      a: "Scores over 160 are generally childhood ratio scores, non-standardized estimates, or Internet quiz claims that lack clinical standardisation."
    }
  ]
});

// T4.13 — /iq-scores/iq-score-by-age
buildHtmlPage({
  relPath: 'iq-scores/iq-score-by-age.html',
  title: 'Does IQ Change With Age? Scores by Age Explained | IQ Test',
  description: 'Does your IQ change as you get older? Discover how IQ tests are age-normed and the difference between fluid reasoning and crystallised knowledge over time.',
  canonical: 'https://iq-test.icu/iq-scores/iq-score-by-age',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'IQ Score by Age' }
  ],
  article: {
    headline: 'Does IQ Change With Age? Age-Norming and Cattell-Horn-Carroll Theory',
    about: [
      { "@type": "Thing", "name": "Fluid and crystallized intelligence", "sameAs": "https://en.wikipedia.org/wiki/Fluid_and_crystallized_intelligence" },
      { "@type": "Thing", "name": "Cattell%E2%80%93Horn%E2%80%93Carroll_theory", "sameAs": "https://en.wikipedia.org/wiki/Cattell%E2%80%93Horn%E2%80%93Carroll_theory" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Fluid_and_crystallized_intelligence"]
  },
  h1: 'Does IQ Change With Age? Cognitive Trajectories Explained',
  answerBlock: "Your overall IQ score remains relatively stable throughout adulthood because IQ tests are age-normed by design — your raw performance is always compared against peers in your exact age bracket. What does change across your lifespan is the balance between fluid reasoning (which peaks in early adulthood) and crystallised intelligence (which remains stable or grows into your 60s).",
  bodyHtml: `
    <h2>How age norming keeps average IQ at 100 at every age</h2>
    <p>A fundamental misconception about intelligence is that older adults should receive lower IQ scores because raw processing speed naturally slows down with age. In reality, modern intelligence tests use <strong>age-normed lookup tables</strong>.</p>
    <p>When a 20-year-old and a 65-year-old take the WAIS-IV, their raw point totals are evaluated against separate normative tables derived from their respective age groups. If a 65-year-old performs at the 75th percentile for 65-year-olds, their IQ score is 110. An average score is always 100 for every age group by construction.</p>

    <h2>Fluid vs. crystallised intelligence across the lifespan</h2>
    <p>According to Cattell–Horn–Carroll (CHC) theory — the most empirically validated framework in cognitive psychology — human intelligence divides into two primary broad abilities with distinct developmental trajectories:</p>

    <table class="data-table">
      <thead>
        <tr>
          <th>Cognitive Ability</th>
          <th>Definition & Examples</th>
          <th>Lifespan Trajectory</th>
          <th>Peak Performance Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fluid Intelligence (Gf)</strong></td>
          <td>Novel problem-solving, abstract pattern recognition, spatial deduction, working memory</td>
          <td>Rises rapidly through childhood and adolescence; gradual decline starting in mid-to-late 20s</td>
          <td>Ages 18 – 25</td>
        </tr>
        <tr>
          <td><strong>Crystallised Intelligence (Gc)</strong></td>
          <td>Accumulated vocabulary, general knowledge, verbal comprehension, domain expertise</td>
          <td>Steadily increases through adulthood; remains stable or continues rising into late adulthood</td>
          <td>Ages 50 – 70</td>
        </tr>
        <tr>
          <td><strong>Processing Speed (Gs)</strong></td>
          <td>Visual scanning speed, rapid perceptual comparisons</td>
          <td>Peaks earliest; steady gradual decline throughout adult life</td>
          <td>Ages 18 – 22</td>
        </tr>
        <tr>
          <td><strong>Quantitative Reasoning (Gq)</strong></td>
          <td>Mathematical deduction, numerical operations</td>
          <td>Maintained through middle adulthood; dependent on ongoing usage</td>
          <td>Ages 30 – 50</td>
        </tr>
      </tbody>
    </table>

    <h2>Why cognitive stability is high in adulthood</h2>
    <p>Longitudinal studies (such as the famous Lothian Birth Cohort studies in Scotland, which tested participants at age 11 and again at age 70, 79, and 90) have revealed that intelligence rankings are remarkably stable across the human lifespan. An individual who scored in the top 10% of their peers at age 11 is overwhelmingly likely to score in the top 10% of their peers at age 75.</p>

    <h2>What you can do to maintain cognitive performance</h2>
    <p>While fluid processing speed naturally changes, cognitive resilience and brain plasticity in older adulthood are heavily supported by evidence-based lifestyle factors:</p>
    <ol>
      <li><strong>Cardiovascular Health:</strong> Regular aerobic exercise preserves cerebral blood flow and white matter integrity.</li>
      <li><strong>Novel Cognitive Challenges:</strong> Learning new languages, complex instruments, or unfamiliar skills engages neurogenesis and synaptic remodeling.</li>
      <li><strong>Social & Intellectual Engagement:</strong> Active discussions, collaborative problem solving, and complex hobbies buffer against age-related cognitive decline.</li>
    </ol>

    <h2>Explore related cognitive guides</h2>
    <p>To learn more about specific reasoning domains, explore our guides on <a href="/cognitive-skills/verbal-reasoning">verbal reasoning</a>, <a href="/cognitive-skills/pattern-recognition">pattern recognition</a>, or check our <a href="/iq-scores/average-iq">average IQ overview</a>.</p>
  `,
  faqs: [
    {
      q: "Does IQ naturally drop as you get older?",
      a: "No, your age-normed IQ score remains largely stable because your performance is always compared to people in your own age bracket."
    },
    {
      q: "Which cognitive skills stay strong the longest?",
      a: "Crystallised intelligence — including vocabulary, verbal comprehension, and accumulated domain knowledge — typically remains stable or improves well into your 60s and 70s."
    },
    {
      q: "At what age does fluid intelligence peak?",
      a: "Fluid intelligence (abstract puzzle solving, processing speed, and working memory) typically reaches its biological peak between ages 18 and 25."
    }
  ]
});

// Hub A Index — /iq-scores/ (public/iq-scores/index.html)
buildHtmlPage({
  relPath: 'iq-scores/index.html',
  title: 'IQ Score Guide: Scales, Ranges & Percentiles | IQ Test',
  description: 'Complete guide to IQ scores, normal distribution charts, genius thresholds, age trajectories, and score-to-percentile calculations.',
  canonical: 'https://iq-test.icu/iq-scores/',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores' }
  ],
  article: {
    headline: 'IQ Score Guide: Complete Overview of Cognitive Scales and Benchmarks',
    about: [
      { "@type": "Thing", "name": "Intelligence quotient", "sameAs": "https://en.wikipedia.org/wiki/Intelligence_quotient" }
    ]
  },
  h1: 'IQ Score Guide: Scales, Ranges, and Percentiles',
  answerBlock: 'Welcome to the complete IQ score guide. Explore how modern intelligence scores are calibrated against the normal distribution, what constitutes a good score, how percentiles are computed, and how cognitive performance shifts across the human lifespan.',
  bodyHtml: `
    <h2>Explore our IQ score guides</h2>
    <div class="figure-grid">
      <div class="figure-card">
        <h3><a href="/iq-scores/what-is-a-good-iq-score">What Is a Good IQ Score?</a></h3>
        <p>Learn what scores from 70 to 145 mean, examine Wechsler classifications, and understand what IQ can and cannot measure.</p>
        <a href="/iq-scores/what-is-a-good-iq-score">Read Guide →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/iq-scores/iq-scale-chart">IQ Scale Chart</a></h3>
        <p>View the complete bell curve distribution and score-to-percentile conversion table in 5-point increments from 55 to 145.</p>
        <a href="/iq-scores/iq-scale-chart">View Chart →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/iq-scores/average-iq">Average IQ Score</a></h3>
        <p>Discover why 100 is the mean by construction, how tests are re-standardised, and what the Flynn effect reveals.</p>
        <a href="/iq-scores/average-iq">Learn More →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/iq-scores/iq-percentile-calculator">Percentile Calculator</a></h3>
        <p>Interactive client-side calculator to convert any IQ score into its exact population percentile and rarity ranking.</p>
        <a href="/iq-scores/iq-percentile-calculator">Open Calculator →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/iq-scores/high-iq-genius-range">High IQ & Genius Range</a></h3>
        <p>Understand the 98th percentile cutoff, Mensa qualification thresholds, and the difference between SD 15 and SD 16.</p>
        <a href="/iq-scores/high-iq-genius-range">Explore Genius Range →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/iq-scores/iq-score-by-age">IQ Score by Age</a></h3>
        <p>Learn how tests are age-normed and explore the trajectories of fluid reasoning and crystallised knowledge over a lifetime.</p>
        <a href="/iq-scores/iq-score-by-age">Read Age Analysis →</a>
      </div>
    </div>
  `,
  faqs: [
    {
      q: "What is the average IQ score?",
      a: "The average score is 100 by design, with a standard deviation of 15."
    },
    {
      q: "Where can I calculate my exact IQ percentile?",
      a: "Use our interactive IQ Percentile Calculator to convert any score between 55 and 145 to its exact percentile."
    }
  ]
});

console.log('HUB A (IQ Scores) generation complete.');
