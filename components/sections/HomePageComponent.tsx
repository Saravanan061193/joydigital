"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import Header from "@/components/layout/Header";
import DigitalNetworkBackground from "@/components/ui/DigitalNetworkBackground";

const WorldwideServiceNetwork = dynamic(() => import("@/components/ui/WorldwideServiceNetwork"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"));
const UnifiedFloatingWidget = dynamic(() => import("@/components/ui/UnifiedFloatingWidget"), { ssr: false });
const LeadForm = dynamic(() => import("@/components/ui/LeadForm"));
const Accordion = dynamic(() => import("@/components/ui/Accordion"));
const ModernHeroSection = dynamic(() => import("@/components/sections/ModernHeroSection"));

// Lightweight Count-Up Component honoring prefers-reduced-motion
function CountUpNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered) {
        setTriggered(true);
        let start = 0;
        const duration = 1200; // Count duration: 1.2s
        const stepTime = 16;
        const totalSteps = Math.ceil(duration / stepTime);
        const increment = target / totalSteps;
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, stepTime);
      }
    }, { threshold: 0.1 });
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, [target, triggered]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export const HOME_FAQS = [
  {
    question: "How much does a website cost with Joy Digital?",
    answer: "Our standard business layouts and landing page setups start from ₹15,000 ($250). Custom multipage e-commerce platforms, database directories, or advanced SaaS landing flows are quoted based on specific API needs and page count."
  },
  {
    question: "How long does website development take?",
    answer: "A standard landing page or corporate profile website takes 7 to 14 business days. Complex e-commerce systems, database directories, or custom web portals average 3 to 6 weeks."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, our target market is global. We support growing companies, startups, and local businesses in India, the US, the UK, the UAE, Australia, and other countries through remote desks."
  },
  {
    question: "Do you provide SEO services?",
    answer: "Yes. Basic technical onsite SEO (correct title formats, descriptions, clean tag hierarchy, and structured JSON-LD schemas) is pre-configured on all our sites. We also offer dedicated global SEO campaigns and Map pack optimization."
  },
  {
    question: "Do you provide website maintenance?",
    answer: "Yes, we support our clients post-launch. We provide security configurations, hosting setups (Vercel/Netlify), backup schedules, content updates, and continuous speed tuning."
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Absolutely. We migrate slow, legacy templates (like bloated WordPress builds) into high-performance, responsive Next.js storefronts or corporate profiles to increase page speed and capture conversions."
  },
  {
    question: "Do you work with startups?",
    answer: "Yes, startups are a core focus. We help early-stage ventures launch conversion-ready digital pages, configure lead capture fields, and connect trackers to validate their offerings."
  },
  {
    question: "Can you build e-commerce websites?",
    answer: "Yes. We build responsive e-commerce storefronts using Next.js. We integrate checkout funnels, secure payment links, catalog displays, and order management."
  },
  {
    question: "How do I choose the right web developer near me or website designer near me?",
    answer: "If you are searching for a qualified web developer near me or an experienced website designer near me, look for an agency that delivers custom, high-speed, and search-optimized solutions rather than rigid templates. At Joy Digital, we act as your dedicated web engineering team, building bespoke Next.js and React websites engineered for sub-second speeds, mobile responsiveness, and high Google search visibility."
  },
  {
    question: "Why should I hire a professional website developer near me for my business?",
    answer: "Partnering with an experienced website developer near me ensures your business website is custom-built to attract local customers, achieve 90+ Core Web Vitals scores, and capture organic leads. We specialize in custom web development, local SEO, and mobile-first responsive design, giving your business a distinct competitive edge."
  },
  {
    question: "Why is Joy Digital a leading digital marketing company in India and search engine optimization agency?",
    answer: "Joy Digital stands out among top search engine optimization companies in India and digital marketing firms in India by combining sub-second Next.js web engineering with technical SEO audits, Google Map pack optimization, and high-converting performance marketing. We help Indian startups and global brands scale organic revenue."
  },
  {
    question: "What should businesses look for when partnering with digital advertising companies in India?",
    answer: "When hiring a digital marketing business in India or a digital advertising company in India, prioritize agencies with proven Core Web Vitals performance, transparent GA4 conversion tracking, and custom strategy execution rather than automated templates. Joy Digital provides end-to-end web development, technical search optimization, and lead funnels tailored to your growth goals."
  },
  {
    question: "Why is Joy Digital considered a top website development company in India for website development services?",
    answer: "Joy Digital is a full-service website development company in India specializing in custom Next.js and React website development services. We engineer custom, lightning-fast platforms designed to rank on Google search engines, load under 1.5 seconds, and generate consistent high-intent client inquiries."
  },
  {
    question: "What is website design and development, and why website development is important for business growth?",
    answer: "Website design focuses on the visual layout, typography, UI/UX structure, and brand aesthetics, while website development involves writing clean, semantic code (HTML, CSS, JavaScript, React, Next.js) to turn designs into dynamic, fast-loading platforms. Website development is critical because your site acts as your 24/7 digital storefront, establishing trust, ranking on search engines, and converting visitors into active paying clients."
  },
  {
    question: "What is the cost of website development in India?",
    answer: "The cost of website development in India generally ranges from ₹15,000 to ₹35,000 for standard business starter sites, and ₹45,000 to ₹1,500,000+ for enterprise e-commerce portals or custom SaaS platforms. At Joy Digital, we provide transparent, flat-rate pricing starting at ₹15,000 with zero hidden fees."
  },
  {
    question: "Which language is best for website development, and which AI is best for website development?",
    answer: "JavaScript and TypeScript (powered by frameworks like Next.js and React) are widely recognized as the best programming languages for modern web development due to their unmatched speed, SEO capabilities, and scalability. For AI tools, ChatGPT (GPT-4o), Claude 3.5 Sonnet, Cursor AI, and v0.dev are considered the best AI tools for accelerating web development, generating component code, and optimizing SEO metadata."
  },
  {
    question: "How to get clients for website development and foreign projects?",
    answer: "To get clients for website development and secure foreign projects from the US, UK, or UAE, web agencies and developers should combine technical SEO landing pages, targeted LinkedIn cold outreach, Upwork/Fiverr pro listings, and white-label partnerships with foreign marketing agencies. Providing sub-second Next.js site performance is key to retaining international clients."
  },
  {
    question: "How do I start a project with Joy Digital?",
    answer: "The easiest way is to fill out our Free Website Audit form on the homepage, or message us directly on WhatsApp at +91 90800 26133. We will analyze your inputs and present a flat-rate proposal."
  }
];

interface HomePageComponentProps {
  country: string; // "us", "uk", "ae", "in", or "" (Global default)
}

