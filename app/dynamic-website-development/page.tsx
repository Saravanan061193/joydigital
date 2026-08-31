import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { generatePageSeo } from "@/lib/seoEngine";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await generatePageSeo("/dynamic-website-development");
  return seoData.metadata;
}

export default async function DynamicWebDevPage() {
  const seoData = await generatePageSeo(
    "/dynamic-website-development",
    "Dynamic Website Development Services & Custom CMS | Joy Digital",
    "Build high-speed, database-driven dynamic websites with custom admin panels, real-time API sync, and secure PostgreSQL/Supabase backends."
  );

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dynamic Website Development Services",
    "serviceType": "Database-Driven Web Application Development",
    "provider": {
      "@type": "Organization",
      "name": "Joy Digital",
      "image": "https://joydigital.in/assets/images/logo.webp",
      "telephone": "+919080026133"
    },
    "description": "Joy Digital is a dynamic website development company building database-driven web portals and custom CMS applications for global clients."
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
        serviceName="Dynamic Website Development"
        heroTitle={seoData.pageMapping?.h1 || "Dynamic Website Development Services with Custom Admin Controls"}
        heroSubtitle="Build high-performance, database-driven dynamic web applications equipped with custom CMS dashboards, real-time API sync, and sub-second page loads."
        leadSource="Dynamic Website Development Page"
        heroCtaText="Request a Dynamic Web Quote"
        canonicalUrl="https://joydigital.in/dynamic-website-development"
        overviewTitle="Database-Driven Dynamic Architecture & Real-Time Content Systems"
        overviewContent={
          <div className="space-y-6">
            <p>
              Modern businesses require web platforms that adapt instantly to customer interactions, inventory shifts, and content updates. Joy Digital builds custom dynamic websites and database-driven web portals using PostgreSQL, Supabase, Prisma ORM, Node.js, and Next.js static/dynamic rendering.
            </p>
            <p>
              Whether you need a custom admin control panel to manage blog content, a multi-tenant client portal, or an automated lead management engine, our dynamic web solutions give you total control without bloated CMS software.
            </p>
          </div>
        }
        benefitsTitle="Why Choose Custom Dynamic Web Architecture?"
        benefitsSubtitle="Empower your team with intuitive content management and sub-second database query execution."
        benefits={[
          {
            icon: "fa-solid fa-[#7C3AED] fa-database",
            title: "Relational Database Schemas",
            description: "PostgreSQL & Supabase architectures configured with parameterized queries and strict type-safety.",
          },
          {
            icon: "fa-solid fa-sliders",
            title: "Custom Admin Control Dashboards",
            description: "Tailor-made CMS panels allowing non-technical editors to update content, images, and services instantly.",
          },
          {
            icon: "fa-solid fa-bolt",
            title: "Incremental Static Regeneration (ISR)",
            description: "Pages update dynamically in the background without requiring full rebuilds or causing slow database bottlenecks.",
          },
          {
            icon: "fa-solid fa-shield-halved",
            title: "Role-Based Access Control (RBAC)",
            description: "Secure user authentication layers (JWT / OAuth 2.0) with fine-grained permission models.",
          },
        ]}
        processTitle="4-Step Dynamic Web Development Process"
        processSubtitle="From database schema mapping to live production release."
        processSteps={[
          {
            step: "1",
            icon: "fa-solid fa-[#7C3AED] fa-sitemap",
            title: "Schema & Data Modeling",
            description: "We model relational tables, user entities, and API endpoints.",
          },
          {
            step: "2",
            icon: "fa-solid fa-code",
            title: "Admin Panel & API Build",
            description: "We engineer custom dashboard controls and secure API endpoints.",
          },
          {
            step: "3",
            icon: "fa-solid fa-vial",
            title: "Security & Query Testing",
            description: "We audit database indexing, rate-limiting, and sanitized query executions.",
          },
          {
            step: "4",
            icon: "fa-solid fa-rocket",
            title: "Deployment & CMS Handover",
            description: "We deploy live on Vercel/AWS and provide full admin dashboard training.",
          },
        ]}
        pricingTitle="Dynamic Website Development Packages"
        pricingSubtitle="Flat-rate custom quotes based on admin controls and database complexity."
        pricingTiers={[
          {
            name: "Dynamic CMS Setup",
            price: "₹35,000",
            period: "starting rate (~$450)",
            description: "Perfect for businesses requiring an admin control dashboard to edit services & blogs.",
            features: [
              "Custom Next.js Frontend",
              "Admin Panel / CMS Dashboard",
              "PostgreSQL/Supabase Database",
              "Sub-second Page Load Speed",
              "Basic SEO & Schema Setup",
            ],
            ctaText: "Get Started",
          },
          {
            name: "Enterprise Dynamic Portal",
            price: "Custom Quote",
            period: "full scope",
            description: "Complex multi-tenant portals, custom user roles, and advanced API middleware.",
            isPopular: true,
            features: [
              "Advanced Database & Relational Schemas",
              "Role-Based Access Control (RBAC)",
              "Real-time API Sync (CRMs/Stripe)",
              "Dedicated Technical Lead",
              "100% IP Code Handover",
            ],
            ctaText: "Request Enterprise Quote",
          },
        ]}
        faqs={seoData.pageMapping?.faq_schema || [
          {
            question: "What is a dynamic website development service?",
            answer: "Dynamic website development builds database-driven web portals with admin controls allowing live content updates."
          }
        ]}
        schemaMarkup={pageSchema}
        crossLinks={[
          { href: "/custom-website-development", label: "Custom Web Dev" },
          { href: "/website-development", label: "Web Services" },
          { href: "/industries/real-estate", label: "Real Estate Portals" },
        ]}
      />
    </>
  );
}
