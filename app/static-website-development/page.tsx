import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { generatePageSeo } from "@/lib/seoEngine";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await generatePageSeo(
    "/static-website-development",
    "Static Website Development Services, Examples & SSG | Joy Digital",
    "What is a static website? Explore static website examples, static website generator tech (Next.js), and dynamic website vs static website performance."
  );
  return seoData.metadata;
}

export default async function StaticWebDevPage() {
  const seoData = await generatePageSeo(
    "/static-website-development",
    "Static Website Development Services, Examples & SSG | Joy Digital",
    "What is a static website? Explore static website examples, static website generator tech (Next.js), and dynamic website vs static website performance."
  );

  return (
    <>
      <ServicePageTemplate
        serviceName="Static Website Development"
        heroTitle={seoData.pageMapping?.h1 || "Static Website Development Services, Examples & Edge Architecture"}
        heroSubtitle="Build sub-second, pre-rendered static business websites using Next.js, React, and global Edge CDNs. Discover what is a static website, explore static website examples, and learn why top brands choose static site architecture over legacy CMS."
        leadSource="Static Website Development Page"
        heroCtaText="Request a Static Web Quote"
        canonicalUrl="https://joydigital.in/static-website-development"
        overviewTitle="Sub-Second Pre-Rendered Architecture & SSG Edge Performance"
        overviewContent={
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">What is a Static Website?</h2>
              <p>
                If you are wondering <strong>what is a static website</strong>, it is a web platform engineered using pre-rendered HTML, CSS, and JavaScript files delivered directly to visitors via global Content Delivery Networks (CDNs). Unlike legacy platforms that query database servers on every single page view, static web pages are compiled during deployment for instant, sub-second global load times.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Dynamic Website vs Static Website: Key Architectural Differences</h2>
              <p>
                When evaluating a <strong>dynamic website vs static website</strong> for your business, the core distinction lies in how web content is compiled. A dynamic website uses server-side scripts and relational databases to render page markup on-the-fly when a user requests it. In contrast, a static website pre-renders all assets upfront using a modern <strong>static website generator</strong>. This eliminates server database query latencies, SQL injection vulnerabilities, and expensive hosting costs.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Modern Static Website Generator Technologies</h2>
              <p>
                Powering modern high-speed web apps, a <strong>static website generator</strong> (SSG) such as Next.js, React, Astro, or Hugo automates transforming structured components into production-ready static HTML. At Joy Digital, we leverage Next.js as our primary static website generator to build scalable corporate sites with serverless edge distribution.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Real-World Static Website Examples & Use Cases</h2>
              <p>
                Looking for a practical <strong>static website example</strong>? Common <strong>static website examples</strong> include company brochure portals, agency showcases, software documentation sites, startup landing pages, and B2B lead generation websites. Every real-world <strong>static website example</strong> engineered by Joy Digital achieves 95+ Core Web Vitals, 100% serverless security, and instant search indexability.
              </p>
            </div>
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
            question: "What is a static website and how does it work?",
            answer: "What is a static website? A static website consists of pre-rendered HTML, CSS, and JavaScript files delivered directly to visitors via global CDN edge nodes without database query delays."
          },
          {
            question: "What is the key difference between a dynamic website vs static website?",
            answer: "In a dynamic website vs static website comparison, dynamic sites compile content dynamically per user request using server databases, whereas static websites pre-build pages upfront using a static website generator for sub-second speeds and zero database security risks."
          },
          {
            question: "What is a static website generator and which one do you use?",
            answer: "A static website generator (SSG) is a modern build tool like Next.js, Astro, or Hugo that pre-compiles source code into fast static pages. Joy Digital leverages Next.js and React for enterprise static web applications."
          },
          {
            question: "Can you provide a real-world static website example for businesses?",
            answer: "A classic static website example includes corporate brand sites, product landing pages, documentation platforms, and agency portfolio showcases. High-performing static website examples load in under 1 second worldwide."
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
