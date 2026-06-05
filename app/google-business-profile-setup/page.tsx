import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Google Business Profile Setup & Optimization | Joy Digital",
  description: "Improve search rankings on Google Maps, generate customer calls, and secure top listings in the Local Pack. Expert GMB setups and citation audits.",
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Google Business Profile Setup & Optimization",
  "serviceType": "Google Business Profile Setup & Optimization Services",
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
  "description": "Joy Digital is a local search optimization agency offering Google maps profile verification, GMB keyword setup, citation audits, and review systems.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "5000",
    "highPrice": "15000",
    "offerCount": "3"
  }
};

export default function GBPPage() {
  return (
    <ServicePageTemplate
      serviceName="Google Business Profile Setup"
      heroTitle="Dominate Google Maps & Grow Customer Inquiries with GBP Optimization"
      heroSubtitle="Improve search rankings on Google Maps, generate direct phone calls, and connect with local customers. We handle verification, category setup, review management, and citation listings to grow your map presence."
      leadSource="GBP Setup Landing Page"
      overviewTitle="Earning Placements in the Google Maps Local Pack"
      overviewContent={
        <div className="space-y-6">
          <p>
            When nearby customers search for local services, Google displays the 'Local Pack'—a section at the top of the search results showing three local business map listings. Appearing in these top spots can significantly grow your customer inquiries, website visits, and physical store traffic.
          </p>
          <p>
            At Joy Digital Growth Agency, we focus on helping regional businesses optimize their Google Maps presence. We handle Google Business Profile verification, select target business categories, add keyword descriptions, and list your services. This structured approach helps your profile stand out to local searchers.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Optimizing Google Maps for Mobile Calls & Directions</h3>
          <p>
            An optimized Google Maps listing makes it easy for customers to contact your business. We set up direct action buttons for mobile call clicks, website visits, and driving directions. We also help write replies to customer reviews and configure messaging options.
          </p>
          <p>
            We also audit your directory listings to correct name, address, and phone (NAP) inconsistencies. This consistency builds search engine trust, helping support your map rankings and grow your local leads.
          </p>
        </div>
      }
      benefitsTitle="Why Google Business Profile Optimization is Key"
      benefitsSubtitle="We optimize your profile details to help nearby customers find and contact your business on Google Maps."
      benefits={[
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Rank in the Local Pack",
          description: "We optimize your profile categories and details to help your business appear in the top three Google Maps search spots.",
        },
        {
          icon: "fa-solid fa-mobile-button",
          title: "Drive Mobile Phone Calls",
          description: "We verify and format your phone numbers to enable direct click-to-call buttons for mobile searchers.",
        },
        {
          icon: "fa-solid fa-star-half-stroke",
          title: "Review Acquisition Tools",
          description: "We set up review shortcuts and template prompts to help your team earn positive customer reviews, which supports rankings.",
        },
        {
          icon: "fa-solid fa-images",
          title: "Geotagged Photo Uploads",
          description: "We format and upload geotagged images of your business and services to help improve map relevance signals.",
        },
        {
          icon: "fa-solid fa-triangle-exclamation",
          title: "Spam Profile Cleanups",
          description: "We audit your search area and report keyword-stuffed competitor listings that violate Google's guidelines, helping clear search space.",
        },
        {
          icon: "fa-solid fa-comment-dots",
          title: "Profile Posts & Updates",
          description: "We write and post weekly profile updates, listing promotions and services to keep your profile active.",
        },
      ]}
      processTitle="Our Maps Optimization Process"
      processSubtitle="We set up, verify, and optimize your business profile to grow your local search presence."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-passport",
          title: "Profile Setup & Verification",
          description: "We create your profile, choose categories, write business descriptions, and guide you through Google's verification process.",
        },
        {
          step: "2",
          icon: "fa-solid fa-tags",
          title: "Keyword Category Optimization",
          description: "We select primary and secondary business categories and add target keywords to your service descriptions.",
        },
        {
          step: "3",
          icon: "fa-solid fa-upload",
          title: "Asset Configuration",
          description: "We format business hours, upload optimized brand graphics, list services, and configure messaging features.",
        },
        {
          step: "4",
          icon: "fa-solid fa-ranking-star",
          title: "Local Citation Building",
          description: "We list your business details in trusted local directories to build search engine authority.",
        },
      ]}
      pricingTitle="Economical GBP Optimization Plans"
      pricingSubtitle="Select a package designed to fit your business type. Transparent pricing with zero hidden costs."
      pricingTiers={[
        {
          name: "Basic Setup & Verify",
          price: "₹5,000",
          description: "Ideal for new businesses needing professional help setting up and verifying their map listing.",
          features: [
            "Google Business Profile Creation",
            "Verification Setup & Guidance Support",
            "Primary & Secondary Category Setup",
            "Business Logo & Cover Photo Uploads",
            "Business Description Keyword Setup",
            "1 Google Review Shortcut Link",
          ],
          ctaText: "Select Basic Plan",
        },
        {
          name: "GMB Maps Dominance",
          price: "₹9,000",
          description: "Recommended for established local businesses wanting to rank higher than nearby competitors.",
          isPopular: true,
          features: [
            "Complete Profile Optimizations",
            "10 Geotagged Service Image Uploads",
            "Target Services & Products Catalog Setup",
            "50 Local Citation Listings Building",
            "Google Maps Competitor Spam Audits",
            "2 Profile Posts & Updates Setup",
          ],
          ctaText: "Select Dominance Plan",
        },
        {
          name: "Franchise Multi-Profile",
          price: "₹15,000+",
          description: "For companies managing multiple branches, offices, or service area locations.",
          features: [
            "Multi-Location Profile Management",
            "NAP Directory Consistency Checkups",
            "Monthly Profile Updates & Posts",
            "Customer Q&A Configuration Setup",
            "Weekly Image Additions & Optimizations",
            "Monthly Maps Traffic Analytics Reports",
          ],
          ctaText: "Contact for Proposal",
        },
      ]}
      faqs={[
        {
          question: "How long does Google Business Profile verification take?",
          answer: "Google verification methods vary. Some listings can be verified instantly via phone or email, while others require a video verification or a physical postcard sent by mail, which takes 5 to 14 days.",
        },
        {
          question: "Do I need a website to set up a Google Business Profile?",
          answer: "No, a website is not required to set up a Google Map listing. However, having an optimized website linked to your profile provides helpful signals that support your local search rankings.",
        },
        {
          question: "What is Google Maps spam, and how do you handle it?",
          answer: "Google Maps spam includes keyword-stuffed business names, fake reviews, or listings at residential addresses. We audit your search area and report profiles that violate Google's guidelines to help clean up search space.",
        },
        {
          question: "How do customer reviews affect map rankings?",
          answer: "Google values customer feedback. Having a consistent stream of positive reviews, keywords in review copy, and regular owner replies supports your prominence and local rankings.",
        },
        {
          question: "Can you help merge duplicate business profiles?",
          answer: "Yes, we can help merge duplicate profiles to combine reviews and citation authority, which helps prevent search engine confusion.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/local-seo-services", label: "Local SEO" },
        { href: "/seo-services", label: "SEO Services" },
        { href: "/website-development", label: "Web Development" },
      ]}
    />
  );
}
