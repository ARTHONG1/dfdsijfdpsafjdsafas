import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ScatterChart as ScatterIcon, 
  TrendingUp, 
  Gauge, 
  LineChart as LineChartIcon,
  ChevronDown, 
  Sparkles, 
  RotateCcw, 
  Info,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  Minimize2,
  X,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

type CardType = 'scatter' | 'correlation' | 'coefficient' | 'regression';

export const DataPatternsInteractiveSlide: React.FC = () => {
  const [activeCard, setActiveCard] = useState<CardType | null>('scatter');
  const [expandedCard, setExpandedCard] = useState<CardType | null>(null);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedCard) {
        setExpandedCard(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedCard]);

  // 1. 산점도 상태
  const [scatterDensity, setScatterDensity] = useState<number>(24);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  
  const scatterPoints = useMemo<Point[]>(() => {
    const pts: Point[] = [];
    for (let i = 0; i < scatterDensity; i++) {
      const x = 15 + (i / scatterDensity) * 70 + (Math.sin(i * 99) * 4);
      const noise = (Math.cos(i * 33) * 12);
      const y = Math.max(10, Math.min(90, 15 + (x * 0.75) + noise));
      pts.push({ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
    }
    return pts;
  }, [scatterDensity]);

  // 2. 상관관계 상태
  const [corrType, setCorrType] = useState<'positive' | 'negative' | 'none'>('positive');
  
  const corrPoints = useMemo<Point[]>(() => {
    const count = 24;
    const pts: Point[] = [];
    for (let i = 0; i < count; i++) {
      const x = 12 + (i / count) * 76;
      let y = 50;
      const noise = Math.sin(i * 13) * 12;
      if (corrType === 'positive') {
        y = 15 + x * 0.75 + noise;
      } else if (corrType === 'negative') {
        y = 90 - x * 0.75 + noise;
      } else {
        y = 20 + ((Math.sin(i * 77) + 1) / 2) * 60;
      }
      pts.push({ x: Number(x.toFixed(1)), y: Number(Math.max(8, Math.min(92, y)).toFixed(1)) });
    }
    return pts;
  }, [corrType]);

  // 3. 상관계수 상태
  const [rValue, setRValue] = useState<number>(0.85);

  const coeffPoints = useMemo<Point[]>(() => {
    const count = 30;
    const pts: Point[] = [];
    const absR = Math.abs(rValue);
    const noiseMagnitude = (1 - absR) * 40;

    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = 12 + t * 76;
      const pseudoRandom = Math.sin(i * 47) * noiseMagnitude;
      
      let baseY = 50;
      if (rValue > 0.05) {
        baseY = 15 + t * 70;
      } else if (rValue < -0.05) {
        baseY = 85 - t * 70;
      } else {
        baseY = 20 + ((Math.sin(i * 23) + 1) / 2) * 60;
      }
      
      const y = Math.max(8, Math.min(92, baseY + pseudoRandom));
      pts.push({ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
    }
    return pts;
  }, [rValue]);

  // 4. 선형회귀 상태
  const [showRegressionLine, setShowRegressionLine] = useState<boolean>(false);
  const [showResiduals, setShowResiduals] = useState<boolean>(false);
  const [predictX, setPredictX] = useState<number>(25);

  const regressionPoints = useMemo<Point[]>(() => {
    return [
      { x: 18, y: 32 },
      { x: 20, y: 35 },
      { x: 21, y: 44 },
      { x: 23, y: 46 },
      { x: 24, y: 55 },
      { x: 25, y: 53 },
      { x: 27, y: 64 },
      { x: 28, y: 68 },
      { x: 30, y: 72 },
      { x: 32, y: 80 },
    ];
  }, []);

  const predictedY = useMemo(() => {
    return Math.round(115 + (predictX - 18) * 4.2);
  }, [predictX]);

  const cardsList: { id: CardType; title: string; subtitle: string; icon: any; tag: string }[] = [
    { id: 'scatter', title: '1. 산점도', subtitle: 'Scatter Plot', icon: ScatterIcon, tag: '시각화' },
    { id: 'correlation', title: '2. 상관관계', subtitle: 'Correlation', icon: TrendingUp, tag: '경향성' },
    { id: 'coefficient', title: '3. 상관계수', subtitle: 'r, Coefficient', icon: Gauge, tag: '수치화 (-1 ~ +1)' },
    { id: 'regression', title: '4. 선형회귀', subtitle: 'Linear Regression', icon: LineChartIcon, tag: '예측 모델 (y=ax+b)' },
  ];

  const handleNextExpanded = () => {
    if (!expandedCard) return;
    const currentIndex = cardsList.findIndex(c => c.id === expandedCard);
    const nextIndex = (currentIndex + 1) % cardsList.length;
    setExpandedCard(cardsList[nextIndex].id);
  };

  const handlePrevExpanded = () => {
    if (!expandedCard) return;
    const currentIndex = cardsList.findIndex(c => c.id === expandedCard);
    const prevIndex = (currentIndex - 1 + cardsList.length) % cardsList.length;
    setExpandedCard(cardsList[prevIndex].id);
  };

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full h-full flex flex-col justify-start pb-6">
      {/* 헤더 섹션 */}
      <div className="mb-4 sm:mb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2d6a63]/10 text-[#2d6a63] font-bold text-xs sm:text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            데이터 과학의 핵심 4단계 원리
          </div>
          <h2 className="text-[24px] sm:text-[34px] md:text-[40px] font-[830] tracking-tight text-[#1f2933] leading-tight">
            데이터 속 <span className="text-[#2d6a63]">숨겨진 패턴</span>을 찾는 방법
          </h2>
          <p className="text-[14px] sm:text-[16px] text-[#68727d] font-medium mt-1">
            두 변수 사이의 관계를 수학적으로 분석하고 미래를 예측하는 4가지 핵심 도구를 직접 조작해 보세요.
          </p>
        </div>

        {/* 빠른 카드 선택 탭 */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-[#f0ece1] rounded-2xl self-center sm:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'scatter', label: '① 산점도', icon: ScatterIcon },
            { id: 'correlation', label: '② 상관관계', icon: TrendingUp },
            { id: 'coefficient', label: '③ 상관계수', icon: Gauge },
            { id: 'regression', label: '④ 선형회귀', icon: LineChartIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeCard === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCard(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#2d6a63] shadow-sm'
                    : 'text-[#68727d] hover:text-[#1f2933]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 메인 4개 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 flex-1 items-start">
        
        {/* ===================== 개념 1: 산점도 ===================== */}
        <div
          onClick={() => setActiveCard('scatter')}
          className={`rounded-[24px] border p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
            activeCard === 'scatter'
              ? 'bg-white border-[#2d6a63] shadow-[0_16px_36px_rgba(45,106,99,0.12)] ring-2 ring-[#2d6a63]/20'
              : 'bg-[#fffdf8] border-[rgba(31,41,51,0.08)] shadow-[0_4px_16px_rgba(40,45,50,0.03)] hover:border-[#2d6a63]/40'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCard === 'scatter' ? 'bg-[#2d6a63] text-white' : 'bg-[#2d6a63]/10 text-[#2d6a63]'}`}>
                  <ScatterIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-[830] text-[#1f2933]">
                    1. 산점도 <span className="text-[13px] font-normal text-[#68727d]">(Scatter Plot)</span>
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard('scatter');
                  }}
                  className="bg-[#2d6a63]/10 hover:bg-[#2d6a63] text-[#2d6a63] hover:text-white px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all shadow-2xs hover:shadow-xs"
                  title="산점도 크게 확대해서 보기"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>크게 보기</span>
                </button>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#f8f5ee] text-[#2d6a63]">
                  시각화
                </span>
              </div>
            </div>

            <p className="text-[13px] sm:text-[14px] text-[#4b5563] font-semibold mb-3">
              두 변수의 값을 직교 좌표평면에 <strong className="text-[#2d6a63]">점으로 나타낸 그래프</strong>
            </p>

            <p className="text-[12px] sm:text-[13px] text-[#68727d] leading-relaxed">
              마치 밤하늘의 별을 지도에 그리듯, 각 데이터 쌍(자뼈 길이, 키)을 좌표평면에 점으로 찍어 데이터의 전체 분포를 한눈에 파악합니다.
            </p>
          </div>

          {/* 인터랙티브 영역 */}
          <div className="mt-4 p-3.5 bg-[#f8f5ee] rounded-2xl border border-[rgba(31,41,51,0.06)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2 text-xs font-bold text-[#68727d]">
              <span>X축: 자뼈 길이 (cm) / Y축: 키 (cm)</span>
              <div className="flex items-center gap-1">
                <span>데이터 개수:</span>
                {[12, 24, 36].map((num) => (
                  <button
                    key={num}
                    onClick={() => setScatterDensity(num)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                      scatterDensity === num ? 'bg-[#2d6a63] text-white' : 'bg-white text-[#68727d]'
                    }`}
                  >
                    {num}개
                  </button>
                ))}
              </div>
            </div>

            {/* 시각화 박스 */}
            <div className="relative w-full h-[150px] bg-white rounded-xl border border-[rgba(31,41,51,0.08)] overflow-hidden shadow-inner p-2">
              {/* 축 라인 */}
              <div className="absolute left-6 bottom-5 right-3 top-3 border-l-2 border-b-2 border-[#cbd5e1]">
                {/* 그리드 선 */}
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-30">
                  <div className="border-r border-t border-slate-300"></div>
                  <div className="border-r border-t border-slate-300"></div>
                  <div className="border-r border-t border-slate-300"></div>
                  <div className="border-t border-slate-300"></div>
                </div>

                {/* 데이터 점들 */}
                {scatterPoints.map((pt, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.02, type: 'spring', stiffness: 260, damping: 20 }}
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ left: `${pt.x}%`, bottom: `${pt.y}%` }}
                    className="absolute w-3 h-3 -ml-1.5 -mb-1.5 rounded-full bg-[#2d6a63] border-2 border-white shadow-sm cursor-pointer hover:scale-150 hover:bg-[#d58a4b] transition-all z-10"
                  />
                ))}

                {hoveredPoint && (
                  <div 
                    style={{ left: `${hoveredPoint.x}%`, bottom: `${Math.min(75, hoveredPoint.y + 8)}%` }}
                    className="absolute z-20 -translate-x-1/2 bg-[#1f2933] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md pointer-events-none whitespace-nowrap"
                  >
                    자뼈: {hoveredPoint.x}cm, 키: {Math.round(110 + hoveredPoint.y * 0.8)}cm
                  </div>
                )}
              </div>
              <div className="absolute left-1 top-2 text-[10px] font-bold text-[#94a3b8]">키 ↑</div>
              <div className="absolute right-2 bottom-0.5 text-[10px] font-bold text-[#94a3b8]">자뼈 →</div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] text-[#68727d] font-medium">
                💡 점 위에 마우스를 올리면 구체적인 측정값을 확인할 수 있습니다.
              </span>
              <button
                type="button"
                onClick={() => setExpandedCard('scatter')}
                className="text-[11px] text-[#2d6a63] font-black hover:underline flex items-center gap-0.5"
              >
                더 크게 보기 →
              </button>
            </div>
          </div>
        </div>

        {/* ===================== 개념 2: 상관관계 ===================== */}
        <div
          onClick={() => setActiveCard('correlation')}
          className={`rounded-[24px] border p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
            activeCard === 'correlation'
              ? 'bg-white border-[#2d6a63] shadow-[0_16px_36px_rgba(45,106,99,0.12)] ring-2 ring-[#2d6a63]/20'
              : 'bg-[#fffdf8] border-[rgba(31,41,51,0.08)] shadow-[0_4px_16px_rgba(40,45,50,0.03)] hover:border-[#2d6a63]/40'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCard === 'correlation' ? 'bg-[#2d6a63] text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-[830] text-[#1f2933]">
                    2. 상관관계 <span className="text-[13px] font-normal text-[#68727d]">(Correlation)</span>
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard('correlation');
                  }}
                  className="bg-emerald-100 hover:bg-emerald-600 text-emerald-800 hover:text-white px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all shadow-2xs hover:shadow-xs"
                  title="상관관계 크게 확대해서 보기"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>크게 보기</span>
                </button>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  경향성
                </span>
              </div>
            </div>

            <p className="text-[13px] sm:text-[14px] text-[#4b5563] font-semibold mb-3">
              한 변수가 변할 때 다른 변수도 <strong className="text-[#2d6a63]">함께 변하는 규칙적 경향성</strong>
            </p>

            <p className="text-[12px] sm:text-[13px] text-[#68727d] leading-relaxed">
              점들의 분포가 어떤 방향으로 뻗어있는지 관찰합니다. 함께 커지면 <strong>양(+)</strong>, 반대로 줄어들면 <strong>음(-)</strong>의 관계입니다.
            </p>
          </div>

          {/* 인터랙티브 영역 */}
          <div className="mt-4 p-3.5 bg-[#f8f5ee] rounded-2xl border border-[rgba(31,41,51,0.06)]" onClick={(e) => e.stopPropagation()}>
            {/* 3가지 버튼 */}
            <div className="grid grid-cols-3 gap-2 mb-2">
              <button
                onClick={() => setCorrType('positive')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  corrType === 'positive'
                    ? 'bg-[#2d6a63] text-white shadow-sm'
                    : 'bg-white text-[#4b5563] hover:bg-slate-50'
                }`}
              >
                📈 양(+)의 상관
              </button>
              <button
                onClick={() => setCorrType('negative')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  corrType === 'negative'
                    ? 'bg-[#d58a4b] text-white shadow-sm'
                    : 'bg-white text-[#4b5563] hover:bg-slate-50'
                }`}
              >
                📉 음(-)의 상관
              </button>
              <button
                onClick={() => setCorrType('none')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  corrType === 'none'
                    ? 'bg-[#64748b] text-white shadow-sm'
                    : 'bg-white text-[#4b5563] hover:bg-slate-50'
                }`}
              >
                🎲 무상관
              </button>
            </div>

            {/* 시각화 박스 */}
            <div className="relative w-full h-[150px] bg-white rounded-xl border border-[rgba(31,41,51,0.08)] overflow-hidden shadow-inner p-2">
              <div className="absolute left-6 bottom-5 right-3 top-3 border-l-2 border-b-2 border-[#cbd5e1]">
                {corrPoints.map((pt, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ left: `${pt.x}%`, bottom: `${pt.y}%` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                    className={`absolute w-3 h-3 -ml-1.5 -mb-1.5 rounded-full border-2 border-white shadow-sm ${
                      corrType === 'positive'
                        ? 'bg-[#2d6a63]'
                        : corrType === 'negative'
                        ? 'bg-[#d58a4b]'
                        : 'bg-[#64748b]'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute left-1 top-2 text-[10px] font-bold text-[#94a3b8]">Y ↑</div>
              <div className="absolute right-2 bottom-0.5 text-[10px] font-bold text-[#94a3b8]">X →</div>
            </div>

            {/* 설명 텍스트 */}
            <div className="mt-2 flex items-center justify-between text-xs font-bold">
              <div className="text-[#1f2933]">
                {corrType === 'positive' && (
                  <span className="text-[#2d6a63]">자뼈가 길수록 키도 함께 커집니다!</span>
                )}
                {corrType === 'negative' && (
                  <span className="text-[#d58a4b]">고도가 높을수록 기온은 낮아집니다!</span>
                )}
                {corrType === 'none' && (
                  <span className="text-[#64748b]">발 크기와 시력은 연관이 없습니다.</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setExpandedCard('correlation')}
                className="text-[11px] text-[#2d6a63] font-black hover:underline flex items-center gap-0.5"
              >
                더 크게 보기 →
              </button>
            </div>
          </div>
        </div>

        {/* ===================== 개념 3: 상관계수 ===================== */}
        <div
          onClick={() => setActiveCard('coefficient')}
          className={`rounded-[24px] border p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
            activeCard === 'coefficient'
              ? 'bg-white border-[#2d6a63] shadow-[0_16px_36px_rgba(45,106,99,0.12)] ring-2 ring-[#2d6a63]/20'
              : 'bg-[#fffdf8] border-[rgba(31,41,51,0.08)] shadow-[0_4px_16px_rgba(40,45,50,0.03)] hover:border-[#2d6a63]/40'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCard === 'coefficient' ? 'bg-[#2d6a63] text-white' : 'bg-purple-100 text-purple-700'}`}>
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-[830] text-[#1f2933]">
                    3. 상관계수 <span className="text-[13px] font-normal text-[#68727d]">(r, Correlation Coefficient)</span>
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard('coefficient');
                  }}
                  className="bg-purple-100 hover:bg-purple-600 text-purple-800 hover:text-white px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all shadow-2xs hover:shadow-xs"
                  title="상관계수 크게 확대해서 보기"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>크게 보기</span>
                </button>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                  수치화 (-1 ~ +1)
                </span>
              </div>
            </div>

            <p className="text-[13px] sm:text-[14px] text-[#4b5563] font-semibold mb-3">
              상관관계의 강도를 <strong className="text-[#2d6a63]">-1부터 +1 사이의 수치(r)</strong>로 정밀하게 나타낸 값
            </p>

            <p className="text-[12px] sm:text-[13px] text-[#68727d] leading-relaxed">
              $|r|$이 1에 가까울수록 점들이 직선 주위에 빽빽하게 모이고, 0에 가까울수록 흩어집니다.
            </p>
          </div>

          {/* 인터랙티브 영역 */}
          <div className="mt-4 p-3.5 bg-[#f8f5ee] rounded-2xl border border-[rgba(31,41,51,0.06)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between text-xs font-extrabold text-[#4b5563] mb-1">
              <span>-1.0 (완벽한 음)</span>
              <span className="text-purple-700 font-mono text-base bg-white px-2 py-0.5 rounded-md border shadow-xs">
                r = {rValue > 0 ? `+${rValue.toFixed(2)}` : rValue.toFixed(2)}
              </span>
              <span>+1.0 (완벽한 양)</span>
            </div>

            {/* 슬라이더 */}
            <input
              type="range"
              min="-1"
              max="1"
              step="0.05"
              value={rValue}
              onChange={(e) => setRValue(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2d6a63] my-2"
            />

            {/* 시각화 박스 */}
            <div className="relative w-full h-[140px] bg-white rounded-xl border border-[rgba(31,41,51,0.08)] overflow-hidden shadow-inner p-2">
              <div className="absolute left-6 bottom-5 right-3 top-3 border-l-2 border-b-2 border-[#cbd5e1]">
                {coeffPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    style={{ left: `${pt.x}%`, bottom: `${pt.y}%` }}
                    className={`absolute w-2.5 h-2.5 -ml-1 -mb-1 rounded-full border border-white transition-all duration-150 ${
                      rValue > 0.3
                        ? 'bg-[#2d6a63]'
                        : rValue < -0.3
                        ? 'bg-[#d58a4b]'
                        : 'bg-[#94a3b8]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs font-bold">
              <div>
                {Math.abs(rValue) >= 0.7 && (
                  <span className="text-[#2d6a63]">🔥 매우 강한 상관관계 (직선 형태)</span>
                )}
                {Math.abs(rValue) >= 0.3 && Math.abs(rValue) < 0.7 && (
                  <span className="text-amber-700">✨ 뚜렷한 경향성 (약간의 오차)</span>
                )}
                {Math.abs(rValue) < 0.3 && (
                  <span className="text-slate-500">💨 상관관계 거의 없음</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setExpandedCard('coefficient')}
                className="text-[11px] text-[#2d6a63] font-black hover:underline flex items-center gap-0.5"
              >
                더 크게 보기 →
              </button>
            </div>
          </div>
        </div>

        {/* ===================== 개념 4: 선형회귀 ===================== */}
        <div
          onClick={() => setActiveCard('regression')}
          className={`rounded-[24px] border p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
            activeCard === 'regression'
              ? 'bg-white border-[#2d6a63] shadow-[0_16px_36px_rgba(45,106,99,0.12)] ring-2 ring-[#2d6a63]/20'
              : 'bg-[#fffdf8] border-[rgba(31,41,51,0.08)] shadow-[0_4px_16px_rgba(40,45,50,0.03)] hover:border-[#2d6a63]/40'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCard === 'regression' ? 'bg-[#2d6a63] text-white' : 'bg-red-100 text-red-700'}`}>
                  <LineChartIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-[830] text-[#1f2933]">
                    4. 선형회귀 <span className="text-[13px] font-normal text-[#68727d]">(Linear Regression)</span>
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard('regression');
                  }}
                  className="bg-red-100 hover:bg-red-600 text-red-800 hover:text-white px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all shadow-2xs hover:shadow-xs"
                  title="선형회귀 크게 확대해서 보기"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>크게 보기</span>
                </button>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-red-50 text-red-700">
                  예측 모델 ($y=ax+b$)
                </span>
              </div>
            </div>

            <p className="text-[13px] sm:text-[14px] text-[#4b5563] font-semibold mb-3">
              데이터의 경향성을 가장 잘 나타내는 <strong className="text-[#2d6a63]">최적의 예측 직선을 찾는 과정</strong>
            </p>

            <p className="text-[12px] sm:text-[13px] text-[#68727d] leading-relaxed">
              점들과 직선 사이의 거리(오차)의 제곱합을 최소로 만드는 **회귀선**을 그어, 아직 재보지 않은 친구의 키를 예측합니다.
            </p>
          </div>

          {/* 인터랙티브 영역 */}
          <div className="mt-4 p-3.5 bg-[#f8f5ee] rounded-2xl border border-[rgba(31,41,51,0.06)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRegressionLine(!showRegressionLine)}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs ${
                    showRegressionLine ? 'bg-red-600 text-white' : 'bg-white text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  {showRegressionLine ? '회귀선 숨기기' : '최적 회귀선 긋기'}
                </button>

                {showRegressionLine && (
                  <button
                    onClick={() => setShowResiduals(!showResiduals)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                      showResiduals ? 'bg-[#1f2933] text-white' : 'bg-white text-[#68727d]'
                    }`}
                  >
                    오차(거리) 표시
                  </button>
                )}
              </div>

              {showRegressionLine && (
                <span className="text-xs font-mono font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                  y = 4.2x + 60.5
                </span>
              )}
            </div>

            {/* 시각화 박스 */}
            <div className="relative w-full h-[150px] bg-white rounded-xl border border-[rgba(31,41,51,0.08)] overflow-hidden shadow-inner p-2">
              <div className="absolute left-6 bottom-5 right-3 top-3 border-l-2 border-b-2 border-[#cbd5e1]">
                {/* 오차선(잔차) 렌더링 */}
                {showRegressionLine && showResiduals && regressionPoints.map((pt, idx) => {
                  const lineY = 15 + (pt.x - 15) * 3.4;
                  const top = Math.min(100 - pt.y, 100 - lineY);
                  const height = Math.abs(pt.y - lineY);
                  return (
                    <div
                      key={`res-${idx}`}
                      style={{
                        left: `${pt.x * 2.6}%`,
                        bottom: `${Math.min(pt.y, lineY)}%`,
                        height: `${height}%`,
                      }}
                      className="absolute w-0.5 border-r border-dashed border-red-400 z-5"
                    />
                  );
                })}

                {/* 데이터 점들 */}
                {regressionPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    style={{ left: `${pt.x * 2.6}%`, bottom: `${pt.y}%` }}
                    className="absolute w-3 h-3 -ml-1.5 -mb-1.5 rounded-full bg-[#1f2933] border-2 border-white shadow-sm z-10"
                  />
                ))}

                {/* 회귀선 (SVG) */}
                {showRegressionLine && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <motion.line
                      x1="5%"
                      y1="85%"
                      x2="95%"
                      y2="15%"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* 실시간 예측 체험기 */}
            <div className="mt-2.5 pt-2 border-t border-[rgba(31,41,51,0.06)] flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <span>자뼈:</span>
                <input
                  type="number"
                  min="15"
                  max="35"
                  value={predictX}
                  onChange={(e) => setPredictX(Number(e.target.value) || 20)}
                  className="w-12 text-center bg-white border border-slate-300 rounded px-1 py-0.5 text-xs font-black text-[#2d6a63]"
                />
                <span>cm →</span>
                <span className="bg-[#2d6a63] text-white px-2 py-0.5 rounded font-black text-xs">
                  키 {predictedY}cm
                </span>
              </div>
              <button
                type="button"
                onClick={() => setExpandedCard('regression')}
                className="text-[11px] text-[#2d6a63] font-black hover:underline flex items-center gap-0.5"
              >
                더 크게 보기 →
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 요약 풋터 팁 */}
      <div className="mt-4 p-3.5 bg-white rounded-2xl border border-[rgba(31,41,51,0.08)] flex items-center justify-between text-xs sm:text-sm text-[#4b5563] shadow-xs">
        <div className="flex items-center gap-2 font-bold">
          <CheckCircle2 className="w-4 h-4 text-[#2d6a63] shrink-0" />
          <span>
            <strong>데이터 과학의 흐름:</strong> 산점도(점 찍기) → 상관관계(패턴 파악) → 상관계수(수치 측정) → 선형회귀(공식 도출 및 예측)
          </span>
        </div>
        <span className="hidden sm:inline font-bold text-[#2d6a63]">
          각 카드의 [크게 보기]를 누르면 대화면으로 자세히 조작할 수 있습니다!
        </span>
      </div>

      {/* ===================== 대화면 확대 보기 모달 ===================== */}
      <AnimatePresence>
        {expandedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#fffdf8] w-full max-w-5xl max-h-[92vh] rounded-[28px] sm:rounded-[36px] shadow-2xl border border-[rgba(31,41,51,0.12)] flex flex-col overflow-hidden"
            >
              {/* 모달 상단 헤더 */}
              <div className="p-4 sm:p-6 bg-white border-b border-[rgba(31,41,51,0.08)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#2d6a63] text-white flex items-center justify-center shadow-md">
                    {expandedCard === 'scatter' && <ScatterIcon className="w-6 h-6" />}
                    {expandedCard === 'correlation' && <TrendingUp className="w-6 h-6" />}
                    {expandedCard === 'coefficient' && <Gauge className="w-6 h-6" />}
                    {expandedCard === 'regression' && <LineChartIcon className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-[850] text-[#1f2933]">
                        {expandedCard === 'scatter' && '1. 산점도 (Scatter Plot)'}
                        {expandedCard === 'correlation' && '2. 상관관계 (Correlation)'}
                        {expandedCard === 'coefficient' && '3. 상관계수 (Correlation Coefficient, r)'}
                        {expandedCard === 'regression' && '4. 선형회귀 (Linear Regression, y=ax+b)'}
                      </h3>
                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#2d6a63]/10 text-[#2d6a63]">
                        {expandedCard === 'scatter' && '데이터 시각화의 첫걸음'}
                        {expandedCard === 'correlation' && '두 변수의 경향성 파악'}
                        {expandedCard === 'coefficient' && '수치적 관계 강도 (-1 ~ +1)'}
                        {expandedCard === 'regression' && '최적의 예측 수학 모델'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#68727d] font-semibold mt-0.5">
                      {expandedCard === 'scatter' && '자뼈 길이와 키의 짝을 좌표평면에 점으로 찍어 전체적인 분포를 시각화합니다.'}
                      {expandedCard === 'correlation' && '한 변수가 커질 때 다른 변수가 함께 커지는지, 작아지는지 방향성을 찾습니다.'}
                      {expandedCard === 'coefficient' && '상관관계의 강도를 피어슨 상관계수(r)로 정확한 수치로 정량화합니다.'}
                      {expandedCard === 'regression' && '데이터 점들과의 오차가 가장 적은 최적의 직선 방정식을 찾아 미지의 값을 예측합니다.'}
                    </p>
                  </div>
                </div>

                {/* 컨트롤 버튼: 이전/다음 & 닫기 */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center bg-[#f0ebd9] p-1 rounded-xl gap-1">
                    <button
                      onClick={handlePrevExpanded}
                      className="p-1.5 rounded-lg hover:bg-white text-[#1f2933] transition-colors"
                      title="이전 개념 보기"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-black px-2 text-[#68727d]">
                      {cardsList.findIndex(c => c.id === expandedCard) + 1} / 4
                    </span>
                    <button
                      onClick={handleNextExpanded}
                      className="p-1.5 rounded-lg hover:bg-white text-[#1f2933] transition-colors"
                      title="다음 개념 보기"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => setExpandedCard(null)}
                    className="p-2 sm:p-2.5 rounded-2xl bg-[#f8f5ee] hover:bg-[#ebe4d5] text-[#1f2933] transition-colors cursor-pointer"
                    title="닫기 (ESC)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 모달 바디 (스크롤 가능) */}
              <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6">
                
                {/* 1. 산점도 대화면 */}
                {expandedCard === 'scatter' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* 왼쪽: 심층 원리 및 안내 */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-white p-5 rounded-2xl border border-[rgba(31,41,51,0.08)] shadow-xs">
                        <h4 className="text-base font-extrabold text-[#2d6a63] flex items-center gap-2 mb-2">
                          <Lightbulb className="w-5 h-5" />
                          산점도란 무엇일까요?
                        </h4>
                        <p className="text-sm text-[#4b5563] leading-relaxed">
                          산점도(散點圖, Scatter Plot)는 **흩어질 산(散), 점 점(點)** 자를 써서 <strong>'점들을 흩뿌려 놓은 그림'</strong>이라는 뜻입니다.
                        </p>
                        <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#4b5563]">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a63] mt-2 shrink-0"></span>
                            <span><strong>X축:</strong> 원인이 되거나 설명하는 변수 (예: 자뼈 길이 cm)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a63] mt-2 shrink-0"></span>
                            <span><strong>Y축:</strong> 반응하거나 예측하려는 변수 (예: 실제 키 cm)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a63] mt-2 shrink-0"></span>
                            <span><strong>이상치(Outlier) 발견:</strong> 전체 무리에서 유독 멀리 떨어진 특별한 데이터를 즉시 발견할 수 있습니다.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-[#f4efe4] p-4 rounded-2xl border border-[rgba(31,41,51,0.06)] text-xs text-[#68727d] space-y-1">
                        <p className="font-extrabold text-[#1f2933]">🎯 탐구 팁:</p>
                        <p>오른쪽 그래프의 점 위에 마우스를 올리면 각 친구의 구체적인 자뼈 길이와 키 값이 표시됩니다.</p>
                      </div>
                    </div>

                    {/* 오른쪽: 대형 인터랙티브 산점도 */}
                    <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[rgba(31,41,51,0.08)] shadow-md">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                        <div className="text-sm font-black text-[#1f2933]">
                          실시간 산점도 시뮬레이터 (자뼈 15~35cm vs 키 120~185cm)
                        </div>
                        <div className="flex items-center gap-1 bg-[#f8f5ee] p-1 rounded-xl">
                          <span className="text-xs font-bold text-[#68727d] px-2">데이터 표본:</span>
                          {[12, 24, 36, 48].map((num) => (
                            <button
                              key={num}
                              onClick={() => setScatterDensity(num)}
                              className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                                scatterDensity === num ? 'bg-[#2d6a63] text-white shadow-xs' : 'bg-transparent text-[#68727d] hover:text-[#1f2933]'
                              }`}
                            >
                              {num}명
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 큰 캔버스 영역 */}
                      <div className="relative w-full h-[320px] sm:h-[380px] bg-[#faf8f5] rounded-2xl border border-slate-200 overflow-hidden p-4">
                        <div className="absolute left-12 bottom-10 right-6 top-6 border-l-2 border-b-2 border-[#94a3b8]">
                          {/* 격자망 */}
                          <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 opacity-40">
                            {Array.from({ length: 30 }).map((_, i) => (
                              <div key={i} className="border-r border-t border-slate-300" />
                            ))}
                          </div>

                          {/* 점들 */}
                          {scatterPoints.map((pt, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: idx * 0.015, type: 'spring' }}
                              onMouseEnter={() => setHoveredPoint(pt)}
                              onMouseLeave={() => setHoveredPoint(null)}
                              style={{ left: `${pt.x}%`, bottom: `${pt.y}%` }}
                              className="absolute w-4 h-4 -ml-2 -mb-2 rounded-full bg-[#2d6a63] border-2 border-white shadow-md cursor-pointer hover:scale-175 hover:bg-[#d58a4b] transition-all z-10"
                            />
                          ))}

                          {hoveredPoint && (
                            <div 
                              style={{ left: `${hoveredPoint.x}%`, bottom: `${Math.min(80, hoveredPoint.y + 7)}%` }}
                              className="absolute z-20 -translate-x-1/2 bg-[#1f2933] text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-xl pointer-events-none whitespace-nowrap border border-white/20"
                            >
                              친구 자뼈: {hoveredPoint.x}cm / 실제 키: {Math.round(110 + hoveredPoint.y * 0.8)}cm
                            </div>
                          )}
                        </div>

                        {/* 축 라벨 */}
                        <div className="absolute left-3 top-6 text-xs font-extrabold text-[#64748b]">
                          키 (cm) ↑
                        </div>
                        <div className="absolute right-6 bottom-3 text-xs font-extrabold text-[#64748b]">
                          자뼈 길이 (cm) →
                        </div>
                      </div>

                      <div className="mt-3 text-center text-xs text-[#68727d] font-bold">
                        {hoveredPoint 
                          ? `선택된 데이터: 자뼈 ${hoveredPoint.x}cm, 키 ${Math.round(110 + hoveredPoint.y * 0.8)}cm`
                          : '점 위에 마우스를 올리면 정확한 측정 좌표를 확인할 수 있습니다.'}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. 상관관계 대화면 */}
                {expandedCard === 'correlation' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-white p-5 rounded-2xl border border-[rgba(31,41,51,0.08)] shadow-xs">
                        <h4 className="text-base font-extrabold text-emerald-800 flex items-center gap-2 mb-2">
                          <Lightbulb className="w-5 h-5" />
                          상관관계의 3가지 유형
                        </h4>
                        <div className="space-y-3 text-xs sm:text-sm text-[#4b5563]">
                          <div className={`p-3 rounded-xl border transition-all ${corrType === 'positive' ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200' : 'bg-[#faf8f5] border-slate-200'}`}>
                            <strong className="text-[#2d6a63] block text-sm">📈 1. 양(+)의 상관관계 (Positive)</strong>
                            <p className="mt-1 text-xs text-[#4b5563]">한쪽이 커질 때 다른 쪽도 함께 커지는 관계 (예: 자뼈 길이와 키, 키와 몸무게, 공부 시간과 성적)</p>
                          </div>

                          <div className={`p-3 rounded-xl border transition-all ${corrType === 'negative' ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200' : 'bg-[#faf8f5] border-slate-200'}`}>
                            <strong className="text-[#d58a4b] block text-sm">📉 2. 음(-)의 상관관계 (Negative)</strong>
                            <p className="mt-1 text-xs text-[#4b5563]">한쪽이 커질 때 다른 쪽은 반대로 줄어드는 관계 (예: 산의 고도와 기온, 스마트폰 사용 시간과 수면 시간)</p>
                          </div>

                          <div className={`p-3 rounded-xl border transition-all ${corrType === 'none' ? 'bg-slate-100 border-slate-300 ring-2 ring-slate-200' : 'bg-[#faf8f5] border-slate-200'}`}>
                            <strong className="text-slate-700 block text-sm">🎲 3. 무상관 (No Correlation)</strong>
                            <p className="mt-1 text-xs text-[#4b5563]">두 변수 사이에 아무런 규칙적 연관성이 없는 상태 (예: 발 크기와 시력, 생일과 수학 점수)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[rgba(31,41,51,0.08)] shadow-md">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                        <div className="text-sm font-black text-[#1f2933]">
                          상관관계 패턴 변환기
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setCorrType('positive')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                              corrType === 'positive' ? 'bg-[#2d6a63] text-white shadow-sm' : 'bg-[#f8f5ee] text-[#4b5563] hover:bg-slate-200'
                            }`}
                          >
                            📈 양(+)의 상관
                          </button>
                          <button
                            onClick={() => setCorrType('negative')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                              corrType === 'negative' ? 'bg-[#d58a4b] text-white shadow-sm' : 'bg-[#f8f5ee] text-[#4b5563] hover:bg-slate-200'
                            }`}
                          >
                            📉 음(-)의 상관
                          </button>
                          <button
                            onClick={() => setCorrType('none')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                              corrType === 'none' ? 'bg-[#64748b] text-white shadow-sm' : 'bg-[#f8f5ee] text-[#4b5563] hover:bg-slate-200'
                            }`}
                          >
                            🎲 무상관
                          </button>
                        </div>
                      </div>

                      <div className="relative w-full h-[320px] sm:h-[380px] bg-[#faf8f5] rounded-2xl border border-slate-200 overflow-hidden p-4">
                        <div className="absolute left-12 bottom-10 right-6 top-6 border-l-2 border-b-2 border-[#94a3b8]">
                          {corrPoints.map((pt, idx) => (
                            <motion.div
                              key={idx}
                              animate={{ left: `${pt.x}%`, bottom: `${pt.y}%` }}
                              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                              className={`absolute w-4 h-4 -ml-2 -mb-2 rounded-full border-2 border-white shadow-md ${
                                corrType === 'positive'
                                  ? 'bg-[#2d6a63]'
                                  : corrType === 'negative'
                                  ? 'bg-[#d58a4b]'
                                  : 'bg-[#64748b]'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="absolute left-3 top-6 text-xs font-extrabold text-[#64748b]">Y 축 ↑</div>
                        <div className="absolute right-6 bottom-3 text-xs font-extrabold text-[#64748b]">X 축 →</div>
                      </div>

                      <div className="mt-4 p-3.5 rounded-xl bg-[#f8f5ee] text-center font-black text-sm">
                        {corrType === 'positive' && (
                          <span className="text-[#2d6a63]">우상향(↗) 방향으로 점들이 뻗어 있습니다. 자뼈가 길수록 키도 확실히 커집니다!</span>
                        )}
                        {corrType === 'negative' && (
                          <span className="text-[#d58a4b]">우하향(↘) 방향으로 점들이 뻗어 있습니다. X가 커질수록 Y는 반대로 감소합니다.</span>
                        )}
                        {corrType === 'none' && (
                          <span className="text-[#64748b]">특정한 방향성 없이 사방으로 흩어져 있어 두 변수 사이에는 관계가 없습니다.</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. 상관계수 대화면 */}
                {expandedCard === 'coefficient' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-white p-5 rounded-2xl border border-[rgba(31,41,51,0.08)] shadow-xs">
                        <h4 className="text-base font-extrabold text-purple-800 flex items-center gap-2 mb-2">
                          <Lightbulb className="w-5 h-5" />
                          피어슨 상관계수(r) 해석 기준표
                        </h4>
                        <div className="space-y-2 text-xs sm:text-sm text-[#4b5563]">
                          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                            <strong>0.7 ≤ |r| ≤ 1.0 :</strong> <span className="text-[#2d6a63] font-bold">매우 강한 상관관계</span> (직선에 매우 가깝게 밀집)
                          </div>
                          <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200">
                            <strong>0.4 ≤ |r| &lt; 0.7 :</strong> <span className="text-teal-700 font-bold">뚜렷한 양/음의 상관관계</span> (인체 측정 데이터의 일반적 범위)
                          </div>
                          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                            <strong>0.2 ≤ |r| &lt; 0.4 :</strong> <span className="text-amber-800 font-bold">약한 상관관계</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                            <strong>|r| &lt; 0.2 :</strong> <span className="text-slate-600 font-bold">상관관계 없음</span> (원형이나 무작위로 흩어짐)
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 leading-relaxed font-semibold">
                          ⚠️ <strong>주의:</strong> 상관관계가 높다고 해서 반드시 인과관계(원인과 결과)인 것은 아닙니다!
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[rgba(31,41,51,0.08)] shadow-md">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                        <div className="text-sm font-black text-[#1f2933]">
                          상관계수(r) 조절 슬라이더
                        </div>
                        <div className="text-lg font-mono font-black text-purple-700 bg-purple-50 px-4 py-1 rounded-xl border border-purple-200 shadow-xs">
                          r = {rValue > 0 ? `+${rValue.toFixed(2)}` : rValue.toFixed(2)}
                        </div>
                      </div>

                      <div className="px-2 mb-4">
                        <div className="flex justify-between text-xs font-extrabold text-[#68727d] mb-1">
                          <span>-1.0 (완벽한 음의 직선)</span>
                          <span>0.0 (완전 무상관)</span>
                          <span>+1.0 (완벽한 양의 직선)</span>
                        </div>
                        <input
                          type="range"
                          min="-1"
                          max="1"
                          step="0.05"
                          value={rValue}
                          onChange={(e) => setRValue(parseFloat(e.target.value))}
                          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2d6a63]"
                        />
                      </div>

                      <div className="relative w-full h-[280px] sm:h-[340px] bg-[#faf8f5] rounded-2xl border border-slate-200 overflow-hidden p-4">
                        <div className="absolute left-12 bottom-10 right-6 top-6 border-l-2 border-b-2 border-[#94a3b8]">
                          {coeffPoints.map((pt, idx) => (
                            <div
                              key={idx}
                              style={{ left: `${pt.x}%`, bottom: `${pt.y}%` }}
                              className={`absolute w-3.5 h-3.5 -ml-1.5 -mb-1.5 rounded-full border border-white shadow-sm transition-all duration-150 ${
                                rValue > 0.3
                                  ? 'bg-[#2d6a63]'
                                  : rValue < -0.3
                                  ? 'bg-[#d58a4b]'
                                  : 'bg-[#94a3b8]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 p-3.5 rounded-xl bg-[#f8f5ee] text-center font-black text-sm">
                        {Math.abs(rValue) >= 0.7 && (
                          <span className="text-[#2d6a63]">🔥 강한 상관관계! 점들이 좁은 띠(직선) 형태로 매우 빽빽하게 정렬됩니다.</span>
                        )}
                        {Math.abs(rValue) >= 0.3 && Math.abs(rValue) < 0.7 && (
                          <span className="text-amber-800">✨ 뚜렷한 경향성! 대략적인 추세선 주위로 점들이 흩어져 있습니다.</span>
                        )}
                        {Math.abs(rValue) < 0.3 && (
                          <span className="text-slate-600">💨 무상관 상태! 점들이 둥근 구름처럼 사방으로 흩어져 있습니다.</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. 선형회귀 대화면 */}
                {expandedCard === 'regression' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-white p-5 rounded-2xl border border-[rgba(31,41,51,0.08)] shadow-xs">
                        <h4 className="text-base font-extrabold text-red-700 flex items-center gap-2 mb-2">
                          <Lightbulb className="w-5 h-5" />
                          선형회귀(Linear Regression)의 마법
                        </h4>
                        <p className="text-sm text-[#4b5563] leading-relaxed">
                          수많은 점들 사이를 관통하는 <strong>최적의 직선 공식($y = ax + b$)</strong>을 수학적으로 찾아내는 데이터 과학 기법입니다.
                        </p>
                        <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#4b5563]">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <strong>최소제곱법(Least Squares):</strong> 각 점들과 직선 사이의 수직 거리(오차)의 제곱의 합이 가장 작아지는 직선을 긋습니다.
                          </div>
                          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-900 font-mono">
                            <strong>우리 반 예측 공식 모델 예시:</strong><br />
                            실제 키 = (4.2 × 자뼈 길이) + 60.5
                          </div>
                        </div>
                      </div>

                      {/* 인터랙티브 예측기 */}
                      <div className="bg-[#f8f5ee] p-5 rounded-2xl border border-[rgba(31,41,51,0.06)] shadow-xs">
                        <h5 className="text-sm font-extrabold text-[#1f2933] mb-3 flex items-center gap-1.5">
                          🔮 인공지능/수학 모델 키 예측기
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs font-bold text-[#68727d] mb-1">
                              <span>자뼈 길이 입력 (슬라이더 또는 직접 입력):</span>
                              <span className="text-[#2d6a63] font-extrabold">{predictX} cm</span>
                            </div>
                            <input
                              type="range"
                              min="15"
                              max="35"
                              step="0.5"
                              value={predictX}
                              onChange={(e) => setPredictX(parseFloat(e.target.value))}
                              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                            />
                          </div>

                          <div className="p-4 bg-white rounded-xl border border-red-200 text-center shadow-xs">
                            <span className="text-xs text-[#68727d] font-bold block">선형회귀 모델이 예측한 키</span>
                            <span className="text-3xl font-[850] text-red-600 font-mono">
                              {predictedY} <span className="text-lg text-[#1f2933]">cm</span>
                            </span>
                            <p className="text-[11px] text-[#68727d] mt-1">
                              공식: 키 ≈ 4.2 × {predictX} + 60.5 = {predictedY}cm
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[rgba(31,41,51,0.08)] shadow-md">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowRegressionLine(!showRegressionLine)}
                            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${
                              showRegressionLine ? 'bg-red-600 text-white' : 'bg-[#f8f5ee] text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <Sparkles className="w-4 h-4" />
                            {showRegressionLine ? '회귀선 끄기' : '최적 회귀선(추세선) 긋기'}
                          </button>

                          {showRegressionLine && (
                            <button
                              onClick={() => setShowResiduals(!showResiduals)}
                              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                                showResiduals ? 'bg-[#1f2933] text-white' : 'bg-[#f8f5ee] text-[#68727d]'
                              }`}
                            >
                              오차(잔차) 선 표시
                            </button>
                          )}
                        </div>

                        {showRegressionLine && (
                          <div className="font-mono text-sm font-black text-red-600 bg-red-50 px-3 py-1 rounded-xl border border-red-200 shadow-xs">
                            y = 4.2x + 60.5
                          </div>
                        )}
                      </div>

                      <div className="relative w-full h-[320px] sm:h-[380px] bg-[#faf8f5] rounded-2xl border border-slate-200 overflow-hidden p-4">
                        <div className="absolute left-12 bottom-10 right-6 top-6 border-l-2 border-b-2 border-[#94a3b8]">
                          {/* 격자 */}
                          <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 opacity-40">
                            {Array.from({ length: 30 }).map((_, i) => (
                              <div key={i} className="border-r border-t border-slate-300" />
                            ))}
                          </div>

                          {/* 잔차 선 */}
                          {showRegressionLine && showResiduals && regressionPoints.map((pt, idx) => {
                            const lineY = 15 + (pt.x - 15) * 3.4;
                            const height = Math.abs(pt.y - lineY);
                            return (
                              <div
                                key={`res-lg-${idx}`}
                                style={{
                                  left: `${pt.x * 2.6}%`,
                                  bottom: `${Math.min(pt.y, lineY)}%`,
                                  height: `${height}%`,
                                }}
                                className="absolute w-1 border-r-2 border-dashed border-red-400 z-5"
                              />
                            );
                          })}

                          {/* 데이터 점들 */}
                          {regressionPoints.map((pt, idx) => (
                            <div
                              key={idx}
                              style={{ left: `${pt.x * 2.6}%`, bottom: `${pt.y}%` }}
                              className="absolute w-4 h-4 -ml-2 -mb-2 rounded-full bg-[#1f2933] border-2 border-white shadow-md z-10"
                            />
                          ))}

                          {/* 회귀선 */}
                          {showRegressionLine && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                              <motion.line
                                x1="5%"
                                y1="85%"
                                x2="95%"
                                y2="15%"
                                stroke="#ef4444"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                              />
                            </svg>
                          )}
                        </div>

                        <div className="absolute left-3 top-6 text-xs font-extrabold text-[#64748b]">키 (cm) ↑</div>
                        <div className="absolute right-6 bottom-3 text-xs font-extrabold text-[#64748b]">자뼈 길이 (cm) →</div>
                      </div>

                      <div className="mt-4 p-3.5 rounded-xl bg-[#f8f5ee] text-center font-black text-sm">
                        {showRegressionLine 
                          ? '빨간색 회귀선은 데이터의 평균적인 흐름을 나타내며, 새로운 자뼈 길이를 대입하면 키를 예측할 수 있습니다.'
                          : '상단의 [최적 회귀선 긋기] 버튼을 눌러 점들 사이를 가장 잘 설명하는 추세선을 확인해보세요.'}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* 모달 하단 내비게이션 */}
              <div className="p-4 bg-[#f8f5ee] border-t border-[rgba(31,41,51,0.08)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {cardsList.map((card, idx) => (
                    <button
                      key={card.id}
                      onClick={() => setExpandedCard(card.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                        expandedCard === card.id
                          ? 'bg-[#2d6a63] text-white shadow-xs'
                          : 'bg-white text-[#68727d] hover:text-[#1f2933]'
                      }`}
                    >
                      {idx + 1}. {card.title.split('.')[1]?.trim() || card.title}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setExpandedCard(null)}
                  className="bg-[#1f2933] hover:bg-black text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-colors cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
