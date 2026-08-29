const fs = require('fs');
let content = fs.readFileSync('src/components/TimerWidget.tsx', 'utf-8');

if (!content.includes('Maximize2')) {
  content = content.replace(
    `import { Play, Pause, RotateCcw, Clock, Plus, Bell } from 'lucide-react';`,
    `import { Play, Pause, RotateCcw, Clock, Plus, Bell, Maximize2, Minimize2 } from 'lucide-react';`
  );
}

// Add state for expanded
if (!content.includes('const [isExpanded, setIsExpanded] = useState(false);')) {
  content = content.replace(
    `const [isFinished, setIsFinished] = useState(false);`,
    `const [isFinished, setIsFinished] = useState(false);\n  const [isExpanded, setIsExpanded] = useState(false);`
  );
}

const formatTimeRender = `const formatTime = (totalSec: number) => {`;
const originalRenderStart = `const percentage = Math.min(100, Math.max(0, (seconds / initialSeconds) * 100));`;
const originalRenderReturn = `return (
    <div
      className={\`fixed top-4 right-4`;

// We will reconstruct the return statement.
const newReturn = `
  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
        <div 
          className="relative bg-[#fffdf8] rounded-[32px] border border-[rgba(31,41,51,0.1)] shadow-[0_24px_80px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center overflow-hidden"
          style={{ 
            resize: 'both', 
            width: '60vw', 
            height: '50vh', 
            minWidth: '300px', 
            minHeight: '250px',
            maxWidth: '95vw',
            maxHeight: '95vh'
          }}
        >
          {/* Progress background */}
          <div 
            className={\`absolute bottom-0 left-0 right-0 transition-all duration-300 opacity-20 \${isFinished ? 'bg-[#dc2626]' : 'bg-[#2d6a63]'}\`}
            style={{ height: \`\${percentage}%\` }}
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
              <Bell className="w-16 h-16 sm:w-20 sm:h-20 text-[#dc2626] animate-bounce mb-6" />
            ) : (
              <Clock className={\`w-16 h-16 sm:w-20 sm:h-20 mb-6 \${isActive ? 'text-[#2d6a63] animate-spin' : 'text-[#68727d]'}\`} style={{ animationDuration: '6s' }} />
            )}
            
            <div className="text-[80px] sm:text-[120px] md:text-[160px] font-black tracking-tight font-mono leading-none text-[#1f2933]">
              {formatTime(seconds)}
            </div>
            <div className="text-[20px] sm:text-[28px] text-[#68727d] font-bold mt-4 mb-10">
              {isFinished ? '탐구 시간이 종료되었습니다!' : isActive ? '탐구 진행 중' : '탐구 타이머 준비'}
            </div>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={toggleTimer}
                className={\`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all shadow-lg \${
                  isActive
                    ? 'bg-[#2d6a63] text-white hover:bg-[#23534d] scale-105'
                    : 'bg-[#fffdf8] border-2 border-[#2d6a63] text-[#2d6a63] hover:bg-[#2d6a63]/10 font-bold'
                }\`}
              >
                {isActive ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-2" />}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f8f5ee] border border-[rgba(31,41,51,0.1)] hover:bg-[#ebe5d9] text-[#68727d] flex items-center justify-center transition-all shadow-sm"
                title="초기화"
              >
                <RotateCcw className="w-8 h-8" />
              </button>
              <button
                type="button"
                onClick={addOneMinute}
                className="flex items-center gap-2 text-[18px] sm:text-[22px] font-black px-6 py-4 sm:px-8 sm:py-5 rounded-full bg-[#f8f5ee] border border-[rgba(31,41,51,0.1)] hover:bg-[#ebe5d9] text-[#68727d] transition-all shadow-sm"
                title="+1분 추가"
              >
                <Plus className="w-6 h-6" />
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
      className={\`fixed top-4 right-4 z-40 flex items-center gap-2 sm:gap-3 px-3.5 py-2 rounded-full border transition-all shadow-[0_8px_20px_rgba(40,45,50,0.08)] backdrop-blur-md \${
        isFinished
          ? 'bg-[#fee2e2] border-[#f87171] text-[#991b1b] animate-pulse'
          : isActive
          ? 'bg-[#fffdf8]/95 border-[#2d6a63]/40 text-[#2d6a63]'
          : 'bg-[#fffdf8]/90 border-[rgba(31,41,51,0.12)] text-[#1f2933]'
      }\`}
    >
      <div className="relative flex items-center justify-center">
        {isFinished ? (
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#dc2626] animate-bounce" />
        ) : (
          <Clock className={\`w-4 h-4 sm:w-5 sm:h-5 \${isActive ? 'text-[#2d6a63] animate-spin' : 'text-[#68727d]'}\`} style={{ animationDuration: '6s' }} />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-[14px] sm:text-[17px] font-black tracking-tight font-mono leading-none">
          {formatTime(seconds)}
        </span>
        <span className="text-[9px] sm:text-[10px] text-[#68727d] font-semibold leading-tight mt-0.5">
          {isFinished ? '탐구 시간 종료!' : isActive ? '탐구 진행 중' : '탐구 타이머'}
        </span>
      </div>
      <div className="flex items-center gap-1 ml-1">
        <button
          type="button"
          onClick={toggleTimer}
          title={isActive ? '일시 정지' : '시작'}
          aria-label={isActive ? '일시 정지' : '타이머 시작'}
          className={\`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all \${
            isActive
              ? 'bg-[#2d6a63] text-white hover:bg-[#23534d]'
              : 'bg-[#2d6a63]/10 text-[#2d6a63] hover:bg-[#2d6a63]/20 font-bold'
          }\`}
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
          className={\`h-full transition-all duration-300 \${isFinished ? 'bg-[#dc2626]' : 'bg-[#2d6a63]'}\`}
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    </div>
  );`;

content = content.replace(/return \(\s*<div\s*className={`fixed top-4 right-4[\s\S]*?\);\n/m, newReturn + '\n');

fs.writeFileSync('src/components/TimerWidget.tsx', content, 'utf-8');
