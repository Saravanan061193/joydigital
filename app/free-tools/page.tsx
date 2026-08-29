import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://joydigital.in"),
  title: "Free Business Tools & Generators | Joy Digital",
  description: "Boost your productivity with our free business tools. Calculate GST, generate professional PDF invoices & quotations, build QR codes, and create WhatsApp chat links instantly.",
  alternates: {
    canonical: "https://joydigital.in/free-tools",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/free-tools",
    title: "Free Business Tools & Generators | Joy Digital",
    description: "Boost your productivity with our free business tools. Calculate GST, generate professional PDF invoices & quotations, build QR codes, and create WhatsApp chat links instantly.",
  },
};

const TOOLS = [
  {
    name: "GST Calculator",
    description: "Calculate GST Inclusive and Exclusive rates instantly with CGST, SGST, and IGST breakdowns.",
    icon: "fa-solid fa-calculator text-blue-500",
    href: "/gst-calculator",
    cta: "Use Free Tool"
  },
  {
    name: "Quotation Generator",
    description: "Create professional business quotations with custom logos, items, discounts, and tax rates in minutes.",
    icon: "fa-solid fa-file-invoice-dollar text-[#7C3AED]",
    href: "/quotation-generator",
    cta: "Create Quotation"
  },
  {
    name: "Invoice Generator",
    description: "Create and download GST-ready professional invoices for your clients and customers instantly.",
    icon: "fa-solid fa-file-invoice text-emerald-500",
    href: "/invoice-generator",
    cta: "Generate Invoice"
  },
  {
    name: "QR Code Generator",
    description: "Create QR codes for website URLs, WhatsApp numbers, phone calls, Google Maps location, UPI, and WiFi networks.",
    icon: "fa-solid fa-qrcode text-[#F97316]",
    href: "/qr-code-generator",
    cta: "Generate QR Code"
  },
  {
    name: "WhatsApp Link Generator",
    description: "Create click-to-chat WhatsApp links with pre-filled messages and matching QR codes.",
    icon: "fa-brands fa-whatsapp text-emerald-600",
    href: "/whatsapp-link-generator",
    cta: "Generate Link"
  }
];

export default function FreeToolsLandingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Joy Digital Free Business Tools",
    "url": "https://joydigital.in/free-tools",
    "description": "Simple, fast and free tools to help you manage and grow your business.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main className="bg-[#FAF9FF] text-[#1F1B2D] min-h-screen pt-24 pb-16 flex flex-col justify-between">
        <div className="max-w-7xl mx-auto px-6 w-full flex-grow">
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 mt-8">
            <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest block mb-3">
              Online Utilities
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#1F1B2D] tracking-tight mb-4 leading-tight">
              Free Business Tools
            </h1>
            <p className="text-sm md:text-base text-[#6B6478] font-medium leading-relaxed">
              Simple, fast and free tools to help you manage and grow your business.
              Boost your professionalism without any registrations or hidden fees.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {TOOLS.map((tool, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E9E4F2] rounded-[24px] p-8 shadow-sm hover:shadow-xl hover:border-[#7C3AED]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-[#E9E4F2] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i className={tool.icon} />
                  </div>
                  <h2 className="text-xl font-bold text-[#1F1B2D] mb-3 group-hover:text-[#7C3AED] transition-colors duration-250">
                    {tool.name}
                  </h2>
                  <p className="text-xs text-[#6B6478] leading-relaxed mb-8 font-semibold">
                    {tool.description}
                  </p>
                </div>
                <Link
                  href={tool.href}
                  className="w-full text-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-md shadow-[#7C3AED]/10 hover:shadow-[#7C3AED]/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {tool.cta}
                  <i className="fa-solid fa-arrow-right text-[10px]" />
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ / Info Section for SEO Value */}
          <div className="max-w-4xl mx-auto border-t border-[#E9E4F2] pt-16">
            <h2 className="text-2xl font-black text-center text-[#1F1B2D] mb-10">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-extrabold text-sm text-[#1F1B2D] mb-2">Are these tools really free to use?</h3>
                <p className="text-xs text-[#6B6478] font-semibold leading-relaxed">
                  Yes, absolutely. All of our Phase 1 business tools are 100% free with no registration, no subscription, and no hidden trial periods required.
                </p>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#1F1B2D] mb-2">Is my data safe and private?</h3>
                <p className="text-xs text-[#6B6478] font-semibold leading-relaxed">
                  Yes. We do not store any client details, financial amounts, uploads, or items you input into calculators, invoices, or QR generators. All calculations and PDF exports occur securely inside your browser.
                </p>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#1F1B2D] mb-2">Can I download generated files?</h3>
                <p className="text-xs text-[#6B6478] font-semibold leading-relaxed">
                  Yes, you can download Quotations and Invoices directly as standard PDFs, print them directly, and download QR codes as high-quality PNGs.
                </p>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#1F1B2D] mb-2">How can I grow my business further?</h3>
                <p className="text-xs text-[#6B6478] font-semibold leading-relaxed">
                  While our free tools assist in daily transactions, a premium custom business website can boost your lead generation. Contact Joy Digital for custom web designs and search optimizations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
