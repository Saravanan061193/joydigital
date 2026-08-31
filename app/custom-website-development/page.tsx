import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { generatePageSeo } from "@/lib/seoEngine";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await generatePageSeo("/custom-website-development");
  return seoData.metadata;
}

export default async function CustomWebDevPage() {
  const seoData = await generatePageSeo(
    "/custom-website-development",
    "Custom Website Development Services | Joy Digital",
    "Enterprise custom website development services. Sub-second Next.js page loads, 99+ Core Web Vitals, and 100% IP ownership."
  );

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Website Development Services",
    "serviceType": "Web Engineering & Next.js Development",
    "provider": {
      "@type": "Organization",
      "name": "Joy Digital",
      "image": "https://joydigital.in/assets/images/logo.webp",
      "telephone": "+919080026133"
    },
    "description": "Joy Digital is a custom web development agency building high-speed Next.js web applications for global startups and enterprise teams."
  };

  return (
    <>
      {seoData.jsonLdSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ServicePageTemplate
        serviceName="Custom Website Development"
        heroTitle={seoData.pageMapping?.h1 || "Custom Website Development Services for Global Enterprises"}
        heroSubtitle="Engineered for global scale. Build bespoke, sub-second Next.js web applications with zero template bloat, 99+ Core Web Vitals, and 100% IP code ownership."
        leadSource="Custom Website Development Page"
        heroCtaText="Book a Free Architecture Call"
        canonicalUrl="https://joydigital.in/custom-website-development"
        overviewTitle="Decoupled Architectures & Enterprise Web Performance"
        overviewContent={
          <div className="space-y-6">
            <p>
              Joy Digital delivers an end-to-end <strong>custom website development service</strong> and engineering framework designed for sub-second page loads, flawless conversion paths, and enterprise-grade security. No rigid page builders. No plugin vulnerability chains. Just pure, scalable Next.js & React code built for your unique business goals.
            </p>
            <p>
              Whether you need a brand-new digital platform or a <strong>custom website redesign</strong> for a slow legacy site, we decouple your front-end user experience from back-end content stores. Content creators get intuitive editorial workflows (Sanity, Strapi, Contentful) while engineers retain total freedom over presentation, state management, and performance.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Serverless & Edge Compute Execution</h3>
            <p>
              We leverage modern edge distribution (Vercel Edge, AWS CloudFront) to execute compute logic physically closer to your international site visitors across North America, Europe, Australia, and APAC.
            </p>
          </div>
        }
        benefitsTitle="Core Web Engineering Capabilities"
        benefitsSubtitle="How our custom engineering approach outperforms generic templates."
        benefits={[
          {
            icon: "fa-solid fa-cubes",
            title: "Modular Headless Architecture",
            description: "Decoupled Next.js & Sanity/Strapi setups providing total editorial flexibility and zero layout locks.",
          },
          {
            icon: "fa-solid fa-code-branch",
            title: "API-First Microservices",
            description: "Custom RESTful & GraphQL middleware connecting Stripe, Salesforce, and HubSpot in real-time.",
          },
          {
            icon: "fa-solid fa-bolt",
            title: "Sub-Second Global Edge Latency",
            description: "Edge pre-rendering ensuring TTFB under 300ms globally for international visitors.",
          },
          {
            icon: "fa-solid fa-shield-halved",
            title: "Serverless Enterprise Security",
            description: "Decoupled frontend with zero exposed database ports or third-party plugin attack vectors.",
          },
          {
            icon: "fa-solid fa-file-code",
            title: "100% Code & IP Ownership",
            description: "Clean, strictly-typed TypeScript repository handed directly to your engineering team upon launch.",
          },
          {
            icon: "fa-solid fa-magnifying-glass",
            title: "Automated Technical SEO",
            description: "Dynamic JSON-LD schemas, automated sitemaps, and hreflang tag management pre-configured.",
          },
        ]}
        processTitle="Agile 5-Stage Global Delivery"
        processSubtitle="Transparent 2-week Agile sprints designed for international clients."
        processSteps={[
          {
            step: "1",
            icon: "fa-solid fa-clipboard-check",
            title: "Discovery & PRD Blueprinting",
            description: "We audit your tech stack, define data models, and map system integrations.",
          },
          {
            step: "2",
            icon: "fa-solid fa-palette",
            title: "UI/UX & Design System",
            description: "Interactive Figma design systems, conversion triggers, and responsive layout mockups.",
          },
          {
            step: "3",
            icon: "fa-solid fa-code",
            title: "Agile TypeScript Sprints",
            description: "Clean Next.js modular component engineering in transparent 2-week sprints.",
          },
          {
            step: "4",
            icon: "fa-solid fa-rocket",
            title: "QA & Global Edge Launch",
            description: "Synthetic load testing, Core Web Vitals audits, and zero-downtime Edge deployment.",
          },
        ]}
        pricingTitle="Enterprise Custom Development Investment"
        pricingSubtitle="Transparent flat-rate quotes based on scope. No vendor lock-in."
        pricingTiers={[
          {
            name: "Custom MVP Build",
            price: "₹45,000",
            period: "starting rate (~$550)",
            description: "Ideal for startups needing a high-speed custom web application prototype.",
            features: [
              "Custom Next.js & React Frontend",
              "Sub-second Edge Deployment",
              "Basic Headless CMS Integration",
              "WhatsApp & Lead Capture API",
              "100% TypeScript Code Handover",
            ],
            ctaText: "Request MVP Quote",
          },
          {
            name: "Enterprise Custom Web App",
            price: "Custom Quote",
            period: "full scope",
            description: "Full-scale custom web platform with microservices & database architecture.",
            isPopular: true,
            features: [
              "Complex Database Schema & Supabase/PostgreSQL",
              "Full API Microservices (Stripe/CRMs)",
              "Multi-Region Edge Caching",
              "Dedicated Technical Architect",
              "90+ Core Web Vitals Guarantee",
              "100% IP & Code Rights Transfer",
            ],
            ctaText: "Book Architecture Call",
          },
        ]}
        faqs={seoData.pageMapping?.faq_schema || [
          {
            question: "Why choose custom website development with Next.js?",
            answer: "Custom Next.js web application development delivers sub-second page loads, zero plugin vulnerabilities, total design freedom, and 100% code ownership."
          }
        ]}
        schemaMarkup={pageSchema}
        crossLinks={[
          { href: "/dynamic-website-development", label: "Dynamic Web Dev" },
          { href: "/website-development", label: "Web Engineering" },
          { href: "/industries/ecommerce", label: "Ecommerce Solutions" },
        ]}
      />
    </>
  );
}
