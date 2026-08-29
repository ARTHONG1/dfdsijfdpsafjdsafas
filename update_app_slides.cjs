const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `  { id: 17, title: '우리 팀의 발견 4가지', category: '공유' },
  { id: 18, title: '새로운 친구의 키 예측하기', category: '마지막 도전' },
  { id: 19, title: '나만의 예측 공식 만들기', category: '다음 탐구' },`;

const newStr = `  { id: 17, title: '우리 팀의 발견 4가지', category: '공유' },
  { id: 18, title: '우리 팀 데이터 분석 결과', category: '자율 탐구 제출' },
  { id: 19, title: '우리 반 모둠별 결과 모아보기', category: '대시보드' },
  { id: 20, title: '새로운 친구의 키 예측하기', category: '마지막 도전' },
  { id: 21, title: '나만의 예측 공식 만들기', category: '다음 탐구' },`;

content = content.replace(targetStr, newStr);

// In App.tsx, the slide components are usually mapped by `currentSlideData.id === X`
// We need to shift the conditions:
content = content.replace(/currentSlideData\.id === 18/g, 'currentSlideData.id === 20');
content = content.replace(/currentSlideData\.id === 19/g, 'currentSlideData.id === 21');

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Slides updated");
