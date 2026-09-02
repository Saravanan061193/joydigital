"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Clock,
  Lock,
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
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
];

export default function ModernHeroSection({ country = "" }: ModernHeroSectionProps) {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    website: "",
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Country dropdown state
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
        Service: "15-Min Strategy Discovery Call",
        Source: "Hero Booking Consultation Form",
        utmParams: utm || undefined,
        _subject: `🔥 Strategy Call Booking - ${formData.name.trim()} [Joy Digital]`,
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
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Hero Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18132E] border border-[#2D244E] text-[#A78BFA] text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span>Next.js &amp; Enterprise SEO Engineering</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            High-Performance Websites &amp; SEO Engineered to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
              Scale Your Business Globally.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            Bespoke Next.js web systems and enterprise SEO designed for sub-second speed and global organic revenue.
          </p>

          {/* Minimal Checkmark Bullet Points */}
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
          </div>

          {/* Action Button */}
          <div className="pt-3">
            <a
              href="#case-studies"
              onClick={handleExploreCaseStudies}
              className="px-7 py-3.5 rounded-xl bg-[#17122B] hover:bg-[#20193B] border border-[#2B2346] hover:border-[#7C3AED]/50 text-white text-sm font-bold transition-all flex items-center gap-2.5 shadow-lg group cursor-pointer"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="w-4 h-4 text-[#A78BFA] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Social Proof Single-line Text */}
          <div className="pt-6 border-t border-[#1F1938] w-full max-w-xl">
            <p className="text-xs text-slate-400 font-medium">
              Trusted by fast-growing brands across USA, UK, UAE &amp; worldwide.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Floating Glassmorphism Booking Enquiry Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
          <div className="w-full max-w-md bg-[#130E26]/95 border border-[#29204A] hover:border-[#7C3AED]/40 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-purple-950/30 backdrop-blur-xl relative overflow-hidden transition-all">
            
            {/* Top Accent Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#3B82F6]" />

            {/* Form Title & Subtitle */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#A78BFA] bg-[#1E1738] border border-[#33285C] px-2.5 py-0.5 rounded-full mb-2">
                <Clock className="w-3 h-3 text-[#A78BFA]" />
                <span>Free Strategy Session</span>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Book a 15-Min Strategy Call
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Fill in the details below to claim your free website &amp; SEO roadmap.
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              
              {/* Field 1: Full Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="hero-name" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className={`flex items-center gap-2 bg-[#1A1433] border rounded-xl px-3 py-2.5 transition-all ${
                  errors.name ? "border-red-500/80 bg-red-950/10" : "border-[#2D2352] focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/20"
                }`}>
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
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
                <div className={`flex items-center gap-2 bg-[#1A1433] border rounded-xl px-3 py-2.5 transition-all ${
                  errors.email ? "border-red-500/80 bg-red-950/10" : "border-[#2D2352] focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/20"
                }`}>
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
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
                      <div className="absolute z-30 left-0 top-[108%] w-60 max-h-56 overflow-y-auto bg-[#18132E] border border-[#2D244E] rounded-xl shadow-2xl py-1">
                        <div className="p-2 border-b border-[#2D244E] bg-[#140F26] sticky top-0 z-10">
                          <input
                            type="text"
                            placeholder="Search..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 bg-[#1F193B] border border-[#352B5C] rounded-lg text-white outline-none"
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
                            className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs hover:bg-[#231C42] ${
                              selectedCountryCode === c.code ? "bg-[#7C3AED]/20 text-[#A78BFA] font-bold" : "text-slate-300"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <span className="truncate max-w-[120px]">{c.name}</span>
                            </span>
                            <span className="text-slate-500 text-[10px]">{c.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-2 bg-[#1A1433] border rounded-xl px-3 py-2.5 flex-1 transition-all ${
                    errors.mobile ? "border-red-500/80 bg-red-950/10" : "border-[#2D2352] focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/20"
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
                <div className="flex items-center gap-2 bg-[#1A1433] border border-[#2D2352] focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/20 rounded-xl px-3 py-2.5 transition-all">
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

              {/* Full-width CTA Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] text-white font-extrabold text-sm shadow-xl shadow-purple-900/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Scheduling Call...</span>
                  </>
                ) : (
                  <>
                    <span>Schedule Free Consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Micro-trust footer */}
              <div className="pt-2 text-center">
                <p className="text-[10px] font-medium text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Zero Commitment • 100% Confidential • Fast Turnaround</span>
                </p>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
