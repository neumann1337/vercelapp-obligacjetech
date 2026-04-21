"use client";

import React, { useState } from 'react';
import { Calendar, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FORECASTS_DATA } from '@/data/market-forecasts';

export const ForecastsList = () => {
  // 1. Stan aktualnej strony
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // 2. Kopiujemy i odwracamy tablicę (najnowsze na początku)
  const reversedData = [...FORECASTS_DATA].reverse();

  // 3. Obliczamy całkowitą liczbę stron
  const totalPages = Math.ceil(reversedData.length / ITEMS_PER_PAGE);

  // 4. Pobieramy tylko te artykuły, które mają być na obecnej stronie
  const currentItems = reversedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full mt-8">
      
      {/* Nagłówek */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 border-b border-gray-100 pb-4 md:pb-6 gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="p-2 md:p-2.5 bg-gray-100 rounded-xl shadow-sm border border-gray-200 text-gray-900 flex-shrink-0">
            <Calendar size={20} strokeWidth={2.5} className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter leading-none text-gray-900">
              Analiza Rynku
            </h2>
            <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">
              Najnowsze aktualizacje
            </p>
          </div>
        </div>
        <span className="text-[9px] md:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] self-start md:self-auto">
          Artykułów: {reversedData.length}
        </span>
      </div>

      {/* Grid z artykułami (wyświetla tylko max 6 elementów) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        {currentItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white p-5 md:p-6 lg:p-8 rounded-3xl md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full relative overflow-hidden group cursor-pointer"
          >
            <div className={`absolute -top-10 -right-10 w-24 h-24 md:w-32 md:h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
              ${item.color === 'red' ? 'bg-red-100' : item.color === 'green' ? 'bg-emerald-100' : 'bg-blue-100'}`} 
            />

            <div className="flex justify-between items-center mb-5 md:mb-6 relative z-10">
              <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl border shadow-sm transition-all duration-300
                ${item.color === 'red' ? 'bg-red-50 text-red-600 border-red-100' : 
                  item.color === 'green' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                  'bg-blue-50 text-blue-600 border-blue-100'}`}>
                {item.tag}
              </span>
              <span className="text-[9px] md:text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md md:rounded-lg border border-gray-100">
                {item.date}
              </span>
            </div>

            <h3 className="text-base md:text-lg lg:text-xl font-black text-gray-900 mb-3 md:mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300 relative z-10">
              {item.title}
            </h3>

            <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium flex-grow mb-6 md:mb-8 relative z-10">
              {item.content}
            </p>
            
            <div className="pt-4 md:pt-5 border-t border-gray-50 mt-auto relative z-10 overflow-hidden">
              <div className="flex items-center justify-between text-blue-600 font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 transform opacity-100 translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0">
                  <span>Czytaj szczegóły</span> 
                  <ArrowUpRight size={18} strokeWidth={3} className="md:w-4 md:h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            
          </div>
        ))}
      </div>
      
      {/* Paginacja (pokazuje się tylko, jeśli jest więcej niż 1 strona) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          
          {/* Przycisk Poprzednia */}
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 md:p-3 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-[#0071E3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Poprzednia strona"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Numery stron 1, 2, 3... */}
          <div className="flex items-center gap-1 md:gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = currentPage === pageNumber;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-300
                    ${isActive 
                      ? 'bg-[#0071E3] text-white shadow-md shadow-blue-500/30' 
                      : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-[#0071E3]'
                    }
                  `}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          {/* Przycisk Następna */}
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 md:p-3 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-[#0071E3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Następna strona"
          >
            <ChevronRight size={20} />
          </button>

        </div>
      )}

    </section>
  );
};

export default ForecastsList;