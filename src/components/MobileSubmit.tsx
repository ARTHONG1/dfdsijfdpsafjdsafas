import React, { useState } from 'react';

const GAS_URL: string = "https://script.google.com/macros/s/AKfycbyYIAuxIDWVv7QTYYa6f0iWq7t963J9AacZV-TxZKL7JbJdpPEg3HC0YSGqGT9gD4S3/exec";

export const MobileSubmit: React.FC = () => {
  const [studentData, setStudentData] = useState({
    age: '',
    gender: '',
    ulna: '',
    height: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setStudentData(prev => ({ ...prev, [field]: value }));
  };

  const submitToSheet = async () => {
    if (!studentData.age || !studentData.gender || !studentData.ulna || !studentData.height) {
      alert("모든 항목을 입력해주세요!");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          age: studentData.age,
          gender: studentData.gender,
          ulna: studentData.ulna,
          height: studentData.height,
          timestamp: new Date().toISOString()
        })
      });
      
      setIsSuccess(true);
      // Reset form
      setStudentData({ age: '', gender: '', ulna: '', height: '' });
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("데이터 제출에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf8] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-[rgba(31,41,51,0.06)]">
        <h2 className="text-[24px] font-[830] text-[#1f2933] mb-2 text-center">
          나의 <span className="text-[#2d6a63]">자뼈 길이</span> 제출
        </h2>
        <p className="text-[14px] text-[#68727d] text-center font-medium mb-6">
          자신의 정보를 정확하게 입력해주세요.
        </p>

        <div className="flex flex-col gap-4">
          <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
            <label htmlFor="mobile-age" className="block text-[13px] font-bold text-[#68727d] mb-1">
              만 나이 (세)
            </label>
            <select
              id="mobile-age"
              value={studentData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors"
            >
              <option value="" disabled>선택</option>
              {Array.from({ length: 12 }, (_, i) => i + 8).map(age => (
                <option key={age} value={`${age}세`}>{age}세</option>
              ))}
            </select>
          </div>

          <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
            <label htmlFor="mobile-gender" className="block text-[13px] font-bold text-[#68727d] mb-1">
              성별 (남/여)
            </label>
            <select
              id="mobile-gender"
              value={studentData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors"
            >
              <option value="" disabled>선택</option>
              <option value="남자">남자</option>
              <option value="여자">여자</option>
            </select>
          </div>

          <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
            <label htmlFor="mobile-ulna" className="block text-[13px] font-bold text-[#68727d] mb-1">
              나의 자뼈 길이 (cm)
            </label>
            <div className="relative flex items-center">
              <input
                id="mobile-ulna"
                type="text"
                inputMode="decimal"
                value={studentData.ulna}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.]/g, '');
                  const parts = val.split('.');
                  const formattedVal = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : val;
                  handleInputChange('ulna', formattedVal);
                }}
                placeholder="예: 23.5"
                className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors pr-10"
              />
              <span className="absolute right-2 text-[#68727d] font-bold text-[18px]">cm</span>
            </div>
          </div>

          <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
            <label htmlFor="mobile-height" className="block text-[13px] font-bold text-[#68727d] mb-1">
              나의 실제 키 (cm)
            </label>
            <div className="relative flex items-center">
              <input
                id="mobile-height"
                type="text"
                inputMode="decimal"
                value={studentData.height}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.]/g, '');
                  const parts = val.split('.');
                  const formattedVal = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : val;
                  handleInputChange('height', formattedVal);
                }}
                placeholder="예: 145"
                className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors pr-10"
              />
              <span className="absolute right-2 text-[#68727d] font-bold text-[18px]">cm</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {isSuccess ? (
            <div className="bg-[#e6f4ea] text-[#1e8e3e] py-3 rounded-xl text-center font-bold text-[16px] animate-in fade-in">
              제출이 완료되었습니다! 🎉
            </div>
          ) : (
            <button
              onClick={submitToSheet}
              disabled={isSubmitting}
              className="w-full bg-[#2d6a63] text-white px-6 py-4 rounded-xl font-bold text-[18px] hover:bg-[#23534d] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
            >
              {isSubmitting ? '제출 중...' : '데이터 제출하기'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
