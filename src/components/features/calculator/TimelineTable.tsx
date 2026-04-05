"use client";

import React from 'react';
import { TimelineItem } from '@/types/calculator';

interface TimelineTableProps {
  timeline: TimelineItem[];
  amount: number | ''; 
  formatPLN: (v: number) => string;
}

export const TimelineTable = ({ timeline, amount, formatPLN }: TimelineTableProps) => {
  return (
    <div className="mt-8 mx-auto overflow-hidden bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5">
      <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-[#1D1D1F]">Harmonogram wzrostu</h3>
      </div>
      
      <div className="w-full overflow-x-auto"> 
          <table className="w-full border-collapse min-w-[500px]">
              <thead>
                  <tr className="bg-[#F5F5F7] text-left text-[#86868b] text-xs uppercase tracking-wider">
                      <th className="py-3 px-4 font-semibold">Miesiąc</th>
                      <th className="py-3 px-4 font-semibold">Stan Konta</th>
                      <th className="py-3 px-4 font-semibold text-right">Zysk Netto</th>
                  </tr>
              </thead>
              <tbody className="text-sm">
                  <tr className="border-b border-gray-100 last:border-0">
                      <td className="py-3 px-4 text-gray-500">Start</td>
                      <td className="py-3 px-4 font-medium text-[#1D1D1F]">{formatPLN(Number(amount))}</td>
                      <td className="py-3 px-4 text-right text-gray-500">-</td>
                  </tr>
                  {timeline.map((item) => (
                      <tr key={item.month} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 px-4 text-[#1D1D1F]">{item.month}</td>
                          <td className="py-3 px-4 text-[#1D1D1F] font-medium break-words">{formatPLN(item.totalValue)}</td>
                          <td className="py-3 px-4 text-right text-[#34C759] font-semibold break-words">
                              +{formatPLN(item.accumulatedProfit)}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};