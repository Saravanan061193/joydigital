import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Google Business Profile Optimization | Rank in Google Maps 3-Pack",
  description: "Joy Digital offers expert Google Business Profile optimization services. We audit, claim, optimize, and rank your local map listing in Google Maps.",
  alternates: {
    canonical: "https://joydigital.in/google-business-profile-optimization",
  },
  openGraph: {
    title: "Google Business Profile Optimization | Rank in Google Maps 3-Pack",
    description: "Joy Digital offers expert Google Business Profile optimization services. We audit, claim, optimize, and rank your local map listing in Google Maps.",
    url: "https://joydigital.in/google-business-profile-optimization",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Business Profile Optimization | Rank in Google Maps 3-Pack",
    description: "Joy Digital offers expert Google Business Profile optimization services. We audit, claim, optimize, and rank your local map listing in Google Maps.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Google Business Profile Optimization",
  "serviceType": "Local SEO Services",
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
  "description": "Premium Google Business Profile optimization and setup services. We resolve suspensions, write optimized descriptions, and build citations to boost map packs rankings.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "5000",
    "highPrice": "15000",
    "offerCount": "2"
  }
};

export default function GoogleBusinessProfilePage() {
  return (
    <ServicePageTemplate
      serviceName="Google Business Profile Optimization"
      heroTitle="Google Business Profile Optimization Services"
      heroSubtitle="Claim, optimize, and rank your business listing on Google Maps. We optimize categories, manage client reviews, structure local schemas, and configure call tracking to drive direct phone calls and inquiries."
      leadSource="Google Business Profile Optimization Landing Page"
      canonicalUrl="https://joydigital.in/google-business-profile-optimization"
      overviewTitle="Dominating Nearby Search Queries with Google Business Profiles"
      overviewContent={
        <div className="space-y-6">
          <p>
            When potential customers need a local service near them, they open Google Maps or run search queries on their mobile phones. Google displays the top three maps profiles in the Local 3-Pack. If your profile is suspended, missing categories, or unoptimized, you are losing valuable phone leads and store visits to competitors.
          </p>
          <p>
            At Joy Digital, our expert <strong>google business profile optimization</strong> service helps local companies claim, verify, and rank their profiles. We audit categories, resolve suspension issues, standardize addresses (NAP consistency), and link profiles to optimized local landing pages.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why Google Maps Algorithms Value Profile Completeness</h3>
          <p>
            Google ranks map profiles based on relevance, distance, and prominence. We optimize relevance by adding accurate secondary categories, listing services with search terms, and writing detailed keyword descriptions.
          </p>
          <p>
            We also upload geotagged images, set up FAQ lists, and configure messaging shortcuts. To boost prominence, we launch customer review collection links, build high-authority local citations, and ensure details match across directories.
          </p>
        </div>
      }
      benefitsTitle="Why Optimize Your Google Maps Profile?"
      benefitsSubtitle="We configure your Google profile to drive calls, website visits, and physical directions."
      benefits={[
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Rank in the Maps 3-Pack",
          description: "We optimize your categories and search indicators to rank your business profile in the top three map listings.",
        },
        {
          icon: "fa-solid fa-phone",
          title: "Drive Mobile Calls",
          description: "Optimized mobile profiles place a call button front and center, allowing visitors to contact your office.",
        },
        {
          icon: "fa-solid fa-star",
          title: "Build Customer Trust",
          description: "We set up review shortcuts and templates to help your team earn positive feedback, which builds trust.",
        },
        {
          icon: "fa-solid fa-images",
          title: "Upload Geotagged Photos",
          description: "We upload optimized photos containing embedded metadata coordinates to signal local activity to crawlers.",
        },
        {
          icon: "fa-solid fa-shield-check",
          title: "Resolve Suspension Issues",
          description: "We audit guidelines, help verify business documentation, and draft reinstatement appeals.",
        },
        {
          icon: "fa-solid fa-chart-simple",
          title: "Track Performance Analytics",
          description: "We monitor map impressions, phone call clicks, website visits, and search query keywords.",
        },
      ]}
      processTitle="Our Optimization Workflow"
      processSubtitle="How we audit, clean, and verify your local map profile to boost search visibility."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass",
          title: "Profile Audit",
          description: "We check category setups, audit competitors, check address coordinates, and map target terms.",
        },
        {
          step: "2",
          icon: "fa-solid fa-pencil",
          title: "On-Page Optimization",
          description: "We set categories, write optimized profile descriptions, list services, and configure opening hours.",
        },
        {
          step: "3",
          icon: "fa-solid fa-list-check",
          title: "Local Citations Setup",
          description: "We submit standardized Name, Address, and Phone details to directories to build search authority.",
        },
        {
          step: "4",
          icon: "fa-solid fa-comments",
          title: "Review & Upkeep",
          description: "We configure review collection templates, post profile updates, and monitor map rankings.",
        },
      ]}
      pricingTitle="Affordable Profile Packages"
      pricingSubtitle="Select the optimization scale that matches your business locations. No monthly lock-in contracts."
      pricingTiers={[
        {
          name: "Starter Setup",
          price: "₹5,000",
          period: "one-time",
          description: "Best for new businesses or single-profile setups needing basic verification and layout.",
          features: [
            "1 Google Business Profile Setup",
            "Verification Support & Categories Select",
            "Keyword-Optimized Description Copy",
            "Standard Geotagged Photos Upload",
            "Review Acquisition Link Generation",
            "Google Maps Address Linkage Setup",
          ],
          ctaText: "Choose Starter Plan",
        },
        {
          name: "Premium Optimization",
          price: "₹12,000",
          period: "one-time",
          description: "Best for medical clinics, local hotels, travels, and growing companies aiming to rank.",
          isPopular: true,
          features: [
            "1 Google Business Profile Complete Audit",
            "In-Depth Competitor Placement Audits",
            "Secondary Categories & Services Setup",
            "60+ High-Authority Citation Directory Submissions",
            "Local Schema Markup Code for Website",
            "3 Months Rank Tracking & Updates Support",
          ],
          ctaText: "Choose Premium Plan",
        },
      ]}
      faqs={[
        {
          question: "Why was my Google Business Profile suspended?",
          answer: "Suspensions happen due to guideline violations (like keyword stuffing the name, using fake addresses, or creating multiple listings). We audit your listing details, fix compliance issues, and manage the reinstatement appeal.",
        },
        {
          question: "How long does verification take?",
          answer: "Google verifies profiles via video recording, phone, email, or postcard. Phone/email verification happens instantly. Postcards take 7 to 14 business days to arrive in Chennai.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/seo-services-in-chennai", label: "SEO Services Chennai" },
        { href: "/website-design-company-in-chennai", label: "Web Design Chennai" },
        { href: "/web-development-company-in-chennai", label: "Web Development" },
      ]}
    />
  );
}
