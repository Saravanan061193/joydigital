import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "SEO Company in Coimbatore | Google Maps Optimization Agency",
  description: "Looking for the best SEO company in Coimbatore? We rank local businesses, retail brands, and industrial suppliers on Google Page 1. Free SEO audit.",
  alternates: {
    canonical: "https://joydigital.in/seo-company-coimbatore",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SEO & Digital Marketing Services in Coimbatore",
  "serviceType": "Search Engine Optimization & Google Maps Ranking",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "postalCode": "641001",
      "addressCountry": "IN"
    }
  },
  "description": "Joy Digital is a result-oriented SEO company in Coimbatore, helping businesses drive traffic, rank high for local terms, and optimize search CTRs.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "2"
  }
};

export default function SeoCompanyCoimbatore() {
  return (
    <ServicePageTemplate
      serviceName="SEO Company Coimbatore"
      heroTitle="SEO Company in Coimbatore"
      heroSubtitle="Rank higher on Google and bring more customers to your business. As a top SEO agency in Coimbatore, we optimize websites to gain organic local traffic and maps visibility."
      leadSource="SEO Company Coimbatore Landing Page"
      heroCtaText="Get Free SEO Audit"
      canonicalUrl="https://joydigital.in/seo-company-coimbatore"
      overviewTitle="Increase Search Visibility & Rank for Keywords That Bring Leads"
      overviewContent={
        <div className="space-y-6">
          <p>
            If your website isn&apos;t ranking on page 1 of Google, you are losing valuable customers to competitors every single day. Most buyers looking for services in Coimbatore do not scroll past the first three Google Maps results or organic web links.
          </p>
          <p>
            At Joy Digital, we provide result-oriented SEO services in Coimbatore. We perform thorough technical site audits, target local keywords, build local search citations, and improve your click-through rates.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Coimbatore SEO Team?"
      benefitsSubtitle="We deliver transparent search optimization strategies and performance metrics."
      benefits={[
        {
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "Local SEO Citation Audits",
          description: "We list your company on premium regional directories and clean up incorrect NAP details.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Google Maps Optimization",
          description: "We optimize your Google Business Profile (GBP) to rank in the Local 3-Pack search results.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Technical SEO Audits",
          description: "We optimize schema markups, speed scores, metadata, and canonical links to satisfy search bots.",
        },
        {
          icon: "fa-solid fa-key",
          title: "Keyword Focus Maps",
          description: "We research and target highly specific, high-intent local search terms that convert into buyers.",
        },
        {
          icon: "fa-solid fa-pen-nib",
          title: "SEO Content Architecture",
          description: "We draft blogs and landing pages structured to target and rank for long-tail search terms.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Monthly Progress Reports",
          description: "Transparent ranking trackers, traffic numbers, and conversion analytics maps sent to your desk.",
        },
      ]}
      processTitle="How We Optimize Your Site"
      processSubtitle="A structured, keyword-led checklist to drive organic traffic."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-clipboard-check",
          title: "Website Audit & Scan",
          description: "We analyze site errors, slow load times, title tag lengths, and sitemaps.",
        },
        {
          step: "2",
          icon: "fa-solid fa-magnifying-glass",
          title: "Keyword & Rival Research",
          description: "We map target keywords and examine competitors ranking on Google Page 1.",
        },
        {
          step: "3",
          icon: "fa-solid fa-wrench",
          title: "On-Page Corrections",
          description: "We fix site speeds, insert structured schema codes, and rewrite target meta tags.",
        },
        {
          step: "4",
          icon: "fa-solid fa-link",
          title: "Local Links & GBP",
          description: "We optimize map profiles and build high-quality citations across local indexes.",
        },
      ]}
      pricingTitle="SEO Strategy Packages"
      pricingSubtitle="Clear milestone-based plans designed to scale traffic. No locked contract limits."
      pricingTiers={[
        {
          name: "Local SEO Starter",
          price: "₹15,000",
          period: "one-time setup",
          description: "Perfect for local physical storefronts, clinics, and service professionals.",
          features: [
            "Complete Technical Website Audit",
            "On-Page SEO Optimization (5 Pages)",
            "Google Business Profile Audit",
            "30 Local Citation Listings",
            "Schema Markup Integration",
            "Google Analytics GA4 Setup",
          ],
          ctaText: "Select Local SEO",
        },
        {
          name: "Organic Search Growth Retainer",
          price: "₹15,000",
          period: "per month",
          description: "Recommended for hotels, schools, e-commerce, and expanding companies.",
          isPopular: true,
          features: [
            "Continuous Keyword Rankings Tracking",
            "Metadata Optimizations (Unlimited Pages)",
            "Ongoing Local Citation Building",
            "Content Strategy & Blog Writing Support",
            "Google Business Profile Posting & Management",
            "Monthly Analytics Progress Report",
          ],
          ctaText: "Choose Growth Plan",
        },
      ]}
      faqs={[
        {
          question: "How long does SEO take to show organic ranking increases?",
          answer: "While speed optimizations and index requests update in days, meaningful organic keyword gains usually take 3 to 6 months of steady work.",
        },
        {
          question: "Do you guarantee Google Page 1 rankings?",
          answer: "No SEO agency can guarantee ranking positions as Google updates its algorithm constantly. However, we target low-competition keywords to deliver rankings quickly.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-design-company-coimbatore", label: "Web Design Coimbatore" },
        { href: "/portfolio", label: "View Portfolio" },
      ]}
    />
  );
}
