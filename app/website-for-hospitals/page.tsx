import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hospital Website Design & Medical Tourism SEO Services | Joy Digital",
  description: "High-converting website design & digital lead portals for hospitals, multi-specialty clinics, healthcare networks, and medical tourism centers. Doctor appointment booking, international patient concierge, and medical SEO.",
  alternates: {
    canonical: "https://joydigital.in/website-for-hospitals",
  },
  openGraph: {
    type: "website",
    url: "https://joydigital.in/website-for-hospitals",
    title: "Hospital Website Design & Global Medical Patient Acquisition | Joy Digital",
    description: "Ultra-fast Next.js website design for hospitals, specialized surgery centers, and medical tourism providers. Online doctor appointment booking, international patient visa desk, and global healthcare SEO.",
    images: [{ url: "https://joydigital.in/assets/images/hero-banner.webp", width: 1200, height: 630, alt: "Hospital Website Design Joy Digital" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://joydigital.in/website-for-hospitals#service",
      "name": "Hospital Website Design & Global Medical SEO",
      "serviceType": "Healthcare Web Development & Medical Tourism Marketing",
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
      "description": "Custom web development for hospitals, medical centers, multi-specialty clinics, and medical tourism providers. Includes online doctor scheduling, international patient assistance forms, HIPAA/NABH compliance, and global medical SEO.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "25000",
        "highPrice": "65000",
        "offerCount": "2"
      }
    }
  ]
};

