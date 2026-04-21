"use client";

import React, { useState } from 'react';
import { TimelineItem } from '@/types/calculator';

interface SimpleAreaChartProps {
  data: TimelineItem[];
  formatPLN: (v: number) => string;
}

export const SimpleAreaChart = ({ data, formatPLN }: SimpleAreaChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const values = data.map(d => d.totalValue);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const buffer = (rawMax - rawMin) * 0.1 || 1; 
  const min = rawMin - buffer;
  const max = rawMax + buffer;
  const range = max - min || 1;

  const getX = (index: number) => (index / (data.length - 1)) * 100;
  const getY = (value: number) => 100 - (((value - min) / range) * 100);

  const points = data.map((d, i) => `${getX(i)},${getY(d.totalValue)}`).join(' ');
  const areaPoints = `0,100 ${points} 100,100`;

  const getVisibleLabels = () => {
    const totalPoints = data.length;
    let step = 12;
    if (totalPoints > 36) step = 24;

    const labels = [];
    for (let i = 0; i < totalPoints; i++) {
      if (i === 0 || i === totalPoints - 1) {
        labels.push({ ...data[i], index: i });
      } else if (i % step === 0) {
        if (totalPoints - 1 - i > (step / 2)) {
          labels.push({ ...data[i], index: i });
        }
      }
    }
    return labels;
  };

  return (
    // Przezroczysty kontener wewnętrzny (bez powielania tła i obramowań)
    <div className="w-full flex flex-col pt-10 pb-6 px-4 md:px-8">
      
      <div className="relative w-full h-[220px] md:h-[280px] select-none">
        
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0071E3" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 25, 50, 75, 100].map((p) => (
            <line key={p} x1="0" y1={p} x2="100" y2={p} stroke="#F1F5F9" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}

          <polyline points={areaPoints} fill="url(#chartGradient)" />
          <polyline points={points} fill="none" stroke="#0071E3" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {data.map((d, i) => {
          const x = getX(i);
          const y = getY(d.totalValue);
          const isStart = i === 0;
          const isLast = i === data.length - 1;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={i}
              className="absolute z-10 flex items-center justify-center cursor-pointer"
              style={{ left: `${x}%`, top: `${y}%`, width: '30px', height: '30px', transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(isHovered ? null : i)}
            >
              <div className={`rounded-full border-2 border-white shadow-sm transition-all duration-200
                ${isStart ? 'bg-blue-500 w-3 h-3 md:w-4 md:h-4' : isLast ? 'bg-purple-500 w-4 h-4 md:w-5 md:h-5' : 'bg-[#34C759] w-2.5 h-2.5 md:w-3 md:h-3'}
                ${isHovered ? 'ring-4 ring-blue-500/30 scale-125' : ''}
              `}></div>

              {isLast && (
                <div className="absolute w-8 h-8 bg-purple-500 rounded-full animate-ping opacity-20 pointer-events-none"></div>
              )}
            </div>
          );
        })}

        {hoveredIndex !== null && (
          <div 
            className="absolute z-50 bg-white px-4 py-3 shadow-2xl rounded-2xl border border-gray-100 pointer-events-none transition-all duration-150"
            style={{ 
              left: `${getX(hoveredIndex)}%`, 
              top: `${getY(data[hoveredIndex].totalValue)}%`,
              transform: `translate(${hoveredIndex === 0 ? '5%' : hoveredIndex === data.length - 1 ? '-105%' : '-50%'}, -125%)`,
              minWidth: '140px'
            }}
          >
            <div className="flex flex-col items-center whitespace-nowrap">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                {hoveredIndex === 0 ? 'Start' : hoveredIndex === data.length - 1 ? 'Wypłata Końcowa' : `Miesiąc ${data[hoveredIndex].month}`}
              </span>
              <span className="text-xl font-black text-gray-900 tabular-nums">
                {formatPLN(data[hoveredIndex].totalValue)}
              </span>
              {hoveredIndex > 0 && (
                <span className="text-xs font-bold text-[#34C759] mt-1">
                  +{formatPLN((data[hoveredIndex] as any).periodProfit || 0)} zysku
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative w-full h-8 mt-6 select-none">
        {getVisibleLabels().map((d) => {
          const isFirst = d.index === 0;
          const isLast = d.index === data.length - 1;
          
          return (
            <div
              key={d.index}
              className={`absolute top-0 text-[10px] md:text-xs font-black text-gray-400 uppercase whitespace-nowrap
                ${isFirst ? 'left-0 transform-none' : isLast ? 'right-0 transform-none' : 'left-[var(--x-pos)] -translate-x-1/2'}
              `}
              style={{ '--x-pos': `${getX(d.index)}%` } as React.CSSProperties}
            >
              {d.month === 0 ? 'START' : `${d.month}M`}
            </div>
          );
        })}
      </div>

    </div>
  );
};