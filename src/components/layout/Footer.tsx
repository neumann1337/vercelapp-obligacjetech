import React from 'react';
import { TrendingUp } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-12 border-t border-white/10 font-sans">
      <div className="max-w-[980px] mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-[#0071E3]" size={20} />
            <span className="font-bold text-xl tracking-tight text-white">
              Obligacje<span className="text-[#0071E3]">.</span>tech
            </span>
          </div>
          <p className="text-[10px] leading-relaxed text-gray-500 uppercase tracking-widest font-medium opacity-80">
            Przedstawione dane mają charakter wyłącznie informacyjny i symulacyjny. Wyniki historyczne nie gwarantują osiągnięcia podobnych zysków w przyszłości. Nie stanowi to porady inwestycyjnej.
          </p>
        </div>
        <div className="text-center md:text-right shrink-0">
          <p className="text-xs text-gray-400">
            Made by <a href="#" className="text-white font-semibold hover:text-[#0071E3] transition-colors duration-300">Neumann Bartlomiej</a>
          </p>
        </div>
        
      </div>
    </footer>
  );
};