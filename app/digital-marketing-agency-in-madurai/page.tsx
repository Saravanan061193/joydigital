import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Madurai | Lead Gen & Ads - Joy Digital",
  description: "Joy Digital is a result-driven digital marketing agency in Madurai. We offer local SEO, social media marketing, Google Ads, and conversion-optimized websites.",
  alternates: {
    canonical: "https://joydigital.in/digital-marketing-agency-in-madurai",
  },
  openGraph: {
    title: "Digital Marketing Agency in Madurai | Lead Gen & Ads - Joy Digital",
    description: "Joy Digital is a result-driven digital marketing agency in Madurai. We offer local SEO, social media marketing, Google Ads, and conversion-optimized websites.",
    url: "https://joydigital.in/digital-marketing-agency-in-madurai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency in Madurai | Lead Gen & Ads - Joy Digital",
    description: "Joy Digital is a result-driven digital marketing agency in Madurai. We offer local SEO, social media marketing, Google Ads, and conversion-optimized websites.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Digital Marketing in Madurai",
  "serviceType": "Digital Marketing Services",
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
  "description": "Premium digital marketing agency in Madurai. We help local businesses scale via targeted search ads, social media campaigns, SEO, and high-converting web layouts.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "50000",
    "offerCount": "3"
  }
};

export default function DigitalMarketingMadurai() {
  return (
    <ServicePageTemplate
      serviceName="Digital Marketing Madurai"
      heroTitle="Top Digital Marketing Agency in Madurai"
      heroSubtitle="Stop paying for empty web traffic. We build high-converting lead generation funnels, run target-oriented social campaigns, and run map optimization strategies that bring phone calls and insurance inquiries."
      leadSource="Digital Marketing Madurai Landing Page"
      canonicalUrl="https://joydigital.in/digital-marketing-agency-in-madurai"
      overviewTitle="ROI-Focused Search, Social & Web Optimization for Tamil Nadu Brands"
      overviewContent={
        <div className="space-y-6">
          <p>
            Traditional advertising (newspapers, pamphlets, billboards) is expensive and difficult to track. Today, customers in Madurai look for services online. Whether searching for a clinic, hotel, Travels, or insurance advisor, they turn to Google Maps and social media channels.
          </p>
          <p>
            At Joy Digital, our specialized <strong>digital marketing agency in Madurai</strong> bridges the gap between web views and revenue. We build fast, mobile-friendly landing pages, execute local SEO map optimizations, and manage social media campaigns.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Capturing Leads Across the Search and Social Funnel</h3>
          <p>
            Effective digital marketing requires capturing prospects at all stages. We start by ranking your website on local Google Maps and search results using local keywords. Next, we structure clear, conversion-oriented call-to-actions, including direct WhatsApp links and contact forms.
          </p>
          <p>
            Finally, we build brand credibility across social platforms like Facebook and Instagram. We track all actions using Google Analytics and conversion configurations, delivering clear ranking, traffic, and lead submission updates.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Madurai Marketing Agency?"
      benefitsSubtitle="We focus on lead volume, local map visibility, and direct WhatsApp integrations."
      benefits={[
        {
          icon: "fa-solid fa-bullseye",
          title: "Lead-Focused Marketing",
          description: "We don't focus on vanity metrics. All campaigns are built to drive direct inquiries, calls, and chats.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "Dominating Maps Rankings",
          description: "We optimize your profile to place in the Google Maps Local Pack, capturing nearby buyers.",
        },
        {
          icon: "fa-solid fa-comments text-emerald-500",
          title: "Direct WhatsApp Channels",
          description: "We integrate custom WhatsApp links, allowing mobile visitors to message your office instantly.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Conversion Tracking Setup",
          description: "We configure Google Analytics and form submissions tracking to monitor your exact campaign ROI.",
        },
        {
          icon: "fa-solid fa-laptop-code",
          title: "Next.js Performance Landing",
          description: "We code custom, speed-optimized web assets that load in under 1.5 seconds, preventing bounces.",
        },
        {
          icon: "fa-solid fa-award",
          title: "9+ Years Team Experience",
          description: "Led by our founder Saravanan M., we bring practical industry knowledge to scaling local brands.",
        },
      ]}
      processTitle="Our Growth Framework"
      processSubtitle="How we systematically optimize your digital presence to generate sales leads."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass",
          title: "Audit & Analysis",
          description: "We audit your site health, competitor map listings, and target keywords to map options.",
        },
        {
          step: "2",
          icon: "fa-solid fa-code",
          title: "Landing Page Coding",
          description: "We build modern, fast-loading, mobile-friendly landing pages with prominent contact forms.",
        },
        {
          step: "3",
          icon: "fa-solid fa-bullhorn",
          title: "Campaign Launch",
          description: "We deploy local SEO citation directories, profile setups, and target keyword content.",
        },
        {
          step: "4",
          icon: "fa-solid fa-chart-pie",
          title: "Track & Optimize",
          description: "We review conversion tracking codes, adjust keyword profiles, and send monthly metrics updates.",
        },
      ]}
      pricingTitle="Affordable Marketing Packages"
      pricingSubtitle="Select the marketing scope that matches your business expansion goals. Zero hidden setup fees."
      pricingTiers={[
        {
          name: "Local Growth Plan",
          price: "₹15,000",
          period: "/month",
          description: "Ideal for local doctors, Travels, retail showrooms, and insurance advisors.",
          features: [
            "1 Google Maps Profile Optimization",
            "Target Up to 15 Local Keywords",
            "50+ Directory Citation Submissions",
            "WhatsApp & Click-to-Call Setup",
            "Monthly Analytics & Keyword Reports",
            "Direct Founder Strategy Consultation",
          ],
          ctaText: "Choose Local Plan",
        },
        {
          name: "Regional Authority Plan",
          price: "₹30,000",
          period: "/month",
          description: "Best for medical clinics, local hotel networks, and multi-location firms.",
          isPopular: true,
          features: [
            "Up to 3 Google Maps Profile Optimizations",
            "Target Up to 35 Local Keywords",
            "100+ High-Authority Local Citations",
            "1 Next.js Speed-Optimized landing page",
            "Review Acquisition Setup & Links",
            "Conversion Tracking Code Integrations",
          ],
          ctaText: "Choose Regional Plan",
        },
        {
          name: "Enterprise Scaling",
          price: "Custom Quote",
          description: "Designed for franchise brand networks and large e-commerce platforms.",
          features: [
            "Unlimited Profile & Maps Upkeep",
            "Bespoke Local Content & Blog Clusters",
            "Custom Front-End Lead Funnels",
            "Meta Pixel & Advanced Clarity Tracking",
            "Bi-Weekly Strategy Status Meetings",
            "Priority Technical Developer Support",
          ],
          ctaText: "Get Custom Quote",
        },
      ]}
      faqs={[
        {
          question: "What channels do you recommend for local businesses in Madurai?",
          answer: "We strongly recommend starting with Local SEO and Google Maps optimization. It targets buyers actively searching for your services in Madurai. Rebuilding slow websites with modern Next.js templates increases conversion rates.",
        },
        {
          question: "Do you handle paid ads (Google Ads & Meta Ads)?",
          answer: "Yes. We set up and run conversion-oriented local search and social ads to drive calls and inquiries, combined with organic map optimizations.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-design-company-in-madurai", label: "Web Design Madurai" },
        { href: "/web-development-company-in-madurai", label: "Web Development" },
        { href: "/seo-services-in-madurai", label: "SEO Services Madurai" },
      ]}
    />
  );
}
