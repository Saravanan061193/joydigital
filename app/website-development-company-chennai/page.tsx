import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Website Development Company in Chennai | Next.js & React JS",
  description: "Looking for a Next.js website development company in Chennai? We build fast React JS platforms and corporate websites that score 95+ on Core Web Vitals.",
  alternates: {
    canonical: "https://joydigital.in/website-development-company-chennai",
  },
  openGraph: {
    title: "Website Development Company in Chennai | Next.js & React JS",
    description: "Looking for a Next.js website development company in Chennai? We build fast React JS platforms and corporate websites that score 95+ on Core Web Vitals.",
    url: "https://joydigital.in/website-development-company-chennai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Company in Chennai | Next.js & React JS",
    description: "Looking for a Next.js website development company in Chennai? We build fast React JS platforms and corporate websites that score 95+ on Core Web Vitals.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Next.js Web Development Services in Chennai",
  "serviceType": "Next.js & React Web Development",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    }
  },
  "description": "Joy Digital is a leading Next.js web development company in Chennai. We are expert fast loading website developers building react js web app development projects.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "75000",
    "offerCount": "3"
  }
};

export default function WebDevChennai() {
  return (
    <ServicePageTemplate
      serviceName="Website Development Chennai"
      heroTitle="Website Development Company in Chennai"
      heroSubtitle="Get dynamic React JS web app development and launch fast loading website assets. As a leading Next.js web development company in Chennai, we build platforms that rank top on search results."
      leadSource="Next.js Web Development Chennai Landing Page"
      canonicalUrl="https://joydigital.in/website-development-company-chennai"
      overviewTitle="High-Speed Next.js & React JS Web App Development in Chennai"
      overviewContent={
        <div className="space-y-6 text-justify">
          <p>
            In the tech-driven ecosystem of Chennai—from the IT corridors of OMR and corporate parks of Guindy to growing hubs in Velachery and Ambattur—digital competition is intense. For modern companies, basic online brochures no longer stand out. If your business wants to capture high-intent inquiries and rank at the top of Google searches, custom coding is essential. We are a specialized <strong>Next.js web development company in Chennai</strong> focusing on writing clean React JS frontend pages. We skip bloated database dependencies to build web platforms that load in under 1.5 seconds.
          </p>
          <p>
            As professional <strong>fast loading website developers</strong>, we make sure that speed, design structure, and search engine parameters are fully optimized from day one. Standard template systems often introduce layout shift errors and contain unnecessary scripts that increase mobile load times. We code your website block by block, guaranteeing optimal Core Web Vitals and a smooth user experience.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Why Next.js & React JS Web App Development Matter</h3>
          <p>
            WordPress and drag-and-drop builders load heavy files, require frequent security updates, and crash during traffic peaks. Our React architectures utilize static pre-rendering distributed across global edge networks. This guarantees fast responses on mobile devices, eliminates SQL injection risks, and provides a secure, lightweight platform for your business.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Optimized to Rank in Local Map Packs and organic search</h3>
          <p>
            Chennai-based services need local visibility to win clients. We inject structured JSON-LD schemas, local business coordinates, and keyword-rich headers directly into the website code. This aligns your platform with Google search rules, helping your business appear in map search results when customers search for your services.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Conversion Rate Optimization (CRO) & Interactive CTAs</h3>
          <p>
            Traffic only brings value if it converts. We focus on placing call buttons, sticky headers, and quick-load contact fields exactly where users look. By integrating direct WhatsApp messaging paths and simple forms, we help you capture qualified leads from Chennai and other regions in India efficiently.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Chennai Next.js Web Development Team?"
      benefitsSubtitle="We construct fast loading websites designed to capture customer leads in Chennai."
      benefits={[
        {
          icon: "fa-solid fa-bolt",
          title: "Fast Loading Website Developers",
          description: "Our serverless Next.js structures ensure pages load in under 1.5 seconds, achieving perfect Core Web Vitals.",
        },
        {
          icon: "fa-solid fa-code",
          title: "React JS Web App Development",
          description: "Custom modular UI code built using Tailwind CSS to fit your exact branding style guidelines.",
        },
        {
          icon: "fa-solid fa-comments",
          title: "WhatsApp Leads Routing",
          description: "Direct WhatsApp click hooks to turn your organic visitors into qualified mobile prospects immediately.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "Local Schema Structured",
          description: "Geotagged content schemas, absolute canonical links, and local sitemap listings are injected.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "Serverless Hosting Setup",
          description: "Hosted on cloud CDNs with preconnected HTTPS SSL setups to completely protect user datasets.",
        },
        {
          icon: "fa-solid fa-user-gear",
          title: "Direct Developer Contact",
          description: "Direct strategy chats with our lead architect Saravanan to configure domain redirections and backups.",
        },
      ]}
      processTitle="Our Sprint-Based Development Process"
      processSubtitle="We launch high-speed React web assets in a structured 4-step framework."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-compass-drafting",
          title: "Keyword & Wireframe Plan",
          description: "We map out navigation flow, target keywords, and wireframe pages customized to your local industry niche.",
        },
        {
          step: "2",
          icon: "fa-solid fa-code",
          title: "React/Next.js Coding Sprints",
          description: "We convert your approved layouts into fast, semantic, fully responsive HTML & TypeScript code.",
        },
        {
          step: "3",
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "SEO & Schema Deployment",
          description: "We integrate custom JSON-LD schemas, alt properties, meta data, and configure sitemaps.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "CDN Hosting & Speed Test",
          description: "We configure domain redirects, run Lighthouse audits, and submit urls to Google Search Console.",
        },
      ]}
      pricingTitle="Affordable Web Development Packages"
      pricingSubtitle="Select the pricing plan that fits your business scale. No maintenance lock-in contracts."
      pricingTiers={[
        {
          name: "Startup Website",
          price: "₹15,000",
          period: "one-time",
          description: "Perfect for local service providers, LIC agents, and small business portfolios.",
          features: [
            "1-5 Custom Responsive Pages",
            "100% Mobile Responsive Layout",
            "Direct WhatsApp Lead Routing",
            "Contact Form Setup",
            "Google Maps Location Integration",
            "Speed Optimization (Mobile & Desktop)",
          ],
          ctaText: "Choose Starter Plan",
        },
        {
          name: "Professional Plan",
          price: "₹25,000",
          period: "one-time",
          description: "Best for medical clinics, local hotels, educational hubs, and growing companies.",
          isPopular: true,
          features: [
            "Up to 10 Premium Custom Pages",
            "Complete SEO Metadata Architecture",
            "Local Schema Markup Setup",
            "Google Analytics Tracking",
            "1 Year Domain & Hosting Setup Support",
            "Priority developer adjustments support",
          ],
          ctaText: "Choose Professional Plan",
        },
        {
          name: "Enterprise Custom",
          price: "Custom Quote",
          description: "For e-commerce stores, custom databases, and API integrations.",
          features: [
            "Unlimited Responsive Pages",
            "Bespoke E-commerce Package Systems",
            "Custom Admin Panel Configurations",
            "Third-Party API Integrations",
            "Advanced Lead Management Sync",
            "Monthly Maintenance Support Packages",
          ],
          ctaText: "Get Custom Quote",
        },
      ]}
      faqs={[
        {
          question: "Which areas in Chennai do you cover?",
          answer: "We cover all major locations in Chennai remotely, including OMR, Adyar, Guindy, Velachery, Ambattur, T.Nagar, Annanagar, Tambaram, and Perungalathur. Our communication models are fully online via calls, Zoom, and WhatsApp.",
        },
        {
          question: "Can we track lead conversions in Google Analytics and GSC?",
          answer: "Yes, we integrate Google Analytics 4 (GA4) and track client clicks, WhatsApp enquiries, form submissions, and telephone calls to measure your marketing return on investment.",
        },
        {
          question: "What is your website maintenance policy?",
          answer: "We support you for 1 year with initial hosting setup and minor adjustments. There are no lock-in maintenance contracts—you retain complete ownership of the code repository and files.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development-company-madurai", label: "Web Development Madurai" },
        { href: "/seo-services-chennai", label: "SEO Services Chennai" },
        { href: "/seo-services-madurai", label: "SEO Services Madurai" },
      ]}
    />
  );
}
