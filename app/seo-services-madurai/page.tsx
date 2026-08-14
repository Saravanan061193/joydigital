import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "SEO Services in Madurai | Google Map Rankings Optimization",
  description: "Boost your organic ranks. Joy Digital offers expert SEO services in Madurai, specializing in local search, GMB/GBP map ranking, and keyword optimization.",
  alternates: {
    canonical: "https://joydigital.in/seo-services-madurai",
  },
  openGraph: {
    title: "SEO Services in Madurai | Google Map Rankings Optimization",
    description: "Boost your organic ranks. Joy Digital offers expert SEO services in Madurai, specializing in local search, GMB/GBP map ranking, and keyword optimization.",
    url: "https://joydigital.in/seo-services-madurai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Services in Madurai | Google Map Rankings Optimization",
    description: "Boost your organic ranks. Joy Digital offers expert SEO services in Madurai, specializing in local search, GMB/GBP map ranking, and keyword optimization.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SEO Services in Madurai",
  "serviceType": "Search Engine Optimization",
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
  "description": "Joy Digital offers expert organic search marketing and local SEO services in Madurai, optimizing your business listings for Meenakshi temple and Anna Nagar areas.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "75000",
    "offerCount": "3"
  }
};

export default function SeoServicesMadurai() {
  return (
    <ServicePageTemplate
      serviceName="SEO Services Madurai"
      heroTitle="SEO Services in Madurai"
      heroSubtitle="Dominate Google organic search and rank top on map pack queries. As a premier provider of SEO services in Madurai, we optimize layouts, setup keywords targets, and capture active calls."
      leadSource="SEO Services Madurai Landing Page"
      canonicalUrl="https://joydigital.in/seo-services-madurai"
      overviewTitle="Organic Google Map Rankings & SEO Services in Madurai"
      overviewContent={
        <div className="space-y-6 text-justify">
          <p>
            Operating a business in Madurai—whether you own a hospital in Anna Nagar, a hotel near the Meenakshi Temple, or a trading company near Kalavasal—requires active search visibility. When customers search for local solutions on their mobiles, they rarely scroll past the first three Google Map results. We offer specialized <strong>SEO services in Madurai</strong> focusing on technical code audits, target keyword alignment, and proximity map rankings optimization. We help small businesses and startups capture active local search traffic without relying on expensive, continuous paid ads.
          </p>
          <p>
            As professional search marketing experts, we analyze every parameter of your business site. Standard SEO agencies often focus only on basic meta tags. We optimize your page loading speeds, correct headings hierarchy, design semantic URL pathways, and remove crawl blocks in robots.txt. This ensures search engines easily index your services, pushing your website to page one.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Why Local Google Map Rankings Matter for Madurai Businesses</h3>
          <p>
            Local search queries represent high-intent buyers looking to call, get directions, or request quotes instantly. Our map pack strategy includes claim verification support, primary categories synchronization, geotagged content uploads, and custom review acquisition structures. By connecting your Google Business Profile (GBP) with structured local schemas in your code, we increase map visibility, attracting qualified leads to your business.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">On-Page and Off-Page Technical Content Optimization</h3>
          <p>
            To rank for competitive terms in Tamil Nadu, you need a website that loads fast and features clean semantic elements. We rebuild slow layouts using modern React/Next.js frameworks and map out structured keyword content. This approach builds site authority, increases organic impressions, and establishes your brand as a trusted partner.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Measurable Conversion Analytics & ROI Tracking</h3>
          <p>
            SEO isn't just about traffic numbers; it's about conversions. We set up Google Search Console and link custom event trackers to your contact fields, WhatsApp buttons, and click-to-call links. This allows you to monitor how many website visitors transition into active calls and sales inquiries, ensuring full transparency.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Madurai SEO Team?"
      benefitsSubtitle="We optimize your search assets to target commercial terms and drive calls."
      benefits={[
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Google Map Rankings",
          description: "Optimize your Google Business Profile (GBP) location tags and local citations to rank in the Local 3-Pack.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "Keyword Focus Strategy",
          description: "Perform detailed search volume analysis to target transactional keywords used by Madurai buyers.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Speed Index Optimization",
          description: "Boost your page load speeds, resolving mobile layout shift issues which directly harm Google ranks.",
        },
        {
          icon: "fa-solid fa-code",
          title: "Structured Schema Setup",
          description: "Implement LocalBusiness, Service, and FAQ schemas to help search bots read your layout value.",
        },
        {
          icon: "fa-solid fa-link",
          title: "Clean Internal Linking",
          description: "Setup semantic URL pathways and crawl structures to index multiple service pages quickly.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Conversion Tracking Suite",
          description: "Monitor user clicks on WhatsApp and telephone numbers using Google Analytics 4.",
        },
      ]}
      processTitle="Our Madurai SEO Roadmap"
      processSubtitle="We optimize and scale your search presence in 4 structured phases."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass",
          title: "SEO Audit & Keyword Plan",
          description: "We scan layout code, identify index blocks, and compile high-intent local keywords.",
        },
        {
          step: "2",
          icon: "fa-solid fa-screwdriver-wrench",
          title: "On-Page Code Adjustments",
          description: "We optimize heading tags, configure metadata description structures, and set canonical tags.",
        },
        {
          step: "3",
          icon: "fa-solid fa-map-location-dot",
          title: "Maps Listing & Schema Setup",
          description: "We sync citations, verify profile categories, and inject custom JSON-LD local schema codes.",
        },
        {
          step: "4",
          icon: "fa-solid fa-square-poll-vertical",
          title: "Analytics Integration & Reports",
          description: "We verify site indexing in GSC, connect GA4 trackers, and deliver monthly rankings progress reports.",
        },
      ]}
      pricingTitle="Transparent SEO Pricing Packages"
      pricingSubtitle="Select the plan that fits your business scale. No hidden fees or long-term lock-in contracts."
      pricingTiers={[
        {
          name: "Local SEO Starter",
          price: "₹15,000",
          period: "monthly",
          description: "Perfect for local service providers, clinic listings, and local portfolios.",
          features: [
            "Local Map Pack Citation Setup",
            "On-page Metadata Optimization",
            "Google Business Profile Setup Support",
            "Google Search Console Integration",
            "Monthly Performance Progress Reports",
            "WhatsApp conversion event tracking",
          ],
          ctaText: "Choose Starter Plan",
        },
        {
          name: "Growth Plan",
          price: "₹25,000",
          period: "monthly",
          description: "Best for growing businesses, multipage sites, and competitive niches.",
          isPopular: true,
          features: [
            "Advanced Multi-Keyword Target SEO",
            "Local Schema Markup Injection",
            "Citations Audit & Duplicate Cleanups",
            "Google Analytics 4 & Clarity tracking",
            "Custom landing page content advice",
            "Monthly ranking audits and consultation",
          ],
          ctaText: "Choose Growth Plan",
        },
        {
          name: "Enterprise Custom",
          price: "Custom Quote",
          description: "For e-commerce stores, national ranking campaigns, and corporate networks.",
          features: [
            "Unlimited Keyword Optimization",
            "E-commerce Schema Setup & Tags",
            "Content Strategy & Landing Page Coding",
            "Advanced Analytics Conversion Funnels",
            "Direct developer coordination support",
            "Custom periodic audit consultations",
          ],
          ctaText: "Get Custom Quote",
        },
      ]}
      faqs={[
        {
          question: "How long does it take to rank on Google in Madurai?",
          answer: "Onsite technical changes and GSC sitemap uploads start indexing within days. Significant increases in organic rankings and local map visibility usually take 3 to 6 months depending on keyword competition.",
        },
        {
          question: "Do you configure Google Business Profiles (GBP)?",
          answer: "Yes. GMB/GBP setup, category selection, local proximity reviews templates, citations sync, and maps packing optimization are core elements of our local search marketing plans.",
        },
        {
          question: "Do I need a custom website to rank?",
          answer: "While you can rank any domain, fast-loading, clean Next.js/React websites achieve significantly higher rankings. Google prioritizes sites with high speed scores and mobile-responsive layouts.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development-company-madurai", label: "Web Development Madurai" },
        { href: "/seo-services-chennai", label: "SEO Services Chennai" },
        { href: "/website-development-company-chennai", label: "Web Development Chennai" },
      ]}
    />
  );
}
