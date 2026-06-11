"use client";

import React from "react";
import Link from "next/link";

interface StrongCTAProps {
  location: string;
}

export default function StrongCTA({ location }: StrongCTAProps) {
  return (
    <section className="relative py-20 bg-[#0f172a] border border-white/10 overflow-hidden rounded-3xl mx-6 lg:mx-12 my-12 shadow-2xl">
      {/* Visual background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
        <span className="inline-block bg-[#d4af37]/15 text-[#d4af37] font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#d4af37]/20 mb-6">
          Grow Fast, Scale Smart
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 leading-tight text-white animate-fade-in">
          Ready to Grow Your Business Online?
        </h2>
        <p className="text-sm md:text-base text-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          Get a professional website and SEO strategy tailored to your business goals. Speak with our team today.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          {/* WhatsApp Button - Emerald Green Pill */}
          <a
            href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I'd%20like%20to%20discuss%20growing%20my%20business%20online."
            target="_blank"
            rel="noopener noreferrer"
            data-wa-location={location}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-8 py-4 rounded-full shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i className="fa-brands fa-whatsapp text-base" />
            WhatsApp Now
          </a>
          
          {/* Consultation Button - Luxury Gold Accent Pill */}
          <Link
            href="/contact"
            data-ga-event="free_consultation_click"
            data-ga-location={location}
            className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#f4d068] text-primary-dark font-extrabold text-xs px-8 py-4 rounded-full shadow-lg hover:shadow-[#d4af37]/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 border border-[#d4af37]/20"
          >
            <i className="fa-solid fa-calendar-check text-xs" />
            Book Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
