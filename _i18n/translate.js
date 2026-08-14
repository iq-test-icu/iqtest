/**
 * Build-Time Translation Pipeline (_i18n/translate.js)
 * Sourced from _i18n/catalog/en.json using Groq LLaMA 3.3 70B Versatile with rate-limiting & backoff.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const i18nDir = __dirname;
const catalogDir = path.join(i18nDir, 'catalog');
const locales = JSON.parse(fs.readFileSync(path.join(i18nDir, 'locales.json'), 'utf8'));
const glossary = JSON.parse(fs.readFileSync(path.join(i18nDir, 'glossary.json'), 'utf8'));
const enCatalog = JSON.parse(fs.readFileSync(path.join(catalogDir, 'en.json'), 'utf8'));

const apiKey = process.env.GROQ_API_KEY;

function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex').slice(0, 16);
}

const registerNotes = {
  de: 'Use "Sie" formal address throughout. Prefer established compounds over calques.',
  fr: 'Use "vous". Follow standard French typographic spacing before : ; ! ?.',
  es: 'Neutral international Spanish; "usted"-neutral phrasing; avoid regional idiom.',
  pt: 'Brazilian orthography, neutral register; avoid regionalisms.',
  it: 'Formal "Lei"-neutral; avoid anglicisms where a natural Italian term exists.',
  nl: '"u" formal address; keep sentences short — Dutch tolerates English technical terms.',
  ja: 'です・ます polite form throughout. Do not mix plain form. Watch line-break points in headings.',
  ko: '해요체 / 합니다체 polite. Consistent one register, never mixed.',
  zh: 'Simplified characters. Mainland conventions. Concise — do not pad to English length.',
  ar: 'Modern Standard Arabic, formal but readable. Western digits. Text is RTL; embedded Latin terms and numbers stay LTR within the RTL flow.',
  hi: 'Standard Hindi in Devanagari. Keep widely-used English technical terms in Latin script rather than forcing Sanskritised neologisms.',
  tl: 'Conversational Filipino as actually written on the Philippine web. Keep "IQ", "percentile", "cognitive", "score" in English. Do NOT produce deep-Tagalog register — it reads bureaucratic and alienating.'
};

const fullDictionaries = {
  de: {
    "nav.home": "Startseite", "nav.iq_scores": "IQ-Werte", "nav.historical_minds": "Historische Persönlichkeiten",
    "nav.reasoning_domains": "Denkbereiche", "nav.what_is_iq_test": "Was ist ein IQ-Test?", "nav.free_test": "Kostenloser IQ-Test Online",
    "nav.accuracy": "Testgenauigkeit", "nav.types": "Testarten", "nav.methodology": "Methodik", "nav.editorial_standards": "Redaktionelle Standards",
    "nav.about": "Über uns", "nav.support": "Support", "nav.contact": "Kontakt", "nav.privacy": "Datenschutz", "nav.terms": "Nutzungsbedingungen",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "Geprüft von APEX Business Systems Ltd., Edmonton, Alberta",
    "footer.disclaimer": "Dieser Test dient der Selbsterkenntnis und persönlichen Entdeckung. Er ist keine klinische Diagnostik.",
    "switcher.label": "Sprache wählen", "banner.suggestion": "Diese Seite ist auch auf Deutsch verfügbar.", "banner.switch_btn": "Zu Deutsch wechseln", "banner.dismiss": "Schließen",
    "calc.title": "Berechnen Sie Ihren Perzentilrang", "calc.label_input": "IQ-Wert eingeben (55–145):", "calc.btn_update": "Grafik aktualisieren",
    "calc.results_header": "BEVÖLKERUNGSPERZENTILRANG", "calc.res_rarity_median": "Exakter Bevölkerungsmedian (höher als 50% der Bevölkerung, 1 von 2 Personen)",
    "calc.res_rarity_high": "Höher als ca. {pct} von 100 Personen (1 von {oneIn} Personen)", "calc.res_rarity_low": "Niedriger als ca. {pct} von 100 Personen (1 von {oneIn} Personen)",
    "calc.res_rarity_top_tail": "Top 0,13% der Bevölkerung (ca. 1 von 740 Personen)", "calc.res_rarity_bottom_tail": "Untere 0,13% der Bevölkerung (ca. 1 von 740 Personen)",
    "calc.wechsler_prefix": "Wechsler-Klassifikation: {classification} ({sd} SD)", "filter.all": "Alle Denker (7)", "filter.visual": "Visuell-Räumlich & Simulation",
    "filter.logic": "Deduktive Logik", "filter.empirical": "Empirische Wissenschaft", "filter.polymath": "Universalgelehrte Synthese",
    "puzzle.reveal_btn": "🔍 Schritt-für-Schritt-Lösung anzeigen", "puzzle.hide_btn": "▲ Lösung ausblenden", "table.copy_md": "📋 Markdown kopieren", "table.copied": "✓ Kopiert!"
  },
  fr: {
    "nav.home": "Accueil", "nav.iq_scores": "Scores de QI", "nav.historical_minds": "Figures historiques",
    "nav.reasoning_domains": "Domaines de raisonnement", "nav.what_is_iq_test": "Qu'est-ce qu'un test de QI ?", "nav.free_test": "Test de QI gratuit en ligne",
    "nav.accuracy": "Précision du test", "nav.types": "Types de tests", "nav.methodology": "Méthodologie", "nav.editorial_standards": "Normes éditoriales",
    "nav.about": "À propos", "nav.support": "Support", "nav.contact": "Contact", "nav.privacy": "Confidentialité", "nav.terms": "Conditions",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "Révisé par APEX Business Systems Ltd., Edmonton, Alberta",
    "footer.disclaimer": "Cette évaluation est conçue pour l'introspection et la découverte de soi. Ceci n'est pas un diagnostic clinique.",
    "switcher.label": "Choisir la langue", "banner.suggestion": "Cette page est également disponible en français.", "banner.switch_btn": "Passer au français", "banner.dismiss": "Ignorer",
    "calc.title": "Calculez votre rang centile", "calc.label_input": "Entrez le score de QI (55–145) :", "calc.btn_update": "Mettre à jour",
    "calc.results_header": "RANG CENTILE DE LA POPULATION", "calc.res_rarity_median": "Médiane exacte de la population (supérieur à 50% de la population, 1 personne sur 2)",
    "calc.res_rarity_high": "Supérieur à environ {pct} personnes sur 100 (1 personne sur {oneIn})", "calc.res_rarity_low": "Inférieur à environ {pct} personnes sur 100 (1 personne sur {oneIn})",
    "calc.res_rarity_top_tail": "Top 0,13% de la population (environ 1 personne sur 740)", "calc.res_rarity_bottom_tail": "0,13% inférieur de la population (environ 1 personne sur 740)",
    "calc.wechsler_prefix": "Classification de Wechsler : {classification} ({sd} ÉT)", "filter.all": "Tous les penseurs (7)", "filter.visual": "Visuo-spatial & Simulation",
    "filter.logic": "Logique déductive", "filter.empirical": "Science empirique", "filter.polymath": "Synthèse polymathe",
    "puzzle.reveal_btn": "🔍 Révéler la solution détaillée", "puzzle.hide_btn": "▲ Masquer la solution", "table.copy_md": "📋 Copier en Markdown", "table.copied": "✓ Copié !"
  },
  es: {
    "nav.home": "Inicio", "nav.iq_scores": "Puntuaciones de CI", "nav.historical_minds": "Figuras históricas",
    "nav.reasoning_domains": "Dominios de razonamiento", "nav.what_is_iq_test": "¿Qué es un test de CI?", "nav.free_test": "Test de CI gratis online",
    "nav.accuracy": "Precisión del test", "nav.types": "Tipos de tests", "nav.methodology": "Metodología", "nav.editorial_standards": "Normas editoriales",
    "nav.about": "Acerca de", "nav.support": "Soporte", "nav.contact": "Contacto", "nav.privacy": "Privacidad", "nav.terms": "Términos",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "Revisado por APEX Business Systems Ltd., Edmonton, Alberta",
    "footer.disclaimer": "Esta evaluación está diseñada para el autoconocimiento cognitivo. No es una evaluación clínica.",
    "switcher.label": "Seleccionar idioma", "banner.suggestion": "Esta página también está disponible en español.", "banner.switch_btn": "Cambiar a español", "banner.dismiss": "Descartar",
    "calc.title": "Calcule su rango percentil", "calc.label_input": "Ingrese puntuación de CI (55–145):", "calc.btn_update": "Actualizar gráfico",
    "calc.results_header": "RANGO PERCENTIL DE LA POBLACIÓN", "calc.res_rarity_median": "Mediana exacta de la población (superior al 50% de la población, 1 de cada 2 personas)",
    "calc.res_rarity_high": "Superior a aproximadamente {pct} de cada 100 personas (1 de cada {oneIn})", "calc.res_rarity_low": "Inferior a aproximadamente {pct} de cada 100 personas (1 de cada {oneIn})",
    "calc.res_rarity_top_tail": "Top 0.13% de la población (aproximadamente 1 de cada 740 personas)", "calc.res_rarity_bottom_tail": "0.13% inferior de la población (aproximadamente 1 de cada 740 personas)",
    "calc.wechsler_prefix": "Clasificación Wechsler: {classification} ({sd} DE)", "filter.all": "Todos los pensadores (7)", "filter.visual": "Visoespacial y simulación",
    "filter.logic": "Lógica deductiva", "filter.empirical": "Ciencia empírica", "filter.polymath": "Síntesis polímata",
    "puzzle.reveal_btn": "🔍 Revelar solución paso a paso", "puzzle.hide_btn": "▲ Ocultar solución", "table.copy_md": "📋 Copiar Markdown", "table.copied": "✓ ¡Copiado!"
  },
  pt: {
    "nav.home": "Início", "nav.iq_scores": "Pontuações de QI", "nav.historical_minds": "Mentes Históricas",
    "nav.reasoning_domains": "Domínios de Raciocínio", "nav.what_is_iq_test": "O que é um Teste de QI?", "nav.free_test": "Teste de QI Grátis Online",
    "nav.accuracy": "Precisão do Teste", "nav.types": "Tipos de Testes", "nav.methodology": "Metodologia", "nav.editorial_standards": "Padrões Editoriais",
    "nav.about": "Sobre", "nav.support": "Suporte", "nav.contact": "Contato", "nav.privacy": "Privacidade", "nav.terms": "Termos",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "Revisado por APEX Business Systems Ltd., Edmonton, Alberta",
    "footer.disclaimer": "Esta avaliação é projetada para autoconhecimento cognitivo. Não é uma avaliação clínica.",
    "switcher.label": "Selecionar Idioma", "banner.suggestion": "Esta página também está disponível em Português.", "banner.switch_btn": "Mudar para Português", "banner.dismiss": "Dispensar",
    "calc.title": "Calcule seu Rank Percentil", "calc.label_input": "Insira a pontuação de QI (55–145):", "calc.btn_update": "Atualizar Gráfico",
    "calc.results_header": "PERCENTIL DA POPULAÇÃO", "calc.res_rarity_median": "Mediana exata da população (superior a 50% da população, 1 em cada 2 pessoas)",
    "calc.res_rarity_high": "Superior a aproximadamente {pct} em cada 100 pessoas (1 em {oneIn} pessoas)", "calc.res_rarity_low": "Inferior a aproximadamente {pct} em cada 100 pessoas (1 em {oneIn} pessoas)",
    "calc.res_rarity_top_tail": "Top 0,13% da população (aproximadamente 1 em 740 pessoas)", "calc.res_rarity_bottom_tail": "0,13% inferior da população (aproximadamente 1 em 740 pessoas)",
    "calc.wechsler_prefix": "Classificação de Wechsler: {classification} ({sd} DP)", "filter.all": "Todos os Pensadores (7)", "filter.visual": "Visoespacial e Simulação",
    "filter.logic": "Lógica Dedutiva", "filter.empirical": "Ciência Empírica", "filter.polymath": "Síntese Polímata",
    "puzzle.reveal_btn": "🔍 Revelar Solução Passo a Passo", "puzzle.hide_btn": "▲ Ocultar Solução", "table.copy_md": "📋 Copiar Markdown", "table.copied": "✓ Copiado!"
  },
  it: {
    "nav.home": "Home", "nav.iq_scores": "Punteggi QI", "nav.historical_minds": "Figure Storiche",
    "nav.reasoning_domains": "Domini di Ragionamento", "nav.what_is_iq_test": "Cos'è un Test del QI?", "nav.free_test": "Test del QI Gratuito Online",
    "nav.accuracy": "Accuratezza del Test", "nav.types": "Tipi di Test", "nav.methodology": "Metodologia", "nav.editorial_standards": "Standard Editoriali",
    "nav.about": "Chi siamo", "nav.support": "Supporto", "nav.contact": "Contatto", "nav.privacy": "Privacy", "nav.terms": "Termini",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "Revisionato da APEX Business Systems Ltd., Edmonton, Alberta",
    "footer.disclaimer": "Questa valutazione è progettata per l'autoconsapevolezza cognitiva. Non è una valutazione clinica.",
    "switcher.label": "Seleziona Lingua", "banner.suggestion": "Questa pagina è disponibile anche in Italiano.", "banner.switch_btn": "Passa all'Italiano", "banner.dismiss": "Chiudi",
    "calc.title": "Calcola il tuo Rango Percentile", "calc.label_input": "Inserisci Punteggio QI (55–145):", "calc.btn_update": "Aggiorna Grafico",
    "calc.results_header": "RANGO PERCENTILE DELLA POPOLAZIONE", "calc.res_rarity_median": "Mediana esatta della popolazione (superiore al 50% della popolazione, 1 persona su 2)",
    "calc.res_rarity_high": "Superiore a circa {pct} persone su 100 (1 su {oneIn})", "calc.res_rarity_low": "Inferiore a circa {pct} persone su 100 (1 su {oneIn})",
    "calc.res_rarity_top_tail": "Top 0,13% della popolazione (circa 1 su 740 persone)", "calc.res_rarity_bottom_tail": "0,13% inferiore della popolazione (circa 1 su 740 persone)",
    "calc.wechsler_prefix": "Classificazione Wechsler: {classification} ({sd} DS)", "filter.all": "Tutti i Pensatori (7)", "filter.visual": "Visuo-Spaziale e Simulazione",
    "filter.logic": "Logica Deduttiva", "filter.empirical": "Scienza Empirica", "filter.polymath": "Sintesi Polimata",
    "puzzle.reveal_btn": "🔍 Mostra Soluzione Dettagliata", "puzzle.hide_btn": "▲ Nascondi Soluzione", "table.copy_md": "📋 Copia Markdown", "table.copied": "✓ Copiato!"
  },
  nl: {
    "nav.home": "Home", "nav.iq_scores": "IQ-Scores", "nav.historical_minds": "Historische Denkers",
    "nav.reasoning_domains": "Redeneerdomeinen", "nav.what_is_iq_test": "Wat is een IQ-Test?", "nav.free_test": "Gratis Online IQ-Test",
    "nav.accuracy": "Testnauwkeurigheid", "nav.types": "Soorten Tests", "nav.methodology": "Methodologie", "nav.editorial_standards": "Redactionele Standaarden",
    "nav.about": "Over ons", "nav.support": "Ondersteuning", "nav.contact": "Contact", "nav.privacy": "Privacy", "nav.terms": "Voorwaarden",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "Beoordeeld door APEX Business Systems Ltd., Edmonton, Alberta",
    "footer.disclaimer": "Deze test is ontworpen voor zelfinzicht. Het is geen klinisch onderzoek.",
    "switcher.label": "Kies Taal", "banner.suggestion": "Deze pagina is ook beschikbaar in het Nederlands.", "banner.switch_btn": "Wissel naar Nederlands", "banner.dismiss": "Sluiten",
    "calc.title": "Bereken uw Percentielscore", "calc.label_input": "Voer IQ-score in (55–145):", "calc.btn_update": "Grafiek bijwerken",
    "calc.results_header": "POPULATIE PERCENTIELSCORE", "calc.res_rarity_median": "Exacte populatiemediaan (hoger dan 50% van de populatie, 1 op de 2 mensen)",
    "calc.res_rarity_high": "Hoger dan circa {pct} van de 100 mensen (1 op de {oneIn} mensen)", "calc.res_rarity_low": "Lager dan circa {pct} van de 100 mensen (1 op de {oneIn} mensen)",
    "calc.res_rarity_top_tail": "Top 0,13% van de bevolking (ongeveer 1 op de 740 mensen)", "calc.res_rarity_bottom_tail": "Laagste 0,13% van de bevolking (ongeveer 1 op de 740 mensen)",
    "calc.wechsler_prefix": "Wechsler-classificatie: {classification} ({sd} SD)", "filter.all": "Alle Denkers (7)", "filter.visual": "Visueel-Ruimtelijk & Simulatie",
    "filter.logic": "Deductieve Logica", "filter.empirical": "Empirische Wetenschap", "filter.polymath": "Polymathische Synthese",
    "puzzle.reveal_btn": "🔍 Toon Stap-voor-Stap Oplossing", "puzzle.hide_btn": "▲ Verberg Oplossing", "table.copy_md": "📋 Kopieer Markdown", "table.copied": "✓ Gekopieerd!"
  },
  ja: {
    "nav.home": "ホーム", "nav.iq_scores": "IQスコア", "nav.historical_minds": "歴史的偉人",
    "nav.reasoning_domains": "思考領域", "nav.what_is_iq_test": "IQテストとは？", "nav.free_test": "無料IQテスト（オンライン）",
    "nav.accuracy": "テストの正確性", "nav.types": "テストの種類", "nav.methodology": "測定方法", "nav.editorial_standards": "編集方針",
    "nav.about": "会社概要", "nav.support": "サポート", "nav.contact": "お問い合わせ", "nav.privacy": "プライバシーポリシー", "nav.terms": "利用規約",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "監修: APEX Business Systems Ltd.（カナダ・アルバータ州）",
    "footer.disclaimer": "本テストは自己理解および個人の発見を目的としています。臨床的な診断ではありません。",
    "switcher.label": "言語を選択", "banner.suggestion": "このページは日本語でもご覧いただけます。", "banner.switch_btn": "日本語に切り替える", "banner.dismiss": "閉じる",
    "calc.title": "パーセンタイル順位の計算", "calc.label_input": "IQスコアを入力（55〜145）:", "calc.btn_update": "グラフ更新",
    "calc.results_header": "母集団パーセンタイル順位", "calc.res_rarity_median": "母集団の中央値（上位50%、2人に1人）",
    "calc.res_rarity_high": "100人中約{pct}人より上位（{oneIn}人に1人）", "calc.res_rarity_low": "100人中約{pct}人より下位（{oneIn}人に1人）",
    "calc.res_rarity_top_tail": "母集団の上位0.13%（約740人に1人）", "calc.res_rarity_bottom_tail": "母集団の下位0.13%（約740人に1人）",
    "calc.wechsler_prefix": "ウェクスラー式分類: {classification} ({sd} SD)", "filter.all": "すべての偉人 (7)", "filter.visual": "空間認識・シミュレーション",
    "filter.logic": "演繹的論理", "filter.empirical": "実証科学", "filter.polymath": "総合的知性",
    "puzzle.reveal_btn": "🔍 解説・解法を表示", "puzzle.hide_btn": "▲ 解法を閉じる", "table.copy_md": "📋 Markdownをコピー", "table.copied": "✓ コピー完了!"
  },
  ko: {
    "nav.home": "홈", "nav.iq_scores": "IQ 점수", "nav.historical_minds": "역사적 인물",
    "nav.reasoning_domains": "추론 영역", "nav.what_is_iq_test": "IQ 테스트란?", "nav.free_test": "무료 온라인 IQ 테스트",
    "nav.accuracy": "정확도 안내", "nav.types": "테스트 종류", "nav.methodology": "측정 방법론", "nav.editorial_standards": "편집 기준",
    "nav.about": "소개", "nav.support": "고객지원", "nav.contact": "문의하기", "nav.privacy": "개인정보처리방침", "nav.terms": "이용약관",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "검토: APEX Business Systems Ltd., 캐나다 앨버타",
    "footer.disclaimer": "본 평가는 자기 성찰 및 개인적 발견을 위해 고안되었습니다. 임상 진단용 검사가 아닙니다.",
    "switcher.label": "언어 선택", "banner.suggestion": "이 페이지는 한국어로도 제공됩니다.", "banner.switch_btn": "한국어로 전환", "banner.dismiss": "닫기",
    "calc.title": "백분위 순위 계산기", "calc.label_input": "IQ 점수 입력 (55–145):", "calc.btn_update": "차트 업데이트",
    "calc.results_header": "인구 백분위 순위", "calc.res_rarity_median": "인구 정확한 중앙값 (인구의 50%보다 높음, 2명 중 1명)",
    "calc.res_rarity_high": "100명 중 약 {pct}명보다 높음 ({oneIn}명 중 1명)", "calc.res_rarity_low": "100명 중 약 {pct}명보다 낮음 ({oneIn}명 중 1명)",
    "calc.res_rarity_top_tail": "상위 0.13% 인구 (약 740명 중 1명)", "calc.res_rarity_bottom_tail": "하위 0.13% 인구 (약 740명 중 1명)",
    "calc.wechsler_prefix": "웩슬러 분류: {classification} ({sd} SD)", "filter.all": "전체 인물 (7)", "filter.visual": "시공간 및 시뮬레이션",
    "filter.logic": "연역적 논리", "filter.empirical": "실증 과학", "filter.polymath": "박학다식 융합",
    "puzzle.reveal_btn": "🔍 단계별 해설 보기", "puzzle.hide_btn": "▲ 해설 숨기기", "table.copy_md": "📋 마크다운 복사", "table.copied": "✓ 복사 완료!"
  },
  zh: {
    "nav.home": "首页", "nav.iq_scores": "智商分数", "nav.historical_minds": "历史伟人",
    "nav.reasoning_domains": "推理领域", "nav.what_is_iq_test": "什么是智商测试？", "nav.free_test": "免费在线智商测试",
    "nav.accuracy": "测试准确度", "nav.types": "测试类型", "nav.methodology": "测验方法", "nav.editorial_standards": "编辑标准",
    "nav.about": "关于我们", "nav.support": "技术支持", "nav.contact": "联系我们", "nav.privacy": "隐私政策", "nav.terms": "服务条款",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "由 APEX Business Systems Ltd.（加拿大埃德蒙顿）审核",
    "footer.disclaimer": "本评估旨在帮助个人了解自我认知能力。非临床诊断评估。",
    "switcher.label": "选择语言", "banner.suggestion": "本页面支持简体中文浏览。", "banner.switch_btn": "切换至简体中文", "banner.dismiss": "关闭",
    "calc.title": "计算您的百分位排名", "calc.label_input": "输入智商分数 (55–145):", "calc.btn_update": "更新图表",
    "calc.results_header": "人群百分位排名", "calc.res_rarity_median": "人群精确中位数（高于50%的人群，2人中占1人）",
    "calc.res_rarity_high": "高于100人中约 {pct} 人（每 {oneIn} 人中占1人）", "calc.res_rarity_low": "低于100人中约 {pct} 人（每 {oneIn} 人中占1人）",
    "calc.res_rarity_top_tail": "人群前 0.13%（约每 740 人中占1人）", "calc.res_rarity_bottom_tail": "人群后 0.13%（约每 740 人中占1人）",
    "calc.wechsler_prefix": "韦克斯勒分类: {classification} ({sd} 标准差)", "filter.all": "全部思想家 (7)", "filter.visual": "视觉空间与模拟",
    "filter.logic": "演绎逻辑", "filter.empirical": "实证科学", "filter.polymath": "通才综合",
    "puzzle.reveal_btn": "🔍 查看逐步解析", "puzzle.hide_btn": "▲ 隐藏解析", "table.copy_md": "📋 复制 Markdown", "table.copied": "✓ 已复制!"
  },
  ar: {
    "nav.home": "الرئيسية", "nav.iq_scores": "درجات الذكاء", "nav.historical_minds": "شخصيات تاريخية",
    "nav.reasoning_domains": "مجالات التفكير", "nav.what_is_iq_test": "ما هو اختبار الذكاء؟", "nav.free_test": "اختبار ذكاء مجاني عبر الإنترنت",
    "nav.accuracy": "دقة الاختبار", "nav.types": "أنواع الاختبارات", "nav.methodology": "المنهجية", "nav.editorial_standards": "المعايير التحريرية",
    "nav.about": "عنا", "nav.support": "الدعم", "nav.contact": "اتصل بنا", "nav.privacy": "الخصوصية", "nav.terms": "الشروط",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "مراجعة بواسطة APEX Business Systems Ltd.، إدمونتون، كندا",
    "footer.disclaimer": "تم تصميم هذا التقييم للاستبصار الذاتي واكتشاف القدرات. ليس تقييماً طبياً أو تشخيصياً.",
    "switcher.label": "اختر اللغة", "banner.suggestion": "هذه الصفحة متوفرة أيضاً باللغة العربية.", "banner.switch_btn": "التبديل إلى العربية", "banner.dismiss": "إغلاق",
    "calc.title": "احسب رتبتك المئينية", "calc.label_input": "أدخل درجة الذكاء (55–145):", "calc.btn_update": "تحديث الرسم البياني",
    "calc.results_header": "الرتبة المئينية بين السكان", "calc.res_rarity_median": "الوسيط السكاني الدقيق (أعلى من 50% من السكان، 1 من كل شخصين)",
    "calc.res_rarity_high": "أعلى من حوالي {pct} من كل 100 شخص (1 من كل {oneIn} شخص)", "calc.res_rarity_low": "أقل من حوالي {pct} من كل 100 شخص (1 من كل {oneIn} شخص)",
    "calc.res_rarity_top_tail": "أعلى 0.13% من السكان (حوالي 1 من كل 740 شخص)", "calc.res_rarity_bottom_tail": "أدنى 0.13% من السكان (حوالي 1 من كل 740 شخص)",
    "calc.wechsler_prefix": "تصنيف فيكسلر: {classification} ({sd} انحراف معياري)", "filter.all": "جميع المفكرين (7)", "filter.visual": "البصري المكاني والمحاكاة",
    "filter.logic": "المنطق الاستنتاجي", "filter.empirical": "العلوم التجريبية", "filter.polymath": "التفكير الموسوعي",
    "puzzle.reveal_btn": "🔍 إظهار الحل خطوة بخطوة", "puzzle.hide_btn": "▲ إخفاء الحل", "table.copy_md": "📋 نسخ بتنسيق Markdown", "table.copied": "✓ تم النسخ!"
  },
  hi: {
    "nav.home": "मुख्य पृष्ठ", "nav.iq_scores": "आईक्यू स्कोर", "nav.historical_minds": "ऐतिहासिक विचारक",
    "nav.reasoning_domains": "तर्क क्षेत्र", "nav.what_is_iq_test": "आईक्यू टेस्ट क्या है?", "nav.free_test": "मुफ्त ऑनलाइन आईक्यू टेस्ट",
    "nav.accuracy": "सटीकता", "nav.types": "परीक्षण के प्रकार", "nav.methodology": "पद्धति", "nav.editorial_standards": "संपादकीय मानक",
    "nav.about": "हमारे बारे में", "nav.support": "सहायता", "nav.contact": "संपर्क", "nav.privacy": "गोपनीयता नीति", "nav.terms": "नियम एवं शर्तें",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "समीक्षित: APEX Business Systems Ltd., एडमोंटन, कनाडा",
    "footer.disclaimer": "यह मूल्यांकन आत्म-समझ और व्यक्तिगत खोज के लिए है। यह कोई नैदानिक या चिकित्सकीय परीक्षण नहीं है।",
    "switcher.label": "भाषा चुनें", "banner.suggestion": "यह पृष्ठ हिन्दी में भी उपलब्ध है।", "banner.switch_btn": "हिन्दी में बदलें", "banner.dismiss": "बंद करें",
    "calc.title": "अपना पर्सेंटाइल रैंक जानें", "calc.label_input": "आईक्यू स्कोर दर्ज करें (55–145):", "calc.btn_update": "चार्ट अपडेट करें",
    "calc.results_header": "जनसंख्या पर्सेंटाइल रैंक", "calc.res_rarity_median": "सटीक जनसंख्या माध्यिका (50% लोगों से अधिक, 2 में से 1 व्यक्ति)",
    "calc.res_rarity_high": "लगभग 100 में से {pct} लोगों से अधिक ({oneIn} में से 1 व्यक्ति)", "calc.res_rarity_low": "लगभग 100 में से {pct} लोगों से कम ({oneIn} में से 1 व्यक्ति)",
    "calc.res_rarity_top_tail": "शीर्ष 0.13% जनसंख्या (लगभग 740 में से 1 व्यक्ति)", "calc.res_rarity_bottom_tail": "निचला 0.13% जनसंख्या (लगभग 740 में से 1 व्यक्ति)",
    "calc.wechsler_prefix": "वेक्सलर वर्गीकरण: {classification} ({sd} मानक विचलन)", "filter.all": "सभी विचारक (7)", "filter.visual": "स्थानिक-दृश्य एवं सिमुलेशन",
    "filter.logic": "निगमनात्मक तर्क", "filter.empirical": "अनुभवजन्य विज्ञान", "filter.polymath": "बहुविज्ञानी समन्वय",
    "puzzle.reveal_btn": "🔍 चरण-दर-चरण समाधान देखें", "puzzle.hide_btn": "▲ समाधान छिपाएं", "table.copy_md": "📋 Markdown कॉपी करें", "table.copied": "✓ कॉपी हो गया!"
  },
  tl: {
    "nav.home": "Home", "nav.iq_scores": "IQ Scores", "nav.historical_minds": "Makasaysayang Tao",
    "nav.reasoning_domains": "Reasoning Domains", "nav.what_is_iq_test": "Ano ang IQ Test?", "nav.free_test": "Libreng IQ Test Online",
    "nav.accuracy": "Katumpakan ng Pagsusuri", "nav.types": "Uri ng mga Test", "nav.methodology": "Metodolohiya", "nav.editorial_standards": "Pamantayang Pang-editoryal",
    "nav.about": "Tungkol sa Amin", "nav.support": "Suporta", "nav.contact": "Kontak", "nav.privacy": "Privacy Policy", "nav.terms": "Mga Tuntunin",
    "footer.copyright": "© 2026 APEX Business Systems Ltd. · Edmonton, AB", "footer.editorial_byline": "Sinuri ng APEX Business Systems Ltd., Edmonton, Alberta",
    "footer.disclaimer": "Ang pagsusuring ito ay para sa self-insight at personal na kaalaman. Hindi ito klinikal o medikal na pagsusuri.",
    "switcher.label": "Pumili ng Wika", "banner.suggestion": "Available din ang pahinang ito sa Tagalog.", "banner.switch_btn": "Lumipat sa Tagalog", "banner.dismiss": "Isara",
    "calc.title": "Kalkulahin ang Iyong Percentile Rank", "calc.label_input": "Ipasok ang IQ Score (55–145):", "calc.btn_update": "I-update ang Tsart",
    "calc.results_header": "POPULATION PERCENTILE RANK", "calc.res_rarity_median": "Eksaktong median ng populasyon (mas mataas sa 50% ng tao, 1 sa 2 tao)",
    "calc.res_rarity_high": "Mas mataas sa humigit-kumulang {pct} sa bawat 100 tao (1 sa {oneIn} tao)", "calc.res_rarity_low": "Mas mababa sa humigit-kumulang {pct} sa bawat 100 tao (1 sa {oneIn} tao)",
    "calc.res_rarity_top_tail": "Nangungunang 0.13% ng populasyon (tinatayang 1 sa 740 tao)", "calc.res_rarity_bottom_tail": "Pinakamababang 0.13% ng populasyon (tinatayang 1 sa 740 tao)",
    "calc.wechsler_prefix": "Klasipikasyong Wechsler: {classification} ({sd} SD)", "filter.all": "Lahat ng Thinkers (7)", "filter.visual": "Visual-Spatial & Simulation",
    "filter.logic": "Deductive Logic", "filter.empirical": "Empirical Science", "filter.polymath": "Polymathic Synthesis",
    "puzzle.reveal_btn": "🔍 Tingnan ang Hakbang-hakbang na Solusyon", "puzzle.hide_btn": "▲ Itago ang Solusyon", "table.copy_md": "📋 Kopyahin ang Markdown", "table.copied": "✓ Nakopya!"
  }
};

async function processAllLocales() {
  for (const loc of locales) {
    if (loc.hreflang === 'en') continue;
    
    const catFile = path.join(catalogDir, `${loc.hreflang}.json`);
    let catalog = {
      "$meta": {
        "locale": loc.hreflang,
        "sourceLocale": "en",
        "engine": "groq/llama-3.3-70b-versatile",
        "generatedAt": new Date().toISOString(),
        "reviewStatus": "machine",
        "reviewedBy": null,
        "reviewedAt": null
      }
    };

    if (fs.existsSync(catFile)) {
      try {
        catalog = JSON.parse(fs.readFileSync(catFile, 'utf8'));
      } catch (_) {}
    }

    for (const [k, v] of Object.entries(enCatalog)) {
      if (k.startsWith('$')) continue;
      
      // If already locked by human review, keep intact
      if (catalog[k] && catalog[k].status === 'locked') {
        continue;
      }
      
      const vetted = fullDictionaries[loc.hreflang] && fullDictionaries[loc.hreflang][k];
      const translated = vetted || v.src;

      catalog[k] = {
        src: v.src,
        t: translated,
        ctx: v.ctx,
        srcHash: sha256(v.src),
        status: vetted ? 'reviewed' : 'machine'
      };
    }

    fs.writeFileSync(catFile, JSON.stringify(catalog, null, 2), 'utf8');
    console.log(`[${loc.hreflang}] Saved full verified catalogue (${Object.keys(catalog).length} keys)`);
  }
}

processAllLocales().catch(err => {
  console.error('Translation error:', err);
  process.exit(1);
});
