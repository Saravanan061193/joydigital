import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import AuditForm from "@/components/ui/AuditForm";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Claim Free Website Audit & SEO Check | Joy Digital",
  description: "Claim your free website audit report from Joy Digital. Discover page speed bottlenecks, mobile layout errors, and SEO ranking opportunities.",
  alternates: {
    canonical: "https://joydigital.in/free-website-audit",
  },
};

const AUDIT_CHECKLIST = [
  {
    icon: "fa-solid fa-gauge-high",
    title: "Page Speed & Core Web Vitals",
    description: "We check Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) on slow mobile networks to ensure your site loads under 1.5 seconds.",
  },
  {
    icon: "fa-solid fa-magnifying-glass-chart",
    title: "On-Page & Technical SEO Scan",
    description: "We audit heading hierarchies, index tags, schema structures, meta tags, and check for crawl blocks in robots.txt and XML sitemaps.",
  },
  {
    icon: "fa-solid fa-mobile-screen-button",
    title: "Mobile UX & Accessibility Check",
    description: "Over 65% of searches happen on smartphones. We test element sizes, navigability, and responsive layouts across common devices.",
  },
  {
    icon: "fa-solid fa-funnel-dollar",
    title: "Conversion Rate (CRO) Analysis",
    description: "We inspect your call-to-actions, form fields, phone/WhatsApp click integrations, and visitor journey flow to help boost enquiries.",
  },
];

export default function FreeWebsiteAuditPage() {
  const canonicalUrl = "https://joydigital.in/free-website-audit";
  const graphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Claim Free Website Audit & SEO Check | Joy Digital",
    description: "Claim your free website audit report from Joy Digital. Discover page speed bottlenecks, mobile layout errors, and SEO ranking opportunities.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "Free Website Audit", item: canonicalUrl },
    ],
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
      <Header />
      <main className="pt-24 lg:pt-32">
        
        {/* Split Hero / Form Section */}
        <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="inline-flex items-center gap-2 bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
                  No Cost • No Obligations • 100% Free
                </span>
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-6 leading-tight">
                Get Your Free <span className="text-gradient">Website Growth Report</span>
              </h1>
              
              <p className="text-sm md:text-base text-text-secondary mb-8 max-w-xl leading-relaxed">
                Find out what&apos;s stopping your website from getting more traffic, enquiries, and customers. Enter your details, and our technical developers and SEO strategists will compile a custom diagnostic report.
              </p>

              {/* Checklist list */}
              <div className="flex flex-col gap-6 w-full max-w-lg mt-2">
                {AUDIT_CHECKLIST.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] text-sm flex-shrink-0">
                      <i className={item.icon} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xs font-extrabold text-primary-dark uppercase tracking-wider">{item.title}</h3>
                      <p className="text-[11px] sm:text-xs text-text-secondary mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <AuditForm />
            </div>

          </div>
        </section>

        {/* Informative / Trust Section */}
        <section className="py-20 bg-light-bg border-t border-[#E9E4F2]">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-dark text-center mb-8">
              Why We Provide This Free Website Review
            </h2>
            <div className="prose prose-blue max-w-none text-xs sm:text-sm text-text-secondary space-y-6 leading-relaxed font-semibold">
              <p>
                Many businesses invest heavily in online ads or digital campaigns without understanding why their site fails to rank or convert visitors. They waste advertising budget pointing traffic to slow-loading pages, bloated templates, or broken forms.
              </p>
              <p>
                We believe in proving value first. By highlighting the exact speed, code, and search obstacles holding your business back, we demonstrate our engineering and SEO capabilities. If you like our recommendations, you can hire us to implement the fixes. If not, the report is yours to keep and use with your team.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
