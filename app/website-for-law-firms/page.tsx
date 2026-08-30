import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Law Firm Website Design & Attorney SEO Services | Joy Digital",
  description: "High-converting website design & search engine optimization for law firms, attorneys, corporate legal advocates, and litigation practices. Confidential consultation booking, attorney profiles, and local legal SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-law-firms",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-law-firms",
    title: "Law Firm Website Design & Legal Client Acquisition | Joy Digital",
    description: "Ultra-fast Next.js websites built for legal practices and corporate law attorneys. Confidential case evaluation forms, practice area showcases, attorney bio pages, and local search dominance.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Law Firm Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-law-firms#service",
      "name": "Law Firm Website Design & Legal SEO Services",
      "serviceType": "Legal Web Development & Attorney Marketing",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Joy Digital",
        "image": "https://joydigital.in/assets/images/logo.webp",
        "telephone": "+919080026133",
        "url": "https://joydigital.in",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Old Perungalathur",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600063",
          "addressCountry": "IN"
        }
      },
      "description": "Custom website development for law firms, trial attorneys, corporate legal consultants, and advocate chambers. Features confidential case evaluation forms, attorney bios, practice area landing pages, and local SEO.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "18000",
        "highPrice": "45000",
        "offerCount": "2"
      }
    }
  ]
};

