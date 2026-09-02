"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackToolUsage } from "@/lib/toolTracker";
import { useRouter } from "next/navigation";

const SCAN_STEPS = [
  "Checking Domain DNS and Server Response Code...",
  "Analyzing Robots.txt and XML Sitemap indexing status...",
  "Auditing Title Tag lengths and Meta Descriptions...",
  "Scanning heading hierarchies (H1, H2, H3 validation)...",
  "Checking image alt attributes and compression ratios...",
  "Validating Schema Markup (JSON-LD Organization, Local Business)...",
  "Analyzing Page load times and Core Web Vitals indices...",
];

export default function SeoAuditToolClient() {
  const router = useRouter();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIdx, setScanStepIdx] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  // Form states in case they click "Get Consultation"
  const [showModal, setShowModal] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    trackToolUsage({ toolName: "SEO Audit Tool", action: "tool_view" });
  }, []);

  // Scan simulation loop
  useEffect(() => {
    if (!isScanning) return;

    if (scanStepIdx < SCAN_STEPS.length) {
      const timer = setTimeout(() => {
        setScanStepIdx((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsScanning(false);
      setScanComplete(true);
      trackToolUsage({
        toolName: "SEO Audit Tool",
        action: "tool_use_complete",
        metadata: { websiteUrl },
      });
    }
  }, [isScanning, scanStepIdx, websiteUrl]);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim()) return;

    // Clean URL
    let cleanUrl = websiteUrl.trim();
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = "https://" + cleanUrl;
    }

    setWebsiteUrl(cleanUrl);
    setIsScanning(true);
    setScanStepIdx(0);
    setScanComplete(false);
    trackToolUsage({
      toolName: "SEO Audit Tool",
      action: "tool_start",
      metadata: { websiteUrl: cleanUrl },
    });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: leadName.trim(),
        mobile: leadPhone.trim(),
        email: leadEmail.trim() || "N/A",
        website: websiteUrl,
        service: "SEO Optimization Services",
        message: `Lead captured via SEO Audit Tool. User website: ${websiteUrl}. Requested full manual scan help.`,
        source: "SEO Audit Tool Simulated Results",
        _subject: `⚡ SEO Audit Tool Consultation Lead - Joy Digital`,
        _captcha: "false",
      };

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        if (typeof window !== "undefined") {
          const tracker = (window as any).trackJoyDigitalEvent;
          if (typeof tracker === "function") {
            tracker("contact_form_submission", {
              form_source: "SEO Audit Tool Modal",
              page_url: window.location.href,
            });
          }
        }
        setTimeout(() => {
          setShowModal(false);
          setSubmitSuccess(false);
          router.push("/thank-you");
        }, 1500);
      } else {
        throw new Error();
      }
    } catch (err) {
      alert("Submission failed. Please contact us via WhatsApp directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="bg-[#FAF9FF] text-[#1F1B2D] min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Breadcrumbs */}
          <nav className="text-xs text-[#6B6478] font-bold mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#7C3AED]">Home</a>
            <i className="fa-solid fa-chevron-right text-[8px]" aria-hidden="true" />
            <span className="text-[#1F1B2D]" aria-current="page">SEO Audit Tool</span>
          </nav>

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl font-black text-[#1F1B2D] mb-3">Instant SEO Audit Scan</h1>
            <p className="text-xs sm:text-sm text-[#6B6478] font-semibold leading-relaxed">
              Find out what ranking errors are keeping your website from reaching Google Page 1. Enter your website URL below to run an instant diagnosis.
            </p>
          </div>

          {/* Core App Box */}
          <div className="bg-white border border-[#E9E4F2] p-8 rounded-[24px] shadow-sm relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#7C3AED]" />

            {!isScanning && !scanComplete && (
              <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto py-8">
                <input
                  type="text"
                  placeholder="Enter website URL (e.g. mybusiness.com)"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  required
                  className="flex-1 bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 text-xs sm:text-sm font-bold outline-none focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10 transition-all text-[#1F1B2D] placeholder:text-[#A7A2B2]"
                />
                <button
                  type="submit"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs sm:text-sm px-6 py-3 sm:py-0 rounded-xl transition-all shadow-md shadow-[#7C3AED]/15 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Scan Website
                </button>
              </form>
            )}

            {/* SCANNING ACTIVE SCREEN */}
            {isScanning && (
              <div className="py-12 flex flex-col items-center gap-6 max-w-lg mx-auto">
                <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-[#7C3AED] animate-spin" />
                <div className="w-full">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-[#7C3AED] transition-all duration-500 rounded-full"
                      style={{ width: `${(scanStepIdx / SCAN_STEPS.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs font-bold text-[#7C3AED] animate-pulse">
                    {SCAN_STEPS[scanStepIdx] || "Compiling SEO audit variables..."}
                  </p>
                </div>
              </div>
            )}

            {/* SCAN COMPLETE RESULTS SCREEN */}
            {scanComplete && (
              <div className="text-left animate-fade-in py-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#E9E4F2] pb-6 mb-6">
                  <div>
                    <h2 className="text-lg font-black text-[#1F1B2D]">Scan Results for: <span className="text-[#7C3AED] font-black">{websiteUrl.replace(/https?:\/\//, "")}</span></h2>
                    <p className="text-xs text-[#6B6478] font-semibold mt-1">Audit status flags collected on Google Search crawler variables.</p>
                  </div>
                  <button
                    onClick={() => {
                      setScanComplete(false);
                      setWebsiteUrl("");
                    }}
                    className="text-xs font-bold text-[#6B6478] hover:text-[#7C3AED] cursor-pointer"
                  >
                    Scan Another Site
                  </button>
                </div>

                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-3.5 items-start">
                    <span className="w-10 h-10 rounded-xl bg-rose-100/70 text-rose-500 flex items-center justify-center text-lg flex-shrink-0">
                      <i className="fa-solid fa-triangle-exclamation" />
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#1F1B2D] uppercase tracking-wide">SEO Profile Status: Needs Attention</h3>
                      <p className="text-xs text-[#6B6478] font-semibold mt-1">We flagged 3 critical issues and 2 general warnings restricting your organic search rank.</p>
                    </div>
                  </div>
                </div>

                {/* Scanned Items list */}
                <div className="flex flex-col gap-4 mb-8">
                  {/* Issue 1 */}
                  <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-4 rounded-xl flex gap-3.5 items-start">
                    <span className="text-rose-500 text-sm mt-0.5"><i className="fa-solid fa-circle-xmark" /></span>
                    <div>
                      <h4 className="text-xs font-black text-[#1F1B2D] uppercase tracking-wide">JSON-LD Schema Markup Missing</h4>
                      <p className="text-[11px] text-[#6B6478] font-semibold mt-1">Your code lacks structured schema objects. Google cannot index your location, services, and logo cleanly for Local Maps results.</p>
                    </div>
                  </div>

                  {/* Issue 2 */}
                  <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-4 rounded-xl flex gap-3.5 items-start">
                    <span className="text-rose-500 text-sm mt-0.5"><i className="fa-solid fa-circle-xmark" /></span>
                    <div>
                      <h4 className="text-xs font-black text-[#1F1B2D] uppercase tracking-wide">Image Alt Attributes Missing</h4>
                      <p className="text-[11px] text-[#6B6478] font-semibold mt-1">Several visual elements lack alt descriptions, preventing search bots from indexing your portfolio graphics on Google Image search.</p>
                    </div>
                  </div>

                  {/* Issue 3 */}
                  <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-4 rounded-xl flex gap-3.5 items-start">
                    <span className="text-rose-500 text-sm mt-0.5"><i className="fa-solid fa-circle-xmark" /></span>
                    <div>
                      <h4 className="text-xs font-black text-[#1F1B2D] uppercase tracking-wide">Core Web Vitals Render-Blocking Resources</h4>
                      <p className="text-[11px] text-[#6B6478] font-semibold mt-1">Heavy script loaders or uncompressed styles delay First Contentful Paint (FCP) above 3.2s, causing search bots to downgrade mobile scores.</p>
                    </div>
                  </div>

                  {/* Warning 1 */}
                  <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-4 rounded-xl flex gap-3.5 items-start">
                    <span className="text-amber-500 text-sm mt-0.5"><i className="fa-solid fa-triangle-exclamation" /></span>
                    <div>
                      <h4 className="text-xs font-black text-[#1F1B2D] uppercase tracking-wide">Under-Optimized Title and Meta Descriptions</h4>
                      <p className="text-[11px] text-[#6B6478] font-semibold mt-1">Your home page title tag and descriptions lack targeted local keyword weight, reducing your Click-Through Rate (CTR) in search results.</p>
                    </div>
                  </div>

                  {/* Warning 2 */}
                  <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-4 rounded-xl flex gap-3.5 items-start">
                    <span className="text-amber-500 text-sm mt-0.5"><i className="fa-solid fa-triangle-exclamation" /></span>
                    <div>
                      <h4 className="text-xs font-black text-[#1F1B2D] uppercase tracking-wide">Missing Open Graph Social Meta Tags</h4>
                      <p className="text-[11px] text-[#6B6478] font-semibold mt-1">Your site has no OG title or image configurations, causing shared links on WhatsApp, LinkedIn, or Facebook to render blank previews.</p>
                    </div>
                  </div>
                </div>

                {/* Conversion Trigger Card */}
                <div className="bg-[#FAF9FF] border border-[#7C3AED] p-6 rounded-2xl text-center flex flex-col items-center">
                  <h3 className="text-base font-extrabold text-[#1F1B2D] mb-1">Want us to fix these SEO issues for you?</h3>
                  <p className="text-xs text-[#6B6478] font-semibold leading-relaxed max-w-xl mb-6">
                    Our technical developers and SEO engineers build custom sites designed for perfect speed scores and PageRank indexing. Get a free manual review to resolve all bottlenecks.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md shadow-[#7C3AED]/15 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      Get Free SEO Consultation
                    </button>
                    <a
                      href={`https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I%20ran%20the%20SEO%20Audit%20Tool%20for%20our%20website%20(${websiteUrl.replace(/https?:\/\//, "")})%20and%20it%20flagged%20issues.%20I'd%20like%20to%20get%20a%20free%20consultation%20to%20fix%20them.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="fa-brands fa-whatsapp text-sm" /> Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Consultation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white p-6 sm:p-8 rounded-[28px] shadow-2xl max-w-md w-full border border-[#E9E4F2] relative text-left">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-primary-dark cursor-pointer text-sm"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark" />
            </button>
            <div className="absolute top-0 left-0 w-full h-1 bg-[#7C3AED]" />
            
            <h3 className="text-lg font-black text-[#1F1B2D] mb-1">Claim Your Free SEO Consultation</h3>
            <p className="text-[10px] text-[#6B6478] font-semibold leading-relaxed mb-6">
              Submit your details below. Our technical developers will review your site and share a step-by-step resolution plan.
            </p>

            <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-black text-[#6B6478] uppercase">Full Name *</label>
                <input
                  type="text"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-black text-[#6B6478] uppercase">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="e.g. 90800 26133"
                  required
                  className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-black text-[#6B6478] uppercase">Email Address (Optional)</label>
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                />
              </div>

              {submitSuccess && (
                <p className="text-center text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 py-2 rounded-xl">
                  Success! Redirecting you now...
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 mt-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Get Free SEO Blueprint"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
