import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Professional SEO Services & Organic Search Agency | Joy Digital",
  description: "Joy Digital is a professional SEO agency. We rank your website on Google's first page using on-page, off-page, and technical SEO campaigns.",
  alternates: {
    canonical: "https://joydigital.in/seo-services",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Professional SEO Services",
  "serviceType": "Search Engine Optimization Services",
  "provider": {
    "@type": "Organization",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133"
  },
  "description": "Joy Digital is an organic SEO agency that helps businesses rank on top search results, build quality backlinks, and optimize technical page structures.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "65000",
    "offerCount": "3"
  }
};

export default function SEOPage() {
  return (
    <ServicePageTemplate
      serviceName="SEO Services"
      heroTitle="Grow Organic Revenue with Expert SEO Services"
      heroSubtitle="Improve search engine rankings, attract high-intent visitors, and outperform competitors. We deploy research-backed optimization campaigns that generate consistent search visibility and customer inquiries globally."
      leadSource="SEO Services Landing Page"
      overviewTitle="Organic Rankings Built on Analytics, Code Optimization & Quality Copy"
      overviewContent={
        <div className="space-y-6">
          <p>
            Paid ads are effective for short-term campaigns, but once you stop your ad budget, your lead generation stops. Search Engine Optimization (SEO) builds a long-term search presence that brings in high-intent visitors and customer queries without recurring ad click fees. Investing in organic ranking strategies helps secure sustainable market share.
          </p>
          <p>
            At Joy Digital, our expert strategist team avoids shortcuts and outdated link-building schemes that can trigger search engine penalties. We structure our campaigns around technical SEO updates, detailed keyword intent research, readable copywriting, and building trusted authority backlinks. This comprehensive approach ensures your search presence grows steadily across target markets globally.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">A Holistic Approach to SEO Performance</h3>
          <p>
            Effective search marketing requires attention to multiple areas. We start with technical audits to check site indexability, fix page speed bottlenecks, and verify redirect structures. Next, we optimize your on-page elements, including your title tags, meta descriptions, semantic headings, image alt tags, and internal linking structure to make it easy for search bots to understand your page relevance.
          </p>
          <p>
            Finally, we implement a content and outreach strategy to build authoritative backlinks. We monitor your search performance using Google Search Console and Google Analytics, providing clear reports on traffic growth, keyword positions, and lead conversions. This data-driven strategy ensures that we are always optimizing for the terms that drive actual commercial value to your brand.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why Local and National Integration Maximizes ROI</h3>
          <p>
            Many agencies focus solely on national terms, missing high-converting local traffic, or vice versa. We bridge the gap. By integrating location-specific search variables with broad industry keywords, we capture users at every stage of the buying funnel. Whether they are looking for immediate local providers or researching national service offerings, your brand will remain visible.
          </p>
        </div>
      }
      benefitsTitle="How Search Engine Optimization Drives Long-Term Growth"
      benefitsSubtitle="We focus on optimizing for search intent to attract visitors who are actively searching for your products and services."
      benefits={[
        {
          icon: "fa-solid fa-arrow-up-right-dots",
          title: "Sustainable Traffic Growth",
          description: "Unlike paid search campaigns, organic rankings bring in recurring leads and customer inquiries even after our optimization work is done, delivering high ROI.",
        },
        {
          icon: "fa-solid fa-handshake",
          title: "Establish Industry Trust",
          description: "Ranking on the first page of Google helps establish your brand's authority, making prospects more comfortable choosing your business over competitors.",
        },
        {
          icon: "fa-solid fa-bullseye",
          title: "Target High-Intent Keywords",
          description: "We optimize your content for transactional search phrases, attracting visitors who are actively looking to purchase your services in India.",
        },
        {
          icon: "fa-solid fa-code-branch",
          title: "Technical SEO Optimization",
          description: "We clean up HTML layouts, structure schema JSON-LD scripts, set canonical tags, and implement dynamic sitemaps for clean search crawler indexing.",
        },
        {
          icon: "fa-solid fa-pen-nib",
          title: "Content Marketing Support",
          description: "We write detailed articles and service copy targeting search queries, helping establish your brand as an industry resource and authority.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Measurable Analytics Reports",
          description: "We track search metrics, keyword positions, page impressions, and lead conversions, providing transparent monthly reports to track progress.",
        },
      ]}
      processTitle="Our SEO Optimization Process"
      processSubtitle="We optimize your search presence systematically, prioritizing technical fixes before launching content campaigns."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-list-check",
          title: "SEO Audit & Competitor Research",
          description: "We analyze competitor keyword rankings, check backlink profiles, and audit your website's technical performance to map opportunities.",
        },
        {
          step: "2",
          icon: "fa-solid fa-magnifying-glass",
          title: "Keyword & Intent Mapping",
          description: "We identify high-value keywords, map them to your service pages, and plan content clusters to target user search queries.",
        },
        {
          step: "3",
          icon: "fa-solid fa-sliders",
          title: "On-Page & Technical Edits",
          description: "We optimize title tags, headers, meta descriptions, image alt tags, internal links, and JSON-LD schema scripts directly on your code.",
        },
        {
          step: "4",
          icon: "fa-solid fa-link",
          title: "Outreach & Link Building",
          description: "We write informative content and secure quality links from trusted directories and industry blogs to grow your search authority.",
        },
      ]}
      pricingTitle="Transparent Monthly SEO Plans"
      pricingSubtitle="Choose a monthly package built to match your target search area. Zero lock-in contracts."
      pricingTiers={[
        {
          name: "Local Market SEO",
          price: "₹15,000",
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
          name: "National Market Campaign",
          price: "₹35,000",
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
          name: "Enterprise Growth SEO",
          price: "₹65,000",
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
          question: "How long does it take to see results from SEO in Chennai?",
          answer: "SEO is a long-term marketing channel. Technical fixes and local keyword updates can improve rankings in 30 to 60 days. Broad industry keywords typically require 4 to 6 months of consistent optimization to rank on the first page. We monitor all updates carefully.",
        },
        {
          question: "Do you guarantee #1 rankings on Google?",
          answer: "No reputable agency can guarantee specific Google rankings, as search algorithms update constantly. We focus on implementing search-compliant practices, improving site health, and writing quality copy to grow your organic traffic and conversion rates.",
        },
        {
          question: "What is the difference between On-Page and Off-Page SEO?",
          answer: "On-Page SEO involves optimizing elements on your own site, like copy, metadata, internal links, page speeds, and schemas. Off-Page SEO focuses on growing your site's authority through external backlinks, directory citations, and brand mentions.",
        },
        {
          question: "Will you edit my website's code directly?",
          answer: "Yes, with your permission. We optimize HTML headers, check sitemap files, fix page speeds, and update metadata elements. We can also provide detailed recommendation reports for your developers if you prefer to make changes internally.",
        },
        {
          question: "How do you track the performance of the SEO campaigns in India?",
          answer: "We connect Google Analytics and Google Search Console to monitor organic traffic growth, impression metrics, keyword positions, and lead conversions, sharing these details in monthly reports so you can see visual progress.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/local-seo-services", label: "Local SEO" },
        { href: "/google-business-profile-setup", label: "Google Business Profile" },
        { href: "/website-development", label: "Web Development" },
      ]}
    />
  );
}
