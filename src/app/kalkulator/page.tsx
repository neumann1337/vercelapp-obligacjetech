"use client";

import React from 'react';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { CalculatorForm } from '@/components/features/calculator/CalculatorForm';
import { ResultDisplay } from '@/components/features/calculator/ResultDisplay';
import { TimelineTable } from '@/components/features/calculator/TimelineTable';
import { useCalculator } from '@/hooks/useCalculator';
import { formatPLN } from '@/utils/formatters';

export default function KalkulatorPage() {
  const {
    amount, setAmount,
    selectedSymbol, setSelectedSymbol,
    bondsList,
    results,
    loading,
    error,
    loadingBonds,
    selectedBondInfo,
    handleCalculate
  } = useCalculator();

  return (
    <div className="min-h-screen pb-20 bg-[#F5F5F7] text-[#1D1D1F] font-sans">
      <nav className="sticky top-0 z-50 flex justify-center p-5 bg-white/80 backdrop-blur-[20px] border-b border-black/5">
        <div className="w-full max-w-[980px] flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 text-[#1D1D1F] text-sm font-medium no-underline hover:opacity-70">
                <ArrowLeft size={18} /> Powrót
            </a>
            <span className="flex items-center gap-2 text-xl font-semibold">
                <TrendingUp size={20} className="text-[#0071E3]" /> Kalkulator
            </span>
            <div className="w-[60px]"></div> 
        </div>
      </nav>

      <div className="max-w-[800px] mx-auto my-10 px-5">
        <div className="text-center mb-10">
          <h1 className="text-[2.5rem] font-bold tracking-tight mb-2">Symulacja zysków</h1>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[30px] shadow-sm">
          <CalculatorForm 
            amount={amount}
            setAmount={setAmount}
            selectedSymbol={selectedSymbol}
            setSelectedSymbol={setSelectedSymbol}
            bondsList={bondsList}
            selectedBondInfo={selectedBondInfo}
            loading={loading}
            loadingBonds={loadingBonds}
            error={error}
            handleCalculate={handleCalculate}
          />
        </div>

        {results && (
          <>
            <ResultDisplay results={results} amount={amount} formatPLN={formatPLN} />
            <TimelineTable timeline={results.timeline} amount={amount} formatPLN={formatPLN as any} />
          </>
        )}
      </div>
    </div>
  );
}