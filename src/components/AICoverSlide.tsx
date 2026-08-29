import React from 'react';
import { BarChart3, Bone, Footprints, Hand, ClipboardList, LineChart, UserCircle2 } from 'lucide-react';

export function AICoverSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[1500px] 2xl:max-w-[1700px] mx-auto pt-6 pb-2">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-10 xl:gap-16 items-center h-full">
        {/* Left Column */}
        <div className="flex flex-col justify-center h-full">
          
          {/* Eyebrow */}
          <div className="self-start inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/70 backdrop-blur-sm border border-[rgba(31,41,51,0.08)] shadow-sm mb-6 sm:mb-8">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#2d6a63]" />
            <span className="text-[13px] sm:text-[15px] font-extrabold text-[#1f2933]">AI 영재수업 · 탐구 1</span>
          </div>

          {/* Titles */}
          <h1 className="text-[38px] sm:text-[52px] lg:text-[60px] xl:text-[72px] 2xl:text-[84px] font-[850] leading-[1.1] tracking-tight text-[#1f2933]">
            AI는 어떻게<br />
            모르는 값을 예측할까?
          </h1>
          <h2 className="mt-4 sm:mt-6 text-[20px] sm:text-[28px] lg:text-[34px] xl:text-[42px] font-extrabold text-[#2d6a63] tracking-tight">
            내 몸속에 숨겨진 규칙을 찾아라
          </h2>
          
          <div className="w-16 sm:w-20 h-1 sm:h-1.5 rounded-full bg-[#2d6a63] mt-5 sm:mt-6"></div>

          {/* Description */}
          <p className="mt-5 sm:mt-7 text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[24px] leading-relaxed text-[#4e5964]">
            <strong className="text-[#25313b] font-extrabold">신체 데이터만으로 사람의 키를 예측할 수 있을까요?</strong><br className="hidden sm:block" />
            오늘은 우리가 직접 데이터를 모으고, AI처럼 관계를 찾아봅니다.
          </p>

          {/* Question Card */}
          <div className="mt-8 sm:mt-10 relative bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[24px] p-6 sm:p-8 xl:p-10 shadow-[0_14px_34px_rgba(40,45,50,0.07)] overflow-hidden">
            <div className="text-[#2d6a63] text-[14px] sm:text-[16px] xl:text-[18px] font-extrabold mb-2">오늘의 질문</div>
            <div className="relative z-10 text-[20px] sm:text-[26px] lg:text-[30px] xl:text-[36px] leading-[1.35] font-[850] tracking-tight text-[#1f2933]">
              몸의 한 부분만 재서,<br />
              사람의 키를 <span className="text-[#2d6a63]">예측</span>할 수 있을까요?
            </div>
            <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 xl:w-24 xl:h-24 rounded-full bg-[#efebe2] text-[#577e76] text-[40px] sm:text-[50px] xl:text-[60px] font-black flex items-center justify-center select-none opacity-80">
              ?
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-center h-full mt-8 lg:mt-0">
          <div className="bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[28px] p-5 sm:p-6 xl:p-8 shadow-[0_18px_42px_rgba(40,45,50,0.08)] flex flex-col w-full h-[55vh] lg:h-auto lg:min-h-[600px] xl:min-h-[700px] justify-between">
            
            {/* Headers */}
            <div className="grid grid-cols-[1.1fr_1.8fr_0.9fr] text-center font-extrabold text-[13px] sm:text-[15px] xl:text-[18px] text-[#25313b] mb-4 xl:mb-6">
              <span>신체 데이터</span>
              <span>규칙 찾기</span>
              <span>예상 키</span>
            </div>

            {/* Main Process Area */}
            <div className="flex-1 flex items-center justify-between gap-2 sm:gap-4 xl:gap-6 min-h-0">
              
              {/* 1. Body Data */}
              <div className="flex flex-col border border-[#ded8cb] rounded-[20px] overflow-hidden bg-[#faf7f0] w-[26%] shrink-0 h-full max-h-[400px] justify-between">
                <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-3 xl:p-4 border-b border-[#ded8cb] gap-1 sm:gap-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 xl:w-16 xl:h-16 rounded-full bg-[#e6eee9] text-[#2d6a63] flex items-center justify-center shadow-inner">
                    <Bone className="w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8" />
                  </div>
                  <span className="text-[11px] sm:text-[13px] xl:text-[15px] font-extrabold text-[#1f2933]">자뼈 길이</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-3 xl:p-4 border-b border-[#ded8cb] gap-1 sm:gap-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 xl:w-16 xl:h-16 rounded-full bg-[#e6eee9] text-[#2d6a63] flex items-center justify-center shadow-inner">
                    <Footprints className="w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8" />
                  </div>
                  <span className="text-[11px] sm:text-[13px] xl:text-[15px] font-extrabold text-[#1f2933]">발 길이</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-3 xl:p-4 gap-1 sm:gap-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 xl:w-16 xl:h-16 rounded-full bg-[#e6eee9] text-[#2d6a63] flex items-center justify-center shadow-inner">
                    <Hand className="w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8" />
                  </div>
                  <span className="text-[11px] sm:text-[13px] xl:text-[15px] font-extrabold text-[#1f2933]">손 길이</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-[#446c66] font-black text-[20px] sm:text-[28px] xl:text-[36px] shrink-0">→</div>

              {/* 2. Chart */}
              <div className="flex flex-col items-center justify-center w-[40%] shrink-0 relative pt-4 h-full max-h-[400px]">
                <div className="text-[9px] sm:text-[11px] xl:text-[13px] text-[#4c5862] font-semibold absolute top-0 left-0 xl:left-4">키 (cm)</div>
                <svg viewBox="0 0 320 260" className="w-full h-auto drop-shadow-sm mt-4">
                  {/* grid */}
                  <g stroke="#ded8cb" strokeWidth="1.5">
                    <line x1="40" y1="40" x2="40" y2="220"/>
                    <line x1="40" y1="220" x2="300" y2="220"/>
                    <line x1="40" y1="175" x2="300" y2="175"/>
                    <line x1="40" y1="130" x2="300" y2="130"/>
                    <line x1="40" y1="85" x2="300" y2="85"/>
                  </g>
                  {/* trend line */}
                  <line x1="55" y1="195" x2="275" y2="60" stroke="#2d6a63" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" opacity="0.7"/>
                  {/* dots */}
                  <g fill="#2d6a63">
                    <circle cx="65" cy="190" r="5.5"/>
                    <circle cx="85" cy="172" r="5.5"/>
                    <circle cx="105" cy="181" r="5.5"/>
                    <circle cx="125" cy="151" r="5.5"/>
                    <circle cx="145" cy="158" r="5.5"/>
                    <circle cx="165" cy="126" r="5.5"/>
                    <circle cx="185" cy="137" r="5.5"/>
                    <circle cx="205" cy="105" r="5.5"/>
                    <circle cx="225" cy="112" r="5.5"/>
                    <circle cx="245" cy="78" r="5.5"/>
                    <circle cx="265" cy="88" r="5.5"/>
                    <circle cx="115" cy="195" r="5.5"/>
                    <circle cx="155" cy="140" r="5.5"/>
                    <circle cx="235" cy="95" r="5.5"/>
                    <circle cx="255" cy="70" r="5.5"/>
                  </g>
                </svg>
                <div className="text-[9px] sm:text-[11px] xl:text-[13px] text-[#68727d] font-semibold mt-1">측정값 (cm)</div>
                <div className="mt-2 xl:mt-4 bg-[#2d6a63]/10 text-[#2d6a63] text-[9px] sm:text-[11px] xl:text-[13px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                  데이터 속 관계 학습
                </div>
              </div>

              {/* Arrow */}
              <div className="text-[#446c66] font-black text-[20px] sm:text-[28px] xl:text-[36px] shrink-0">→</div>

              {/* 3. Prediction */}
              <div className="flex flex-col items-center justify-center border border-[#ded8cb] rounded-[20px] bg-[#faf7f0] w-[22%] shrink-0 py-6 sm:py-8 h-full max-h-[400px]">
                <div className="text-[32px] sm:text-[44px] lg:text-[52px] xl:text-[64px] font-black text-[#2d6a63] leading-none mb-1 xl:mb-2">?</div>
                <div className="text-[14px] sm:text-[16px] xl:text-[20px] font-bold text-[#1f2933] mb-6 xl:mb-10">cm</div>
                <div className="relative flex flex-col items-center text-[#547b73]">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8 rounded-full bg-current mb-1"></div>
                  <div className="w-8 h-10 sm:w-10 sm:h-12 xl:w-12 xl:h-16 bg-current rounded-t-lg rounded-b-md"></div>
                  {/* Dashed measurement line next to person */}
                  <div className="absolute -right-4 sm:-right-5 xl:-right-6 top-0 bottom-0 border-r-2 border-dashed border-[#547b73]/40 flex items-center justify-center">
                    <span className="absolute -right-3 xl:-right-4 bg-[#faf7f0] text-[#547b73] text-[13px] sm:text-[15px] xl:text-[18px] font-black p-0.5">?</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Steps */}
            <div className="mt-6 sm:mt-8 xl:mt-10 grid grid-cols-3 bg-[#faf8f3] border border-[#ded8cb] rounded-[20px] p-3 sm:p-4 xl:p-5 divide-x divide-[#ded8cb]">
              <div className="flex flex-col sm:flex-row xl:flex-col items-center justify-center text-center px-1 sm:px-2 gap-2 xl:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12 rounded-full bg-white border border-[#ded8cb] flex items-center justify-center shrink-0 shadow-sm">
                  <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 text-[#254f49]" />
                </div>
                <div className="flex flex-col items-center sm:items-start xl:items-center text-center sm:text-left xl:text-center">
                  <span className="text-[#254f49] font-extrabold text-[11px] sm:text-[12px] xl:text-[15px]">데이터 수집</span>
                  <span className="text-[#6c747a] font-medium text-[9px] sm:text-[10px] xl:text-[13px] leading-tight mt-0.5">우리가 직접 측정해요</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row xl:flex-col items-center justify-center text-center px-1 sm:px-2 gap-2 xl:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12 rounded-full bg-white border border-[#ded8cb] flex items-center justify-center shrink-0 shadow-sm">
                  <LineChart className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 text-[#254f49]" />
                </div>
                <div className="flex flex-col items-center sm:items-start xl:items-center text-center sm:text-left xl:text-center">
                  <span className="text-[#254f49] font-extrabold text-[11px] sm:text-[12px] xl:text-[15px]">관계 탐색</span>
                  <span className="text-[#6c747a] font-medium text-[9px] sm:text-[10px] xl:text-[13px] leading-tight mt-0.5">어떤 규칙이 있을까요?</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row xl:flex-col items-center justify-center text-center px-1 sm:px-2 gap-2 xl:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12 rounded-full bg-white border border-[#ded8cb] flex items-center justify-center shrink-0 shadow-sm">
                  <UserCircle2 className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 text-[#254f49]" />
                </div>
                <div className="flex flex-col items-center sm:items-start xl:items-center text-center sm:text-left xl:text-center">
                  <span className="text-[#254f49] font-extrabold text-[11px] sm:text-[12px] xl:text-[15px]">예측하기</span>
                  <span className="text-[#6c747a] font-medium text-[9px] sm:text-[10px] xl:text-[13px] leading-tight mt-0.5">AI처럼 예측해요</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
