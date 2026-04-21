"use client";

import React from 'react';
import { PieChart } from 'lucide-react';

interface SimplePieChartProps {
  amount: number;
  profit: number;
  // formatPLN nie jest dostarczone, więc zrobimy proste
}

// Prosta funkcja formatująca
const formatPLNLocal = (v: number) => {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(v);
};

export const SimplePieChart = ({ amount, profit }: SimplePieChartProps) => {
  const total = amount + profit;
  const capitalPercent = total > 0 ? amount / total : 1;
  const profitPercent = 1 - capitalPercent;
  
  // Obliczamy kąty i flagi dla łuku SVG
  // Startujemy od góry (12:00)
  const angle = 2 * Math.PI * capitalPercent;
  const endX = Math.sin(angle);
  const endY = -Math.cos(angle);
  const largeArcFlag = capitalPercent > 0.5 ? 1 : 0;

  // Poprawny format danych łuku
  const pathData = [`M 0 -1`, `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, `L 0 0 Z`].join(' ');

  const roi = amount > 0 ? ((profit / amount) * 100).toFixed(2) : '0.00';

  return (
    // Zmieniamy na flex-col dla wszystkich urządzeń, wykres na górze
    <div className="flex flex-col items-center justify-center gap-10 w-full h-full py-10 px-4">
      
      {/* WYKRES KOŁOWY - Wyśrodkowany, większy i czytelny */}
      <div className="relative w-72 h-72 flex-shrink-0">
        <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full -rotate-90 transition-transform duration-500 hover:scale-105">
          {/* Tło dla zysku netto */}
          <circle cx="0" cy="0" r="1" className="fill-[#10B981]" />
          {/* Łuk dla wkładu własnego */}
          <path d={pathData} className="fill-[#0071E3] transition-all duration-700" />
          {/* Środek */}
          <circle cx="0" cy="0" r="0.65" className="fill-white" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <PieChart size={36} className="text-gray-300 mb-2 opacity-50" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Struktura</span>
        </div>
      </div>

      {/* SEKCJA Z DANYMI - Wyraźna, wyśrodkowana, z podziałem */}
      <div className="flex flex-col items-center w-full max-w-md space-y-8">
         
         {/* Karta: Wkład własny */}
         <div className="w-full bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 rounded-full bg-[#0071E3] shadow-inner"></div>
                <span className="text-sm font-semibold uppercase text-gray-500 tracking-wider">Wkład własny</span>
            </div>
            <p className="text-3xl font-black text-gray-900 tracking-tighter">{formatPLNLocal(amount)}</p>
            <span className="text-xs font-medium text-gray-400 mt-1">({(capitalPercent * 100).toFixed(1)}% portfela)</span>
         </div>
         
         {/* Karta: Zysk netto + Suma całkowita */}
         <div className="w-full bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 rounded-full bg-[#10B981] shadow-inner"></div>
                <span className="text-sm font-semibold uppercase text-gray-500 tracking-wider">Zysk netto</span>
            </div>
            <p className="text-3xl font-black text-emerald-600 tracking-tighter">+{formatPLNLocal(profit)}</p>
            <span className="text-xs font-medium text-gray-400 mt-1">({(profitPercent * 100).toFixed(1)}% portfela)</span>

            {/* Nowy element: Suma całkowita */}
            <div className="flex items-center gap-2 mt-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-inner w-full justify-center">
                <span className="text-sm font-bold text-gray-400 uppercase">Suma:</span>
                <span className="text-xl font-black text-gray-900 tabular-nums">{formatPLNLocal(total)}</span>
            </div>
         </div>

         {/* Karta: Rentowność (ROI) */}
         <div className="w-full bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex items-center justify-between px-8">
            <span className="text-sm font-semibold uppercase text-gray-500 tracking-wider">Rentowność (ROI)</span>
            <div className="text-[#10B981]">
                <span className="text-3xl font-black tracking-tighter">{roi}%</span>
            </div>
         </div>
      </div>
      
    </div>
  );
};