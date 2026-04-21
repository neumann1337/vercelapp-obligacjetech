"use client";

import React from 'react';
import { PieChart } from 'lucide-react';

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
    <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-12 w-full h-full py-4">
      
      <div className="flex flex-col justify-center w-full md:w-auto space-y-4">
         
         <div className="bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-[#0071E3] shadow-sm ring-2 ring-blue-50"></div>
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Wkład własny</span>
            </div>
            <p className="text-2xl font-black text-gray-900 tracking-tight pl-5">{formatPLN(amount)}</p>
         </div>
         
         <div className="bg-emerald-50/50 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-sm ring-2 ring-emerald-50"></div>
                <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Zysk netto</span>
            </div>
            
            <div className="flex items-baseline gap-3 pl-5 flex-wrap">
                <span className="text-2xl font-black text-emerald-600 tracking-tight">+{formatPLN(profit)}</span>
                
                <div className="flex items-center gap-1.5 bg-white md:bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Suma:</span>
                    <span className="text-sm font-black text-gray-900">{formatPLN(total)}</span>
                </div>
            </div>
         </div>

         <div className="pt-2 md:pt-4 border-t-0 md:border-t border-gray-100 flex items-center justify-between md:block px-4 md:px-0">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block md:mb-1">Rentowność (ROI)</span>
            <div className="text-[#10B981] md:pl-5">
                <span className="text-xl md:text-2xl font-black tracking-tighter">
                    {amount > 0 ? ((profit / amount) * 100).toFixed(2) : '0.00'}%
                </span>
            </div>
         </div>
      </div>

      <div className="relative w-56 h-56 md:w-64 md:h-64 flex-shrink-0">
        <svg viewBox="-1.1 -1.1 2.2 2.2" className="w-full h-full -rotate-90 drop-shadow-xl transition-transform duration-500 hover:scale-105">
          <circle cx="0" cy="0" r="1" className="fill-[#10B981]" />
          <path d={pathData} className="fill-[#0071E3] transition-all duration-700" />
          <circle cx="0" cy="0" r="0.65" className="fill-white" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <PieChart size={28} className="text-gray-300 mb-1 opacity-50" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Struktura</span>
        </div>
      </div>
      
    </div>
  );
};