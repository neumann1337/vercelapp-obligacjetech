import { useState } from 'react';
import { CalculationResult } from '@/types/calculator';
// Importujemy dane bezpośrednio z pliku JSON!
import bondsData from '@/data/Bonds.json';

export const useCalculator = () => {
  const [amount, setAmount] = useState<number | ''>(1000);
  // Domyślnie ustawiamy pierwszy symbol z pliku JSON
  const [selectedSymbol, setSelectedSymbol] = useState<string>(
    bondsData.length > 0 ? bondsData[0].symbol : ''
  );
  const [results, setResults] = useState<CalculationResult | null>(null); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ponieważ dane mamy natychmiast z JSONa, loadingBonds zawsze będzie false
  const [loadingBonds, setLoadingBonds] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!amount || Number(amount) <= 0) return setError('Podaj poprawną kwotę.');
    
    const bond = bondsData.find(b => b.symbol === selectedSymbol);
    if (!bond) return setError('Nie znaleziono obligacji.');

    setLoading(true);

    // SYMULACJA OBLICZEŃ (Przeniesiona z backendu na frontend)
    setTimeout(() => {
      const rate = bond.firstYearInterestRate / 100;
      const years = bond.periodYears || 0.25; // dla OTS (3 miesiące)
      
      // Prosta matematyka lokaty + podatek Belki (19%)
      const grossProfit = Number(amount) * rate * years;
      const netProfit = grossProfit * 0.81; 

      // W przyszłości możesz tu rozbudować algorytm dla procentu składanego (EDO/COI)
      setResults({
        daily: netProfit / (years * 365),
        weekly: netProfit / (years * 52),
        monthly: netProfit / (years * 12),
        yearly: netProfit / years,
        total: netProfit,
        duration: `${years} lat`,
        timeline: [
          { 
            month: years * 12, 
            totalValue: Number(amount) + netProfit, 
            accumulatedProfit: netProfit 
          }
        ]
      });
      setLoading(false);
    }, 400);
  };

  const selectedBondInfo = bondsData.find(b => b.symbol === selectedSymbol);

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