"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import JsonLd from "@/components/seo/JsonLd";
import Accordion from "@/components/ui/Accordion";
import { buildPageGraphSchema } from "@/lib/seo/schema";
import { getUtmParameters } from "@/lib/utmTracker";

// Country list for free website audit form
const COUNTRY_LIST = [
  { name: "Kenya", code: "+254", flag: "🇰🇪" },
  { name: "Tanzania", code: "+255", flag: "🇹🇿" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "Namibia", code: "+264", flag: "🇳🇦" },
  { name: "Botswana", code: "+267", flag: "🇧🇼" },
  { name: "Zambia", code: "+260", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "+263", flag: "🇿🇼" },
  { name: "Uganda", code: "+256", flag: "🇺🇬" },
  { name: "Rwanda", code: "+250", flag: "🇷🇼" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Other Country", code: "+", flag: "🌍" },
];

const TOURISM_BUSINESS_TYPES = [
  {
    icon: "fa-solid fa-compass",
    title: "Safari Tour Operators",
    description: "Showcase safari packages, wildlife experiences, destinations and itineraries.",
    tag: "Safari Specialist",
  },
  {
    icon: "fa-solid fa-route",
    title: "Tour Operators",
    description: "Present tours, packages, itineraries, pricing and travel experiences.",
    tag: "Tour Booking",
  },
  {
    icon: "fa-solid fa-plane-departure",
    title: "Travel Agencies",
    description: "Build a professional online presence and generate qualified travel enquiries.",
    tag: "Agency Growth",
  },
  {
    icon: "fa-solid fa-campground",
    title: "Lodges & Safari Camps",
    description: "Showcase rooms, facilities, experiences, galleries and booking enquiries.",
    tag: "Hospitality & Stay",
  },
  {
    icon: "fa-solid fa-hotel",
    title: "Hotels & Resorts",
    description: "Present accommodation, amenities, offers and enquiry options.",
    tag: "Luxury Stays",
  },
  {
    icon: "fa-solid fa-handshake",
    title: "Destination Management Companies",
    description: "Create professional websites for DMCs serving international travellers and travel partners.",
    tag: "B2B & B2C DMC",
  },
];

const TOURISM_FEATURES = [
  { title: "Custom UI/UX Design", icon: "fa-solid fa-palette", desc: "Bespoke design tailored to your African tourism brand identity." },
  { title: "Mobile-First Development", icon: "fa-solid fa-mobile-screen-button", desc: "Flawless mobile browsing for travellers on smartphones." },
  { title: "Tour Package Pages", icon: "fa-solid fa-box-archive", desc: "Detailed day-wise package showcases with inclusions & maps." },
  { title: "Destination Pages", icon: "fa-solid fa-map-location-dot", desc: "Rich guides for national parks, reserves & coastal spots." },
  { title: "Itinerary Management", icon: "fa-solid fa-list-check", desc: "Flexible day-by-day itinerary schedules with interactive tabs." },
  { title: "Booking Enquiry System", icon: "fa-solid fa-calendar-check", desc: "Streamlined enquiry forms capturing dates & guest counts." },
  { title: "Quote Request Forms", icon: "fa-solid fa-calculator", desc: "Custom rate quote calculators for safari groups & private tours." },
  { title: "WhatsApp Integration", icon: "fa-brands fa-whatsapp", desc: "Instant click-to-chat WhatsApp lead routing for package queries." },
  { title: "Google Maps", icon: "fa-solid fa-location-dot", desc: "Interactive maps showing safari routes & lodge locations." },
  { title: "Photo & Video Galleries", icon: "fa-solid fa-images", desc: "High-resolution wildlife photo & video sliders for immersion." },
  { title: "Reviews & Testimonials", icon: "fa-solid fa-star", desc: "TripAdvisor, Google & direct guest review showcases." },
  { title: "Blog / Travel Guides", icon: "fa-solid fa-newspaper", desc: "SEO-friendly travel tips, wildlife migration guides & blogs." },
  { title: "FAQ", icon: "fa-solid fa-circle-question", desc: "Expandable accordions answering common safari travel questions." },
  { title: "SEO-Friendly Architecture", icon: "fa-solid fa-magnifying-glass", desc: "Sub-second Next.js SSR architecture built to rank on Google." },
  { title: "Google Analytics", icon: "fa-solid fa-chart-line", desc: "Real-time traffic and conversion tracking pre-installed." },
  { title: "Conversion Tracking", icon: "fa-solid fa-bullseye", desc: "Track form submissions, WhatsApp clicks & phone calls." },
  { title: "Social Media Integration", icon: "fa-solid fa-share-nodes", desc: "Live Instagram feeds and travel community social links." },
  { title: "CMS / Admin Panel", icon: "fa-solid fa-sliders", desc: "Custom dashboard to update tours, prices & images without coding." },
  { title: "Speed Optimization", icon: "fa-solid fa-bolt", desc: "Sub-1.2s page loads on global edge networks for fast browsing." },
  { title: "Security Optimization", icon: "fa-solid fa-shield-halved", desc: "Serverless static hosting with SSL encryption & zero plugin hacks." },
];

const ADMIN_FUNCTIONS = [
  { title: "Add / Edit Tours", desc: "Manage safari packages, duration, pricing, and inclusions effortlessly.", icon: "fa-solid fa-suitcase" },
  { title: "Add / Edit Destinations", desc: "Create new park and wildlife reserve pages with custom imagery.", icon: "fa-solid fa-earth-africa" },
  { title: "Update Prices", desc: "Modify seasonal rates, peak pricing, and currency displays in real time.", icon: "fa-solid fa-tags" },
  { title: "Update Itineraries", desc: "Edit day-by-day schedules, hotel stays, and activity lists instantly.", icon: "fa-solid fa-calendar-days" },
  { title: "Upload Images", desc: "Drag-and-drop high-definition safari photos directly into galleries.", icon: "fa-solid fa-cloud-arrow-up" },
  { title: "Manage Enquiries", desc: "View, filter, and respond to incoming guest booking enquiries.", icon: "fa-solid fa-inbox" },
  { title: "Manage Booking Requests", desc: "Track reservation status, custom quote requests, and guest notes.", icon: "fa-solid fa-clipboard-list" },
  { title: "Manage Testimonials", desc: "Publish new guest feedback, ratings, and TripAdvisor reviews.", icon: "fa-solid fa-quote-left" },
  { title: "Manage Blog Posts", desc: "Publish safari travel guides, packing tips, and wildlife news.", icon: "fa-solid fa-pen-to-square" },
  { title: "Manage FAQs", desc: "Update guest preparation notes, visa advice, and safari FAQs.", icon: "fa-solid fa-circle-info" },
];

const INTERNATIONAL_HIGHLIGHTS = [
  { title: "Mobile-first experience", desc: "Optimized for international travellers researching trips on mobile devices." },
  { title: "Fast loading", desc: "Global edge CDN ensures pages load in under 1.2 seconds across Europe & Americas." },
  { title: "Clear tour information", desc: "Transparent day-wise itineraries, pricing breakdown, and inclusions." },
  { title: "Easy enquiry process", desc: "Simple 2-click quote request forms requiring minimal effort." },
  { title: "Strong trust signals", desc: "Security SSL badges, license numbers, review widgets & verified guest quotes." },
  { title: "Reviews & testimonials", desc: "High-visibility feedback from global travellers to instill instant confidence." },
  { title: "WhatsApp communication", desc: "Direct pre-filled WhatsApp click to chat for fast international response." },
  { title: "SEO-ready structure", desc: "Structured data and semantic markup to rank for high-intent safari searches." },
  { title: "Professional photography", desc: "Optimized high-resolution galleries bringing African wildlife to life." },
  { title: "Clear calls-to-action", desc: "Prominent consultation and booking buttons placed at high-conversion zones." },
];

const AFRICA_COUNTRIES = [
  { name: "Namibia", capital: "Windhoek", highlight: "Deserts & Etosha Safari", icon: "fa-solid fa-sun" },
  { name: "Kenya", capital: "Nairobi", highlight: "Maasai Mara & Great Migration", icon: "fa-solid fa-binoculars" },
  { name: "Tanzania", capital: "Dodoma", highlight: "Serengeti & Kilimanjaro", icon: "fa-solid fa-mountain" },
  { name: "South Africa", capital: "Pretoria", highlight: "Kruger National Park & Cape Town", icon: "fa-solid fa-paw" },
  { name: "Botswana", capital: "Gaborone", highlight: "Okavango Delta Wildlife", icon: "fa-solid fa-water" },
  { name: "Zambia", capital: "Lusaka", highlight: "Victoria Falls & South Luangwa", icon: "fa-solid fa-cloud-showers-water" },
  { name: "Zimbabwe", capital: "Harare", highlight: "Hwange & Mana Pools", icon: "fa-solid fa-tree" },
  { name: "Uganda", capital: "Kampala", highlight: "Gorilla Trekking & Bwindi", icon: "fa-solid fa-leaf" },
  { name: "Rwanda", capital: "Kigali", highlight: "Volcanoes National Park", icon: "fa-solid fa-volcano" },
];

const WHY_JOY_DIGITAL = [
  {
    title: "Custom Development",
    description: "Built around your business instead of using a generic template.",
    icon: "fa-solid fa-code",
  },
  {
    title: "Conversion-Focused",
    description: "Designed to encourage visitors to enquire or request a quote.",
    icon: "fa-solid fa-bullseye",
  },
  {
    title: "SEO Ready",
    description: "Clean technical structure prepared for search engine optimization.",
    icon: "fa-solid fa-chart-line",
  },
  {
    title: "Mobile First",
    description: "Optimized for travellers browsing on smartphones.",
    icon: "fa-solid fa-mobile-screen",
  },
  {
    title: "Easy Management",
    description: "Update tours, destinations and content through an admin panel.",
    icon: "fa-solid fa-sliders",
  },
  {
    title: "Global Audience Ready",
    description: "Designed for African tourism businesses targeting international customers.",
    icon: "fa-solid fa-globe",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description: "Understand your business, destinations, customers and goals.",
    icon: "fa-solid fa-compass",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Plan website structure, content and customer journey.",
    icon: "fa-solid fa-chess-board",
  },
  {
    step: "03",
    title: "UI/UX Design",
    description: "Design a premium tourism-focused experience using the existing Joy Digital design system.",
    icon: "fa-solid fa-pen-ruler",
  },
  {
    step: "04",
    title: "Development",
    description: "Develop the custom website using modern technologies.",
    icon: "fa-solid fa-laptop-code",
  },
  {
    step: "05",
    title: "Testing",
    description: "Test mobile responsiveness, speed, forms, SEO and functionality.",
    icon: "fa-solid fa-vial-circle-check",
  },
  {
    step: "06",
    title: "Launch",
    description: "Deploy the website and provide ongoing support.",
    icon: "fa-solid fa-rocket",
  },
];

const TOURISM_FAQS = [
  {
    question: "Can you build a custom website for a safari company?",
    answer: "Yes! We specialize in custom safari website development for African safari operators. We build custom package showcases, day-by-day wildlife itineraries, high-resolution photo galleries, inclusion lists, and direct WhatsApp booking enquiry systems.",
  },
  {
    question: "Can you build a website for a tour operator in Africa?",
    answer: "Absolutely. We craft high-converting websites for tour operators across Africa including Kenya, Tanzania, South Africa, Namibia, Botswana, Zambia, Zimbabwe, Uganda, and Rwanda. Our websites are designed to convert international travel traffic into direct bookings.",
  },
  {
    question: "Can you add booking and enquiry functionality?",
    answer: "Yes, we build interactive booking enquiry systems, quote request forms, customizable package inquiry flows, and custom itinerary builders so prospective travellers can seamlessly submit their dates, budget, and travel preferences.",
  },
  {
    question: "Can you integrate WhatsApp?",
    answer: "Yes! We integrate direct click-to-chat WhatsApp communication buttons with pre-filled package inquiry templates, allowing international travellers to instantly contact your team directly from their mobile devices.",
  },
  {
    question: "Can you build an admin panel?",
    answer: "Yes, every tourism website we build includes a user-friendly custom admin dashboard. Your team can easily add or edit tour packages, update destinations, change prices, modify itineraries, upload safari photos, manage enquiries, and publish blog guides without touching any code.",
  },
  {
    question: "Can you optimize the website for Google?",
    answer: "Yes, technical SEO is built into our core architecture. We optimize page load speed (under 1.2 seconds), mobile responsiveness, semantic HTML structure, dynamic XML sitemaps, Open Graph tags, and structured JSON-LD schemas targeting high-intent keywords like 'tourism website development Africa'.",
  },
  {
    question: "Can the website target international travellers?",
    answer: "Definitely. Our websites are specifically optimized for international audiences in Europe, the UK, USA, Canada, Australia, and worldwide with fast global edge delivery, multi-currency display capability, international contact forms, and strong trust signals.",
  },
  {
    question: "Do you provide website maintenance and support?",
    answer: "Yes, Joy Digital provides complete ongoing website maintenance, hosting setup support, security updates, daily backups, speed monitoring, and content update assistance to ensure your website operates flawlessly 24/7.",
  },
];

export default function AfricaTourismClientPage() {
  const canonicalUrl = "https://joydigital.in/africa/tourism-website-development";
  const serviceName = "Africa Tourism Website Development";

  // Form state for Free Website Audit section
  const [auditFormData, setAuditFormData] = useState({
    name: "",
    companyName: "",
    website: "",
    email: "",
    whatsapp: "",
    country: "Kenya",
    message: "",
  });

  const [auditErrors, setAuditErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuditSuccess, setIsAuditSuccess] = useState(false);

  const handleAuditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAuditFormData((prev) => ({ ...prev, [name]: value }));
    if (auditErrors[name]) {
      setAuditErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateAuditForm = () => {
    const errs: Record<string, string> = {};
    if (!auditFormData.name.trim()) errs.name = "Full Name is required.";
    if (!auditFormData.companyName.trim()) errs.companyName = "Business Name is required.";

    if (!auditFormData.website.trim()) {
      errs.website = "Website URL is required.";
    } else {
      const webReg = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;
      if (!webReg.test(auditFormData.website.trim())) {
        errs.website = "Please enter a valid website URL.";
      }
    }

    if (!auditFormData.email.trim()) {
      errs.email = "Email Address is required.";
    } else {
      const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailReg.test(auditFormData.email.trim())) {
        errs.email = "Please enter a valid email address.";
      }
    }

    const waVal = auditFormData.whatsapp.trim();
    if (!waVal) {
      errs.whatsapp = "WhatsApp Number is required.";
    } else {
      const nums = waVal.replace(/\D/g, "");
      if (nums.length < 7) {
        errs.whatsapp = "Please enter a valid WhatsApp number.";
      }
    }

    setAuditErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAuditForm()) return;

    setIsSubmitting(true);
    try {
      const utm = getUtmParameters();
      const payload = {
        name: auditFormData.name.trim(),
        companyName: auditFormData.companyName.trim(),
        website: auditFormData.website.trim(),
        email: auditFormData.email.trim(),
        mobile: auditFormData.whatsapp.trim(),
        country: auditFormData.country,
        service: "Free Tourism Website Audit (Africa)",
        message: `Country: ${auditFormData.country}. Notes: ${auditFormData.message.trim() || "Free Tourism Website Audit requested for African Business."}`,
        source: "Africa Tourism Website Development Landing Page Audit Form",
        utmParams: utm || undefined,
        _subject: `🔥 Free Tourism Website Audit Request [Africa] - Joy Digital`,
        _captcha: "false",
        _template: "table",
      };

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit audit form");
      }

      // Track event
      if (typeof window !== "undefined") {
        const tracker = (window as any).trackJoyDigitalEvent;
        if (typeof tracker === "function") {
          tracker("contact_form_submission", {
            form_source: "Africa Tourism Free Website Audit Form",
            page_url: window.location.href,
            country: auditFormData.country,
          });
        }
      }

      setIsAuditSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please contact us via WhatsApp directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageGraphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Custom Tourism Website Development for African Businesses | Joy Digital",
    description:
      "We build modern, fast and conversion-focused websites for African tour operators, safari companies, lodges, hotels and travel businesses targeting travellers worldwide.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "Africa Tourism Website Development", item: canonicalUrl },
    ],
    service: {
      name: serviceName,
      description:
        "Custom tourism website development for safari operators, lodges, hotels, and DMCs across Africa targeting global travellers.",
    },
    faqs: TOURISM_FAQS,
  });

  return (
    <>
      <JsonLd schema={pageGraphSchema} />
      <Header />

      <main className="pt-24 lg:pt-32">
        {/* HERO SECTION */}
        <section className="relative py-16 lg:py-24 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Breadcrumb navigation */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[10px] font-bold text-text-muted mb-4 uppercase tracking-widest">
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <span className="text-text-muted">Africa</span>
                <span className="text-gray-300">/</span>
                <span className="text-primary-dark">Tourism Website Development</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs font-bold text-accent-dark uppercase tracking-wider">
                  African Tourism Industry Specialists
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-6 leading-tight">
                Custom Tourism Website Development for <span className="text-[#7C3AED]">African Businesses</span>
              </h1>

              <p className="text-base text-text-secondary mb-8 max-w-2xl leading-relaxed">
                We build modern, fast and conversion-focused websites for African tour operators, safari companies, lodges, hotels and travel businesses targeting travellers worldwide.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
                <button
                  type="button"
                  onClick={() => {
                    const target = document.getElementById("free-audit");
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full sm:w-auto bg-primary hover:bg-primary-light text-white font-bold text-xs px-8 py-4 rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center cursor-pointer"
                >
                  Get Free Consultation
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const target = document.getElementById("free-audit");
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full sm:w-auto bg-light-bg hover:bg-gray-200 text-primary-dark font-bold text-xs px-8 py-4 rounded-full border border-[#E5E7EB] shadow-sm hover:-translate-y-0.5 transition-all duration-300 text-center cursor-pointer"
                >
                  Get Free Website Audit
                </button>

                <a
                  href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I'd%20like%20to%20discuss%20custom%20tourism%20website%20development%20for%20my%20African%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-7 py-4 rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  data-wa-location="africa_tourism_hero"
                >
                  <i className="fa-brands fa-whatsapp text-base" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Target Markets */}
              <div className="pt-6 border-t border-gray-100 w-full">
                <span className="text-[11px] font-extrabold text-primary-dark uppercase tracking-wider block mb-2">
                  Target International Audiences:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-text-secondary">
                  <span className="bg-slate-100 text-primary-dark px-3 py-1 rounded-full border border-slate-200">🇪🇺 Europe</span>
                  <span className="bg-slate-100 text-primary-dark px-3 py-1 rounded-full border border-slate-200">🇬🇧 UK</span>
                  <span className="bg-slate-100 text-primary-dark px-3 py-1 rounded-full border border-slate-200">🇺🇸 USA</span>
                  <span className="bg-slate-100 text-primary-dark px-3 py-1 rounded-full border border-slate-200">🇨🇦 Canada</span>
                  <span className="bg-slate-100 text-primary-dark px-3 py-1 rounded-full border border-slate-200">🇦🇺 Australia</span>
                  <span className="bg-slate-100 text-primary-dark px-3 py-1 rounded-full border border-slate-200">🌍 Global Travellers</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Container */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-[#E5E7EB] bg-slate-900 group">
                <div className="relative h-[380px] sm:h-[440px] w-full">
                  <Image
                    src="/assets/images/african-safari-hero.png"
                    alt="African Safari Tourism Website Development Preview"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                </div>

                {/* Floating Badge overlays */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/40 shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[11px] font-extrabold text-primary-dark uppercase">Sub-1.2s Page Speed</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg">
                      <i className="fa-solid fa-paw" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-primary-dark">African Tourism Tech Stack</h4>
                      <p className="text-[10px] text-text-secondary">Next.js • High Conversion • WhatsApp Lead Ready</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-accent text-white px-2.5 py-1 rounded-md">
                    100% Custom
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRODUCTION SECTION */}
        <section className="py-16 lg:py-24 bg-light-bg">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
              Conversion Engineering & SEO Growth
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-6">
              Build a Tourism Website That Converts Visitors Into Enquiries
            </h2>
            <div className="prose prose-blue max-w-none text-base text-text-secondary leading-relaxed space-y-6 text-left sm:text-center">
              <p className="text-base sm:text-lg font-medium text-primary-dark">
                Your tourism website should do more than showcase beautiful destinations.
              </p>
              <p>
                It should help potential travellers discover your experiences, explore tour packages, understand your services, trust your business and easily send an enquiry.
              </p>
              <p>
                Joy Digital creates <strong>custom tourism website development</strong> and modern <strong>tourism website design Africa</strong> solutions designed specifically for African tourism businesses serving international travellers.
              </p>
              <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm text-xs sm:text-sm text-text-secondary leading-relaxed mt-6">
                <p className="font-semibold text-primary-dark mb-2">
                  Leading Partner for <strong>Tourism Website Development Africa</strong> & <strong>Travel Website Development Africa</strong>
                </p>
                <p>
                  Whether you require full-stack <strong>tourism website development</strong> for safari operators, luxury lodges, or regional travel agencies, we deliver fast, conversion-driven web platforms engineered for Google search visibility and direct lead generation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TOURISM BUSINESS TYPES */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Industry Coverage
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Tourism Websites We Build
              </h2>
              <p className="text-sm text-text-secondary">
                Tailored digital solutions built for every sector of the African travel and hospitality industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TOURISM_BUSINESS_TYPES.map((biz, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-xl group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                        <i className={biz.icon} />
                      </div>
                      <span className="text-[10px] font-extrabold bg-slate-100 text-primary-dark px-3 py-1 rounded-full uppercase tracking-wider">
                        {biz.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-primary-dark mb-3 group-hover:text-accent transition-colors">
                      {biz.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {biz.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Learn More &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-16 lg:py-24 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Full-Feature Suite
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Powerful Features for Tourism Websites
              </h2>
              <p className="text-sm text-text-secondary">
                Everything your travel business needs to attract, engage, and convert international travellers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {TOURISM_FEATURES.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-lg mb-4">
                      <i className={feat.icon} />
                    </div>
                    <h3 className="text-sm font-bold text-primary-dark mb-2">{feat.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ADMIN PANEL SECTION */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 flex flex-col items-start">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                  Developer-Free Management
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-6 leading-tight">
                  Manage Your Tourism Website Easily
                </h2>
                <p className="text-sm md:text-base text-text-secondary mb-8 leading-relaxed">
                  Provide a custom admin dashboard so tourism businesses can manage their website without depending on a developer for every update.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {ADMIN_FUNCTIONS.map((fn, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-light-bg p-3.5 rounded-xl border border-[#E5E7EB]">
                      <div className="w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs shrink-0 mt-0.5">
                        <i className={fn.icon} />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-primary-dark">{fn.title}</h4>
                        <p className="text-[10px] text-text-secondary leading-tight mt-0.5">{fn.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Panel Graphic UI Card */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-lg relative text-white">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-mono text-slate-400 ml-2">joydigital-tourism-admin/dashboard</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2.5 py-1 rounded-full">
                      Live CMS
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/20 text-accent flex items-center justify-center text-sm">
                          <i className="fa-solid fa-suitcase" />
                        </div>
                        <div>
                          <h5 className="text-xs font-extrabold text-white">7-Day Serengeti Wildlife Safari</h5>
                          <p className="text-[10px] text-slate-400">Status: Published • $3,200 USD</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-accent/20 text-accent-light px-2.5 py-1 rounded-md font-bold">Edit Tour</span>
                    </div>

                    <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
                          <i className="fa-solid fa-inbox" />
                        </div>
                        <div>
                          <h5 className="text-xs font-extrabold text-white">New Booking Enquiry (UK Traveller)</h5>
                          <p className="text-[10px] text-slate-400">Maasai Mara Luxury Lodge • 4 Adults</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-500 text-slate-950 font-extrabold px-2.5 py-1 rounded-md">New Lead</span>
                    </div>

                    <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">
                          <i className="fa-solid fa-images" />
                        </div>
                        <div>
                          <h5 className="text-xs font-extrabold text-white">Destination Gallery Updated</h5>
                          <p className="text-[10px] text-slate-400">Okavango Delta Wildlife Photos</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md font-bold">Synced</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>100% Mobile Responsive Dashboard</span>
                    <span className="text-emerald-400 font-bold">Zero Coding Needed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERNATIONAL TRAVELLER SECTION */}
        <section className="py-16 lg:py-24 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Global Travel Standard
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Designed for Travellers Around the World
              </h2>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                African tourism businesses often attract visitors from different countries. Your website should therefore provide a professional, trustworthy and easy-to-use experience for international travellers.
              </p>
            </div>

            {/* Target Countries Ribbon */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm mb-12 flex flex-wrap items-center justify-center gap-4 text-center">
              <span className="text-xs font-extrabold text-primary-dark uppercase tracking-wider">Target Geographies:</span>
              <span className="bg-slate-100 text-primary-dark font-extrabold text-xs px-4 py-2 rounded-full border border-slate-200">Europe</span>
              <span className="bg-slate-100 text-primary-dark font-extrabold text-xs px-4 py-2 rounded-full border border-slate-200">UK</span>
              <span className="bg-slate-100 text-primary-dark font-extrabold text-xs px-4 py-2 rounded-full border border-slate-200">USA</span>
              <span className="bg-slate-100 text-primary-dark font-extrabold text-xs px-4 py-2 rounded-full border border-slate-200">Canada</span>
              <span className="bg-slate-100 text-primary-dark font-extrabold text-xs px-4 py-2 rounded-full border border-slate-200">Australia</span>
              <span className="bg-accent/10 text-accent-dark font-extrabold text-xs px-4 py-2 rounded-full border border-accent/20">International Travellers</span>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {INTERNATIONAL_HIGHLIGHTS.map((hl, idx) => (
                <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-sm mb-3 font-bold">
                      {idx + 1}
                    </div>
                    <h3 className="text-xs font-extrabold text-primary-dark mb-1.5">{hl.title}</h3>
                    <p className="text-[11px] text-text-secondary leading-normal">{hl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AFRICA COUNTRIES */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Pan-African Reach
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Serving Tourism Businesses Across Africa
              </h2>
              <p className="text-sm text-text-secondary">
                Empowering travel companies and lodges in top wildlife and safari destinations across the African continent.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {AFRICA_COUNTRIES.map((country, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                    <i className={country.icon} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-primary-dark group-hover:text-accent transition-colors">
                      {country.name}
                    </h3>
                    <p className="text-xs text-text-secondary font-medium">{country.highlight}</p>
                    <span className="text-[10px] text-text-muted">Capital: {country.capital}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY JOY DIGITAL */}
        <section className="py-16 lg:py-24 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Our Value Proposition
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Why Choose Joy Digital for Your Tourism Website?
              </h2>
              <p className="text-sm text-text-secondary">
                We combine technical excellence, travel industry expertise, and conversion architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WHY_JOY_DIGITAL.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl mb-6">
                    <i className={item.icon} />
                  </div>
                  <h3 className="text-lg font-bold text-primary-dark mb-3">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Implementation Blueprint
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Our Tourism Website Development Process
              </h2>
              <p className="text-sm text-text-secondary">
                A proven 6-step framework to launch a high-performing tourism website.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl font-bold">
                        <i className={step.icon} />
                      </div>
                      <span className="text-2xl font-extrabold text-primary/30">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-primary-dark mb-3">{step.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FREE WEBSITE AUDIT FORM SECTION */}
        <section id="free-audit" className="py-16 lg:py-24 bg-light-bg scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Form Info */}
              <div className="lg:col-span-5 flex flex-col items-start">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                  No-Risk Website Analysis
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-6 leading-tight">
                  Get a Free Tourism Website Audit
                </h2>
                <p className="text-base text-text-secondary mb-8 leading-relaxed">
                  We&apos;ll review your current website and identify opportunities to improve design, user experience, SEO and enquiry generation.
                </p>

                <div className="space-y-4 w-full">
                  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
                    <span className="text-emerald-500 text-lg mt-0.5"><i className="fa-solid fa-circle-check" /></span>
                    <div>
                      <h4 className="text-xs font-extrabold text-primary-dark">Mobile Experience & Speed Audit</h4>
                      <p className="text-[11px] text-text-secondary">Comprehensive test on international mobile data connections.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
                    <span className="text-emerald-500 text-lg mt-0.5"><i className="fa-solid fa-circle-check" /></span>
                    <div>
                      <h4 className="text-xs font-extrabold text-primary-dark">Enquiry Conversion Review</h4>
                      <p className="text-[11px] text-text-secondary">Analysis of CTA placement, forms, and WhatsApp booking triggers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
                    <span className="text-emerald-500 text-lg mt-0.5"><i className="fa-solid fa-circle-check" /></span>
                    <div>
                      <h4 className="text-xs font-extrabold text-primary-dark">Google SEO & Search Visibility</h4>
                      <p className="text-[11px] text-text-secondary">Keyword ranking evaluation for safari and tour queries.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Container */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="bg-white border border-[#E9E4F2] p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F97316]" />

                  <h3 className="text-xl font-extrabold text-primary-dark mb-1">Request Free Website Audit</h3>
                  <p className="text-xs text-text-secondary mb-6">Complete the details below to receive your customized African tourism audit.</p>

                  {isAuditSuccess ? (
                    <div className="py-8 text-center flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4 animate-bounce">
                        <i className="fa-solid fa-circle-check" />
                      </div>
                      <h4 className="text-lg font-extrabold text-primary-dark mb-2">Audit Request Submitted!</h4>
                      <p className="text-xs text-text-secondary max-w-md mb-6 leading-relaxed">
                        Thank you! We have received your website audit request. Our tourism website specialists will review your platform and contact you via email and WhatsApp.
                      </p>
                      <a
                        href={`https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I%20just%20submitted%20a%20free%20tourism%20website%20audit%20request%20for%20${encodeURIComponent(auditFormData.companyName || "my business")}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md flex items-center gap-2"
                      >
                        <i className="fa-brands fa-whatsapp text-sm" />
                        <span>Follow Up via WhatsApp</span>
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleAuditSubmit} className="flex flex-col gap-4">
                      {/* Name & Business Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label htmlFor="audit-name" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider">
                            Your Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="audit-name"
                            name="name"
                            value={auditFormData.name}
                            onChange={handleAuditChange}
                            placeholder="e.g. David Omondi"
                            className={`w-full text-xs px-3.5 py-2.5 bg-[#FAF9FF] rounded-xl border outline-none font-semibold ${
                              auditErrors.name ? "border-rose-450 bg-rose-50/5" : "border-[#E9E4F2] focus:border-[#7C3AED]"
                            }`}
                          />
                          {auditErrors.name && <span className="text-[9px] font-bold text-rose-500">{auditErrors.name}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                          <label htmlFor="audit-company" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider">
                            Business Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="audit-company"
                            name="companyName"
                            value={auditFormData.companyName}
                            onChange={handleAuditChange}
                            placeholder="e.g. Serengeti Wild Safaris"
                            className={`w-full text-xs px-3.5 py-2.5 bg-[#FAF9FF] rounded-xl border outline-none font-semibold ${
                              auditErrors.companyName ? "border-rose-450 bg-rose-50/5" : "border-[#E9E4F2] focus:border-[#7C3AED]"
                            }`}
                          />
                          {auditErrors.companyName && <span className="text-[9px] font-bold text-rose-500">{auditErrors.companyName}</span>}
                        </div>
                      </div>

                      {/* Website URL & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label htmlFor="audit-website" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider">
                            Website URL <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="audit-website"
                            name="website"
                            value={auditFormData.website}
                            onChange={handleAuditChange}
                            placeholder="www.yoursafari.com"
                            className={`w-full text-xs px-3.5 py-2.5 bg-[#FAF9FF] rounded-xl border outline-none font-semibold ${
                              auditErrors.website ? "border-rose-450 bg-rose-50/5" : "border-[#E9E4F2] focus:border-[#7C3AED]"
                            }`}
                          />
                          {auditErrors.website && <span className="text-[9px] font-bold text-rose-500">{auditErrors.website}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                          <label htmlFor="audit-email" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="audit-email"
                            name="email"
                            value={auditFormData.email}
                            onChange={handleAuditChange}
                            placeholder="info@yoursafari.com"
                            className={`w-full text-xs px-3.5 py-2.5 bg-[#FAF9FF] rounded-xl border outline-none font-semibold ${
                              auditErrors.email ? "border-rose-450 bg-rose-50/5" : "border-[#E9E4F2] focus:border-[#7C3AED]"
                            }`}
                          />
                          {auditErrors.email && <span className="text-[9px] font-bold text-rose-500">{auditErrors.email}</span>}
                        </div>
                      </div>

                      {/* WhatsApp & Country */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label htmlFor="audit-whatsapp" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider">
                            WhatsApp Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="audit-whatsapp"
                            name="whatsapp"
                            value={auditFormData.whatsapp}
                            onChange={handleAuditChange}
                            placeholder="+254 700 000000"
                            className={`w-full text-xs px-3.5 py-2.5 bg-[#FAF9FF] rounded-xl border outline-none font-semibold ${
                              auditErrors.whatsapp ? "border-rose-450 bg-rose-50/5" : "border-[#E9E4F2] focus:border-[#7C3AED]"
                            }`}
                          />
                          {auditErrors.whatsapp && <span className="text-[9px] font-bold text-rose-500">{auditErrors.whatsapp}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                          <label htmlFor="audit-country" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider">
                            Country
                          </label>
                          <select
                            id="audit-country"
                            name="country"
                            value={auditFormData.country}
                            onChange={handleAuditChange}
                            className="w-full text-xs px-3.5 py-2.5 bg-[#FAF9FF] rounded-xl border border-[#E9E4F2] outline-none font-semibold cursor-pointer focus:border-[#7C3AED]"
                          >
                            {COUNTRY_LIST.map((c) => (
                              <option key={c.name} value={c.name}>
                                {c.flag} {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="audit-message" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider">
                          Message / Specific Goals (Optional)
                        </label>
                        <textarea
                          id="audit-message"
                          name="message"
                          value={auditFormData.message}
                          onChange={handleAuditChange}
                          rows={2}
                          placeholder="Tell us about your target travellers or website concerns..."
                          className="w-full text-xs p-3 bg-[#FAF9FF] rounded-xl border border-[#E9E4F2] outline-none font-semibold resize-none focus:border-[#7C3AED]"
                        />
                      </div>

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs py-4 rounded-xl shadow-lg shadow-[#7C3AED]/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fa-solid fa-spinner animate-spin" /> Analyzing Your Website...
                          </>
                        ) : (
                          "Request Free Website Audit"
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Engineering Showcase
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Tourism & Travel Website Projects
              </h2>
              <p className="text-sm text-text-secondary">
                Built on clean Next.js engineering architecture designed for travel operators and hospitality providers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full mb-4">
                    <span>Safari Tour Platform Architecture</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-primary-dark mb-3">
                    Wildlife & Expedition Travel Portal
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    Multi-destination safari portal with interactive itinerary tabs, instant WhatsApp inquiry integration, and sub-1.2s mobile loading.
                  </p>
                  <ul className="space-y-2 text-xs text-text-primary mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500"><i className="fa-solid fa-circle-check" /></span>
                      <span>Day-by-Day Itinerary Management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500"><i className="fa-solid fa-circle-check" /></span>
                      <span>Instant WhatsApp Lead Routing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500"><i className="fa-solid fa-circle-check" /></span>
                      <span>Automated Schema & SEO Ranking Setup</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/website-for-tours-and-travels"
                  className="text-xs font-bold text-accent hover:text-accent-dark flex items-center gap-1.5"
                >
                  Explore Tour Operator Solutions &rarr;
                </Link>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full mb-4">
                    <span>Lodge & Resort Platform Architecture</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-primary-dark mb-3">
                    Luxury Safari Camp & Hotel Portal
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    High-converting accommodation website showcasing room categories, photo galleries, meal plans, and direct booking enquiry forms.
                  </p>
                  <ul className="space-y-2 text-xs text-text-primary mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500"><i className="fa-solid fa-circle-check" /></span>
                      <span>Full Room & Suite Galleries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500"><i className="fa-solid fa-circle-check" /></span>
                      <span>Custom Room Enquiry Engine</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500"><i className="fa-solid fa-circle-check" /></span>
                      <span>Sub-Second Global Edge Delivery</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/website-for-hotels"
                  className="text-xs font-bold text-accent hover:text-accent-dark flex items-center gap-1.5"
                >
                  Explore Hotel & Lodge Solutions &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 lg:py-24 bg-light-bg">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary-dark mb-4">
                Answers to Your Tourism Website Questions
              </h2>
              <p className="text-sm text-text-secondary">
                Learn more about our custom tourism web development process for African businesses.
              </p>
            </div>

            <Accordion items={TOURISM_FAQS} />
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="relative py-20 bg-white border border-[#E5E7EB] overflow-hidden rounded-[24px] mx-6 lg:mx-12 my-16 shadow-md">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
            <span className="inline-block bg-[#F97316]/10 text-[#F97316] font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#F97316]/20 mb-6">
              Start Your Tourism Website Transformation
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 leading-tight text-primary-dark">
              Ready to Build a Better Tourism Website?
            </h2>
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Let&apos;s create a professional website that showcases your African travel experiences and helps you generate more enquiries from travellers around the world.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  const target = document.getElementById("free-audit");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold text-xs px-8 py-4 rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center cursor-pointer"
              >
                Start Your Project
              </button>
              <a
                href="https://wa.me/919080026133?text=Hello%20Joy%20Digital,%20I'd%20like%20to%20start%20my%20African%20tourism%20website%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-8 py-4 rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                data-wa-location="africa_tourism_final_cta"
              >
                <i className="fa-brands fa-whatsapp text-base" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </section>

        {/* INTERNAL LINKING FOOTER RIBBON */}
        <section className="py-12 bg-light-bg border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <span className="font-extrabold text-primary-dark mr-2">Explore Joy Digital Services:</span>
              <Link href="/web-design-services" className="text-text-secondary hover:text-accent border border-gray-200 bg-white px-3 py-1 rounded-full transition-colors">
                Website Design
              </Link>
              <Link href="/website-development" className="text-text-secondary hover:text-accent border border-gray-200 bg-white px-3 py-1 rounded-full transition-colors">
                Web Development
              </Link>
              <Link href="/seo-services" className="text-text-secondary hover:text-accent border border-gray-200 bg-white px-3 py-1 rounded-full transition-colors">
                SEO Services
              </Link>
              <Link href="/digital-marketing-agency-in-chennai" className="text-text-secondary hover:text-accent border border-gray-200 bg-white px-3 py-1 rounded-full transition-colors">
                Digital Marketing
              </Link>
              <Link href="/portfolio" className="text-text-secondary hover:text-accent border border-gray-200 bg-white px-3 py-1 rounded-full transition-colors">
                Portfolio
              </Link>
              <Link href="/blog" className="text-text-secondary hover:text-accent border border-gray-200 bg-white px-3 py-1 rounded-full transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-text-secondary hover:text-accent border border-gray-200 bg-white px-3 py-1 rounded-full transition-colors">
                Contact
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
