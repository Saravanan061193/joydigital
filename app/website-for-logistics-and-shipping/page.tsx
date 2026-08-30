import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Logistics & Shipping Website Design | Freight Forwarding SEO | Joy Digital",
  description: "High-converting website design & digital marketing for logistics companies, freight forwarders, 3PL providers, and shipping lines. Features cargo tracking, instant freight rate calculators, and logistics SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-logistics-and-shipping",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-logistics-and-shipping",
    title: "Logistics & Shipping Website Design & Freight Lead Generation | Joy Digital",
    description: "Ultra-fast Next.js website design for freight forwarders, 3PL warehousing providers, and cargo shipping lines. Includes freight quote forms, shipment tracking widgets, and international search ranking.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Logistics & Shipping Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-logistics-and-shipping#service",
      "name": "Logistics & Shipping Website Design & Freight SEO",
      "serviceType": "Logistics Web Development & Freight Forwarding Marketing",
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
      "description": "Custom web development for freight forwarders, 3PL warehousing operators, air/sea cargo carriers, and logistics providers. Includes instant freight quote forms, container tracking tools, and international SEO.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "20000",
        "highPrice": "55000",
        "offerCount": "2"
      }
    }
  ]
};

export default function LogisticsWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Logistics & Shipping"
      heroTitle="High-Converting Website Design & SEO for Logistics & Freight Companies"
      heroSubtitle="Capture high-volume ocean freight, air cargo, and 3PL warehousing inquiries. We build fast, reliable Next.js websites for freight forwarders, custom brokers, supply chain operators, and international shipping lines."
      leadSource="Website for Logistics & Shipping Landing Page"
      heroCtaText="Get Free Freight Web Quote"
      overviewTitle="Why Most Freight & Logistics Websites Fail to Convert Global Shippers (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            Importers, exporters, and supply chain managers require fast, reliable information when selecting logistics partners—evaluating trade lane coverage, container options (FCL/LCL), customs clearance speed, and tracking transparency.
          </p>
          <p>
            Unfortunately, many logistics websites suffer from clunky navigation, broken container tracking widgets, hidden rate inquiry options, and slow loading speeds across mobile trade networks.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Freight & Logistics Websites</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Instant Freight Rate RFQ Form</strong>: Origin/Destination port selection & weight inputs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Container & Cargo Tracking Widget</strong>: Quick AWB/Container number lookup interface</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Trade Lane & Route Network Showcase</strong>: Sea ports, airports & road transport hubs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Global Logistics SEO Strategy</strong>: Rank for high-value freight forwarding terms</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Speed Performance</strong>: Edge-served serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Operations WhatsApp Routing</strong>: Instant connection with regional booking desks</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we combine supply chain domain expertise with <Link href="/website-development" className="text-primary font-bold hover:underline">high-speed Next.js web development</Link> and <Link href="/seo-services" className="text-primary font-bold hover:underline">logistics B2B search optimization</Link> to help freight operators capture international cargo contracts.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Logistics Websites"
      benefitsSubtitle="Designed to simplify shipping rate quotes, demonstrate global coverage, and convert cargo leads."
      benefits={[
        {
          icon: "fa-solid fa-calculator",
          title: "1. Instant Freight Rate Quote Builder",
          description: "Allow shippers to select shipment type (Air Freight, FCL Ocean, LCL Consolidations, Road Transport), origin/destination ports, cargo weight, and volume (CBM).",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "2. Cargo & AWB Tracking Integration",
          description: "Embed intuitive container and airway bill tracking search boxes linking directly to carrier APIs or tracking portals.",
        },
        {
          icon: "fa-solid fa-ship",
          title: "3. Air, Sea & Land Freight Sections",
          description: "Dedicated landing pages detailing air cargo charters, Full Container Load (FCL), Less than Container Load (LCL), and cross-border trucking.",
        },
        {
          icon: "fa-solid fa-warehouse",
          title: "4. 3PL Warehousing & Fulfillment Showcase",
          description: "Highlight bonded warehousing, cold storage capabilities, inventory management systems, and pick-and-pack services.",
        },
        {
          icon: "fa-solid fa-stamp",
          title: "5. Customs Clearance & Compliance Guide",
          description: "Promote customs brokerage services, import/export documentation clearance, duty calculation assistance, and port clearance speed.",
        },
        {
          icon: "fa-solid fa-earth-americas",
          title: "6. Interactive Trade Lane Map",
          description: "Visual route map highlighting major seaport connections (Asia, Europe, Middle East, Americas), airport hubs, and partner agent networks.",
        },
        {
          icon: "fa-solid fa-shield-cat",
          title: "7. Cargo Insurance & Risk Protection",
          description: "Educate shippers on marine cargo insurance coverage, transit protection policies, and claims process workflows.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "8. One-Tap Booking Desk WhatsApp Button",
          description: "Instant button connecting shippers with booking managers pre-filled with: 'Hi, I need a freight rate quote for container shipment.'",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "9. International Freight SEO Strategy",
          description: "Target intent-rich queries like 'Freight forwarder in Chennai', 'Air cargo company Madurai', and 'Ocean freight agent India'.",
        },
        {
          icon: "fa-solid fa-file-invoice-dollar",
          title: "10. Downloadable Incoterms 2020 Guide",
          description: "Provide helpful Incoterms cheat sheets (FOB, CIF, DDP, EXW, FCA) to educate shippers and capture email leads.",
        },
      ]}
      processTitle="Our 6-Step Logistics Web Engineering Process"
      processSubtitle="A structured approach to building high-converting freight portals."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-clipboard-list",
          title: "Operations & Route Audit",
          description: "We audit your freight services, primary trade lanes, port connections, customs brokerage capacity, and booking workflow.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Taxonomy & Port Keyword Mapping",
          description: "We structure freight category pages, rate quote calculators, tracking lookup fields, and international logistics SEO terms.",
        },
        {
          step: "3",
          icon: "fa-solid fa-pen-ruler",
          title: "B2B UI/UX Design",
          description: "We design clean, authoritative desktop and mobile interfaces built for fast navigation by busy freight coordinators.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Portal Build",
          description: "We build your platform on serverless Next.js frameworks for sub-1.5s page load speeds across global port networks.",
        },
        {
          step: "5",
          icon: "fa-solid fa-diagram-project",
          title: "SEO & Rate Form Integration",
          description: "We implement LogisticsService schema markup, configure GA4 event tracking, and sync rate quote submissions to your inbox.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and verify search engine indexing.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Logistics Companies"
      pricingSubtitle="Get a modern, high-converting freight portal with zero ongoing monthly software commissions."
      pricingTiers={[
        {
          name: "Freight Forwarder Plan",
          price: "₹20,000",
          period: "one-time ($1,000 USD)",
          description: "Ideal for regional freight forwarders, customs brokers, and specialized cargo booking agencies.",
          features: [
            "1-6 Custom Responsive Pages",
            "Structured Freight Rate Quote RFQ Form",
            "Air, Ocean & Land Transport Sections",
            "Cargo Tracking Integration Field",
            "WhatsApp & Phone Direct Links",
            "Trade Lane & Port Network Showcase",
            "Basic Logistics SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Freight Forwarder Plan",
        },
        {
          name: "Enterprise Shipping Portal",
          price: "₹55,000",
          period: "one-time ($2,600 USD)",
          description: "Recommended for international logistics providers, 3PL warehousing companies, and ocean fleet operators.",
          isPopular: true,
          features: [
            "Up to 20 Custom Service & Trade Lane Pages",
            "Advanced Multi-Mode Freight Rate Calculator Widget",
            "Interactive Container & AWB Tracking Integration",
            "3PL Warehousing & Cold Storage Portals",
            "Incoterms Guide & Downloadable Resource Hub",
            "Full International SEO & Trade Lane Targeting",
            "Google Analytics 4 & Search Console Setup",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Enterprise Shipping Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a logistics company cost?",
          answer: "Our logistics website packages start from ₹20,000 ($1,000 USD) for regional freight forwarders up to ₹55,000 ($2,600 USD) for enterprise 3PL shipping portals.",
        },
        {
          question: "Can shippers request instant freight rate quotes on the website?",
          answer: "Yes! We build custom freight quote RFQ forms allowing shippers to select origin/destination ports, cargo dimensions (CBM), gross weight, and container requirements.",
        },
        {
          question: "Can we integrate container and airway bill (AWB) tracking on the website?",
          answer: "Yes. We can integrate cargo tracking lookup boxes linking directly to shipping line APIs or third-party tracking portals so your clients can monitor shipments easily.",
        },
        {
          question: "Will the website help us rank on Google for freight forwarding keywords?",
          answer: "Yes. Every logistics website includes LogisticsService schema markup, fast sub-1.5s page load speed, search-optimized trade lane URLs, and keywords to rank for local and international cargo searches.",
        },
        {
          question: "Are there any monthly listing or platform fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly portal subscription fees or per-quote commission charges.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Logistics B2B SEO" },
        { href: "/website-for-export-and-import", label: "Export & Import Web Dev" },
        { href: "/website-for-manufacturing-companies", label: "Manufacturing Web Dev" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Booking Desk" },
      ]}
    />
  );
}
