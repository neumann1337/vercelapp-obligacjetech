"use client";

import React from 'react';
import { TimelineItem } from '@/types/calculator';

interface TimelineTableProps {
  timeline: TimelineItem[];
  amount: number | ''; 
  formatPLN: (v: number) => string;
}

export const TimelineTable = ({ timeline, amount, formatPLN }: TimelineTableProps) => {
  const filteredTimeline = timeline.filter(item => item.month > 0);

  return (
    // Usunięty wrapper z overflow, tabela w 100% responsywna
    <div className="mt-8 mx-auto bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-100">
          <h3 className="text-lg md:text-xl font-semibold text-[#1D1D1F]">Harmonogram wzrostu</h3>
      </div>
      
      <div className="w-full"> 
          <table className="w-full border-collapse">
              <thead>
                  <tr className="bg-[#F5F5F7] text-[#86868b] text-[9px] md:text-xs uppercase tracking-wider">
                      <th className="py-3 px-3 md:px-6 text-left font-semibold">Miesiąc</th>
                      <th className="py-3 px-3 md:px-4 text-right font-semibold">Stan Konta</th>
                      <th className="py-3 px-3 md:px-4 text-right font-semibold">Zysk</th>
                  </tr>
              </thead>
              <tbody className="text-[11px] md:text-sm">
                  {/* Wiersz Startowy */}
                  <tr className="border-b border-gray-100">
                      <td className="py-3 px-3 md:px-6">
                          <div className="flex items-center gap-2 md:gap-3">
                              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-500 ring-2 md:ring-4 ring-blue-50 flex-shrink-0"></div>
                              <span className="font-medium text-gray-600 truncate">Start</span>
                          </div>
                      </td>
                      <td className="py-3 px-3 md:px-4 text-right font-medium text-[#1D1D1F]">{formatPLN(Number(amount))}</td>
                      <td className="py-3 px-3 md:px-4 text-right text-gray-400">-</td>
                  </tr>
                  
                  {/* Kolejne miesiące */}
                  {filteredTimeline.map((item, index) => {
                      const isLast = index === filteredTimeline.length - 1;
                      
                      return (
                          <tr key={item.month} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                              <td className="py-3 px-3 md:px-6">
                                  <div className="flex items-center gap-2 md:gap-3">
                                      {isLast ? (
                                          <div className="relative flex h-2 w-2 md:h-2.5 md:w-2.5 flex-shrink-0">
                                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                              <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-purple-500"></span>
                                          </div>
                                      ) : (
                                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#34C759] flex-shrink-0"></div>
                                      )}
                                      <span className={`${isLast ? 'font-bold text-purple-700' : 'text-[#1D1D1F]'} truncate`}>
                                          Msc. {item.month}
                                      </span>
                                  </div>
                              </td>
                              <td className="py-3 px-3 md:px-4 text-right text-[#1D1D1F] font-medium whitespace-nowrap">
                                  {formatPLN(item.totalValue)}
                              </td>
                              <td className={`py-3 px-3 md:px-4 text-right font-semibold whitespace-nowrap ${isLast ? 'text-purple-600' : 'text-[#34C759]'}`}>
                                  +{formatPLN(item.accumulatedProfit)}
                              </td>
                          </tr>
                      );
                  })}
              </tbody>
          </table>
      </div>
    </div>
  );
};