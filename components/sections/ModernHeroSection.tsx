"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  Mail,
  User,
  Globe,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { getUtmParameters } from "@/lib/utmTracker";

interface ModernHeroSectionProps {
  country?: string;
}

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
];

const heroMainWords = ["High-Performance", "Websites", "&", "SEO", "Engineered", "to"];
const heroGradientWords = ["Scale", "Your", "Business", "Globally."];

// Framer Motion Variants for Staggered Orchestration
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const antiGravityHeaderVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const antiGravityWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    rotateX: -20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 90,
      mass: 0.75,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ModernHeroSection({ country = "" }: ModernHeroSectionProps) {
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    website: "",
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Country Dropdown State
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      tempErrors.name = "Full Name is required.";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Work Email is required.";
    } else {
      const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailReg.test(formData.email.trim())) {
        tempErrors.email = "Please enter a valid work email.";
      }
    }

    const mobileVal = formData.mobile.trim();
    if (!mobileVal) {
      tempErrors.mobile = "Phone / WhatsApp is required.";
    } else {
      const numbersOnly = mobileVal.replace(/\D/g, "");
      if (numbersOnly.length < 7) {
        tempErrors.mobile = "Enter a valid contact number.";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const utm = getUtmParameters();
      const payload = {
        Name: formData.name.trim(),
        Email: formData.email.trim(),
        Mobile: formData.mobile.trim().startsWith("+")
          ? formData.mobile.trim()
          : `${selectedCountryCode} ${formData.mobile.trim()}`,
        Website: formData.website.trim() || "N/A",
        Service: "15-Min Strategy Call + Free $499 Website & SEO Audit",
        Source: "Hero Booking Consultation Form",
        utmParams: utm || undefined,
        _subject: `🔥 Free Audit & Strategy Call Booking - ${formData.name.trim()} [Joy Digital]`,
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
        throw new Error("Failed to submit form");
      }

      // Unified Conversion Tracking
      if (typeof window !== "undefined") {
        const tracker = (window as any).trackJoyDigitalEvent;
        if (typeof tracker === "function") {
          tracker("contact_form_submission", {
            form_source: "Hero Booking Form",
            page_url: window.location.href,
          });
        }
      }

      const queryParams = new URLSearchParams({
        name: formData.name.trim(),
        service: "15-Min Strategy Call",
        mobile: formData.mobile.trim(),
      }).toString();

      router.push(`/thank-you?${queryParams}`);
    } catch (err) {
      console.error(err);
      alert("Enquiry submission failed. Please email us at saravanan061193@gmail.com directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExploreCaseStudies = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("case-studies");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/case-studies");
    }
  };

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === selectedCountryCode);
  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  return (
    <section className="relative pt-24 lg:pt-32 pb-20 overflow-hidden bg-[#0B0914] text-white border-b border-[#1E1838] select-none">
      
      {/* Embedded CSS Keyframes for GPU-Accelerated Micro-Animations & Moving Aurora Orbs */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes auroraDrift1 {
          0%, 100% { transform: translate3d(0px, 0px, 0) scale(1); opacity: 0.22; }
          33% { transform: translate3d(50px, -40px, 0) scale(1.12); opacity: 0.32; }
          66% { transform: translate3d(-35px, 25px, 0) scale(0.92); opacity: 0.18; }
        }
        @keyframes auroraDrift2 {
          0%, 100% { transform: translate3d(0px, 0px, 0) scale(1); opacity: 0.20; }
          40% { transform: translate3d(-55px, 35px, 0) scale(1.18); opacity: 0.30; }
          75% { transform: translate3d(45px, -25px, 0) scale(0.88); opacity: 0.16; }
        }
        @keyframes auroraDrift3 {
          0%, 100% { transform: translate3d(0px, 0px, 0) scale(1); opacity: 0.16; }
          50% { transform: translate3d(35px, 50px, 0) scale(1.15); opacity: 0.28; }
        }
        @keyframes gradientShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes borderBeamRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-120%) rotate(25deg); }
          30%, 100% { transform: translateX(260%) rotate(25deg); }
        }
        .animate-aurora-1 {
          animation: auroraDrift1 16s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .animate-aurora-2 {
          animation: auroraDrift2 20s ease-in-out infinite 2s;
          will-change: transform, opacity;
        }
        .animate-aurora-3 {
          animation: auroraDrift3 24s ease-in-out infinite 4s;
          will-change: transform, opacity;
        }
        .animate-gradient-shimmer {
          background-size: 200% 200%;
          animation: gradientShimmer 6s ease infinite;
        }
        .animate-border-beam {
          animation: borderBeamRotate 8s linear infinite;
        }
        .animate-shimmer-sweep {
          animation: shimmerSweep 3.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      ` }} />

      {/* Moving Aurora / Blurred Gradient Orbs (z-0, pointer-events-none) */}
      <div className="absolute -top-28 right-10 sm:right-1/4 w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] bg-gradient-to-tr from-purple-700/30 via-purple-600/25 to-indigo-600/20 rounded-full blur-[150px] sm:blur-[180px] pointer-events-none z-0 animate-aurora-1" />
      <div className="absolute -bottom-24 -left-20 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-gradient-to-br from-blue-700/25 via-indigo-900/30 to-purple-900/20 rounded-full blur-[140px] sm:blur-[170px] pointer-events-none z-0 animate-aurora-2" />
      <div className="absolute top-1/3 left-1/3 w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] bg-gradient-to-r from-violet-600/20 to-purple-800/15 rounded-full blur-[130px] sm:blur-[160px] pointer-events-none z-0 animate-aurora-3" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Staggered Hero Copy & Actions */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Step 1: Top Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18132E] border border-[#2D244E] text-[#A78BFA] text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Next.js &amp; Enterprise SEO Engineering</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-sm">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>🎁 Free Website &amp; SEO Audit ($499 Value)</span>
            </div>
          </motion.div>

          {/* Step 2: Main Headline with Anti-Gravity Staggered Word Reveal */}
          <motion.h1
            variants={antiGravityHeaderVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.14] flex flex-wrap gap-x-[0.28em] gap-y-1 sm:gap-y-2 select-none"
          >
            {heroMainWords.map((word, idx) => (
              <motion.span
                key={`main-w-${idx}`}
                variants={antiGravityWordVariants}
                className="inline-block will-change-transform"
              >
                {word}
              </motion.span>
            ))}
            {heroGradientWords.map((word, idx) => (
              <motion.span
                key={`grad-w-${idx}`}
                variants={antiGravityWordVariants}
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 animate-gradient-shimmer will-change-transform"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Step 3: Subtitle & Feature Bullet Points */}
          <motion.div variants={itemVariants} className="space-y-4 max-w-2xl">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Bespoke Next.js web systems and enterprise SEO designed for sub-second speed and global organic revenue.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2.5 text-sm text-slate-200 font-medium">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>Sub-second page loads (Core Web Vitals optimized)</span>
              </div>

              <div className="flex items-center gap-2.5 text-sm text-slate-200 font-medium">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>Enterprise-grade search architectures</span>
              </div>

              <div className="flex items-center gap-2.5 text-sm text-emerald-300 font-bold">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>Includes 100% Free 20+ Page Website &amp; SEO Audit Report</span>
              </div>
            </div>
          </motion.div>

          {/* Step 4: Left CTA Button & Social Proof */}
          <motion.div variants={itemVariants} className="space-y-6 pt-2 w-full max-w-xl">
            <div>
              <a
                href="#case-studies"
                onClick={handleExploreCaseStudies}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#17122B] hover:bg-[#20193B] border border-[#2B2346] hover:border-[#7C3AED]/50 text-white text-sm font-bold transition-all shadow-lg group cursor-pointer"
              >
                <span>Explore Case Studies</span>
                <ArrowRight className="w-4 h-4 text-[#A78BFA] group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            <div className="pt-5 border-t border-[#1F1938] w-full">
              <p className="text-xs text-slate-400 font-medium">
                Trusted by fast-growing brands across USA, UK, UAE &amp; worldwide.
              </p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="lg:col-span-5 flex justify-center lg:justify-end w-full"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-md relative rounded-2xl p-[1px] overflow-hidden group">
            
            {/* Animated Conic Glowing Border Beam */}
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg_at_50%_50%,#7C3AED_0%,#3B82F6_50%,#7C3AED_100%)] opacity-40 group-hover:opacity-80 transition-opacity duration-500 animate-border-beam pointer-events-none" />

            {/* Inner Glassmorphism Card */}
            <div className="w-full bg-[#130E26]/95 border border-[#29204A] rounded-2xl p-6 sm:p-7 shadow-2xl shadow-purple-950/40 backdrop-blur-xl relative z-10 overflow-hidden">
              
              {/* Form Header */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full mb-2">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>🎁 Free $499 Audit Included</span>
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Book a 15-Min Strategy Call
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Fill in the details below to claim your free 20+ page Website &amp; SEO Audit report.
                </p>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                
                {/* Field 1: Full Name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="hero-name" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className={`flex items-center gap-2 bg-[#1A1433] border rounded-xl px-3 py-2.5 transition-all duration-300 focus-within:bg-[#1E173C] focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/20 focus-within:shadow-[0_0_15px_rgba(124,58,237,0.2)] ${
                    errors.name ? "border-red-500/80 bg-red-950/10" : "border-[#2D2352]"
                  }`}>
                    <User className="w-4 h-4 text-slate-400 shrink-0 transition-colors group-focus-within:text-[#A78BFA]" />
                    <input
                      type="text"
                      id="hero-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full text-xs bg-transparent outline-none text-white placeholder:text-slate-500 font-medium"
                    />
                  </div>
                  {errors.name && <span className="text-[10px] text-red-400 font-medium">{errors.name}</span>}
                </div>

                {/* Field 2: Work Email */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="hero-email" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">
                    Work Email <span className="text-red-400">*</span>
                  </label>
                  <div className={`flex items-center gap-2 bg-[#1A1433] border rounded-xl px-3 py-2.5 transition-all duration-300 focus-within:bg-[#1E173C] focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/20 focus-within:shadow-[0_0_15px_rgba(124,58,237,0.2)] ${
                    errors.email ? "border-red-500/80 bg-red-950/10" : "border-[#2D2352]"
                  }`}>
                    <Mail className="w-4 h-4 text-slate-400 shrink-0 transition-colors group-focus-within:text-[#A78BFA]" />
                    <input
                      type="email"
                      id="hero-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full text-xs bg-transparent outline-none text-white placeholder:text-slate-500 font-medium"
                    />
                  </div>
                  {errors.email && <span className="text-[10px] text-red-400 font-medium">{errors.email}</span>}
                </div>

                {/* Field 3: Phone / WhatsApp Number */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="hero-mobile" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">
                    Phone / WhatsApp Number <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2 relative">
                    {/* Country Selector Dropdown */}
                    <div className="relative" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryOpen(!isCountryOpen)}
                        className="w-[95px] text-xs py-2.5 px-2.5 bg-[#1A1433] border border-[#2D2352] hover:border-[#7C3AED]/50 text-white rounded-xl flex items-center justify-between outline-none cursor-pointer font-semibold transition-all h-full"
                      >
                        <span className="flex items-center gap-1">
                          <span>{selectedCountry?.flag}</span>
                          <span>{selectedCountryCode}</span>
                        </span>
                        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isCountryOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isCountryOpen && (
                        <div className="absolute z-50 left-0 top-[108%] w-72 sm:w-80 max-h-64 overflow-y-auto bg-[#150F2E] border border-[#3B2D6B] rounded-xl shadow-2xl py-1 text-white">
                          <div className="p-2 border-b border-[#2B2152] bg-[#0E0A21] sticky top-0 z-10">
                            <input
                              type="text"
                              placeholder="Search country or code..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="w-full text-xs px-3 py-2 bg-[#1C153B] border border-[#3D306E] rounded-lg text-white placeholder:text-slate-400 outline-none focus:border-[#7C3AED]"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          {filteredCountries.map((c) => (
                            <button
                              key={`${c.code}-${c.name}`}
                              type="button"
                              onClick={() => {
                                setSelectedCountryCode(c.code);
                                setIsCountryOpen(false);
                                setCountrySearch("");
                              }}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs hover:bg-[#281D54] transition-colors cursor-pointer ${
                                selectedCountryCode === c.code ? "bg-[#7C3AED]/30 text-white font-bold" : "text-slate-200"
                              }`}
                            >
                              <span className="flex items-center gap-2.5 min-w-0">
                                <span className="text-base select-none shrink-0">{c.flag}</span>
                                <span className="font-semibold text-slate-100 truncate max-w-[170px]">{c.name}</span>
                              </span>
                              <span className="text-[#A78BFA] font-bold text-xs shrink-0">{c.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={`flex items-center gap-2 bg-[#1A1433] border rounded-xl px-3 py-2.5 flex-1 transition-all duration-300 focus-within:bg-[#1E173C] focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/20 focus-within:shadow-[0_0_15px_rgba(124,58,237,0.2)] ${
                      errors.mobile ? "border-red-500/80 bg-red-950/10" : "border-[#2D2352]"
                    }`}>
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="tel"
                        id="hero-mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Phone / WhatsApp"
                        className="w-full text-xs bg-transparent outline-none text-white placeholder:text-slate-500 font-medium"
                      />
                    </div>
                  </div>
                  {errors.mobile && <span className="text-[10px] text-red-400 font-medium">{errors.mobile}</span>}
                </div>

                {/* Field 4: Project Scope / Website URL (Optional) */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="hero-website" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Project Scope / Website URL</span>
                    <span className="text-[9px] text-slate-500 font-normal">Optional</span>
                  </label>
                  <div className="flex items-center gap-2 bg-[#1A1433] border border-[#2D2352] focus-within:bg-[#1E173C] focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/20 focus-within:shadow-[0_0_15px_rgba(124,58,237,0.2)] rounded-xl px-3 py-2.5 transition-all duration-300">
                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      id="hero-website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="e.g. acme.com or Web Design / SEO"
                      className="w-full text-xs bg-transparent outline-none text-white placeholder:text-slate-500 font-medium"
                    />
                  </div>
                </div>

                {/* Primary CTA Button with Automated Shimmer Light Reflection & Hover Scale */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] text-white font-extrabold text-sm shadow-xl shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group"
                >
                  {/* Automated Subtle Shimmer-Sweep Reflection */}
                  <span className="absolute inset-0 w-1/3 h-full bg-white/25 blur-sm transform -skew-x-12 animate-shimmer-sweep pointer-events-none" />

                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Scheduling Call...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Free Audit &amp; Strategy Call</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

                {/* Micro-trust footer */}
                <div className="pt-2 text-center">
                  <p className="text-[10px] font-medium text-slate-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>🎁 Free $499 Audit Included • Zero Commitment • 100% Confidential</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Step 6: Scroll Down Indicator Button (Centered at Bottom for Desktop & Mobile) */}
        <motion.div
          className="lg:col-span-12 flex justify-center pt-8 sm:pt-10 z-20"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button
            type="button"
            onClick={() => {
              const target = document.getElementById("trust-overview") || document.getElementById("case-studies");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
              }
            }}
            aria-label="Scroll down to explore website features"
            className="group flex items-center gap-2.5 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer bg-[#140F2D]/90 hover:bg-[#1B143B] border border-[#2D2352] hover:border-[#7C3AED]/60 px-5 py-2.5 rounded-full shadow-lg hover:shadow-purple-900/30 hover:scale-105 active:scale-95"
          >
            <span className="uppercase tracking-widest text-[11px] font-bold text-slate-300 group-hover:text-white">Scroll Down</span>
            <div className="w-6 h-6 rounded-full bg-[#7C3AED]/20 group-hover:bg-[#7C3AED] flex items-center justify-center transition-colors">
              <ChevronDown className="w-3.5 h-3.5 text-[#A78BFA] group-hover:text-white animate-bounce" />
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
