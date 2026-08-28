"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";

export default function ThankYouPage() {
  const handleWaClick = () => {
    if (typeof window !== "undefined") {
      const tracker = (window as any).trackJoyDigitalEvent;
      if (typeof tracker === "function") {
        tracker("whatsapp_click", { location: "thank_you_page" });
      }
    }
  };

  return (
    <>
      <Header />
      <main className="bg-[#F8FAFC] min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
        {/* Decorative background grids */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

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

          <h1 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-4 leading-tight">
            Thank you!
          </h1>
          
          <p className="text-sm md:text-base text-[#64748B] max-w-xl mx-auto mb-10 leading-relaxed font-semibold">
            Our team will review your website and contact you shortly.
          </p>

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
                  <p className="leading-relaxed">We review your target service page count, selected budget, and timeline to draft a custom roadmap.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] flex items-center justify-center shrink-0 font-bold">
                  2
                </span>
                <div>
                  <h3 className="text-xs font-bold text-[#0F172A] mb-1">Introduction & Discovery Call</h3>
                  <p className="leading-relaxed">We reach out via Email/WhatsApp to schedule a quick discovery call (typically 15-20 mins).</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] flex items-center justify-center shrink-0 font-bold">
                  3
                </span>
                <div>
                  <h3 className="text-xs font-bold text-[#0F172A] mb-1">Proposal & Scope Presentation</h3>
                  <p className="leading-relaxed">We present a customized proposal featuring clear pricing tiers, milestones, and launching timelines.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I%20just%20submitted%20a%20lead%20form%20on%20your%20website%20and%20wanted%20to%20connect%20right%20away."
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWaClick}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-8 py-4 rounded-xl shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <i className="fa-brands fa-whatsapp text-lg" />
              Chat With Us on WhatsApp
            </a>

            <Link
              href="/"
              className="bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#0F172A] font-bold text-xs px-8 py-4 rounded-xl shadow-sm hover:-translate-y-0.5 transition-all duration-300"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
