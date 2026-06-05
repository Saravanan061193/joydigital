import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Professional Logo Design & Corporate Branding | Joy Digital",
  description: "Establish a memorable business identity with custom logo designs, brand color boards, typography rules, and matching corporate print templates.",
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Professional Logo Design & Branding Services",
  "serviceType": "Graphic Design & Branding Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Joy Digital Growth Agency",
    "image": "https://joydigitalmarketing.in/assets/images/logo.webp",
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
  "description": "Joy Digital is a creative branding agency delivering high-concept corporate logos, typography systems, and print assets.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "5000",
    "highPrice": "25000",
    "offerCount": "3"
  }
};

export default function LogoPage() {
  return (
    <ServicePageTemplate
      serviceName="Logo & Brand Design"
      heroTitle="Professional Logo Design & Memorable Brand Identity Services"
      heroSubtitle="Create a memorable first impression with creative, high-concept visual assets. We design custom brand marks, typography guidelines, color palettes, and matching print layouts that represent your business values."
      leadSource="Logo Design Landing Page"
      overviewTitle="Building Visual Identity Systems that Commend Professional Trust"
      overviewContent={
        <div className="space-y-6">
          <p>
            Your logo is the visual face of your company. It is often the first brand asset a prospect notices when searching for your services online or offline. A poorly designed or low-resolution logo can make an otherwise professional business appear unestablished, which can hurt conversion rates.
          </p>
          <p>
            At Joy Digital Growth Agency, our design process goes beyond standard clip art. We research your industry, review competitor branding, and sketch custom logo concepts that represent your company values. This structured approach helps ensure your visual assets are clean, memorable, and scalable.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Complete Brand Systems for Online & Offline Growth</h3>
          <p>
            A consistent brand identity uses matching elements across all platforms. We provide complete branding packages that include custom typography guides, secondary submarks, and print layouts. This ensures your branding looks consistent on your website, social media, business cards, and brochures.
          </p>
          <p>
            We deliver all designs in vector formats (SVG, PDF, EPS), allowing you to scale them for any print or digital need without losing resolution. This provides you with the creative files needed to represent your business professionally.
          </p>
        </div>
      }
      benefitsTitle="How Professional Branding Empowers Your Business"
      benefitsSubtitle="We design custom brand marks and typography systems to help your business stand out in competitive markets."
      benefits={[
        {
          icon: "fa-solid fa-pen-nib",
          title: "Custom Logo Concepts",
          description: "We design custom brand marks based on sketches and vector layouts, avoiding generic online templates.",
        },
        {
          icon: "fa-solid fa-palette",
          title: "Cohesive Color Boards",
          description: "We select color palettes that align with your industry standards and target audience preferences, defining clear HSL/Hex codes.",
        },
        {
          icon: "fa-solid fa-vector-square",
          title: "Vector Source Formats",
          description: "We share all designs in source vector formats (EPS, SVG, PDF), allowing you to scale them from business cards to billboards.",
        },
        {
          icon: "fa-solid fa-font",
          title: "Typography Guidelines",
          description: "We pair matching font combinations for headings and body copy, helping ensure your brand presentation is clean and readable.",
        },
        {
          icon: "fa-solid fa-address-card",
          title: "Print Assets Design",
          description: "We design matching business cards, letterheads, and envelopes to present a professional look during offline meetings.",
        },
        {
          icon: "fa-solid fa-book",
          title: "Brand Guideline Documents",
          description: "We compile your logos, colors, fonts, and usage rules into a brand style guide, making it easy for your team to use them consistently.",
        },
      ]}
      processTitle="Our Branding Design Workflow"
      processSubtitle="We guide you through a step-by-step branding process, using your feedback to refine each concept."
      processSteps={[
        {
          step: "1",
          icon: "fa-solid fa-clipboard-question",
          title: "Briefing & Competitor Study",
          description: "We discuss your brand values, target audience, color preferences, and review competitor logos.",
        },
        {
          step: "2",
          icon: "fa-solid fa-pencil",
          title: "Concept Sketching",
          description: "Our design team sketches initial design concepts, testing different shapes and structures.",
        },
        {
          step: "3",
          icon: "fa-solid fa-object-ungroup",
          title: "Vector Rendering",
          description: "We refine the approved sketches into digital vector layouts, pairing them with typography options and color swatches.",
        },
        {
          step: "4",
          icon: "fa-solid fa-circle-check",
          title: "Final Handoff Assets",
          description: "We package the final design assets in print-ready formats (PNG, SVG, PDF, EPS) alongside your brand guideline book.",
        },
      ]}
      pricingTitle="Economical Branding Design Plans"
      pricingSubtitle="Select a package designed to fit your business stage. Transparent pricing with zero hidden fees."
      pricingTiers={[
        {
          name: "Startup Logo Plan",
          price: "₹5,000",
          description: "Ideal for new businesses needing a clean, professional logo mark to start operations.",
          features: [
            "2 Creative Custom Logo Concepts",
            "High-Resolution PNG/JPEG Formats",
            "Vector Source Files (SVG, PDF)",
            "1 Primary Color Palette Setup",
            "3 Rounds of Revision Iterations",
            "Business Card Layout Layout",
          ],
          ctaText: "Select Startup Plan",
        },
        {
          name: "Corporate Brand Identity",
          price: "₹12,000",
          description: "Recommended for growing companies that want a consistent look across print and digital media.",
          isPopular: true,
          features: [
            "4 Custom Logo Concepts",
            "Complete Vector Formats (SVG, PDF, EPS)",
            "Secondary Logo Submarks",
            "Typography Guide & Color Boards",
            "Matching Business Card & Letterhead",
            "5 Rounds of Revision Iterations",
          ],
          ctaText: "Select Corporate Plan",
        },
        {
          name: "Enterprise Design System",
          price: "₹25,000+",
          description: "For companies requiring comprehensive brand books, presentation templates, and brochures.",
          features: [
            "Unlimited Logo Concept Iterations",
            "Complete Brand Guideline Book",
            "Business Card, Letterhead, Envelope Layouts",
            "Double-sided Brochure Layout Design",
            "Custom Icons & Social Media Banners",
            "Unlimited Revisions & Call Reviews",
          ],
          ctaText: "Contact for Proposal",
        },
      ]}
      faqs={[
        {
          question: "Who owns the copyrights to the logo designs?",
          answer: "Once the design project is finalized and payment is completed, you own the full copyrights to the final approved logo designs. We can showcase the work in our agency portfolio with your permission.",
        },
        {
          question: "What files will I receive at the end of the project?",
          answer: "You will receive high-resolution digital files (PNG, JPEG) alongside vector source formats (SVG, PDF, EPS). Vector files allow you to resize the logo for any print size without losing image quality.",
        },
        {
          question: "Can you redesign my existing company logo?",
          answer: "Yes, we can refresh your current logo. We can update elements to make it cleaner and more modern while keeping the core colors and shapes that represent your established brand recognition.",
        },
        {
          question: "How long does a branding project take?",
          answer: "A standard Startup Logo package takes 4 to 8 working days. Complete Corporate Brand Identity packages, which include stationery layouts and brand guideline books, take 8 to 15 working days.",
        },
        {
          question: "What stationery layout designs do you include?",
          answer: "Our standard stationery packages include layouts for business cards, letterheads, and envelopes. If you need custom layouts like brochure designs, menu cards, or email signatures, we can add them to your package.",
        },
      ]}
      schemaMarkup={pageSchema}
      crossLinks={[
        { href: "/web-design-services", label: "Web Design" },
        { href: "/website-development", label: "Web Development" },
        { href: "/social-media-marketing", label: "Social Media Marketing" },
      ]}
    />
  );
}
