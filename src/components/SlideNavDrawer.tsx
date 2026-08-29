import React from 'react';
import { X, Check } from 'lucide-react';
import { SlideData } from '../types';

interface SlideNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideNavDrawer: React.FC<SlideNavDrawerProps> = ({
  isOpen,
  onClose,
  slides,
  currentIndex,
  onSelectSlide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[85vh] bg-[#fffdf8] rounded-[24px] border border-[rgba(31,41,51,0.12)] shadow-[0_24px_70px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden text-[#1f2933]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(31,41,51,0.08)] bg-[#f8f5ee]">
          <h3 className="text-base font-extrabold text-[#1f2933]">
            슬라이드 전체 목록 ({slides.length}개)
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#68727d] hover:text-[#1f2933] hover:bg-black/5 rounded-full transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {slides.map((s, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-[#2d6a63]/10 border-[#2d6a63] text-[#2d6a63] font-bold'
                    : 'bg-white border-[rgba(31,41,51,0.06)] hover:bg-[#fbf9f4] text-[#1f2933]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                      isCurrent
                        ? 'bg-[#2d6a63] text-white'
                        : 'bg-black/5 text-[#68727d]'
                    }`}
                  >
                    {s.id}
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-[#68727d]">
                      {s.category}
                    </div>
                    <div className="text-sm font-bold">
                      {s.title}
                    </div>
                  </div>
                </div>
                {isCurrent && (
                  <Check className="w-4 h-4 text-[#2d6a63]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
