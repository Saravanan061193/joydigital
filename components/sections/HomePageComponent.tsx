"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import StrongCTA from "@/components/StrongCTA";

// Dynamically imported below-the-fold components
const Footer = dynamic(() => import("@/components/layout/Footer"));
const StickyWidgets = dynamic(() => import("@/components/ui/StickyWidgets"), { ssr: false });
const LeadForm = dynamic(() => import("@/components/ui/LeadForm"));
const Accordion = dynamic(() => import("@/components/ui/Accordion"));
const CTABanner = dynamic(() => import("@/components/CTABanner"));

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
];

interface HomePageComponentProps {
  country: string; // "us", "uk", "ae", "in", or "" (Global)
}

export default function HomePageComponent({ country }: HomePageComponentProps) {
  const [selectedCurrency, setSelectedCurrency] = React.useState(country || "in");

  const getDefaultCountryCode = (c: string) => {
    switch (c) {
      case "us": return "+1";
      case "uk": return "+44";
      case "ae": return "+971";
      case "in": return "+91";
      default: return "+91";
    }
  };

  const [selectedCountryCode, setSelectedCountryCode] = React.useState(() => getDefaultCountryCode(country));

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
          h1: <>Web Design & Global SEO Agency <span className="text-gradient">USA</span></>,
          subtitle: "We help US businesses capture high-intent customers using ultra-fast Next.js websites, global search marketing campaigns, and conversion-optimized lead funnels backed by 9+ years of experience.",
        };
      case "uk":
        return {
          badge: "Premium Digital Growth Agency",
          h1: <>Web Design & SEO Services <span className="text-gradient">UK</span></>,
          subtitle: "Convert search traffic into active buyers. Joy Digital builds high-performance corporate sites and runs organic search campaigns across the UK with 9+ years of experience.",
        };
      case "ae":
        return {
          badge: "Result-Driven Agency Dubai",
          h1: <>Web Development & Performance SEO <span className="text-gradient">UAE</span></>,
          subtitle: "Dominate Google search rankings, optimize regional map packs, and build ultra-speed corporate and e-commerce web assets for the UAE market backed by 9+ years of experience.",
        };
      case "in":
        return {
          badge: "9+ Years of Industry Experience",
          h1: <>Website Design & SEO Company <span className="text-gradient">India</span></>,
          subtitle: "Helping businesses grow online with professional websites, SEO-ready development, and digital solutions backed by 9+ years of experience.",
        };
      default:
        return {
          badge: "9+ Years of Industry Experience",
          h1: <>#1 Website Development & <span className="text-gradient">Web Design Agency in Chennai</span></>,
          subtitle: "Looking for a leading website development company in Chennai? We build high-speed Next.js websites & offer affordable web design services to boost leads.",
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

  const getPricingPlans = () => {
    switch (selectedCurrency) {
      case "us":
        return {
          starter: { price: "1,000", currency: "$" },
          professional: { price: "1,800", currency: "$" },
        };
      case "uk":
        return {
          starter: { price: "750", currency: "£" },
          professional: { price: "1,400", currency: "£" },
        };
      case "ae":
        return {
          starter: { price: "3,500", currency: "AED " },
          professional: { price: "6,000", currency: "AED " },
        };
      case "in":
      default:
        return {
          starter: { price: "15,000", currency: "₹" },
          professional: { price: "25,000", currency: "₹" },
        };
    }
  };

  const hero = getHeroContent();
  const currency = getCurrencySymbol();
  const startingPrice = getStartingPrice();
  const pricingPlans = getPricingPlans();

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
      href: "/case-studies/chennai-clinic-leads",
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
      quote: "Joy Digital optimized our local map search. We now rank at the top of Google Maps in Chennai, and our monthly incoming calls and insurance inquiries have doubled! Their strategy is highly practical.",
      name: "Ganesh Murugan",
      role: "LIC Financial Advisor",
      company: "Ganesan Associates",
      avatarBg: "bg-blue-100 text-blue-600",
      initials: "GM",
      linkedin: "https://www.linkedin.com/in/saravanan-joydigital/"
    },
    {
      stars: 5,
      quote: "We rebuilt our insurance portfolio using their headless Next.js framework. The site loads instantly, and we have captured over 50+ qualified policy leads via WhatsApp in the first month.",
      name: "Chithra",
      role: "Star Health Advisor",
      company: "Independent Consultancy",
      avatarBg: "bg-emerald-100 text-emerald-600",
      initials: "C",
      linkedin: "https://www.linkedin.com/in/saravanan-joydigital/"
    },
    {
      stars: 5,
      quote: "Their team combined custom interface layouts with rigorous technical SEO. We now rank for competitive terms in our sector, bringing in continuous qualified sales leads.",
      name: "R. Rajesh Kumar",
      role: "Retail Director",
      company: "Rajesh Retail Group",
      avatarBg: "bg-purple-100 text-purple-600",
      initials: "RK",
      linkedin: "https://www.linkedin.com/in/saravanan-joydigital/"
    },
  ];

  // 6. FAQs (9 FAQ Questions)
  const HOME_FAQS = [
    {
      question: "How much does a custom website design cost in Chennai?",
      answer: "A custom website design in Chennai starts from ₹15,000 for a starter business landing page. Custom website development projects, complex e-commerce portals, and enterprise web solutions are priced based on the page count, custom features, API integrations, and ongoing technical support needs.",
    },
    {
      question: "Why is Next.js better than traditional WordPress for local SEO?",
      answer: "Next.js websites load under 1.5 seconds and score 95+ on Core Web Vitals, which is a major Google ranking factor. Unlike legacy WordPress, Next.js generates static HTML pre-rendered on global CDNs, has no heavy databases or plugins to hack, and outputs clean, semantic code with optimized meta tags and structured local schemas for local search maps ranking.",
    },
    {
      question: "How fast should a corporate website load to rank on Google?",
      answer: "A corporate website should ideally load in under 2 seconds. According to Google speed guidelines, any site loading slower than 3 seconds suffers from high mobile bounce rates, directly harming organic search visibility. Building websites with modern frameworks like React and Next.js ensures maximum speed and lower bounce rates.",
    },
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
      description: "We are a premier clinic and hospital website design agency chennai, simplifying patient appointment bookings, coordinating doctor schedules, and displaying clinic accreditations to build instant credibility.",
      focus: "Appointment Booking & Calendars"
    },
    {
      name: "Real Estate Agencies",
      icon: "fa-solid fa-house-chimney",
      description: "As a leading real estate website design company in tamil nadu, we display listings showcases with premium galleries, capture property viewings, and establish local neighborhood trust.",
      focus: "Listings Showcases & Lead Capture"
    },
    {
      name: "Insurance Agents & LIC Advisors",
      icon: "fa-solid fa-shield-halved",
      description: "Specializing in insurance agent website development chennai. Capture policy enquiries, showcase advisor achievements, and integrate direct WhatsApp chat lines.",
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
      <main className="bg-light-bg text-text-primary">
        
        {/* Hero Section */}
        <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden bg-light-bg">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/20 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                  {hero.badge}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-6 leading-tight">
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
                  className="bg-white hover:bg-slate-50 text-text-primary font-bold text-xs px-8 py-4 rounded-full transition-all border border-[#E5E7EB] shadow-sm hover:-translate-y-0.5 duration-300"
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
        <section className="py-12 bg-white border-y border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest text-center mb-6">
              {clientLogosText}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
              {[
                { name: "APEX SaaS", icon: "fa-solid fa-cube text-[#2563EB]" },
                { name: "V-CARE CLINICS", icon: "fa-solid fa-heart-pulse text-[#EF4444]" },
                { name: "GLOBAL EDU", icon: "fa-solid fa-graduation-cap text-[#10B981]" },
                { name: "VELOCITY DEV", icon: "fa-solid fa-building text-[#F97316]" },
                { name: "SELECT CART", icon: "fa-solid fa-cart-shopping text-[#8B5CF6]" },
              ].map((logo, index) => (
                <div key={index} className="flex items-center justify-center gap-2 py-3 px-5 bg-[#FAFAFA] rounded-xl border border-gray-100 hover:border-gray-200 transition-colors shadow-sm select-none">
                  <i className={logo.icon} />
                  <span className="font-extrabold text-[11px] text-text-primary tracking-wider uppercase">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Guarantees Grid (Trust Building) - Light Premium Cards */}
        <section className="py-16 bg-white border-b border-[#E5E7EB]">
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
                <div key={i} className="flex flex-col items-center p-5 bg-white rounded-[20px] border border-[#E5E7EB] hover:border-accent/40 hover:shadow-md transition-all shadow-sm duration-300">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold text-base mb-3">
                    <i className={g.icon} />
                  </div>
                  <span className="text-[11px] font-bold text-text-primary leading-tight">{g.label}</span>
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
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-4">
                Custom Web Development Services <span className="text-gradient">in Chennai</span>
              </h2>
              <p className="text-sm text-text-secondary">
                We engineer speed-optimized layouts, technical sitemaps, and data routing to capture commercial search keywords.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {HOME_SERVICES.map((service, index) => (
                <article
                  key={index}
                  className="bg-light-card border border-[#E5E7EB] hover:border-primary/20 rounded-[24px] p-8 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <i className={service.icon} />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href={getRegionalHref(service.href)}
                    className="text-xs font-bold text-primary group-hover:text-accent flex items-center gap-1.5 mt-2 transition-colors"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More <i className="fa-solid fa-chevron-right text-[9px] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section - Light Premium Card Layout */}
        <section id="founder-section" className="py-20 bg-white border-t border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Profile Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative bg-white border border-[#E5E7EB] p-8 rounded-[24px] shadow-md w-full max-w-sm overflow-hidden text-center flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#2563EB]/10 to-accent/20 border-2 border-accent/30 flex items-center justify-center text-accent text-4xl mb-4 shadow-sm relative group">
                    <i className="fa-solid fa-user-tie" />
                  </div>
                  <h3 className="text-xl font-extrabold text-text-primary mb-1">Saravanan L</h3>
                  <span className="text-xs text-accent font-bold uppercase tracking-wider mb-3">Founder & Lead Architect</span>
                  
                  <a
                    href="https://www.linkedin.com/in/saravanan-joydigital/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-accent transition-colors font-medium mb-6"
                  >
                    <i className="fa-brands fa-linkedin text-sm" /> View LinkedIn Profile
                  </a>
                  
                  <div className="grid grid-cols-2 gap-4 w-full border-t border-[#E5E7EB] pt-6 mt-2">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-extrabold text-accent">9+ Years</span>
                      <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mt-1">Experience</span>
                    </div>
                    <div className="flex flex-col items-center border-l border-[#E5E7EB]">
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
                <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-6">
                  Meet Your Website <span className="text-gradient">Development Partner</span>
                </h2>
                <div className="text-sm text-text-secondary space-y-4 mb-6 leading-relaxed">
                  <p>
                    I&apos;m Saravanan, and for over 9 years, I have been designing, developing, and optimizing high-performance websites for businesses across diverse industries. My focus is simple: <strong>websites that don&apos;t just look pretty, but actually bring in leads and customers.</strong>
                  </p>
                  <p>
                    Throughout my journey as a project development specialist and website portfolio builder, I&apos;ve worked with insurance agents, hotels, clinics, schools, and startups. I&apos;ve seen how businesses get stuck with slow, generic platforms that fail to rank on Google or capture customer trust.
                  </p>
                  <p className="font-semibold text-text-primary">
                    Our Mission at Joy Digital:
                  </p>
                  <p className="italic bg-light-bg p-4 rounded-lg border-l-4 border-accent shadow-sm">
                    &ldquo;To empower small businesses, startups, and local service providers to establish a dominant online presence with premium, SEO-optimized websites at affordable pricing.&rdquo;
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 w-full">
                  <span className="bg-white border border-[#E5E7EB] text-text-secondary text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-code text-accent" /> Website Portfolio Builder
                  </span>
                  <span className="bg-white border border-[#E5E7EB] text-text-secondary text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-screwdriver-wrench text-accent" /> Project Development Specialist
                  </span>
                  <span className="bg-white border border-[#E5E7EB] text-text-secondary text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-handshake text-accent" /> Affordable Lead Funnels
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Magnet / Company Profile Download Section */}
        <section className="py-20 bg-white border-y border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
              <div className="lg:col-span-7 text-left">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                  Free Resource
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-6">
                  Download Our <span className="text-gradient">Company Profile & Tech Guide</span>
                </h2>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-6">
                  Learn how we build high-speed Next.js websites, optimize local SEO profiles, and configure lead tracking. Our company brochure includes detailed case studies, client reviews, tech integrations list, and transparent pricing packages.
                </p>
                <div className="flex flex-col gap-3 mb-6 text-xs text-[#4B5563]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-500 text-sm"><i className="fa-solid fa-circle-check" /></span>
                    <span>Complete Agency Pricing and Packages Breakdown</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-500 text-sm"><i className="fa-solid fa-circle-check" /></span>
                    <span>Our High-Performance Tech Stack Specification Sheet</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-500 text-sm"><i className="fa-solid fa-circle-check" /></span>
                    <span>Step-by-Step 90-Day local SEO Action Plan</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="bg-slate-50 border border-gray-100 p-8 rounded-2xl shadow-md w-full max-w-md">
                  <h3 className="text-sm font-bold text-primary-dark mb-4 text-center">Request Download Link</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const name = (form.querySelector('input[name="name"]') as HTMLInputElement).value;
                      const mobileInput = (form.querySelector('input[name="mobile"]') as HTMLInputElement).value;
                      const email = (form.querySelector('input[name="email"]') as HTMLInputElement).value;
                      const countrySelect = (form.querySelector('select[name="countryCode"]') as HTMLSelectElement).value;
                      
                      const mobile = mobileInput.trim().startsWith("+")
                        ? mobileInput.trim()
                        : `${countrySelect} ${mobileInput.trim()}`;
                      
                      try {
                        const response = await fetch("https://formsubmit.co/ajax/saravanan061193@gmail.com", {
                          method: "POST",
                          headers: { "Content-Type": "application/json", "Accept": "application/json" },
                          body: JSON.stringify({
                            Name: name,
                            Mobile: mobile,
                            Email: email,
                            Source: "Company Profile Lead Magnet",
                            Message: "Requested Company Profile PDF download link.",
                            _subject: "🔥 Profile PDF Request - Joy Digital",
                            _captcha: "false",
                          }),
                        });
                        if (response.ok) {
                          // Track event
                          const tracker = (window as any).trackJoyDigitalEvent;
                          if (typeof tracker === "function") {
                            tracker("pdf_download_request", { name, email, mobile });
                          }
                          // Trigger file download
                          window.open("/assets/docs/joy-digital-profile.pdf", "_blank");
                          alert("Brochure requested! Your download will start now.");
                          form.reset();
                        }
                      } catch (err) {
                        console.error("PDF download request failed:", err);
                      }
                    }}
                    className="flex flex-col gap-3 text-left"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      required
                      className="bg-white border border-[#E5E7EB] text-xs px-3.5 py-3 rounded-lg outline-none focus:border-accent w-full"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      required
                      className="bg-white border border-[#E5E7EB] text-xs px-3.5 py-3 rounded-lg outline-none focus:border-accent w-full"
                    />
                    <div className="flex gap-2 w-full">
                      <div className="relative w-[100px] shrink-0">
                        <select
                          name="countryCode"
                          value={selectedCountryCode}
                          onChange={(e) => setSelectedCountryCode(e.target.value)}
                          className="w-full text-xs py-3 pl-3 pr-7 bg-white border border-[#E5E7EB] focus:border-accent rounded-lg outline-none appearance-none transition-all cursor-pointer font-medium text-text-primary"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={`${c.code}-${c.name}`} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted text-[10px] pointer-events-none">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="WhatsApp Number"
                        required
                        className="bg-white border border-[#E5E7EB] text-xs px-3.5 py-3 rounded-lg outline-none focus:border-accent flex-1"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs font-bold py-3.5 rounded-lg shadow-md transition-all mt-2 cursor-pointer w-full"
                    >
                      Download Company Profile PDF
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Serve Section */}
        <section id="industries-section" className="py-20 bg-light-bg border-t border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Industry Expertise
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-4">
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
                  className="bg-light-card border border-[#E5E7EB] rounded-[24px] p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl mb-6 flex-shrink-0">
                      <i className={item.icon} />
                    </div>
                    <span className="inline-block bg-accent/10 text-accent font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full mb-3">
                      {item.focus}
                    </span>
                    <h3 className="text-lg font-extrabold text-text-primary mb-3">{item.name}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-6">{item.description}</p>
                  </div>
                  <div className="border-t border-[#E5E7EB] pt-4 flex items-center justify-between mt-2">
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Conversion Ready</span>
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
        <section id="portfolio-section" className="py-20 bg-white border-y border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Featured Showcase
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-4">
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
                  url: "https://ganeshmuruganlic.com",
                  desc: "A premium, high-converting digital portal built for a top LIC & financial advisor. Integrated with direct policy inquiry forms, WhatsApp chat support, and local SEO configuration.",
                  features: ["Mobile Friendly", "Lead Generation Focused", "WhatsApp Integration", "SEO Ready", "Fast Loading"],
                  avatar: "🏢"
                },
                {
                  title: "Chithra Insurance Agent Portal",
                  url: "https://chithrainsurance.com",
                  desc: "A clean, modern lead-generation web application designed for a professional Insurance advisor. Built to load in under 1.2 seconds, securing client enquiries in real-time.",
                  features: ["Mobile Friendly", "Lead Generation Focused", "WhatsApp Integration", "SEO Ready", "Fast Loading"],
                  avatar: "👩‍💼"
                }
              ].map((proj, idx) => (
                <div key={idx} className="bg-white border border-[#E5E7EB] rounded-[24px] p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center text-xl shadow-sm">
                        {proj.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-text-primary leading-tight">{proj.title}</h3>
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
                        <span key={i} className="bg-[#FAFAFA] border border-[#E5E7EB] text-text-secondary text-[10px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-[#E5E7EB] pt-4 flex flex-wrap gap-4 items-center">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-center"
                    >
                      Visit Live Website <i className="fa-solid fa-arrow-right text-[10px]" />
                    </a>
                    <a
                      href={`https://wa.me/919080026133?text=Hello%20Saravanan,%20I%2520saw%2520your%2520portfolio%2520${encodeURIComponent(proj.title)}%2520and%2520want%2520something%2520similar.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto border border-[#E5E7EB] bg-white hover:bg-slate-50 text-text-primary text-xs font-bold px-5 py-3.5 rounded-full transition-all flex items-center justify-center gap-2"
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
        <section id="pricing-section" className="py-20 bg-light-bg border-t border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Pricing Plans
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-4">
                Affordable Web Design Packages <span className="text-gradient">for Growing Businesses</span>
              </h2>
              <p className="text-sm text-text-secondary mb-6">
                Choose the package that fits your objectives. High-converting deliverables with zero hidden agency costs.
              </p>
              
              {/* Currency Selector Switcher */}
              <div className="inline-flex bg-white p-1 rounded-full border border-gray-200 shadow-sm mb-4">
                {[
                  { code: "in", label: "INR (₹)" },
                  { code: "us", label: "USD ($)" },
                  { code: "uk", label: "GBP (£)" },
                  { code: "ae", label: "AED (AED)" }
                ].map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setSelectedCurrency(c.code)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all duration-200 cursor-pointer ${
                      selectedCurrency === c.code
                        ? "bg-primary text-white shadow-sm"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              
              {/* Plan 1 */}
              <div className="bg-light-card border border-[#E5E7EB] rounded-[24px] p-8 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-lg font-extrabold text-text-primary mb-2">Starter Website</h3>
                  <p className="text-xs text-text-secondary mb-6 leading-relaxed">Perfect for local service providers, agents, and small business portfolios.</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl font-extrabold text-text-primary">{pricingPlans.starter.currency}{pricingPlans.starter.price}</span>
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
                  className="w-full text-center bg-white hover:bg-slate-50 border border-[#E5E7EB] text-text-primary font-bold text-xs py-3.5 rounded-full transition-all shadow-sm"
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
                  <h3 className="text-lg font-extrabold text-text-primary mb-2">Professional Website</h3>
                  <p className="text-xs text-text-secondary mb-6 leading-relaxed">Ideal for growing companies, specialized clinics, and professional firms.</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl font-extrabold text-text-primary">{pricingPlans.professional.currency}{pricingPlans.professional.price}</span>
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
              <div className="bg-light-card border border-[#E5E7EB] rounded-[24px] p-8 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-lg font-extrabold text-text-primary mb-2">Custom Business Solution</h3>
                  <p className="text-xs text-text-secondary mb-6 leading-relaxed">For businesses requiring complex databases, web applications, or custom e-commerce portal functions.</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl font-extrabold text-text-primary">Custom</span>
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
                  className="w-full text-center bg-white hover:bg-slate-50 border border-[#E5E7EB] text-text-primary font-bold text-xs py-3.5 rounded-full transition-all shadow-sm"
                >
                  Contact For Quote
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white border-y border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Why Us
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-4">
                Why Choose Our Next.js & <span className="text-gradient">SEO-Ready Web Design Solutions?</span>
              </h2>
              <p className="text-sm text-text-secondary">
                We combine organic optimization with high-performance code frameworks to deliver measurable pipeline results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WHY_CHOOSE_ITEMS.map((item, index) => (
                <div key={index} className="flex gap-4 items-start bg-white p-6 rounded-[20px] border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-base flex-shrink-0">
                    <i className={item.icon} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-light-bg border-t border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Success Stories
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-4">
                Real Results for <span className="text-gradient">Real Brands</span>
              </h2>
              <p className="text-sm text-text-secondary">
                See how we help SaaS companies, localized clinics, and e-commerce stores grow their qualified customer pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {CASE_STUDIES.map((study, index) => (
                <article key={index} className="bg-light-card border border-[#E5E7EB] rounded-[20px] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="bg-white border border-[#E5E7EB] p-6 rounded-[16px] text-center mb-6 shadow-sm">
                      <span className="text-3xl font-extrabold text-[#2563EB] block">{study.metrics}</span>
                      <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">{study.tag}</span>
                    </div>
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{study.tag}</span>
                    <h3 className="text-base font-bold text-text-primary mt-2 mb-3 leading-tight">
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

        {/* Google Reviews Trust Widget */}
        <section className="py-12 bg-light-bg border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-red-500 text-3xl shadow-sm font-extrabold select-none">
                  G
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black text-text-primary">Google Reviews</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full">100% Verified</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 mt-1">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <span className="text-xs text-text-secondary font-bold ml-1.5">5.0 / 5.0 Rating</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-8 text-center border-y md:border-y-0 md:border-x border-gray-200 py-4 md:py-0 md:px-8 w-full md:w-auto justify-center">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-primary">50+</span>
                  <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mt-0.5">Reviews</span>
                </div>
                <div className="flex flex-col border-l border-gray-200 pl-8">
                  <span className="text-2xl font-black text-primary">100%</span>
                  <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mt-0.5">Satisfaction</span>
                </div>
              </div>

              <a
                href="https://g.page/r/YOUR_REVIEW_LINK/review"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-50 border border-gray-200 text-text-primary text-xs font-bold px-6 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-sm shrink-0"
              >
                <i className="fa-brands fa-google text-red-500" />
                Write a Google Review
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Reviews
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-4">
                What Our Clients Say
              </h2>
              <p className="text-sm text-text-secondary">
                Read how global companies scale their customer signups and visibility working with Joy Digital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="bg-white border border-[#E5E7EB] p-8 rounded-[20px] shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
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
                  <div className="flex items-center gap-3 border-t border-[#E5E7EB] pt-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${t.avatarBg}`}>
                      {t.initials}
                    </div>
                    <div className="flex-grow text-left">
                      <span className="text-xs font-bold text-text-primary block leading-tight">{t.name}</span>
                      <span className="text-[10px] text-text-muted block mt-0.5">{t.role} — {t.company}</span>
                    </div>
                    {t.linkedin && (
                      <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-[#0A66C2] transition-colors flex-shrink-0" aria-label="LinkedIn profile">
                        <i className="fa-brands fa-linkedin text-sm" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Focus Section based on Country */}
        <section className="py-20 bg-light-bg border-t border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            {country === "in" || country === "" ? (
              <div className="flex flex-col items-start justify-center text-left">
                <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Maps & Local Traffic</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6">
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
                <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6">
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
              <div className="bg-light-card border border-[#E5E7EB] p-8 rounded-[20px] shadow-sm relative z-10 w-full max-w-sm text-center">
                {country === "in" || country === "" ? (
                  <>
                    <div className="text-[#2563EB] text-5xl mb-4 leading-none"><i className="fa-solid fa-map-location-dot" /></div>
                    <h4 className="text-base font-bold text-text-primary mb-2">Google Map Pack Strategy</h4>
                    <p className="text-xs text-text-secondary mb-4 leading-relaxed">Geotagging, citation sync, primary categories, review capture, and proximity targeting.</p>
                  </>
                ) : (
                  <>
                    <div className="text-[#2563EB] text-5xl mb-4 leading-none"><i className="fa-solid fa-filter" /></div>
                    <h4 className="text-base font-bold text-text-primary mb-2">Conversion Funnel Blueprint</h4>
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

        {/* Remote Client Workflow / Global Partnership Section */}
        <section className="py-20 bg-white border-t border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Global Operations
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-4">
                Seamless <span className="text-gradient">Remote Collaboration</span>
              </h2>
              <p className="text-sm text-text-secondary">
                We work with international clients across USA, UK, UAE, and Europe using structured async models that fit your timezone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "fa-solid fa-clock",
                  title: "Timezone Alignment",
                  desc: "We coordinate overlapping work hours for project handoffs, sprint reviews, and direct consultations, ensuring smooth delivery cycles."
                },
                {
                  icon: "fa-solid fa-comments",
                  title: "Async Channels",
                  desc: "Clear updates via Slack, WhatsApp, and email. You get a dedicated dashboard to track files, design drafts, and staging links."
                },
                {
                  icon: "fa-solid fa-file-contract",
                  title: "Legal & IP Protection",
                  desc: "Secure international contracts (NDAs) and clean IP handoffs. All code and branding assets belong entirely to your company from day one."
                },
                {
                  icon: "fa-solid fa-credit-card",
                  title: "Global Payments",
                  desc: "Flexible, transparent invoices in USD, GBP, AED, or INR via Stripe, Wise, or bank wire transfer. No hidden transaction charges."
                }
              ].map((step, index) => (
                <div key={index} className="bg-light-card border border-[#E5E7EB] rounded-[24px] p-8 shadow-sm flex flex-col items-start text-left hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center text-xl mb-6">
                    <i className={step.icon} />
                  </div>
                  <h3 className="text-base font-extrabold text-text-primary mb-3">{step.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free Website Consultation Form / Bottom Lead Gen Section */}
        <section id="consultation-section" className="py-20 bg-white border-y border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Information */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/20 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                  No Cost • Limited Slots Available
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-6 tracking-tight leading-tight">
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
        <section className="py-20 bg-light-bg border-t border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Support
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-4">
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
