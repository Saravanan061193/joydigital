import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "SEO Services in Chennai & Maps Pack | Joy Digital",
  description: "Dominate Google Maps 3-Pack and local search rankings with Joy Digital's local SEO services in Chennai. Multi-location citations, NAP audits & GA4 lead tracking.",
  alternates: {
    canonical: "https://joydigital.in/seo-services-in-chennai",
  },
  openGraph: {
    title: "SEO Services in Chennai & Maps Pack | Joy Digital",
    description: "Dominate Google Maps 3-Pack and local search rankings with Joy Digital's local SEO services in Chennai. Multi-location citations, NAP audits & GA4 lead tracking.",
    url: "https://joydigital.in/seo-services-in-chennai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Services in Chennai & Maps Pack | Joy Digital",
    description: "Dominate Google Maps 3-Pack and local search rankings with Joy Digital's local SEO services in Chennai. Multi-location citations, NAP audits & GA4 lead tracking.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Local SEO Services in Chennai",
  "serviceType": "Search Engine Optimization Services",
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
  "description": "Joy Digital helps local companies improve their map placements, optimize directory listings, and rank for nearby search queries in Chennai and across India.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "10000",
    "highPrice": "30000",
    "offerCount": "3"
  }
};

export default function SEOServicesChennai() {
  return (
    <ServicePageTemplate
      serviceName="SEO Services Chennai"
      heroTitle="Best SEO Services in Chennai"
      heroSubtitle="Dominate local Google search rankings and get ranked in the Google Maps Local 3-Pack. As the leading local SEO agency in Chennai, we build high-authority citations and optimize search metadata to drive continuous customer inquiries."
      leadSource="SEO Services Chennai Landing Page"
      canonicalUrl="https://joydigital.in/seo-services-in-chennai"
      overviewTitle="Scale Organic Traffic and Leads for Your Chennai Business"
      overviewContent={
        <div className="space-y-6">
          <p>
            When customers need local services&mdash;whether searching for a clinic, Travels, real estate agent, or retail showroom in Chennai&mdash;they open Google Maps or search queries like &ldquo;best Travels in Chennai&rdquo; or &ldquo;insurance agent near me&rdquo;. If your business is not showing up in the top three map results (the Google Maps 3-Pack), you are losing high-intent leads to competitors.
          </p>
          <p>
            At Joy Digital, our specialized <strong>local SEO services in Chennai</strong> focus on ranking your business where buying intent is highest. We set up Google Business Profiles, correct Name, Address, and Phone (NAP) details, and structure localized landing pages to capture search engine traffic.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Relevance, Distance, and Prominence: The Local SEO Pillars</h3>
          <p>
            Google ranks map results using three core parameters: relevance (matching search queries), distance (proximity to searcher), and prominence (brand authority). We optimize these signals by injecting local business schemas on your website, listing your details in trusted directories, and setting up review acquisition links.
          </p>
          <p>
            We also design location landing pages targeting Chennai neighborhoods and Tamil Nadu cities. This structure allows your site to capture search queries from surrounding areas, sending a steady stream of call clicks and contact form submissions to your team.
          </p>
        </div>
      }
      benefitsTitle="How SEO Drives Long-Term Local Revenue"
      benefitsSubtitle="We optimize search signals to boost your visibility on Google Maps and search results."
      benefits={[
        {
          icon: "fa-solid fa-map-pin",
          title: "Rank in the Maps 3-Pack",
          description: "We optimize your profile to rank in the top three spots of Google Maps, which receive over 70% of local click traffic.",
        },
        {
          icon: "fa-solid fa-phone-volume",
          title: "Increase Phone Inquiries",
          description: "Optimized mobile profiles display click-to-call, directions, and website links, driving direct lead actions.",
        },
        {
          icon: "fa-solid fa-folder-open",
          title: "Consistent NAP Citations",
          description: "We standardize your Name, Address, and Phone coordinates across directory platforms to build search engine trust.",
        },
        {
          icon: "fa-solid fa-star",
          title: "Review Acquisition Links",
          description: "We generate short review collection links and prompts to help your business earn positive star feedback.",
        },
        {
          icon: "fa-solid fa-globe-asia",
          title: "Local Schema Injection",
          description: "We inject JSON-LD coordinates, hours, and addresses into your HTML code, helping crawlers confirm your location.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Target Surrounding Areas",
          description: "We create location-specific copy to capture nearby queries, widening your target customer radius.",
        },
      ]}
      processTitle="Our Local SEO Roadmap"
      processSubtitle="How we audit citations and optimize local business indicators to improve rankings."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass-location",
          title: "Profile & Citation Audit",
          description: "We analyze competitor profile positions, audit directory listings, and map target search keywords.",
        },
        {
          step: "2",
          icon: "fa-solid fa-pen-to-square",
          title: "Google Profile Setup",
          description: "We optimize your profile name, select categories, write keyword descriptions, and configure layouts.",
        },
        {
          step: "3",
          icon: "fa-solid fa-list-check",
          title: "Citation Directory Building",
          description: "We submit your standardized NAP details to trusted regional directory sites and citation hubs.",
        },
        {
          step: "4",
          icon: "fa-solid fa-comments",
          title: "Review & Post Maintenance",
          description: "We configure review collection templates, respond to feedback, and publish updates to maintain rankings.",
        },
      ]}
      pricingTitle="Affordable Local SEO Plans"
      pricingSubtitle="Select the monthly package tailored to your target keyword density. No hidden setup fees."
      pricingTiers={[
        {
          name: "Single Location Plan",
          price: "₹10,000",
          period: "/month",
          description: "Best for local stores, medical clinics, and service providers targeting their home city.",
          features: [
            "1 Google Business Profile Optimization",
            "Target Up to 10 Local Keywords",
            "50+ Local Citation Directory Listings",
            "Duplicate Profile Audits & Cleanup",
            "Review Acquisition Setup & Shortcuts",
            "Monthly Local Ranking Performance Reports",
          ],
          ctaText: "Choose Single Plan",
        },
        {
          name: "Regional Growth Plan",
          price: "₹18,000",
          period: "/month",
          description: "Perfect for companies serving multiple towns or surrounding districts.",
          isPopular: true,
          features: [
            "Up to 3 Google Business Profiles",
            "Target Up to 25 Local Keywords",
            "120+ High-Authority Local Citations",
            "JSON-LD Schema Markup Integration",
            "2 Target Location Pages Copywriting",
            "Competitor Map Placement Audits",
          ],
          ctaText: "Choose Regional Plan",
        },
        {
          name: "Multi-Location Enterprise",
          price: "₹30,000",
          period: "/month",
          description: "For franchise businesses and multi-branch companies targeting competitive search terms.",
          features: [
            "Unlimited Google Profile Management",
            "Custom Citation Building Campaigns",
            "Localized Content & Blog Clusters",
            "Review Replying & Q&A Management",
            "Geotagged Image Updates & Posts",
            "Dedicated Accounts Manager Support",
          ],
          ctaText: "Contact for Proposal",
        },
      ]}
      faqs={[
        {
          question: "How long does it take to see results from Local SEO in Chennai?",
          answer: "Local SEO optimizations can show improvements in 30 to 60 days. Standard profile category tweaks and building consistent directory listings help map positions rise steadily over 3 to 6 months.",
        },
        {
          question: "Do you guarantee #1 ranking on Google Maps?",
          answer: "No reputable agency can guarantee #1 rankings due to constant algorithm updates. We implement search-compliant optimization practices that consistently build prominence scores to secure top results.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/seo-company-chennai", label: "SEO Company Chennai" },
        { href: "/seo-services-chennai", label: "SEO Services Chennai" },
        { href: "/website-design-company-in-chennai", label: "Web Design Chennai" },
        { href: "/website-development-company-chennai", label: "Web Development Chennai" },
        { href: "/digital-marketing-agency-in-chennai", label: "Digital Marketing Agency Chennai" },
      ]}
    />
  );
}
