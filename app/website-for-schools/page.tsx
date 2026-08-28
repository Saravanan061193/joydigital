import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "School Website Design & Admission Portals | Joy Digital",
  description: "Custom website development for schools, colleges, and educational hubs. Integrate student catalogs, calendars, galleries, and parent inquiry trackers.",
  alternates: {
    canonical: "https://joydigital.in/website-for-schools",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "School & Educational Website Design",
  "serviceType": "Educational Web Development",
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
  "description": "Professional web design and development services for schools, tutoring centers, and colleges. Build responsive layouts for parent queries.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "2"
  }
};

export default function SchoolWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Schools"
      heroTitle="Custom School Website Design & Admission Inquiry Systems"
      heroSubtitle="Attract more admissions. Integrate course catalogs, event calendars, responsive gallery sliders, and inquiry forms in a fast, mobile-friendly design."
      leadSource="Website for Schools Landing Page"
      heroCtaText="Get School Website Quote"
      overviewTitle="Simplify Parental Outreach & Drive Student Enrollment"
      overviewContent={
        <div className="space-y-6">
          <p>
            An educational institution&apos;s website is the primary channel of communication for parents, prospective students, and alumni. A slow, outdated website with complex navigation can deter parents from inquiring about admissions.
          </p>
          <p>
            At Joy Digital, we engineer premium, speed-optimized website layouts for **schools, colleges, private coaching academies, and daycare centers**. We focus on building simple parent registration pipelines, clear events schedules, and rich image portfolios.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Responsive Portfolios & Interactive Notices</h3>
          <p>
            We structure educational sites to render notices, fee guidelines, and school facilities beautifully on mobile screens. Parents can browse classrooms, download brochures, and submit admission inquiry forms in seconds.
          </p>
        </div>
      }
      benefitsTitle="Bespoke School Website Features"
      benefitsSubtitle="We build layouts focused on ease of access for parents, rich media displays, and admission enquiries."
      benefits={[
        {
          icon: "fa-solid fa-graduation-cap",
          title: "Admission Inquiry Forms",
          description: "Capture parent leads (student age, grade, location) and route details directly to school counselors.",
        },
        {
          icon: "fa-solid fa-calendar-days",
          title: "Events & Notice Boards",
          description: "Keep parents updated with dynamic exam calendars, holiday timetables, and interactive notice lists.",
        },
        {
          icon: "fa-solid fa-images",
          title: "Facility Image Galleries",
          description: "Showcase library amenities, sports complexes, labs, and classrooms using fast, mobile-responsive grids.",
        },
        {
          icon: "fa-solid fa-chalkboard-user",
          title: "Faculty Directories",
          description: "Introduce teachers and management to build academic trust and parental confidence.",
        },
        {
          icon: "fa-solid fa-file-pdf",
          title: "Syllabus & Brochure Downloads",
          description: "Provide quick PDF links for curriculum guides, school prospectus documents, and fee structures.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Loads Under 1.5 Seconds",
          description: "Fast mobile rendering ensures pages open instantly even on slow public networks during transit.",
        },
      ]}
      processTitle="How We Build Your School Website"
      processSubtitle="A structured process to map your academic catalog and launch inquiry forms successfully."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-clipboard-list",
          title: "Gather Scope & Media",
          description: "We collect campus photos, list courses, faculty guides, and admission rules.",
        },
        {
          step: "2",
          icon: "fa-solid fa-bezier-curve",
          title: "Visual Architecture",
          description: "We create Figma layouts showcasing brand colors, notice widgets, and inquiry forms.",
        },
        {
          step: "3",
          icon: "fa-solid fa-code",
          title: "Clean Web Engineering",
          description: "We build the website using secure Next.js code structures for instant loading and SEO rankings.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "Google Search Integration",
          description: "We verify sitemaps on Google Search Console, optimize meta tags, and configure backups.",
        },
      ]}
      pricingTitle="School Development Packages"
      pricingSubtitle="Select a package designed to represent your academy. No maintenance locks or hidden fees."
      pricingTiers={[
        {
          name: "School Starter Plan",
          price: "₹15,000",
          period: "one-time",
          description: "Perfect for coaching academies, tutoring hubs, and local playschools.",
          features: [
            "1-5 Responsive Layout Pages",
            "About Us & Courses Overview",
            "Notice Board Widget",
            "Admission Inquiry Form",
            "WhatsApp Chat Integration",
            "1 Year Free Hosting Setup",
          ],
          ctaText: "Get Started",
        },
        {
          name: "Academic Campus Portal",
          price: "₹35,000",
          period: "one-time",
          description: "Recommended for private secondary schools, universities, and multi-branch colleges.",
          isPopular: true,
          features: [
            "Up to 12 Structured Pages",
            "Detailed Facility Image Galleries",
            "Timetable & Notice Board Engine",
            "Faculty & Advisory Directory",
            "Google Maps Local SEO Setup",
            "1 Year Domain + Priority Support",
          ],
          ctaText: "Request a Proposal",
        },
      ]}
      faqs={[
        {
          question: "Can parents submit admission applications online?",
          answer: "Yes! We can design custom multi-step application forms to capture student profiles, parent details, and upload documents.",
        },
        {
          question: "Will the website work well on parent smartphones?",
          answer: "Yes, every layout we build is fully responsive and optimized for mobile devices, ensuring parents can view notices easily.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/about", label: "About Agency" },
        { href: "/contact", label: "Contact Us" },
      ]}
    />
  );
}
