import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marketing Agency Website Design & Agency Growth SEO | Joy Digital",
  description: "High-converting website design & digital growth portals for marketing agencies, digital media firms, creative studios, and PR agencies. Features client portfolio showcases, audit booking forms, and agency SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-marketing-agencies",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-marketing-agencies",
    title: "Marketing Agency Website Design & Client Acquisition | Joy Digital",
    description: "Ultra-fast Next.js website design for marketing agencies, performance media firms, and creative studios. Interactive portfolio showcases, lead audit tools, and agency search ranking.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Marketing Agency Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-marketing-agencies#service",
      "name": "Marketing Agency Website Design & Growth SEO",
      "serviceType": "Agency Web Development & Digital Marketing",
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
      "description": "Custom website development for digital marketing agencies, performance media houses, social media firms, and PR agencies. Features portfolio showcases, audit lead capture forms, case study portals, and search optimization.",
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

export default function MarketingAgencyWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Marketing Agencies"
      heroTitle="High-Converting Website Design & SEO for Marketing Agencies & Studios"
      heroSubtitle="Showcase your creative genius, prove campaign ROI, and land high-retainer clients. We engineer fast, visually arresting Next.js websites for digital marketing agencies, performance media firms, PR agencies, and creative studios."
      leadSource="Website for Marketing Agencies Landing Page"
      heroCtaText="Get Free Agency Web Quote"
      overviewTitle="Why Most Marketing Agency Websites Fail to Convert High-Value Clients (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            As a marketing agency, your website is your ultimate brand proof. When prospective clients evaluate your agency for SEO, PPC, social media, or branding retainers, they expect flawless aesthetic design, sub-1.5s load speeds, crisp case studies, and transparent pricing.
          </p>
          <p>
            Yet many agency websites suffer from heavy, unoptimized animations, generic service descriptions, missing campaign metrics, and broken mobile audit lead forms.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Marketing Agency Websites</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Free Marketing Audit Lead Capture Widget</strong>: High-converting lead magnet</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Interactive Campaign & Portfolio Grid</strong>: Metrics-driven case studies</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Service Practice Hubs</strong>: SEO, PPC, Social, Branding & Content Marketing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Agency Search SEO Strategy</strong>: Rank for competitive regional & global agency keywords</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Ultra-fast serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Agency Partner & White-Label Portal</strong>: Dedicated partner inquiry workflow</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we combine cutting-edge UI/UX design with <Link href="/website-development" className="text-primary font-bold hover:underline">high-speed Next.js web development</Link> and <Link href="/seo-services" className="text-primary font-bold hover:underline">agency growth SEO</Link> to help marketing studios win premium retainers.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Marketing Agency Websites"
      benefitsSubtitle="Designed to captivate brand managers, demonstrate campaign impact, and generate retainer leads."
      benefits={[
        {
          icon: "fa-solid fa-wand-magic-sparkles",
          title: "1. Free Marketing & SEO Audit Lead Generator",
          description: "Allow visitors to enter their site URL and business email to request a custom marketing audit report.",
        },
        {
          icon: "fa-solid fa-photo-film",
          title: "2. Visual Work & Case Study Portfolio",
          description: "Showcase ad creatives, brand re-designs, video reels, and campaign metrics (e.g. '4.2x ROAS', '+320% Traffic Growth').",
        },
        {
          icon: "fa-solid fa-bullhorn",
          title: "3. Service Pillar Pages",
          description: "Dedicated landing pages covering Search Engine Optimization (SEO), Meta & Google Ads (PPC), Social Media, and Branding.",
        },
        {
          icon: "fa-solid fa-handshake",
          title: "4. Retainer & Package Pricing Showcase",
          description: "Clear, transparent monthly retainer tiers displaying service deliverables, ad spend limits, and reporting frequency.",
        },
        {
          icon: "fa-solid fa-comments",
          title: "5. Client Testimonial & Video Review Carousel",
          description: "Embed Google reviews, video testimonials, and client logo walls to instantly build trust with prospective brand managers.",
        },
        {
          icon: "fa-solid fa-calendar-days",
          title: "6. Discovery Call Calendar Booking",
          description: "Integrate automated scheduling (Calendly / HubSpot) for instant booking of discovery calls with your agency strategist.",
        },
        {
          icon: "fa-solid fa-people-group",
          title: "7. Agency Culture & Creative Team Profiles",
          description: "Highlight founders, creative directors, media buyers, and strategist bios to showcase agency talent and culture.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "8. One-Tap Agency Director WhatsApp Button",
          description: "Instant link opening WhatsApp pre-filled with: 'Hi, I need a proposal for marketing services for my brand.'",
        },
        {
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "9. Agency Growth SEO Keyword Strategy",
          description: "Target high-intent search queries like 'Digital marketing agency Chennai', 'SEO company Madurai', and 'Performance ads agency'.",
        },
        {
          icon: "fa-solid fa-user-plus",
          title: "10. White-Label & Reseller Partner Portal",
          description: "Dedicated page for web agencies, IT firms, and freelancers seeking white-label marketing execution services.",
        },
      ]}
      processTitle="Our 6-Step Agency Web Engineering Roadmap"
      processSubtitle="A proven framework for launching a high-converting agency platform."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-compass-drafting",
          title: "Agency Brand Audit",
          description: "We analyze your agency's core services, target client industry, pricing tiers, and client acquisition channels.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Taxonomy & Keyword Structure",
          description: "We structure service hubs, portfolio filter tags, case study frameworks, and agency SEO term maps.",
        },
        {
          step: "3",
          icon: "fa-solid fa-pen-ruler",
          title: "Aesthetic UI/UX Design",
          description: "We design modern, dynamic desktop and mobile interfaces with sleek micro-animations, glassmorphism, and bold typography.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Portal Build",
          description: "We build your platform on serverless Next.js frameworks for sub-1.5s page load speeds across all screen sizes.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "SEO & Lead Tracking Setup",
          description: "We implement MarketingAgency schema markup, configure GA4 event tracking, and sync lead forms with your CRM.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and verify local search presence.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Marketing Agencies"
      pricingSubtitle="Get a modern, high-converting agency website with zero recurring software commissions."
      pricingTiers={[
        {
          name: "Boutique Agency Plan",
          price: "₹18,000",
          period: "one-time ($900 USD)",
          description: "Ideal for boutique digital marketing firms, freelance collectives, and specialized media studios.",
          features: [
            "1-5 Custom Responsive Pages",
            "Free Marketing Audit Request Form",
            "Service Practice Showcase",
            "Client Case Study Portfolio (Up to 10 items)",
            "WhatsApp & Phone Quick Buttons",
            "Google Maps Local Citation Setup",
            "Basic Agency SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Boutique Agency Plan",
        },
        {
          name: "Enterprise Agency Portal",
          price: "₹45,000",
          period: "one-time ($2,200 USD)",
          description: "Recommended for full-service marketing agencies, PR firms, and performance ad agencies.",
          isPopular: true,
          features: [
            "Up to 15 Custom Service & Portfolio Pages",
            "Interactive Discovery Call Booking Calendar",
            "Gated Resource & Audit Lead Generation Hub",
            "Client Video Reviews & Interactive ROAS Metrics",
            "White-Label Partner Program Page",
            "Full Agency SEO & Search Architecture",
            "Google Analytics 4 & Search Console Setup",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Enterprise Agency Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a marketing agency cost?",
          answer: "Our marketing agency website packages start from ₹18,000 ($900 USD) for boutique studios up to ₹45,000 ($2,200 USD) for enterprise multi-service agency portals.",
        },
        {
          question: "Can prospective clients request a free marketing audit directly on the site?",
          answer: "Yes! We build custom audit lead capture forms and modal widgets where prospects enter their website URL and email to request an audit report.",
        },
        {
          question: "Will the website help our agency rank on Google for regional and global marketing searches?",
          answer: "Yes. Every agency website includes MarketingAgency schema markup, fast sub-1.5s page load speed, structured service landing pages, and target keywords to rank for competitive agency terms.",
        },
        {
          question: "Can we update our portfolio and client case studies ourselves?",
          answer: "Yes. We provide a clean, simple CMS so your team can upload new campaign designs, video case studies, and performance metrics anytime.",
        },
        {
          question: "Are there any monthly listing or platform fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly portal subscription fees or per-lead commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Agency SEO Services" },
        { href: "/social-media-marketing", label: "Social Media Marketing" },
        { href: "/logo-design-services", label: "Branding & Design" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Us" },
      ]}
    />
  );
}
