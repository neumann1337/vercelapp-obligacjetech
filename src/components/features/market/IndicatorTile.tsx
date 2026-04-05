"use client";

import React from 'react';
import { TrendingUp, Percent, HelpCircle } from 'lucide-react';

interface IndicatorTileProps {
  label?: string;
  value?: number;
  loading?: boolean;
  desc?: string;
  color?: string;
}

export const IndicatorTile = ({ 
  label = "Wskaźnik", 
  value = 0, 
  loading = false, 
  desc = "Brak opisu", 
  color = "text-gray-900" 
}: IndicatorTileProps) => {
  const isInflation = label?.toLowerCase().includes("inflacja") ?? false;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex justify-between items-start relative z-10">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
          {label}
        </p>
        {isInflation ? (
          <TrendingUp size={16} className={`${color} opacity-50 group-hover:opacity-100 transition-opacity`} />
        ) : (
          <Percent size={16} className="text-gray-200 group-hover:text-blue-200 transition-colors" />
        )}
      </div>

      <div className={`text-2xl font-black tracking-tighter relative z-10 ${color}`}>
        {loading ? (
          <div className="h-8 w-16 bg-gray-100 rounded-lg animate-pulse" />
        ) : (
          <div className="flex items-baseline gap-0.5">
            {(value ?? 0).toFixed(2).replace('.', ',')}
            <span className="text-sm font-bold opacity-60 ml-0.5">%</span>
          </div>
        )}
      </div>

      <p className="text-[10px] text-gray-400 font-bold truncate relative z-10 uppercase tracking-tighter">
        {desc}
      </p>
    </div>
  );
};

export default IndicatorTile;