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
  Calculator,
  ChevronRight,
  Filter,
  Calendar,
  CheckSquare,
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
    <section className="relative pt-24 lg:pt-32 pb-16 overflow-hidden bg-[#0D0B18] text-white border-b border-[#231C3D] select-none">
      {/* Background Gradients & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
        
        {/* LEFT COLUMN: Main Hero Copy & Conversion */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18132E] border border-[#2D244E] text-[#A78BFA] text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Custom Tech Stack</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18132E] border border-[#2D244E] text-[#A78BFA] text-xs font-semibold"
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Enterprise SEO</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18132E] border border-[#2D244E] text-[#A78BFA] text-xs font-semibold"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sub-second Load Times</span>
            </motion.div>
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
          >
            High-Performance Websites & SEO Engineered to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
              Scale Your Business Globally.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal"
          >
            JoyDigital engineers bespoke Next.js web systems and enterprise search architectures built for sub-second speeds, maximum conversion rates, and high organic pipeline growth.
          </motion.p>

          {/* Lead Capture Bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
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
                  className="w-full bg-[#18142A] border border-[#2B2346] focus:border-[#7C3AED] text-sm text-white placeholder:text-slate-500 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#7C3AED]/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap group"
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <Link
              href="#case-studies"
              className="px-5 py-2.5 rounded-xl bg-[#17122B] hover:bg-[#20193B] border border-[#2B2346] hover:border-[#7C3AED]/40 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 group"
            >
              <span>Explore Case Studies</span>
              <ChevronRight className="w-4 h-4 text-[#A78BFA] group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#17122B] hover:bg-[#20193B] border border-[#2B2346] hover:border-[#7C3AED]/40 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-[#A78BFA]" />
              <span>Calculate Your ROI</span>
            </button>
          </motion.div>

          {/* Clean Trust / Value Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="pt-5 border-t border-[#231C3D] w-full max-w-xl space-y-3"
          >
            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                  Trusted by Businesses Worldwide:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {["USA", "UK", "Canada", "Australia", "UAE", "India", "South Africa", "Germany", "+20 countries"].map((c, i) => (
                    <span key={i} className="bg-[#17122B] border border-[#251E3E] px-2 py-0.5 rounded text-[11px] font-medium text-slate-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-slate-400 text-[11px]">
                <span className="font-semibold text-slate-300">Delivering Results Across:</span>
                <span className="text-[#A78BFA] font-medium">Web Design</span>
                <span className="text-slate-600">•</span>
                <span className="text-[#A78BFA] font-medium">SEO</span>
                <span className="text-slate-600">•</span>
                <span className="text-[#A78BFA] font-medium">E-commerce</span>
                <span className="text-slate-600">•</span>
                <span className="text-[#A78BFA] font-medium">Digital Growth</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Google Search Console Performance Dashboard Mockup (Matching User Image) */}
        <div className="lg:col-span-5 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md bg-[#130E26]/90 border border-[#271F42] rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl space-y-3.5 text-white"
          >
            {/* GSC Title Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[#211A38]">
              <h3 className="text-sm font-bold text-white tracking-wide">Performance</h3>
              <span className="text-[10px] text-slate-400">Last updated: 5 hours ago</span>
            </div>

            {/* GSC Filter Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B1436] border border-[#2E2452] text-slate-200 font-medium">
                <span>Search type: Web</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B1436] border border-[#2E2452] text-slate-200 font-medium">
                <span>Date: Last 3 months</span>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-[#1B1436] border border-[#2E2452] text-slate-400 font-medium cursor-pointer hover:text-white">
                + NEW
              </div>
            </div>

            {/* GSC 4 Metric Cards (Matching Colored Blocks from User Image) */}
            <div className="grid grid-cols-2 gap-2 text-white">
              {/* Total Clicks (Blue) */}
              <div className="bg-[#1565C0] p-3 rounded-lg flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 font-semibold">
                    <CheckSquare className="w-3 h-3" /> Total clicks
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-xl font-extrabold">55</span>
                </div>
              </div>

              {/* Total Impressions (Purple) */}
              <div className="bg-[#6A1B9A] p-3 rounded-lg flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 font-semibold">
                    <CheckSquare className="w-3 h-3" /> Total impressions
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-xl font-extrabold">6.71K</span>
                </div>
              </div>

              {/* Average CTR (Green) */}
              <div className="bg-[#00796B] p-3 rounded-lg flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 font-semibold">
                    <CheckSquare className="w-3 h-3" /> Average CTR
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-xl font-extrabold">0.8%</span>
                </div>
              </div>

              {/* Average Position (Orange) */}
              <div className="bg-[#D84315] p-3 rounded-lg flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 font-semibold">
                    <CheckSquare className="w-3 h-3" /> Average position
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-xl font-extrabold">51.8</span>
                </div>
              </div>
            </div>

            {/* GSC Multi-Line Performance Chart (Matching User Image curves) */}
            <div className="bg-[#181232]/80 border border-[#271F42] rounded-xl p-3 space-y-2">
              <div className="w-full h-28 relative">
                <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="400" y2="30" stroke="#251C42" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="400" y2="60" stroke="#251C42" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="400" y2="90" stroke="#251C42" strokeWidth="1" strokeDasharray="3 3" />

                  {/* 1. Orange Curve (Position / Rank) */}
                  <path
                    d="M 10 70 L 30 100 L 50 65 L 70 85 L 90 40 L 110 95 L 130 80 L 150 65 L 170 75 L 190 70 L 210 65 L 230 75 L 250 80 L 270 50 L 290 60 L 310 55 L 330 45 L 350 55 L 370 40 L 390 30"
                    fill="none"
                    stroke="#FF7043"
                    strokeWidth="2"
                  />

                  {/* 2. Green Curve (CTR) */}
                  <path
                    d="M 10 110 L 40 110 L 60 105 L 80 75 L 100 100 L 120 105 L 140 55 L 160 105 L 180 110 L 200 95 L 220 100 L 240 70 L 260 90 L 280 65 L 300 95 L 320 85 L 340 90 L 360 80 L 390 75"
                    fill="none"
                    stroke="#26A69A"
                    strokeWidth="2"
                  />

                  {/* 3. Purple Curve (Impressions) */}
                  <path
                    d="M 10 115 L 50 110 L 90 105 L 130 95 L 170 90 L 210 70 L 250 65 L 290 30 L 310 55 L 330 45 L 350 60 L 370 35 L 390 20"
                    fill="none"
                    stroke="#AB47BC"
                    strokeWidth="2"
                  />

                  {/* 4. Blue Curve (Clicks) */}
                  <path
                    d="M 10 118 L 60 115 L 100 110 L 140 100 L 180 95 L 220 85 L 260 75 L 300 70 L 320 50 L 340 75 L 360 55 L 380 40 L 395 15"
                    fill="none"
                    stroke="#42A5F5"
                    strokeWidth="2.5"
                  />
                </svg>

                {/* X-Axis Date Ticks */}
                <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                  <span>4/2/21</span>
                  <span>4/13/21</span>
                  <span>4/24/21</span>
                  <span>5/5/21</span>
                  <span>5/16/21</span>
                  <span>5/27/21</span>
                </div>
              </div>
            </div>

            {/* GSC Bottom Tabs */}
            <div className="flex items-center justify-between border-t border-[#211A38] pt-2 text-[10px] text-slate-400 font-semibold overflow-x-auto">
              <span className="text-[#A78BFA] border-b-2 border-[#A78BFA] pb-1 cursor-pointer">QUERIES</span>
              <span className="hover:text-white cursor-pointer pb-1">PAGES</span>
              <span className="hover:text-white cursor-pointer pb-1">COUNTRIES</span>
              <span className="hover:text-white cursor-pointer pb-1">DEVICES</span>
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
