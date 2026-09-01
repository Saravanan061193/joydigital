"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building,
  Phone,
  Mail,
  User,
  Globe,
  Coins,
  Sparkles,
  ShieldCheck,
  Loader2,
  Calendar,
  Layers,
} from "lucide-react";
import { getUtmParameters } from "@/lib/utmTracker";

interface MultiStepLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  source?: string;
}

const SERVICE_OPTIONS = [
  { value: "Website Design & Development", label: "High-Speed Next.js Web System", desc: "Sub-second load times & conversion engineering" },
  { value: "Enterprise SEO & Growth", label: "Global & Enterprise SEO", desc: "Organic search pipeline scaling" },
  { value: "Headless E-commerce", label: "Headless Storefront Rebuild", desc: "High-converting checkout & static pre-rendering" },
  { value: "Custom Web Application", label: "Bespoke SaaS / Web Portal", desc: "Tailored React platforms & API integrations" },
];

const BUDGET_OPTIONS = [
  { value: "$500 - $1,500", label: "$500 - $1,500 / Tier 1 Sprint" },
  { value: "$1,500 - $5,000", label: "$1,500 - $5,000 / Full System Rebuild" },
  { value: "$5,000 - $15,000", label: "$5,000 - $15,000 / Enterprise Scale" },
  { value: "Custom Enterprise", label: "Custom Enterprise Retainer" },
];

export default function MultiStepLeadModal({
  isOpen,
  onClose,
  initialEmail = "",
  source = "Hero Ultra-Lean Capture",
}: MultiStepLeadModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: initialEmail,
    phone: "",
    company: "",
    website: "",
    service: SERVICE_OPTIONS[0].value,
    budget: BUDGET_OPTIONS[1].value,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      setFormData((prev) => ({ ...prev, email: initialEmail }));
    }
  }, [initialEmail]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your full name.";
    if (!formData.email.trim()) {
      errs.email = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid work email address.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone or WhatsApp number is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      handleNext();
      return;
    }

    setIsSubmitting(true);
    try {
      const utm = getUtmParameters();
      const payload = {
        Name: formData.name.trim(),
        CompanyName: formData.company.trim() || "N/A",
        Website: formData.website.trim() || "N/A",
        Email: formData.email.trim(),
        Mobile: formData.phone.trim(),
        Service: formData.service,
        Budget: formData.budget,
        Message: formData.message.trim() || "Requested 15-Min Discovery & Growth Call",
        Source: source,
        TargetRegion: "GLOBAL",
        utmParams: utm || undefined,
        _subject: `⚡ Global Growth Discovery Lead - ${formData.name.trim()}`,
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit enquiry");

      if (typeof window !== "undefined") {
        const tracker = (window as any).trackJoyDigitalEvent;
        if (typeof tracker === "function") {
          tracker("hero_lead_modal_submitted", {
            source,
            service: formData.service,
          });
        }
      }

      onClose();
      const params = new URLSearchParams({
        name: formData.name.trim(),
        service: formData.service,
      }).toString();
      router.push(`/thank-you?${params}`);
    } catch (err) {
      console.error("Modal form submit error:", err);
      alert("Something went wrong. Please reach us at saravanan061193@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07060E]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-[#0F0D1C] border border-[#2A2440] rounded-2xl shadow-2xl overflow-hidden z-10 text-white"
          >
            {/* Top Accent Gradient Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-500" />

            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-[#201B36] relative flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Step {step} of 2 • Fast Track Discovery</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {step === 1 ? "Book Your 15-Min Growth Call" : "Tell Us About Your Project"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {step === 1
                    ? "Direct strategy call with senior web engineers & SEO specialists."
                    : "Help us tailor our audit & discovery deck to your exact goals."}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-[#1B1730] hover:bg-[#252042] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full bg-[#151226] border text-sm text-white placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 transition-all ${
                          errors.name ? "border-rose-500 focus:ring-rose-500/20" : "border-[#2A2440] focus:border-violet-500 focus:ring-violet-500/20"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Work Email <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-[#151226] border text-sm text-white placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 transition-all ${
                          errors.email ? "border-rose-500 focus:ring-rose-500/20" : "border-[#2A2440] focus:border-violet-500 focus:ring-violet-500/20"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000 or WhatsApp"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full bg-[#151226] border text-sm text-white placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 transition-all ${
                          errors.phone ? "border-rose-500 focus:ring-rose-500/20" : "border-[#2A2440] focus:border-violet-500 focus:ring-violet-500/20"
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Primary Objective
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {SERVICE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: opt.value })}
                          className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                            formData.service === opt.value
                              ? "bg-violet-600/15 border-violet-500 text-white"
                              : "bg-[#151226] border-[#2A2440] text-slate-300 hover:border-slate-600"
                          }`}
                        >
                          <div>
                            <p className="text-xs font-bold">{opt.label}</p>
                            <p className="text-[11px] text-slate-400">{opt.desc}</p>
                          </div>
                          {formData.service === opt.value && (
                            <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 ml-2" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Company Name & Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Acme Inc."
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-[#151226] border border-[#2A2440] focus:border-violet-500 text-xs text-white placeholder:text-slate-500 rounded-xl pl-9 pr-3 py-2.5 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Website (Optional)
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="acme.com"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full bg-[#151226] border border-[#2A2440] focus:border-violet-500 text-xs text-white placeholder:text-slate-500 rounded-xl pl-9 pr-3 py-2.5 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#151226] border border-[#2A2440] focus:border-violet-500 text-xs text-white rounded-xl px-3 py-2.5 outline-none"
                    >
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b.value} value={b.value} className="bg-[#0F0D1C] text-white">
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 rounded-xl bg-[#1B1730] hover:bg-[#252042] border border-[#2A2440] text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                )}

                {step === 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Continue to Project Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming Request...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>Confirm Discovery Call</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Trust Micro-Footer */}
              <div className="pt-2 text-center border-t border-[#1C1833]">
                <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Privacy • No Spam Guarantee • Direct Engineer Discovery</span>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
