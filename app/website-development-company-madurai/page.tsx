import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Website Development Company in Madurai | Custom Web Design",
  description: "Looking for the best website development company in Madurai? We code fast, mobile-friendly Next.js and React websites for local startups and growing brands.",
  alternates: {
    canonical: "https://joydigital.in/website-development-company-madurai",
  },
  openGraph: {
    title: "Website Development Company in Madurai | Custom Web Design",
    description: "Looking for the best website development company in Madurai? We code fast, mobile-friendly Next.js and React websites for local startups and growing brands.",
    url: "https://joydigital.in/website-development-company-madurai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Company in Madurai | Custom Web Design",
    description: "Looking for the best website development company in Madurai? We code fast, mobile-friendly Next.js and React websites for local startups and growing brands.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Website Development Services in Madurai",
  "serviceType": "Next.js & React Web Development",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Madurai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    }
  },
  "description": "Joy Digital is a leading website development company in Madurai, specializing in custom React & Next.js builds that load under 1.5 seconds.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "25000",
    "highPrice": "75000",
    "offerCount": "3"
  }
};

export default function WebDevMadurai() {
  return (
    <ServicePageTemplate
      serviceName="Website Development Madurai"
      heroTitle="Website Development Company in Madurai"
      heroSubtitle="Get dynamic, mobile-friendly React and Next.js website assets. As a premium website development company in Madurai, we build fast corporate portfolios that convert visitors into active customers."
      leadSource="Website Development Madurai Landing Page"
      canonicalUrl="https://joydigital.in/website-development-company-madurai"
      overviewTitle="High-Performance Website Design & Development in Madurai"
      overviewContent={
        <div className="space-y-6 text-justify">
          <p>
            In the historical and rapidly growing city of Madurai, traditional business setups are rapidly transitioning to digital channels. Whether you operate a retail store near the Meenakshi Amman Temple, a healthcare clinic in Anna Nagar, or an agricultural business in the outskirts, having a slow, generic website is no longer enough to stay competitive. We are a specialized <strong>website development company in Madurai</strong> focused on delivering custom, high-speed React and Next.js websites. Our projects completely bypass database bottlenecks and heavy, vulnerable scripts, delivering pages that load in under 1.5 seconds on standard mobile networks.
          </p>
          <p>
            As professional developers, we understand that site speed is a vital Google search ranking signal. Standard drag-and-drop builders often output bloated code and introduce layout shift issues that frustrate users. We code your website semantic element by semantic element using modern frameworks, ensuring that your business stands out on search engine result pages (SERPs) and converts traffic into inquiries.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Why React & Next.js Web App Development Lead the Market</h3>
          <p>
            Traditional platforms like WordPress are prone to loading delays, broken plugins, and security hacks. Our custom React website structures render directly into pre-packaged static HTML files distributed via global content delivery networks (CDNs). This ensures that your website achieves perfect scores on Core Web Vitals, handles heavy traffic spikes without crashing, and secures user data from database attacks.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Building Local Trust and Nationwide Visibility</h3>
          <p>
            Many businesses in Madurai require a website that establishes instant trust within Tamil Nadu while enabling expansion across India. Our custom systems integrate local schema markups, pre-configured call to action paths, and Google Business Profile connections. This ensures your service listings rank higher in local map pack results, helping you attract local enquiries effortlessly.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">Optimized User Interfaces (UI) and Interactive Flow</h3>
          <p>
            A high-performance website is more than just an online brochure. We design user flows that map precisely to how your prospective customers search and make choices. By integrating sticky mobile navigation tabs, call widgets, and interactive contact forms, we simplify the path for visitors to request quotes or message your sales desk directly on WhatsApp.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Our Madurai Development Team?"
      benefitsSubtitle="We build speed-optimized, modern digital assets designed to convert visitors."
      benefits={[
        {
          icon: "fa-solid fa-bolt",
          title: "Sub-1.5 Second Speeds",
          description: "Our serverless static builds load instantly, preventing visitor bounces and improving search ranks.",
        },
        {
          icon: "fa-solid fa-code",
          title: "React Web Applications",
          description: "Custom frontend coding tailored strictly to your company branding guidelines and colors.",
        },
        {
          icon: "fa-solid fa-mobile-screen",
          title: "100% Mobile Responsive",
          description: "Thoroughly tested on small and medium screens for fluid layouts and accessible touch interfaces.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "Local Schema Structured",
          description: "Geotagged local business tags and absolute canonical URLs are pre-injected into the code header.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "Serverless Database Security",
          description: "Zero database vulnerability exposure, secure SSL certificates, and fast global CDN hosting.",
        },
        {
          icon: "fa-solid fa-headset",
          title: "Dedicated Remote Support",
          description: "Direct access to our developer workspace for domain redirects, updates, and maintenance support.",
        },
      ]}
      processTitle="Our Structured Website Delivery Framework"
      processSubtitle="We design and launch fast-loading React web platforms in 4 phases."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-compass-drafting",
          title: "Wireframe & SEO Strategy",
          description: "We map out target search keywords, page architecture, and design static layouts to suit your company.",
        },
        {
          step: "2",
          icon: "fa-solid fa-code",
          title: "React/Next.js Coding Sprints",
          description: "We write clean, semantic React code and style it with optimized custom CSS elements.",
        },
        {
          step: "3",
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "Structured Schema Integration",
          description: "We configure LocalBusiness, Service, and FAQ schemas to get your site ready for search indexing.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "Speed Audits & Launch",
          description: "We verify Lighthouse speeds, link GSC and GA4 tracking, and deploy the website to global servers.",
        },
      ]}
      pricingTitle="Clear, Milestone-Based Development Pricing"
      pricingSubtitle="Select the plan that fits your business scale. No hidden fees or surprise maintenance lock-ins."
      pricingTiers={[
        {
          name: "Starter Site",
          price: "₹25,000",
          period: "one-time",
          description: "Ideal for local advisors, growing retail shops, and professional business portfolios.",
          features: [
            "1-5 Custom Responsive Pages",
            "100% Mobile Responsive Layout",
            "Direct WhatsApp Lead Integration",
            "Fast Mobile Speed Audits",
            "Contact Form Submission Setup",
            "Google Maps citation setup",
          ],
          ctaText: "Select Starter Plan",
        },
        {
          name: "Professional Plan",
          price: "₹25,000",
          period: "one-time",
          description: "Best for medical clinics, local resorts, educational hubs, and growing companies.",
          isPopular: true,
          features: [
            "Up to 10 Premium Pages",
            "Complete SEO Metadata Optimization",
            "Local Schema Markup Integration",
            "Google Analytics Event Tracking",
            "1 Year Hosting Setup & Redirections Support",
            "Priority developer support access",
          ],
          ctaText: "Select Professional Plan",
        },
        {
          name: "Enterprise Custom",
          price: "Custom Quote",
          description: "Best for complex e-commerce stores, reservation systems, and database portals.",
          features: [
            "Unlimited Custom Frontend Pages",
            "Headless E-commerce Storefront Integration",
            "Custom API & Database Configurations",
            "Conversion Funnel Tracking Suite",
            "Advanced Form CRM Routing",
            "Ongoing Maintenance Support Packages",
          ],
          ctaText: "Get Custom Quote",
        },
      ]}
      faqs={[
        {
          question: "Which areas in Madurai do you serve?",
          answer: "We support businesses across Madurai remotely, including Anna Nagar, K.Pudur, Tallakulam, Sellur, Kalavasal, Villapuram, and adjacent towns. Our operations are fully online, making it easy to schedule calls and manage design updates.",
        },
        {
          question: "Can you help move my WordPress website in Madurai to Next.js?",
          answer: "Yes. We can extract your existing content, structure a clean Next.js React layout, and set up redirections. This preserves your organic Google rankings while boosting your site's load speed and security.",
        },
        {
          question: "How do we coordinate website reviews remotely?",
          answer: "We share active staging links where you can view design progress. We coordinate project handoffs, sprint reviews, and direct developer consultations via WhatsApp, phone call, or Zoom.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/seo-services-madurai", label: "SEO Services Madurai" },
        { href: "/website-development-company-chennai", label: "Web Development Chennai" },
        { href: "/seo-services-chennai", label: "SEO Services Chennai" },
      ]}
    />
  );
}
