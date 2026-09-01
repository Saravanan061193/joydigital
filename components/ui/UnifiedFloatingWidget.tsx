"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function UnifiedFloatingWidget() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto select-none">
      {/* Scroll to Top Button (if scrolled down) */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="w-10 h-10 rounded-full bg-[#1A1433] hover:bg-[#271E4A] border border-[#2B2348] text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Pure Original Floating WhatsApp Pulse Button */}
      <a
        href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I'd%20like%20to%20discuss%20a%20high-performance%20website%20%26%20SEO%20strategy."
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl shadow-emerald-600/40 transition-all hover:scale-110 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <i className="fa-brands fa-whatsapp text-2xl relative z-10" />

        {/* Hover Label Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#0F0C22] border border-[#2B2348] text-white text-xs font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
