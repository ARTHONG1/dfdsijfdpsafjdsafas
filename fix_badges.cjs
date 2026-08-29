const fs = require('fs');
let code = fs.readFileSync('src/components/MysterySlide.tsx', 'utf8');
code = code.replace(
    `<div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#2d6a63]/10 text-[#2d6a63] font-bold text-[14px] sm:text-[16px] mb-4">
          <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>500년 전의 미스터리</span>
        </div>`,
    `<div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white border border-[rgba(31,41,51,0.1)] text-[#1f2933] font-bold text-[13px] sm:text-[14px] shadow-sm">
            동기 유발 2
          </div>
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2d6a63]/10 text-[#2d6a63] font-bold text-[13px] sm:text-[14px]">
            <Fingerprint className="w-4 h-4" />
            <span>500년 전의 미스터리</span>
          </div>
        </div>`
);
fs.writeFileSync('src/components/MysterySlide.tsx', code);
console.log('Fixed badges');
