"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';

export const FAQ_DATA = [
  {
    id: 'bezpieczenstwo',
    title: 'Czy obligacje są bezpieczne?',
    content: [
      'Tak. To najbezpieczniejszy instrument finansowy w Polsce, bo gwarantuje je Skarb Państwa.',
      'Żebyś stracił pieniądze, państwo musiałoby zbankrutować — a to skrajnie mało prawdopodobne.'
    ]
  },
  {
    id: 'sprzedaz',
    title: 'Czy mogę sprzedać obligacje przed terminem?',
    content: [
      'Tak. Większość obligacji można wykupić wcześniej.',
      'Jedyna „kara" to opłata: np. 70 groszy od obligacji COI/EDO. To koszt wcześniejszego wyjścia, ale dalej wychodzisz na plus, jeśli trzymałeś je dłużej niż parę miesięcy.'
    ]
  },
  {
    id: 'podatek',
    title: 'Kiedy płacę podatek Belki?',
    content: [
      'Zawsze, gdy otrzymujesz odsetki — 19% od zysku.',
      'Wyjątek: EDO i COI. Tam odsetki są reinwestowane, więc płacisz podatek dopiero na końcu, co działa na Twoją korzyść dzięki procentowi składanemu.'
    ]
  },
  {
    id: 'inflacja_marza',
    title: 'Jak działa „inflacja + marża" w COI i EDO?',
    content: [
      'W kolejnych latach oprocentowanie = inflacja z GUS za poprzedni rok + stała marża (np. 1%).',
      'Jeśli inflacja wynosi 4%, a marża 1%, to dostajesz 5% oprocentowania w danym roku.',
      'Mechanizm utrzymuje realną wartość kapitału i chroni przed spadkiem siły nabywczej.'
    ]
  },
  {
    id: 'coi_vs_edo',
    title: 'COI czy EDO — które wybrać?',
    content: [
      'COI – 4 lata, dobre jeśli nie chcesz zamrażać kapitału na długi termin.',
      'EDO – 10 lat, najwyższe realne zyski, pełna moc procentu składanego, idealne „emerytalne oszczędzanie".',
      'Najczęściej stosuje się miks — część COI na średni okres, część EDO na długi termin.'
    ]
  },
  {
    id: 'odsetki',
    title: 'Czy obligacje wypłacają odsetki co roku?',
    content: [
      'To zależy od rodzaju:',
      '- OTS, ROR, DOR — wypłacają odsetki na bieżąco.',
      '- COI i EDO — odsetki są dopisywane do kapitału (kapitalizacja), więc nie dostajesz gotówki, ale kapitał rośnie szybciej.'
    ]
  },
  {
    id: 'czy_moge_stracic',
    title: 'Czy mogę stracić na obligacjach?',
    content: [
      'Przy trzymaniu do terminu wykupu — praktycznie nie.',
      'Jedynym realnym ryzykiem jest wcześniejsze wyjście z obligacji w bardzo krótkim czasie, gdzie opłata za wykup może zjeść część zysku.',
      'Długoterminowo obligacje indeksowane inflacją (COI, EDO) są projektowane tak, by nie tracić realnej wartości.'
    ]
  },
  {
    id: 'jak_liczy_sie_zysk',
    title: 'Jak oblicza się zysk z obligacji?',
    content: [
      'Zysk to suma odsetek (po opodatkowaniu) minus ewentualne opłaty za wcześniejszy wykup.',
      'W obligacjach z kapitalizacją (COI, EDO) odsetki są dopisywane do kapitału, więc każde kolejne oprocentowanie działa na większą kwotę — to działa jak turbo dla procentu składanego.'
    ]
  },
  {
    id: 'najlepsze_na_start',
    title: 'Które obligacje są najlepsze dla początkującego?',
    content: [
      'Najczęściej poleca się COI i EDO, bo chronią przed inflacją.',
      'Jeśli boisz się długich terminów, część kapitału można dać w OTS lub ROR jako „płynny bufor".',
      'Najważniejsze jest rozłożenie kapitału, a nie trafienie w jeden „najlepszy" produkt.'
    ]
  },
  {
    id: 'czy_moge_pol_na_pol',
    title: 'Czy mogę kupić obligacje i sprzedać po połowie czasu?',
    content: [
      'Tak — w każdej chwili możesz je wykupić.',
      'W połowie okresu po prostu zapłacisz opłatę za wcześniejszy wykup, ale reszta odsetek zostaje u Ciebie.',
      'To daje elastyczność, jeśli coś się zmieni w Twoim życiu.'
    ]
  },
{
  id: 'minimalna-kwota',
  title: 'Jaka jest minimalna kwota inwestycji w obligacje?',
  content: [
    'Minimalna kwota to 100 zł — tyle kosztuje jedna obligacja.',
    'Możesz kupić dowolną liczbę obligacji, więc łatwo zacząć nawet z małym kapitałem.'
  ]
},
{
  id: 'jak-kupic',
  title: 'Jak kupić obligacje skarbowe?',
  content: [
    'Możesz kupić je online przez stronę obligacjeskarbowe.pl, w banku PKO BP lub przez infolinię.',
    'Proces jest prosty i zajmuje kilka minut — potrzebujesz tylko konta i danych osobowych.'
  ]
},
{
  id: 'czy-warto',
  title: 'Czy warto inwestować w obligacje w 2026?',
  content: [
    'Obligacje to jedna z najbezpieczniejszych form inwestowania.',
    'Szczególnie COI i EDO chronią kapitał przed inflacją, więc są dobrą opcją na długoterminowe oszczędzanie.'
  ]
},
{
  id: 'oplaty',
  title: 'Jakie są opłaty przy obligacjach?',
  content: [
    'Zakup obligacji jest darmowy.',
    'Opłata pojawia się tylko przy wcześniejszym wykupie (np. 0,70 zł lub 2 zł za obligację w zależności od typu).'
  ]
},
{
  id: 'dziedziczenie',
  title: 'Czy obligacje można odziedziczyć?',
  content: [
    'Tak, obligacje podlegają dziedziczeniu.',
    'Możesz też wskazać osobę uposażoną, która otrzyma środki bez postępowania spadkowego.'
  ]
},
{
  id: 'inflacja-spada',
  title: 'Co jeśli inflacja spadnie?',
  content: [
    'W obligacjach COI i EDO oprocentowanie w kolejnych latach spadnie razem z inflacją.',
    'Zawsze jednak masz zagwarantowaną marżę ponad inflację.'
  ]
},
{
  id: 'czy-trzeba-konto',
  title: 'Czy potrzebuję konta bankowego?',
  content: [
    'Tak, potrzebujesz konta do zakupu i wypłaty środków.',
    'Najczęściej używane jest konto w PKO BP lub Inteligo, ale możesz wskazać inne.'
  ]
},
{
  id: 'oprocentowanie-zmienne',
  title: 'Czy oprocentowanie obligacji może się zmienić?',
  content: [
    'Tak — w obligacjach indeksowanych inflacją zmienia się co roku.',
    'W pierwszym roku masz stałe oprocentowanie, a potem zależy ono od inflacji + marży.'
  ]
},
{
  id: 'bezpieczenstwo-panstwo',
  title: 'Kto gwarantuje obligacje skarbowe?',
  content: [
    'Obligacje skarbowe są gwarantowane przez Skarb Państwa.',
    'Oznacza to bardzo wysoki poziom bezpieczeństwa w porównaniu do innych inwestycji.'
  ]
},
{
  id: 'roznica-lokata',
  title: 'Obligacje czy lokata — co lepsze?',
  content: [
    'Lokaty są prostsze, ale często przegrywają z inflacją.',
    'Obligacje (zwłaszcza COI i EDO) lepiej chronią wartość pieniędzy w czasie.'
  ]
}
];

