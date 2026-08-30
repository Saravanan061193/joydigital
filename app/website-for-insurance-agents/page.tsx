import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insurance Agent Website Design & Lead Generation SEO | Joy Digital",
  description: "High-converting website design & digital marketing for insurance agents, financial advisors, and insurance brokerages. NRI insurance leads, premium calculators, and financial SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-insurance-agents",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-insurance-agents",
    title: "Insurance Agent Website Design & NRI Expat Lead Generation | Joy Digital",
    description: "Ultra-fast Next.js website design for insurance advisors, wealth consultants, and financial planners. Premium quote estimators, NRI expat health & term insurance forms, and local SEO.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Insurance Agent Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-insurance-agents#service",
      "name": "Insurance Agent Website Design & Financial SEO",
      "serviceType": "Insurance Web Development & Financial Advisor Marketing",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Joy Digital",
        "image": "https://joydigital.in/assets/images/logo.webp",
        "telephone": "+919080026133",
        "url": "https://joydigital.in",
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
      "description": "Custom web design for insurance agents, LIC advisors, health insurance brokers, and wealth planners. Features instant premium quote forms, NRI health/term policy pages, and search optimization.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "15000",
        "highPrice": "38000",
        "offerCount": "2"
      }
    }
  ]
};

export default function InsuranceWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Insurance Agents"
      heroTitle="High-Converting Website Design & SEO for Insurance Agents & Financial Advisors"
      heroSubtitle="Generate qualified health, term, vehicle, and NRI expat insurance leads 24/7. We engineer fast, trustworthy Next.js websites for insurance brokers, financial advisors, wealth managers, and agency teams."
      leadSource="Website for Insurance Agents Landing Page"
      heroCtaText="Get Free Insurance Web Quote"
      overviewTitle="Why Most Insurance Agent Websites Fail to Capture Quality Policy Leads (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            When families, business owners, or overseas NRIs search for insurance policies, they look for clarity, financial trust, policy comparisons, tax benefits, and easy consultation scheduling.
          </p>
          <p>
            Unfortunately, many insurance agent websites look untrustworthy, load slowly, hide policy benefits, and lack interactive premium quote forms or instant WhatsApp inquiry buttons.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Insurance Agent Websites</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Instant Policy Premium Quote Estimator</strong>: Health, life & vehicle inputs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>NRI & Expat Insurance Portal</strong>: Specialized term & health policy advisories</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Policy Comparison Matrix</strong>: Coverage, sum assured & rider options</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Local & Global Financial SEO Strategy</strong>: Rank for high-value policy keywords</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Ultra-fast serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Advisor WhatsApp Routing</strong>: Instant client policy consultation</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we combine financial branding with <Link href="/website-development" className="text-primary font-bold hover:underline">custom web engineering</Link>, <Link href="/seo-services" className="text-primary font-bold hover:underline">insurance search optimization</Link>, and <Link href="/google-business-profile-setup" className="text-primary font-bold hover:underline">Google Business Profile setup</Link> to help agents scale policy sales.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Insurance Agent Websites"
      benefitsSubtitle="Designed to build financial credibility, explain policy benefits, and capture qualified policy leads."
      benefits={[
        {
          icon: "fa-solid fa-calculator",
          title: "1. Policy Premium Quote Form",
          description: "Allow clients to enter age, sum assured, coverage type, and city for instant customized policy recommendations.",
        },
        {
          icon: "fa-solid fa-plane-departure",
          title: "2. NRI & Overseas Expat Insurance Section",
          description: "Target non-resident Indians with specialized term insurance, parents health insurance, and global travel policies.",
        },
        {
          icon: "fa-solid fa-heart-pulse",
          title: "3. Health, Term & Family Policy Hubs",
          description: "Dedicated pages detailing cashless hospital networks, critical illness coverage, tax savings (80C/80D), and maturity benefits.",
        },
        {
          icon: "fa-solid fa-car-burst",
          title: "4. Vehicle, Commercial & Business Insurance",
          description: "Showcase motor insurance, zero-depreciation coverage, shopkeeper policies, and marine/transit risk protection.",
        },
        {
          icon: "fa-solid fa-hand-holding-dollar",
          title: "5. Claims Settlement Support & Assistance Hub",
          description: "Reassure policyholders with a clear 24/7 claims assistance guide and dedicated helpline contact details.",
        },
        {
          icon: "fa-solid fa-user-shield",
          title: "6. Advisor Credentials & MDRT Achievement Showcase",
          description: "Highlight advisor experience, IRDAI license details, total claims settled, and industry recognitions.",
        },
        {
          icon: "fa-solid fa-scale-balanced",
          title: "7. Interactive Policy Comparison Table",
          description: "Help clients compare premium rates, waiting periods, room rent capping, and co-payment clauses clearly.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "8. One-Tap Advisor WhatsApp Link",
          description: "Instant button connecting clients to your desk pre-filled with: 'Hi, I need a consultation for health/term insurance policy.'",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "9. Financial SEO Keyword Strategy",
          description: "Target high-intent terms like 'Best health insurance agent Chennai', 'NRI term insurance advisor', and 'LIC agent near me'.",
        },
        {
          icon: "fa-solid fa-calendar-check",
          title: "10. Online Policy Renewal Reminder Workflow",
          description: "Simple lead capture forms allowing existing clients to request policy renewal assistance or coverage upgrades.",
        },
      ]}
      processTitle="Our 6-Step Insurance Web Engineering Roadmap"
      processSubtitle="A proven roadmap from policy audit to live client lead acquisition."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-clipboard-user",
          title: "Advisor & Target Audit",
          description: "We audit your insurance portfolio, preferred tie-ups (Star Health, HDFC Ergo, LIC, ICICI Prudential), and lead workflow.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Taxonomy & Keyword Structure",
          description: "We structure policy category hubs, quote calculators, NRI expat pages, and financial SEO term maps.",
        },
        {
          step: "3",
          icon: "fa-solid fa-pen-ruler",
          title: "Trustworthy UI/UX Design",
          description: "We design clean, authoritative desktop and mobile interface mockups with clear call-to-action buttons.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Build",
          description: "We build your platform on serverless Next.js frameworks for sub-1.5s page load speeds across global networks.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "Financial Schema & Lead Sync",
          description: "We implement FinancialService schema markup, configure GA4 event tracking, and sync quote leads to your email.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and verify search engine indexing.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Insurance Agents"
      pricingSubtitle="Get a modern, high-converting insurance portal with zero ongoing monthly software commissions."
      pricingTiers={[
        {
          name: "Individual Advisor Plan",
          price: "₹15,000",
          period: "one-time ($750 USD)",
          description: "Ideal for individual insurance agents, LIC advisors, and independent health insurance consultants.",
          features: [
            "1-5 Custom Responsive Pages",
            "Policy Quote Request Form",
            "Health & Term Insurance Showcase",
            "WhatsApp & Phone Direct Links",
            "Advisor Bio & License Display",
            "Google Maps Local Citation Setup",
            "Basic Financial SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Individual Advisor Plan",
        },
        {
          name: "Enterprise Agency Portal",
          price: "₹38,000",
          period: "one-time ($1,800 USD)",
          description: "Recommended for insurance brokerages, financial planning firms, and NRI policy advisories.",
          isPopular: true,
          features: [
            "Up to 15 Custom Policy & Service Pages",
            "Interactive Policy Premium Calculator",
            "NRI & Overseas Expat Dedicated Section",
            "Claims Assistance & Download Hub",
            "Policy Comparison Matrix Widget",
            "Full Financial SEO & Search Architecture",
            "Google Analytics 4 & Search Console Sync",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Enterprise Agency Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for an insurance agent cost?",
          answer: "Our insurance agent website packages start from ₹15,000 ($750 USD) for individual advisors up to ₹38,000 ($1,800 USD) for enterprise brokerage portals.",
        },
        {
          question: "Can prospective clients request policy quotes for health and term insurance online?",
          answer: "Yes! We build custom quote request forms where clients select sum assured, age bracket, family members, and policy type sent directly to your phone and email.",
        },
        {
          question: "Will the website help us generate NRI insurance leads from overseas?",
          answer: "Yes. We design dedicated NRI insurance landing sections targeting non-resident Indians searching for parents' health insurance, term policies, and tax-saving plans in India.",
        },
        {
          question: "Can we showcase multiple insurance brand tie-ups (Star Health, HDFC Ergo, LIC, TATA AIG)?",
          answer: "Yes. We display authorized partner logos, cashless hospital counts, and claim settlement ratios for all insurers you represent.",
        },
        {
          question: "Are there any monthly listing or platform fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly listing fees or per-lead commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Financial SEO Services" },
        { href: "/local-seo-services", label: "Local Map SEO" },
        { href: "/google-business-profile-setup", label: "Google Business Setup" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Us" },
      ]}
    />
  );
}
