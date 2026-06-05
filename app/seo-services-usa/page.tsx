import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Professional SEO Services in the USA | Grow Organic Traffic | Joy Digital",
  description: "Rank higher on Google in the US market, attract organic leads, and dominate search results. We offer comprehensive on-page, off-page, and technical SEO campaigns.",
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Professional SEO Services USA",
  "serviceType": "Search Engine Optimization Services",
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
  "description": "Joy Digital helps US businesses improve search rankings, target transactional keywords, and optimize technical page structures.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "250",
    "highPrice": "900",
    "offerCount": "3"
  }
};

export default function SEOPageUSA() {
  return (
    <ServicePageTemplate
      serviceName="SEO Services USA"
      heroTitle="Grow Organic Sales Leads with USA SEO Services"
      heroSubtitle="Improve search engine rankings in the US market, attract high-intent visitors to your offer, and outperform competitors. We implement research-backed optimization campaigns that generate consistent search queries."
      leadSource="SEO Services USA Landing Page"
      overviewTitle="Organic US Rankings Built on Analytics, Code Optimization & Quality Copy"
      overviewContent={
        <div className="space-y-6">
          <p>
            Competing in the US digital market requires a targeted search strategy. Pay-per-click costs continue to rise, making organic search engine optimization (SEO) a key channel for acquiring sustainable traffic and qualified client leads.
          </p>
          <p>
            At Joy Digital Growth Agency, we help US businesses optimize their search visibility. We conduct detailed keyword research, resolve page speed bottlenecks, and build authoritative local citation links. This comprehensive approach helps improve search presence and support sales growth.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">A Structured SEO Workflow for the US Market</h3>
          <p>
            We optimize all technical, on-page, and off-page elements of your website. We add JSON-LD schemas, verify mobile responsiveness, and clean up redirect paths. Next, we optimize page copy, target transactional keywords, and launch link-building campaigns to support your domain authority.
          </p>
        </div>
      }
      benefitsTitle="How Search Engine Optimization Drives Growth in the US"
      benefitsSubtitle="We optimize your search presence for high-intent queries, attracting visitors ready to purchase your services."
      benefits={[
        {
          icon: "fa-solid fa-arrow-up-right-dots",
          title: "Sustainable Traffic Growth",
          description: "Our SEO services bring in organic search traffic and customer inquiries, providing long-term value without recurring ad click fees.",
        },
        {
          icon: "fa-solid fa-handshake",
          title: "Establish Brand Trust",
          description: "Ranking on the first page of Google helps establish your brand's authority, making US prospects more comfortable choosing your business.",
        },
        {
          icon: "fa-solid fa-bullseye",
          title: "Target High-Intent Keywords",
          description: "We optimize your content for transactional search phrases, attracting visitors who are ready to purchase your services.",
        },
        {
          icon: "fa-solid fa-code-branch",
          title: "Technical SEO Optimization",
          description: "We clean up HTML layouts, structure schema JSON-LD scripts, set canonical tags, and implement dynamic sitemaps for clean indexing.",
        },
        {
          icon: "fa-solid fa-pen-nib",
          title: "Content Marketing Support",
          description: "We write detailed articles and service copy targeting search queries, helping establish your brand as an industry resource.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Measurable Analytics Reports",
          description: "We track search metrics, keyword positions, page impressions, and lead conversions, providing transparent monthly reports.",
        },
      ]}
      processTitle="Our USA SEO Optimization Process"
      processSubtitle="We optimize your search presence systematically, prioritizing technical fixes before launching content campaigns."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-list-check",
          title: "SEO Audit & Competitor Research",
          description: "We analyze competitor keyword rankings, check backlink profiles, and audit your website's technical performance.",
        },
        {
          step: "2",
          icon: "fa-solid fa-magnifying-glass",
          title: "Keyword & Intent Mapping",
          description: "We identify high-value keywords, map them to your service pages, and plan content clusters to target search queries.",
        },
        {
          step: "3",
          icon: "fa-solid fa-sliders",
          title: "On-Page & Technical Edits",
          description: "We optimize title tags, headers, meta descriptions, image alt tags, internal links, and JSON-LD schema schemas.",
        },
        {
          step: "4",
          icon: "fa-solid fa-link",
          title: "Outreach & Link Building",
          description: "We write informative content and secure quality links from trusted directories to grow your search authority.",
        },
      ]}
      pricingTitle="Transparent Monthly SEO Plans"
      pricingSubtitle="Choose a monthly package built to match your target search area. Zero lock-in contracts."
      pricingTiers={[
        {
          name: "US Local Market SEO",
          price: "$250",
          period: "/month",
          description: "Perfect for local service businesses aiming to rank in their home city and map packs.",
          features: [
            "Up to 15 Target Keywords",
            "On-Page Title & Tag Optimization",
            "Google Business Profile Linkage",
            "Local Citation & Directory Submissions",
            "Monthly Keyword Ranking Reports",
            "Technical Site Health Audits",
          ],
          ctaText: "Choose Local Plan",
        },
        {
          name: "National US Campaign",
          price: "$550",
          period: "/month",
          description: "Recommended for growing brands targeting competitive industry keywords across the region.",
          isPopular: true,
          features: [
            "Up to 40 Target Keywords",
            "Comprehensive Content Clusters (2 posts/mo)",
            "Advanced Technical Schema Configurations",
            "Quality Backlink Building Campaigns",
            "Core Web Vitals Audit Checks",
            "Detailed Conversion Rate Optimization (CRO)",
          ],
          ctaText: "Choose National Plan",
        },
        {
          name: "Enterprise Growth US SEO",
          price: "$900",
          period: "/month",
          description: "Designed for e-commerce platforms and SaaS brands targeting competitive global keyword terms.",
          features: [
            "Unlimited Target Keywords",
            "Weekly Content Cluster Additions",
            "International Subdirectory Structure",
            "Premium Guest Post Link Outreach",
            "Log File Analysis & Crawl Audits",
            "Dedicated SEO Strategy Meetings",
          ],
          ctaText: "Choose Enterprise Plan",
        },
      ]}
      faqs={[
        {
          question: "How long does it take to see results from SEO?",
          answer: "SEO is a long-term marketing channel. Technical fixes and local keyword updates can improve rankings in 30 to 60 days. Broad industry keywords typically require 4 to 6 months of consistent optimization to rank on the first page.",
        },
        {
          question: "Do you guarantee #1 rankings on Google?",
          answer: "No reputable agency can guarantee specific Google rankings, as search algorithms update constantly. We focus on implementing search-compliant practices, improving site health, and writing quality copy to grow your organic traffic.",
        },
        {
          question: "What is the difference between On-Page and Off-Page SEO?",
          answer: "On-Page SEO involves optimizing elements on your own site, like copy, metadata, internal links, and code. Off-Page SEO focuses on growing your site's authority through external backlinks, directory citations, and brand mentions.",
        },
        {
          question: "Will you edit my website's code directly?",
          answer: "Yes, with your permission. We optimize HTML headers, check sitemap files, fix page speeds, and update metadata elements. We can also provide detailed recommendation reports for your developers if preferred.",
        },
        {
          question: "How do you track the performance of the SEO campaigns?",
          answer: "We connect Google Analytics and Google Search Console to monitor organic traffic growth, impression metrics, keyword positions, and lead conversions, sharing these details in monthly reports.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/seo-services-uk", label: "SEO UK Services" },
        { href: "/seo-services-uae", label: "SEO UAE Services" },
        { href: "/website-development-usa", label: "Web Dev USA" },
      ]}
    />
  );
}
