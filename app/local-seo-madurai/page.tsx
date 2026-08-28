import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Local SEO Services in Madurai | Google Maps Ranking",
  description: "Rank #1 in Google Maps Local 3-Pack. We optimize your Google Business Profile and local citations to attract organic local leads in Madurai.",
  alternates: {
    canonical: "https://joydigital.in/local-seo-madurai",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Local SEO & Google Maps Marketing in Madurai",
  "serviceType": "Google Business Profile and Citation Building Services",
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
  "description": "Joy Digital provides specialized Local SEO services in Madurai, helping dentists, retailers, hotels, and schools rank higher on Google Maps search queries.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "2"
  }
};

export default function LocalSeoMadurai() {
  return (
    <ServicePageTemplate
      serviceName="Local SEO Madurai"
      heroTitle="Local SEO Services in Madurai"
      heroSubtitle="Get found by customers searching for your services nearby. We optimize your Google Maps profile, build local citations, and drive organic phone calls and visits."
      leadSource="Local SEO Madurai Landing Page"
      heroCtaText="Claim Free Maps Audit"
      canonicalUrl="https://joydigital.in/local-seo-madurai"
      overviewTitle="Google Business Profile Optimization & Near-Me Search Ranks"
      overviewContent={
        <div className="space-y-6">
          <p>
            When residents in Madurai look for a local clinic, hotel, playschool, or hardware store, they turn to their phones and type &quot;near me&quot; or search directly on Google Maps. If your location does not appear in the top 3 spots, you are missing out on highly qualified local inquiries.
          </p>
          <p>
            At Joy Digital, we provide local search engine optimization (Local SEO) services in Madurai. We audit citation consistency, manage and optimize Google Business Profile listings, and build high-quality regional directory listings.
          </p>
        </div>
      }
      benefitsTitle="Bespoke Local SEO Features"
      benefitsSubtitle="We optimize listings to drive clicks, physical store visits, and call conversions."
      benefits={[
        {
          icon: "fa-solid fa-map-pin",
          title: "GBP Setup & Optimization",
          description: "We verify listings, audit categories, write keyword descriptions, and optimize reviews setup.",
        },
        {
          icon: "fa-solid fa-address-book",
          title: "NAP Consistency Audits",
          description: "We clean up business Name, Address, and Phone listings across online indexes to build rank authority.",
        },
        {
          icon: "fa-solid fa-globe",
          title: "Local Schema Coding",
          description: "We inject customized LocalBusiness and GeoCoordinates JSON-LD schemas into your website header.",
        },
        {
          icon: "fa-solid fa-comments-dollar",
          title: "WhatsApp Leads Hook",
          description: "Connect physical search queries directly to quick WhatsApp button templates on mobile.",
        },
        {
          icon: "fa-solid fa-list-check",
          title: "Tamil Nadu Citations Directory",
          description: "We submit listings to local search portals and directories (Justdial, Sulekha, Indiamart) to increase ranking.",
        },
        {
          icon: "fa-solid fa-chart-simple",
          title: "Google Maps Analytics Reporting",
          description: "We track and compile metrics on GBP views, direct phone calls, map route requests, and web clicks.",
        },
      ]}
      processTitle="How We Optimize Local Map Ranks"
      processSubtitle="A systematic citation checklist to build local trust."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-clipboard-question",
          title: "Google Map Audit",
          description: "We inspect your map rankings, search keywords, photo count, and rival reviews.",
        },
        {
          step: "2",
          icon: "fa-solid fa-pen-nib",
          title: "Metadata & Photo Updates",
          description: "We optimize listing keywords, upload geotagged images, and add service attributes.",
        },
        {
          step: "3",
          icon: "fa-solid fa-code",
          title: "Structured Site Updates",
          description: "We insert maps coordinates and address text details into website microdata tags.",
        },
        {
          step: "4",
          icon: "fa-solid fa-link",
          title: "Directory Citation Submissions",
          description: "We submit business profiles to regional indexes to establish location authority.",
        },
      ]}
      pricingTitle="Local SEO Setup Packages"
      pricingSubtitle="Clear, transparent pricing designed to increase phone calls and store visits."
      pricingTiers={[
        {
          name: "Local Maps Setup",
          price: "₹15,000",
          period: "one-time setup",
          description: "Perfect for local physical storefronts, doctors, and professional advisors.",
          features: [
            "Complete Google Business Profile Setup",
            "Keyword-Rich Bio & Services Listings",
            "Geotagged Visual Assets Uploads",
            "30 Indian Directory Listings Submissions",
            "LocalBusiness Schema Web Code Integration",
            "Review Request Template Card creation",
          ],
          ctaText: "Select Setup Plan",
        },
        {
          name: "GBP Local Growth Retainer",
          price: "₹15,000",
          period: "per month",
          description: "Recommended for clinics, multi-branch stores, and hotels wanting constant lead flows.",
          isPopular: true,
          features: [
            "Monthly Local Directory Building (15 Listings)",
            "Ongoing Map Listing Posting (2 Posts/week)",
            "Review Management & Reply Support",
            "Local Competitor SEO tracking audits",
            "Mobile Google Maps Rank Tracking updates",
            "Monthly GBP Analytics Progress Report",
          ],
          ctaText: "Choose Growth Plan",
        },
      ]}
      faqs={[
        {
          question: "Why is NAP consistency so important?",
          answer: "Google cross-references Name, Address, and Phone details across directories. Discrepancies reduce search engine trust, resulting in lower maps visibility.",
        },
        {
          question: "Can you remove negative Google Map reviews?",
          answer: "No agency can delete genuine reviews. However, we can help flag spam reviews violating Google terms and build campaigns to collect positive ones.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-design-company-madurai", label: "Web Design Madurai" },
        { href: "/seo-company-madurai", label: "SEO Company Madurai" },
        { href: "/portfolio", label: "View Portfolio" },
      ]}
    />
  );
}
