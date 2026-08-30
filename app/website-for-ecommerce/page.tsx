import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Global Headless E-Commerce Website Development | Joy Digital",
  description: "High-converting website design & headless e-commerce development for global online brands. Build sub-1.5s shopping storefronts with Stripe/PayPal, multi-currency checkouts, and international SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-ecommerce",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-ecommerce",
    title: "Global Headless E-Commerce Website Design & International Sales | Joy Digital",
    description: "Ultra-fast Next.js e-commerce development built for global DTC brands and cross-border retail. Multi-currency checkouts, Stripe/PayPal, automated inventory sync, and international SEO.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Global E-Commerce Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-ecommerce#service",
      "name": "Global Headless E-Commerce Web Development",
      "serviceType": "E-Commerce Development & Cross-Border Retail Marketing",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Joy Digital",
        "image": "https://joydigital.in/assets/images/logo.webp",
        "telephone": "+919080026133",
        "url": "https://joydigital.in",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Old Perungalathur",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600063",
          "addressCountry": "IN"
        }
      },
      "description": "Custom headless e-commerce development for global retail storefronts, cross-border brands, and direct-to-consumer businesses. Includes Stripe & PayPal multi-currency checkouts, sub-1.5s mobile speed, and international product SEO.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "35000",
        "highPrice": "95000",
        "offerCount": "2"
      }
    }
  ]
};