export default function LawFirmWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Law Firms"
      heroTitle="High-Converting Website Design & SEO for Law Firms & Attorneys"
      heroSubtitle="Build immediate professional trust and convert high-value legal inquiries into scheduled client consultations. We engineer fast, elegant Next.js websites for corporate law firms, litigation advocates, IP attorneys, and specialized legal practices."
      leadSource="Website for Law Firms Landing Page"
      heroCtaText="Get Free Legal Web Quote"
      overviewTitle="Why Most Law Firm Websites Fail to Attract Premium Clients (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            When individuals or corporate executives face complex legal challenges—whether corporate compliance, IP protection, commercial litigation, or real estate disputes—they search for experienced, authoritative legal counsel with clear credentials.
          </p>
          <p>
            However, many legal websites look sterile, load slowly on mobile devices, display outdated attorney bios, and lack clear confidential case submission forms or instant phone/WhatsApp routing.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Law Firm Websites</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Confidential Case Evaluation Forms</strong>: Encrypted client intake workflow</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Practice Area Hubs</strong>: Dedicated landing pages for corporate, IP, litigation & tax</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Attorney & Partner Bio Profiles</strong>: Education, bar admissions & trial victories</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Local Legal SEO Strategy</strong>: Rank for high-value attorney search queries</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Ultra-fast serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Legal Advisory Schema Markup</strong>: Rich Google Search snippet enhancement</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we combine sophisticated legal branding with <Link href="/website-development" className="text-primary font-bold hover:underline">high-speed Next.js web development</Link>, <Link href="/seo-services" className="text-primary font-bold hover:underline">legal SEO strategies</Link>, and <Link href="/local-seo-services" className="text-primary font-bold hover:underline">Google Business Profile optimization</Link> to position your practice at the forefront of your legal market.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Law Firm Websites"
      benefitsSubtitle="Designed to instill confidence, highlight legal expertise, and streamline client intake."
      benefits={[
        {
          icon: "fa-solid fa-shield-halved",
          title: "1. Confidential Case Evaluation Form",
          description: "Secure, encrypted consultation request form allowing clients to outline their legal matter with complete confidentiality.",
        },
        {
          icon: "fa-solid fa-user-tie",
          title: "2. Attorney & Partner Profile Showcase",
          description: "Detailed bio pages highlighting academic background, court bar admissions, published legal insights, and notable achievements.",
        },
        {
          icon: "fa-solid fa-scale-balanced",
          title: "3. Practice Area Dedicated Pages",
          description: "In-depth landing pages covering corporate law, intellectual property, commercial arbitration, real estate, and employment law.",
        },
        {
          icon: "fa-solid fa-gavel",
          title: "4. Case Results & Transactional Milestones",
          description: "Display past case successes, arbitration outcomes, or major corporate deal advisory milestones within regulatory guidelines.",
        },
        {
          icon: "fa-solid fa-calendar-check",
          title: "5. Online Consultation Scheduling",
          description: "Seamless integration with calendar scheduling tools (Calendly/Google Calendar) for instant booking of paid or free legal initial consultations.",
        },
        {
          icon: "fa-solid fa-book-journal-whills",
          title: "6. Legal Insights & Article Hub",
          description: "Publish legal updates, regulatory changes, and compliance guides to establish thought leadership and boost organic search authority.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "7. One-Tap Client WhatsApp Routing",
          description: "Instant button connecting clients directly to your desk manager with pre-filled message: 'Hi, I need to schedule a legal consultation.'",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "8. Multi-Office Location Pages & Maps",
          description: "Showcase physical office locations, chamber addresses, court proximity maps, and local Google Map directions.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "9. Local Legal SEO Keyword Strategy",
          description: "Target intent-rich local terms like 'Corporate lawyer in Chennai', 'IP attorney firm Madurai', or 'Commercial litigation lawyers'.",
        },
        {
          icon: "fa-solid fa-lock",
          title: "10. Privacy & Bar Council Compliance Layouts",
          description: "Designed in full alignment with legal advertising guidelines, ethical disclosures, disclaimers, and data protection privacy standards.",
        },
      ]}
      processTitle="Our 6-Step Law Firm Web Development Roadmap"
      processSubtitle="A structured process ensuring professional excellence and search engine prominence."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-clipboard-question",
          title: "Practice & Brand Audit",
          description: "We evaluate your firm's core practice areas, target client demographics, brand positioning, and consultation workflow.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Sitemap & Keyword Architecture",
          description: "We structure practice area hubs, attorney bio hierarchies, legal article categories, and local SEO term targets.",
        },
        {
          step: "3",
          icon: "fa-solid fa-pen-nib",
          title: "Elegant UI/UX Design",
          description: "We design refined, trustworthy desktop and mobile layouts using sophisticated typography and clear call-to-action buttons.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Build",
          description: "We build your law firm portal on modern serverless Next.js for sub-1.5s page load speed and rock-solid uptime.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "Legal Schema & Analytics Sync",
          description: "We implement LegalService schema markup, configure GA4 event tracking, and sync intake forms with your email/CRM.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your domain, submit XML sitemaps to Google Search Console, and verify local map pack presence.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Law Firms"
      pricingSubtitle="Get a prestigious, high-converting legal website with no hidden monthly fees or recurring software lock-ins."
      pricingTiers={[
        {
          name: "Advocate & Solo Practice Plan",
          price: "₹18,000",
          period: "one-time ($900 USD)",
          description: "Perfect for independent attorneys, advocates, specialized legal consultants, and boutique chambers.",
          features: [
            "1-5 Custom Responsive Pages",
            "Confidential Case Intake Form",
            "Practice Area Showcase",
            "Attorney Bio & Achievements Section",
            "WhatsApp & Phone Quick Buttons",
            "Google Maps Local Business Setup",
            "Basic Legal SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Solo Practice Plan",
        },
        {
          name: "Enterprise Law Firm Portal",
          price: "₹45,000",
          period: "one-time ($2,200 USD)",
          description: "Recommended for full-service law firms, corporate legal advisories, and multi-partner practices.",
          isPopular: true,
          features: [
            "Up to 15 Custom Practice & Bio Pages",
            "Advanced Case Evaluation Intake Workflow",
            "Direct Online Consultation Booking Sync",
            "Legal Insights & Article Publication Hub",
            "Multi-Office Location Landing Pages",
            "Full Local Legal SEO & Schema Architecture",
            "Google Analytics 4 & Search Console Setup",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Enterprise Law Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a law firm cost?",
          answer: "Our law firm website packages start from ₹18,000 ($900 USD) for solo practice advocates up to ₹45,000 ($2,200 USD) for multi-partner law firm portals.",
        },
        {
          question: "Can prospective clients submit confidential case details online?",
          answer: "Yes! We build secure, encrypted case intake forms with disclaimer fields ensuring inquiries route directly to your managing partner or consultation calendar.",
        },
        {
          question: "Will the website help our law firm rank higher on Google for local legal searches?",
          answer: "Yes. Every law firm website includes LegalService schema markup, fast sub-1.5s load speeds, structured practice area landing pages, and localized keywords to rank in organic search and Google Maps.",
        },
        {
          question: "Can we publish legal articles and news updates ourselves?",
          answer: "Yes. We provide a clean, simple CMS so your attorneys or admin staff can publish legal insights, client advisories, and press releases anytime.",
        },
        {
          question: "Are there any ongoing monthly maintenance or listing fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly listing charges or platform commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Legal SEO Services" },
        { href: "/local-seo-services", label: "Local Map SEO" },
        { href: "/google-business-profile-setup", label: "Google Business Setup" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Us" },
      ]}
    />
  );
}
