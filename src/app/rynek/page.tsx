import React from 'react';
import { CurrencyWidget } from '@/components/features/market/CurrencyWidget';
import { GoldPriceWidget } from '@/components/features/market/GoldPriceWidget';
import { FixedInterestRate } from '@/components/features/market/FixedInterestRate';
import { ForecastsList } from '@/components/features/market/ForecastsList';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F5F7] px-3 py-6 md:p-8 max-w-5xl mx-auto space-y-8 md:space-y-12">
          <CurrencyWidget />
          <GoldPriceWidget />
          <FixedInterestRate />
          <ForecastsList />
    </main>
  );
}