import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Headless E-commerce Development & Conversion Rates | Joy Digital",
  description: "Custom web development for e-commerce brands. Build lightning-fast shopping sites, simple checkout pages, and custom WhatsApp billing integrations.",
  alternates: {
    canonical: "https://joydigital.in/website-for-ecommerce",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom E-commerce Web Development",
  "serviceType": "E-commerce Development",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Old Perungalathur",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600063",
      "addressCountry": "IN"
    }
  },
  "description": "Professional web design and development services for online retail and shopping storefronts. Optimize conversion rates and speed.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "35000",
    "highPrice": "95000",
    "offerCount": "2"
  }
};

export default function EcommerceWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Ecommerce"
      heroTitle="Lightning-Fast Headless E-commerce Stores Built to Convert"
      heroSubtitle="Increase your sales conversions by 40%. Build fast, search-optimized e-commerce storefronts designed to load under 1.5s, showcase products, and simplify checkouts."
      leadSource="Website for Ecommerce Landing Page"
      heroCtaText="Request E-commerce Quote"
      overviewTitle="Minimize Shopping Cart Abandonment & Accelerate Page Speeds"
      overviewContent={
        <div className="space-y-6">
          <p>
            For e-commerce brands, page load speed is directly tied to revenue. If your online store takes longer than 2.5 seconds to load, checkout abandonment rates spike, and you waste advertising budget on bounced traffic.
          </p>
          <p>
            At Joy Digital, we build premium, headless e-commerce platforms using Next.js, React, and serverless architectures. This guarantees that your catalogs load instantly on mobile networks, keeping buyers engaged and driving sales conversions.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Payment Integrations & Frictionless Checkouts</h3>
          <p>
            We integrate local and global payment gateways (like Razorpay, Stripe, Instamojo, and Paytm) and build clean, single-page checkouts. We also configure automated WhatsApp checkout triggers for easy direct sales routing.
          </p>
        </div>
      }
      benefitsTitle="Conversion-Focused E-commerce Features"
      benefitsSubtitle="We build storefronts optimized for page speed, search visibility, and frictionless checkouts."
      benefits={[
        {
          icon: "fa-solid fa-basket-shopping",
          title: "Custom Product Catalogs",
          description: "Organize collections, variations (sizes, colors), dynamic pricing models, and search tags cleanly.",
        },
        {
          icon: "fa-solid fa-credit-card",
          title: "Stripe & Razorpay Integration",
          description: "Configure secure checkout handshakes to accept credit cards, debit cards, netbanking, and UPI directly.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "WhatsApp Checkout Routing",
          description: "Optionally route shopping carts directly to WhatsApp to close deals via custom personal chats.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "LCP Loading under 1.5s",
          description: "Optimized server bundle chunks and compressed WebP graphics prevent mobile loading lag.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Marketing Pixels & Analytics",
          description: "Integrate Meta Pixel, Google Analytics, and custom tags to track purchase events and ad ROI.",
        },
        {
          icon: "fa-solid fa-tags",
          title: "SEO Schema for Products",
          description: "Automatic JSON-LD product schemas display prices, stock status, and reviews directly on Google results.",
        },
      ]}
      processTitle="How We Build Your Storefront"
      processSubtitle="A systematic path to configuring catalogs, setting up gateways, and launching your shop."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-table-list",
          title: "Inventory & Setup Planning",
          description: "We map catalog taxonomy, categories, billing specifications, and checkout options.",
        },
        {
          step: "2",
          icon: "fa-solid fa-palette",
          title: "Distraction-Free UI Design",
          description: "We design clean product pages and checkout pipelines to reduce buyer friction in Figma.",
        },
        {
          step: "3",
          icon: "fa-solid fa-laptop-code",
          title: "Fast Next.js Coding",
          description: "We build static product grids and payment integrations for instant rendering.",
        },
        {
          step: "4",
          icon: "fa-solid fa-circle-check",
          title: "Testing & Checkout Launch",
          description: "We run test transactions, review responsive layout scaling, and connect payment hooks.",
        },
      ]}
      pricingTitle="E-commerce Pricing Packages"
      pricingSubtitle="Get a modern, fast e-commerce platform designed to scale catalog sales."
      pricingTiers={[
        {
          name: "E-commerce Startup",
          price: "₹35,000",
          period: "one-time",
          description: "Perfect for local boutiques, handmade brands, and early-stage stores.",
          features: [
            "Up to 50 Products Catalog",
            "Secure Stripe / Razorpay Setup",
            "WhatsApp Checkout Option",
            "Mobile-Responsive Product Pages",
            "Google Analytics Event Tracking",
            "1 Year Hosting Setup Support",
          ],
          ctaText: "Get Started",
        },
        {
          name: "E-commerce Scale Plan",
          price: "₹75,000+",
          period: "one-time",
          description: "Recommended for retail brands, multi-category catalogs, and custom shopping platforms.",
          isPopular: true,
          features: [
            "Unlimited Products Directory",
            "Headless Shop Backend Setup",
            "Automated Inventory CMS Syncing",
            "Dynamic FAQ & Review Sections",
            "Marketing Pixel Configurations",
            "Google Merchant Center XML feed",
          ],
          ctaText: "Get Custom Quote",
        },
      ]}
      faqs={[
        {
          question: "Which payment gateways can we integrate?",
          answer: "We support integrations with Razorpay, Cashfree, and Instamojo for Indian markets, and Stripe or PayPal for global checkouts.",
        },
        {
          question: "Is there a limit to the number of products we can sell?",
          answer: "No. With our custom headless and CMS database configurations, your platform can support thousands of products without slowing down.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/website-development", label: "Web Development" },
        { href: "/contact", label: "Contact Us" },
      ]}
    />
  );
}
