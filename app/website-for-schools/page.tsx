import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "School & Educational Institute Website Design | Education SEO | Joy Digital",
  description: "High-converting website design & digital marketing for international schools, K-12 institutes, colleges, and study abroad advisories. Online admission inquiry forms, fee structure portals, and educational SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-schools",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-schools",
    title: "School Website Design & Global Student Admission Portals | Joy Digital",
    description: "Ultra-fast Next.js website design for international schools, IB/IGCSE academies, and higher education institutes. Online admission forms, virtual campus tours, curriculum guides, and global educational SEO.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "School Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-schools#service",
      "name": "School & Educational Institute Website Design",
      "serviceType": "Educational Web Development & School Admission Marketing",
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
      "description": "Custom web design for international schools, private K-12 academies, universities, and coaching institutes. Features online admission application forms, fee schedule downloads, campus galleries, and educational SEO.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "18000",
        "highPrice": "45000",
        "offerCount": "2"
      }
    }
  ]
};

export default function SchoolWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Schools"
      heroTitle="High-Converting Website Design & Education SEO for Schools & Institutes"
      heroSubtitle="Convert prospective parent inquiries into direct campus visits and online student applications. We engineer fast, modern Next.js websites for international schools, IB/IGCSE academies, K-12 institutes, and study abroad advisories."
      leadSource="Website for Schools Landing Page"
      heroCtaText="Get Free School Web Quote"
      overviewTitle="Why Most School Websites Fail to Drive Online Admission Applications (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            Parents researching international schools and higher education institutes evaluate curriculum standards (IB, IGCSE, CBSE), faculty qualifications, campus infrastructure, sports facilities, transport safety, and admission deadlines before applying.
          </p>
          <p>
            Unfortunately, many school websites have cluttered layouts, slow mobile page loads, outdated circular notices, and missing online admission application forms or instant admission desk WhatsApp links.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Educational Portals</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Online Admission Application & Inquiry Form</strong>: Digital application workflow</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Interactive Curriculum & Academic Hubs</strong>: IB, IGCSE, CBSE & STEM programs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Virtual Campus Tour & Facilities Showcase</strong>: Labs, sports arenas & libraries</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Global Education SEO Strategy</strong>: Rank for competitive school admission terms</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Ultra-fast serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Admission Desk WhatsApp Link</strong>: Direct connection for instant parent support</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we merge academic branding with <Link href="/website-development" className="text-primary font-bold hover:underline">high-speed Next.js web development</Link>, <Link href="/seo-services" className="text-primary font-bold hover:underline">education SEO strategies</Link>, and <Link href="/local-seo-services" className="text-primary font-bold hover:underline">Google Business Profile setup</Link> to help schools fill admission seats.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for School Websites"
      benefitsSubtitle="Designed to project academic prestige, showcase campus life, and streamline student admissions."
      benefits={[
        {
          icon: "fa-solid fa-graduation-cap",
          title: "1. Online Student Admission Inquiry Form",
          description: "Structured form asking for grade applying for, parent contact details, previous school, and preferred campus visit date.",
        },
        {
          icon: "fa-solid fa-book-open-reader",
          title: "2. Curriculum & Academic Program Showcase",
          description: "Dedicated landing pages covering International Baccalaureate (IB), Cambridge IGCSE, CBSE, pre-primary, and STEM labs.",
        },
        {
          icon: "fa-solid fa-school",
          title: "3. Virtual Campus Tour & Infrastructure Gallery",
          description: "High-resolution photo galleries and 360° video tours of smart classrooms, science labs, swimming pools, and auditoriums.",
        },
        {
          icon: "fa-solid fa-trophy",
          title: "4. Student Achievements & Board Exam Results",
          description: "Highlight school toppers, university placements, sports championships, and international Olympiad wins.",
        },
        {
          icon: "fa-solid fa-bus",
          title: "5. Transport, Hostel & Cafeteria Information",
          description: "Provide clear details on GPS-enabled bus routes, residential boarding facilities, nutritional meal menus, and campus security.",
        },
        {
          icon: "fa-solid fa-bullhorn",
          title: "6. Circulars, Events & Academic Calendar",
          description: "Easy-to-access portal for downloading monthly school circulars, exam timetables, holiday lists, and annual day news.",
        },
        {
          icon: "fa-solid fa-chalkboard-user",
          title: "7. Faculty & Leadership Credentials",
          description: "Showcase principal messages, teacher qualifications, international training, and educational advisory board bios.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "8. One-Tap Admission Desk WhatsApp Button",
          description: "Instant button connecting parents directly to your admission counselor pre-filled with: 'Hi, I need admission details for my child.'",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "9. Education SEO & Admission Keywords",
          description: "Target high-intent terms like 'Best international school in Chennai', 'Top IB school Madurai', and 'CBSE school admissions'.",
        },
        {
          icon: "fa-solid fa-file-pdf",
          title: "10. Downloadable Prospectus & Fee Schedule",
          description: "Provide easy gated or ungated access to school prospectus PDFs, fee structure breakdowns, and scholarship criteria.",
        },
      ]}
      processTitle="Our 6-Step Educational Web Engineering Roadmap"
      processSubtitle="A proven path from academic audit to live online parent inquiries."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-school-flag",
          title: "School Brand & Academic Audit",
          description: "We audit your curriculum offerings, grade levels, campus facilities, fee tiers, and admission counselor workflow.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Taxonomy & Keyword Structure",
          description: "We structure academic hubs, campus galleries, admission prospectus triggers, and educational SEO term maps.",
        },
        {
          step: "3",
          icon: "fa-solid fa-pen-ruler",
          title: "Academic UI/UX Design",
          description: "We design vibrant, trustworthy desktop and mobile interface mockups with clear parent navigation.",
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
          title: "Educational Schema & Lead Sync",
          description: "We implement EducationalOrganization schema markup, configure GA4 event tracking, and sync forms to your email.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and verify local map presence.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Schools"
      pricingSubtitle="Get a modern, high-converting educational portal with zero ongoing monthly software commissions."
      pricingTiers={[
        {
          name: "Play School & Academy Plan",
          price: "₹18,000",
          period: "one-time ($900 USD)",
          description: "Ideal for pre-schools, Montessori academies, day care centers, and specialized coaching institutes.",
          features: [
            "1-5 Custom Responsive Pages",
            "Admission Inquiry Lead Form",
            "Program & Activity Showcase",
            "WhatsApp & Phone Direct Links",
            "Campus Photo Gallery",
            "Google Maps Local Citation Setup",
            "Basic School SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Academy Plan",
        },
        {
          name: "Grand International School Portal",
          price: "₹45,000",
          period: "one-time ($2,200 USD)",
          description: "Recommended for K-12 international schools, IB/IGCSE academies, and higher education institutes.",
          isPopular: true,
          features: [
            "Up to 15 Custom Grade & Facility Pages",
            "Online Admission Application & Prospectus Hub",
            "Virtual Campus Tour & Video Embeds",
            "Academic Circulars & Event Calendar Portal",
            "Full Global Educational SEO Architecture",
            "Google Analytics 4 & Search Console Sync",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose International School Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a school cost?",
          answer: "Our school website packages start from ₹18,000 ($900 USD) for pre-schools up to ₹45,000 ($2,200 USD) for international K-12 school portals.",
        },
        {
          question: "Can parents submit admission inquiry forms and download prospectus PDFs online?",
          answer: "Yes! We build custom admission forms where parents enter student grade level, previous academic history, and contact details, alongside instant PDF downloads.",
        },
        {
          question: "Will the website help our school rank on Google for local and regional admissions?",
          answer: "Yes. Every school website includes EducationalOrganization schema markup, fast sub-1.5s page load speed, structured curriculum landing pages, and localized keywords to rank on Google Search and Maps.",
        },
        {
          question: "Can staff update school circulars, exam timetables, and news events easily?",
          answer: "Yes. We provide a simple CMS dashboard so your admin staff can post new circulars, upload holiday lists, and update photo galleries anytime.",
        },
        {
          question: "Are there any monthly listing or subscription fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly portal subscription fees or per-admission commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Education SEO Services" },
        { href: "/local-seo-services", label: "Local Map SEO" },
        { href: "/google-business-profile-setup", label: "Google Business Setup" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Admission Desk" },
      ]}
    />
  );
}
