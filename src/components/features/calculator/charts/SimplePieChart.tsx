"use client";

import React from 'react';
import { PieChart, ArrowUpRight } from 'lucide-react';

interface SimplePieChartProps {
  amount: number;
  profit: number;
  formatPLN: (v: number) => string;
}

export const SimplePieChart = ({ amount, profit, formatPLN }: SimplePieChartProps) => {
  const total = amount + profit;
  const capitalPercent = total > 0 ? amount / total : 1;
  
  const angle = 2 * Math.PI * capitalPercent;
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  const largeArcFlag = capitalPercent > 0.5 ? 1 : 0;

  const pathData = [`M 1 0`, `A 1 1 0 ${largeArcFlag} 1 ${x} ${y}`, `L 0 0`].join(' ');

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full h-full py-4">
      <div className="flex flex-col justify-center space-y-4 min-w-[160px]">
         <div>
            <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-[#0071E3] shadow-sm ring-2 ring-blue-50"></div>
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Wkład własny</span>
            </div>
            <p className="text-xl font-black text-gray-900 tracking-tight pl-5">{formatPLN(amount)}</p>
         </div>
         
         <div>
            <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-sm ring-2 ring-emerald-50"></div>
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Zysk netto</span>
            </div>
            <p className="text-xl font-black text-emerald-600 tracking-tight pl-5">+{formatPLN(profit)}</p>
         </div>

         <div className="pt-4 border-t border-black-100 mt-2">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Rentowność (ROI)</span>
            <div className="items-center gap-1 text-[#10B981] pl-5">
                <span className="text-2xl font-black tracking-tighter">
                    {((profit/total)*100).toFixed(1)}%
                </span>
            </div>
         </div>
      </div>
      <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
        <svg viewBox="-1.1 -1.1 2.2 2.2" className="w-full h-full -rotate-90 drop-shadow-lg transition-transform duration-500 hover:scale-105">
          <circle cx="0" cy="0" r="1" className="fill-[#10B981]" />
          <path d={pathData} className="fill-[#0071E3] transition-all duration-700" />
          <circle cx="0" cy="0" r="0.65" className="fill-white" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <PieChart size={24} className="text-gray-300 mb-1 opacity-50" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Struktura</span>
        </div>
      </div>
    </div>
  );
};