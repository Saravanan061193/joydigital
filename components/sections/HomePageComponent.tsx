"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import Header from "@/components/layout/Header";

// Below-the-fold component imports for speed optimization
const Footer = dynamic(() => import("@/components/layout/Footer"));
const StickyWidgets = dynamic(() => import("@/components/ui/StickyWidgets"), { ssr: false });
const LeadForm = dynamic(() => import("@/components/ui/LeadForm"));
const Accordion = dynamic(() => import("@/components/ui/Accordion"));

interface HomePageComponentProps {
  country: string; // "us", "uk", "ae", "in", or "" (Global/India default)
}

export default function HomePageComponent({ country }: HomePageComponentProps) {
  const [selectedCity, setSelectedCity] = useState("Madurai");

  // Dynamic localized content overrides based on regional subpaths
  const getHeroContent = () => {
    switch (country) {
      case "us":
        return {
          badge: "Premium Web Engineering Partner",
          h1: "Website Design, Web Development & SEO Services USA",
          subtitle: "We design and build ultra-fast, secure Next.js websites and premium corporate platforms for US businesses, backed by 9+ years of experience.",
        };
      case "uk":
        return {
          badge: "High-Performance Web Agency",
          h1: "Website Design, Web Development & SEO Services UK",
          subtitle: "Convert visitors into active buyers. Joy Digital builds high-speed corporate sites, custom web interfaces, and conversion-ready landing pages across the UK.",
        };
      case "ae":
        return {
          badge: "Premium Web Development Dubai",
          h1: "Website Design, Web Development & SEO Services UAE",
          subtitle: "Build ultra-speed, responsive corporate portals and headless Next.js storefronts for the UAE market backed by 9+ years of experience.",
        };
      default:
        return {
          badge: "9+ Years of Web Engineering & SEO",
          h1: "Website Design, Web Development & SEO Services Across India",
          subtitle: "Joy Digital helps startups, local businesses, and growing companies build modern websites, improve Google rankings, and generate more enquiries across India.",
        };
    }
  };

  const hero = getHeroContent();

  const SERVICES_GRID = [
    {
      icon: "fa-solid fa-laptop-code",
      title: "Website Design",
      description: "Professional, mobile-responsive web layouts for startups and corporate brands in India. We design user-centric interfaces that represent your company and convert traffic.",
      href: "/web-design-services",
      linkText: "Explore Web Design Services",
    },
    {
      icon: "fa-solid fa-code",
      title: "Web Development",
      description: "Custom React and Next.js website engineering. We build high-speed corporate portals, e-commerce storefronts, and digital platforms optimized for performance.",
      href: "/website-development",
      linkText: "Explore Website Development",
    },
    {
      icon: "fa-solid fa-magnifying-glass-chart",
      title: "SEO Services",
      description: "India-wide SEO solutions to get your business onto Google page one. We optimize speed, clean semantic code structures, and handle indexing barriers for long-term organic growth.",
      href: "/seo-services",
      linkText: "Explore SEO Services",
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Digital Marketing",
      description: "Expand your reach and attract prospects with targeted campaigns. We structure distraction-free landing pages and setup conversion tracking models to measure ROI.",
      href: "/contact",
      linkText: "Contact Joy Digital",
    },
    {
      icon: "fa-solid fa-map-location-dot",
      title: "Google Business Profile Optimization",
      description: "Dominate local search queries in your target city. We optimize GMB maps proximity, setup local citation directories, and construct review acquisition funnels.",
      href: "/google-business-profile-setup",
      linkText: "Explore Google Business Profile Setup",
    },
  ];

  // Specific Trust Section Cards (Task 3)
  const TRUST_ITEMS = [
    {
      icon: "fa-solid fa-circle-check",
      title: "Projects Completed",
      description: "100+ projects completed with clean Next.js/React frontend code for high conversion rates.",
    },
    {
      icon: "fa-solid fa-award",
      title: "Years Experience",
      description: "9+ years of digital web engineering, custom architecture audits, and organic search optimization.",
    },
    {
      icon: "fa-solid fa-magnifying-glass-chart",
      title: "SEO-Ready Websites",
      description: "Pre-configured semantic structures, absolute link canonicals, and structured local schema tagging.",
    },
    {
      icon: "fa-solid fa-headset",
      title: "Remote Support Across India",
      description: "Collaborative digital desks serving clients remotely in any city, ensuring smooth updates and launch support.",
    },
  ];

  // Portfolio Section (Task 4)
  const PORTFOLIO_PROJECTS = [
    {
      image: "/assets/images/gbp-showcase.webp",
      tag: "Google Business Profile",
      title: "Dental Clinic Patient Generation Funnel",
      desc: "Optimized local search maps placement, geotagged citation sync, and primary categorization to drive booking calls for dental practitioners.",
      metrics: "240% Enquiry Growth",
      href: "/case-studies/chennai-clinic-leads",
    },
    {
      image: "/assets/images/business-card-mockup.webp",
      tag: "Next.js & React",
      title: "Headless E-commerce Platform Migration",
      desc: "Converted a legacy slow e-commerce storefront into a serverless Next.js layout, reducing checkout shifts and improving transaction rates.",
      metrics: "40% Conversion Lift",
      href: "/case-studies/ecommerce-sales-increase",
    },
    {
      image: "/assets/images/marketing-poster-mockup.webp",
      tag: "Conversion Optimization",
      title: "SaaS Product Demo Request Landers",
      desc: "Designed and engineered interactive single-purpose product overview landing pages with prefilled fields to optimize incoming demo pipelines.",
      metrics: "180% Demo Lead Spike",
      href: "/case-studies/saas-landing-optimization",
    },
  ];

  // Testimonials Section (Task 5)
  const TESTIMONIALS = [
    {
      quote: "Joy Digital optimized our map search visibility. We now rank at the top of Google Maps in our city, and our weekly incoming calls and advisory enquiries have doubled!",
      name: "Ganesh Murugan",
      role: "LIC Financial Advisor",
      company: "Ganesan Associates (Madurai)",
      initials: "GM",
      avatarBg: "bg-blue-50 text-blue-600 border border-blue-200",
    },
    {
      quote: "We rebuilt our insurance portfolio using their Next.js template. The website loads instantly on mobile networks, and we captured over 50+ policy leads via WhatsApp in the first month.",
      name: "Chithra",
      role: "Star Health Advisor",
      company: "Independent Consultancy (Coimbatore)",
      initials: "C",
      avatarBg: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    },
    {
      quote: "Their team combined custom layouts with technical SEO. We now rank for competitive terms in our sector, bringing in continuous qualified sales leads across our target markets.",
      name: "R. Rajesh Kumar",
      role: "Retail Director",
      company: "Rajesh Retail Group (India)",
      initials: "RK",
      avatarBg: "bg-purple-50 text-purple-600 border border-purple-200",
    },
  ];

  // Cities Chips List (Task 6)
  const CITIES_SERVED = [
    { name: "Madurai", desc: "Highly optimized local search strategies, map pack rankings, and responsive landing pages for service advisors and healthcare providers in Madurai." },
    { name: "Chennai", desc: "Engineered web development, Next.js setups, and organic search campaigns for corporate brands and retail startups in Chennai." },
    { name: "Coimbatore", desc: "Custom e-commerce platforms, WooCommerce systems, and local Google Business Profile positioning for industrial and retail sectors in Coimbatore." },
    { name: "Trichy", desc: "Google Map packs optimization, local business directory sync, and fast-loading landing pages for educational and service sectors in Trichy." },
    { name: "Salem", desc: "Technical SEO consultation, responsive corporate portfolio designs, and lead capture setups for manufacturing units and retail stores in Salem." },
    { name: "Bangalore", desc: "Blazing-fast Next.js portals, headless architectures, and scalable SEO solutions for technology startups and digital brands in Bangalore." },
    { name: "Hyderabad", desc: "SEO-friendly web design, high-converting product pages, and digital marketing consulting for businesses in Hyderabad." },
    { name: "Mumbai", desc: "Corporate profile design, secure cloud hosting setups, and page ranking audits for commercial enterprises and financial services in Mumbai." },
    { name: "Pune", desc: "Product landing pages, custom database web tools, and organic visibility architectures for manufacturing and software businesses in Pune." },
    { name: "Delhi", desc: "Google Search maps packs optimizations, citation setups, and responsive corporate web portals for service companies across Delhi, Noida, and Gurgaon." },
    { name: "Ahmedabad", desc: "E-commerce web development, conversion optimization audits, and search rankings positioning for growing businesses in Ahmedabad." }
  ];

  // SEO FAQ Accordion Questions
  const HOME_FAQS = [
    {
      question: "Which areas in India do you provide services to?",
      answer: "We serve clients across India. From our base in Tamil Nadu, we collaborate remotely with startups, local businesses, and growing companies in Madurai, Chennai, Coimbatore, Bangalore, Hyderabad, Mumbai, Delhi, Ahmedabad, and other cities.",
    },
    {
      question: "How much does a custom website cost?",
      answer: "Our pricing starts at ₹15,000 for standard business sites and landing pages. E-commerce portals, complex custom web directories, and SaaS layouts are quoted based on page count, specific integrations, and API requirements.",
    },
    {
      question: "Why does Joy Digital use Next.js instead of WordPress?",
      answer: "Next.js pages are static HTML pre-rendered on global CDNs, meaning they load in under 1.5 seconds. WordPress sites rely on active database requests and heavy plugin scripts that load slow, shift layout, and have vulnerability entry points.",
    },
    {
      question: "How long does it take to launch a website?",
      answer: "A standard corporate or landing page typically takes 7 to 14 business days. Custom databases, advanced CMS platforms, and multi-category e-commerce builds average 3 to 6 weeks.",
    },
    {
      question: "Is search engine optimization (SEO) built into your sites?",
      answer: "Yes, basic technical SEO is standard. We optimize semantic tags, meta titles/descriptions, structured JSON-LD schemas, and check mobile layouts to ensure Google indexes and ranks your website cleanly.",
    },
  ];

  // FAQ Schema JSON-LD structure
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": HOME_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const handleCtaEvent = (ctaName: string) => {
    if (typeof window !== "undefined") {
      const tracker = (window as any).trackJoyDigitalEvent;
      if (typeof tracker === "function") {
        tracker("cta_click", { button_text: ctaName, location: "hero" });
      }
    }
  };

  const handleWaEvent = (location: string) => {
    if (typeof window !== "undefined") {
      const tracker = (window as any).trackJoyDigitalEvent;
      if (typeof tracker === "function") {
        tracker("whatsapp_click", { location });
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      
      <main className="bg-[#F8FAFC] text-[#0F172A] min-h-screen">
        
        {/* SECTION 1: HERO SECTION */}
        <section className="relative pt-32 lg:pt-40 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 px-4.5 py-1.5 rounded-full mb-6">
                <span className="w-2.5 h-2.5 bg-[#2563EB] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  {hero.badge}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-6 leading-tight">
                {hero.h1}
              </h1>
              
              <p className="text-sm md:text-base text-[#64748B] mb-8 max-w-xl leading-relaxed">
                {hero.subtitle}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 w-full mb-8">
                <a
                  href="#audit-section"
                  onClick={() => handleCtaEvent("Get Free Website Audit")}
                  className="bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  Get Free Website Audit
                </a>
                
                <a
                  href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I'd%20like%20to%20get%20a%20free%20consultation%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWaEvent("hero")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all flex items-center gap-2 duration-300 cursor-pointer"
                >
                  <i className="fa-brands fa-whatsapp text-lg" />
                  WhatsApp Us
                </a>
              </div>

              {/* Trust Line */}
              <div className="border-t border-[#E2E8F0] pt-5 w-full max-w-lg">
                <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Coverage footprint</p>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Based in Tamil Nadu | Serving clients across Madurai, Chennai, Coimbatore, Bangalore, Hyderabad, Mumbai, and other cities across India.
                </p>
              </div>
            </div>

            {/* Right Column Form (SaaS style glass container card) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white border border-[#E2E8F0] p-8 rounded-[24px] shadow-sm w-full max-w-md relative">
                {/* SECTION 2: HOMEPAGE LEAD FORM (Name, Mobile, Company/Business, Service, Message) */}
                <LeadForm
                  layout="vertical"
                  title="Free Website Audit"
                  subtitle="Submit your details below and our optimization team will prepare a technical review of your domain."
                  ctaText="Claim Free Audit Report"
                  source={`Homepage Hero Form - India-wide`}
                  showWebsiteField={false}
                  hideEmailField={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 (AUX): TRUSTED BY GROWING BUSINESSES */}
        <section className="py-12 bg-white border-y border-[#E2E8F0] relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest text-center mb-6">
              Trusted by growing brands and startups across India
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center opacity-75">
              {[
                { name: "APEX SaaS", icon: "fa-solid fa-cube text-[#2563EB]" },
                { name: "V-CARE CLINICS", icon: "fa-solid fa-heart-pulse text-rose-500" },
                { name: "GLOBAL EDU", icon: "fa-solid fa-graduation-cap text-emerald-500" },
                { name: "VELOCITY DEV", icon: "fa-solid fa-building text-amber-500" },
                { name: "SELECT CART", icon: "fa-solid fa-cart-shopping text-purple-500" },
              ].map((logo, index) => (
                <div key={index} className="flex items-center justify-center gap-2 py-3 px-5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] hover:border-[#64748B]/35 transition-colors shadow-sm select-none">
                  <i className={logo.icon} />
                  <span className="font-extrabold text-[11px] text-[#0F172A] tracking-wider uppercase">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: SERVICES GRID */}
        <section className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest block mb-3">
                Core Capabilities
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
                SaaS-Style Digital Services Designed for Scale
              </h2>
              <p className="text-sm text-[#64748B]">
                We build fast-loading Next.js websites, optimize local citations, and design conversion-oriented landing pages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES_GRID.map((s, idx) => (
                <article
                  key={idx}
                  className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] text-xl mb-6">
                      <i className={s.icon} />
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A] mb-3">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                      {s.description}
                    </p>
                  </div>

                  <Link
                    href={s.href}
                    className="text-xs font-bold text-[#2563EB] flex items-center gap-1.5 mt-2 transition-colors hover:text-[#3B82F6]"
                  >
                    {s.linkText} <i className="fa-solid fa-chevron-right text-[9px] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: WHY CHOOSE JOY DIGITAL (Trust cards with clean icons) */}
        <section className="py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest block mb-3">
                Why Us
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
                Why Choose Joy Digital
              </h2>
              <p className="text-sm text-[#64748B]">
                We combine search engine visibility strategies with premium-tier frameworks to drive inbound inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TRUST_ITEMS.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-[#E2E8F0] p-7 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] text-xl mb-5 group-hover:scale-105 transition-transform duration-300">
                    <i className={item.icon} />
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: PORTFOLIO / RECENT PROJECTS (Using Next.js Image Component) */}
        <section id="portfolio-section" className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest block mb-3">
                Our Work
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
                Recent Success Stories
              </h2>
              <p className="text-sm text-[#64748B]">
                See how we help businesses in India improve loading speeds, layout structures, and lead volumes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PORTFOLIO_PROJECTS.map((proj, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-[#E2E8F0] rounded-[24px] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
                >
                  <div>
                    {/* Next.js Image optimization */}
                    <div className="relative w-full h-48 bg-[#F8FAFC]">
                      <Image
                        src={proj.image}
                        alt={`${proj.title} Showcase`}
                        fill
                        sizes="(max-w-768px) 100vw, 33vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/25 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                          {proj.tag}
                        </span>
                        <span className="text-[#10B981] font-bold text-xs flex items-center gap-1">
                          <i className="fa-solid fa-arrow-trend-up" /> {proj.metrics}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-extrabold text-[#0F172A] mb-3 leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-8 py-4.5 flex justify-end">
                    <Link
                      href={proj.href}
                      className="text-xs font-bold text-[#2563EB] hover:text-[#3B82F6] flex items-center gap-1.5 transition-colors"
                    >
                      Case Details <i className="fa-solid fa-chevron-right text-[8px]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: SERVING BUSINESSES ACROSS INDIA (No Worldwide references) */}
        <section className="py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest block mb-3">
                Nationwide Footprint
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
                Serving Businesses Across India
              </h2>
              <p className="text-sm text-[#64748B]">
                We deploy localized search optimization, custom web portals, and tracking setups for businesses in major hubs.
              </p>
            </div>

            {/* City Chips Interactive Dashboard */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
                {CITIES_SERVED.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => setSelectedCity(city.name)}
                    className={`text-xs px-4.5 py-2.5 rounded-full font-bold border transition-all cursor-pointer select-none ${
                      selectedCity === city.name
                        ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/10"
                        : "bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0] hover:bg-slate-100"
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>

              {/* Selected City Content Card */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-[24px] shadow-sm text-center max-w-2xl mx-auto transition-all duration-350">
                <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest block mb-2">Active Service Desk</span>
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">Joy Digital — {selectedCity} Support</h3>
                <p className="text-xs text-[#64748B] leading-relaxed max-w-lg mx-auto">
                  {CITIES_SERVED.find(c => c.name === selectedCity)?.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FREE WEBSITE AUDIT FORM SECTION */}
        <section id="audit-section" className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content column */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  Free Assessment • No Credit Card Required
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 tracking-tight leading-tight">
                Claim Your Free <span className="text-[#2563EB]">Website & SEO Audit Report</span>
              </h2>
              
              <p className="text-sm md:text-base text-[#64748B] mb-8 leading-relaxed">
                Discover the exact technical errors and optimization issues holding your website back in search ranks. Our audit reviews:
              </p>
              
              <ul className="flex flex-col gap-4 text-xs md:text-sm text-[#64748B]">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-0.5"><i className="fa-solid fa-circle-check text-sm" /></span>
                  <div>
                    <strong>Core Web Vitals Scoring:</strong> Scan loading speeds on mobile networks and check layout shifts.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-0.5"><i className="fa-solid fa-circle-check text-sm" /></span>
                  <div>
                    <strong>Search Indexing Barriers:</strong> Review sitemaps, link canonicals, meta tags, and structured data schemas.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-0.5"><i className="fa-solid fa-circle-check text-sm" /></span>
                  <div>
                    <strong>Lead Conversion Review:</strong> Identify exit bottlenecks in contact fields and interactive buttons.
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Form column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white border border-[#E2E8F0] p-8 rounded-[24px] shadow-sm w-full max-w-md">
                <LeadForm
                  layout="vertical"
                  title="Request Technical Audit"
                  subtitle="Provide your details below. We will run speed diagnostics and send a comprehensive breakdown."
                  ctaText="Submit Audit Request"
                  source={`Homepage Bottom Form - India-wide`}
                  showWebsiteField={false}
                  hideEmailField={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: TESTIMONIALS (At least 3 client reviews) */}
        <section className="py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest block mb-3">
                Reviews
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
                What Our Clients Say
              </h2>
              <p className="text-sm text-[#64748B]">
                Read reviews from growing businesses and professional advisors partners with Joy Digital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-[20px] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <div className="flex gap-1 text-amber-500 mb-4 text-xs">
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                    </div>
                    <p className="text-xs text-[#64748B] italic leading-relaxed mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 border-t border-[#E2E8F0] pt-4 mt-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${t.avatarBg}`}>
                      {t.initials}
                    </div>
                    <div className="flex-grow text-left">
                      <span className="text-xs font-bold text-[#0F172A] block leading-tight">{t.name}</span>
                      <span className="text-[10px] text-[#64748B] block mt-0.5">{t.role} — {t.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ */}
        <section className="py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest block mb-3">
                FAQ
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-[#64748B]">
                Quick answers regarding website pricing packages, speed builds, search visibility, and our workflow.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion items={HOME_FAQS} />
            </div>
          </div>
        </section>

      </main>

      {/* SECTION 10: STRONG FOOTER WITH CONTACT DETAILS AND SERVICE AREAS */}
      <Footer />
      <StickyWidgets />
    </>
  );
}
