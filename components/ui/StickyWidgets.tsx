"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyWidgets() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Sticky Mobile Banner (Bottom-pinned for conversions, hidden on desktop) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-lg px-6 py-3 z-40 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">Limited Offer</span>
          <span className="text-[13px] font-bold text-primary-dark">Free SEO & Design Audit</span>
        </div>
        <Link
          href="/#audit-section"
          onClick={() => {
            const tracker = (window as any).trackJoyDigitalEvent;
            if (typeof tracker === "function") {
              tracker("cta_click", { button_text: "Claim Audit", location: "sticky mobile banner" });
            }
          }}
          className="bg-accent text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-sm hover:bg-accent-dark transition-all duration-300"
        >
          Claim Audit
        </Link>
      </div>

      {/* Floating WhatsApp Tooltip Message */}
      {showTooltip && (
        <div className="fixed bottom-[88px] lg:bottom-[40px] right-24 bg-white border border-gray-100 p-3.5 rounded-2xl shadow-xl text-left w-44 z-40 animate-fade-in flex flex-col gap-0.5 pointer-events-auto">
          <button 
            onClick={() => setShowTooltip(false)} 
            className="absolute top-2.5 right-2.5 text-text-muted hover:text-primary-dark text-[10px] cursor-pointer"
            aria-label="Close message"
          >
            <i className="fa-solid fa-xmark" />
          </button>
          <span className="text-[9px] font-bold text-accent uppercase tracking-wider">Need help?</span>
          <span className="text-[11px] font-bold text-primary-dark leading-tight">Chat with an SEO Expert</span>
          {/* Arrow pointing to WhatsApp button */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-r border-t border-gray-100/80 rotate-45" />
        </div>
      )}

      {/* Floating Call Button */}
      <a
        href="tel:+919080026133"
        onClick={() => {
          const tracker = (window as any).trackJoyDigitalEvent;
          if (typeof tracker === "function") {
            tracker("call_click", { location: "floating button" });
          }
        }}
        className="fixed bottom-36 lg:bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-all duration-300 z-40"
        aria-label="Call Us Now"
        title="Call Us Now"
        data-call-location="floating button"
      >
        <span className="absolute top-0 left-0 w-full h-full bg-primary rounded-full -z-1 opacity-70 animate-pulse-ring"></span>
        <i className="fa-solid fa-phone relative z-10" />
      </a>

      {/* Floating WhatsApp Pulse Button */}
      <a
        href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I'd%20like%20to%20get%20a%20free%20consultation%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          const tracker = (window as any).trackJoyDigitalEvent;
          if (typeof tracker === "function") {
            tracker("whatsapp_click", { location: "floating button" });
          }
        }}
        className={`fixed bottom-20 lg:bottom-8 right-6 w-14 h-14 bg-whatsapp-green text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:scale-110 hover:rotate-[5deg] transition-all duration-300 z-40 group`}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        data-wa-location="floating button"
      >
        <span className="absolute top-0 left-0 w-full h-full bg-whatsapp-green rounded-full -z-1 opacity-70 animate-pulse-ring"></span>
        <i className="fa-brands fa-whatsapp relative z-10" />
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-md whitespace-nowrap hidden lg:block border border-slate-800">
          Chat with Joy Digital
        </span>
      </a>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-52 lg:bottom-40 right-8 w-10 h-10 bg-primary-dark text-white rounded-full flex items-center justify-center text-sm shadow-md hover:bg-accent transition-all duration-300 z-40 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-arrow-up" />
      </button>
    </>
  );
}
