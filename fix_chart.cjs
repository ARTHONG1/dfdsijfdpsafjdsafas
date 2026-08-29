const fs = require('fs');
let content = fs.readFileSync('src/components/DataVisualizationSlide.tsx', 'utf-8');

const oldCode = `    const combinedChartData = [
      ...validData.map(d => ({ x: d.x, scatterY: d.y })),
      { x: domainX[0], lineY: m * domainX[0] + b },
      { x: domainX[1], lineY: m * domainX[1] + b }
    ].sort((a, b) => a.x - b.x);`;

const newCode = `    const combinedChartData = [
      { x: domainX[0], lineY: m * domainX[0] + b },
      ...validData.map(d => ({ x: d.x, scatterY: d.y, lineY: m * d.x + b })),
      { x: domainX[1], lineY: m * domainX[1] + b }
    ].sort((a, b) => a.x - b.x);`;

if (content.includes(oldCode)) {
  content = content.replace(oldCode, newCode);
  fs.writeFileSync('src/components/DataVisualizationSlide.tsx', content, 'utf-8');
  console.log("Chart fixed");
} else {
  console.log("Not found");
}
