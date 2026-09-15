import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import ExportLeadForm from "@/components/ui/ExportLeadForm";

export const metadata: Metadata = {
  title: "B2B Export Web Development Services | Joy Digital",
  description: "Enterprise digital platforms and B2B trade engines for global export-import houses. We build high-converting Global Trade Portals, International B2B Sourcing platforms, and Digital Product Catalogs.",
  keywords: [
    "B2B Export Web Development Services",
    "Global Trade Portal",
    "Digital Product Catalog",
    "International B2B Sourcing",
    "International B2B Trade SEO Architecture"
  ],
  alternates: {
    canonical: "https://joydigital.in/website-for-export-and-import",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-export-and-import",
    title: "Enterprise Digital Platforms for Global Export-Import Houses | Joy Digital",
    description: "Connect directly with international buyers. We build ultra-fast Next.js B2B web portals with custom RFQ engines and International B2B Trade SEO Architecture.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Export Import Business Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-export-and-import#service",
      "name": "B2B Export Web Development Services & International Trade SEO",
      "serviceType": "B2B Export Web Development Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Joy Digital",
        "image": "https://joydigital.in/assets/images/logo.webp",
        "telephone": "+919080026133",
        "url": "https://joydigital.in",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Old Perungalathur",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600063",
          "addressCountry": "IN"
        }
      },
      "description": "Custom web architecture for Global B2B Export-Import Houses. Features International B2B Sourcing & RFQ Engine, Global Trade Portal & Digital Product Catalog, and Export Compliance Showcase.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "900",
        "highPrice": "2300",
        "offerCount": "2"
      }
    }
  ]
};

