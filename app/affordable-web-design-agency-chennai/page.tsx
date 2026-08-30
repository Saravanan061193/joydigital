import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Affordable Web Design Agency in Chennai | Joy Digital",
  description: "Looking for an affordable web design agency in Chennai? Get custom Next.js websites at a competitive website design price in Chennai.",
  alternates: {
    canonical: "https://joydigital.in/affordable-web-design-agency-chennai",
  },
  openGraph: {
    title: "Affordable Web Design Agency in Chennai | Low Cost Website Development",
    description: "Looking for an affordable web design agency in Chennai? Get custom Next.js websites at a competitive website design price in Chennai.",
    url: "https://joydigital.in/affordable-web-design-agency-chennai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Affordable Web Design Agency in Chennai | Low Cost Website Development",
    description: "Looking for an affordable web design agency in Chennai? Get custom Next.js websites at a competitive website design price in Chennai.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Affordable Web Design Services in Chennai",
  "serviceType": "Affordable Web Design & Low Cost Website Development",
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
  "description": "Joy Digital is an affordable web design agency in Chennai offering low cost website development and transparent website design price listings.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "3"
  }
};

export default function AffordableWebDesignChennai() {
  return (
    <ServicePageTemplate
      serviceName="Affordable Web Design"
      heroTitle="Affordable Web Design Agency in Chennai"
      heroSubtitle="Get transparent, low cost website development in Chennai. As a results-driven affordable web design agency in Chennai, we build modern websites optimized for speed and rankings."
      leadSource="Affordable Web Design Chennai Landing Page"
      canonicalUrl="https://joydigital.in/affordable-web-design-agency-chennai"
      overviewTitle="Low Cost Website Development & Website Design Price in Chennai"
      overviewContent={
        <div className="space-y-6">
          <p>
            Many businesses assume that custom Next.js engineering is extremely expensive. At Joy Digital, a leading <strong>affordable web design agency in Chennai</strong>, we offer premium quality layouts starting from just ₹15,000. We maintain transparent pricing profiles with zero hidden fees.
          </p>
          <p>
            Our <strong>low cost website development in Chennai</strong> uses optimized, serverless architectures. This gives you a fast-loading business website that ranks high on search results, loads in under 1.5 seconds, and delivers actual conversions.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Transparent Website Design Price in Chennai</h3>
          <p>
            Whether you want a simple portfolio or a structured business directory, we structure our deliverables into three flexible packages. You get complete ownership of the code, sitemaps, domain integration support, and developer review sprints without high pricing.
          </p>
        </div>
      }
      benefitsTitle="Why Grow with Our Affordable Web Design Agency?"
      benefitsSubtitle="We construct low cost website development packages that maximize your digital marketing return."
      benefits={[
        {
          icon: "fa-solid fa-tags",
          title: "Affordable Web Design Agency",
          description: "Flexible packages starting at ₹15,000 for standard local business profiles with no maintenance contracts.",
        },
        {
          icon: "fa-solid fa-gauge-high",
          title: "Fast Loading Framework",
          description: "We deploy static pages on CDNs so they render instantly, improving both user experience and local search rankings.",
        },
        {
          icon: "fa-solid fa-comments",
          title: "WhatsApp Leads Hook",
          description: "We embed click-to-chat links, letting customers initiate consultation inquiries on mobile with one click.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "Local Schema Structured",
          description: "Injected local company schema markup code to rank higher in local search engine result maps.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "Zero Database Risks",
          description: "Using headless static pages removes SQL injection database vulnerabilities, keeping assets safe.",
        },
        {
          icon: "fa-solid fa-user-gear",
          title: "Direct Support Channels",
          description: "Direct connection with developer Saravanan to configure domain redirections and monthly updates.",
        },
      ]}
      processTitle="Our Web Project Workflow"
      processSubtitle="A structured, cost-effective project pipeline from wireframe layouts to live deployment."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-compass-drafting",
          title: "Wireframe & LSI Plan",
          description: "We design simple page layout drafts customized to match your branding guides and local searches.",
        },
        {
          step: "2",
          icon: "fa-solid fa-code",
          title: "React/Next.js Coding",
          description: "We convert layout drafts into fast, fully responsive, semantic HTML and Tailwind CSS code.",
        },
        {
          step: "3",
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "On-Page SEO Configuration",
          description: "We configure structured JSON-LD schemas, local keyword metadata, and sitemaps.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "Live Setup & Indexing",
          description: "We configure domain DNS, check Google PageSpeed metrics, and submit pages to search tools.",
        },
      ]}
      pricingTitle="Website Design Price in Chennai"
      pricingSubtitle="Select the package that fits your objectives. Zero hidden costs."
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
          question: "How much does a custom website design cost in Chennai?",
          answer: "A custom website design in Chennai starts from ₹15,000 for a starter business landing page. Custom website development projects, complex e-commerce portals, and enterprise web solutions are priced based on the page count, custom features, API integrations, and ongoing technical support needs.",
        },
        {
          question: "Why is Next.js better than traditional WordPress for local SEO?",
          answer: "Next.js websites load under 1.5 seconds and score 95+ on Core Web Vitals, which is a major Google ranking factor. Unlike legacy WordPress, Next.js generates static HTML pre-rendered on global CDNs, has no heavy databases or plugins to hack, and outputs clean, semantic code with optimized meta tags and structured local schemas for local search maps ranking.",
        },
        {
          question: "How fast should a corporate website load to rank on Google?",
          answer: "A corporate website should ideally load in under 2 seconds. According to Google speed guidelines, any site loading slower than 3 seconds suffers from high mobile bounce rates, directly harming organic search visibility. Building websites with modern frameworks like React and Next.js ensures maximum speed and lower bounce rates.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development-company-chennai", label: "Web Development Chennai" },
        { href: "/website-design-company-in-chennai", label: "Web Design Chennai" },
        { href: "/seo-services-in-chennai", label: "SEO Services Chennai" },
      ]}
    />
  );
}
