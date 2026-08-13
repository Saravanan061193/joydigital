import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Real Estate Website Design & Listings Setup | Joy Digital",
  description: "Get a custom lead-generation website designed for real estate agencies, brokers, and builders. Display properties with high-converting details pages.",
  alternates: {
    canonical: "https://joydigital.in/website-for-real-estate",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Real Estate Website Design",
  "serviceType": "Real Estate Web Development",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
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
  "description": "Professional web design and development services for real estate agencies, builders, and brokers. Showcase property listings and capture direct leads.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "2"
  }
};

export default function RealEstateWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Real Estate"
      heroTitle="Custom Website Design & Lead Systems for Real Estate Brands"
      heroSubtitle="Stop relying strictly on expensive listing portals. Showcase your properties, display premium layouts, and capture high-intent buyer inquiries directly on WhatsApp."
      leadSource="Website for Real Estate Landing Page"
      overviewTitle="Personal Branding & Direct Lead Capture for Property Consultants"
      overviewContent={
        <div className="space-y-6">
          <p>
            In the property market, client trust and quick communication make all the difference. When buyers browse property listings, they expect professional, clear details pages, high-resolution floor plans, and simple inquiry options.
          </p>
          <p>
            At Joy Digital, we build high-converting portfolios designed specifically for **real estate agencies, independent brokers, and builders**. Each website features direct WhatsApp listing links, downloadable project brochures, and local neighborhood SEO setups.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Optimized to Drive Direct Inquiries</h3>
          <p>
            We don't build generic directories. Every listing is structured around your direct contact options. Visitors can select properties they are interested in, view galleries, check sizes/pricing, and submit immediate site visit request forms, routing details directly to your email or WhatsApp number.
          </p>
        </div>
      }
      benefitsTitle="Bespoke Real Estate Website Features"
      benefitsSubtitle="We build layouts focused on establishing credibility and making it simple for buyers to reach you."
      benefits={[
        {
          icon: "fa-solid fa-house-user",
          title: "Property Listing Showcase",
          description: "Display apartments, villas, plots, and commercial units in beautiful, search-friendly layout cards.",
        },
        {
          icon: "fa-solid fa-comments-dollar",
          title: "WhatsApp Leads Sync",
          description: "Allow clients to click and start a WhatsApp conversation with a pre-filled template about specific properties.",
        },
        {
          icon: "fa-solid fa-file-pdf",
          title: "Brochure Downloads",
          description: "Capture prospect contact details before providing high-resolution project brochure files or floor plans.",
        },
        {
          icon: "fa-solid fa-compass",
          title: "Local Amenities Guides",
          description: "Show distance metrics to key landmarks like schools, hospitals, and highways to build neighborhood trust.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Google Maps Citations",
          description: "We configure local business maps setups so buyers looking for regional properties find you first.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Blazing Speed Delivery",
          description: "Built on serverless Next.js frameworks so mobile pages load in under 1.2 seconds, preventing lead drop-off.",
        },
      ]}
      processTitle="How We Build Your Property Portal"
      processSubtitle="We systematically construct your personal profile and connect all direct inquiry routing."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-folder-open",
          title: "Gather Project Details",
          description: "We collect your property photos, floor plans, neighborhood guides, and contact information.",
        },
        {
          step: "2",
          icon: "fa-solid fa-file-code",
          title: "Design & Custom Code",
          description: "We code a fast, secure website tailored to your branding with optimized conversion actions.",
        },
        {
          step: "3",
          icon: "fa-solid fa-calendar-days",
          title: "Schedule Site Visits",
          description: "We configure forms to capture viewing preferences and redirect inquiries to your mobile WhatsApp.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "Deploy & Index",
          description: "We connect domains, configure security protocols, and submit XML sitemaps to Google.",
        },
      ]}
      pricingTitle="Affordable Pricing Packages"
      pricingSubtitle="Get a premium, lead-converting property website with no recurring developer costs."
      pricingTiers={[
        {
          name: "Standard Broker Portfolio",
          price: "₹15,000",
          period: "one-time",
          description: "Perfect for independent real estate agents aiming for a professional profile and properties page.",
          features: [
            "1-5 Custom Layout Pages",
            "About Agent & Biography Section",
            "Up to 10 Listed Properties",
            "WhatsApp & Call CTAs",
            "Secure Booking Request Form",
            "1 Year Hosting Setup Support",
          ],
          ctaText: "Select Standard Plan",
        },
        {
          name: "Premium Agency Funnel",
          price: "₹35,000",
          period: "one-time",
          description: "Recommended for property consulting groups, builders, and developers with multiple active projects.",
          isPopular: true,
          features: [
            "Up to 12 Advanced Pages",
            "Unlimited Listings with filters",
            "Project Brochure & Floor Plan downloads",
            "Google Maps Local Citation Setup",
            "Client Testimonials & Feedback Carousel",
            "1 Year Domain & Priority Support",
          ],
          ctaText: "Select Premium Plan",
        },
      ]}
      faqs={[
        {
          question: "Can clients request a site visit directly?",
          answer: "Yes! We integrate secure interactive forms where clients select stay dates and request a viewing. These requests are sent directly to your email and WhatsApp.",
        },
        {
          question: "Do you charge recurring listing fees?",
          answer: "No. Unlike listing portals, you own 100% of the website. There are zero monthly listing fees or recurring charges.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development-company-chennai", label: "website development in Chennai" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Us" },
      ]}
    />
  );
}
