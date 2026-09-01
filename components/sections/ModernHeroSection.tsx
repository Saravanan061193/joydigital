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

        {/* RIGHT COLUMN: Realistic SaaS Analytics Dashboard */}
        <div className="lg:col-span-5 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md bg-[#130E26]/80 border border-[#271F42] rounded-2xl p-5 shadow-2xl backdrop-blur-xl space-y-4"
          >
            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#211A38]">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Website Performance</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Performance</span>
              </div>
            </div>

            {/* Top Section: Performance Score & Metrics Breakdown */}
            <div className="bg-[#191333]/70 border border-[#271F42] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-300">Overall Performance Score</p>
                  <p className="text-[11px] text-slate-400">Core Web Vitals Verified</p>
                </div>
                
                {/* Realistic Circular Progress Indicator */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle cx="24" cy="24" r="20" stroke="#2A2147" strokeWidth="4" fill="transparent" />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="#10B981"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray="125.6"
                      strokeDashoffset="7.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-sm font-black text-white">94</span>
                </div>
              </div>

              {/* Metrics Breakdown Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#231A3D] text-center">
                <div className="bg-[#140E2A] p-2 rounded-lg border border-[#251D40]">
                  <p className="text-[10px] text-slate-400">Page Speed</p>
                  <p className="text-xs font-bold text-emerald-400">94</p>
                </div>
                <div className="bg-[#140E2A] p-2 rounded-lg border border-[#251D40]">
                  <p className="text-[10px] text-slate-400">SEO Score</p>
                  <p className="text-xs font-bold text-emerald-400">96</p>
                </div>
                <div className="bg-[#140E2A] p-2 rounded-lg border border-[#251D40]">
                  <p className="text-[10px] text-slate-400">Accessibility</p>
                  <p className="text-xs font-bold text-emerald-400">92</p>
                </div>
              </div>
            </div>

            {/* Second Row: Organic Traffic & Leads Generated Charts */}
            <div className="grid grid-cols-2 gap-3">
              {/* Organic Traffic */}
              <div className="bg-[#191333]/70 border border-[#271F42] rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Organic Traffic</span>
                  <span className="text-[11px] font-bold text-emerald-400">+42%</span>
                </div>
                <p className="text-[10px] text-slate-400">Last 6 Months</p>

                {/* Subtle Realistic Line Chart */}
                <div className="h-10 w-full pt-1">
                  <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible">
                    <path
                      d="M0,32 Q20,28 40,24 T80,14 T120,4"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,32 Q20,28 40,24 T80,14 T120,4 L120,40 L0,40 Z"
                      fill="url(#purpleGradient)"
                      opacity="0.2"
                    />
                    <defs>
                      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Leads Generated */}
              <div className="bg-[#191333]/70 border border-[#271F42] rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Leads Generated</span>
                  <span className="text-[11px] font-bold text-emerald-400">+31%</span>
                </div>
                <p className="text-[10px] text-slate-400">Last 6 Months</p>

                {/* Subtle Realistic Line Chart */}
                <div className="h-10 w-full pt-1">
                  <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible">
                    <path
                      d="M0,30 Q30,26 60,18 T120,6"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,30 Q30,26 60,18 T120,6 L120,40 L0,40 Z"
                      fill="url(#violetGradient)"
                      opacity="0.2"
                    />
                    <defs>
                      <linearGradient id="violetGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Row: Conversion Rate & Qualified Leads */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-[#191333]/70 border border-[#271F42] rounded-xl p-3.5">
                <p className="text-[10px] font-medium text-slate-400">Conversion Rate</p>
                <p className="text-base font-extrabold text-white">3.6%</p>
                <p className="text-[9px] text-emerald-400 font-medium">+0.8% vs prev period</p>
              </div>

              <div className="bg-[#191333]/70 border border-[#271F42] rounded-xl p-3.5">
                <p className="text-[10px] font-medium text-slate-400">Qualified Leads</p>
                <p className="text-base font-extrabold text-white">128</p>
                <p className="text-[9px] text-slate-400 font-medium">Last 30 days</p>
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
