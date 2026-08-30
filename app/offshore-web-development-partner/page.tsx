import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import LeadForm from "@/components/ui/LeadForm";

export const metadata: Metadata = {
  title: "Offshore Web Development Partner for US & UK Agencies | Joy Digital",
  description: "Scale agency margins with a trusted white-label Next.js & React engineering team in India. We deliver high-speed web apps, custom SEO, and dedicated developer desks.",
  alternates: {
    canonical: "https://joydigital.in/offshore-web-development-partner",
  },
};

export default function OffshoreWebDevelopmentPartnerPage() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Offshore Web Development Partner",
    "serviceType": "White-Label Web Engineering & SEO Subcontracting",
    "provider": {
      "@type": "Organization",
      "name": "Joy Digital",
      "url": "https://joydigital.in"
    },
    "description": "White-label Next.js, React, and SEO engineering partner for digital agencies in the USA, UK, UAE, Canada, and Australia."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <Header />
      <main className="pt-24 lg:pt-32 bg-[#FAF9FF] text-[#1F1B2D]">
        
        {/* HERO SECTION */}
        <section className="bg-[#171126] text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="inline-block bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#A78BFA] font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                White-Label Offshore Agency Desk
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                Offshore <span className="text-[#A78BFA]">Next.js &amp; React Development</span> Partner for Global Agencies
              </h1>
              <p className="text-sm md:text-base text-[#D8D2E6] mb-8 max-w-2xl leading-relaxed">
                Scale your digital agency profitability without increasing local payroll overhead. Joy Digital provides dedicated Next.js developers, custom web engineering, and technical SEO desks for agency partners across the US, UK, UAE, Canada, and Australia.
              </p>

              <div className="grid grid-cols-3 gap-4 border-t border-[#2A203F] pt-6 mb-8 text-center sm:text-left">
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">60%</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">Payroll Savings</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">100%</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">NDA Protected</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">EST/PST</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">Timezone Sync</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#agency-form"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg transition-all"
                >
                  Partner With Us
                </a>
                <a
                  href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20we're%20an%20agency%20interested%20in%20a%20white-label%20offshore%20partnership."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <i className="fa-brands fa-whatsapp text-lg" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-5" id="agency-form">
              <LeadForm
                layout="vertical"
                title="Agency Partnership Inquiry"
                subtitle="Request white-label rate cards and developer availability."
                ctaText="Request Agency Rate Card"
                source="Offshore Web Development Partner Page"
                showWebsiteField={true}
              />
            </div>
          </div>
        </section>

        {/* AGENCY ADVANTAGES */}
        <section className="py-20 bg-white border-b border-[#E9E4F2]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">Why Partner With Joy Digital?</span>
            <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-12">Built for Digital &amp; Marketing Agencies</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 bg-[#FAF9FF] border border-slate-200 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center font-bold mb-4">
                  <i className="fa-solid fa-user-shield" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">100% White-Label &amp; NDA</h3>
                <p className="text-xs text-slate-600">Your clients belong to you. We work silently under strict Non-Disclosure Agreements as your white-label engineering arm.</p>
              </div>

              <div className="p-6 bg-[#FAF9FF] border border-slate-200 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center font-bold mb-4">
                  <i className="fa-solid fa-code" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Senior Next.js &amp; React Stack</h3>
                <p className="text-xs text-slate-600">No junior trial code. Clean, modular TypeScript, Tailwind CSS, and Next.js App Router code structured for Lighthouse 95+ scores.</p>
              </div>

              <div className="p-6 bg-[#FAF9FF] border border-slate-200 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center font-bold mb-4">
                  <i className="fa-solid fa-[#7C3AED] fa-clock" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Time-Zone Overlap &amp; Direct Sync</h3>
                <p className="text-xs text-slate-600">Daily Slack/Teams updates, sprint demos, and direct technical developer communication for effortless project coordination.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
