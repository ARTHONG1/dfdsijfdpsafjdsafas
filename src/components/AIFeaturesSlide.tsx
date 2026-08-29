import React from 'react';
import { ChevronRight } from 'lucide-react';

export function AIFeaturesSlide({ onNext }: { onNext: () => void }) {
  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto flex flex-col h-full justify-center py-4 sm:py-6">
      {/* Header */}
      <div className="text-center mb-6 xl:mb-8 shrink-0">
        <h2 className="text-[28px] sm:text-[38px] xl:text-[46px] 2xl:text-[54px] font-[830] tracking-tight text-[#1f2933]">
          AI는 무엇을 <span className="text-[#2d6a63]">‘알아서’</span> 할까요?
        </h2>
        <p className="mt-3 text-[15px] sm:text-[18px] xl:text-[22px] text-[#68727d] font-medium">
          우리 주변의 AI 가전은 어떤 정보를 살펴보고, 무엇을 스스로 판단하는지 영상을 보며 찾아봅시다.
        </p>
      </div>

      {/* Videos Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10 mb-6 shrink-0">
        {/* 세탁기 */}
        <div className="flex flex-col">
          <div className="relative w-full pb-[56.25%] bg-black rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md border border-[rgba(31,41,51,0.08)]">
            <iframe 
              src="https://www.youtube.com/embed/xqSOPqiMpm0?rel=0" 
              className="absolute inset-0 w-full h-full" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
          <div className="mt-4 xl:mt-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[20px] xl:text-[24px]">👕</span>
              <h3 className="text-[18px] xl:text-[22px] font-bold text-[#1f2933]">AI 세탁기</h3>
            </div>
            <p className="text-[14px] xl:text-[16px] text-[#68727d] font-semibold">무엇을 알아서 했나요?</p>

            <div className="h-[48px] sm:h-[56px] xl:h-[64px] mt-3">
              <div className="bg-[#fffdf8] py-2 px-3 sm:px-4 border border-[rgba(31,41,51,0.08)] rounded-xl text-[13px] sm:text-[14px] xl:text-[16px] text-[#1f2933] shadow-sm inline-block">
                옷의 상태를 살펴보고 → <span className="text-[#2d6a63] font-bold">알맞은 세탁 방법을 판단</span>
              </div>
            </div>
          </div>
        </div>

        {/* 냉장고 */}
        <div className="flex flex-col">
          <div className="relative w-full pb-[56.25%] bg-black rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md border border-[rgba(31,41,51,0.08)]">
            <iframe 
              src="https://www.youtube.com/embed/4Mu4netEH6c?rel=0" 
              className="absolute inset-0 w-full h-full" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
          <div className="mt-4 xl:mt-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[20px] xl:text-[24px]">🍎</span>
              <h3 className="text-[18px] xl:text-[22px] font-bold text-[#1f2933]">AI 냉장고</h3>
            </div>
            <p className="text-[14px] xl:text-[16px] text-[#68727d] font-semibold">무엇을 알아서 했나요?</p>

            <div className="h-[48px] sm:h-[56px] xl:h-[64px] mt-3">
              <div className="bg-[#fffdf8] py-2 px-3 sm:px-4 border border-[rgba(31,41,51,0.08)] rounded-xl text-[13px] sm:text-[14px] xl:text-[16px] text-[#1f2933] shadow-sm inline-block">
                냉장고 속 정보를 살펴보고 → <span className="text-[#2d6a63] font-bold">알맞은 기능을 판단·추천</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action / Conclusion */}
      <div className="flex-1 min-h-[120px] flex flex-col items-center justify-center relative bg-[#faf8f3] rounded-[24px] border border-[rgba(31,41,51,0.05)] p-4 sm:p-6 xl:p-8">
        <div className="flex flex-col items-center text-center w-full">
          <h3 className="text-[18px] sm:text-[22px] xl:text-[28px] 2xl:text-[32px] font-extrabold text-[#1f2933] leading-snug mb-4 xl:mb-6">
            AI는 정보를 바탕으로, 아직 정해지지 않은 결과를<br className="hidden sm:block" />
            <span className="text-[#2d6a63] bg-[#2d6a63]/10 px-3 sm:px-4 py-1 rounded-lg inline-block mt-2">판단하거나 예측</span>합니다.
          </h3>
          <button
            onClick={onNext}
            className="px-6 xl:px-8 py-3 xl:py-4 bg-[#1f2933] hover:bg-black text-white rounded-full font-bold text-[14px] sm:text-[15px] xl:text-[17px] transition-colors shadow-md flex items-center gap-2"
          >
            그렇다면 AI가 우리 몸의 정보를 본다면?
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
