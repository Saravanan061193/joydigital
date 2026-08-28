import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Madurai | Lead Gen Specialists",
  description: "Looking for the best digital marketing agency in Madurai? We run high-converting social media ads, PPC campaigns, and Local SEO systems.",
  alternates: {
    canonical: "https://joydigital.in/digital-marketing-agency-madurai",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Digital Marketing Agency in Madurai",
  "serviceType": "Performance Marketing, Social Media Ads & SEO",
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
  "description": "Joy Digital is a results-focused digital marketing agency in Madurai, engineering lead pipelines through Google Ads, Meta Ads, and Maps rankings.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "50000",
    "offerCount": "2"
  }
};

export default function DigitalMarketingMadurai() {
  return (
    <ServicePageTemplate
      serviceName="Digital Marketing Madurai"
      heroTitle="Digital Marketing Agency in Madurai"
      heroSubtitle="Stop wasting marketing budgets. We build qualified lead generation funnels, scale social media ads, and optimize search rankings to bring actual paying customers."
      leadSource="Digital Marketing Madurai Landing Page"
      heroCtaText="Get Marketing Blueprint"
      canonicalUrl="https://joydigital.in/digital-marketing-agency-madurai"
      overviewTitle="Qualified Lead Generation & Performance Marketing in Madurai"
      overviewContent={
        <div className="space-y-6">
          <p>
            Operating a business in Madurai requires a marketing strategy that blends local trust with modern digital pipelines. Standard advertising agencies often focus on vanity metrics (like page likes or impressions) rather than inquiries that turn into revenue.
          </p>
          <p>
            At Joy Digital, we build qualified lead pipelines. We specialize in configuring Facebook/Instagram lead ads, launching search-intent Google PPC ads, and setting up automated WhatsApp conversions to let local clients reach your desk easily.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Madurai Marketing Team?"
      benefitsSubtitle="We manage ads and SEO assets focused strictly on business growth."
      benefits={[
        {
          icon: "fa-solid fa-bullhorn",
          title: "Targeted Facebook & Meta Ads",
          description: "We design and scale high-converting lead campaigns targeting specific regional groups and buyers.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "Google Search PPC Campaigns",
          description: "We launch Google Ads focused on active searches to show your business when buyers seek services.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Maps Local Pack SEO",
          description: "We list and optimize Google Business Profile cards to rank you in the Google Map Local 3-Pack.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "WhatsApp Chat Conversions",
          description: "We build direct form-to-WhatsApp redirects, allowing leads to send inquiries directly to your team.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Conversion Optimization (CRO)",
          description: "We fine-tune website design layouts, text copy, and CTAs to turn standard visitors into active leads.",
        },
        {
          icon: "fa-solid fa-file-invoice",
          title: "Transparent Performance Reports",
          description: "Transparent lead counts, click metrics, and ROI indices shared with you on a monthly basis.",
        },
      ]}
      processTitle="How We Run Your Campaigns"
      processSubtitle="A structured, data-driven approach to configuring your marketing funnels."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass",
          title: "Research & Audit",
          description: "We audit your site, study competitor strategies, and analyze local keyword options.",
        },
        {
          step: "2",
          icon: "fa-solid fa-wand-magic-sparkles",
          title: "Creative Visual Setup",
          description: "We draft high-converting ad graphics, landing page designs, and CTA configurations.",
        },
        {
          step: "3",
          icon: "fa-solid fa-chart-bar",
          title: "Campaign Launches",
          description: "We set up tracking parameters and publish Facebook, Instagram, or Google Ads campaigns.",
        },
        {
          step: "4",
          icon: "fa-solid fa-gauge",
          title: "Optimize & Retrack",
          description: "We optimize ad copy, monitor lead quality, and update placements to maximize budgets.",
        },
      ]}
      pricingTitle="Flat-Rate Setup & Retention Pricing"
      pricingSubtitle="Select the plan that fits your business scale. No locked contract rules."
      pricingTiers={[
        {
          name: "Lead Gen Setup Package",
          price: "₹15,000",
          period: "one-time setup",
          description: "Perfect for local service providers seeking professional ad structures and leads pipelines.",
          features: [
            "Meta pixel & GA4 Analytics Setup",
            "Facebook / Instagram Ad Account creation",
            "3 Custom Ad Image Templates",
            "Form to WhatsApp redirection sync",
            "Google Maps citation optimizations",
            "30 Days Campaign Management Support",
          ],
          ctaText: "Select Setup Plan",
        },
        {
          name: "Growth Retention Plan",
          price: "₹15,000",
          period: "per month",
          description: "Recommended for hospitals, resorts, colleges, and retail brands wanting ongoing traffic.",
          isPopular: true,
          features: [
            "Meta & Google Ads Campaign Management",
            "Regular A/B Ad Creative updates",
            "GBP Posting & Optimization updates",
            "Lead Funnel Landing Page Tweaks",
            "Conversion Optimization Audits",
            "Monthly Analytics Reports Review",
          ],
          ctaText: "Choose Growth Plan",
        },
      ]}
      faqs={[
        {
          question: "Does the pricing package include ad spend budget?",
          answer: "No. The advertising budget is paid directly to Google or Meta. We manage your setup and optimize placements to run campaigns cost-effectively.",
        },
        {
          question: "How do we receive marketing leads?",
          answer: "Leads are routed directly to your email or WhatsApp number in real-time, allowing you to connect and follow up instantly.",
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
