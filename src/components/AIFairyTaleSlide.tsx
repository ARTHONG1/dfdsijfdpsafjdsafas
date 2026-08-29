import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

export function AIFairyTaleSlide({ onNext }: { onNext: () => void }) {
  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto flex flex-col h-full justify-center py-4 sm:py-6">
      {/* Header */}
      <div className="text-center mb-6 xl:mb-10 shrink-0">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#2d6a63]/10 text-[#2d6a63] font-bold text-[14px] sm:text-[16px] mb-4">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>AI-동화 속 엄마들의 진실 편</span>
        </div>
        <h2 className="text-[28px] sm:text-[38px] xl:text-[46px] 2xl:text-[54px] font-[830] tracking-tight text-[#1f2933]">
          동화 속 상황에서 AI는<br className="sm:hidden" /> 어떻게 판단할까요?
        </h2>
        <p className="mt-4 text-[15px] sm:text-[18px] xl:text-[22px] text-[#68727d] font-medium">
          영상을 보며 AI가 상황 정보를 살펴보고 어떤 판단을 내리는지 확인해 봅시다.
        </p>
      </div>

      {/* Video Section */}
      <div className="w-full max-w-[900px] xl:max-w-[1000px] mx-auto flex flex-col items-center">
        <div className="relative w-full pb-[56.25%] bg-black rounded-[24px] overflow-hidden shadow-[0_18px_42px_rgba(40,45,50,0.15)] border border-[rgba(31,41,51,0.08)] mb-8">
          <iframe 
            src="https://www.youtube.com/embed/Fqsw0FiL4dA?rel=0" 
            className="absolute inset-0 w-full h-full" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
        
        <button
          onClick={onNext}
          className="px-6 xl:px-8 py-3 xl:py-4 bg-[#1f2933] hover:bg-black text-white rounded-full font-bold text-[14px] sm:text-[15px] xl:text-[17px] transition-colors shadow-md flex items-center gap-2"
        >
          다음 탐구로 넘어가기
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