export default function HospitalWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Hospitals"
      heroTitle="High-Converting Website Design & Medical Tourism SEO for Hospitals"
      heroSubtitle="Attract local patients and high-value international medical tourism inquiries. We engineer fast, HIPAA/NABH-compliant Next.js websites for multi-specialty hospitals, surgical institutes, diagnostic chains, and medical travel advisories."
      leadSource="Website for Hospitals Landing Page"
      heroCtaText="Get Free Hospital Web Quote"
      overviewTitle="Why Most Hospital Websites Fail to Convert International Patients (And How We Fix It)"
      overviewContent={
        <div className="space-y-6">
          <p>
            Patients seeking specialized treatments—whether cardiology, oncology, orthopedics, IVF, or cosmetic surgery—conduct meticulous research before choosing a hospital. International medical tourists look for doctor qualifications, treatment success rates, NABH/JCI accreditations, cost estimates, and visa assistance.
          </p>
          <p>
            Unfortunately, many hospital websites have confused navigation, slow mobile load speeds, buried doctor profiles, and lack direct medical opinion request forms or WhatsApp international patient desks.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4 my-6">
            <h3 className="text-lg font-bold text-primary-dark">How Joy Digital Builds High-Converting Hospital Portals</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>International Medical Opinion & Inquiry Form</strong>: Medical report upload workflow</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Doctor & Specialist Directory</strong>: Searchable qualifications, experience & schedules</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Specialty Department Pages</strong>: Cardiology, Oncology, Orthopedics & IVF hubs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Global Medical Tourism SEO Strategy</strong>: Rank for high-value treatment keywords</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Sub-1.5s Load Speeds</strong>: Ultra-fast serverless Next.js architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold"><i className="fa-solid fa-check-circle" /></span>
                <span><strong>Medical Desk WhatsApp Routing</strong>: Instant patient care connection</span>
              </li>
            </ul>
          </div>
          <p>
            At Joy Digital, we merge healthcare domain knowledge with <Link href="/website-development" className="text-primary font-bold hover:underline">high-speed Next.js web development</Link>, <Link href="/seo-services" className="text-primary font-bold hover:underline">medical SEO strategies</Link>, and <Link href="/local-seo-services" className="text-primary font-bold hover:underline">Google Business Profile setup</Link> to help medical centers scale patient admissions.
          </p>
        </div>
      }
      benefitsTitle="10 Essential Features We Build for Hospital Websites"
      benefitsSubtitle="Designed to instill medical trust, showcase doctor expertise, and streamline international patient intake."
      benefits={[
        {
          icon: "fa-solid fa-user-doctor",
          title: "1. Searchable Doctor & Specialist Directory",
          description: "Filter doctors by department, qualification (MD/MS/FRCS), OPD availability, consultation fee, and spoken languages.",
        },
        {
          icon: "fa-solid fa-plane-arrival",
          title: "2. International Patient & Medical Tourism Portal",
          description: "Dedicated section guiding overseas patients on medical visa invitation letters, airport transfers, hotel stays, and cost estimates.",
        },
        {
          icon: "fa-solid fa-file-medical",
          title: "3. Online Treatment Estimate & Medical Opinion Form",
          description: "Secure upload form allowing patients to submit MRI/CT scans and medical history for free expert doctor review.",
        },
        {
          icon: "fa-solid fa-calendar-check",
          title: "4. Online Appointment Booking & Telehealth Sync",
          description: "Seamless integration for booking in-person OPD consultations or virtual video second opinions.",
        },
        {
          icon: "fa-solid fa-hospital",
          title: "5. Multi-Specialty Department Hubs",
          description: "Comprehensive pages detailing advanced surgical tech, ICU beds, robotics, and treatment success rates.",
        },
        {
          icon: "fa-solid fa-award",
          title: "6. JCI, NABH & NABL Accreditation Badges",
          description: "Prominently display hospital certifications, infection control standards, and international quality awards.",
        },
        {
          icon: "fa-solid fa-laptop-medical",
          title: "7. Patient Testimonial & Video Recovery Stories",
          description: "Inspire confidence with authentic patient recovery interviews and international medical tourist feedback.",
        },
        {
          icon: "fa-brands fa-whatsapp",
          title: "8. One-Tap Emergency & Patient Helpline WhatsApp",
          description: "Instant button connecting patients directly to your casualty desk or international concierge desk.",
        },
        {
          icon: "fa-solid fa-magnifying-glass-location",
          title: "9. Global Healthcare & Medical SEO Strategy",
          description: "Target high-intent terms like 'Best cardiac hospital in India', 'Knee replacement medical tourism', and 'IVF fertility clinic'.",
        },
        {
          icon: "fa-solid fa-shield-heart",
          title: "10. Multi-Language & Currency Converter",
          description: "Built-in language translation (English, Arabic, French, Russian) and treatment cost displays in USD, EUR, and INR.",
        },
      ]}
      processTitle="Our 6-Step Healthcare Web Engineering Roadmap"
      processSubtitle="A proven path from medical audit to live patient acquisition."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-hospital-user",
          title: "Healthcare & Patient Audit",
          description: "We audit your clinical departments, doctor credentials, medical tourism target countries, and OPD scheduling workflow.",
        },
        {
          step: "2",
          icon: "fa-solid fa-sitemap",
          title: "Taxonomy & Keyword Structure",
          description: "We structure medical department hubs, doctor profile directories, report upload forms, and medical SEO term maps.",
        },
        {
          step: "3",
          icon: "fa-solid fa-pen-ruler",
          title: "Trustworthy UI/UX Design",
          description: "We design comforting, accessible desktop and mobile interface mockups with clear emergency callouts.",
        },
        {
          step: "4",
          icon: "fa-solid fa-code",
          title: "Next.js High-Speed Portal Build",
          description: "We build your platform on serverless Next.js frameworks for sub-1.5s page load speeds across global networks.",
        },
        {
          step: "5",
          icon: "fa-solid fa-chart-line",
          title: "Medical Schema & Analytics Sync",
          description: "We implement Hospital & MedicalBusiness schema markup, configure GA4 event tracking, and sync intake forms with your CRM.",
        },
        {
          step: "6",
          icon: "fa-solid fa-rocket",
          title: "Launch & Google Indexing",
          description: "We launch live on your custom domain, submit XML sitemaps to Google Search Console, and verify local map presence.",
        },
      ]}
      pricingTitle="Transparent Pricing Packages for Hospitals"
      pricingSubtitle="Get a modern, high-converting medical portal with zero ongoing monthly software commissions."
      pricingTiers={[
        {
          name: "Clinic & Specialty Care Plan",
          price: "₹25,000",
          period: "one-time ($1,200 USD)",
          description: "Ideal for specialized single-specialty clinics, diagnostic centers, and boutique surgical units.",
          features: [
            "1-6 Custom Responsive Pages",
            "Doctor Directory & Appointment Form",
            "Specialty Treatment Sections",
            "WhatsApp & Emergency Direct Links",
            "NABH / NABL Certification Display",
            "Google Maps Local Business Setup",
            "Basic Medical SEO & Schema Markup",
            "1 Year Priority Technical Support",
          ],
          ctaText: "Choose Clinic Plan",
        },
        {
          name: "Enterprise Hospital & Tourism Portal",
          price: "₹65,000",
          period: "one-time ($2,800 USD)",
          description: "Recommended for multi-specialty hospitals, surgical institutes, and medical tourism centers.",
          isPopular: true,
          features: [
            "Up to 20 Custom Department & Doctor Pages",
            "International Patient Medical Opinion Form",
            "Medical Report Upload & Visa Concierge Hub",
            "Multi-Language (Arabic/French/English) Support",
            "Full Global Healthcare SEO Architecture",
            "Google Analytics 4 & Search Console Sync",
            "1 Year Technical Support & Maintenance",
          ],
          ctaText: "Choose Enterprise Hospital Plan",
        },
      ]}
      faqs={[
        {
          question: "How much does a website for a hospital cost?",
          answer: "Our hospital website packages start from ₹25,000 ($1,200 USD) for specialty clinics up to ₹65,000 ($2,800 USD) for enterprise multi-specialty medical tourism portals.",
        },
        {
          question: "Can international patients upload medical reports for doctor second opinions?",
          answer: "Yes! We build secure medical report upload forms where overseas patients attach MRI/CT scans and medical summaries directly sent to your international patient desk.",
        },
        {
          question: "Will the website help our hospital rank on Google for medical tourism searches?",
          answer: "Yes. Every hospital website includes Hospital & MedicalBusiness schema markup, fast sub-1.5s page load speed, structured department landing pages, and localized/global medical keywords.",
        },
        {
          question: "Can we update doctor profiles and OPD schedules ourselves?",
          answer: "Yes. We provide an easy-to-use CMS dashboard so your medical administration team can update doctor availability, add new specialists, and post health blogs anytime.",
        },
        {
          question: "Are there any monthly listing or platform fees?",
          answer: "No. You own 100% of your website code and custom domain. There are zero recurring monthly portal subscription fees or per-patient commissions.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Custom Web Development" },
        { href: "/seo-services", label: "Medical SEO Services" },
        { href: "/local-seo-services", label: "Local Map SEO" },
        { href: "/google-business-profile-setup", label: "Google Business Setup" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Medical Desk" },
      ]}
    />
  );
}
