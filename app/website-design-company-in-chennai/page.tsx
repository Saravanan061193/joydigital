import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Web Design Company in Chennai | Joy Digital",
  description: "Joy Digital is a leading web design company in Chennai. We build high-speed, responsive websites & local SEO plans. Find a website developer near me.",
  alternates: {
    canonical: "https://joydigital.in/website-design-company-in-chennai",
  },
  openGraph: {
    title: "Web Design Company in Chennai | Premium Website Design Agency",
    description: "Joy Digital is a leading web design company in Chennai. We build high-speed, responsive websites & local SEO plans. Find a website developer near me.",
    url: "https://joydigital.in/website-design-company-in-chennai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Company in Chennai | Premium Website Design Agency",
    description: "Joy Digital is a leading web design company in Chennai. We build high-speed, responsive websites & local SEO plans. Find a website developer near me.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Web Design Services in Chennai",
  "serviceType": "Web Design & UI/UX Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
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
  "description": "Joy Digital is a premium web design company in Chennai offering custom responsive layouts and local SEO optimization for Chennai service brands.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "45000",
    "offerCount": "3"
  }
};

export default function WebsiteDesignChennai() {
  return (
    <ServicePageTemplate
      serviceName="Website Design Chennai"
      heroTitle="Web Design Company in Chennai"
      heroSubtitle="Looking for a website developer near me or a web development agency in T Nagar / Guindy / Velachery? We design high-speed Next.js websites that convert local search traffic into leads."
      leadSource="Website Design Chennai Landing Page"
      canonicalUrl="https://joydigital.in/website-design-company-in-chennai"
      overviewTitle="Local Web Design Company in Chennai Built for Results"
      overviewContent={
        <div className="space-y-6">
          <p>
            Your website is the first impression a customer has of your brand. Slow load times or outdated layouts will drive prospects straight to competitors. If you need a leading <strong>web design company in Chennai</strong> to build a modern, high-converting digital portal, we are here to help.
          </p>
          <p>
            Whether you are looking for a reliable <strong>website developer near me</strong> or a full-service <strong>web development agency in T Nagar / Guindy / Velachery</strong>, our team has 9+ years of experience helping Chennai businesses establish dominant local search authority.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Mobile-Responsive Layouts for T Nagar, Guindy & Velachery Businesses</h3>
          <p>
            Over 80% of local service queries in Tamil Nadu occur on smartphones. We design clean wireframes, compressed media, and secure code structures. This ensures your website loads under 1.5 seconds and renders beautifully across all mobile browsers.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Chennai Web Design Agency?"
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
        { href: "/website-development-company-chennai", label: "website development in Chennai" },
        { href: "/seo-services-in-chennai", label: "SEO Services Chennai" },
        { href: "/portfolio", label: "Portfolio" },
      ]}
    />
  );
}
