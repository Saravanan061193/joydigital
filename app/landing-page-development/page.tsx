import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { generatePageSeo } from "@/lib/seoEngine";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await generatePageSeo(
    "/landing-page-development",
    "High-Converting Landing Page Development Services | Joy Digital",
    "Build distraction-free, sub-second landing pages engineered for paid ads, Google PPC, social media campaigns, and lead generation. Convert campaign clicks into customers."
  );
  return seoData.metadata;
}

export default async function LandingPageDevPage() {
  const seoData = await generatePageSeo(
    "/landing-page-development",
    "High-Converting Landing Page Development Services | Joy Digital",
    "Build distraction-free, sub-second landing pages engineered for paid ads, Google PPC, social media campaigns, and lead generation. Convert campaign clicks into customers."
  );

  return (
    <>
      <ServicePageTemplate
        serviceName="Landing Page Development"
        heroTitle={seoData.pageMapping?.h1 || "High-Converting Landing Page Development Services for Sales & PPC Ads"}
        heroSubtitle="Turn paid ad clicks and social campaign traffic into qualified leads. We build distraction-free, sub-second landing pages optimized for Google Ads, Meta PPC, and high-ROI conversion funnels."
        leadSource="Landing Page Development Page"
        heroCtaText="Request a Landing Page Quote"
        canonicalUrl="https://joydigital.in/landing-page-development"
        overviewTitle="Conversion Rate Optimization (CRO) & Distraction-Free Funnel Architecture"
        overviewContent={
          <div className="space-y-6">
            <p>
              Sending paid advertising traffic to a generic corporate homepage is one of the quickest ways to waste marketing budget. A homepage contains multiple navigation links, blog feeds, and social distractions that dilute buyer attention. <strong>Landing page development</strong> creates single-purpose, distraction-free conversion environments designed to achieve one objective: convert the visitor into an active enquiry.
            </p>
            <p>
              Joy Digital specializes in high-converting <strong>landing page website design</strong>, standalone PPC landing pages, and lead acquisition funnels built with Next.js and Tailwind CSS. Featuring sub-second loading speeds, prefilled lead forms, sticky WhatsApp conversion buttons, and verified social proof sections, our landing pages maximize your Return on Ad Spend (ROAS).
            </p>
          </div>
        }
        benefitsTitle="Why Choose High-Converting Custom Landing Pages?"
        benefitsSubtitle="Maximize your Return on Ad Spend (ROAS) with distraction-free conversion design."
        benefits={[
          {
            icon: "fa-solid fa-[#7C3AED] fa-bullseye",
            title: "Distraction-Free UX Design",
            description: "No external navigation menus or social links leaking prospects before they complete the enquiry form.",
          },
          {
            icon: "fa-solid fa-bolt",
            title: "Sub-Second Mobile Load Speed",
            description: "Instant loading on mobile 4G connections ensures ad clickers don&apos;t bounce due to page delay.",
          },
          {
            icon: "fa-brands fa-whatsapp",
            title: "Dual Conversion Channels",
            description: "Frictionless form submission fields paired with 1-tap WhatsApp chat buttons to capture every user preference.",
          },
          {
            icon: "fa-solid fa-chart-pie",
            title: "Pixel & GA4 Tracking Setup",
            description: "Pre-configured Google Ads conversion tags, Meta Pixel events, and Microsoft Clarity heatmaps.",
          },
        ]}
        processTitle="4-Step Landing Page Development Process"
        processSubtitle="From offer positioning to campaign launch."
        processSteps={[
          {
            step: "1",
            icon: "fa-solid fa-[#7C3AED] fa-lightbulb",
            title: "Offer & Angle Discovery",
            description: "We analyze your audience, ad copy hooks, and primary call-to-action objectives.",
          },
          {
            step: "2",
            icon: "fa-solid fa-pen-nib",
            title: "Wireframing & Copywriting",
            description: "We structure persuasive sales copy, headline hooks, and social proof sections.",
          },
          {
            step: "3",
            icon: "fa-solid fa-code",
            title: "Next.js Build & Pixel Sync",
            description: "We code light, mobile-responsive layouts and integrate conversion tracking scripts.",
          },
          {
            step: "4",
            icon: "fa-solid fa-rocket",
            title: "A/B Test Ready Launch",
            description: "We deploy live on global CDN networks ready for Google & Meta PPC traffic.",
          },
        ]}
        pricingTitle="Landing Page Development Packages"
        pricingSubtitle="Flat-rate proposals engineered for high lead conversion and marketing ROI."
        pricingTiers={[
          {
            name: "High-Converting Starter Lander",
            price: "₹12,000",
            period: "flat rate (~$150)",
            description: "Single-page high-converting sales lander for specific service campaigns or local ad leads.",
            features: [
              "Single-Purpose Distraction-Free Layout",
              "Mobile-Optimized Sub-Second Speed",
              "Prefilled Form & WhatsApp Trigger",
              "GA4 & Meta Pixel Event Tracking",
              "100% IP Code Ownership",
            ],
            ctaText: "Get Started",
          },
          {
            name: "PPC Campaign Lander Package",
            price: "₹28,000",
            period: "flat rate (~$350)",
            isPopular: true,
            description: "Multi-variant landing page setup for Google Ads PPC campaigns with A/B test variations.",
            features: [
              "Up to 3 Angle/Keyword Landing Variations",
              "Bespoke High-Impact Graphic Assets",
              "CRM & Webhook Lead Routing (Email/WA)",
              "Heatmap & User Behavior Tracking Setup",
              "Dedicated Conversion Optimization Specialist",
            ],
            ctaText: "Request Campaign Quote",
          },
        ]}
        faqs={seoData.pageMapping?.faq_schema || [
          {
            question: "Why should I use a dedicated landing page for Google Ads?",
            answer: "Dedicated landing pages match the exact search query and ad promise without distracting menu links, increasing conversion rates by 2x to 4x compared to generic homepages."
          },
          {
            question: "How fast can a landing page be developed?",
            answer: "Our standard Next.js landing pages are designed, coded, and deployed live within 3 to 5 business days."
          }
        ]}
        crossLinks={[
          { href: "/static-website-development", label: "Static Website Dev" },
          { href: "/portfolio-website-development", label: "Portfolio Websites" },
          { href: "/custom-website-development", label: "Custom Web Dev" },
          { href: "/web-design-services", label: "Web Design Services" },
        ]}
      />
    </>
  );
}
