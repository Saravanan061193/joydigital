import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

interface PageProps {
  params: Promise<{ country: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { country: "us" },
    { country: "uk" },
    { country: "ae" },
    { country: "in" },
    { country: "ca" },
    { country: "au" },
  ];
}

// 1. Localized Configurations Map
const REGIONAL_CONFIGS: Record<string, {
  heroTitle: string;
  heroSubtitle: string;
  currency: string;
  lowPrice: string;
  medPrice: string;
  highPrice: string;
  targetMarket: string;
}> = {
  us: {
    heroTitle: "Grow Organic Revenue with Expert SEO Services in the USA",
    heroSubtitle: "Improve your US search visibility, acquire high-intent business leads, and outperform competitors. We deploy data-driven campaigns targeting buyers across North America.",
    currency: "$",
    lowPrice: "299",
    medPrice: "699",
    highPrice: "1,299",
    targetMarket: "United States",
  },
  uk: {
    heroTitle: "Convert Organic Search Traffic with UK Professional SEO Services",
    heroSubtitle: "Drive qualified search visits to your brand across the United Kingdom. Our expert organic search optimization improves page rank, trust, and business pipeline.",
    currency: "£",
    lowPrice: "249",
    medPrice: "599",
    highPrice: "1,099",
    targetMarket: "United Kingdom",
  },
  ae: {
    heroTitle: "Lead Generation SEO Services in Dubai & UAE",
    heroSubtitle: "Scale your customer pipeline across the Gulf. We optimize technical search parameters and regional citation mappings to dominate UAE search engines.",
    currency: "AED ",
    lowPrice: "1,100",
    medPrice: "2,500",
    highPrice: "4,800",
    targetMarket: "United Arab Emirates",
  },
  in: {
    heroTitle: "Grow Organic Sales Leads with Professional SEO Services India",
    heroSubtitle: "Improve search engine rankings, attract high-intent visitors, and outperform competitors in India. We implement research-backed campaigns that generate consistent search queries.",
    currency: "₹",
    lowPrice: "15,000",
    medPrice: "35,000",
    highPrice: "65,000",
    targetMarket: "India",
  },
  ca: {
    heroTitle: "Grow Organic Revenue with Expert SEO Services in Canada",
    heroSubtitle: "Improve your Canadian search visibility, acquire high-intent B2B leads, and outperform competitors. We deploy data-driven campaigns targeting buyers across Canada.",
    currency: "C$",
    lowPrice: "399",
    medPrice: "899",
    highPrice: "1,699",
    targetMarket: "Canada",
  },
  au: {
    heroTitle: "Convert Organic Search Traffic with Australia Professional SEO Services",
    heroSubtitle: "Drive qualified search visits to your business across Australia. Our expert organic search optimization improves page rank, trust, and client pipeline.",
    currency: "A$",
    lowPrice: "449",
    medPrice: "999",
    highPrice: "1,899",
    targetMarket: "Australia",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const countryLower = country.toLowerCase();
  const config = REGIONAL_CONFIGS[countryLower] || REGIONAL_CONFIGS.us;

  const countryNames: Record<string, string> = {
    us: "US",
    uk: "UK",
    ae: "UAE",
    in: "India",
    ca: "Canada",
    au: "Australia",
  };
  const countryName = countryNames[countryLower] || "US";
  const title = `SEO Services in ${countryName} | Drive Organic Growth - Joy Digital`;
  
  return {
    title,
    description: `Joy Digital is a professional SEO agency serving the ${config.targetMarket}. We rank your website on Google using technical audits, content clusters, and high-quality backlink outreach.`,
    alternates: {
      canonical: `https://joydigital.in/${countryLower}/seo-services`,
      languages: {
        "x-default": "https://joydigital.in/seo-services",
        "en-us": "https://joydigital.in/us/seo-services",
        "en-gb": "https://joydigital.in/uk/seo-services",
        "en-ae": "https://joydigital.in/ae/seo-services",
        "en-in": "https://joydigital.in/in/seo-services",
        "en-ca": "https://joydigital.in/ca/seo-services",
        "en-au": "https://joydigital.in/au/seo-services",
      },
    },
  };
}

export default async function CountrySEOPage({ params }: PageProps) {
  const { country } = await params;
  const countryLower = country.toLowerCase();
  const config = REGIONAL_CONFIGS[countryLower] || REGIONAL_CONFIGS.us;

  const getRegionalHref = (path: string) => {
    return country === "" ? path : `/${country}${path === "/" ? "" : path}`;
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Professional SEO Services",
    "serviceType": "Search Engine Optimization Services",
    "provider": {
      "@type": "Organization",
      "name": "Joy Digital",
      "url": `https://joydigital.in/${country}`
    },
    "description": `Joy Digital is a premium SEO agency helping companies in ${config.targetMarket} rank on top search results, build authority, and optimize technical page structures.`,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": country === "in" ? "INR" : country === "uk" ? "GBP" : country === "ae" ? "AED" : "USD",
      "lowPrice": config.lowPrice.replace(/,/g, ""),
      "highPrice": config.highPrice.replace(/,/g, ""),
      "offerCount": "3"
    }
  };

  return (
    <ServicePageTemplate
      serviceName="SEO Services"
      heroTitle={config.heroTitle}
      heroSubtitle={config.heroSubtitle}
      leadSource={`SEO Services Landing Page [Region: ${country.toUpperCase()}]`}
      overviewTitle={`Organic SEO Built on Technical Audits, Content & Authority`}
      overviewContent={
        <div className="space-y-6">
          <p>
            Paid digital advertisements offer instant traction, but they generate zero returns the second you pause your ad budgets. Search Engine Optimization (SEO) builds a compounding, sustainable search presence that captures high-intent customers actively looking for your solutions, completely free of recurring pay-per-click charges.
          </p>
          <p>
            At Joy Digital, our strategist team avoids shortcuts, black-hat tricks, and spam networks that trigger search penalties. We align our campaigns around technical crawlability fixes, commercial search intent audits, engaging copywriting, and outreach to secure authoritative digital brand mentions in {config.targetMarket} and globally.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">A Holistic Approach to SEO Performance</h3>
          <p>
            Search visibility requires continuous attention to technical site architecture, page speeds, indexing structures, and clean semantic tag hierarchies. We clean up metadata fields, configure XML sitemaps, optimize redirect pathways, and map out extensive content clusters. This helps search crawlers easily read your layout value.
          </p>
          <p>
            We track search rankings, organic click rates, impressions, and user signups using Google Analytics and Google Search Console, sharing direct monthly progress reports to highlight target pipeline conversions.
          </p>
        </div>
      }
      benefitsTitle="How Search Optimization Compounds Your Revenue"
      benefitsSubtitle="We align optimization sprints with commercial search keywords to connect your brand with active buyers."
      benefits={[
        {
          icon: "fa-solid fa-arrow-up-right-dots",
          title: "Compounding Traffic Returns",
          description: "Unlike paid search, organic placements continue to drive traffic and inbound inquiries long after work is completed, maximizing long-term marketing ROI.",
        },
        {
          icon: "fa-solid fa-handshake",
          title: "Build Brand Authority",
          description: `Ranking on the first page of Google positions your brand as an industry leader in ${config.targetMarket}, building immediate customer trust.`,
        },
        {
          icon: "fa-solid fa-bullseye",
          title: "Target Active Buyers",
          description: "We optimize for commercial keywords that signal ready-to-buy search intent, keeping customer conversion rates high.",
        },
        {
          icon: "fa-solid fa-code-branch",
          title: "Technical Audits & Schemas",
          description: "We configure structured JSON-LD schemas, resolve layout shifts, set canonical tags, and implement dynamic sitemaps for indexing.",
        },
        {
          icon: "fa-solid fa-pen-nib",
          title: "MDX Blog & Content clusters",
          description: "We research and write extensive informational guides that earn organic backlink mentions, establishing search authority.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Transparent Performance Reports",
          description: "We track organic impressions, click CTR, conversions, and keyword ranking moves to map your ROI path.",
        },
      ]}
      processTitle="Our Structured Search Marketing Process"
      processSubtitle="We improve search footprints systematically, focusing on structural fixes before outreach campaigns."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-list-check",
          title: "Site Audit & Keyword Mapping",
          description: "We run speed assessments, check competitor keyword footprints, and analyze gaps to outline ranking opportunities.",
        },
        {
          step: "2",
          icon: "fa-solid fa-magnifying-glass",
          title: "Commercial Intent Alignment",
          description: "We define high-converting keyword targets and map content strategies to capture buyers at all stages.",
        },
        {
          step: "3",
          icon: "fa-solid fa-sliders",
          title: "Code Edits & Schemas",
          description: "We adjust header layouts, insert schema markup scripts, compress asset sizes, and configure meta tags in the codebase.",
        },
        {
          step: "4",
          icon: "fa-solid fa-link",
          title: "Authority Backlinks Link Building",
          description: "We execute outreach campaigns to earn high-quality links from trusted directories and digital publications.",
        },
      ]}
      pricingTitle="Transparent Monthly SEO Plans"
      pricingSubtitle="Select an optimization tier aligned with your company's target search radius. Zero lock-ins."
      pricingTiers={[
        {
          name: "Regional Market Campaign",
          price: `${config.currency}${config.lowPrice}`,
          period: "/month",
          description: `Target regional rankings and Map packs to drive calls and local pipeline opportunities.`,
          features: [
            "Up to 15 Target Keyword Positions",
            "On-Page Meta & Heading Optimization",
            "Google Business Profile Linkage",
            "Local Citation & Directory sync",
            "Core Web Vitals health reports",
            "Monthly SEO performance summaries",
          ],
          ctaText: "Select Regional SEO",
        },
        {
          name: "National Scale SEO",
          price: `${config.currency}${config.medPrice}`,
          period: "/month",
          description: `Recommended for growing brands aiming to rank for competitive industry terms across the country.`,
          isPopular: true,
          features: [
            "Up to 40 Transactional Keyword Targets",
            "Advanced Content Cluster copywriting (2 posts/mo)",
            "Dynamic JSON-LD Schema markup setup",
            "Digital Outreach Link Building",
            "Conversion Optimization & Form audit checks",
            "Dedicated Slack strategy communications",
          ],
          ctaText: "Select National Scale",
        },
        {
          name: "Enterprise Global Campaign",
          price: `${config.currency}${config.highPrice}`,
          period: "/month",
          description: `Tailored for SaaS platforms, e-commerce networks, and brands targeting international buyers.`,
          features: [
            "Unlimited Keyword Targets",
            "Weekly Content Cluster additions",
            "International Subdirectory structure setups",
            "Premium Guest Outreach Backlink Building",
            "Dedicated SEO Strategy coordination meetings",
            "Lead scoring workflow & CRM integrations",
          ],
          ctaText: "Select Enterprise Plan",
        },
      ]}
      faqs={[
        {
          question: `How long does it take to see rankings improve in ${config.targetMarket}?`,
          answer: "Onsite codebase edits, technical schema improvements, and sitemap uploads can boost crawls and rankings in 30 to 60 days. Highly competitive national or global industry terms require 4 to 6 months of active optimization to reach page 1.",
        },
        {
          question: "Do you guarantee first place rankings on Google?",
          answer: "No reputable agency can guarantee specific Google ranks, as ranking parameters adjust constantly. We construct search-compliant Next.js structures, write high-quality copy, and clean page layouts to steadily grow your customer inquiries.",
        },
        {
          question: "Will you edit my website code directly?",
          answer: "Yes, with your permission. We optimize HTML metadata fields, check redirect codes, configure schema snippets, and accelerate page speeds. We can also provide a guidelines document if you prefer to make changes internally.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: getRegionalHref("/website-development"), label: "Website Development" },
        { href: "/portfolio", label: "Portfolio" },
        { href: getRegionalHref("/contact"), label: "Contact Us" },
      ]}
    />
  );
}