export default function HomePageComponent({ country }: HomePageComponentProps) {
  const [selectedIndustry, setSelectedIndustry] = useState("Startups");
  
  // Dynamic rotating hero phrase state
  const [activePhrase, setActivePhrase] = useState("Grow Your Business");
  const [fadeState, setFadeState] = useState("opacity-100 translate-y-0");
  
  // Section line reveal status
  const [processInView, setProcessInView] = useState(false);

  // Rotating phrases effect (SaaS headline style)
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const phrases = ["Grow Your Business", "Grow Your Brand", "Grow Online"];
    let idx = 0;

    const interval = setInterval(() => {
      setFadeState("opacity-0 -translate-y-2");
      setTimeout(() => {
        idx = (idx + 1) % phrases.length;
        setActivePhrase(phrases[idx]);
        setFadeState("opacity-0 translate-y-2");
        setTimeout(() => {
          setFadeState("opacity-100 translate-y-0");
        }, 50);
      }, 300);
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-hidden");
    elements.forEach((el) => observer.observe(el));

    // Process section visual draw line trigger
    const processObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setProcessInView(true);
        processObserver.unobserve(entry.target);
      }
    }, { threshold: 0.15 });

    const processSec = document.getElementById("process-section");
    if (processSec) processObserver.observe(processSec);

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      if (processSec) processObserver.unobserve(processSec);
    };
  }, []);

  // Dynamic localized copy overrides
  const getHeroContent = () => {
    switch (country) {
      case "us":
        return {
          badge: "Premium Web Engineering Partner",
          h1: "Websites, SEO & Digital Marketing for US Businesses",
          subtitle: "Joy Digital helps startups, growing companies, and enterprises across the USA build fast, search-optimized Next.js web systems to capture organic pipelines.",
        };
      case "uk":
        return {
          badge: "High-Performance Web Agency",
          h1: "Websites, SEO & Digital Marketing for UK Companies",
          subtitle: "Convert search traffic into loyal clients. Joy Digital builds high-speed corporate platforms and implements conversion-optimized user journeys across the United Kingdom.",
        };
      case "ae":
        return {
          badge: "Premium Web Development Dubai",
          h1: "Websites, SEO & Digital Marketing for UAE Enterprises",
          subtitle: "Build ultra-fast, responsive corporate portals and headless storefronts tailored for the Dubai and Gulf market to accelerate your digital performance.",
        };
      case "in":
        return {
          badge: "Premium Custom Web & SEO",
          h1: "Websites, SEO & Digital Marketing for Indian Businesses",
          subtitle: "Grow your business online. Joy Digital designs high-speed business sites, Google Maps ranking systems, and lead-generation setups for companies across India.",
        };
      case "ca":
        return {
          badge: "Canada Web Engineering Partner",
          h1: "Websites, SEO & Digital Marketing for Canadian Businesses",
          subtitle: "Joy Digital helps startups and enterprise teams across Canada build high-speed Next.js platforms and capture organic search pipelines.",
        };
      case "au":
        return {
          badge: "Australia Custom Web & SEO",
          h1: "Websites, SEO & Digital Marketing for Australian Businesses",
          subtitle: "Empower your business with fast, search-compliant Next.js websites and Google ranking strategies engineered for Australian companies.",
        };
      default:
        return {
          badge: "Your Digital Growth Partner",
          h1: "Websites, SEO & Digital Marketing for Businesses Worldwide",
          subtitle: "Joy Digital helps startups, small businesses, and growing companies build professional websites, improve search engine visibility, and generate more customers through digital marketing.",
        };
    }
  };

  const hero = getHeroContent();

  // 2. TRUST / VALUE ITEMS (Purple themed icons)
  const VALUE_ITEMS = [
    {
      icon: "fa-solid fa-earth-americas text-[#7C3AED]",
      title: "Global Service Support",
      description: "Collaborating remotely with startups and corporate teams worldwide, backed by our efficient development base in India."
    },
    {
      icon: "fa-solid fa-tags text-[#7C3AED]",
      title: "Transparent Flat Pricing",
      description: "Get detailed, flat-rate proposals starting from ₹15,000 ($250). Absolute clarity on hosting setup and maintainer retainers."
    },
    {
      icon: "fa-solid fa-sliders text-[#7C3AED]",
      title: "Custom Engineered Solutions",
      description: "No bloated page builders. We build tailor-made Next.js and React interfaces configured to your conversion goals."
    },
    {
      icon: "fa-solid fa-comments text-[#7C3AED]",
      title: "Direct Specialist Sync",
      description: "No administrative filters. Communicate directly with the system developers and search specialists executing your project."
    },
    {
      icon: "fa-solid fa-bolt text-[#7C3AED]",
      title: "Fast Iterative Launching",
      description: "Agile delivery sprints. We launch standard multipage company profiles and lead funnels within 7 to 14 business days."
    },
    {
      icon: "fa-solid fa-headset text-[#7C3AED]",
      title: "Long-Term Technical Care",
      description: "Post-launch maintenance covering server deployment, security configurations, index monitoring, and speed tuning."
    }
  ];

  // 3. SERVICES LIST
  const SERVICES = [
    {
      icon: "fa-solid fa-laptop-code",
      title: "Website Design",
      description: "Clean, responsive user interfaces custom-designed to match your brand identity and optimize visitor engagement flow.",
      benefits: ["Mobile-first user flows", "Frictionless navigations", "High-impact layouts"],
      href: "/web-design-services",
      cta: "Explore Web Design"
    },
    {
      icon: "fa-solid fa-code",
      title: "Web Development",
      description: "Premium Next.js, React, and TypeScript development. We compile semantic, light, and modular code structures.",
      benefits: ["Blazing fast CDN pre-renders", "Serverless cloud setup", "Clean reusable components"],
      href: "/website-development",
      cta: "Explore Web Dev"
    },
    {
      icon: "fa-solid fa-cart-shopping",
      title: "E-commerce Development",
      description: "Highly performant storefront checkouts using modern engines to support cart speeds and checkout conversion rates.",
      benefits: ["Speedy headless stores", "Secure checkout checkouts", "Seamless catalog syncs"],
      href: "/ecommerce-website-development",
      cta: "Explore E-commerce"
    },
    {
      icon: "fa-solid fa-magnifying-glass-chart",
      title: "SEO Services",
      description: "Technical, structural, and semantic SEO audits to get your content indexed and ranked on Google search rankings.",
      benefits: ["Lighthouse speed setups", "Canonical mapping audits", "Rich schema structures"],
      href: "/seo-services",
      cta: "Explore SEO"
    },
    {
      icon: "fa-solid fa-map-location-dot",
      title: "Local SEO",
      description: "Proximity keyword optimizations to secure map pack exposure for high-intent nearby commercial searches.",
      benefits: ["Maps citation syncs", "Geo-targeted landings", "Review acquisition funnels"],
      href: "/local-seo-services",
      cta: "Explore Local SEO"
    },
    {
      icon: "fa-solid fa-circle-nodes",
      title: "Google Business Profile Optimization",
      description: "GMB parameters configuration, category optimizations, and geotag updates to capture phone calls.",
      benefits: ["Maps pack optimizations", "Category audits", "Directory alignments"],
      href: "/google-business-profile-setup",
      cta: "Explore GBP Setup"
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Digital Marketing",
      description: "ROI-focused pay-per-click (PPC) strategies and landing pages designed to drive inbound lead registrations.",
      benefits: ["Google/Meta ad configurations", "Distraction-free landers", "Conversion pixel setups"],
      href: "/contact",
      cta: "Inquire Now"
    },
    {
      icon: "fa-solid fa-pen-nib",
      title: "Logo & Brand Design",
      description: "Corporate identity kits including scalable vector SVG marks, custom color guidelines, and media assets.",
      benefits: ["Scalable vector SVG marks", "Palette definitions", "Identity asset packs"],
      href: "/logo-design-services",
      cta: "Explore Brand Design"
    }
  ];

  // 4. WHO WE HELP DIRECTORY
  const INDUSTRIES = [
    {
      name: "Startups",
      desc: "Fast, custom landing pages and scalable web structures to establish brand presence, validate features, and collect early customer registrations."
    },
    {
      name: "Small Businesses",
      desc: "Affordable multipage platforms to present your services clearly, set up call-to-actions, and start ranking for local search queries."
    },
    {
      name: "Entrepreneurs",
      desc: "Clean digital portals and personal portfolios built quickly to showcase consultation models, book discovery slots, and accept details."
    },
    {
      name: "Professional Services",
      desc: "Highly-trustworthy consulting platforms for legal advisors, accountants, and finance professionals to generate qualified booking leads."
    },
    {
      name: "Real Estate",
      desc: "Clean layout properties directories featuring localized maps, structured specifications lists, and quick WhatsApp callback triggers."
    },
    {
      name: "Hotels & Hospitality",
      desc: "Responsive portal sites showcasing room configurations, amenity directories, and direct inquiry forms to reduce booking fees."
    },
    {
      name: "Healthcare",
      desc: "Fully responsive layouts for dental clinics, practitioners, and medical setups. Includes online scheduling details and mapping."
    },
    {
      name: "Insurance",
      desc: "Lead acquisition templates for independent agents to present policy features and capture structured advisor consultations."
    },
    {
      name: "Education",
      desc: "Professional portals for academies, tutor setups, and trainers featuring structured curricula maps and signup triggers."
    },
    {
      name: "Tours & Travel",
      desc: "Vibrant custom packages directories with pricing tiers, scheduling guides, and quick inquiry buttons for travel setups."
    },
    {
      name: "E-commerce",
      desc: "Next-gen storefronts pre-rendering static catalogs to load instantly on slow mobile connections, reducing checkout abandonment."
    },
    {
      name: "Local Businesses",
      desc: "Localized search optimization setups combined with maps directory syncs to guarantee exposure in nearby queries."
    }
  ];

  // 5. PORTFOLIO / REAL PROJECTS ONLY
  const PORTFOLIO_PROJECTS = [
    {
      client: "Ganesan Associates",
      industry: "Financial & Insurance Services",
      service: "Website Design, Web Development & Local SEO",
      desc: "A highly-responsive, clean portal built for LIC and Star Health advisors. Features responsive lead submission pipelines, WhatsApp integration, and optimized maps rankings.",
      image: "/assets/images/ganesan-associates.webp",
      link: "https://ganeshmuruganlic.com"
    },
    {
      client: "Chithra Insurance Agent Portal",
      industry: "Insurance Advisory",
      service: "Next.js Web Development & Mobile Optimization",
      desc: "Rebuilt client presence into a clean, mobile-first consultation funnel. Optimized images and static assets to load in under 1.2 seconds, securing over 50 monthly WhatsApp leads.",
      image: "/assets/images/hero-banner.webp",
      link: "https://chithrainsurance.com"
    }
  ];

  // 6. HOW WE WORK PROCESS
  const PROCESS_STEPS = [
    {
      step: "01",
      title: "Tell Us About Your Business",
      desc: "Submit your basic parameters on our audit form or drop a line on WhatsApp outlining your services and targets."
    },
    {
      step: "02",
      title: "Understand Your Goals",
      desc: "We run a brief remote discovery chat to evaluate competitors, target keywords, speed bottlenecks, and user paths."
    },
    {
      step: "03",
      title: "Plan & Design Layouts",
      desc: "Our design team structures wireframes and conversion funnels, maintaining a premium brand identity."
    },
    {
      step: "04",
      title: "Develop & Launch",
      desc: "We write clean Next.js/React layouts, configure meta structures, embed Schema markups, and launch live."
    },
    {
      step: "05",
      title: "Support & Organic Growth",
      desc: "Post-deployment, we configure backups, run speed diagnostics, check Google indexings, and tune structures."
    }
  ];

  // 8. CASE STUDIES (VERIFIED PROBLEM/SOLUTION/RESULT)
  const CASE_STUDIES = [
    {
      slug: "chennai-clinic-leads",
      category: "Local SEO & maps rankings",
      title: "Patient Generation Pipeline Optimization",
      problem: "A clinical setup lacked digital leads due to name address inconsistencies and an unoptimized Maps listing for core queries.",
      solution: "We restructured categories, synched directory records, built schemas, and launched geotagged location pages.",
      result: "Maps pack rankings reached the top 3 spots within 30 days, generating a 240% monthly growth in appointment calls.",
      targetNum: 240,
      metricSuffix: "% Appointment growth"
    },
    {
      slug: "ecommerce-sales-increase",
      category: "Web Development & CRO",
      title: "Headless E-commerce Portal Speed Rebuild",
      problem: "A legacy shop site took over 5.5s to load, creating massive cart abandonment and poor checkouts.",
      solution: "Rebuilt the store using serverless Next.js, optimized images to WebP, and removed heavy scripts.",
      result: "Mobile loading speed dropped under 1.5s, reducing checkout shifts and driving a 40% growth in transactions.",
      targetNum: 40,
      metricSuffix: "% Sales growth"
    },
    {
      slug: "saas-landing-optimization",
      category: "Paid Ads & Landing Design",
      title: "SaaS Product Demo Request Landers",
      problem: "Paid ads campaigns were landing on cluttered multipage headers, leaking prospects and wasting budget.",
      solution: "Engineered single-purpose, fast demo landers featuring prefilled inputs and no external nav headers.",
      result: "Lowered overall client acquisition cost, generating an 180% demo lead signup spike.",
      targetNum: 180,
      metricSuffix: "% Lead signup growth"
    }
  ];

  // 9. TESTIMONIALS (REAL CUSTOMERS)
  const TESTIMONIALS = [
    {
      quote: "Joy Digital optimized our map search visibility. We now rank at the top of Google Maps in our city, and our weekly incoming calls and advisory enquiries have doubled!",
      name: "Ganesh Murugan",
      role: "LIC Financial Advisor",
      company: "Ganesan Associates",
      initials: "GM"
    },
    {
      quote: "We rebuilt our insurance portfolio using their Next.js template. The website loads instantly on mobile networks, and we captured over 50+ policy leads via WhatsApp in the first month.",
      name: "Chithra",
      role: "Star Health Advisor",
      company: "Independent Consultancy",
      initials: "C"
    },
    {
      quote: "Their team combined custom layouts with technical SEO. We now rank for competitive terms in our sector, bringing in continuous qualified sales leads across our target markets.",
      name: "R. Rajesh Kumar",
      role: "Retail Director",
      company: "Rajesh Retail Group",
      initials: "RK"
    }
  ];

  // 11. FAQ LIST (uses HOME_FAQS from top level)

  const handleCtaEvent = (ctaName: string) => {
    if (typeof window !== "undefined") {
      const tracker = (window as any).trackJoyDigitalEvent;
      if (typeof tracker === "function") {
        tracker("cta_click", { button_text: ctaName, location: "homepage" });
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
      <Header transparent={true} />
      
      <main className="bg-[#FAF9FF] text-[#1F1B2D] min-h-screen overflow-hidden">
        
        {/* 1. MODERNIZED INTERNATIONAL HERO SECTION */}
        <ModernHeroSection country={country} />

        {/* 2. TRUST / VALUE SECTION WITH SCROLL REVEALS (Soft background alternates) */}
        <section id="value-proposition" className="py-20 bg-white border-b border-[#E9E4F2] relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
                Value Proposition
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                Designed for Growing Businesses Worldwide
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">
                Transparent processes, specialized technical engineers, and conversion-first workflows. No fake claims.
              </p>
            </div>

            {/* Staggered card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {VALUE_ITEMS.map((item, index) => (
                <div 
                  key={index}
                  style={{ transitionDelay: `${index * 80}ms` }}
                  className="p-8 bg-[#FAF9FF] border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-[#7C3AED]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start text-left reveal-hidden group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E9E4F2] flex items-center justify-center text-xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <i className={item.icon} />
                  </div>
                  <h3 className="text-sm font-bold text-[#1F1B2D] mb-3">{item.title}</h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. BUSINESS PROBLEMS SECTION */}
        <section className="py-20 bg-[#FAF9FF] border-b border-[#E9E4F2] relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block mb-3">
                Common Bottlenecks
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                Is Your Website Actually Generating Leads?
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">
                Most websites look decent but fail to achieve actual business results. Here are the core problems holding your online visibility back.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Problem 1 */}
              <div className="p-8 bg-white border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 flex gap-5 items-start text-left reveal-hidden group">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-eye-slash" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1F1B2D] mb-2">Low Google Visibility</h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold">Your site is buried on Page 2 or 3 of Google search results for key buying keywords, causing you to lose traffic to local competitors.</p>
                </div>
              </div>

              {/* Problem 2 */}
              <div className="p-8 bg-white border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 flex gap-5 items-start text-left reveal-hidden group">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-palette" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1F1B2D] mb-2">Poor Website Design</h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold">Outdated layouts or generic agency templates that look unprofessional and fail to establish trust within the first 3 seconds.</p>
                </div>
              </div>

              {/* Problem 3 */}
              <div className="p-8 bg-white border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 flex gap-5 items-start text-left reveal-hidden group">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-circle-question" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1F1B2D] mb-2">Low Enquiries</h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold">Visitors click onto your site, browse around, but leave without filling out forms, sending emails, or making phone calls.</p>
                </div>
              </div>

              {/* Problem 4 */}
              <div className="p-8 bg-white border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 flex gap-5 items-start text-left reveal-hidden group">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className="fa-brands fa-whatsapp" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1F1B2D] mb-2">No WhatsApp Conversion</h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold">Absence of direct WhatsApp click-to-chat widgets makes it difficult for mobile users to quickly ask about your pricing and services.</p>
                </div>
              </div>

              {/* Problem 5 */}
              <div className="p-8 bg-white border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 flex gap-5 items-start text-left reveal-hidden group">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-gauge-simple" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1F1B2D] mb-2">Slow Website</h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold">Bloated page builders take 5+ seconds to load, triggering high bounce rates and causing search engines to devalue your page rank.</p>
                </div>
              </div>

              {/* Problem 6 */}
              <div className="p-8 bg-white border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 flex gap-5 items-start text-left reveal-hidden group">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-mobile-screen-button" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1F1B2D] mb-2">Poor Mobile Experience</h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold">Cluttered mobile layouts, microscopic buttons, and poorly aligned input fields block smartphone users from converting.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/free-website-audit"
                className="inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-8 py-4 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                Find Out Your Website Bottlenecks Now
                <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. SERVICES SECTION WITH PREMIUM HOVER STATES */}
        <section className="py-20 bg-white border-b border-[#E9E4F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
                Our Services
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                Modern Services Built to Generate Qualified Leads
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">
                Custom layouts designed for search engine exposure, mobile responsive compatibility, and client actions.
              </p>
            </div>

            {/* Staggered Service cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((s, idx) => (
                <article
                  key={idx}
                  style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
                  className="bg-[#FAF9FF] border border-[#E9E4F2] rounded-[24px] p-7 shadow-sm hover:shadow-lg hover:border-[#7C3AED]/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative reveal-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] text-lg mb-5 group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300">
                      <i className={s.icon} />
                    </div>
                    <h3 className="text-xs font-bold text-[#1F1B2D] mb-3 uppercase tracking-wider group-hover:text-[#7C3AED] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-[11px] text-[#6B6478] leading-relaxed mb-6 font-semibold">
                      {s.description}
                    </p>
                    
                    {/* Benefits list */}
                    <ul className="flex flex-col gap-2.5 mb-6 text-[10px] text-[#6B6478] font-bold border-t border-[#E9E4F2] pt-4">
                      {s.benefits.map((b, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <i className="fa-solid fa-circle-check text-emerald-500 text-[11px]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={s.href}
                    className="text-xs font-bold text-[#7C3AED] flex items-center gap-1.5 mt-2 transition-colors hover:text-[#A78BFA] border-t border-[#E9E4F2] pt-3"
                  >
                    {s.cta} <i className="fa-solid fa-chevron-right text-[9px] group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. WHO WE HELP SECTION */}
        <section className="py-20 bg-[#FAF9FF] border-b border-[#E9E4F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14 reveal-hidden">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
                Target Industries
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                Who We Help Globally
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">
                We craft specialized, fast-loading interfaces for startups and small business sectors across the globe.
              </p>
            </div>

            {/* Industry selector tabs layout with scroll reveal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start reveal-hidden">
              <div className="lg:col-span-4 flex flex-col gap-2.5 overflow-x-auto lg:overflow-visible flex-row lg:flex-col pb-4 lg:pb-0 scrollbar-thin">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.name}
                    onClick={() => setSelectedIndustry(ind.name)}
                    className={`text-xs px-5 py-3.5 rounded-xl font-bold border transition-all text-left whitespace-nowrap lg:whitespace-normal cursor-pointer ${
                      selectedIndustry === ind.name
                        ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-md shadow-[#7C3AED]/10"
                        : "bg-white text-[#1F1B2D] border-[#E9E4F2] hover:bg-slate-50"
                    }`}
                  >
                    {ind.name}
                  </button>
                ))}
              </div>

              {/* Selected industry details card */}
              <div className="lg:col-span-8 bg-white border border-[#E9E4F2] p-8 sm:p-12 rounded-[24px] shadow-sm text-left h-full flex flex-col justify-center min-h-[300px] hover:border-[#7C3AED]/15 transition-colors">
                <span className="text-[10px] font-extrabold text-[#7C3AED] uppercase tracking-widest block mb-3">Target Industry Blueprint</span>
                <h3 className="text-2xl font-black text-[#1F1B2D] mb-4">Joy Digital for {selectedIndustry}</h3>
                <p className="text-sm text-[#6B6478] leading-relaxed font-semibold max-w-xl">
                  {INDUSTRIES.find(i => i.name === selectedIndustry)?.desc}
                </p>
                <div className="mt-8 border-t border-[#E9E4F2] pt-6 flex flex-wrap gap-4 items-center">
                  <a
                    href="#enquiry-section"
                    onClick={() => handleCtaEvent(`Start ${selectedIndustry} Project`)}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] hover:scale-[1.03] transition-all text-white font-bold text-xs px-6 py-3 rounded-lg shadow-sm"
                  >
                    Start {selectedIndustry} Project
                  </a>
                  <a
                    href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I'd%20like%20to%20discuss%20our%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleWaEvent("who_we_help")}
                    className="text-xs text-[#10b981] hover:text-[#059669] font-bold flex items-center gap-1.5 group"
                  >
                    <i className="fa-brands fa-whatsapp text-sm group-hover:scale-110 transition-transform" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FREE ONLINE BUSINESS TOOLS SECTION */}
        <section className="py-20 bg-white border-b border-[#E9E4F2] relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Heading area */}
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
                Free Resources
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                Free Online Business Tools & Calculators
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold leading-relaxed">
                Free, fast and easy-to-use online tools for businesses, freelancers, students and professionals. Calculate GST, create invoices and quotations, generate QR codes, improve website SEO and simplify everyday business tasks — completely online.
              </p>
            </div>

            {/* Grid layout - 3 cols desktop, 2 cols tablet, 1 col mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              
              {/* GST Calculator */}
              <div className="p-8 bg-[#FAF9FF] border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-[#7C3AED]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left reveal-hidden group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E9E4F2] flex items-center justify-center text-[#7C3AED] text-xl mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300">
                    <i className="fa-solid fa-calculator" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#1F1B2D] mb-3 group-hover:text-[#7C3AED] transition-colors">
                    GST Calculator
                  </h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold mb-6">
                    Calculate GST inclusive and exclusive prices instantly with our free GST calculator.
                  </p>
                </div>
                <div className="border-t border-[#E9E4F2] pt-4 mt-2 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">GST Calculator</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">GST Online</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">India</span>
                  </div>
                  <Link href="/gst-calculator" className="text-xs font-bold text-[#7C3AED] flex items-center gap-1.5 group-hover:text-[#A78BFA] transition-colors">
                    Use GST Calculator &rarr;
                  </Link>
                </div>
              </div>

              {/* Invoice Generator */}
              <div className="p-8 bg-[#FAF9FF] border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-[#7C3AED]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left reveal-hidden group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E9E4F2] flex items-center justify-center text-[#7C3AED] text-xl mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300">
                    <i className="fa-solid fa-file-invoice-dollar" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#1F1B2D] mb-3 group-hover:text-[#7C3AED] transition-colors">
                    Invoice Generator
                  </h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold mb-6">
                    Create professional invoices online quickly and easily.
                  </p>
                </div>
                <div className="border-t border-[#E9E4F2] pt-4 mt-2 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">Invoice Generator</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">Free Maker</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">GST Invoice</span>
                  </div>
                  <Link href="/invoice-generator" className="text-xs font-bold text-[#7C3AED] flex items-center gap-1.5 group-hover:text-[#A78BFA] transition-colors">
                    Create Invoice &rarr;
                  </Link>
                </div>
              </div>

              {/* Quotation Generator */}
              <div className="p-8 bg-[#FAF9FF] border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-[#7C3AED]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left reveal-hidden group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E9E4F2] flex items-center justify-center text-[#7C3AED] text-xl mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300">
                    <i className="fa-solid fa-file-signature" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#1F1B2D] mb-3 group-hover:text-[#7C3AED] transition-colors">
                    Quotation Generator
                  </h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold mb-6">
                    Create professional business quotations online in minutes.
                  </p>
                </div>
                <div className="border-t border-[#E9E4F2] pt-4 mt-2 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">Quotation Generator</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">Quotation Maker</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">Online</span>
                  </div>
                  <Link href="/quotation-generator" className="text-xs font-bold text-[#7C3AED] flex items-center gap-1.5 group-hover:text-[#A78BFA] transition-colors">
                    Create Quotation &rarr;
                  </Link>
                </div>
              </div>

              {/* QR Code Generator */}
              <div className="p-8 bg-[#FAF9FF] border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-[#7C3AED]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left reveal-hidden group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E9E4F2] flex items-center justify-center text-[#7C3AED] text-xl mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300">
                    <i className="fa-solid fa-qrcode" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#1F1B2D] mb-3 group-hover:text-[#7C3AED] transition-colors">
                    QR Code Generator
                  </h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold mb-6">
                    Generate free QR codes for websites, WhatsApp, contact details and business use.
                  </p>
                </div>
                <div className="border-t border-[#E9E4F2] pt-4 mt-2 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">QR Code Generator</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">Free QR</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">WhatsApp QR</span>
                  </div>
                  <Link href="/qr-code-generator" className="text-xs font-bold text-[#7C3AED] flex items-center gap-1.5 group-hover:text-[#A78BFA] transition-colors">
                    Generate QR Code &rarr;
                  </Link>
                </div>
              </div>

              {/* SEO Audit Tool */}
              <div className="p-8 bg-[#FAF9FF] border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-[#7C3AED]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left reveal-hidden group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E9E4F2] flex items-center justify-center text-[#7C3AED] text-xl mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300">
                    <i className="fa-solid fa-chart-line" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#1F1B2D] mb-3 group-hover:text-[#7C3AED] transition-colors">
                    SEO Audit Tool
                  </h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold mb-6">
                    Check your website&apos;s basic SEO performance and discover opportunities to improve search visibility.
                  </p>
                </div>
                <div className="border-t border-[#E9E4F2] pt-4 mt-2 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">SEO Checker</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">Free Audit</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">SEO Tool</span>
                  </div>
                  <Link href="/free-tools" className="text-xs font-bold text-[#7C3AED] flex items-center gap-1.5 group-hover:text-[#A78BFA] transition-colors">
                    Check SEO &rarr;
                  </Link>
                </div>
              </div>

              {/* Image Compressor */}
              <div className="p-8 bg-[#FAF9FF] border border-[#E9E4F2] rounded-[24px] shadow-sm hover:shadow-md hover:border-[#7C3AED]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left reveal-hidden group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E9E4F2] flex items-center justify-center text-[#7C3AED] text-xl mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300">
                    <i className="fa-solid fa-file-image" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#1F1B2D] mb-3 group-hover:text-[#7C3AED] transition-colors">
                    Image Compressor
                  </h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold mb-6">
                    Compress images online and reduce file size while maintaining good image quality.
                  </p>
                </div>
                <div className="border-t border-[#E9E4F2] pt-4 mt-2 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">Compress Image</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">JPG / PNG</span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded">Compress Online</span>
                  </div>
                  <Link href="/free-tools" className="text-xs font-bold text-[#7C3AED] flex items-center gap-1.5 group-hover:text-[#A78BFA] transition-colors">
                    Compress Image &rarr;
                  </Link>
                </div>
              </div>

            </div>

            {/* View All Tools CTA Button */}
            <div className="text-center mb-16 reveal-hidden">
              <Link
                href="/free-tools"
                className="inline-flex items-center gap-2 bg-[#171126] hover:bg-slate-800 hover:scale-[1.025] text-white font-bold text-xs px-8 py-4 rounded-xl transition-all group"
              >
                Explore All Free Tools <i className="fa-solid fa-arrow-right-long text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Homepage SEO Paragraph Content block */}
            <div className="max-w-4xl mx-auto border-t border-[#E9E4F2] pt-12 pb-6 text-left reveal-hidden">
              <h3 className="text-sm font-bold text-[#1F1B2D] uppercase tracking-wider mb-3">Free Online Tools for Businesses</h3>
              <p className="text-xs text-[#6B6478] leading-relaxed font-semibold">
                Joy Digital provides a growing collection of free online business tools designed to make everyday tasks faster and easier. Use our GST calculator, invoice generator, quotation generator, QR code generator, SEO audit tool and image compressor directly from your browser. These tools are designed for businesses, freelancers, professionals and individuals who want simple solutions without complicated software.
              </p>
            </div>

            {/* Near Me Local SEO Keyword Copy Block */}
            <div className="max-w-4xl mx-auto border-t border-[#E9E4F2] pt-8 pb-6 text-left reveal-hidden">
              <h3 className="text-sm font-bold text-[#1F1B2D] uppercase tracking-wider mb-3">Looking for a Web Developer or Website Designer Near Me?</h3>
              <p className="text-xs text-[#6B6478] leading-relaxed font-semibold mb-4">
                If you are searching for a trusted <strong>web developer near me</strong>, a creative <strong>website designer near me</strong>, or an experienced <strong>website developer near me</strong>, Joy Digital is your premier digital engineering team. We build high-speed Next.js websites, custom web applications, responsive corporate portals, and data-driven local SEO campaigns engineered to bring local and global customers straight to your business.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold text-[#7C3AED]">
                <span className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-1 rounded-full">✓ Web Developer Near Me</span>
                <span className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-1 rounded-full">✓ Website Designer Near Me</span>
                <span className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-1 rounded-full">✓ Website Developer Near Me</span>
                <span className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-1 rounded-full">✓ Web Designer Near Me</span>
              </div>
            </div>

            {/* Lead Gen block */}
            <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-8 sm:p-12 rounded-[24px] shadow-sm text-left flex flex-col justify-between hover:border-[#7C3AED]/15 transition-colors max-w-5xl mx-auto mt-8 reveal-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8">
                  <h3 className="text-lg sm:text-xl font-black text-[#1F1B2D] mb-3">Need a Website or Digital Solution for Your Business?</h3>
                  <p className="text-xs sm:text-sm text-[#6B6478] leading-relaxed font-semibold">
                    From professional websites and e-commerce solutions to SEO and digital marketing, Joy Digital helps businesses build a stronger online presence.
                  </p>
                </div>
                <div className="md:col-span-4 flex flex-col gap-3 justify-end">
                  <a
                    href="#enquiry-section"
                    onClick={() => handleCtaEvent("Free Tools Lead Consultation")}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-center font-bold text-xs py-3.5 px-6 rounded-xl shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    Get a Free Consultation
                  </a>
                  <a
                    href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I%20saw%20your%20free%20business%20tools%20and%20I'd%20like%2520to%2520get%2520a%2520free%2520consultation%2520for%2520my%2520business."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleWaEvent("free_tools_cta")}
                    className="bg-[#10b981] hover:bg-[#059669] text-white text-center font-bold text-xs py-3.5 px-6 rounded-xl shadow-sm hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-brands fa-whatsapp text-sm" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. PORTFOLIO / OUR WORK (INTERACTIVE IMAGE ZOOM & OVERLAY) */}
        <section id="portfolio-section" className="py-20 bg-white border-b border-[#E9E4F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
                Featured Work
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                Real Client Success Showcases
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">
                Genuine custom developments designed to generate inbound client actions. No fake placeholders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {PORTFOLIO_PROJECTS.map((proj, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-[#E9E4F2] rounded-[24px] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-[#7C3AED]/25 transition-all duration-355 reveal-hidden group"
                >
                  <div>
                    {/* Next.js Image component with scale on hover */}
                    <div className="relative w-full h-56 bg-[#FAF9FF] border-b border-[#E9E4F2] overflow-hidden">
                      <Image
                        src={proj.image}
                        alt={`${proj.client} showcase preview`}
                        fill
                        sizes="(max-w-768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.045]"
                        loading="lazy"
                      />
                      
                      {/* Premium overlay visible on desktop hover (Deep Purple background) */}
                      <div className="absolute inset-0 bg-[#171126]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 hidden lg:flex pointer-events-none">
                        <div className="text-center text-white transform translate-y-3 group-hover:translate-y-0 transition-transform duration-350">
                          <span className="text-[10px] font-extrabold text-[#A78BFA] uppercase tracking-wider block mb-2">{proj.industry}</span>
                          <span className="text-base font-black block mb-4">{proj.client}</span>
                          <span className="inline-flex items-center gap-1.5 bg-[#7C3AED] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md">
                            View Case Study <i className="fa-solid fa-arrow-right" />
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8 text-left">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 lg:hidden">
                        <span className="bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/25 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                          {proj.industry}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-black text-[#1F1B2D] mb-3 leading-snug">
                        {proj.client}
                      </h3>
                      <p className="text-xs font-bold text-[#7C3AED] mb-3">{proj.service}</p>
                      <p className="text-xs text-[#6B6478] leading-relaxed font-semibold">
                        {proj.desc}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#E9E4F2] bg-[#FAF9FF] px-8 py-4.5 flex items-center justify-between">
                    {proj.link ? (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 group/link"
                      >
                        Visit Live Link <i className="fa-solid fa-arrow-up-right-from-square text-[9px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="text-[10px] font-bold text-[#6B6478] uppercase tracking-wider">Client Archive</span>
                    )}
                    <Link
                      href="/portfolio"
                      className="text-xs font-bold text-[#7C3AED] hover:text-[#A78BFA] flex items-center gap-1.5 transition-colors group/case"
                    >
                      Case Details <i className="fa-solid fa-chevron-right text-[8px] group-hover/case:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 reveal-hidden">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 bg-[#171126] hover:bg-slate-800 hover:scale-[1.025] text-white font-bold text-xs px-8 py-4 rounded-xl transition-all group"
              >
                View All Projects <i className="fa-solid fa-arrow-right-long text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. HOW WE WORK PROCESS WITH AN ANIMATED CONNECTING LINE */}
        <section id="process-section" className="py-20 bg-white border-b border-[#E9E4F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
                Process Workflow
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                Our Simple 5-Step Process
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">
                How we take project parameters from discovery draft into search engine launch.
              </p>
            </div>

            <div className="relative">
              {/* Progressive animated horizontal connecting gradient line (purple theme) */}
              <div className="absolute top-6 left-12 right-12 h-[2px] bg-slate-100 hidden lg:block z-0">
                <div 
                  className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] origin-left transition-transform duration-1000 ease-out"
                  style={{ transform: processInView ? "scaleX(1)" : "scaleX(0)" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
                {PROCESS_STEPS.map((step, idx) => (
                  <div 
                    key={idx} 
                    style={{ transitionDelay: `${idx * 150}ms` }}
                    className="flex flex-col items-start text-left group reveal-hidden"
                  >
                    <div className="relative mb-6">
                      <span className="text-4xl font-black text-[#7C3AED]/15 group-hover:text-[#7C3AED] transition-colors duration-300">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[#1F1B2D] mb-3 group-hover:text-[#7C3AED] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#6B6478] leading-relaxed font-semibold">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. WHY JOY DIGITAL (Soft background alternates) */}
        <section className="py-20 bg-[#FAF9FF] border-b border-[#E9E4F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
                Value System
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                Our Business-Focused Approach
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">
                We combine search exposure parameters with premium frameworks to optimize performance metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {[
                { title: "Business-Focused Solutions", desc: "We structure interfaces to capture user actions. Every button, input, and title fits your corporate goal." },
                { title: "Modern Technology Stack", desc: "We build layouts in Next.js and React. Your visitors do not load slow database templates, securing under 1.5s load speeds." },
                { title: "Mobile-First Infrastructure", desc: "Every layout matches responsive standards. Viewport pickers, click targets, and code scales for phone screens." },
                { title: "SEO-Friendly Development", desc: "We embed structured schemas, configure canon mappings, map titles, and verify search sitemaps as standard features." },
                { title: "Direct & Clear Communication", desc: "No complex administrative interfaces. Speak with the engineers creating your site to execute amendments quickly." },
                { title: "Ongoing Technical Support", desc: "We handle SSL configurations, domain mappings, hosting setup, security checks, and speed reports post-launch." }
              ].map((val, idx) => (
                <div 
                  key={idx} 
                  style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
                  className="bg-white border border-[#E9E4F2] p-8 rounded-[24px] shadow-sm hover:shadow-md hover:border-[#7C3AED]/20 hover:-translate-y-1 transition-all duration-300 reveal-hidden"
                >
                  <h3 className="text-sm font-extrabold text-[#1F1B2D] mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#7C3AED] rounded-full shrink-0" />
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed font-semibold">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. GLOBAL CONNECTIONS NETWORK WIDGET (Deep Dark background #0D0B18) */}
        <section className="py-20 bg-[#0D0B18] border-b border-[#231C3D] text-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <WorldwideServiceNetwork />
          </div>
        </section>

        {/* 9. CASE STUDIES WITH COUNT-UP NUMERICAL COUNTERS */}
        <section id="case-studies" className="py-20 bg-white border-b border-[#E9E4F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
                Verified Outcomes
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                Real Problems. Real Solutions. Real Results.
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">
                Technical diagnostics and outcomes from genuine client partnerships. No manufactured stats.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CASE_STUDIES.map((study, idx) => (
                <div 
                  key={idx}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                  className="bg-[#FAF9FF] border border-[#E9E4F2] rounded-[24px] p-8 flex flex-col justify-between text-left hover:shadow-md hover:border-[#7C3AED]/15 transition-all duration-300 reveal-hidden group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="text-[10px] font-extrabold text-[#7C3AED] uppercase tracking-wider bg-white border border-[#7C3AED]/25 px-3 py-1 rounded-full">
                        {study.category}
                      </span>
                      <span className="text-sm font-black text-emerald-600 flex items-center gap-1">
                        <i className="fa-solid fa-arrow-trend-up text-xs animate-bounce" />
                        <CountUpNumber target={study.targetNum} suffix="%" />
                      </span>
                    </div>

                    <h3 className="text-base font-black text-[#1F1B2D] mb-4 leading-tight group-hover:text-[#7C3AED] transition-colors">
                      {study.title}
                    </h3>
                    
                    <div className="flex flex-col gap-4 text-xs font-semibold text-[#6B6478]">
                      <p>
                        <strong className="text-[#1F1B2D] block mb-1">Challenge:</strong> {study.problem}
                      </p>
                      <p>
                        <strong className="text-[#1F1B2D] block mb-1">Execution:</strong> {study.solution}
                      </p>
                      <p>
                        <strong className="text-emerald-700 block mb-1">Result:</strong> {study.result}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#E9E4F2]">
                    <Link
                      href={`/case-studies`}
                      className="text-xs font-bold text-[#7C3AED] hover:text-[#A78BFA] flex items-center gap-1.5 group/case"
                    >
                      Read Case Narrative <i className="fa-solid fa-chevron-right text-[8px] group-hover/case:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. TESTIMONIALS */}
        <section className="py-20 bg-white border-b border-[#E9E4F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
                Client Reviews
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">
                Feedback from local financial advisors, store directors, and corporate partners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {TESTIMONIALS.map((t, idx) => (
                <div 
                  key={idx} 
                  style={{ transitionDelay: `${idx * 100}ms` }}
                  className="bg-[#FAF9FF] border border-[#E9E4F2] p-8 rounded-[20px] shadow-sm flex flex-col justify-between text-left hover:shadow-md hover:border-[#7C3AED]/15 transition-all duration-300 reveal-hidden"
                >
                  <div>
                    <div className="flex gap-1 text-[#7C3AED] mb-4 text-xs">
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                    </div>
                    <p className="text-xs text-[#6B6478] italic leading-relaxed mb-6 font-semibold">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 border-t border-[#E9E4F2] pt-4 mt-2">
                    <div className="w-9 h-9 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {t.initials}
                    </div>
                    <div className="flex-grow">
                      <span className="text-xs font-bold text-[#1F1B2D] block leading-tight">{t.name}</span>
                      <span className="text-[10px] text-[#6B6478] block mt-0.5 font-bold">{t.role} — {t.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promotion card inviting new reviews */}
            <div className="bg-white border border-[#E9E4F2] p-8 rounded-[24px] shadow-sm max-w-xl mx-auto text-center reveal-hidden">
              <h3 className="text-sm font-extrabold text-[#1F1B2D] uppercase tracking-wider mb-2">Are you our next success story?</h3>
              <p className="text-xs text-[#6B6478] font-semibold leading-relaxed mb-4">
                We work closely with startup founders and local operators worldwide. Start a campaign with us and share your review when we deploy!
              </p>
              <a
                href="#enquiry-section"
                className="text-xs font-bold text-[#7C3AED] hover:text-[#A78BFA]"
              >
                Inquire About a Project Now &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* 11. PRICING SECTION */}
        <section className="py-20 bg-white border-b border-[#E9E4F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
                Transparent Pricing
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                Startup-Friendly Pricing Packages
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">
                Sleek, transparent rates. No surprise setup fees, no complex monthly models.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {/* Card 1: Starter Website */}
              <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-8 rounded-[24px] shadow-sm flex flex-col justify-between text-left hover:shadow-lg hover:border-[#7C3AED]/40 transition-all duration-300 reveal-hidden group">
                <div>
                  <span className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full mb-4">Standard Setup</span>
                  <h3 className="text-lg font-black text-[#1F1B2D] mb-2 group-hover:text-[#7C3AED] transition-colors">Starter Website</h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed mb-6 font-semibold">Perfect for new local service businesses wanting to establish professional authority online.</p>
                  
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#171126]">₹15,000</span>
                    <span className="text-xs text-[#6B6478] font-semibold">One-time (approx. $200)</span>
                  </div>

                  <ul className="flex flex-col gap-3 text-xs text-[#6B6478] font-semibold border-t border-[#E9E4F2] pt-6 mb-8">
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Custom responsive website</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Mobile optimization</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> WhatsApp integration</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Lead Contact form</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Basic SEO setup</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Google Search Console sync</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> XML Sitemap generated</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Google Analytics integration</li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I%2520am%2520interested%2520in%2520the%2520Starter%2520Website%2520package.%2520Please%2520share%2520the%2520details."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    handleWaEvent("pricing_starter");
                    handleCtaEvent("Get Started - Starter");
                  }}
                  className="w-full text-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs py-3.5 rounded-xl shadow-sm transition-all"
                >
                  Get Started
                </a>
              </div>

              {/* Card 2: Business Growth Website (Recommended) */}
              <div className="bg-[#FAF9FF] border border-[#7C3AED] p-8 rounded-[24px] shadow-sm flex flex-col justify-between text-left hover:shadow-lg hover:border-[#7C3AED]/60 transition-all duration-300 reveal-hidden group relative">
                <div className="absolute top-4 right-4">
                  <span className="bg-[#7C3AED] text-white font-black text-[8px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">Recommended</span>
                </div>
                <div>
                  <span className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full mb-4">Enterprise & Growth</span>
                  <h3 className="text-lg font-black text-[#1F1B2D] mb-2 group-hover:text-[#7C3AED] transition-colors">Business Growth Website</h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed mb-6 font-semibold">Recommended for companies targeting local search rankings and active online client acquisition.</p>
                  
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#171126]">₹35,000</span>
                    <span className="text-xs text-[#6B6478] font-semibold">Starting rate (approx. $450)</span>
                  </div>

                  <ul className="flex flex-col gap-3 text-xs text-[#6B6478] font-semibold border-t border-[#E9E4F2] pt-6 mb-8">
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Custom website layout</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Conversion-focused UI/UX</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> SEO-ready architecture</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Advanced contact forms</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> WhatsApp leads sync</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Search Console configuration</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Google Analytics event tracking</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Core Web Vitals speed tuning</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Basic content copywriting check</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Admin panel / CMS option</li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I%2520need%2520a%2520quote%252520for%252520the%252520Business%252520Growth%252520Website%252520package.%252520Please%252520share%252520details."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    handleWaEvent("pricing_growth");
                    handleCtaEvent("Request a Quote - Business");
                  }}
                  className="w-full text-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs py-3.5 rounded-xl shadow-sm transition-all"
                >
                  Request a Quote
                </a>
              </div>

              {/* Card 3: Website + SEO Growth */}
              <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-8 rounded-[24px] shadow-sm flex flex-col justify-between text-left hover:shadow-lg hover:border-[#7C3AED]/40 transition-all duration-300 reveal-hidden group">
                <div>
                  <span className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full mb-4">Complete SEO Solution</span>
                  <h3 className="text-lg font-black text-[#1F1B2D] mb-2 group-hover:text-[#7C3AED] transition-colors">Website + SEO Growth</h3>
                  <p className="text-xs text-[#6B6478] leading-relaxed mb-6 font-semibold">Perfect for companies seeking persistent ranking growth, organic pipelines, and local lead dominance.</p>
                  
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#171126]">Custom Quote</span>
                    <span className="text-xs text-[#6B6478] font-semibold">Monthly SEO retainer campaigns</span>
                  </div>

                  <ul className="flex flex-col gap-3 text-xs text-[#6B6478] font-semibold border-t border-[#E9E4F2] pt-6 mb-8">
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Custom website layout</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Technical SEO code audits</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Advanced On-page SEO setup</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> High-intent keyword research</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Local SEO & maps optimizations</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Google Business Profile setups</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Comprehensive content strategy</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Monthly SEO retainer campaigns</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Index monitoring & audit fixes</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500" /> Google Search Console reporting</li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I%2520am%2520interested%2520in%2520the%2520Website%2520%2B%2520SEO%2520Growth%2520package.%2520Please%2520connect%2520me%2520with%2520an%2520SEO%2520expert."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    handleWaEvent("pricing_seo");
                    handleCtaEvent("Talk to an SEO Expert");
                  }}
                  className="w-full text-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs py-3.5 rounded-xl shadow-sm transition-all"
                >
                  Talk to an SEO Expert
                </a>
              </div>
            </div>
            
            <p className="text-[10px] text-[#6B6478] font-bold uppercase tracking-wider text-center mt-8">
              Need a custom layout or dedicated corporate contract? <a href="https://wa.me/919080026133" className="text-[#7C3AED] underline hover:text-[#A78BFA]">Chat with our engineers</a>.
            </p>
          </div>
        </section>

        {/* 12. FAQ SECTION */}
        <section className="py-20 bg-[#FAF9FF]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
                FAQ
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F1B2D] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6478] font-semibold">
                Quick answers regarding site pricing plans, delivery timelines, maps optimizations, and global services.
              </p>
            </div>

            <div className="max-w-3xl mx-auto text-left reveal-hidden">
              <Accordion items={HOME_FAQS} />
            </div>
          </div>
        </section>

        {/* 13. FINAL CTA WITH MICRO INTERACTIONS (Deep Purple background #171126) */}
        <section className="relative py-20 bg-[#171126] border-t border-[#2A203F] overflow-hidden text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 max-w-3xl mx-auto flex flex-col items-center reveal-hidden">
            <span className="inline-block bg-[#7C3AED]/10 text-[#A78BFA] font-extrabold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#7C3AED]/35 mb-6">
              Start Scaling Today
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-5 leading-tight">
              Ready to Grow Your Business Online?
            </h2>
            <p className="text-sm md:text-base text-[#D8D2E6] max-w-xl mx-auto mb-10 leading-relaxed font-semibold">
              Let&apos;s build a website and digital strategy designed around your business goals.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/free-website-audit"
                onClick={() => handleCtaEvent("Get Free Website Audit - Final")}
                className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] hover:scale-[1.025] hover:shadow-lg transition-all text-white font-bold text-xs px-8 py-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 group"
              >
                Get Free Website Audit
                <i className="fa-solid fa-arrow-right group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              
              <a
                href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I%20need%20a%20website%20for%20my%20business.%20I%20would%20like%20to%20know%20the%20pricing%20and%20process."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWaEvent("final_cta")}
                className="w-full sm:w-auto bg-[#10b981] hover:bg-[#059669] hover:scale-[1.025] hover:shadow-lg transition-all text-white font-bold text-xs px-8 py-4 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-brands fa-whatsapp text-lg animate-pulse" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* 14. FOOTER & UNIFIED FLOATING WIDGET */}
      <Footer />
      <UnifiedFloatingWidget />
    </>
  );
}
