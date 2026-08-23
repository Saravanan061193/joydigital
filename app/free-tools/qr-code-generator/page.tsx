"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackToolUsage } from "@/lib/toolTracker";

type QrType = "url" | "whatsapp" | "phone" | "email" | "text" | "maps" | "upi" | "wifi";

export default function QrCodeGeneratorPage() {
  const [type, setType] = useState<QrType>("url");
  
  // Specific inputs
  const [url, setUrl] = useState<string>("https://joydigital.in");
  const [waPhone, setWaPhone] = useState<string>("");
  const [waMessage, setWaMessage] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [emailTo, setEmailTo] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");
  const [plainText, setPlainText] = useState<string>("");
  const [mapUrl, setMapUrl] = useState<string>("");
  const [upiId, setUpiId] = useState<string>("");
  const [upiName, setUpiName] = useState<string>("");
  const [upiAmount, setUpiAmount] = useState<string>("");
  const [upiNote, setUpiNote] = useState<string>("");
  const [wifiSsid, setWifiSsid] = useState<string>("");
  const [wifiPassword, setWifiPassword] = useState<string>("");
  const [wifiEncryption, setWifiEncryption] = useState<string>("WPA");

  // Output QR values
  const [qrValue, setQrValue] = useState<string>("");
  const [qrLoaded, setQrLoaded] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Trigger track event on page view
  useEffect(() => {
    trackToolUsage({ toolName: "QR Code Generator", action: "tool_view" });
  }, []);

  // Compute QR string whenever inputs change
  useEffect(() => {
    let computed = "";

    switch (type) {
      case "url":
        computed = url;
        break;
      case "whatsapp": {
        const cleanPh = waPhone.replace(/\D/g, "");
        computed = `https://wa.me/${cleanPh}${waMessage ? `?text=${encodeURIComponent(waMessage)}` : ""}`;
        break;
      }
      case "phone":
        computed = `tel:${phone.replace(/\D/g, "")}`;
        break;
      case "email":
        computed = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        break;
      case "text":
        computed = plainText;
        break;
      case "maps":
        computed = mapUrl;
        break;
      case "upi":
        computed = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}${upiAmount ? `&am=${upiAmount}` : ""}${upiNote ? `&tn=${encodeURIComponent(upiNote)}` : ""}`;
        break;
      case "wifi":
        computed = `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};;`;
        break;
    }

    setQrValue(computed);
  }, [
    type, url, waPhone, waMessage, phone, emailTo, emailSubject, emailBody,
    plainText, mapUrl, upiId, upiName, upiAmount, upiNote, wifiSsid, wifiPassword, wifiEncryption
  ]);

  // Generate QR dynamically when QR Value changes
  useEffect(() => {
    if (!qrValue) {
      setQrLoaded(false);
      return;
    }

    const renderQr = async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, qrValue, {
            width: 240,
            margin: 2,
            color: {
              dark: "#1F1B2D",
              light: "#FFFFFF"
            }
          });
          setQrLoaded(true);
        }
      } catch (err) {
        console.error("QR Code Render error:", err);
      }
    };
    
    // Set a debounce or let it run
    renderQr();
  }, [qrValue]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    trackToolUsage({
      toolName: "QR Code Generator",
      action: "tool_start",
      metadata: { type }
    });
  };

  const handleDownloadQR = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `joydigital_qrcode_${type}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    trackToolUsage({ toolName: "QR Code Generator", action: "qr_generate", metadata: { type, format: "png" } });
  };

  const handleCopyValue = () => {
    if (!qrValue) return;
    navigator.clipboard.writeText(qrValue);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
    trackToolUsage({ toolName: "QR Code Generator", action: "copy_result", metadata: { type } });
  };

  const handleReset = () => {
    setUrl("https://joydigital.in");
    setWaPhone("");
    setWaMessage("");
    setPhone("");
    setEmailTo("");
    setEmailSubject("");
    setEmailBody("");
    setPlainText("");
    setMapUrl("");
    setUpiId("");
    setUpiName("");
    setUpiAmount("");
    setUpiNote("");
    setWifiSsid("");
    setWifiPassword("");
    setWifiEncryption("WPA");
    setQrLoaded(false);
    trackToolUsage({ toolName: "QR Code Generator", action: "tool_reset" });
  };

  const handleCtaClick = () => {
    trackToolUsage({ toolName: "QR Code Generator", action: "cta_click" });
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://joydigital.in" },
      { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://joydigital.in/free-tools" },
      { "@type": "ListItem", "position": 3, "name": "QR Code Generator", "item": "https://joydigital.in/free-tools/qr-code-generator" }
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
          
          {/* Breadcrumbs */}
          <nav className="text-xs text-[#6B6478] font-bold mb-6 flex items-center gap-1.5">
            <a href="/" className="hover:text-[#7C3AED]">Home</a>
            <i className="fa-solid fa-chevron-right text-[8px]" />
            <a href="/free-tools" className="hover:text-[#7C3AED]">Free Tools</a>
            <i className="fa-solid fa-chevron-right text-[8px]" />
            <span className="text-[#1F1B2D]">QR Code Generator</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            
            {/* Input Form Card */}
            <div className="lg:col-span-7 bg-white border border-[#E9E4F2] p-8 rounded-[24px] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#F97316]" />
              
              <div className="mb-8">
                <h1 className="text-2xl font-black text-[#1F1B2D] mb-2">QR Code Generator</h1>
                <p className="text-xs text-[#6B6478] font-semibold leading-relaxed">
                  Generate professional QR codes for links, emails, WiFi, maps, and UPI payments instantly.
                </p>
              </div>

              {/* Type Selection Tabs Grid */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[
                  { value: "url", label: "URL", icon: "fa-solid fa-globe" },
                  { value: "whatsapp", label: "WhatsApp", icon: "fa-brands fa-whatsapp" },
                  { value: "phone", label: "Phone", icon: "fa-solid fa-phone" },
                  { value: "email", label: "Email", icon: "fa-solid fa-envelope" },
                  { value: "text", label: "Text", icon: "fa-solid fa-align-left" },
                  { value: "maps", label: "Maps", icon: "fa-solid fa-map-pin" },
                  { value: "upi", label: "UPI Pay", icon: "fa-solid fa-indian-rupee-sign" },
                  { value: "wifi", label: "WiFi", icon: "fa-solid fa-wifi" }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setType(item.value as QrType)}
                    className={`py-3 text-[10px] font-bold rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      type === item.value
                        ? "bg-[#F97316] text-white border-[#F97316] shadow-sm"
                        : "bg-[#FAF9FF] text-[#6B6478] border-[#E9E4F2] hover:bg-slate-50 hover:text-[#1F1B2D]"
                    }`}
                  >
                    <i className={item.icon} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleGenerate} className="flex flex-col gap-5">
                
                {/* Dynamic input sections */}
                {type === "url" && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="url" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">URL / Link Address</label>
                    <div className="flex items-center gap-2 bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3.5 focus-within:bg-white focus-within:border-[#F97316] focus-within:ring-4 focus-within:ring-[#F97316]/10 transition-all">
                      <span className="text-sm font-bold text-[#6B6478]"><i className="fa-solid fa-globe" /></span>
                      <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        required
                        className="w-full text-sm outline-none border-none bg-transparent font-bold text-[#1F1B2D] placeholder:text-[#A7A2B2]"
                      />
                    </div>
                  </div>
                )}

                {type === "whatsapp" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="waPhone" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">WhatsApp Number (with country code)</label>
                      <div className="flex items-center gap-2 bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3.5 focus-within:bg-white focus-within:border-[#F97316] focus-within:ring-4 focus-within:ring-[#F97316]/10 transition-all">
                        <span className="text-sm font-bold text-[#6B6478]"><i className="fa-solid fa-phone" /></span>
                        <input
                          type="tel"
                          id="waPhone"
                          value={waPhone}
                          onChange={(e) => setWaPhone(e.target.value)}
                          placeholder="e.g. 919080026133"
                          required
                          className="w-full text-sm outline-none border-none bg-transparent font-bold text-[#1F1B2D] placeholder:text-[#A7A2B2]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="waMessage" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Pre-filled Chat Text</label>
                      <div className="bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl p-3 focus-within:bg-white focus-within:border-[#F97316] focus-within:ring-4 focus-within:ring-[#F97316]/10 transition-all">
                        <textarea
                          id="waMessage"
                          value={waMessage}
                          onChange={(e) => setWaMessage(e.target.value)}
                          rows={3}
                          placeholder="Welcome text..."
                          className="w-full text-xs outline-none border-none bg-transparent font-bold text-[#1F1B2D] placeholder:text-[#A7A2B2] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {type === "phone" && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Phone Contact Number</label>
                    <div className="flex items-center gap-2 bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3.5 focus-within:bg-white focus-within:border-[#F97316] focus-within:ring-4 focus-within:ring-[#F97316]/10 transition-all">
                      <span className="text-sm font-bold text-[#6B6478]"><i className="fa-solid fa-phone" /></span>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number..."
                        required
                        className="w-full text-sm outline-none border-none bg-transparent font-bold text-[#1F1B2D] placeholder:text-[#A7A2B2]"
                      />
                    </div>
                  </div>
                )}

                {type === "email" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="emailTo" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Email Recipient Address</label>
                      <div className="flex items-center gap-2 bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3.5 focus-within:bg-white focus-within:border-[#F97316] focus-within:ring-4 focus-within:ring-[#F97316]/10 transition-all">
                        <span className="text-sm font-bold text-[#6B6478]"><i className="fa-solid fa-envelope" /></span>
                        <input
                          type="email"
                          id="emailTo"
                          value={emailTo}
                          onChange={(e) => setEmailTo(e.target.value)}
                          placeholder="recipient@example.com"
                          required
                          className="w-full text-sm outline-none border-none bg-transparent font-bold text-[#1F1B2D] placeholder:text-[#A7A2B2]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="emailSubject" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Email Subject</label>
                      <input
                        type="text"
                        id="emailSubject"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Subject line..."
                        className="w-full text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#F97316]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="emailBody" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Email Body Message</label>
                      <textarea
                        id="emailBody"
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        rows={3}
                        placeholder="Body content..."
                        className="w-full text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#F97316] resize-none"
                      />
                    </div>
                  </div>
                )}

                {type === "text" && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="plainText" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Plain Text Value</label>
                    <textarea
                      id="plainText"
                      value={plainText}
                      onChange={(e) => setPlainText(e.target.value)}
                      rows={5}
                      required
                      placeholder="Enter raw text details..."
                      className="w-full text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#F97316] resize-none"
                    />
                  </div>
                )}

                {type === "maps" && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mapUrl" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Google Maps Link</label>
                    <div className="flex items-center gap-2 bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3.5 focus-within:bg-white focus-within:border-[#F97316] focus-within:ring-4 focus-within:ring-[#F97316]/10 transition-all">
                      <span className="text-sm font-bold text-[#6B6478]"><i className="fa-solid fa-map-pin" /></span>
                      <input
                        type="url"
                        id="mapUrl"
                        value={mapUrl}
                        onChange={(e) => setMapUrl(e.target.value)}
                        placeholder="https://maps.google.com/..."
                        required
                        className="w-full text-sm outline-none border-none bg-transparent font-bold text-[#1F1B2D] placeholder:text-[#A7A2B2]"
                      />
                    </div>
                  </div>
                )}

                {type === "upi" && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="upiId" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">UPI VPA ID *</label>
                        <input
                          type="text"
                          id="upiId"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. business@upi"
                          required
                          className="w-full text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#F97316]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="upiName" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Payee Name *</label>
                        <input
                          type="text"
                          id="upiName"
                          value={upiName}
                          onChange={(e) => setUpiName(e.target.value)}
                          placeholder="e.g. Acme Agency"
                          required
                          className="w-full text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#F97316]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="upiAmount" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Amount (Optional)</label>
                        <input
                          type="number"
                          id="upiAmount"
                          value={upiAmount}
                          onChange={(e) => setUpiAmount(e.target.value)}
                          placeholder="e.g. 500"
                          className="w-full text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#F97316]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="upiNote" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Payment Note (Optional)</label>
                        <input
                          type="text"
                          id="upiNote"
                          value={upiNote}
                          onChange={(e) => setUpiNote(e.target.value)}
                          placeholder="e.g. Services payment"
                          className="w-full text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#F97316]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {type === "wifi" && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="wifiSsid" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">WiFi Network Name (SSID) *</label>
                        <input
                          type="text"
                          id="wifiSsid"
                          value={wifiSsid}
                          onChange={(e) => setWifiSsid(e.target.value)}
                          placeholder="e.g. Home_Network"
                          required
                          className="w-full text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#F97316]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="wifiEncryption" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">WiFi Security</label>
                        <select
                          id="wifiEncryption"
                          value={wifiEncryption}
                          onChange={(e) => setWifiEncryption(e.target.value)}
                          className="w-full text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#F97316] font-semibold cursor-pointer"
                        >
                          <option value="WPA">WPA / WPA2 / WPA3</option>
                          <option value="WEP">WEP</option>
                          <option value="nopass">None (Open)</option>
                        </select>
                      </div>
                    </div>
                    {wifiEncryption !== "nopass" && (
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="wifiPassword" className="text-[10px] font-extrabold text-[#6B6478] uppercase tracking-wider block">WiFi Network Password</label>
                        <input
                          type="password"
                          id="wifiPassword"
                          value={wifiPassword}
                          onChange={(e) => setWifiPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#F97316]"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 border-t border-[#E9E4F2] pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md shadow-orange-500/15 hover:scale-[1.01] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <i className="fa-solid fa-qrcode" /> Generate QR Code
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
                <h2 className="text-lg font-black text-[#1F1B2D] mb-6 border-b border-[#E9E4F2] pb-3">QR Preview</h2>
                
                {qrValue ? (
                  <div className="flex flex-col items-center gap-6">
                    {/* QR Canvas */}
                    <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-6 rounded-2xl flex items-center justify-center shadow-inner relative">
                      <canvas ref={canvasRef} style={{ display: qrLoaded ? "block" : "none" }} />
                      {!qrLoaded && (
                        <div className="w-[180px] h-[180px] flex items-center justify-center text-[10px] font-bold text-[#A7A2B2] uppercase tracking-wider">
                          Generating QR...
                        </div>
                      )}
                    </div>

                    {/* Meta info info */}
                    <div className="w-full text-center">
                      <span className="text-[9px] font-extrabold text-[#6B6478] uppercase tracking-widest block mb-2">QR Code Data String</span>
                      <div className="bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-4 py-3 flex justify-between items-center text-left">
                        <span className="text-[10px] font-bold truncate text-[#1F1B2D] max-w-[80%]">{qrValue}</span>
                        <button
                          onClick={handleCopyValue}
                          className="text-[10px] font-black text-[#F97316] hover:text-orange-600 cursor-pointer flex-shrink-0"
                        >
                          {copySuccess ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>

                    {/* Download button */}
                    <button
                      onClick={handleDownloadQR}
                      disabled={!qrLoaded}
                      className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="fa-solid fa-download" /> Download PNG Image
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F97316] text-2xl mb-4">
                      <i className="fa-solid fa-qrcode" />
                    </div>
                    <h3 className="font-extrabold text-sm text-[#1F1B2D] mb-1">Enter QR parameters</h3>
                    <p className="text-[10px] text-[#6B6478] max-w-[200px] leading-relaxed font-semibold">
                      Provide network, text, link, or email information to render a real-time QR code.
                    </p>
                  </div>
                )}
              </div>

              {/* Pitch CTA Card */}
              <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-5 rounded-2xl mt-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#F97316]" />
                <h3 className="text-xs font-bold text-[#1F1B2D] mb-1">Create a business website for your brand?</h3>
                <p className="text-[10px] text-[#6B6478] font-semibold leading-relaxed mb-4">
                  Boost your professional image with custom web platforms, digital checkouts, and maps integrations.
                </p>
                <a
                  href="/contact"
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-[10px] py-2.5 px-4 rounded-lg shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Create a Website
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
