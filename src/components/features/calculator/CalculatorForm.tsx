"use client";

import React from 'react';
import { Wallet, PieChart, Percent, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { Bond } from '@/types/calculator';

interface CalculatorFormProps {
  amount: number | '';
  setAmount: (v: number | '') => void;
  selectedSymbol: string;
  setSelectedSymbol: (s: string) => void;
  bondsList: Bond[];
  selectedBondInfo?: Bond;
  loading: boolean;
  loadingBonds: boolean;
  error: string | null;
  handleCalculate: (e: React.FormEvent) => void;
}

export const CalculatorForm = ({
  amount, setAmount, selectedSymbol, setSelectedSymbol,
  bondsList, selectedBondInfo, loading,
  loadingBonds, error, handleCalculate
}: CalculatorFormProps) => {

  if (loadingBonds) {
    return (
      <div className="p-10 text-center text-[#86868b] flex flex-col items-center">
        <Loader2 className="animate-spin mb-3 text-[#0071E3]" />
        Pobieranie oferty obligacji z API...
      </div>
    );
  }

  return (
    <form onSubmit={handleCalculate}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Kwota inwestycji (PLN)</label>
          <div className="relative group">
            <Wallet size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b] group-focus-within:text-[#0071E3] transition-colors" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="1000"
              className="w-full bg-[#F5F5F7] rounded-2xl py-4 pl-12 pr-4 text-lg font-semibold outline-none focus:ring-4 focus:ring-[#0071E3]/10 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Rodzaj Obligacji</label>
          <div className="relative group">
            <PieChart size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b] group-focus-within:text-[#0071E3] transition-colors" />
            <select
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="w-full bg-[#F5F5F7] rounded-2xl py-4 pl-12 pr-4 text-lg font-semibold outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-[#0071E3]/10 transition-all"
            >
              {bondsList.map(o => (
                <option key={o.symbol} value={o.symbol}>{o.symbol}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedBondInfo && (
        <div className="mt-6 p-5 rounded-2xl bg-[#F5F5F7] flex flex-wrap gap-5 justify-between items-center text-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <Percent size={18} className="text-[#0071E3]" />
            <span>Oprocentowanie: <strong className="text-gray-900">{selectedBondInfo.firstYearInterestRate}%</strong></span>
          </div>
          <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#0071E3]" />
              <span> Zapadalność: <strong className="text-gray-900">
                    {selectedBondInfo.periodYears === 0 ? "3 miesiące" : selectedBondInfo.periodYears === 1
                      ? "1 rok" : selectedBondInfo.periodYears <= 4
                        ? `${selectedBondInfo.periodYears} lata`
                          : `${selectedBondInfo.periodYears} lat`}
              </strong></span>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full py-4 bg-[#0071E3] text-white rounded-2xl text-lg font-semibold shadow-lg shadow-blue-500/30 hover:bg-[#0066cc] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex items-center justify-center gap-2"
      >
        {loading ? <><Loader2 className="animate-spin" size={20}/> Obliczam...</> : 'Oblicz potencjalny zysk'}
      </button>

      {error && (
        <div className="bg-[#FFF2F2] border border-[#FFD6D6] rounded-2xl p-4 mt-5 flex items-center gap-3 text-[#D32F2F] animate-[shake_0.5s_ease-in-out]">
            <AlertCircle size={24} className="min-w-[24px]" />
            <p className="m-0 text-sm font-medium">{error}</p>
        </div>
      )}
    </form>
  );
};