"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const service = searchParams.get("service") || "Web Design & Development";

  const handleWaClick = () => {
    if (typeof window !== "undefined") {
      const tracker = (window as any).trackJoyDigitalEvent;
      if (typeof tracker === "function") {
        tracker("whatsapp_click", { location: "thank_you_page" });
      }
    }
  };

  const waText = name
    ? `Hi Joy Digital team! I am ${name}. I just submitted an inquiry for ${service} on your website. Can we discuss next steps?`
    : `Hi Joy Digital team! I just submitted an inquiry on your website and would like to get a fast quote.`;

  const waUrl = `https://wa.me/919080026133?text=${encodeURIComponent(waText)}`;

  return (
    <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
      {/* 1. Animated Success Icon */}
      <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        <span className="absolute inset-0 bg-emerald-500/15 rounded-full animate-ping opacity-75" />
        <span className="absolute -inset-2 bg-emerald-500/10 rounded-full animate-pulse" />
        <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.3)] flex items-center justify-center text-white text-3xl relative z-10">
          <i className="fa-solid fa-check" />
        </div>
      </div>

      {/* 2. Badge & Main Title */}
      <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-extrabold text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-900/40 mb-4 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Inquiry Successfully Logged
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3 leading-tight">
        {name ? `Thank You, ${name}!` : "Thank You!"}
      </h1>

      <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed font-semibold">
        {name
          ? `We received your request for ${service}. Our senior lead strategist has been notified and will prepare a customized proposal for you.`
          : "Our team will review your requirements and reach out shortly with a tailored project scope."}
      </p>

      {/* 3. EXECUTIVE WHATSAPP INSTANT ACTION CARD */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#0f766e] text-white rounded-3xl p-8 shadow-2xl mb-10 text-left border border-emerald-500/30">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-200 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-400/30">
              <i className="fa-brands fa-whatsapp text-emerald-300 text-xs" />
              <span>⚡ Average Response Time &lt; 5 Mins</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Need an Instant Quote or Proposal?
            </h2>
            <p className="text-xs text-emerald-100/90 font-medium max-w-md leading-relaxed">
              Skip email waiting times! Tap below to open a direct 1-on-1 WhatsApp consultation with our lead strategist (<span className="font-bold text-white">+91 9080026133</span>).
            </p>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWaClick}
            className="shrink-0 bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold text-xs px-7 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer border border-emerald-200"
          >
            <i className="fa-brands fa-whatsapp text-2xl text-[#25D366]" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Fast Track</span>
              <span className="text-xs font-black text-emerald-950">Chat Instantly on WhatsApp →</span>
            </div>
          </a>
        </div>
      </div>

      {/* 4. STRUCTURED CONFIRMATION TICKET & ROADMAP */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left mb-10">
        {/* Ticket Summary Card (5 cols) */}
        <div className="md:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <span>Summary Ticket</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Verified
              </span>
            </h3>
            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Submitted For</span>
                <span className="font-extrabold text-slate-900">{name || "Valued Client"}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Service Requested</span>
                <span className="font-extrabold text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5 border border-blue-100">
                  {service}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Guaranteed Response</span>
                <span className="font-bold text-slate-700">Within 15 - 30 Minutes</span>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-4 text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
            <i className="fa-solid fa-lock text-slate-400" /> 100% Confidential & Secure
          </div>
        </div>

        {/* Next Steps Roadmap (7 cols) */}
        <div className="md:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i className="fa-solid fa-route text-blue-600" /> What Happens Next?
          </h3>
          <div className="space-y-4 text-xs font-semibold">
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 font-extrabold text-xs">
                1
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900">Requirement Review</h4>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                  Our technical leads analyze your goals, competitors, and scope specs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0 font-extrabold text-xs">
                2
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900">Custom Audit & Proposal</h4>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                  We prepare a transparent pricing structure, timeline, and strategy roadmap.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 font-extrabold text-xs">
                3
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900">Direct Consultation Call</h4>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                  We schedule a brief 15-minute call to align on project execution & launch date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Executive Action Links */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-extrabold text-xs px-6 py-3 rounded-xl shadow-xs hover:-translate-y-0.5 transition-all duration-300"
        >
          Return to Homepage
        </Link>
        <Link
          href="/portfolio"
          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-extrabold text-xs px-6 py-3 rounded-xl shadow-xs hover:-translate-y-0.5 transition-all duration-300"
        >
          View Case Studies & Portfolio
        </Link>
        <Link
          href="/free-tools"
          className="bg-primary/10 hover:bg-primary/20 text-primary font-extrabold text-xs px-6 py-3 rounded-xl border border-primary/20 transition-all duration-300"
        >
          Explore Free SEO Tools
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouClient() {
  return (
    <>
      <Header />
      <main className="bg-[#FAF9FF] min-h-screen pt-32 pb-24 flex items-center justify-center relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/5 via-accent/5 to-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <Suspense fallback={
          <div className="text-center py-20 text-xs font-bold text-slate-400">Loading confirmation...</div>
        }>
          <ThankYouContent />
        </Suspense>
      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
