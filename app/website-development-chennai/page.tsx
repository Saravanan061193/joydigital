import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Website Development Company in Chennai | Web Design - Joy Digital",
  description: "Joy Digital is the best website design and development company in Chennai. We build fast, responsive Next.js business sites that generate calls and organic leads.",
  alternates: {
    canonical: "https://joydigital.in/website-development-chennai",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Website Development in Chennai",
  "serviceType": "Web Design and Development Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chennai Main Road",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "625001",
      "addressCountry": "IN"
    }
  },
  "description": "Premium Next.js website design and development services in Chennai. We construct mobile-responsive layouts and lead generation funnels for clinics, hotels, real estate, and schools.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "65000",
    "offerCount": "3"
  }
};

export default function ChennaiWebDevPage() {
  return (
    <ServicePageTemplate
      serviceName="Web Development Chennai"
      heroTitle="Best Website Development Company in Chennai"
      heroSubtitle="Scale your local customer pipeline with high-speed, mobile-responsive Next.js websites. We build professional web platforms that rank on Google Maps and convert traffic into leads."
      leadSource="Website Development Chennai Landing Page"
      overviewTitle="High-Performance Web Design Built for Businesses in Chennai"
      overviewContent={
        <div className="space-y-6">
          <p>
            Chennai is a rapidly growing business hub, from clinics and hotels to travels, real estate, and retail showrooms. To stand out from the competition, a basic online brochure is no longer enough. You need a fast, high-performance website that attracts local searches and converts visitors into paying customers.
          </p>
          <p>
            At Joy Digital, we build premium websites using the **Next.js** framework and **Tailwind CSS**. Unlike slow, heavy templates built on legacy builders, our websites load in under 1.5 seconds, are 100% mobile-friendly, and score 95+ on Google PageSpeed Insights.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why Local Optimization Matters for Chennai Businesses</h3>
          <p>
            Most customers in Chennai search for services on their smartphones using keywords like &quot;best doctor in Chennai&quot; or &quot;travels in Chennai&quot;. We integrate local SEO keywords, set up JSON-LD schema markups, and configure direct WhatsApp links to make sure your website rank high on local Google Maps listings and captures immediate phone calls.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Joy Digital in Chennai?"
      benefitsSubtitle="We deliver custom web designs with clean code, built to match your local market requirements."
      benefits={[
        {
          icon: "fa-solid fa-bolt",
          title: "Blazing-Fast Loading",
          description: "Our Next.js serverless architecture ensures pages load in under 1.5 seconds, reducing customer bounce rates.",
        },
        {
          icon: "fa-solid fa-mobile-screen-button",
          title: "Mobile-First Design",
          description: "Over 80% of local searches in Chennai happen on mobile. We build layouts optimized for any smartphone layout.",
        },
        {
          icon: "fa-solid fa-comments",
          title: "WhatsApp Leads Funnel",
          description: "We embed distinct WhatsApp icons and click-to-call CTAs, allowing customers to contact you with a single tap.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "Local SEO & Google Maps",
          description: "We optimize your page headers, meta data, and local schemas to rank in the Google Maps Local 3-Pack.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "Secure Serverless Setup",
          description: "We configure serverless hosting with free SSL, bypassing PHP security concerns and hacking attempts.",
        },
        {
          icon: "fa-solid fa-user-gear",
          title: "Personal Developer Support",
          description: "You get direct communication channels for adjustments, domain setups, and regular backup configurations.",
        },
      ]}
      processTitle="Our Website Development Process"
      processSubtitle="We systematically construct your site from design mocks to live SEO configurations."
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
          question: "How long does it take to build a website in Chennai?",
          answer: "A standard business site takes about 7 to 14 business days. Larger projects or custom e-commerce database setups average 3 to 5 weeks.",
        },
        {
          question: "Will I have full ownership of my website?",
          answer: "Yes, you own 100% of the domain, hosting files, database, and source code once the project configuration is launched.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Web Development" },
        { href: "/seo-services", label: "Global SEO" },
        { href: "/portfolio", label: "Our Portfolio" },
      ]}
    />
  );
}
