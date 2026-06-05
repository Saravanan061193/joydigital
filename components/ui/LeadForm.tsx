"use client";

import React, { useState } from "react";

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
  title = "Get a Free Consultation",
  subtitle = "Our digital experts will contact you within 24 hours.",
  ctaText = "Send Enquiry",
  source = "General Lead Form",
  showWebsiteField = false,
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    service: "",
    website: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required.";
    
    const mobileReg = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      tempErrors.mobile = "Mobile Number is required.";
    } else if (!mobileReg.test(formData.mobile.trim())) {
      tempErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email Address is required.";
    } else if (!emailReg.test(formData.email.trim())) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.service) tempErrors.service = "Please select a service.";
    
    if (showWebsiteField && !formData.website.trim() && source.toLowerCase().includes("audit")) {
      tempErrors.website = "Website URL is required for free audits.";
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
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source,
          subject: `New Lead [${source}] - Joy Digital`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        service: "",
        website: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Oops! Lead delivery failed. Please send your details to joydiigtals@gmail.com directly.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`bg-white border border-gray-100 p-8 rounded-2xl shadow-lg w-full ${layout === "horizontal" ? "max-w-4xl" : "max-w-md"}`}>
        {title && <h3 className="text-xl font-bold text-primary-dark mb-1">{title}</h3>}
        {subtitle && <p className="text-xs text-text-secondary mb-6 leading-relaxed">{subtitle}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className={layout === "horizontal" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
            
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-text-primary">
                Full Name <span className="text-error-red">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs">
                  <i className="fa-solid fa-user" />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full text-sm py-3 pl-10 pr-4 bg-light-bg rounded-lg border ${
                    errors.name ? "border-error-red bg-red-50/20" : "border-gray-200 focus:border-accent"
                  } outline-none transition-all`}
                />
              </div>
              {errors.name && <span className="text-[10px] font-medium text-error-red">{errors.name}</span>}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mobile" className="text-xs font-semibold text-text-primary">
                Mobile Number <span className="text-error-red">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs">
                  <i className="fa-solid fa-phone" />
                </span>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className={`w-full text-sm py-3 pl-10 pr-4 bg-light-bg rounded-lg border ${
                    errors.mobile ? "border-error-red bg-red-50/20" : "border-gray-200 focus:border-accent"
                  } outline-none transition-all`}
                />
              </div>
              {errors.mobile && <span className="text-[10px] font-medium text-error-red">{errors.mobile}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-text-primary">
                Email Address <span className="text-error-red">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs">
                  <i className="fa-solid fa-envelope" />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                  className={`w-full text-sm py-3 pl-10 pr-4 bg-light-bg rounded-lg border ${
                    errors.email ? "border-error-red bg-red-50/20" : "border-gray-200 focus:border-accent"
                  } outline-none transition-all`}
                />
              </div>
              {errors.email && <span className="text-[10px] font-medium text-error-red">{errors.email}</span>}
            </div>

            {/* Service Selection */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="service" className="text-xs font-semibold text-text-primary">
                Service Required <span className="text-error-red">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs pointer-events-none">
                  <i className="fa-solid fa-screwdriver-wrench" />
                </span>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full text-sm py-3 pl-10 pr-10 bg-light-bg rounded-lg border appearance-none ${
                    errors.service ? "border-error-red bg-red-50/20" : "border-gray-200 focus:border-accent"
                  } outline-none cursor-pointer transition-all`}
                >
                  <option value="" disabled>Choose a Service</option>
                  <option value="Website Design & Development">Website Design & Development</option>
                  <option value="E-commerce Websites">E-commerce Websites</option>
                  <option value="Google Business Profile Setup & Optimization">Google Business Profile Setup</option>
                  <option value="Local SEO Services">Local SEO Services</option>
                  <option value="Social Media Marketing">Social Media Marketing</option>
                  <option value="Logo Design">Logo Design</option>
                  <option value="Custom Software Development">Custom Software Development</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-[10px]">
                  <i className="fa-solid fa-chevron-down" />
                </span>
              </div>
              {errors.service && <span className="text-[10px] font-medium text-error-red">{errors.service}</span>}
            </div>

            {/* Website URL (Audit specific) */}
            {(showWebsiteField || source.toLowerCase().includes("audit")) && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="website" className="text-xs font-semibold text-text-primary">
                  Website URL {source.toLowerCase().includes("audit") && <span className="text-error-red">*</span>}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xs">
                    <i className="fa-solid fa-globe" />
                  </span>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className={`w-full text-sm py-3 pl-10 pr-4 bg-light-bg rounded-lg border ${
                      errors.website ? "border-error-red bg-red-50/20" : "border-gray-200 focus:border-accent"
                    } outline-none transition-all`}
                  />
                </div>
                {errors.website && <span className="text-[10px] font-medium text-error-red">{errors.website}</span>}
              </div>
            )}

            {/* Message Details */}
            {layout === "vertical" && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-text-primary">
                  Message Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe your requirements briefly..."
                  className="w-full text-sm py-3 px-4 bg-light-bg rounded-lg border border-gray-200 focus:border-accent outline-none resize-none transition-all"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-accent to-accent-light text-white font-bold text-sm py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
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
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-gray-100 flex flex-col items-center">
            <div className="text-success-green text-6xl mb-4 leading-none">
              <i className="fa-solid fa-circle-check" />
            </div>
            <h4 className="text-xl font-extrabold text-primary-dark mb-2">Enquiry Sent Successfully!</h4>
            <p className="text-sm text-text-secondary mb-6">Thank you. Our digital business consultant will contact you within 24 hours.</p>
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
