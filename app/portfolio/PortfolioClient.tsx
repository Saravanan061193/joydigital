"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import Image from "next/image";

interface CaseStudy {
  category: string;
  categoryLabel: string;
  title: string;
  client: string;
  image: string;
  challenge: string;
  solution: string;
  techStack: string[];
  features: string[];
  before: string;
  whatWeChanged: string;
  after: string;
  liveUrl?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    category: "websites",
    categoryLabel: "Website Design & Development",
    title: "Ganesan Associates LIC Star Health Portal",
    client: "Ganesan Associates (Insurance & Advisory)",
    image: "/assets/images/ganesan-associates.webp",
    challenge: "Slow WordPress website loading in 4.5s on mobile, causing over 60% of prospects to bounce before making contact.",
    solution: "Rebuilt the entire platform as a serverless static Next.js web application, optimized agent portfolios, and set up automated inquiry forms.",
    techStack: ["Next.js", "React", "Tailwind CSS", "FormSubmit API"],
    features: ["WhatsApp Direct Policy Sync", "Fast PDF Brochure Downloads", "Local Business Schema Markup"],
    before: "4.5s mobile load time, high visitor bounces, 2-3 inquiries per week.",
    whatWeChanged: "Replaced heavy plugins with static React code, compressed high-resolution images, and added sticky CTA widgets.",
    after: "1.1s mobile load speed, bounce rate fell by 55%, 18+ policy leads/week via WhatsApp.",
    liveUrl: "https://ganeshmuruganlic.com",
  },
  {
    category: "websites",
    categoryLabel: "Website Design & Development",
    title: "Chithra LIC Advisor Portal",
    client: "Chithra Insurance Consultancy",
    image: "/assets/images/hero-banner.webp",
    challenge: "No web presence or digital business card. Relying entirely on manual calls and physical leaflets to find clients.",
    solution: "Created a modern, clean single-page personal advisor portfolio with policy grids and quick mobile call triggers.",
    techStack: ["Next.js", "React", "Vanilla CSS", "Google Fonts"],
    features: ["One-Click Contact Dialing", "Responsive Services Directory", "Local Map Pack Optimization"],
    before: "No digital visibility, manual phone outreach only.",
    whatWeChanged: "Designed a mobile-first digital card landing page and synced it with local SEO citations.",
    after: "Loads in 0.9s, ranks for local keyword queries, captures 12+ qualified advisor leads/month.",
    liveUrl: "https://chithrainsurance.com",
  },
  {
    category: "marketing",
    categoryLabel: "Local SEO & GBP Optimization",
    title: "Joy Digital Local Maps Ranking",
    client: "Joy Digital Agency (Regional Campaign)",
    image: "/assets/images/gbp-showcase.webp",
    challenge: "Low search ranks for local developer keywords, with directory websites ranking above the business listing.",
    solution: "Configured geotagged schema attributes, audited online NAP indicators, and optimized Google Business Profile categories.",
    techStack: ["Google Business Profile SEO", "NAP Directory Citations", "JSON-LD Schemas"],
    features: ["Google Maps Local 3-Pack Rank", " तमिल citation backlinks", "GBP Review Generation Strategy"],
    before: "Ranking #15 on local map pack searches, zero organic web inquiries.",
    whatWeChanged: "Corrected directory address differences, added geotagged visual updates, and synced website local tags.",
    after: "Ranked #1 for local designer search terms, driving 50+ organic leads/month.",
  },
  {
    category: "websites",
    categoryLabel: "Website Development",
    title: "Startup SaaS Product Landing Page",
    client: "TechStart Software (Product Launch)",
    image: "/assets/images/hero-banner.webp",
    challenge: "Heavy page builder templates slowing desktop load speeds and decreasing sign-up rates.",
    solution: "Coded a high-converting single-page landing page optimized for fast load speeds and simple user navigation.",
    techStack: ["Next.js", "Tailwind CSS", "Vercel CDNs"],
    features: ["Distraction-Free Signup Form", "Pricing Package Sliders", "Lighthouse Performance Audits"],
    before: "3.8s page speed, 2.5% visitor signup conversion rate.",
    whatWeChanged: "Rewrote visual code, optimized image assets, and streamlined form pathways.",
    after: "Loads in 1.0s, conversion rate rose to 6.8%, reducing sign-up friction.",
  },
];

