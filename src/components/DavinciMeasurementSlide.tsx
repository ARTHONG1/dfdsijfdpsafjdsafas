import React from 'react';

interface DavinciMeasurementSlideProps {
  davinciData: any[];
  studentData: any;
  handleInputChange: (key: string, value: string) => void;
  submitDavinciData: () => void;
  fetchDavinciData: () => void;
  isSubmitting: boolean;
  isFetching: boolean;
}

export const DavinciMeasurementSlide: React.FC<DavinciMeasurementSlideProps> = ({
  davinciData,
  studentData,
  handleInputChange,
  submitDavinciData,
  fetchDavinciData,
  isSubmitting,
  isFetching,
}) => {
  // Calculate similarity logic
  let ratioStr = "";
  let similarityStr = "";
  let difference = 0;
  if (studentData.davinciArmSpan && studentData.davinciHeight) {
    const arm = parseFloat(studentData.davinciArmSpan);
    const h = parseFloat(studentData.davinciHeight);
    if (!isNaN(arm) && !isNaN(h) && h > 0) {
      difference = Math.abs(arm - h);
      const ratio = (arm / h) * 100;
      ratioStr = ratio.toFixed(1);
      const similarity = 100 - (difference / h * 100);
      similarityStr = similarity.toFixed(1);
    }
  }

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto flex flex-col h-full justify-center">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black text-[#2d6a63] bg-[#2d6a63]/10 px-2.5 py-0.5 rounded-full">
              다빈치 가설 검증 (슬라이드 5)
            </span>
          </div>
          <h2 className="text-[26px] sm:text-[36px] md:text-[44px] xl:text-[52px] font-[830] tracking-tight text-[#1f2933]">
            나의 양팔 벌린 길이를 재어 봅시다.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[18px] md:text-[20px] text-[#68727d] font-medium leading-relaxed max-w-3xl">
            다빈치의 가설처럼 정말 양팔을 뻗은 길이가 나의 실제 키와 똑같을까요?<br/>
            짝과 함께 측정하고 아래에 입력해보세요.
          </p>
        </div>
      </div>

      <div className="mt-5 p-5 sm:p-7 bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[24px] sm:rounded-[28px] shadow-[0_12px_28px_rgba(40,45,50,0.05)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#f8f5ee] rounded-2xl p-4 sm:p-5 border border-[rgba(31,41,51,0.06)]">
            <label htmlFor="davinci-age-input" className="block text-[13px] sm:text-[14px] font-bold text-[#68727d] mb-1">
              만 나이 (세)
            </label>
            <div className="relative">
              <select
                id="davinci-age-input"
                value={studentData.davinciAge || ""}
                onChange={(e) => handleInputChange('davinciAge', e.target.value)}
                className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] sm:text-[26px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors appearance-none"
              >
                <option value="" disabled>선택</option>
                {Array.from({ length: 12 }, (_, i) => i + 8).map(age => (
                  <option key={age} value={`${age}세`}>{age}세</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-[#68727d]">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="bg-[#f8f5ee] rounded-2xl p-4 sm:p-5 border border-[rgba(31,41,51,0.06)]">
            <label htmlFor="davinci-gender-input" className="block text-[13px] sm:text-[14px] font-bold text-[#68727d] mb-1">
              성별 (남/여)
            </label>
            <div className="relative">
              <select
                id="davinci-gender-input"
                value={studentData.davinciGender || ""}
                onChange={(e) => handleInputChange('davinciGender', e.target.value)}
                className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] sm:text-[26px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors appearance-none"
              >
                <option value="" disabled>선택</option>
                <option value="남자">남자</option>
                <option value="여자">여자</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-[#68727d]">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="bg-[#f8f5ee] rounded-2xl p-4 sm:p-5 border border-[rgba(31,41,51,0.06)]">
            <label htmlFor="arm-input" className="block text-[13px] sm:text-[14px] font-bold text-[#68727d] mb-1">
              나의 양팔 벌린 길이 (cm)
            </label>
            <div className="relative flex items-center">
              <input
                id="arm-input"
                type="text"
                inputMode="decimal"
                value={studentData.davinciArmSpan || ""}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.]/g, '');
                  const parts = val.split('.');
                  const formattedVal = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : val;
                  handleInputChange('davinciArmSpan', formattedVal);
                }}
                placeholder="예: 162"
                className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] sm:text-[26px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors pr-10"
              />
              <span className="absolute right-2 text-[#68727d] font-bold text-[18px] sm:text-[22px]">cm</span>
            </div>
          </div>
          <div className="bg-[#f8f5ee] rounded-2xl p-4 sm:p-5 border border-[rgba(31,41,51,0.06)]">
            <label htmlFor="davinci-height-input" className="block text-[13px] sm:text-[14px] font-bold text-[#68727d] mb-1">
              나의 실제 키 (cm)
            </label>
            <div className="relative flex items-center">
              <input
                id="davinci-height-input"
                type="text"
                inputMode="decimal"
                value={studentData.davinciHeight || ""}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.]/g, '');
                  const parts = val.split('.');
                  const formattedVal = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : val;
                  handleInputChange('davinciHeight', formattedVal);
                }}
                placeholder="예: 160"
                className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] sm:text-[26px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors pr-10"
              />
              <span className="absolute right-2 text-[#68727d] font-bold text-[18px] sm:text-[22px]">cm</span>
            </div>
          </div>
        </div>

        {/* Real-time Feedback & Submit */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[rgba(31,41,51,0.06)] pt-5">
          <div className="flex-1">
            {similarityStr ? (
              <div className="bg-[#f0f9ff] text-[#0369a1] px-4 py-3 rounded-xl border border-[#bae6fd] flex items-center gap-2 font-medium">
                <span className="text-xl">😲</span>
                <div>
                  나의 양팔 길이는 키와 <strong className="font-bold">{difference.toFixed(1)}cm</strong> 차이가 나네요!
                  <span className="block text-sm opacity-80">(일치율 약 {similarityStr}%)</span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-[#68727d]">
                양팔 길이와 키를 모두 입력하면 결과를 볼 수 있습니다.
              </div>
            )}
          </div>
          <button 
            onClick={submitDavinciData}
            disabled={isSubmitting}
            className="bg-[#2d6a63] text-white px-6 py-3 rounded-xl font-bold text-[16px] hover:bg-[#23534d] transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
             {isSubmitting ? '제출 중...' : '데이터 제출하기'}
          </button>
        </div>

        {/* Class Data Table */}
        <div className="mt-8">
           <div className="flex items-center justify-between mb-3">
              <h3 className="text-[18px] sm:text-[22px] font-extrabold text-[#1f2933]">우리 반 다빈치 데이터 모아보기</h3>
              <button onClick={fetchDavinciData} disabled={isFetching} className="text-[14px] text-[#2d6a63] font-bold hover:underline flex items-center gap-1">
                {isFetching ? '불러오는 중...' : '새로고침'}
              </button>
           </div>
           <div className="bg-white rounded-2xl border border-[rgba(31,41,51,0.08)] overflow-hidden shadow-sm">
              <div className="overflow-x-auto max-h-[250px] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-[#f8f5ee] sticky top-0 z-10">
                     <tr>
                       <th className="py-3 px-4 text-[#68727d] font-bold text-[14px] border-b border-[rgba(31,41,51,0.06)]">나이</th>
                       <th className="py-3 px-4 text-[#68727d] font-bold text-[14px] border-b border-[rgba(31,41,51,0.06)]">성별</th>
                       <th className="py-3 px-4 text-[#68727d] font-bold text-[14px] border-b border-[rgba(31,41,51,0.06)]">양팔 길이</th>
                       <th className="py-3 px-4 text-[#68727d] font-bold text-[14px] border-b border-[rgba(31,41,51,0.06)]">실제 키</th>
                     </tr>
                   </thead>
                   <tbody>
                     {davinciData.length === 0 ? (
                       <tr>
                         <td colSpan={4} className="py-8 text-center text-[#68727d] font-medium">아직 제출된 데이터가 없습니다.</td>
                       </tr>
                     ) : (
                       davinciData.map((row, idx) => (
                          <tr key={idx} className="border-b border-[rgba(31,41,51,0.04)] hover:bg-[#faf9f6]">
                            <td className="py-3 px-4 font-semibold text-[#1f2933]">{row.age}</td>
                            <td className="py-3 px-4 font-semibold text-[#1f2933]">{row.gender}</td>
                            <td className="py-3 px-4 font-extrabold text-[#d58a4b]">{row.armSpan ? `${row.armSpan} cm` : ''}</td>
                            <td className="py-3 px-4 font-extrabold text-[#1f2933]">{row.height ? `${row.height} cm` : ''}</td>
                          </tr>
                       ))
                     )}
                   </tbody>
                </table>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
