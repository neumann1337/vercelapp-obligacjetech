"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Calculator, BookOpen, MessageCircle, HelpCircle } from 'lucide-react';

export interface FeatureCardProps {
  title?: string;
  desc?: string;
  icon?: React.ReactNode;
  href?: string;
  delay?: number;
}

export const Hero = () => {
  return (
    <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 text-center max-w-4xl mx-auto relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center w-full"
      >
        <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-blue-50/50 border border-blue-100/50 text-blue-600 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-6 md:mb-8 shadow-sm backdrop-blur-sm">
          <ShieldCheck size={14} strokeWidth={3} /> Bezpieczeństwo Skarbu Państwa
        </div>
        <h1 className="flex flex-col items-center font-black tracking-tighter mb-6 text-gray-900 leading-[1.1] w-full" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-0">
            Wszystko o obligacjach.
          </span>
          <span 
            className="mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-500 tracking-tight drop-shadow-md text-[1.75rem] min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            OBLIGACJE<span className="text-teal-500">.</span>TECH
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-medium px-2 md:px-0">
          Bezpieczna przystań dla Twoich oszczędności. <br className="hidden md:inline"/>
          Symuluj zyski z matematyczną precyzją,{' '}
          <span className="text-gray-900 font-bold border-b-2 border-teal-500/30 pb-0.5 inline-block mt-1 sm:mt-0">
            chroń kapitał przed inflacją i buduj majątek na własnych zasadach.
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full max-w-sm sm:max-w-none mx-auto">
          <a href="/kalkulator" className="w-full sm:w-auto no-underline">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-blue-600 text-white rounded-2xl font-black text-sm md:text-base shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2"
            >
              Otwórz kalkulator <ArrowRight size={18} strokeWidth={2.5} />
            </motion.button>
          </a>
          <a href="/faq" className="w-full sm:w-auto no-underline">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-black text-sm md:text-base hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              Baza wiedzy
            </motion.button>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default function HomePagePreview() {
  return (
    <main className="min-h-screen bg-[#F5F5F7] font-sans antialiased overflow-x-hidden flex flex-col justify-start">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] sm:w-full max-w-3xl h-[300px] sm:h-[400px] bg-gradient-to-b from-blue-50/50 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <Hero />
    </main>
  );
}