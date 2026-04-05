"use client"

import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionProps {
  title: string;
  content: string[];
}

export const Accordion = ({ title, content }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <article className="mb-4 rounded-3xl overflow-hidden shadow-sm border border-transparent transition-all duration-300 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex justify-between items-center p-6 text-left transition-colors duration-300
          ${isOpen 
            ? 'bg-white text-gray-900' 
            : 'bg-gradient-to-r from-blue-600 to-teal-500 text-white'
          }
        `}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-bold pr-4 leading-snug">{title}</h3>
        <ChevronDown 
          className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          size={24} 
        />
      </button>
      
      <div
        ref={contentRef}
        className="bg-white text-gray-600 transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="p-6 pt-2 leading-relaxed border-t border-gray-100">
          {content.map((paragraph, index) => (
            <p key={index} className="mb-3 last:mb-0 text-sm md:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Accordion;