import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "SEO Services in Chennai | Local Business SEO Company",
  description: "Scale organic search traffic. Joy Digital is a premium SEO company in Chennai, delivering map pack rankings, technical code audits, and keyword optimization.",
  alternates: {
    canonical: "https://joydigital.in/seo-services-chennai",
  },
  openGraph: {
    title: "SEO Services in Chennai | Local Business SEO Company",
    description: "Scale organic search traffic. Joy Digital is a premium SEO company in Chennai, delivering map pack rankings, technical code audits, and keyword optimization.",
    url: "https://joydigital.in/seo-services-chennai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Services in Chennai | Local Business SEO Company",
    description: "Scale organic search traffic. Joy Digital is a premium SEO company in Chennai, delivering map pack rankings, technical code audits, and keyword optimization.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SEO Services in Chennai",
  "serviceType": "Search Engine Optimization",
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
      "addressCountry": "IN"
    }
  },
  "description": "Joy Digital is a results-driven SEO company in Chennai. We analyze site speed, resolve crawl blocks, configure local schemas, and setup GA4 tracking.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "75000",
    "offerCount": "3"
  }
};

export default function SeoServicesChennai() {
  return (
    <ServicePageTemplate
      serviceName="SEO Services Chennai"
      heroTitle="SEO Services in Chennai"
      heroSubtitle="Drive high-intent Google search traffic to your landing pages. As an expert SEO company in Chennai, we optimize code layouts, structure indexing schemas, and track customer lead events."
      leadSource="SEO Services Chennai Landing Page"
      canonicalUrl="https://joydigital.in/seo-services-chennai"
      overviewTitle="Technical Website Audits & SEO Services in Chennai"
      overviewContent={
        <div className="space-y-6 text-justify">
          <p>
            For startups, professional service agencies, and corporate businesses in Chennai—competing in high-density markets like T.Nagar, Adyar, and the OMR IT corridor—appearing on Google page one is crucial for capturing inbound leads. Standard business listings are often buried under national aggregators or competitors with better search strategies. We are a results-focused <strong>SEO company in Chennai</strong> specialized in performing in-depth technical code audits, keyword alignment, map packs optimization, and analytics event tracking.
          </p>
          <p>
            As professional search marketing experts, we optimize every layer of your website. Standard search agencies often focus only on basic keywords and blogging advice. We correct heading structures, setup canonical redirects, optimize file sizes, and configure local business schemas. This ensures search engines easily index your services, pushing your website to the top of Google results.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Why Technical Audits and Page Speeds Drive Search Ranks</h3>
          <p>
            Google search crawlers deprioritize slow, bloated websites. If your website has low speed scores, mobile rendering errors, or broken internal links, your rankings will suffer. We design websites using modern serverless Next.js structures that score 95+ on Core Web Vitals, establishing a strong foundation for search visibility.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Dominating Local Google Map pack listing search</h3>
          <p>
            Most mobile users choose service providers from Google Maps. Our map pack optimization coordinates citations across major directories, updates business categories, verifies service areas, and configures review acquisition widgets. By linking your Google Business Profile (GBP) with structured schemas in your website's code, we improve your local search visibility.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Structured Event Analytics and ROI Visibility</h3>
          <p>
            We believe search marketing should lead directly to sales opportunities. We set up Google Search Console and connect Google Analytics 4 (GA4) event trackers to monitor WhatsApp clicks, form submissions, and direct phone calls. This allows you to monitor how many website visitors turn into qualified leads, providing clear insight into your ROI.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Chennai SEO Team?"
      benefitsSubtitle="We construct SEO setups designed to target commercial terms and drive calls in Chennai."
      benefits={[
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "Technical Code Audits",
          description: "Scan layouts to resolve rendering errors, clean semantic tags, and check redirects.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Google Map Rankings",
          description: "Optimize Google Business Profile (GBP) categories and local directory citations.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Core Web Vitals Speed",
          description: "Improve page speeds, reducing mobile bounce rates and helping your site rank higher.",
        },
        {
          icon: "fa-solid fa-code",
          title: "Structured Schema markup",
          description: "Implement LocalBusiness and FAQ schemas to help search engines index your pages.",
        },
        {
          icon: "fa-solid fa-link",
          title: "Crawl & Sitemap Optimization",
          description: "Setup clean canonical tags, check robots.txt, and configure XML sitemaps.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Conversion Tracking Setup",
          description: "Monitor user clicks on phone numbers and WhatsApp buttons using GA4.",
        },
      ]}
      processTitle="Our Technical SEO Roadmaps"
      processSubtitle="We improve and scale your search presence in 4 structured phases."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass",
          title: "Technical SEO Audit",
          description: "We inspect layout files, check mobile responsiveness, and compile key search terms.",
        },
        {
          step: "2",
          icon: "fa-solid fa-screwdriver-wrench",
          title: "On-Page Code Adjustments",
          description: "We optimize heading tags, configure meta descriptions, and set canonical tags.",
        },
        {
          step: "3",
          icon: "fa-solid fa-map-location-dot",
          title: "Maps Listing & Schema Setup",
          description: "We verify profile categories, sync citations, and inject custom JSON-LD schema codes.",
        },
        {
          step: "4",
          icon: "fa-solid fa-square-poll-vertical",
          title: "Analytics Integration & Reports",
          description: "We connect GA4 trackers, verify GSC sitemaps, and deliver monthly rankings progress reports.",
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
          description: "For e-commerce stores, national campaigns, and corporate networks.",
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
          question: "How long does it take to rank on Google in Chennai?",
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
        { href: "/seo-company-chennai", label: "SEO Company Chennai" },
        { href: "/seo-services-in-chennai", label: "SEO Services in Chennai" },
        { href: "/digital-marketing-agency-in-chennai", label: "Digital Marketing Chennai" },
        { href: "/affordable-web-design-agency-chennai", label: "Affordable Web Design Chennai" },
        { href: "/website-development-company-chennai", label: "Web Development Chennai" },
      ]}
    />
  );
}
