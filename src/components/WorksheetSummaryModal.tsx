import React from 'react';
import { X, Printer, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { StudentData, SelectedChoices } from '../types';

interface WorksheetSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: StudentData;
  choices: SelectedChoices;
  onResetData: () => void;
}

export const WorksheetSummaryModal: React.FC<WorksheetSummaryModalProps> = ({
  isOpen,
  onClose,
  data,
  choices,
  onResetData,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#fffdf8] rounded-[24px] border border-[rgba(31,41,51,0.12)] shadow-[0_24px_70px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden text-[#1f2933]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(31,41,51,0.08)] bg-[#f8f5ee]">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-[#2d6a63]/10 text-[#2d6a63]">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-extrabold text-[#1f2933] leading-none">
                나의 탐구 활동 기록지
              </h3>
              <p className="text-xs font-semibold text-[#68727d] mt-0.5">
                영재수업 · 내 몸속에 숨겨진 규칙을 찾아라
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#2d6a63] bg-[#2d6a63]/10 hover:bg-[#2d6a63]/20 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              인쇄하기
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#68727d] hover:text-[#1f2933] hover:bg-black/5 rounded-full transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Optional Notes from Page 2 & 3 */}
          {(data.blankSlide1Content || data.blankSlide2Content || data.blankSlide1Title || data.blankSlide2Title) && (
            <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
              <h4 className="text-sm font-extrabold text-[#2d6a63] flex items-center gap-1.5 mb-3">
                <CheckCircle2 className="w-4 h-4" />
                [활동 노트] 생각 열기 및 탐구 메모
              </h4>
              <div className="space-y-3">
                {(data.blankSlide1Title || data.blankSlide1Content) && (
                  <div className="bg-white p-3 rounded-xl border border-[rgba(31,41,51,0.05)]">
                    <span className="text-xs text-[#2d6a63] block font-bold">
                      {data.blankSlide1Title || '활동 기록 노트 ①'}
                    </span>
                    <p className="text-sm font-medium text-[#1f2933] mt-1 whitespace-pre-wrap">
                      {data.blankSlide1Content || '(내용 없음)'}
                    </p>
                  </div>
                )}
                {(data.blankSlide2Title || data.blankSlide2Content) && (
                  <div className="bg-white p-3 rounded-xl border border-[rgba(31,41,51,0.05)]">
                    <span className="text-xs text-[#2d6a63] block font-bold">
                      {data.blankSlide2Title || '활동 기록 노트 ②'}
                    </span>
                    <p className="text-sm font-medium text-[#1f2933] mt-1 whitespace-pre-wrap">
                      {data.blankSlide2Content || '(내용 없음)'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 1. 자뼈 측정 기록 */}
          <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
            <h4 className="text-sm font-extrabold text-[#2d6a63] flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-4 h-4" />
              [탐구 ①] 나의 자뼈와 키 측정 결과
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-xl border border-[rgba(31,41,51,0.05)]">
                <span className="text-xs text-[#68727d] block font-bold">만 나이</span>
                <span className="text-base font-extrabold text-[#1f2933]">
                  {data.age ? `${data.age}` : '(미입력)'}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[rgba(31,41,51,0.05)]">
                <span className="text-xs text-[#68727d] block font-bold">성별</span>
                <span className="text-base font-extrabold text-[#1f2933]">
                  {data.gender ? `${data.gender}` : '(미입력)'}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[rgba(31,41,51,0.05)]">
                <span className="text-xs text-[#68727d] block font-bold">나의 자뼈 길이</span>
                <span className="text-base font-extrabold text-[#1f2933]">
                  {data.ulna ? `${data.ulna} cm` : '(미입력)'}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[rgba(31,41,51,0.05)]">
                <span className="text-xs text-[#68727d] block font-bold">나의 실제 키</span>
                <span className="text-base font-extrabold text-[#1f2933]">
                  {data.height ? `${data.height} cm` : '(미입력)'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. 나만의 신체 부위 및 가설 */}
          <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
            <h4 className="text-sm font-extrabold text-[#2d6a63] flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-4 h-4" />
              [탐구 ②] 선택한 신체 부위 및 가설
            </h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border border-[rgba(31,41,51,0.05)]">
                  <span className="text-xs text-[#68727d] block font-bold">선택한 신체 부위</span>
                  <span className="text-sm font-bold text-[#1f2933]">
                    {data.part || (choices.slide8.length > 0 ? choices.slide8.join(', ') : '(미선택)')}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[rgba(31,41,51,0.05)]">
                  <span className="text-xs text-[#68727d] block font-bold">선택한 이유</span>
                  <span className="text-sm font-bold text-[#1f2933]">
                    {data.reason || '(미입력)'}
                  </span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[rgba(31,41,51,0.05)]">
                <span className="text-xs text-[#68727d] block font-bold">세운 가설 (예상)</span>
                <p className="text-sm font-medium text-[#1f2933] mt-0.5 whitespace-pre-wrap">
                  {data.hypothesis || '(가설 미작성)'}
                </p>
              </div>
            </div>
          </div>

          {/* 3. 모둠 데이터 수집 테이블 */}
          <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
            <h4 className="text-sm font-extrabold text-[#2d6a63] flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                [탐구 ②] 수집한 신체 측정 데이터
              </span>
              <span className="text-xs font-bold text-[#68727d]">
                총 {data.rows.length}명 ({data.rows.filter(r => r.partLength && r.height).length}명 입력완료)
              </span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse bg-white rounded-xl overflow-hidden shadow-xs">
                <thead>
                  <tr className="bg-[#efeae0] text-[#1f2933] font-bold">
                    <th className="py-2.5 px-3 border-b border-[#d9d2c5] w-16">번호</th>
                    <th className="py-2.5 px-3 border-b border-[#d9d2c5] text-[#2d6a63]">
                      {data.part ? `${data.part} 길이(cm)` : '신체 부위 길이(cm)'}
                    </th>
                    <th className="py-2.5 px-3 border-b border-[#d9d2c5]">키(cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row) => (
                    <tr key={row.id} className="border-b border-[#eee]">
                      <td className="py-2 px-3 font-bold text-[#68727d]">{row.id}</td>
                      <td className="py-2 px-3 font-bold text-[#2d6a63]">{row.partLength || '-'}</td>
                      <td className="py-2 px-3 font-bold text-[#1f2933]">{row.height || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. 새로운 친구 예측 */}
          <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
            <h4 className="text-sm font-extrabold text-[#2d6a63] flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-4 h-4" />
              [마지막 도전] 새로운 친구의 키 예측
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-[rgba(31,41,51,0.05)]">
                <span className="text-xs text-[#68727d] block font-bold">예측한 키</span>
                <span className="text-base font-extrabold text-[#d58a4b]">
                  {data.prediction ? `${data.prediction}` : '(미입력)'}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[rgba(31,41,51,0.05)]">
                <span className="text-xs text-[#68727d] block font-bold">판단 근거 / 이유</span>
                <p className="text-sm font-medium text-[#1f2933] mt-0.5">
                  {data.predictionReason || '(미입력)'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[rgba(31,41,51,0.08)] bg-[#f8f5ee]">
          <button
            onClick={() => {
              if (window.confirm('작성한 모든 기록을 초기화하시겠습니까?')) {
                onResetData();
              }
            }}
            className="flex items-center gap-1 text-xs font-semibold text-[#a84a4a] hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            작성 내용 모두 지우기
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-[#2d6a63] hover:bg-[#23534d] rounded-xl transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
