import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consulting Firm Website Design & Advisory SEO | Joy Digital",
  description: "High-converting website design & digital marketing for management consulting companies, IT advisory firms, strategy agencies, and corporate consultants. Features case study portals, audit request forms, and SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-consulting-companies",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-consulting-companies",
    title: "Consulting Firm Website Design & Client Lead Generation | Joy Digital",
    description: "Ultra-fast Next.js websites built for strategy consultants, business advisory firms, and corporate trainers. Includes case study showcases, ROI audit booking, and search engine optimization.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Consulting Firm Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-consulting-companies#service",
      "name": "Consulting Firm Website Design & Advisory SEO",
      "serviceType": "Consulting Web Development & Business Advisory Marketing",
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
      "description": "Custom web design for management consulting firms, strategy advisories, IT consultants, and corporate growth agencies. Includes strategy call booking, downloadable whitepapers, case study portals, and search optimization.",
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

export default function ConsultingWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Consulting Companies"
      heroTitle="High-Converting Website Design & SEO for Consulting & Advisory Firms"
      heroSubtitle="Position your advisory firm as an indispensable strategic partner. We engineer fast, authoritative Next.js websites for management consultants, IT strategy firms, corporate growth advisors, and specialized business consultants."
      leadSource="Website for Consulting Companies Landing Page"
      heroCtaText="Get Free Consulting Web Quote"
      overviewTitle="Why Most Consulting Firm Websites Fail to Win Corporate Contracts (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            C-level executives, founders, and enterprise decision-makers evaluate consulting partners based on proof of impact—demanding clear case studies, quantifiable ROI metrics, methodologies, and executive team expertise.
          </p>
          <p>
            Yet most consulting websites rely on vague buzzwords, lack structured case study presentations, load slowly, and fail to provide direct audit booking or whitepaper lead capture features.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Impact Consulting Websites</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Interactive Strategy Audit Booking</strong>: Direct consultation scheduling</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Client Case Study & ROI Portals</strong>: Problem-solution-results frameworks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Thought Leadership & Research Hub</strong>: Downloadable whitepapers & reports</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Executive Team & Partner Bios</strong>: Credentials, past advisory wins & publications</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Ultra-fast serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Global B2B SEO Strategy</strong>: Rank for high-value corporate consulting queries</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we merge corporate design elegance with <Link href="/website-development" className="text-primary font-bold hover:underline">modern Next.js engineering</Link> and <Link href="/seo-services" className="text-primary font-bold hover:underline">B2B search optimization</Link> to help consulting agencies win enterprise accounts.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Consulting Websites"
      benefitsSubtitle="Engineered to project intellectual authority, showcase methodology, and generate high-value retainers."
      benefits={[
        {
          icon: "fa-solid fa-chart-line",
          title: "1. Strategy Call & Audit Booking Form",
          description: "Streamlined inquiry form asking for company size, current business challenge, and preferred consultation timeframe.",
        },
        {
          icon: "fa-solid fa-lightbulb",
          title: "2. Methodology & Framework Visualizer",
          description: "Clear step-by-step visual breakdowns explaining your proprietary consulting process, audit stages, and delivery milestones.",
        },
        {
          icon: "fa-solid fa-trophy",
          title: "3. Case Study & Client Proof Showcase",
          description: "Structure past client engagements with metrics (e.g., '35% Operational Cost Reduction', '2.5x Revenue Expansion').",
        },
        {
          icon: "fa-solid fa-file-pdf",
          title: "4. Gated Whitepaper & Report Download",
          description: "Capture C-suite email leads by offering downloadable industry benchmarks, research papers, and strategy guides.",
        },
        {
          icon: "fa-solid fa-user-gear",
          title: "5. Senior Consultant & Advisor Bios",
          description: "Highlight executive qualifications, past corporate leadership roles, industry vertical expertise, and board positions.",
        },
        {
          icon: "fa-solid fa-handshake",
          title: "6. Service Practice Area Pages",
          description: "Dedicated landing pages covering management consulting, digital transformation, M&A advisory, operations, and HR strategy.",
        },
        {
          icon: "fa-solid fa-calculator",
          title: "7. Business Impact & ROI Calculator Widget",
          description: "Interactive tools allowing clients to estimate potential cost savings or efficiency gains by working with your firm.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "8. One-Tap Senior Partner WhatsApp Link",
          description: "Instant button connecting prospective clients directly to your senior partner's WhatsApp desk.",
        },
        {
          icon: "fa-solid fa-magnifying-glass",
          title: "9. Global Corporate SEO Strategy",
          description: "Target high-intent search terms like 'Management consulting company in India', 'Digital transformation agency', and 'IT advisory firm'.",
        },
        {
          icon: "fa-solid fa-globe",
          title: "10. Multi-Region & Foreign Office Layouts",
          description: "Seamlessly display global offices, international client rosters, and multi-currency advisory retainer structures.",
        },
      ]}
      processTitle="Our 6-Step Consulting Web Engineering Process"
      processSubtitle="A proven roadmap from strategy positioning to live lead acquisition."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-chess",
          title: "Positioning & Target Audit",
          description: "We analyze your firm's core consulting verticals, ideal client persona, service pricing, and market differentiators.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Taxonomy & Funnel Mapping",
          description: "We structure practice area hubs, case study frameworks, lead magnet whitepapers, and keyword architectures.",
        },
        {
          step: "3",
          icon: "fa-solid fa-paintbrush",
          title: "Premium UI/UX Design",
          description: "We craft sophisticated, corporate desktop and mobile interface mockups that reflect prestige and clarity.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Portal Build",
          description: "We build your platform on modern serverless Next.js frameworks for sub-1.5s page load speed worldwide.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "SEO & Lead Tracking Setup",
          description: "We implement Consulting Service schema markup, GA4 conversion tracking, and sync lead forms with your CRM.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your domain, submit XML sitemaps to Google Search Console, and verify search engine indexing.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Consulting Companies"
      pricingSubtitle="Get a prestigious, high-converting advisory website with no ongoing software commissions."
      pricingTiers={[
        {
          name: "Consultant Growth Plan",
          price: "₹20,000",
          period: "one-time ($1,000 USD)",
          description: "Ideal for boutique advisory practices, independent consultants, and specialized strategy firms.",
          features: [
            "1-6 Custom Responsive Pages",
            "Strategy Audit Request Form",
            "Practice Area Showcase",
            "Client Case Study Portfolio",
            "WhatsApp & Phone Direct Links",
            "Senior Partner Bio Section",
            "Basic B2B SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Consultant Growth Plan",
        },
        {
          name: "Enterprise Advisory Portal",
          price: "₹50,000",
          period: "one-time ($2,500 USD)",
          description: "Recommended for full-service consulting firms, IT advisories, and multi-practice corporate agencies.",
          isPopular: true,
          features: [
            "Up to 20 Custom Practice & Case Study Pages",
            "Interactive Strategy Call Booking Calendar",
            "Gated Whitepaper & Report Download Hub",
            "Client Logos & Quantifiable ROI Metrics",
            "Multi-Office Location Landing Pages",
            "Full Corporate SEO & Search Architecture",
            "Google Analytics 4 & CRM API Sync",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Enterprise Advisory Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a consulting company cost?",
          answer: "Our consulting website packages start from ₹20,000 ($1,000 USD) for boutique practices up to ₹50,000 ($2,500 USD) for enterprise multi-practice advisory portals.",
        },
        {
          question: "Can prospective corporate clients book strategy consultations directly on the site?",
          answer: "Yes! We integrate online calendar scheduling widgets (Calendly, Google Calendar, HubSpot) so decision-makers can pick a convenient consultation slot immediately.",
        },
        {
          question: "Will the website help us generate whitepaper lead downloads?",
          answer: "Yes. We design high-converting lead magnet landing sections and modal popups where visitors enter their business email to access downloadable PDF reports and whitepapers.",
        },
        {
          question: "Can we update case studies and published insights ourselves?",
          answer: "Yes. We provide an easy-to-use CMS dashboard so your team can publish new client case studies, research articles, and executive announcements anytime.",
        },
        {
          question: "Are there any recurring monthly listing or subscription fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly portal fees or platform lead commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Corporate B2B SEO" },
        { href: "/website-for-law-firms", label: "Website for Law Firms" },
        { href: "/offshore-web-development-partner", label: "Global Web Partner" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Advisory Team" },
      ]}
    />
  );
}
