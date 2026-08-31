import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import LeadForm from "@/components/ui/LeadForm";
import WorldwideServiceNetwork from "@/components/ui/WorldwideServiceNetwork";

export const metadata: Metadata = {
  title: "Offshore Next.js Development Partner for US & UK Agencies | Joy Digital",
  description: "Scale agency margins by 60% with a trusted white-label Next.js & React engineering desk in India. 100% NDA protected, EST/PST & GMT time-zone sync, 95+ PageSpeed guaranteed.",
  keywords: [
    "offshore nextjs development agency",
    "hire dedicated react developers india",
    "white label agency subcontracting",
    "offshore web development partner us uk",
    "outsource web engineering to india"
  ],
  alternates: {
    canonical: "https://joydigital.in/offshore-web-development-partner",
    languages: {
      "en-US": "https://joydigital.in/us/website-development",
      "en-GB": "https://joydigital.in/uk/website-development",
      "en-AE": "https://joydigital.in/ae/website-development",
      "en-IN": "https://joydigital.in/offshore-web-development-partner",
      "x-default": "https://joydigital.in/offshore-web-development-partner",
    },
  },
};

export default function OffshoreWebDevelopmentPartnerPage() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Joy Digital - Offshore Web Development Partner",
    "serviceType": "White-Label Next.js Engineering & Technical SEO Subcontracting",
    "url": "https://joydigital.in/offshore-web-development-partner",
    "provider": {
      "@type": "Organization",
      "name": "Joy Digital",
      "url": "https://joydigital.in"
    },
    "areaServed": [
      "United States",
      "United Kingdom",
      "United Arab Emirates",
      "Canada",
      "Australia",
      "India"
    ],
    "description": "White-label Next.js, React, and Technical SEO engineering partner for digital agencies and SMBs in the US, UK, UAE, and APAC.",
    "priceRange": "$$"
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
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A203F_1px,transparent_1px),linear-gradient(to_bottom,#2A203F_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="inline-block bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#A78BFA] font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 shadow-sm">
                ⚡ White-Label Offshore Agency Desk
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                Cut Engineering Costs by <span className="text-[#A78BFA]">60%</span> — Without Sacrificing Quality or Timezone Sync.
              </h1>
              <p className="text-sm md:text-base text-[#D8D2E6] mb-8 max-w-2xl leading-relaxed">
                Joy Digital delivers dedicated Next.js developers, custom React engineering, and technical SEO desks for digital agencies and growing SMBs across the US, UK, UAE, Canada, and Australia. 100% NDA protected with daily Slack/Jira sync.
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#2A203F] pt-6 mb-8 text-center sm:text-left">
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">60%</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">Payroll Savings</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">100%</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">NDA Protected</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">EST/GMT</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">Timezone Sync</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">95+</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">Lighthouse Score</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#agency-form"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg hover:shadow-[#7C3AED]/40 transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-calendar-check" /> Book Free Strategy Call
                </a>
                <a
                  href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20we're%20an%20agency/business%20interested%20in%20a%20white-label%20offshore%20partnership."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 transition-all"
                >
                  <i className="fa-brands fa-whatsapp text-lg" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Lead Form Column */}
            <div className="lg:col-span-5" id="agency-form">
              <LeadForm
                layout="vertical"
                title="Request Offshore Rate Card & Audit"
                subtitle="Get developer availability, hourly rates ($25-$35/hr), and free site analysis."
                ctaText="Get Free Audit & Offshore Rate Card →"
                source="Offshore Web Development Partner Page"
                showWebsiteField={true}
              />
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE SECTION */}
        <section className="py-20 bg-white border-b border-[#E9E4F2]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">Cost &amp; Quality Comparison</span>
            <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">Local US/UK Agencies vs. Joy Digital Offshore Desk</h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto mb-12">
              Why pay inflated local rates for slow legacy web setups when you can deploy high-speed Next.js engineering at a fraction of the cost?
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <thead>
                  <tr className="bg-[#171126] text-white text-xs uppercase tracking-wider">
                    <th className="p-4 md:p-6 font-extrabold">Feature / Metric</th>
                    <th className="p-4 md:p-6 font-extrabold text-red-400">Local US/UK Agency / In-House</th>
                    <th className="p-4 md:p-6 font-extrabold text-[#A78BFA]">Joy Digital Offshore Desk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs md:text-sm bg-white">
                  <tr>
                    <td className="p-4 md:p-6 font-bold text-slate-900">Hourly Developer Cost</td>
                    <td className="p-4 md:p-6 text-red-600 font-semibold">$120 – $200 / hr</td>
                    <td className="p-4 md:p-6 text-emerald-600 font-bold bg-[#7C3AED]/5">$25 – $35 / hr (Save 60-70%)</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 font-bold text-slate-900">Onboarding &amp; Setup Time</td>
                    <td className="p-4 md:p-6 text-slate-600">3 to 6 weeks recruitment delay</td>
                    <td className="p-4 md:p-6 text-emerald-600 font-bold bg-[#7C3AED]/5">Deploy developers within 48 hours</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 font-bold text-slate-900">Tech Stack Standard</td>
                    <td className="p-4 md:p-6 text-slate-600">Often bloated legacy WordPress themes</td>
                    <td className="p-4 md:p-6 text-emerald-600 font-bold bg-[#7C3AED]/5">Modern Next.js 15, React 19, TypeScript</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 font-bold text-slate-900">Non-Disclosure &amp; IP Protection</td>
                    <td className="p-4 md:p-6 text-slate-600">Standard contract terms</td>
                    <td className="p-4 md:p-6 text-emerald-600 font-bold bg-[#7C3AED]/5">100% Strict NDA &amp; Instant IP Transfer</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 font-bold text-slate-900">Time-Zone Sync</td>
                    <td className="p-4 md:p-6 text-slate-600">Local business hours only</td>
                    <td className="p-4 md:p-6 text-emerald-600 font-bold bg-[#7C3AED]/5">Daily EST/PST &amp; GMT Overlapping Standups</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-6 font-bold text-slate-900">PageSpeed Performance SLA</td>
                    <td className="p-4 md:p-6 text-slate-600">Unpredictable (50-70 scores)</td>
                    <td className="p-4 md:p-6 text-emerald-600 font-bold bg-[#7C3AED]/5">Guaranteed 95+ Core Web Vitals</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* INTERACTIVE WORLDWIDE NETWORK MAP */}
        <section className="py-16 bg-[#FAF9FF]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-2">Global Operations</span>
            <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">Connecting Businesses Across 6+ Time Zones</h2>
            <WorldwideServiceNetwork />
          </div>
        </section>

        {/* CORE SERVICES OFFERINGS */}
        <section className="py-20 bg-white border-y border-[#E9E4F2]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">Our Offshore Capabilities</span>
            <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-12">Tailored Offshore Solutions for Global Scale</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-8 bg-[#FAF9FF] border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center font-bold mb-6 text-xl">
                  <i className="fa-solid fa-user-shield" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-3">White-Label Agency Subcontracting</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Scale your agency deliverables seamlessly. We operate silently under strict Non-Disclosure Agreements as your transparent engineering division.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 font-medium">
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Complete White-Label Privacy</li>
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Direct Jira / Slack Integration</li>
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Dedicated QA Governance</li>
                </ul>
              </div>

              <div className="p-8 bg-[#FAF9FF] border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center font-bold mb-6 text-xl">
                  <i className="fa-solid fa-code" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-3">Custom Next.js &amp; React Development</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Sub-second loading web applications, Shopify Headless commerce, and WordPress-to-Next.js migrations engineered for maximum conversion.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 font-medium">
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Clean TypeScript &amp; Tailwind CSS</li>
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Sub-1s Page Load Times</li>
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Headless CMS (Sanity / Strapi)</li>
                </ul>
              </div>

              <div className="p-8 bg-[#FAF9FF] border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center font-bold mb-6 text-xl">
                  <i className="fa-solid fa-chart-line" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-3">Global Technical &amp; B2B SEO</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Data-driven SEO strategies targeting search engine visibility across North America, Europe, and the Middle East.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 font-medium">
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Multi-Country Hreflang Tags</li>
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> JSON-LD Schema Architecture</li>
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> High-Intent Keyword Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST & RISK REVERSAL GUARANTEES */}
        <section className="py-20 bg-[#171126] text-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-widest block mb-3">Risk-Free Collaboration</span>
            <h2 className="text-3xl font-extrabold mb-12">Our Risk Reversal &amp; Security Guarantees</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 bg-[#1F1B2D] border border-[#2A203F] rounded-2xl">
                <div className="text-3xl text-[#A78BFA] mb-4"><i className="fa-solid fa-shield-halved" /></div>
                <h3 className="text-base font-bold mb-2">14-Day Risk-Free Trial</h3>
                <p className="text-xs text-[#D8D2E6]">Test our code quality and communication in a 2-week trial sprint. If you aren't 100% satisfied, you owe zero fees.</p>
              </div>

              <div className="p-6 bg-[#1F1B2D] border border-[#2A203F] rounded-2xl">
                <div className="text-3xl text-[#A78BFA] mb-4"><i className="fa-solid fa-file-contract" /></div>
                <h3 className="text-base font-bold mb-2">100% IP &amp; Code Ownership</h3>
                <p className="text-xs text-[#D8D2E6]">All source code, repository commits, and assets belong entirely to your company upon deployment with zero licensing lock-in.</p>
              </div>

              <div className="p-6 bg-[#1F1B2D] border border-[#2A203F] rounded-2xl">
                <div className="text-3xl text-[#A78BFA] mb-4"><i className="fa-solid fa-comments" /></div>
                <h3 className="text-base font-bold mb-2">Real-Time Daily Sync</h3>
                <p className="text-xs text-[#D8D2E6]">Stay updated via dedicated Slack/Teams channels, automated GitHub pull requests, and live sprint demonstrations.</p>
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
