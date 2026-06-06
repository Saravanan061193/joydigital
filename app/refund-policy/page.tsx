import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";

export const metadata: Metadata = {
  title: "Refund Policy | Joy Digital",
  description: "Read the refund policy for website development, SEO, digital marketing, and custom software services provided by Joy Digital.",
};

export default function RefundPolicyPage() {
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
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark tracking-tight mb-4">
              Refund Policy
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
                At Joy Digital, we strive to provide high-quality digital services and customer satisfaction. Please read our refund policy details for each of our services below.
              </p>

              <div className="space-y-8">
                {/* Web Dev */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-code" /></span>
                    Website Development Services
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-text-secondary">
                    <li>Project work begins only after payment confirmation.</li>
                    <li>Due to the nature of digital services, payments made for completed work are non-refundable.</li>
                    <li>If a project is cancelled before work has started, a refund may be considered at our discretion.</li>
                  </ul>
                </div>

                {/* Digital Marketing */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-chart-line" /></span>
                    Digital Marketing & SEO Services
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-text-secondary">
                    <li>Fees paid for completed services are non-refundable.</li>
                    <li>We do not guarantee specific rankings, traffic, or sales results.</li>
                  </ul>
                </div>

                {/* Custom Software */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-laptop-code" /></span>
                    Custom Software & App Development
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-text-secondary">
                    <li>Payments made for completed milestones are non-refundable.</li>
                    <li>Any refund requests will be reviewed on a case-by-case basis.</li>
                  </ul>
                </div>

                {/* Contact Us */}
                <div className="border-t border-gray-100 pt-8 mt-8">
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-envelope" /></span>
                    Contact Us
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                    For any refund-related questions, please contact:
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
