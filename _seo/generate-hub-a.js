/**
 * HUB A Generator — IQ Scores & Psychometric Distribution
 * Enhanced with Dynamic Gaussian Normal Curve SVG, Interactive Slider, and Quick Facts
 */

const { buildHtmlPage } = require('./build-seo');

// T4.8 — /iq-scores/what-is-a-good-iq-score
buildHtmlPage({
  relPath: 'iq-scores/what-is-a-good-iq-score.html',
  title: 'What Is a Good IQ Score? Score Ranges & Percentiles | IQ Test',
  description: 'What is considered a good IQ score? Explore standard deviation ranges, Wechsler classifications, population percentiles, and what IQ numbers mean.',
  canonical: 'https://iq-test.icu/iq-scores/what-is-a-good-iq-score',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'What Is a Good IQ Score?' }
  ],
  article: {
    headline: 'What Is a Good IQ Score? Score Ranges and Population Percentiles',
    about: [
      { "@type": "Thing", "name": "Intelligence quotient", "sameAs": "https://en.wikipedia.org/wiki/Intelligence_quotient" },
      { "@type": "Thing", "name": "Standard deviation", "sameAs": "https://en.wikipedia.org/wiki/Standard_deviation" },
      { "@type": "Thing", "name": "Wechsler Adult Intelligence Scale", "sameAs": "https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale" }
    ],
    citation: [
      "https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale",
      "https://en.wikipedia.org/wiki/IQ_classification"
    ]
  },
  h1: 'What Is a Good IQ Score? Ranges, Percentiles, and Meaning',
  answerBlock: 'A good IQ score is generally considered to be 115 or higher, placing you above the 84th percentile of the population (more than one standard deviation above the mean of 100). Scores between 90 and 109 represent average cognitive ability, while a score of 130 or higher enters the top 2% (gifted range).',
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">📊 Quick Reference: Wechsler IQ Classification</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">Population Average</div>
          <div class="fact-value">IQ 100 (50th Percentile)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Above Average Threshold</div>
          <div class="fact-value">IQ 115+ (Top 16%)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Superior / Gifted</div>
          <div class="fact-value">IQ 130+ (Top 2.2%)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Standard Deviation</div>
          <div class="fact-value">15 Points (Wechsler / WAIS-IV)</div>
        </div>
      </div>
    </div>

    <h2>Understanding the standard normal curve in IQ testing</h2>
    <p>Modern intelligence tests do not calculate mental age divided by chronological age. Instead, they use <strong>deviation scoring</strong> based on a Gaussian normal distribution. The test is standardised so that the population mean is exactly 100 and the standard deviation (SD) is 15 points.</p>
    <p>Because human cognitive traits distribute symmetrically, roughly 68.2% of all individuals score within one standard deviation of the mean (between 85 and 115). Approximately 95.4% score within two standard deviations (between 70 and 130).</p>

    <h2>Wechsler classification table</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>IQ Score Range</th>
          <th>Standard Classification</th>
          <th>Population Percentile</th>
          <th>Approximate Frequency</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>130 and above</strong></td>
          <td>Very Superior / Gifted</td>
          <td>98th percentile and above</td>
          <td>1 in 44 people (2.28%)</td>
        </tr>
        <tr>
          <td><strong>120 – 129</strong></td>
          <td>Superior</td>
          <td>91st to 97th percentile</td>
          <td>1 in 15 people (6.7%)</td>
        </tr>
        <tr>
          <td><strong>110 – 119</strong></td>
          <td>High Average</td>
          <td>75th to 90th percentile</td>
          <td>1 in 6 people (16.1%)</td>
        </tr>
        <tr>
          <td><strong>90 – 109</strong></td>
          <td>Average</td>
          <td>25th to 74th percentile</td>
          <td>1 in 2 people (50.0%)</td>
        </tr>
        <tr>
          <td><strong>80 – 89</strong></td>
          <td>Low Average</td>
          <td>9th to 24th percentile</td>
          <td>1 in 6 people (16.1%)</td>
        </tr>
        <tr>
          <td><strong>70 – 79</strong></td>
          <td>Borderline</td>
          <td>2nd to 8th percentile</td>
          <td>1 in 15 people (6.7%)</td>
        </tr>
        <tr>
          <td><strong>Below 70</strong></td>
          <td>Extremely Low</td>
          <td>Below 2nd percentile</td>
          <td>1 in 44 people (2.28%)</td>
        </tr>
      </tbody>
    </table>

    <h2>What does a 'good' IQ score actually predict?</h2>
    <p>Psychometric research over the past century demonstrates that higher cognitive test scores correlate moderately to strongly with academic achievement, complex problem-solving performance, and occupational training success. However, an IQ score is not a comprehensive measure of human value, emotional intelligence, creativity, grit, or ethical judgment.</p>
    <p>To see how your score translates to exact statistical percentages, use our interactive <a href="/iq-scores/iq-percentile-calculator">IQ percentile calculator</a> or examine the complete <a href="/iq-scores/iq-scale-chart">IQ scale chart</a>.</p>
  `,
  faqs: [
    {
      q: "Is 115 considered a good IQ score?",
      a: "Yes. An IQ of 115 is one standard deviation above the mean, placing you in the 84th percentile (top 16% of the population)."
    },
    {
      q: "What IQ is required for Mensa membership?",
      a: "Mensa requires a score at or above the 98th percentile, which corresponds to an IQ of 130 on the standard Wechsler scale (SD 15) or 132 on the Stanford-Binet scale (SD 16)."
    },
    {
      q: "Can an online test give you an official clinical score?",
      a: "No. Online cognitive assessments provide self-insight and relative index scores for entertainment and learning, but official clinical diagnoses require in-person administration by a licensed psychologist."
    }
  ]
});

// T4.9 — /iq-scores/iq-scale-chart
buildHtmlPage({
  relPath: 'iq-scores/iq-scale-chart.html',
  title: 'IQ Scale Chart: Bell Curve & Percentile Conversion | IQ Test',
  description: 'Complete IQ scale chart and bell curve reference. See exact score conversions from 55 to 145, standard deviations, and population percentile rankings.',
  canonical: 'https://iq-test.icu/iq-scores/iq-scale-chart',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'IQ Scale Chart' }
  ],
  article: {
    headline: 'IQ Scale Chart: Normal Distribution Curve and Score Conversions',
    about: [
      { "@type": "Thing", "name": "Normal distribution", "sameAs": "https://en.wikipedia.org/wiki/Normal_distribution" }
    ],
    citation: ["https://en.wikipedia.org/wiki/IQ_classification"]
  },
  h1: 'IQ Scale Chart: Normal Distribution and Score Conversions',
  answerBlock: 'The standard IQ scale is defined by a normal Gaussian distribution with a mean of 100 and a standard deviation of 15 points. This comprehensive scale chart maps every score from 55 to 145 to its exact mathematical percentile, standard deviation z-score, and population rarity.',
  bodyHtml: `
    <h2>The normal distribution bell curve</h2>
    <p>In psychometrics, intelligence scores follow a bell curve where the highest density of scores occurs at the population center (100). Below is a vector representation of the standard deviation zones:</p>
    
    <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:10px; padding:20px; margin:24px 0; text-align:center;">
      <svg viewBox="0 0 560 180" style="width:100%; max-width:540px; height:auto; display:block; margin:0 auto;" aria-label="Gaussian Normal Distribution Curve">
        <path d="M 30 160 L 30.0 159.4 L 40.4 159.2 L 50.8 158.9 L 61.3 158.5 L 71.7 157.9 L 82.1 157.0 L 92.5 155.8 L 102.9 154.1 L 113.3 151.7 L 123.8 148.5 L 134.2 144.2 L 144.6 138.6 L 155.0 131.6 L 165.4 122.9 L 175.8 112.5 L 186.3 100.5 L 196.7 87.1 L 207.1 72.8 L 217.5 58.2 L 227.9 44.1 L 238.3 31.4 L 248.8 21.0 L 259.2 13.7 L 269.6 10.0 L 280.0 10.0 L 290.4 13.7 L 300.8 21.0 L 311.3 31.4 L 321.7 44.1 L 332.1 58.2 L 342.5 72.8 L 352.9 87.1 L 363.3 100.5 L 373.8 112.5 L 384.2 122.9 L 394.6 131.6 L 405.0 138.6 L 415.4 144.2 L 425.8 148.5 L 436.3 151.7 L 446.7 154.1 L 457.1 155.8 L 467.5 157.0 L 477.9 157.9 L 488.3 158.5 L 498.8 158.9 L 509.2 159.2 L 519.6 159.4 L 530 160" fill="none" stroke="oklch(0.72 0.12 95)" stroke-width="2.5"></path>
        <line x1="30" y1="160" x2="530" y2="160" stroke="oklch(0.35 0.008 95)" stroke-width="1.5"></line>
        <line x1="280" y1="10" x2="280" y2="160" stroke="oklch(0.72 0.12 95)" stroke-dasharray="4 4"></line>
        <text x="280" y="176" fill="oklch(0.72 0.12 95)" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="bold">100 (Mean)</text>
        <text x="186" y="176" fill="oklch(0.62 0.008 95)" font-family="sans-serif" font-size="11" text-anchor="middle">85 (-1σ)</text>
        <text x="374" y="176" fill="oklch(0.62 0.008 95)" font-family="sans-serif" font-size="11" text-anchor="middle">115 (+1σ)</text>
        <text x="92" y="176" fill="oklch(0.62 0.008 95)" font-family="sans-serif" font-size="11" text-anchor="middle">70 (-2σ)</text>
        <text x="468" y="176" fill="oklch(0.62 0.008 95)" font-family="sans-serif" font-size="11" text-anchor="middle">130 (+2σ)</text>
      </svg>
      <div style="font-family:'Space Grotesk',sans-serif; font-size:0.82rem; color:var(--muted); margin-top:10px;">Gaussian Normal Distribution (Mean = 100, SD = 15)</div>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:36px; margin-bottom:12px;">
      <h2 style="margin:0;">Detailed conversion table (55 to 145)</h2>
      <button class="btn-outline" id="copyTableBtn" onclick="copyScaleTable()">📋 Copy Markdown</button>
    </div>

    <table class="data-table" id="scaleChartTable">
      <thead>
        <tr>
          <th>IQ Score</th>
          <th>Standard Deviation (z)</th>
          <th>Exact Percentile</th>
          <th>Rarity Representation</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>145</strong></td><td>+3.00 SD</td><td>99.87th percentile</td><td>1 in 740 (Top 0.13%)</td></tr>
        <tr><td><strong>140</strong></td><td>+2.67 SD</td><td>99.62nd percentile</td><td>1 in 261 (Top 0.38%)</td></tr>
        <tr><td><strong>135</strong></td><td>+2.33 SD</td><td>99.02nd percentile</td><td>1 in 102 (Top 0.98%)</td></tr>
        <tr><td><strong>130</strong></td><td>+2.00 SD</td><td>97.72nd percentile</td><td>1 in 44 (Top 2.28% - Mensa)</td></tr>
        <tr><td><strong>125</strong></td><td>+1.67 SD</td><td>95.22nd percentile</td><td>1 in 21 (Top 4.78%)</td></tr>
        <tr><td><strong>120</strong></td><td>+1.33 SD</td><td>90.88th percentile</td><td>1 in 11 (Top 9.12%)</td></tr>
        <tr><td><strong>115</strong></td><td>+1.00 SD</td><td>84.13th percentile</td><td>1 in 6.3 (Top 15.87%)</td></tr>
        <tr><td><strong>110</strong></td><td>+0.67 SD</td><td>74.75th percentile</td><td>1 in 4.0 (Top 25.25%)</td></tr>
        <tr><td><strong>105</strong></td><td>+0.33 SD</td><td>63.06th percentile</td><td>1 in 2.7 (Top 36.94%)</td></tr>
        <tr><td><strong>100</strong></td><td>0.00 SD</td><td>50.00th percentile</td><td>1 in 2.0 (Exact Population Median)</td></tr>
        <tr><td><strong>95</strong></td><td>-0.33 SD</td><td>36.94th percentile</td><td>Bottom 36.94%</td></tr>
        <tr><td><strong>90</strong></td><td>-0.67 SD</td><td>25.25th percentile</td><td>Bottom 25.25%</td></tr>
        <tr><td><strong>85</strong></td><td>-1.00 SD</td><td>15.87th percentile</td><td>Bottom 15.87%</td></tr>
        <tr><td><strong>80</strong></td><td>-1.33 SD</td><td>9.12th percentile</td><td>Bottom 9.12%</td></tr>
        <tr><td><strong>75</strong></td><td>-1.67 SD</td><td>4.78th percentile</td><td>Bottom 4.78%</td></tr>
        <tr><td><strong>70</strong></td><td>-2.00 SD</td><td>2.28th percentile</td><td>Bottom 2.28%</td></tr>
        <tr><td><strong>65</strong></td><td>-2.33 SD</td><td>0.98th percentile</td><td>Bottom 0.98%</td></tr>
        <tr><td><strong>60</strong></td><td>-2.67 SD</td><td>0.38th percentile</td><td>Bottom 0.38%</td></tr>
        <tr><td><strong>55</strong></td><td>-3.00 SD</td><td>0.13th percentile</td><td>Bottom 0.13%</td></tr>
      </tbody>
    </table>

    <h2>How to calculate your exact percentile</h2>
    <p>If your score falls between the 5-point increments in this table, you can calculate the exact mathematical placement using our real-time <a href="/iq-scores/iq-percentile-calculator">interactive IQ percentile calculator</a>, or read our overview of the <a href="/iq-scores/high-iq-genius-range">high IQ genius range</a>.</p>
  `,
  customScript: `
  <script>
    function copyScaleTable() {
      const table = document.getElementById('scaleChartTable');
      let md = "| IQ Score | Standard Deviation | Exact Percentile | Rarity |\\n| :--- | :--- | :--- | :--- |\\n";
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(r => {
        const cols = [...r.querySelectorAll('td')].map(c => c.textContent.trim());
        md += "| " + cols.join(" | ") + " |\\n";
      });
      navigator.clipboard.writeText(md).then(() => {
        const btn = document.getElementById('copyTableBtn');
        btn.textContent = "✓ Copied!";
        setTimeout(() => { btn.textContent = "📋 Copy Markdown"; }, 2000);
      });
    }
  </script>`,
  faqs: [
    {
      q: "Why is 100 always the center of the IQ scale?",
      a: "Standardisation norming groups periodically recalibrate the raw score translations so that the mean of the representative general population is defined as 100."
    },
    {
      q: "What is the difference between SD 15 and SD 16?",
      a: "Wechsler tests use SD 15 (where 130 is the 98th percentile). Older Stanford-Binet tests used SD 16 (where 132 is the 98th percentile). Both represent the same relative population standing."
    }
  ]
});

// T4.10 — /iq-scores/average-iq
buildHtmlPage({
  relPath: 'iq-scores/average-iq.html',
  title: 'Average IQ Score: Meaning, Norms & Flynn Effect | IQ Test',
  description: 'What is the average IQ score? Learn why 100 is the mathematical benchmark, how the Flynn effect influences scoring, and how populations are normed.',
  canonical: 'https://iq-test.icu/iq-scores/average-iq',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'Average IQ' }
  ],
  article: {
    headline: 'Average IQ Score: Definition, Norming, and the Flynn Effect',
    about: [
      { "@type": "Thing", "name": "Flynn effect", "sameAs": "https://en.wikipedia.org/wiki/Flynn_effect" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Flynn_effect"]
  },
  h1: 'Average IQ Score: Definition, Norms, and the Flynn Effect',
  answerBlock: 'The average IQ score by definition is exactly 100, with a standard deviation of 15. In modern psychometric testing, the average range is defined as scores between 90 and 109, which encompasses approximately 50% of the entire human population under the standard normal distribution curve.',
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">📌 Population Intelligence Baselines</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">Exact Mean / Median</div>
          <div class="fact-value">IQ 100.0</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Normal Range (50% of people)</div>
          <div class="fact-value">IQ 90 to 109</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Broad Average (68% of people)</div>
          <div class="fact-value">IQ 85 to 115 (±1 SD)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Flynn Effect Rate</div>
          <div class="fact-value">~3 Raw Points per Decade</div>
        </div>
      </div>
    </div>

    <h2>Why 100 is always the average IQ</h2>
    <p>A frequent point of confusion is whether the population's average IQ can rise to 105 or fall to 95. In psychometrics, the answer is no: <strong>100 is not a raw score, but a calibrated benchmark.</strong> When test publishers like Pearson standardise a new edition of the WAIS, they administer the test to thousands of individuals representing census demographics, and adjust the scoring tables so that the sample average is anchored at 100.</p>

    <h2>The Flynn effect: why tests must be renormed</h2>
    <p>In 1984, political scientist James Flynn documented that raw performance on cognitive tests had been rising steadily by approximately 3 IQ points per decade throughout the 20th century across industrialised nations. This phenomenon, known as the <strong>Flynn effect</strong>, means that if an average person from 2026 took an IQ test standardized in 1950, they would score significantly higher than 100.</p>
    
    <h2>What drives changes in raw cognitive performance?</h2>
    <ul>
      <li><strong>Improved Nutrition and Health:</strong> Eradication of childhood infectious diseases and better prenatal care.</li>
      <li><strong>Cognitive Complexity in Work:</strong> Modern careers require abstract problem solving, software interaction, and symbolic logic.</li>
      <li><strong>Visual-Spatial Media Exposure:</strong> Proliferation of digital interfaces and visual media training nonverbal reasoning.</li>
    </ul>

    <h2>Explore related score resources</h2>
    <p>To see how deviation scoring translates across demographics, explore our guide on <a href="/iq-scores/iq-score-by-age">IQ scores by age</a> and examine the <a href="/iq-scores/what-is-a-good-iq-score">good IQ score benchmarks</a>.</p>
  `,
  faqs: [
    {
      q: "Can you raise your IQ score over time?",
      a: "While raw cognitive test familiarity and education improve performance, your relative deviation score among peers of the same age remains relatively stable in adulthood."
    },
    {
      q: "What percentage of the population has an average IQ?",
      a: "Approximately 50% score in the average range (90–109), and 68.2% score within the broad average range of 85–115."
    }
  ]
});

