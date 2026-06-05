import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Professional Web Design Services | UI/UX Design | Joy Digital",
  description: "Engage visitors with stunning, conversion-focused website designs and UI/UX layouts. Custom brand guidelines, Figma wireframes, and mobile-first templates.",
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Creative Web Design & UI/UX Services",
  "serviceType": "Web Design",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital Growth Agency",
    "image": "https://joydigitalmarketing.in/assets/images/logo.png",
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
  "description": "Joy Digital provides UI/UX web design, corporate branding, landing page layouts, and mobile interfaces built to drive high user conversion rates.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "12000",
    "highPrice": "65000",
    "offerCount": "3"
  }
};

export default function WebDesignPage() {
  return (
    <ServicePageTemplate
      serviceName="Web Design"
      heroTitle="Stunning, Conversion-Focused UI/UX Web Design Services"
      heroSubtitle="Engage your target audience, communicate your core value proposition clearly, and improve customer trust. We design custom digital interfaces that merge elegant layout systems with high-converting calls-to-action."
      leadSource="Web Design Landing Page"
      overviewTitle="Merging Premium Aesthetics with Intuitive User Experiences"
      overviewContent={
        <div className="space-y-6">
          <p>
            An exceptional website design is more than just a collection of nice graphics. It is a visual communication system that guides your target customer toward taking action—whether that is booking a consultation call, purchasing a product, or sending an enquiry. Poor navigation layouts, illegible typography, and unbalanced color schemes increase user frustration and lead to high bounce rates.
          </p>
          <p>
            At Joy Digital Growth Agency, our design process starts with understanding your customer's pain points. We conduct visual research, build wireframe navigation structures, map out user flows, and construct interactive mockups in Figma. This comprehensive approach ensures that every pixel, typography setting, and spacing variable is optimized to drive conversions.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Mobile-First UI/UX & Visual Hierarchy</h3>
          <p>
            With more than half of global web traffic originating from mobile devices, desktop-only layouts are no longer sufficient. We design layouts using a mobile-first philosophy. This ensures that headers remain compact, text is readable without zooming, buttons are easy to tap, and sections stack logically on smaller viewports.
          </p>
          <p>
            Additionally, we build clear visual hierarchies. We draw attention to your primary offers using high-contrast colors, whitespace, and clear headings. Our designs balance aesthetics with performance, ensuring your brand stands out while maintaining fast load speeds.
          </p>
        </div>
      }
      benefitsTitle="How Professional Web Design Empowers Your Brand"
      benefitsSubtitle="We align our design concepts with your commercial goals to deliver visual assets that build trust and drive conversions."
      benefits={[
        {
          icon: "fa-solid fa-wand-magic-sparkles",
          title: "Custom Brand Layouts",
          description: "We avoid generic, pre-made layouts. Our designs are tailored to your company values, color guidelines, and target industry standards.",
        },
        {
          icon: "fa-solid fa-route",
          title: "Intuitive Navigation Mapping",
          description: "We structure clear menus, submenus, and buttons that allow prospects to find services, pricing, and contact pages in under three clicks.",
        },
        {
          icon: "fa-solid fa-users",
          title: "Empathy-Driven UI/UX",
          description: "By researching how users interact with screens, we position key forms and CTAs where they naturally draw focus and invite clicks.",
        },
        {
          icon: "fa-solid fa-paragraph",
          title: "Optimized Typography Systems",
          description: "We pair clean, readable font hierarchies (like Poppins) with open spacing configurations to improve reading flow on mobile displays.",
        },
        {
          icon: "fa-solid fa-image",
          title: "High-Fidelity Wireframes",
          description: "We build layouts using wireframe prototypes first, allowing you to review and adjust page structures before we write code.",
        },
        {
          icon: "fa-solid fa-chart-line",
          title: "Conversion Optimization",
          description: "We optimize all landing pages for lead capture, using sticky consultation buttons, WhatsApp links, and client logos to build trust.",
        },
      ]}
      processTitle="Our UI/UX Design Process"
      processSubtitle="We guide you through a step-by-step layout design workflow, incorporating your feedback at every milestone."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-magnifying-glass",
          title: "Research & Blueprint",
          description: "We analyze competitor layouts, build target user flows, and map out the sitemap paths for your website.",
        },
        {
          step: "2",
          icon: "fa-solid fa-border-all",
          title: "Wireframe Layout",
          description: "We create black-and-white grid skeletons of your pages to check navigation flow and spacing without layout distractions.",
        },
        {
          step: "3",
          icon: "fa-solid fa-palette",
          title: "UI Design & Assets",
          description: "We inject brand colors, custom graphic assets, high-concept typography, and optimized images into high-fidelity mockups.",
        },
        {
          step: "4",
          icon: "fa-solid fa-arrows-spin",
          title: "Review & Signoff",
          description: "We present interactive design prototypes for your team to review, refine, and approve before we hand them over to development.",
        },
      ]}
      pricingTitle="Clear, Economical Design Tiers"
      pricingSubtitle="Select a package designed to fit your project scope. Transparent pricing with zero hidden costs."
      pricingTiers={[
        {
          name: "Startup Design UI",
          price: "₹12,000",
          description: "Best for small companies that need a clean layout to start their marketing campaigns.",
          features: [
            "Up to 5 Pages Custom UI Design",
            "Figma High-Fidelity Prototypes",
            "Branding Board (Fonts, Colors)",
            "Mobile-Responsive Spacing Setup",
            "2 Rounds of Revision Iterations",
            "Icon Set & Stock Photo Curations",
          ],
          ctaText: "Select Plan",
        },
        {
          name: "Business UI/UX Package",
          price: "₹28,000",
          description: "Perfect for growing brands wanting to redesign their site for better conversions.",
          isPopular: true,
          features: [
            "Up to 10 Pages Custom Design",
            "Interactive Figma Clickable Prototype",
            "Detailed Wireframes & Sitemaps",
            "Custom Vector Graphics & Icons",
            "5 Rounds of Revision Iterations",
            "SEO Landing Page Copy Optimization",
          ],
          ctaText: "Select Plan",
        },
        {
          name: "Enterprise Design System",
          price: "₹55,000+",
          description: "Custom UI/UX setups for large portals, e-commerce stores, and software dashboards.",
          features: [
            "Unlimited Screen/Page Designs",
            "Full Corporate Brand Style Guide",
            "Design Token Specifications",
            "Custom Illustrations & Assets",
            "Unlimited Review Revisions",
            "Developer Handoff Support Meetings",
          ],
          ctaText: "Contact for Proposal",
        },
      ]}
      faqs={[
        {
          question: "Do you design websites in Figma?",
          answer: "Yes, Figma is our primary UI/UX design tool. It allows us to create interactive, clickable layout mockups that you can test on your phone or desktop before development starts.",
        },
        {
          question: "Will you provide the source design files?",
          answer: "Absolutely. Once the project is signed off and completed, we share the links to the Figma source files, including raw graphics, vectors, color palettes, and typography configurations.",
        },
        {
          question: "What happens if I don't like the initial design concepts?",
          answer: "We start by discussing wireframe grids to align on spacing and structure. If the initial color scheme or layout does not meet your expectations, we use your feedback to adjust details in the next round of revisions.",
        },
        {
          question: "Do you provide stock images and custom icons?",
          answer: "Yes. We source license-free commercial stock photos and design custom vector icons that match your brand identity.",
        },
        {
          question: "Is custom web design better than using a pre-made theme?",
          answer: "Pre-made themes are budget-friendly but often bundle bloated layouts, duplicate scripts, and restrict your options. Custom design gives you control over user experience, page speed, and visual appeal.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/website-development", label: "Web Development" },
        { href: "/logo-design-services", label: "Logo Design" },
        { href: "/seo-services", label: "SEO Services" },
      ]}
    />
  );
}
