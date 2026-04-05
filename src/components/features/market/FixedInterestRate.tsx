"use client";

import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { IndicatorTile } from '@/components/features/market/IndicatorTile';
import { MACRO_INDICATORS } from '@/data/macro-indicators';


export const FixedInterestRate = () => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-gray-100 rounded-xl shadow-sm border border-gray-200 text-gray-900">
          <Activity size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tighter leading-none text-gray-900">
            Wskaźniki Makroekonomiczne
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">
            Stopy procentowe NBP i Inflacja (GUS)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
        <IndicatorTile 
          label="Stopa Ref." 
          value={MACRO_INDICATORS.reference} 
          loading={loading} 
          desc="Główna stopa NBP" 
          color="text-emerald-600" 
        />
        <IndicatorTile 
          label="Inflacja (CPI)" 
          value={MACRO_INDICATORS.inflation} 
          loading={loading} 
          desc="Wskaźnik GUS r/r" 
          color="text-rose-600" 
        />
        <IndicatorTile 
          label="Lombardowa" 
          value={MACRO_INDICATORS.lombard} 
          loading={loading} 
          desc="Max koszt kapitału" 
          color="text-gray-900" 
        />
        <IndicatorTile 
          label="Depozytowa" 
          value={MACRO_INDICATORS.deposit} 
          loading={loading} 
          desc="Dół korytarza NBP" 
          color="text-gray-400" 
        />
      </div>
    </section>
  );
};

export default FixedInterestRate;