export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = activeFilter === "all"
    ? CASE_STUDIES
    : CASE_STUDIES.filter(item => item.category === activeFilter);

  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32 bg-[#FAF9FF] text-[#1F1B2D] min-h-screen">
        
        {/* Intro Header */}
        <section className="py-12 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <span className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#7C3AED]/20 mb-6">
              Our Track Record
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#1F1B2D] tracking-tight mb-4">
              Result-Oriented <span className="text-[#7C3AED]">Case Studies</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6478] max-w-xl mx-auto leading-relaxed font-semibold">
              We don&apos;t just design websites. We engineer digital assets that solve actual business problems, load fast, and drive leads.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-y border-[#E9E4F2] bg-white">
          <div className="max-w-7xl mx-auto px-6 flex justify-center gap-3 flex-wrap">
            {["all", "websites", "marketing"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-extrabold text-xs px-6 py-3 rounded-full border transition-all duration-200 capitalize cursor-pointer ${
                  activeFilter === filter
                    ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-md shadow-[#7C3AED]/15"
                    : "bg-white text-[#6B6478] border-[#E9E4F2] hover:bg-slate-50 hover:text-[#1F1B2D]"
                }`}
              >
                {filter === "all" ? "All Case Studies" : filter === "marketing" ? "Local SEO & GBP" : "Website Development"}
              </button>
            ))}
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col gap-16">
              {filteredItems.map((item, index) => (
                <article
                  key={index}
                  className="bg-white border border-[#E9E4F2] rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8"
                >
                  {/* Left Column: Image and live link */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E9E4F2]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-[#E9E4F2] text-[#1F1B2D] font-extrabold text-xs py-3.5 rounded-xl transition-all"
                      >
                        Visit Live Website <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
                      </a>
                    )}
                  </div>

                  {/* Right Column: Case study details */}
                  <div className="lg:col-span-7 flex flex-col justify-between gap-6 text-left">
                    <div>
                      <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
                        <span className="text-[9px] font-black text-[#7C3AED] uppercase tracking-wider bg-[#7C3AED]/5 px-2.5 py-1 rounded-md border border-[#7C3AED]/10">
                          {item.categoryLabel}
                        </span>
                        <span className="text-[10px] font-extrabold text-[#6B6478]">
                          Client: {item.client}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#1F1B2D] mb-4">
                        {item.title}
                      </h2>

                      {/* Details specs */}
                      <div className="flex flex-col gap-4">
                        <div>
                          <h4 className="text-[10px] font-black text-[#1F1B2D] uppercase tracking-wider flex items-center gap-1.5 mb-1 text-[#7C3AED]">
                            <i className="fa-solid fa-circle-exclamation text-[9px]" /> The Challenge
                          </h4>
                          <p className="text-xs text-[#6B6478] font-semibold leading-relaxed">{item.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-[#1F1B2D] uppercase tracking-wider flex items-center gap-1.5 mb-1 text-emerald-600">
                            <i className="fa-solid fa-circle-check text-[9px]" /> Our Solution
                          </h4>
                          <p className="text-xs text-[#6B6478] font-semibold leading-relaxed">{item.solution}</p>
                        </div>
                      </div>

                      {/* Tech stack & features pills */}
                      <div className="flex flex-wrap items-center gap-2 mt-5">
                        {item.techStack.map((tech) => (
                          <span key={tech} className="text-[9px] font-extrabold text-[#6B6478] bg-[#FAF9FF] border border-[#E9E4F2] px-2.5 py-1 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Results Box */}
                    <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-5 rounded-2xl flex flex-col gap-3">
                      <div className="text-[10px] font-black text-[#1F1B2D] uppercase tracking-wider border-b border-[#E9E4F2] pb-1.5">
                        Performance Metrics & Results
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-rose-500 uppercase">Before</span>
                          <span className="font-bold text-[#6B6478] mt-0.5">{item.before}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-emerald-600 uppercase">After Results</span>
                          <span className="font-extrabold text-[#1F1B2D] mt-0.5">{item.after}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-end mt-2">
                      <a
                        href={`https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I%20saw%20your%20case%20study%20for%20${encodeURIComponent(item.title)}.%20I%20would%20like%20to%20discuss%20starting%20a%20similar%20project%20for%20my%20business.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-md shadow-[#7C3AED]/15 hover:-translate-y-0.5 transition-all"
                      >
                        Start Your Project
                        <i className="fa-solid fa-arrow-right text-[10px]" />
                      </a>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