export default function ExportImportWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Global B2B Export Portals"
      heroTitle="Enterprise Digital Platforms & B2B Trade Engines for Global Export-Import Houses"
      heroSubtitle="Connect directly with international buyers, sourcing networks, and institutional distributors. We build ultra-fast, search-optimized Next.js B2B web portals with custom RFQ engines, digital product catalogs, and international B2B SEO."
      leadSource="B2B Export Engine Landing Page"
      customLeadForm={<ExportLeadForm />}
      overviewTitle="Why Legacy Export Websites Fail the Global Trust Test"
      overviewContent={
        <div className="space-y-6">
          <p>
            When international institutional buyers, global distributors, and commodity sourcing agents evaluate new suppliers, their first touchpoint is digital. A slow, outdated website instantly disqualifies you. High-value international buyers demand strict <strong>Global Sourcing Compliance</strong>, clear product grades, OEM private label capabilities, and secure RFQ data handling before they ever engage.
          </p>
          <p>
            At Joy Digital, we provide premium <strong>B2B Export Web Development Services</strong> engineered specifically for multi-product trade houses and merchant exporters. We don't build generic brochures; we engineer highly scalable <strong>Global Trade Portal & Digital Product Catalogs</strong> that convert anonymous global traffic into verified, multi-container RFQ leads.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">Enterprise Architecture Built for Global Trade</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Interactive RFQ & Container Volume Estimator</strong> (FOB, CIF, CFR Incoterms 2020)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Multi-Currency & Port Logistics Showcase</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Digital Quality & Compliance Vault</strong> (ISO, FSSAI, APEDA, Halal, Organic Badges)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Private Labeling & OEM Packaging Portals</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>International B2B Trade SEO Architecture</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Global Loading Speed</strong> (Edge-Serverless CDN Nodes)</span>
              </li>
            </ul>
          </div>
        </div>
      }
      benefitsTitle="Core Capabilities of an Enterprise Export Engine"
      benefitsSubtitle="We equip global trade houses with the digital infrastructure required to close high-volume B2B contracts."
      benefits={[
        {
          icon: "fa-solid fa-boxes-stacked",
          title: "Digital Product Catalog & Taxonomy",
          description: "Structure complex agricultural or industrial commodities by HS codes, purity grades, and MOQ specifications for rapid buyer navigation.",
        },
        {
          icon: "fa-solid fa-file-invoice",
          title: "International B2B Sourcing & RFQ Engine",
          description: "Deploy advanced, multi-step RFQ workflows allowing sourcing agents to specify container loads and Incoterms 2020 instantly.",
        },
        {
          icon: "fa-solid fa-stamp",
          title: "Export Compliance & Incoterms Showcase",
          description: "Build global trust instantly with a dedicated vault displaying APEDA, ISO, Halal, Organic certifications, and export licensing.",
        },
        {
          icon: "fa-solid fa-truck-container",
          title: "Multi-Currency & Port Logistics",
          description: "Highlight global shipping capabilities, supported origin ports, and multi-currency pricing models (L/C, T/T wire transfers).",
        },
        {
          icon: "fa-solid fa-handshake-angle",
          title: "Private Labeling & OEM Portals",
          description: "Showcase robust B2B manufacturing capabilities, custom pouching, vacuum sealing, and white-label branding for international retail distributors.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "International B2B Trade SEO",
          description: "Dominate search engine rankings globally for high-intent commodity sourcing queries using our proprietary technical SEO architecture.",
        },
      ]}
      processTitle="Our Enterprise Export Architecture Process"
      processSubtitle="Deploying high-speed global sourcing platforms from strategy to international launch."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-globe",
          title: "Global Compliance Audit",
          description: "We map your specific commodity matrices, required export certifications, target shipping routes, and OEM capabilities.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "B2B Trade SEO & Taxonomy",
          description: "We structure your digital catalog hierarchy around high-value international buyer search queries and HSN/HS codes.",
        },
        {
          step: "3",
          icon: "fa-solid fa-code",
          title: "Next.js Global Edge Compilation",
          description: "We engineer a blazing-fast Jamstack frontend, ensuring sub-1.5s load times for buyers in the US, Europe, Middle East, and APAC.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "RFQ Integration & Go-Live",
          description: "We deploy custom RFQ data pipelines, configure international hreflang schemas, and push the platform live on global CDNs.",
        },
      ]}
      pricingTitle="B2B Export Trade Engine Retainers (Priced in USD)"
      pricingSubtitle="Invest in a high-converting digital export asset with zero commission fees. (Indian partners: ₹ INR equivalent available)."
      pricingTiers={[
        {
          name: "Merchant Exporter Plan",
          price: "$900 USD",
          period: "one-time (approx. ₹75,000 INR)",
          description: "Ideal for boutique merchant exporters and specialized single-commodity traders scaling globally.",
          features: [
            "Advanced Responsive Next.js Architecture",
            "Digital Product Catalog (Up to 25 items)",
            "International B2B Sourcing & RFQ Engine",
            "Export Compliance & Incoterms Showcase",
            "Basic B2B Trade SEO Implementation",
            "Sub-1.5s Global CDN Edge Delivery",
          ],
          ctaText: "Start Merchant Platform",
        },
        {
          name: "Global Enterprise Trade House Portal",
          price: "$2,300 USD",
          period: "one-time (approx. ₹1,90,000 INR)",
          description: "Recommended for multi-product trade houses, manufacturing exporters, and global commodity distributors.",
          isPopular: true,
          features: [
            "Unlimited Scalable Category Architecture",
            "Interactive Container Volume Estimator",
            "Private Labeling & OEM Packaging Portals",
            "Multi-Currency & Port Logistics Showcase",
            "Advanced International B2B Trade SEO",
            "Digital Quality & Compliance Vault Setup",
          ],
          ctaText: "Deploy Enterprise Portal",
        },
      ]}
      faqs={[
        {
          question: "How is a B2B Export Portal different from a standard website?",
          answer: "Standard websites are informational brochures. A B2B Export Portal is an interactive trade engine equipped with Digital Product Catalogs, International RFQ Builders, Incoterms 2020 workflows, and strict Export Compliance Showcases designed to convert institutional international buyers.",
        },
        {
          question: "How does the International B2B Sourcing & RFQ Engine work?",
          answer: "We engineer custom multi-step forms where global sourcing agents can select exact commodity grades, input container load volumes (20ft/40ft), choose their destination port, and select their preferred Incoterms (e.g., FOB, CIF) before submitting a secure inquiry directly to your sales team.",
        },
        {
          question: "Why is sub-1.5s global loading speed important for exporters?",
          answer: "Your buyers are located in the US, Europe, Middle East, and APAC. If your site is hosted on a slow local server, it will take 5-10 seconds to load overseas, causing high bounce rates. We use Next.js and Edge-Serverless CDN Nodes to guarantee sub-1.5s load times worldwide.",
        },
        {
          question: "Can you feature our OEM and Private Label capabilities?",
          answer: "Absolutely. We build dedicated Private Labeling & OEM Packaging Portals within your site to showcase custom pouching, vacuum sealing, and white-label branding—crucial for securing high-volume retail distributor contracts.",
        },
        {
          question: "Will this platform help with International B2B Trade SEO?",
          answer: "Yes. Our architecture is built with semantic HTML, ExportService JSON-LD schema, and advanced B2B keyword mapping to ensure you rank highly on Google for targeted global sourcing queries like 'Bulk Spices Supplier India' or 'FOB Apparel Manufacturer'.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/static-website-development", label: "Enterprise Jamstack Development" },
        { href: "/seo-services", label: "Enterprise B2B SEO Services" },
        { href: "/website-for-logistics-and-shipping", label: "Global Logistics Web Dev" },
      ]}
    />
  );
}
