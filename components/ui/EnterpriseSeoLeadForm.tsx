"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getUtmParameters } from "@/lib/utmTracker";

const BUSINESS_TYPE_OPTIONS = [
  { value: "b2b_industrial", label: "B2B / Industrial" },
  { value: "saas_tech", label: "SaaS / Tech" },
  { value: "global_ecommerce", label: "Global E-commerce" },
  { value: "professional_services", label: "Professional Services" },
];

export default function EnterpriseSeoLeadForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    businessType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      tempErrors.name = "Full Name is required.";
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

    if (!formData.businessType) {
      tempErrors.businessType = "Please select your business type.";
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
        CompanyName: "N/A",
        Website: "N/A",
        Email: "provided-on-call@joydigital.in",
        Mobile: formData.mobile.trim(),
        Service: `Enterprise B2B SEO & GEO (${formData.businessType})`,
        Budget: "N/A",
        Timeline: "N/A",
        Message: `Business Type: ${formData.businessType}`,
        Source: "Enterprise SEO Landing Page",
        TargetRegion: "GLOBAL",
        utmParams: utm || undefined,
        _subject: `🔥 Enterprise SEO Lead [${formData.businessType}] - Joy Digital`,
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

      if (typeof window !== "undefined") {
        const tracker = (window as any).trackJoyDigitalEvent;
        if (typeof tracker === "function") {
          tracker("contact_form_submission", {
            form_source: "Enterprise SEO Landing Page",
            page_url: window.location.href,
            business_type: formData.businessType,
          });
        } else {
          const gtag = (window as any).gtag;
          if (typeof gtag === "function") {
            gtag("event", "contact_form_submission", {
              form_source: "Enterprise SEO Landing Page",
              page_url: window.location.href,
              business_type: formData.businessType,
            });
          }
        }
      }

      setFormData({
        name: "",
        mobile: "",
        businessType: "",
      });
      setErrors({});
      setIsSuccess(true);
      
      const queryParams = new URLSearchParams({
        name: formData.name.trim(),
        service: "Enterprise B2B SEO & GEO",
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      ` }} />

      <div className="bg-white border border-[#E9E4F2] p-5 sm:p-6 rounded-2xl shadow-2xl w-full max-w-md relative transition-all duration-300 hover:shadow-2xl hover:border-gray-200">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F97316] rounded-t-2xl" />

        <div className="mb-6 mt-1 text-center lg:text-left">
          <h3 className="text-xl font-extrabold text-primary-dark mb-1.5 leading-snug">
            Request a Free Global B2B Technical SEO & AI Search Audit
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Enter your details below to discuss revenue-driven organic pipeline growth and GEO mapping.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider">
              Full Name <span className="text-error-red">*</span>
            </label>
            <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-lg border px-3 py-3 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 transition-all ${errors.name ? "border-[#ef4444]" : "border-[#E9E4F2]"}`}>
              <span className="text-xs text-text-muted"><i className="fa-solid fa-user" /></span>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full text-sm bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-semibold"
                value={formData.name}
                onChange={(e) => { setFormData({...formData, name: e.target.value}); setErrors({...errors, name: ""}); }}
              />
            </div>
            {errors.name && <span className="text-[9px] font-semibold text-[#ef4444] mt-0.5">{errors.name}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider">
              Contact Number <span className="text-error-red">*</span>
            </label>
            <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-lg border px-3 py-3 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 transition-all ${errors.mobile ? "border-[#ef4444]" : "border-[#E9E4F2]"}`}>
              <span className="text-xs text-text-muted"><i className="fa-solid fa-phone" /></span>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full text-sm bg-transparent outline-none border-none text-text-primary placeholder:text-text-muted font-semibold"
                value={formData.mobile}
                onChange={(e) => { setFormData({...formData, mobile: e.target.value}); setErrors({...errors, mobile: ""}); }}
              />
            </div>
            {errors.mobile && <span className="text-[9px] font-semibold text-[#ef4444] mt-0.5">{errors.mobile}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider">
              Business Type <span className="text-error-red">*</span>
            </label>
            <div className={`flex items-center gap-2 bg-[#FAF9FF] rounded-lg border px-3 py-3 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 transition-all ${errors.businessType ? "border-[#ef4444]" : "border-[#E9E4F2]"}`}>
              <span className="text-xs text-text-muted"><i className="fa-solid fa-building" /></span>
              <select
                className="w-full text-sm bg-transparent outline-none border-none text-text-primary font-semibold cursor-pointer"
                value={formData.businessType}
                onChange={(e) => { setFormData({...formData, businessType: e.target.value}); setErrors({...errors, businessType: ""}); }}
              >
                <option value="" disabled>Select Business Type</option>
                {BUSINESS_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {errors.businessType && <span className="text-[9px] font-semibold text-[#ef4444] mt-0.5">{errors.businessType}</span>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-[#7C3AED]/20 hover:shadow-[#7C3AED]/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
               <>
                 <i className="fa-solid fa-spinner animate-spin" /> Processing...
               </>
            ) : (
               <>
                 Request Enterprise Audit <i className="fa-solid fa-arrow-right text-xs" />
               </>
            )}
          </button>
        </form>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-[#E5E7EB] flex flex-col items-center">
            <div className="text-[#10b981] text-6xl mb-4 leading-none animate-bounce">
              <i className="fa-solid fa-circle-check" />
            </div>
            <h4 className="text-xl font-extrabold text-primary-dark mb-2">Audit Request Submitted!</h4>
            <p className="text-sm text-text-secondary mb-6 leading-relaxed">
              Thank you for requesting an Enterprise SEO Audit. Our technical growth strategists will review your domain and reach out shortly.
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
