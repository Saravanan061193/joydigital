import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";

export const metadata: Metadata = {
  title: "Disclaimer | Joy Digital",
  description: "Read the website disclaimer and limitation of liability policy for Joy Digital.",
  alternates: {
    canonical: "https://joydigital.in/disclaimer",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/disclaimer",
    siteName: "Joy Digital Agency",
    title: "Disclaimer | Joy Digital",
    description: "Read the website disclaimer and limitation of liability policy for Joy Digital.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Joy Digital Disclaimer" }],
  },
};

export default function DisclaimerPage() {
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
              Disclaimer
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
                The information provided on this website is for general informational purposes only. By using our website and services, you agree to the terms outlined in this disclaimer.
              </p>

              <div className="space-y-8">
                {/* Service Information */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-circle-info" /></span>
                    Service Information
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    While we strive to keep information accurate and up to date, Joy Digital makes no warranties regarding the completeness, reliability, or accuracy of any information displayed on this website.
                  </p>
                </div>

                {/* Digital Marketing Results */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-chart-line" /></span>
                    Digital Marketing Results
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                    Digital marketing and SEO outcomes may vary depending on multiple factors including competition, industry trends, and search engine algorithms.
                  </p>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-2 font-semibold">
                    We do not guarantee:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-text-secondary">
                    <li>First-page Google rankings</li>
                    <li>Specific traffic increases</li>
                    <li>Guaranteed leads or sales</li>
                  </ul>
                </div>

                {/* External Links */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-link" /></span>
                    External Links
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of those external websites.
                  </p>
                </div>

                {/* Limitation of Liability */}
                <div className="border-t border-gray-100 pt-8 mt-8">
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-triangle-exclamation" /></span>
                    Limitation of Liability
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    Joy Digital shall not be held liable for any direct or indirect damages resulting from the use of this website or our services.
                  </p>
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
