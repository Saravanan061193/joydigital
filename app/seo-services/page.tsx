import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import EnterpriseSeoLeadForm from "@/components/ui/EnterpriseSeoLeadForm";

export const metadata: Metadata = {
  title: "Enterprise B2B SEO Services & GEO Optimization | Joy Digital",
  description: "Drive organic pipeline growth with Enterprise B2B SEO Services. We engineer Technical SEO Architectures and Generative Engine Optimization (GEO) strategies for global brands.",
  keywords: [
    "Enterprise B2B SEO Services",
    "Generative Engine Optimization",
    "Technical SEO Architecture",
    "Global B2B Keyword Strategy"
  ],
  alternates: {
    canonical: "https://joydigital.in/seo-services",
    languages: {
      "x-default": "https://joydigital.in/seo-services",
      "en-us": "https://joydigital.in/us/seo-services",
      "en-gb": "https://joydigital.in/uk/seo-services",
      "en-ae": "https://joydigital.in/ae/seo-services",
      "en-in": "https://joydigital.in/in/seo-services",
    },
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Enterprise B2B SEO Services",
  "serviceType": "Technical Search Engine Optimization & GEO",
  "provider": {
    "@type": "Organization",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133"
  },
  "description": "Joy Digital builds Organic Pipeline & Revenue-Driven SEO strategies, specializing in Technical SEO Architecture & Site Audits for global B2B and SaaS brands.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "500",
    "highPrice": "1200",
    "offerCount": "3"
  }
};

