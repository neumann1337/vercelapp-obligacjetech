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
  const padding = { top: 20, right: 20, bottom: 40, left: 20 };

  if (!data || data.length === 0) return null;

  const values = data.map(d => d.totalValue);
  const min = Math.min(...values);
  const max = Math.max(...values);
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
            <stop offset="0%" stopColor="#0071E3" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((p) => {
          const y = padding.top + p * (height - padding.top - padding.bottom);
          return <line key={p} x1={padding.left} y1={y} x2={width - padding.right} y2={y} className="stroke-[#F1F5F9] stroke-1" />;
        })}

        <polyline points={areaPoints} fill="url(#chartGradient)" />
        <polyline 
          points={points} 
          fill="none" 
          className="stroke-[#0071E3] stroke-[3px] drop-shadow-md stroke-round stroke-join-round" 
        />

        {data.map((d, i) => {
          const isCapitalizationPoint = d.month % 12 === 0 || i === data.length - 1 || i === 0;
          const isHovered = hoveredIndex === i;

          return (
            <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
              <rect x={getX(i) - 10} y={0} width={20} height={height} className="fill-transparent cursor-pointer" />
              
              {isCapitalizationPoint && (
                <circle 
                    cx={getX(i)} cy={getY(d.totalValue)} r={4} 
                    className="fill-white stroke-[#0071E3] stroke-2 transition-all duration-300"
                />
              )}
              {isHovered && (
                <>
                  <line 
                    x1={getX(i)} y1={padding.top} x2={getX(i)} y2={height - padding.bottom} 
                    strokeDasharray="3,3" className="stroke-[#0071E3] stroke-1 opacity-50" 
                  />
                  <circle 
                    cx={getX(i)} cy={getY(d.totalValue)} r={6} 
                    className="fill-[#0071E3] stroke-white stroke-2 drop-shadow-lg" 
                  />
                </>
              )}
            </g>
          );
        })}
        {data.filter((_, i) => i % 12 === 0 || i === data.length - 1).map((d, i) => (
          <text 
            key={i} x={getX(data.indexOf(d))} y={height - 10} textAnchor="middle" 
            className="text-[11px] fill-[#94A3B8] font-bold uppercase tracking-widest font-mono"
          >
            {d.month === 0 ? 'Start' : `${d.month}m`}
          </text>
        ))}
      </svg>
      {hoveredIndex !== null && (
        <div 
          className="absolute z-20 bg-white px-4 py-3 shadow-xl rounded-2xl pointer-events-none transition-all duration-100 ease-out border border-gray-200"
          style={{ 
            left: `${(getX(hoveredIndex) / width) * 100}%`, 
            top: `${(getY(data[hoveredIndex].totalValue) / height) * 100}%`,
            transform: 'translate(-50%, -150%)'
          }}
        >
          <div className="flex flex-col items-center whitespace-nowrap">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Miesiąc {data[hoveredIndex].month}</span>
            <span className="text-lg font-black text-gray-900 tabular-nums tracking-tight">{formatPLN(data[hoveredIndex].totalValue)}</span>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">+{formatPLN(data[hoveredIndex].accumulatedProfit)} zysku</span>
          </div>
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-gray-200"></div>
        </div>
      )}
    </div>
  );
};