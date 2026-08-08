"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface LeadFormProps {
  layout?: "vertical" | "horizontal";
  title?: string;
  subtitle?: string;
  ctaText?: string;
  source?: string;
  showWebsiteField?: boolean;
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
  { value: "Website Design & Development", label: "Next.js Web Design & Development", desc: "Speed-optimized custom React business sites", icon: "fa-solid fa-laptop-code" },
  { value: "Corporate Multipage Site", label: "Corporate Business Website", desc: "Multipage company profiles & lead funnels", icon: "fa-solid fa-building" },
  { value: "Headless E-commerce Store", label: "Headless E-commerce Store", desc: "Ultra-fast headless WooCommerce/Shopify storefronts", icon: "fa-solid fa-cart-shopping" },
  { value: "Landing Page Development", label: "Landing Page & Lead Funnel", desc: "High-converting single page funnel setups", icon: "fa-solid fa-funnel-dollar" },
  { value: "Custom Web Application", label: "Custom React Web Application", desc: "Bespoke dynamic platforms & database portals", icon: "fa-solid fa-code" },
  { value: "Other Web Services", label: "Maintenance / Custom Web Support", desc: "Migrations, speed tuning, or maintenance contracts", icon: "fa-solid fa-screwdriver-wrench" },
];

export default function LeadForm({
  layout = "vertical",
  title = "Get a Free Growth Consultation",
  subtitle = "Our digital experts will analyze your needs and reach out within 24 hours.",
  ctaText = "Submit Request",
  source = "General Lead Funnel",
  showWebsiteField = true,
}: LeadFormProps) {
  const pathname = usePathname();

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

    if (!formData.email.trim()) {
      tempErrors.email = "Email Address is required.";
    } else {
      const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailReg.test(formData.email.trim())) {
        tempErrors.email = "Please enter a valid email address.";
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
      const payload = {
        Name: formData.name.trim(),
        CompanyName: formData.companyName.trim() || "N/A",
        Website: formData.website.trim() || "N/A",
        Email: formData.email.trim(),
        Mobile: formData.mobile.trim().startsWith("+")
          ? formData.mobile.trim()
          : `${selectedCountryCode} ${formData.mobile.trim()}`,
        Service: formData.service,
        Message: formData.message.trim() || "No extra details provided.",
        Source: source,
        TargetRegion: formData.region.toUpperCase(),
        _subject: `🔥 Simplified Lead [${formData.region.toUpperCase()}] - Joy Digital`,
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

      setIsSuccess(true);
      
      // Unified Conversion Tracking
      if (typeof window !== "undefined") {
        const tracker = (window as any).trackJoyDigitalEvent;
        if (typeof tracker === "function") {
          tracker("contact_form_submission", {
            form_source: source,
            page_url: window.location.href,
          });
        } else {
          const gtag = (window as any).gtag;
          if (typeof gtag === "function") {
            gtag("event", "contact_form_submission", {
              form_source: source,
              page_url: window.location.href,
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
        message: "",
        region: detectedRegion || "in",
      });
      setErrors({});
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

      <div className={`bg-white border border-[#E5E7EB]/80 p-8 rounded-[24px] shadow-2xl w-full ${layout === "horizontal" ? "max-w-4xl" : "max-w-md"} relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-200`}>
        {/* Top Accent Gradient Border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#F97316]" />

        {/* Title Zone */}
        <div className="mb-6 mt-2">
          {title && <h3 className="text-xl font-extrabold text-primary-dark mb-1 leading-snug">{title}</h3>}
          {subtitle && <p className="text-xs text-text-secondary leading-relaxed">{subtitle}</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className={`grid grid-cols-1 ${layout === "horizontal" ? "md:grid-cols-2" : ""} gap-4`}>
            
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest mb-1 block">
                Full Name <span className="text-error-red font-normal">*</span>
              </label>
              <div className={`flex items-center gap-3 bg-light-bg rounded-xl border px-4 py-3 group transition-all duration-300 focus-within:bg-white focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/10 ${
                errors.name ? "border-[#ef4444] bg-red-50/10" : "border-[#E5E7EB] hover:border-gray-300"
              }`}>
                <span className={`text-xs transition-colors duration-300 shrink-0 ${errors.name ? "text-error-red" : "text-text-muted group-focus-within:text-[#2563EB]"}`}>
                  <i className="fa-solid fa-user" />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-medium"
                />
              </div>
              {errors.name && <span className="text-[9px] font-semibold text-[#ef4444] mt-0.5">{errors.name}</span>}
            </div>

            {/* Contact Number */}
            <div className="flex flex-col gap-1">
              <label htmlFor="mobile" className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest mb-1 block">
                Contact Number <span className="text-error-red">*</span>
              </label>
              <div className="flex gap-2 relative">
                
                {/* Custom Country Selector Dropdown Container */}
                <div className="relative" ref={countryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="w-[100px] text-xs py-3 px-3.5 bg-light-bg rounded-xl border border-[#E5E7EB] hover:border-gray-300 hover:bg-white text-left flex items-center justify-between outline-none cursor-pointer font-semibold text-text-primary transition-all focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] focus:bg-white h-full"
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
                      className="absolute z-30 left-0 top-[108%] w-64 max-h-60 overflow-y-auto bg-white border border-[#E5E7EB] rounded-xl shadow-xl py-1"
                      style={{ animation: "fadeInSlideDown 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
                    >
                      {/* Dropdown Search Box */}
                      <div className="p-2 border-b border-[#E5E7EB] bg-light-bg sticky top-0 z-10">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#E5E7EB] rounded-md focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/5 outline-none transition-all"
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
                            className={`w-full flex items-center justify-between px-4 py-2 text-left text-xs transition-colors hover:bg-light-bg ${
                              selectedCountryCode === c.code ? "bg-[#2563EB]/5 font-bold text-[#2563EB]" : "text-text-primary"
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
                <div className={`flex items-center gap-3 bg-light-bg rounded-xl border px-4 py-3 flex-1 group transition-all duration-300 focus-within:bg-white focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/10 ${
                  errors.mobile ? "border-[#ef4444] bg-red-50/10" : "border-[#E5E7EB] hover:border-gray-300"
                }`}>
                  <span className={`text-xs transition-colors duration-300 shrink-0 ${errors.mobile ? "text-error-red" : "text-text-muted group-focus-within:text-[#2563EB]"}`}>
                    <i className="fa-solid fa-phone" />
                  </span>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile / WhatsApp"
                    className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-medium"
                  />
                </div>
              </div>
              {errors.mobile && <span className="text-[9px] font-semibold text-[#ef4444] mt-0.5">{errors.mobile}</span>}
            </div>

            {/* Company Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="companyName" className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest mb-1 block">
                Company Name
              </label>
              <div className="flex items-center gap-3 bg-light-bg rounded-xl border px-4 py-3 group transition-all duration-300 focus-within:bg-white focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/10 border-[#E5E7EB] hover:border-gray-300">
                <span className="text-xs text-text-muted transition-colors duration-300 group-focus-within:text-[#2563EB] shrink-0">
                  <i className="fa-solid fa-building" />
                </span>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corp"
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-medium"
                />
              </div>
            </div>

            {/* Website Link */}
            {showWebsiteField && (
              <div className="flex flex-col gap-1">
                <label htmlFor="website" className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest mb-1 block">
                  Website Link
                </label>
                <div className="flex items-center gap-3 bg-light-bg rounded-xl border px-4 py-3 group transition-all duration-300 focus-within:bg-white focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/10 border-[#E5E7EB] hover:border-gray-300">
                  <span className="text-xs text-text-muted transition-colors duration-300 group-focus-within:text-[#2563EB] shrink-0">
                    <i className="fa-solid fa-globe" />
                  </span>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="e.g. acme.com"
                    className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-medium"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest mb-1 block">
                Email ID <span className="text-error-red">*</span>
              </label>
              <div className={`flex items-center gap-3 bg-light-bg rounded-xl border px-4 py-3 group transition-all duration-300 focus-within:bg-white focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/10 ${
                errors.email ? "border-[#ef4444] bg-red-50/10" : "border-[#E5E7EB] hover:border-gray-300"
              }`}>
                <span className={`text-xs transition-colors duration-300 shrink-0 ${errors.email ? "text-error-red" : "text-text-muted group-focus-within:text-[#2563EB]"}`}>
                  <i className="fa-solid fa-envelope" />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-medium"
                />
              </div>
              {errors.email && <span className="text-[9px] font-semibold text-[#ef4444] mt-0.5">{errors.email}</span>}
            </div>

            {/* Required Services Dropdown Container */}
            <div className="flex flex-col gap-1">
              <label htmlFor="service" className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest mb-1 block">
                Required Services <span className="text-error-red">*</span>
              </label>
              <div className="relative" ref={serviceDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsServiceOpen(!isServiceOpen)}
                  className={`w-full flex items-center justify-between bg-light-bg rounded-xl border px-4 py-3 group transition-all duration-300 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 ${
                    errors.service ? "border-[#ef4444] bg-red-50/10" : "border-[#E5E7EB] hover:border-gray-300"
                  }`}
                >
                  <span className="flex items-center gap-3 text-left w-full overflow-hidden">
                    <span className={`text-xs transition-colors duration-300 shrink-0 ${errors.service ? "text-error-red" : "text-text-muted group-focus-within:text-[#2563EB]"}`}>
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
                    className="absolute z-20 left-0 top-[108%] w-full bg-white border border-[#E5E7EB] rounded-xl shadow-xl py-1 max-h-72 overflow-y-auto"
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
                        className={`w-full flex items-start gap-3 px-4 py-2.5 text-left transition-colors hover:bg-light-bg ${
                          formData.service === opt.value ? "bg-[#2563EB]/5 text-[#2563EB]" : "text-text-primary"
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 mt-0.5 transition-colors ${
                          formData.service === opt.value ? "bg-[#2563EB] text-white" : "bg-light-bg text-text-secondary"
                        }`}>
                          <i className={opt.icon} />
                        </span>
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                          <span className={`text-xs font-bold ${formData.service === opt.value ? "text-[#2563EB]" : "text-text-primary"}`}>
                            {opt.label}
                          </span>
                          <span className="text-[10px] text-text-muted truncate">{opt.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.service && <span className="text-[9px] font-semibold text-[#ef4444] mt-0.5">{errors.service}</span>}
            </div>

          </div>

          {/* Details / Message - Full Width */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-[10px] font-extrabold text-text-secondary uppercase tracking-widest mb-1 block">
              Requirement Details
            </label>
            <div className="flex bg-light-bg rounded-xl border border-[#E5E7EB] hover:border-gray-300 p-4 group transition-all duration-300 focus-within:bg-white focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/10">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your requirements (pages needed, specific features, timeline, etc.)..."
                className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-medium resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2563EB] hover:bg-[#3B82F6] text-white font-extrabold text-xs py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin" /> Submitting...
              </>
            ) : (
              ctaText
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
              className="bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold px-8 py-3 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
