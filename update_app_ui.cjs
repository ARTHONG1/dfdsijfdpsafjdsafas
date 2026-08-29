const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                    <div className="bg-[#fffdf8] p-4 sm:p-5 rounded-2xl border border-[rgba(31,41,51,0.08)]">
                      <label htmlFor="custom-part-input" className="block text-[13px] font-bold text-[#68727d] mb-1">`;

const replacement = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                    <div className="bg-[#fffdf8] p-4 sm:p-5 rounded-2xl border border-[rgba(31,41,51,0.08)]">
                      <label htmlFor="group-input" className="block text-[13px] font-bold text-[#68727d] mb-1">
                        소속 (모둠/팀 이름)
                      </label>
                      <input
                        id="group-input"
                        type="text"
                        value={studentData.group || ""}
                        onChange={(e) => handleInputChange('group', e.target.value)}
                        placeholder="예: 1모둠, 과학탐구반"
                        className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[18px] sm:text-[22px] font-extrabold text-[#1f2933] py-1 px-1 outline-none"
                      />
                    </div>
                    <div className="bg-[#fffdf8] p-4 sm:p-5 rounded-2xl border border-[rgba(31,41,51,0.08)]">
                      <label htmlFor="name-input" className="block text-[13px] font-bold text-[#68727d] mb-1">
                        이름
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        value={studentData.name || ""}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="자신의 이름을 적어주세요"
                        className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[18px] sm:text-[22px] font-extrabold text-[#1f2933] py-1 px-1 outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                    <div className="bg-[#fffdf8] p-4 sm:p-5 rounded-2xl border border-[rgba(31,41,51,0.08)]">
                      <label htmlFor="custom-part-input" className="block text-[13px] font-bold text-[#68727d] mb-1">`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacement);
  fs.writeFileSync('src/App.tsx', content, 'utf-8');
  console.log('UI updated successfully');
} else {
  console.log('Target string not found');
}
