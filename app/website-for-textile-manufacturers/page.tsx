import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";
import { getPostBySlug } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Global Textile Manufacturer Website Design & B2B SEO | Joy Digital",
  description: "High-converting B2B website design and digital export portals for global textile manufacturers, yarn mills, fabric exporters, and garment OEMs. Features digital swatch catalogs, RFQ forms, and international SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-textile-manufacturers",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-textile-manufacturers",
    title: "Global Textile Manufacturer Website Design & Export Lead Generation | Joy Digital",
    description: "Ultra-fast Next.js websites tailored for global textile mills, apparel exporters, and fabric manufacturers. Digital swatch catalogs, B2B RFQ forms, GOTS/OEKO-TEX compliance badges, and worldwide search ranking.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Global Textile Manufacturer Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-textile-manufacturers#service",
      "name": "Global Textile Manufacturer Website Design & B2B SEO",
      "serviceType": "Textile B2B Web Development & Export Marketing",
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
      "description": "Custom B2B website development for global textile manufacturers, yarn mills, fabric exporters, and apparel OEM factories. Features online RFQ submission, digital swatch catalogs, compliance badge walls, and multi-country SEO.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "25000",
        "highPrice": "75000",
        "offerCount": "3"
      }
    }
  ]
};

export default async function TextileWebPage() {
  const post1 = await getPostBySlug("textile-manufacturing-website-features-2026");
  const post2 = await getPostBySlug("custom-website-development-requirements-guide");
  const post3 = await getPostBySlug("why-ai-built-websites-fail-b2b-web-architecture");
  const relatedBlogPosts = [post1, post2, post3].filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <ServicePageTemplate
      serviceName="Website for Textile Manufacturers"
      heroTitle="High-Converting B2B Website Design & Global SEO for Textile Manufacturers"
      heroSubtitle="Turn international apparel brands, wholesale buyers, and sourcing managers into high-value B2B RFQ leads. We build ultra-fast Next.js export portals for spinning mills, fabric weavers, garment OEMs, and home textile exporters worldwide."
      leadSource="Website for Textile Manufacturers Landing Page"
      heroCtaText="Get Free B2B Web Quote"
      overviewTitle="Why Most B2B Textile Manufacturer Websites Fail to Convert International Buyers (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            Global garment brands, fashion houses, and institutional buyers in the US, Europe, Middle East, and Asia are constantly searching for dependable, compliant, and high-capacity textile manufacturing partners. However, the majority of textile factory websites rely on outdated designs, static PDF catalogs, slow loading speeds, or non-functional inquiry forms.
          </p>
          <p>
            When international sourcing managers land on a site that lacks detailed fabric specifications (GSM, weave, blend %, MOQs), clear compliance certifications (GOTS, OEKO-TEX, ISO), or responsive mobile RFQ buttons, they immediately abandon the page for competing exporters.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting B2B Textile Export Portals</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Digital Fabric & Swatch Catalog</strong>: Interactive GSM, construction & blend filters</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Instant B2B RFQ Builder</strong>: Quick custom quote & sample swatch request form</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>International Certification Wall</strong>: Prominent OEKO-TEX, GOTS, ISO, SEDEX badges</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Global B2B SEO Strategy</strong>: Target buyer searches in US, UK, UAE & Australia</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s International Speed</strong>: Edge-served serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Export Sales WhatsApp Routing</strong>: Instant connection with regional trade reps</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we combine robust <Link href="/website-development" className="text-primary font-bold hover:underline">custom web development</Link> with specialized <Link href="/seo-services" className="text-primary font-bold hover:underline">international B2B SEO</Link> and <Link href="/offshore-web-development-partner" className="text-primary font-bold hover:underline">global web partner solutions</Link> to help textile exporters establish market authority and close volume buyer contracts.
          </p>
        </div>
      }
      benefitsTitle="10 Essential B2B Features We Build for Textile Manufacturers"
      benefitsSubtitle="Engineered to build technical authority, showcase manufacturing capacity, and drive qualified international RFQs."
      benefits={[
        {
          icon: "fa-solid fa-layer-group",
          title: "1. Digital Fabric & Yarn Swatch Catalog",
          description: "Organize products by fabric type (woven, knit, denim, technical textiles), fiber blend %, GSM range, weave pattern, and available finishes.",
        },
        {
          icon: "fa-solid fa-file-signature",
          title: "2. Instant B2B RFQ & Sample Request Form",
          description: "Structured quote form enabling sourcing agents to specify order volume (meters/pieces), desired GSM, delivery port, and physical sample request.",
        },
        {
          icon: "fa-solid fa-certificate",
          title: "3. Compliance & Certification Badge Showcase",
          description: "Highlight global accreditations including OEKO-TEX Standard 100, GOTS Organic, GRS (Global Recycled Standard), ISO 9001, SEDEX, and WRAP.",
        },
        {
          icon: "fa-solid fa-industry",
          title: "4. Machinery & Production Capacity Overview",
          description: "Build buyer confidence by demonstrating monthly output capacity (e.g. 500 metric tons yarn / 2 million meters fabric), spindle counts, and loom technology.",
        },
        {
          icon: "fa-solid fa-shirt",
          title: "5. Private Label & OEM/ODM Service Portal",
          description: "Dedicated landing sections detailing custom dyeing, printing (rotary/digital), pattern cutting, sample turnaround times, and custom packaging.",
        },
        {
          icon: "fa-solid fa-earth-americas",
          title: "6. Global Export & Logistics Calculator",
          description: "Display supported Incoterms (FOB, CIF, DDP, EXW), major seaport connections, container loading capacity, and estimated transit times.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-plus",
          title: "7. High-Resolution Texture & Drape Viewer",
          description: "Allow buyers to inspect fabric weave density, surface texture, sheen, and stretch behavior with crystal-clear zoom galleries and video loops.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "8. One-Tap Export Manager WhatsApp Routing",
          description: "Instant messaging button opening WhatsApp pre-filled with: 'Hi, I would like to request an RFQ for custom fabric supply from your export division.'",
        },
        {
          icon: "fa-solid fa-globe",
          title: "9. International B2B Keyword SEO Setup",
          description: "Rank for high-intent B2B search terms like 'Cotton yarn manufacturer exporter', 'Organic knits fabric supplier', and 'Apparel OEM factory India'.",
        },
        {
          icon: "fa-solid fa-shield-cat",
          title: "10. Sustainable & Eco-Textile Highlighting",
          description: "Showcase recycled polyester, organic cotton, zero liquid discharge (ZLD) effluent treatment plants, and carbon footprint reduction efforts.",
        },
      ]}
      processTitle="Our 6-Step Textile Website Engineering Roadmap"
      processSubtitle="A systematic process designed to take your factory from legacy offline marketing to a global digital export engine."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-chart-pie",
          title: "Export Audit & Buyer Mapping",
          description: "We analyze your target export markets (US, EU, Middle East), fabric categories, MOQ parameters, and buyer decision criteria.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Taxonomy & Keyword Structure",
          description: "We build intuitive product categorizations, fabric specification filters, and high-value international B2B keyword maps.",
        },
        {
          step: "3",
          icon: "fa-solid fa-palette",
          title: "B2B UI/UX & Swatch Design",
          description: "We design sleek, professional layouts optimized for desktop buyers and mobile sourcing officers on trade show floors.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Portal Build",
          description: "We build your platform on serverless Next.js for sub-1.5s loading speeds across global networks without server downtime.",
        },
        {
          step: "5",
          icon: "fa-solid fa-diagram-project",
          title: "SEO & RFQ Workflow Integration",
          description: "We integrate Textile Manufacturer Schema markup, sync CRM / email leads, and configure Google Analytics 4 B2B tracking.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Global Launch & Indexing",
          description: "We deploy on your custom domain, submit XML sitemaps to Google Search Console, and verify international indexing.",
        },
      ]}
      pricingTitle="Transparent B2B Packages for Textile Manufacturers"
      pricingSubtitle="Invest in a high-converting digital export engine tailored to your production volume with zero ongoing monthly platform fees."
      pricingTiers={[
        {
          name: "Global Exporter Plan",
          price: "₹25,000",
          period: "one-time ($1,200 USD)",
          description: "Ideal for specialized yarn mills, woven fabric exporters, or single-facility garment manufacturers.",
          features: [
            "Up to 8 Custom Responsive Pages",
            "Digital Fabric Swatch Catalog (Up to 30 items)",
            "Structured B2B RFQ Lead Capture Form",
            "WhatsApp Export Manager Integration",
            "Global Compliance Certification Showcase",
            "Factory Machinery & Capacity Gallery",
            "On-Page B2B SEO & Service Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Global Exporter Plan",
        },
        {
          name: "Enterprise Textile Mill Portal",
          price: "₹45,000",
          period: "one-time ($2,200 USD)",
          description: "Recommended for composite mills, multi-category fabric weavers, and full-package apparel OEM factories.",
          isPopular: true,
          features: [
            "Up to 20 Custom Pages & Product Categories",
            "Interactive Fabric Spec Filter (GSM, Weave, Blend)",
            "Physical Swatch Request & Sample Booking Workflow",
            "Multi-Currency & Incoterms Shipping Guide",
            "Private Label & OEM Capacity Portal",
            "Full International SEO & Multi-Country Targeting",
            "Google Analytics 4 Lead Event Tracking",
            "Easy Product CMS & 1 Year Support",
          ],
          ctaText: "Choose Enterprise Plan",
        },
        {
          name: "Custom OEM Ecosystem",
          price: "₹75,000",
          period: "one-time ($3,500 USD)",
          description: "Designed for large textile conglomerates, multi-factory apparel groups, and global supply chain networks.",
          features: [
            "Unlimited Custom Pages & Multi-Factory Portals",
            "Interactive 3D / High-Res Fabric Zoom Viewer",
            "Custom Buyer Portal & Document Download (TDS/MSDS)",
            "Automated Multi-Language Content Setup",
            "Custom CRM / ERP Integration Ready",
            "Dedicated B2B Content Marketing & Link Building Setup",
            "Sub-1.0s Global CDN Edge Hosting Configuration",
            "Priority SLA Technical Support & Maintenance",
          ],
          ctaText: "Choose Custom Ecosystem",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a textile manufacturing company cost?",
          answer: "Our B2B textile manufacturer website packages start from ₹25,000 ($1,200 USD) for specialized exporter sites up to ₹75,000 ($3,500 USD) for enterprise multi-factory textile portals.",
        },
        {
          question: "Can international buyers request physical fabric swatches or samples through the website?",
          answer: "Yes! We build dedicated sample request and RFQ workflows where buyers enter their preferred fabric codes, GSM specs, courier account details, and shipping addresses for swift sample dispatch.",
        },
        {
          question: "Will our textile website rank on Google for buyers in the US, Europe, and Middle East?",
          answer: "Yes. We implement multi-region international B2B SEO strategies, technical Service schema, structured product metadata, and fast global CDN routing to ensure your factory ranks high for international sourcing queries.",
        },
        {
          question: "Can we display our GOTS, OEKO-TEX, ISO, and SEDEX certificates securely?",
          answer: "Absolutely. We build a high-credibility Compliance Wall featuring downloadable audit certificates, test reports, and verification badges that immediately reassure international compliance officers.",
        },
        {
          question: "Can our export sales team update product catalogs and fabric specs easily?",
          answer: "Yes. We provide an intuitive CMS dashboard allowing your sales or marketing team to add new fabric swatches, update GSM specifications, upload photo galleries, and post trade show news anytime.",
        },
        {
          question: "Are there any recurring monthly portal subscriptions or transaction commissions?",
          answer: "No. You own 100% of your website code and custom domain. There are zero monthly listing fees, per-lead commissions, or third-party B2B platform transaction charges.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "International B2B SEO" },
        { href: "/ecommerce-website-development", label: "E-Commerce Solutions" },
        { href: "/offshore-web-development-partner", label: "Global Web Partner" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Sales Team" },
      ]}
      relatedBlogPosts={relatedBlogPosts}
    />
  );
}

