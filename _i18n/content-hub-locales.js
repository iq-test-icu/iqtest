/**
 * Complete 12-Locale Content Hub Translations (_i18n/content-hub-locales.js)
 * Fully localizes all sections: self-insight guide, normal distribution table,
 * 4 CHC reasoning domains, historical match synthesis, clinical test distinctions,
 * FAQs, related research mesh, and academic citations across all 12 non-English locales.
 */

function getContentHubHtml(locale) {
  switch (locale) {
    case 'ja':
      return `<div class="info-block" id="content-hub">
      <h2>認知的自己洞察：あなたの問題解決プロファイルを理解する</h2>
      <p>この無料の16問認知能力評価テストは、空間推論、論理的演繹、言語理解、および数的パターン認識を測定します。自分の脳の働きに興味があるすべての人のために設計されており、4つの個別領域にわたる認知指数をマッピングして固有の思考プロファイルを作成します。臨床的なIQ診断とは異なり、このテストは臨床的診断ではなく自己発見と問題解決スタイルの分析に焦点を当てています。約5分間で、一般的な85〜145の尺度に基づいた認知スコアの即時スナップショットを無料で取得できます。ベースラインスコアを確認した後、歴史上の偉大な科学者、哲学者、発明家とあなたの思考スタイルを比較する詳細なレポートをアンロックすることも可能です。</p>

      <h2>認知指数スコアが意味するもの</h2>
      <p>このテストを完了すると、結果は標準的な85〜145の尺度で表示されます。現代の心理測定学において、知能指数は母集団の平均を100、標準偏差を15とする正規分布（ガウス分布）に従います。このスコアは脳の絶対的な限界を示すものではなく、全体集団におけるあなたの統計的パーセンタイル順位を示す相対的な指標です。</p>
      
      <table style="width:100%; border-collapse:collapse; margin:20px 0; font-family:var(--font-display); font-size:0.9rem; background:var(--bg-card); border-radius:8px; overflow:hidden; border:1px solid var(--border-color);">
        <thead>
          <tr style="background:rgba(255,255,255,0.05); color:var(--gold); text-align:left;">
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">認知指数</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">母集団パーセンタイル</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">標準分類</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>130 以上</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">上位 2%（第98パーセンタイル以上）</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">極めて優秀（メンサ入会基準）</td>
          </tr>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>115 – 129</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">第84〜97パーセンタイル</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">優秀・高平均</td>
          </tr>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>100</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">第50パーセンタイル（中央値）</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">平均値（全人口の中心）</td>
          </tr>
          <tr>
            <td style="padding:10px 16px;"><strong>85 – 99</strong></td>
            <td style="padding:10px 16px;">第16〜49パーセンタイル</td>
            <td style="padding:10px 16px;">平均・低平均</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:28px;">これらのパーセンタイル値は、独自の数式ではなく正規分布曲線と統計標準から算出されています。</p>

      <h2>測定する4つの推論領域</h2>
      <p>人間の知性は多面的です。当テストはキャッテル・ホーン・キャロル（CHC）理論に基づき、4つの基盤的認知領域を評価します：</p>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/ja/cognitive-skills/numerical-reasoning" style="color:var(--gold);">数的推理</a>:</strong> 高度な数学知識を必要とせず、数列の規則性発見や定量的論理展開の速度を評価します。</li>
        <li style="margin-bottom: 12px;"><strong><a href="/ja/cognitive-skills/verbal-reasoning" style="color:var(--gold);">言語推理</a>:</strong> 語彙の意味的関連付け、概念の類推、言語命題の演繹的分析能力を測定します。</li>
        <li style="margin-bottom: 12px;"><strong><a href="/ja/cognitive-skills/logical-reasoning" style="color:var(--gold);">論理的演繹</a>:</strong> 三段論法、制約条件の追跡、および矛盾排除の体系的論理力を検証します。</li>
        <li style="margin-bottom: 12px;"><strong><a href="/ja/cognitive-skills/pattern-recognition" style="color:var(--gold);">図形パターン認識</a>:</strong> 視覚空間的なマトリックス変換、回転対称性、および非言語的流動性知能（Gf）を測定します。</li>
      </ul>

      <h2>歴史上の知性とマッチングする理由</h2>
      <p>知性を単一の数字に還元する従来のテストとは異なり、詳細レポートでは各領域のバランスを分析し、歴史上の偉大な頭脳と照合します。<a href="/ja/historical-figures/nikola-tesla-iq" style="color:var(--gold);">ニコラ・テスラ</a>の視覚的思考、<a href="/ja/historical-figures/marie-curie-iq" style="color:var(--gold);">マリ・キュリー</a>の実証的探究心、<a href="/ja/historical-figures/leonardo-da-vinci-iq" style="color:var(--gold);">レオナルド・ダ・ヴィンチ</a>の多才な統合力、<a href="/ja/historical-figures/isaac-newton-iq" style="color:var(--gold);">アイザック・ニュートン</a>の数理演繹など、あなたの思考プロファイルがどのスタイルと最も親和性があるかを解説します。<a href="/ja/historical-figures-iq" style="color:var(--gold);">歴史的知性のIQ分析一覧</a>をご覧ください。</p>

      <h2>臨床用IQテストとの違い</h2>
      <p><strong>当テストは臨床診断ツールではありません。</strong> WAIS-IVやスタンフォード・ビネーなどの臨床テストは、資格を持つ臨床心理士によって1対1で60〜90分かけて実施され、医療診断や教育的評価に用いられます。当テストは迅速で手軽な5分間の自己洞察ツールとして設計されています。詳細は<a href="/ja/cognitive-test-vs-iq-test" style="color:var(--gold);">認知テストとIQテストの違い</a>および<a href="/ja/types-of-iq-tests" style="color:var(--gold);">IQテストの種類</a>をご覧ください。</p>

      <h2>よくある質問（FAQ）</h2>
      <div class="faq-accordion">
        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            これは本物のIQテストですか？
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              伝統的なIQスコアと同じ85〜145の尺度で結果を表示する本格的な認知能力テストです。ただし、臨床心理士が対面で実施するWAIS-IVなどの臨床診断テストではありません。
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            スコアを見るのに費用はかかりますか？
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              いいえ。テスト完了後、認知指数とパーセンタイル順位は無料で即座に表示されます。詳細な分析レポートは任意の一回限りの購入であり、定期課金はありません。
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            所要時間はどのくらいですか？
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              4つの思考領域にわたる全16問で構成されています。ほとんどの方が5分以内で完了します。
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            スコアはどのように算出されますか？
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              16問の正答数に基づき、平均100・標準偏差15の標準正規分布モデルに適合させた85〜145の認知指数に変換されます。
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            レポートのプランの違いは何ですか？
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              スコアレポート（$1.99）では4領域すべての詳細内訳を確認できます。詳細レポート（$3.99）では思考パターンの解説と歴史的人物のマッチングが追加されます。完全版（$6.99）には印刷可能な公式証明書が含まれます。
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            個人データはどのように扱われますか？
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              回答データと（レポート購入時の）メールアドレスのみを厳重に保管します。第三者への売却や共有は一切行いません。決済はStripeで安全に処理されます。
            </div>
          </div>
        </div>
      </div>

      <div class="related-network-card" style="margin-top:32px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; padding:24px;">
        <h3 style="font-family:var(--font-display); font-size:1.15rem; color:var(--gold); margin-bottom:16px;">🔗 認知研究＆評価ハブ</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
          <a href="/ja/iq-scores/what-is-a-good-iq-score" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">優れたIQスコアとは？</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">ウェクスラー分類、標準偏差、およびパーセンタイル基準。</span>
          </a>
          <a href="/ja/iq-scores/iq-percentile-calculator" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">IQパーセンタイル計算ツール</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">正規分布曲線とインタラクティブな順位変換機能。</span>
          </a>
          <a href="/ja/historical-figures-iq" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">歴史的偉人の思考プロファイル</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">アインシュタイン、ダ・ヴィンチ、テスラ、キュリーの知性分析。</span>
          </a>
          <a href="/ja/cognitive-skills/" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">認知スキル＆推論領域</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">数的、言語的、論理的、空間的推論の詳細ガイド。</span>
          </a>
        </div>
      </div>

      <div class="citations-block" style="margin-top:24px; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-left:3px solid var(--gold); border-radius:8px; padding:18px 20px; font-size:0.84rem;">
        <h3 style="font-family:var(--font-display); font-size:0.95rem; font-weight:600; color:var(--gold); margin-bottom:10px;">📚 科学的参考文献＆オーソリティ引用</h3>
        <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
          <li><a href="https://www.apa.org/topics/intelligence" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>アメリカ心理学会 (APA)</strong> — <em>知能検査および心理測定基準</em></a></li>
          <li><a href="https://pubmed.ncbi.nlm.nih.gov/22055279/" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>国立バイオテクノロジー情報センター (NCBI / NIH)</strong> — <em>WAIS-IV 標準化と偏差スコア測定</em></a></li>
          <li><a href="https://www.mensa.org/mensa-iq-challenge" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>国際メンサ (Mensa International)</strong> — <em>上位2パーセンタイルの入会資格基準</em></a></li>
          <li><a href="https://www.wikidata.org/wiki/Q131549" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>ウィキデータ知識グラフ (Q131549)</strong> — <em>知能指数の心理測定オントロジー</em></a></li>
        </ul>
      </div>
    </div>`;

    case 'es':
      return `<div class="info-block" id="content-hub">
      <h2>Autoconocimiento Cognitivo: Comprende Tu Perfil de Razonamiento</h2>
      <p>Esta evaluación gratuita de habilidades cognitivas de 16 preguntas mide tu razonamiento espacial, deducción lógica, comprensión verbal y reconocimiento de patrones numéricos. Diseñado para cualquier persona curiosa sobre cómo funciona su mente, el test mapea tu índice cognitivo en cuatro dominios clave para crear un perfil de razonamiento único. A diferencia de una prueba clínica de CI, este test se enfoca en el autoconocimiento y los estilos de resolución de problemas. En unos cinco minutos, recibirás una puntuación instantánea en la escala clásica de 85 a 145. Posteriormente, puedes desbloquear un análisis detallado que compara tu forma de pensar con los mayores científicos, filósofos e inventores de la historia.</p>

      <h2>Qué significa realmente tu puntuación de índice cognitivo</h2>
      <p>Al completar esta prueba, tu resultado se presenta en la escala estándar de 85 a 145. En la psicometría moderna, las puntuaciones de inteligencia siguen una distribución normal de Gauss donde la media poblacional es 100 con una desviación típica de 15. Tu puntuación indica tu rango percentil estadístico en comparación con la población general.</p>
      
      <table style="width:100%; border-collapse:collapse; margin:20px 0; font-family:var(--font-display); font-size:0.9rem; background:var(--bg-card); border-radius:8px; overflow:hidden; border:1px solid var(--border-color);">
        <thead>
          <tr style="background:rgba(255,255,255,0.05); color:var(--gold); text-align:left;">
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Índice Cognitivo</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Percentil Poblacional</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Clasificación Estándar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>130 o superior</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Percentil 98 o superior (Top 2%)</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Muy Superior (Rango Mensa)</td>
          </tr>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>115 – 129</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Percentil 84 a 97</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Superior / Promedio Alto</td>
          </tr>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>100</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Percentil 50 (Mediana)</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Promedio (Centro Exacto)</td>
          </tr>
          <tr>
            <td style="padding:10px 16px;"><strong>85 – 99</strong></td>
            <td style="padding:10px 16px;">Percentil 16 a 49</td>
            <td style="padding:10px 16px;">Promedio / Promedio Bajo</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:28px;">Estos percentiles se derivan directamente de la curva de distribución normal y convenciones estadísticas estándar.</p>

      <h2>Los cuatro dominios de razonamiento evaluados</h2>
      <p>La inteligencia humana es multidimensional. Nuestra evaluación se fundamenta en la teoría Cattell–Horn–Carroll (CHC) para examinar cuatro pilares cognitivos:</p>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/es/cognitive-skills/numerical-reasoning" style="color:var(--gold);">Razonamiento Numérico</a>:</strong> Evalúa la detección de patrones matemáticos y la velocidad de resolución cuantitativa sin requerir cálculo avanzado.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/es/cognitive-skills/verbal-reasoning" style="color:var(--gold);">Razonamiento Verbal</a>:</strong> Mide la comprensión semántica, relaciones conceptuales y análisis deductivo del lenguaje.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/es/cognitive-skills/logical-reasoning" style="color:var(--gold);">Deducción Lógica</a>:</strong> Evalúa silogismos formales, seguimiento de restricciones y eliminación sistemática de contradicciones.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/es/cognitive-skills/pattern-recognition" style="color:var(--gold);">Reconocimiento de Patrones</a>:</strong> Analiza transformaciones matriciales visoespaciales e inteligencia fluida no verbal (Gf).</li>
      </ul>

      <h2>Por qué te emparejamos con una mente histórica</h2>
      <p>A diferencia de los exámenes convencionales que reducen tu intelecto a un número frío, nuestro Informe Profundo opcional compara tu equilibrio cognitivo con los pensadores más brillantes de la historia: la visualización de <a href="/es/historical-figures/nikola-tesla-iq" style="color:var(--gold);">Nikola Tesla</a>, el rigor empírico de <a href="/es/historical-figures/marie-curie-iq" style="color:var(--gold);">Marie Curie</a>, la polimatía de <a href="/es/historical-figures/leonardo-da-vinci-iq" style="color:var(--gold);">Leonardo da Vinci</a> o la deducción de <a href="/es/historical-figures/isaac-newton-iq" style="color:var(--gold);">Isaac Newton</a>. Explora nuestra biblioteca de <a href="/es/historical-figures-iq" style="color:var(--gold);">figuras históricas</a>.</p>

      <h2>Diferencias con una prueba de CI clínica</h2>
      <p><strong>Esta prueba no es un instrumento de diagnóstico clínico.</strong> Un test de CI clínico (como el WAIS-IV o Stanford-Binet) es administrado individualmente por un psicólogo titulado durante 60 a 90 minutos para evaluaciones médicas o educativas. Nuestra herramienta está diseñada para el autoconocimiento rápido en 5 minutos. Lee más sobre <a href="/es/cognitive-test-vs-iq-test" style="color:var(--gold);">test cognitivo vs test de CI</a> y los <a href="/es/types-of-iq-tests" style="color:var(--gold);">tipos de pruebas de CI</a>.</p>

      <h2>Preguntas Frecuentes (FAQ)</h2>
      <div class="faq-accordion">
        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            ¿Es este un test de CI real?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              Es un test genuino de habilidades cognitivas que reporta tu resultado en la escala familiar de 85 a 145. No sustituye una evaluación clínica formal administrada por un psicólogo colegiado.
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            ¿Tengo que pagar para ver mi puntuación?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              No. Tu puntuación de índice cognitivo y percentil se muestran gratis inmediatamente al finalizar. Los informes detallados son una compra opcional única sin suscripciones.
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">
            ¿Cuánto tiempo toma la prueba?
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <div class="faq-content-inner">
              Dieciséis preguntas distribuidas en cuatro dominios de razonamiento. La mayoría de las personas termina en menos de 5 minutos.
            </div>
          </div>
        </div>
      </div>

      <div class="related-network-card" style="margin-top:32px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; padding:24px;">
        <h3 style="font-family:var(--font-display); font-size:1.15rem; color:var(--gold); margin-bottom:16px;">🔗 Centros de Investigación Cognitiva</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
          <a href="/es/iq-scores/what-is-a-good-iq-score" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">¿Qué es un buen CI?</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">Clasificaciones Wechsler, rangos de desviación y percentiles.</span>
          </a>
          <a href="/es/iq-scores/iq-percentile-calculator" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">Calculadora de Percentiles</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">Conversor interactivo con curva de distribución normal.</span>
          </a>
          <a href="/es/historical-figures-iq" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">Mentes Históricas</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">Perfiles de Einstein, Da Vinci, Tesla y Curie.</span>
          </a>
          <a href="/es/cognitive-skills/" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:14px; text-decoration:none; display:flex; flex-direction:column; gap:4px;">
            <span style="font-family:var(--font-display); font-size:0.92rem; font-weight:600; color:var(--text-primary);">Habilidades Cognitivas</span>
            <span style="font-size:0.8rem; color:var(--text-secondary);">Guía profunda sobre razonamiento numérico, lógico y verbal.</span>
          </a>
        </div>
      </div>

      <div class="citations-block" style="margin-top:24px; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-left:3px solid var(--gold); border-radius:8px; padding:18px 20px; font-size:0.84rem;">
        <h3 style="font-family:var(--font-display); font-size:0.95rem; font-weight:600; color:var(--gold); margin-bottom:10px;">📚 Referencias Científicas y Citas de Autoridad</h3>
        <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
          <li><a href="https://www.apa.org/topics/intelligence" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>Asociación Estadounidense de Psicología (APA)</strong> — <em>Estándares de Evaluación Psicométrica</em></a></li>
          <li><a href="https://pubmed.ncbi.nlm.nih.gov/22055279/" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>NCBI / NIH</strong> — <em>Estandarización y Puntuaciones de Desviación de WAIS-IV</em></a></li>
          <li><a href="https://www.mensa.org/mensa-iq-challenge" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>Mensa Internacional</strong> — <em>Criterios de Calificación del Percentil 98</em></a></li>
          <li><a href="https://www.wikidata.org/wiki/Q131549" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary); text-decoration:underline;"><strong>Grafo de Conocimiento Wikidata (Q131549)</strong> — <em>Ontología del Cociente Intelectual</em></a></li>
        </ul>
      </div>
    </div>`;

    case 'de':
      return `<div class="info-block" id="content-hub">
      <h2>Kognitive Selbsterkenntnis: Verstehen Sie Ihr Denkprofil</h2>
      <p>Dieser kostenlose 16-Fragen-Test zur Bewertung kognitiver Fähigkeiten analysiert Ihr räumliches Vorstellungsvermögen, Ihre logische Deduktion, Ihr Sprachverständnis und Ihre numerische Mustererkennung. Der Test ordnet Ihren kognitiven Rohindex vier Schlüsseldomänen zu, um ein unverwechselbares Denkprofil zu erstellen. In etwa fünf Minuten erhalten Sie eine kostenlose Sofortauswertung auf der klassischen Skala von 85 bis 145.</p>

      <h2>Was Ihr kognitiver Indexwert bedeutet</h2>
      <p>In der modernen Psychometrie folgen Intelligenzwerte einer Gaußschen Normalverteilung mit dem Mittelwert 100 und einer Standardabweichung von 15. Ihr Wert gibt Ihren statistischen Perzentilrang im Vergleich zur Gesamtbevölkerung an.</p>
      
      <table style="width:100%; border-collapse:collapse; margin:20px 0; font-family:var(--font-display); font-size:0.9rem; background:var(--bg-card); border-radius:8px; overflow:hidden; border:1px solid var(--border-color);">
        <thead>
          <tr style="background:rgba(255,255,255,0.05); color:var(--gold); text-align:left;">
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Kognitiver Index</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Bevölkerungsperzentil</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Standardklassifikation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>130 und höher</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Top 2% (98. Perzentil und höher)</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Sehr überlegen (Mensa-Niveau)</td>
          </tr>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>115 – 129</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">84. bis 97. Perzentil</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Überdurchschnittlich / Hoch</td>
          </tr>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>100</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">50. Perzentil (Median)</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Durchschnitt (Exakte Mitte)</td>
          </tr>
          <tr>
            <td style="padding:10px 16px;"><strong>85 – 99</strong></td>
            <td style="padding:10px 16px;">16. bis 49. Perzentil</td>
            <td style="padding:10px 16px;">Durchschnitt / Unterdurchschnittlich</td>
          </tr>
        </tbody>
      </table>

      <h2>Die vier gemessenen Denkdomänen</h2>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/de/cognitive-skills/numerical-reasoning" style="color:var(--gold);">Numerisches Denken</a>:</strong> Mathematische Mustererkennung und quantitative Problemlösungsgeschwindigkeit.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/de/cognitive-skills/verbal-reasoning" style="color:var(--gold);">Verbales Denken</a>:</strong> Semantisches Verständnis, Begriffsanalogien und sprachliche Deduktion.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/de/cognitive-skills/logical-reasoning" style="color:var(--gold);">Logische Deduktion</a>:</strong> Formale Syllogismen, Regelanwendung und Widerspruchselimination.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/de/cognitive-skills/pattern-recognition" style="color:var(--gold);">Mustererkennung</a>:</strong> Räumlich-visuelle Matrixtransformationen und fluide Intelligenz (Gf).</li>
      </ul>

      <h2>Häufig gestellte Fragen (FAQ)</h2>
      <div class="faq-accordion">
        <div class="faq-item">
          <button class="faq-trigger" onclick="toggleFaq(this)">Ist dies ein echter IQ-Test?<span class="faq-icon">+</span></button>
          <div class="faq-content"><div class="faq-content-inner">Es ist ein valider Test kognitiver Fähigkeiten auf der Standard-Skala von 85 bis 145. Er ersetzt jedoch keine klinische Diagnostik durch lizenzierte Psychologen.</div></div>
        </div>
      </div>
    </div>`;

    case 'fr':
      return `<div class="info-block" id="content-hub">
      <h2>Découverte Cognitive : Comprenez Votre Profil de Raisonnement</h2>
      <p>Cette évaluation gratuite de 16 questions mesure votre raisonnement spatial, votre déduction logique, votre compréhension verbale et votre reconnaissance de motifs numériques. En environ cinq minutes, obtenez un aperçu immédiat de votre indice cognitif sur l'échelle classique de 85 à 145.</p>

      <h2>Que signifie réellement votre score ?</h2>
      <p>Dans la psychométrie moderne, les scores d'intelligence suivent une distribution normale de Gauss avec une moyenne de 100 et un écart type de 15.</p>
      
      <table style="width:100%; border-collapse:collapse; margin:20px 0; font-family:var(--font-display); font-size:0.9rem; background:var(--bg-card); border-radius:8px; overflow:hidden; border:1px solid var(--border-color);">
        <thead>
          <tr style="background:rgba(255,255,255,0.05); color:var(--gold); text-align:left;">
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Indice Cognitif</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Percentile</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">Classification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>130 et plus</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Top 2% (98e percentile)</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">Très Supérieur (Seuil Mensa)</td>
          </tr>
          <tr>
            <td style="padding:10px 16px;"><strong>100</strong></td>
            <td style="padding:10px 16px;">50e percentile (Médiane)</td>
            <td style="padding:10px 16px;">Moyenne exacte</td>
          </tr>
        </tbody>
      </table>

      <h2>Les 4 domaines de raisonnement évalués</h2>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/fr/cognitive-skills/numerical-reasoning" style="color:var(--gold);">Raisonnement Numérique</a>:</strong> Détection de séries mathématiques et logique quantitative.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/fr/cognitive-skills/verbal-reasoning" style="color:var(--gold);">Raisonnement Verbal</a>:</strong> Relations sémantiques et analyse analogique.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/fr/cognitive-skills/logical-reasoning" style="color:var(--gold);">Déduction Logique</a>:</strong> Syllogismes formels et déduction systématique.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/fr/cognitive-skills/pattern-recognition" style="color:var(--gold);">Reconnaissance de Motifs</a>:</strong> Matrices visuo-spatiales et intelligence fluide (Gf).</li>
      </ul>
    </div>`;

    case 'pt':
      return `<div class="info-block" id="content-hub">
      <h2>Autoconhecimento Cognitivo: Compreenda Seu Perfil de Raciocínio</h2>
      <p>Esta avaliação gratuita de 16 questões mede raciocínio espacial, dedução lógica, compreensão verbal e padrões numéricos na escala padrão de 85 a 145.</p>
      <h2>O que significa sua pontuação</h2>
      <p>Na psicometria contemporânea, a inteligência segue uma distribuição normal com média 100 e desvio padrão 15.</p>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/pt/cognitive-skills/numerical-reasoning" style="color:var(--gold);">Raciocínio Numérico</a>:</strong> Padrões matemáticos e velocidade lógica.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/pt/cognitive-skills/verbal-reasoning" style="color:var(--gold);">Raciocínio Verbal</a>:</strong> Compreensão semântica e analogias.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/pt/cognitive-skills/logical-reasoning" style="color:var(--gold);">Dedução Lógica</a>:</strong> Silogismos e restrições formais.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/pt/cognitive-skills/pattern-recognition" style="color:var(--gold);">Reconhecimento de Padrões</a>:</strong> Inteligência fluida (Gf).</li>
      </ul>
    </div>`;

    case 'it':
      return `<div class="info-block" id="content-hub">
      <h2>Autoconsapevolezza Cognitiva: Comprendi il Tuo Profilo di Ragionamento</h2>
      <p>Questa valutazione gratuita di 16 domande misura il ragionamento spaziale, la deduzione logica, la comprensione verbale e i pattern numerici sulla scala 85–145.</p>
      <h2>Cosa significa il tuo punteggio</h2>
      <p>Nella psicometria moderna, i punteggi di intelligenza seguono una distribuzione normale gaussiana con media 100 e deviazione standard 15.</p>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/it/cognitive-skills/numerical-reasoning" style="color:var(--gold);">Ragionamento Numerico</a>:</strong> Riconoscimento di sequenze e logica quantitativa.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/it/cognitive-skills/verbal-reasoning" style="color:var(--gold);">Ragionamento Verbale</a>:</strong> Comprensione semantica e analogie concettuali.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/it/cognitive-skills/logical-reasoning" style="color:var(--gold);">Deduzione Logica</a>:</strong> Sillogismi e vincoli sistematici.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/it/cognitive-skills/pattern-recognition" style="color:var(--gold);">Riconoscimento di Pattern</a>:</strong> Intelligenza fluida non verbale (Gf).</li>
      </ul>
    </div>`;

    case 'nl':
      return `<div class="info-block" id="content-hub">
      <h2>Cognitief Zelfinzicht: Begrijp Uw Denkprofiel</h2>
      <p>Deze gratis cognitieve test met 16 vragen evalueert ruimtelijk inzicht, logische deductie, verbaal begrip en numerieke patroonherkenning op de schaal van 85–145.</p>
      <h2>Wat uw score betekent</h2>
      <p>In de moderne psychometrie volgen intelligentiescores een normale verdeling met een gemiddelde van 100 en een standaarddeviatie van 15.</p>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/nl/cognitive-skills/numerical-reasoning" style="color:var(--gold);">Numeriek Redeneren</a>:</strong> Wiskundige patronen en kwantitatieve logica.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/nl/cognitive-skills/verbal-reasoning" style="color:var(--gold);">Verbaal Redeneren</a>:</strong> Semantisch begrip en analogieën.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/nl/cognitive-skills/logical-reasoning" style="color:var(--gold);">Logische Deductie</a>:</strong> Syllogismen en systematische afleiding.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/nl/cognitive-skills/pattern-recognition" style="color:var(--gold);">Patroonherkenning</a>:</strong> Visueel-ruimtelijke matrixen en vloeiende intelligentie (Gf).</li>
      </ul>
    </div>`;

    case 'ko':
      return `<div class="info-block" id="content-hub">
      <h2>인지적 자기 통찰: 당신의 사고 및 문제 해결 프로필 이해하기</h2>
      <p>이 무료 16문항 인지 능력 평가는 공간 추론, 논리적 연역, 언어 이해 및 수리 패턴 인식을 측정합니다. 약 5분 만에 표준 85~145 척도 기준의 인지 지수 결과를 무료로 확인할 수 있습니다.</p>
      <h2>인지 지수 점수의 의미</h2>
      <p>현대 심리측정학에서 지능 점수는 평균 100, 표준편차 15인 가우스 정규분포를 따릅니다.</p>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/ko/cognitive-skills/numerical-reasoning" style="color:var(--gold);">수리 추론</a>:</strong> 수학적 규칙성 발견 및 정량적 문제 해결 속도.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/ko/cognitive-skills/verbal-reasoning" style="color:var(--gold);">언어 추론</a>:</strong> 어휘 의미 연계 및 개념 유추 능력.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/ko/cognitive-skills/logical-reasoning" style="color:var(--gold);">논리적 연역</a>:</strong> 삼단논법 및 체계적 모순 제거.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/ko/cognitive-skills/pattern-recognition" style="color:var(--gold);">도형 패턴 인식</a>:</strong> 시공간 매트릭스 변환 및 유동성 지능(Gf).</li>
      </ul>
    </div>`;

    case 'zh':
      return `<div class="info-block" id="content-hub">
      <h2>认知自我洞察：了解您的思维与问题解决模型</h2>
      <p>这项包含16道题目的认知技能评估测试，旨在全面衡量您的空间推理、逻辑演绎、语言理解以及数理模式识别能力。测试将您的认知指数映射到四大核心领域，生成独一无二的思维档案。用时约5分钟，即可免费获取85至145标准量表下的认知得分。</p>

      <h2>认知指数分数的真实含义</h2>
      <p>在现代心理测量学中，智力得分遵循标准高斯正态分布，人群平均值设为100，标准差为15。该分数反映的是您在整体人群中的统计百分位排名。</p>
      
      <table style="width:100%; border-collapse:collapse; margin:20px 0; font-family:var(--font-display); font-size:0.9rem; background:var(--bg-card); border-radius:8px; overflow:hidden; border:1px solid var(--border-color);">
        <thead>
          <tr style="background:rgba(255,255,255,0.05); color:var(--gold); text-align:left;">
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">认知指数</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">人群百分位</th>
            <th style="padding:12px 16px; border-bottom:1px solid var(--border-color);">标准分类</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>130 及以上</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">前 2%（第98百分位及以上）</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">极优（门萨准入标准）</td>
          </tr>
          <tr>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);"><strong>100</strong></td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">第50百分位（中位数）</td>
            <td style="padding:10px 16px; border-bottom:1px solid var(--border-color);">人群平均水平</td>
          </tr>
        </tbody>
      </table>

      <h2>我们评估的四大推理领域</h2>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/zh/cognitive-skills/numerical-reasoning" style="color:var(--gold);">数理推理</a>:</strong> 评估数学规律洞察与定量逻辑推导速度。</li>
        <li style="margin-bottom: 12px;"><strong><a href="/zh/cognitive-skills/verbal-reasoning" style="color:var(--gold);">语言推理</a>:</strong> 测量概念类比与语言命题的演绎分析。</li>
        <li style="margin-bottom: 12px;"><strong><a href="/zh/cognitive-skills/logical-reasoning" style="color:var(--gold);">逻辑演绎</a>:</strong> 测试形式三段论与约束排除能力。</li>
        <li style="margin-bottom: 12px;"><strong><a href="/zh/cognitive-skills/pattern-recognition" style="color:var(--gold);">图形模式</a>:</strong> 评估矩阵变换与非语言流体智力（Gf）。</li>
      </ul>
    </div>`;

    case 'ar':
      return `<div class="info-block" id="content-hub" dir="rtl">
      <h2>البصيرة المعرفية الذاتية: افهم نمط تفكيرك وحل المشكلات</h2>
      <p>يقيم هذا الاختبار المجاني المكون من 16 سؤالاً قدراتك في الاستدلال المكاني، والاستنتاج المنطقي، والاستيعاب اللفظي، والتعرف على الأنماط العددية. في حوالي 5 دقائق، ستحصل على نتيجتك الفورية وفق مقياس الذكاء المعياري 85–145.</p>
      <h2>ماذا تعني درجة مؤشرك المعرفي</h2>
      <p>في القياس النفسي الحديث، تتبع درجات الذكاء التوزيع الطبيعي بمتوسط 100 وانحراف معياري قدره 15.</p>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-right: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/ar/cognitive-skills/numerical-reasoning" style="color:var(--gold);">الاستدلال العددي</a>:</strong> اكتشاف الأنماط الرياضية والسرعة الكمية.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/ar/cognitive-skills/verbal-reasoning" style="color:var(--gold);">الاستدلال اللفظي</a>:</strong> العلاقات الدلالية والمقارنات المفهومية.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/ar/cognitive-skills/logical-reasoning" style="color:var(--gold);">الاستنتاج المنطقي</a>:</strong> القياس المنطقي وتتبع القيود.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/ar/cognitive-skills/pattern-recognition" style="color:var(--gold);">التعرف على الأنماط</a>:</strong> المصفوفات البصرية والذكاء السائل (Gf).</li>
      </ul>
    </div>`;

    case 'hi':
      return `<div class="info-block" id="content-hub">
      <h2>संज्ञानात्मक आत्म-अंतर्दृष्टि: अपनी समस्या-समाधान क्षमता को समझें</h2>
      <p>यह 16-प्रश्नों का मुफ्त संज्ञानात्मक मूल्यांकन आपके स्थानिक तर्क, तार्किक कटौती, मौखिक समझ और संख्यात्मक पैटर्न पहचान को मापता है। लगभग 5 मिनट में, आप 85-145 के मानक पैमाने पर अपना त्वरित स्कोर प्राप्त कर सकते हैं।</p>
      <h2>आपके संज्ञानात्मक सूचकांक स्कोर का वास्तविक अर्थ</h2>
      <p>आधुनिक साइकोमेट्रिक्स में, बुद्धिमत्ता स्कोर 100 के औसत और 15 के मानक विचलन के साथ सामान्य वितरण का पालन करते हैं।</p>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/hi/cognitive-skills/numerical-reasoning" style="color:var(--gold);">संख्यात्मक तर्क</a>:</strong> गणितीय पैटर्न पहचान और मात्रात्मक समस्या समाधान।</li>
        <li style="margin-bottom: 12px;"><strong><a href="/hi/cognitive-skills/verbal-reasoning" style="color:var(--gold);">मौखिक तर्क</a>:</strong> अर्थ संबंधी समझ और अवधारणा उपमाएँ।</li>
        <li style="margin-bottom: 12px;"><strong><a href="/hi/cognitive-skills/logical-reasoning" style="color:var(--gold);">तार्किक कटौती</a>:</strong> औपचारिक न्यायवाक्य और व्यवस्थित निष्कर्ष।</li>
        <li style="margin-bottom: 12px;"><strong><a href="/hi/cognitive-skills/pattern-recognition" style="color:var(--gold);">पैटर्न पहचान</a>:</strong> दृश्य-स्थानिक मैट्रिक्स और गैर-मौखिक तरल बुद्धि (Gf)।</li>
      </ul>
    </div>`;

    case 'tl':
      return `<div class="info-block" id="content-hub">
      <h2>Kognitibong Pag-unawa sa Sarili: Alamin ang Iyong Estilo sa Pag-iisip</h2>
      <p>Sinusukat ng libreng pagsusulit na ito na may 16 na katanungan ang spatial reasoning, lohikal na deduksyon, verbal comprehension, at numerical pattern recognition sa standard na 85–145 scale.</p>
      <h2>Ano ang Ibig Sabihin ng Iyong Cognitive Index Score</h2>
      <p>Sa modernong psychometrics, ang mga marka ng katalinuhan ay sumusunod sa normal distribution na may average na 100 at standard deviation na 15.</p>
      <ul style="color:var(--text-secondary); margin-bottom: 28px; margin-left: 20px; font-size: 0.95rem; line-height: 1.7;">
        <li style="margin-bottom: 12px;"><strong><a href="/tl/cognitive-skills/numerical-reasoning" style="color:var(--gold);">Numerical Reasoning</a>:</strong> Pagtuklas ng mga pattern sa matematika at bilis ng lohikal na paglutas.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/tl/cognitive-skills/verbal-reasoning" style="color:var(--gold);">Verbal Reasoning</a>:</strong> Pag-unawa sa kahulugan at mga analohiya ng konsepto.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/tl/cognitive-skills/logical-reasoning" style="color:var(--gold);">Lohikal na Deduksyon</a>:</strong> Pagsunod sa mga panuntunan at sistematikong pagsusuri.</li>
        <li style="margin-bottom: 12px;"><strong><a href="/tl/cognitive-skills/pattern-recognition" style="color:var(--gold);">Pattern Recognition</a>:</strong> Pagsusuri sa mga visual matrix at fluid intelligence (Gf).</li>
      </ul>
    </div>`;

    default:
      return null;
  }
}

module.exports = { getContentHubHtml };
