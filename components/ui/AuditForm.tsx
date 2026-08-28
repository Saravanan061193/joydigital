"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getUtmParameters } from "@/lib/utmTracker";

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

const GOAL_OPTIONS = [
  { value: "Get More Leads", label: "Get More Leads" },
  { value: "Improve Google Ranking", label: "Improve Google Ranking" },
  { value: "Build a New Website", label: "Build a New Website" },
  { value: "Redesign Existing Website", label: "Redesign Existing Website" },
  { value: "Local SEO", label: "Local SEO" },
  { value: "Digital Marketing", label: "Digital Marketing" },
];

const BUDGET_OPTIONS = [
  { value: "15k_30k", label: "₹15,000 - ₹30,000 (approx. $200 - $400)" },
  { value: "30k_75k", label: "₹30,000 - ₹75,000 (approx. $400 - $1,000)" },
  { value: "75k_1.5l", label: "₹75,000 - ₹1.5L (approx. $1,000 - $2,000)" },
  { value: "above_1.5l", label: "Above ₹1.5L ($2,000+)" },
];

const BUSINESS_TYPES = [
  "Local Services / Contractor",
  "Medical & Healthcare Clinic",
  "Hotel & Hospitality",
  "Tours & Travel Agency",
  "Real Estate Brokerage",
  "E-commerce Brand",
  "School & Education Hub",
  "Insurance & Financial Planning",
  "SaaS / Tech Startup",
  "Other Business Type",
];

