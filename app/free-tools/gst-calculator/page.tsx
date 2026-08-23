"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackToolUsage } from "@/lib/toolTracker";
import ToolFeedback from "@/components/ui/ToolFeedback";

type CalcMode = "exclusive" | "inclusive";
type TransType = "intra" | "inter";

export default function GstCalculatorPage() {
  const [calculationMode, setCalculationMode] = useState<CalcMode>("exclusive");
  const [transactionType, setTransactionType] = useState<TransType>("intra");
  const [gstPercentage, setGstPercentage] = useState<number>(18);
  
  // Amount Inputs
  const [inputValue, setInputValue] = useState<string>("10,000");
  const [amount, setAmount] = useState<number>(10000);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Results State
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [cgst, setCgst] = useState<number>(0);
  const [sgst, setSgst] = useState<number>(0);
  const [igst, setIgst] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);

  // Status Alerts
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  // Trigger track event on page view
  useEffect(() => {
    trackToolUsage({ toolName: "GST Calculator", action: "tool_view" });
  }, []);

  // Sync calculation results whenever inputs change
  useEffect(() => {
    if (amount <= 0 || isNaN(amount)) {
      setBaseAmount(0);
      setGstAmount(0);
      setCgst(0);
      setSgst(0);
      setIgst(0);
      setFinalAmount(0);
      return;
    }

    const rate = gstPercentage;
    let calculatedBase = 0;
    let calculatedGst = 0;
    let calculatedFinal = 0;

    if (calculationMode === "inclusive") {
      calculatedGst = amount - (amount / (1 + rate / 100));
      calculatedBase = amount - calculatedGst;
      calculatedFinal = amount;
    } else {
      calculatedGst = amount * (rate / 100);
      calculatedBase = amount;
      calculatedFinal = amount + calculatedGst;
    }

    setBaseAmount(calculatedBase);
    setGstAmount(calculatedGst);
    setFinalAmount(calculatedFinal);

    if (transactionType === "intra") {
      setCgst(calculatedGst / 2);
      setSgst(calculatedGst / 2);
      setIgst(0);
    } else {
      setCgst(0);
      setSgst(0);
      setIgst(calculatedGst);
    }
  }, [calculationMode, transactionType, amount, gstPercentage]);

  // Clean INR currency formatting helper
  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const handleAmountChange = (val: string) => {
    // Remove characters that aren't numbers or dots
    let clean = val.replace(/[^0-9.]/g, "");
    
    // Prevent multiple decimals
    const parts = clean.split(".");
    if (parts.length > 2) {
      clean = parts[0] + "." + parts.slice(1).join("");
    }

    setInputValue(clean);

    const parsed = parseFloat(clean);
    if (clean.length === 0) {
      setAmount(0);
      setErrorMsg("");
    } else if (!isNaN(parsed) && parsed >= 0) {
      setAmount(parsed);
      setErrorMsg("");
      trackToolUsage({
        toolName: "GST Calculator",
        action: "gst_calculator_used",
        metadata: { value: parsed }
      });
    } else {
      setAmount(0);
      setErrorMsg("Please enter a valid amount.");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Show raw float string on edit, or empty if zero
    setInputValue(amount > 0 ? amount.toString() : "");
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (amount > 0) {
      // Format display value with commas on blur
      setInputValue(new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(amount));
    } else {
      setInputValue("");
    }
  };

  const handleModeToggle = (mode: CalcMode) => {
    setCalculationMode(mode);
    trackToolUsage({
      toolName: "GST Calculator",
      action: "gst_calculator_used",
      metadata: { calculationMode: mode }
    });
  };

  const handleTransactionChange = (tType: TransType) => {
    setTransactionType(tType);
    trackToolUsage({
      toolName: "GST Calculator",
      action: "transaction_type_selected",
      metadata: { type: tType }
    });
  };

  const handleRateChange = (rate: number) => {
    setGstPercentage(rate);
    trackToolUsage({
      toolName: "GST Calculator",
      action: "gst_rate_selected",
      metadata: { rate }
    });
  };

  const handleReset = () => {
    setAmount(10000);
    setInputValue("10,000");
    setGstPercentage(18);
    setTransactionType("intra");
    setCalculationMode("exclusive");
    setErrorMsg("");
    trackToolUsage({ toolName: "GST Calculator", action: "reset_clicked" });
  };

  const buildShareText = () => {
    const cleanAmount = formatINR(amount);
    const cleanGst = formatINR(gstAmount);
    const cleanTotal = formatINR(finalAmount);

    return `GST Calculation - Joy Digital\n\nAmount: ${cleanAmount}\nGST Rate: ${gstPercentage}%\nTotal GST: ${cleanGst}\nGrand Total: ${cleanTotal}`;
  };

  const buildCopyText = () => {
    const cleanAmount = formatINR(amount);
    const cleanRate = `${gstPercentage}%`;
    const tType = transactionType === "intra" ? "Intra-State" : "Inter-State";
    const cleanGstTotal = formatINR(gstAmount);
    const cleanGrand = formatINR(finalAmount);

    if (transactionType === "intra") {
      const cleanCgst = formatINR(cgst);
      const cleanSgst = formatINR(sgst);
      return `GST Calculation - Joy Digital\n\nAmount: ${cleanAmount}\nGST Rate: ${cleanRate}\nTransaction Type: ${tType}\n\nCGST: ${cleanCgst}\nSGST: ${cleanSgst}\nTotal GST: ${cleanGstTotal}\n\nGrand Total: ${cleanGrand}`;
    } else {
      const cleanIgst = formatINR(igst);
      return `GST Calculation - Joy Digital\n\nAmount: ${cleanAmount}\nGST Rate: ${cleanRate}\nTransaction Type: ${tType}\n\nIGST: ${cleanIgst}\nTotal GST: ${cleanGstTotal}\n\nGrand Total: ${cleanGrand}`;
    }
  };

  const handleCopyResult = () => {
    if (amount <= 0) return;
    const text = buildCopyText();
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
    trackToolUsage({ toolName: "GST Calculator", action: "copy_clicked", metadata: { amount } });
  };

  const handleShareResult = async () => {
    if (amount <= 0) return;
    const shareText = buildShareText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "GST Calculation - Joy Digital",
          text: shareText,
          url: window.location.href
        });
        trackToolUsage({ toolName: "GST Calculator", action: "share_clicked", metadata: { method: "native" } });
      } catch (err) {
        console.log("Sharing cancelled", err);
      }
    } else {
      // Fallback to Copy
      navigator.clipboard.writeText(shareText);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
      trackToolUsage({ toolName: "GST Calculator", action: "share_clicked", metadata: { method: "copy_fallback" } });
    }
  };

  const handleCtaClick = () => {
    trackToolUsage({ toolName: "GST Calculator", action: "cta_clicked" });
  };

  // Structured Schemas
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a GST Calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A GST Calculator is a free online tool to calculate Goods and Services Tax (GST) in India. It determines the base amount, tax rates, CGST, SGST, IGST, and final values instantly."
        }
      },
      {
        "@type": "Question",
        "name": "How is GST calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For GST Exclusive values, multiply the base amount by the tax rate: GST = Amount * (Rate/100). For GST Inclusive values, calculate tax using: GST = Amount - (Amount / (1 + Rate/100))."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between CGST, SGST and IGST?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CGST (Central GST) and SGST (State GST) apply to trade within a single state (Intra-State). IGST (Integrated GST) applies to supply chains between different states (Inter-State)."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate GST inclusive price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Formula: GST Amount = Value - (Value / (1 + GST%/100)). Subtracted from the initial amount, it determines the base rate."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate GST exclusive price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Formula: Tax Amount = Value * (GST% / 100). The total price equals the base amount plus the calculated tax."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://joydigital.in" },
      { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://joydigital.in/free-tools" },
      { "@type": "ListItem", "position": 3, "name": "GST Calculator", "item": "https://joydigital.in/free-tools/gst-calculator" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="bg-[#FAF9FF] text-[#1F1B2D] min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Breadcrumbs */}
          <nav className="text-xs text-[#6B6478] font-bold mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#7C3AED]">Home</a>
            <i className="fa-solid fa-chevron-right text-[8px]" aria-hidden="true" />
            <a href="/free-tools" className="hover:text-[#7C3AED]">Free Tools</a>
            <i className="fa-solid fa-chevron-right text-[8px]" aria-hidden="true" />
            <span className="text-[#1F1B2D]" aria-current="page">GST Calculator</span>
          </nav>

          {/* H1 and supporting text */}
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-black text-[#1F1B2D] mb-3">GST Calculator</h1>
            <p className="text-xs sm:text-sm text-[#6B6478] font-semibold leading-relaxed">
              Calculate GST instantly with our free GST Calculator. Choose GST rates, calculate CGST, SGST or IGST, and get the final amount instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            
            {/* Input Configuration Column */}
            <div className="lg:col-span-7 bg-white border border-[#E9E4F2] p-6 sm:p-8 rounded-[24px] shadow-sm relative overflow-hidden flex flex-col gap-6">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#7C3AED]" />

              {/* 1. Product / Service Amount Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="gst-amount-input" className="text-xs font-black text-[#1F1B2D] tracking-wide block">
                  Product / Service Amount
                </label>
                <div className={`flex items-center gap-2.5 bg-[#FAF9FF] border rounded-2xl px-4 py-3.5 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#7C3AED]/10 transition-all ${
                  errorMsg ? "border-rose-450 focus-within:border-rose-450 focus-within:ring-rose-500/10" : "border-[#E9E4F2] focus-within:border-[#7C3AED]"
                }`}>
                  <span className="text-sm font-extrabold text-[#6B6478]" aria-hidden="true">₹</span>
                  <input
                    type="text"
                    id="gst-amount-input"
                    value={inputValue}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full text-sm outline-none border-none bg-transparent font-bold text-[#1F1B2D] placeholder:text-[#A7A2B2]"
                  />
                </div>
                {errorMsg && <p className="text-[10px] font-bold text-rose-500 mt-1">{errorMsg}</p>}
              </div>

              {/* 2. GST Calculation Mode Exclusive/Inclusive */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black text-[#1F1B2D] tracking-wide block">GST Calculation Mode</span>
                <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-[#E9E4F2]">
                  <button
                    type="button"
                    onClick={() => handleModeToggle("exclusive")}
                    className={`flex-1 text-center py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      calculationMode === "exclusive"
                        ? "bg-white text-[#7C3AED] shadow-sm border border-[#E9E4F2]"
                        : "text-[#6B6478] hover:text-[#1F1B2D]"
                    }`}
                  >
                    GST Exclusive (Add Tax)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeToggle("inclusive")}
                    className={`flex-1 text-center py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      calculationMode === "inclusive"
                        ? "bg-white text-[#7C3AED] shadow-sm border border-[#E9E4F2]"
                        : "text-[#6B6478] hover:text-[#1F1B2D]"
                    }`}
                  >
                    GST Inclusive (Tax Included)
                  </button>
                </div>
                <p className="text-[10px] text-slate-450 font-bold italic mt-1 text-left px-1">
                  {calculationMode === "exclusive"
                    ? "GST will be added to the entered amount"
                    : "GST is already included in the entered amount"}
                </p>
              </div>

              {/* 3. GST Rate Selection */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black text-[#1F1B2D] tracking-wide block">GST Rate (%)</span>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 5, 12, 18, 28].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => handleRateChange(rate)}
                      className={`py-3.5 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                        gstPercentage === rate
                          ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-sm scale-[1.01]"
                          : "bg-white text-[#1F1B2D] border-[#E9E4F2] hover:bg-slate-50"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Transaction Type */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black text-[#1F1B2D] tracking-wide block">Transaction Type</span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "intra", label: "Intra-State", desc: "Local trade within same state" },
                    { value: "inter", label: "Inter-State", desc: "Interstate trade outside state" }
                  ].map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => handleTransactionChange(t.value as TransType)}
                      className={`p-4 rounded-[18px] border text-left flex flex-col justify-center gap-1.5 transition-all cursor-pointer ${
                        transactionType === t.value
                          ? "bg-[#7C3AED]/5 text-[#7C3AED] border-[#7C3AED]/40 shadow-sm"
                          : "bg-white text-slate-500 border-[#E9E4F2] hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-xs font-black">{t.label}</span>
                      <span className="text-[9px] font-bold text-slate-400">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results breakdown Column */}
            <div className="lg:col-span-5 bg-white border border-[#E9E4F2] p-6 sm:p-8 rounded-[24px] shadow-sm flex flex-col justify-between h-full min-h-[460px]">
              <div>
                <h2 className="text-sm font-black text-[#1F1B2D] mb-6 border-b border-[#E9E4F2] pb-3" id="calc-result-title">
                  Calculation Breakdown
                </h2>
                
                {amount > 0 && !errorMsg ? (
                  <div className="flex flex-col gap-4" aria-labelledby="calc-result-title">
                    <div className="flex justify-between items-center text-xs font-bold py-1">
                      <span className="text-[#6B6478]">Base Amount</span>
                      <span className="text-[#1F1B2D] font-extrabold">{formatINR(baseAmount)}</span>
                    </div>

                    {transactionType === "intra" ? (
                      <>
                        <div className="flex justify-between items-center text-xs font-bold py-1 border-t border-slate-50 pt-3">
                          <span className="text-[#6B6478]">CGST ({gstPercentage / 2}%)</span>
                          <span className="text-[#1F1B2D]">{formatINR(cgst)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold py-1 border-t border-slate-50 pt-3">
                          <span className="text-[#6B6478]">SGST ({gstPercentage / 2}%)</span>
                          <span className="text-[#1F1B2D]">{formatINR(sgst)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between items-center text-xs font-bold py-1 border-t border-slate-50 pt-3">
                        <span className="text-[#6B6478]">IGST ({gstPercentage}%)</span>
                        <span className="text-[#1F1B2D]">{formatINR(igst)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xs font-bold py-1 border-t border-slate-50 pt-3 text-[#7C3AED]">
                      <span>Total GST Tax Amount</span>
                      <span className="font-extrabold">{formatINR(gstAmount)}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm font-extrabold py-5 border-t border-[#E9E4F2] mt-3 text-[#1F1B2D]">
                      <span>Grand Total</span>
                      <span className="text-2xl font-black text-[#7C3AED]">{formatINR(finalAmount)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-[#E9E4F2] flex items-center justify-center text-slate-400 text-lg mb-4">
                      <i className="fa-solid fa-calculator" />
                    </div>
                    <p className="text-xs text-slate-450 font-bold leading-relaxed max-w-[200px]">
                      {errorMsg || "Enter an amount above to see the tax breakdown."}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions Box */}
              <div className="flex flex-col gap-3 mt-6 border-t border-slate-50 pt-5">
                <button
                  type="button"
                  onClick={handleCopyResult}
                  disabled={amount <= 0 || !!errorMsg}
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs py-4 rounded-xl transition-all shadow-md shadow-[#7C3AED]/15 hover:scale-[1.015] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copySuccess ? (
                    <>
                      <i className="fa-solid fa-check" /> Copied!
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-copy" /> Copy Result
                    </>
                  )}
                </button>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleShareResult}
                    disabled={amount <= 0 || !!errorMsg}
                    className="flex-1 bg-white border border-[#E9E4F2] hover:bg-slate-50 text-slate-700 font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fa-solid fa-share-nodes" /> {shareSuccess ? "Copied Share Text" : "Share"}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 bg-white border border-[#E9E4F2] hover:bg-slate-50 text-slate-700 font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <i className="fa-solid fa-rotate-left" /> Reset
                  </button>
                </div>
              </div>

              {/* Pitch CTA Card */}
              <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-5 rounded-2xl mt-6 relative overflow-hidden text-left">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#7C3AED]" />
                <h3 className="text-xs font-black text-[#1F1B2D] mb-1">Need a Professional Website for Your Business?</h3>
                <p className="text-[10px] text-[#6B6478] font-bold leading-relaxed mb-4">
                  Get a modern website, business tools and digital solutions designed for your business.
                </p>
                <a
                  href="/contact"
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-[10px] py-2.5 px-4.5 rounded-lg shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Get Free Consultation
                  <i className="fa-solid fa-arrow-right text-[8px]" />
                </a>
                <span className="block text-[8px] font-black uppercase text-slate-400 tracking-wider mt-3">
                  Website Design &bull; Web Development &bull; SEO &bull; Digital Marketing
                </span>
              </div>
            </div>
          </div>

          {/* Educational Content Below */}
          <div className="max-w-4xl mx-auto border-t border-[#E9E4F2] pt-16">
            <article className="prose max-w-none text-xs sm:text-sm text-[#6B6478] leading-relaxed font-medium">
              <h2 className="text-xl font-black text-[#1F1B2D] mb-4">GST Calculator FAQs</h2>
              
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-extrabold text-[#1F1B2D] mb-1.5">What is a GST Calculator?</h3>
                  <p>
                    A GST Calculator is an online tool built to let businesses, suppliers, and buyers determine tax percentages instantly. It simplifies tax billing by calculating central tax (CGST), state tax (SGST), and integrated tax (IGST) breakdowns automatically without any manual math.
                  </p>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1F1B2D] mb-1.5">How is GST calculated?</h3>
                  <p>
                    GST calculations apply to exclusive or inclusive amounts. Exclusive means adding tax to a base amount: <code>Value + (Value * Rate/100)</code>. Inclusive means calculating base price by extracting tax from the total: <code>Value - (Value / (1 + Rate/100))</code>.
                  </p>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1F1B2D] mb-1.5">What is the difference between CGST, SGST and IGST?</h3>
                  <p>
                    CGST (Central Goods and Services Tax) and SGST (State Goods and Services Tax) are applied to transactions within the same state boundaries (Intra-state). IGST (Integrated Goods and Services Tax) is applied to interstate deliveries (inter-state) or transactions with international clients.
                  </p>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1F1B2D] mb-1.5">How do I calculate GST inclusive price?</h3>
                  <p>
                    GST Inclusive calculations separate base amounts from integrated tax. Use this formula to get tax amount: <code>Total Amount * [Rate / (100 + Rate)]</code>. Subtracting it leaves the base billing amount.
                  </p>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1F1B2D] mb-1.5">How do I calculate GST exclusive price?</h3>
                  <p>
                    GST Exclusive calculations require you to add tax onto the primary amount. Formula: <code>Base Amount * [Rate / 100]</code>. The sum of tax and base amount determines the customer invoice value.
                  </p>
                </div>
              </div>
            </article>
          </div>

          <ToolFeedback toolName="GST Calculator" />
        </div>
      </main>

      <Footer />
    </>
  );
}
