import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Website Design Company in Madurai | Premium UI/UX & Web Design",
  description: "Joy Digital is the leading website design company in Madurai. We design modern, high-converting websites and UI/UX layouts for businesses in Madurai.",
  alternates: {
    canonical: "https://joydigital.in/website-design-company-in-madurai",
  },
  openGraph: {
    title: "Website Design Company in Madurai | Premium UI/UX & Web Design",
    description: "Joy Digital is the leading website design company in Madurai. We design modern, high-converting websites and UI/UX layouts for businesses in Madurai.",
    url: "https://joydigital.in/website-design-company-in-madurai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design Company in Madurai | Premium UI/UX & Web Design",
    description: "Joy Digital is the leading website design company in Madurai. We design modern, high-converting websites and UI/UX layouts for businesses in Madurai.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Website Design in Madurai",
  "serviceType": "Web Design Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Madurai Main Road",
      "addressLocality": "Madurai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "625001",
      "addressCountry": "IN"
    }
  },
  "description": "Custom UI/UX website design company in Madurai. We create responsive templates, landing pages, and interactive designs that convert traffic into leads.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "45000",
    "offerCount": "3"
  }
};

export default function WebsiteDesignMadurai() {
  return (
    <ServicePageTemplate
      serviceName="Website Design Madurai"
      heroTitle="Creative Website Design Company in Madurai"
      heroSubtitle="Stand out from competitors in Tamil Nadu with custom, conversion-optimized, and premium UI/UX layouts. We design gorgeous web platforms that rank on Google Maps and drive direct customer inquiries."
      leadSource="Website Design Madurai Landing Page"
      canonicalUrl="https://joydigital.in/website-design-company-in-madurai"
      overviewTitle="Custom Responsive Web Designs Engineered for Conversions"
      overviewContent={
        <div className="space-y-6">
          <p>
            Your website is often the first impression a customer has of your business. A slow, generic template with confusing navigation can turn prospects away and send them directly to competitors. To grow your business online, you need a website that is visually stunning, easy to navigate, and optimized for search and leads.
          </p>
          <p>
            At Joy Digital, a premium <strong>website design company in Madurai</strong>, we focus on custom, responsive UI/UX. We design custom layouts tailored to your exact brand aesthetics using advanced typography, harmonized color schemes, and fast-loading web elements.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Mobile-Responsive Designs Custom Built for Madurai Brands</h3>
          <p>
            More than 80% of local web traffic comes from mobile devices. We design all layouts using a mobile-first framework. Your website will render beautifully on smartphones, tablets, laptops, and wide screens. We ensure buttons are easy to tap, forms are easy to fill, and text is readable on all displays.
          </p>
          <p>
            We don't build generic template clones. We draft custom wireframes and create layouts optimized for speed. Our designs load in under 1.5 seconds, reducing customer bounce rates and ensuring a positive brand experience for your visitors.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Madurai Web Design Agency?"
      benefitsSubtitle="We blend premium creative UI/UX designs with technical SEO to maximize your website's ROI."
      benefits={[
        {
          icon: "fa-solid fa-wand-magic-sparkles",
          title: "Custom Premium UI/UX",
          description: "We design custom layouts from scratch to align with your brand, ensuring you stand out from competitors.",
        },
        {
          icon: "fa-solid fa-mobile-screen",
          title: "Mobile-First Architecture",
          description: "Optimized for mobile viewports, ensuring seamless navigation and readable layouts on all phone screens.",
        },
        {
          icon: "fa-solid fa-gauge-high",
          title: "Speed-Optimized Codes",
          description: "Clean code structure that loads in under 1.5 seconds, improving user engagement and search rankings.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "SEO-Friendly Structure",
          description: "We structure pages with canonical tags, semantic headers, meta tags, and schema scripts for quick indexing.",
        },
        {
          icon: "fa-solid fa-whatsapp text-emerald-500",
          title: "Direct WhatsApp Links",
          description: "We integrate sticky WhatsApp chat and call buttons to capture instant phone leads and inquiries.",
        },
        {
          icon: "fa-solid fa-headset",
          title: "Direct Strategy Support",
          description: "Direct support line with our founder for layout adjustments, domain integration, and launch reviews.",
        },
      ]}
      processTitle="Our Web Design Workflow"
      processSubtitle="How we take your website from conceptual wireframes to a live, lead-generating platform."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-compass-drafting",
          title: "Discovery & Wireframe",
          description: "We analyze your brand values, study competitor layouts, and outline page wireframes for review.",
        },
        {
          step: "2",
          icon: "fa-solid fa-palette",
          title: "Visual Design Draft",
          description: "We apply custom colors, layout typography, and draft premium mockups for your approval.",
        },
        {
          step: "3",
          icon: "fa-solid fa-code",
          title: "Front-End Integration",
          description: "We build the layout using fast, semantic Next.js/Tailwind CSS code with responsive interactions.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "SEO Launch & Indexing",
          description: "We set up tracking, configure redirects, verify metadata, and submit URLs to search engines.",
        },
      ]}
      pricingTitle="Affordable Web Design Packages"
      pricingSubtitle="Premium custom designs with zero locked-in maintenance fees. Select a package for your business scale."
      pricingTiers={[
        {
          name: "Starter Design",
          price: "₹15,000",
          period: "one-time",
          description: "Perfect for local service providers, small business portfolios, and LIC advisors.",
          features: [
            "1-5 Responsive Custom Pages",
            "100% Mobile Responsive Layout",
            "WhatsApp & Call Button Linkage",
            "Contact Form Integration",
            "Google Maps Address Embed",
            "Standard On-Page SEO Setup",
          ],
          ctaText: "Choose Starter Plan",
        },
        {
          name: "Professional Design",
          price: "₹25,000",
          period: "one-time",
          description: "Best for medical clinics, local hotels, educational hubs, and growing companies.",
          isPopular: true,
          features: [
            "Up to 10 Premium Custom Pages",
            "Advanced Custom UI/UX Layouts",
            "Complete SEO Metadata Architecture",
            "Local Schema Markup Setup",
            "Google Analytics Tracking",
            "1 Year Hosting Setup Support",
          ],
          ctaText: "Choose Professional Plan",
        },
        {
          name: "Custom Enterprise",
          price: "Custom Quote",
          description: "For e-commerce portals, custom web applications, and database integrations.",
          features: [
            "Unlimited Custom Designed Pages",
            "Bespoke UI/UX Layout Assets",
            "E-commerce & Checkout Setup",
            "Custom Admin Panel Sync",
            "Advanced Lead Routing Systems",
            "Priority Support Packages",
          ],
          ctaText: "Get Custom Quote",
        },
      ]}
      faqs={[
        {
          question: "Why should I choose custom website design over templates?",
          answer: "Custom website designs are built around your brand identity and conversion goals. They contain clean, bloated-free code, resulting in faster loading speeds and better search engine rankings compared to slow pre-made templates.",
        },
        {
          question: "Will my website look good on mobile devices?",
          answer: "Yes. Every website layout we design is fully responsive and optimized for mobile devices, ensuring text and buttons scale correctly on all screen sizes.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/web-development-company-in-madurai", label: "Web Development" },
        { href: "/seo-services-in-madurai", label: "SEO Services Madurai" },
        { href: "/portfolio", label: "Portfolio" },
      ]}
    />
  );
}
