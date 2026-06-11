"use client";

import React from "react";
import Link from "next/link";

interface StrongCTAProps {
  location: string;
}

export default function StrongCTA({ location }: StrongCTAProps) {
  return (
    <section className="relative py-12 lg:py-16 bg-gradient-to-br from-primary-dark via-[#0B1528] to-dark text-white overflow-hidden rounded-3xl mx-6 lg:mx-12 my-8 shadow-lg border border-white/5">
      {/* Visual background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
        <span className="inline-block bg-accent-glow text-accent-light font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full border border-accent/20 mb-5">
          Grow Fast, Scale Smart
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 leading-tight">
          Ready to Grow Your Business Online?
        </h2>
        <p className="text-xs md:text-sm text-text-muted max-w-xl mx-auto mb-8 leading-relaxed">
          Get a professional website and SEO strategy tailored to your business goals. Speak with our team today.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I'd%20like%20to%20discuss%20growing%20my%20business%20online."
            target="_blank"
            rel="noopener noreferrer"
            data-wa-location={location}
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs px-6 py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i className="fa-brands fa-whatsapp text-base" />
            WhatsApp Now
          </a>
          
          {/* Consultation Button */}
          <Link
            href="/contact"
            data-ga-event="free_consultation_click"
            data-ga-location={location}
            className="w-full sm:w-auto bg-gradient-to-r from-accent to-accent-light text-white font-bold text-xs px-6 py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 border border-accent/20"
          >
            <i className="fa-solid fa-calendar-check text-xs" />
            Book Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
