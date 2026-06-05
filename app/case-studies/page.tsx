import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client Case Studies & Marketing Results | Joy Digital",
  description: "Explore real success stories from Joy Digital. Read how our web design, SEO, and local maps campaigns drove appointments, sales, and ranking growth.",
};

const CASE_STUDIES = [
  {
    slug: "madurai-clinic-leads",
    category: "Local SEO & GBP Optimization",
    title: "How a Madurai Dental Clinic Increased Patient Appointments by 240%",
    metricValue: "240%",
    metricLabel: "Appointment Growth",
    description: "By optimizing their Google Business Profile, targeting local keywords, and cleaning up duplicate citations, we ranked the clinic in the Maps 3-Pack within 30 days.",
  },
  {
    slug: "ecommerce-sales-increase",
    category: "Web Development & CRO",
    title: "Rebuilding an E-commerce Store for 40% Higher Sales Conversions",
    metricValue: "40%",
    metricLabel: "Sales Conversion Growth",
    description: "Rebuilding a bloated WordPress shopping site using Next.js and Tailwind CSS reduced load speeds under 1.5s, resulting in a significant decrease in cart abandonment.",
  },
  {
    slug: "saas-landing-optimization",
    category: "Paid Ads & Landing Design",
    title: "180% More Lead Signups with SaaS Landing Page Rebuild",
    metricValue: "180%",
    metricLabel: "Lead Conversion Growth",
    description: "By building a dedicated high-converting landing page paired with targeted Meta Lead Generation ads, we lowered cost-per-lead for a startup client.",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32">
        
        {/* Intro */}
        <section className="py-12 bg-white text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <span className="inline-block bg-accent-glow text-accent font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-accent/20 mb-6">
              Our Results
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-4">
              Client Success <span className="text-gradient">Case Studies</span>
            </h1>
            <p className="text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
              We focus on delivering commercial results. Explore our success stories to see how our campaigns support business growth.
            </p>
          </div>
        </section>

        {/* Case Studies List */}
        <section className="py-16 bg-light-bg">
          <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
            {CASE_STUDIES.map((study, index) => (
              <article
                key={index}
                className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Metric Box */}
                <div className="lg:col-span-4 bg-primary-dark text-white p-8 rounded-2xl text-center flex flex-col justify-center items-center h-full min-h-[180px] border border-accent/20 shadow-inner relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
                  <span className="text-5xl font-extrabold text-accent mb-2 relative z-10">{study.metricValue}</span>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider relative z-10">{study.metricLabel}</span>
                </div>

                {/* Content */}
                <div className="lg:col-span-8 flex flex-col items-start text-left">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">
                    {study.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary-dark mb-4 leading-tight">
                    {study.title}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {study.description}
                  </p>
                  
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="bg-light-bg hover:bg-gray-200 text-primary-dark font-bold text-xs px-6 py-3 rounded-lg transition-all"
                  >
                    Read Full Case Study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
