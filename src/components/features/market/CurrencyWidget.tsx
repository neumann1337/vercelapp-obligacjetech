"use client";

import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Euro, 
  DollarSign, 
  RefreshCw, 
  PoundSterling, 
  JapaneseYen, 
  Banknote,
  Coins 
} from 'lucide-react';

const useNBPRateInternal = (code: string) => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRate = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`);
      if (!res.ok) throw new Error('Błąd NBP');
      const data = await res.json();
      setRate(data.rates[0].mid);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchRate(); 
  }, [code]);

  return { rate, loading, error, refetch: fetchRate };
};

export interface CurrencyTileProps {
  code?: string;
  icon?: any;
  color?: string;
}

export const CurrencyTile = ({ 
  code = "eur", 
  icon: Icon = HelpCircle, 
  color = "text-blue-600" 
}: CurrencyTileProps) => {
  const { rate, loading, error, refetch } = useNBPRateInternal(code);

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between h-28 md:h-36 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-default w-full">
      <div className="absolute -top-10 -right-10 w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex justify-between items-start relative z-10">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-500 transition-colors">
          {code.toUpperCase()} / PLN
        </p>
        <div className="p-1.5 md:p-2 rounded-xl bg-gray-50 group-hover:bg-white border border-transparent group-hover:border-gray-100 shadow-sm transition-all duration-300">
          <Icon strokeWidth={2.5} className={`w-4 h-4 md:w-[18px] md:h-[18px] ${color} opacity-80 group-hover:scale-110 transition-transform`} />
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        {loading ? (
          <div className="h-6 md:h-8 w-16 md:w-24 bg-gray-100 rounded-lg animate-pulse" />
        ) : error ? (
          <div className="flex flex-col items-start gap-1 md:gap-1.5 bg-red-50 p-1.5 md:p-2 rounded-xl border border-red-100 w-fit">
            <span className="text-[9px] md:text-[10px] text-red-600 font-black uppercase tracking-wider">Błąd API</span>
            <button 
              onClick={(e) => { e.preventDefault(); refetch(); }} 
              className="text-[9px] md:text-[10px] text-red-500 hover:text-red-700 underline font-bold transition-colors"
            >
              Ponów
            </button>
          </div>
        ) : (
          <div className="flex items-baseline gap-1 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {/* Poprawka: usunięto md:leading-normal wymuszając leading-none, dzięki czemu napis na dole nie wyjeżdża! */}
            <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter tabular-nums leading-none">
              {code.toLowerCase() === 'jpy' 
                ? rate?.toFixed(4).replace('.', ',') 
                : rate?.toFixed(4).replace('.', ',')}
            </span>
          </div>
        )}
      </div>

      <p className="text-[9px] md:text-[10px] text-gray-400 font-bold truncate uppercase tracking-widest mt-1.5 md:mt-2 relative z-10 leading-none">
        Średni kurs NBP
      </p>
    </div>
  );
};

// ============================================================================
// GŁÓWNA SEKCJA GRID
// ============================================================================
export const CurrencyWidget = () => {
  return (
    <section className="w-full">
      {/* NAGŁÓWEK SEKCJI */}
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="p-2 md:p-2.5 bg-gray-100 rounded-xl shadow-sm border border-gray-200 text-gray-900">
          <Coins strokeWidth={2.5} className="w-5 h-5 md:w-5 md:h-5" />
        </div>
        <div>
          <h2 className="text-lg md:text-2xl font-black tracking-tighter leading-none text-gray-900">
            Rynek Walutowy
          </h2>
          <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 md:mt-1.5">
            Notowania w czasie rzeczywistym
          </p>
        </div>
      </div>
      {/* GRID: 2 kolumny na mobile, 3 kolumny na desktopie */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 w-full">
        <CurrencyTile code="eur" icon={Euro} color="text-blue-600" />
        <CurrencyTile code="usd" icon={DollarSign} color="text-emerald-600" />
        <CurrencyTile code="chf" icon={RefreshCw} color="text-rose-600" />
        <CurrencyTile code="gbp" icon={PoundSterling} color="text-purple-600" />
        <CurrencyTile code="jpy" icon={JapaneseYen} color="text-orange-600" />
        <CurrencyTile code="czk" icon={Banknote} color="text-teal-600" />
      </div>
    </section>
  );
};

export default CurrencyWidget;