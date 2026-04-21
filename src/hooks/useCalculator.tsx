import { useState } from 'react';
import { CalculationResult } from '@/types/calculator';
import bondsData from '@/data/bonds.json';

export const useCalculator = () => {
  const [amount, setAmount] = useState<number | ''>(1000);
  const [selectedSymbol, setSelectedSymbol] = useState<string>(
    bondsData.length > 0 ? bondsData[0].symbol : ''
  );
  const [results, setResults] = useState<CalculationResult | null>(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingBonds, setLoadingBonds] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!amount || Number(amount) <= 0) return setError('Podaj poprawną kwotę.');
    
    const bond = bondsData.find((b: any) => b.symbol === selectedSymbol);
    if (!bond) return setError('Nie znaleziono obligacji.');

    setLoading(true);

    setTimeout(() => {
      const rate = bond.firstYearInterestRate / 100;
      const years = bond.periodYears || 0.25; 
      const grossProfit = Number(amount) * rate * years;
      const netProfit = grossProfit * 0.81; 

      const generatedTimeline = [];
      const totalMonths = Math.round(years * 12);
      
      generatedTimeline.push({ 
        month: 0, 
        totalValue: Number(amount), 
        accumulatedProfit: 0 
      });

      const prefix = bond.symbol.substring(0, 3);
      let stepMonths = 12; 

      if (prefix === 'OTS' || prefix === 'ROR' || prefix === 'DOR') {
        stepMonths = 1; 
      } else if (prefix === 'TOS') {
        stepMonths = 6; 
      }

      for (let m = stepMonths; m <= totalMonths; m += stepMonths) {
        const currentProfit = (netProfit / totalMonths) * m;
        
        generatedTimeline.push({
          month: m,
          totalValue: Number(amount) + currentProfit,
          accumulatedProfit: currentProfit
        });
      }

      setResults({
        daily: netProfit / (years * 365),
        weekly: netProfit / (years * 52),
        monthly: netProfit / (years * 12),
        yearly: netProfit / years,
        total: netProfit,
        duration: `${years} lat`,
        timeline: generatedTimeline 
      });
      
      setLoading(false);
    }, 400);
  };

  const selectedBondInfo = bondsData.find((b: any) => b.symbol === selectedSymbol);

  return {
    amount, setAmount,
    selectedSymbol, setSelectedSymbol,
    bondsList: bondsData,
    results,
    loading,
    error,
    loadingBonds,
    selectedBondInfo,
    handleCalculate
  };
};