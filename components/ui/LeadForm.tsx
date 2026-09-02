"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getUtmParameters } from "@/lib/utmTracker";

interface LeadFormProps {
  layout?: "vertical" | "horizontal";
  title?: string;
  subtitle?: string;
  ctaText?: string;
  source?: string;
  showWebsiteField?: boolean;
  hideEmailField?: boolean;
  simplified?: boolean;
}

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

const SERVICE_OPTIONS = [
  { value: "SEO Services", label: "SEO Services & Google Ranking", desc: "Organic search optimization & Map pack rankings", icon: "fa-solid fa-magnifying-glass-chart" },
  { value: "Website Design & Development", label: "Next.js Web Design & Development", desc: "Speed-optimized custom React business sites", icon: "fa-solid fa-laptop-code" },
  { value: "Corporate Multipage Site", label: "Corporate Business Website", desc: "Multipage company profiles & lead funnels", icon: "fa-solid fa-building" },
  { value: "Headless E-commerce Store", label: "Headless E-commerce Store", desc: "Ultra-fast headless WooCommerce/Shopify storefronts", icon: "fa-solid fa-cart-shopping" },
  { value: "Landing Page Development", label: "Landing Page & Lead Funnel", desc: "High-converting single page funnel setups", icon: "fa-solid fa-funnel-dollar" },
  { value: "Custom Web Application", label: "Custom React Web Application", desc: "Bespoke dynamic platforms & database portals", icon: "fa-solid fa-code" },
  { value: "Other Web Services", label: "Maintenance / Custom Web Support", desc: "Migrations, speed tuning, or maintenance contracts", icon: "fa-solid fa-screwdriver-wrench" },
];

const BUDGET_OPTIONS = [
  { value: "15k_50k", label: "₹15,000 - ₹50,000 (approx. $200 - $600)" },
  { value: "50k_1.5l", label: "₹50,000 - ₹1.5L (approx. $600 - $2,000)" },
  { value: "1.5l_5l", label: "₹1.5L - ₹5L (approx. $2,000 - $6,000)" },
  { value: "above_5l", label: "Above ₹5L ($6,000+)" },
];

const TIMELINE_OPTIONS = [
  { value: "immediate", label: "Immediate (Within 1 week)" },
  { value: "1_2_weeks", label: "1-2 Weeks" },
  { value: "1_month", label: "Within 1 Month" },
  { value: "flexible", label: "Flexible / Researching" },
];

