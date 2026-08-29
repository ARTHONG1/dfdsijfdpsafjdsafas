import React from 'react';
import { FileEdit, PenLine, Sparkles, MessageSquare, Lightbulb, ClipboardList } from 'lucide-react';

interface BlankPaperSlideProps {
  pageNumber: number;
  slideTitle: string;
  defaultTitle?: string;
  defaultSubtitle?: string;
  valueTitle: string;
  valueContent: string;
  onChangeTitle: (val: string) => void;
  onChangeContent: (val: string) => void;
}

export const BlankPaperSlide: React.FC<BlankPaperSlideProps> = ({
  pageNumber,
  slideTitle,
  defaultTitle = '자유 탐구 및 생각 열기 노트',
  defaultSubtitle = '이곳에 수업 내용, 추가 질문, 또는 학생들의 자유 탐구 기록을 자유롭게 구성할 수 있습니다.',
  valueTitle,
  valueContent,
  onChangeTitle,
  onChangeContent,
}) => {
  const quickTemplates = [
    {
      label: '💭 생각 질문',
      title: '우리 몸의 비율에 대한 나의 생각',
      content: '1. 다빈치의 인체 비례도를 보고 느낀 점은 무엇인가요?\n2. 우리 몸의 다른 부위(발, 손, 팔) 사이에도 일정한 비율이 존재할까요?\n3. 내가 확인해보고 싶은 신체 규칙을 적어봅시다.',
    },
    {
      label: '👥 모둠 토론',
      title: '모둠 토론: 사람의 키를 알아내는 가장 좋은 방법',
      content: '• 모둠원 의견 모으기:\n  - 의견 1:\n  - 의견 2:\n• 우리가 선택한 최고의 측정 부위와 그 이유:\n',
    },
    {
      label: '📋 수업 안내',
      title: '오늘의 탐구 계획 및 안내',
      content: '1. 자뼈 길이 측정 방법 익히기\n2. 우리 반 데이터 수집 및 패턴 분석\n3. 나만의 신체 부위 탐구 및 예측 모델 만들기',
    },
  ];

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto flex flex-col">
      {/* Title & Subtitle */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black text-[#2d6a63] bg-[#2d6a63]/10 px-2.5 py-0.5 rounded-full">
              빈 페이지 (슬라이드 {pageNumber})
            </span>
          </div>
          <input
            type="text"
            value={valueTitle}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder={defaultTitle}
            aria-label="활동 제목 입력"
            className="w-full bg-transparent border-0 border-b border-dashed border-[#d9d2c5] focus:border-[#2d6a63] text-[26px] sm:text-[36px] md:text-[44px] font-[830] tracking-tight text-[#1f2933] py-1 outline-none transition-colors"
          />
          <p className="mt-1.5 text-[14px] sm:text-[17px] text-[#68727d] font-medium">
            {defaultSubtitle}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-extrabold text-[#68727d] bg-[#fffdf8] px-3 py-1.5 rounded-full border border-[rgba(31,41,51,0.08)] shadow-2xs shrink-0">
          <PenLine className="w-3.5 h-3.5 text-[#2d6a63]" />
          <span>자유 기록 노트</span>
        </div>
      </div>

      {/* Quick Template Preset Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-[#68727d] mr-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#d58a4b]" />
          예시 템플릿 불러오기:
        </span>
        {quickTemplates.map((tmpl, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              if (valueContent && valueContent.trim() !== '') {
                if (!confirm('기존에 작성된 내용이 변경됩니다. 템플릿을 적용할까요?')) return;
              }
              onChangeTitle(tmpl.title);
              onChangeContent(tmpl.content);
            }}
            className="text-xs font-bold px-3 py-1 rounded-xl bg-white hover:bg-[#2d6a63]/10 text-[#4b5563] hover:text-[#2d6a63] border border-[rgba(31,41,51,0.08)] transition-all shadow-2xs cursor-pointer"
          >
            {tmpl.label}
          </button>
        ))}
        {(valueTitle || valueContent) && (
          <button
            type="button"
            onClick={() => {
              if (confirm('페이지 내용을 모두 지우시겠습니까?')) {
                onChangeTitle('');
                onChangeContent('');
              }
            }}
            className="text-xs font-bold px-2.5 py-1 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-all ml-auto cursor-pointer"
          >
            내용 비우기
          </button>
        )}
      </div>

      {/* Blank Paper Canvas */}
      <div className="mt-3 relative w-full min-h-[280px] sm:min-h-[340px] md:min-h-[380px] bg-[#fffdf8] rounded-[24px] sm:rounded-[28px] border border-[rgba(31,41,51,0.08)] shadow-[0_12px_28px_rgba(40,45,50,0.05)] p-5 sm:p-7 flex flex-col justify-between overflow-hidden">
        {/* Subtle lined paper texture background */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #1f2933 31px, #1f2933 32px)',
          }}
        />

        {/* Content text area */}
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#68727d] flex items-center gap-1">
              <FileEdit className="w-3.5 h-3.5 text-[#2d6a63]" />
              내용 작성 공간 (수업 메모, 발문, 질문 카드 등을 자유롭게 입력하세요)
            </span>
          </div>

          <textarea
            value={valueContent}
            onChange={(e) => onChangeContent(e.target.value)}
            placeholder="여기에 자유롭게 수업 내용, 발문, 질문 카드, 또는 모둠 활동 계획을 작성하세요..."
            rows={8}
            aria-label="템플릿 내용 작성"
            className="w-full flex-1 bg-transparent border-0 text-[16px] sm:text-[20px] font-medium text-[#1f2933] leading-relaxed outline-none resize-none placeholder:text-[#a0aab5]"
          />
        </div>

        {/* Bottom Helper Bar */}
        <div className="relative z-10 pt-3 border-t border-[rgba(31,41,51,0.06)] flex items-center justify-between text-xs text-[#68727d]">
          <span className="font-semibold">
            💡 4페이지(다빈치의 인체 비례도) 다음에 추가된 빈 페이지 템플릿입니다.
          </span>
          <span className="font-mono text-[11px] bg-[#f8f5ee] px-2.5 py-0.5 rounded-md border border-[rgba(31,41,51,0.06)] font-bold text-[#2d6a63]">
            Slide #{pageNumber}
          </span>
        </div>
      </div>
    </div>
  );
};
