"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import LeadForm from "@/components/ui/LeadForm";
import Accordion from "@/components/ui/Accordion";
import CTABanner from "@/components/CTABanner";
import StrongCTA from "@/components/StrongCTA";

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
          h1: <>Professional Business Websites <span className="text-gradient">That Generate Leads</span></>,
          subtitle: "We help US businesses capture high-intent customers using ultra-fast Next.js websites, global search marketing campaigns, and conversion-optimized lead funnels backed by 9+ years of experience.",
        };
      case "uk":
        return {
          badge: "Premium Digital Growth Agency",
          h1: <>Professional Business Websites <span className="text-gradient">That Generate Leads</span></>,
          subtitle: "Convert search traffic into active buyers. Joy Digital builds high-performance corporate sites and runs organic search campaigns across the UK with 9+ years of experience.",
        };
      case "ae":
        return {
          badge: "Result-Driven Agency Dubai",
          h1: <>Professional Business Websites <span className="text-gradient">That Generate Leads</span></>,
          subtitle: "Dominate Google search rankings, optimize regional map packs, and build ultra-speed corporate and e-commerce web assets for the UAE market backed by 9+ years of experience.",
        };
      case "in":
        return {
          badge: "9+ Years of Industry Experience",
          h1: <>Professional Business Websites <span className="text-gradient">That Generate Leads</span></>,
          subtitle: "Helping businesses grow online with professional websites, SEO-ready development, and digital solutions backed by 9+ years of experience.",
        };
      default:
        return {
          badge: "9+ Years of Industry Experience",
          h1: <>Professional Business Websites <span className="text-gradient">That Generate Leads</span></>,
          subtitle: "Helping businesses grow online with professional websites, SEO-ready development, and digital solutions backed by 9+ years of experience.",
        };
    }
  };

  const getCurrencySymbol = () => {
    if (country === "in" || country === "") return "₹";
    if (country === "uk") return "£";
    if (country === "ae") return "AED ";
    return "$";
  };

  const getStartingPrice = () => {
    if (country === "in" || country === "") return "15,000";
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

  // 3. Why Choose Us (Backup or referenced points)
  const WHY_CHOOSE_ITEMS = [
    {
      icon: "fa-solid fa-tags",
      title: "Affordable Pricing",
      description: `Flexible package pricing structures for startups and growing enterprises. Premium engineering deliverables starting from ${currency}${startingPrice} without high global agency pricing.`,
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

  // 6. FAQs (6 Target FAQ Questions)
  const HOME_FAQS = [
    {
      question: `How much does a website cost?`,
      answer: `Our website solutions start from ₹15,000 for standard business sites. Custom business portals, e-commerce applications, and bespoke web platforms are priced based on page count, custom features, and third-party integrations.`,
    },
    {
      question: "How long does website development take?",
      answer: "A standard corporate website typically launches within 7 to 14 business days. Custom database web applications, API integrations, and complex e-commerce platforms average 3 to 6 weeks depending on requirements.",
    },
    {
      question: "Is hosting included in the package?",
      answer: "Yes. We assist you in setting up secure, fast cloud hosting. We configure your custom domain, SSL security certificates, and global CDN distribution so your website loads in under 1.5 seconds.",
    },
    {
      question: "Will my website work correctly on mobile devices?",
      answer: "Absolutely. Every website we build is 100% mobile responsive and thoroughly tested across iOS, Android, and tablets to ensure fluid layouts, responsive touch targets, and fast mobile loading times.",
    },
    {
      question: "Do you provide search engine optimization (SEO) services?",
      answer: "Yes, organic search engine optimization is built into our core process. Every website features clean code architecture, absolute link canonicals, meta tags, and structured JSON-LD schemas. We also provide dedicated local and global SEO plans.",
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Yes. We can migrate your outdated or slow website into a modern, fast Next.js or React framework. We ensure your existing search engine rankings are preserved while drastically boosting loading speeds and conversion rates.",
    },
  ];

  const clientLogosText = country === "in" || country === ""
    ? "Trusted by Growing Brands and Startups Globally"
    : `Trusted by Growing Companies in the ${country.toUpperCase()} & Globally`;

  const INDUSTRIES_DATA = [
    {
      name: "Hotels & Resorts",
      icon: "fa-solid fa-hotel",
      description: "Drives direct room bookings, displays property amenities, visualizes Google maps routes, and bypasses heavy third-party OTA commission fees.",
      focus: "Direct Bookings & Room Gallery"
    },
    {
      name: "Hospitals & Clinics",
      icon: "fa-solid fa-hospital-user",
      description: "Simplifies patient appointment bookings, coordinates doctor schedules, and displays clinic accreditations to build instant medical credibility.",
      focus: "Appointment Booking & Calendars"
    },
    {
      name: "Real Estate Agencies",
      icon: "fa-solid fa-house-chimney",
      description: "Display listing catalogs with premium galleries, capture property viewing schedule requests, and establish trust with local neighborhood reviews.",
      focus: "Listings Showcases & Lead Capture"
    },
    {
      name: "Insurance Agents & LIC Advisors",
      icon: "fa-solid fa-shield-halved",
      description: "Capture direct insurance policy enquiries, showcase client testimonials, and integrate direct WhatsApp consultation lines for instant lead response.",
      focus: "Policy Calculators & WhatsApp Leads"
    },
    {
      name: "Tours & Travels",
      icon: "fa-solid fa-plane-departure",
      description: "Showcases packaged tour itineraries, structures clear pricing charts, integrates review feeds, and captures customer trip planner queries.",
      focus: "Package Booking & Trip Planners"
    },
    {
      name: "Educational Institutions",
      icon: "fa-solid fa-school",
      description: "Facilitates online registration portals, shares academic circular files, and displays academic accolades to local parents and students.",
      focus: "Online Admissions & Portals"
    },
    {
      name: "Pest Control Businesses",
      icon: "fa-solid fa-bug",
      description: "Captures urgent local emergency service requests, highlights hygiene and safety certifications, and lists local treatment pricing structures.",
      focus: "Urgent Call Capture & Service Maps"
    }
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="bg-light-bg text-primary">
        
        {/* Hero Section */}
        <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden bg-light-bg">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/20 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                  {hero.badge}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-6 leading-tight">
                {hero.h1}
              </h1>
              <p className="text-sm md:text-base text-text-secondary mb-8 max-w-xl leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 w-full">
                <a
                  href="#consultation-section"
                  className="bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold text-xs px-8 py-4 rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get Free Consultation
                </a>
                <a
                  href="https://wa.me/919080026133?text=Hello%20Saravanan,%20I'd%20like%20to%20get%20a%20free%20consultation%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-md hover:-translate-y-0.5 duration-300"
                  data-wa-location="hero"
                >
                  <i className="fa-brands fa-whatsapp text-lg" />
                  WhatsApp Now
                </a>
                <a
                  href="#portfolio-section"
                  className="bg-white hover:bg-slate-50 text-primary font-bold text-xs px-8 py-4 rounded-full transition-all border border-[#E2E8F0] shadow-sm hover:-translate-y-0.5 duration-300"
                >
                  View Portfolio
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
        
        <StrongCTA location="hero" />

        {/* Client Logos Section */}
        <section className="py-10 bg-light-bg border-y border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest text-center mb-6">
              {clientLogosText}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="font-bold text-sm text-primary select-none tracking-wider">🏢 APEX SaaS</div>
              <div className="font-bold text-sm text-primary select-none tracking-wider">🏥 V-CARE CLINICS</div>
              <div className="font-bold text-sm text-primary select-none tracking-wider">🎓 GLOBAL EDU</div>
              <div className="font-bold text-sm text-primary select-none tracking-wider">🏗️ VELOCITY DEV</div>
              <div className="font-bold text-sm text-primary select-none tracking-wider">🛒 SELECT CART</div>
            </div>
          </div>
        </section>

        {/* Trust Guarantees Grid (Trust Building) - Light Premium Cards */}
        <section className="py-16 bg-light-bg border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 text-center">
              {[
                { label: "9+ Years Experience", icon: "fa-solid fa-award" },
                { label: "Affordable Pricing", icon: "fa-solid fa-tags" },
                { label: "Personalized Support", icon: "fa-solid fa-headset" },
                { label: "Mobile Responsive", icon: "fa-solid fa-mobile-screen" },
                { label: "SEO Friendly", icon: "fa-solid fa-magnifying-glass-chart" },
                { label: "Fast Delivery", icon: "fa-solid fa-bolt" },
                { label: "Ongoing Support", icon: "fa-solid fa-shield-halved" },
              ].map((g, i) => (
                <div key={i} className="flex flex-col items-center p-5 bg-light-card rounded-[20px] border border-[#E2E8F0] hover:border-primary/40 transition-all shadow-sm duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-base mb-3">
                    <i className={g.icon} />
                  </div>
                  <span className="text-[11px] font-bold text-primary leading-tight">{g.label}</span>
                </div>
              ))}
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
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
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
                  className="bg-light-card border border-[#E2E8F0] rounded-[20px] p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl mb-6">
                      <i className={service.icon} />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href={getRegionalHref(service.href)}
                    className="text-xs font-bold text-primary hover:text-primary-light flex items-center gap-1.5 mt-2 transition-colors"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More <i className="fa-solid fa-chevron-right text-[9px]" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section - Light Premium Card Layout */}
        <section id="founder-section" className="py-20 bg-light-bg border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Profile Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative bg-light-card border border-[#E2E8F0] p-8 rounded-[24px] shadow-sm w-full max-w-sm overflow-hidden text-center flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary text-4xl mb-6 shadow-sm">
                    <i className="fa-solid fa-user-tie" />
                  </div>
                  <h3 className="text-xl font-extrabold text-primary mb-1">Saravanan</h3>
                  <span className="text-xs text-accent font-bold uppercase tracking-wider mb-6">Founder & Lead Architect</span>
                  
                  <div className="grid grid-cols-2 gap-4 w-full border-t border-[#E2E8F0]/80 pt-6 mt-2">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-extrabold text-accent">9+ Years</span>
                      <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mt-1">Experience</span>
                    </div>
                    <div className="flex flex-col items-center border-l border-[#E2E8F0]/80">
                      <span className="text-2xl font-extrabold text-accent">100+</span>
                      <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mt-1">Sites Built</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Text Content */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                  Behind the Code
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-6">
                  Meet Your Website <span className="text-gradient">Development Partner</span>
                </h2>
                <div className="text-sm text-text-secondary space-y-4 mb-6 leading-relaxed">
                  <p>
                    I&apos;m Saravanan, and for over 9 years, I have been designing, developing, and optimizing high-performance websites for businesses across diverse industries. My focus is simple: <strong>websites that don&apos;t just look pretty, but actually bring in leads and customers.</strong>
                  </p>
                  <p>
                    Throughout my journey as a project development specialist and website portfolio builder, I&apos;ve worked with insurance agents, hotels, clinics, schools, and startups. I&apos;ve seen how businesses get stuck with slow, generic platforms that fail to rank on Google or capture customer trust.
                  </p>
                  <p className="font-semibold text-primary">
                    Our Mission at Joy Digital:
                  </p>
                  <p className="italic bg-light-card p-4 rounded-lg border-l-4 border-accent">
                    &ldquo;To empower small businesses, startups, and local service providers to establish a dominant online presence with premium, SEO-optimized websites at affordable pricing.&rdquo;
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 w-full">
                  <span className="bg-light-card border border-[#E2E8F0] text-primary text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-code text-accent" /> Website Portfolio Builder
                  </span>
                  <span className="bg-light-card border border-[#E2E8F0] text-primary text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-screwdriver-wrench text-accent" /> Project Development Specialist
                  </span>
                  <span className="bg-light-card border border-[#E2E8F0] text-primary text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-handshake text-accent" /> Affordable Lead Funnels
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Serve Section */}
        <section id="industries-section" className="py-20 bg-light-bg border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Industry Expertise
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
                Tailored Websites For <span className="text-gradient">High-Demand Sectors</span>
              </h2>
              <p className="text-sm text-text-secondary max-w-2xl mx-auto">
                We engineer customized, conversion-focused websites for key service sectors. Each build is optimized to attract local search traffic and capture high-intent leads.
              </p>
            </div>

            {/* Grid Layout of 7 Core Niches */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {INDUSTRIES_DATA.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-light-card border border-[#E2E8F0] rounded-[24px] p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl mb-6 flex-shrink-0">
                      <i className={item.icon} />
                    </div>
                    <span className="inline-block bg-accent/10 text-accent font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full mb-3">
                      {item.focus}
                    </span>
                    <h3 className="text-lg font-extrabold text-primary mb-3">{item.name}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-6">{item.description}</p>
                  </div>
                  <div className="border-t border-[#E2E8F0] pt-4 flex items-center justify-between mt-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Conversion Ready</span>
                    <a
                      href="#consultation-section"
                      className="text-xs font-bold text-primary hover:text-primary-light flex items-center gap-1 transition-colors"
                    >
                      Inquire Now <i className="fa-solid fa-chevron-right text-[8px]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio-section" className="py-20 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Featured Showcase
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
                Proven Lead-Generating <span className="text-gradient">Websites</span>
              </h2>
              <p className="text-sm text-text-secondary">
                Take a look at our live client portals. Engineered for lightning-fast speeds, absolute search engine visibility, and seamless WhatsApp integrations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {[
                {
                  title: "Ganesh Murugan LIC Portal",
                  url: "https://ganeshmuruganlic.vercel.app",
                  desc: "A premium, high-converting digital portal built for a top LIC & financial advisor. Integrated with direct policy inquiry forms, WhatsApp chat support, and local SEO configuration.",
                  features: ["Mobile Friendly", "Lead Generation Focused", "WhatsApp Integration", "SEO Ready", "Fast Loading"],
                  avatar: "🏢"
                },
                {
                  title: "Chithra Insurance Agent Portal",
                  url: "https://chithrainsurance.vercel.app",
                  desc: "A clean, modern lead-generation web application designed for a professional Insurance advisor. Built to load in under 1.2 seconds, securing client enquiries in real-time.",
                  features: ["Mobile Friendly", "Lead Generation Focused", "WhatsApp Integration", "SEO Ready", "Fast Loading"],
                  avatar: "👩‍💼"
                }
              ].map((proj, idx) => (
                <div key={idx} className="bg-light-card border border-[#E2E8F0] rounded-[24px] p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shadow-sm">
                        {proj.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-primary leading-tight">{proj.title}</h3>
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 mt-0.5"
                        >
                          {proj.url.replace("https://", "")} <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
                        </a>
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-6">{proj.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.features.map((f, i) => (
                        <span key={i} className="bg-slate-100 border border-slate-200/60 text-text-secondary text-[10px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-[#E2E8F0] pt-4 flex flex-wrap gap-4 items-center">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-center"
                    >
                      Visit Live Website <i className="fa-solid fa-arrow-right text-[10px]" />
                    </a>
                    <a
                      href={`https://wa.me/919080026133?text=Hello%20Saravanan,%20I%20saw%20your%20portfolio%20${encodeURIComponent(proj.title)}%20and%20want%20something%20similar.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto border border-[#E2E8F0] bg-white hover:bg-slate-50 text-primary text-xs font-bold px-5 py-3.5 rounded-full transition-all flex items-center justify-center gap-2"
                      data-wa-location="portfolio-section"
                    >
                      <i className="fa-brands fa-whatsapp text-emerald-500 text-sm" /> Same for My Business
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing-section" className="py-20 bg-light-bg border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Pricing Plans
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
                Transparent Pricing for <span className="text-gradient">Every Business Stage</span>
              </h2>
              <p className="text-sm text-text-secondary">
                Choose the package that fits your objectives. High-converting deliverables with zero hidden agency costs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              
              {/* Plan 1 */}
              <div className="bg-light-card border border-[#E2E8F0] rounded-[24px] p-8 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-lg font-extrabold text-primary mb-2">Starter Website</h3>
                  <p className="text-xs text-text-secondary mb-6 leading-relaxed">Perfect for local service providers, agents, and small business portfolios.</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl font-extrabold text-primary">₹15,000</span>
                    <span className="text-xs text-text-secondary font-semibold">one-time</span>
                  </div>

                  <ul className="flex flex-col gap-4 text-xs text-text-secondary mb-8">
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      1-5 Custom Responsive Pages
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      100% Mobile Responsive Design
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Direct WhatsApp Chat Integration
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Lead Capture & Contact Form
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Standard Local SEO Setup
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Ultra-Fast Speed Optimization
                    </li>
                  </ul>
                </div>

                <a
                  href={`https://wa.me/919080026133?text=Hello%20Saravanan,%20I'd%20like%20to%20get%20started%20with%20the%20Starter%20Website%20package.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-white hover:bg-slate-50 border border-[#E2E8F0] text-primary font-bold text-xs py-3.5 rounded-full transition-all shadow-sm"
                  data-wa-location="pricing-starter"
                >
                  Get Started on WhatsApp
                </a>
              </div>

              {/* Plan 2 */}
              <div className="bg-light-card border-2 border-primary rounded-[24px] p-8 shadow-md flex flex-col justify-between relative hover:shadow-lg transition-all scale-100 lg:scale-[1.03] z-10">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-white font-bold text-[9px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                  Most Popular
                </div>
                
                <div>
                  <h3 className="text-lg font-extrabold text-primary mb-2">Professional Website</h3>
                  <p className="text-xs text-text-secondary mb-6 leading-relaxed">Ideal for growing companies, specialized clinics, and professional firms.</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl font-extrabold text-primary">₹25,000</span>
                    <span className="text-xs text-text-secondary font-semibold">one-time</span>
                  </div>

                  <ul className="flex flex-col gap-4 text-xs text-text-secondary mb-8">
                    <li className="flex items-center gap-2.5 font-semibold text-primary">
                      <span className="text-emerald-500"><i className="fa-solid fa-circle-check" /></span>
                      Everything in Starter Plan
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Up to 10 Premium Custom Pages
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Full SEO Architecture & Schema Setup
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Advanced Lead Generation Funnel
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Google Analytics & Clicks Setup
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      1 Year Domain & Hosting Configuration
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Priority WhatsApp developer Support
                    </li>
                  </ul>
                </div>

                <a
                  href={`https://wa.me/919080026133?text=Hello%20Saravanan,%20I'd%20like%20to%20get%20started%20with%20the%20Professional%20Website%20package.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold text-xs py-3.5 rounded-full transition-all shadow-md"
                  data-wa-location="pricing-professional"
                >
                  Configure Project on WhatsApp
                </a>
              </div>

              {/* Plan 3 */}
              <div className="bg-light-card border border-[#E2E8F0] rounded-[24px] p-8 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-lg font-extrabold text-primary mb-2">Custom Business Solution</h3>
                  <p className="text-xs text-text-secondary mb-6 leading-relaxed">For businesses requiring complex databases, web applications, or custom e-commerce portal functions.</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl font-extrabold text-primary">Custom</span>
                    <span className="text-xs text-text-secondary font-semibold">quote</span>
                  </div>

                  <ul className="flex flex-col gap-4 text-xs text-text-secondary mb-8">
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Bespoke E-commerce Portal Systems
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Advanced APIs & Database Integrations
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Multi-channel Lead Routing & CRMs
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Serverless Next.js Hosting Optimization
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Unlimited Pages & Dynamic Layouts
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-500"><i className="fa-solid fa-check" /></span>
                      Monthly Maintenance & Audit Support
                    </li>
                  </ul>
                </div>

                <a
                  href="#consultation-section"
                  className="w-full text-center bg-white hover:bg-slate-50 border border-[#E2E8F0] text-primary font-bold text-xs py-3.5 rounded-full transition-all shadow-sm"
                >
                  Contact For Quote
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Why Us
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
                Built to Scale <span className="text-gradient">Your Digital Pipeline</span>
              </h2>
              <p className="text-sm text-text-secondary">
                We combine organic optimization with high-performance code frameworks to deliver measurable pipeline results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WHY_CHOOSE_ITEMS.map((item, index) => (
                <div key={index} className="flex gap-4 items-start bg-light-card p-6 rounded-[20px] border border-[#E2E8F0]">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-base flex-shrink-0">
                    <i className={item.icon} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-light-bg border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Success Stories
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
                Real Results for <span className="text-gradient">Real Brands</span>
              </h2>
              <p className="text-sm text-text-secondary">
                See how we help SaaS companies, localized clinics, and e-commerce stores grow their qualified customer pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {CASE_STUDIES.map((study, index) => (
                <article key={index} className="bg-light-card border border-[#E2E8F0] rounded-[20px] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="bg-white border border-[#E2E8F0] p-6 rounded-[16px] text-center mb-6 shadow-sm">
                      <span className="text-3xl font-extrabold text-[#2563EB] block">{study.metrics}</span>
                      <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">{study.tag}</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{study.tag}</span>
                    <h3 className="text-base font-bold text-primary mt-2 mb-3 leading-tight">
                      {study.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-6">
                      {study.desc}
                    </p>
                  </div>
                  <Link
                    href={study.href}
                    className="text-xs font-bold text-primary hover:text-primary-light flex items-center gap-1 mt-2 transition-colors"
                  >
                    Read Case Study <i className="fa-solid fa-chevron-right text-[8px]" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <StrongCTA location="case studies section" />

        {/* Testimonials Section */}
        <section className="py-20 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Reviews
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
                What Our Clients Say
              </h2>
              <p className="text-sm text-text-secondary">
                Read how global companies scale their customer signups and visibility working with Joy Digital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="bg-light-card border border-[#E2E8F0] p-8 rounded-[20px] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
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
                  <div className="flex flex-col border-t border-[#E2E8F0] pt-4">
                    <span className="text-xs font-bold text-primary">{t.name}</span>
                    <span className="text-[10px] text-text-muted">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Focus Section based on Country */}
        <section className="py-20 bg-light-bg border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            {country === "in" || country === "" ? (
              <div className="flex flex-col items-start justify-center text-left">
                <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Maps & Local Traffic</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-6">
                  Google Business Profile Optimization
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Appearing in Google Maps pack listings for regional queries is key to attracting local pipeline leads. We configure target categorization, metadata tags, geotagged content uploads, and review capture methods to outrank local competitors.
                </p>
                <Link
                  href="/google-business-profile-setup"
                  className="bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all shadow-md hover:-translate-y-0.5 duration-300"
                >
                  Explore Maps Optimization
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-start justify-center text-left">
                <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Global CRO & Funnel Strategy</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-6">
                  Conversion Rate Optimization (CRO)
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Traffic is worthless if it doesn&apos;t convert. We engineer interactive form logic, optimize button sizing, speed up load events, and track user scroll depth to turn passive visitors into sales pipeline leads.
                </p>
                <Link
                  href={getRegionalHref("/contact")}
                  className="bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all shadow-md hover:-translate-y-0.5 duration-300"
                >
                  Optimize My Funnel
                </Link>
              </div>
            )}

            {/* Right graphic mockup */}
            <div className="flex justify-center relative min-h-[300px] w-full items-center">
              <div className="bg-light-card border border-[#E2E8F0] p-8 rounded-[20px] shadow-sm relative z-10 w-full max-w-sm text-center">
                {country === "in" || country === "" ? (
                  <>
                    <div className="text-[#2563EB] text-5xl mb-4 leading-none"><i className="fa-solid fa-map-location-dot" /></div>
                    <h4 className="text-base font-bold text-primary mb-2">Google Map Pack Strategy</h4>
                    <p className="text-xs text-text-secondary mb-4 leading-relaxed">Geotagging, citation sync, primary categories, review capture, and proximity targeting.</p>
                  </>
                ) : (
                  <>
                    <div className="text-[#2563EB] text-5xl mb-4 leading-none"><i className="fa-solid fa-filter" /></div>
                    <h4 className="text-base font-bold text-primary mb-2">Conversion Funnel Blueprint</h4>
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

        {/* Free Website Consultation Form / Bottom Lead Gen Section */}
        <section id="consultation-section" className="py-20 bg-light-bg border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Information */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/20 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                  No Cost • Limited Slots Available
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 tracking-tight leading-tight">
                Claim Your Free <span className="text-gradient">Website & SEO Consultation</span>
              </h2>
              <p className="text-sm md:text-base text-text-secondary mb-8 leading-relaxed">
                Let&apos;s map out a customized digital solution to grow your business online. During this free 15-minute consultation, founder Saravanan will personally analyze:
              </p>
              
              <ul className="flex flex-col gap-4 text-xs md:text-sm text-text-secondary mb-4 w-full">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-0.5"><i className="fa-solid fa-circle-check text-sm" /></span>
                  <div>
                    <strong>Conversion Funnel Gaps:</strong> Discover why visitors exit without filling out forms or calling.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-0.5"><i className="fa-solid fa-circle-check text-sm" /></span>
                  <div>
                    <strong>SEO Structure Check:</strong> Review target keywords, schemas, and indexing barriers.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-0.5"><i className="fa-solid fa-circle-check text-sm" /></span>
                  <div>
                    <strong>Speed & Mobile Audits:</strong> Scan layouts on mobile networks to identify rendering bottlenecks.
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column Consultation Form */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <LeadForm
                layout="vertical"
                title="Book My Consultation"
                subtitle="Fill in the fields below, and we will schedule your free 15-minute digital consultation."
                ctaText="Book Free Consultation Now"
                source={`Homepage Bottom Consultation Form - Region: ${country || "global"}`}
                showWebsiteField={true}
              />
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
        <section className="py-20 bg-light-bg border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Support
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-4">
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
