import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { generatePageSeo } from "@/lib/seoEngine";
import JamstackLeadForm from "@/components/ui/JamstackLeadForm";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await generatePageSeo(
    "/static-website-development",
    "Enterprise Jamstack & Next.js Static Web Development | Joy Digital",
    "Engineer sub-second, pre-rendered static web platforms. We provide Enterprise Jamstack Web Development, Headless CMS integration, and Next.js SSG Services for B2B brands."
  );
  return seoData.metadata;
}

export default async function StaticWebDevPage() {
  const seoData = await generatePageSeo(
    "/static-website-development",
    "Enterprise Jamstack & Next.js Static Web Development | Joy Digital",
    "Engineer sub-second, pre-rendered static web platforms. We provide Enterprise Jamstack Web Development, Headless CMS integration, and Next.js SSG Services for B2B brands."
  );

  return (
    <>
      <ServicePageTemplate
        serviceName="Enterprise Jamstack Development"
        heroTitle={seoData.pageMapping?.h1 || "Enterprise Jamstack & Next.js Static Web Development"}
        heroSubtitle="Engineer sub-second, pre-rendered static web platforms built on Next.js, React, and Edge CDNs. Unmatched Core Web Vitals, enterprise-grade security, and zero backend infrastructure overhead for global B2B brands."
        leadSource="Enterprise Jamstack Landing Page"
        customLeadForm={<JamstackLeadForm />}
        canonicalUrl="https://joydigital.in/static-website-development"
        overviewTitle="Transitioning to High-Performance Headless Architecture"
        overviewContent={
          <div className="space-y-6">
            <div>
              <p>
                In the highly competitive B2B SaaS and enterprise sector, user experience and load times directly correlate with conversion rates. Legacy monolithic platforms (like traditional WordPress or PHP) rely on continuous server-side database querying, leading to bloated load times, frequent downtime, and persistent security vulnerabilities. 
              </p>
              <p className="mt-4">
                At Joy Digital, we specialize in <strong>Enterprise Jamstack Web Development</strong>. We decouple your frontend from the backend, pre-rendering your entire platform as static HTML/JSON files at build time. This modern approach delivers instant, sub-second load speeds and a 100% Core Web Vitals Performance Guarantee.
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
              <h3 className="text-lg font-bold text-primary-dark">Why Global Tech Brands Choose Next.js Static Site Generation (SSG) Services</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                  <span><strong>Sub-100ms Global Edge CDN Delivery</strong> (Vercel/Cloudflare)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                  <span><strong>Zero-Downtime Serverless Security</strong> (No DB Vulnerabilities)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                  <span><strong>Headless CMS Integration</strong> (Sanity, Strapi, Contentful)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                  <span><strong>WordPress to Next.js SSG Migration</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                  <span><strong>100% Core Web Vitals Performance Guarantee</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                  <span><strong>Sub-Second Global Edge CDN Deployment</strong></span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Headless CMS & Static Web Architecture</h2>
              <p>
                A static site doesn't mean your content is rigid. By implementing robust <strong>Headless CMS & Static Web Architecture</strong>, your marketing teams can manage content intuitively via platforms like Sanity or Contentful. Upon publishing, webhooks trigger an instant rebuild, updating your global static assets securely without exposing any database to the public internet.
              </p>
            </div>
          </div>
        }
        benefitsTitle="Enterprise Benefits of Jamstack & SSG"
        benefitsSubtitle="Empower your technical teams with modern infrastructure and unbreakable security."
        benefits={[
          {
            icon: "fa-solid fa-bolt",
            title: "Sub-100ms Global Edge Delivery",
            description: "Pre-rendered assets cached across Vercel/Cloudflare edge networks load instantaneously, dominating Core Web Vitals.",
          },
          {
            icon: "fa-solid fa-shield-halved",
            title: "Zero-Downtime Serverless Security",
            description: "No backend databases or unpatched monolith plugins means zero risk of SQL injections or DDoS vulnerabilities.",
          },
          {
            icon: "fa-solid fa-database",
            title: "Headless CMS Integration",
            description: "Seamlessly integrate with API-first content platforms like Sanity, Strapi, or Contentful for decoupled content operations.",
          },
          {
            icon: "fa-solid fa-arrow-right-arrow-left",
            title: "WordPress to Next.js SSG Migration",
            description: "Safely transition from slow, vulnerable legacy monoliths to a highly scalable Next.js React ecosystem.",
          },
          {
            icon: "fa-solid fa-chart-line",
            title: "100% Core Web Vitals Guarantee",
            description: "Achieve perfect Lighthouse scores (95+) to maximize B2B technical SEO and reduce bounce rates significantly.",
          },
          {
            icon: "fa-solid fa-coins",
            title: "Zero Infrastructure Overhead",
            description: "Eliminate expensive EC2 instances and database scaling costs; serve static files for pennies on the dollar.",
          },
        ]}
        processTitle="Our Jamstack Engineering Workflow"
        processSubtitle="A meticulous technical transition from legacy infrastructure to the Edge."
        processSteps={[
          {
            step: "1",
            icon: "fa-solid fa-magnifying-glass-chart",
            title: "Architecture & Vitals Audit",
            description: "We analyze your current monolith, APIs, and Core Web Vitals bottlenecks.",
          },
          {
            step: "2",
            icon: "fa-solid fa-network-wired",
            title: "Headless CMS & API Mapping",
            description: "We structure your content models in a modern Headless CMS (like Sanity or Strapi).",
          },
          {
            step: "3",
            icon: "fa-solid fa-code",
            title: "Next.js Static Compilation",
            description: "We engineer highly reusable React components and configure Next.js Static Site Generation (SSG).",
          },
          {
            step: "4",
            icon: "fa-solid fa-rocket",
            title: "Global Edge CDN Deployment",
            description: "We automate CI/CD pipelines and deploy to Vercel or Cloudflare for sub-second global latency.",
          },
        ]}
        pricingTitle="Enterprise Engineering Portfolios (Priced in USD)"
        pricingSubtitle="Transparent technical retainers for scalable web infrastructure. (Indian partners: ₹ INR equivalent available)."
        pricingTiers={[
          {
            name: "Startup SSG Platform",
            price: "Starts from ₹12,000",
            period: "flat rate",
            description: "Ideal for B2B startups requiring a lightning-fast, secure market entry presence.",
            features: [
              "Up to 8 Custom Pre-rendered Pages",
              "Next.js Static Site Generation",
              "Sub-Second Global Edge CDN Deployment",
              "100% Core Web Vitals Performance Guarantee",
              "Basic API Forms Integration",
              "1 Year Technical Codebase Warranty",
            ],
            ctaText: "Start SSG Migration",
          },
          {
            name: "Global Enterprise Jamstack System",
            price: "Custom Quote",
            period: "flat rate",
            isPopular: true,
            description: "A comprehensive headless architecture for scaling SaaS and global tech brands.",
            features: [
              "Unlimited Scalable Component Architecture",
              "WordPress to Next.js SSG Migration",
              "Headless CMS Integration (Sanity/Strapi)",
              "Zero-Downtime Serverless Security Setup",
              "Automated CI/CD Pipeline Configuration",
              "Advanced Technical SEO & Schema Automation",
            ],
            ctaText: "Deploy Enterprise Jamstack",
          },
        ]}
        faqs={seoData.pageMapping?.faq_schema || [
          {
            question: "Why should an enterprise switch to Jamstack Web Development?",
            answer: "Enterprise Jamstack Web Development decouples the frontend from backend databases, eliminating security vulnerabilities like SQL injections. It pre-renders pages as static files, resulting in sub-100ms load times globally and significantly reducing server infrastructure costs."
          },
          {
            question: "How does WordPress to Next.js SSG Migration work?",
            answer: "We export your existing content and map it to a modern Headless CMS. We then rebuild your frontend using Next.js Static Site Generation (SSG), pulling data from the new CMS APIs. This transforms a slow, monolithic WordPress site into a blazing-fast React application."
          },
          {
            question: "Can a static website handle dynamic data like forms or user authentication?",
            answer: "Yes. While the core markup is statically generated for speed, Jamstack architecture uses serverless functions and client-side API calls to handle dynamic interactions like lead forms, secure user authentication, or real-time inventory seamlessly."
          },
          {
            question: "What is Sub-Second Global Edge CDN Deployment?",
            answer: "Instead of hosting your site on a single origin server (like in New York), we deploy your pre-rendered static files across global Edge CDN networks (like Vercel or Cloudflare). This ensures a user in Tokyo gets the site instantly from a Tokyo server, while a user in London gets it from London."
          }
        ]}
        crossLinks={[
          { href: "/custom-website-development", label: "Custom Enterprise Development" },
          { href: "/dynamic-website-development", label: "Headless Commerce Apps" },
          { href: "/wordpress-to-nextjs-migration", label: "WordPress to Next.js Migration" },
          { href: "/landing-page-development", label: "B2B Lead Gen Pages" },
        ]}
      />
    </>
  );
}
