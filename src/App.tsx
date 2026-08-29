/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  List, 
  FileText, 
  RotateCcw,
  Sparkles,
  HelpCircle,
  TrendingUp,
  BarChart2,
  RefreshCw,
  Users,
  Plus,
  Trash2
} from 'lucide-react';
import { SlideData, StudentData, SelectedChoices } from './types';
import { UlnaMeasurementMission } from './components/UlnaMeasurementMission';
import { TimerWidget } from './components/TimerWidget';
import { SlideNavDrawer } from './components/SlideNavDrawer';
import { WorksheetSummaryModal } from './components/WorksheetSummaryModal';
import { AICoverSlide } from './components/AICoverSlide';
import { AIFeaturesSlide } from './components/AIFeaturesSlide';
import { AIFairyTaleSlide } from './components/AIFairyTaleSlide';
import { MysterySlide } from './components/MysterySlide';
import { BlankPaperSlide } from './components/BlankPaperSlide';
import { DavinciMeasurementSlide } from './components/DavinciMeasurementSlide';
import { DataVisualizationSlide } from './components/DataVisualizationSlide';
import { DataPatternsInteractiveSlide } from './components/DataPatternsInteractiveSlide';
import { QRCodeSVG } from 'qrcode.react';
import CustomDataAnalysis from './components/CustomDataAnalysis';

const SLIDES: SlideData[] = [
  { id: 1, title: '내 몸속에 숨겨진 규칙을 찾아라', category: '영재수업 · 탐구 1' },
  { id: 2, title: "AI는 무엇을 '알아서' 할까요?", category: '탐구 도입' },
  { id: 3, title: 'AI-동화 속 엄마들의 진실 편', category: '탐구 도입 2' },
  { id: 4, title: '다빈치의 인체 비례도', category: '동기 유발 1' },
  { id: 5, title: '다빈치 가설 직접 검증하기', category: '동기 유발 2' },
  { id: 6, title: '뼈만 보고 사람의 키를 알아낼 수 있을까?', category: '동기 유발 3' },
  { id: 7, title: '딱 한 곳만 잴 수 있습니다', category: '동기 유발 4' },
  { id: 8, title: '오늘의 미션', category: '오늘의 미션' },
  { id: 9, title: '자뼈 길이는 어떻게 잴까요?', category: '탐구 ①' },
  { id: 10, title: '나의 자뼈 길이를 재어 봅시다', category: '탐구 ① · 측정', timerDuration: 600 },
  { id: 11, title: '우리 반 데이터 분석 결과', category: '탐구 ① · 분석' },
  { id: 12, title: '데이터 속 숨겨진 패턴 찾기', category: '데이터 과학 기초' },
  { id: 13, title: '자뼈와 키 사이의 관계 관찰', category: '탐구 ① · 관찰' },
  { id: 14, title: '정말 자뼈가 최고일까요?', category: '탐구 확장' },
  { id: 15, title: '나만의 신체 부위 선택', category: '탐구 ②' },
  { id: 16, title: '가설 세우기 및 측정 계획', category: '탐구 ② · 계획' },
  { id: 17, title: '친구들의 데이터 모으기', category: '탐구 ② · 데이터 수집', timerDuration: 1500 },
  { id: 18, title: '숫자 속에서 규칙 찾기', category: '탐구 ② · 발견' },
  { id: 19, title: '우리 팀의 발견 4가지', category: '공유' },
  { id: 20, title: '우리 팀 데이터 분석 결과', category: '자율 탐구 제출' },
  { id: 21, title: '우리 반 모둠별 결과 모아보기', category: '대시보드' },
  { id: 22, title: '새로운 친구의 키 예측하기', category: '마지막 도전' },
  { id: 23, title: '나만의 예측 공식 만들기', category: '다음 탐구' },
];

const createInitialRows = (count: number = 10) => 
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: '',
    partLength: '',
    height: '',
    note: '',
  }));

const INITIAL_DATA: StudentData = {
  blankSlide1Title: '',
  blankSlide1Content: '',
  blankSlide2Title: '',
  blankSlide2Content: '',
  davinciAge: '',
  davinciGender: '',
  davinciArmSpan: '',
  davinciHeight: '',
  age: '',
  gender: '',
  ulna: '',
  height: '',
  group: '',
  name: '',
  part: '',
  reason: '',
  hypothesis: '',
  rows: createInitialRows(10),
  prediction: '',
  predictionReason: '',
};

// ⚠️ 구글 Apps Script 배포 후 발급받은 웹 앱 URL을 아래에 붙여넣으세요.
const GAS_URL: string = "https://script.google.com/macros/s/AKfycbyYIAuxIDWVv7QTYYa6f0iWq7t963J9AacZV-TxZKL7JbJdpPEg3HC0YSGqGT9gD4S3/exec";

