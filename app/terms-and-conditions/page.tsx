import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";

export const metadata: Metadata = {
  title: "Terms & Conditions | Joy Digital",
  description: "Read the official Terms and Conditions of Joy Digital to understand the client agreement and rules for using our agency services and tools.",
  alternates: {
    canonical: "https://joydigital.in/terms-and-conditions",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/terms-and-conditions",
    siteName: "Joy Digital Agency",
    title: "Terms & Conditions | Joy Digital",
    description: "Read the Terms & Conditions of Joy Digital to understand the agreement and rules for using our services.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Joy Digital Terms and Conditions" }],
  },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32 bg-light-bg min-h-screen">
        
        {/* Page Header */}
        <section className="py-12 sm:py-16 bg-white border-b border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="inline-block bg-accent-glow text-accent font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-accent/20 mb-4">
              Legal Info
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Terms and Conditions Agreement
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary font-semibold">
              Last Updated: June 2026
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm text-left">
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8">
                Welcome to Joy Digital. By accessing our website or using our services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully.
              </p>

              <div className="space-y-8">
                {/* 1. Services Agreement */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-briefcase" /></span>
                    1. Services Agreement
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    Joy Digital offers custom website development, digital marketing, search engine optimization (SEO), local SEO, and logo design services. Detailed project scope, deliverables, and timelines are agreed upon in writing before the start of any contract.
                  </p>
                </div>

                {/* 2. Payments & Fees */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-file-invoice-dollar" /></span>
                    2. Payments & Fees
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    Project work begins only after payment confirmation. For milestone-based projects, payments made for completed milestones are non-refundable. Service renewals and recurring packages must be paid on or before the due date to ensure uninterrupted services.
                  </p>
                </div>

                {/* 3. Intellectual Property */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-copyright" /></span>
                    3. Intellectual Property
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    All original codes, custom designs, graphic assets, and text materials created for the client remain the property of Joy Digital until full payment is received. Upon final invoice clearance, the ownership rights are transferred to the client.
                  </p>
                </div>

                {/* 4. Limitation of Warranties */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-gauge" /></span>
                    4. Limitation of Warranties
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    We deliver our services using industry-best practices and technical standards. However, because search engine rankings, web traffic, and digital conversions depend on third-party algorithms, consumer behaviors, and competitive factors, we make no guarantees regarding specific results.
                  </p>
                </div>

                {/* 5. Limitation of Liability */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-triangle-exclamation" /></span>
                    5. Limitation of Liability
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    In no event shall Joy Digital, its partners, or employees be held liable for any indirect, consequential, or incidental damages (including loss of profits, data, or business opportunities) arising from the use or inability to use our deliverables.
                  </p>
                </div>

                {/* 6. Governing Law */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-scale-balanced" /></span>
                    6. Governing Law
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India.
                  </p>
                </div>

                {/* Contact Us */}
                <div className="border-t border-gray-100 pt-8 mt-8">
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-envelope" /></span>
                    Contact Us
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                    For questions regarding these Terms & Conditions:
                  </p>
                  <div className="bg-light-bg rounded-2xl p-6 border border-gray-100 space-y-2 max-w-md">
                    <h3 className="font-bold text-primary-dark">Joy Digital</h3>
                    <p className="text-sm flex items-center gap-2 text-text-secondary">
                      <span className="text-accent"><i className="fa-solid fa-phone" /></span>
                      <a href="tel:+919080026133" className="hover:text-accent font-semibold transition-colors">9080026133</a>
                    </p>
                    <p className="text-sm flex items-center gap-2 text-text-secondary">
                      <span className="text-accent"><i className="fa-solid fa-envelope" /></span>
                      <a href="mailto:info@joydigital.in" className="hover:text-accent font-semibold transition-colors">info@joydigital.in</a>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
