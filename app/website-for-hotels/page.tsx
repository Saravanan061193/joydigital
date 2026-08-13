import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Hotel Website Design & Direct Booking Systems | Joy Digital",
  description: "Custom website development for hotels, resorts, and homestays. Integrate direct room booking channels and galleries to bypass OTA commission fees.",
  alternates: {
    canonical: "https://joydigital.in/website-for-hotels",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Hotel & Resort Website Design",
  "serviceType": "Hospitality Web Development",
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
  "description": "Professional web design and development services for hotels, resorts, and vacation rentals. Drive direct room bookings and display amenities seamlessly.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "2"
  }
};

export default function HotelWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Hotels"
      heroTitle="Custom Website Design & Booking Engines for Hotels & Resorts"
      heroSubtitle="Stop paying 15-20% commission on room bookings. Drive direct reservations, showcase premium room galleries, and list amenities on an ultra-fast page."
      leadSource="Website for Hotels Landing Page"
      overviewTitle="Increase Direct Reservations & Cut OTA Commissions"
      overviewContent={
        <div className="space-y-6">
          <p>
            For hotels, resorts, and guest houses, relying completely on third-party OTAs (like Booking.com, MakeMyTrip, or Airbnb) can severely impact profitability. A custom branded website gives you a direct communication channel with guests and allows you to offer direct-booking benefits.
          </p>
          <p>
            At Joy Digital, we build premium, speed-optimized website layouts for **resorts, homestays, boutique hotels, and guest lodges**. Every template is structured around direct call-to-actions, room inventory showcases, and WhatsApp booking workflows.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Responsive Galleries & Booking Funnels</h3>
          <p>
            We optimize image loading so your high-resolution room and amenity galleries load in under 1.5 seconds on mobile devices. Guests can select stay dates, view available packages, and start reservation checkouts instantly.
          </p>
        </div>
      }
      benefitsTitle="Bespoke Hospitality Website Features"
      benefitsSubtitle="We build layouts focused on driving direct room bookings and presenting properties beautifully."
      benefits={[
        {
          icon: "fa-solid fa-bed",
          title: "Premium Room Galleries",
          description: "Display executive suites, family rooms, and deluxe amenities using responsive sliders and lightboxes.",
        },
        {
          icon: "fa-solid fa-calendar-check",
          title: "Direct Booking Forms",
          description: "Capture booking details (check-in, check-out dates, guest count) and route inquiries directly to your front desk.",
        },
        {
          icon: "fa-solid fa-percent",
          title: "Promo & Deal Popups",
          description: "Promote direct booking discounts, seasonal vacation offers, and weekend getaway packages easily.",
        },
        {
          icon: "fa-solid fa-utensils",
          title: "Restaurant & Menu Showcase",
          description: "Present dine-in menus, bar card layouts, and event venue pictures if your property offers dining.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Google Maps Route Guides",
          description: "Make it easy for tourists and travelers to navigate to your property address with interactive location details.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Under 1.2s Page Load",
          description: "Built on serverless static hosting so pages load instantly on tourist mobile networks during travel.",
        },
      ]}
      processTitle="How We Build Your Hotel Website"
      processSubtitle="A systematic approach to showcasing your property and launching direct booking pipelines."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-image",
          title: "Gather Property Photos",
          description: "We collect room layout images, lists of amenities, pricing rules, and location directions.",
        },
        {
          step: "2",
          icon: "fa-solid fa-file-code",
          title: "Design & Custom Code",
          description: "We code custom pages displaying rooms, activities, menus, and contact options beautifully.",
        },
        {
          step: "3",
          icon: "fa-solid fa-comments",
          title: "Setup WhatsApp Bookings",
          description: "We configure forms to redirect reservation inquiries directly to your booking desk WhatsApp.",
        },
        {
          step: "4",
          icon: "fa-solid fa-globe",
          title: "Launch & SEO Setup",
          description: "We connect domains, configure security protocols, and set up Google Local listing links.",
        },
      ]}
      pricingTitle="Affordable Pricing Packages"
      pricingSubtitle="Get a premium, direct-booking website with no monthly developer charges."
      pricingTiers={[
        {
          name: "Boutique / Homestay Page",
          price: "₹15,000",
          period: "one-time",
          description: "Perfect for bed & breakfasts, homestays, and individual vacation rentals.",
          features: [
            "1-5 Responsive Layout Pages",
            "Property Overview & Features List",
            "Room Gallery Slider",
            "Direct Call & WhatsApp CTA",
            "Secure Booking Request Form",
            "1 Year Hosting Setup Support",
          ],
          ctaText: "Select Homestay Plan",
        },
        {
          name: "Premium Resort / Hotel Portal",
          price: "₹35,000",
          period: "one-time",
          description: "Recommended for boutique hotels, eco-resorts, and multi-room properties.",
          isPopular: true,
          features: [
            "Up to 12 Advanced Pages",
            "Multiple Room Categories Details",
            "Direct Availability Booking Calendar",
            "Amenities & Dining Menus Sections",
            "Google Maps Local SEO Setup",
            "1 Year Domain & Priority Support",
          ],
          ctaText: "Select Hotel Plan",
        },
      ]}
      faqs={[
        {
          question: "Can guests pay online directly on our website?",
          answer: "Yes! For advanced packages, we can integrate payment gateways (such as Razorpay, Instamojo, or Stripe) to accept direct bookings with immediate online payments.",
        },
        {
          question: "Is the booking form mobile friendly?",
          answer: "Absolutely. Over 70% of travelers book stays using smartphones. All our layouts are fully responsive and optimized for mobile booking flows.",
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
