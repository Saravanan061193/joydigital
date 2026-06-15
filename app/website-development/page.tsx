import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Custom React & Next.js Web Development Services | Joy Digital",
  description: "Joy Digital is a custom web development agency. We engineer fast, secure, and mobile-responsive websites using Next.js & React to rank on Google and scale leads globally.",
  alternates: {
    canonical: "https://joydigital.in/website-development",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Website Development Services",
  "serviceType": "Web Development",
  "provider": {
    "@type": "Organization",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133"
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
      heroTitle="High-Performance Custom Web Development Services"
      heroSubtitle="Transform your online presence with responsive business websites engineered using clean code, optimized metadata structures, and next-generation frameworks. We help your business rank at the top of Google and turn organic traffic into recurring customers globally."
      leadSource="Website Development Landing Page"
      overviewTitle="Engineered for Conversions, PageRank & Modern Web Performance"
      overviewContent={
        <div className="space-y-6">
          <p>
            In today&apos;s highly competitive digital landscape, your website serves as the operational engine of your entire company. It functions as your primary brand builder, your digital front office, and your most valuable lead acquisition funnel. Standard drag-and-drop website builders or bloated templates often bundle massive, unused Javascript files. This results in slow load speeds, poor core web vitals, and frustrating user experiences that push prospective customers straight to your competitors.
          </p>
          <p>
            At Joy Digital, a leading <strong>custom web development agency</strong>, we believe that premium web engineering should be both affordable and results-oriented. We design and develop custom web portals using next-generation frameworks like Next.js, React, and optimized HTML5/Tailwind architectures. This guarantees that your platforms load in less than 1.5 seconds, achieve perfect PageSpeed scores, and rank highly on search engine results pages.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Why Code Quality and Architecture Impact Search Rankings</h3>
          <p>
            Google uses page experience and Core Web Vitals as crucial ranking factors. If your site takes longer than 3 seconds to render, visitors will leave before they even view your offer. Slow rendering directly increases bounce rates, signaling to search crawlers that your page does not provide a good user experience. By developing sites with clean semantic markup, compressed WebP/AVIF graphics, server-side pre-rendering, and optimized bundle chunks, we build a solid foundation that helps your business stand out from competitors globally.
          </p>
          <p>
            Whether you need a simple corporate landing page, an e-commerce platform with payment integrations (like Razorpay or Stripe), or a custom SaaS admin panel, we align our development milestones with your marketing objectives. Every line of code we write is structured to build long-term brand equity, improve search engine visibility, and generate recurring client inquiries organically.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Next.js and React: The Future of Business Websites</h3>
          <p>
            Many businesses rely on legacy platforms that suffer from security vulnerabilities and slow response times. By choosing a custom React or Next.js static site setup, you eliminate the risk of database hacks and ensure your platform remains online 100% of the time. Our setups are hosted on global Content Delivery Networks (CDNs), meaning your website loads instantly for users anywhere globally.
          </p>
        </div>
      }
      benefitsTitle="Why Modern Businesses Partner with Joy Digital"
      benefitsSubtitle="We don't just build sites; we construct high-converting lead pipelines that combine beautiful visuals with fast-loading frameworks."
      benefits={[
        {
          icon: "fa-solid fa-bolt",
          title: "Under 1.5s Load Speeds",
          description: "Optimized server bundle chunks and compressed media files ensure your site loads instantly on mobile networks, reducing bounce rates and keeping users engaged on the page.",
        },
        {
          icon: "fa-solid fa-mobile-screen",
          title: "Mobile-First Responsive Layouts",
          description: "Over 65% of search inquiries happen on smartphones. We construct responsive layouts that fit perfectly on all screens, tablets, and mobile browser viewports.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "Advanced Security & SSL Setup",
          description: "We implement SSL certificates, secure payment gateways, sanitization scripts, and firewalls to protect user data from vulnerability hacks and maintain compliance.",
        },
        {
          icon: "fa-solid fa-magnifying-glass",
          title: "SEO-Ready Configurations",
          description: "Built-in dynamic sitemaps, semantic tag hierarchies, open graph properties, and meta indexing code make it easy for Google to crawl, index, and rank your services.",
        },
        {
          icon: "fa-solid fa-chart-pie",
          title: "Built-in CRO Mechanics",
          description: "Strategic CTA buttons, inline forms, user-friendly layouts, and floating widgets are positioned to convert simple visitors into active sales leads automatically.",
        },
        {
          icon: "fa-solid fa-gears",
          title: "Dedicated Technical Support",
          description: "We provide hosting setups, monthly database backups, core framework updates, and technical troubleshooting to keep your website running smoothly without downtime.",
        },
      ]}
      processTitle="Our Growth-Focused Development Workflow"
      processSubtitle="We leverage a systematic 4-step workflow to plan, build, test, and deploy your custom web project successfully."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-comments",
          title: "Discovery & Planning",
          description: "We align on your brand identity, service catalog, target keywords, user journeys, and conversion objectives before writing a single line of code.",
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
          description: "We build responsive interfaces using clean code, semantic structures, metadata variables, schema integrations, and interactive React states for optimal speed.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "QA & Global Deployment",
          description: "We run browser compatibility tests, check speed performance scores, verify sitemaps, and deploy your site on global CDNs for maximum performance.",
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
          answer: "A standard Startup or Business site typically takes 5 to 12 working days from copy approval to deployment. More complex e-commerce portals or custom database apps can take 3 to 6 weeks depending on requirements. We maintain strict milestones to deliver on time.",
        },
        {
          question: "Will my website look good on smartphones and tablets?",
          answer: "Yes, every layout we build is fully responsive. We design with a mobile-first philosophy, ensuring elements adapt to various screen sizes, font scales, and mobile connections. This is critical for mobile SEO rankings in India.",
        },
        {
          question: "Do you build websites using WordPress or custom code?",
          answer: "We offer both. For maximum security, under 1s speeds, and SEO rankings, we recommend next-generation custom frameworks like Next.js and Tailwind CSS. For businesses that want a simple admin dashboard with lower budgets, we construct highly optimized WordPress layouts.",
        },
        {
          question: "Can you help me set up a custom business email address?",
          answer: "Yes, we help set up professional business emails (e.g., info@yourdomain.com) using Google Workspace, Microsoft 365, or secure cPanel mail setups. We ensure correct MX and SPF configurations for reliable email delivery.",
        },
        {
          question: "Do you offer support after the website goes live?",
          answer: "Yes, we provide 30 days of free technical support after launch. We also offer yearly maintenance packages that cover minor edits, database backups, security patches, and server management to keep your site updated.",
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
