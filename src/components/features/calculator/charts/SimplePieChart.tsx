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
  const profitPercent = 1 - capitalPercent;
  
  const angle = 2 * Math.PI * capitalPercent;
  const endX = Math.sin(angle);
  const endY = -Math.cos(angle);
  const largeArcFlag = capitalPercent > 0.5 ? 1 : 0;

  const pathData = [`M 0 -1`, `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, `L 0 0 Z`].join(' ');

  const roi = amount > 0 ? ((profit / amount) * 100).toFixed(2) : '0.00';

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full h-full pb-4 px-2 md:px-4">
      
      {/* WYKRES KOŁOWY - Wersja Mikro */}
      <div className="relative w-36 h-36 md:w-40 md:h-40 flex-shrink-0 mt-2">
        <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full -rotate-90 transition-transform duration-500">
          <circle cx="0" cy="0" r="1" className="fill-[#10B981]" />
          <path d={pathData} className="fill-[#0071E3]" />
          <circle cx="0" cy="0" r="0.65" className="fill-white" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <PieChart size={20} className="text-gray-300 mb-1 opacity-50" />
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Struktura</span>
        </div>
      </div>

      {/* SEKCJA Z DANYMI - Ultrakompaktowa (Pozioma) */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-2 md:gap-3">
         
         {/* Karta: Wkład własny (JEDNA LINIA) */}
         <div className="col-span-2 bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0071E3] shadow-inner"></div>
                <span className="text-[10px] md:text-xs font-bold uppercase text-gray-500 tracking-wider">Wkład własny</span>
            </div>
            <div className="text-right">
                <p className="text-lg md:text-xl font-black text-gray-900 leading-none mb-1">{formatPLN(amount)}</p>
                <span className="text-[9px] font-bold text-gray-400 uppercase">{(capitalPercent * 100).toFixed(1)}% portfela</span>
            </div>
         </div>
         
         {/* Karta: Zysk netto (JEDNA LINIA) */}
         <div className="col-span-2 bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-inner"></div>
                <span className="text-[10px] md:text-xs font-bold uppercase text-gray-500 tracking-wider">Zysk netto</span>
            </div>
            <div className="text-right">
                <p className="text-lg md:text-xl font-black text-emerald-600 leading-none mb-1">+{formatPLN(profit)}</p>
                <span className="text-[9px] font-bold text-gray-400 uppercase">{(profitPercent * 100).toFixed(1)}% portfela</span>
            </div>
         </div>

         {/* Karta: Suma całkowita */}
         <div className="col-span-1 bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start justify-center">
            <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider mb-1">Suma całkowita</span>
            <p className="text-sm md:text-base font-black text-gray-900 leading-none">{formatPLN(total)}</p>
         </div>

         {/* Karta: Rentowność (ROI) */}
         <div className="col-span-1 bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start justify-center">
            <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider mb-1">Rentowność</span>
            <p className="text-sm md:text-base font-black text-[#10B981] leading-none">{roi}%</p>
         </div>

      </div>
      
    </div>
  );
};