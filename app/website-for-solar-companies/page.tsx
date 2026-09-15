import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";
import SolarLeadForm from "@/components/ui/SolarLeadForm";

export const metadata: Metadata = {
  title: "Commercial Solar EPC Web Development & B2B SEO | Joy Digital",
  description: "High-performance web architecture, C&I lead generation portals, and global SEO for utility-scale solar developers, EPC contractors, and clean energy distributors.",
  alternates: {
    canonical: "https://joydigital.in/website-for-solar-companies",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-solar-companies",
    title: "Commercial Solar EPC Web Development | Joy Digital",
    description: "High-performance web architecture, C&I lead generation portals, and global SEO for utility-scale solar developers, EPC contractors, and clean energy distributors.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Commercial Solar EPC Web Development Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-solar-companies#service",
      "name": "Commercial Solar EPC Web Development",
      "serviceType": "B2B Clean Energy SEO Architecture & Web Development",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Joy Digital",
        "image": "https://joydigital.in/assets/images/logo.webp",
        "telephone": "+919080026133",
        "url": "https://joydigital.in",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Old Perungalathur",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600063",
          "addressCountry": "IN"
        }
      },
      "description": "Custom Next.js platforms for Commercial & Industrial solar contractors, featuring Solar PPA & ROI Estimator Widgets and multi-city global SEO.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "750",
        "highPrice": "1600",
        "offerCount": "2"
      }
    }
  ]
};