export default function SEOPage() {
  return (
    <ServicePageTemplate
      serviceName="Enterprise B2B SEO"
      heroTitle="Enterprise B2B SEO & Organic Pipeline Growth for Global Brands"
      heroSubtitle="Drive qualified B2B leads, capture high-intent search traffic, and dominate AI Search Overviews (GEO). We engineer technical SEO architectures, topic clusters, and authoritative link strategies built for revenue growth."
      leadSource="Enterprise SEO Landing Page"
      customLeadForm={<EnterpriseSeoLeadForm />}
      overviewTitle="Organic Pipeline & Revenue-Driven SEO for Enterprise SaaS"
      overviewContent={
        <div className="space-y-6">
          <p>
            In the global B2B sector, standard keyword stuffing and low-quality link building no longer drive revenue. Enterprise decision-makers conduct deep, multi-stage research before committing to high-ticket SaaS or industrial purchases. If your brand relies solely on paid ads, you are surrendering highly qualified organic market share to competitors with robust <strong>Technical SEO Architecture & Site Audits</strong>.
          </p>
          <p>
            At Joy Digital, we provide premium <strong>Enterprise B2B SEO Services</strong> designed specifically for complex sales cycles. We don't just chase traffic volume; we deploy <strong>Global B2B Keyword Strategy & Content Clusters</strong> to target specific commercial intent, moving C-suite prospects smoothly from top-of-funnel discovery to bottom-of-funnel enterprise conversion.
          </p>
          
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">Our Core Enterprise SEO Capabilities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Technical Code & Core Web Vitals</strong> (Next.js/Headless)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>B2B Intent Keyword Mapping</strong> (Commercial vs Informational)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>AI Search Overviews</strong> (ChatGPT & Google AI Visibility)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>High-Authority Digital PR & Backlink Acquisition</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>WordPress to Next.js SSG SEO Migration</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Global Multi-Market Scaling & Subdirectory SEO</strong></span>
              </li>
            </ul>
          </div>

          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Pioneering Generative Engine Optimization (GEO)</h3>
          <p>
            The search landscape has evolved beyond ten blue links. With the rise of AI Overviews, ChatGPT search integrations, and Generative Engine Optimization (GEO), global B2B brands must optimize for LLM context, not just traditional web crawlers. We structure your digital assets using advanced semantic HTML, rich schema, and entity-based content models, ensuring your brand is cited authoritatively by leading AI engines.
          </p>
        </div>
      }
      benefitsTitle="Why B2B Enterprises Trust Our Organic Strategies"
      benefitsSubtitle="We align search visibility directly with your sales pipeline and revenue targets."
      benefits={[
        {
          icon: "fa-solid fa-bullseye",
          title: "B2B Intent Keyword Mapping",
          description: "We separate low-converting informational traffic from high-intent commercial queries, focusing entirely on ranking terms that drive pipeline revenue.",
        },
        {
          icon: "fa-solid fa-code-branch",
          title: "Technical Code & Core Web Vitals",
          description: "We resolve indexability bottlenecks, eliminate rendering blocks, and optimize Next.js/Headless structures to achieve 95+ Lighthouse performance.",
        },
        {
          icon: "fa-solid fa-robot",
          title: "AI Search Overviews (GEO)",
          description: "Optimize your entity prominence to dominate generative search answers across Google AI Overviews and ChatGPT enterprise plugins.",
        },
        {
          icon: "fa-solid fa-link",
          title: "High-Authority Digital PR",
          description: "We secure contextual, high-Domain-Authority (DA) backlinks from respected industry journals, SaaS directories, and technology publications.",
        },
        {
          icon: "fa-solid fa-network-wired",
          title: "Global Content Clusters",
          description: "Deploy semantic topic clusters that comprehensively cover your B2B niche, building insurmountable topical authority globally.",
        },
        {
          icon: "fa-solid fa-arrow-right-arrow-left",
          title: "Next.js SSG SEO Migration Support",
          description: "We safeguard your organic traffic during complex technical transitions from legacy monoliths (like WordPress) to modern Jamstack architectures.",
        },
      ]}
      processTitle="Our B2B Pipeline Growth Framework"
      processSubtitle="A systemic, data-driven approach to technical optimization and global search scaling."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-list-check",
          title: "Technical SEO & Log File Audit",
          description: "We execute deep crawl analyses, audit JavaScript rendering, and resolve complex canonical/pagination issues.",
        },
        {
          step: "2",
          icon: "fa-solid fa-magnifying-glass",
          title: "Commercial Intent Mapping",
          description: "We map high-value B2B keywords directly to product feature pages, use cases, and bottom-of-funnel conversion points.",
        },
        {
          step: "3",
          icon: "fa-solid fa-sliders",
          title: "Semantic Content & GEO Upgrades",
          description: "We structure your content with advanced JSON-LD schema, optimizing it for both traditional bots and LLM AI extraction.",
        },
        {
          step: "4",
          icon: "fa-solid fa-chart-line",
          title: "Revenue Tracking & Digital PR",
          description: "We launch authoritative backlink campaigns and track organic conversions directly to your CRM pipeline metrics.",
        },
      ]}
      pricingTitle="Enterprise SEO Growth Retainers (Priced in USD)"
      pricingSubtitle="Scalable organic pipeline investments for global brands. (Indian partners: ₹ INR equivalent available)."
      pricingTiers={[
        {
          name: "B2B Organic Growth Plan",
          price: "$500 USD",
          period: "/month",
          description: "Perfect for scaling SaaS startups and specialized B2B service agencies targeting primary global markets.",
          features: [
            "Up to 25 Commercial B2B Keywords",
            "Technical SEO Architecture Audits",
            "B2B Intent Keyword Mapping",
            "Core Web Vitals Optimization Guidance",
            "Monthly Pipeline Growth Reporting",
            "Standard Industry Backlink Acquisition",
          ],
          ctaText: "Start Growth Plan",
        },
        {
          name: "Global Enterprise & GEO Scale Plan",
          price: "$1,200 USD",
          period: "/month",
          description: "Designed for mid-market and enterprise B2B brands requiring aggressive organic scaling.",
          isPopular: true,
          features: [
            "Up to 80 Target B2B Keywords",
            "Generative Engine Optimization (GEO)",
            "Global B2B Content Cluster Strategy",
            "High-Authority Digital PR & Outreach",
            "Next.js SSG SEO Migration Support",
            "Quarterly Competitor Gap Analysis",
          ],
          ctaText: "Scale Globally",
        },
        {
          name: "Multi-Market B2B Brand",
          price: "Custom",
          period: "Retainer",
          description: "Fully bespoke architecture for international e-commerce and sprawling enterprise SaaS applications.",
          features: [
            "Unlimited Keyword & Entity Tracking",
            "International Hreflang & Subdirectory SEO",
            "Custom API-Driven Analytics Dashboards",
            "Premium Forbes/TechCrunch Tier PR (Subject to Approval)",
            "Log File & Deep JavaScript Rendering Audits",
            "Dedicated B2B SEO Growth Director",
          ],
          ctaText: "Request Custom Audit",
        },
      ]}
      faqs={[
        {
          question: "How does B2B SEO differ from standard B2C SEO?",
          answer: "B2B SEO targets decision-makers (CTOs, Procurement Managers) who conduct extensive, multi-touchpoint research. The focus shifts from high-volume, generic keywords to highly specific, long-tail commercial intent keywords. The ultimate goal is driving qualified pipeline revenue, not just vanity traffic metrics.",
        },
        {
          question: "What is Generative Engine Optimization (GEO)?",
          answer: "GEO involves structuring your digital content so that it is understood, extracted, and cited by AI models like ChatGPT and Google's AI Overviews. We utilize dense entity mapping, Q&A formatting, and robust JSON-LD schema to make your brand the authoritative answer in generative search interfaces.",
        },
        {
          question: "Why do we need Technical SEO Architecture audits?",
          answer: "Even the best content won't rank if search engines can't crawl and render it efficiently. Modern B2B sites (especially those built on complex JS frameworks like React) often suffer from client-side rendering bottlenecks. We engineer solutions like Next.js SSG to guarantee perfect indexability and sub-second load speeds.",
        },
        {
          question: "Can you help migrate our organic traffic during a platform rewrite?",
          answer: "Absolutely. Migrating from a legacy monolith (like WordPress) to a Headless/Jamstack architecture carries significant SEO risk if mishandled. We provide end-to-end WordPress to Next.js SSG SEO Migration support, mapping URL redirects, preserving backlink equity, and monitoring log files post-launch.",
        },
        {
          question: "How long does it take to see pipeline growth from Enterprise SEO?",
          answer: "Technical fixes (like Core Web Vitals optimization) can yield positive ranking shifts within 30-60 days. However, establishing topical authority and acquiring high-DA backlinks for competitive global B2B terms typically takes 4 to 6 months before driving consistent, compounding pipeline revenue.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/static-website-development", label: "Enterprise Jamstack Development" },
        { href: "/ai-search-optimization", label: "AI Search Optimization" },
        { href: "/local-seo-services", label: "Multi-Location Local SEO" },
      ]}
    />
  );
}
