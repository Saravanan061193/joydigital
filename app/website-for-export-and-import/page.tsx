import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Export Import Business Website Design & Global B2B SEO | Joy Digital",
  description: "High-converting website design & export marketing for merchant exporters, import-export business houses, commodity suppliers, and international trade firms. Features digital product catalogs, RFQ forms, and global SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-export-and-import",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-export-and-import",
    title: "Export Import Business Website Design & Lead Generation | Joy Digital",
    description: "Ultra-fast Next.js websites built for merchant exporters, commodity trade houses, and global sourcing agencies. Product catalog showcases, buyer RFQ forms, Incoterms guides, and international search ranking.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Export Import Business Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-export-and-import#service",
      "name": "Export Import Business Website Design & Global B2B SEO",
      "serviceType": "Export-Import Web Development & Global Trade Marketing",
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
      "description": "Custom web design for export-import companies, merchant exporters, agricultural product traders, and international trade agencies. Features product catalogs, buyer RFQ inquiry forms, export compliance displays, and global SEO.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "18000",
        "highPrice": "48000",
        "offerCount": "2"
      }
    }
  ]
};

export default function ExportImportWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Export & Import Business"
      heroTitle="High-Converting Website Design & SEO for Export & Import Businesses"
      heroSubtitle="Connect directly with international buyers, sourcing agents, and global trade distributors. We build ultra-fast, search-optimized Next.js web portals for merchant exporters, commodity traders, agricultural suppliers, and import-export houses."
      leadSource="Website for Export & Import Business Landing Page"
      heroCtaText="Get Free Export Web Quote"
      overviewTitle="Why Most Export-Import Websites Fail to Generate International Buyer Leads (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            Overseas buyers in the US, Europe, Middle East, and Southeast Asia require strict proof of product specifications, export licenses (IEC, FSSAI, APEDA, ISO), minimum order quantities (MOQs), packaging standards, and port shipping terms before placing inquiries.
          </p>
          <p>
            Unfortunately, many merchant export websites look untrustworthy, load slowly across international networks, lack detailed product specifications, and rely on passive email links rather than structured RFQ lead forms.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Export-Import Websites</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Digital Export Product Catalog</strong>: Product specs, grades, packaging & MOQs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Instant B2B Buyer RFQ Builder</strong>: Container volume, destination port & quote request</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Export Compliance & Certification Showcase</strong>: IEC, FSSAI, APEDA, ISO & Halal badges</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Global B2B Trade SEO Strategy</strong>: Rank for high-value export search queries</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s International Speed</strong>: Edge-powered serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Export Sales WhatsApp Link</strong>: Instant direct connection with trade reps</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we combine global trade understanding with <Link href="/website-development" className="text-primary font-bold hover:underline">high-speed Next.js web development</Link> and <Link href="/seo-services" className="text-primary font-bold hover:underline">international B2B search optimization</Link> to help export-import businesses generate high-margin buyer contracts.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Export-Import Websites"
      benefitsSubtitle="Engineered to establish international trade trust, present export products, and drive volume RFQs."
      benefits={[
        {
          icon: "fa-solid fa-boxes-stacked",
          title: "1. Digital Export Product Catalog",
          description: "Organize products by commodity grade, origin, purity %, shelf life, HS codes, packaging types (PP bags, drums, cartons), and MOQs.",
        },
        {
          icon: "fa-solid fa-file-invoice",
          title: "2. Overseas Buyer RFQ & Inquiry Form",
          description: "Structured form allowing buyers to select target product, required metric tonnage/container quantity, destination port, and Incoterms.",
        },
        {
          icon: "fa-solid fa-stamp",
          title: "3. Export Licenses & Certification Badge Wall",
          description: "Prominently display IEC code, APEDA, Spice Board, FSSAI, FIEO, ISO 9001, Organic, and Halal export certifications.",
        },
        {
          icon: "fa-solid fa-truck-container",
          title: "4. Port Logistics & Shipping Terms Showcase",
          description: "Detail supported seaports/airports (e.g. Chennai, JNPT, Tuticorin), vessel loading times, and Incoterms (FOB, CIF, CFR, DDP).",
        },
        {
          icon: "fa-solid fa-handshake-angle",
          title: "5. Private Labeling & Custom Packaging OEM",
          description: "Highlight custom buyer branding, pouch packaging, vacuum sealing, and private label exporting capabilities.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-plus",
          title: "6. High-Res Product & Quality Photo Gallery",
          description: "Display clear, high-resolution imagery of processed goods, raw materials, warehouse storage, and container stuffing.",
        },
        {
          icon: "fa-solid fa-earth-americas",
          title: "7. Target Export Market Overview",
          description: "Showcase country-specific supply capabilities targeting USA, UK, UAE, Saudi Arabia, Singapore, Europe, and Australia.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "8. One-Tap Export Sales WhatsApp Button",
          description: "Instant button connecting buyers directly to your trade desk pre-filled with: 'Hi, I need a FOB price quote for bulk export.'",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "9. International B2B Trade SEO",
          description: "Target high-volume search queries like 'Indian spice merchant exporter', 'Rice exporter supplier India', and 'Granite exporter Chennai'.",
        },
        {
          icon: "fa-solid fa-coins",
          title: "10. Multi-Currency & Payment Terms Overview",
          description: "Outline accepted payment methods (L/C at sight, T/T wire transfer, Advance) and multi-currency pricing support.",
        },
      ]}
      processTitle="Our 6-Step Export Website Engineering Process"
      processSubtitle="From commodity portfolio setup to live international buyer inquiries."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-globe",
          title: "Trade & Product Audit",
          description: "We analyze your export commodities, target buyer countries, shipping ports, licensing parameters, and inquiry workflow.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Product Taxonomy & Keyword Mapping",
          description: "We structure product categories, specification matrices, RFQ lead forms, and international buyer keyword maps.",
        },
        {
          step: "3",
          icon: "fa-solid fa-pen-ruler",
          title: "B2B UI/UX Design",
          description: "We craft clean, authoritative desktop and mobile interfaces built to inspire confidence in international sourcing agents.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Build",
          description: "We build your platform on modern serverless Next.js frameworks for sub-1.5s page load speeds worldwide.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "SEO & Certification Schema Setup",
          description: "We implement ExportService schema markup, configure GA4 event tracking, and sync RFQ submissions to your email.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and verify search engine indexing.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Export-Import Businesses"
      pricingSubtitle="Invest in a high-converting digital export engine with zero monthly listing commissions."
      pricingTiers={[
        {
          name: "Merchant Exporter Plan",
          price: "₹18,000",
          period: "one-time ($900 USD)",
          description: "Ideal for boutique merchant exporters, agricultural traders, and specialized commodity exporters.",
          features: [
            "1-5 Custom Responsive Pages",
            "Digital Product Catalog (Up to 20 products)",
            "Overseas Buyer RFQ Inquiry Form",
            "WhatsApp & Phone Direct Links",
            "Export Licensing & Certificate Display",
            "Port Logistics & Incoterms Section",
            "Basic Global B2B SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Merchant Exporter Plan",
        },
        {
          name: "Enterprise Trade House Portal",
          price: "₹48,000",
          period: "one-time ($2,300 USD)",
          description: "Recommended for multi-product trade houses, manufacturing exporters, and global commodity suppliers.",
          isPopular: true,
          features: [
            "Up to 15 Custom Product & Category Pages",
            "Advanced Multi-Commodity RFQ Builder",
            "Private Label & OEM Packaging Portal",
            "High-Res Product & Container Gallery",
            "Multi-Currency & Port Shipping Guide",
            "Full International B2B SEO Architecture",
            "Google Analytics 4 & Search Console Setup",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Enterprise Trade Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for an export-import business cost?",
          answer: "Our export-import website packages start from ₹18,000 ($900 USD) for merchant exporters up to ₹48,000 ($2,300 USD) for enterprise multi-product trade portals.",
        },
        {
          question: "Can overseas buyers request FOB or CIF price quotes through the website?",
          answer: "Yes! We build structured RFQ forms where buyers select target products, required metric tonnage or container count, destination port, and preferred Incoterms (FOB, CIF, DDP).",
        },
        {
          question: "Will the website help us rank on Google for international buyer searches in the US, Europe, and Middle East?",
          answer: "Yes. Every export-import website includes international B2B schema markup, technical keyword optimization, sub-1.5s page load speed, and search-optimized URLs to attract overseas buyers.",
        },
        {
          question: "Can we display our APEDA, FSSAI, IEC, and ISO export licenses?",
          answer: "Yes. We design a high-credibility Compliance & License Showcase featuring downloadable certificates and verification badges to reassure overseas buyers.",
        },
        {
          question: "Are there any monthly portal listing or transaction fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly listing fees or per-lead commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "International B2B SEO" },
        { href: "/website-for-textile-manufacturers", label: "Textile Exporter Web Dev" },
        { href: "/website-for-logistics-and-shipping", label: "Logistics & Freight Web Dev" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Export Desk" },
      ]}
    />
  );
}