export default function App() {
    const isStudentMode = new URLSearchParams(window.location.search).get('mode') === 'student';
  const initialIndex = isStudentMode ? SLIDES.findIndex(s => s.id === 15) : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const goToSlideById = (id: number) => {
    const idx = SLIDES.findIndex(s => s.id === id);
    if (idx !== -1) setCurrentIndex(idx);
  };
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [showScatterPlot, setShowScatterPlot] = useState(false);
  const [isQRExpanded, setIsQRExpanded] = useState(false);

  // Google Sheets state
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmittingCustom, setIsSubmittingCustom] = useState(false);
  const [customDataList, setCustomDataList] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);

  const [davinciData, setDavinciData] = useState<any[]>([]);
  const [isDavinciSubmitting, setIsDavinciSubmitting] = useState(false);
  const [isDavinciFetching, setIsDavinciFetching] = useState(false);

  // Student inputs
  const [studentData, setStudentData] = useState<StudentData>(() => {
    try {
      const saved = localStorage.getItem('gifted_body_student_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        let rows = parsed.rows || [];
        if (!Array.isArray(rows) || rows.length === 0) {
          rows = createInitialRows(10);
        } else if (rows.length < 10) {
          const currentLen = rows.length;
          const extra = Array.from({ length: 10 - currentLen }, (_, i) => ({
            id: currentLen + i + 1,
            name: '',
            partLength: '',
            height: '',
            note: '',
          }));
          rows = [...rows, ...extra];
        }
        return { ...INITIAL_DATA, ...parsed, rows };
      }
      return INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  // Selected choices for interactive cards
  const [choices, setChoices] = useState<SelectedChoices>(() => {
    try {
      const saved = localStorage.getItem('gifted_body_choices');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          slide4: parsed.slide4 || [],
          slide10: parsed.slide10 || [],
        };
      }
      return { slide4: [], slide10: [] };
    } catch {
      return { slide4: [], slide10: [] };
    }
  });

  const stageRef = useRef<HTMLDivElement>(null);

  const fetchSheetData = async () => {
    if (GAS_URL === "여기에_앱스스크립트_URL을_붙여넣으세요" || GAS_URL === "") return;
    setIsFetching(true);
    try {
      const res = await fetch(GAS_URL);
      const text = await res.text();
      try {
        let data = JSON.parse(text);
        if (Array.isArray(data)) {
          setSheetData(data.reverse()); // 최신 데이터가 위로 오도록 뒤집기
        }
      } catch (e) {
        console.error('JSON 파싱 실패. 반환된 텍스트:', text.substring(0, 200) + '...');
      }
    } catch (e) {
      console.error('데이터 불러오기 실패:', e);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchDavinciData = async () => {
    if (GAS_URL === "여기에_앱스스크립트_URL을_붙여넣으세요" || GAS_URL === "") return;
    setIsDavinciFetching(true);
    try {
      const res = await fetch(GAS_URL + "?type=davinci");
      const text = await res.text();
      try {
        let data = JSON.parse(text);
        if (Array.isArray(data)) {
          setDavinciData(data.reverse()); // 최신 데이터가 위로 오도록 뒤집기
        }
      } catch (e) {
        console.error('다빈치 데이터 JSON 파싱 실패');
      }
    } catch (e) {
      console.error('다빈치 데이터 불러오기 실패:', e);
    } finally {
      setIsDavinciFetching(false);
    }
  };

  const fetchCustomData = useCallback(async () => {
    if (GAS_URL === "여기에_앱스스크립트_URL을_붙여넣으세요" || GAS_URL === "") return;
    setIsFetching(true);
    try {
      const res = await fetch(GAS_URL + "?type=custom");
      const text = await res.text();
      try {
        let parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          setCustomDataList(parsed);
        }
      } catch (e) {
        console.error("Custom data parse error:", e);
      }
    } catch (e) {
      console.error("Custom data fetch error:", e);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const submitToSheet = async () => {
    if (GAS_URL === "여기에_앱스스크립트_URL을_붙여넣으세요" || GAS_URL === "") {
      alert("구글 Apps Script URL이 설정되지 않았습니다. 소스 코드에서 GAS_URL을 변경해주세요.");
      return;
    }
    if (!studentData.age || !studentData.gender || !studentData.ulna || !studentData.height) {
      alert("만 나이, 성별, 자뼈 길이, 실제 키를 모두 입력해주세요!");
      return;
    }
    setIsSubmitting(true);
    try {
      // 💡 no-cors 모드를 사용하면 Apps Script의 302 리다이렉션으로 인한 CORS 에러를 방지할 수 있습니다.
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          age: studentData.age,
          gender: studentData.gender,
          ulna: studentData.ulna,
          height: studentData.height
        })
      });
      
      // 전송 성공 시 약간의 지연 후 갱신 (시트에 반영될 시간)
      setTimeout(() => {
        fetchSheetData(); 
        setIsSubmitting(false);
        alert("데이터가 성공적으로 전송되었습니다!");
      }, 1000);
      
    } catch (e) {
      console.error("데이터 전송 중 에러:", e);
      alert("제출에 실패했습니다. Apps Script URL이 올바른지 확인해주세요.");
      setIsSubmitting(false);
    }
  };

  const submitDavinciData = async () => {
    if (GAS_URL === "여기에_앱스스크립트_URL을_붙여넣으세요" || GAS_URL === "") {
      alert("구글 Apps Script URL이 설정되지 않았습니다. 소스 코드에서 GAS_URL을 변경해주세요.");
      return;
    }
    if (!studentData.davinciAge || !studentData.davinciGender || !studentData.davinciArmSpan || !studentData.davinciHeight) {
      alert("만 나이, 성별, 양팔 길이, 실제 키를 모두 입력해주세요!");
      return;
    }
    setIsDavinciSubmitting(true);
    try {
      await fetch(GAS_URL + "?type=davinci", {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          age: studentData.davinciAge,
          gender: studentData.davinciGender,
          armSpan: studentData.davinciArmSpan,
          height: studentData.davinciHeight
        })
      });
      
      setTimeout(() => {
        fetchDavinciData(); 
        setIsDavinciSubmitting(false);
        alert("다빈치 가설 검증 데이터가 성공적으로 전송되었습니다!");
      }, 1000);
      
    } catch (e) {
      console.error("다빈치 데이터 전송 중 에러:", e);
      alert("제출에 실패했습니다. Apps Script URL이 올바른지 확인해주세요.");
      setIsDavinciSubmitting(false);
    }
  };

  // 슬라이드 5, 10, 11 진입 시 데이터 로드 및 8초 자동 폴링
  useEffect(() => {
    const currentId = SLIDES[currentIndex]?.id;
    
    if (currentId === 5) {
      fetchDavinciData();
      const interval = setInterval(fetchDavinciData, 8000);
      return () => clearInterval(interval);
    }
    
    if (currentId === 10 || currentId === 11) {
      fetchSheetData();
      const interval = setInterval(fetchSheetData, 8000);
      return () => clearInterval(interval);
    }
    if (currentId === 21) {
      fetchCustomData();
      const interval = setInterval(fetchCustomData, 8000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, fetchCustomData]);

  // Save student data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gifted_body_student_data', JSON.stringify(studentData));
    } catch (e) {
      console.error(e);
    }
  }, [studentData]);

  useEffect(() => {
    try {
      localStorage.setItem('gifted_body_choices', JSON.stringify(choices));
    } catch (e) {
      console.error(e);
    }
  }, [choices]);

  // Hash synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const match = window.location.hash.match(/slide-(\d+)/);
      if (match) {
        const slideNum = parseInt(match[1], 10);
        if (slideNum >= 1 && slideNum <= SLIDES.length) {
          setCurrentIndex(slideNum - 1);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const goToSlide = useCallback((index: number) => {
    const nextIdx = Math.max(0, Math.min(index, SLIDES.length - 1));
    setCurrentIndex(nextIdx);
    window.location.hash = `slide-${nextIdx + 1}`;
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Backspace') {
        e.preventDefault();
        prevSlide();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setIsNavOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Fullscreen handler
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await stageRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Update field helpers
  const handleInputChange = (field: keyof StudentData, value: string) => {
    setStudentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRowChange = (rowId: number, col: 'name' | 'partLength' | 'height' | 'note', val: string) => {
    setStudentData((prev) => ({
      ...prev,
      rows: prev.rows.map((r) => (r.id === rowId ? { ...r, [col]: val } : r)),
    }));
  };

  const handleAddRow = () => {
    setStudentData((prev) => {
      const nextId = prev.rows.length + 1;
      return {
        ...prev,
        rows: [
          ...prev.rows,
          { id: nextId, name: '', partLength: '', height: '', note: '' }
        ]
      };
    });
  };

  const handleAddMultipleRows = (count: number = 5) => {
    setStudentData((prev) => {
      const startId = prev.rows.length;
      const newRows = Array.from({ length: count }, (_, i) => ({
        id: startId + i + 1,
        name: '',
        partLength: '',
        height: '',
        note: '',
      }));
      return {
        ...prev,
        rows: [...prev.rows, ...newRows]
      };
    });
  };

  const handleRemoveRow = (rowId: number) => {
    setStudentData((prev) => {
      if (prev.rows.length <= 1) return prev;
      const filtered = prev.rows.filter((r) => r.id !== rowId);
      const reindexed = filtered.map((r, idx) => ({ ...r, id: idx + 1 }));
      return {
        ...prev,
        rows: reindexed
      };
    });
  };

  const toggleChoice = (slide: 'slide4' | 'slide10', choiceText: string) => {
    setChoices((prev) => {
      const list = prev[slide] || [];
      const exists = list.includes(choiceText);
      const updated = exists ? list.filter((item) => item !== choiceText) : [...list, choiceText];
      return { ...prev, [slide]: updated };
    });
  };

  const handleResetAll = () => {
    setStudentData(INITIAL_DATA);
    setChoices({ slide4: [], slide10: [] });
    try {
      localStorage.removeItem('gifted_body_student_data');
      localStorage.removeItem('gifted_body_choices');
    } catch {
      // Ignore
    }
  };

  const currentSlideData = SLIDES[currentIndex];
  const progressPercent = ((currentIndex + 1) / SLIDES.length) * 100;

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#f5f1e8] overflow-hidden select-none font-sans">
      {/* Presentation Stage */}
      <main
        ref={stageRef}
        id="stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-full bg-[#f5f1e8] overflow-hidden flex flex-col justify-between"
        style={{
          background: `
            radial-gradient(circle at 90% 12%, rgba(45,106,99,0.08), transparent 26%),
            radial-gradient(circle at 10% 88%, rgba(213,138,75,0.08), transparent 28%),
            #f5f1e8
          `,
        }}
      >
        {/* Timer if slide has one */}
        {currentSlideData.timerDuration && (
          <TimerWidget
            key={`timer-${currentSlideData.id}`}
            slideId={currentSlideData.id}
            initialSeconds={currentSlideData.timerDuration}
          />
        )}

        {/* Top Header Quick Nav bar */}
        <div className="absolute top-3 left-4 sm:top-5 sm:left-8 z-30 flex items-center gap-2 pointer-events-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-xs border border-[rgba(31,41,51,0.08)] text-[11px] sm:text-[13px] font-extrabold text-[#2d6a63] tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            {currentSlideData.category}
          </span>
        </div>

        {/* Slide Content Area */}
        <div className="relative flex-1 w-full h-full overflow-y-auto px-5 sm:px-10 md:px-16 pt-14 sm:pt-16 md:pt-18 pb-20 sm:pb-24 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full flex-1 flex flex-col justify-center"
            >
              {/* SLIDE 2: Title */}
              {currentSlideData.id === 1 && (
                <AICoverSlide />
              )}

              {/* SLIDE 2: AI Features Intro */}
              {currentSlideData.id === 2 && (
                <AIFeaturesSlide onNext={nextSlide} />
              )}

              {/* SLIDE 3: AI Fairy Tale Video */}
              {currentSlideData.id === 3 && (
                <AIFairyTaleSlide onNext={nextSlide} />
              )}

              {/* SLIDE 4: Motivation 1 (Da Vinci Video) */}
              {currentSlideData.id === 4 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto flex flex-col h-full justify-center">
                  <h2 className="text-[26px] sm:text-[36px] md:text-[44px] xl:text-[52px] 2xl:text-[60px] font-[830] tracking-tight text-[#1f2933]">
                    우리 몸에도 <span className="text-[#2d6a63]">수학적 규칙</span>이 있을까요?
                  </h2>
                  <p className="mt-2 text-[15px] sm:text-[18px] xl:text-[22px] 2xl:text-[26px] text-[#68727d] font-medium">
                    레오나르도 다빈치의 '비트루비안 맨(Vitruvian Man)'을 통해 사람 몸에 숨겨진 비밀을 알아봅시다.
                  </p>
                  
                  <div className="mt-6 flex-1 h-[50vh] md:h-[60vh] xl:h-[65vh] 2xl:h-[70vh] min-h-[300px] w-full bg-black rounded-[24px] overflow-hidden shadow-[0_12px_28px_rgba(40,45,50,0.15)] border border-[rgba(31,41,51,0.08)]">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/aMsaFP3kgqQ?rel=0" 
                      title="Da Vinci's Vitruvian Man of math" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>



                  <div className="mt-6 sm:mt-8 p-5 sm:p-7 xl:p-10 2xl:p-12 bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[20px] sm:rounded-[24px] shadow-xs text-center">
                    <div className="text-[18px] sm:text-[24px] md:text-[30px] xl:text-[36px] 2xl:text-[42px] font-extrabold text-[#1f2933] leading-snug">
                      “그런데 다빈치는 사람의 <span className="text-[#2d6a63]">팔을 쭉 벌린 길이</span>가<br className="hidden sm:block" />
                      <span className="text-[#2d6a63]">키와 비슷하다</span>고 생각했습니다. 정말 우리도 그럴까요?”
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 5: Davinci Measurement Slide */}
              {currentSlideData.id === 5 && (
                <DavinciMeasurementSlide
                  davinciData={davinciData}
                  studentData={studentData}
                  handleInputChange={handleInputChange}
                  submitDavinciData={submitDavinciData}
                  fetchDavinciData={fetchDavinciData}
                  isSubmitting={isDavinciSubmitting}
                  isFetching={isDavinciFetching}
                />
              )}

              {/* SLIDE 6: Motivation 2 (Mystery) */}
              {currentSlideData.id === 6 && (
                <MysterySlide onNext={nextSlide} />
              )}

              {/* SLIDE 7: Motivation Choices */}
              {currentSlideData.id === 7 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto">
                  <h2 className="text-[28px] sm:text-[40px] md:text-[50px] font-[830] tracking-tight text-[#1f2933] leading-tight">
                    딱 <span className="text-[#2d6a63]">한 곳</span>만 잴 수 있습니다.
                  </h2>
                  <p className="mt-2 text-[15px] sm:text-[19px] text-[#68727d] font-medium">
                    키는 직접 잴 수 없습니다. 여러분이라면 몸의 어느 부분을 선택하겠습니까?
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
                    {[
                      { icon: '✋', label: '손' },
                      { icon: '🦶', label: '발' },
                      { icon: '↔️', label: '팔 벌린 길이' },
                      { icon: '🦵', label: '다리' },
                    ].map((item) => {
                      const isSelected = choices.slide4.includes(item.label);
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => toggleChoice('slide4', item.label)}
                          className={`p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] border flex flex-col items-center justify-center text-center transition-all cursor-pointer select-none ${
                            isSelected
                              ? 'bg-[#dbece8] border-[#2d6a63] scale-105 shadow-[0_8px_20px_rgba(45,106,99,0.15)] ring-2 ring-[#2d6a63]/40'
                              : 'bg-[#fffdf8] border-[rgba(31,41,51,0.08)] hover:bg-[#fbf9f4] hover:-translate-y-1 shadow-[0_8px_20px_rgba(40,45,50,0.04)]'
                          }`}
                        >
                          <span className="text-4xl sm:text-5xl md:text-6xl mb-2">{item.icon}</span>
                          <span className={`text-[15px] sm:text-[18px] font-extrabold ${isSelected ? 'text-[#2d6a63]' : 'text-[#1f2933]'}`}>
                            {item.label}
                          </span>
                          <span className="text-[11px] text-[#68727d] mt-1">
                            {isSelected ? '✓ 선택됨' : '클릭하여 선택'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 sm:p-5 bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[20px] text-[18px] sm:text-[24px] font-extrabold text-[#1f2933] shadow-xs flex items-center justify-between">
                    <span>
                      <strong className="text-[#2d6a63]">왜 그 부위를 골랐나요?</strong> 친구들과 생각을 나누어 보세요.
                    </span>
                    <HelpCircle className="w-6 h-6 text-[#2d6a63] shrink-0" />
                  </div>
                </div>
              )}

              {/* SLIDE 8: Mission */}
              {currentSlideData.id === 8 && (
                <div className="flex flex-col items-center justify-center text-center max-w-[1200px] 2xl:max-w-[1400px] mx-auto w-full my-auto">
                  <div className="text-[32px] sm:text-[46px] md:text-[58px] lg:text-[68px] font-[880] leading-[1.2] tracking-tight text-[#1f2933]">
                    신체 부위의 길이와<br />
                    <span className="text-[#2d6a63] underline decoration-[#2d6a63]/30 underline-offset-8">키 사이의 규칙</span>을 찾아라!
                  </div>
                  <p className="mt-6 text-[17px] sm:text-[22px] md:text-[26px] text-[#68727d] font-medium max-w-2xl leading-relaxed">
                    먼저 과학자들이 오래전부터 사용해 온 한 가지 단서를 확인해 봅시다.
                  </p>
                </div>
              )}

              {/* SLIDE 9: Ulna anatomy guide */}
              {currentSlideData.id === 9 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto flex flex-col h-full justify-center">
                  <div>
                    <h2 className="text-[26px] sm:text-[36px] md:text-[44px] xl:text-[52px] font-[830] tracking-tight text-[#1f2933]">
                      자뼈 길이는 어떻게 잴까요?
                    </h2>
                    <p className="mt-2 text-[15px] sm:text-[18px] xl:text-[22px] 2xl:text-[26px] text-[#68727d] font-medium">
                      영상을 보며 <span className="font-bold text-[#1f2933]">어디서부터 어디까지 재는지</span> 찾아봅시다.
                    </p>
                  </div>
                  
                  <div className="mt-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Left: YouTube Video */}
                    <div className="lg:col-span-8 flex flex-col gap-4 h-full">
                      <div className="w-full h-[45vh] sm:h-[50vh] md:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] bg-black rounded-[24px] overflow-hidden shadow-[0_12px_28px_rgba(40,45,50,0.15)] border border-[rgba(31,41,51,0.08)]">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src="https://www.youtube.com/embed/EJ6oc5mFJuQ?rel=0" 
                          title="How to measure Ulna" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>

                    {/* Right: Mission / Answers */}
                    <div className="lg:col-span-4 flex flex-col h-[45vh] sm:h-[50vh] md:h-[55vh] xl:h-[60vh] 2xl:h-[65vh]">
                      <UlnaMeasurementMission onNext={nextSlide} />
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 10: Measure my Ulna */}
              {currentSlideData.id === 10 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                        나의 <span className="text-[#2d6a63]">자뼈 길이</span>를 재어 봅시다.
                      </h2>
                      <p className="mt-1 text-[15px] sm:text-[18px] text-[#68727d] font-medium">
                        짝과 함께 측정하고 값을 기록하세요. 스마트폰으로 QR코드를 찍어 바로 제출할 수도 있습니다!
                      </p>
                    </div>
                    <div 
                      className="hidden sm:flex flex-col items-center p-3 bg-white rounded-2xl shadow-sm border border-[rgba(31,41,51,0.08)] cursor-pointer hover:scale-105 hover:shadow-md transition-all"
                      onClick={() => setIsQRExpanded(true)}
                      title="크게 보기"
                    >
                      <QRCodeSVG value={`${window.location.origin}${window.location.pathname}?mode=submit`} size={100} />
                      <span className="text-[11px] font-bold text-[#2d6a63] mt-2">QR 확대하기 🔍</span>
                    </div>
                    
                    {isQRExpanded && (
                      <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all"
                        onClick={() => setIsQRExpanded(false)}
                      >
                        <div 
                          className="bg-white p-8 sm:p-12 rounded-[32px] shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <h3 className="text-2xl sm:text-3xl font-black text-[#1f2933]">스마트폰으로 스캔하세요</h3>
                          <div className="p-4 sm:p-6 bg-white rounded-3xl border-4 border-[#2d6a63]/20 shadow-inner">
                            <QRCodeSVG value={`${window.location.origin}${window.location.pathname}?mode=submit`} size={320} />
                          </div>
                          <p className="text-[#68727d] font-bold text-center">스마트폰 카메라로 스캔하면<br/>모바일 제출 화면으로 이동합니다.</p>
                          <button 
                            onClick={() => setIsQRExpanded(false)}
                            className="w-full mt-2 bg-[#f8f5ee] hover:bg-[#ebe5d9] text-[#68727d] px-6 py-4 rounded-xl font-bold text-lg transition-colors"
                          >
                            닫기
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 p-5 sm:p-7 bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[24px] sm:rounded-[28px] shadow-[0_12px_28px_rgba(40,45,50,0.05)]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-[#f8f5ee] rounded-2xl p-4 sm:p-5 border border-[rgba(31,41,51,0.06)]">
                        <label htmlFor="age-input" className="block text-[13px] sm:text-[14px] font-bold text-[#68727d] mb-1">
                          만 나이 (세)
                        </label>
                        <div className="relative">
                          <select
                            id="age-input"
                            value={studentData.age || ""}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] sm:text-[26px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors appearance-none"
                          >
                            <option value="" disabled>선택</option>
                            {Array.from({ length: 12 }, (_, i) => i + 8).map(age => (
                              <option key={age} value={`${age}세`}>{age}세</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-[#68727d]">
                            <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#f8f5ee] rounded-2xl p-4 sm:p-5 border border-[rgba(31,41,51,0.06)]">
                        <label htmlFor="gender-input" className="block text-[13px] sm:text-[14px] font-bold text-[#68727d] mb-1">
                          성별 (남/여)
                        </label>
                        <div className="relative">
                          <select
                            id="gender-input"
                            value={studentData.gender || ""}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] sm:text-[26px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors appearance-none"
                          >
                            <option value="" disabled>선택</option>
                            <option value="남자">남자</option>
                            <option value="여자">여자</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-[#68727d]">
                            <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#f8f5ee] rounded-2xl p-4 sm:p-5 border border-[rgba(31,41,51,0.06)]">
                        <label htmlFor="ulna-input" className="block text-[13px] sm:text-[14px] font-bold text-[#68727d] mb-1">
                          나의 자뼈 길이 (cm)
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="ulna-input"
                            type="text"
                            inputMode="decimal"
                            value={studentData.ulna || ""}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9.]/g, '');
                              const parts = val.split('.');
                              const formattedVal = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : val;
                              handleInputChange('ulna', formattedVal);
                            }}
                            placeholder="예: 23.5"
                            className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] sm:text-[26px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors pr-10"
                          />
                          <span className="absolute right-2 text-[#68727d] font-bold text-[18px] sm:text-[22px]">cm</span>
                        </div>
                      </div>
                      <div className="bg-[#f8f5ee] rounded-2xl p-4 sm:p-5 border border-[rgba(31,41,51,0.06)]">
                        <label htmlFor="height-input" className="block text-[13px] sm:text-[14px] font-bold text-[#68727d] mb-1">
                          나의 실제 키 (cm)
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="height-input"
                            type="text"
                            inputMode="decimal"
                            value={studentData.height || ""}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9.]/g, '');
                              const parts = val.split('.');
                              const formattedVal = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : val;
                              handleInputChange('height', formattedVal);
                            }}
                            placeholder="예: 145"
                            className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[20px] sm:text-[26px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors pr-10"
                          />
                          <span className="absolute right-2 text-[#68727d] font-bold text-[18px] sm:text-[22px]">cm</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex justify-end">
                      <button 
                        onClick={submitToSheet}
                        disabled={isSubmitting}
                        className="bg-[#2d6a63] text-white px-6 py-3 rounded-xl font-bold text-[16px] hover:bg-[#23534d] transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
                      >
                         {isSubmitting ? '제출 중...' : '데이터 제출하기'}
                      </button>
                    </div>

                    <div className="mt-8">
                       <div className="flex items-center justify-between mb-3">
                          <h3 className="text-[18px] sm:text-[22px] font-extrabold text-[#1f2933]">우리 반 데이터 모아보기</h3>
                          <button onClick={fetchSheetData} disabled={isFetching} className="text-[14px] text-[#2d6a63] font-bold hover:underline flex items-center gap-1">
                            {isFetching ? '불러오는 중...' : '새로고침'}
                          </button>
                       </div>
                       <div className="bg-white rounded-2xl border border-[rgba(31,41,51,0.08)] overflow-hidden shadow-sm">
                          <div className="overflow-x-auto max-h-[250px] overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                               <thead className="bg-[#f8f5ee] sticky top-0 z-10">
                                 <tr>
                                   <th className="py-3 px-4 text-[#68727d] font-bold text-[14px] border-b border-[rgba(31,41,51,0.06)]">나이</th>
                                   <th className="py-3 px-4 text-[#68727d] font-bold text-[14px] border-b border-[rgba(31,41,51,0.06)]">성별</th>
                                   <th className="py-3 px-4 text-[#68727d] font-bold text-[14px] border-b border-[rgba(31,41,51,0.06)]">자뼈 길이</th>
                                   <th className="py-3 px-4 text-[#68727d] font-bold text-[14px] border-b border-[rgba(31,41,51,0.06)]">실제 키</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 {sheetData.length === 0 ? (
                                   <tr>
                                     <td colSpan={4} className="py-8 text-center text-[#68727d] font-medium">아직 제출된 데이터가 없습니다. (연동 필요)</td>
                                   </tr>
                                 ) : (
                                   sheetData.map((row, idx) => (
                                      <tr key={idx} className="border-b border-[rgba(31,41,51,0.04)] hover:bg-[#faf9f6]">
                                        <td className="py-3 px-4 font-semibold text-[#1f2933]">{row.age}</td>
                                        <td className="py-3 px-4 font-semibold text-[#1f2933]">{row.gender}</td>
                                        <td className="py-3 px-4 font-extrabold text-[#2d6a63]">{row.ulna ? `${row.ulna} cm` : ''}</td>
                                        <td className="py-3 px-4 font-extrabold text-[#1f2933]">{row.height ? `${row.height} cm` : ''}</td>
                                      </tr>
                                   ))
                                 )}
                               </tbody>
                            </table>
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 p-4 sm:p-5 bg-[#fffdf8] rounded-2xl border border-[rgba(31,41,51,0.06)] text-[16px] sm:text-[22px] font-extrabold text-[#1f2933]">
                      친구들과 비교했을 때,<br />
                      <strong className="text-[#2d6a63]">자뼈가 길수록 키도 커지는 것 같나요?</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 11: Data Visualization */}
              {currentSlideData.id === 11 && (
                <DataVisualizationSlide sheetData={sheetData} />
              )}

              {/* SLIDE 12: Interactive Data Patterns (Scatter Plot, Correlation, Coefficient, Regression) */}
              {currentSlideData.id === 12 && (
                <DataPatternsInteractiveSlide />
              )}

              {/* SLIDE 13: Observation */}
              {currentSlideData.id === 13 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto">
                  <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933] leading-tight">
                    자뼈와 키 사이에는<br />
                    <span className="text-[#2d6a63]">어떤 관계</span>가 보이나요?
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-7">
                    {[
                      { title: '관찰 1', desc: '자뼈가 긴 친구는 대체로 키도 큰가요?' },
                      { title: '관찰 2', desc: '자뼈 길이가 비슷한데 키는 다른 친구도 있나요?' },
                      { title: '관찰 3', desc: '모든 사람에게 똑같은 규칙이 적용될까요?' },
                      { title: '관찰 4', desc: '측정 방법이 다르면 결과는 어떻게 달라질까요?' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#fffdf8] p-5 sm:p-6 rounded-[22px] border border-[rgba(31,41,51,0.08)] shadow-[0_8px_20px_rgba(40,45,50,0.04)] hover:border-[#2d6a63]/30 transition-all"
                      >
                        <span className="inline-block text-xs font-black text-[#2d6a63] bg-[#2d6a63]/10 px-2.5 py-1 rounded-full mb-2">
                          {item.title}
                        </span>
                        <p className="text-[16px] sm:text-[20px] font-bold text-[#1f2933] leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 14: Mission expansion */}
              {currentSlideData.id === 14 && (
                <div className="flex flex-col items-center justify-center text-center max-w-[1200px] 2xl:max-w-[1400px] mx-auto w-full my-auto">
                  <div className="text-[32px] sm:text-[46px] md:text-[58px] lg:text-[68px] font-[880] leading-[1.2] tracking-tight text-[#1f2933]">
                    그런데 정말<br />
                    <span className="text-[#2d6a63] underline decoration-[#2d6a63]/30 underline-offset-8">자뼈가 최고일까요?</span>
                  </div>
                  <p className="mt-6 text-[17px] sm:text-[22px] md:text-[26px] text-[#68727d] font-medium max-w-2xl leading-relaxed">
                    자뼈보다 키와 더 깊은 관계가 있는 신체 부위가 있을지도 모릅니다.
                  </p>
                </div>
              )}

              {/* SLIDE 15: Choose My Body Part */}
              {currentSlideData.id === 15 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                        나만의 <span className="text-[#2d6a63]">신체 부위</span>를 자유롭게 정해보세요.
                      </h2>
                      <p className="mt-1 text-[15px] sm:text-[18px] text-[#68727d] font-medium">
                        “이 부위가 키와 관련 있을 것 같다!”라고 생각되는 곳이라면 몸의 어떤 부위든 좋습니다.
                      </p>
                    </div>
                    {!isStudentMode && (
                      <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-2xl border-2 border-[#2d6a63]/20 shadow-md">
                        <QRCodeSVG value={`${window.location.origin}${window.location.pathname}?mode=student`} size={110} />
                        <span className="text-[12px] font-bold text-[#2d6a63] mt-1.5">학생용 스캔</span>
                      </div>
                    )}
                  </div>

                  {/* Creative Idea Examples (Chips for inspiration) */}
                  <div className="mt-4 p-4 sm:p-5 bg-[#fffdf8] rounded-2xl border border-[rgba(31,41,51,0.08)] shadow-[0_4px_16px_rgba(40,45,50,0.03)]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Sparkles className="w-4 h-4 text-[#d58a4b]" />
                      <span className="text-xs sm:text-sm font-black text-[#1f2933]">
                        다양한 측정 부위 아이디어 예시 <span className="font-normal text-[#68727d]">(클릭하면 아래 입력창에 쏙 채워집니다)</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { emoji: '✋', text: '손 길이 (손목~중지 끝)' },
                        { emoji: '🦶', text: '발 길이' },
                        { emoji: '↔️', text: '양팔 벌린 길이' },
                        { emoji: '💪', text: '팔 길이 (어깨~손목)' },
                        { emoji: '🦵', text: '무릎~바닥 높이' },
                        { emoji: '📏', text: '엄지손가락 길이' },
                        { emoji: '🖐️', text: '한 뼘 길이' },
                        { emoji: '👂', text: '귓바퀴 길이' },
                        { emoji: '📐', text: '머리 둘레' },
                        { emoji: '🦴', text: '쇄골 길이' },
                      ].map((item) => (
                        <button
                          key={item.text}
                          type="button"
                          onClick={() => handleInputChange('part', item.text)}
                          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            studentData.part === item.text
                              ? 'bg-[#2d6a63] text-white border-[#2d6a63] shadow-sm'
                              : 'bg-white text-[#1f2933] border-[rgba(31,41,51,0.1)] hover:border-[#2d6a63]/40 hover:bg-[#f6faf8]'
                          }`}
                        >
                          <span>{item.emoji}</span>
                          <span>{item.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                    <div className="bg-[#fffdf8] p-4 sm:p-5 rounded-2xl border border-[rgba(31,41,51,0.08)]">
                      <label htmlFor="group-input" className="block text-[13px] font-bold text-[#68727d] mb-1">
                        소속 (모둠 / 팀 이름) <span className="text-[#d58a4b]">*</span>
                      </label>
                      <input
                        id="group-input"
                        type="text"
                        value={studentData.group || ""}
                        onChange={(e) => handleInputChange('group', e.target.value)}
                        placeholder="예: 1모둠, 갈릴레이팀, 3분단"
                        className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[18px] sm:text-[22px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors"
                      />
                    </div>
                    <div className="bg-[#fffdf8] p-4 sm:p-5 rounded-2xl border border-[rgba(31,41,51,0.08)]">
                      <label htmlFor="name-input" className="block text-[13px] font-bold text-[#68727d] mb-1">
                        모둠원 이름 <span className="text-[#d58a4b]">*</span>
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        value={studentData.name || ""}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="예: 김영재, 이수학, 박과학"
                        className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[18px] sm:text-[22px] font-extrabold text-[#1f2933] py-1 px-1 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                    <div className="bg-[#fffdf8] p-4 sm:p-5 rounded-2xl border border-[rgba(31,41,51,0.08)]">
                      <label htmlFor="custom-part-input" className="block text-[13px] font-bold text-[#68727d] mb-1">
                        우리 모둠이 정한 신체 부위 <span className="text-[#d58a4b]">*</span>
                      </label>
                      <input
                        id="custom-part-input"
                        type="text"
                        value={studentData.part || ""}
                        onChange={(e) => handleInputChange('part', e.target.value)}
                        placeholder="위 예시 클릭 또는 자유롭게 직접 입력"
                        className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[18px] sm:text-[22px] font-extrabold text-[#2d6a63] py-1 px-1 outline-none transition-colors"
                      />
                    </div>
                    <div className="bg-[#fffdf8] p-4 sm:p-5 rounded-2xl border border-[rgba(31,41,51,0.08)]">
                      <label htmlFor="reason-input" className="block text-[13px] font-bold text-[#68727d] mb-1">
                        이 부위를 선택한 이유
                      </label>
                      <input
                        id="reason-input"
                        type="text"
                        value={studentData.reason || ""}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        placeholder="왜 이 부위가 키와 특별한 규칙이 있을 것 같나요?"
                        className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[16px] sm:text-[19px] font-semibold text-[#1f2933] py-1.5 px-1 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <button 
                      onClick={() => {
                        if (!studentData.group || !studentData.name || !studentData.part) {
                          alert('소속, 이름, 측정할 신체 부위를 모두 입력해주세요!');
                          return;
                        }
                        goToSlideById(16);
                      }}
                      className="bg-[#2d6a63] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-[#23534d] transition-colors shadow-lg animate-bounce hover:animate-none flex items-center gap-2"
                    >
                      입력 완료, 가설 세우기 단계로 이동 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* SLIDE 16: Hypothesis & Measurement Plan */}
              {currentSlideData.id === 16 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto">
                  <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                    측정하기 전에 <span className="text-[#2d6a63]">가설</span>부터 세웁니다.
                  </h2>

                  <div className="mt-4 p-5 bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[24px] shadow-[0_12px_28px_rgba(40,45,50,0.05)]">
                    <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
                      <label htmlFor="hypothesis-textarea" className="block text-[13px] font-bold text-[#68727d] mb-1">
                        우리의 예상 (가설)
                      </label>
                      <textarea
                        id="hypothesis-textarea"
                        rows={2}
                        value={studentData.hypothesis || ""}
                        onChange={(e) => handleInputChange('hypothesis', e.target.value)}
                        placeholder="예: 발 길이가 길수록 키도 비례하여 더 클 것이다."
                        className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[17px] sm:text-[22px] font-bold text-[#1f2933] py-1 px-1 outline-none resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                      {[
                        { kicker: 'CHECK 1', txt: '어디서부터 어디까지 잴까요?' },
                        { kicker: 'CHECK 2', txt: '모두 같은 방법으로 잴 수 있나요?' },
                        { kicker: 'CHECK 3', txt: '몇 명의 자료를 모을까요?' },
                        { kicker: 'CHECK 4', txt: '무엇과 무엇을 비교할까요?' },
                      ].map((c, i) => (
                        <div key={i} className="bg-white p-3.5 sm:p-4 rounded-xl border border-[rgba(31,41,51,0.06)] shadow-2xs">
                          <span className="text-[11px] font-extrabold text-[#2d6a63] block mb-1">
                            {c.kicker}
                          </span>
                          <span className="text-[13px] sm:text-[15px] font-bold text-[#1f2933] leading-snug block">
                            {c.txt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <button 
                      onClick={() => {
                        if (!studentData.hypothesis || studentData.hypothesis.trim() === '') {
                          if (!confirm('가설이 아직 비어있습니다. 그래도 데이터 수집(측정) 단계로 넘어갈까요?')) {
                            return;
                          }
                        }
                        goToSlideById(17);
                      }}
                      className="bg-[#2d6a63] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-[#23534d] transition-colors shadow-lg animate-bounce hover:animate-none flex items-center gap-2"
                    >
                      가설 설정 완료! 데이터 수집(측정) 단계로 이동 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* SLIDE 17: Data Collection Table */}
              {currentSlideData.id === 17 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-[24px] sm:text-[34px] md:text-[42px] font-[830] tracking-tight text-[#1f2933]">
                        친구들의 <span className="text-[#2d6a63]">데이터</span>를 모아 봅시다.
                      </h2>
                      <p className="text-[13px] sm:text-[16px] text-[#68727d] font-medium">
                        같은 방법으로 측정하고, 신체 부위 길이와 키를 함께 기록하세요.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowScatterPlot((prev) => !prev)}
                      className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold text-[#2d6a63] bg-[#2d6a63]/10 hover:bg-[#2d6a63]/20 rounded-xl transition-all"
                    >
                      <BarChart2 className="w-3.5 h-3.5" />
                      {showScatterPlot ? '표 보기' : '데이터 경향 시각화'}
                    </button>
                  </div>

                  {!showScatterPlot ? (
                    <div className="mt-4 bg-[#fffdf8] rounded-[20px] sm:rounded-[24px] border border-[rgba(31,41,51,0.08)] shadow-[0_12px_28px_rgba(40,45,50,0.05)] overflow-hidden">
                      <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
                        <table className="w-full text-center border-collapse">
                          <thead className="sticky top-0 z-10">
                            <tr className="bg-[#efeae0] text-[#1f2933] text-[13px] sm:text-[15px] font-black shadow-xs">
                              <th className="py-3 px-3 border-b border-[#d9d2c5] w-20">번호</th>
                              <th className="py-3 px-4 border-b border-[#d9d2c5] text-[#2d6a63]">
                                {studentData.part ? `${studentData.part} 길이(cm)` : '신체 부위 길이(cm)'}
                              </th>
                              <th className="py-3 px-4 border-b border-[#d9d2c5] text-[#1f2933]">
                                실제 키(cm)
                              </th>
                              <th className="py-3 px-2 border-b border-[#d9d2c5] w-16 text-[#68727d]">
                                삭제
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentData.rows.map((row) => (
                              <tr key={row.id} className="border-b border-[rgba(31,41,51,0.06)] hover:bg-[#faf7f0] transition-colors">
                                <td className="py-2.5 px-3 font-black text-[#68727d] text-[14px] sm:text-[15px]">
                                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f0ebd9] text-[#1f2933]">
                                    {row.id}
                                  </span>
                                </td>
                                <td className="py-2 px-4">
                                  <input
                                    type="text"
                                    inputMode="decimal"
                                    value={row.partLength}
                                    onChange={(e) => handleRowChange(row.id, 'partLength', e.target.value)}
                                    placeholder="예: 24.5"
                                    aria-label={`${row.id}번 신체 부위 길이`}
                                    className="w-full text-center bg-white/80 border border-[#d9d2c5] focus:border-[#2d6a63] focus:ring-2 focus:ring-[#2d6a63]/20 rounded-xl text-[15px] sm:text-[17px] font-black text-[#2d6a63] py-2 px-3 outline-none transition-all"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <input
                                    type="text"
                                    inputMode="decimal"
                                    value={row.height}
                                    onChange={(e) => handleRowChange(row.id, 'height', e.target.value)}
                                    placeholder="예: 148.0"
                                    aria-label={`${row.id}번 키`}
                                    className="w-full text-center bg-white/80 border border-[#d9d2c5] focus:border-[#2d6a63] focus:ring-2 focus:ring-[#2d6a63]/20 rounded-xl text-[15px] sm:text-[17px] font-black text-[#1f2933] py-2 px-3 outline-none transition-all"
                                  />
                                </td>
                                <td className="py-2 px-2">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveRow(row.id)}
                                    disabled={studentData.rows.length <= 1}
                                    title="이 행 삭제"
                                    aria-label={`${row.id}번 행 삭제`}
                                    className="p-1.5 text-[#a0aec0] hover:text-[#e53e3e] hover:bg-[#fff0f0] rounded-lg transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[#a0aec0]"
                                  >
                                    <Trash2 className="w-4 h-4 mx-auto" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Row management controls & statistics */}
                      <div className="p-3 sm:p-4 bg-[#f8f5ee] border-t border-[rgba(31,41,51,0.06)] flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleAddRow}
                            className="bg-white hover:bg-[#eef6f4] text-[#2d6a63] border border-[#2d6a63]/30 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>행 추가 (+1명)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddMultipleRows(5)}
                            className="bg-white hover:bg-[#eef6f4] text-[#2d6a63] border border-[#2d6a63]/30 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>+5명 추가</span>
                          </button>
                        </div>
                        <div className="text-xs sm:text-sm text-[#68727d] font-bold flex items-center gap-3">
                          <span>총 <strong className="text-[#1f2933] font-black">{studentData.rows.length}명</strong> 입력칸</span>
                          <span className="text-[#d9d2c5]">|</span>
                          <span>
                            입력 완료:{' '}
                            <strong className="text-[#2d6a63] font-black">
                              {studentData.rows.filter((r) => !isNaN(parseFloat(r.partLength)) && !isNaN(parseFloat(r.height))).length}명
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Scatter Trend Visualization view */
                    <div className="mt-4 p-5 bg-[#fffdf8] rounded-[24px] border border-[rgba(31,41,51,0.08)]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-extrabold text-[#2d6a63] flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          입력된 데이터 분석 그래프 (가로: {studentData.part || '부위 길이'}, 세로: 키)
                        </span>
                        <span className="text-[11px] text-[#68727d]">
                          (숫자로 입력된 데이터가 자동으로 점으로 표시됩니다)
                        </span>
                      </div>
                      <div className="relative w-full h-[240px] bg-[#f8f5ee] rounded-xl border border-[rgba(31,41,51,0.06)] p-4 flex items-end justify-between">
                        {studentData.rows
                          .filter((r) => !isNaN(parseFloat(r.partLength)) && !isNaN(parseFloat(r.height)))
                          .map((r) => {
                            const p = parseFloat(r.partLength);
                            const h = parseFloat(r.height);
                            // Normalize roughly
                            const xPercent = Math.min(90, Math.max(10, ((p - 10) / 40) * 100));
                            const yPercent = Math.min(90, Math.max(10, ((h - 100) / 80) * 100));
                            return (
                              <div
                                key={r.id}
                                className="absolute flex flex-col items-center group cursor-pointer transition-all"
                                style={{ left: `${xPercent}%`, bottom: `${yPercent}%` }}
                              >
                                <span className="w-4 h-4 rounded-full bg-[#2d6a63] border-2 border-white shadow-md group-hover:scale-125 transition-transform" />
                                <span className="text-[10px] font-black text-[#1f2933] bg-white/90 px-1.5 py-0.5 rounded shadow-xs mt-0.5 whitespace-nowrap">
                                  #{r.id} ({p}cm, {h}cm)
                                </span>
                              </div>
                            );
                          })}
                        {studentData.rows.filter((r) => !isNaN(parseFloat(r.partLength)) && !isNaN(parseFloat(r.height))).length === 0 && (
                          <div className="w-full text-center text-[#68727d] text-xs font-semibold my-auto">
                            아직 유효한 숫자 데이터가 없습니다. 표에 신체 부위 길이와 키를 숫자로 입력해 보세요.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="mt-6 sm:mt-8 flex justify-center w-full">
                    <button 
                      onClick={() => {
                        const validCount = studentData.rows.filter(r => !isNaN(parseFloat(r.partLength)) && !isNaN(parseFloat(r.height))).length;
                        if (validCount < 2) {
                          alert('분석을 위해서는 최소 2명 이상의 숫자 데이터(길이, 키)가 필요합니다!');
                          return;
                        }
                        goToSlideById(20); // CustomDataAnalysis slide
                      }}
                      className="bg-[#d58a4b] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg hover:bg-[#b5733d] transition-colors shadow-xl flex items-center gap-2 border-2 border-transparent hover:border-white/20 animate-pulse hover:animate-none"
                    >
                      📊 수집 완료! 우리 팀 분석 결과 확인하기 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* SLIDE 18: Discovery questions */}
              {currentSlideData.id === 18 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto">
                  <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933] leading-tight">
                    숫자들을 그냥 보지 말고<br />
                    <span className="text-[#2d6a63]">규칙을 찾아봅시다.</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-7">
                    {[
                      { title: '① 함께 커지나요?', desc: '신체 부위 길이가 커질수록 키도 대체로 커지나요?' },
                      { title: '② 예외가 있나요?', desc: '예상과 다르게 나타난 친구는 누구인가요?' },
                      { title: '③ 차이는 일정한가요?', desc: '1cm 차이가 날 때 키는 얼마나 달라지나요?' },
                      { title: '④ 믿을 만한가요?', desc: '이 부위만 보고 새로운 사람의 키를 맞힐 수 있을까요?' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#fffdf8] p-5 sm:p-6 rounded-[22px] border border-[rgba(31,41,51,0.08)] shadow-[0_8px_20px_rgba(40,45,50,0.04)]"
                      >
                        <h3 className="text-[17px] sm:text-[20px] font-extrabold text-[#2d6a63] mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-[15px] sm:text-[17px] font-semibold text-[#1f2933] leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <button 
                      onClick={() => goToSlideById(19)}
                      className="bg-[#2d6a63] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-[#23534d] transition-colors shadow-lg flex items-center gap-2"
                    >
                      발견한 규칙 정리하기 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* SLIDE 19: Sharing 4 items */}
              {currentSlideData.id === 19 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto">
                  <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                    우리 팀의 발견을 <span className="text-[#2d6a63]">4가지</span>로 정리합니다.
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-7">
                    {[
                      { kicker: '1 · 선택', txt: '우리가 선택한 신체 부위는?' },
                      { kicker: '2 · 이유', txt: '왜 이 부위를 선택했나요?' },
                      { kicker: '3 · 결과', txt: '측정한 자료에서 어떤 경향이 보였나요?' },
                      { kicker: '4 · 판단', txt: '이 부위로 키를 예측할 수 있을 것 같나요?' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="min-h-[120px] sm:min-h-[140px] rounded-[22px] bg-[#fffdf8] p-5 sm:p-6 border border-[rgba(31,41,51,0.08)] shadow-[0_8px_20px_rgba(40,45,50,0.04)] flex flex-col justify-center"
                      >
                        <span className="text-xs font-black text-[#2d6a63] uppercase tracking-wider mb-2">
                          {item.kicker}
                        </span>
                        <div className="text-[18px] sm:text-[22px] font-extrabold text-[#1f2933] leading-snug">
                          {item.txt}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <button 
                      onClick={() => goToSlideById(20)}
                      className="bg-[#d58a4b] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg hover:bg-[#b5733d] transition-colors shadow-lg flex items-center gap-2"
                    >
                      📊 우리 팀 최종 분석 결과 보기 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* SLIDE 20: Student's own custom data analysis */}
              {currentSlideData.id === 20 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full h-full pb-8">
                  <CustomDataAnalysis 
                    rows={studentData.rows} 
                    partName={studentData.part} 
                    groupName={studentData.group} 
                  />
                  <div className="mt-8 flex justify-center">
                    <button 
                      onClick={async () => {
                        if (GAS_URL === "여기에_앱스스크립트_URL을_붙여넣으세요" || GAS_URL === "") {
                          alert("구글 Apps Script URL이 설정되지 않았습니다.");
                          return;
                        }
                        setIsSubmittingCustom(true);
                        try {
                          await fetch(GAS_URL + "?type=custom", {
                            method: 'POST',
                            mode: 'no-cors',
                            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                            body: JSON.stringify({
                              group: studentData.group,
                              name: studentData.name,
                              part: studentData.part,
                              reason: studentData.reason,
                              hypothesis: studentData.hypothesis,
                              rows: JSON.stringify(studentData.rows),
                              timestamp: new Date().toISOString()
                            })
                          });
                          alert("선생님 화면으로 제출되었습니다!");
                        } catch (e) {
                          alert("제출에 실패했습니다.");
                        } finally {
                          setIsSubmittingCustom(false);
                        }
                      }}
                      disabled={isSubmittingCustom}
                      className="bg-[#2d6a63] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#23534d] transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg"
                    >
                      {isSubmittingCustom ? '제출 중...' : '선생님께 우리 팀 결과 제출하기'}
                    </button>
                  </div>
                </div>
              )}

              {/* SLIDE 21: Teacher Dashboard */}
              {currentSlideData.id === 21 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full h-full flex flex-col pb-8">
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                          모둠별 탐구 결과 <span className="text-[#2d6a63]">대시보드</span>
                        </h2>
                        <span className="bg-[#2d6a63]/10 text-[#2d6a63] font-black text-sm sm:text-base px-3.5 py-1 rounded-full border border-[#2d6a63]/20">
                          제출 {customDataList.length}개 모둠
                        </span>
                      </div>
                      <p className="mt-2 text-[15px] sm:text-[18px] text-[#68727d] font-medium">
                        학생들이 탐구 ②(17~20쪽)에서 수집 및 제출한 각 모둠의 탐구 결과를 실시간으로 확인하세요.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className="flex items-center gap-2 text-xs text-[#2d6a63] font-bold bg-[#eef6f4] px-3 py-2 rounded-xl border border-[#2d6a63]/20">
                        <span className="w-2 h-2 rounded-full bg-[#2d6a63] animate-ping" />
                        8초 자동 동기화 중
                      </div>
                      <button 
                        onClick={() => fetchCustomData()}
                        disabled={isFetching}
                        className="bg-[#fffdf8] border border-[rgba(31,41,51,0.1)] text-[#1f2933] px-4 sm:px-5 py-2.5 rounded-xl font-bold hover:bg-[#f8f5ee] transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                      >
                        <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin text-[#2d6a63]' : ''}`} />
                        {isFetching ? '동기화 중...' : '결과 새로고침'}
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 overflow-y-auto">
                    {customDataList.map((item, idx) => {
                      let parsedRows: any[] = [];
                      try {
                        parsedRows = JSON.parse(item.rows || '[]');
                      } catch(e) {}
                      
                      return (
                        <div 
                          key={idx}
                          onClick={() => setSelectedTeam({ ...item, parsedRows })}
                          className="bg-white p-6 rounded-[24px] border border-[rgba(31,41,51,0.08)] shadow-[0_8px_20px_rgba(40,45,50,0.04)] cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:border-[#2d6a63]/30 transition-all flex flex-col group"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <span className="bg-[#f8f5ee] text-[#d58a4b] px-3 py-1 rounded-lg text-sm font-black border border-[#d58a4b]/20">
                              {item.group || `팀 ${idx+1}`}
                            </span>
                            <span className="text-xs text-[#68727d] font-bold truncate max-w-[120px]">{item.name}</span>
                          </div>
                          <h3 className="text-xl font-extrabold text-[#1f2933] mb-2 leading-tight group-hover:text-[#2d6a63] transition-colors">
                            측정 부위: <span className="text-[#2d6a63]">{item.part}</span>
                          </h3>
                          <div className="bg-[#fcfaf5] p-3 rounded-xl border border-[rgba(31,41,51,0.05)] text-xs text-[#68727d] mb-3">
                            <span className="font-bold text-[#1f2933]">가설: </span>
                            <span className="line-clamp-2">{item.hypothesis || '가설 없음'}</span>
                          </div>
                          <div className="mt-auto flex justify-between items-center text-xs text-[#68727d] pt-2 border-t border-[rgba(31,41,51,0.06)] font-semibold">
                            <span>수집 데이터: <strong className="text-[#2d6a63]">{parsedRows.length}명</strong></span>
                            <span className="text-[#2d6a63] font-bold group-hover:translate-x-0.5 transition-transform">분석 보기 →</span>
                          </div>
                        </div>
                      );
                    })}

                    {customDataList.length === 0 && !isFetching && (
                      <div className="col-span-full py-12 px-6 flex flex-col items-center justify-center text-center bg-white/60 border-2 border-dashed border-[rgba(31,41,51,0.12)] rounded-[32px]">
                        <div className="w-16 h-16 bg-[#f8f5ee] text-[#d58a4b] rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                          <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-black text-[#1f2933]">아직 제출된 모둠 탐구 결과가 없습니다</h3>
                        <p className="text-[#68727d] mt-2 max-w-md text-sm font-medium">
                          학생들이 <strong>17~20쪽(탐구 ②)</strong>에서 모둠별 데이터를 입력한 후, <strong>20쪽 하단의 [선생님께 우리 팀 결과 제출하기]</strong> 버튼을 누르면 이곳에 실시간으로 모둠 카드가 등록됩니다.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs bg-[#f8f5ee] p-3.5 rounded-2xl border border-[rgba(31,41,51,0.06)] text-[#68727d]">
                          <span>💡 <strong>자뼈/키 1인 데이터</strong>는 <strong>11페이지 (우리 반 데이터 분석)</strong>에 반영됩니다.</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {selectedTeam && (
                    <div 
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                      onClick={() => setSelectedTeam(null)}
                    >
                      <div 
                        className="bg-white p-6 sm:p-10 rounded-[32px] shadow-2xl flex flex-col gap-6 w-full max-w-[1200px] max-h-[95vh] overflow-y-auto animate-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-2xl font-black text-[#1f2933]">
                            {selectedTeam.group}의 탐구 분석 
                          </h3>
                          <button 
                            onClick={() => setSelectedTeam(null)}
                            className="bg-[#f8f5ee] hover:bg-[#ebe5d9] text-[#68727d] px-5 py-2 rounded-xl font-bold transition-colors"
                          >
                            닫기
                          </button>
                        </div>
                        
                        <div className="bg-[#f8f5ee] p-4 rounded-2xl">
                          <div className="text-sm font-bold text-[#68727d] mb-1">팀의 가설</div>
                          <div className="text-lg font-bold text-[#1f2933]">{selectedTeam.hypothesis || '가설 없음'}</div>
                        </div>

                        <div className="h-[400px]">
                          <CustomDataAnalysis 
                            rows={selectedTeam.parsedRows} 
                            partName={selectedTeam.part} 
                            groupName={selectedTeam.group} 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 22: Final Challenge */}
              {currentSlideData.id === 22 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto">
                  <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
                    새로운 친구가 나타났습니다.
                  </h2>
                  <p className="mt-1 text-[15px] sm:text-[18px] text-[#68727d] font-medium">
                    여러분이 선택한 신체 부위의 길이만 알고 있습니다. 키는 알려주지 않습니다.
                  </p>

                  <div className="mt-4 p-4 sm:p-6 bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] rounded-[24px] shadow-[0_12px_28px_rgba(40,45,50,0.05)]">
                    <div className="text-[20px] sm:text-[28px] font-extrabold text-[#1f2933] mb-4">
                      이 친구의 키는 <strong className="text-[#2d6a63]">몇 cm</strong>일까요?
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
                        <label htmlFor="prediction-input" className="block text-[13px] font-bold text-[#68727d] mb-1">
                          우리 팀의 예상 키
                        </label>
                        <input
                          id="prediction-input"
                          type="text"
                          value={studentData.prediction || ""}
                          onChange={(e) => handleInputChange('prediction', e.target.value)}
                          placeholder="예: 146 cm"
                          className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[18px] sm:text-[22px] font-extrabold text-[#d58a4b] py-1 px-1 outline-none"
                        />
                      </div>
                      <div className="bg-[#f8f5ee] rounded-2xl p-4 border border-[rgba(31,41,51,0.06)]">
                        <label htmlFor="prediction-reason-input" className="block text-[13px] font-bold text-[#68727d] mb-1">
                          그렇게 생각한 이유
                        </label>
                        <input
                          id="prediction-reason-input"
                          type="text"
                          value={studentData.predictionReason || ""}
                          onChange={(e) => handleInputChange('predictionReason', e.target.value)}
                          placeholder="우리의 데이터를 근거로 설명"
                          className="w-full bg-transparent border-0 border-b-2 border-[#d9d2c5] focus:border-[#2d6a63] text-[16px] sm:text-[20px] font-bold text-[#1f2933] py-1 px-1 outline-none"
                        />
                      </div>
                    </div>

                    <p className="mt-4 text-[14px] sm:text-[17px] font-bold text-[#1f2933]">
                      같은 자료를 보고도 <span className="text-[#d58a4b]">예상한 키가 서로 다르다면</span>, 어떻게 해야 할까요?
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 23: Next Discovery */}
              {currentSlideData.id === 23 && (
                <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full my-auto flex flex-col justify-center">
                  <h2 className="text-[28px] sm:text-[42px] md:text-[54px] font-[850] leading-[1.2] tracking-tight text-[#1f2933]">
                    누구나 사용할 수 있는<br />
                    <span className="text-[#2d6a63]">나만의 예측 공식</span>은<br />
                    어떻게 만들 수 있을까요?
                  </h2>

                  <div className="grid grid-cols-5 items-center gap-2 sm:gap-4 mt-6 sm:mt-10">
                    <div className="min-h-[110px] sm:min-h-[140px] rounded-[22px] bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] flex items-center justify-center text-center p-3 text-[16px] sm:text-[22px] font-extrabold text-[#1f2933] shadow-xs">
                      신체 부위<br />길이
                    </div>
                    <div className="text-center text-2xl sm:text-4xl font-black text-[#d58a4b]">
                      →
                    </div>
                    <div className="min-h-[110px] sm:min-h-[140px] rounded-[22px] bg-[#dbece8] border border-[#2d6a63]/30 flex items-center justify-center text-center p-3 text-[32px] sm:text-[54px] font-black text-[#2d6a63] shadow-xs">
                      ?
                    </div>
                    <div className="text-center text-2xl sm:text-4xl font-black text-[#d58a4b]">
                      →
                    </div>
                    <div className="min-h-[110px] sm:min-h-[140px] rounded-[22px] bg-[#fffdf8] border border-[rgba(31,41,51,0.08)] flex items-center justify-center text-center p-3 text-[16px] sm:text-[22px] font-extrabold text-[#1f2933] shadow-xs">
                      예상 키
                    </div>
                  </div>

                  <div className="mt-8 self-start bg-[#2d6a63] text-white rounded-2xl px-5 py-3 text-[15px] sm:text-[19px] font-extrabold shadow-md flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    다음 시간: 데이터를 이용해 예측 규칙 만들기
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Control Bar */}
        {!isStudentMode && (
        <div className="absolute left-3 right-3 sm:left-6 sm:right-6 bottom-3 sm:bottom-4 flex items-center justify-between z-30 pointer-events-none">
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              title="이전 슬라이드 (←)"
              aria-label="이전 슬라이드"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(31,41,51,0.12)] bg-[#fffdf8]/90 hover:bg-[#fffdf8] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#1f2933] shadow-sm transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              disabled={currentIndex === SLIDES.length - 1}
              title="다음 슬라이드 (→)"
              aria-label="다음 슬라이드"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(31,41,51,0.12)] bg-[#fffdf8]/90 hover:bg-[#fffdf8] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#1f2933] shadow-sm transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Slide list drawer trigger */}
            <button
              type="button"
              onClick={() => setIsNavOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf8]/90 hover:bg-[#fffdf8] border border-[rgba(31,41,51,0.1)] text-xs sm:text-sm font-extrabold text-[#1f2933] shadow-xs transition-all cursor-pointer"
            >
              <List className="w-3.5 h-3.5 text-[#2d6a63]" />
              <span>{currentIndex + 1} / {SLIDES.length}</span>
            </button>

            {/* Summary worksheet report trigger */}
            <button
              type="button"
              onClick={() => setIsSummaryOpen(true)}
              title="나의 기록지 보기"
              aria-label="탐구 기록지 보기"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2d6a63]/10 hover:bg-[#2d6a63]/20 border border-[#2d6a63]/20 text-xs sm:text-sm font-extrabold text-[#2d6a63] shadow-xs transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">탐구 기록지</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={toggleFullscreen}
              title="전체화면 (F)"
              aria-label="전체화면 전환"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(31,41,51,0.12)] bg-[#fffdf8]/90 hover:bg-[#fffdf8] flex items-center justify-center text-[#1f2933] shadow-sm transition-all cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        )}
        {/* Bottom Horizontal Progress Bar */}
        <div className="absolute left-0 bottom-0 w-full h-[4px] bg-black/5 z-40">
          <div
            className="h-full bg-[#2d6a63] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </main>

      {/* Slide Navigation Drawer Modal */}
      <SlideNavDrawer
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        slides={SLIDES}
        currentIndex={currentIndex}
        onSelectSlide={goToSlide}
      />

      {/* Worksheet Summary Modal */}
      <WorksheetSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        data={studentData}
        choices={choices}
        onResetData={handleResetAll}
      />
    </div>
  );
}
