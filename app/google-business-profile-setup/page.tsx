import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Google Business Profile Setup | Joy Digital",
  description: "Joy Digital is a professional Google Business Profile optimization agency in Chennai, India. We verify and rank your business on Google Maps pack.",
  alternates: {
    canonical: "https://joydigital.in/google-business-profile-setup",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Google Business Profile Setup & Optimization",
  "serviceType": "Google Business Profile Setup & Optimization Services",
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
  "description": "Joy Digital is a local search optimization agency offering Google maps profile verification, GMB keyword setup, citation audits, and review systems in India.",
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
      heroSubtitle="Improve search rankings on Google Maps, generate direct phone calls, and connect with local customers. As a leading Google Business Profile setup provider in Chennai, we handle verification, category setup, review management, and citation listings to grow your map presence."
      leadSource="GBP Setup Landing Page"
      overviewTitle="Earning Placements in the Google Maps Local Pack"
      overviewContent={
        <div className="space-y-6">
          <p>
            When nearby customers search for local services, Google displays the &ldquo;Local Pack&rdquo;&mdash;a section at the top of the search results showing three local business map listings. Earning a placement in these top spots can significantly grow your customer inquiries, website visits, and physical store traffic. If you do not optimize your profile, you are leaving free leads for your competitors.
          </p>
          <p>
            At Joy Digital, our specialized <strong>google business profile optimization chennai</strong> services focus on helping regional businesses optimize their Google Maps presence. We handle Google Business Profile verification, select target primary and secondary business categories, write search-optimized description bios, and list your core services. This structured approach helps your profile stand out to local searchers in Chennai and across India.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Optimizing Google Maps for Mobile Calls & Directions</h3>
          <p>
            An optimized Google Maps listing makes it easy for customers to contact your business. We set up direct action buttons for mobile call clicks, website visits, and driving directions. We also help configure messaging options and set up automated FAQ prompts to handle customer inquiries instantly, improving response times.
          </p>
          <p>
            We also audit your directory listings to correct name, address, and phone (NAP) inconsistencies across Sulekha, Justdial, and GMB records. This consistency builds search engine trust, helping support your map rankings and grow your local leads.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">The Impact of Geotagged Media and Regular Updates</h3>
          <p>
            Google&apos;s local algorithm monitors profile activity to gauge relevancy. Regularly uploading photos from your physical location with metadata signals (geotagging) alerts the algorithm that your business is active and physically present in Chennai. We schedule weekly updates, geotag your service images, and publish profile posts that highlight special offers and services.
          </p>
        </div>
      }
      benefitsTitle="Why Google Business Profile Optimization is Key"
      benefitsSubtitle="We optimize your profile details to help nearby customers find and contact your business on Google Maps."
      benefits={[
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Rank in the Local Pack",
          description: "We optimize your profile categories, tags, and description bios to help your business appear in the top three Google Maps search spots.",
        },
        {
          icon: "fa-solid fa-mobile-button",
          title: "Drive Mobile Phone Calls",
          description: "We verify, format, and link your phone numbers to enable direct click-to-call buttons for mobile searchers, maximizing calls.",
        },
        {
          icon: "fa-solid fa-star-half-stroke",
          title: "Review Acquisition Tools",
          description: "We set up review shortcuts and templates to help your team earn positive customer reviews, which directly supports rankings.",
        },
        {
          icon: "fa-solid fa-images",
          title: "Geotagged Photo Uploads",
          description: "We format, rename, and upload geotagged images of your business and services to help improve maps relevance signals.",
        },
        {
          icon: "fa-solid fa-triangle-exclamation",
          title: "Spam Profile Cleanups",
          description: "We audit your search area in Chennai and report keyword-stuffed competitor listings that violate guidelines, clearing search space.",
        },
        {
          icon: "fa-solid fa-comment-dots",
          title: "Profile Posts & Updates",
          description: "We write and post weekly profile updates, listing promotions, events, and services to keep your profile active and engaging.",
        },
      ]}
      processTitle="Our Maps Optimization Process"
      processSubtitle="We set up, verify, and optimize your business profile to grow your local search presence."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-passport",
          title: "Profile Setup & Verification",
          description: "We create your profile, choose categories, write business descriptions, and guide you through Google's verification process step-by-step.",
        },
        {
          step: "2",
          icon: "fa-solid fa-tags",
          title: "Keyword & Category Setup",
          description: "We select primary and secondary business categories and add high-intent keywords to your service descriptions.",
        },
        {
          step: "3",
          icon: "fa-solid fa-upload",
          title: "Asset Configuration",
          description: "We format business hours, upload optimized brand graphics, list services, and configure in-app messaging features.",
        },
        {
          step: "4",
          icon: "fa-solid fa-ranking-star",
          title: "Local Citation Building",
          description: "We list your business details in trusted local directories (NAP consistency) to build search engine authority and trust.",
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
          question: "How long does Google Business Profile verification take in Chennai?",
          answer: "Google verification methods vary. Some listings can be verified instantly via phone or email, while others require a video verification or a physical postcard sent by mail to your address, which takes 5 to 14 days. We assist you through each verification path.",
        },
        {
          question: "Do I need a website to set up a Google Business Profile?",
          answer: "No, a website is not required to set up a Google Map listing. However, having an optimized website linked to your profile provides helpful trust signals that support your local search rankings in India.",
        },
        {
          question: "What is Google Maps spam, and how do you handle it?",
          answer: "Google Maps spam includes keyword-stuffed business names, fake reviews, or listings at residential addresses. We audit your search area in Chennai and report profiles that violate Google's guidelines to help clean up search space and rank your real listing.",
        },
        {
          question: "How do customer reviews affect map rankings?",
          answer: "Google values customer feedback. Having a consistent stream of positive reviews, keywords in review copy, and regular owner replies supports your prominence and local maps rankings. We provide tools to make review collection easy.",
        },
        {
          question: "Can you help merge duplicate business profiles?",
          answer: "Yes, we can help merge duplicate profiles to combine reviews and citation authority, which helps prevent search engine confusion and consolidated brand authority.",
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
