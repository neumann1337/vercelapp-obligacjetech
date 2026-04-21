"use client";

import React, { useState } from 'react';
import { PieChart } from 'lucide-react';
import { CalculationResult } from '@/types/calculator';
import { SimpleAreaChart } from '@/components/features/calculator/charts/SimpleAreaChart';
import { SimplePieChart } from '@/components/features/calculator/charts/SimplePieChart';

function ResultWidget({ label, value }: { label: string, value: string }) {
  return (
      <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-black/5 flex flex-col justify-center transition-transform hover:-translate-y-0.5">
          <span className="text-sm text-[#86868b] uppercase tracking-wider mb-2">{label}</span>
          <span className="text-2xl font-semibold text-[#1D1D1F]">{value}</span>
      </div>
  )
}

function MainResultTile({ results, formatPLN }: { results: CalculationResult, formatPLN: (v: number | undefined) => string }) {
  const [isOpen, setIsOpen] = useState(false);
  const gradientStyle = { background: 'linear-gradient(135deg, #0071E3 0%, #00C7BE 100%)' };

  return (
      <div className="w-full">
          <div 
              style={{ ...gradientStyle, transition: 'all 0.3s ease' }}
              className="p-6 md:p-8 rounded-[24px] text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:shadow-2xl hover:scale-[1.01] transform"
              onClick={() => setIsOpen(!isOpen)}
          >
              <div className="flex-grow mb-4 md:mb-0">
                  <p className="opacity-90 text-sm md:text-base mb-1 font-medium">Zysk całkowity "na rękę" (netto)</p>
                  <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">{formatPLN(results.total)}</h3>
              </div>
              <div className="flex items-center space-x-4">
                  <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm text-sm font-semibold whitespace-nowrap">
                      <span className="opacity-100">Okres: {results.duration}</span>
                  </div>
              </div>
          </div>
      </div>
  );
}

export const ResultDisplay = ({ results, amount, formatPLN }: { results: CalculationResult, amount: number | '', formatPLN: (v: number | undefined) => string }) => {
  return (
    <div className="mt-10 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <h2 className="text-2xl font-semibold mb-6 text-[#1D1D1F]">Twoja prognoza</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <ResultWidget label="Zysk Dzienny" value={formatPLN(results.daily)} />
          <ResultWidget label="Zysk Miesięczny" value={formatPLN(results.monthly)} />
          <ResultWidget label="Zysk Roczny (śr.)" value={formatPLN(results.yearly)} />
          <div className="col-span-1 sm:col-span-3">
              <MainResultTile results={results} formatPLN={formatPLN} />
          </div>
      </div>

      <div className="flex flex-col gap-8">
          {/* KAFELEK 1: Wykres Liniowy */}
          <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                  <h3 className="text-lg md:text-xl font-bold text-[#1D1D1F]">Progresja kapitału</h3>
                  <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Wzrost</div>
              </div>
              {/* Usunięte h-[320px]! Kontener jest teraz elastyczny */}
              <div className="w-full relative bg-white">
                  <SimpleAreaChart data={results.timeline} formatPLN={formatPLN as any} />
              </div>
          </div>

          {/* KAFELEK 2: Wykres Kołowy */}
          <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-500">
              <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-white z-10">
                  <div className="flex flex-col">
                      <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#1D1D1F]">Struktura portfela</h3>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mt-1.5">Analiza ROI</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-2xl text-gray-300 group-hover:text-[#0071E3] transition-all">
                      <PieChart size={24} strokeWidth={2.5} />
                  </div>
              </div>
              <div className="w-full bg-white">
                  <SimplePieChart amount={Number(amount)} profit={results.total} formatPLN={formatPLN as any} />
              </div>
          </div>
      </div>
    </div>
  );
};