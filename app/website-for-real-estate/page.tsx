import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Real Estate Website Development & SEO | Joy Digital",
  description: "High-converting real estate website design and development built for lead generation. Features property listings, WhatsApp sync, and map search.",
  alternates: {
    canonical: "https://joydigital.in/website-for-real-estate",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-real-estate",
    title: "Real Estate Website Design & Development | Joy Digital",
    description: "High-converting real estate website design and development built for lead generation. Features property search, WhatsApp integration, maps, and SEO to attract buyers.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Real Estate Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-real-estate#service",
      "name": "Real Estate Website Design & Development",
      "serviceType": "Real Estate Web Development",
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
      "description": "Custom real estate website design and web development for brokers, agencies, and property developers. Includes property search filters, WhatsApp leads, and local SEO.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "15000",
        "highPrice": "35000",
        "offerCount": "2"
      }
    }
  ]
};

export default function RealEstateWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Real Estate"
      heroTitle="High-Converting Real Estate Website Design & SEO"
      heroSubtitle="Stop relying strictly on expensive listing portals where you share leads with competitors. Own a high-performing property website that showcases your apartments, villas, plots, and commercial projects while converting search traffic directly into site visit bookings and WhatsApp enquiries."
      leadSource="Website for Real Estate Landing Page"
      heroCtaText="Get Free Real Estate Quote"
      overviewTitle="Why Most Real Estate Websites Fail to Generate Enquiries (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            In the property market, your website is often the first interaction a buyer has with your brand. Yet, most real estate websites operate like digital brochures — pretty to look at, but ineffective at starting conversations.
          </p>
          <p>
            If your website suffers from complex navigation, slow image loading, generic contact forms, or poor mobile responsiveness, you are likely losing qualified property buyers to competitors. A buyer interested in a high-value property will not struggle through a clunky website; if getting information takes effort, they will move on.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds Real Estate Websites for Conversion</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Mobile-First UX Strategy</strong>: Thumb-friendly filters & sticky contact bars</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Property WhatsApp Routing</strong>: Direct chat pre-filled with property title</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>SEO-Ready Architecture</strong>: Property schema & dynamic URL paths</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Built on modern serverless Next.js engine</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we build custom lead-generation engines tailored to how modern property buyers make decisions. Combine our expert <Link href="/website-development" className="text-primary font-bold hover:underline">custom web development</Link> with targeted <Link href="/seo-services" className="text-primary font-bold hover:underline">real estate SEO services</Link> and <Link href="/google-business-profile-setup" className="text-primary font-bold hover:underline">Google Business Profile citations</Link> to dominate local search results.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Real Estate Website Features We Build"
      benefitsSubtitle="Every component is engineered to establish immediate buyer trust and drive direct site visit bookings."
      benefits={[
        {
          icon: "fa-solid fa-filter",
          title: "1. Advanced Property Search Filter",
          description: "Filter listings by location, price, property type (Apartment, Villa, Plot), bedrooms, and construction status instantly.",
        },
        {
          icon: "fa-solid fa-images",
          title: "2. Photo Galleries & Virtual Tours",
          description: "Multi-image viewports, high-resolution downloadable PDF floor plans, master layouts, and embedded 360° virtual video walkthroughs.",
        },
        {
          icon: "fa-solid fa-list-check",
          title: "3. Detailed Property Specification Cards",
          description: "Present RERA registration number, price per sq. ft., total area, possession date, furnishing status, and amenities upfront.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "4. Property-Specific WhatsApp Leads",
          description: "One click opens WhatsApp with a pre-filled message: 'Hi, I am interested in [Property Title]. Please share availability.'",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "5. Google Maps & Landmark Distances",
          description: "Interactive map pins highlighting distance to nearby schools, hospitals, IT parks, metro stations, and highways.",
        },
        {
          icon: "fa-solid fa-calendar-check",
          title: "6. 'Schedule Site Visit' Lead Capture",
          description: "Streamlined 3-field form allowing prospective buyers to choose a preferred date and time for an in-person viewing.",
        },
        {
          icon: "fa-solid fa-file-pdf",
          title: "7. Gated Project Brochure Downloads",
          description: "Capture prospect phone number and email in exchange for instant access to high-res project brochure files.",
        },
        {
          icon: "fa-solid fa-id-card",
          title: "8. Agent & Branch Location Pages",
          description: "Dedicated profile pages for team members and regional offices featuring photos, direct contact links, and active listings.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "9. SEO Category & Location Pages",
          description: "Target search queries like 'Apartments for sale in Chennai' or 'Villas in Madurai' with dedicated landing pages.",
        },
        {
          icon: "fa-solid fa-sliders",
          title: "10. Easy Property Admin Panel",
          description: "Simple CMS dashboard allowing your team to add, update, archive, or mark properties as sold without coding.",
        },
      ]}
      processTitle="Our 6-Step Real Estate Website Development Process"
      processSubtitle="A proven roadmap from initial strategy to live search engine indexing."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-clipboard-list",
          title: "Business & Inventory Audit",
          description: "We analyze your target market, property portfolio, pricing model, and sales team lead handling.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "UX & Search Architecture",
          description: "We map out user flows, listing categories, property filter taxonomies, and target SEO keywords.",
        },
        {
          step: "3",
          icon: "fa-solid fa-pen-ruler",
          title: "Custom UI/UX Design",
          description: "We craft modern desktop and mobile layouts, property cards, brochure views, and booking forms.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js Web Development",
          description: "We code your site using serverless Next.js frameworks for sub-1.5s loading speed and responsive galleries.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "SEO & Lead Tracking Setup",
          description: "We implement RealEstate schema, configure GA4 event tracking, and test WhatsApp lead routing.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Team Training",
          description: "We deploy live on custom domain, submit XML sitemaps to Google, and train your team on updates.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages"
      pricingSubtitle="Get a custom, high-converting property website with zero monthly listing fees or portal commissions."
      pricingTiers={[
        {
          name: "Standard Broker Portfolio",
          price: "₹15,000",
          period: "one-time",
          description: "Perfect for independent real estate agents, brokers, and local property consultants.",
          features: [
            "1-5 Custom Responsive Pages",
            "Up to 15 Active Property Listings",
            "Property Search & Filter System",
            "WhatsApp Lead Integration",
            "Schedule Site Visit Booking Form",
            "Google Maps Local Citation Setup",
            "Basic On-Page SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Standard Plan",
        },
        {
          name: "Premium Agency & Developer Funnel",
          price: "₹35,000",
          period: "one-time",
          description: "Recommended for property consulting groups, builders, and developers with multiple active projects.",
          isPopular: true,
          features: [
            "Up to 15 Advanced Pages & Location Landing",
            "Unlimited Property Listings & Categories",
            "Gated Brochure PDF Download Capture",
            "Agent & Regional Branch Profile Pages",
            "Custom EMI Calculator Widget",
            "Full SEO Architecture & Schema Setup",
            "Google Analytics 4 & Search Console Sync",
            "1 Year Priority Technical Support & Maintenance",
          ],
          ctaText: "Choose Premium Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a custom real estate website cost?",
          answer: "The investment depends on your property inventory size and custom features. Joy Digital offers transparent packages starting from ₹15,000 for independent brokers up to ₹35,000 for multi-project developer portals.",
        },
        {
          question: "Can buyers schedule site visits directly through the website?",
          answer: "Yes! We install interactive site visit booking forms where buyers select their preferred viewing date and time. Enquiries route directly to your email and mobile WhatsApp.",
        },
        {
          question: "How does WhatsApp integration work on property listings?",
          answer: "Clicking the WhatsApp button on any listing opens WhatsApp with a pre-filled message including property title, ID, and URL, so your sales agent immediately knows what the customer wants to view.",
        },
        {
          question: "Can we manage and update property listings ourselves?",
          answer: "Yes. We provide a simple, user-friendly CMS admin panel. Your team can add new listings, upload photos, update prices, or mark properties as 'Sold' without touching code.",
        },
        {
          question: "Will the website rank on Google for local property searches?",
          answer: "Yes. We construct every real estate website with search-friendly URLs, fast sub-1.5s loading performance, structured schema markup, and localized landing pages.",
        },
        {
          question: "Do we have to pay monthly listing fees or commissions?",
          answer: "No. Unlike third-party real estate listing portals, you own 100% of your website code and database. There are zero monthly listing fees or recurring developer commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Real Estate SEO Services" },
        { href: "/local-seo-services", label: "Local SEO Solutions" },
        { href: "/google-business-profile-setup", label: "Google Business Profile Setup" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/blog/real-estate-website-design-features", label: "Read Real Estate Web Design Guide" },
        { href: "/contact", label: "Contact Sales Team" },
      ]}
    />
  );
}
