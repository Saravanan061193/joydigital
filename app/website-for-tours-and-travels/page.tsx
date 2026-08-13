import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Tour Booking & Travel Agent Website Design | Joy Digital",
  description: "Get a custom travel agency website. Showcase tour packages, itineraries, and capture package bookings with instant WhatsApp leads integration.",
  alternates: {
    canonical: "https://joydigital.in/website-for-tours-and-travels",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Tours & Travels Website Design",
  "serviceType": "Travel Web Development",
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
  "description": "Professional web design and development services for tour operators, travel agents, and trip planners. Showcase package itineraries and drive bookings.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "2"
  }
};

export default function ToursTravelsWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Tours & Travels"
      heroTitle="Custom Travel Agency & Tour Operator Website Design"
      heroSubtitle="Stop relying strictly on third-party aggregators. Showcase your tour itineraries, structure clear package details, and capture trip inquiries directly on WhatsApp."
      leadSource="Website for Tours and Travels Landing Page"
      overviewTitle="Itinerary Showcases & Direct Trip Bookings Online"
      overviewContent={
        <div className="space-y-6">
          <p>
            In the travel industry, booking speed and trust are everything. When travelers search for holiday packages, they expect professional, clear day-by-day itineraries, high-resolution location photos, and direct booking options.
          </p>
          <p>
            At Joy Digital, we build premium, speed-optimized website layouts for **travel agents, tour operators, trekking clubs, and transport providers**. Each website features direct WhatsApp booking links, downloadable travel guides, and local neighborhood SEO setups.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Responsive Packages & Dynamic Trip Planners</h3>
          <p>
            We optimize photo sizes so your destination and activities galleries load in under 1.5 seconds on mobile devices. Travelers can select holiday categories, view available dates, and request custom quotes instantly.
          </p>
        </div>
      }
      benefitsTitle="Bespoke Travel Website Features"
      benefitsSubtitle="We build layouts focused on establishing agency authority and making tourist contact simple."
      benefits={[
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Itinerary Showcases",
          description: "Display day-by-day schedules, hotel stays, inclusions, and exclusions in clean layout tabs.",
        },
        {
          icon: "fa-solid fa-comments-dollar",
          title: "WhatsApp Leads Sync",
          description: "Allow clients to click and start a WhatsApp conversation with a pre-filled template about specific packages.",
        },
        {
          icon: "fa-solid fa-cloud-arrow-down",
          title: "Brochure Downloads",
          description: "Capture prospect contact details before providing travel guides, pricing lists, or hotel sheets.",
        },
        {
          icon: "fa-solid fa-star",
          title: "Review Feeds Integration",
          description: "Highlight TripAdvisor, Google, or Facebook reviews to build instant credibility with new clients.",
        },
        {
          icon: "fa-solid fa-suitcase-rolling",
          title: "Custom Trip Planners",
          description: "Integrated contact forms asking destinations, stay durations, and budget details for custom tour planning.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Under 1.2s Page Load",
          description: "Built on serverless static hosting so pages load instantly on tourist mobile networks during travel.",
        },
      ]}
      processTitle="How We Build Your Travel Portal"
      processSubtitle="We systematically construct your agency profile and connect all direct inquiry routing."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-compass",
          title: "Gather Package Details",
          description: "We collect your tour photos, itinerary lists, pricing structures, and contact information.",
        },
        {
          step: "2",
          icon: "fa-solid fa-file-code",
          title: "Design & Custom Code",
          description: "We code a fast, secure website tailored to your branding with optimized conversion actions.",
        },
        {
          step: "3",
          icon: "fa-solid fa-message",
          title: "Setup WhatsApp Bookings",
          description: "We configure forms to redirect package inquiries directly to your mobile chat WhatsApp.",
        },
        {
          step: "4",
          icon: "fa-solid fa-globe",
          title: "Launch & SEO Setup",
          description: "We connect domains, configure security protocols, and submit XML sitemaps to Google.",
        },
      ]}
      pricingTitle="Affordable Pricing Packages"
      pricingSubtitle="Get a premium, direct-booking travel website with no monthly developer charges."
      pricingTiers={[
        {
          name: "Standard Agency Profile",
          price: "₹15,000",
          period: "one-time",
          description: "Perfect for local travel agents aiming for a professional profile and featured packages grid.",
          features: [
            "1-5 Responsive Layout Pages",
            "Agency Overview & Contact details",
            "Up to 10 Holiday Packages list",
            "WhatsApp & Call CTAs",
            "Secure Booking Request Form",
            "1 Year Hosting Setup Support",
          ],
          ctaText: "Select Standard Plan",
        },
        {
          name: "Premium Tour Operator Portal",
          price: "₹35,000",
          period: "one-time",
          description: "Recommended for tour operators, trekking clubs, and agencies managing multiple recurring routes.",
          isPopular: true,
          features: [
            "Up to 12 Advanced Pages",
            "Unlimited Tour Listings with itinerary tabs",
            "Dynamic Booking / Inquiry Forms",
            "Google Maps Local SEO Setup",
            "Client Testimonials Carousel",
            "1 Year Domain & Priority Support",
          ],
          ctaText: "Select Premium Plan",
        },
      ]}
      faqs={[
        {
          question: "Can guests request custom holiday plans?",
          answer: "Yes! We integrate secure interactive forms where travelers submit destination preferences, budgets, and dates, routing details directly to your staff.",
        },
        {
          question: "Do I need to pay monthly charges?",
          answer: "No. We build on serverless architectures, so there are zero recurring hosting fees. You only pay for your annual domain name renewal.",
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
