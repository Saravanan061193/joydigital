import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Website Design for Insurance Agents & LIC Advisors | Joy Digital",
  description: "Get a custom lead-generation website designed specifically for Insurance Agents, LIC Advisors, and Financial Planners. Generate policy inquiries directly on WhatsApp.",
  alternates: {
    canonical: "https://joydigital.in/website-for-insurance-agents",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Website Design for Insurance Agents",
  "serviceType": "Bespoke Web Development for Financial Advisors",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chennai Main Road",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "625001",
      "addressCountry": "IN"
    }
  },
  "description": "Professional web design services for insurance agents, LIC advisors, and financial consultants. Integrated with WhatsApp CTA, direct policy contact forms, and local SEO setup.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "15000",
    "highPrice": "25000",
    "offerCount": "2"
  }
};

export default function InsuranceAgentWebPage() {
  return (
    <ServicePageTemplate
      serviceName="Website for Insurance Agents"
      heroTitle="Custom Lead-Generation Websites for Insurance Agents & LIC Advisors"
      heroSubtitle="Stop relying strictly on cold calling. Build authority, present policy calculators, and capture high-intent insurance inquiries directly on your own branded web layout."
      leadSource="Website for Insurance Agents Landing Page"
      overviewTitle="Personal Branding & Direct Lead Capture for Financial Advisors"
      overviewContent={
        <div className="space-y-6">
          <p>
            In the insurance and financial planning sector, client trust is your most valuable asset. When a prospect searches for a policy, they expect to deal with a professional, verified advisor. Having a custom web address (like *www.advisorname.com*) establishes immediate authority and differentiates you from generic competitors.
          </p>
          <p>
            At Joy Digital, we build high-converting portfolios designed specifically for **LIC advisors, insurance consultants, and wealth planners**. Each site features direct lead routing, downloadable policy brochure cards, and dynamic WhatsApp chat hooks.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Optimized to Drive Direct Inquiries</h3>
          <p>
            We don&apos;t build generic portfolios. Every template is structured around your direct contact options. Visitors can select the policy type they are interested in (Life Insurance, Health, Vehicle, Pension plans) and submit a custom quote request form, sending the data directly to your email or WhatsApp number.
          </p>
        </div>
      }
      benefitsTitle="Bespoke Insurance Website Features"
      benefitsSubtitle="We build layouts focused on establishing credibility and making it simple for clients to reach you."
      benefits={[
        {
          icon: "fa-solid fa-user-shield",
          title: "Personal Branding Setup",
          description: "Establish professional authority with profile sections, certificates, client reviews, and direct awards displays.",
        },
        {
          icon: "fa-solid fa-comments-dollar",
          title: "WhatsApp Leads Sync",
          description: "Allow clients to click and start a WhatsApp conversation with a pre-filled template about specific policies.",
        },
        {
          icon: "fa-solid fa-list-check",
          title: "Custom Policy Forms",
          description: "Capture prospect details including age, budget, policy category, and contact numbers with clean data validation.",
        },
        {
          icon: "fa-solid fa-bolt",
          title: "Blazing Speed Delivery",
          description: "Built on serverless Next.js frameworks so mobile pages load in under 1.2 seconds, preventing lead drop-off.",
        },
        {
          icon: "fa-solid fa-globe",
          title: "Custom Domain & SSL",
          description: "We configure your custom personal domain (e.g. www.name.com) with secure HTTPS encryption to build trust.",
        },
        {
          icon: "fa-solid fa-qrcode",
          title: "Digital Business Card Link",
          description: "Get a mobile-optimized business card page to share easily via WhatsApp status, QR code, or SMS.",
        },
      ]}
      processTitle="How We Build Your Advisor Website"
      processSubtitle="We systematically construct your personal profile and connect all direct inquiry routing."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-clipboard-question",
          title: "Gather Profile Details",
          description: "We collect your profile details, policy services list, awards photos, and contact information.",
        },
        {
          step: "2",
          icon: "fa-solid fa-file-code",
          title: "Design & Development",
          description: "We code a fast, secure website tailored to your branding with optimized conversion actions.",
        },
        {
          step: "3",
          icon: "fa-solid fa-message",
          title: "Setup WhatsApp Leads",
          description: "We configure forms and floating widgets to redirect inquiries directly to your mobile chat.",
        },
        {
          step: "4",
          icon: "fa-solid fa-globe",
          title: "Domain Launch",
          description: "We connect your domain, deploy the cloud hosting, and submit pages directly to search engines.",
        },
      ]}
      pricingTitle="Affordable Pricing Packages"
      pricingSubtitle="Get a premium, lead-converting advisor website with no recurring developer costs."
      pricingTiers={[
        {
          name: "Standard Advisor Portfolio",
          price: "₹15,000",
          period: "one-time",
          description: "Perfect for individual LIC and general insurance agents aiming for a professional profile.",
          features: [
            "1-5 Custom Layout Pages",
            "About Me & Biography Section",
            "Listed Policies Grid (Life, Health, Motor)",
            "WhatsApp & Call CTAs",
            "Secure Contact / Inquiry Form",
            "1 Year Hosting Setup Support",
          ],
          ctaText: "Select Standard Plan",
        },
        {
          name: "Premium Agency Funnel",
          price: "₹25,000",
          period: "one-time",
          description: "Recommended for financial planners, team managers, and established agencies.",
          isPopular: true,
          features: [
            "Up to 10 Advanced Pages",
            "Dynamic Policy Quote Calculators Form",
            "Client Testimonials & Feedback Carousel",
            "Google Maps Local Citation Setup",
            "Detailed Blog & News Section Setup",
            "1 Year Domain & Priority Support",
          ],
          ctaText: "Select Premium Plan",
        },
      ]}
      faqs={[
        {
          question: "Do I need to pay monthly maintenance charges?",
          answer: "No. We build on serverless architectures, so there are zero recurring monthly hosting or coding fees. You only pay for your annual domain name renewal.",
        },
        {
          question: "Can clients request a custom policy quote directly?",
          answer: "Yes! We integrate secure interactive forms where clients submit their details. These requests are sent directly to your email and WhatsApp.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development-chennai", label: "Chennai Web Dev" },
        { href: "/portfolio", label: "View Portfolio" },
        { href: "/contact", label: "Contact Us" },
      ]}
    />
  );
}
