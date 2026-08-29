const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add state
content = content.replace(
  `const [showScatterPlot, setShowScatterPlot] = useState(false);`,
  `const [showScatterPlot, setShowScatterPlot] = useState(false);\n  const [isQRExpanded, setIsQRExpanded] = useState(false);`
);

// Update QR Code block
const oldQRBlock = `<div className="hidden sm:flex flex-col items-center p-3 bg-white rounded-2xl shadow-sm border border-[rgba(31,41,51,0.08)]">
                      <QRCodeSVG value={\`\${window.location.origin}\${window.location.pathname}?mode=submit\`} size={100} />
                      <span className="text-[11px] font-bold text-[#2d6a63] mt-2">모바일 제출 QR</span>
                    </div>`;

const newQRBlock = `<div 
                      className="hidden sm:flex flex-col items-center p-3 bg-white rounded-2xl shadow-sm border border-[rgba(31,41,51,0.08)] cursor-pointer hover:scale-105 hover:shadow-md transition-all"
                      onClick={() => setIsQRExpanded(true)}
                      title="크게 보기"
                    >
                      <QRCodeSVG value={\`\${window.location.origin}\${window.location.pathname}?mode=submit\`} size={100} />
                      <span className="text-[11px] font-bold text-[#2d6a63] mt-2">QR 확대하기 🔍</span>
                    </div>
                    
                    {isQRExpanded && (
                      <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all"
                        onClick={() => setIsQRExpanded(false)}
                      >
                        <div 
                          className="bg-white p-8 sm:p-12 rounded-[32px] shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <h3 className="text-2xl sm:text-3xl font-black text-[#1f2933]">스마트폰으로 스캔하세요</h3>
                          <div className="p-4 sm:p-6 bg-white rounded-3xl border-4 border-[#2d6a63]/20 shadow-inner">
                            <QRCodeSVG value={\`\${window.location.origin}\${window.location.pathname}?mode=submit\`} size={320} />
                          </div>
                          <p className="text-[#68727d] font-bold text-center">스마트폰 카메라로 스캔하면<br/>모바일 제출 화면으로 이동합니다.</p>
                          <button 
                            onClick={() => setIsQRExpanded(false)}
                            className="w-full mt-2 bg-[#f8f5ee] hover:bg-[#ebe5d9] text-[#68727d] px-6 py-4 rounded-xl font-bold text-lg transition-colors"
                          >
                            닫기
                          </button>
                        </div>
                      </div>
                    )}`;

content = content.replace(oldQRBlock, newQRBlock);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
