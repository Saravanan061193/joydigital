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
  ];
}

// Localized configurations for Web Development
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
    heroTitle: "High-Performance Next.js & React Web Development in the USA",
    heroSubtitle: "Transform your digital footprint with custom business websites engineered for speed, secure operations, and search positioning. We build high-converting platforms for US brands.",
    currency: "$",
    lowPrice: "499",
    medPrice: "999",
    highPrice: "1,999",
    targetMarket: "United States",
  },
  uk: {
    heroTitle: "Custom Headless Web Development Agency for UK Brands",
    heroSubtitle: "Build ultra-fast, Core Web Vitals compliant websites using modern React and Tailwind CSS. We construct robust lead pipelines for United Kingdom companies.",
    currency: "£",
    lowPrice: "399",
    medPrice: "799",
    highPrice: "1,599",
    targetMarket: "United Kingdom",
  },
  ae: {
    heroTitle: "E-commerce & Corporate Web Development Dubai & UAE",
    heroSubtitle: "Accelerate your local business operations. We design responsive corporate portals and high-speed online stores with local payment workflows for the UAE market.",
    currency: "AED ",
    lowPrice: "1,800",
    medPrice: "3,500",
    highPrice: "7,000",
    targetMarket: "United Arab Emirates",
  },
  in: {
    heroTitle: "High-Performance Website Development Company India",
    heroSubtitle: "Transform your online presence with responsive business websites engineered using clean code, optimized metadata structures, and next-generation frameworks in India.",
    currency: "₹",
    lowPrice: "15,000",
    medPrice: "35,000",
    highPrice: "75,000",
    targetMarket: "India",
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
  };
  const countryName = countryNames[countryLower] || "US";
  const title = `Custom Next.js Web Development ${countryName} | Joy Digital`;

  return {
    title,
    description: `Joy Digital is a top web development agency serving the ${config.targetMarket}. We engineer fast, secure, and mobile-responsive websites using Next.js & React to rank on Google and scale leads.`,
    alternates: {
      canonical: `https://joydigital.in/${countryLower}/website-development`,
    },
  };
}

