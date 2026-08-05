import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Next.js Web Development Company in Chennai | Fast React Sites",
  description: "Looking for a Next.js web development company in Chennai? We are fast loading website developers specializing in react js web app development.",
  alternates: {
    canonical: "https://joydigital.in/website-development-company-chennai",
  },
  openGraph: {
    title: "Next.js Web Development Company in Chennai | Fast React Sites",
    description: "Looking for a Next.js web development company in Chennai? We are fast loading website developers specializing in react js web app development.",
    url: "https://joydigital.in/website-development-company-chennai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Web Development Company in Chennai | Fast React Sites",
    description: "Looking for a Next.js web development company in Chennai? We are fast loading website developers specializing in react js web app development.",
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
      "streetAddress": "Old Perungalathur",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600063",
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

export default function NextJsWebDevChennai() {
  return (
    <ServicePageTemplate
      serviceName="Next.js Web Development Company Chennai"
      heroTitle="Next.js Web Development Company in Chennai"
      heroSubtitle="Get dynamic React JS web app development and launch fast loading website assets. As a leading Next.js web development company in Chennai, we build platforms that rank top on search results."
      leadSource="Next.js Web Development Chennai Landing Page"
      canonicalUrl="https://joydigital.in/website-development-company-chennai"
      overviewTitle="High-Speed Next.js & React JS Web App Development in Chennai"
      overviewContent={
        <div className="space-y-6">
          <p>
            For modern businesses seeking maximum conversions and top search rankings, standard website templates no longer suffice. We are a specialized <strong>Next.js web development company in Chennai</strong> focused on coding custom React sites. We bypass slow databases and heavy plugins to engineer platforms that load in under 1.5 seconds.
          </p>
          <p>
            As professional <strong>fast loading website developers</strong>, our team structures every element of your project for speed, search visibility, and conversion. From local GBP alignment to complex API syncs, we handle the technical design so you can grow your business.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why React JS Web App Development Leads the Market</h3>
          <p>
            Using legacy builders like WordPress often introduces server latency, bloated Javascript chunks, and security vulnerabilities. Our <strong>React JS web app development</strong> utilizes modern serverless hosting on global CDNs. This guarantees 100% uptime, zero database injection risks, and an instant mobile rendering experience for your visitors.
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
          description: "We map out navigation flow, LSI keywords, and wireframe pages customized to your local industry niche.",
        },
        {
          step: "2",
          icon: "fa-solid fa-code",
          title: "React/Next.js Coding Sprints",
          description: "We convert your approved Figmas into fast, semantic, fully responsive HTML & TypeScript code.",
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
          question: "Why is Next.js better than traditional WordPress for local SEO?",
          answer: "Next.js websites load under 1.5 seconds and score 95+ on Core Web Vitals, which is a major Google ranking factor. Unlike legacy WordPress, Next.js generates static HTML pre-rendered on global CDNs, has no heavy databases or plugins to hack, and outputs clean, semantic code with optimized meta tags and structured local schemas for local search maps ranking.",
        },
        {
          question: "How fast should a corporate website load to rank on Google?",
          answer: "A corporate website should ideally load in under 2 seconds. According to Google speed guidelines, any site loading slower than 3 seconds suffers from high mobile bounce rates, directly harming organic search visibility. Building websites with modern frameworks like React and Next.js ensures maximum speed and lower bounce rates.",
        },
        {
          question: "How much does a custom website design cost in Chennai?",
          answer: "A custom website design in Chennai starts from ₹15,000 for a starter business landing page. Custom website development projects, complex e-commerce portals, and enterprise web solutions are priced based on the page count, custom features, API integrations, and ongoing technical support needs.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-design-company-in-chennai", label: "Web Design Chennai" },
        { href: "/seo-services-in-chennai", label: "SEO Services Chennai" },
        { href: "/affordable-web-design-agency-chennai", label: "Affordable Web Design" },
      ]}
    />
  );
}