export const FaqCards = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaq = searchQuery.trim() === ''
    ? FAQ_DATA
    : FAQ_DATA.filter(({ title, content }) => {
        const q = searchQuery.toLowerCase();
        return (
          title.toLowerCase().includes(q) ||
          content.some(line => line.toLowerCase().includes(q))
        );
      });

  return (
    <main className="max-w-3xl mx-auto px-5 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900">
          Wiedza w pigułce (FAQ)
        </h1>
        <p className="text-gray-500 text-lg">
          Kliknij w kafelek, aby poznać szczegóły inwestowania.
        </p>
      </header>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Szukaj w FAQ..."
        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition-colors mb-6"
      />

      <section className="space-y-2">
        {filteredFaq.length > 0 ? (
          filteredFaq.map((section) => (
            <Accordion key={section.id} title={section.title} content={section.content} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">Brak wyników dla "{searchQuery}"</p>
        )}
      </section>

      <div className="mt-20 text-center">
        <p className="text-gray-500 mb-6 text-sm font-medium">
          Masz już teorię? Przejdź do praktyki.
        </p>

        <a href="/kalkulator" className="inline-block group no-underline">
          <button className="
            flex items-center gap-3 px-8 py-4 rounded-2xl
            bg-gradient-to-r from-blue-600 to-teal-500
            text-white font-bold text-lg
            shadow-lg shadow-blue-500/20
            transition-all duration-300
            group-hover:scale-[1.02] group-hover:shadow-blue-500/40 active:scale-95
          ">
            Uruchom Kalkulator <ArrowRight size={20} />
          </button>
        </a>
      </div>
    </main>
  );
};