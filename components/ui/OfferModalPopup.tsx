"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Gift,
  Phone,
  Mail,
  User,
  Globe,
  ShieldCheck,
  Loader2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { getUtmParameters } from "@/lib/utmTracker";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
];

export default function OfferModalPopup() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto open after 2.5s if not dismissed in current session
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("joydigital_offer_popup_dismissed");
      if (!dismissed) {
        setIsOpen(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

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

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("joydigital_offer_popup_dismissed", "true");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        tempErrors.email = "Please enter a valid email.";
      }
    }

    const mobileVal = formData.mobile.trim();
    if (!mobileVal) {
      tempErrors.mobile = "Phone / WhatsApp number is required.";
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
        Website: formData.website.trim() || "Free Domain & Hosting Offer Request",
        Service: "Free Domain, Hosting & Business Email Account Offer",
        Source: "Website Open Modal Popup",
        utmParams: utm || undefined,
        _subject: `🎁 Free Domain & Hosting Offer Application - ${formData.name.trim()} [Joy Digital]`,
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
        throw new Error("Failed to submit enquiry");
      }

      if (typeof window !== "undefined") {
        const tracker = (window as any).trackJoyDigitalEvent;
        if (typeof tracker === "function") {
          tracker("contact_form_submission", {
            form_source: "Free Offer Modal Popup",
            page_url: window.location.href,
          });
        }
      }

      handleClose();

      const queryParams = new URLSearchParams({
        name: formData.name.trim(),
        service: "Free Domain & Hosting Offer",
        mobile: formData.mobile.trim(),
      }).toString();

      router.push(`/thank-you?${queryParams}`);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please call or WhatsApp us at +91 90800 26133 directly.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === selectedCountryCode);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
      {/* Dark Backdrop with Subtle Blur */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={handleClose}
      />

      {/* Refined Glassmorphism Modal Card */}
      <div className="relative w-full max-w-lg bg-[#110E20]/95 border border-[#2B2347] rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden z-10 animate-scale-up text-white">
        
        {/* Soft Dark Gray Header Section */}
        <div className="relative bg-[#161329] border-b border-[#2B2347] p-5 sm:p-6 text-white">
          
          {/* Subtle Close Button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close offer popup"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#201C3A] hover:bg-[#2C274F] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#372E5C] z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Offer Badge with Subtle Emerald Accent */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5 text-emerald-400" />
              <span>Limited Time Offer</span>
            </span>
          </div>

          {/* Crisp Headline */}
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight text-white">
            Get Free Domain, Hosting &amp; Business Email Account!
          </h2>

          <p className="text-xs text-slate-300 mt-2 font-normal leading-relaxed">
            Apply now to claim your complete website setup package with Next.js sub-second speed &amp; 95+ Core Web Vitals performance.
          </p>

          {/* Phone Call Pill */}
          <div className="mt-3.5 inline-flex items-center gap-2 text-xs font-semibold bg-[#1F1B38] border border-[#332A5B] px-3.5 py-1.5 rounded-lg text-slate-200">
            <Phone className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span>Call / WhatsApp: <a href="https://wa.me/919080026133" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 font-bold transition-colors">+91 90800 26133</a></span>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-5 sm:p-6 bg-[#110E20]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            
            {/* Field 1: Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="popup-name" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className={`flex items-center gap-2 bg-[#17132B] border rounded-xl px-3 py-2.5 transition-all duration-300 focus-within:bg-[#1C1834] focus-within:border-[#7C3AED] ${
                errors.name ? "border-red-500/80 bg-red-950/10" : "border-[#2B2347]"
              }`}>
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  id="popup-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full text-xs bg-transparent outline-none text-white placeholder:text-slate-500 font-medium"
                />
              </div>
              {errors.name && <span className="text-[10px] text-red-400 font-medium">{errors.name}</span>}
            </div>

            {/* Field 2: Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="popup-email" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">
                Work Email <span className="text-red-400">*</span>
              </label>
              <div className={`flex items-center gap-2 bg-[#17132B] border rounded-xl px-3 py-2.5 transition-all duration-300 focus-within:bg-[#1C1834] focus-within:border-[#7C3AED] ${
                errors.email ? "border-red-500/80 bg-red-950/10" : "border-[#2B2347]"
              }`}>
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  id="popup-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full text-xs bg-transparent outline-none text-white placeholder:text-slate-500 font-medium"
                />
              </div>
              {errors.email && <span className="text-[10px] text-red-400 font-medium">{errors.email}</span>}
            </div>

            {/* Field 3: Phone / WhatsApp */}
            <div className="flex flex-col gap-1">
              <label htmlFor="popup-mobile" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">
                Phone / WhatsApp Number <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2 relative">
                <div className="relative" ref={countryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="w-[95px] text-xs py-2.5 px-2.5 bg-[#17132B] border border-[#2B2347] hover:border-[#7C3AED]/60 text-white rounded-xl flex items-center justify-between outline-none cursor-pointer font-semibold transition-all h-full"
                  >
                    <span className="flex items-center gap-1">
                      <span>{selectedCountry?.flag}</span>
                      <span>{selectedCountryCode}</span>
                    </span>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isCountryOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isCountryOpen && (
                    <div className="absolute z-50 left-0 top-[108%] w-64 max-h-48 overflow-y-auto bg-[#16122B] border border-[#352B57] rounded-xl shadow-2xl py-1 text-white">
                      {COUNTRY_CODES.map((c) => (
                        <button
                          key={`${c.code}-${c.name}`}
                          type="button"
                          onClick={() => {
                            setSelectedCountryCode(c.code);
                            setIsCountryOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs hover:bg-[#271E47] transition-colors cursor-pointer ${
                            selectedCountryCode === c.code ? "bg-[#7C3AED]/30 text-white font-bold" : "text-slate-200"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                          </span>
                          <span className="text-[#A78BFA] font-bold text-xs">{c.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className={`flex items-center gap-2 bg-[#17132B] border rounded-xl px-3 py-2.5 flex-1 transition-all duration-300 focus-within:bg-[#1C1834] focus-within:border-[#7C3AED] ${
                  errors.mobile ? "border-red-500/80 bg-red-950/10" : "border-[#2B2347]"
                }`}>
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="tel"
                    id="popup-mobile"
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

            {/* Field 4: Requirement / Scope */}
            <div className="flex flex-col gap-1">
              <label htmlFor="popup-website" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Website Requirement / Scope</span>
                <span className="text-[9px] text-slate-500 font-normal">Optional</span>
              </label>
              <div className="flex items-center gap-2 bg-[#17132B] border border-[#2B2347] focus-within:bg-[#1C1834] focus-within:border-[#7C3AED] rounded-xl px-3 py-2.5 transition-all duration-300">
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  id="popup-website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="e.g. E-commerce, Corporate Profile, SEO"
                  className="w-full text-xs bg-transparent outline-none text-white placeholder:text-slate-500 font-medium"
                />
              </div>
            </div>

            {/* Refined Solid Button (No Neon Glow) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#7C3AED]/25 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <span>APPLY NOW — CLAIM FREE OFFER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Micro Trust badges */}
            <div className="pt-2 text-center border-t border-[#201A38]">
              <p className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-2 flex-wrap">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Free Domain &amp; Hosting</span>
                <span>•</span>
                <span>Zero Hidden Fees</span>
                <span>•</span>
                <span>100% Confidential</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
