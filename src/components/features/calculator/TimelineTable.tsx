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
    <div className="mt-8 mx-auto overflow-hidden bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5">
      <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-[#1D1D1F]">Harmonogram wzrostu</h3>
      </div>
      
      <div className="w-full overflow-x-auto"> 
          <table className="w-full border-collapse min-w-[500px]">
              <thead>
                  <tr className="bg-[#F5F5F7] text-left text-[#86868b] text-xs uppercase tracking-wider">
                      <th className="py-3 px-6 font-semibold">Miesiąc / Zdarzenie</th>
                      <th className="py-3 px-4 font-semibold">Stan Konta</th>
                      <th className="py-3 px-4 font-semibold text-right">Zysk Netto</th>
                  </tr>
              </thead>
              <tbody className="text-sm">
                  <tr className="border-b border-gray-100">
                      <td className="py-3 px-6">
                          <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                              <span className="font-medium text-gray-600">Start (Wpłata)</span>
                          </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#1D1D1F]">{formatPLN(Number(amount))}</td>
                      <td className="py-3 px-4 text-right text-gray-400">-</td>
                  </tr>
                  {filteredTimeline.map((item, index) => {
                      const isLast = index === filteredTimeline.length - 1;
                      
                      return (
                          <tr key={item.month} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                              <td className="py-3 px-6">
                                  <div className="flex items-center gap-3">
                                      {isLast ? (
                                          <div className="relative flex h-2.5 w-2.5">
                                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                                          </div>
                                      ) : (
                                          <div className="w-2 h-2 rounded-full bg-[#34C759]"></div>
                                      )}
                                      <span className={`${isLast ? 'font-bold text-purple-700' : 'text-[#1D1D1F]'}`}>
                                          {isLast ? `Wypłata (Miesiąc ${item.month})` : `Aktualizacja (Miesiąc ${item.month})`}
                                      </span>
                                  </div>
                              </td>
                              <td className="py-3 px-4 text-[#1D1D1F] font-medium break-words">
                                  {formatPLN(item.totalValue)}
                              </td>
                              <td className={`py-3 px-4 text-right font-semibold break-words ${isLast ? 'text-purple-600' : 'text-[#34C759]'}`}>
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