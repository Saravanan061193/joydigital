import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Web Development Company in Madurai | Next.js Developer - Joy Digital",
  description: "Joy Digital is the premier web development company in Madurai. We build high-performance, fast-loading, and mobile-friendly Next.js web applications for local businesses.",
  alternates: {
    canonical: "https://joydigital.in/web-development-company-in-madurai",
  },
  openGraph: {
    title: "Web Development Company in Madurai | Next.js Developer - Joy Digital",
    description: "Joy Digital is the premier web development company in Madurai. We build high-performance, fast-loading, and mobile-friendly Next.js web applications for local businesses.",
    url: "https://joydigital.in/web-development-company-in-madurai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Company in Madurai | Next.js Developer - Joy Digital",
    description: "Joy Digital is the premier web development company in Madurai. We build high-performance, fast-loading, and mobile-friendly Next.js web applications for local businesses.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Web Development in Madurai",
  "serviceType": "Web Development Services",
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
  "description": "Custom Next.js & React web development services in Madurai. We build fast, mobile-responsive, and secure business web portals and e-commerce platforms.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "65000",
    "offerCount": "3"
  }
};

export default function WebDevelopmentMadurai() {
  return (
    <ServicePageTemplate
      serviceName="Web Development Madurai"
      heroTitle="Best Web Development Company in Madurai"
      heroSubtitle="Accelerate your business growth with high-speed, secure, and mobile-responsive Next.js website development. We build custom React codebases that rank on Google search and capture qualified customer inquiries."
      leadSource="Web Development Madurai Landing Page"
      canonicalUrl="https://joydigital.in/web-development-company-in-madurai"
      overviewTitle="High-Performance Next.js Engineering for Madurai Businesses"
      overviewContent={
        <div className="space-y-6">
          <p>
            Madurai is rapidly developing as a major commercial center, with industries ranging from health clinics and travels to real estate agencies and educational institutions. A simple, slow template website is no longer enough to win customer trust. You need a fast, secure website that ranks high on Google Maps and converts visitors into active phone calls and contact inquiries.
          </p>
          <p>
            At Joy Digital, a leading <strong>web development company in Madurai</strong>, we build websites using modern web development frameworks like **Next.js** and **Tailwind CSS**. Bypassing heavy, bloated builders like older WordPress templates, our serverless builds load in under 1.5 seconds, achieve 95+ PageSpeed scores, and are 100% responsive.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why Local Search Optimization and Clean Code Matter</h3>
          <p>
            Most local customers search for services on their smartphones using terms like &quot;best clinic in Madurai&quot; or &quot;real estate in Madurai&quot;. We optimize your website code, structure title tags and heading hierarchies, and set up local JSON-LD schema markups. This ensures search engines easily index your location details, helping you rank in local Map Pack results.
          </p>
          <p>
            We also integrate sticky WhatsApp chat modules and call buttons to make it easy for mobile visitors to contact you. Whether you need a corporate site, an e-commerce catalog, or a custom portal, we provide clean, secure development with direct developer support.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Madurai Web Development Agency?"
      benefitsSubtitle="We deliver custom serverless layouts with clean code, built to match your local market requirements."
      benefits={[
        {
          icon: "fa-solid fa-bolt",
          title: "Next.js Speed Performance",
          description: "We code using serverless Next.js architecture, ensuring pages load in under 1.5 seconds to decrease bounce rates.",
        },
        {
          icon: "fa-solid fa-mobile-screen-button",
          title: "Fully Responsive UI",
          description: "Tested across mobile screens, tablets, and laptops, ensuring touch targets are perfect on all devices.",
        },
        {
          icon: "fa-solid fa-comments",
          title: "WhatsApp Leads Routing",
          description: "We configure direct WhatsApp link routing, letting prospects chat with your team in a single tap.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "Local Schema Injection",
          description: "We structure local business metadata tags, coordinates, and address blocks directly in your code for maps ranking.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "Serverless Security",
          description: "Bypassing PHP databases and vulnerabilities, we host secure sites with free SSL to prevent malware issues.",
        },
        {
          icon: "fa-solid fa-user-gear",
          title: "Direct Support Channels",
          description: "Direct connection with our development architect for domain adjustments, setups, and regular backup reviews.",
        },
      ]}
      processTitle="Our Web Development Process"
      processSubtitle="A systematic workflow from initial wireframes to hosting configuration and Google indexing."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-compass-drafting",
          title: "Wireframe & Design",
          description: "We design clean UI/UX drafts customized to your brand colors and user conversion pathways.",
        },
        {
          step: "2",
          icon: "fa-solid fa-code",
          title: "React/Next.js Coding",
          description: "We convert layout designs into fast, clean, semantic HTML and TypeScript codebase code.",
        },
        {
          step: "3",
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "SEO & Schema Setup",
          description: "We configure structured JSON-LD schemas, local keyword metadata, and XML sitemaps.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "Launch & Indexing",
          description: "We host your site, configure domain redirects, and submit URLs directly to Google Search Console.",
        },
      ]}
      pricingTitle="Affordable Web Design Plans"
      pricingSubtitle="Select the perfect package for your business scale. No maintenance lock-in contracts."
      pricingTiers={[
        {
          name: "Starter Website",
          price: "₹15,000",
          period: "one-time",
          description: "Ideal for local service providers, LIC agents, and small business portfolios.",
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
          question: "How long does it take to build a website in Madurai?",
          answer: "A standard business site takes about 7 to 14 business days. Larger projects or custom e-commerce database setups average 3 to 5 weeks.",
        },
        {
          question: "Will I have full ownership of my website?",
          answer: "Yes, you own 100% of the domain, hosting files, database, and source code once the project configuration is launched.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-design-company-in-madurai", label: "Web Design Madurai" },
        { href: "/seo-services-in-madurai", label: "SEO Services Madurai" },
        { href: "/portfolio", label: "Our Portfolio" },
      ]}
    />
  );
}
