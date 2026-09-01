"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  PhoneCall,
  Zap,
  ArrowUp,
  X,
  Sparkles,
  ChevronUp,
} from "lucide-react";

export default function UnifiedFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Floating Action Menu Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-72 bg-[#0F0C1E] border border-[#2B2446] p-4 rounded-2xl shadow-2xl backdrop-blur-xl text-white space-y-2 relative"
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#201A38]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-slate-200">Engineer Sync Active</span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold bg-[#1C1733] px-2 py-0.5 rounded-full border border-[#2D264F]">
                US & EU Sync
              </span>
            </div>

            {/* Quick Actions */}
            <div className="space-y-1.5 pt-1">
              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I'd%20like%20to%20discuss%20a%20high-performance%20website%20%26%20SEO%20strategy."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#16122B] hover:bg-emerald-600/15 border border-[#251E3D] hover:border-emerald-500/40 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-emerald-300">WhatsApp Chat</p>
                    <p className="text-[10px] text-slate-400">Sub-minute response</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">Live</span>
              </a>

              {/* Call Direct */}
              <a
                href="tel:+919080026133"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#16122B] hover:bg-violet-600/15 border border-[#251E3D] hover:border-violet-500/40 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-violet-300">Direct Call</p>
                    <p className="text-[10px] text-slate-400">+91 90800 26133</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">Voice</span>
              </a>

              {/* Free Audit */}
              <Link
                href="/free-website-audit"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#16122B] hover:bg-amber-600/15 border border-[#251E3D] hover:border-amber-500/40 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-amber-300">Get Free Audit</p>
                    <p className="text-[10px] text-slate-400">Instant score breakdown</p>
                  </div>
                </div>
                <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-1 rounded-md">Free</span>
              </Link>

              {/* Scroll to top inside menu if scrolled */}
              {showScrollTop && (
                <button
                  onClick={handleScrollTop}
                  className="w-full mt-1 flex items-center justify-center gap-1.5 p-2 rounded-xl bg-[#1D1738] hover:bg-[#28214D] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" /> Back to Top
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Single Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-2xl shadow-violet-600/40 border border-violet-400/30 cursor-pointer"
        aria-label="Contact & Quick Actions"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
        </span>

        {isOpen ? (
          <div className="flex items-center gap-1.5">
            <X className="w-4 h-4" />
            <span>Close</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Growth Sync</span>
            <ChevronUp className="w-3.5 h-3.5 text-violet-200" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
