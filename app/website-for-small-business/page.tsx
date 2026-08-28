import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Small Business Website Design & Local Lead Gen | Joy Digital",
  description: "Custom website development for local service providers, small businesses, and startups. Economical flat-rate pricing starting at ₹15,000.",
  alternates: {
    canonical: "https://joydigital.in/website-for-small-business",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Small Business Website Design",
  "serviceType": "Local Lead Generation Web Development",
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
  "description": "Professional web design and development services for local contractors, retailers, and service providers. Build digital authority.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "2"
  }
};

export default function SmallBusinessWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Small Business"
      heroTitle="Flat-Rate Custom Web Design for Small Businesses"
      heroSubtitle="Flat-rate custom websites starting from ₹15,000. Build digital credibility, display your services, and attract qualified leads without monthly developer charges."
      leadSource="Website for Small Business Landing Page"
      heroCtaText="Get Custom Business Quote"
      overviewTitle="Build Digital Authority & Dominate Local Search Rankings"
      overviewContent={
        <div className="space-y-6">
          <p>
            For local contractors, consultants, and retail stores, having a generic Facebook page or a free site builder directory listing is no longer enough. Parents, homeowners, and local clients search Google to verify your business authority and read reviews before booking services.
          </p>
          <p>
            At Joy Digital, we construct premium, speed-optimized website layouts for **small businesses, local contractors, consultants, and family-owned retail brands**. We focus on flat-rate, budget-friendly packages with zero hidden monthly developer fees.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">WhatsApp Leads & Local Map Conversions</h3>
          <p>
            We optimize your page experience so your location maps, list of services, and gallery load in under 1.5 seconds. We position floating WhatsApp buttons and inquiry forms strategically to let visitors connect directly with your team.
          </p>
        </div>
      }
      benefitsTitle="Bespoke Small Business Features"
      benefitsSubtitle="We build economical, high-converting platforms that highlight your services and capture local leads."
      benefits={[
        {
          icon: "fa-solid fa-tags",
          title: "Flat-Rate Pricing (No Lock-ins)",
          description: "Pay once for your design and code setup. You own the website files, with no recurring monthly designer charges.",
        },
        {
          icon: "fa-solid fa-server",
          title: "1-Year Free Hosting Setup",
          description: "We set up, configure, and connect your business domain to fast, secure server configurations free for 1 year.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "WhatsApp Lead Integration",
          description: "Make it easy for local clients to ask about pricing, services, or bookings directly via WhatsApp chat.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Google Map SEO Optimization",
          description: "We configure schema markups and link local map profiles to help you rank in Google local searches.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Loads Under 1.5 Seconds",
          description: "Fast loading prevents prospects from bouncing on mobile data networks and satisfies Core Web Vitals.",
        },
        {
          icon: "fa-solid fa-envelope-open-text",
          title: "Standard Contact Forms",
          description: "Capture prospect names, phone numbers, and service details, routing details straight to your inbox.",
        },
      ]}
      processTitle="How We Build Your Business Site"
      processSubtitle="A simple, hassle-free process to launch your business profile page."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-comment-dots",
          title: "Consultation & Scope",
          description: "We discuss your target audience, service list, logo files, and preferred reference designs.",
        },
        {
          step: "2",
          icon: "fa-solid fa-pencil",
          title: "Branded Layout Design",
          description: "We structure clean visual page grids in Figma using your custom color palettes for approval.",
        },
        {
          step: "3",
          icon: "fa-solid fa-laptop-code",
          title: "Clean Next.js Coding",
          description: "Our developers build your pages using semantic markup and compressed images for maximum speed.",
        },
        {
          step: "4",
          icon: "fa-solid fa-circle-check",
          title: "Hosting & Launch Setup",
          description: "We connect your custom domain name, install SSL certificates, and configure contact forms.",
        },
      ]}
      pricingTitle="Economic Development Packages"
      pricingSubtitle="Get a modern, mobile-friendly website to scale local inquiries."
      pricingTiers={[
        {
          name: "Small Business Starter",
          price: "₹15,000",
          period: "one-time",
          description: "Perfect for local service providers, consultants, and family shops.",
          features: [
            "1-5 Responsive Layout Pages",
            "Services & Contact Details Sections",
            "Floating WhatsApp Support Button",
            "Lead Contact Form Integration",
            "Google Maps Card Embed",
            "1 Year Hosting Setup Support",
          ],
          ctaText: "Get Started",
        },
        {
          name: "Business Growth Package",
          price: "₹35,000",
          period: "one-time",
          description: "Recommended for retail brands, local contractors, and active service companies.",
          isPopular: true,
          features: [
            "Up to 10 Structured Pages",
            "Advanced On-Page Local SEO Setup",
            "Interactive Notice or Blog Grid",
            "Google Business Profile Linkage",
            "XML Sitemap + GSC Integration",
            "1 Year Domain + Priority support",
          ],
          ctaText: "Choose Growth Plan",
        },
      ]}
      faqs={[
        {
          question: "Do we have to pay monthly fees to keep the website live?",
          answer: "No. You pay a one-time fee for the development. Operational costs (like domain and hosting fees) are paid directly to host providers, costing approx. ₹2,000 to ₹4,000 per year.",
        },
        {
          question: "Can you help us edit text or photos after launch?",
          answer: "Yes! We provide 30 days of free support for minor edits. For ongoing updates, we offer flexible yearly support packages or include simple admin CMS options.",
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
