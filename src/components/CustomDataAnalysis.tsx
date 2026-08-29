import React, { useMemo } from 'react';
import { Activity, AlertCircle, TrendingUp, Calculator } from 'lucide-react';
import { ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CustomDataAnalysisProps {
  rows: { id: number; name: string; partLength: string; height: string; note: string }[];
  partName: string;
  groupName: string;
}

const CustomDataAnalysis: React.FC<CustomDataAnalysisProps> = ({ rows, partName, groupName }) => {
  const { data, combinedChartData, stats, domainX, domainY } = useMemo(() => {
    const validData = rows
      .map((row) => ({
        name: row.name || `친구 ${row.id}`,
        x: parseFloat(row.partLength),
        y: parseFloat(row.height),
      }))
      .filter((d) => !isNaN(d.x) && !isNaN(d.y) && d.x > 0 && d.y > 0);

    if (validData.length < 2) {
      return { data: validData, stats: null, combinedChartData: [], domainX: [0, 100], domainY: [0, 200] };
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
      ...validData.map((d) => ({ name: d.name, x: d.x, scatterY: d.y, lineY: m * d.x + b })),
      { x: domainX[1], lineY: m * domainX[1] + b }
    ].sort((a, b) => a.x - b.x);

    return {
      data: validData,
      combinedChartData,
      stats: { r, m, b },
      domainX,
      domainY,
    };
  }, [rows]);

  const getCorrelationText = (r: number) => {
    const absR = Math.abs(r);
    if (absR >= 0.7) return '강한 상관관계';
    if (absR >= 0.3) return '어느 정도 상관관계';
    return '약한 상관관계 (거의 없음)';
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-6 text-center">
        <h2 className="text-[24px] sm:text-[32px] md:text-[38px] font-[830] tracking-tight text-[#1f2933]">
          {groupName ? `${groupName}의` : '우리 팀의'} 데이터 <span className="text-[#2d6a63]">분석 결과</span>
        </h2>
        <p className="mt-2 text-[14px] sm:text-[16px] text-[#68727d] font-medium">
          수집한 {data.length}개의 데이터를 바탕으로 '{partName || '신체 부위'}' 길이와 키의 관계를 분석합니다.
        </p>
      </div>

      {!stats ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#fffdf8] rounded-[24px] border border-[rgba(31,41,51,0.08)] shadow-sm min-h-[300px]">
          <AlertCircle className="w-12 h-12 text-[#d58a4b] mb-4" />
          <h3 className="text-xl font-bold text-[#1f2933]">데이터가 부족합니다</h3>
          <p className="text-[#68727d] mt-2">유효한 숫자 데이터가 최소 2개 이상 필요합니다.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[400px]">
          {/* Chart Section */}
          <div className="flex-1 bg-[#fffdf8] p-5 rounded-[28px] border border-[rgba(31,41,51,0.08)] shadow-[0_12px_28px_rgba(40,45,50,0.05)] flex flex-col">
            <h3 className="text-lg font-extrabold text-[#1f2933] mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#2d6a63]" />
              {partName || '신체 부위'} 길이와 키의 산점도
            </h3>
            <div className="flex-1 min-h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={combinedChartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d9d2c5" vertical={false} />
                  <XAxis 
                    dataKey="x" 
                    type="number" 
                    domain={domainX} 
                    name={partName || '길이'} 
                    unit="cm" 
                    tick={{ fill: '#68727d', fontSize: 13, fontWeight: 600 }}
                    axisLine={{ stroke: '#d9d2c5', strokeWidth: 2 }}
                    tickLine={false}
                    label={{ value: `${partName || '길이'} (cm)`, position: 'insideBottom', offset: -10, fill: '#1f2933', fontWeight: 'bold' }}
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
                    formatter={(value: number, name: string) => {
                      if (name === '추세선 (회귀선)') return [`${value.toFixed(1)} cm`, name];
                      return [`${value} cm`, '키'];
                    }}
                    labelFormatter={(label, payload) => {
                      if (payload && payload.length > 0 && payload[0].payload.name) {
                        return payload[0].payload.name;
                      }
                      return `${partName || '길이'}: ${label}cm`;
                    }}
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
          <div className="w-full lg:w-[340px] flex flex-col gap-4">
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
              </div>
            </div>

            <div className="bg-[#fffdf8] p-6 rounded-[28px] border border-[rgba(31,41,51,0.08)] shadow-[0_12px_28px_rgba(40,45,50,0.03)] flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#68727d] font-bold text-sm mb-3">
                <Calculator className="w-5 h-5 text-[#d58a4b]" />
                우리가 만든 예측 공식
              </div>
              <div className="text-center p-4 bg-[#f8f5ee] rounded-2xl border border-[rgba(31,41,51,0.05)]">
                <div className="text-[16px] sm:text-[18px] font-black text-[#1f2933]">
                  키 = <span className="text-[#2d6a63]">{stats.m.toFixed(2)}</span> × {partName || '부위'} <span className="text-[#d58a4b]">{stats.b >= 0 ? '+' : '-'} {Math.abs(stats.b).toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDataAnalysis;
