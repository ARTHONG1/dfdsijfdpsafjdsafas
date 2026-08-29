import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, CheckCircle2, ChevronRight, MousePointer2 } from 'lucide-react';

export function UlnaMeasurementMission({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState({ 1: false, 2: false, 3: false });
  const allRevealed = revealed[1] && revealed[2] && revealed[3];

  const handleRevealAll = () => {
    setRevealed({ 1: true, 2: true, 3: true });
  };

  const toggleReveal = (id: 1 | 2 | 3) => {
    setRevealed((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex flex-col h-full bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[24px] p-6 sm:p-8 xl:p-10 shadow-[0_12px_28px_rgba(40,45,50,0.05)] relative overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        {!allRevealed ? (
          <Eye className="w-6 h-6 xl:w-7 xl:h-7 text-[#2d6a63]" />
        ) : (
          <CheckCircle2 className="w-6 h-6 xl:w-7 xl:h-7 text-[#2d6a63]" />
        )}
        <h3 className="text-[20px] xl:text-[24px] font-extrabold text-[#1f2933]">
          {!allRevealed ? '영상에서 찾아보세요' : '자뼈 측정 방법'}
        </h3>
      </div>

      <div className="space-y-4 xl:space-y-5 flex-1 overflow-y-auto pr-1">
        {/* Item 1 */}
        <button
          onClick={() => toggleReveal(1)}
          className={`w-full text-left rounded-2xl p-4 xl:p-5 border transition-all duration-300 relative overflow-hidden ${
            revealed[1] 
              ? 'bg-[#2d6a63]/5 border-[#2d6a63]/20 shadow-none' 
              : 'bg-white border-[rgba(31,41,51,0.06)] shadow-sm hover:border-[#2d6a63]/40 cursor-pointer group'
          }`}
        >
          {!revealed[1] && (
            <div className="absolute top-4 right-4 text-[#2d6a63]/30 group-hover:text-[#2d6a63]/60 transition-colors">
              <MousePointer2 className="w-5 h-5" />
            </div>
          )}
          <div className="text-[14px] xl:text-[16px] font-bold text-[#2d6a63] mb-1">① 팔의 자세</div>
          <AnimatePresence mode="wait">
            {!revealed[1] ? (
              <motion.div key="q1" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="text-[16px] xl:text-[18px] font-semibold text-[#1f2933] pr-8">
                어떻게 놓을까?
              </motion.div>
            ) : (
              <motion.div key="a1" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="text-[16px] xl:text-[18px] font-semibold text-[#2d6a63]">
                팔을 편안하게 굽힙니다.
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Item 2 */}
        <button
          onClick={() => toggleReveal(2)}
          className={`w-full text-left rounded-2xl p-4 xl:p-5 border transition-all duration-300 relative overflow-hidden ${
            revealed[2] 
              ? 'bg-[#2d6a63]/5 border-[#2d6a63]/20 shadow-none' 
              : 'bg-white border-[rgba(31,41,51,0.06)] shadow-sm hover:border-[#2d6a63]/40 cursor-pointer group'
          }`}
        >
          {!revealed[2] && (
            <div className="absolute top-4 right-4 text-[#2d6a63]/30 group-hover:text-[#2d6a63]/60 transition-colors">
              <MousePointer2 className="w-5 h-5" />
            </div>
          )}
          <div className="text-[14px] xl:text-[16px] font-bold text-[#2d6a63] mb-1">② 시작점</div>
          <AnimatePresence mode="wait">
            {!revealed[2] ? (
              <motion.div key="q2" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="text-[16px] xl:text-[18px] font-semibold text-[#1f2933] pr-8">
                어디에서 시작할까?
              </motion.div>
            ) : (
              <motion.div key="a2" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="text-[16px] xl:text-[18px] font-semibold text-[#2d6a63]">
                팔꿈치 뒤쪽의 가장 튀어나온 뼈
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Item 3 */}
        <button
          onClick={() => toggleReveal(3)}
          className={`w-full text-left rounded-2xl p-4 xl:p-5 border transition-all duration-300 relative overflow-hidden ${
            revealed[3] 
              ? 'bg-[#2d6a63]/5 border-[#2d6a63]/20 shadow-none' 
              : 'bg-white border-[rgba(31,41,51,0.06)] shadow-sm hover:border-[#2d6a63]/40 cursor-pointer group'
          }`}
        >
          {!revealed[3] && (
            <div className="absolute top-4 right-4 text-[#2d6a63]/30 group-hover:text-[#2d6a63]/60 transition-colors">
              <MousePointer2 className="w-5 h-5" />
            </div>
          )}
          <div className="text-[14px] xl:text-[16px] font-bold text-[#2d6a63] mb-1">③ 끝점</div>
          <AnimatePresence mode="wait">
            {!revealed[3] ? (
              <motion.div key="q3" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="text-[16px] xl:text-[18px] font-semibold text-[#1f2933] pr-8">
                어디까지 잴까?
              </motion.div>
            ) : (
              <motion.div key="a3" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="text-[16px] xl:text-[18px] font-semibold text-[#2d6a63]">
                손목의 새끼손가락 쪽 튀어나온 뼈
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Final step (revealed when all are opened) */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              className="mt-6 bg-[#2d6a63]/10 rounded-2xl p-4 xl:p-5 flex items-start gap-3 overflow-hidden"
            >
              <span className="text-xl xl:text-2xl shrink-0 mt-0.5">📏</span>
              <span className="text-[15px] xl:text-[17px] font-bold text-[#1f2933] leading-relaxed">
                두 지점 사이를 줄자로 곧게 재고 <span className="text-[#2d6a63]">cm로 기록합니다.</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 shrink-0 pt-2 border-t border-[rgba(31,41,51,0.05)]">
        {!allRevealed ? (
          <button
            onClick={handleRevealAll}
            className="w-full py-4 xl:py-5 bg-[#2d6a63] hover:bg-[#245751] text-white rounded-2xl font-bold text-[16px] xl:text-[18px] transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <CheckCircle2 className="w-5 h-5 xl:w-6 xl:h-6" />
            측정 방법 확인하기
          </button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onNext}
            className="w-full py-4 xl:py-5 bg-[#1f2933] hover:bg-black text-white rounded-2xl font-bold text-[16px] xl:text-[18px] transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            직접 측정해 볼까요?
            <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
