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
      const totalMonths = Math.round(years * 12);

      const generatedTimeline = [];
      generatedTimeline.push({ 
        month: 0, 
        totalValue: Number(amount), 
        accumulatedProfit: 0,
        periodProfit: 0
      });

      const prefix = bond.symbol.substring(0, 3);
      let stepMonths = 12; 
      let isCapitalizing = false;

      // ZASADY ZGODNIE Z OFICJALNĄ TABELĄ SKARBU PAŃSTWA
      if (prefix === 'OTS') { 
        stepMonths = 3; 
        isCapitalizing = false; 
      } else if (prefix === 'ROR' || prefix === 'DOR') { 
        stepMonths = 1; 
        isCapitalizing = false; 
      } else if (prefix === 'TOS' || prefix === 'EDO') { 
        stepMonths = 12; 
        isCapitalizing = true; 
      } else if (prefix === 'COI') { 
        stepMonths = 12; 
        isCapitalizing = false; 
      }

      let currentBaseCapital = Number(amount);
      let accumulatedGross = 0;
      let accumulatedNet = 0;

      for (let m = stepMonths; m <= totalMonths; m += stepMonths) {
        let periodGross = 0;
        let periodNet = 0;

        if (isCapitalizing) {
          // PROCENT SKŁADANY (TOS, EDO) - odsetki powiększają kapitał
          periodGross = currentBaseCapital * rate * (stepMonths / 12);
          currentBaseCapital += periodGross;
          accumulatedGross += periodGross;
          
          const currentRealNet = accumulatedGross * 0.81;
          periodNet = currentRealNet - accumulatedNet;
          accumulatedNet = currentRealNet;
        } else {
          // ZWYKŁA WYPŁATA (OTS, ROR, DOR, COI) - kapitał bazowy bez zmian
          periodGross = Number(amount) * rate * (stepMonths / 12);
          periodNet = periodGross * 0.81;
          accumulatedNet += periodNet;
        }

        generatedTimeline.push({
          month: m,
          totalValue: Number(amount) + accumulatedNet,
          accumulatedProfit: accumulatedNet,
          periodProfit: periodNet
        });
      }

      setResults({
        daily: accumulatedNet / (years * 365),
        weekly: accumulatedNet / (years * 52),
        monthly: accumulatedNet / totalMonths,
        yearly: accumulatedNet / years,
        total: accumulatedNet,
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