import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CaseStudyData {
  category: string;
  title: string;
  metricValue: string;
  metricLabel: string;
  challenge: string;
  strategy: string;
  results: string;
  clientQuote: string;
  clientAuthor: string;
  clientRole: string;
}

const DATA: Record<string, CaseStudyData> = {
  "madurai-clinic-leads": {
    category: "Local SEO & GBP Optimization",
    title: "How a Madurai Dental Clinic Increased Patient Appointments by 240%",
    metricValue: "240%",
    metricLabel: "Appointment Growth",
    challenge: "A leading dental clinic in Madurai was struggling to attract patients from Google Search. Despite their established medical expertise, their Google Business Profile was unoptimized, suffered from name and address inconsistencies across local citation directories, and did not appear in local maps listings for high-intent keywords like 'best dentist in Madurai'.",
    strategy: "We audited the competitor landscape and restructured the clinic's Google Business Profile. We selected relevant primary and secondary business categories, added descriptive service descriptions, and uploaded geotagged images of their facilities. Next, we corrected NAP inconsistencies across 60+ local directory citations and built location landing pages with schema integrations.",
    results: "Within 30 days of campaign launch, the clinic ranked in the top 3 Google Maps Local Pack spots. Direct mobile click-to-call conversions increased, resulting in a 240% monthly growth in new patient appointment inquiries.",
    clientQuote: "Joy Digital optimized our Google Map and local search presence. Within two weeks, we started getting direct calling leads from local search queries.",
    clientAuthor: "Dr. S. K. Murugan",
    clientRole: "Clinic Director, Madurai",
  },
  "ecommerce-sales-increase": {
    category: "Web Development & CRO",
    title: "Rebuilding an E-commerce Store for 40% Higher Sales Conversions",
    metricValue: "40%",
    metricLabel: "Sales Conversion Growth",
    challenge: "An online retail brand noticed high checkout abandonment rates. Their WordPress e-commerce store was slow, taking over 5.5 seconds to load. Large script loads, uncompressed images, and a complicated checkout flow caused users to bounce before completing purchases.",
    strategy: "We rebuilt their online store using Next.js, TypeScript, and Tailwind CSS. We configured automatic WebP image compression, set up server-side pre-rendering (SSG), and simplified the checkout flow into an intuitive checkout process. We also integrated responsive navigation layouts to support mobile shopping.",
    results: "The rebuilt website achieved page load speeds under 1.5 seconds and improved mobile user experience, resulting in a 40% growth in completed sales conversions and reduced cart abandonment rates.",
    clientQuote: "Excellent pricing structures and professional delivery timelines. Our sales conversion rates have significantly increased since our redesign.",
    clientAuthor: "R. Rajesh Kumar",
    clientRole: "Retail Store Manager, Madurai",
  },
  "saas-landing-optimization": {
    category: "Paid Ads & Landing Design",
    title: "180% More Lead Signups with SaaS Landing Page Rebuild",
    metricValue: "180%",
    metricLabel: "Lead Conversion Growth",
    challenge: "A startup SaaS provider spent significant budget on Facebook Ads but saw low signup conversions. Their ads linked to a detailed product page with multiple outbound links, which distracted visitors from the primary signup offer.",
    strategy: "We designed a dedicated, distraction-free landing page in Next.js. We removed main navigation headers, positioned sticky consultation buttons, and set up a clear above-the-fold lead capture form. We paired this page with highly targeted Meta Lead Generation ad campaigns to capture qualified user leads.",
    results: "The optimized landing page improved user focus and lead capture rates, resulting in a 180% growth in lead signups and a significant decrease in cost-per-lead.",
    clientQuote: "We rank on top spots of local maps for high intent searches. Customer support is prompt and helpful.",
    clientAuthor: "K. Selvam",
    clientRole: "Startup Founder, Tamil Nadu",
  },
};

export async function generateStaticParams() {
  return [
    { slug: "madurai-clinic-leads" },
    { slug: "ecommerce-sales-increase" },
    { slug: "saas-landing-optimization" },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const study = DATA[resolvedParams.slug];
  if (!study) return {};
  return {
    title: `${study.title} | Case Study | Joy Digital`,
    description: `Read how Joy Digital delivered a ${study.metricValue} increase in ${study.metricLabel} through specialized ${study.category}.`,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const study = DATA[resolvedParams.slug];

  if (!study) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32">
        
        {/* Detail Hero */}
        <section className="py-16 bg-white relative overflow-hidden border-b border-gray-100">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="inline-block bg-accent-glow text-accent font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-accent/20 mb-6">
              {study.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-primary-dark tracking-tight mb-8 leading-tight">
              {study.title}
            </h1>
            
            {/* Metric Banner */}
            <div className="bg-primary-dark border border-accent/20 max-w-sm mx-auto p-6 rounded-2xl text-white shadow-md">
              <div className="text-4xl font-extrabold text-accent mb-1">{study.metricValue}</div>
              <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{study.metricLabel}</div>
            </div>
          </div>
        </section>

        {/* Narrative details */}
        <section className="py-16 bg-light-bg">
          <div className="max-w-3xl mx-auto px-6 flex flex-col gap-12">
            
            {/* Challenge */}
            <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-2xl shadow-sm text-left">
              <h2 className="text-lg font-bold text-primary-dark mb-4 flex items-center gap-2">
                <span className="text-accent text-sm"><i className="fa-solid fa-triangle-exclamation" /></span>
                The Challenge
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {study.challenge}
              </p>
            </div>

            {/* Strategy */}
            <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-2xl shadow-sm text-left">
              <h2 className="text-lg font-bold text-primary-dark mb-4 flex items-center gap-2">
                <span className="text-accent text-sm"><i className="fa-solid fa-compass" /></span>
                The Strategy & Action
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {study.strategy}
              </p>
            </div>

            {/* Results */}
            <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-2xl shadow-sm text-left">
              <h2 className="text-lg font-bold text-primary-dark mb-4 flex items-center gap-2">
                <span className="text-success-green text-sm"><i className="fa-solid fa-chart-line" /></span>
                The Results & ROI
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {study.results}
              </p>
            </div>

            {/* Testimonial Quote */}
            <div className="border-l-4 border-accent bg-accent/5 p-8 rounded-r-2xl text-left">
              <p className="text-sm italic text-text-primary mb-4 leading-relaxed">
                &ldquo;{study.clientQuote}&rdquo;
              </p>
              <div className="flex flex-col">
                <strong className="text-sm text-primary-dark">{study.clientAuthor}</strong>
                <span className="text-xs text-text-secondary">{study.clientRole}</span>
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-4">
              <Link
                href="/case-studies"
                className="text-xs font-bold text-primary hover:text-accent flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-arrow-left-long" /> Back to All Case Studies
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
