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
  Sparkles,
  ShieldCheck,
  CheckCircle2,
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

  // Country Dropdown
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show popup after 2.5 seconds if not dismissed in current session
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
      {/* Dark Glass Backdrop with Blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal Card Container */}
      <div className="relative w-full max-w-lg bg-[#0F0B24] border border-[#2D2354] rounded-2xl shadow-2xl shadow-purple-950/80 overflow-hidden z-10 animate-scale-up text-white">
        
        {/* Animated Gradient Header Banner */}
        <div className="relative bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#3B82F6] p-5 sm:p-6 text-white overflow-hidden">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)] pointer-events-none" />

          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close offer popup"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 z-20"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
              <Gift className="w-3.5 h-3.5" />
              <span>Limited Time Offer</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-white">
            Get Free Domain, Hosting &amp; Business Email Account!
          </h2>

          <p className="text-xs text-purple-100 mt-1.5 font-medium leading-relaxed">
            Apply now to get your complete website setup package with Next.js speed &amp; 95+ Core Web Vitals performance.
          </p>

          <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg text-white">
            <Phone className="w-3.5 h-3.5 text-emerald-300" />
            <span>Call / WhatsApp: <a href="https://wa.me/919080026133" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-300">+91 90800 26133</a></span>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-5 sm:p-6 bg-[#0F0B24]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="popup-name" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className={`flex items-center gap-2 bg-[#1A1433] border rounded-xl px-3 py-2.5 transition-all duration-300 focus-within:bg-[#1E173C] focus-within:border-[#7C3AED] ${
                errors.name ? "border-red-500/80 bg-red-950/10" : "border-[#2D2352]"
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

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="popup-email" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">
                Work Email <span className="text-red-400">*</span>
              </label>
              <div className={`flex items-center gap-2 bg-[#1A1433] border rounded-xl px-3 py-2.5 transition-all duration-300 focus-within:bg-[#1E173C] focus-within:border-[#7C3AED] ${
                errors.email ? "border-red-500/80 bg-red-950/10" : "border-[#2D2352]"
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

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label htmlFor="popup-mobile" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">
                Phone / WhatsApp Number <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2 relative">
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
                    <div className="absolute z-50 left-0 top-[108%] w-64 max-h-48 overflow-y-auto bg-[#150F2E] border border-[#3B2D6B] rounded-xl shadow-2xl py-1 text-white">
                      {COUNTRY_CODES.map((c) => (
                        <button
                          key={`${c.code}-${c.name}`}
                          type="button"
                          onClick={() => {
                            setSelectedCountryCode(c.code);
                            setIsCountryOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs hover:bg-[#281D54] transition-colors cursor-pointer ${
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

                <div className={`flex items-center gap-2 bg-[#1A1433] border rounded-xl px-3 py-2.5 flex-1 transition-all duration-300 focus-within:bg-[#1E173C] focus-within:border-[#7C3AED] ${
                  errors.mobile ? "border-red-500/80 bg-red-950/10" : "border-[#2D2352]"
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

            {/* Requirement / Scope */}
            <div className="flex flex-col gap-1">
              <label htmlFor="popup-website" className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Website Requirement / Scope</span>
                <span className="text-[9px] text-slate-500 font-normal">Optional</span>
              </label>
              <div className="flex items-center gap-2 bg-[#1A1433] border border-[#2D2352] focus-within:bg-[#1E173C] focus-within:border-[#7C3AED] rounded-xl px-3 py-2.5 transition-all duration-300">
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] text-white font-extrabold text-sm shadow-xl shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting Offer Claim...</span>
                </>
              ) : (
                <>
                  <span>APPLY NOW — CLAIM FREE OFFER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Micro Trust badges */}
            <div className="pt-2 text-center border-t border-[#1F183C]">
              <p className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1.5 flex-wrap">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> Free Domain &amp; Hosting</span>
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