// T4.11 — /iq-scores/iq-percentile-calculator
buildHtmlPage({
  relPath: 'iq-scores/iq-percentile-calculator.html',
  title: 'IQ Percentile Calculator: Normal Distribution | IQ Test',
  description: 'Calculate your exact IQ percentile and population rarity in real time. Features live Gaussian bell curve visualization with Abramowitz-Stegun accuracy.',
  canonical: 'https://iq-test.icu/iq-scores/iq-percentile-calculator',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'Percentile Calculator' }
  ],
  article: {
    headline: 'Interactive IQ Percentile Calculator and Population Bell Curve',
    about: [
      { "@type": "Thing", "name": "Cumulative distribution function", "sameAs": "https://en.wikipedia.org/wiki/Cumulative_distribution_function" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Cumulative_distribution_function"]
  },
  h1: 'Interactive IQ Percentile Calculator and Bell Curve',
  answerBlock: 'Use this interactive calculator to convert any IQ score on the standard deviation 15 scale into its exact population percentile, z-score, and rarity ranking. The tool uses the Abramowitz and Stegun polynomial approximation of the Gaussian cumulative distribution function, accurate to within 0.01 percentile points.',
  bodyHtml: `
    <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:12px; padding:28px; margin:28px 0;">
      <h2 style="margin-top:0; font-size:1.3rem; margin-bottom:14px;">Calculate Your Percentile Rank</h2>
      
      <div style="display:flex; flex-wrap:wrap; gap:16px; align-items:center; margin-bottom:20px;">
        <label for="iqInput" style="font-family:'Space Grotesk',sans-serif; font-size:1rem; font-weight:600; color:var(--text);">Enter IQ Score (55–145):</label>
        <input type="number" id="iqInput" min="55" max="145" value="100" style="background:oklch(0.06 0.002 95); color:var(--gold); font-family:'Space Grotesk',sans-serif; font-size:1.3rem; font-weight:700; padding:10px 18px; border-radius:8px; border:1px solid var(--border); width:130px; text-align:center;">
        <button id="calcBtn" class="btn" style="padding:10px 24px; font-size:0.95rem;">Update Chart</button>
      </div>

      <div style="margin-bottom:24px;">
        <input type="range" id="iqSlider" min="55" max="145" value="100" style="width:100%; accent-color:oklch(0.72 0.12 95); cursor:pointer;">
        <div style="display:flex; justify-content:space-between; font-family:'Space Grotesk',sans-serif; font-size:0.75rem; color:var(--muted); margin-top:4px;">
          <span>55 (-3σ)</span>
          <span>70 (-2σ)</span>
          <span>85 (-1σ)</span>
          <span>100 (Mean)</span>
          <span>115 (+1σ)</span>
          <span>130 (+2σ)</span>
          <span>145 (+3σ)</span>
        </div>
      </div>

      <!-- Live Dynamic Bell Curve SVG -->
      <div style="background:oklch(0.06 0.002 95); border:1px solid var(--border); border-radius:10px; padding:18px; margin-bottom:24px;">
        <svg id="bellCurveSvg" viewBox="0 0 560 190" style="width:100%; height:auto; display:block;" aria-label="Dynamic Gaussian Bell Curve Visualizer">
          <!-- Shaded Area Path -->
          <path id="svgShadePath" d="" fill="oklch(0.72 0.12 95 / 0.28)"></path>
          <!-- Outer Curve Path -->
          <path id="svgCurvePath" d="" fill="none" stroke="oklch(0.72 0.12 95)" stroke-width="2.5"></path>
          <!-- Baseline -->
          <line x1="30" y1="160" x2="530" y2="160" stroke="oklch(0.35 0.008 95)" stroke-width="1.5"></line>
          <!-- Center Mean Line -->
          <line x1="280" y1="20" x2="280" y2="160" stroke="oklch(0.45 0.008 95)" stroke-dasharray="3 3"></line>
          <!-- Interactive Indicator Line -->
          <line id="svgIndicatorLine" x1="280" y1="20" x2="280" y2="160" stroke="var(--red)" stroke-width="2.5"></line>
          <circle id="svgIndicatorDot" cx="280" cy="20" r="4.5" fill="var(--red)"></circle>
          <!-- Labels -->
          <text x="280" y="176" fill="oklch(0.62 0.008 95)" font-family="sans-serif" font-size="11" text-anchor="middle">100 (μ)</text>
          <text x="374" y="176" fill="oklch(0.62 0.008 95)" font-family="sans-serif" font-size="11" text-anchor="middle">+1σ (115)</text>
          <text x="468" y="176" fill="oklch(0.62 0.008 95)" font-family="sans-serif" font-size="11" text-anchor="middle">+2σ (130)</text>
          <text x="186" y="176" fill="oklch(0.62 0.008 95)" font-family="sans-serif" font-size="11" text-anchor="middle">-1σ (85)</text>
          <text x="92" y="176" fill="oklch(0.62 0.008 95)" font-family="sans-serif" font-size="11" text-anchor="middle">-2σ (70)</text>
        </svg>
      </div>

      <div id="calcResults" style="background:oklch(0.08 0.004 95); border:1px solid var(--border); border-radius:8px; padding:20px; font-family:'Space Grotesk',sans-serif;">
        <div style="font-size:0.85rem; color:var(--muted); margin-bottom:4px;">POPULATION PERCENTILE RANK</div>
        <div id="resPercentile" style="font-size:2rem; font-weight:700; color:var(--gold); margin-bottom:8px;">50.0th Percentile</div>
        <div id="resRarity" style="font-size:1rem; color:var(--text); margin-bottom:6px;">Exact population median (higher than 50 out of 100 people)</div>
        <div id="resClassification" style="font-size:0.9rem; color:var(--muted);">Wechsler Classification: Average (0.00 SD)</div>
      </div>
    </div>

    <h2>How the normal CDF algorithm calculates percentiles</h2>
    <p>In statistical psychometrics, the probability density function (PDF) for a standard normal distribution is given by:</p>
    <p style="text-align:center; font-family:'Space Grotesk',sans-serif; color:var(--gold); font-size:1.1rem; margin:16px 0;">
      <em>f(z) = (1 / √(2π)) · e^(-z² / 2)</em>
    </p>
    <p>Where <em>z = (Score - 100) / 15</em>. To find the cumulative percentile, our engine calculates the integral of this function from -∞ to <em>z</em> using the Abramowitz and Stegun rational approximation (Formula 26.2.17), achieving maximum error |ε(x)| < 7.5 × 10⁻⁸.</p>

    <h2>Reference benchmark percentiles</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>IQ Score</th>
          <th>Z-Score</th>
          <th>Percentile</th>
          <th>Population Standing</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>145</strong></td><td>+3.00</td><td>99.87th</td><td>Top 0.13% (1 in 740)</td></tr>
        <tr><td><strong>130</strong></td><td>+2.00</td><td>97.72nd</td><td>Top 2.28% (Mensa cutoff)</td></tr>
        <tr><td><strong>115</strong></td><td>+1.00</td><td>84.13th</td><td>Top 15.87% (High Average)</td></tr>
        <tr><td><strong>100</strong></td><td>0.00</td><td>50.00th</td><td>Exact Median (50 out of 100)</td></tr>
        <tr><td><strong>85</strong></td><td>-1.00</td><td>15.87th</td><td>Bottom 15.87%</td></tr>
        <tr><td><strong>70</strong></td><td>-2.00</td><td>2.28th</td><td>Bottom 2.28%</td></tr>
      </tbody>
    </table>
  `,
  customScript: `
  <script>
    function normalCdf(z) {
      if (z === 0) return 0.5;
      const sign = z < 0 ? -1 : 1;
      const x = Math.abs(z);
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

    function updateBellCurve(score) {
      const minScore = 52, maxScore = 148, baselineY = 160, topY = 20;
      function scoreToX(s) { return 30 + ((s - minScore) / (maxScore - minScore)) * 500; }
      function pdf(z) { return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z); }
      const maxPdf = pdf(0);
      function scoreToY(s) {
        const z = (s - 100) / 15;
        return baselineY - (pdf(z) / maxPdf) * (baselineY - topY);
      }

      let curvePath = "M " + scoreToX(minScore) + " " + baselineY;
      let shadePath = "M " + scoreToX(minScore) + " " + baselineY;

      for (let s = minScore; s <= maxScore; s += 1) {
        const x = scoreToX(s).toFixed(1);
        const y = scoreToY(s).toFixed(1);
        curvePath += " L " + x + " " + y;
        if (s <= score) {
          shadePath += " L " + x + " " + y;
        }
      }

      const scoreX = scoreToX(score).toFixed(1);
      const scoreY = scoreToY(score).toFixed(1);
      shadePath += " L " + scoreX + " " + baselineY + " Z";

      document.getElementById('svgCurvePath').setAttribute('d', curvePath);
      document.getElementById('svgShadePath').setAttribute('d', shadePath);
      
      const line = document.getElementById('svgIndicatorLine');
      line.setAttribute('x1', scoreX);
      line.setAttribute('x2', scoreX);
      line.setAttribute('y1', scoreY);
      line.setAttribute('y2', baselineY);

      const dot = document.getElementById('svgIndicatorDot');
      dot.setAttribute('cx', scoreX);
      dot.setAttribute('cy', scoreY);
    }

    function calculate() {
      const input = document.getElementById('iqInput');
      let score = parseFloat(input.value);
      if (isNaN(score) || score < 55) score = 55;
      if (score > 145) score = 145;
      input.value = score;
      document.getElementById('iqSlider').value = score;

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
      
      updateBellCurve(score);
    }

    document.getElementById('calcBtn').addEventListener('click', calculate);
    document.getElementById('iqInput').addEventListener('input', calculate);
    document.getElementById('iqSlider').addEventListener('input', function() {
      document.getElementById('iqInput').value = this.value;
      calculate();
    });

    calculate();
  </script>`,
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
  title: 'High IQ & Genius Range: Scores, Cutoffs & Mensa | IQ Test',
  description: 'What IQ score qualifies as genius? Understand gifted cutoffs, Mensa qualifying scores (SD 15 vs SD 16), and the statistical limits of high-IQ tests.',
  canonical: 'https://iq-test.icu/iq-scores/high-iq-genius-range',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'High IQ & Genius Range' }
  ],
  article: {
    headline: 'High IQ and Genius Range: Score Cutoffs, Mensa, and Rarity',
    about: [
      { "@type": "Thing", "name": "Genius", "sameAs": "https://en.wikipedia.org/wiki/Genius" },
      { "@type": "Organization", "name": "Mensa International", "sameAs": "https://en.wikipedia.org/wiki/Mensa_International" }
    ],
    citation: ["https://en.wikipedia.org/wiki/Mensa_International"]
  },
  h1: 'High IQ and Genius Range: Cutoffs, Societies, and Rarity',
  answerBlock: 'In modern psychometrics, there is no official clinical diagnosis called "genius." However, an IQ score of 130 or higher (the top 2.28% of the population, or +2.00 standard deviations) is classified as Very Superior or Gifted, and serves as the standard entrance criterion for high-IQ societies like Mensa.',
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">🏆 High-IQ Societies & Cutoffs</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">Mensa Cutoff (Top 2%)</div>
          <div class="fact-value">IQ 130 (SD 15) / 132 (SD 16)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Intertel (Top 1%)</div>
          <div class="fact-value">IQ 135 (SD 15)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Triple Nine Society (Top 0.1%)</div>
          <div class="fact-value">IQ 146 (SD 15) / 149 (SD 16)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Mega Society (Top 0.0001%)</div>
          <div class="fact-value">IQ 171 (1 in a million, experimental)</div>
        </div>
      </div>
    </div>

    <h2>Why clinical psychometrics avoids the term 'genius'</h2>
    <p>While early 20th-century psychologists like Lewis Terman used "genius" for scores above 140, contemporary clinical psychology has abandoned the label. Scientific consensus recognizes that transformative genius requires an interplay of domain-specific expertise, immense persistence, creative divergence, and cultural timing — attributes that cannot be measured by a 60-minute standardized IQ test.</p>

    <h2>The statistical limits of testing extreme high IQ</h2>
    <p>Scores above 145 (+3 SD) or 160 (+4 SD) encounter severe psychometric ceilings. Because norming samples typically encompass a few thousand individuals, there are not enough test subjects at +4 SD (1 in 31,500 people) to reliably calibrate individual item discrimination.</p>

    <h2>Comparing high-IQ score ranges</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>IQ Range (SD 15)</th>
          <th>Classification</th>
          <th>Percentile</th>
          <th>High-IQ Society Equivalent</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>130 – 134</strong></td>
          <td>Moderately Gifted</td>
          <td>98th to 98.9th percentile</td>
          <td>Mensa International</td>
        </tr>
        <tr>
          <td><strong>135 – 144</strong></td>
          <td>Highly Gifted</td>
          <td>99.0th to 99.8th percentile</td>
          <td>Intertel</td>
        </tr>
        <tr>
          <td><strong>145 – 159</strong></td>
          <td>Exceptionally Gifted</td>
          <td>99.87th to 99.996th percentile</td>
          <td>Triple Nine Society / Prometheus</td>
        </tr>
        <tr>
          <td><strong>160+</strong></td>
          <td>Profoundly Gifted</td>
          <td>99.997th percentile and above</td>
          <td>Mega Society / Epimetheus</td>
        </tr>
      </tbody>
    </table>

    <h2>Learn more about cognitive potential</h2>
    <p>To explore how historical thinkers demonstrated extraordinary reasoning, visit our directory of <a href="/historical-figures-iq">historical figures' IQ estimates</a> or analyze the <a href="/iq-scores/what-is-a-good-iq-score">good IQ score benchmarks</a>.</p>
  `,
  faqs: [
    {
      q: "Can you be a genius with an average IQ score?",
      a: "Yes. Groundbreaking achievements in literature, art, and entrepreneurship frequently stem from domain mastery, creative originality, and grit rather than outlier IQ scores."
    },
    {
      q: "What is the highest verified score on standard tests?",
      a: "Most modern clinical adult batteries (such as the WAIS-IV) cap their deviation score calculation at 160."
    }
  ]
});

// T4.13 — /iq-scores/iq-score-by-age
buildHtmlPage({
  relPath: 'iq-scores/iq-score-by-age.html',
  title: 'IQ Score by Age: How Cognitive Abilities Change | IQ Test',
  description: 'How does IQ change with age? Explore fluid vs. crystallized intelligence, Cattell-Horn-Carroll theory, and how age-based norming groups operate.',
  canonical: 'https://iq-test.icu/iq-scores/iq-score-by-age',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores', url: 'https://iq-test.icu/iq-scores/' },
    { name: 'IQ Score by Age' }
  ],
  article: {
    headline: 'IQ Score by Age: Fluid vs. Crystallized Intelligence Lifespan Trajectories',
    about: [
      { "@type": "Thing", "name": "Fluid and crystallized intelligence", "sameAs": "https://en.wikipedia.org/wiki/Fluid_and_crystallized_intelligence" },
      { "@type": "Thing", "name": "Cattell–Horn–Carroll theory", "sameAs": "https://en.wikipedia.org/wiki/Cattell%E2%80%93Horn%E2%80%93Carroll_theory" }
    ],
    citation: [
      "https://en.wikipedia.org/wiki/Fluid_and_crystallized_intelligence",
      "https://en.wikipedia.org/wiki/Cattell%E2%80%93Horn%E2%80%93Carroll_theory"
    ]
  },
  h1: 'IQ Score by Age: How Cognitive Abilities Shift Across Life',
  answerBlock: 'Your standardized deviation IQ score remains relatively stable across adulthood because IQ is always calculated relative to your specific age group. However, your underlying cognitive architecture changes significantly: fluid intelligence (processing speed, pattern recognition) peaks in your early twenties, while crystallized intelligence (vocabulary, verbal reasoning) continues expanding into your sixties.',
  bodyHtml: `
    <div class="quick-facts-card">
      <div class="quick-facts-header">📈 Lifespan Cognitive Trajectory</div>
      <div class="quick-facts-grid">
        <div class="fact-item">
          <div class="fact-label">Fluid Intelligence (Gf) Peak</div>
          <div class="fact-value">Ages 20 – 25 (Processing speed, matrix reasoning)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Crystallized Intelligence (Gc) Peak</div>
          <div class="fact-value">Ages 55 – 70 (Vocabulary, accumulated knowledge)</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Age Norming Method</div>
          <div class="fact-value">Calibrated within 5-to-10-year peer cohorts</div>
        </div>
        <div class="fact-item">
          <div class="fact-label">Deviation Stability</div>
          <div class="fact-value">Test-retest correlation r ≈ 0.70–0.80 across adulthood</div>
        </div>
      </div>
    </div>

    <h2>How age-based norming works</h2>
    <p>When you complete a clinical IQ test like the WAIS-IV, your raw points are not compared against a universal pool of all humans regardless of age. Instead, psychometricians split standardisation samples into age brackets (e.g., 20–24, 25–29, 30–34, up to 85–90). An average performance within your specific age bracket converts to an IQ of 100.</p>

    <h2>Fluid vs. crystallized intelligence across the lifespan</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Cognitive Dimension</th>
          <th>What It Represents</th>
          <th>Peak Age Range</th>
          <th>Lifespan Trajectory</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fluid Intelligence (Gf)</strong></td>
          <td>Novel problem solving, nonverbal matrix reasoning, mental rotation</td>
          <td>Ages 20 – 25</td>
          <td>Gradual linear decline starting in early 30s</td>
        </tr>
        <tr>
          <td><strong>Processing Speed (Gs)</strong></td>
          <td>Rapid visual scanning, symbol matching, reaction time</td>
          <td>Ages 18 – 22</td>
          <td>Steepest age-related decline</td>
        </tr>
        <tr>
          <td><strong>Crystallized Intelligence (Gc)</strong></td>
          <td>Vocabulary, verbal comprehension, domain knowledge, analogies</td>
          <td>Ages 55 – 70</td>
          <td>Continues rising through middle adulthood; highly resilient</td>
        </tr>
        <tr>
          <td><strong>Working Memory (Gwm)</strong></td>
          <td>Holding and manipulating information simultaneously in mind</td>
          <td>Ages 25 – 35</td>
          <td>Moderate decline in late adulthood</td>
        </tr>
      </tbody>
    </table>

    <h2>Why composite IQ scores remain remarkably stable</h2>
    <p>Because crystallized intelligence rises during the exact decades when fluid processing speed begins to slow down, an individual's overall cognitive performance balances out across their working life. Longitudinal studies (such as the Seattle Longitudinal Study) have shown that intellectual deviation rankings remain remarkably consistent across multiple decades.</p>
    <p>To explore how specific reasoning domains function, read about <a href="/cognitive-skills/verbal-reasoning">verbal reasoning</a>, <a href="/cognitive-skills/pattern-recognition">pattern recognition</a>, and the <a href="/iq-scores/average-iq">average IQ benchmarks</a>.</p>
  `,
  faqs: [
    {
      q: "Does your IQ drop as you get older?",
      a: "Your raw processing speed slows down with age, but because IQ is normed against your same-age peers, your deviation IQ score remains relatively stable throughout adulthood."
    },
    {
      q: "Which cognitive skills peak latest in life?",
      a: "Verbal comprehension, vocabulary, and practical wisdom (crystallized intelligence) peak latest, typically between ages 55 and 70."
    }
  ]
});

// Hub A Index — /iq-scores/ (public/iq-scores/index.html)
buildHtmlPage({
  relPath: 'iq-scores/index.html',
  title: 'IQ Scores & Scale Guide: Ranges & Percentiles | IQ Test',
  description: 'Understand IQ scores, bell curve charts, percentiles, Wechsler classifications, and age trajectories in our comprehensive psychometrics guide.',
  canonical: 'https://iq-test.icu/iq-scores/',
  breadcrumbs: [
    { name: 'Home', url: 'https://iq-test.icu/' },
    { name: 'IQ Scores' }
  ],
  article: {
    headline: 'IQ Scores & Psychometric Distribution: Complete Reference Guide',
    about: [
      { "@type": "Thing", "name": "Intelligence quotient", "sameAs": "https://en.wikipedia.org/wiki/Intelligence_quotient" }
    ]
  },
  h1: 'IQ Scores & Scale Guide: Understanding Cognitive Metrics',
  answerBlock: 'Welcome to the definitive IQ scores guide. Explore the psychometric mechanics of deviation scoring, population percentiles, Gaussian normal distributions, and high-IQ classifications across our comprehensive collection of articles and interactive calculators designed for self-insight and educational discovery.',
  bodyHtml: `
    <h2>Explore our IQ score resources</h2>
    <div class="figure-grid">
      <div class="figure-card">
        <h3><a href="/iq-scores/what-is-a-good-iq-score">What Is a Good IQ Score?</a></h3>
        <p>Learn standard deviation ranges, Wechsler classifications, and what score ranges mean in daily life.</p>
        <a href="/iq-scores/what-is-a-good-iq-score">Read Guide →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/iq-scores/iq-scale-chart">Full IQ Scale Chart</a></h3>
        <p>Complete normal distribution conversion table mapping scores 55–145 to exact percentiles and rarity.</p>
        <a href="/iq-scores/iq-scale-chart">View Chart →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/iq-scores/iq-percentile-calculator">Interactive Percentile Calculator</a></h3>
        <p>Interactive tool calculating exact percentiles with real-time Gaussian normal curve visualization.</p>
        <a href="/iq-scores/iq-percentile-calculator">Use Calculator →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/iq-scores/average-iq">Average IQ & Flynn Effect</a></h3>
        <p>Understand why 100 is the mathematical benchmark and how population scores shift over decades.</p>
        <a href="/iq-scores/average-iq">Explore Norms →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/iq-scores/high-iq-genius-range">High IQ & Genius Range</a></h3>
        <p>Mensa cutoffs, gifted score tiers, and the statistical limits of testing extreme cognitive performance.</p>
        <a href="/iq-scores/high-iq-genius-range">Read Analysis →</a>
      </div>
      <div class="figure-card">
        <h3><a href="/iq-scores/iq-score-by-age">IQ Score by Age</a></h3>
        <p>Fluid vs. crystallized intelligence trajectories across childhood, adulthood, and retirement.</p>
        <a href="/iq-scores/iq-score-by-age">Learn Trajectories →</a>
      </div>
    </div>
  `,
  faqs: [
    {
      q: "What is the standard deviation on modern IQ tests?",
      a: "Most contemporary clinical assessments (such as the WAIS-IV) use a standard deviation of 15 points with a mean of 100."
    },
    {
      q: "What percentile represents a score of 130?",
      a: "An IQ of 130 represents the 97.72nd percentile (top 2.28% of the population), meeting the entrance threshold for Mensa."
    }
  ]
});

console.log('HUB A (IQ Scores) generation complete.');
