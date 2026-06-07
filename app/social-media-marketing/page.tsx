import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Social Media Marketing Services | SMM & Ad Campaigns | Joy Digital",
  description: "Grow brand awareness, engage your audience, and generate quality sales leads with paid Facebook and Instagram ad campaigns. Economical SMM packages.",
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Social Media Marketing & Paid Ads",
  "serviceType": "Social Media Marketing Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital Growth Agency",
    "image": "https://joydigital.in/assets/images/logo.webp",
    "telephone": "+919080026133",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Madurai Main Road",
      "addressLocality": "Madurai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "625001",
      "addressCountry": "IN"
    }
  },
  "description": "Joy Digital is a SMM agency offering Facebook ad setups, Instagram content planning, audience targeting, and lead-gen campaigns.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "12000",
    "highPrice": "40000",
    "offerCount": "3"
  }
};

export default function SMMPage() {
  return (
    <ServicePageTemplate
      serviceName="Social Media Marketing"
      heroTitle="Grow Brand Engagement & Sales Leads with SMM Campaigns"
      heroSubtitle="Engage your target audience, build online communities, and generate sales leads with paid ads and organic content on Facebook, Instagram, and LinkedIn. Convert online interest into business inquiries."
      leadSource="SMM Landing Page"
      overviewTitle="Paid Social Ads & Organic Content Strategies Designed to Convert"
      overviewContent={
        <div className="space-y-6">
          <p>
            Social media platforms are valuable channels for connecting with prospects. Simply posting generic updates, however, is rarely enough to drive commercial results. Algorithm updates mean organic reach is limited, making structured paid campaigns and engaging content strategies essential for business growth.
          </p>
          <p>
            At Joy Digital Growth Agency, we focus on helping regional businesses grow their social media presence. We design visual assets, plan content calendars, and build targeted ad campaigns on Facebook and Instagram. Our goal is to ensure your social media spending drives actual leads and conversions.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Paid Ads, Retargeting & Audience Matching</h3>
          <p>
            Organic posts help build community trust, while paid ads are key for reaching new customers. We build Meta ad campaigns that target specific demographics, interests, and locations. We also set up lead-capture ads that make it easy for users to send inquiries directly within the app.
          </p>
          <p>
            Additionally, we build retargeting campaigns to re-engage website visitors, showing relevant ads that help move them toward booking a service or making a purchase. We track performance metrics like click-through rates, reach, and cost-per-lead to optimize your campaign ROI.
          </p>
        </div>
      }
      benefitsTitle="Why SMM is Vital for Business Growth"
      benefitsSubtitle="We combine engaging visual design with targeted ad settings to help build your brand and acquire new customers."
      benefits={[
        {
          icon: "fa-solid fa-users-viewfinder",
          title: "Targeted Audience Matching",
          description: "We optimize ad settings to reach prospects based on their age, location, hobbies, and search habits, reducing wasted ad spend.",
        },
        {
          icon: "fa-solid fa-bullhorn",
          title: "Grow Brand Awareness",
          description: "Consistent, professional content on Facebook and Instagram helps build your brand presence in your target region.",
        },
        {
          icon: "fa-solid fa-address-card",
          title: "Lead Generation Ads",
          description: "We set up Meta lead forms that capture name, phone, and service interests directly inside social apps for higher conversions.",
        },
        {
          icon: "fa-solid fa-bezier-curve",
          title: "Custom Visual Creatives",
          description: "Our graphic designers build matching post templates, cover designs, and promotional banners that represent your brand values.",
        },
        {
          icon: "fa-solid fa-rotate",
          title: "Retargeting Campaigns",
          description: "We show custom ads to users who have visited your website or interacted with your social channels, helping guide them to take action.",
        },
        {
          icon: "fa-solid fa-chart-column",
          title: "Clear Performance Tracking",
          description: "We monitor key ad metrics, including ad impressions, click-through rates, and cost-per-lead, sharing performance details in monthly reports.",
        },
      ]}
      processTitle="Our SMM Optimization Process"
      processSubtitle="We plan content calendars and build targeted ad settings to align with your business goals."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-compass",
          title: "Strategy & Audit",
          description: "We analyze competitor profiles, identify target customer interests, and audit your past social media performance.",
        },
        {
          step: "2",
          icon: "fa-solid fa-calendar-days",
          title: "Content Calendar Setup",
          description: "We plan a monthly content roadmap, outlining graphic designs, topic hooks, and posting schedules for your approval.",
        },
        {
          step: "3",
          icon: "fa-solid fa-wand-magic-sparkles",
          title: "Creative Design & Writing",
          description: "Our team designs custom post layouts, writes captions, and selects target hashtags to improve organic visibility.",
        },
        {
          step: "4",
          icon: "fa-solid fa-chart-line",
          title: "Ad Management & Optimization",
          description: "We launch targeted ad campaigns, monitor budget performance, test different ad creatives, and adjust settings to optimize ROI.",
        },
      ]}
      pricingTitle="SMM & Paid Ads Monthly Plans"
      pricingSubtitle="Select a package designed to fit your marketing goals. Zero setup fees, transparent ad reporting."
      pricingTiers={[
        {
          name: "Organic Content Plan",
          price: "₹12,000",
          period: "/month",
          description: "Ideal for local businesses wanting to keep their profiles active with professional visual layouts.",
          features: [
            "12 Custom Post Designs / Month",
            "Facebook & Instagram Auto-posting",
            "Professional Caption Copywriting",
            "Industry Keyword Hashtag Research",
            "Standard Profile Setup & Optimization",
            "Monthly Profile Growth Metrics Reports",
          ],
          ctaText: "Choose Organic Plan",
        },
        {
          name: "Paid Ads & Leads Package",
          price: "₹22,000",
          period: "/month",
          description: "Recommended for companies targeting immediate customer inquiries and sales leads.",
          isPopular: true,
          features: [
            "20 Custom Post Designs / Month",
            "Meta Paid Ad Setup & Campaign Management",
            "Custom Lead Form Integration Setup",
            "A/B Testing of Ad Creatives & Copy",
            "Website Retargeting Pixel Configurations",
            "Detailed Cost-Per-Lead Conversion Reports",
          ],
          ctaText: "Choose Leads Plan",
        },
        {
          name: "Enterprise Brand Growth",
          price: "₹40,000",
          period: "/month",
          description: "Designed for franchise businesses wanting multi-platform SMM and large-scale ad campaigns.",
          features: [
            "30 Custom Graphic Designs / Month",
            "Facebook, Instagram, LinkedIn, YouTube Setup",
            "High-Converting Video Ad Scripting Support",
            "Weekly Ad Budget Optimization Checks",
            "Competitor Social Strategy Monitoring",
            "Bi-weekly Strategy Review Phone Meetings",
          ],
          ctaText: "Contact for Proposal",
        },
      ]}
      faqs={[
        {
          question: "Does the SMM package price include the Google/Meta ad spend?",
          answer: "No, the package price covers our management, creative design, copywriting, and optimization work. Your ad budget is paid directly to Meta or Google, and we help you set up and optimize that budget.",
        },
        {
          question: "Which social media platforms should my business target?",
          answer: "This depends on your target audience. For consumer services, retail, and local clinics, Facebook and Instagram are usually best. For professional services and B2B products, LinkedIn is generally more effective.",
        },
        {
          question: "How do you track leads from Facebook Ads?",
          answer: "We set up Meta Lead Generation forms that let users send inquiries directly inside the app, and we integrate these forms with email notifications so you can follow up with prospects quickly.",
        },
        {
          question: "How long does it take for paid social ads to generate leads?",
          answer: "Paid social ads can begin generating impressions and lead inquiries within 24 to 48 hours of your campaigns going live after Google/Meta review.",
        },
        {
          question: "Do you create video content and Reels?",
          answer: "Yes, we write scripts and design visual templates for video reels. We can also edit raw video clips your team records into short, social-ready formats.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Web Development" },
        { href: "/web-design-services", label: "Web Design" },
        { href: "/seo-services", label: "SEO Services" },
      ]}
    />
  );
}
