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
  title: "Shopify vs Headless Next.js E-Commerce | Joy Digital",
  description: "Compare Shopify Liquid vs Headless Next.js e-commerce storefronts. Learn how sub-second page loads reduce cart abandonment and increase revenue for scaling brands.",
  alternates: {
    canonical: "https://joydigital.in/shopify-vs-headless-nextjs",
  },
};

export default function ShopifyVsHeadlessNextjsPage() {
  const canonicalUrl = "https://joydigital.in/shopify-vs-headless-nextjs";
  const pageGraphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Shopify vs Headless Next.js E-Commerce | Joy Digital",
    description: "Compare Shopify Liquid vs Headless Next.js e-commerce storefronts. Learn how sub-second page loads reduce cart abandonment and increase revenue for scaling brands.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "Shopify vs Headless Next.js", item: canonicalUrl },
    ],
    service: {
      name: "Headless E-Commerce Development",
      description: "Custom Headless Next.js e-commerce storefront engineering integrated with Shopify, Stripe, or custom checkout platforms.",
      serviceType: "E-Commerce Web Development",
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
                Headless E-Commerce Engineering
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                Shopify vs Headless <span className="text-[#A78BFA]">Next.js Storefronts</span>
              </h1>
              <p className="text-sm md:text-base text-[#D8D2E6] mb-8 max-w-2xl leading-relaxed">
                Standard Shopify Liquid themes slow down when you add plugins, causing mobile cart abandonment. Rebuild your store with a Headless Next.js frontend to achieve sub-second page loads, custom product customizers, and higher organic SEO rankings.
              </p>

              <div className="grid grid-cols-3 gap-4 border-t border-[#2A203F] pt-6 mb-8 text-center sm:text-left">
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">+35%</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">Checkout Conversion</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">&lt; 1.2s</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">Catalog Load Time</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#A78BFA] block">100%</span>
                  <span className="text-[10px] text-[#D8D2E6] uppercase font-bold tracking-wider">Custom UI Freedom</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#ecommerce-form"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg transition-all"
                >
                  Get Headless Store Quote
                </a>
                <a
                  href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I%20want%20to%20build%20a%20Headless%20Next.js%20e-commerce%20store."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <i className="fa-brands fa-whatsapp text-lg" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-5" id="ecommerce-form">
              <LeadForm
                layout="vertical"
                title="Build Your Headless Store"
                subtitle="Submit your product store details for a custom Next.js e-commerce proposal."
                ctaText="Get E-Commerce Proposal"
                source="Shopify vs Headless Next.js Landing Page"
                showWebsiteField={true}
              />
            </div>
          </div>
        </section>

        {/* FEATURE COMPARISON */}
        <section className="py-20 bg-white border-b border-[#E9E4F2]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">Side-by-Side Comparison</span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">Why Growing Brands Choose Headless Next.js</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-rose-50/50 p-8 rounded-2xl border border-rose-200">
                <h3 className="text-lg font-black text-rose-900 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-store" /> Standard Shopify Liquid
                </h3>
                <ul className="space-y-3 text-xs text-rose-800 font-medium">
                  <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-rose-500 mt-0.5" /> Slow mobile speeds due to multiple third-party Shopify apps.</li>
                  <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-rose-500 mt-0.5" /> Rigid template limitations for product displays &amp; custom features.</li>
                  <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-rose-500 mt-0.5" /> High monthly app subscription fees for basic features.</li>
                  <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-rose-500 mt-0.5" /> Generic checkout paths that hurt high-ticket brand positioning.</li>
                </ul>
              </div>

              <div className="bg-emerald-50/50 p-8 rounded-2xl border border-emerald-200">
                <h3 className="text-lg font-black text-emerald-900 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-bolt" /> Headless Next.js Storefront (Joy Digital)
                </h3>
                <ul className="space-y-3 text-xs text-emerald-800 font-semibold">
                  <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-600 mt-0.5" /> Instant static page pre-rendering across global edge CDNs (&lt; 1.0s).</li>
                  <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-600 mt-0.5" /> Unlimited UI/UX design freedom and interactive customizers.</li>
                  <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-600 mt-0.5" /> Zero monthly app fee bloat; all features built cleanly into code.</li>
                  <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-600 mt-0.5" /> Full Shopify / Stripe backend integration for smooth order management.</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/ecommerce-website-development" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-md inline-block">
                Explore Our E-Commerce Development Services &rarr;
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
