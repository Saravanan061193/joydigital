import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Ecommerce Website Development | Custom Headless E-commerce - Joy Digital",
  description: "Joy Digital is the premier e-commerce website development agency. We build fast, responsive Next.js headless e-commerce sites that increase sales.",
  alternates: {
    canonical: "https://joydigital.in/ecommerce-website-development",
  },
  openGraph: {
    title: "Ecommerce Website Development | Custom Headless E-commerce - Joy Digital",
    description: "Joy Digital is the premier e-commerce website development agency. We build fast, responsive Next.js headless e-commerce sites that increase sales.",
    url: "https://joydigital.in/ecommerce-website-development",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecommerce Website Development | Custom Headless E-commerce - Joy Digital",
    description: "Joy Digital is the premier e-commerce website development agency. We build fast, responsive Next.js headless e-commerce sites that increase sales.",
  }
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Ecommerce Website Development",
  "serviceType": "Web Development Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Madurai Main Road",
      "addressLocality": "Madurai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "625001",
      "addressCountry": "IN"
    }
  },
  "description": "Custom headless e-commerce development services. We build fast Next.js stores, configure payment gateways, list product feeds, and optimize checkout funnels.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "35000",
    "highPrice": "150000",
    "offerCount": "3"
  }
};

export default function EcommerceWebDevPage() {
  return (
    <ServicePageTemplate
      serviceName="Ecommerce Website Development"
      heroTitle="Ecommerce Website Development Services"
      heroSubtitle="Convert mobile visitors into paying customers with fast, responsive, and secure e-commerce platforms. We build custom Next.js headless storefronts that load instantly and decrease checkout abandonment."
      leadSource="Ecommerce Website Development Landing Page"
      canonicalUrl="https://joydigital.in/ecommerce-website-development"
      overviewTitle="Headless E-commerce: Blazing Speeds, Zero DB Downtime & High Security"
      overviewContent={
        <div className="space-y-6">
          <p>
            Standard e-commerce builders (like WooCommerce, Shopify, or Magento) can feel slow, bloated, and vulnerable to hacks. Every second of delay in loading products or rendering the checkout page directly reduces your conversion rates. To scale sales, you need a high-speed storefront built on modern headless technology.
          </p>
          <p>
            At Joy Digital, our specialized <strong>ecommerce website development</strong> uses **Next.js** and **Tailwind CSS**. We separate the front-end display from the back-end database (headless architecture). This ensures your product pages load in under 1.2 seconds, even on slow mobile networks.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Optimized Checkout Funnels, Security, and Payment Gateway Setup</h3>
          <p>
            Over 70% of e-commerce carts are abandoned due to complicated checkouts or slow load times. We design checkout pages that make purchasing simple. We integrate domestic and international payment gateways, set up automated invoice emails, and construct product catalog feeds.
          </p>
          <p>
            Because we build headless sites, there are no SQL databases directly connected to the front-end, making them secure against cyber threats. We also set up product structured data schemas (Product, Offer, and Reviews JSON-LD), helping your product listings rank in Google search.
          </p>
        </div>
      }
      benefitsTitle="Why Choose Headless E-commerce?"
      benefitsSubtitle="We build high-converting storefronts optimized for speed, search, and checkout."
      benefits={[
        {
          icon: "fa-solid fa-gauge-high",
          title: "1.2s Fast Load Speed",
          description: "Our Next.js serverless architecture loads product pages in under 1.2 seconds, boosting conversion rates.",
        },
        {
          icon: "fa-solid fa-mobile-screen-button",
          title: "Mobile-Optimized Shop",
          description: "Fluid design tested across smart devices, ensuring product grids and checkouts scale on all screens.",
        },
        {
          icon: "fa-solid fa-cart-shopping",
          title: "1-Click Checkout Funnel",
          description: "Distraction-free checkouts, guest checkouts, and integrated fields that reduce abandoned baskets.",
        },
        {
          icon: "fa-solid fa-credit-card",
          title: "Payment Gateway Sync",
          description: "Seamless integration with Stripe, Razorpay, and digital wallets for secure, real-time transaction processing.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-chart",
          title: "SEO Rich Schemas Setup",
          description: "We configure product, price, reviews, and availability schemas to display listings on Google search.",
        },
        {
          icon: "fa-solid fa-lock",
          title: "Headless Cyber Security",
          description: "Bypassing standard server databases on the front-end protects customer transaction logs from threats.",
        },
      ]}
      processTitle="Our Development Workflow"
      processSubtitle="How we build, test, and launch your e-commerce storefront from layout to secure setup."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-compass-drafting",
          title: "UI Mockup Design",
          description: "We design custom layout wireframes for homepages, product cards, and checkout paths.",
        },
        {
          step: "2",
          icon: "fa-solid fa-code",
          title: "Front-End Coding",
          description: "We build layouts in Next.js, integrating fast components and optimizing images to .webp formats.",
        },
        {
          step: "3",
          icon: "fa-solid fa-screwdriver-wrench",
          title: "Gateway & CMS Linkage",
          description: "We integrate payment gateways, configure product databases, and link catalogs to dynamic dashboards.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "Launch & SEO Audit",
          description: "We deploy the serverless site, setup product schemas, test checkout calls, and configure domains.",
        },
      ]}
      pricingTitle="Pricing Plans for Online Stores"
      pricingSubtitle="Select the perfect package for your product inventory scale. No monthly maintenance lock-ins."
      pricingTiers={[
        {
          name: "Starter E-commerce",
          price: "₹35,000",
          period: "one-time",
          description: "Perfect for local boutiques, travels, and shops launching their first online catalog.",
          features: [
            "Up to 100 Product Uploads Setup",
            "100% Mobile Responsive Storefront",
            "Direct Payment Gateway Integration",
            "WhatsApp Order Notification Routing",
            "Basic Product On-Page SEO",
            "1 Year Server Hosting Setup Support",
          ],
          ctaText: "Choose Starter Plan",
        },
        {
          name: "Premium Storefront",
          price: "₹65,000",
          period: "one-time",
          description: "Best for growing brands and retail showrooms needing custom databases and CRM linkages.",
          isPopular: true,
          features: [
            "Up to 1,000 Product Uploads Support",
            "Headless Next.js Dashboard Architecture",
            "Product, Offer & Reviews Schema Setup",
            "Advanced Abandoned Cart Email Alerts",
            "Google Analytics eCommerce Tracking",
            "Priority Technical Developer Support",
          ],
          ctaText: "Choose Premium Plan",
        },
        {
          name: "Enterprise Custom",
          price: "Custom Quote",
          description: "For complex marketplace platforms, multi-currency stores, and warehouse API syncs.",
          features: [
            "Unlimited Product Inventory Database",
            "Multi-Vendor Marketplace Integration",
            "Third-Party ERP & Inventory Sync",
            "Custom Admin Panel Configurations",
            "Automated Tax & Delivery API Setup",
            "Monthly Dedicated Support Packages",
          ],
          ctaText: "Get Custom Quote",
        },
      ]}
      faqs={[
        {
          question: "Can I manage product inventory myself?",
          answer: "Yes. We link your headless storefront to an easy-to-use content management dashboard, allowing your team to add products, adjust prices, and monitor order logs without coding knowledge.",
        },
        {
          question: "What payment options can you set up?",
          answer: "We configure UPI payments, credit cards, debit cards, net banking, and wallets (Razorpay, PhonePe, Paytm, Stripe) for secure transactions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/web-development-company-in-madurai", label: "Web Development" },
        { href: "/website-design-company-in-madurai", label: "Web Design Madurai" },
        { href: "/seo-services-in-madurai", label: "SEO Services Madurai" },
      ]}
    />
  );
}
