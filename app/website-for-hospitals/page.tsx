import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Healthcare & Hospital Web Design Agency | Joy Digital",
  description: "Get a custom clinic or hospital website design. We build speed-optimized healthcare sites with online appointment booking and doctor schedules.",
  alternates: {
    canonical: "https://joydigital.in/website-for-hospitals",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Hospital & Clinic Website Design",
  "serviceType": "Healthcare Web Development",
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
  "description": "Professional clinic and hospital website design agency chennai, simplifying patient appointment bookings, coordinating doctor schedules, and displaying clinic accreditations to build instant credibility.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "35000",
    "offerCount": "2"
  }
};

export default function HospitalWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Hospitals"
      heroTitle="Custom Web Design & Scheduling Systems for Hospitals & Clinics"
      heroSubtitle="Build patient trust, showcase doctor profiles, and streamline appointment scheduling with a fast, secure, and mobile-responsive website."
      leadSource="Website for Hospitals Landing Page"
      overviewTitle="Patient-Centric Website Solutions for Modern Healthcare"
      overviewContent={
        <div className="space-y-6">
          <p>
            In the healthcare sector, a professional online presence is critical for patient acquisition and care coordination. Patients expect to easily find doctor specialties, check availability, read reviews, and schedule appointments online.
          </p>
          <p>
            At Joy Digital, we build speed-optimized, secure websites designed specifically for **clinics, diagnostics labs, and hospitals**. Each layout is tailored to establish immediate trust and make the patient intake pipeline as seamless as possible.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Streamline Doctor Schedules & Appointments</h3>
          <p>
            We don't build generic static brochures. We build healthcare websites integrated with direct scheduling tools, allowing patients to select doctors, choose open time slots, and receive confirmation alerts directly via WhatsApp or email.
          </p>
        </div>
      }
      benefitsTitle="Bespoke Healthcare Website Features"
      benefitsSubtitle="We build layouts focused on establishing clinic credibility and making patient contact simple."
      benefits={[
        {
          icon: "fa-solid fa-user-doctor",
          title: "Doctor Profile Directory",
          description: "Showcase doctor specialties, achievements, experience, and schedules in beautiful individual cards.",
        },
        {
          icon: "fa-solid fa-calendar-check",
          title: "Appointment Scheduler",
          description: "Enable patient appointment requests with automatic email notifications and WhatsApp status routing.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "Secure Data Handling",
          description: "We deploy secure serverless architectures with HTTPS encryption to ensure patient contact info is safe.",
        },
        {
          icon: "fa-solid fa-hospital-user",
          title: "Accreditation Showcase",
          description: "Highlight ISO certifications, government approvals, and laboratory awards to build instant authority.",
        },
        {
          icon: "fa-solid fa-map-location-dot",
          title: "Clinic Location Mappings",
          description: "Integrated Google Maps and dynamic driving direction links to guide emergency patients to your facility.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Under 1.5s Load Times",
          description: "Built on high-performance frameworks so pages load instantly on weak mobile networks for urgent searches.",
        },
      ]}
      processTitle="How We Build Your Healthcare Website"
      processSubtitle="A structured workflow from medical profiles gathering to HIPAA-friendly deployment."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-clipboard-question",
          title: "Consultation & Scope",
          description: "We discuss doctor schedules, medical services, locations, and booking requirements.",
        },
        {
          step: "2",
          icon: "fa-solid fa-file-code",
          title: "Development & Setup",
          description: "We code custom pages for doctors, services, and locations, prioritizing mobile responsiveness.",
        },
        {
          step: "3",
          icon: "fa-solid fa-calendar-days",
          title: "Integrate Schedulers",
          description: "We configure direct contact forms and scheduling components to route leads to your staff.",
        },
        {
          step: "4",
          icon: "fa-solid fa-rocket",
          title: "Deploy & Index",
          description: "We configure custom domains, security certificates, and submit XML sitemaps to Google.",
        },
      ]}
      pricingTitle="Affordable Pricing Packages"
      pricingSubtitle="Get a premium, lead-converting clinic website with no high monthly developer fees."
      pricingTiers={[
        {
          name: "Standard Clinic Portfolio",
          price: "₹15,000",
          period: "one-time",
          description: "Ideal for individual doctors, family dentists, and specialized local therapy centers.",
          features: [
            "1-5 Custom Layout Pages",
            "Doctor Bio & Qualifications",
            "Listed Specialties & Services",
            "Direct Call & WhatsApp CTA",
            "Secure Contact / Inquiry Form",
            "1 Year Hosting Setup Support",
          ],
          ctaText: "Select Standard Plan",
        },
        {
          name: "Premium Clinic & Hospital Funnel",
          price: "₹35,000",
          period: "one-time",
          description: "Recommended for multi-specialty clinics, diagnostic labs, and medium-sized hospitals.",
          isPopular: true,
          features: [
            "Up to 12 Advanced Pages",
            "Doctor Directory with Schedule grid",
            "Online Patient Appointment Forms",
            "Google Maps & Local SEO Citations",
            "Patient Reviews & Testimonials Carousel",
            "1 Year Domain & Priority Support",
          ],
          ctaText: "Select Premium Plan",
        },
      ]}
      faqs={[
        {
          question: "Can patient appointment notifications be routed to our front desk WhatsApp?",
          answer: "Yes! We set up custom WhatsApp click actions with pre-filled patient info details, so appointment requests go directly to your front desk assistant.",
        },
        {
          question: "Is there a monthly fee for hosting or maintenance?",
          answer: "No. We deploy using serverless CDNs, which have zero recurring hosting fees. You only pay for your yearly domain renewal.",
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
