"use client";

import React from "react";
import { Globe2, ShieldCheck, Sparkles, CheckCircle } from "lucide-react";

const CLIENT_LOGOS = [
  { name: "Ganesan Associates", category: "Financial & Insurance", location: "Global / IN" },
  { name: "Apex Global Logistics", category: "Supply Chain", location: "US Market" },
  { name: "Chithra Advisory", category: "Insurance Tech", location: "IN / Asia" },
  { name: "Vanguard Health", category: "Healthcare SaaS", location: "UK Enterprise" },
  { name: "Nexus Digital Studio", category: "B2B SaaS", location: "Australia" },
  { name: "Oasis Commerce", category: "Headless E-commerce", location: "UAE / Gulf" },
  { name: "Rajesh Retail Group", category: "E-Commerce", location: "India / Global" },
  { name: "Summit Cloud", category: "Enterprise Infrastructure", location: "US Enterprise" },
];

export default function ClientLogoMarquee() {
  return (
    <section className="w-full bg-[#080710] border-y border-[#1E1B33] py-8 relative overflow-hidden select-none">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-indigo-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-400 uppercase">
          Trusted by fast-growing startups and enterprises across the <span className="text-white font-bold">US, UK, UAE & Australia</span>
        </p>
      </div>

      {/* Infinite Scrolling Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-8 sm:gap-12 animate-marquee whitespace-nowrap py-2">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[#120F24] border border-[#231F3D] hover:border-violet-500/40 hover:bg-[#191533] transition-all group shrink-0"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-violet-400 group-hover:bg-violet-300 group-hover:scale-125 transition-all shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                  {logo.name}
                </span>
                <span className="text-[10px] text-slate-500 font-medium ml-2 border-l border-slate-700 pl-2">
                  {logo.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Localized keyframe animation fallback inline */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
