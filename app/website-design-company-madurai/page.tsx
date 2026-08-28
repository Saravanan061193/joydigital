import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Website Design Company in Madurai | Custom Web Designers",
  description: "Looking for the best website design company in Madurai? We create stunning, responsive, custom websites for local businesses, hotels, and colleges.",
  alternates: {
    canonical: "https://joydigital.in/website-design-company-madurai",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Website Design Services in Madurai",
  "serviceType": "Custom Web Design & UX UI Development",
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
  "description": "Joy Digital is a professional website design company in Madurai, crafting custom layouts, responsive UI designs, and mobile-friendly brand portals.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "2"
  }
};

export default function WebDesignMadurai() {
  return (
    <ServicePageTemplate
      serviceName="Website Design Madurai"
      heroTitle="Website Design Company in Madurai"
      heroSubtitle="Stand out with a modern, custom website designed to attract customers. As a leading website design company in Madurai, we build premium, fast-loading layouts that drive conversions."
      leadSource="Website Design Madurai Landing Page"
      heroCtaText="Get Free Design Quote"
      canonicalUrl="https://joydigital.in/website-design-company-madurai"
      overviewTitle="Custom Website Design & Branding Solutions in Madurai"
      overviewContent={
        <div className="space-y-6">
          <p>
            In today&apos;s competitive business landscape, your website is often the first impression a client has of your brand. A generic template can make your business look like everyone else. We provide bespoke website design services in Madurai that capture your brand identity and hook your prospects.
          </p>
          <p>
            Our expert designers build clean, responsive visual structures that display your services, build credibility, and drive user action. We avoid bloated builders, creating fast-loading pages that rank higher in local search results.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Madurai Web Design Team?"
      benefitsSubtitle="We deliver premium design layouts and conversion-focused structures."
      benefits={[
        {
          icon: "fa-solid fa-wand-magic-sparkles",
          title: "Bespoke UI/UX Designs",
          description: "Custom visual designs tailored strictly to your target customers, brand colors, and logo details.",
        },
        {
          icon: "fa-solid fa-mobile-screen",
          title: "Mobile-First Structures",
          description: "We optimize all layouts for mobile, ensuring simple navigation and quick call/WhatsApp interactions.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Under 1.5s Loading Speeds",
          description: "Our clean code structures ensure your graphics and pages load instantly on any network.",
        },
        {
          icon: "fa-solid fa-location-dot",
          title: "Local Schema Injection",
          description: "Geotagged local business metadata is pre-injected into the code to boost your regional search ranks.",
        },
        {
          icon: "fa-solid fa-lock",
          title: "Serverless Site Security",
          description: "Deploy secure code with zero database vulnerabilities and free SSL certificate setups.",
        },
        {
          icon: "fa-solid fa-comments",
          title: "WhatsApp Leads Sync",
          description: "Integrated click-to-chat features direct prospects straight to your phone lines to close inquiries.",
        },
      ]}
      processTitle="How We Design Your Website"
      processSubtitle="A structured 4-step creative flow from custom drafts to launch."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-pen-nib",
          title: "Wireframe Drafting",
          description: "We map page layout structure, keyword targets, and navigation paths.",
        },
        {
          step: "2",
          icon: "fa-solid fa-palette",
          title: "Visual Design Layouts",
          description: "We style custom mockups displaying your brand guidelines and typography.",
        },
        {
          step: "3",
          icon: "fa-solid fa-code",
          title: "Semantic Next.js Coding",
          description: "We compile approved UI designs into clean, semantic React code elements.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "Launch & SEO Check",
          description: "We perform speed checks, register domains, and submit sitemaps to Google Console.",
        },
      ]}
      pricingTitle="Flat-Rate Development Packages"
      pricingSubtitle="Clear milestone-based pricing with zero hidden monthly developer fees."
      pricingTiers={[
        {
          name: "Standard Plan",
          price: "₹15,000",
          period: "one-time",
          description: "Perfect for local service providers, freelancers, and small shops.",
          features: [
            "1-5 Custom Layout Pages",
            "100% Mobile Responsive Layout",
            "Direct Call & WhatsApp CTA",
            "Secure Contact Inquiry Form",
            "Google Maps Card Embed",
            "1 Year Hosting Setup Support",
          ],
          ctaText: "Select Standard",
        },
        {
          name: "Business growth Plan",
          price: "₹35,000",
          period: "one-time",
          description: "Recommended for clinics, restaurants, educational hubs, and builders.",
          isPopular: true,
          features: [
            "Up to 10 Advanced Pages",
            "Complete SEO On-Page Optimization",
            "Local Schema Markup Injection",
            "Google Analytics Tracking",
            "Notice Board or Notice Widgets",
            "1 Year Domain & Support Priority",
          ],
          ctaText: "Select Growth Plan",
        },
      ]}
      faqs={[
        {
          question: "Can you help update photos or text after the site goes live?",
          answer: "Yes! We offer 30 days of free support for post-launch adjustments. We also build custom admin dashboards to make edits simple.",
        },
        {
          question: "How do we coordinate design reviews?",
          answer: "We send active staging URLs where you can inspect design layouts on your phone. Feedback rounds are managed easily via WhatsApp.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development-company-madurai", label: "Web Development Madurai" },
        { href: "/seo-company-madurai", label: "SEO Company Madurai" },
        { href: "/portfolio", label: "View Portfolio" },
      ]}
    />
  );
}
