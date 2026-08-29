const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Update import
content = content.replace(
  `import { BlankPaperSlide } from './components/BlankPaperSlide';`,
  `import { BlankPaperSlide } from './components/BlankPaperSlide';\nimport { DataVisualizationSlide } from './components/DataVisualizationSlide';`
);

// Update title
content = content.replace(
  `{ id: 10, title: '자유 기록장', category: '탐구 ① · 추가' },`,
  `{ id: 10, title: '우리 반 데이터 분석 결과', category: '탐구 ① · 분석' },`
);

// Update rendering block
const oldRender = `{currentSlideData.id === 10 && (
                <BlankPaperSlide
                  pageNumber={1}
                  slideTitle={studentData.blankSlide1Title || ''}
                  valueTitle={studentData.blankSlide1Title || ''}
                  valueContent={studentData.blankSlide1Content || ''}
                  onChangeTitle={(val) => handleInputChange('blankSlide1Title', val)}
                  onChangeContent={(val) => handleInputChange('blankSlide1Content', val)}
                  defaultTitle="추가 탐구 기록"
                  defaultSubtitle="자뼈 길이 측정 후 떠오른 생각이나 궁금한 점을 자유롭게 기록해보세요."
                />
              )}`;

const newRender = `{currentSlideData.id === 10 && (
                <DataVisualizationSlide sheetData={sheetData} />
              )}`;

content = content.replace(oldRender, newRender);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
