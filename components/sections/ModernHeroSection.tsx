"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Star,
  CheckCircle2,
  TrendingUp,
  Globe2,
  Gauge,
  Calculator,
  Lock,
  ChevronRight,
  Clock,
  Layers,
} from "lucide-react";
import MultiStepLeadModal from "@/components/ui/MultiStepLeadModal";

interface ModernHeroSectionProps {
  country?: string;
}

export default function ModernHeroSection({ country = "" }: ModernHeroSectionProps) {
  const [emailInput, setEmailInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [monthlyTraffic, setMonthlyTraffic] = useState(15000);
  const [currentConversion, setCurrentConversion] = useState(1.5);
  const [targetConversion, setTargetConversion] = useState(4.2);

  // Dynamic ROI calculation
  const currentLeads = Math.round((monthlyTraffic * currentConversion) / 100);
  const targetLeads = Math.round((monthlyTraffic * targetConversion) / 100);
  const netLeadIncrease = targetLeads - currentLeads;

  const handleLeadCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <section className="relative pt-28 lg:pt-36 pb-20 overflow-hidden bg-[#0B0A14] text-white border-b border-[#1E1B33] select-none">
      {/* Background Gradients & Glow Orbs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* LEFT COLUMN: Main Hero Copy & Ultra-Lean Form */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-7">
          
          {/* Feature Badges with Glowing Borders */}
          <div className="flex flex-wrap items-center gap-2.5">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17132B] border border-violet-500/40 text-violet-300 text-xs font-semibold shadow-[0_0_15px_rgba(124,58,237,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-spin" style={{ animationDuration: "6s" }} />
              <span>Custom Tech Stack</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17132B] border border-indigo-500/40 text-indigo-300 text-xs font-semibold shadow-[0_0_15px_rgba(99,102,241,0.2)]"
            >
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              <span>Enterprise SEO</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17132B] border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sub-second Load Times</span>
            </motion.div>
          </div>

          {/* Outcome-Driven Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
          >
            High-Performance Websites & SEO Engineered to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-300">
              Scale Your Business Globally.
            </span>
          </motion.h1>

          {/* Sub-headline: 18px, 1.6 line-height */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 leading-[1.6] max-w-2xl font-normal"
          >
            JoyDigital engineers bespoke Next.js web systems and enterprise search architectures built for sub-second speeds, maximum conversion rates, and high organic pipeline growth.
          </motion.p>

          {/* Ultra-Lean 2-Field Capture Form (Zero Cognitive Friction) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-xl"
          >
            <form onSubmit={handleLeadCaptureSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#131024] border border-[#2B2446] focus:border-violet-500 text-sm text-white placeholder:text-slate-500 rounded-xl px-4 py-4 outline-none focus:ring-4 focus:ring-violet-500/20 transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group whitespace-nowrap"
              >
                <span>Book a 15-Min Growth Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
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

          {/* Secondary CTA & Calculator Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            <Link
              href="#case-studies"
              className="px-6 py-3 rounded-xl bg-[#141026] hover:bg-[#1D1838] border border-[#2B2446] hover:border-violet-500/40 text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 group"
            >
              <span>Explore Case Studies</span>
              <ChevronRight className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => {
                const target = document.getElementById("roi-calculator-section");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-xl bg-transparent hover:bg-[#141026] text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 border border-transparent hover:border-[#2B2446]"
            >
              <Calculator className="w-4 h-4 text-indigo-400" />
              <span>Calculate Your ROI</span>
            </button>
          </motion.div>

          {/* Above-the-Fold Social Proof & Global Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-4 border-t border-[#1C1733] w-full max-w-xl space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Star Rating & Clutch/Trustpilot Badge */}
              <div className="flex items-center gap-3">
                {/* Mini Client Avatar Cluster */}
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0B0A14] bg-violet-700 text-[10px] font-bold flex items-center justify-center">
                    GM
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0B0A14] bg-indigo-600 text-[10px] font-bold flex items-center justify-center">
                    C
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0B0A14] bg-purple-600 text-[10px] font-bold flex items-center justify-center">
                    RK
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0B0A14] bg-emerald-600 text-[10px] font-bold flex items-center justify-center">
                    +40
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Rated <span className="font-bold text-white">4.9/5</span> on Clutch & Trustpilot
                  </p>
                </div>
              </div>

              {/* Polished Global Trust Note */}
              <div className="flex items-center gap-2 bg-[#141026] px-3 py-1.5 rounded-lg border border-[#251E3D] text-[11px] text-violet-300 font-medium">
                <Globe2 className="w-3.5 h-3.5 text-violet-400" />
                <span>Global Delivery Hub | 100% US & Europe Time-Zone Synchronized</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive SaaS Product Mockup & Live Metric Cards */}
        <div className="lg:col-span-5 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md bg-[#110E21] border border-[#2B2446] rounded-3xl p-6 shadow-2xl shadow-violet-950/40 relative overflow-hidden space-y-6"
          >
            {/* Top Glass Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#201A38]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-bold text-slate-400 ml-2">Engineered Performance Dashboard</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-mono border border-emerald-500/20">
                LIVE ROI
              </span>
            </div>

            {/* Metric 1: 99/100 Core Web Vitals Lighthouse Gauge */}
            <div className="bg-[#18132E] border border-[#2B2446] p-4 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-200">Google Lighthouse Score</span>
                </div>
                <p className="text-[11px] text-slate-400">Sub-second pre-rendered TTFB (0.24s)</p>
              </div>

              <div className="relative w-14 h-14 rounded-full border-4 border-emerald-500/30 flex items-center justify-center bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <span className="text-lg font-black text-emerald-400">99</span>
              </div>
            </div>

            {/* Metric 2: +240% Lead Growth Card */}
            <div className="bg-[#18132E] border border-[#2B2446] p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Organic Lead Conversion Lift</span>
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  +240% Growth
                </span>
              </div>

              {/* Visual mini bar graph */}
              <div className="h-16 flex items-end gap-2 pt-2 border-b border-[#251E3D] pb-2">
                <div className="flex-1 bg-slate-700/40 rounded-t-md h-30% flex items-end justify-center">
                  <span className="text-[9px] text-slate-400 mb-1">Q1</span>
                </div>
                <div className="flex-1 bg-slate-700/40 rounded-t-md h-45% flex items-end justify-center">
                  <span className="text-[9px] text-slate-400 mb-1">Q2</span>
                </div>
                <div className="flex-1 bg-violet-600/60 rounded-t-md h-65% flex items-end justify-center">
                  <span className="text-[9px] text-violet-200 mb-1">Q3</span>
                </div>
                <div className="flex-1 bg-gradient-to-t from-violet-600 to-emerald-400 rounded-t-md h-100% flex items-end justify-center shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                  <span className="text-[9px] font-bold text-white mb-1">Q4</span>
                </div>
              </div>
            </div>

            {/* Interactive ROI Calculator Preview */}
            <div id="roi-calculator-section" className="bg-[#18132E] border border-[#2B2446] p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <Calculator className="w-4 h-4 text-violet-400" />
                  <span>Interactive ROI Estimator</span>
                </div>
                <span className="text-[10px] text-violet-300 font-medium">Drag Traffic</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Monthly Visitors:</span>
                  <span className="font-bold text-white">{monthlyTraffic.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="100000"
                  step="1000"
                  value={monthlyTraffic}
                  onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                  className="w-full accent-violet-500 h-1.5 bg-[#251E3D] rounded-lg cursor-pointer"
                />

                <div className="pt-2 flex items-center justify-between text-xs border-t border-[#251E3D]">
                  <span className="text-slate-400">Est. Additional Monthly Leads:</span>
                  <span className="font-extrabold text-emerald-400 text-sm">+{netLeadIncrease} leads/mo</span>
                </div>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="text-center pt-1">
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-violet-400" />
                <span>Bespoke Engineering • 100% Code Ownership</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Multi-Step Modal */}
      <MultiStepLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialEmail={emailInput}
      />
    </section>
  );
}