export default function LeadForm({
  layout = "vertical",
  title = "Claim Free Consultation",
  subtitle = "Fill in 3 quick fields below. Our experts will call you in 15 mins.",
  ctaText = "Get Free Quote in 15 Mins 🚀",
  source = "General Lead Funnel",
  showWebsiteField = true,
  hideEmailField = false,
  simplified = true,
}: LeadFormProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Detect current region from pathname
  const parts = pathname.split("/").filter(Boolean);
  const detectedRegion = (parts.length > 0 && ["us", "uk", "ae", "in"].includes(parts[0])) ? parts[0] : "";

  const getDefaultCountryCode = (region: string) => {
    switch (region) {
      case "us": return "+1";
      case "uk": return "+44";
      case "ae": return "+971";
      case "in": return "+91";
      default: return "+91";
    }
  };

  const [selectedCountryCode, setSelectedCountryCode] = useState(() => getDefaultCountryCode(detectedRegion));

  // Form State
  const [formData, setFormData] = useState(() => ({
    name: "",
    companyName: "",
    website: "",
    email: "",
    mobile: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    region: detectedRegion || "in",
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Dropdown States
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setIsServiceOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update region form data if pathname changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setFormData((prev) => ({
      ...prev,
      region: detectedRegion || "in"
    }));
    setSelectedCountryCode(getDefaultCountryCode(detectedRegion));
  }

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      tempErrors.name = "Full Name is required.";
    }

    if (!simplified && !hideEmailField) {
      if (!formData.email.trim()) {
        tempErrors.email = "Email Address is required.";
      } else {
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailReg.test(formData.email.trim())) {
          tempErrors.email = "Please enter a valid email address.";
        }
      }
    }

    const mobileVal = formData.mobile.trim();
    if (!mobileVal) {
      tempErrors.mobile = "Contact number is required.";
    } else {
      const numbersOnly = mobileVal.replace(/\D/g, "");
      if (numbersOnly.length < 7) {
        tempErrors.mobile = "Please enter a valid phone number.";
      }
    }

    if (!formData.service) {
      tempErrors.service = "Please select a required service.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const utm = getUtmParameters();
      const payload = {
        Name: formData.name.trim(),
        CompanyName: formData.companyName.trim() || "N/A",
        Website: formData.website.trim() || "N/A",
        Email: formData.email.trim() || "provided-on-call@joydigital.in",
        Mobile: formData.mobile.trim().startsWith("+")
          ? formData.mobile.trim()
          : `${selectedCountryCode} ${formData.mobile.trim()}`,
        Service: formData.service,
        Budget: formData.budget || "N/A",
        Timeline: formData.timeline || "N/A",
        Message: formData.message.trim() || "Ultra-lean 3-field quick lead submission.",
        Source: source,
        TargetRegion: formData.region.toUpperCase(),
        utmParams: utm || undefined,
        _subject: `🔥 Ultra-Lean 3-Field Lead [${formData.region.toUpperCase()}] - Joy Digital`,
        _captcha: "false",
        _template: "table",
      };

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
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
            form_source: source,
            page_url: window.location.href,
            budget: formData.budget,
            timeline: formData.timeline,
          });
        } else {
          const gtag = (window as any).gtag;
          if (typeof gtag === "function") {
            gtag("event", "contact_form_submission", {
              form_source: source,
              page_url: window.location.href,
              budget: formData.budget,
              timeline: formData.timeline,
            });
          }
        }
      }

      // Reset Form
      setFormData({
        name: "",
        companyName: "",
        website: "",
        email: "",
        mobile: "",
        service: "",
        budget: "",
        timeline: "",
        message: "",
        region: detectedRegion || "in",
      });
      setErrors({});
      
      // Redirect to thank you page with personalized query params
      const queryParams = new URLSearchParams({
        name: formData.name.trim(),
        service: formData.service || "Web Services",
        mobile: formData.mobile.trim()
      }).toString();

      router.push(`/thank-you?${queryParams}`);
    } catch (err) {
      console.error(err);
      alert("Enquiry delivery failed. Please email us at saravanan061193@gmail.com directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedServiceIcon = (value: string) => {
    const option = SERVICE_OPTIONS.find(o => o.value === value);
    return option ? <i className={option.icon} /> : <i className="fa-solid fa-screwdriver-wrench" />;
  };

  const selectedCountry = COUNTRY_CODES.find(c => c.code === selectedCountryCode);
  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  return (
    <>
      {/* Locally-Scoped Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      ` }} />

      <div className={`bg-white border border-[#E9E4F2] p-5 sm:p-6 rounded-2xl shadow-2xl w-full ${layout === "horizontal" ? "max-w-4xl" : "max-w-md"} relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-200`}>
        {/* Top Accent Gradient Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F97316]" />

        {/* Title Zone */}
        <div className="mb-4 mt-1">
          {title && <h3 className="text-lg font-extrabold text-primary-dark mb-0.5 leading-snug">{title}</h3>}
          {subtitle && <p className="text-[11px] text-text-secondary leading-relaxed">{subtitle}</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          
          {/* 1. Full Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-[9px] font-extrabold text-[#6B6478] uppercase tracking-wider mb-0.5 block">
              Full Name <span className="text-error-red font-normal">*</span>
            </label>
            <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-lg border px-3 py-2.5 group transition-all duration-300 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 ${
              errors.name ? "border-[#ef4444] bg-red-50/10" : "border-[#E9E4F2] hover:border-[#7C3AED]/20"
            }`}>
              <span className={`text-[11px] transition-colors duration-300 shrink-0 ${errors.name ? "text-error-red" : "text-text-muted group-focus-within:text-[#7C3AED]"}`}>
                <i className="fa-solid fa-user" />
              </span>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-semibold"
              />
            </div>
            {errors.name && <span className="text-[9px] font-semibold text-[#ef4444] mt-0.5">{errors.name}</span>}
          </div>

          {/* Email Address (Only if NOT simplified) */}
          {!simplified && !hideEmailField && (
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[9px] font-extrabold text-[#6B6478] uppercase tracking-wider mb-0.5 block">
                Email ID <span className="text-error-red">*</span>
              </label>
              <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-lg border px-3 py-2.5 group transition-all duration-300 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 ${
                errors.email ? "border-[#ef4444] bg-red-50/10" : "border-[#E9E4F2] hover:border-[#7C3AED]/20"
              }`}>
                <span className={`text-[11px] transition-colors duration-300 shrink-0 ${errors.email ? "text-error-red" : "text-text-muted group-focus-within:text-[#7C3AED]"}`}>
                  <i className="fa-solid fa-envelope" />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-semibold"
                />
              </div>
              {errors.email && <span className="text-[9px] font-semibold text-[#ef4444] mt-0.5">{errors.email}</span>}
            </div>
          )}

          {/* 2. Contact Number */}
          <div className="flex flex-col gap-1">
            <label htmlFor="mobile" className="text-[9px] font-extrabold text-[#6B6478] uppercase tracking-wider mb-0.5 block">
              Contact Number (Mobile / WhatsApp) <span className="text-error-red">*</span>
            </label>
            <div className="flex gap-2 relative">
              {/* Custom Country Selector Dropdown Container */}
              <div className="relative" ref={countryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className="w-[100px] text-xs py-2.5 px-3 bg-[#FAF9FF] rounded-lg border border-[#E9E4F2] hover:border-gray-300 hover:bg-white text-left flex items-center justify-between outline-none cursor-pointer font-bold text-text-primary transition-all focus:ring-4 focus:ring-[#7C3AED]/10 focus:border-[#7C3AED] focus:bg-white h-full"
                >
                  <span className="flex items-center gap-1.5 select-none">
                    <span>{selectedCountry?.flag}</span>
                    <span>{selectedCountryCode}</span>
                  </span>
                  <span className={`text-[8px] text-text-muted transition-transform duration-300 shrink-0 ${isCountryOpen ? "rotate-180" : ""}`}>
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </button>

                {isCountryOpen && (
                  <div 
                    className="absolute z-30 left-0 top-[108%] w-64 max-h-60 overflow-y-auto bg-white border border-[#E9E4F2] rounded-lg shadow-xl py-1"
                    style={{ animation: "fadeInSlideDown 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
                  >
                    {/* Dropdown Search Box */}
                    <div className="p-2 border-b border-[#E9E4F2] bg-[#FAF9FF] sticky top-0 z-10">
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#E9E4F2] rounded-md focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/5 outline-none transition-all"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    
                    {/* Dropdown List Items */}
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((c) => (
                        <button
                          key={`${c.code}-${c.name}`}
                          type="button"
                          onClick={() => {
                            setSelectedCountryCode(c.code);
                            setIsCountryOpen(false);
                            setCountrySearch("");
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2 text-left text-xs transition-colors hover:bg-[#FAF9FF] ${
                            selectedCountryCode === c.code ? "bg-[#7C3AED]/5 font-bold text-[#7C3AED]" : "text-text-primary"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="select-none">{c.flag}</span>
                            <span className="font-medium truncate max-w-[130px]">{c.name}</span>
                          </span>
                          <span className="font-semibold text-text-muted text-[10px]">{c.code}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-xs text-text-muted text-center font-medium">No results found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Phone input wrapper */}
              <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-lg border px-3 py-2.5 flex-1 group transition-all duration-300 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 ${
                errors.mobile ? "border-[#ef4444] bg-red-50/10" : "border-[#E9E4F2] hover:border-[#7C3AED]/20"
              }`}>
                <span className={`text-[11px] transition-colors duration-300 shrink-0 ${errors.mobile ? "text-error-red" : "text-text-muted group-focus-within:text-[#7C3AED]"}`}>
                  <i className="fa-solid fa-phone" />
                </span>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter phone or WhatsApp"
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-semibold"
                />
              </div>
            </div>
            {errors.mobile && <span className="text-[9px] font-semibold text-[#ef4444] mt-0.5">{errors.mobile}</span>}
          </div>

          {/* 3. Required Service Selection */}
          <div className="flex flex-col gap-1">
            <label htmlFor="service" className="text-[9px] font-extrabold text-[#6B6478] uppercase tracking-wider mb-0.5 block">
              Required Service <span className="text-error-red">*</span>
            </label>
            <div className="relative" ref={serviceDropdownRef}>
              <button
                type="button"
                onClick={() => setIsServiceOpen(!isServiceOpen)}
                className={`w-full flex items-center justify-between bg-[#FAF9FF] rounded-lg border px-3 py-2.5 group transition-all duration-300 focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10 ${
                  errors.service ? "border-[#ef4444] bg-red-50/10" : "border-[#E9E4F2] hover:border-[#7C3AED]/20"
                }`}
              >
                <span className="flex items-center gap-2 text-left w-full overflow-hidden">
                  <span className={`text-[11px] transition-colors duration-300 shrink-0 ${errors.service ? "text-error-red" : "text-text-muted group-focus-within:text-[#7C3AED]"}`}>
                    {getSelectedServiceIcon(formData.service)}
                  </span>
                  <span className={`text-xs font-semibold truncate ${formData.service ? "text-text-primary" : "text-text-muted"}`}>
                    {formData.service ? SERVICE_OPTIONS.find(o => o.value === formData.service)?.label : "Select a Service"}
                  </span>
                </span>
                <span className={`text-[8px] text-text-muted transition-transform duration-300 shrink-0 ${isServiceOpen ? "rotate-180" : ""}`}>
                  <i className="fa-solid fa-chevron-down" />
                </span>
              </button>

              {isServiceOpen && (
                <div 
                  className="absolute z-20 left-0 top-[108%] w-full bg-white border border-[#E9E4F2] rounded-lg shadow-xl py-1 max-h-72 overflow-y-auto"
                  style={{ animation: "fadeInSlideDown 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, service: opt.value }));
                        setIsServiceOpen(false);
                        if (errors.service) setErrors(prev => ({ ...prev, service: "" }));
                      }}
                      className={`w-full flex items-start gap-3 px-3 py-2 text-left transition-colors hover:bg-[#FAF9FF] ${
                        formData.service === opt.value ? "bg-[#7C3AED]/5 text-[#7C3AED]" : "text-text-primary"
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5 transition-colors ${
                        formData.service === opt.value ? "bg-[#7C3AED] text-white" : "bg-[#FAF9FF] text-text-secondary"
                      }`}>
                        <i className={opt.icon} />
                      </span>
                      <div className="flex flex-col gap-0.5 overflow-hidden">
                        <span className={`text-xs font-bold ${formData.service === opt.value ? "text-[#7C3AED]" : "text-text-primary"}`}>
                          {opt.label}
                        </span>
                        <span className="text-[9px] text-text-muted truncate">{opt.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.service && <span className="text-[9px] font-semibold text-[#ef4444] mt-0.5">{errors.service}</span>}
          </div>

          {/* Full Detailed Mode Extra Fields (Only if simplified is FALSE) */}
          {!simplified && (
            <>
              {/* Budget Range & Company */}
              <div className={`grid grid-cols-1 ${layout === "horizontal" ? "md:grid-cols-2" : "sm:grid-cols-2"} gap-3`}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="companyName" className="text-[9px] font-extrabold text-[#6B6478] uppercase tracking-wider mb-0.5 block">
                    Company Name
                  </label>
                  <div className="flex items-center gap-2 bg-[#FAF9FF] rounded-lg border border-[#E9E4F2] px-3 py-2 hover:border-[#7C3AED]/20 transition-all duration-300 focus-within:bg-white focus-within:border-[#7C3AED]">
                    <span className="text-[11px] text-text-muted shrink-0"><i className="fa-solid fa-building" /></span>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corp"
                      className="w-full text-xs bg-transparent outline-none border-none text-text-primary font-semibold"
                    />
                  </div>
                </div>

                {showWebsiteField && (
                  <div className="flex flex-col gap-1">
                    <label htmlFor="website" className="text-[9px] font-extrabold text-[#6B6478] uppercase tracking-wider mb-0.5 block">
                      Website Link
                    </label>
                    <div className="flex items-center gap-2 bg-[#FAF9FF] rounded-lg border border-[#E9E4F2] px-3 py-2 hover:border-[#7C3AED]/20 transition-all duration-300 focus-within:bg-white focus-within:border-[#7C3AED]">
                      <span className="text-[11px] text-text-muted shrink-0"><i className="fa-solid fa-globe" /></span>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="e.g. acme.com"
                        className="w-full text-xs bg-transparent outline-none border-none text-text-primary font-semibold"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-1">
                <label htmlFor="budget" className="text-[9px] font-extrabold text-[#6B6478] uppercase tracking-wider mb-0.5 block">
                  Budget Range
                </label>
                <div className="flex items-center gap-2 bg-[#FAF9FF] rounded-lg border border-[#E9E4F2] px-3 py-2 hover:border-[#7C3AED]/20 transition-all duration-300 focus-within:bg-white focus-within:border-[#7C3AED]">
                  <span className="text-[11px] text-text-muted shrink-0"><i className="fa-solid fa-coins" /></span>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full text-xs bg-transparent outline-none border-none text-text-primary font-semibold cursor-pointer"
                  >
                    <option value="">Select Budget Range</option>
                    {BUDGET_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Requirement Details */}
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-[9px] font-extrabold text-[#6B6478] uppercase tracking-wider mb-0.5 block">
                  Requirement Details
                </label>
                <div className="flex bg-[#FAF9FF] rounded-lg border border-[#E9E4F2] hover:border-[#7C3AED]/20 p-2.5 transition-all duration-300 focus-within:bg-white focus-within:border-[#7C3AED]">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Describe your requirements (pages, features, timeline, etc.)..."
                    className="w-full text-xs bg-transparent outline-none border-none text-text-primary font-semibold resize-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg shadow-[#7C3AED]/20 hover:shadow-[#7C3AED]/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1 cursor-pointer"
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <span>{ctaText}</span>
                <i className="fa-solid fa-paper-plane text-[10px]" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Success Modal Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-[#E5E7EB] flex flex-col items-center">
            <div className="text-[#10b981] text-6xl mb-4 leading-none animate-bounce">
              <i className="fa-solid fa-circle-check" />
            </div>
            <h4 className="text-xl font-extrabold text-primary-dark mb-2">Enquiry Submitted!</h4>
            <p className="text-sm text-text-secondary mb-6 leading-relaxed">
              Thank you for reaching out. We have received your enquiry. Our team will review your requirements and get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold px-8 py-2.5 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
