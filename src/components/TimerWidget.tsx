import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Plus, Bell, Maximize2, Minimize2 } from 'lucide-react';

interface TimerWidgetProps {
  initialSeconds: number;
  slideId: number;
}

export const TimerWidget: React.FC<TimerWidgetProps> = ({ initialSeconds, slideId }) => {
  const [localInitial, setLocalInitial] = useState(initialSeconds);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const intervalRef = useRef<number | null>(null);

  // Reset timer when slide changes
  useEffect(() => {
    setLocalInitial(initialSeconds);
    setSeconds(initialSeconds);
    setIsActive(false);
    setIsFinished(false);
    setIsEditing(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [slideId, initialSeconds]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setIsActive(false);
            setIsFinished(true);
            // Play subtle Web Audio chime
            try {
              const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
              const osc = audioCtx.createOscillator();
              const gain = audioCtx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
              osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
              gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
              osc.connect(gain);
              gain.connect(audioCtx.destination);
              osc.start();
              osc.stop(audioCtx.currentTime + 0.8);
            } catch {
              // Ignore audio context errors
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  const handleEditStart = () => {
    if (isActive) return; // Don't edit while running
    setIsEditing(true);
    setEditValue(formatTime(seconds));
  };

  const handleEditSubmit = () => {
    setIsEditing(false);
    const parts = editValue.split(':');
    let newSeconds = 0;
    if (parts.length === 2) {
      newSeconds = (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0);
    } else if (parts.length === 1) {
      // Treat as minutes if no colon
      newSeconds = (parseInt(parts[0]) || 0) * 60;
    }

    if (newSeconds > 0) {
      setSeconds(newSeconds);
      setLocalInitial(newSeconds);
      setIsFinished(false);
    } else {
      setSeconds(localInitial); // Revert on invalid
    }
  };

  const toggleTimer = () => {
    if (isEditing) handleEditSubmit();
    
    if (seconds <= 0) {
      setSeconds(localInitial);
      setIsFinished(false);
    }
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsFinished(false);
    setIsEditing(false);
    setSeconds(localInitial);
  };

  const addOneMinute = () => {
    if (isEditing) handleEditSubmit();
    setSeconds((prev) => prev + 60);
    if (!isActive && seconds === localInitial) {
      setLocalInitial((prev) => prev + 60);
    }
    setIsFinished(false);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const percentage = localInitial > 0 ? Math.min(100, Math.max(0, (seconds / localInitial) * 100)) : 0;

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
        <div 
          className="relative bg-[#fffdf8] rounded-[32px] border border-[rgba(31,41,51,0.1)] shadow-[0_24px_80px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center overflow-hidden"
          style={{ 
            resize: 'both', 
            width: '60vw', 
            height: '50vh', 
            minWidth: '320px', 
            minHeight: '280px',
            maxWidth: '95vw',
            maxHeight: '95vh'
          }}
        >
          {/* Progress background */}
          <div 
            className={`absolute bottom-0 left-0 right-0 transition-all duration-300 opacity-20 ${isFinished ? 'bg-[#dc2626]' : 'bg-[#2d6a63]'}`}
            style={{ height: `${percentage}%` }}
          />

          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-6 right-6 p-3 bg-black/5 hover:bg-black/10 rounded-full text-[#68727d] transition-all z-10"
            title="축소"
          >
            <Minimize2 className="w-6 h-6" />
          </button>

          <div className="relative z-10 flex flex-col items-center">
            {isFinished ? (
              <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-[#dc2626] animate-bounce mb-4 sm:mb-6" />
            ) : (
              <Clock className={`w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 ${isActive ? 'text-[#2d6a63] animate-spin' : 'text-[#68727d]'}`} style={{ animationDuration: '6s' }} />
            )}
            
            <div className="text-[80px] sm:text-[120px] md:text-[150px] font-black tracking-tight font-mono leading-none text-[#1f2933]">
              {isEditing ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value.replace(/[^0-9:]/g, ''))}
                  onBlur={handleEditSubmit}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleEditSubmit(); }}
                  className="bg-transparent outline-none text-center w-[5ch] border-b-8 border-[#2d6a63] text-[#2d6a63]"
                  autoFocus
                  placeholder="00:00"
                />
              ) : (
                <span onClick={handleEditStart} className={!isActive ? "cursor-pointer hover:text-[#2d6a63] transition-colors" : ""} title={!isActive ? "클릭하여 시간 수정" : ""}>
                  {formatTime(seconds)}
                </span>
              )}
            </div>
            <div className="text-[18px] sm:text-[24px] text-[#68727d] font-bold mt-4 mb-8 sm:mb-10 flex items-center gap-2">
              {isFinished ? '탐구 시간이 종료되었습니다!' : isActive ? '탐구 진행 중' : (
                <>탐구 타이머 준비 <span className="text-xs bg-[#2d6a63]/10 text-[#2d6a63] px-2 py-1 rounded-full ml-2">시간 클릭 시 수정 가능</span></>
              )}
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={toggleTimer}
                className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  isActive
                    ? 'bg-[#2d6a63] text-white hover:bg-[#23534d] scale-105'
                    : 'bg-[#fffdf8] border-2 border-[#2d6a63] text-[#2d6a63] hover:bg-[#2d6a63]/10 font-bold'
                }`}
              >
                {isActive ? <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-current" /> : <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-2" />}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#f8f5ee] border border-[rgba(31,41,51,0.1)] hover:bg-[#ebe5d9] text-[#68727d] flex items-center justify-center transition-all shadow-sm"
                title="초기화"
              >
                <RotateCcw className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <button
                type="button"
                onClick={addOneMinute}
                className="flex items-center gap-2 text-[16px] sm:text-[22px] font-black px-5 py-3 sm:px-8 sm:py-5 rounded-full bg-[#f8f5ee] border border-[rgba(31,41,51,0.1)] hover:bg-[#ebe5d9] text-[#68727d] transition-all shadow-sm"
                title="+1분 추가"
              >
                <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                1분
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-[#a0aab5] flex items-center gap-1.5 opacity-50">
            <span className="text-xs font-bold pointer-events-none">모서리를 드래그하여 크기 조절</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed top-4 right-4 z-40 flex items-center gap-2 sm:gap-3 px-3.5 py-2 rounded-full border transition-all shadow-[0_8px_20px_rgba(40,45,50,0.08)] backdrop-blur-md ${
        isFinished
          ? 'bg-[#fee2e2] border-[#f87171] text-[#991b1b] animate-pulse'
          : isActive
          ? 'bg-[#fffdf8]/95 border-[#2d6a63]/40 text-[#2d6a63]'
          : 'bg-[#fffdf8]/90 border-[rgba(31,41,51,0.12)] text-[#1f2933]'
      }`}
    >
      <div className="relative flex items-center justify-center">
        {isFinished ? (
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#dc2626] animate-bounce" />
        ) : (
          <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-[#2d6a63] animate-spin' : 'text-[#68727d]'}`} style={{ animationDuration: '6s' }} />
        )}
      </div>
      <div className="flex flex-col min-w-[3.5rem]">
        <span className="text-[14px] sm:text-[17px] font-black tracking-tight font-mono leading-none h-[1.1em] flex items-center">
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value.replace(/[^0-9:]/g, ''))}
              onBlur={handleEditSubmit}
              onKeyDown={(e) => { if (e.key === 'Enter') handleEditSubmit(); }}
              className="bg-transparent outline-none w-[4ch] border-b-2 border-[#2d6a63] text-[#2d6a63]"
              autoFocus
              placeholder="00:00"
            />
          ) : (
            <span onClick={handleEditStart} className={!isActive ? "cursor-pointer hover:text-[#2d6a63] transition-colors" : ""} title={!isActive ? "클릭하여 시간 수정" : ""}>
              {formatTime(seconds)}
            </span>
          )}
        </span>
        <span className="text-[9px] sm:text-[10px] text-[#68727d] font-semibold leading-tight mt-0.5 whitespace-nowrap">
          {isFinished ? '탐구 시간 종료!' : isActive ? '탐구 진행 중' : '클릭하여 수정'}
        </span>
      </div>
      <div className="flex items-center gap-1 ml-1">
        <button
          type="button"
          onClick={toggleTimer}
          title={isActive ? '일시 정지' : '시작'}
          aria-label={isActive ? '일시 정지' : '타이머 시작'}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
            isActive
              ? 'bg-[#2d6a63] text-white hover:bg-[#23534d]'
              : 'bg-[#2d6a63]/10 text-[#2d6a63] hover:bg-[#2d6a63]/20 font-bold'
          }`}
        >
          {isActive ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
        </button>
        <button
          type="button"
          onClick={resetTimer}
          title="초기화"
          aria-label="타이머 초기화"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/5 hover:bg-black/10 text-[#68727d] flex items-center justify-center transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={addOneMinute}
          title="+1분 추가"
          aria-label="1분 추가"
          className="hidden sm:flex items-center gap-0.5 text-[11px] font-bold px-2 py-1 rounded-full bg-black/5 hover:bg-black/10 text-[#68727d] transition-all"
        >
          <Plus className="w-3 h-3" />
          1분
        </button>
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          title="타이머 확대"
          aria-label="타이머 확대"
          className="hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 ml-1 rounded-full bg-black/5 hover:bg-black/10 text-[#68727d] transition-all"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
      {/* Progress bar line beneath pill */}
      <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-black/5 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${isFinished ? 'bg-[#dc2626]' : 'bg-[#2d6a63]'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
