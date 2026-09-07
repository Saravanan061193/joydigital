import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AI Search Optimization (GEO) Services | Joy Digital",
  description: "Improve your brand's technical accessibility, semantic relevance, and entity authority for AI search engines, ChatGPT, Google AI Overviews, Gemini, Copilot, and Perplexity.",
  keywords: [
    "AI Search Optimization",
    "Generative Engine Optimization",
    "GEO Services",
    "Entity SEO",
    "Semantic SEO",
    "AI Overview Optimization",
    "Perplexity Optimization",
    "ChatGPT SEO",
    "Joy Digital GEO"
  ],
  alternates: {
    canonical: "https://joydigital.in/ai-search-optimization",
  },
  openGraph: {
    title: "AI Search Optimization (GEO) Services | Joy Digital",
    description: "Prepare your web presence for the next era of discovery. We structure semantic schemas, clear entity graphs, and technical content for search & AI systems.",
    url: "https://joydigital.in/ai-search-optimization",
  },
};

export default function AISearchOptimizationPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Search Optimization (GEO) Services",
    "serviceType": "Generative Engine Optimization & Semantic SEO",
    "provider": {
      "@type": "Organization",
      "name": "Joy Digital",
      "url": "https://joydigital.in"
    },
    "description": "Comprehensive Generative Engine Optimization (GEO) helping companies structure clear web entities, semantic HTML data, and JSON-LD schema graphs for modern discovery engines.",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "499",
      "highPrice": "1999",
      "offerCount": "3"
    }
  };

  return (
    <ServicePageTemplate
      serviceName="AI Search Optimization (GEO)"
      canonicalUrl="https://joydigital.in/ai-search-optimization"
      heroTitle="AI Search Optimization & Generative Engine Services"
      heroSubtitle="Transform your digital presence so modern search engines and AI discovery systems—such as Google AI Overviews, ChatGPT, Gemini, Copilot, and Perplexity—can cleanly parse, understand, and reference your business expertise."
      leadSource="AI Search Optimization (GEO) Landing Page"
      overviewTitle="Understanding Generative Engine Optimization (GEO) vs Traditional SEO"
      overviewContent={
        <div className="space-y-6">
          <p>
            Search user behavior is undergoing a fundamental shift. While traditional Search Engine Optimization (SEO) focuses primarily on ranking blue links based on keyword volume and backlink quantity, <strong>Generative Engine Optimization (GEO)</strong> ensures that your brand&apos;s digital entities, services, and expertise are structured in a way that AI models can digest, verify, and potentially reference.
          </p>
          <p>
            Large Language Models (LLMs) and search-connected AI systems digest content by identifying clean semantic relationships, direct question-and-answer pairs, structured JSON-LD entity graphs, verified author credentials (E-E-A-T), and technical readability. 
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Our Ethical &amp; Transparent GEO Approach</h3>
          <p>
            At Joy Digital, we do not promise &quot;guaranteed ChatGPT citations&quot; or &quot;guaranteed Gemini positions,&quot; as AI algorithms synthesize answers dynamically based on real-time data sources and query intent. Instead, we engineer your website&apos;s code, internal linking, entity definitions, schema graphs, and content hierarchies so that discovery engines have zero friction retrieving your factual business data.
          </p>
          <p>
            We align your web architecture around human utility first, establishing verifiable brand authority that serves both traditional organic search users and AI-assisted discovery workflows.
          </p>
        </div>
      }
      benefitsTitle="Why Businesses Prepare for Generative Search"
      benefitsSubtitle="We align your web architecture with clean semantic standards to ensure maximum technical readability across all search ecosystems."
      benefits={[
        {
          icon: "fa-solid fa-brain",
          title: "Entity & Semantic Clarity",
          description: "We map out unambiguous Organization, Service, and Person entities to ensure AI crawlers understand exactly who you are and what you deliver.",
        },
        {
          icon: "fa-solid fa-code-branch",
          title: "Connected JSON-LD Schemas",
          description: "We construct nested schema graphs using standard schema.org definitions, connecting services, authors, locations, and FAQs seamlessly.",
        },
        {
          icon: "fa-solid fa-circle-question",
          title: "Question-Based Content Format",
          description: "We format key insights into direct, bulleted answers, comparison tables, and structured FAQs that address exact high-intent queries.",
        },
        {
          icon: "fa-solid fa-user-check",
          title: "Verifiable E-E-A-T Signal Boost",
          description: "We connect content to real author entity profiles, industry case studies, and consistent company details to build genuine authority.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Sub-Second Crawlability",
          description: "AI search bots prioritize fast, server-side pre-rendered HTML chunks over complex, slow client-rendered scripts.",
        },
        {
          icon: "fa-solid fa-diagram-project",
          title: "Semantic Internal Linking",
          description: "We establish contextual internal link paths (Blog → Industry Solution → Service Page → Case Study) that define topic cluster relevance.",
        },
      ]}
      processTitle="Our Structured GEO Optimization Process"
      processSubtitle="We systematically audit, structure, and refine your digital assets for human visitors and discovery algorithms."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass",
          title: "Entity Audit & Schema Mapping",
          description: "We analyze your brand entity footprint across search engines, existing markup, and internal link structures.",
        },
        {
          step: "2",
          icon: "fa-solid fa-[#7C3AED] fa-laptop-code",
          title: "Codebase & Schema Implementation",
          description: "We implement connected JSON-LD graphs, semantic HTML tags, sub-1.5s rendering speed, and direct Q&A structures.",
        },
        {
          step: "3",
          icon: "fa-solid fa-newspaper",
          title: "Topic Cluster Content Expansion",
          description: "We construct comprehensive, expert-authored educational articles answering exact customer questions with direct answers.",
        },
        {
          step: "4",
          icon: "fa-solid fa-chart-line",
          title: "Monitoring & Conversion Sync",
          description: "We track organic traffic, Search Console impressions, entity indexing status, and lead form conversions.",
        },
      ]}
      pricingTitle="Transparent AI Search Optimization Plans"
      pricingSubtitle="Select an optimization package engineered to future-proof your digital presence. Zero lock-in contracts."
      pricingTiers={[
        {
          name: "GEO Essentials Audit & Setup",
          price: "$499",
          period: "one-time",
          description: "Ideal for small businesses seeking clean JSON-LD schemas, entity alignment, and technical accessibility.",
          features: [
            "Complete Entity & Schema Audit",
            "Nested Organization & Service Schemas",
            "Technical Accessibility & Speed Edits",
            "Basic Q&A Content Formatting",
            "Google Search Console Status Check",
            "1-on-1 Implementation Summary",
          ],
          ctaText: "Select Essentials Tier",
        },
        {
          name: "Full GEO & Semantic Growth",
          price: "$999",
          period: "/month",
          description: "Recommended for growing brands aiming to establish topical authority across search & generative platforms.",
          isPopular: true,
          features: [
            "Everything in Essentials Tier",
            "Monthly Topic Cluster Content Additions",
            "Advanced Author E-E-A-T Entity Mapping",
            "Internal Link Architecture Optimization",
            "Industry Page Semantic Overhaul",
            "Monthly Entity & Traffic Performance Reports",
          ],
          ctaText: "Select Growth Campaign",
        },
        {
          name: "Enterprise Global GEO Retainer",
          price: "$1,999",
          period: "/month",
          description: "Customized for multi-regional businesses, SaaS platforms, and enterprise service providers.",
          features: [
            "Unlimited Service & Industry Entity Schemas",
            "Multi-Regional & Hreflang Alignment",
            "Custom Technical Application Schemas",
            "Weekly Content Cluster Additions",
            "Dedicated Technical Strategy Coordinator",
            "Full CRM & Lead Conversion Integration",
          ],
          ctaText: "Select Enterprise Retainer",
        },
      ]}
      faqs={[
        {
          question: "What is Generative Engine Optimization (GEO)?",
          answer: "Generative Engine Optimization (GEO) is the practice of structuring website architecture, semantic HTML content, JSON-LD schemas, and entity authority so that AI search engines (like Google AI Overviews, ChatGPT, Gemini, Copilot, and Perplexity) can easily understand, parse, and cite your business data."
        },
        {
          question: "How does GEO differ from traditional SEO?",
          answer: "Traditional SEO focuses on optimizing for specific keywords and acquiring backlinks to rank on blue link search result pages. GEO focuses on entity clarity, direct question-answering, structured semantic schema, author E-E-A-T credentials, and topical completeness so AI models can synthesize accurate information about your brand."
        },
        {
          question: "Can any agency guarantee a top spot in ChatGPT or Gemini answers?",
          answer: "No reputable agency can guarantee specific citations in generative AI responses, as AI models generate dynamic answers based on query context, real-time index data, and user intent. Our service focuses on technical accessibility, semantic markup, and genuine entity authority to maximize your probability of being discovered and referenced."
        },
        {
          question: "Why is JSON-LD Schema markup important for AI search?",
          answer: "JSON-LD schema provides machine-readable structured data that explicitly defines entities—such as your Organization, Services, Authors, Products, and FAQs—eliminating ambiguity for search crawlers and AI indexing bots."
        },
        {
          question: "Will GEO replace traditional SEO?",
          answer: "No, GEO complements traditional SEO. Modern search engines are increasingly integrating generative summaries (like Google AI Overviews) directly alongside traditional organic search results. Solid technical SEO and high-quality content remain foundational to both."
        },
        {
          question: "How do you measure GEO performance?",
          answer: "We monitor branded entity search impressions, Google Search Console query trends, referral traffic from AI search surfaces where trackable, overall organic search leads, and technical indexing health."
        }
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/seo-services", label: "SEO Services" },
        { href: "/website-development", label: "Website Development" },
        { href: "/portfolio", label: "Portfolio" },
        { href: "/contact", label: "Contact Us" },
      ]}
    />
  );
}
