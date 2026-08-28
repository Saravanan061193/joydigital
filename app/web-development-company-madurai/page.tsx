import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Web Development Company in Madurai | React & Next.js Coders",
  description: "Looking for a professional web development company in Madurai? We program dynamic, secure, fast React/Next.js portals for businesses and organizations.",
  alternates: {
    canonical: "https://joydigital.in/web-development-company-madurai",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Web Development Services in Madurai",
  "serviceType": "React & Next.js Web Application Coding",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Madurai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    }
  },
  "description": "Joy Digital is a professional web development company in Madurai, specializing in custom React architectures, headless database APIs, and secure serverless web apps.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "75000",
    "offerCount": "3"
  }
};

export default function WebDevMadurai() {
  return (
    <ServicePageTemplate
      serviceName="Web Development Madurai"
      heroTitle="Web Development Company in Madurai"
      heroSubtitle="Get dynamic, mobile-friendly React and Next.js website assets. As a premium web development company in Madurai, we build fast corporate portals that convert visitors into active customers."
      leadSource="Web Development Madurai Landing Page"
      heroCtaText="Get Web Development Quote"
      canonicalUrl="https://joydigital.in/web-development-company-madurai"
      overviewTitle="High-Performance Website Design & Development in Madurai"
      overviewContent={
        <div className="space-y-6">
          <p>
            In the rapidly growing city of Madurai, traditional business setups are rapidly transitioning to digital channels. Whether you operate a retail store near the Meenakshi Amman Temple, a healthcare clinic in Anna Nagar, or an agricultural business in the outskirts, having a slow, generic website is no longer enough to stay competitive. We are a specialized website development company in Madurai focused on delivering custom, high-speed React and Next.js websites.
          </p>
          <p>
            As professional developers, we understand that site speed is a vital Google search ranking signal. Standard drag-and-drop builders often output bloated code and introduce layout shift issues that frustrate users. We code your website semantic element by semantic element using modern frameworks, ensuring that your business stands out on search engine result pages (SERPs) and converts traffic into inquiries.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Madurai Development Team?"
      benefitsSubtitle="We build speed-optimized, modern digital assets designed to convert visitors."
      benefits={[
        {
          icon: "fa-solid fa-bolt",
          title: "Sub-1.5 Second Speeds",
          description: "Our serverless static builds load instantly, preventing visitor bounces and improving search ranks.",
        },
        {
          icon: "fa-solid opacity-100 fa-code",
          title: "React Web Applications",
          description: "Custom frontend coding tailored strictly to your company branding guidelines and colors.",
        },
        {
          icon: "fa-solid fa-mobile-screen",
          title: "100% Mobile Responsive",
          description: "Thoroughly tested on small and medium screens for fluid layouts and accessible touch interfaces.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "Local Schema Structured",
          description: "Geotagged local business tags and absolute canonical URLs are pre-injected into the code header.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "Serverless Database Security",
          description: "Zero database vulnerability exposure, secure SSL certificates, and fast global CDN hosting.",
        },
        {
          icon: "fa-solid fa-headset",
          title: "Dedicated Remote Support",
          description: "Direct access to our developer workspace for domain redirects, updates, and maintenance support.",
        },
      ]}
      processTitle="Our Structured Website Delivery Framework"
      processSubtitle="We design and launch fast-loading React web platforms in 4 phases."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-compass-drafting",
          title: "Wireframe & SEO Strategy",
          description: "We map out target search keywords, page architecture, and design static layouts to suit your company.",
        },
        {
          step: "2",
          icon: "fa-solid fa-code",
          title: "React/Next.js Coding Sprints",
          description: "We write clean, semantic React code and style it with optimized custom CSS elements.",
        },
        {
          step: "3",
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "Structured Schema Integration",
          description: "We configure LocalBusiness, Service, and FAQ schemas to get your site ready for search indexing.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "Speed Audits & Launch",
          description: "We verify Lighthouse speeds, link GSC and GA4 tracking, and deploy the website to global servers.",
        },
      ]}
      pricingTitle="Clear, Milestone-Based Development Pricing"
      pricingSubtitle="Select the plan that fits your business scale. No hidden fees or surprise maintenance lock-ins."
      pricingTiers={[
        {
          name: "Starter Site",
          price: "₹15,000",
          period: "one-time",
          description: "Ideal for local advisors, growing retail shops, and professional business portfolios.",
          features: [
            "1-5 Custom Responsive Pages",
            "100% Mobile Responsive Layout",
            "Direct WhatsApp Lead Integration",
            "Fast Mobile Speed Audits",
            "Contact Form Submission Setup",
            "Google Maps citation setup",
          ],
          ctaText: "Select Starter Plan",
        },
        {
          name: "Professional Plan",
          price: "₹25,000",
          period: "one-time",
          description: "Best for medical clinics, local resorts, educational hubs, and growing companies.",
          isPopular: true,
          features: [
            "Up to 10 Premium Pages",
            "Complete SEO Metadata Optimization",
            "Local Schema Markup Integration",
            "Google Analytics Event Tracking",
            "1 Year Hosting Setup & Redirections Support",
            "Priority developer support access",
          ],
          ctaText: "Select Professional Plan",
        },
        {
          name: "Enterprise Custom",
          price: "Custom Quote",
          description: "Best for complex e-commerce stores, reservation systems, and database portals.",
          features: [
            "Unlimited Custom Frontend Pages",
            "Headless E-commerce Storefront Integration",
            "Custom API & Database Configurations",
            "Conversion Funnel Tracking Suite",
            "Advanced Form CRM Routing",
            "Ongoing Maintenance Support Packages",
          ],
          ctaText: "Get Custom Quote",
        },
      ]}
      faqs={[
        {
          question: "Which areas in Madurai do you serve?",
          answer: "We support businesses across Madurai remotely, including Anna Nagar, K.Pudur, Tallakulam, Sellur, Kalavasal, Villapuram, and adjacent towns. Our operations are fully online, making it easy to schedule calls and manage design updates.",
        },
        {
          question: "Can you help move my WordPress website in Madurai to Next.js?",
          answer: "Yes. We can extract your existing content, structure a clean Next.js React layout, and set up redirections. This preserves your organic rankings.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-design-company-madurai", label: "Web Design Madurai" },
        { href: "/seo-company-madurai", label: "SEO Company Madurai" },
        { href: "/portfolio", label: "View Portfolio" },
      ]}
    />
  );
}
