import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import LeadForm from "@/components/ui/LeadForm";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "WordPress to Next.js Migration Agency | Joy Digital",
  description: "Migrate your slow WordPress website to high-speed serverless Next.js. Pass Core Web Vitals (95+ score), prevent plugin hacks, and preserve your 100% SEO rankings.",
  alternates: {
    canonical: "https://joydigital.in/wordpress-to-nextjs-migration",
  },
};

export default function WordPressToNextjsMigrationPage() {
  const canonicalUrl = "https://joydigital.in/wordpress-to-nextjs-migration";
  const pageGraphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "WordPress to Next.js Migration Agency | Joy Digital",
    description: "Migrate your slow WordPress website to high-speed serverless Next.js. Pass Core Web Vitals (95+ score), prevent plugin hacks, and preserve your 100% SEO rankings.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "WordPress to Next.js Migration", item: canonicalUrl },
    ],
    service: {
      name: "WordPress to Next.js Migration",
      description: "Professional migration of legacy WordPress websites to high-performance, serverless Next.js and React architectures with 100% SEO redirect preservation.",
      serviceType: "Web Development & Speed Optimization",
    },
  });

  return (
    <>
      <JsonLd schema={pageGraphSchema} />
      <Header />
      <main className="pt-24 lg:pt-32 bg-[#FAF9FF] text-[#1F1B2D]">
        
        {/* HERO SECTION */}
        <section className="bg-[#171126] text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="inline-block bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#A78BFA] font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                WordPress Migration Specialists
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                Migrate <span className="text-[#A78BFA]">WordPress to Next.js</span> for 95+ PageSpeed &amp; 100% SEO Safety
              </h1>
              <p className="text-sm md:text-base text-[#D8D2E6] mb-8 max-w-2xl leading-relaxed">
                Is your WordPress site slow, vulnerable to plugin exploits, or failing Google&apos;s Core Web Vitals? We rebuild your frontend with serverless Next.js, boosting mobile conversion rates while strictly preserving your Google search rankings.
              </p>

              <div className="grid grid-cols-3 gap-4 border-t border-[#2A203F] pt-6 mb-8 text-center sm:text-left">
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">&lt; 1.0s</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">Load Speed</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">100%</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">SEO Preserved</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">0</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">Plugin Exploits</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#migration-form"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg transition-all"
                >
                  Get Free Migration Proposal
                </a>
                <a
                  href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I'm%20looking%20to%20migrate%20my%20WordPress%20site%20to%20Next.js."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <i className="fa-brands fa-whatsapp text-lg" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-5" id="migration-form">
              <LeadForm
                layout="vertical"
                title="Migrate Your Website"
                subtitle="Submit your WordPress URL to get a complete migration plan and flat-rate quote."
                ctaText="Request Migration Plan"
                source="WordPress to Next.js Landing Page"
                showWebsiteField={true}
              />
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-20 bg-white border-b border-[#E9E4F2]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">Head-to-Head Benchmark</span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">WordPress vs Headless Next.js</h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">See why corporate brands and modern startups are moving off legacy PHP page builders.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-slate-500 uppercase font-black tracking-wider text-[10px]">
                    <th className="py-4 px-6">Feature / Metric</th>
                    <th className="py-4 px-6 bg-rose-50/50 text-rose-700">Legacy WordPress</th>
                    <th className="py-4 px-6 bg-emerald-50/50 text-emerald-700 font-extrabold">Serverless Next.js (Joy Digital)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-900">Average Mobile Page Load Speed</td>
                    <td className="py-4 px-6 text-rose-600 bg-rose-50/30">3.5s – 7.0s (Slow)</td>
                    <td className="py-4 px-6 text-emerald-600 font-extrabold bg-emerald-50/30">0.8s – 1.2s (Lightning)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-900">Google Core Web Vitals Pass Rate</td>
                    <td className="py-4 px-6 text-rose-600 bg-rose-50/30">Fails LCP &amp; CLS tests frequently</td>
                    <td className="py-4 px-6 text-emerald-600 font-extrabold bg-emerald-50/30">100% Guaranteed Pass (95+ score)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-900">Security &amp; Vulnerability Entry Points</td>
                    <td className="py-4 px-6 text-rose-600 bg-rose-50/30">High risk (Plugin updates, SQL leaks)</td>
                    <td className="py-4 px-6 text-emerald-600 font-extrabold bg-emerald-50/30">Zero static attack vector (Serverless CDN)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-900">Database &amp; Server Crashes</td>
                    <td className="py-4 px-6 text-rose-600 bg-rose-50/30">Crashes under high traffic spikes</td>
                    <td className="py-4 px-6 text-emerald-600 font-extrabold bg-emerald-50/30">Auto-scaling edge CDN infrastructure</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-900">Google SEO Indexing Efficiency</td>
                    <td className="py-4 px-6 text-rose-600 bg-rose-50/30">Bloated PHP code delays crawlers</td>
                    <td className="py-4 px-6 text-emerald-600 font-extrabold bg-emerald-50/30">Clean pre-rendered HTML for Instant Crawls</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* MIGRATION STEPS */}
        <section className="py-20 bg-[#FAF9FF] border-b border-[#E9E4F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">Seamless Process</span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">Our 4-Step Zero-Downtime Migration</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <span className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] font-black flex items-center justify-center mb-4">01</span>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Content &amp; URL Audit</h3>
                <p className="text-xs text-slate-600">We extract all legacy blog posts, pages, images, and map exact 301 redirect paths to ensure zero loss of ranking juice.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <span className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] font-black flex items-center justify-center mb-4">02</span>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Next.js UI Rebuild</h3>
                <p className="text-xs text-slate-600">We write clean, modular React components using modern Tailwind CSS and optimized SVG imagery.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <span className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] font-black flex items-center justify-center mb-4">03</span>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Headless CMS Setup</h3>
                <p className="text-xs text-slate-600">We keep your familiar blog editor desk (WordPress API, Strapi, or Markdown) so your team can easily publish content.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <span className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] font-black flex items-center justify-center mb-4">04</span>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Zero-Downtime Launch</h3>
                <p className="text-xs text-slate-600">We deploy to Vercel/Cloudflare global edge CDN with DNS updates, SSL setup, and Google Search Console re-indexing.</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/free-website-audit" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-md inline-block">
                Start Your Migration Audit Now &rarr;
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
