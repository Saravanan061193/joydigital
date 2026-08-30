"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackToolUsage } from "@/lib/toolTracker";

const COUNTRY_CODES = [
  { code: "91", flag: "🇮🇳", name: "India (+91)" },
  { code: "1", flag: "🇺🇸", name: "USA (+1)" },
  { code: "44", flag: "🇬🇧", name: "UK (+44)" },
  { code: "971", flag: "🇦🇪", name: "UAE (+971)" },
  { code: "61", flag: "🇦🇺", name: "Australia (+61)" },
  { code: "65", flag: "🇸🇬", name: "Singapore (+65)" },
  { code: "1-ca", flag: "🇨🇦", name: "Canada (+1)" }, // unique key mapping
  { code: "60", flag: "🇲🇾", name: "Malaysia (+60)" },
  { code: "94", flag: "🇱🇰", name: "Sri Lanka (+94)" },
];

export default function WhatsappLinkGeneratorClient() {
  const [countryCode, setCountryCode] = useState<string>("91");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [generatedLink, setGeneratedLink] = useState<string>("");
  
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [qrLoaded, setQrLoaded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Trigger track event on page view
  useEffect(() => {
    trackToolUsage({ toolName: "WhatsApp Link Generator", action: "tool_view" });
  }, []);

  // Generate QR dynamically when link changes
  useEffect(() => {
    if (!generatedLink) return;

    const renderQr = async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, generatedLink, {
            width: 200,
            margin: 2,
            color: {
              dark: "#1F1B2D",
              light: "#FFFFFF"
            }
          });
          setQrLoaded(true);
        }
      } catch (err) {
        console.error("Failed to generate QR Code using 'qrcode' library:", err);
      }
    };
    renderQr();
  }, [generatedLink]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    // Remove any non-numeric characters from phone
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    
    // Resolve canada special key mapping
    const code = countryCode === "1-ca" ? "1" : countryCode;
    const fullNumber = `${code}${cleanPhone}`;
    const encodedMsg = encodeURIComponent(message);
    const link = `https://wa.me/${fullNumber}${encodedMsg ? `?text=${encodedMsg}` : ""}`;

    setGeneratedLink(link);
    trackToolUsage({
      toolName: "WhatsApp Link Generator",
      action: "tool_start",
      metadata: { countryCode, hasMessage: !!message }
    });
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
    trackToolUsage({ toolName: "WhatsApp Link Generator", action: "copy_result" });
  };

  const handleDownloadQR = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `joydigital_whatsapp_qr_${phoneNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    trackToolUsage({ toolName: "WhatsApp Link Generator", action: "qr_generate", metadata: { format: "png" } });
  };

  const handleReset = () => {
    setPhoneNumber("");
    setMessage("");
    setGeneratedLink("");
    setQrLoaded(false);
    trackToolUsage({ toolName: "WhatsApp Link Generator", action: "tool_reset" });
  };

  const handleOpenWhatsapp = () => {
    if (!generatedLink) return;
    window.open(generatedLink, "_blank");
    trackToolUsage({ toolName: "WhatsApp Link Generator", action: "whatsapp_click" });
  };

  const handleCtaClick = () => {
    trackToolUsage({ toolName: "WhatsApp Link Generator", action: "cta_click" });
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://joydigital.in" },
      { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://joydigital.in/free-tools" },
      { "@type": "ListItem", "position": 3, "name": "WhatsApp Link Generator", "item": "https://joydigital.in/whatsapp-link-generator" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="bg-[#FAF9FF] text-[#1F1B2D] min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-xs text-[#6B6478] font-bold mb-6 flex items-center gap-1.5">
            <a href="/" className="hover:text-[#7C3AED]">Home</a>
            <i className="fa-solid fa-chevron-right text-[8px]" />
            <a href="/free-tools" className="hover:text-[#7C3AED]">Free Tools</a>
            <i className="fa-solid fa-chevron-right text-[8px]" />
            <span className="text-[#1F1B2D]">WhatsApp Link Generator</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            
            {/* Input Form Card */}
            <div className="lg:col-span-7 bg-white border border-[#E9E4F2] p-8 rounded-[24px] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
              
              <div className="mb-8">
                <h1 className="text-2xl font-black text-[#1F1B2D] mb-2">WhatsApp Link Generator</h1>
                <p className="text-xs text-[#6B6478] font-semibold leading-relaxed">
                  Create click-to-chat WhatsApp links with pre-filled messages and custom QR codes for your customers.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="flex flex-col gap-5">
                {/* Phone Number Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">
                    WhatsApp Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-[#FAF9FF] border border-[#E9E4F2] text-xs font-bold rounded-xl px-3 py-3.5 text-[#1F1B2D] outline-none cursor-pointer"
                    >
                      {COUNTRY_CODES.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                          {opt.flag} {opt.name}
                        </option>
                      ))}
                    </select>
                    
                    <div className="flex items-center gap-2 bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3.5 focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all flex-1">
                      <span className="text-sm font-bold text-[#6B6478]"><i className="fa-solid fa-phone" /></span>
                      <input
                        type="tel"
                        id="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number..."
                        required
                        className="w-full text-sm outline-none border-none bg-transparent font-bold text-[#1F1B2D] placeholder:text-[#A7A2B2]"
                      />
                    </div>
                  </div>
                </div>

                {/* Pre-filled Message Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">
                    Pre-filled message (Optional)
                  </label>
                  <div className="bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl p-3 focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Enter pre-filled message text to display when a user clicks the link..."
                      className="w-full text-xs outline-none border-none bg-transparent font-bold text-[#1F1B2D] placeholder:text-[#A7A2B2] resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 border-t border-[#E9E4F2] pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md shadow-emerald-500/15 hover:scale-[1.01] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <i className="fa-solid fa-link" /> Generate Link
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-transparent border border-[#E9E4F2] hover:bg-slate-50 text-[#1F1B2D] font-bold text-xs py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <i className="fa-solid fa-rotate-left" /> Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-5 bg-white border border-[#E9E4F2] p-8 rounded-[24px] shadow-sm flex flex-col justify-between h-full min-h-[400px]">
              <div>
                <h2 className="text-lg font-black text-[#1F1B2D] mb-6 border-b border-[#E9E4F2] pb-3">Generated Actions</h2>
                
                {generatedLink ? (
                  <div className="flex flex-col gap-6">
                    {/* Link URL display box */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Chat Link</span>
                      <div className="bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-3 flex justify-between items-center overflow-hidden">
                        <span className="text-xs font-semibold truncate text-[#1F1B2D] max-w-[80%]">{generatedLink}</span>
                        <button
                          onClick={handleCopyLink}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer flex-shrink-0"
                        >
                          {copySuccess ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleOpenWhatsapp}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-500/10"
                      >
                        <i className="fa-brands fa-whatsapp text-sm" /> Open Chat
                      </button>
                      <button
                        onClick={handleDownloadQR}
                        disabled={!qrLoaded}
                        className="flex-1 bg-white border border-[#E9E4F2] hover:bg-slate-50 text-[#1F1B2D] font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <i className="fa-solid fa-download" /> Download QR
                      </button>
                    </div>

                    {/* QR Code Canvas Visual */}
                    <div className="flex flex-col items-center justify-center gap-3 mt-3 border-t border-slate-50 pt-4">
                      <span className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block self-start">WhatsApp QR Code</span>
                      <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-4 rounded-2xl flex items-center justify-center shadow-inner">
                        <canvas ref={canvasRef} style={{ display: qrLoaded ? "block" : "none" }} />
                        {!qrLoaded && (
                          <div className="w-[150px] h-[150px] flex items-center justify-center text-[10px] font-bold text-[#A7A2B2] uppercase tracking-wider">
                            Generating QR Code...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 text-2xl mb-4">
                      <i className="fa-solid fa-link-slash" />
                    </div>
                    <h3 className="font-extrabold text-sm text-[#1F1B2D] mb-1">No link generated yet</h3>
                    <p className="text-[10px] text-[#6B6478] max-w-[200px] leading-relaxed font-semibold">
                      Enter your phone number on the left and click &quot;Generate Link&quot; to review results.
                    </p>
                  </div>
                )}
              </div>

              {/* Pitch CTA Card */}
              <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-5 rounded-2xl mt-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1 bg-emerald-500" />
                <h3 className="text-xs font-bold text-[#1F1B2D] mb-1">Create a WhatsApp click-to-chat setup for your business?</h3>
                <p className="text-[10px] text-[#6B6478] font-semibold leading-relaxed mb-4">
                  Boost conversions by allowing customers to reach you instantly. Let us build a website for your business.
                </p>
                <a
                  href="/contact"
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-[10px] py-2.5 px-4 rounded-lg shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Get Started with Joy Digital
                  <i className="fa-solid fa-arrow-right text-[8px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
