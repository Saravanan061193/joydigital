import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { generatePageSeo } from "@/lib/seoEngine";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await generatePageSeo(
    "/static-website-development",
    "Static Website Development Services | High Speed & Security | Joy Digital",
    "Build sub-second static websites pre-rendered with Next.js, React, and global CDN delivery. Zero database bottlenecks, 100% serverless security, and top Core Web Vitals."
  );
  return seoData.metadata;
}

export default async function StaticWebDevPage() {
  const seoData = await generatePageSeo(
    "/static-website-development",
    "Static Website Development Services | High Speed & Security | Joy Digital",
    "Build sub-second static websites pre-rendered with Next.js, React, and global CDN delivery. Zero database bottlenecks, 100% serverless security, and top Core Web Vitals."
  );

  return (
    <>
      <ServicePageTemplate
        serviceName="Static Website Development"
        heroTitle={seoData.pageMapping?.h1 || "Static Website Development Services Engineered for Speed & Security"}
        heroSubtitle="Build sub-second, pre-rendered static business websites using Next.js, React, and global Edge CDNs. Enjoy 100% serverless security, zero database maintenance, and 95+ Core Web Vitals."
        leadSource="Static Website Development Page"
        heroCtaText="Request a Static Web Quote"
        canonicalUrl="https://joydigital.in/static-website-development"
        overviewTitle="Sub-Second Pre-Rendered Architecture & Serverless Performance"
        overviewContent={
          <div className="space-y-6">
            <p>
              In today&apos;s fast digital landscape, website speed directly impacts visitor conversion rates and search rankings. <strong>Static website development</strong> pre-compiles your entire web layout into optimized static HTML, CSS, and JavaScript files during builds, eliminating server database query latencies completely.
            </p>
            <p>
              Unlike legacy, bloated database-driven sites that take several seconds to load, our <strong>custom static website solutions</strong> built with Next.js and React load in under 1 second worldwide. Static websites offer maximum security with zero SQL injection risks, low hosting infrastructure costs, and perfect search engine indexability.
            </p>
          </div>
        }
        benefitsTitle="Why Choose Custom Static Website Architecture?"
        benefitsSubtitle="Empower your brand with ultra-fast page rendering and serverless security."
        benefits={[
          {
            icon: "fa-solid fa-bolt",
            title: "Sub-Second Page Load Speed",
            description: "Pre-rendered static HTML cached across global CDN edge nodes loads instantly on mobile 4G/5G connections.",
          },
          {
            icon: "fa-solid fa-shield-halved",
            title: "100% Serverless Security",
            description: "No backend databases or unpatched CMS plugins means zero risk of SQL injections or hacker intrusions.",
          },
          {
            icon: "fa-solid fa-[#7C3AED] fa-globe",
            title: "Global Edge CDN Distribution",
            description: "Served through Vercel/Cloudflare edge networks close to your global prospects for minimal latency.",
          },
          {
            icon: "fa-solid fa-[#7C3AED] fa-coins",
            title: "Lower Infrastructure Cost",
            description: "Static hosting requires zero expensive database servers or heavy backend maintenance fees.",
          },
        ]}
        processTitle="4-Step Static Web Development Process"
        processSubtitle="From wireframe design to global edge deployment."
        processSteps={[
          {
            step: "1",
            icon: "fa-solid fa-[#7C3AED] fa-drafting-compass",
            title: "Architecture & Layout Planning",
            description: "We structure mobile-first wireframes, semantic headings, and lead call-to-actions.",
          },
          {
            step: "2",
            icon: "fa-solid fa-code",
            title: "Next.js & React Build",
            description: "We compile clean, lightweight components with optimized WebP media assets.",
          },
          {
            step: "3",
            icon: "fa-solid fa-vial",
            title: "Speed & SEO Validation",
            description: "We test Core Web Vitals, Lighthouse 95+ scores, and structured JSON-LD schemas.",
          },
          {
            step: "4",
            icon: "fa-solid fa-rocket",
            title: "Edge Deployment & Go-Live",
            description: "We deploy on global CDN networks and hand over 100% IP source code.",
          },
        ]}
        pricingTitle="Static Website Development Packages"
        pricingSubtitle="Flat-rate proposals tailored for small businesses, startups, and corporate profiles."
        pricingTiers={[
          {
            name: "Starter Static Site",
            price: "₹15,000",
            period: "flat rate (~$200)",
            description: "Ideal for local service providers, consultants, and small business landing profiles.",
            features: [
              "Up to 5 Custom Pre-rendered Pages",
              "Mobile-First Responsive Layout",
              "1-Tap WhatsApp & Enquiry Form",
              "Basic Onsite SEO & Schema Setup",
              "Sub-Second Page Load Speed",
            ],
            ctaText: "Get Started",
          },
          {
            name: "Business Static Platform",
            price: "₹35,000",
            period: "flat rate (~$450)",
            isPopular: true,
            description: "Comprehensive corporate multipage website engineered for maximum SEO & lead conversion.",
            features: [
              "Up to 15 Custom Pre-rendered Pages",
              "Bespoke UI/UX Brand Design",
              "Global CDN Deployment (Vercel/Netlify)",
              "Full Technical SEO & Keyword Schema",
              "100% Source Code Ownership",
            ],
            ctaText: "Request Business Quote",
          },
        ]}
        faqs={seoData.pageMapping?.faq_schema || [
          {
            question: "What is a static website development service?",
            answer: "Static website development builds pre-rendered HTML, CSS, and JS web pages that deliver instant loading speeds, serverless security, and high Google search visibility."
          },
          {
            question: "Is a static website good for SEO?",
            answer: "Yes! Static websites load faster than traditional CMS platforms, achieve 95+ Lighthouse Core Web Vitals, and allow search engines to crawl and index pages instantly."
          }
        ]}
        crossLinks={[
          { href: "/custom-website-development", label: "Custom Web Dev" },
          { href: "/dynamic-website-development", label: "Dynamic Web Apps" },
          { href: "/portfolio-website-development", label: "Portfolio Websites" },
          { href: "/landing-page-development", label: "Landing Page Dev" },
        ]}
      />
    </>
  );
}
