const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const importStr = `import CustomDataAnalysis from './components/CustomDataAnalysis';`;
if(!content.includes(importStr)) {
  content = content.replace("import { QRCodeSVG } from 'qrcode.react';", "import { QRCodeSVG } from 'qrcode.react';\n" + importStr);
}

// Add state for custom dashboard data
const stateStr = `  const [customDataList, setCustomDataList] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);`;
if(!content.includes('setCustomDataList')) {
  content = content.replace(
    `const [isFetching, setIsFetching] = useState(false);`,
    `const [isFetching, setIsFetching] = useState(false);\n  const [isSubmittingCustom, setIsSubmittingCustom] = useState(false);\n` + stateStr
  );
}

const slide18And19 = `
              {/* SLIDE 18: Student's own custom data analysis */}
              {currentSlideData.id === 18 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full h-full pb-8">
                  <CustomDataAnalysis 
                    rows={studentData.rows} 
                    partName={studentData.part} 
                    groupName={studentData.group} 
                  />
                  <div className="mt-8 flex justify-center">
                    <button 
                      onClick={async () => {
                        if (GAS_URL === "여기에_앱스스크립트_URL을_붙여넣으세요" || GAS_URL === "") {
                          alert("구글 Apps Script URL이 설정되지 않았습니다.");
                          return;
                        }
                        setIsSubmittingCustom(true);
                        try {
                          await fetch(GAS_URL + "?type=custom", {
                            method: 'POST',
                            mode: 'no-cors',
                            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                            body: JSON.stringify({
                              group: studentData.group,
                              name: studentData.name,
                              part: studentData.part,
                              reason: studentData.reason,
                              hypothesis: studentData.hypothesis,
                              rows: JSON.stringify(studentData.rows),
                              timestamp: new Date().toISOString()
                            })
                          });
                          alert("선생님 화면으로 제출되었습니다!");
                        } catch (e) {
                          alert("제출에 실패했습니다.");
                        } finally {
                          setIsSubmittingCustom(false);
                        }
                      }}
                      disabled={isSubmittingCustom}
                      className="bg-[#2d6a63] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#23534d] transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg"
                    >
                      {isSubmittingCustom ? '제출 중...' : '선생님께 우리 팀 결과 제출하기'}
                    </button>
                  </div>
                </div>
              )}

              {/* SLIDE 19: Teacher Dashboard */}
              {currentSlideData.id === 19 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full h-full flex flex-col pb-8">
                  <div className="mb-6 flex justify-between items-end">
                    <div>
                      <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                        모둠별 탐구 결과 <span className="text-[#2d6a63]">대시보드</span>
                      </h2>
                      <p className="mt-2 text-[15px] sm:text-[18px] text-[#68727d] font-medium">
                        제출된 각 모둠의 탐구 결과를 클릭하여 분석 차트를 확인하세요.
                      </p>
                    </div>
                    <button 
                      onClick={async () => {
                        if (GAS_URL === "여기에_앱스스크립트_URL을_붙여넣으세요" || GAS_URL === "") return;
                        setIsFetching(true);
                        try {
                          const res = await fetch(GAS_URL + "?type=custom");
                          const text = await res.text();
                          try {
                            const parsed = JSON.parse(text);
                            setCustomDataList(parsed);
                          } catch (e) {
                            console.error("Parse error", e);
                          }
                        } catch (e) {
                          console.error(e);
                        } finally {
                          setIsFetching(false);
                        }
                      }}
                      className="bg-[#fffdf8] border border-[rgba(31,41,51,0.1)] text-[#1f2933] px-5 py-2.5 rounded-xl font-bold hover:bg-[#f8f5ee] transition-colors shadow-sm"
                    >
                      {isFetching ? '새로고침 중...' : '결과 새로고침'}
                    </button>
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 overflow-y-auto">
                    {customDataList.map((item, idx) => {
                      let parsedRows = [];
                      try {
                        parsedRows = JSON.parse(item.rows || '[]');
                      } catch(e) {}
                      
                      return (
                        <div 
                          key={idx}
                          onClick={() => setSelectedTeam({ ...item, parsedRows })}
                          className="bg-white p-6 rounded-[24px] border border-[rgba(31,41,51,0.08)] shadow-[0_8px_20px_rgba(40,45,50,0.04)] cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <span className="bg-[#f8f5ee] text-[#d58a4b] px-3 py-1 rounded-lg text-sm font-black">
                              {item.group || \`팀 \${idx+1}\`}
                            </span>
                            <span className="text-xs text-[#68727d] font-bold">{item.name}</span>
                          </div>
                          <h3 className="text-xl font-extrabold text-[#1f2933] mb-2 leading-tight">
                            측정 부위: <span className="text-[#2d6a63]">{item.part}</span>
                          </h3>
                          <p className="text-sm text-[#68727d] font-medium line-clamp-2 mt-auto">
                            {item.hypothesis}
                          </p>
                        </div>
                      );
                    })}
                    {customDataList.length === 0 && !isFetching && (
                      <div className="col-span-full h-[300px] flex flex-col items-center justify-center text-[#68727d] font-bold text-lg border-2 border-dashed border-[rgba(31,41,51,0.1)] rounded-[32px]">
                        아직 제출된 모둠이 없습니다. 학생들의 제출을 기다려주세요!
                      </div>
                    )}
                  </div>
                  
                  {selectedTeam && (
                    <div 
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                      onClick={() => setSelectedTeam(null)}
                    >
                      <div 
                        className="bg-white p-6 sm:p-10 rounded-[32px] shadow-2xl flex flex-col gap-6 w-full max-w-[1200px] max-h-[95vh] overflow-y-auto animate-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-2xl font-black text-[#1f2933]">
                            {selectedTeam.group}의 탐구 분석 
                          </h3>
                          <button 
                            onClick={() => setSelectedTeam(null)}
                            className="bg-[#f8f5ee] hover:bg-[#ebe5d9] text-[#68727d] px-5 py-2 rounded-xl font-bold transition-colors"
                          >
                            닫기
                          </button>
                        </div>
                        
                        <div className="bg-[#f8f5ee] p-4 rounded-2xl">
                          <div className="text-sm font-bold text-[#68727d] mb-1">팀의 가설</div>
                          <div className="text-lg font-bold text-[#1f2933]">{selectedTeam.hypothesis || '가설 없음'}</div>
                        </div>

                        <div className="h-[400px]">
                          <CustomDataAnalysis 
                            rows={selectedTeam.parsedRows} 
                            partName={selectedTeam.part} 
                            groupName={selectedTeam.group} 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
`;

content = content.replace('{/* SLIDE 18: ', slide18And19 + '\n              {/* SLIDE 20: ');

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Component code injected");
