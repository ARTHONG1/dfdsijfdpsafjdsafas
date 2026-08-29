import React from 'react';
import { MapPin, Calendar, Microscope, Fingerprint, ChevronRight, Check } from 'lucide-react';

export function MysterySlide({ onNext }: { onNext: () => void }) {
  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto flex flex-col h-full justify-center py-4 sm:py-6">
      
      {/* Header */}
      <div className="mb-6 xl:mb-10 shrink-0">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white border border-[rgba(31,41,51,0.1)] text-[#1f2933] font-bold text-[13px] sm:text-[14px] shadow-sm">
            동기 유발 2
          </div>
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2d6a63]/10 text-[#2d6a63] font-bold text-[13px] sm:text-[14px]">
            <Fingerprint className="w-4 h-4" />
            <span>500년 전의 미스터리</span>
          </div>
        </div>
        <h2 className="text-[28px] sm:text-[38px] xl:text-[46px] 2xl:text-[54px] font-[830] tracking-tight text-[#1f2933]">
          뼈만 보고 사람의 키를 알아낼 수 있을까?
        </h2>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 xl:gap-10">
        
        {/* Left Side: Visual & Data Cards (55%) */}
        <div className="flex flex-col gap-4 xl:gap-6">
          {/* Main Visual Block (Excavation Photo) */}
          <div className="relative flex-1 min-h-[250px] bg-[#1a1f24] rounded-[24px] overflow-hidden shadow-md group border border-[rgba(31,41,51,0.08)]">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Richard_III_replica_skeleton.jpg" 
              alt="리처드 3세 유골 발굴 현장" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay Gradient for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            
            {/* Text Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 flex flex-col pointer-events-none">
              <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 drop-shadow-md">리처드 3세 유골 발굴</h3>
              <p className="text-gray-200 text-sm sm:text-lg font-medium drop-shadow-md">영국 왕실 잔혹사 500년 만의 발견</p>
            </div>
          </div>

          {/* Mini Info Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
            <div className="bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs">
              <div className="bg-[#2d6a63]/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-[#2d6a63]" />
              </div>
              <span className="text-[12px] sm:text-[14px] text-[#68727d] font-semibold mb-1">발견 장소</span>
              <span className="text-[14px] sm:text-[16px] font-bold text-[#1f2933]">주차장 아래</span>
            </div>
            
            <div className="bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs">
              <div className="bg-[#2d6a63]/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5 text-[#2d6a63]" />
              </div>
              <span className="text-[12px] sm:text-[14px] text-[#68727d] font-semibold mb-1">발견 시기</span>
              <span className="text-[14px] sm:text-[16px] font-bold text-[#1f2933]">2012년 영국</span>
            </div>

            <div className="bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs">
              <div className="bg-[#2d6a63]/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <Microscope className="w-5 h-5 text-[#2d6a63]" />
              </div>
              <span className="text-[12px] sm:text-[14px] text-[#68727d] font-semibold mb-1">과학 분석</span>
              <span className="text-[14px] sm:text-[16px] font-bold text-[#1f2933]">유골 조사</span>
            </div>
          </div>
        </div>

        {/* Right Side: Text & Questions (45%) */}
        <div className="flex flex-col gap-4 xl:gap-6 justify-between">
          
          {/* Card 1: 무슨 일이 있었을까? */}
          <div className="bg-[#fffdf8] rounded-[24px] p-5 sm:p-7 xl:p-8 border border-[rgba(31,41,51,0.06)] shadow-xs">
            <h4 className="text-[18px] sm:text-[20px] xl:text-[22px] font-extrabold text-[#1f2933] mb-3 xl:mb-4 flex items-center gap-2">
              <span className="text-[#2d6a63]">Q.</span> 무슨 일이 있었을까요?
            </h4>
            <p className="text-[15px] sm:text-[16px] xl:text-[18px] leading-relaxed text-[#4a5568] font-medium break-keep">
              2012년, 영국의 한 주차장 아래에서 약 500년 전 사람의 유골이 발견되었습니다. 
              과학자들은 이 유골을 조사해 오랫동안 행방이 묘연했던 <strong className="text-[#1f2933] font-bold">리처드 3세</strong>의 것임을 밝혀냈습니다.
            </p>
          </div>

          {/* Card 2: 뼈를 통해 무엇을 알 수 있었을까? */}
          <div className="bg-[#fffdf8] rounded-[24px] p-5 sm:p-7 xl:p-8 border border-[rgba(31,41,51,0.06)] shadow-xs">
            <h4 className="text-[18px] sm:text-[20px] xl:text-[22px] font-extrabold text-[#1f2933] mb-4 flex items-center gap-2">
              <span className="text-[#2d6a63]">Q.</span> 뼈를 통해 무엇을 알 수 있었을까요?
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#a0aec0] shrink-0 mt-[2px]" />
                <span className="text-[15px] sm:text-[16px] xl:text-[18px] text-[#4a5568] font-medium">이 유골은 <strong className="text-[#1f2933]">남성</strong>의 것입니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#a0aec0] shrink-0 mt-[2px]" />
                <span className="text-[15px] sm:text-[16px] xl:text-[18px] text-[#4a5568] font-medium">사망 당시 <strong className="text-[#1f2933]">대략적인 나이</strong>를 추정할 수 있습니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#a0aec0] shrink-0 mt-[2px]" />
                <span className="text-[15px] sm:text-[16px] xl:text-[18px] text-[#4a5568] font-medium"><strong className="text-[#1f2933]">척추 상태</strong>와 같은 신체 특징도 확인할 수 있습니다.</span>
              </li>
              <li className="flex items-start gap-3 bg-[#dbece8] p-3 rounded-[12px] mt-1 border border-[#2d6a63]/20">
                <Check className="w-6 h-6 text-[#2d6a63] shrink-0 mt-[1px] font-bold" />
                <span className="text-[16px] sm:text-[18px] xl:text-[20px] text-[#1f2933] font-bold break-keep">
                  그리고 뼈의 길이를 이용해 <span className="text-[#2d6a63]">키도 추정</span>할 수 있습니다.
                </span>
              </li>
            </ul>
          </div>

          {/* Card 3: 오늘의 핵심 질문 */}
          <div className="bg-[#2d6a63] rounded-[24px] p-5 sm:p-7 xl:p-8 shadow-lg relative overflow-hidden group">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500"></div>
            
            <h4 className="text-[18px] sm:text-[20px] xl:text-[22px] font-extrabold text-white mb-3">
              오늘의 핵심 질문
            </h4>
            <p className="text-[16px] sm:text-[18px] xl:text-[20px] text-white/90 font-medium leading-relaxed mb-6 break-keep">
              그렇다면 우리도 <strong className="text-white font-extrabold">몸의 한 뼈 길이만 재서</strong> 사람의 키를 알아낼 수 있을까요? 
              오늘은 <strong className="text-white font-extrabold border-b-2 border-[#a4d4cc]">자뼈 길이</strong>를 이용해 직접 탐구해 봅니다.
            </p>
            
            <div className="flex justify-end relative z-10">
              <button 
                onClick={onNext}
                className="bg-white text-[#2d6a63] px-6 py-3 rounded-full font-bold text-[15px] sm:text-[16px] flex items-center gap-2 hover:bg-[#f0f9f7] hover:scale-105 transition-all shadow-md"
              >
                자뼈 길이 탐구하러 가기
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
