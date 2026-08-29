const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Update SLIDES array
content = content.replace(
  `{ id: 9, title: '나의 자뼈 길이를 재어 봅시다', category: '탐구 ① · 측정', timerDuration: 600 },`,
  `{ id: 9, title: '나의 자뼈 길이를 재어 봅시다', category: '탐구 ① · 측정', timerDuration: 600 },\n  { id: 10, title: '자유 기록장', category: '탐구 ① · 추가' },`
);

content = content.replace(`{ id: 10, title: '자뼈와 키 사이의 관계 관찰', category: '탐구 ① · 관찰' },`, `{ id: 11, title: '자뼈와 키 사이의 관계 관찰', category: '탐구 ① · 관찰' },`);
content = content.replace(`{ id: 11, title: '정말 자뼈가 최고일까요?', category: '탐구 확장' },`, `{ id: 12, title: '정말 자뼈가 최고일까요?', category: '탐구 확장' },`);
content = content.replace(`{ id: 12, title: '나만의 신체 부위 선택', category: '탐구 ②' },`, `{ id: 13, title: '나만의 신체 부위 선택', category: '탐구 ②' },`);
content = content.replace(`{ id: 13, title: '가설 세우기 및 측정 계획', category: '탐구 ② · 계획' },`, `{ id: 14, title: '가설 세우기 및 측정 계획', category: '탐구 ② · 계획' },`);
content = content.replace(`{ id: 14, title: '친구들의 데이터 모으기', category: '탐구 ② · 데이터 수집', timerDuration: 1500 },`, `{ id: 15, title: '친구들의 데이터 모으기', category: '탐구 ② · 데이터 수집', timerDuration: 1500 },`);
content = content.replace(`{ id: 15, title: '숫자 속에서 규칙 찾기', category: '탐구 ② · 발견' },`, `{ id: 16, title: '숫자 속에서 규칙 찾기', category: '탐구 ② · 발견' },`);
content = content.replace(`{ id: 16, title: '우리 팀의 발견 4가지', category: '공유' },`, `{ id: 17, title: '우리 팀의 발견 4가지', category: '공유' },`);
content = content.replace(`{ id: 17, title: '새로운 친구의 키 예측하기', category: '마지막 도전' },`, `{ id: 18, title: '새로운 친구의 키 예측하기', category: '마지막 도전' },`);
content = content.replace(`{ id: 18, title: '나만의 예측 공식 만들기', category: '다음 탐구' },`, `{ id: 19, title: '나만의 예측 공식 만들기', category: '다음 탐구' },`);

// Update logic
content = content.replace(`if (currentIndex === 8) {`, `if (currentSlideData.id === 9) {`);
content = content.replace(`{currentIndex === 0 && (`, `{currentSlideData.id === 1 && (`);
content = content.replace(`{currentIndex === 1 && (`, `{currentSlideData.id === 2 && (`);
content = content.replace(`{currentIndex === 2 && (`, `{currentSlideData.id === 3 && (`);
content = content.replace(`{currentIndex === 3 && (`, `{currentSlideData.id === 4 && (`);
content = content.replace(`{currentIndex === 4 && (`, `{currentSlideData.id === 5 && (`);
content = content.replace(`{currentIndex === 5 && (`, `{currentSlideData.id === 6 && (`);
content = content.replace(`{currentIndex === 6 && (`, `{currentSlideData.id === 7 && (`);
content = content.replace(`{currentIndex === 7 && (`, `{currentSlideData.id === 8 && (`);
content = content.replace(`{currentIndex === 8 && (`, `{currentSlideData.id === 9 && (`);

// Insert Slide 10 rendering
const slide10Render = `
              {/* SLIDE 10: Blank Paper added after slide 9 */}
              {currentSlideData.id === 10 && (
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
              )}
`;

content = content.replace(
  `{currentIndex === 9 && (`,
  slide10Render + `              {currentSlideData.id === 11 && (`
);

content = content.replace(`{currentIndex === 10 && (`, `{currentSlideData.id === 12 && (`);
content = content.replace(`{currentIndex === 30 && (`, `{currentSlideData.id === 13 && (`);
content = content.replace(`{currentIndex === 31 && (`, `{currentSlideData.id === 14 && (`);
content = content.replace(`{currentIndex === 32 && (`, `{currentSlideData.id === 15 && (`);
content = content.replace(`{currentIndex === 33 && (`, `{currentSlideData.id === 16 && (`);
content = content.replace(`{currentIndex === 34 && (`, `{currentSlideData.id === 17 && (`);
content = content.replace(`{currentIndex === 35 && (`, `{currentSlideData.id === 18 && (`);
content = content.replace(`{currentIndex === 36 && (`, `{currentSlideData.id === 19 && (`);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
