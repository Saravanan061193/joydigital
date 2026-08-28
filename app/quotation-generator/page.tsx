"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackToolUsage } from "@/lib/toolTracker";
import ToolFeedback from "@/components/ui/ToolFeedback";
import { getUtmParameters } from "@/lib/utmTracker";

interface QuoteItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  discount: number; // in percent
  gst: number; // in percent
}

export default function QuotationGeneratorPage() {
  // Business Info
  const [bizName, setBizName] = useState<string>("My Business");
  const [bizLogoUrl, setBizLogoUrl] = useState<string>("");
  const [bizAddress, setBizAddress] = useState<string>("");
  const [bizPhone, setBizPhone] = useState<string>("");
  const [bizEmail, setBizEmail] = useState<string>("");
  const [bizGstin, setBizGstin] = useState<string>("");

  // Customer Info
  const [custName, setCustName] = useState<string>("");
  const [custCompany, setCustCompany] = useState<string>("");
  const [custAddress, setCustAddress] = useState<string>("");
  const [custPhone, setCustPhone] = useState<string>("");
  const [custEmail, setCustEmail] = useState<string>("");

  // Quote Info
  const [quoteNumber, setQuoteNumber] = useState<string>("QT-101");
  const [quoteDate, setQuoteDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [quoteValidUntil, setQuoteValidUntil] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split("T")[0];
  });

  // Items List
  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: crypto.randomUUID(),
      name: "Web Development Services",
      description: "Custom Landing Page Design and React Coding",
      quantity: 1,
      price: 15000,
      discount: 0,
      gst: 18
    }
  ]);

  // Notes & Terms
  const [notes, setNotes] = useState<string>("");
  const [terms, setTerms] = useState<string>("Payment terms: 50% advance, 50% upon delivery.");

  // Calculated Values
  const [subtotal, setSubtotal] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [totalGst, setTotalGst] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);

  // UI Modes
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false);
  const [leadFormSubmitting, setLeadFormSubmitting] = useState<boolean>(false);
  const [leadSuccess, setLeadSuccess] = useState<boolean>(false);

  // Lead Form state
  const [leadName, setLeadName] = useState<string>(" ");
  const [leadBizName, setLeadBizName] = useState<string>(" ");
  const [leadEmail, setLeadEmail] = useState<string>(" ");
  const [leadPhone, setLeadPhone] = useState<string>(" ");
  const [leadService, setLeadService] = useState<string>("Website Development");

  // Track page view
  useEffect(() => {
    trackToolUsage({ toolName: "Quotation Generator", action: "tool_view" });
  }, []);

  // Compute values dynamically
  useEffect(() => {
    let computedSubtotal = 0;
    let computedDiscount = 0;
    let computedGst = 0;

    items.forEach((item) => {
      const baseVal = item.quantity * item.price;
      const discountVal = baseVal * (item.discount / 100);
      const afterDiscount = baseVal - discountVal;
      const gstVal = afterDiscount * (item.gst / 100);

      computedSubtotal += baseVal;
      computedDiscount += discountVal;
      computedGst += gstVal;
    });

    setSubtotal(computedSubtotal);
    setTotalDiscount(computedDiscount);
    setTotalGst(computedGst);
    setGrandTotal(computedSubtotal - computedDiscount + computedGst);
  }, [items]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        name: "",
        description: "",
        quantity: 1,
        price: 0,
        discount: 0,
        gst: 18
      }
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length === 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          return updated;
        }
        return item;
      })
    );
    trackToolUsage({ toolName: "Quotation Generator", action: "tool_start" });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBizLogoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setBizName("My Business");
    setBizLogoUrl("");
    setBizAddress("");
    setBizPhone("");
    setBizEmail("");
    setBizGstin("");
    setCustName("");
    setCustCompany("");
    setCustAddress("");
    setCustPhone("");
    setCustEmail("");
    setQuoteNumber("QT-101");
    setNotes("");
    setTerms("Payment terms: 50% advance, 50% upon delivery.");
    setItems([
      {
        id: crypto.randomUUID(),
        name: "Web Development Services",
        description: "Custom Landing Page Design and React Coding",
        quantity: 1,
        price: 15000,
        discount: 0,
        gst: 18
      }
    ]);
    setShowPreview(false);
    trackToolUsage({ toolName: "Quotation Generator", action: "tool_reset" });
  };

  const triggerPdfDownload = async () => {
    try {
      const jsPDF = (await import("jspdf")).default;
      const doc = new jsPDF();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(31, 27, 45);
      doc.text("QUOTATION", 140, 20);

      let y = 30;
      if (bizLogoUrl) {
        try {
          let format = "PNG";
          if (bizLogoUrl.includes("image/jpeg") || bizLogoUrl.includes("image/jpg")) {
            format = "JPEG";
          } else if (bizLogoUrl.includes("image/webp")) {
            format = "WEBP";
          }
          doc.addImage(bizLogoUrl, format, 20, 18, 30, 15);
          y = 38;
        } catch (err) {
          console.error("Error adding logo to PDF:", err);
        }
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(31, 27, 45);
      doc.text(bizName, 20, y);
      
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      
      if (bizAddress) {
        doc.text(bizAddress, 20, y);
        y += 5;
      }
      if (bizPhone) {
        doc.text(`Phone: ${bizPhone}`, 20, y);
        y += 5;
      }
      if (bizEmail) {
        doc.text(`Email: ${bizEmail}`, 20, y);
        y += 5;
      }
      if (bizGstin) {
        doc.text(`GSTIN: ${bizGstin}`, 20, y);
        y += 5;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(31, 27, 45);
      doc.text(`Quote No: ${quoteNumber}`, 140, 30);
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${quoteDate}`, 140, 35);
      doc.text(`Valid Until: ${quoteValidUntil}`, 140, 40);

      doc.setDrawColor(230, 230, 230);
      doc.line(20, y + 5, 190, y + 5);
      y += 12;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(31, 27, 45);
      doc.text("QUOTED TO:", 20, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      y += 6;
      doc.text(custName || "Customer Name", 20, y);
      y += 5;
      if (custCompany) {
        doc.text(custCompany, 20, y);
        y += 5;
      }
      if (custAddress) {
        doc.text(custAddress, 20, y);
        y += 5;
      }
      if (custPhone || custEmail) {
        doc.text(`${custEmail} | ${custPhone}`, 20, y);
        y += 10;
      } else {
        y += 5;
      }

      doc.setFillColor(31, 27, 45);
      doc.rect(20, y, 170, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("Item / Service Description", 22, y + 5);
      doc.text("Qty", 115, y + 5);
      doc.text("Price (INR)", 130, y + 5);
      doc.text("GST %", 155, y + 5);
      doc.text("Total (INR)", 172, y + 5);
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);

      items.forEach((item, index) => {
        if (index % 2 === 1) {
          doc.setFillColor(250, 249, 255);
          doc.rect(20, y, 170, 8, "F");
        }
        
        const nameVal = item.name || "Untitled Item";
        doc.text(nameVal.substring(0, 45), 22, y + 5);
        doc.text(String(item.quantity), 115, y + 5);
        doc.text(item.price.toFixed(2), 130, y + 5);
        doc.text(`${item.gst}%`, 155, y + 5);

        const sub = item.quantity * item.price;
        const disc = sub * (item.discount / 100);
        const finalItemVal = (sub - disc) * (1 + item.gst / 100);
        doc.text(finalItemVal.toFixed(2), 172, y + 5);
        
        y += 8;
      });

      y += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Subtotal:", 135, y);
      doc.text(`INR ${subtotal.toFixed(2)}`, 165, y);
      y += 6;
      doc.text("Discount:", 135, y);
      doc.text(`- INR ${totalDiscount.toFixed(2)}`, 165, y);
      y += 6;
      doc.text("Total Tax (GST):", 135, y);
      doc.text(`INR ${totalGst.toFixed(2)}`, 165, y);
      y += 8;

      doc.setFont("helvetica", "bold");
      doc.text("Grand Total:", 135, y);
      doc.text(`INR ${grandTotal.toFixed(2)}`, 165, y);

      y += 15;
      if (notes) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("Notes:", 20, y);
        doc.setFont("helvetica", "normal");
        doc.text(notes.substring(0, 150), 20, y + 4);
        y += 15;
      }
      if (terms) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("Terms & Conditions:", 20, y);
        doc.setFont("helvetica", "normal");
        doc.text(terms.substring(0, 150), 20, y + 4);
        y += 15;
      }

      doc.setDrawColor(240, 240, 240);
      doc.line(20, 275, 190, 275);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Created via JoyDigital.in Free Quotation Tools", 20, 280);
      doc.text("Need a professional website? Visit https://joydigital.in", 125, 280);

      doc.save(`quotation_${quoteNumber}.pdf`);
      trackToolUsage({ toolName: "Quotation Generator", action: "pdf_download" });
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  const handleDownloadClick = () => {
    setShowLeadModal(true);
    trackToolUsage({ toolName: "Quotation Generator", action: "lead_form_open" });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;

    setLeadFormSubmitting(true);
    try {
      const utm = getUtmParameters();
      const payload = {
        name: leadName.trim(),
        companyName: leadBizName.trim() || "N/A",
        email: leadEmail.trim() || "N/A",
        mobile: leadPhone.trim(),
        service: leadService,
        message: `Lead collected via Quotation Generator PDF download. Quote value: INR ${grandTotal.toFixed(2)}`,
        source: "Quotation Generator Lead",
        utmParams: utm || undefined,
        _subject: "🔥 Tool Lead [Quotation Generator] - Joy Digital",
        _captcha: "false"
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setLeadSuccess(true);
        trackToolUsage({ toolName: "Quotation Generator", action: "lead_submit", metadata: { success: true } });
        setTimeout(() => {
          setShowLeadModal(false);
          setLeadSuccess(false);
          triggerPdfDownload();
        }, 1500);
      } else {
        throw new Error();
      }
    } catch (err) {
      alert("Submission failed, downloading your quotation PDF now.");
      setShowLeadModal(false);
      triggerPdfDownload();
    } finally {
      setLeadFormSubmitting(false);
    }
  };

  const handleCtaClick = () => {
    trackToolUsage({ toolName: "Quotation Generator", action: "cta_click" });
  };

  return (
    <>
      <Header />

      <main className="bg-[#FAF9FF] text-[#1F1B2D] min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="text-xs text-[#6B6478] font-bold mb-6 flex items-center gap-1.5">
            <a href="/" className="hover:text-[#7C3AED]">Home</a>
            <i className="fa-solid fa-chevron-right text-[8px]" />
            <span className="text-[#1F1B2D]">Quotation Generator</span>
          </nav>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl font-black text-[#1F1B2D] mb-2">Professional Quotation Generator</h1>
            <p className="text-xs text-[#6B6478] font-semibold leading-relaxed">
              Create GST-ready business quotes in seconds. Preview, download PDFs, print, and share with clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Editor Side */}
            <div className={`lg:col-span-7 bg-white border border-[#E9E4F2] p-6 sm:p-8 rounded-[24px] shadow-sm ${showPreview ? "hidden lg:block" : ""}`}>
              
              {/* Business Section */}
              <div className="mb-6">
                <h3 className="text-xs font-black text-[#7C3AED] uppercase tracking-wider mb-4 border-b border-[#FAF9FF] pb-2">1. Business Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Business Name</label>
                    <input
                      type="text"
                      value={bizName}
                      onChange={(e) => setBizName(e.target.value)}
                      placeholder="My Business"
                      className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Logo (PNG/JPG)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="text-[10px] font-semibold outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-[#7C3AED]/10 file:text-[#7C3AED] hover:file:bg-[#7C3AED]/20 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">GSTIN (Optional)</label>
                    <input
                      type="text"
                      value={bizGstin}
                      onChange={(e) => setBizGstin(e.target.value)}
                      placeholder="e.g. 33AAAAA1111A1Z1"
                      className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Email</label>
                    <input
                      type="email"
                      value={bizEmail}
                      onChange={(e) => setBizEmail(e.target.value)}
                      placeholder="sales@mybusiness.com"
                      className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Address</label>
                    <input
                      type="text"
                      value={bizAddress}
                      onChange={(e) => setBizAddress(e.target.value)}
                      placeholder="Street, City, State, ZIP"
                      className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                    />
                  </div>
                </div>
              </div>

              {/* Client Info Section */}
              <div className="mb-6 border-t border-[#FAF9FF] pt-4">
                <h3 className="text-xs font-black text-[#7C3AED] uppercase tracking-wider mb-4 border-b border-[#FAF9FF] pb-2">2. Quoted To (Client Details)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Customer Name</label>
                    <input
                      type="text"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      placeholder="Client contact person"
                      className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Company Name</label>
                    <input
                      type="text"
                      value={custCompany}
                      onChange={(e) => setCustCompany(e.target.value)}
                      placeholder="Client company"
                      className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Email</label>
                    <input
                      type="email"
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      placeholder="client@company.com"
                      className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Address</label>
                    <input
                      type="text"
                      value={custAddress}
                      onChange={(e) => setCustAddress(e.target.value)}
                      placeholder="Client address details"
                      className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                    />
                  </div>
                </div>
              </div>

              {/* Quote Info Details */}
              <div className="mb-6 border-t border-[#FAF9FF] pt-4">
                <h3 className="text-xs font-black text-[#7C3AED] uppercase tracking-wider mb-4 border-b border-[#FAF9FF] pb-2">3. Quotation parameters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Quote Number</label>
                    <input
                      type="text"
                      value={quoteNumber}
                      onChange={(e) => setQuoteNumber(e.target.value)}
                      className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Date</label>
                    <input
                      type="date"
                      value={quoteDate}
                      onChange={(e) => setQuoteDate(e.target.value)}
                      className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Valid Until</label>
                    <input
                      type="date"
                      value={quoteValidUntil}
                      onChange={(e) => setQuoteValidUntil(e.target.value)}
                      className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                    />
                  </div>
                </div>
              </div>

              {/* Items Table Form */}
              <div className="mb-6 border-t border-[#FAF9FF] pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-black text-[#7C3AED] uppercase tracking-wider">4. Item / Services Rows</h3>
                  <button
                    onClick={handleAddItem}
                    className="bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-[#7C3AED] text-[10px] font-bold py-1.5 px-3 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <i className="fa-solid fa-plus" /> Add Row
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {items.map((item, idx) => (
                    <div key={item.id} className="bg-[#FAF9FF] border border-[#E9E4F2] p-4 rounded-2xl flex flex-col gap-3 relative">
                      {items.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="absolute top-2 right-2 text-rose-500 hover:text-rose-600 text-xs p-1 cursor-pointer"
                        >
                          <i className="fa-solid fa-trash-can" />
                        </button>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                        <div className="sm:col-span-6 flex flex-col gap-1.5">
                          <label className="text-[9px] font-extrabold text-[#6B6478] uppercase">Item Name</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                            placeholder="Item Name / Service Type"
                            className="text-xs bg-white border border-[#E9E4F2] rounded-xl px-3 py-2 font-bold outline-none focus:border-[#7C3AED]"
                          />
                        </div>
                        <div className="sm:col-span-3 flex flex-col gap-1.5">
                          <label className="text-[9px] font-extrabold text-[#6B6478] uppercase">Qty</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                            className="text-xs bg-white border border-[#E9E4F2] rounded-xl px-3 py-2 font-bold outline-none focus:border-[#7C3AED]"
                          />
                        </div>
                        <div className="sm:col-span-3 flex flex-col gap-1.5">
                          <label className="text-[9px] font-extrabold text-[#6B6478] uppercase">Price (₹)</label>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => handleUpdateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                            className="text-xs bg-white border border-[#E9E4F2] rounded-xl px-3 py-2 font-bold outline-none focus:border-[#7C3AED]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-extrabold text-[#6B6478] uppercase">Discount (%)</label>
                          <input
                            type="number"
                            value={item.discount}
                            onChange={(e) => handleUpdateItem(item.id, "discount", parseFloat(e.target.value) || 0)}
                            className="text-xs bg-white border border-[#E9E4F2] rounded-xl px-3 py-2 font-bold outline-none focus:border-[#7C3AED]"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-extrabold text-[#6B6478] uppercase">GST (%)</label>
                          <select
                            value={item.gst}
                            onChange={(e) => handleUpdateItem(item.id, "gst", parseInt(e.target.value) || 0)}
                            className="text-xs bg-white border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-[#7C3AED] cursor-pointer"
                          >
                            <option value={0}>0%</option>
                            <option value={5}>5%</option>
                            <option value={12}>12%</option>
                            <option value={18}>18%</option>
                            <option value={28}>28%</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5 justify-end text-right">
                          <span className="text-[8px] font-black text-[#A7A2B2] uppercase">Row Total</span>
                          <span className="text-xs font-bold text-[#1F1B2D]">
                            ₹{((item.quantity * item.price * (1 - item.discount / 100)) * (1 + item.gst / 100)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes & Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#FAF9FF] pt-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Additional Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Provide special notes for clients..."
                    className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-semibold outline-none focus:bg-white focus:border-[#7C3AED]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold text-[#6B6478] uppercase">Terms & Conditions</label>
                  <textarea
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    rows={3}
                    className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-semibold outline-none focus:bg-white focus:border-[#7C3AED]"
                  />
                </div>
              </div>

              <div className="flex gap-4 border-t border-[#E9E4F2] pt-6 mt-6">
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex-1 bg-slate-50 border border-[#E9E4F2] hover:bg-slate-100 text-[#1F1B2D] font-bold text-xs py-3.5 rounded-xl transition-all lg:hidden cursor-pointer"
                >
                  Preview Quotation
                </button>
                <button
                  onClick={handleDownloadClick}
                  className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md shadow-[#7C3AED]/15 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <i className="fa-solid fa-download" /> Download PDF
                </button>
                <button
                  onClick={handleReset}
                  className="bg-transparent border border-[#E9E4F2] hover:bg-slate-50 text-[#1F1B2D] font-bold text-xs py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <i className="fa-solid fa-rotate-left" /> Reset
                </button>
              </div>
            </div>

            {/* Preview Side */}
            <div className={`lg:col-span-5 bg-white border border-[#E9E4F2] p-6 sm:p-8 rounded-[24px] shadow-sm flex flex-col justify-between min-h-[500px] ${!showPreview ? "hidden lg:flex" : "flex"}`}>
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-[#FAF9FF] pb-3">
                  <h2 className="text-sm font-black text-[#1F1B2D] uppercase tracking-wider">Live Preview</h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="lg:hidden text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer"
                  >
                    Edit Fields
                  </button>
                </div>

                {/* Quotation Sheet Visual */}
                <div className="border border-[#E9E4F2] rounded-xl p-5 bg-[#FAF9FF] text-[10px] flex flex-col justify-between min-h-[400px]">
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      {bizLogoUrl ? (
                        <img src={bizLogoUrl} alt="Logo" className="max-h-8 object-contain mb-2" />
                      ) : (
                        <div className="font-black text-xs text-[#7C3AED] tracking-tight uppercase mb-1">{bizName || "My Business"}</div>
                      )}
                      <p className="text-[8px] text-[#6B6478] max-w-[150px] leading-tight">{bizAddress || "Street Details"}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-[12px] text-[#1F1B2D] tracking-tight">QUOTATION</div>
                      <p className="text-[#6B6478] text-[8px] font-bold mt-1">
                        Quote No: {quoteNumber}<br />
                        Date: {quoteDate}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-[7px] font-extrabold text-[#7C3AED] uppercase block mb-1">Quoted To:</span>
                    <div className="font-bold text-[#1F1B2D]">{custName || "Customer Name"}</div>
                    {custCompany && <div className="font-medium text-[#6B6478]">{custCompany}</div>}
                    {custAddress && <div className="text-[#6B6478] leading-normal">{custAddress}</div>}
                  </div>

                  <div className="flex-grow">
                    <div className="grid grid-cols-12 bg-[#1F1B2D] text-white py-1 px-2 font-bold mb-1.5 rounded">
                      <span className="col-span-6">Item Description</span>
                      <span className="col-span-2 text-center">Qty</span>
                      <span className="col-span-2 text-right">Price</span>
                      <span className="col-span-2 text-right">Total</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 border-b border-slate-50 py-1 px-2 text-[#6B6478] font-semibold">
                          <span className="col-span-6 truncate text-[#1F1B2D]">{item.name || "Untitled Item"}</span>
                          <span className="col-span-2 text-center">{item.quantity}</span>
                          <span className="col-span-2 text-right">₹{item.price}</span>
                          <span className="col-span-2 text-right text-[#1F1B2D]">
                            ₹{((item.quantity * item.price * (1 - item.discount / 100)) * (1 + item.gst / 100)).toFixed(0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#E9E4F2] pt-4 mt-4 flex flex-col items-end gap-1.5">
                    <div className="flex justify-between w-full max-w-[150px] font-bold text-[#6B6478]">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(0)}</span>
                    </div>
                    {totalDiscount > 0 && (
                      <div className="flex justify-between w-full max-w-[150px] font-bold text-rose-600">
                        <span>Discount:</span>
                        <span>-₹{totalDiscount.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between w-full max-w-[150px] font-bold text-[#6B6478]">
                      <span>Tax (GST):</span>
                      <span>₹{totalGst.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between w-full max-w-[150px] font-black text-sm text-[#7C3AED] border-t border-[#E9E4F2] pt-1.5">
                      <span>Total:</span>
                      <span>₹{grandTotal.toFixed(0)}</span>
                    </div>
                  </div>

                  <div className="text-[7px] text-[#A7A2B2] border-t border-slate-50 pt-2.5 mt-4 flex justify-between">
                    <span>Powered by JoyDigital.in</span>
                    <span>Valid until: {quoteValidUntil}</span>
                  </div>
                </div>
              </div>

              {/* Consultation Pitch Banner: CUSTOM CRM 소프트웨어 Pitch */}
              <div className="bg-[#FAF9FF] border border-[#E9E4F2] p-5 rounded-2xl mt-6 relative overflow-hidden text-left">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#7C3AED]" />
                <h3 className="text-xs font-bold text-[#1F1B2D] mb-1">Need a Custom CRM or Quotation Tool?</h3>
                <p className="text-[10px] text-[#6B6478] font-semibold leading-relaxed mb-4">
                  Streamline your sales process! We engineer custom CRM database applications, multi-service quotation engines, and automated lead trackers for growing teams.
                </p>
                <a
                  href="https://wa.me/919080026133?text=Hi%20Joy%20Digital,%20I%20am%20interested%20in%20building%20a%20custom%20CRM%20or%20quotation%20generator%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-[10px] py-2.5 px-4 rounded-lg shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <i className="fa-brands fa-whatsapp text-xs animate-pulse" /> Talk to a CRM Engineer
                </a>
              </div>
            </div>
          </div>
          
          <ToolFeedback toolName="Quotation Generator" />
        </div>
      </main>

      {/* Optional Lead Capture Popup Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white p-6 sm:p-8 rounded-[28px] shadow-2xl max-w-md w-full border border-[#E9E4F2] relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#7C3AED]" />
            <h3 className="text-lg font-black text-[#1F1B2D] mb-1">Want help building your business online?</h3>
            <p className="text-[10px] text-[#6B6478] font-semibold leading-relaxed mb-6">
              Claim a free 15-minute consultation to rank higher on Google Maps and drive more sales.
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

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-black text-[#6B6478] uppercase">Business Name</label>
                  <input
                    type="text"
                    value={leadBizName}
                    onChange={(e) => setLeadBizName(e.target.value)}
                    placeholder="Acme Inc"
                    className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-black text-[#6B6478] uppercase">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="90800 26133"
                    required
                    className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-black text-[#6B6478] uppercase">Email ID</label>
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="contact@company.com"
                  className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-black text-[#6B6478] uppercase">Interested Service</label>
                <select
                  value={leadService}
                  onChange={(e) => setLeadService(e.target.value)}
                  className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED] cursor-pointer"
                >
                  <option value="Website Development">Website Development</option>
                  <option value="SEO Optimization">SEO Optimization</option>
                  <option value="Google Business Profile Setup">Google Business Profile / Maps</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Logo Design">Logo & Brand Design</option>
                </select>
              </div>

              {leadSuccess && (
                <p className="text-center text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 py-2 rounded-xl">
                  Details captured! Starting download...
                </p>
              )}

              <div className="flex flex-col gap-2 mt-4">
                <button
                  type="submit"
                  disabled={leadFormSubmitting}
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                >
                  {leadFormSubmitting ? "Submitting..." : "Get Free Consultation"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLeadModal(false);
                    triggerPdfDownload();
                    trackToolUsage({ toolName: "Quotation Generator", action: "lead_bypass" });
                  }}
                  className="w-full bg-transparent hover:bg-slate-50 text-[#6B6478] hover:text-[#1F1B2D] font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  Continue without contacting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
