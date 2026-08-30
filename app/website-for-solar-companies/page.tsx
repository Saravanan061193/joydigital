import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solar Company Website Design & SEO | Joy Digital",
  description: "High-converting website design and web development for solar companies, EPC contractors, and rooftop installers. Features quote forms, WhatsApp leads, and local SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-solar-companies",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-solar-companies",
    title: "Solar Company Website Design & Lead Generation | Joy Digital",
    description: "High-converting website design and web development built for solar installers and EPC contractors. Includes rooftop quote forms, WhatsApp integration, and local SEO to capture inquiries.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Solar Company Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-solar-companies#service",
      "name": "Solar Company Website Design & Development",
      "serviceType": "Solar Web Development & SEO",
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
      "description": "Custom solar company website design and web development for rooftop solar installers, EPC contractors, and commercial solar vendors. Includes lead capture forms, solar savings guides, and local SEO.",
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

export default function SolarWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Solar Companies"
      heroTitle="High-Converting Website Design & SEO for Solar Companies"
      heroSubtitle="Convert rooftop solar interest into direct site survey bookings and WhatsApp inquiries. We build fast, search-ready Next.js websites for residential & commercial solar installers, EPC contractors, and solar equipment distributors."
      leadSource="Website for Solar Companies Landing Page"
      heroCtaText="Get Free Solar Web Quote"
      overviewTitle="Why Most Solar Installer Websites Fail to Generate Inquiries (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            With electricity tariffs rising and government initiatives like PM Surya Ghar boosting adoption, residential homeowners and industrial businesses are actively searching for reliable local solar installers. However, most solar websites fail because they act like static brochure sites rather than active sales funnels.
          </p>
          <p>
            If your solar website suffers from slow loading speeds, confusing technical jargon, lack of pricing transparency, or missing mobile WhatsApp lead buttons, potential clients will bounce to competing solar vendors in your city.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Solar Websites</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Instant Quote Lead Forms</strong>: Monthly bill & rooftop area estimation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Direct WhatsApp Integration</strong>: One-tap chat pre-filled with KW requirement</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Local Solar SEO Strategy</strong>: Rank for local installation keywords</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Built on ultra-fast Next.js architecture</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we combine expert <Link href="/website-development" className="text-primary font-bold hover:underline">custom web development</Link> with localized <Link href="/seo-services" className="text-primary font-bold hover:underline">solar SEO strategies</Link> and <Link href="/google-business-profile-setup" className="text-primary font-bold hover:underline">Google Business Profile citations</Link> to help solar companies establish authority and generate qualified installation leads.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Solar Website Features We Build"
      benefitsSubtitle="Every component is engineered to educate homeowners, build technical credibility, and drive site audit requests."
      benefits={[
        {
          icon: "fa-solid fa-calculator",
          title: "1. Solar Savings & Capacity Estimator",
          description: "Allow visitors to enter their average monthly electricity bill to see estimated system KW size, annual savings, and payback period.",
        },
        {
          icon: "fa-solid fa-clipboard-check",
          title: "2. Rooftop Site Audit Booking Form",
          description: "Simple lead capture form asking for roof type, connection type (Single Phase/3-Phase), city, and preferred inspection time.",
        },
        {
          icon: "fa-solid fa-house-chimney-solar",
          title: "3. Residential vs Commercial Solutions",
          description: "Dedicated landing sections highlighting 3KW to 10KW home solar setups alongside 50KW+ commercial & industrial solar EPC projects.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "4. On-Grid, Off-Grid & Hybrid Guides",
          description: "Clear visual breakdowns comparing net-metering on-grid solar, battery backup off-grid setups, and hybrid solar systems.",
        },
        {
          icon: "fa-solid fa-hand-holding-dollar",
          title: "5. Solar Subsidy & PM Surya Ghar Guide",
          description: "Educate prospective buyers on government solar subsidies, DISCOM approval steps, and net metering registration processes.",
        },
        {
          icon: "fa-solid fa-solar-panel",
          title: "6. Project Installation Portfolio Showcase",
          description: "High-resolution photo galleries and video walkthroughs of completed rooftop installations with total KW capacity and client feedback.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "7. One-Tap Solar WhatsApp Routing",
          description: "Instant button opening WhatsApp with pre-filled text: 'Hi, I need a rooftop solar site survey and quote for my property.'",
        },
        {
          icon: "fa-solid fa-microchip",
          title: "8. Solar Panel & Inverter Brand Catalog",
          description: "Display Tier-1 solar module brands (Mono PERC / TOPCon) and inverter manufacturers you authorizedly install.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "9. Local City Solar SEO Pages",
          description: "Target queries like 'Solar panel installers in Chennai' or 'Commercial solar company in Madurai' with dedicated landing pages.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "10. Warranty & Maintenance Package Showcase",
          description: "Highlight 25-year panel performance warranties, 5-year inverter guarantees, and free annual maintenance visits.",
        },
      ]}
      processTitle="Our 6-Step Solar Website Development Process"
      processSubtitle="A structured roadmap from initial brand strategy to live Google search indexing."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-list-check",
          title: "Business & Target Market Audit",
          description: "We analyze your solar offering, installation capacity, regional target cities, and sales inquiry workflow.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Funnel & SEO Keyword Mapping",
          description: "We structure category layouts, solar system breakdowns, calculator user flows, and targeted local SEO terms.",
        },
        {
          step: "3",
          icon: "fa-solid fa-pen-ruler",
          title: "Custom UI/UX Design",
          description: "We craft modern desktop and mobile layouts, savings estimators, project galleries, and quote forms.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Development",
          description: "We engineer your website on modern serverless Next.js frameworks for sub-1.5s loading speed and crisp mobile views.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "SEO & Lead Tracking Setup",
          description: "We implement Solar Energy Service schema markup, configure GA4 event tracking, and sync WhatsApp lead routing.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and train your team.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Solar Companies"
      pricingSubtitle="Get a high-converting solar company website with zero hidden costs or platform subscriptions."
      pricingTiers={[
        {
          name: "Local Installer Growth Plan",
          price: "₹15,000",
          period: "one-time",
          description: "Perfect for local solar installers, rooftop vendors, and regional solar service contractors.",
          features: [
            "1-5 Custom Responsive Pages",
            "Solar Quote Lead Capture Form",
            "Residential & Commercial System Sections",
            "WhatsApp Lead Integration",
            "Completed Project Photo Gallery",
            "Google Maps Local Citation Setup",
            "Basic On-Page SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Local Installer Plan",
        },
        {
          name: "Enterprise Solar & EPC Portal",
          price: "₹35,000",
          period: "one-time",
          description: "Recommended for commercial solar EPC contractors, regional distributors, and utility-scale installers.",
          isPopular: true,
          features: [
            "Up to 15 Advanced Pages & City Landing Pages",
            "Interactive Solar Savings Calculator Widget",
            "Government Subsidy & PM Surya Ghar Guide Pages",
            "Tier-1 Solar Brand & Component Catalog",
            "Detailed Case Studies & Wattage Filter",
            "Full SEO Architecture & Service Schema",
            "Google Analytics 4 & Search Console Sync",
            "1 Year Priority Technical Support & Maintenance",
          ],
          ctaText: "Choose Enterprise Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a solar company cost?",
          answer: "Our solar website packages start from ₹15,000 for local rooftop installers up to ₹35,000 for multi-city commercial solar EPC portals.",
        },
        {
          question: "Can homeowners request solar rooftop site audits through the website?",
          answer: "Yes! We build interactive site survey request forms where customers enter their roof details, monthly bill amount, and city location. Inquiries route directly to your email and WhatsApp.",
        },
        {
          question: "Will the website help us rank on Google for local solar searches?",
          answer: "Yes. Every solar website we build includes search-optimized URLs, schema markup, sub-1.5s page load speed, and local city keywords to attract buyers searching for solar panel installers.",
        },
        {
          question: "How does the WhatsApp lead button work on solar project pages?",
          answer: "Clicking the WhatsApp button opens WhatsApp on the prospect's mobile or web with a pre-filled message specifying their KW interest and city, allowing your sales team to respond instantly.",
        },
        {
          question: "Can we update our solar installation portfolio and photos ourselves?",
          answer: "Yes. We provide a clean, easy-to-use CMS dashboard so your team can upload new installation photos, add project wattage details, and update product models anytime.",
        },
        {
          question: "Are there any recurring monthly listing or software fees?",
          answer: "No. You own 100% of your website code and domain. There are zero recurring monthly listing fees or portal commission charges.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Solar SEO Services" },
        { href: "/local-seo-services", label: "Local SEO Solutions" },
        { href: "/google-business-profile-setup", label: "Google Business Profile Setup" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Sales Team" },
      ]}
    />
  );
}
