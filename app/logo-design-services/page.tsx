import React from "react";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Logo Design & Corporate Branding | Joy Digital",
  description: "Joy Digital is a professional logo design company in Chennai, India. We design creative, custom vector logos, brand color boards, and corporate identity sets.",
  alternates: {
    canonical: "https://joydigital.in/logo-design-services",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Professional Logo Design & Branding Services",
  "serviceType": "Graphic Design & Branding Services",
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
  "description": "Joy Digital is a creative branding agency in Chennai, India, delivering high-concept corporate logos, typography systems, and print assets.",
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
      heroTitle="Professional Logo Design & Memorable Brand Identity in Chennai"
      heroSubtitle="Create a memorable first impression with creative, high-concept visual assets. As a leading agency for logo design in Chennai, we design custom brand marks, typography guidelines, color palettes, and matching print layouts that represent your business values."
      leadSource="Logo Design Landing Page"
      overviewTitle="Building Visual Identity Systems that Commend Professional Trust"
      overviewContent={
        <div className="space-y-6">
          <p>
            Your logo is the visual face of your entire company. It is often the first brand asset a prospective client notices when searching for your services online or browsing social media. A poorly designed, low-resolution, or generic logo can make an otherwise professional business appear unestablished, which can hurt conversions. Investing in a professional visual identity is essential for long-term growth.
          </p>
          <p>
            At Joy Digital, a premier <strong>branding agency in chennai</strong>, our design process goes far beyond standard templates and automated clip art. We research your specific industry, review competitor branding layouts in Chennai and across India, and sketch custom logo concepts that represent your core corporate values. This structured design approach ensures that your visual assets are clean, memorable, scalable, and visually appealing.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Complete Brand Systems for Online & Offline Growth</h3>
          <p>
            A consistent brand identity uses matching design elements across all marketing platforms. We provide complete branding packages that include custom typography guides, secondary submarks, and print layouts. This ensures your branding looks unified whether it is displayed on your website, social profiles, business cards, letterheads, or marketing brochures.
          </p>
          <p>
            We deliver all designs in vector formats (SVG, PDF, EPS, AI), allowing you to scale them for any print or digital need—from small website icons to massive outdoor billboards—without losing resolution. This provides you with the creative files needed to represent your business professionally in any commercial setting.
          </p>
          <h3 className="text-lg font-bold text-primary-dark mt-8 mb-4">Color Psychology and Typography Pairings</h3>
          <p>
            Colors and fonts carry emotional weight. Choosing the right color board (using HSL/Hex values) and pairing typography systems helps convey the right message to your target audience. For example, dark blues communicate trust and security, while vibrant oranges communicate creativity and energy. We help select a palette and font pairings that align with your industry standards and target customer expectations.
          </p>
        </div>
      }
      benefitsTitle="How Professional Branding Empowers Your Business"
      benefitsSubtitle="We design custom brand marks and typography systems to help your business stand out in competitive markets."
      benefits={[
        {
          icon: "fa-solid fa-pen-nib",
          title: "Custom Logo Concepts",
          description: "We design custom brand marks based on unique sketches and vector layouts, avoiding generic templates and stock graphics completely.",
        },
        {
          icon: "fa-solid fa-palette",
          title: "Cohesive Color Boards",
          description: "We select color palettes that align with your industry standards and target audience preferences, defining clear HSL and Hex codes.",
        },
        {
          icon: "fa-solid fa-vector-square",
          title: "Vector Source Formats",
          description: "We share all designs in source vector formats (EPS, SVG, PDF, AI), allowing you to scale them from business cards to billboards without pixelation.",
        },
        {
          icon: "fa-solid fa-font",
          title: "Typography Guidelines",
          description: "We pair matching font combinations for headings and body copy, helping ensure your brand presentation is clean, readable, and professional.",
        },
        {
          icon: "fa-solid fa-address-card",
          title: "Print Assets Design",
          description: "We design matching business cards, letterheads, and envelopes to present a professional look during offline corporate meetings in Chennai.",
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
          description: "We discuss your brand values, target audience, color preferences, and review competitor logos in Chennai and across India.",
        },
        {
          step: "2",
          icon: "fa-solid fa-pencil",
          title: "Concept Sketching",
          description: "Our design team sketches initial design concepts, testing different shapes, icons, and structures before digital rendering.",
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
          ctaText: "Select Plan",
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
          ctaText: "Select Plan",
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
          question: "Who owns the copyrights to the logo designs in Chennai?",
          answer: "Once the design project is finalized and payment is completed, you own the full copyrights to the final approved logo designs. We deliver a signed handoff document and share source assets. We can showcase the work in our agency portfolio only with your permission.",
        },
        {
          question: "What files will I receive at the end of the project?",
          answer: "You will receive high-resolution digital files (PNG with transparent backgrounds, JPEG) alongside vector source formats (SVG, PDF, EPS, AI). Vector files allow you to resize the logo for any print size without losing image quality.",
        },
        {
          question: "Can you redesign my existing company logo?",
          answer: "Yes, we can refresh your current logo. We can update elements to make it cleaner, more modern, and mobile-friendly while keeping the core colors and shapes that represent your established brand recognition.",
        },
        {
          question: "How long does a branding project take in India?",
          answer: "A standard Startup Logo package takes 4 to 8 working days. Complete Corporate Brand Identity packages, which include stationery layouts and brand guideline books, take 8 to 15 working days depending on revision speeds.",
        },
        {
          question: "What stationery layouts do you include?",
          answer: "Our standard stationery packages include layouts for business cards, letterheads, and envelopes. If you need custom layouts like brochure designs, menu cards, or email signatures, we can add them to your package customly.",
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
