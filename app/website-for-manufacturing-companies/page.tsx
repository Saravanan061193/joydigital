import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manufacturing Company Website Design & Industrial B2B SEO | Joy Digital",
  description: "High-converting website design and digital lead portals for manufacturing companies, industrial OEMs, engineering factories, and automated plants. Features RFQ builders, machinery catalogs, and B2B search ranking.",
  alternates: {
    canonical: "https://joydigital.in/website-for-manufacturing-companies",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-manufacturing-companies",
    title: "Manufacturing Company Website Design & Industrial Lead Generation | Joy Digital",
    description: "High-performance Next.js web development for manufacturing plants, industrial OEMs, and precision engineering firms. Features CAD/drawing upload RFQ forms, ISO certification displays, and global B2B SEO.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Manufacturing Company Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-manufacturing-companies#service",
      "name": "Manufacturing Company Website Design & Industrial B2B SEO",
      "serviceType": "Industrial Web Development & Manufacturing B2B Marketing",
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
      "description": "Custom industrial web design for manufacturing plants, heavy machinery OEMs, contract fabricators, and precision engineering vendors. Includes file upload RFQ forms, machine spec tables, and B2B search engine optimization.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "20000",
        "highPrice": "60000",
        "offerCount": "3"
      }
    }
  ]
};

