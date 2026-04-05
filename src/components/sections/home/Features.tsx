"use client";

import React from 'react';
import { Calculator, BookOpen, MessageCircle } from 'lucide-react';
import { FeatureCard } from '@/components/ui/FeatureCard';

export const Features = () => {
  return (
    <section className="px-6 pb-24 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Kalkulator Zysków"
          desc="Symulacja zysków z matematyczną precyzją. Oblicz realny wzrost kapitału z uwzględnieniem podatku Belki."
          icon={<Calculator size={24} className="text-blue-600" />}
          href="/kalkulator"
          delay={0.1}
        />

        <FeatureCard
          title="Oferta Obligacji"
          desc="Aktualny przegląd instrumentów Skarbu Państwa. Porównaj zyski z EDO, COI i inne serie w jednym miejscu."
          icon={<BookOpen size={24} className="text-emerald-500" />}
          href="/obligacje"
          delay={0.2}
        />

        <FeatureCard
          title="Analiza Rynku"
          desc="Aktualne ceny, prognozy inflacji i zmiany w ofertach. Bądź na bieżąco z tym, co dzieje się z pieniądzem."
          icon={<MessageCircle size={24} className="text-purple-600" />}
          href="/rynek"
          delay={0.3}
        />
      </div>
    </section>
  );
};