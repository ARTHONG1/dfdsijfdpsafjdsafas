const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add goToSlideById helper if not exists
if (!content.includes('goToSlideById')) {
  content = content.replace(
    'const [currentSlide, setCurrentSlide] = useState(0);',
    'const [currentSlide, setCurrentSlide] = useState(0);\n  const goToSlideById = (id: number) => {\n    const idx = slides.findIndex(s => s.id === id);\n    if (idx !== -1) setCurrentSlide(idx);\n  };'
  );
}

// 2. Slide 13 (id 13) button
const slide13End = `                      <input
                        id="reason-input"
                        type="text"
                        value={studentData.reason || ""}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        placeholder="왜 키와 관련 있을까요?"
                        className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[18px] sm:text-[22px] font-extrabold text-[#1f2933] py-1 px-1 outline-none"
                      />
                    </div>
                  </div>`;
const slide13Btn = `
                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <button 
                      onClick={() => {
                        if (!studentData.group || !studentData.name || !studentData.part) {
                          alert('소속, 이름, 측정할 신체 부위를 모두 입력해주세요!');
                          return;
                        }
                        goToSlideById(14);
                      }}
                      className="bg-[#2d6a63] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-[#23534d] transition-colors shadow-lg animate-bounce hover:animate-none flex items-center gap-2"
                    >
                      입력 완료, 가설 세우기 단계로 이동 ➔
                    </button>
                  </div>`;
if (content.includes(slide13End) && !content.includes('입력 완료, 가설 세우기 단계로 이동')) {
  content = content.replace(slide13End, slide13End + slide13Btn);
}

// 3. Slide 14 (id 14) button
// Need to find where it ends.
const slide14End = `                      { title: 'CHECK 4', desc: '무엇과 무엇을 비교할까요?' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-[#fffdf8] p-4 sm:p-5 rounded-2xl border border-[rgba(31,41,51,0.08)] shadow-[0_4px_12px_rgba(40,45,50,0.02)]">
                        <div className="text-[11px] sm:text-[12px] font-black text-[#2d6a63] mb-1">{item.title}</div>
                        <div className="text-[13px] sm:text-[15px] font-bold text-[#1f2933]">{item.desc}</div>
                      </div>
                    ))}
                  </div>`;
const slide14Btn = `
                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <button 
                      onClick={() => {
                        if (!studentData.hypothesis) {
                          alert('가설을 먼저 세워주세요!');
                          return;
                        }
                        goToSlideById(15);
                      }}
                      className="bg-[#2d6a63] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-[#23534d] transition-colors shadow-lg flex items-center gap-2"
                    >
                      가설 저장, 데이터 수집 시작하기 ➔
                    </button>
                  </div>`;
if (content.includes(slide14End) && !content.includes('가설 저장, 데이터 수집 시작하기')) {
  content = content.replace(slide14End, slide14End + slide14Btn);
}

// 4. Slide 15 (id 15) button
const slide15End = `아직 유효한 숫자 데이터가 없습니다. 표에 신체 부위 길이와 키를 숫자로 입력해 보세요.
                          </div>
                        )}
                      </div>
                    </div>
                  )}`;
const slide15Btn = `
                  <div className="mt-6 sm:mt-8 flex justify-center w-full">
                    <button 
                      onClick={() => {
                        const validCount = studentData.rows.filter(r => !isNaN(parseFloat(r.partLength)) && !isNaN(parseFloat(r.height))).length;
                        if (validCount < 2) {
                          alert('분석을 위해서는 최소 2명 이상의 숫자 데이터(길이, 키)가 필요합니다!');
                          return;
                        }
                        goToSlideById(18); // CustomDataAnalysis slide
                      }}
                      className="bg-[#d58a4b] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg hover:bg-[#b5733d] transition-colors shadow-xl flex items-center gap-2 border-2 border-transparent hover:border-white/20 animate-pulse hover:animate-none"
                    >
                      📊 수집 완료! 우리 팀 분석 결과 확인하기 ➔
                    </button>
                  </div>`;
if (content.includes(slide15End) && !content.includes('우리 팀 분석 결과 확인하기')) {
  content = content.replace(slide15End, slide15End + slide15Btn);
}

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Navigation buttons injected");