export default function ManufacturingWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Manufacturing Companies"
      heroTitle="High-Converting Website Design & B2B Industrial SEO for Manufacturing Companies"
      heroSubtitle="Transform your factory's online presence into a 24/7 lead generation engine. We build fast, technical Next.js websites for industrial manufacturers, CNC precision machinists, OEM suppliers, and heavy equipment plants."
      leadSource="Website for Manufacturing Companies Landing Page"
      heroCtaText="Get Free Industrial Web Quote"
      overviewTitle="Why Most Manufacturing Factory Websites Fail to Generate B2B Inquiries (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            Industrial procurement officers, B2B sourcing managers, and engineering leads search the web with strict technical criteria—inspecting tolerance limits, material grades, machine tonnage, ISO accreditations, and production capacities before reaching out.
          </p>
          <p>
            Unfortunately, most manufacturing websites look outdated, take over 5 seconds to load, hide machinery specs in clunky PDFs, and lack direct CAD file upload forms or instant WhatsApp inquiry options.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Performing Industrial Manufacturing Websites</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>B2B RFQ with CAD/STEP File Upload</strong>: Direct drawing attachment for engineering quotes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Interactive Equipment & Machinery Catalog</strong>: CNC, VMC, laser cutting & press capacity</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>ISO & Quality Badge Wall</strong>: ISO 9001, IATF 16949, AS9100, CE & RoHS showcase</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Industrial Search SEO Strategy</strong>: Rank for OEM manufacturing terms locally & globally</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speed Architecture</strong>: Edge-powered Next.js build</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sales Engineering WhatsApp Routing</strong>: Instant connection with factory estimators</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we merge technical industrial domain understanding with <Link href="/website-development" className="text-primary font-bold hover:underline">high-speed Next.js web development</Link> and <Link href="/seo-services" className="text-primary font-bold hover:underline">industrial B2B search optimization</Link> to help manufacturing businesses scale contract volume.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Manufacturing Websites"
      benefitsSubtitle="Engineered to establish technical credibility, highlight production capacity, and capture qualified industrial RFQs."
      benefits={[
        {
          icon: "fa-solid fa-file-contract",
          title: "1. Interactive B2B RFQ & Drawing Upload Form",
          description: "Allow prospective buyers to upload CAD, STEP, PDF, or DWG drawings alongside batch volume and material specifications.",
        },
        {
          icon: "fa-solid fa-industry",
          title: "2. Equipment & Machinery Fleet Showcase",
          description: "Detail your shop floor capabilities, including 5-axis CNC machining, VMC units, laser cutting wattage, and automated stamping presses.",
        },
        {
          icon: "fa-solid fa-award",
          title: "3. ISO & Quality Compliance Badges",
          description: "Highlight ISO 9001:2015, IATF 16949 (Automotive), AS9100 (Aerospace), CE, and RoHS certifications prominently.",
        },
        {
          icon: "fa-solid fa-cubes",
          title: "4. Material Grade & Capability Matrix",
          description: "Display supported metals, polymers, composites, surface treatments (anodizing, powder coating, plating), and heat treatments.",
        },
        {
          icon: "fa-solid fa-diagram-project",
          title: "5. Contract Manufacturing & OEM/ODM Sections",
          description: "Dedicated landing pages highlighting custom prototype development, low-volume trial runs, and high-volume mass production capabilities.",
        },
        {
          icon: "fa-solid fa-vial-circle-check",
          title: "6. Quality Control & Testing Lab Showcase",
          description: "Demonstrate CMM inspection, spectro-analysis, tensile testing, and zero-defect QA protocols to reassure procurement heads.",
        },
        {
          icon: "fa-solid fa-truck-ramp-box",
          title: "7. Supply Chain & Export Logistics Guide",
          description: "Provide clear information on packaging standards, container loading capabilities, Incoterms (FOB/CIF/DDP), and port connections.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "8. Direct Sales Engineering WhatsApp Integration",
          description: "One-tap mobile link opening WhatsApp pre-filled with: 'Hi, I would like to submit a drawing for custom manufacturing RFQ.'",
        },
        {
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "9. Industrial B2B Search Keywords",
          description: "Target high-value queries like 'Custom CNC machining manufacturer', 'Sheet metal fabrication plant', and 'Industrial pump OEM exporter'.",
        },
        {
          icon: "fa-solid fa-file-pdf",
          title: "10. Downloadable Product Specs & Brochure Library",
          description: "Provide easy, gated or ungated access to technical data sheets, MSDS documents, and full factory capability brochures.",
        },
      ]}
      processTitle="Our 6-Step Industrial Web Engineering Process"
      processSubtitle="From shop floor audit to live search engine lead generation."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-list-check",
          title: "Factory & Capability Audit",
          description: "We audit your manufacturing machinery, target industry sectors (auto, defense, pharma, energy), and buyer inquiry workflow.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Taxonomy & Technical Mapping",
          description: "We structure product categories, material specification grids, RFQ file dropzones, and industrial SEO keyword maps.",
        },
        {
          step: "3",
          icon: "fa-solid fa-pen-ruler",
          title: "B2B UI/UX Engineering",
          description: "We craft clean, authoritative desktop and mobile interfaces that reflect technical precision and factory scale.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Portal Build",
          description: "We build your website on modern serverless Next.js frameworks for sub-1.5s loading speeds across all device types.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "Industrial SEO & Schema Setup",
          description: "We implement Manufacturing Service schema, set up GA4 lead tracking, and sync file-upload RFQ forms to your sales inbox.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch on your custom domain, submit XML sitemaps to Google Search Console, and verify search engine indexing.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Manufacturing Companies"
      pricingSubtitle="Get a modern industrial website with zero recurring platform commission fees."
      pricingTiers={[
        {
          name: "Industrial Exporter Plan",
          price: "₹20,000",
          period: "one-time ($1,000 USD)",
          description: "Ideal for specialized machining units, component fabricators, and regional OEM vendors.",
          features: [
            "1-6 Custom Responsive Pages",
            "B2B Drawing Upload RFQ Form",
            "Machinery & Equipment Spec Section",
            "WhatsApp Sales Integration",
            "ISO Quality Certification Display",
            "Factory Photo & Video Gallery",
            "Basic Industrial SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Industrial Exporter Plan",
        },
        {
          name: "Enterprise Plant Portal",
          price: "₹40,000",
          period: "one-time ($2,000 USD)",
          description: "Recommended for integrated manufacturing plants, heavy machinery OEMs, and contract exporters.",
          isPopular: true,
          features: [
            "Up to 15 Custom Pages & Category Sections",
            "Advanced Multi-File CAD/STEP RFQ Builder",
            "Interactive Material Grade & Spec Filter",
            "Quality Control Lab & Testing Showcase",
            "Technical Data Sheet PDF Download Hub",
            "Full Industrial SEO & Multi-Country Targeting",
            "Google Analytics 4 Lead Event Tracking",
            "1 Year Priority Technical Support & Maintenance",
          ],
          ctaText: "Choose Enterprise Plan",
        },
        {
          name: "Custom OEM Ecosystem",
          price: "₹60,000",
          period: "one-time ($3,000 USD)",
          description: "Designed for large manufacturing conglomerates, multi-plant groups, and global industrial brands.",
          features: [
            "Unlimited Custom Pages & Multi-Plant Portals",
            "Interactive 3D Equipment / Product Viewer",
            "Automated Multi-Language Setup",
            "Custom ERP / CRM Lead API Sync",
            "Dedicated B2B Industrial Content Strategy",
            "Sub-1.0s Global CDN Edge Hosting Config",
            "SLA Maintenance & Priority Support",
          ],
          ctaText: "Choose Custom Ecosystem",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a manufacturing company cost?",
          answer: "Our industrial manufacturing website packages start from ₹20,000 ($1,000 USD) for specialized machine shops up to ₹60,000 ($3,000 USD) for multi-plant manufacturing portals.",
        },
        {
          question: "Can buyers upload 2D and 3D CAD drawings (STEP, DWG, PDF) for RFQ quotes?",
          answer: "Yes! We build secure B2B RFQ quote request forms with file attachment fields supporting STEP, IGES, DXF, DWG, PDF, and ZIP archives directly sent to your sales engineering team.",
        },
        {
          question: "Will the website help us rank on Google for industrial B2B buyers?",
          answer: "Yes. Every manufacturing website we build includes industrial schema markup, technical keyword optimization, sub-1.5s page load speed, and search-optimized URL structures to attract procurement heads.",
        },
        {
          question: "Can we update our machine fleet and product specifications ourselves?",
          answer: "Yes. We provide an intuitive CMS dashboard so your team can add new machinery, update tonnage specs, post case studies, and upload new data sheets anytime.",
        },
        {
          question: "Are there any monthly listing or platform fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly listing fees or transaction commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Industrial B2B SEO" },
        { href: "/website-for-textile-manufacturers", label: "Textile Manufacturing" },
        { href: "/offshore-web-development-partner", label: "Global Web Partner" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Sales Engineering" },
      ]}
    />
  );
}
