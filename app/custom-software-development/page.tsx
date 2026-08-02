import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Custom Software Development | Web Apps & Portals - Joy Digital",
  description: "Joy Digital offers custom software development services. We build secure database applications, dashboard portals, and customized APIs.",
  alternates: {
    canonical: "https://joydigital.in/custom-software-development",
  },
  openGraph: {
    title: "Custom Software Development | Web Apps & Portals - Joy Digital",
    description: "Joy Digital offers custom software development services. We build secure database applications, dashboard portals, and customized APIs.",
    url: "https://joydigital.in/custom-software-development",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development | Web Apps & Portals - Joy Digital",
    description: "Joy Digital offers custom software development services. We build secure database applications, dashboard portals, and customized APIs.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Software Development",
  "serviceType": "Web Development Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chennai Main Road",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "625001",
      "addressCountry": "IN"
    }
  },
  "description": "Premium custom software development services. We engineer database portals, SaaS platforms, corporate dashboards, and third-party API integrations.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "45000",
    "highPrice": "250000",
    "offerCount": "3"
  }
};

export default function CustomSoftwarePage() {
  return (
    <ServicePageTemplate
      serviceName="Custom Software Development"
      heroTitle="Custom Software Development Services"
      heroSubtitle="Automate business processes, coordinate databases, and build secure admin portals. We engineer custom React and Next.js web applications, build APIs, and integrate CRM databases tailored to your goals."
      leadSource="Custom Software Development Landing Page"
      canonicalUrl="https://joydigital.in/custom-software-development"
      overviewTitle="Custom Web Applications & Database Systems Built for Growth"
      overviewContent={
        <div className="space-y-6">
          <p>
            Off-the-shelf software packages often fail to match your specific business operations, containing bloated features you do not need, or lacking critical database integrations. To streamline operations and scale efficiently, you need a custom web application built around your exact workflow rules.
          </p>
          <p>
            At Joy Digital, our specialized <strong>custom software development</strong> focuses on building secure database portals and SaaS applications. We design custom back-ends and connect them to fast React front-ends to ensure smooth performance across mobile and desktop devices.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">API Configurations, CRM Integrations, and Process Automation</h3>
          <p>
            We help eliminate manual data entry by connecting your website to third-party tools (such as payment gates, invoicing, SMS notifications, and CRM systems). We build custom admin dashboards that let you check reports, manage user access, and coordinate customer requests.
          </p>
          <p>
            Our codebases are built using TypeScript and Node.js for scalability. We configure server setups, set up SSL security certificates, and run data validation checks to protect your database logs.
          </p>
        </div>
      }
      benefitsTitle="Why Develop Custom Web Software?"
      benefitsSubtitle="We build secure, scalable applications to automate your business operations."
      benefits={[
        {
          icon: "fa-solid fa-layer-group",
          title: "Tailored to Your Workflow",
          description: "We write clean code from scratch to match your operational requirements, avoiding bloated platforms.",
        },
        {
          icon: "fa-solid fa-database",
          title: "Secure Database Portals",
          description: "We configure secure database structures to organize your customer accounts, transactions, and inventories.",
        },
        {
          icon: "fa-solid fa-code-branch",
          title: "Custom API Integrations",
          description: "We connect your software to payment gateways, mapping networks, messaging lines, and CRM systems.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Real-Time Dashboard Reports",
          description: "We build intuitive admin dashboards that display business metrics, sales reports, and user activities.",
        },
        {
          icon: "fa-solid fa-lock",
          title: "Advanced Data Security",
          description: "We enforce secure authentication tokens, validate forms, and use secure server hosting setups.",
        },
        {
          icon: "fa-solid fa-user-gear",
          title: "Direct Developer Support",
          description: "Direct access to our development team for feature additions, configurations, and regular maintenance.",
        },
      ]}
      processTitle="Our Custom Software Workflow"
      processSubtitle="How we design, code, and deploy custom database platforms systematically."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass",
          title: "Requirements Gathering",
          description: "We study your business operations, map database structures, and outline software specifications.",
        },
        {
          step: "2",
          icon: "fa-solid fa-compass-drafting",
          title: "Database & UI Design",
          description: "We design database schemas, map API layouts, and design admin panel dashboard wireframes.",
        },
        {
          step: "3",
          icon: "fa-solid fa-code",
          title: "Next.js & API Coding",
          description: "We build the software using React/TypeScript, integrating payment gates and setting up routes.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "Testing & Hosting",
          description: "We perform security checks, test data routes, host the database, and configure server backups.",
        },
      ]}
      pricingTitle="Custom Software Packages"
      pricingSubtitle="Select the software baseline that matches your operational complexity. No monthly lock-in fees."
      pricingTiers={[
        {
          name: "Basic Web Portal",
          price: "₹45,000",
          period: "one-time",
          description: "Ideal for businesses needing a customer reservation portal or member database login.",
          features: [
            "Custom Database (PostgreSQL/MongoDB)",
            "User Authentication Setup (Sign Up/Log In)",
            "Responsive Admin Dashboard Panel",
            "Direct SMS/WhatsApp Alerts Config",
            "1 Year Server Hosting Setup Support",
            "Standard On-Page SEO configurations",
          ],
          ctaText: "Choose Portal Plan",
        },
        {
          name: "SaaS Business System",
          price: "₹85,000",
          period: "one-time",
          description: "Best for growing companies looking to automate processes and integrate payment pipelines.",
          isPopular: true,
          features: [
            "Advanced Multi-Role User Management",
            "Third-Party CRM & API Integrations",
            "Subscription Payment Billing setup",
            "Real-Time Data Reporting Widgets",
            "Automated PDF Invoices Generation",
            "Priority Technical Developer Support",
          ],
          ctaText: "Choose SaaS Plan",
        },
        {
          name: "Enterprise Software",
          price: "Custom Quote",
          description: "For complex marketplace platforms, ERP modules, and high-load databases.",
          features: [
            "Bespoke Database Scaling Architecture",
            "Comprehensive Multi-System Integrations",
            "Advanced Real-Time Tracking APIs",
            "Custom Mobile App Setup Support",
            "Automated Server Failover Configurations",
            "Dedicated Maintenance Support Agreements",
          ],
          ctaText: "Get Custom Quote",
        },
      ]}
      faqs={[
        {
          question: "What technology stack do you use?",
          answer: "We develop custom software using React/Next.js for the user interface, Node.js or Serverless Functions for back-end APIs, and PostgreSQL or MongoDB for database management, ensuring fast, modern, and secure applications.",
        },
        {
          question: "Can you maintain and scale the software after launch?",
          answer: "Yes. We offer flexible monthly maintenance packages to cover feature additions, security patches, library updates, and database backup monitoring.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/web-development-company-in-chennai", label: "Web Development" },
        { href: "/ecommerce-website-development", label: "eCommerce Web Dev" },
        { href: "/portfolio", label: "Our Portfolio" },
      ]}
    />
  );
}