export default async function CountryWebDevPage({ params }: PageProps) {
  const { country } = await params;
  const countryLower = country.toLowerCase();
  const config = REGIONAL_CONFIGS[countryLower] || REGIONAL_CONFIGS.us;

  const getRegionalHref = (path: string) => {
    return country === "" ? path : `/${country}${path === "/" ? "" : path}`;
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Website Development Services",
    "serviceType": "Web Development",
    "provider": {
      "@type": "Organization",
      "name": "Joy Digital",
      "url": `https://joydigital.in/${country}`
    },
    "description": `Joy Digital is a leading web development agency designing high-converting, mobile-responsive, secure websites built for speed and search indexing in the ${config.targetMarket}.`,
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
      serviceName="Website Development"
      heroTitle={config.heroTitle}
      heroSubtitle={config.heroSubtitle}
      leadSource={`Website Development Landing Page [Region: ${country.toUpperCase()}]`}
      overviewTitle="Engineered for Speeds, PageRank & Modern Web Performance"
      overviewContent={
        <div className="space-y-6">
          <p>
            In today&apos;s digital space, your website functions as your primary brand builder, your digital front office, and your most valuable lead acquisition funnel. Standard drag-and-drop website builders or bloated templates often bundle massive, unused resources that slow page speeds and push prospective customers straight to competitors.
          </p>
          <p>
            At Joy Digital, we design and develop custom corporate portals and platforms using next-generation frameworks like Next.js, React, and optimized HTML5/Tailwind architectures. This guarantees that your platforms load in less than 1.5 seconds, achieve perfect PageSpeed scores, and rank highly on search engine results pages in {config.targetMarket} and globally.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why Code Quality and Architecture Impact Search Rankings</h3>
          <p>
            Google uses page experience and Core Web Vitals as crucial ranking factors. If your site takes longer than 3 seconds to render, visitors will leave before they even view your offer. Slow rendering directly increases bounce rates, signaling to search crawlers that your page does not provide a good user experience. By developing sites with clean semantic markup, compressed WebP/AVIF graphics, server-side pre-rendering, and optimized bundle chunks, we build a solid foundation.
          </p>
        </div>
      }
      benefitsTitle="Why Modern Businesses Partner with Joy Digital"
      benefitsSubtitle="We don't just build sites; we construct high-converting lead pipelines that combine beautiful visuals with fast-loading frameworks."
      benefits={[
        {
          icon: "fa-solid fa-bolt",
          title: "Under 1.5s Load Speeds",
          description: "Optimized server bundle chunks and compressed media files ensure your site loads instantly on mobile networks, reducing bounce rates.",
        },
        {
          icon: "fa-solid fa-mobile-screen",
          title: "Mobile-First Responsiveness",
          description: `Over 65% of regional web searches in ${config.targetMarket} happen on mobile devices. We construct responsive layouts that fit perfectly on all screens.`,
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "Next.js Static Security",
          description: "We eliminate database vulnerability entry points by deploying headless static pages with SSL certificates, firewalls, and hosting syncs.",
        },
        {
          icon: "fa-solid fa-magnifying-glass",
          title: "SEO-Ready Configurations",
          description: "Built-in dynamic sitemaps, semantic tag hierarchies, open graph properties, and meta indexing code make it easy for Google to index your pages.",
        },
        {
          icon: "fa-solid fa-chart-pie",
          title: "Built-in CRO Mechanics",
          description: "Strategic CTA buttons, inline forms, user-friendly layouts, and floating widgets are positioned to convert simple visitors into active sales leads.",
        },
        {
          icon: "fa-solid fa-gears",
          title: "Dedicated Technical Support",
          description: "We provide hosting setups, monthly database backups, core framework updates, and technical troubleshooting to keep your website running smoothly.",
        },
      ]}
      processTitle="Our Growth-Focused Development Workflow"
      processSubtitle="We leverage a systematic 4-step workflow to plan, build, test, and deploy your custom web project successfully."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-comments",
          title: "Discovery & Planning",
          description: `We align on your brand identity, service catalog, target keywords in ${config.targetMarket}, user journeys, and conversion objectives.`,
        },
        {
          step: "2",
          icon: "fa-solid fa-bezier-curve",
          title: "Visual Design & Prototyping",
          description: "Our UI/UX designers create custom layout mockups showcasing typography, color schemes, and visual hierarchies in Figma for your review and approval.",
        },
        {
          step: "3",
          icon: "fa-solid fa-code",
          title: "Development & Coding",
          description: "We build responsive interfaces using clean code, semantic structures, metadata variables, schema integrations, and interactive React states.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "QA & Global Deployment",
          description: "We run browser compatibility tests, check speed performance scores, verify sitemaps, and deploy your site on global CDNs.",
        },
      ]}
      pricingTitle="Economical Web Development Tiers"
      pricingSubtitle="Select a package designed to scale your business profile. Zero hidden costs, transparent milestones."
      pricingTiers={[
        {
          name: "Startup Launch Package",
          price: `${config.currency}${config.lowPrice}`,
          description: `Perfect for new local service businesses wanting to establish professional authority online in ${config.targetMarket}.`,
          features: [
            "Up to 5 Pages Responsive Layout",
            "Custom Logo & Branding Style",
            "Basic On-Page SEO Setup",
            "Lead Contact Form Integration",
            "Floating WhatsApp Support Button",
            "1 Year Free Hosting Setup Support",
          ],
          ctaText: "Select Startup Plan",
        },
        {
          name: "Business Growth Package",
          price: `${config.currency}${config.medPrice}`,
          description: "Recommended for growing companies targeting search rankings and regular lead generation.",
          isPopular: true,
          features: [
            "Up to 10 Pages Structured Layout",
            "Advanced On-Page SEO Integration",
            "Google Business Profile & Maps Sync",
            "Interactive Blog Setup (MDX ready)",
            "Dynamic FAQ Accordions + Schema",
            "Free Speed Optimization Guarantee",
          ],
          ctaText: "Select Growth Plan",
        },
        {
          name: "Enterprise Custom Solutions",
          price: `${config.currency}${config.highPrice}`,
          description: "Custom software applications, e-commerce stores, and high-performance agency platforms.",
          features: [
            "Unlimited Custom Framework Pages",
            "Full Payment Gateway Integration",
            "Tailored Operations Admin Panel",
            "Premium Security & Firewalls",
            "Schema Structured Snippets",
            "Bi-weekly Technical Support Checks",
          ],
          ctaText: "Contact for Proposal",
        },
      ]}
      faqs={[
        {
          question: `How long does custom website development take in ${config.targetMarket}?`,
          answer: "A standard Startup or Business site typically takes 7 to 12 working days from copy approval to deployment. More complex e-commerce portals or custom database apps can take 3 to 6 weeks depending on requirements.",
        },
        {
          question: "Will my website look good on smartphones and tablets?",
          answer: "Yes, every layout we build is fully responsive. We design with a mobile-first philosophy, ensuring elements adapt to various screen sizes, font scales, and mobile connections.",
        },
        {
          question: "Do you build websites using WordPress or Next.js?",
          answer: "We focus on Next.js, React, and modern static stacks for speed and SEO rankings. However, we can construct highly optimized WordPress setups if that aligns better with your budget and edit patterns.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: getRegionalHref("/seo-services"), label: "SEO Services" },
        { href: "/portfolio", label: "Portfolio" },
        { href: getRegionalHref("/contact"), label: "Contact Us" },
      ]}
    />
  );
}
