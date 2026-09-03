import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pest Control Website Design & Exterminator SEO | Joy Digital",
  description: "High-converting website design & lead portals for pest control companies, termite exterminators, bed bug treatment providers, and commercial pest management agencies. Emergency booking forms, WhatsApp leads, and local SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-pest-control",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-pest-control",
    title: "Pest Control Website Design & Lead Generation | Joy Digital",
    description: "Ultra-fast Next.js website design for pest control agencies, termite exterminators, and commercial pest control companies. Mobile-friendly inspection booking, WhatsApp leads, and search engine optimization.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Pest Control Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-pest-control#service",
      "name": "Pest Control Company Website Design & Exterminator SEO",
      "serviceType": "Pest Control Web Development & Digital Lead Marketing",
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
      "description": "Custom website design for pest control companies, termite exterminators, bed bug treatment experts, and commercial pest management providers. Features emergency booking forms, WhatsApp lead routing, service area maps, and local search optimization.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "25000",
        "highPrice": "45000",
        "offerCount": "2"
      }
    }
  ]
};

export default function PestControlWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Pest Control"
      heroTitle="High-Converting Website Design & SEO for Pest Control Companies"
      heroSubtitle="Turn urgent pest infestations into direct phone calls, instant WhatsApp bookings, and emergency inspection requests. We engineer ultra-fast, mobile-friendly Next.js websites for residential & commercial pest exterminators."
      leadSource="Website for Pest Control Landing Page"
      heroCtaText="Get Free Pest Control Web Quote"
      canonicalUrl="https://joydigital.in/website-for-pest-control"
      overviewTitle="Why Most Pest Control Websites Fail to Convert Emergency Calls (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            When homeowners or restaurant managers discover termites, bed bugs, cockroaches, or rodents, they act with extreme urgency. They search Google for immediate exterminators and choose the website that loads instantly, displays clear treatment packages, and offers 1-tap WhatsApp or phone contact.
          </p>
          <p>
            Unfortunately, many pest control websites suffer from slow mobile speeds, missing service area breakdowns, unorganized treatment packages, and lack of immediate emergency contact buttons—causing high-intent leads to bounce to competitors.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Pest Control Websites</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>1-Tap Emergency Call & WhatsApp Button</strong>: Connect instantly on mobile</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Free Inspection Request Form</strong>: Simple 3-step property inspection booking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Google Business Profile & Maps SEO</strong>: Rank top for 'Pest control near me'</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Ultra-fast serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Eco-Friendly & Safe Certification Badges</strong>: Build instant customer trust</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Commercial B2B Maintenance Plans</strong>: Contracts for hotels, restaurants & offices</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we combine expert <Link href="/website-development" className="text-primary font-bold hover:underline">custom web development</Link> with localized <Link href="/local-seo-services" className="text-primary font-bold hover:underline">pest control SEO</Link> and <Link href="/google-business-profile-setup" className="text-primary font-bold hover:underline">Google Maps local citation setups</Link> to help exterminators generate daily customer inquiries.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Pest Control Websites"
      benefitsSubtitle="Engineered to handle urgent service requests, build chemical-safety trust, and capture daily extermination leads."
      benefits={[
        {
          icon: "fa-solid fa-phone-flip",
          title: "1. 1-Tap Emergency Mobile Call Hook",
          description: "Sticky click-to-call and WhatsApp buttons on mobile devices so urgent customers can reach your desk in 1 click.",
        },
        {
          icon: "fa-solid fa-clipboard-list",
          title: "2. Free Property Inspection Form",
          description: "Interactive quote form capturing pest type (Termites, Bed Bugs, Cockroaches, Rodents), property type (Residential/Commercial), and city.",
        },
        {
          icon: "fa-solid fa-bug",
          title: "3. Specialized Treatment Service Pages",
          description: "Dedicated landing pages for Anti-Termite Piping, Herbal Cockroach Gel, Thermal Bed Bug Treatment, and Mosquito Control.",
        },
        {
          icon: "fa-solid fa-building-shield",
          title: "4. Commercial AMC Contract Showcase",
          description: "B2B service package sections for restaurants, food processing plants, IT parks, warehouses, and hotel chains.",
        },
        {
          icon: "fa-solid fa-leaf",
          title: "5. Eco-Friendly & Odorless Badges",
          description: "Highlight child-safe, pet-friendly, non-toxic, and odorless chemical certifications to reassure residential families.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "6. Neighborhood Service Area Maps",
          description: "Interactive coverage map and city list helping customers verify you service their specific locality.",
        },
        {
          icon: "fa-solid fa-star",
          title: "7. Customer Testimonials & Case Photos",
          description: "Showcase verified Google customer reviews and before-and-after inspection photos to build credibility.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "8. Sub-1.5s Mobile Load Speed",
          description: "Ultra-fast Next.js architecture ensuring zero mobile lag when visitors search in urgent pest situations.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "9. Local 'Pest Control Near Me' SEO",
          description: "Target high-intent search terms like 'Best termite treatment company near me' and 'Bed bug exterminator'.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "10. Warranty & Service Guarantee Showcase",
          description: "Highlight 1-Year to 5-Year Termite Service Warranties and Free Retreatment Guarantees clearly.",
        },
      ]}
      processTitle="Our 6-Step Pest Control Website Engineering Process"
      processSubtitle="A smooth roadmap from initial consultation to active lead generation on Google."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass",
          title: "Service & Target Area Audit",
          description: "We analyze your extermination services, chemical certifications, target cities, and sales inquiry workflow.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Funnel & Local SEO Mapping",
          description: "We map treatment category layouts, inspection booking forms, and high-intent local search keywords.",
        },
        {
          step: "3",
          icon: "fa-solid fa-paintbrush",
          title: "Custom Responsive UI/UX Design",
          description: "We design clean desktop and mobile interface mockups with emergency CTAs and brand colors.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js Serverless Build",
          description: "We build your website on serverless Next.js frameworks for sub-1.5s page load speed and smooth mobile performance.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "Local Schema & Maps Setup",
          description: "We implement LocalBusiness and Service schema markup, optimize Google Business Profile, and sync lead forms.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and verify local map presence.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Pest Control Companies"
      pricingSubtitle="Get a modern, fast exterminator website with zero hidden monthly platform fees."
      pricingTiers={[
        {
          name: "Local Exterminator Plan",
          price: "₹25,000",
          period: "one-time ($600 USD)",
          description: "Perfect for local pest control contractors, termite experts, and city service teams.",
          features: [
            "1-5 Custom Responsive Pages",
            "Free Inspection Lead Capture Form",
            "Emergency WhatsApp & Direct Call Buttons",
            "Termite, Cockroach & Rodent Service Sections",
            "Google Maps Local Citation & Area Map Setup",
            "Basic On-Page SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Exterminator Plan",
        },
        {
          name: "Enterprise Commercial Portal",
          price: "₹45,000",
          period: "one-time ($1,400 USD)",
          description: "Recommended for commercial pest control companies, multi-city franchises, and B2B AMC vendors.",
          isPopular: true,
          features: [
            "Up to 12 Advanced Pages & Locality Landing Pages",
            "Commercial AMC Package & Corporate Inquiry Forms",
            "Eco-Safe & Government Certification Showcase",
            "Interactive Service Coverage Area Map",
            "Full Local & Regional SEO Architecture",
            "Google Analytics 4 & Search Console Sync",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Commercial Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a pest control company cost?",
          answer: "Our pest control website packages start from ₹25,000 ($600 USD) for local exterminators up to ₹45,000 ($1,400 USD) for multi-city commercial pest management portals.",
        },
        {
          question: "Can customers request emergency inspections directly through the website?",
          answer: "Yes! We build emergency inspection forms and sticky WhatsApp/call buttons where customers submit pest details and location, routed directly to your mobile phone.",
        },
        {
          question: "Will the website help our pest control agency rank on Google Maps?",
          answer: "Yes. Every website we build includes LocalBusiness schema markup, geotagged content tags, sub-1.5s page load speed, and local SEO setup to help you rank in Google Maps.",
        },
        {
          question: "Can we list commercial B2B annual maintenance contracts (AMC)?",
          answer: "Yes! We design dedicated B2B commercial sections for hotels, restaurants, factories, and offices with custom corporate quote request forms.",
        },
        {
          question: "Are there any hidden monthly hosting or maintenance fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero hidden monthly platform charges.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/custom-website-development", label: "Custom Website Development" },
        { href: "/website-development", label: "Web Development Services" },
        { href: "/local-seo-services", label: "Local SEO Solutions" },
        { href: "/google-business-profile-setup", label: "Google Business Setup" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Sales Team" },
      ]}
    />
  );
}
