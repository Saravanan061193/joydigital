import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Tour Operator & Travel Agency Website Development | Joy Digital",
  description: "Joy Digital is a leading tourism website development company. We offer custom website development for tour operators, travel booking website development, and travel agency website redesign.",
  keywords: [
    "custom website development for tour operators",
    "travel agency website development",
    "tour operator website design",
    "custom travel website development",
    "tourism website development company",
    "website development for travel companies",
    "travel booking website development",
    "safari tour operator website development",
    "tour package website development",
    "travel agency website redesign",
    "Joy Digital",
    "Travel Web Engineering"
  ],
  alternates: {
    canonical: "https://joydigital.in/website-for-tours-and-travels",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Travel Agency & Tour Operator Website Development",
  "serviceType": "Travel Web Development Services",
  "provider": {
    "@type": "Organization",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133"
  },
  "description": "Joy Digital is a leading tourism website development company providing custom website development for tour operators, safari tour operator website development, and travel booking website development.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "65000",
    "offerCount": "3"
  }
};

export default function ToursTravelsWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Tours & Travels"
      heroTitle="Custom Website Development for Tour Operators & Travel Agencies"
      heroSubtitle="Partner with a premier tourism website development company. Build custom travel website development systems, tour package website development portals, and travel booking website setups."
      leadSource="Website for Tours and Travels Landing Page"
      heroCtaText="Get Travel Website Quote"
      canonicalUrl="https://joydigital.in/website-for-tours-and-travels"
      overviewTitle="Custom Travel Agency Website Development Services"
      overviewContent={
        <div className="space-y-6">
          <p>
            In the competitive travel and hospitality market, partnering with an experienced <strong>tourism website development company</strong> is crucial to capturing direct tourist bookings. As specialists in <strong>website development for travel companies</strong>, Joy Digital delivers full-stack <strong>travel agency website development</strong>, high-converting <strong>tour operator website design</strong>, and modern Next.js web applications.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Custom Website Development for Tour Operators & Safari Organizers</h3>
          <p>
            Whether you manage domestic package tours or international wildlife expeditions, our <strong>custom website development for tour operators</strong> and specialized <strong>safari tour operator website development</strong> allows you to showcase day-by-day itineraries, high-resolution destination galleries, inclusions, and downloadable travel guides.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Travel Booking Website Development & Tour Package Portals</h3>
          <p>
            Our <strong>custom travel website development</strong> and <strong>travel booking website development</strong> solutions feature direct WhatsApp click-to-chat links, interactive query forms, and automated itinerary downloads. We build specialized <strong>tour package website development</strong> engines designed to load in under 1.5s on mobile networks.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Looking for a Professional Travel Agency Website Redesign?</h3>
          <p>
            If your current travel website is slow, outdated, or failing to convert visitors, our <strong>travel agency website redesign</strong> service transforms slow templates into fast-loading, mobile-responsive Next.js portals that increase direct inquiries and reduce dependency on expensive third-party booking aggregators.
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
          question: "Why choose Joy Digital as your tourism website development company?",
          answer: "Joy Digital is a specialized tourism website development company. We engineer custom travel agency website development systems, safari tour operator website development platforms, and travel booking website setups built to load under 1.5s.",
        },
        {
          question: "Do you offer custom website development for tour operators and safari operators?",
          answer: "Yes! We specialize in custom website development for tour operators and safari tour operator website development. We design custom package displays, day-wise itineraries, inclusion lists, and direct WhatsApp inquiry buttons.",
        },
        {
          question: "Can you assist with a travel agency website redesign?",
          answer: "Absolutely. Our travel agency website redesign service upgrades slow, outdated websites into fast Next.js & React travel portals designed to rank on Google search and capture more package inquiries.",
        },
        {
          question: "Can guests request custom holiday plans?",
          answer: "Yes! We integrate secure interactive forms where travelers submit destination preferences, budgets, and dates, routing details directly to your staff.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/custom-website-development", label: "Custom Website Development" },
        { href: "/website-development", label: "Custom Web Development Services" },
        { href: "/web-design-services", label: "Custom Website Design" },
      ]}
    />
  );
}