export default function EcommerceWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Ecommerce"
      heroTitle="Lightning-Fast Headless E-Commerce Stores Built for Global Sales"
      heroSubtitle="Scale cross-border shopping conversions by up to 40%. We build high-speed, search-ready Next.js e-commerce storefronts designed to load under 1.5s, support multi-currency checkouts (USD, EUR, GBP, AED, INR), and capture international shoppers."
      leadSource="Website for Ecommerce Landing Page"
      heroCtaText="Get Free E-Commerce Quote"
      overviewTitle="Minimize Shopping Cart Abandonment & Accelerate Global Sales Speeds"
      overviewContent={
        <div className="space-y-6">
          <p>
            For global e-commerce brands, mobile page load speed and checkout friction are directly tied to revenue. If your online store takes longer than 2 seconds to render product images across international networks, checkout abandonment spikes, wasting your global ad spend.
          </p>
          <p>
            At Joy Digital, we build high-performance headless e-commerce platforms using serverless Next.js and React. This guarantees that your product catalogs load instantly across US, European, Middle Eastern, and Asian networks, keeping buyers engaged.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Global E-Commerce Stores</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Multi-Currency Checkouts</strong>: Automated USD, EUR, GBP, AED & INR currency switches</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Global Gateway Integrations</strong>: Stripe, PayPal, Razorpay, Klarna & Apple Pay</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>International Product SEO Schema</strong>: Rich Google snippets with price & stock badges</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s LCP Load Speeds</strong>: Edge-hosted image CDN & static catalog chunks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Cross-Border Logistics & Shipping API Sync</strong>: DHL, FedEx, UPS & local carrier tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>WhatsApp Sales & Support Checkout</strong>: Direct chat routing for quick customer conversion</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we merge modern e-commerce UI/UX design with <Link href="/website-development" className="text-primary font-bold hover:underline">custom web engineering</Link> and <Link href="/seo-services" className="text-primary font-bold hover:underline">international search optimization</Link> to help retail brands scale worldwide.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Global E-Commerce Websites"
      benefitsSubtitle="Engineered for page speed, multi-region search visibility, and frictionless cross-border checkouts."
      benefits={[
        {
          icon: "fa-solid fa-basket-shopping",
          title: "1. Multi-Currency Product Catalogs",
          description: "Organize collections, color/size variants, dynamic pricing models, and automatic country currency selectors (USD, EUR, GBP, INR).",
        },
        {
          icon: "fa-solid fa-credit-card",
          title: "2. Stripe, PayPal & Global Gateway Sync",
          description: "Accept credit cards, debit cards, Apple Pay, Google Pay, Klarna Buy-Now-Pay-Later, and localized payment methods.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "3. Direct WhatsApp Checkout & Order Routing",
          description: "Allow buyers to send shopping cart contents directly to WhatsApp for personalized concierge checkout.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "4. LCP Sub-1.5s Page Load Speeds",
          description: "Serverless static site generation and WebP/AVIF graphics optimization prevent mobile loading lag globally.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "5. Multi-Channel Pixel & Analytics Sync",
          description: "Integrate Meta Pixel, TikTok Pixel, Google Analytics 4 eCommerce events, and Klaviyo email capture.",
        },
        {
          icon: "fa-solid fa-tags",
          title: "6. Rich Product SEO Schema Markup",
          description: "JSON-LD product schemas display prices, star ratings, stock availability, and shipping info directly on Google Search.",
        },
        {
          icon: "fa-solid fa-truck-fast",
          title: "7. Cross-Border Freight & Courier Calculator",
          description: "Real-time shipping rate calculation for DHL, FedEx, UPS, and international post services.",
        },
        {
          icon: "fa-solid fa-rotate-left",
          title: "8. Automated Returns & Order Tracking Portal",
          description: "Empower international shoppers to track package status and submit RMA return requests effortlessly.",
        },
        {
          icon: "fa-solid fa-earth-americas",
          title: "9. International Shopping SEO Strategy",
          description: "Rank for global e-commerce keywords across target markets in US, UK, Canada, Australia, Europe, and Middle East.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "10. PCI-DSS Compliance & SSL Security",
          description: "Bank-grade encrypted checkouts protecting customer card data and fulfilling international privacy standards (GDPR).",
        },
      ]}
      processTitle="Our 6-Step Global E-Commerce Engineering Roadmap"
      processSubtitle="A proven roadmap from inventory planning to live international checkout."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-table-list",
          title: "Inventory & Global Audit",
          description: "We map catalog taxonomy, variant attributes, target shipping regions, and currency options.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Taxonomy & SEO Architecture",
          description: "We structure collection hierarchies, filter attributes, XML feeds, and global shopping SEO terms.",
        },
        {
          step: "3",
          icon: "fa-solid fa-palette",
          title: "Frictionless UI/UX Design",
          description: "We design clean product pages, sticky 'Add to Cart' bars, and distraction-free checkout flows in Figma.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Store Build",
          description: "We build static product grids and secure API payment integrations for sub-1.5s global rendering.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "SEO & Gateway Integration",
          description: "We implement Product schema markup, test credit card checkouts, and sync Google Merchant Center XML feeds.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Merchant Center Sync",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and verify live checkouts.",
        },
      ]}
      pricingTitle="Transparent Global Pricing Packages for E-Commerce"
      pricingSubtitle="Get a modern, fast e-commerce platform designed to scale worldwide sales with zero hidden commissions."
      pricingTiers={[
        {
          name: "Global E-Commerce Startup",
          price: "₹35,000",
          period: "one-time ($1,500 USD)",
          description: "Perfect for direct-to-consumer boutiques, specialized product brands, and early-stage stores.",
          features: [
            "Up to 50 Products Catalog",
            "Secure Stripe & PayPal Global Setup",
            "Multi-Currency Display (USD/EUR/INR)",
            "WhatsApp Order Checkout Option",
            "Mobile-Responsive Product Grids",
            "Google Analytics 4 eCommerce Tracking",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Startup Plan",
        },
        {
          name: "Enterprise Headless Storefront",
          price: "₹95,000",
          period: "one-time ($4,200 USD)",
          description: "Recommended for high-volume retail brands, multi-category catalogs, and cross-border platforms.",
          isPopular: true,
          features: [
            "Unlimited Products Directory",
            "Headless Next.js + CMS Backend",
            "Automated Inventory & Courier API Sync",
            "Global Merchant Center XML Feed",
            "Klarna & Apple Pay Gateway Integration",
            "Full Multi-Region International SEO",
            "Google Analytics 4 & Meta Pixel Setup",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Enterprise Plan",
        },
      ]}
      faqs={[
        {
          question: "Which global payment gateways can we integrate?",
          answer: "We integrate Stripe, PayPal, Apple Pay, Google Pay, and Klarna for international shoppers in US/EU, alongside Razorpay, Paytm, and Cashfree for Indian customers.",
        },
        {
          question: "Can international buyers pay in their native currency (USD, EUR, GBP, AED)?",
          answer: "Yes! We build automated multi-currency converters so visitors see prices and checkout in their native currency based on location.",
        },
        {
          question: "Is there a limit to the number of products we can sell?",
          answer: "No. With our custom headless Next.js architecture, your store can host thousands of products and variants without sacrificing load speed.",
        },
        {
          question: "Will our products show up on Google Shopping?",
          answer: "Yes. We configure automated Google Merchant Center XML product feeds and JSON-LD product schemas so your inventory displays directly on Google Shopping tab.",
        },
        {
          question: "Are there any recurring monthly sales commissions?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly portal subscription fees or per-sale commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "E-Commerce SEO Services" },
        { href: "/website-for-luxury-brands", label: "Luxury Brand Web Dev" },
        { href: "/website-for-export-and-import", label: "Export-Import Web Dev" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Us" },
      ]}
    />
  );
}
