import React from 'react';
import { Euro } from 'lucide-react';
import { CurrencyWidget } from '@/components/features/market/CurrencyWidget';
import { GoldPriceWidget } from '@/components/features/market/GoldPriceWidget';
import { IndicatorTile } from '@/components/features/market/IndicatorTile';
import { ForecastsList } from '@/components/features/market/ForecastsList';
import { FixedInterestRate } from '@/components/features/market/FixedInterestRate';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F5F7] p-4 md:p-8 max-w-5xl mx-auto pt-8 space-y-12">
          <CurrencyWidget />
          <GoldPriceWidget />
          <FixedInterestRate />
          <ForecastsList />
    </main>
  );
}
