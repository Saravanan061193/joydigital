"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import LeadForm from "@/components/ui/LeadForm";
import Accordion from "@/components/ui/Accordion";
import CTABanner from "@/components/CTABanner";

interface HomePageComponentProps {
  country: string; // "us", "uk", "ae", "in", or "" (Global)
}

export default function HomePageComponent({ country }: HomePageComponentProps) {
  const getRegionalHref = (path: string) => {
    const localizedPaths = ["/", "/seo-services", "/website-development", "/contact"];
    if (localizedPaths.includes(path)) {
      if (country === "") return path;
      return `/${country}${path === "/" ? "" : path}`;
    }
    return path;
  };

  // 1. Dynamic Content Configurations
  const getHeroContent = () => {
    switch (country) {
      case "us":
        return {
          badge: "Enterprise Growth Partner",
          h1: <>Scale Your Organic Sales with High-Performance <span className="text-gradient">SEO & Web Development</span></>,
          subtitle: "We help US businesses capture high-intent customers using ultra-fast Next.js websites, global search marketing campaigns, and conversion-optimized lead funnels.",
        };
      case "uk":
        return {
          badge: "Premium Digital Growth Agency",
          h1: <>Custom Web Development & Professional <span className="text-gradient">SEO Services for UK Brands</span></>,
          subtitle: "Convert search traffic into active buyers. Joy Digital builds high-performance corporate sites and runs compliant organic search campaigns across the United Kingdom.",
        };
      case "ae":
        return {
          badge: "Result-Driven Agency Dubai",
          h1: <>High-Performance SEO & Web Design <span className="text-gradient">Agency in Dubai & UAE</span></>,
          subtitle: "Dominate Google search rankings, optimize regional map packs, and build ultra-speed corporate and e-commerce web assets for the competitive UAE market.",
        };
      case "in":
        return {
          badge: "India's Leading SEO & Web Agency",
          h1: <>Rank #1 on Google with Custom Web Dev & <span className="text-gradient">SEO Agency India</span></>,
          subtitle: "Joy Digital delivers growth-focused website development, Google Maps local optimization, and corporate branding packages for ambitious businesses in India.",
        };
      default:
        return {
          badge: "Result-Driven Digital Agency",
          h1: <>High-Performance Website Design & <span className="text-gradient">Global SEO Growth Agency</span></>,
          subtitle: "We engineer fast-loading Next.js corporate websites and execute result-driven SEO campaigns to scale your digital leads and revenue globally.",
        };
    }
  };

  const getCurrencySymbol = () => {
    if (country === "in") return "₹";
    if (country === "uk") return "£";
    if (country === "ae") return "AED ";
    return "$";
  };

  const getStartingPrice = () => {
    if (country === "in") return "15,000";
    if (country === "uk") return "750";
    if (country === "ae") return "3,500";
    return "1,000";
  };

  const hero = getHeroContent();
  const currency = getCurrencySymbol();
  const startingPrice = getStartingPrice();

  // 2. Localized Services List
  const HOME_SERVICES = [
    {
      icon: "fa-solid fa-laptop-code",
      title: "Website Design & Dev",
      description: `High-performance, secure, fast-loading, and mobile-responsive business sites. Target top speed scores and maximum conversion rates in your local market.`,
      href: "/website-development",
    },
    {
      icon: "fa-solid fa-magnifying-glass",
      title: "Performance SEO Services",
      description: `Target high-intent organic search queries nationally or globally. Build authoritative backlink profiles and optimized, crawler-friendly code schemas.`,
      href: "/seo-services",
    },
    {
      icon: "fa-solid fa-funnel-dollar",
      title: "Lead Generation Funnels",
      description: "Convert basic web traffic into qualified corporate pipeline leads. Deployed with multi-step interactive scripts, exit intent triggers, and CRM workflows.",
      href: "/contact",
    },
    {
      icon: "fa-solid fa-share-nodes",
      title: "Social Media Marketing",
      description: "Engage your audience, build brand visibility, and manage ROI-driven lead acquisition campaigns on Instagram, LinkedIn, and Facebook.",
      href: "/social-media-marketing",
    },
    {
      icon: "fa-solid fa-pen-nib",
      title: "Logo & Brand Design",
      description: "Create memorable corporate logos, premium brand style boards, assets, and typography configurations for growing startups.",
      href: "/logo-design-services",
    },
    {
      icon: "fa-solid fa-map-location-dot",
      title: "Local SEO & Map Pack",
      description: "Appear in Google Maps local search listings. Professional profile setups, Google reviews collection shortcuts, and localized citation building.",
      href: "/google-business-profile-setup",
    },
  ];

  // 3. Why Choose Us
  const WHY_CHOOSE_ITEMS = [
    {
      icon: "fa-solid fa-tags",
      title: "Affordable Pricing",
      description: `Flexible package pricing structures for startups and growing enterprises. Premium engineering deliverables without high global agency pricing.`,
    },
    {
      icon: "fa-solid fa-bolt",
      title: "Ultra-Fast Delivery",
      description: "We organize development sprints to deliver custom web drafts and launch layouts ahead of schedule, with zero compromise on codebase health.",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Next.js Security & Speed",
      description: "We bypass slow databases and server vulnerabilities by building headless sites that load under 1.5 seconds and score 95+ on Core Web Vitals.",
    },
    {
      icon: "fa-solid fa-search",
      title: "SEO-Ready Architecture",
      description: "Every page is built with structured JSON-LD schemas, absolute link canonicals, meta fields, and fast HTML markup to boost indexation.",
    },
    {
      icon: "fa-solid fa-headset",
      title: "Dedicated Support Lines",
      description: "Direct Slack or WhatsApp developer communications. We monitor hosting, security certificates, and core backups to keep your platform secure.",
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Lead-Focused Engineering",
      description: "We don't build passive online portfolios. Every screen is optimized with interactive forms, distinct calls-to-action, and lead tracking.",
    },
  ];

  // 4. Case Studies
  const CASE_STUDIES = [
    {
      metrics: "240% Growth",
      tag: "Local SEO & GBP",
      title: "Dental Clinic Patient Lead Strategy",
      desc: "Optimized regional search presence and local business indicators to rank in Google Maps top spots, driving call clicks and online appointments.",
      href: "/case-studies/madurai-clinic-leads",
    },
    {
      metrics: "40% Conversion Lift",
      tag: "Next.js Rebuild & CRO",
      title: "Headless E-commerce Platform Launch",
      desc: "Migrated a legacy WooCommerce portal into a headless Next.js build. Reduced layout shifts to 0.05, cutting cart abandonment rates by 40%.",
      href: "/case-studies/ecommerce-sales-increase",
    },
    {
      metrics: "180% Lead Spike",
      tag: "Landing Page Engineering",
      title: "Global SaaS Sign-up Funnel Optimization",
      desc: "Designed a distraction-free sales landing page, featuring interactive lead generation scripts, increasing product demo request conversions.",
      href: "/case-studies/saas-landing-optimization",
    },
  ];

  // 5. Testimonials
  const TESTIMONIALS = [
    {
      stars: 5,
      quote: "Joy Digital optimized our regional map listings. Within weeks, we achieved page 1 rankings, and our monthly incoming business inquiries doubled! Their strategy is highly practical.",
      name: "Marcus Sterling",
      role: "SaaS Founder, USA",
    },
    {
      stars: 5,
      quote: "We rebuilt our corporate platform using their headless Next.js framework. The site speeds are blazing fast, and our customer signups increased by 40% with zero ad spend adjustments.",
      name: "Elizabeth Thorne",
      role: "Marketing Lead, UK",
    },
    {
      stars: 5,
      quote: "Their team combined custom interface layouts with rigorous technical SEO. We now rank for competitive terms across the UAE, bringing in continuous qualified sales leads.",
      name: "Faisal Bin Al-Maktoum",
      role: "Operations Director, Dubai",
    },
  ];

  // 6. FAQs
  const HOME_FAQS = [
    {
      question: `What is the cost of website development and SEO?`,
      answer: `Project scopes are customized based on page structures and integrations. Joy Digital offers starting service packages from ${currency}${startingPrice}/month, tailoring features to match your exact business growth budget.`,
    },
    {
      question: "How long does custom Next.js development take?",
      answer: "A standard corporate site typically launches within 7 to 14 business days. Custom database web applications, API integrations, and e-commerce platforms average 3 to 6 weeks depending on the complexity.",
    },
    {
      question: "Why do you use Next.js instead of WordPress?",
      answer: "WordPress sites suffer from speed bottlenecks due to plugins, hosting database calls, and vulnerable source code. Next.js produces static HTML files, rendering immediately, securing data, and maximizing Google rankings.",
    },
    {
      question: "What is the timeline to see SEO results?",
      answer: "Technical onsite code fixes and metadata edits can improve indexation speed and impressions within 30 days. Targeting highly competitive industrial queries and growing backlinks typically takes 3 to 6 months.",
    },
    {
      question: "Do you provide direct post-launch maintenance?",
      answer: "Yes. Joy Digital offers direct technical support packages covering regular backups, domain configurations, security patches, schema updates, and performance optimization checks.",
    },
  ];

  const clientLogosText = country === "in" || country === ""
    ? "Trusted by Growing Brands and Startups Globally"
    : `Trusted by Growing Companies in the ${country.toUpperCase()} & Globally`;

  return (
    <>
      <Header />
      <main>
        
        {/* Hero Section */}
        <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full mb-6 animate-pulse">
                <span className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-xs font-bold text-accent-dark uppercase tracking-wider">
                  {hero.badge}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-6 leading-tight">
                {hero.h1}
              </h1>
              <p className="text-sm md:text-base text-text-secondary mb-8 max-w-xl leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 w-full">
                <Link
                  href={getRegionalHref("/contact")}
                  className="bg-gradient-to-r from-accent to-accent-light text-white font-bold text-sm px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Configure My Project
                </Link>
                <a
                  href="https://wa.me/919080026133"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-light-bg hover:bg-gray-200 text-primary-dark font-bold text-sm px-8 py-3.5 rounded-lg transition-all flex items-center gap-2 border border-gray-200"
                >
                  <span className="text-whatsapp-green"><i className="fa-brands fa-whatsapp text-lg" /></span>
                  WhatsApp Strategy Line
                </a>
              </div>
            </div>

            {/* Hero Form */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <LeadForm
                layout="vertical"
                title="Get Free Performance Audit"
                subtitle="Fill in the fields below, and our search optimization experts will contact you with a performance report."
                ctaText="Claim Free Audit Report"
                source={`Homepage Hero Audit Form - Region: ${country || "global"}`}
                showWebsiteField={true}
              />
            </div>
          </div>
        </section>

        {/* Client Logos Section */}
        <section className="py-10 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest text-center mb-6">
              {clientLogosText}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="font-bold text-sm text-primary-dark select-none tracking-wider">🏢 APEX SaaS</div>
              <div className="font-bold text-sm text-primary-dark select-none tracking-wider">🏥 V-CARE CLINICS</div>
              <div className="font-bold text-sm text-primary-dark select-none tracking-wider">🎓 GLOBAL EDU</div>
              <div className="font-bold text-sm text-primary-dark select-none tracking-wider">🏗️ VELOCITY DEV</div>
              <div className="font-bold text-sm text-primary-dark select-none tracking-wider">🛒 SELECT CART</div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Core Capabilities
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Conversion-Focused <span className="text-gradient">Digital Solutions</span>
              </h2>
              <p className="text-sm text-text-secondary">
                We engineer speed-optimized layouts, technical sitemaps, and data routing to capture commercial search keywords.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {HOME_SERVICES.map((service, index) => (
                <article
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent-dark text-xl mb-6">
                      <i className={service.icon} />
                    </div>
                    <h3 className="text-lg font-bold text-primary-dark mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href={getRegionalHref(service.href)}
                    className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 mt-2"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More <i className="fa-solid fa-chevron-right text-[9px]" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Why Us
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Built to Scale <span className="text-gradient">Your Digital Pipeline</span>
              </h2>
              <p className="text-sm text-text-secondary">
                We combine organic optimization with high-performance code frameworks to deliver measurable pipeline results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WHY_CHOOSE_ITEMS.map((item, index) => (
                <div key={index} className="flex gap-4 items-start bg-light-bg/50 p-6 rounded-2xl border border-gray-100/50">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent-dark text-base flex-shrink-0">
                    <i className={item.icon} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-primary-dark mb-2">{item.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Success Stories
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Real Results for <span className="text-gradient">Real Brands</span>
              </h2>
              <p className="text-sm text-text-secondary">
                See how we help SaaS companies, localized clinics, and e-commerce stores grow their qualified customer pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {CASE_STUDIES.map((study, index) => (
                <article key={index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="bg-primary-dark text-white p-6 rounded-xl text-center mb-6">
                      <span className="text-3xl font-extrabold text-accent block">{study.metrics}</span>
                      <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{study.tag}</span>
                    </div>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{study.tag}</span>
                    <h3 className="text-base font-bold text-primary-dark mt-2 mb-3 leading-tight">
                      {study.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-6">
                      {study.desc}
                    </p>
                  </div>
                  <Link
                    href={study.href}
                    className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1 mt-2"
                  >
                    Read Case Study <i className="fa-solid fa-chevron-right text-[8px]" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Reviews
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                What Our Clients Say
              </h2>
              <p className="text-sm text-text-secondary">
                Read how global companies scale their customer signups and visibility working with Joy Digital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="bg-light-bg border border-gray-100 p-8 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex gap-1 text-yellow-500 mb-4 text-xs">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star" />
                      ))}
                    </div>
                    <p className="text-xs text-text-secondary italic leading-relaxed mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex flex-col border-t border-gray-200/50 pt-4">
                    <span className="text-xs font-bold text-primary-dark">{t.name}</span>
                    <span className="text-[10px] text-text-muted">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Focus Section based on Country */}
        <section className="py-20 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            {country === "in" || country === "" ? (
              <div className="flex flex-col items-start justify-center text-left">
                <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Maps & Local Traffic</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary-dark mb-6">
                  Google Business Profile Optimization
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Appearing in Google Maps pack listings for regional queries is key to attracting local pipeline leads. We configure target categorization, metadata tags, geotagged content uploads, and review capture methods to outrank local competitors.
                </p>
                <Link
                  href="/google-business-profile-setup"
                  className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-6 py-3 rounded-lg transition-all"
                >
                  Explore Maps Optimization
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-start justify-center text-left">
                <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Global CRO & Funnel Strategy</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary-dark mb-6">
                  Conversion Rate Optimization (CRO)
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Traffic is worthless if it doesn&apos;t convert. We engineer interactive form logic, optimize button sizing, speed up load events, and track user scroll depth to turn passive visitors into sales pipeline leads.
                </p>
                <Link
                  href={getRegionalHref("/contact")}
                  className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-6 py-3 rounded-lg transition-all"
                >
                  Optimize My Funnel
                </Link>
              </div>
            )}

            {/* Right graphic mockup */}
            <div className="flex justify-center relative min-h-[300px] w-full items-center">
              <div className="absolute w-64 h-64 bg-accent/10 rounded-full blur-2xl animate-pulse-ring" />
              <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-lg relative z-10 w-full max-w-sm text-center">
                {country === "in" || country === "" ? (
                  <>
                    <div className="text-accent text-5xl mb-4 leading-none"><i className="fa-solid fa-map-location-dot" /></div>
                    <h4 className="text-base font-bold text-primary-dark mb-2">Google Map Pack Strategy</h4>
                    <p className="text-xs text-text-secondary mb-4 leading-relaxed">Geotagging, citation sync, primary categories, review capture, and proximity targeting.</p>
                  </>
                ) : (
                  <>
                    <div className="text-accent text-5xl mb-4 leading-none"><i className="fa-solid fa-filter" /></div>
                    <h4 className="text-base font-bold text-primary-dark mb-2">Conversion Funnel Blueprint</h4>
                    <p className="text-xs text-text-secondary mb-4 leading-relaxed">Interactive inputs, conditional lead scoring, speed hooks, and exit-intent capture.</p>
                  </>
                )}
                <div className="flex justify-center gap-1.5 text-yellow-500 text-xs">
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Global CTA */}
        <CTABanner
          title="Accelerate Your Digital Marketing Performance Today"
          description={`Schedule a 15-minute consulting call with our search specialists to identify code updates and search optimization goals for your website.`}
          primaryCtaText="Claim Free Consultation"
          source={`Homepage Bottom CTABanner - Region: ${country || "global"}`}
        />

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Support
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-text-secondary">
                Find answers about project timelines, design deliverables, or ranking processes.
              </p>
            </div>

            <Accordion items={HOME_FAQS} />
          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
