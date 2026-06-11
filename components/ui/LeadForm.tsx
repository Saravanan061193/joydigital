"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface LeadFormProps {
  layout?: "vertical" | "horizontal";
  title?: string;
  subtitle?: string;
  ctaText?: string;
  source?: string;
  showWebsiteField?: boolean;
}

export default function LeadForm({
  layout = "vertical",
  title = "Get a Free Growth Consultation",
  subtitle = "Our digital experts will analyze your needs and reach out within 24 hours.",
  ctaText = "Submit Request",
  source = "General Lead Funnel",
  showWebsiteField = false,
}: LeadFormProps) {
  const pathname = usePathname();
  const [currentRegion, setCurrentRegion] = useState("");
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    bottleneck: "",
    service: "",
    website: "",
    region: "",
    budget: "",
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-detect region on mount
  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean);
    const detected = (parts.length > 0 && ["us", "uk", "ae", "in"].includes(parts[0])) ? parts[0] : "";
    setCurrentRegion(detected);
    setFormData((prev) => ({ 
      ...prev, 
      region: detected || "us" // default to us if global
    }));
  }, [pathname]);

  const validateStep = (currentStep: number) => {
    const tempErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.bottleneck) tempErrors.bottleneck = "Please select your primary challenge.";
    }
    
    if (currentStep === 2) {
      if (!formData.service) tempErrors.service = "Please select a service.";
      
      const isAuditOrSEO = 
        source.toLowerCase().includes("audit") || 
        showWebsiteField || 
        formData.bottleneck === "speed" || 
        formData.bottleneck === "traffic";
        
      if (isAuditOrSEO && !formData.website.trim()) {
        tempErrors.website = "Website URL is required for performance audits.";
      } else if (formData.website.trim()) {
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        if (!urlPattern.test(formData.website.trim())) {
          tempErrors.website = "Please enter a valid website URL (e.g. example.com).";
        }
      }
    }
    
    if (currentStep === 3) {
      if (!formData.budget) tempErrors.budget = "Please select a budget range.";
    }
    
    if (currentStep === 4) {
      if (!formData.name.trim()) tempErrors.name = "Full Name is required.";
      
      const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!formData.email.trim()) {
        tempErrors.email = "Email Address is required.";
      } else if (!emailReg.test(formData.email.trim())) {
        tempErrors.email = "Please enter a valid email address.";
      }
      
      if (!formData.mobile.trim()) {
        tempErrors.mobile = "Contact number is required.";
      } else if (formData.mobile.trim().length < 7) {
        tempErrors.mobile = "Please enter a valid phone number.";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectOption = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsLoading(true);
    try {
      const payload = {
        Bottleneck: formData.bottleneck,
        Service: formData.service,
        Website: formData.website || "N/A",
        TargetRegion: formData.region.toUpperCase(),
        MonthlyBudget: formData.budget,
        Name: formData.name,
        Email: formData.email,
        Mobile: formData.mobile,
        Message: formData.message || "No extra details provided.",
        Source: source,
        _subject: `🔥 Global Lead [${formData.region.toUpperCase()}] - Joy Digital`,
        _captcha: "false",
        _template: "table",
      };

      const response = await fetch("https://formsubmit.co/ajax/joydiigtals@gmail.com", {
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
      
      // GA4 Conversion Tracking
      if (typeof window !== "undefined") {
        const gtag = (window as any).gtag;
        if (typeof gtag === "function") {
          gtag("event", "contact_form_submission", {
            form_source: source,
            page_url: window.location.href,
          });
        }
      }
      setFormData({
        bottleneck: "",
        service: "",
        website: "",
        region: currentRegion || "us",
        budget: "",
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
      setStep(1);
    } catch (err) {
      console.error(err);
      alert("Lead delivery failed. Please email us at joydiigtals@gmail.com directly.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get budgets based on region
  const getBudgets = () => {
    const reg = formData.region || currentRegion || "us";
    if (reg === "in") {
      return [
        { label: "Starter (Under ₹25,000/mo)", value: "Under ₹25k" },
        { label: "Growth (₹25,000 - ₹50,000/mo)", value: "₹25k - ₹50k" },
        { label: "Scale (₹50,000 - ₹1,00,000/mo)", value: "₹50k - ₹100k" },
        { label: "Enterprise (₹1,00,000+/mo)", value: "₹100k+" },
      ];
    } else if (reg === "ae") {
      return [
        { label: "Starter (Under 3,500 AED/mo)", value: "Under 3.5k AED" },
        { label: "Growth (3,500 - 10,000 AED/mo)", value: "3.5k - 10k AED" },
        { label: "Scale (10,000 - 18,000 AED/mo)", value: "10k - 18k AED" },
        { label: "Enterprise (18,000+ AED/mo)", value: "18k+ AED" },
      ];
    } else if (reg === "uk") {
      return [
        { label: "Starter (Under £750/mo)", value: "Under £750" },
        { label: "Growth (£750 - £2,500/mo)", value: "£750 - £2.5k" },
        { label: "Scale (£2,500 - £5,000/mo)", value: "£2.5k - £5k" },
        { label: "Enterprise (£5,000+/mo)", value: "£5k+" },
      ];
    } else {
      // Default to USD
      return [
        { label: "Starter (Under $1,000/mo)", value: "Under $1k" },
        { label: "Growth ($1,000 - $3,000/mo)", value: "$1k - $3k" },
        { label: "Scale ($3,000 - $5,000/mo)", value: "$3k - $5k" },
        { label: "Enterprise ($5,000+/mo)", value: "$5k+" },
      ];
    }
  };

  const budgets = getBudgets();

  return (
    <>
      <div className={`bg-white border border-gray-100 p-8 rounded-2xl shadow-xl w-full ${layout === "horizontal" ? "max-w-4xl" : "max-w-md"} relative overflow-hidden`}>
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-accent to-accent-light transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Title Zone */}
        <div className="mb-6 mt-2">
          {title && <h3 className="text-xl font-bold text-primary-dark mb-1">{title}</h3>}
          {subtitle && <p className="text-xs text-text-secondary leading-relaxed">{subtitle}</p>}
          <div className="flex justify-between items-center mt-3 text-[10px] font-extrabold text-accent uppercase tracking-widest">
            <span>Step {step} of 4</span>
            <span>{Math.round((step / 4) * 100)}% Complete</span>
          </div>
        </div>

        {/* Step 1: Bottleneck */}
        {step === 1 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <h4 className="text-sm font-bold text-primary-dark">What is your primary digital challenge?</h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: "speed", label: "Slow Site / Bloated Platform Code", icon: "fa-solid fa-gauge-high" },
                { id: "traffic", label: "Low Organic Traffic & Google Rankings", icon: "fa-solid fa-arrow-trend-down" },
                { id: "leads", label: "Good Traffic, but Zero Phone Leads/Enquiries", icon: "fa-solid fa-user-xmark" },
                { id: "branding", label: "Outdated Brand Identity & Logo Styling", icon: "fa-solid fa-bezier-curve" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectOption("bottleneck", item.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                    formData.bottleneck === item.id
                      ? "border-accent bg-accent/5 ring-1 ring-accent"
                      : "border-gray-200 hover:border-accent/50 hover:bg-light-bg"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${formData.bottleneck === item.id ? "bg-accent text-white" : "bg-light-bg text-text-secondary"}`}>
                    <i className={item.icon} />
                  </div>
                  <span className="text-xs font-semibold text-text-primary">{item.label}</span>
                </button>
              ))}
            </div>
            {errors.bottleneck && <span className="text-[10px] font-semibold text-error-red mt-1">{errors.bottleneck}</span>}
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 rounded-lg shadow-md transition-all mt-4 flex items-center justify-center gap-2"
            >
              Continue <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        )}

        {/* Step 2: Service & Website */}
        {step === 2 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <h4 className="text-sm font-bold text-primary-dark">Which service are you interested in?</h4>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="service" className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Service Category</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs"><i className="fa-solid fa-screwdriver-wrench" /></span>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full text-xs py-3 pl-10 pr-10 bg-light-bg rounded-lg border appearance-none ${
                    errors.service ? "border-error-red bg-red-50/20" : "border-gray-200 focus:border-accent"
                  } outline-none cursor-pointer transition-all`}
                >
                  <option value="" disabled>Select a Service</option>
                  <option value="Website Design & Development">Next.js Web Design & Development</option>
                  <option value="Global SEO Services">Performance SEO Services</option>
                  <option value="Local SEO & GBP Setup">Local SEO & Google Map Pack Setup</option>
                  <option value="Social Media Marketing">Social Media Marketing & Brand Management</option>
                  <option value="Logo & Brand Identity">Corporate Logo & Brand Style Guide</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-[8px]">
                  <i className="fa-solid fa-chevron-down" />
                </span>
              </div>
              {errors.service && <span className="text-[10px] font-semibold text-error-red mt-1">{errors.service}</span>}
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <label htmlFor="website" className="text-[10px] font-bold text-text-primary uppercase tracking-wider">
                Current Website URL
                {(source.toLowerCase().includes("audit") || formData.bottleneck === "speed" || formData.bottleneck === "traffic" || showWebsiteField) && (
                  <span className="text-error-red"> *</span>
                )}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs"><i className="fa-solid fa-globe" /></span>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="e.g. mybusiness.com"
                  className={`w-full text-xs py-3 pl-10 pr-4 bg-light-bg rounded-lg border ${
                    errors.website ? "border-error-red bg-red-50/20" : "border-gray-200 focus:border-accent"
                  } outline-none transition-all`}
                />
              </div>
              {errors.website && <span className="text-[10px] font-semibold text-error-red mt-1">{errors.website}</span>}
              <p className="text-[9px] text-text-secondary mt-1">Leave blank if you don&apos;t have a website yet.</p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="w-1/3 border border-gray-200 hover:border-gray-300 text-text-primary font-bold text-xs py-3.5 rounded-lg transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-2/3 bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                Continue <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Region & Budget */}
        {step === 3 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <h4 className="text-sm font-bold text-primary-dark">Select target market & monthly budget</h4>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="region" className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Target Region</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs"><i className="fa-solid fa-map-pin" /></span>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData((prev) => ({ ...prev, budget: "" })); // Reset budget when region changes
                  }}
                  className="w-full text-xs py-3 pl-10 pr-10 bg-light-bg rounded-lg border appearance-none border-gray-200 focus:border-accent outline-none cursor-pointer transition-all"
                >
                  <option value="us">🇺🇸 United States (USD)</option>
                  <option value="uk">🇬🇧 United Kingdom (GBP)</option>
                  <option value="ae">🇦🇪 United Arab Emirates (AED)</option>
                  <option value="in">🇮🇳 India (INR)</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-[8px]">
                  <i className="fa-solid fa-chevron-down" />
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Select Monthly Budget</span>
              <div className="grid grid-cols-1 gap-2">
                {budgets.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => handleSelectOption("budget", b.value)}
                    className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all ${
                      formData.budget === b.value
                        ? "border-accent bg-accent/5 ring-1 ring-accent"
                        : "border-gray-200 hover:border-accent/40 hover:bg-light-bg"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              {errors.budget && <span className="text-[10px] font-semibold text-error-red mt-1">{errors.budget}</span>}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="w-1/3 border border-gray-200 hover:border-gray-300 text-text-primary font-bold text-xs py-3.5 rounded-lg transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-2/3 bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                Continue <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Contact Details */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in">
            <h4 className="text-sm font-bold text-primary-dark">Enter your contact details to finalize</h4>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Full Name <span className="text-error-red">*</span></label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs"><i className="fa-solid fa-user" /></span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full text-xs py-3 pl-10 pr-4 bg-light-bg rounded-lg border ${
                    errors.name ? "border-error-red bg-red-50/20" : "border-gray-200 focus:border-accent"
                  } outline-none transition-all`}
                />
              </div>
              {errors.name && <span className="text-[10px] font-semibold text-error-red">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Email Address <span className="text-error-red">*</span></label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs"><i className="fa-solid fa-envelope" /></span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full text-xs py-3 pl-10 pr-4 bg-light-bg rounded-lg border ${
                    errors.email ? "border-error-red bg-red-50/20" : "border-gray-200 focus:border-accent"
                  } outline-none transition-all`}
                />
              </div>
              {errors.email && <span className="text-[10px] font-semibold text-error-red">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="mobile" className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Mobile / WhatsApp Number <span className="text-error-red">*</span></label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs"><i className="fa-solid fa-phone" /></span>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="e.g. +1 555-0199 or WhatsApp"
                  className={`w-full text-xs py-3 pl-10 pr-4 bg-light-bg rounded-lg border ${
                    errors.mobile ? "border-error-red bg-red-50/20" : "border-gray-200 focus:border-accent"
                  } outline-none transition-all`}
                />
              </div>
              {errors.mobile && <span className="text-[10px] font-semibold text-error-red">{errors.mobile}</span>}
            </div>

            {layout === "vertical" && (
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Message details (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Briefly describe your requirements..."
                  className="w-full text-xs py-2 px-4 bg-light-bg rounded-lg border border-gray-200 focus:border-accent outline-none resize-none transition-all"
                />
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={isLoading}
                className="w-1/3 border border-gray-200 hover:border-gray-300 text-text-primary font-bold text-xs py-3.5 rounded-lg transition-all disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 bg-gradient-to-r from-accent to-accent-light text-white font-bold text-xs py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin" /> Submitting...
                  </>
                ) : (
                  ctaText
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Success Modal Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-gray-100 flex flex-col items-center">
            <div className="text-success-green text-6xl mb-4 leading-none animate-bounce">
              <i className="fa-solid fa-circle-check" />
            </div>
            <h4 className="text-xl font-extrabold text-primary-dark mb-2">Goal Configured!</h4>
            <p className="text-sm text-text-secondary mb-6 leading-relaxed">Thank you. Your request is queued. Our digital strategist will run a pre-qualification review and contact you within 24 hours.</p>
            <button
              onClick={() => setIsSuccess(false)}
              className="bg-accent text-white font-bold px-8 py-3 rounded-lg shadow-md hover:bg-accent-dark transition-all duration-200"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}

