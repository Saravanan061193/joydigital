import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Local SEO Services in Madurai | Google Maps Ranking - Joy Digital",
  description: "Joy Digital is the premier Local SEO company in Madurai, India. We rank your business in the Google Maps 3-Pack and optimize local citation directories.",
  alternates: {
    canonical: "https://joydigital.in/local-seo-services",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Local SEO Services",
  "serviceType": "Local Search Engine Optimization Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Madurai Main Road",
      "addressLocality": "Madurai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "625001",
      "addressCountry": "IN"
    }
  },
  "description": "Joy Digital helps local companies improve their map placements, optimize directory listings, and rank for nearby search queries in Madurai and across India.",
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
      heroSubtitle="Help nearby customers find your business when they search for your services. As a leading local seo company in Madurai, we optimize Google Map profiles, build directory citations, and structure local content to grow your search visibility and drive calls."
      leadSource="Local SEO Landing Page"
      overviewTitle="Connecting Local Businesses with High-Intent Nearby Customers"
      overviewContent={
        <div className="space-y-6">
          <p>
            When customers need local services&mdash;whether they are looking for a clinic, a retail shop, or a local contractor&mdash;they turn to Google Maps or search queries like &ldquo;best services near me&rdquo;. If your business does not show up in the top three map results (the Google Local Pack), you are missing out on high-intent lead opportunities to local competitors.
          </p>
          <p>
            At Joy Digital, our specialized <strong>local seo services madurai</strong> focus on helping regional businesses improve their search engine exposure. We handle Google Business Profile setups, correct Name, Address, and Phone (NAP) inconsistencies across web directories, and build localized landing pages. This structured optimization helps your store or clinic appear in map packs and local searches where buying intent is highest.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why Local Search Presence and Maps Algorithms Matter</h3>
          <p>
            Local SEO matches search queries with local intent. Google ranks map results based on three main pillars: relevance, distance, and prominence. We help optimize these areas by adding local business schemas to your website, cleaning up directory listings, building local backlinks, and setting up systematic review systems that build credibility.
          </p>
          <p>
            We also build location landing pages that target specific zip codes, neighborhoods, and suburbs in Madurai and surrounding Tamil Nadu districts. This architecture allows your business to rank across multiple service areas, generating a steady stream of customer phone calls, driving directions requests, and qualified contact form submissions.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">The Role of Citations and Directory Integrity</h3>
          <p>
            Search engines crawl directories like Justdial, Sulekha, YellowPages, and regional portals to verify your business details. Even a minor discrepancy, such as writing &ldquo;Avenue&rdquo; in one place and &ldquo;Ave.&rdquo; in another, can confuse algorithms and lower your prominence scores. We perform exhaustive citation cleanups, ensuring that your NAP info is 100% consistent across all directory platforms.
          </p>
        </div>
      }
      benefitsTitle="Why Local Search Optimization is Essential"
      benefitsSubtitle="We help set up and optimize local search signals to improve your rankings on Google Maps and search results."
      benefits={[
        {
          icon: "fa-solid fa-map-pin",
          title: "Dominate the Maps 3-Pack",
          description: "We optimize your profile to help you rank in the top three Google Maps spots, where over 70% of local search clicks happen, driving traffic.",
        },
        {
          icon: "fa-solid fa-phone-volume",
          title: "Drive Direct Inquiries",
          description: "Optimized mobile map listings feature direct buttons for phone calls, website visits, and driving directions, increasing lead capture.",
        },
        {
          icon: "fa-solid fa-folder-open",
          title: "NAP Directory Consistency",
          description: "We verify and correct your Business Name, Address, and Phone numbers across directories to build search engine trust and authority.",
        },
        {
          icon: "fa-solid fa-star",
          title: "Review Acquisition Systems",
          description: "We set up review shortcuts and templates to help your team earn positive customer feedback, which directly improves map rankings.",
        },
        {
          icon: "fa-solid fa-globe-asia",
          title: "Local Business Schema",
          description: "We inject JSON-LD coordinates, address blocks, and opening hours into your HTML, helping search crawlers identify your exact location.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Target Service Areas",
          description: "We create location-specific pages to capture search queries from surrounding towns and zip codes, expanding your market reach.",
        },
      ]}
      processTitle="Our Local SEO Workflow"
      processSubtitle="We clean up existing search directory profiles and optimize location assets to improve your maps visibility."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass-location",
          title: "Profile & Citation Audit",
          description: "We check duplicate business listings, find incorrect phone numbers, and audit competitor map positions to draft an optimization roadmap.",
        },
        {
          step: "2",
          icon: "fa-solid fa-pen-to-square",
          title: "Profile Optimization",
          description: "We optimize categories, add keyword descriptions, upload geotagged photos, and list services on your Google profile for relevance.",
        },
        {
          step: "3",
          icon: "fa-solid fa-list-check",
          title: "Citation Link Building",
          description: "We list your business details in trusted regional directories and maps sources to establish search engine validation.",
        },
        {
          step: "4",
          icon: "fa-solid fa-comments",
          title: "Review & Map Upkeep",
          description: "We launch review acquisition links, reply to customer feedback, and post profile updates to maintain search engine interest.",
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
          question: "What is the difference between SEO and Local SEO in Madurai?",
          answer: "General SEO focuses on ranking websites for queries without location constraints (like national or global keywords). Local SEO optimizes your search presence to appear for location-specific queries (e.g., 'dentist in Madurai') on Google Maps and localized search results.",
        },
        {
          question: "How does Google rank local map listings in India?",
          answer: "Google's local algorithm ranks results based on three main factors: Relevance (how well your profile details match the query), Distance (how close your business is to the searcher), and Prominence (your business authority, reviews, and directory backlinks).",
        },
        {
          question: "Why is NAP consistency important for Local SEO?",
          answer: "NAP stands for Name, Address, and Phone number. If search engines find different spelling variations or phone numbers across directories, it reduces their trust in your business location, which can lower your map rankings. We ensure complete standardization.",
        },
        {
          question: "Can you help me get customer reviews on Google?",
          answer: "Yes, we set up review collection templates, write email prompts, and generate clickable review links to make it easier for your customers to share feedback on your profile. Reviews are a crucial ranking factor.",
        },
        {
          question: "Do I need a physical office for Local SEO?",
          answer: "Not necessarily. Service area businesses (like plumbers, electricians, or cleaning services) that travel to clients can hide their physical address on Google Maps while still ranking for their target service locations in Madurai.",
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
