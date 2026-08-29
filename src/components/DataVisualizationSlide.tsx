import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart
} from 'recharts';
import { TrendingUp, Activity, Calculator, AlertCircle } from 'lucide-react';

interface DataVisualizationSlideProps {
  sheetData: any[];
}

interface DataPoint {
  x: number; // ulna
  y: number; // height
}

export const DataVisualizationSlide: React.FC<DataVisualizationSlideProps> = ({ sheetData }) => {
  const { data, combinedChartData, stats, domainX, domainY } = useMemo(() => {
    const validData: DataPoint[] = sheetData
      .map((row) => ({
        x: parseFloat(row.ulna),
        y: parseFloat(row.height),
      }))
      .filter((d) => !isNaN(d.x) && !isNaN(d.y) && d.x > 0 && d.y > 0);

    if (validData.length < 2) {
      return { data: validData, stats: null, regressionData: [], domainX: [0, 100], domainY: [0, 200] };
    }

    const n = validData.length;
    let sumX = 0, sumY = 0;
    validData.forEach((d) => {
      sumX += d.x;
      sumY += d.y;
    });
    const meanX = sumX / n;
    const meanY = sumY / n;

    let ssXX = 0, ssYY = 0, ssXY = 0;
    validData.forEach((d) => {
      ssXX += Math.pow(d.x - meanX, 2);
      ssYY += Math.pow(d.y - meanY, 2);
      ssXY += (d.x - meanX) * (d.y - meanY);
    });

    const r = ssXX && ssYY ? ssXY / Math.sqrt(ssXX * ssYY) : 0;
    const m = ssXX ? ssXY / ssXX : 0;
    const b = meanY - m * meanX;

    const minX = Math.min(...validData.map((d) => d.x));
    const maxX = Math.max(...validData.map((d) => d.x));
    const minY = Math.min(...validData.map((d) => d.y));
    const maxY = Math.max(...validData.map((d) => d.y));

    const padX = (maxX - minX) * 0.2 || 5;
    const padY = (maxY - minY) * 0.2 || 20;

    const domainX = [Math.max(0, Math.floor(minX - padX)), Math.ceil(maxX + padX)];
    const domainY = [Math.max(0, Math.floor(minY - padY)), Math.ceil(maxY + padY)];

    const combinedChartData = [
      { x: domainX[0], lineY: m * domainX[0] + b },
      ...validData.map(d => ({ x: d.x, scatterY: d.y, lineY: m * d.x + b })),
      { x: domainX[1], lineY: m * domainX[1] + b }
    ].sort((a, b) => a.x - b.x);

    return {
      data: validData,
      combinedChartData,
      stats: { r, m, b },
      domainX,
      domainY,
    };
  }, [sheetData]);

  const getCorrelationText = (r: number) => {
    const absR = Math.abs(r);
    if (absR >= 0.7) return '강한 상관관계';
    if (absR >= 0.3) return '어느 정도 상관관계';
    return '약한 상관관계 (거의 없음)';
  };

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full h-full flex flex-col justify-center">
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-[830] tracking-tight text-[#1f2933]">
          우리 반 데이터 <span className="text-[#2d6a63]">분석 결과</span>
        </h2>
        <p className="mt-2 text-[15px] sm:text-[18px] text-[#68727d] font-medium">
          구글 시트로 모인 {data.length}개의 데이터를 바탕으로 자뼈 길이와 키의 관계를 분석합니다.
        </p>
      </div>

      {!stats ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#fffdf8] rounded-[24px] border border-[rgba(31,41,51,0.08)] shadow-sm">
          <AlertCircle className="w-12 h-12 text-[#d58a4b] mb-4" />
          <h3 className="text-xl font-bold text-[#1f2933]">데이터가 부족합니다</h3>
          <p className="text-[#68727d] mt-2">이전 슬라이드에서 최소 2개 이상의 데이터를 제출해주세요.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
          {/* Chart Section */}
          <div className="flex-1 bg-[#fffdf8] p-5 sm:p-7 rounded-[28px] border border-[rgba(31,41,51,0.08)] shadow-[0_12px_28px_rgba(40,45,50,0.05)] flex flex-col">
            <h3 className="text-lg font-extrabold text-[#1f2933] mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#2d6a63]" />
              자뼈 길이와 키의 산점도
            </h3>
            <div className="flex-1 min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={combinedChartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d9d2c5" vertical={false} />
                  <XAxis 
                    dataKey="x" 
                    type="number" 
                    domain={domainX} 
                    name="자뼈 길이" 
                    unit="cm" 
                    tick={{ fill: '#68727d', fontSize: 13, fontWeight: 600 }}
                    axisLine={{ stroke: '#d9d2c5', strokeWidth: 2 }}
                    tickLine={false}
                    label={{ value: '자뼈 길이 (cm)', position: 'insideBottom', offset: -10, fill: '#1f2933', fontWeight: 'bold' }}
                  />
                  <YAxis 
                    type="number" 
                    domain={domainY} 
                    name="키" 
                    unit="cm"
                    tick={{ fill: '#68727d', fontSize: 13, fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: '실제 키 (cm)', angle: -90, position: 'insideLeft', offset: 15, fill: '#1f2933', fontWeight: 'bold' }}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', fontWeight: 'bold' }}
                    formatter={(value: number) => [`${value} cm`, '']}
                    labelFormatter={() => ''}
                  />
                  <Scatter name="학생 데이터" dataKey="scatterY" fill="#2d6a63" shape="circle" />
                  <Line 
                    dataKey="lineY" 
                    stroke="#d58a4b" 
                    strokeWidth={3} 
                    dot={false} 
                    activeDot={false} 
                    name="추세선 (회귀선)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="w-full lg:w-[380px] flex flex-col gap-4">
            {/* Correlation */}
            <div className="bg-[#2d6a63] text-white p-6 rounded-[28px] shadow-[0_12px_28px_rgba(45,106,99,0.2)] relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <TrendingUp className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="text-white/80 font-bold text-sm mb-1 uppercase tracking-wider">상관계수 (r)</div>
                <div className="text-[44px] font-black leading-none mb-2">
                  {stats.r > 0 ? '+' : ''}{stats.r.toFixed(2)}
                </div>
                <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm">
                  <span>{getCorrelationText(stats.r)}</span>
                </div>
                <p className="mt-4 text-white/90 text-sm leading-relaxed">
                  1에 가까울수록 자뼈가 길 때 키도 커지는 뚜렷한 규칙이 있다는 뜻입니다.
                </p>
              </div>
            </div>

            {/* Regression Equation */}
            <div className="bg-[#fffdf8] p-6 rounded-[28px] border border-[rgba(31,41,51,0.08)] shadow-[0_12px_28px_rgba(40,45,50,0.03)] flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#68727d] font-bold text-sm mb-3">
                <Calculator className="w-5 h-5 text-[#d58a4b]" />
                우리가 만든 예측 공식 (선형회귀)
              </div>
              <div className="text-center p-4 bg-[#f8f5ee] rounded-2xl border border-[rgba(31,41,51,0.05)]">
                <div className="text-[18px] sm:text-[22px] font-black text-[#1f2933]">
                  키 = <span className="text-[#2d6a63]">{stats.m.toFixed(2)}</span> × 자뼈 <span className="text-[#d58a4b]">{stats.b >= 0 ? '+' : '-'} {Math.abs(stats.b).toFixed(1)}</span>
                </div>
              </div>
              <p className="mt-4 text-[#68727d] text-sm leading-relaxed text-center font-medium">
                위 공식을 이용하면 자뼈 길이만 알아도<br/>그 사람의 키를 예측할 수 있습니다!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