export default function AuditForm() {
  const router = useRouter();
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    website: "",
    email: "",
    mobile: "",
    businessType: "",
    mainGoal: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Dropdown States
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};

    if (!formData.name.trim()) tempErrors.name = "Full Name is required.";
    if (!formData.companyName.trim()) tempErrors.companyName = "Business Name is required.";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email Address is required.";
    } else {
      const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailReg.test(formData.email.trim())) {
        tempErrors.email = "Please enter a valid email address.";
      }
    }

    if (!formData.website.trim()) {
      tempErrors.website = "Website URL is required.";
    } else {
      const webReg = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
      if (!webReg.test(formData.website.trim())) {
        tempErrors.website = "Please enter a valid website URL.";
      }
    }

    const mobileVal = formData.mobile.trim();
    if (!mobileVal) {
      tempErrors.mobile = "WhatsApp number is required.";
    } else {
      const numbersOnly = mobileVal.replace(/\D/g, "");
      if (numbersOnly.length < 7) {
        tempErrors.mobile = "Please enter a valid phone number.";
      }
    }

    if (!formData.mainGoal) tempErrors.mainGoal = "Please select your primary goal.";

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
        name: formData.name.trim(),
        companyName: formData.companyName.trim(),
        website: formData.website.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim().startsWith("+")
          ? formData.mobile.trim()
          : `${selectedCountryCode} ${formData.mobile.trim()}`,
        service: `Free Website Audit: Goal - ${formData.mainGoal}`,
        budget: formData.budget || "N/A",
        message: `Business Type: ${formData.businessType || "N/A"}. Requirements: ${formData.message.trim() || "No extra details provided."}`,
        source: "Free Website Audit Landing Page Form",
        region: "IN",
        utmParams: utm || undefined,
        _subject: `🔥 Free Website Audit Request - Joy Digital`,
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

      // Track Form Submission
      if (typeof window !== "undefined") {
        const tracker = (window as any).trackJoyDigitalEvent;
        if (typeof tracker === "function") {
          tracker("contact_form_submission", {
            form_source: "Free Website Audit Form",
            page_url: window.location.href,
            budget: formData.budget,
            goal: formData.mainGoal,
          });
        }
      }

      // Redirect to thank you page
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      alert("Audit request submission failed. Please WhatsApp us directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      ` }} />

      <div className="bg-white border border-[#E9E4F2] p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-200">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F97316]" />

        <h3 className="text-xl font-extrabold text-primary-dark mb-1 leading-snug">Get My Free Audit Report</h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-6">Complete the brief details below to queue your performance analysis.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Row 1: Name and Business Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">
                Full Name <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-xl border px-3.5 py-2.5 transition-all duration-200 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 ${
                errors.name ? "border-rose-450 bg-rose-50/5" : "border-[#E9E4F2] hover:border-[#7C3AED]/20"
              }`}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-semibold"
                />
              </div>
              {errors.name && <span className="text-[9px] font-bold text-rose-500 mt-0.5">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="companyName" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">
                Business Name <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-xl border px-3.5 py-2.5 transition-all duration-200 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 ${
                errors.companyName ? "border-rose-450 bg-rose-50/5" : "border-[#E9E4F2] hover:border-[#7C3AED]/20"
              }`}>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corp"
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-semibold"
                />
              </div>
              {errors.companyName && <span className="text-[9px] font-bold text-rose-500 mt-0.5">{errors.companyName}</span>}
            </div>
          </div>

          {/* Row 2: WhatsApp Number */}
          <div className="flex flex-col gap-1">
            <label htmlFor="mobile" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">
              WhatsApp Number <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="flex gap-2 relative">
              <div className="relative" ref={countryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className="w-[100px] text-xs py-2.5 px-3 bg-[#FAF9FF] rounded-xl border border-[#E9E4F2] hover:border-gray-300 hover:bg-white text-left flex items-center justify-between outline-none cursor-pointer font-bold text-text-primary h-full transition-all focus:ring-4 focus:ring-[#7C3AED]/10 focus:border-[#7C3AED]"
                >
                  <span className="flex items-center gap-1.5 select-none">
                    <span>{COUNTRY_CODES.find(c => c.code === selectedCountryCode)?.flag}</span>
                    <span>{selectedCountryCode}</span>
                  </span>
                  <span className={`text-[8px] text-text-muted transition-transform duration-200 ${isCountryOpen ? "rotate-180" : ""}`}>
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </button>

                {isCountryOpen && (
                  <div 
                    className="absolute z-30 left-0 top-[108%] w-64 max-h-60 overflow-y-auto bg-white border border-[#E9E4F2] rounded-xl shadow-2xl py-1"
                    style={{ animation: "fadeInSlideDown 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
                  >
                    <div className="p-2 border-b border-[#E9E4F2] bg-[#FAF9FF] sticky top-0 z-10">
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#E9E4F2] rounded-md focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/5 outline-none"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
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
                            <span>{c.flag}</span>
                            <span className="font-medium truncate max-w-[130px]">{c.name}</span>
                          </span>
                          <span className="font-semibold text-text-muted text-[10px]">{c.code}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-xs text-text-muted text-center">No results found</div>
                    )}
                  </div>
                )}
              </div>

              <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-xl border px-3.5 py-2.5 flex-1 transition-all duration-200 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 ${
                errors.mobile ? "border-rose-450 bg-rose-50/5" : "border-[#E9E4F2] hover:border-[#7C3AED]/20"
              }`}>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="WhatsApp Number"
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-semibold"
                />
              </div>
            </div>
            {errors.mobile && <span className="text-[9px] font-bold text-rose-500 mt-0.5">{errors.mobile}</span>}
          </div>

          {/* Row 3: Email and Website URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">
                Email Address <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-xl border px-3.5 py-2.5 transition-all duration-200 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 ${
                errors.email ? "border-rose-450 bg-rose-50/5" : "border-[#E9E4F2] hover:border-[#7C3AED]/20"
              }`}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-semibold"
                />
              </div>
              {errors.email && <span className="text-[9px] font-bold text-rose-500 mt-0.5">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="website" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">
                Website URL <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-xl border px-3.5 py-2.5 transition-all duration-200 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 ${
                errors.website ? "border-rose-450 bg-rose-50/5" : "border-[#E9E4F2] hover:border-[#7C3AED]/20"
              }`}>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="www.yourcompany.com"
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-semibold"
                />
              </div>
              {errors.website && <span className="text-[9px] font-bold text-rose-500 mt-0.5">{errors.website}</span>}
            </div>
          </div>

          {/* Row 4: Business Type and Main Goal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="businessType" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">
                Business Type
              </label>
              <div className="flex items-center gap-2 bg-[#FAF9FF] rounded-xl border border-[#E9E4F2] px-3.5 py-2.5 hover:border-[#7C3AED]/20 transition-all duration-200 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10">
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary font-semibold cursor-pointer"
                >
                  <option value="">Select Industry</option>
                  {BUSINESS_TYPES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="mainGoal" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">
                Main Goal <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-xl border px-3.5 py-2.5 transition-all duration-200 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 ${
                errors.mainGoal ? "border-rose-450 bg-rose-50/5" : "border-[#E9E4F2] hover:border-[#7C3AED]/20"
              }`}>
                <select
                  id="mainGoal"
                  name="mainGoal"
                  value={formData.mainGoal}
                  onChange={handleChange}
                  className="w-full text-xs bg-transparent outline-none border-none text-text-primary font-semibold cursor-pointer"
                >
                  <option value="">Select Primary Goal</option>
                  {GOAL_OPTIONS.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
              {errors.mainGoal && <span className="text-[9px] font-bold text-rose-500 mt-0.5">{errors.mainGoal}</span>}
            </div>
          </div>

          {/* Row 5: Budget and Extra Message */}
          <div className="flex flex-col gap-1">
            <label htmlFor="budget" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">
              Approximate Budget
            </label>
            <div className="flex items-center gap-2 bg-[#FAF9FF] rounded-xl border border-[#E9E4F2] px-3.5 py-2.5 hover:border-[#7C3AED]/20 transition-all duration-200 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10">
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full text-xs bg-transparent outline-none border-none text-text-primary font-semibold cursor-pointer"
              >
                <option value="">Select Project Budget</option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">
              Message / Notes (Optional)
            </label>
            <div className="flex bg-[#FAF9FF] rounded-xl border border-[#E9E4F2] hover:border-[#7C3AED]/20 p-3 transition-all duration-200 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={2}
                placeholder="List any speed issues, competitor links, or special requirements..."
                className="w-full text-xs bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-semibold resize-none font-sans"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs py-4 rounded-xl shadow-lg shadow-[#7C3AED]/15 hover:shadow-[#7C3AED]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin" /> Analyzing Your Domain...
              </>
            ) : (
              "Get My Free Website Report"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
