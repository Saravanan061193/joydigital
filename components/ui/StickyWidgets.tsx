"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyWidgets() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();
    return () => window.removeEventListener("scroll", toggleVisibility);
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
          href="/contact?type=audit"
          className="bg-accent text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-sm hover:bg-accent-dark transition-all duration-300"
        >
          Claim Audit
        </Link>
      </div>

      {/* Floating WhatsApp Pulse Button */}
      <a
        href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I'd%20like%20to%20get%20a%20free%20consultation%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-20 lg:bottom-8 right-6 w-14 h-14 bg-whatsapp-green text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:scale-110 hover:rotate-[5deg] transition-all duration-300 z-40 group`}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="absolute top-0 left-0 w-full h-full bg-whatsapp-green rounded-full -z-1 opacity-70 animate-pulse-ring"></span>
        <i className="fa-brands fa-whatsapp relative z-10" />
      </a>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-36 lg:bottom-24 right-8 w-10 h-10 bg-primary-dark text-white rounded-full flex items-center justify-center text-sm shadow-md hover:bg-accent transition-all duration-300 z-40 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-arrow-up" />
      </button>
    </>
  );
}
