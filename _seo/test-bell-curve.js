function generateBellCurveSvg(score) {
  const minScore = 52;
  const maxScore = 148;
  const width = 560;
  const height = 180;
  const baselineY = 160;
  const topY = 20;

  function scoreToX(s) {
    return 30 + ((s - minScore) / (maxScore - minScore)) * 500;
  }

  function pdf(z) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
  }

  const maxPdf = pdf(0);

  function scoreToY(s) {
    const z = (s - 100) / 15;
    const p = pdf(z);
    return baselineY - (p / maxPdf) * (baselineY - topY);
  }

  let curvePath = `M ${scoreToX(minScore)} ${baselineY}`;
  let shadePath = `M ${scoreToX(minScore)} ${baselineY}`;

  for (let s = minScore; s <= maxScore; s += 1) {
    const x = scoreToX(s);
    const y = scoreToY(s);
    curvePath += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    if (s <= score) {
      shadePath += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }

  const scoreX = scoreToX(score);
  const scoreY = scoreToY(score);
  shadePath += ` L ${scoreX.toFixed(1)} ${baselineY} Z`;

  return { curvePath, shadePath, scoreX, scoreY };
}

const res = generateBellCurveSvg(115);
console.log('Bell curve SVG generated successfully. Curve length:', res.curvePath.length, 'Shade length:', res.shadePath.length);
