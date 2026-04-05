"use client";

import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { FORECASTS_DATA } from '@/data/market-forecasts';

export const ForecastsList = () => {
  return (
    <section className="w-full mt-8">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gray-100 rounded-xl shadow-sm border border-gray-200 text-gray-900">
            <Calendar size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tighter leading-none text-gray-900">
              Analiza Rynku
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">
              Prognozy: Styczeń 2026
            </p>
          </div>
        </div>
        <span className="hidden md:block text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
          Aktualizacja: Grudzień 2025
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
        {FORECASTS_DATA.map((item) => (
          <div 
            key={item.id} 
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full relative overflow-hidden group"
          >
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
              ${item.color === 'red' ? 'bg-red-100' : item.color === 'green' ? 'bg-emerald-100' : 'bg-blue-100'}`} 
            />

            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl border shadow-sm transition-all duration-300
                ${item.color === 'red' ? 'bg-red-50 text-red-600 border-red-100' : 
                  item.color === 'green' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                  'bg-blue-50 text-blue-600 border-blue-100'}`}>
                {item.tag}
              </span>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                {item.date}
              </span>
            </div>

            <h3 className="text-lg font-black text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300 relative z-10">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed font-medium flex-grow mb-8 relative z-10">
              {item.content}
            </p>
            <div className="pt-5 border-t border-gray-50 mt-auto relative z-10">
              <div className="flex items-center justify-between text-blue-600 font-black text-[10px] md:text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Czytaj szczegóły <ArrowUpRight size={16} strokeWidth={3} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ForecastsList;