export default function SolarWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Commercial Solar EPC Web Development"
      heroTitle="Custom Web Platforms & B2B Lead Engines for Global Solar EPCs"
      heroSubtitle="Dominate the clean energy sector with Next.js sub-1.5s serverless speed, advanced C&I lead conversion funnels, and global B2B SEO authority built exclusively for Commercial & Industrial solar installers worldwide."
      leadSource="Global B2B Solar EPC Landing Page"
      customLeadForm={<SolarLeadForm />}
      overviewTitle="Why Traditional Solar Websites Fail to Convert Enterprise Buyers"
      overviewContent={
        <div className="space-y-6">
          <p>
            As global clean energy adoption accelerates, utility-scale developers and C&I clients aren't looking for basic brochure websites. They require sophisticated digital portals that demonstrate technical expertise, showcase ESG compliance, and validate project ROI instantly.
          </p>
          <p>
            If your web presence suffers from slow loading speeds, generic residential messaging, or lacks robust <strong>B2B Clean Energy SEO Architecture</strong>, you are losing high-value commercial contracts to competitors with better digital authority.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How We Engineer C&I Rooftop Solar Lead Generation</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Solar PPA & ROI Estimator Widgets</strong>: Dynamic financial modeling</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Utility-Scale Solar Project Portals</strong>: High-resolution case study architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Enterprise Global SEO</strong>: Dominating search terms for EPC contracts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Ultra-fast serverless Next.js rendering</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Tier-1 Equipment Catalogs</strong>: TOPCon & Bifacial module databases</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Corporate ESG Integration</strong>: Streamlined global compliance guides</span>
              </li>
            </ul>
          </div>
        </div>
      }
      benefitsTitle="B2B Capabilities for Utility-Scale & Commercial Solar"
      benefitsSubtitle="Every component is engineered to build technical credibility, handle complex data, and drive C&I site audit requests."
      benefits={[
        {
          icon: "fa-solid fa-chart-pie",
          title: "1. Commercial ROI & Payback Calculators",
          description: "Deploy advanced Solar PPA & ROI Estimator Widgets that allow enterprise clients to calculate megawatt-scale yield, tax incentives, and capital payback periods.",
        },
        {
          icon: "fa-solid fa-industry",
          title: "2. C&I Rooftop Solar Lead Generation Forms",
          description: "Multi-step enterprise lead capture forms filtering by project scale (KW/MW), roof type, and industrial power consumption metrics.",
        },
        {
          icon: "fa-solid fa-server",
          title: "3. Utility-Scale Solar Project Portals",
          description: "Dedicated database-driven portfolio sections highlighting 1MW+ ground-mounted arrays, financial models, and corporate PPA case studies.",
        },
        {
          icon: "fa-solid fa-earth-americas",
          title: "4. Corporate ESG Compliance Guides",
          description: "Educate corporate boards on Scope 2 emissions reduction, global net metering standards, and green energy certification processes.",
        },
        {
          icon: "fa-solid fa-microchip",
          title: "5. Tier-1 Equipment & Tech Catalogs",
          description: "Dynamic catalogs showcasing Tier-1 components: N-Type TOPCon panels, Bifacial modules, and Central/String inverter specifications.",
        },
        {
          icon: "fa-solid fa-network-wired",
          title: "6. B2B Clean Energy SEO Architecture",
          description: "Multi-city, multi-region Next.js SEO architecture ensuring you rank globally for highly lucrative 'Commercial Solar EPC Web Development' search queries.",
        }
      ]}
      processTitle="Our B2B Solar Digital Engineering Process"
      processSubtitle="A proven framework to build authority in the global clean energy market."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-list-check",
          title: "EPC Market Strategy Audit",
          description: "We analyze your utility-scale capabilities, target C&I verticals, and enterprise sales cycles.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "B2B SEO Keyword Architecture",
          description: "We map high-intent commercial terms like 'Utility-Scale Solar Project Portals' for global search dominance.",
        },
        {
          step: "3",
          icon: "fa-solid fa-pen-ruler",
          title: "Enterprise UX & Estimators",
          description: "We design robust ROI calculators, corporate ESG dashboards, and multi-step lead funnels.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Development",
          description: "We engineer your platform on modern serverless Next.js frameworks for sub-1.5s load speeds worldwide.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "B2B Analytics & CRM Sync",
          description: "We implement advanced B2B tracking, routing high-value C&I leads directly to your enterprise CRM.",
        },
        {
          step: "6",
          icon: "fa-solid fa-globe",
          title: "Global Launch & Indexing",
          description: "We launch live on a global CDN, submit multi-region sitemaps, and optimize for core web vitals.",
        },
      ]}
      pricingTitle="Investment Portfolios for Solar EPC Growth"
      pricingSubtitle="Scalable digital infrastructure priced in USD for global reach. (Indian partners: ₹ INR equivalent available)."
      pricingTiers={[
        {
          name: "Regional Growth Plan",
          price: "$750 USD",
          period: "one-time (approx. ₹60,000 INR)",
          description: "Ideal for growing commercial installers targeting regional C&I rooftop projects.",
          features: [
            "Up to 8 Custom Next.js Pages",
            "C&I Rooftop Solar Lead Generation Forms",
            "Commercial & Industrial System Galleries",
            "Tier-1 Equipment Showcases",
            "Local B2B Clean Energy SEO Setup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Start Regional Growth",
        },
        {
          name: "Global Commercial EPC & Utility Portal",
          price: "$1,600 USD",
          period: "one-time (approx. ₹1,35,000 INR)",
          description: "The ultimate architecture for utility-scale developers and global EPC contractors.",
          isPopular: true,
          features: [
            "Unlimited Scalable Page Architecture",
            "Advanced Solar PPA & ROI Estimator Widgets",
            "Utility-Scale Solar Project Portals",
            "Corporate ESG Compliance Integrations",
            "Global B2B Clean Energy SEO Architecture",
            "Enterprise CRM & Analytics Synchronization",
            "1 Year Priority Technical Support & Maintenance",
          ],
          ctaText: "Deploy Global EPC Portal",
        },
      ]}
      faqs={[
        {
          question: "Why should we target Commercial & Industrial (C&I) clients instead of residential?",
          answer: "C&I solar projects (50KW - 1MW+) offer significantly higher profit margins, long-term PPA contracts, and lower acquisition costs compared to selling multiple small 3KW residential systems."
        },
        {
          question: "Can you build custom Solar ROI calculators for our website?",
          answer: "Yes, we specialize in building dynamic Next.js React widgets that allow corporate clients to estimate their tax savings, payback period, and megawatt-scale yield directly on your portal."
        },
        {
          question: "Do you offer global SEO for utility-scale developers?",
          answer: "Absolutely. We engineer multi-region, multi-language SEO architectures so your firm ranks in top international markets for high-value terms like 'Solar EPC Contractors' or 'Utility-Scale Solar Developers'."
        }
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/custom-website-development", label: "Custom B2B Web Systems" },
        { href: "/seo-services", label: "Global Enterprise SEO" },
        { href: "/ai-search-optimization", label: "AI Search Optimization (GEO)" }
      ]}
    />
  );
}
