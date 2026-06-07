import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import LeadForm from "@/components/ui/LeadForm";

export const metadata: Metadata = {
  title: "Claim Your Free 60-Second Website Speed & SEO Audit | Joy Digital",
  description: "Get a detailed performance audit for your website. Identify Core Web Vitals issues, broken redirects, mobile responsiveness bugs, and Google indexing barriers.",
  alternates: {
    canonical: "https://joydigital.in/free-audit",
  },
};

const AUDIT_CHECKLIST = [
  {
    icon: "fa-solid fa-gauge-high",
    title: "Core Web Vitals & Speed Audit",
    description: "We test Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) on actual mobile connections to flag rendering lag.",
  },
  {
    icon: "fa-solid fa-bug-slash",
    title: "Technical SEO Code Scan",
    description: "We audit heading hierarchies, alt text, missing links, schema scripts, and crawl blocks in robots.txt and sitemaps.",
  },
  {
    icon: "fa-solid fa-user-check",
    title: "Conversion (CRO) Check",
    description: "We check the placement of forms, CTA buttons, scroll behavior, and phone icons to improve conversion rates.",
  },
  {
    icon: "fa-solid fa-shield-virus",
    title: "Security & Cache Inspection",
    description: "We verify SSL certification paths, HTTP/2 configurations, DNS prefetching, and CDN setup to secure your platform.",
  },
];

export default function FreeAuditPage() {
  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32">
        
        {/* Hero split section */}
        <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs font-bold text-accent-dark uppercase tracking-wider">
                  No Commitment • 100% Free
                </span>
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-6 leading-tight">
                Get a Professional <span className="text-gradient">Website Speed & SEO Audit</span> Report
              </h1>
              <p className="text-sm md:text-base text-text-secondary mb-8 max-w-xl leading-relaxed">
                Is your site loading too slowly? Are you missing out on high-intent search traffic? Submit your site URL, and our strategists will inspect your code, core speed indices, and search ranking gaps.
              </p>

              {/* Checklist list */}
              <div className="flex flex-col gap-5 w-full max-w-lg mt-2">
                {AUDIT_CHECKLIST.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm flex-shrink-0">
                      <i className={item.icon} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xs font-bold text-primary-dark">{item.title}</h3>
                      <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <LeadForm
                layout="vertical"
                title="Claim My Free Audit Report"
                subtitle="Enter your email and current website URL to queue your performance analysis."
                ctaText="Generate My Audit Report"
                source="Free Audit Landing Page Form"
                showWebsiteField={true}
              />
            </div>

          </div>
        </section>

        {/* Audit FAQ Zone */}
        <section className="py-20 bg-light-bg">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-extrabold text-primary-dark text-center mb-8">
              Why Are We Offering This Audit For Free?
            </h2>
            <div className="prose prose-blue max-w-none text-sm text-text-secondary space-y-6">
              <p>
                Many businesses partner with agencies without understanding why their site fails to rank or load. They waste money on generic marketing plans instead of fixing fundamental speed errors, security issues, or mobile responsiveness bugs.
              </p>
              <p>
                We believe in establishing trust first. By showing you the exact bottlenecks holding your site back, we demonstrate our technical capabilities. If you like our recommendations, you can choose to hire us to fix them. If not, the report is yours to keep and use with your developers.
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
