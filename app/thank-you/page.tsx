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
  const service = searchParams.get("service") || "Web Services";

  const handleWaClick = () => {
    if (typeof window !== "undefined") {
      const tracker = (window as any).trackJoyDigitalEvent;
      if (typeof tracker === "function") {
        tracker("whatsapp_click", { location: "thank_you_page" });
      }
    }
  };

  const waText = name
    ? `Hello Joy Digital, I am ${name}. I just submitted an enquiry for ${service} on your website and wanted to connect right away!`
    : `Hello Joy Digital, I just submitted a lead form on your website and wanted to connect right away.`;

  const waUrl = `https://wa.me/919080026133?text=${encodeURIComponent(waText)}`;

  return (
    <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
      {/* Circular Success Badge with dynamic pulsing rings */}
      <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
        <span className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping opacity-75" />
        <div className="w-20 h-20 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-600 text-4xl shadow-sm relative z-10">
          <i className="fa-solid fa-circle-check" />
        </div>
      </div>

      <span className="inline-block bg-emerald-500/10 text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-500/20 mb-4 animate-pulse">
        Inquiry Received Successfully
      </span>

      <h1 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-3 leading-tight">
        {name ? `Thank you, ${name}!` : "Thank you!"}
      </h1>
      
      <p className="text-sm md:text-base text-[#64748B] max-w-xl mx-auto mb-8 leading-relaxed font-semibold">
        {name
          ? `We received your request regarding ${service}. Our team will review your requirements and reach out shortly.`
          : "Our team will review your website and contact you shortly."}
      </p>

      {/* HIGHLIGHTED WHATSAPP DIRECT CONNECT CARD */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 shadow-xl mb-10 text-white text-center flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
          <i className="fa-brands fa-whatsapp text-white" /> Instant WhatsApp Response
        </div>
        <h2 className="text-lg font-black leading-snug">Want an Instant Quote or Direct Discussion?</h2>
        <p className="text-xs text-emerald-100 max-w-md font-medium">
          Skip the wait! Tap below to open a direct WhatsApp chat with our lead strategist (+91 9080026133).
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWaClick}
          className="mt-2 bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
        >
          <i className="fa-brands fa-whatsapp text-xl text-[#25D366]" />
          <span>Connect Instantly on WhatsApp</span>
        </a>
      </div>

      {/* Interactive expectation card / timeline layout */}
      <div className="bg-white border border-[#E2E8F0] p-8 rounded-[24px] shadow-sm text-left max-w-lg mx-auto mb-10">
        <h2 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
          <i className="fa-solid fa-map-signs text-[#2563EB]" /> What Happens Next?
        </h2>
        <div className="flex flex-col gap-6 text-xs text-[#64748B] font-semibold">
          <div className="flex items-start gap-4">
            <span className="w-6 h-6 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] flex items-center justify-center shrink-0 font-bold">
              1
            </span>
            <div>
              <h3 className="text-xs font-bold text-[#0F172A] mb-1">Requirement Analysis</h3>
              <p className="leading-relaxed">We review your selected service, budget range, and timeline to draft a custom proposal.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="w-6 h-6 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] flex items-center justify-center shrink-0 font-bold">
              2
            </span>
            <div>
              <h3 className="text-xs font-bold text-[#0F172A] mb-1">Discovery Call / Chat</h3>
              <p className="leading-relaxed">We reach out via Email or WhatsApp (+91 9080026133) to schedule a quick 15-minute consultation.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="w-6 h-6 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] flex items-center justify-center shrink-0 font-bold">
              3
            </span>
            <div>
              <h3 className="text-xs font-bold text-[#0F172A] mb-1">Proposal & Scope Presentation</h3>
              <p className="leading-relaxed">We deliver a customized project scope with milestones and launching schedules.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#0F172A] font-bold text-xs px-8 py-3.5 rounded-xl shadow-sm hover:-translate-y-0.5 transition-all duration-300"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="bg-[#F8FAFC] min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

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
