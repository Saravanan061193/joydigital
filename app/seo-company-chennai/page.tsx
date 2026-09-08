import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Top SEO Company in Chennai & Best SEO Website Company in India | Joy Digital",
  description: "Looking for a top SEO company in Chennai or the best SEO website company in India? Work with a proven SEO expert in Chennai. Try our free SEO website checker & Google SEO checker tool.",
  keywords: [
    "seo company in chennai",
    "seo expert in chennai",
    "seo website company",
    "seo website company in india",
    "seo company in india",
    "best seo website company",
    "seo website company list",
    "seo website checker",
    "google seo checker"
  ],
  alternates: {
    canonical: "https://joydigital.in/seo-company-chennai",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SEO & Digital Marketing Services in Chennai",
  "serviceType": "Search Engine Optimization & Google Maps Ranking",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600063",
      "addressCountry": "IN"
    }
  },
  "description": "Joy Digital is a premier SEO company in Chennai & top SEO website company in India, driving organic traffic, Page 1 rankings, and conversion-focused leads.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "2"
  }
};

export default function SeoCompanyChennai() {
  return (
    <ServicePageTemplate
      serviceName="SEO Company Chennai"
      heroTitle="Premier SEO Company in Chennai & India"
      heroSubtitle="Rank higher on Google, capture Page 1 positions, and convert organic visitors into paying customers. Partner with a dedicated SEO expert in Chennai and an elite SEO website company in India."
      leadSource="SEO Company Chennai Landing Page"
      heroCtaText="Get Free SEO Audit"
      canonicalUrl="https://joydigital.in/seo-company-chennai"
      overviewTitle="Increase Search Visibility with an Elite SEO Website Company"
      overviewContent={
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Work with a Leading SEO Company in Chennai & SEO Expert in Chennai</h2>
            <p>
              If your website is not ranking on Page 1 of Google search results, potential buyers in your industry are visiting your competitors every day. Partnering with a dedicated <strong>seo company in chennai</strong> ensures your business gets discovered first. At Joy Digital, every strategy is crafted by an experienced <strong>seo expert in chennai</strong> with a track record of driving organic growth.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">Ranked Top Among the Best SEO Website Company Options in India</h2>
            <p>
              When evaluating an <strong>seo website company list</strong>, businesses need a partner that combines technical web engineering with data-driven search optimization. As a recognized <strong>seo website company in india</strong>, <strong>best seo website company</strong> choice, and leading <strong>seo company in india</strong>, Joy Digital provides end-to-end SEO services for startups, regional service firms, and enterprise brands.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">Instant SEO Website Checker & Google SEO Checker Tools</h2>
            <p>
              Want to see why your website is lagging behind in search rankings? Use our free <strong>seo website checker</strong> and <strong>google seo checker</strong> tool to instantly audit your page loading speeds, meta tag coverage, mobile responsiveness, and schema markup errors.
            </p>
          </div>
        </div>
      }
      benefitsTitle="Why Choose Our Chennai SEO Team?"
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
          question: "Why hire an experienced SEO expert in Chennai from Joy Digital?",
          answer: "Working with an SEO expert in Chennai from Joy Digital ensures your campaign is tailored to local search patterns, regional buyer behavior, and Google Map Pack optimization."
        },
        {
          question: "What distinguishes Joy Digital on an SEO website company list?",
          answer: "Unlike agencies on an SEO website company list that rely solely on backlinks, Joy Digital combines Next.js sub-second web engineering, JSON-LD schemas, and conversion copy."
        },
        {
          question: "How can I run an audit with your SEO website checker or Google SEO checker?",
          answer: "You can request a comprehensive scan via our free online SEO website checker and Google SEO checker tool to receive a full breakdown of technical fixes and keyword opportunities."
        },
        {
          question: "How long does SEO take to show organic ranking increases?",
          answer: "While speed optimizations and index requests update in days, meaningful organic keyword gains usually take 3 to 6 months of steady work."
        }
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-design-company-chennai", label: "Web Design Chennai" },
        { href: "/web-development-company-chennai", label: "Web Development Chennai" },
        { href: "/case-studies", label: "Case Studies" },
      ]}
    />
  );
}
