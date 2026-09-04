import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";
import { getPostBySlug } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Hotel Website Design & Direct Booking SEO Services | Joy Digital",
  description: "High-converting website design & direct booking engines for luxury hotels, boutique resorts, homestays, and hospitality chains. Eliminate OTA commissions, capture international tourists, and rank on Google.",
  alternates: {
    canonical: "https://joydigital.in/website-for-hotels",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-hotels",
    title: "Hotel Website Design & International Direct Booking Engine | Joy Digital",
    description: "Ultra-fast Next.js website design for luxury hotels, eco-resorts, and hospitality chains. Commission-free direct reservation engines, 360 virtual room tours, multi-currency booking, and global travel SEO.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Hotel Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-hotels#service",
      "name": "Hotel Website Design & Direct Booking SEO",
      "serviceType": "Hospitality Web Development & Hotel Digital Marketing",
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
      "description": "Custom web design for hotels, luxury resorts, boutique homestays, and serviced apartments. Includes commission-free direct booking engine integration, room amenity galleries, multi-currency support, and global travel SEO.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "20000",
        "highPrice": "50000",
        "offerCount": "2"
      }
    }
  ]
};

export default async function HotelWebPage() {
  const post1 = await getPostBySlug("how-independent-resorts-can-increase-direct-bookings");
  const post2 = await getPostBySlug("agentic-ai-booking-future-of-travel");
  const post3 = await getPostBySlug("travel-website-features-tour-operators-2026");
  const relatedBlogPosts = [post1, post2, post3].filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <ServicePageTemplate
      serviceName="Website for Hotels"
      heroTitle="High-Converting Website Design & Direct Booking SEO for Hotels & Resorts"
      heroSubtitle="Stop losing 18-25% to OTA commissions like Booking.com and Agoda. We engineer fast, commission-free Next.js websites for luxury hotels, eco-resorts, boutique homestays, and global hospitality chains."
      leadSource="Website for Hotels Landing Page"
      heroCtaText="Get Free Hotel Web Quote"
      overviewTitle="Why Most Hotel Websites Lose Direct Reservations to OTAs (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            International tourists and domestic leisure travelers actively search for direct hotel websites to find better room rates, exclusive package perks, early check-in options, and authentic photo galleries.
          </p>
          <p>
            However, most hotel websites suffer from slow room gallery rendering, broken reservation widgets, missing multi-currency prices, and complex checkout steps—forcing guests right back to OTA booking platforms.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Drives Commission-Free Direct Hotel Bookings</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Commission-Free Direct Booking Engine</strong>: Instant check-in/check-out reservation widget</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Multi-Currency Pricing</strong>: Automated USD, EUR, GBP, AED & INR display</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>360° Virtual Room & Resort Tour</strong>: High-resolution room suite showcases</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Global Travel SEO Strategy</strong>: Rank for high-value destination keywords</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Ultra-fast serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Front Desk WhatsApp Link</strong>: Instant direct guest inquiry connection</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we combine hospitality design elegance with <Link href="/website-development" className="text-primary font-bold hover:underline">custom web engineering</Link>, <Link href="/seo-services" className="text-primary font-bold hover:underline">hotel search optimization</Link>, and <Link href="/google-business-profile-setup" className="text-primary font-bold hover:underline">Google Hotel Ads integration</Link> to maximize direct profit margins.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Hotel & Resort Websites"
      benefitsSubtitle="Engineered to inspire wanderlust, highlight room amenities, and secure direct reservations."
      benefits={[
        {
          icon: "fa-solid fa-bed",
          title: "1. Interactive Room & Suite Gallery",
          description: "Detail room types (Deluxe, Executive Suite, Ocean View Villa), square footage, bed sizes, and room amenities.",
        },
        {
          icon: "fa-solid fa-calendar-days",
          title: "2. Direct Reservation & Booking Engine",
          description: "Seamless integration with booking engines (Staah, Cloudbeds, Simplotel, Sirvoy) for real-time room availability and payment.",
        },
        {
          icon: "fa-solid fa-coins",
          title: "3. Multi-Currency & Language Support",
          description: "Display prices in USD, EUR, GBP, AED, and INR alongside multi-language translations for global travelers.",
        },
        {
          icon: "fa-solid fa-utensils",
          title: "4. Restaurant, Spa & Event Venue Pages",
          description: "Dedicated sections showcasing fine dining menus, spa treatment menus, wedding lawns, and corporate conference halls.",
        },
        {
          icon: "fa-solid fa-tags",
          title: "5. Direct Booking Discount & Package Offers",
          description: "Highlight exclusive perks like '15% Off Direct Booking', free airport transfers, complimentary breakfast, and spa credits.",
        },
        {
          icon: "fa-solid fa-location-dot",
          title: "6. Nearby Attractions & Local Travel Guide",
          description: "Engage guests with curated lists of nearby tourist spots, beaches, heritage sites, and airport distance maps.",
        },
        {
          icon: "fa-solid fa-star",
          title: "7. Tripadvisor & Google Guest Review Sync",
          description: "Embed authentic guest ratings, Tripadvisor badges, and video reviews to build instant credibility.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "8. One-Tap Front Desk WhatsApp Button",
          description: "Instant button connecting travelers directly to your reception desk for room availability queries.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "9. Destination & Hotel SEO Strategy",
          description: "Target high-intent terms like 'Luxury resort in Ooty', 'Boutique hotel Madurai', and 'Beachfront resort EC R Chennai'.",
        },
        {
          icon: "fa-solid fa-bell-concierge",
          title: "10. Special Requests & Concierge Inquiry Form",
          description: "Allow guests to request honeymoon arrangements, airport pickups, early check-in, or dietary preferences.",
        },
      ]}
      processTitle="Our 6-Step Hotel Web Engineering Roadmap"
      processSubtitle="A proven roadmap from property audit to live direct reservations."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-hotel",
          title: "Property & Channel Audit",
          description: "We audit your room inventory, current OTA dependencies, direct booking software, and target traveler demographics.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Taxonomy & SEO Architecture",
          description: "We structure room categories, dining hubs, package offer pages, and destination SEO term maps.",
        },
        {
          step: "3",
          icon: "fa-solid fa-palette",
          title: "Inspiring UI/UX Design",
          description: "We design elegant, high-impact desktop and mobile interface mockups with full-screen photo heroes.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Build",
          description: "We build your platform on serverless Next.js frameworks for sub-1.5s page load speeds across global networks.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "Hotel Schema & Booking Engine Sync",
          description: "We implement Hotel & LodgingBusiness schema markup, connect your booking engine API, and configure GA4 event tracking.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and verify Google Hotel search indexing.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Hotels & Resorts"
      pricingSubtitle="Invest in a high-converting direct booking portal with zero ongoing monthly commission charges."
      pricingTiers={[
        {
          name: "Boutique Stay Plan",
          price: "₹20,000",
          period: "one-time ($1,000 USD)",
          description: "Ideal for boutique homestays, bed & breakfast properties, and independent lodge retreats.",
          features: [
            "1-5 Custom Responsive Pages",
            "Room Gallery & Amenity Showcase",
            "Direct Reservation Inquiry Form",
            "WhatsApp & Phone Direct Links",
            "Google Maps Local Business Setup",
            "Tripadvisor Review Widget Setup",
            "Basic Hotel SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Boutique Stay Plan",
        },
        {
          name: "Grand Resort & Hotel Portal",
          price: "₹50,000",
          period: "one-time ($2,400 USD)",
          description: "Recommended for luxury resorts, business hotels, and multi-property hospitality groups.",
          isPopular: true,
          features: [
            "Up to 15 Custom Room & Facility Pages",
            "Commission-Free Booking Engine API Sync",
            "Multi-Currency (USD/EUR/INR) Display",
            "Dining, Spa & Event Venue Portals",
            "Package Offer & Festival Discount Hub",
            "Full Global Destination SEO Architecture",
            "Google Analytics 4 & Search Console Sync",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Grand Resort Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a hotel cost?",
          answer: "Our hotel website packages start from ₹20,000 ($1,000 USD) for boutique homestays up to ₹50,000 ($2,400 USD) for grand resort portals with direct booking engine integration.",
        },
        {
          question: "Can we integrate our existing booking engine (Staah, Cloudbeds, Simplotel)?",
          answer: "Yes! We seamlessly integrate all major channel manager booking engines so real-time room rates and availability sync automatically without double bookings.",
        },
        {
          question: "Will the website help us rank on Google for tourist destination searches?",
          answer: "Yes. Every hotel website includes Hotel & LodgingBusiness schema markup, fast sub-1.5s page load speed, structured room landing pages, and localized destination keywords.",
        },
        {
          question: "Can we update room prices, photo galleries, and special package offers ourselves?",
          answer: "Yes. We provide an intuitive CMS dashboard so your front desk or marketing manager can update room photos, post seasonal package deals, and edit menu cards anytime.",
        },
        {
          question: "Are there any monthly listing or booking commission fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly portal subscription fees or per-reservation commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Hotel SEO Services" },
        { href: "/website-for-tours-and-travels", label: "Tours & Travels Web Dev" },
        { href: "/local-seo-services", label: "Local Map SEO" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Front Desk" },
      ]}
      relatedBlogPosts={relatedBlogPosts}
    />
  );
}

