import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Website Design Company in Chennai | Custom Web Design Agency",
  description: "Looking for the best website design company in Chennai? We design custom, high-speed corporate websites, hotels, and schools in Chennai.",
  alternates: {
    canonical: "https://joydigital.in/website-design-company-chennai",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Website Design Services in Chennai",
  "serviceType": "Custom Web Design & UX/UI Development",
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
      "postalCode": "600063",
      "addressCountry": "IN"
    }
  },
  "description": "Joy Digital is a professional website design company in Chennai, crafting custom layouts, responsive UI designs, and mobile-friendly brand portals.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "2"
  }
};

export default function WebDesignChennai() {
  return (
    <ServicePageTemplate
      serviceName="Website Design Chennai"
      heroTitle="Website Design Company in Chennai"
      heroSubtitle="Get a custom, stunning website designed to attract and convert customers. As a premier website design agency in Chennai, we build fast, mobile-friendly layouts that load under 1.5s."
      leadSource="Website Design Chennai Landing Page"
      heroCtaText="Get Free Design Quote"
      canonicalUrl="https://joydigital.in/website-design-company-chennai"
      overviewTitle="Custom Website Design & Branding Solutions in Chennai"
      overviewContent={
        <div className="space-y-6">
          <p>
            In Chennai&apos;s active business ecosystem, your website is the primary showcase of your brand. A slow, template-based website can turn prospects away. We build bespoke website designs in Chennai that align with your branding and engage your target audience.
          </p>
          <p>
            Our team focuses on responsive, mobile-first layouts designed to rank higher on Google local searches and convert traffic into qualified inquiries.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Chennai Web Design Team?"
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
        { href: "/web-development-company-chennai", label: "Web Development Chennai" },
        { href: "/seo-company-chennai", label: "SEO Company Chennai" },
        { href: "/portfolio", label: "View Portfolio" },
      ]}
    />
  );
}
