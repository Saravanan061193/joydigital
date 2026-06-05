"use client";

import React, { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className={`bg-white border ${
              isOpen ? "border-accent bg-accent/5" : "border-gray-100 hover:border-gray-200"
            } rounded-xl shadow-sm transition-all duration-300 overflow-hidden`}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left py-5 px-6 sm:px-8 flex justify-between items-center gap-4 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-bold text-sm sm:text-base text-primary-dark select-none">
                {item.question}
              </span>
              <span
                className={`text-xs text-text-muted transition-transform duration-300 ${
                  isOpen ? "text-accent rotate-180" : ""
                }`}
              >
                <i className="fa-solid fa-chevron-down" />
              </span>
            </button>
            
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden`}
              style={{
                maxHeight: isOpen ? "300px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="px-6 sm:px-8 pb-5 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-gray-100/50 pt-4">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
