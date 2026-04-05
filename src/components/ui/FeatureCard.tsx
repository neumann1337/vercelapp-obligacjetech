"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface FeatureCardProps {
  title?: string;
  desc?: string;
  icon?: React.ReactNode;
  href?: string;
  delay?: number;
}
export const FeatureCard = ({ 
  title = "Brak tytułu", 
  desc = "Brak opisu komponentu.", 
  icon = <HelpCircle size={24} />, 
  href = "#", 
  delay = 0 
}: FeatureCardProps) => {
  return (
    <a href={href} className="block no-underline h-full group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ 
          delay: delay, 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="h-full p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="mb-8 bg-gray-50 w-fit p-4 rounded-2xl border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
            {icon}
          </div>
          
          <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-sm text-gray-500 leading-relaxed font-medium">
            {desc}
          </p>
        </div>
        
        <div className="mt-10 flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300">
          Sprawdź narzędzie <ArrowRight size={18} strokeWidth={3} />
        </div>
      </motion.div>
    </a>
  );
};