const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Setup initial state for student mode
const stateSetupStr = `  const isStudentMode = new URLSearchParams(window.location.search).get('mode') === 'student';
  const initialIndex = isStudentMode ? SLIDES.findIndex(s => s.id === 13) : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);`;

if (!content.includes('const isStudentMode = new URLSearchParams')) {
  content = content.replace(
    `const [currentIndex, setCurrentIndex] = useState(0);`,
    stateSetupStr
  );
}

// 2. Hide bottom controls if isStudentMode
const bottomControlStart = `{/* Bottom Control Bar */}`;
const bottomControlReplacement = `{/* Bottom Control Bar */}
        {!isStudentMode && (`;
const bottomControlEnd = `</div>
      </div>
    </div>
  );
}`;
const bottomControlEndReplacement = `</div>
        )}
      </div>
    </div>
  );
}`;

if (content.includes(bottomControlStart) && !content.includes('{!isStudentMode && (')) {
  content = content.replace(bottomControlStart, bottomControlReplacement);
  // Need to find the end of the Bottom Control Bar div. It's right before the end of the component.
  // The structure is:
  //         </div> // end of bottom control bar
  //       </div> // end of inner layout div
  //     </div> // end of main flex div
  //   );
  // }
  content = content.replace(
    `</div>
      </div>
    </div>
  );
}`,
    `  </div>
        )}
      </div>
    </div>
  );
}`
  );
}

// 3. Add QR code to slide 13 for student mode
const slide13Title = `<h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                    나만의 <span className="text-[#2d6a63]">신체 부위</span>를 선택하세요.
                  </h2>`;

const slide13WithQR = `<div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                        나만의 <span className="text-[#2d6a63]">신체 부위</span>를 선택하세요.
                      </h2>
                      <p className="mt-1 text-[15px] sm:text-[18px] text-[#68727d] font-medium">
                        “이 부위가 키와 관련 있을 것 같다!”라고 생각되는 곳을 골라 봅시다.
                      </p>
                    </div>
                    {!isStudentMode && (
                      <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-2xl border-2 border-[#2d6a63]/20 shadow-md">
                        <QRCodeSVG value={\`\${window.location.origin}\${window.location.pathname}?mode=student\`} size={120} />
                        <span className="text-[12px] font-bold text-[#2d6a63] mt-2">학생용 스캔</span>
                      </div>
                    )}
                  </div>`;

if (content.includes(slide13Title) && !content.includes('학생용 스캔')) {
  // we also need to remove the <p> that follows the h2 to avoid duplication, let's just replace both.
  const slide13FullTitle = `<h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                    나만의 <span className="text-[#2d6a63]">신체 부위</span>를 선택하세요.
                  </h2>
                  <p className="mt-1 text-[15px] sm:text-[18px] text-[#68727d] font-medium">
                    “이 부위가 키와 관련 있을 것 같다!”라고 생각되는 곳을 골라 봅시다.
                  </p>`;
  content = content.replace(slide13FullTitle, slide13WithQR);
}

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Student mode added");
