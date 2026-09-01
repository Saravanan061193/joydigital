"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  TrendingUp,
  Globe,
  Gauge,
  Calculator,
  ChevronRight,
  BarChart3,
  Star,
  Activity,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import MultiStepLeadModal from "@/components/ui/MultiStepLeadModal";

interface ModernHeroSectionProps {
  country?: string;
}

export default function ModernHeroSection({ country = "" }: ModernHeroSectionProps) {
  const [emailInput, setEmailInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLeadCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <section className="relative pt-28 lg:pt-36 pb-20 overflow-hidden bg-[#0B121B] text-white border-b border-slate-800/60 select-none">
      {/* Subtle Technical Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Ambient Blue Radial Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
        
        {/* LEFT COLUMN: Copy & Conversion Architecture */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-7">
          
          {/* Top Pill Badges with Subtle Border Strokes & Tech Icons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-semibold shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: "6s" }} />
              <span>Custom Tech Stack</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-semibold shadow-sm"
            >
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              <span>Enterprise SEO</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-semibold shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sub-second Load Times</span>
            </motion.div>
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
          >
            High-Performance Websites & SEO Engineered to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300">
              Scale Your Business Globally.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl font-normal"
          >
            JoyDigital engineers bespoke Next.js web systems and enterprise search architectures built for sub-second speeds, maximum conversion rates, and high organic pipeline growth.
          </motion.p>

          {/* Ultra-Lean Lead Capture Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-xl space-y-3"
          >
            <form onSubmit={handleLeadCaptureSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-white text-slate-900 font-medium text-sm placeholder:text-slate-400 rounded-xl px-4 py-3.5 outline-none focus:ring-4 focus:ring-blue-500/30 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap group"
              >
                <span>Book a 15-Min Growth Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Micro-Trust Signals */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Commitment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>15-Min Specialist Discovery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Flat-Rate Proposal</span>
              </div>
            </div>
          </motion.div>

          {/* Secondary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            <Link
              href="#case-studies"
              className="px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 group"
            >
              <span>Explore Case Studies</span>
              <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-indigo-400" />
              <span>Calculate Your ROI</span>
            </button>
          </motion.div>

          {/* Bottom Global Trust Line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-4 border-t border-slate-800/80 w-full max-w-xl flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium"
          >
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Global Delivery Hub</span>
            </div>
            <span className="text-slate-600">•</span>
            <span>100% US/Europe Time-Zone Synchronized</span>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Clutch & Trustpilot Rated 4.9/5</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Authentic Performance Dashboard Mockup */}
        <div className="lg:col-span-5 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-2xl space-y-4"
          >
            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-semibold text-slate-400 ml-1">Live Performance Telemetry</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-mono border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            {/* Top Widget 1: Google Lighthouse Score */}
            <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-200">Google Lighthouse Speed Score</span>
                </div>
                {/* Circular Score Badge */}
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-lg font-black flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                  99
                </div>
              </div>

              {/* Core Web Vitals breakdown */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/60 text-[11px]">
                <div>
                  <p className="text-slate-400">LCP</p>
                  <p className="font-bold text-emerald-400">0.7s</p>
                  <div className="h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[95%]" />
                  </div>
                </div>
                <div>
                  <p className="text-slate-400">FCP</p>
                  <p className="font-bold text-emerald-400">0.0s</p>
                  <div className="h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[100%]" />
                  </div>
                </div>
                <div>
                  <p className="text-slate-400">TTFB</p>
                  <p className="font-bold text-emerald-400">110ms</p>
                  <div className="h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[98%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Widget 2: Organic Growth Chart */}
            <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-3">
              {/* Stat Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Organic Traffic</p>
                  <p className="font-extrabold text-white text-sm">
                    15,668 <span className="text-emerald-400 text-xs font-semibold">(+65.2%)</span>
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Conversions</p>
                  <p className="font-extrabold text-white text-sm">1,876</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-extrabold px-2 py-1 rounded-md">
                  +240% YoY
                </div>
              </div>

              {/* Glowing Electric Blue SVG Area/Line Chart */}
              <div className="relative pt-2">
                <svg viewBox="0 0 400 120" className="w-full h-24 overflow-visible">
                  <defs>
                    <linearGradient id="blueAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Filled Area */}
                  <path
                    d="M 0 100 C 60 90, 110 70, 160 55 C 210 40, 260 50, 310 20 C 350 8, 380 5, 400 2 L 400 120 L 0 120 Z"
                    fill="url(#blueAreaGradient)"
                  />

                  {/* Glowing Smooth Curve Line */}
                  <path
                    d="M 0 100 C 60 90, 110 70, 160 55 C 210 40, 260 50, 310 20 C 350 8, 380 5, 400 2"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    className="drop-shadow-[0_4px_10px_rgba(59,130,246,0.6)]"
                  />

                  {/* Active Endpoint Marker */}
                  <circle cx="400" cy="2" r="5" fill="#60A5FA" className="animate-ping" />
                  <circle cx="400" cy="2" r="4" fill="#2563EB" />
                </svg>
              </div>
            </div>

            {/* Bottom Widget 3: Conversion Rate Lift & Path */}
            <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-200">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span>Conversion Rate Optimization</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400">1.8% → 4.6%</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg space-y-1">
                  <p className="text-[10px] text-slate-400">Form Submissions</p>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white">125 → 425</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg space-y-1">
                  <p className="text-[10px] text-slate-400">Qualified Pipeline</p>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white">$45k → $180k</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

      </div>

      {/* Multi-Step Progressive Disclosure Modal */}
      <MultiStepLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialEmail={emailInput}
      />
    </section>
  );
}
