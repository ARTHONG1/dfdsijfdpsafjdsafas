const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

if (!content.includes("import { QRCodeSVG } from 'qrcode.react';")) {
  content = content.replace(
    `import { DataVisualizationSlide } from './components/DataVisualizationSlide';`,
    `import { DataVisualizationSlide } from './components/DataVisualizationSlide';\nimport { QRCodeSVG } from 'qrcode.react';`
  );
}

// Ensure the QR code dynamically gets the URL
const oldHeader = `                  <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                    나의 <span className="text-[#2d6a63]">자뼈 길이</span>를 재어 봅시다.
                  </h2>
                  <p className="mt-1 text-[15px] sm:text-[18px] text-[#68727d] font-medium">
                    짝과 함께 측정하고 값을 기록하세요. (상단 타이머를 활용하세요)
                  </p>`;

const newHeader = `                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                        나의 <span className="text-[#2d6a63]">자뼈 길이</span>를 재어 봅시다.
                      </h2>
                      <p className="mt-1 text-[15px] sm:text-[18px] text-[#68727d] font-medium">
                        짝과 함께 측정하고 값을 기록하세요. 스마트폰으로 QR코드를 찍어 바로 제출할 수도 있습니다!
                      </p>
                    </div>
                    <div className="hidden sm:flex flex-col items-center p-3 bg-white rounded-2xl shadow-sm border border-[rgba(31,41,51,0.08)]">
                      <QRCodeSVG value={\`\${window.location.origin}\${window.location.pathname}?mode=submit\`} size={100} />
                      <span className="text-[11px] font-bold text-[#2d6a63] mt-2">모바일 제출 QR</span>
                    </div>
                  </div>`;

if (content.includes(oldHeader)) {
  content = content.replace(oldHeader, newHeader);
}

fs.writeFileSync('src/App.tsx', content, 'utf-8');
