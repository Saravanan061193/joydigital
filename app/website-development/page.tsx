import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Professional Website Development Services | Joy Digital",
  description: "Accelerate business growth with secure, fast-loading, mobile-friendly corporate websites and web apps. Economical web development packages.",
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Website Development Services",
  "serviceType": "Web Development",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital Growth Agency",
    "image": "https://joydigitalmarketing.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Madurai Main Road",
      "addressLocality": "Madurai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "625001",
      "addressCountry": "IN"
    }
  },
  "description": "Joy Digital is a leading web development agency designing high-converting, mobile-responsive, secure websites built for speed and search indexing.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "95000",
    "offerCount": "3"
  }
};

export default function WebDevPage() {
  return (
    <ServicePageTemplate
      serviceName="Website Development"
      heroTitle="Secure, Fast & High-Converting Custom Website Development"
      heroSubtitle="Transform your online profile with responsive business websites engineered using clean code, optimized metadata structures, and next-generation frameworks. Turn ordinary site traffic into recurring leads."
      leadSource="Website Development Landing Page"
      overviewTitle="Engineered for Conversions, PageRank & Modern Web Performance"
      overviewContent={
        <div className="space-y-6">
          <p>
            In the modern digital landscape, your website is the operational engine of your company. It serves as your primary brand builder, your digital front office, and your most valuable client acquisition funnel. Standard WordPress drag-and-drop themes or templates often bundle massive script loads, resulting in slow load speeds, poor core web vitals, and frustrating user experiences that push prospective customers away.
          </p>
          <p>
            At Joy Digital Growth Agency, we believe that premium web engineering should be affordable and result-oriented. We design custom web portals using frameworks like Next.js, React, and optimized HTML5/Tailwind architectures. This guarantees that your platforms load in less than 1.5 seconds, achieve perfect PageSpeed scores, and rank at the top of Google search pages.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why Code Quality Matters for Search Rankings</h3>
          <p>
            Google uses page experience as a key ranking factor. If your site takes longer than 3 seconds to render, visitors leave before they even view your offer. Slow rendering directly increases bounce rates, signaling to search crawlers that your page is not helpful. By developing sites with clean markup, semantic elements, compressed WebP/AVIF graphics, and server-side pre-rendering, we build a solid foundation that helps your business stand out from competitors.
          </p>
          <p>
            Whether you need a simple corporate landing page, an e-commerce platform with payment integrations, or a custom SaaS admin panel, we align our development milestones with your marketing objectives. Every line of code is structured to build long-term brand equity and generate recurring client inquiries.
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
          title: "Mobile-First Design",
          description: "Over 65% of local searches happen on smartphones. We construct responsive layouts that fit perfectly on all screens and viewports.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "Advanced Security Systems",
          description: "We implement SSL certificates, secure payment gateways, sanitization scripts, and firewalls to protect user data from vulnerability hacks.",
        },
        {
          icon: "fa-solid fa-magnifying-glass",
          title: "SEO-Ready Configuration",
          description: "Built-in dynamic sitemaps, semantic tag hierarchies, open graph properties, and meta indexing code make it easy for Google to crawl and index your pages.",
        },
        {
          icon: "fa-solid fa-chart-pie",
          title: "Built-in CRO Mechanics",
          description: "Strategic CTA buttons, inline forms, user-friendly layouts, and floating widgets are positioned to convert simple visitors into active sales leads.",
        },
        {
          icon: "fa-solid fa-gears",
          title: "Dedicated Technical Support",
          description: "We provide hosting setups, monthly database backups, core framework updates, and technical troubleshooting to keep your site running smoothly.",
        },
      ]}
      processTitle="Our Growth-Focused Development Workflow"
      processSubtitle="We leverage a systematic 4-step workflow to plan, build, test, and deploy your custom web project successfully."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-comments",
          title: "Discovery & Planning",
          description: "We align on your brand identity, service catalog, target keywords, user journeys, and conversion objectives before writing code.",
        },
        {
          step: "2",
          icon: "fa-solid fa-bezier-curve",
          title: "Visual Design",
          description: "Our UI/UX designers create layout mockups showcasing typography, color schemes, and visual hierarchies for your approval.",
        },
        {
          step: "3",
          icon: "fa-solid fa-code",
          title: "Development & Coding",
          description: "We build responsive interfaces using clean code, semantic structures, metadata variables, and interactive React states.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "QA & Deployment",
          description: "We run browser compatibility tests, check speed performance scores, verify sitemaps, and deploy your site on global CDNs.",
        },
      ]}
      pricingTitle="Economical Web Development Tiers"
      pricingSubtitle="Select a package designed to scale your business profile. Zero hidden costs, transparent milestones."
      pricingTiers={[
        {
          name: "Startup Package",
          price: "₹15,000",
          description: "Perfect for new local service businesses wanting to establish professional authority online.",
          features: [
            "Up to 5 Pages Responsive Layout",
            "Custom Logo & Branding Style",
            "Basic On-Page SEO Setup",
            "Lead Contact Form Integration",
            "Floating WhatsApp Support Button",
            "1 Year Free Hosting Setup Support",
          ],
          ctaText: "Choose Startup Plan",
        },
        {
          name: "Business Growth Package",
          price: "₹35,000",
          description: "Recommended for growing companies targeting local search rankings and regular lead generation.",
          isPopular: true,
          features: [
            "Up to 10 Pages Structured Layout",
            "Advanced On-Page SEO Integration",
            "Google Business Profile Linkage",
            "Interactive Blog Setup (MDX ready)",
            "Dynamic FAQ Accordions + Schema",
            "Free Speed Optimization Guarantee",
          ],
          ctaText: "Choose Growth Plan",
        },
        {
          name: "Enterprise Solutions",
          price: "₹75,000+",
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
          question: "How long does custom website development take?",
          answer: "A standard Startup or Business site typically takes 5 to 12 working days from copy approval to deployment. More complex e-commerce portals or custom database apps can take 3 to 6 weeks depending on requirements.",
        },
        {
          question: "Will my website look good on smartphones and tablets?",
          answer: "Yes, every layout we build is fully responsive. We design with a mobile-first philosophy, ensuring elements adapt to various screen sizes and mobile connections.",
        },
        {
          question: "Do you build websites using WordPress or custom code?",
          answer: "We offer both. For maximum security, under 1s speeds, and SEO rankings, we recommend next-generation custom frameworks like Next.js and Tailwind CSS. For businesses that want a simple admin dashboard, we construct optimized WordPress layouts.",
        },
        {
          question: "Can you help me set up a custom business email address?",
          answer: "Yes, we help set up professional business emails (e.g., info@yourdomain.com) using Google Workspace, Microsoft 365, or free cPanel mail setups.",
        },
        {
          question: "Do you offer support after the website goes live?",
          answer: "Yes, we provide 30 days of free technical support after launch. We also offer yearly maintenance packages that cover minor edits, database backups, security patches, and server management.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/web-design-services", label: "Web Design" },
        { href: "/seo-services", label: "SEO Services" },
        { href: "/local-seo-services", label: "Local SEO" },
      ]}
    />
  );
}
