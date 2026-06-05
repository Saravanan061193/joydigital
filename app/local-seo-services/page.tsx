import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Expert Local SEO Services | Google Maps Ranking | Joy Digital",
  description: "Rank in the Google Maps 3-Pack, get customer calls, and dominate local search results. We offer comprehensive local citations and review campaign setups.",
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Local SEO Services",
  "serviceType": "Local Search Engine Optimization Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital Growth Agency",
    "image": "https://joydigitalmarketing.in/assets/images/logo.png",
    "telephone": "+919080026133",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Madurai Main Road",
      "addressLocality": "Madurai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "625001",
      "addressCountry": "IN"
    }
  },
  "description": "Joy Digital helps local companies improve their map placements, optimize directory listings, and rank for nearby search queries.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "10000",
    "highPrice": "30000",
    "offerCount": "3"
  }
};

export default function LocalSEOPage() {
  return (
    <ServicePageTemplate
      serviceName="Local SEO"
      heroTitle="Dominate Local Search & Rank in the Google Maps 3-Pack"
      heroSubtitle="Help nearby customers find your business when they search for your services. We optimize Google Map profiles, build directory citations, and structure local content to grow your search visibility."
      leadSource="Local SEO Landing Page"
      overviewTitle="Connecting Local Businesses with High-Intent Nearby Customers"
      overviewContent={
        <div className="space-y-6">
          <p>
            When customers need local services—whether they are looking for a clinic, a store, or a contractor—they search on Google Maps or query terms like 'services near me'. If your business does not show up in the top three map results, you are missing out on valuable leads to local competitors.
          </p>
          <p>
            At Joy Digital Growth Agency, we focus on helping regional businesses improve their local search exposure. We handle Google Business Profile setups, correct name, address, and phone (NAP) inconsistencies across directories, and build localized content. This optimization helps your store or clinic appear in map packs and local searches.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why Local Search Presence Matters</h3>
          <p>
            Local SEO matches search queries with local intent. Google ranks map results based on relevance, distance, and prominence. We help optimize these areas by adding local business schemas to your website, cleaning up directory listings, and setting up review systems.
          </p>
          <p>
            We also build location landing pages that target specific zip codes and neighborhoods. This structure allows your business to rank across multiple service areas, generating a steady stream of customer phone calls and directions requests.
          </p>
        </div>
      }
      benefitsTitle="Why Local Search Optimization is Essential"
      benefitsSubtitle="We help set up and optimize local search signals to improve your rankings on Google Maps and search results."
      benefits={[
        {
          icon: "fa-solid fa-map-pin",
          title: "Dominate the Map Pack",
          description: "We optimize your profile to help you rank in the top three Google Maps spots, where most local search clicks happen.",
        },
        {
          icon: "fa-solid fa-phone-volume",
          title: "Drive Direct Inquiries",
          description: "Optimized mobile map listings feature direct buttons for phone calls, website visits, and driving directions.",
        },
        {
          icon: "fa-solid fa-folder-open",
          title: "NAP Directory Consistency",
          description: "We verify and correct your Business Name, Address, and Phone numbers across directories to build search engine trust.",
        },
        {
          icon: "fa-solid fa-star",
          title: "Review Acquisition Systems",
          description: "We set up review shortcuts and templates to help your team earn positive customer feedback, which improves map rankings.",
        },
        {
          icon: "fa-solid fa-globe-asia",
          title: "Local Business Schema",
          description: "We inject JSON-LD coordinates, address blocks, and opening hours into your HTML, helping search crawlers read your location.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Target Service Areas",
          description: "We create location-specific pages to capture search queries from surrounding towns and zip codes.",
        },
      ]}
      processTitle="Our Local SEO Workflow"
      processSubtitle="We clean up existing search directory profiles and optimize location assets to improve your maps visibility."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass-location",
          title: "Profile & Citation Audit",
          description: "We check duplicate business listings, find incorrect phone numbers, and audit competitor map positions.",
        },
        {
          step: "2",
          icon: "fa-solid fa-pen-to-square",
          title: "Profile Setup & Optimization",
          description: "We optimize categories, add keyword descriptions, upload geotagged photos, and list services on your Google profile.",
        },
        {
          step: "3",
          icon: "fa-solid fa-list-check",
          title: "Citation Link Building",
          description: "We list your business in trusted regional directories to establish search engine validation.",
        },
        {
          step: "4",
          icon: "fa-solid fa-comments",
          title: "Review & Map Upkeep",
          description: "We launch review acquisition links, reply to customer feedback, and post profile updates to maintain search interest.",
        },
      ]}
      pricingTitle="Economical Local SEO Plans"
      pricingSubtitle="Select a plan tailored to your service area size and keyword difficulty. Zero setup fees."
      pricingTiers={[
        {
          name: "Single Location Plan",
          price: "₹10,000",
          period: "/month",
          description: "Best for local stores, clinics, and service providers targeting their immediate city area.",
          features: [
            "1 Google Business Profile Optimization",
            "Target Up to 10 Local Keywords",
            "50+ Local Citation Listing Submissions",
            "Duplicate Listing Audits & Cleanup",
            "Review Acquisition Setup & Shortcuts",
            "Monthly Local Ranking Performance Reports",
          ],
          ctaText: "Choose Single Plan",
        },
        {
          name: "Regional Growth Plan",
          price: "₹18,000",
          period: "/month",
          description: "Perfect for businesses serving multiple surrounding towns or districts.",
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
          question: "What is the difference between SEO and Local SEO?",
          answer: "General SEO focuses on ranking websites for queries without location constraints. Local SEO optimizes your search presence to appear for location-specific queries (e.g., 'dentist in Madurai') on Google Maps and localized search results.",
        },
        {
          question: "How does Google rank local map listings?",
          answer: "Google's local algorithm ranks results based on three main factors: Relevance (how well your profile matches the query), Distance (how close your business is to the searcher), and Prominence (your business authority, reviews, and directory backlinks).",
        },
        {
          question: "Why is NAP consistency important for Local SEO?",
          answer: "NAP stands for Name, Address, and Phone number. If search engines find different spelling variations or phone numbers across directories, it reduces their trust in your business location, which can lower your map rankings.",
        },
        {
          question: "Can you help me get customer reviews on Google?",
          answer: "Yes, we set up review collection templates, write email prompts, and generate clickable review links to make it easier for your customers to share feedback on your profile.",
        },
        {
          question: "Do I need a physical office for Local SEO?",
          answer: "Not necessarily. Service area businesses (like plumbers or cleaning services) that travel to clients can hide their physical address on Google Maps while still ranking for their target service locations.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/google-business-profile-setup", label: "GBP Optimization" },
        { href: "/seo-services", label: "SEO Services" },
        { href: "/website-development", label: "Web Development" },
      ]}
    />
  );
}
