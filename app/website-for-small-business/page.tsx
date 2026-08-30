import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Small Business Website Design & Digital Growth SEO | Joy Digital",
  description: "High-converting website design & digital marketing for small businesses, startups, local shops, and global service vendors. Get fast Next.js sites, Google Maps ranking, and affordable web packages.",
  alternates: {
    canonical: "https://joydigital.in/website-for-small-business",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-small-business",
    title: "Small Business Website Design & Global Client Lead Generation | Joy Digital",
    description: "Ultra-fast Next.js website design tailored for growing small businesses, service providers, and global startups. Mobile-friendly layouts, lead quote forms, WhatsApp integration, and search engine optimization.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Small Business Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-small-business#service",
      "name": "Small Business Website Design & Digital Growth SEO",
      "serviceType": "Small Business Web Development & Growth Marketing",
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
      "description": "Custom web design for small businesses, startups, service providers, and local stores. Includes fast Next.js development, lead quote forms, Google Business Profile setup, and search optimization.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "12000",
        "highPrice": "30000",
        "offerCount": "2"
      }
    }
  ]
};

export default function SmallBusinessWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Small Business"
      heroTitle="Affordable, High-Converting Website Design & SEO for Small Businesses"
      heroSubtitle="Transform your small business or startup into a 24/7 lead acquisition engine. We engineer ultra-fast, mobile-friendly Next.js websites for local service providers, growing startups, and small business owners worldwide."
      leadSource="Website for Small Business Landing Page"
      heroCtaText="Get Free Small Business Quote"
      overviewTitle="Why Most Small Business Websites Fail to Attract New Customers (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            Customers looking for reliable local services or online vendors compare website design, customer reviews, service offerings, and contact speed before making a purchase decision.
          </p>
          <p>
            Unfortunately, many small business websites are built on bloated DIY site builders, take over 4 seconds to load on mobile phones, look outdated, and lack clear click-to-call or WhatsApp lead buttons.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Small Business Websites</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Instant Lead Capture Quote Form</strong>: Simple 3-step customer inquiry form</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Google Business Profile Setup</strong>: Rank in Google Maps Local 3-Pack</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Services & Portfolio Showcase</strong>: Clear pricing & past project galleries</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Local & Global SEO Strategy</strong>: Rank for high-value customer search terms</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Ultra-fast serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Direct WhatsApp Button</strong>: Instant mobile customer connection</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we combine affordable pricing with <Link href="/website-development" className="text-primary font-bold hover:underline">custom Next.js web development</Link>, <Link href="/seo-services" className="text-primary font-bold hover:underline">small business SEO</Link>, and <Link href="/google-business-profile-setup" className="text-primary font-bold hover:underline">Google Maps setup</Link> to help small businesses compete and grow.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Small Business Websites"
      benefitsSubtitle="Engineered to build credibility, showcase services, and capture daily customer inquiries."
      benefits={[
        {
          icon: "fa-solid fa-store",
          title: "1. Clean Responsive Business Showcase",
          description: "Mobile-first homepage, company background, service descriptions, and customer trust badges.",
        },
        {
          icon: "fa-solid fa-paper-plane",
          title: "2. Fast Lead Capture Quote Form",
          description: "Simple customer inquiry form asking for name, service needed, phone, and preferred contact time.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "3. Google Maps Local Citation & Address",
          description: "Embed interactive Google Maps location, office directions, business hours, and phone numbers.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "4. One-Tap Mobile WhatsApp Link",
          description: "Instant button connecting customers directly to your business WhatsApp with a pre-filled greeting message.",
        },
        {
          icon: "fa-solid fa-star",
          title: "5. Customer Testimonials & Reviews",
          description: "Display authentic Google customer reviews and client star ratings to build instant local trust.",
        },
        {
          icon: "fa-solid fa-image",
          title: "6. Project & Work Photo Gallery",
          description: "High-resolution before-and-after photo galleries showcasing your completed work or store products.",
        },
        {
          icon: "fa-solid fa-tags",
          title: "7. Transparent Service Pricing Packages",
          description: "Outline service plans, package deliverables, and payment options to reduce buyer hesitation.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "8. Sub-1.5s Page Load Speeds",
          description: "Ultra-fast Next.js architecture ensuring zero mobile loading lag for visitors on 4G/5G connections.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "9. Local & Global Business SEO",
          description: "Target high-intent terms like 'Best web design agency near me', 'Local AC repair service', or 'Small business web partner'.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "10. Free SSL & Domain Configuration",
          description: "Complete SSL security setup and custom domain DNS configuration included in every package.",
        },
      ]}
      processTitle="Our 6-Step Small Business Web Engineering Roadmap"
      processSubtitle="A simple, hassle-free path to getting your business online."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-briefcase",
          title: "Business Audit & Goal Setup",
          description: "We audit your service offerings, target local/global market, logo assets, and customer inquiry workflow.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Page Map & Content Outline",
          description: "We structure homepage sections, service descriptions, photo galleries, and local SEO terms.",
        },
        {
          step: "3",
          icon: "fa-solid fa-paintbrush",
          title: "Modern UI/UX Design",
          description: "We design clean desktop and mobile interface mockups tailored to your brand colors.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Build",
          description: "We build your website on serverless Next.js frameworks for sub-1.5s page load speeds.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "Local SEO & Maps Setup",
          description: "We implement LocalBusiness schema markup, set up Google Business Profile citations, and sync lead forms.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and verify local map pack presence.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Small Business"
      pricingSubtitle="Get a modern, fast business website with zero hidden monthly fees."
      pricingTiers={[
        {
          name: "Small Business Starter",
          price: "₹12,000",
          period: "one-time ($600 USD)",
          description: "Perfect for single-service professionals, local tradesmen, and new micro-businesses.",
          features: [
            "1-3 Custom Responsive Pages",
            "Lead Capture Contact Form",
            "WhatsApp & Phone Direct Links",
            "Google Maps Location Integration",
            "Basic On-Page SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Starter Plan",
        },
        {
          name: "Small Business Growth Plan",
          price: "₹30,000",
          period: "one-time ($1,400 USD)",
          description: "Recommended for growing service companies, local shops, and multi-service vendors.",
          isPopular: true,
          features: [
            "Up to 8 Custom Service & Gallery Pages",
            "Google Business Profile Citation Setup",
            "Work Photo & Video Gallery",
            "Customer Review & Testimonial Section",
            "Full Local & Regional SEO Architecture",
            "Google Analytics 4 & Search Console Sync",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Growth Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a small business cost?",
          answer: "Our small business website packages start from ₹12,000 ($600 USD) for starter sites up to ₹30,000 ($1,400 USD) for multi-page growth portals.",
        },
        {
          question: "How long does it take to build a small business website?",
          answer: "A standard small business website is designed, built, and launched live within 5 to 10 business days.",
        },
        {
          question: "Will my website help me show up on Google Maps?",
          answer: "Yes! We set up and optimize your Google Business Profile, implement LocalBusiness schema markup, and build local citation links so you rank in Google Maps.",
        },
        {
          question: "Can I edit text and add new photos myself after launch?",
          answer: "Yes. We provide a clean, simple CMS so you can easily update service details, change phone numbers, and upload new photos anytime.",
        },
        {
          question: "Are there any hidden monthly hosting or maintenance fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero hidden monthly platform charges.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/web-design-services", label: "Web Design Services" },
        { href: "/local-seo-services", label: "Local Map SEO" },
        { href: "/google-business-profile-setup", label: "Google Business Setup" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Us" },
      ]}
    />
  );
}
