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

  return (
    <>
      <ServicePageTemplate
        serviceName="Custom Website Development"
        heroTitle={seoData.pageMapping?.h1 || "Custom Website Development Services for Global Enterprises"}
        heroSubtitle="Engineered for global scale. Build bespoke, sub-second Next.js web applications with zero template bloat, 99+ Core Web Vitals, and 100% IP code ownership."
        leadSource="Custom Website Development Page"
        heroCtaText="Book a Free Architecture Call"
        canonicalUrl="https://joydigital.in/custom-website-development"
        overviewTitle="High-Intent Custom Website Development for Global Businesses"
        overviewContent={
          <div className="space-y-6">
            <p>
              Joy Digital is an enterprise <strong>custom website development</strong> agency delivering tailored digital platforms, high-speed applications, and <strong>custom website development services</strong>. We eliminate the vulnerabilities, slow load times, and bloated codebase of legacy page builders by engineering modern, decoupled Next.js & React solutions.
            </p>
            <p>
              If your company requires <strong>bespoke web development</strong> or <strong>custom business websites</strong> built to capture organic traffic and scale seamlessly, our full-stack engineering team builds scalable <strong>dynamic web development</strong> platforms tailored to your exact business objectives.
            </p>
            <h3 className="text-xl font-extrabold text-primary-dark mt-8 mb-4">Custom Code (Next.js / React) vs. Off-the-Shelf Templates (WordPress / Wix)</h3>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-left text-xs border-collapse border border-[#E9E4F2]">
                <thead>
                  <tr className="bg-[#1F1B2D] text-white">
                    <th className="p-3 border border-[#3D306E]">Architecture Feature</th>
                    <th className="p-3 border border-[#3D306E] bg-[#7C3AED]/20 text-[#A78BFA]">Custom Next.js & React Build</th>
                    <th className="p-3 border border-[#3D306E]">Generic WordPress / Wix Template</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E4F2] text-[#1F1B2D]">
                  <tr className="bg-white">
                    <td className="p-3 border border-[#E9E4F2] font-bold">Mobile Page Speed & Core Web Vitals</td>
                    <td className="p-3 border border-[#E9E4F2] font-semibold text-emerald-600">Sub-second (&lt; 1.2s), 95+ Score</td>
                    <td className="p-3 border border-[#E9E4F2] text-rose-600">Slow (3.5s - 6s), heavy plugin bloat</td>
                  </tr>
                  <tr className="bg-[#FAF9FF]">
                    <td className="p-3 border border-[#E9E4F2] font-bold">Security & Vulnerabilities</td>
                    <td className="p-3 border border-[#E9E4F2] font-semibold text-emerald-600">Decoupled serverless static rendering (Zero database attack vector)</td>
                    <td className="p-3 border border-[#E9E4F2] text-rose-600">High risk of plugin hacks, SQL injections, and outdated core scripts</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 border border-[#E9E4F2] font-bold">Code & IP Ownership</td>
                    <td className="p-3 border border-[#E9E4F2] font-semibold text-emerald-600">100% full IP code ownership handed to client</td>
                    <td className="p-3 border border-[#E9E4F2] text-rose-600">Vendor lock-in on proprietary builder platforms</td>
                  </tr>
                  <tr className="bg-[#FAF9FF]">
                    <td className="p-3 border border-[#E9E4F2] font-bold">SEO & Indexing Control</td>
                    <td className="p-3 border border-[#E9E4F2] font-semibold text-emerald-600">Automated JSON-LD schemas, SSR, and clean semantic markup</td>
                    <td className="p-3 border border-[#E9E4F2] text-rose-600">Cluttered DOM nodes and inline style overrides blocking crawlers</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
          },
          {
            question: "What is the difference between custom website development and off-the-shelf templates?",
            answer: "Custom website development builds bespoke, clean, typed code tailored to your exact workflows and security requirements, whereas templates use bloated generic page builders that slow down mobile page loads and expose sites to plugin vulnerabilities."
          }
        ]}
        crossLinks={[
          { href: "/website-development", label: "Custom Web Development Services" },
          { href: "/web-design-services", label: "Custom Website Design" },
          { href: "/ecommerce-website-development", label: "Custom Ecommerce Website Development" },
        ]}
      />
    </>
  );
}
