"use client";

import React, { useState } from 'react';
import { TrendingUp, Clock, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import bondsData from '@/data/bonds.json';

interface RawBondData {
    symbol: string;
    name: string;
    firstYearInterestRate: number;
    inflationMargin: number | null;
    capitalization: boolean;
    periodYears: number;
}

interface BondDisplay {
    symbol: string;
    name: string;
    type: string;
    interest: string;
    duration: string;
    desc: string;
    color: string;
    features: string[];
}

const transformBondData = (raw: RawBondData): BondDisplay => {
    const { symbol, name: apiName, firstYearInterestRate, periodYears } = raw;
    const prefix = symbol.substring(0, 3);

    let name = apiName || "Obligacja Skarbowa";
    let type = "";
    let color = "from-gray-500 to-gray-700";
    let desc = "";
    let features: string[] = [];
    
    const rate = firstYearInterestRate || 0;
    const interestStr = `${rate.toFixed(2).replace('.', ',')}%`;

    let durationStr = periodYears === 0 ? "3 miesiące" : `${periodYears} lat`;
    if (periodYears === 1) durationStr = "1 rok";
    if (periodYears === 2 || periodYears === 3 || periodYears === 4) durationStr = `${periodYears} lata`;
    if (periodYears >= 5) durationStr = `${periodYears} lat`;

    switch (prefix) {
        case "OTS":
            type = "Stałe oprocentowanie";
            color = "from-blue-500 to-blue-700";
            desc = "Krótkoterminowa lokata kapitału. Oprocentowanie zbliżone do lokat.";
            features = ["Stały zysk", "Bardzo krótki termin", "Zysk wypłacany na koniec"];
            break;
        case "ROR":
            type = "Zmienne (Stopa Ref.)";
            color = "from-pink-500 to-rose-600";
            desc = "Oprocentowanie podąża za stopą referencyjną NBP.";
            features = ["Oprocentowanie wyższe niż na lokacie", "Aktualizacja co miesiąc", "Wypłata odsetek co miesiąc"];
            break;
        case "DOR":
            type = "Stałe oprocentowanie";
            color = "from-emerald-500 to-emerald-700";
            desc = "Bezpieczna przystań na średni termin. Stała stopa zwrotu niezależnie od rynków.";
            features = ["Stałe oprocentowanie", "Chronią przed spadkiem stóp", "Kapitalizacja roczna"];
            break;
        case "TOS":
            type = "Zmienne (WIBOR 6M)";
            color = "from-violet-500 to-violet-700";
            desc = "Oprocentowanie oparte o stawkę WIBOR. Zyski rosną, gdy rosną stopy procentowe.";
            features = ["Zmienne co 6 miesięcy", "Wypłata odsetek co pół roku", "Podążają za rynkiem"];
            break;
        case "COI":
            type = "Indeksowane inflacją";
            color = "from-orange-500 to-orange-700";
            desc = "Ubezpieczenie ponad inflację. W pierwszym roku stały zysk, potem: inflacja + marża.";
            features = ["Ochrona siły nabywczej", "Wypłata odsetek co roku", "Bezpieczne na 4 lata"];
            break;
        case "EDO":
            type = "Indeksowane + Proc. Składany";
            color = "from-indigo-600 to-purple-600";
            desc = "Najpotężniejsze narzędzie długoterminowe. Odsetki są dopisywane do kapitału (procent składany).";
            features = ["Magia procentu składanego", "Najwyższa marża", "Wypłata na koniec"];
            break;
        default:
            desc = "Obligacja skarbowa.";
    }

    return {
        symbol, name, type, interest: interestStr, duration: durationStr, desc, color, features
    };
};

export default function BondDetails() {
    const bondsToDisplay = bondsData.map(transformBondData);

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex justify-center">
                <div className="w-full max-w-5xl flex justify-between items-center">
                <a href="/" className="flex items-center gap-2 text-gray-900 font-semibold no-underline">
                    <TrendingUp size={20} className="text-blue-600" />
                    <span>Obligacje.tech</span>
                </a>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 pt-16">
                <header className="text-center max-w-3xl mx-auto mb-20">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
                    Aktualna Oferta <br /> Skarbu Państwa
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed">
                    Wybierz instrument dopasowany do Twoich celów. 
                    Dane są zawsze aktualne na bieżący miesiąc.
                </p>
                </header>

                <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-24">
                {bondsToDisplay.map((bond) => (
                    <BondCard key={bond.symbol} bond={bond} />
                ))}
                </section>

                <section className="max-w-3xl mx-auto bg-white rounded-[32px] p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                    <ShieldCheck size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Warto wiedzieć</h2>
                </div>

                <div className="space-y-1">
                    <FaqItem 
                    question="Czy oprocentowanie jest stałe?" 
                    answer="Dla obligacji OTS i DOR - tak. Dla pozostałych (ROR, TOS, COI, EDO) podane oprocentowanie dotyczy tylko pierwszego okresu odsetkowego." 
                    />
                </div>
                </section>
            </main>
        </div>
    );
}

function BondCard({ bond }: { bond: BondDisplay }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-3xl p-1 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${bond.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative bg-white rounded-[22px] p-8 h-full flex flex-col z-10">
        <div className="flex justify-between items-start mb-6">
          <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${bond.color} bg-clip-text text-transparent border border-gray-100 px-2 py-1 rounded-md`}>
            {bond.symbol}
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
            <Clock size={12} /> {bond.duration}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{bond.name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">{bond.interest}</span>
          </div>
          <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wide">{bond.type}</p>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow border-t border-gray-50 pt-4">
          {bond.desc}
        </p>

        <ul className="space-y-3 mb-8">
          {bond.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-xs text-gray-600 font-medium">
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${bond.color} mr-3 flex-shrink-0`} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className={`text-base font-medium transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-900 group-hover:text-gray-600'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-500 leading-relaxed text-sm">
          {answer}
        </p>
      </div>
    </div>
  );
}