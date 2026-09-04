import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";
import { getPostBySlug } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Real Estate Website Design & Property Lead SEO | Joy Digital",
  description: "High-converting website design & digital marketing for real estate developers, property brokers, luxury builders, and NRI property consultants. Features property portals, virtual 3D tour embeds, and real estate SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-real-estate",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-real-estate",
    title: "Real Estate Website Design & NRI Property Buyer Leads | Joy Digital",
    description: "Ultra-fast Next.js website design for real estate agencies, luxury home builders, and commercial brokers. Interactive floor plans, NRI buyer portals, site visit scheduling, and local/global property SEO.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Real Estate Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-real-estate#service",
      "name": "Real Estate Website Design & Property SEO",
      "serviceType": "Real Estate Web Development & Property Lead Generation",
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
      "description": "Custom web design for real estate developers, property agencies, luxury villa builders, and NRI investment advisories. Features property listing directories, site visit booking forms, RERA disclosures, and search optimization.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "20000",
        "highPrice": "55000",
        "offerCount": "2"
      }
    }
  ]
};

export default async function RealEstateWebPage() {
  const post1 = await getPostBySlug("real-estate-website-design-features");
  const post2 = await getPostBySlug("ai-agents-real-estate-property-hunting-trends");
  const post3 = await getPostBySlug("how-dubai-real-estate-brokers-capture-hnw-buyers-ai-seo");
  const relatedBlogPosts = [post1, post2, post3].filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <ServicePageTemplate
      serviceName="Website for Real Estate"
      heroTitle="High-Converting Website Design & Property SEO for Real Estate Developers & Brokers"
      heroSubtitle="Convert high-intent homebuyers, commercial tenants, and NRI property investors into direct site visit bookings. We engineer fast, visually arresting Next.js portals for real estate builders, luxury brokers, and property agencies."
      leadSource="Website for Real Estate Landing Page"
      heroCtaText="Get Free Real Estate Web Quote"
      overviewTitle="Why Most Real Estate Websites Fail to Capture High-Value Buyer Leads (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            Homebuyers and NRI property investors demand detailed information—floor plans, master layouts, location advantages, pricing breakdowns, RERA registration numbers, and 3D virtual walkthroughs—before requesting site inspections.
          </p>
          <p>
            Unfortunately, many real estate websites suffer from slow image rendering, unorganized property listings, broken mobile inquiry popups, and missing direct WhatsApp links or site visit scheduling widgets.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Real Estate Portals</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Site Visit & VIP Consultation Form</strong>: Direct booking widget with date selection</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>NRI Investment Portal</strong>: Specialized currency converters & video walkthroughs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Filterable Property Directory</strong>: BHK, location, budget & possession timeline</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Real Estate SEO Strategy</strong>: Rank for competitive local & global property keywords</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Ultra-fast serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Property Sales WhatsApp Routing</strong>: Instant buyer lead connection</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we merge real estate branding with <Link href="/website-development" className="text-primary font-bold hover:underline">high-speed Next.js web development</Link>, <Link href="/seo-services" className="text-primary font-bold hover:underline">property SEO strategies</Link>, and <Link href="/local-seo-services" className="text-primary font-bold hover:underline">Google Business Profile optimization</Link> to help builders sell out inventory faster.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Real Estate Websites"
      benefitsSubtitle="Engineered to showcase property developments, capture buyer inquiries, and drive site visits."
      benefits={[
        {
          icon: "fa-solid fa-building",
          title: "1. Filterable Property & Project Directory",
          description: "Organize properties by BHK type (1/2/3/4 BHK, Luxury Villas), locality, budget range, and construction status.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "2. Interactive Floor Plans & Master Layouts",
          description: "High-resolution downloadable floor plan PDFs, 2D/3D layout diagrams, and unit area breakdowns (Sq. Ft.).",
        },
        {
          icon: "fa-solid fa-plane-arrival",
          title: "3. NRI Investor & Expat Property Portal",
          description: "Target overseas buyers with USD/EUR currency calculators, virtual video walkthroughs, and RBI/FEMA legal guides.",
        },
        {
          icon: "fa-solid fa-calendar-check",
          title: "4. Schedule Site Visit & Cab Pickup Form",
          description: "Lead capture form allowing prospective buyers to choose site inspection dates and request free cab pickup.",
        },
        {
          icon: "fa-solid fa-calculator",
          title: "5. EMI & Property Home Loan Calculator",
          description: "Interactive financial tools allowing buyers to calculate monthly EMI installments and bank loan eligibility.",
        },
        {
          icon: "fa-solid fa-shield-check",
          title: "6. RERA Compliance & Legal Disclosure Wall",
          description: "Prominently display RERA approval numbers, bank pre-approvals (HDFC, SBI, ICICI), and title deed transparency.",
        },
        {
          icon: "fa-solid fa-vr-cardboard",
          title: "7. 360° Virtual Tour & Video Walkthrough",
          description: "Embed Matterport 3D virtual tours and YouTube drone aerial videos showcasing project surroundings.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "8. One-Tap Property Advisor WhatsApp Button",
          description: "Instant button connecting buyers directly to your sales desk pre-filled with: 'Hi, I want details and brochure for project.'",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "9. Property SEO & Location Keyword Strategy",
          description: "Target high-intent search terms like '3 BHK luxury apartments in Chennai', 'Villas in Ooty', and 'Commercial office space Madurai'.",
        },
        {
          icon: "fa-solid fa-download",
          title: "10. E-Brochure & Price List Download Hub",
          description: "Capture qualified buyer leads by offering instant PDF brochure downloads in exchange for contact details.",
        },
      ]}
      processTitle="Our 6-Step Real Estate Web Engineering Roadmap"
      processSubtitle="A proven roadmap from project audit to live buyer lead generation."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-city",
          title: "Project & Target Audit",
          description: "We audit your property listings, target buyer personas (local buyers vs NRIs), pricing, and sales manager workflow.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Taxonomy & Keyword Structure",
          description: "We structure project categories, floor plan layouts, brochure download triggers, and real estate SEO term maps.",
        },
        {
          step: "3",
          icon: "fa-solid fa-palette",
          title: "High-Impact UI/UX Design",
          description: "We design striking, luxury desktop and mobile interface mockups with full-screen image heroes.",
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
          title: "Real Estate Schema & Lead Sync",
          description: "We implement RealEstateAgent & SingleFamilyResidence schema markup, configure GA4 event tracking, and sync leads with CRM.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and verify local search indexing.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Real Estate"
      pricingSubtitle="Invest in a high-converting property portal with zero ongoing monthly software commissions."
      pricingTiers={[
        {
          name: "Broker & Agency Plan",
          price: "₹20,000",
          period: "one-time ($1,000 USD)",
          description: "Ideal for real estate brokers, property consultancy agencies, and individual property advisors.",
          features: [
            "1-6 Custom Responsive Pages",
            "Property Listing Directory (Up to 25 properties)",
            "Site Visit Request Lead Form",
            "WhatsApp & Phone Direct Links",
            "EMI Calculator Widget",
            "Google Maps Local Business Setup",
            "Basic Real Estate SEO & Schema",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Broker Plan",
        },
        {
          name: "Grand Builder & Developer Portal",
          price: "₹55,000",
          period: "one-time ($2,600 USD)",
          description: "Recommended for real estate builders, multi-project developers, and luxury property groups.",
          isPopular: true,
          features: [
            "Up to 20 Custom Project & Location Pages",
            "Interactive Floor Plan & Master Layout Viewer",
            "NRI Buyer Portal & Multi-Currency Setup",
            "E-Brochure Gated Download Lead System",
            "360° Virtual Tour & Drone Video Embeds",
            "Full Global Real Estate SEO Architecture",
            "Google Analytics 4 & CRM API Sync",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Builder Portal Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a real estate business cost?",
          answer: "Our real estate website packages start from ₹20,000 ($1,000 USD) for property brokers up to ₹55,000 ($2,600 USD) for grand builder and developer project portals.",
        },
        {
          question: "Can homebuyers schedule site visits or request cab pickups online?",
          answer: "Yes! We build custom site visit request forms where buyers select preferred inspection dates, time slots, and pickup locations sent directly to your sales desk.",
        },
        {
          question: "Will the website help us generate NRI property buyers from overseas?",
          answer: "Yes. We design dedicated NRI real estate sections featuring multi-currency pricing, virtual 3D walkthroughs, and international SEO targeting overseas buyers in US, Europe, and Middle East.",
        },
        {
          question: "Can we update property listings, floor plans, and price lists ourselves?",
          answer: "Yes. We provide an intuitive CMS dashboard so your sales or marketing team can upload new project photos, update flat availability, and change price quotes anytime.",
        },
        {
          question: "Are there any monthly portal listing or lead commission fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly listing fees or per-lead commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Real Estate SEO Services" },
        { href: "/local-seo-services", label: "Local Map SEO" },
        { href: "/google-business-profile-setup", label: "Google Business Setup" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Sales Desk" },
      ]}
      relatedBlogPosts={relatedBlogPosts}
    />
  );
}

