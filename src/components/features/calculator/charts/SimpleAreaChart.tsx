"use client";

import React, { useState } from 'react';
import { TimelineItem } from '@/types/calculator';

interface SimpleAreaChartProps {
  data: TimelineItem[];
  formatPLN: (v: number) => string;
}

export const SimpleAreaChart = ({ data, formatPLN }: SimpleAreaChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const width = 800;
  const height = 300;
  const padding = { top: 40, right: 20, bottom: 40, left: 20 };

  if (!data || data.length === 0) return null;

  const values = data.map(d => d.totalValue);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const buffer = (rawMax - rawMin) * 0.1 || 1; 
  const min = rawMin - buffer;
  const max = rawMax + buffer;
  const range = max - min || 1;

  const getX = (index: number) => padding.left + (index * (width - padding.left - padding.right)) / (data.length - 1);
  const getY = (value: number) => height - padding.bottom - ((value - min) * (height - padding.top - padding.bottom)) / range;

  const points = data.map((d, i) => `${getX(i)},${getY(d.totalValue)}`).join(' ');
  const areaPoints = `${getX(0)},${height - padding.bottom} ${points} ${getX(data.length - 1)},${height - padding.bottom}`;

  return (
    <div className="relative w-full h-[300px] group select-none">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0071E3" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((p) => {
          const y = padding.top + p * (height - padding.top - padding.bottom);
          return <line key={p} x1={padding.left} y1={y} x2={width - padding.right} y2={y} className="stroke-[#F1F5F9] stroke-1" />;
        })}

        <polyline points={areaPoints} fill="url(#chartGradient)" />
        <polyline points={points} fill="none" className="stroke-[#0071E3] stroke-[4px] drop-shadow-md" strokeLinecap="round" strokeLinejoin="round" />

        {data.map((d, i) => {
          const isStart = i === 0;
          const isLast = i === data.length - 1;
          const isHovered = hoveredIndex === i;

          return (
            <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
              <rect x={getX(i) - 15} y={0} width={30} height={height} className="fill-transparent cursor-pointer" />
              
              {isStart && <circle cx={getX(i)} cy={getY(d.totalValue)} r={6} className="fill-blue-500 stroke-white stroke-[3px]" />}
              {!isStart && !isLast && <circle cx={getX(i)} cy={getY(d.totalValue)} r={5} className="fill-[#34C759] stroke-white stroke-[2px]" />}
              {isLast && (
                <g>
                    <circle cx={getX(i)} cy={getY(d.totalValue)} r={12} className="fill-purple-500 opacity-20 animate-ping" style={{ transformOrigin: `${getX(i)}px ${getY(d.totalValue)}px` }} />
                    <circle cx={getX(i)} cy={getY(d.totalValue)} r={7} className="fill-purple-500 stroke-white stroke-[3px]" />
                </g>
              )}

              {isHovered && (
                <>
                  <line x1={getX(i)} y1={padding.top} x2={getX(i)} y2={height - padding.bottom} strokeDasharray="4,4" className="stroke-gray-300 stroke-[2px]" />
                  <circle cx={getX(i)} cy={getY(d.totalValue)} r={isLast ? 9 : 7} className="fill-none stroke-gray-900 stroke-[3px] opacity-40" />
                </>
              )}
            </g>
          );
        })}

        {data.filter((_, i) => i % 12 === 0 || i === data.length - 1).map((d, i) => (
          <text key={i} x={getX(data.indexOf(d))} y={height - 10} textAnchor="middle" className="text-[11px] fill-[#94A3B8] font-bold uppercase tracking-widest font-mono">
            {d.month === 0 ? 'Start' : `${d.month}m`}
          </text>
        ))}
      </svg>

      {hoveredIndex !== null && (
        <div 
          className="absolute z-20 bg-white px-5 py-3 shadow-2xl rounded-2xl pointer-events-none transition-all duration-100 ease-out border border-gray-100"
          style={{ 
            left: `${(getX(hoveredIndex) / width) * 100}%`, 
            top: `${(getY(data[hoveredIndex].totalValue) / height) * 100}%`,
            transform: 'translate(-50%, -130%)'
          }}
        >
          <div className="flex flex-col items-center whitespace-nowrap">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              {hoveredIndex === 0 ? 'Start' : hoveredIndex === data.length - 1 ? 'Wypłata Końcowa' : `Miesiąc ${data[hoveredIndex].month}`}
            </span>
            <span className="text-xl font-black text-gray-900 tabular-nums tracking-tight">
              {formatPLN(data[hoveredIndex].totalValue)}
            </span>
            {hoveredIndex > 0 && (
              <span className="text-[11px] text-[#34C759] font-bold mt-1">
                +{formatPLN(data[hoveredIndex].accumulatedProfit)} zysku
              </span>
            )}
          </div>
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-gray-100"></div>
        </div>
      )}
    </div>
  );
};