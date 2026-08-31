export interface InternalLinkRule {
  sourceCategory: "Blog" | "Service Page" | "Industry Page";
  targetUrl: string;
  targetCategory: "Service Page" | "Industry Page" | "Contact/CTA";
  recommendedAnchorTexts: string[];
  contextNote: string;
}

export const INTERNAL_LINK_RULES: InternalLinkRule[] = [
  {
    sourceCategory: "Blog",
    targetUrl: "/custom-website-development",
    targetCategory: "Service Page",
    recommendedAnchorTexts: [
      "custom website development services",
      "custom web application engineering",
      "bespoke Next.js development agency"
    ],
    contextNote: "Links blog readers to core custom web development service page."
  },
  {
    sourceCategory: "Blog",
    targetUrl: "/dynamic-website-development",
    targetCategory: "Service Page",
    recommendedAnchorTexts: [
      "dynamic website development company",
      "database-driven web application services",
      "custom CMS web development"
    ],
    contextNote: "Links technical blog articles to dynamic website development service page."
  },
  {
    sourceCategory: "Service Page",
    targetUrl: "/industries/real-estate",
    targetCategory: "Industry Page",
    recommendedAnchorTexts: [
      "real estate website development company",
      "property portal web engineering",
      "real estate lead generation websites"
    ],
    contextNote: "Links core web services to real estate vertical solutions."
  },
  {
    sourceCategory: "Service Page",
    targetUrl: "/industries/ecommerce",
    targetCategory: "Industry Page",
    recommendedAnchorTexts: [
      "custom ecommerce website development",
      "headless shopify nextjs store development",
      "scalable ecommerce web applications"
    ],
    contextNote: "Links core web services to ecommerce vertical solutions."
  },
  {
    sourceCategory: "Industry Page",
    targetUrl: "/contact",
    targetCategory: "Contact/CTA",
    recommendedAnchorTexts: [
      "Book a Free Architecture Call",
      "Request a Custom Web Project Quote",
      "Speak with a Senior Web Architect"
    ],
    contextNote: "Direct conversion link from industry pages to lead capture form."
  }
];

export function getInternalLinkForKeyword(keyword: string): { url: string; anchorText: string } | null {
  const normalized = keyword.toLowerCase().trim();

  if (normalized.includes("custom website") || normalized.includes("custom web")) {
    return { url: "/custom-website-development", anchorText: "custom website development services" };
  }
  if (normalized.includes("dynamic website") || normalized.includes("cms")) {
    return { url: "/dynamic-website-development", anchorText: "dynamic website development company" };
  }
  if (normalized.includes("real estate") || normalized.includes("property")) {
    return { url: "/industries/real-estate", anchorText: "real estate website development services" };
  }
  if (normalized.includes("ecommerce") || normalized.includes("e-commerce")) {
    return { url: "/industries/ecommerce", anchorText: "custom e-commerce website development" };
  }
  if (normalized.includes("travel") || normalized.includes("tour")) {
    return { url: "/industries/travel-tourism", anchorText: "custom travel website development" };
  }
  
  return { url: "/contact", anchorText: "Book a Technical Architecture Call" };
}

export function generateStructuredInternalLinkChain(blogTitle: string): {
  serviceLink: { url: string; label: string };
  industryLink: { url: string; label: string };
  ctaLink: { url: string; label: string };
} {
  return {
    serviceLink: {
      url: "/custom-website-development",
      label: "Explore Custom Website Development Services",
    },
    industryLink: {
      url: "/industries/ecommerce",
      label: "Discover Enterprise E-Commerce Solutions",
    },
    ctaLink: {
      url: "/contact",
      label: "Book a Free 30-Minute Architecture Call",
    },
  };
}
