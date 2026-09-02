import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Protection Terms | Joy Digital",
  description: "Read the Privacy Policy of Joy Digital to understand how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://joydigital.in/privacy-policy",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/privacy-policy",
    siteName: "Joy Digital Agency",
    title: "Privacy Policy & Data Protection Terms | Joy Digital",
    description: "Read the Privacy Policy of Joy Digital to understand how we collect, use, and protect your personal information.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Joy Digital Privacy Policy" }],
  },
};

export default function PrivacyPolicyPage() {
  const canonicalUrl = "https://joydigital.in/privacy-policy";
  const graphSchema = buildPageGraphSchema({
    url: canonicalUrl,
    title: "Privacy Policy & Data Protection Terms | Joy Digital",
    description: "Read the Privacy Policy of Joy Digital to understand how we collect, use, and protect your personal information.",
    breadcrumbs: [
      { name: "Home", item: "https://joydigital.in" },
      { name: "Privacy Policy", item: canonicalUrl },
    ],
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
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
              Joy Digital Privacy &amp; Data Policy
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
                At Joy Digital, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and safeguard your data.
              </p>

              <div className="space-y-8">
                {/* 1. Information We Collect */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-database" /></span>
                    1. Information We Collect
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                    We collect information that you voluntarily provide to us when contacting us, requesting consultations, or subscribing to our services. This includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-text-secondary">
                    <li>Contact details such as name, email address, phone number, and company name.</li>
                    <li>Project requirements, feedback, and custom notes you submit.</li>
                    <li>Technical data like IP addresses, browser type, and navigation paths (via cookies).</li>
                  </ul>
                </div>

                {/* 2. How We Use Your Information */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-handshake-angle" /></span>
                    2. How We Use Your Information
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-2">
                    We use the collected information for various professional purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-text-secondary">
                    <li>To deliver, maintain, and improve our services (Web Dev, SEO, etc.).</li>
                    <li>To communicate with you regarding project updates, invoices, and direct inquiries.</li>
                    <li>To analyze usage patterns and optimize our website content.</li>
                    <li>To comply with legal obligations and safeguard our operations.</li>
                  </ul>
                </div>

                {/* 3. Data Protection & Security */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-shield-halved" /></span>
                    3. Data Protection & Security
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    We implement appropriate administrative, technical, and physical security measures to protect your personal information against unauthorized access, loss, alteration, or disclosure. However, please note that no internet transmission is 100% secure.
                  </p>
                </div>

                {/* 4. Information Sharing */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-share-nodes" /></span>
                    4. Information Sharing
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    Joy Digital does not sell, rent, or lease your personal information to third parties. We may only share information with trusted third-party providers (such as hosting, domain, or analytics platforms) who assist us in performing our services under confidentiality agreements.
                  </p>
                </div>

                {/* 5. Your Rights */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-user-check" /></span>
                    5. Your Rights
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    Depending on your location, you have the right to request access to, correction of, or deletion of your personal data stored with us. To exercise any of these rights, please get in touch with us using the contact details below.
                  </p>
                </div>

                {/* Contact Us */}
                <div className="border-t border-gray-100 pt-8 mt-8">
                  <h2 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                    <span className="text-accent"><i className="fa-solid fa-envelope" /></span>
                    Contact Us
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                    For questions or concerns regarding our Privacy Policy:
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
