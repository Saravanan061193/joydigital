import type { Metadata } from "next";
import { getSeoPageByPath, getAllKeywords, SeoPageMapping, SeoKeyword } from "./seoKeywords";
import { buildPageGraphSchema, FaqItem } from "./seo/schema";

export interface DynamicSeoResult {
  metadata: Metadata;
  graphSchema: Record<string, unknown>;
  jsonLdSchemas: Record<string, unknown>[];
  pageMapping: SeoPageMapping | null;
  assignedKeywords: {
    primary: SeoKeyword | null;
    secondary: SeoKeyword[];
    longtail: SeoKeyword[];
  };
}

export async function generatePageSeo(pagePath: string, defaultTitle?: string, defaultDescription?: string): Promise<DynamicSeoResult> {
  const pageMapping = await getSeoPageByPath(pagePath);
  const allKeywords = await getAllKeywords();

  const baseUrl = "https://joydigital.in";
  const canonical = `${baseUrl}${pagePath === "/" ? "" : pagePath}`;

  let primaryKw: SeoKeyword | null = null;
  const secondaryKws: SeoKeyword[] = [];
  const longtailKws: SeoKeyword[] = [];

  if (pageMapping) {
    if (pageMapping.primary_keyword_id) {
      primaryKw = allKeywords.find(k => k.id === pageMapping.primary_keyword_id) || null;
    }
    if (pageMapping.secondary_keyword_ids) {
      pageMapping.secondary_keyword_ids.forEach(id => {
        const found = allKeywords.find(k => k.id === id);
        if (found) secondaryKws.push(found);
      });
    }
    if (pageMapping.longtail_keyword_ids) {
      pageMapping.longtail_keyword_ids.forEach(id => {
        const found = allKeywords.find(k => k.id === id);
        if (found) longtailKws.push(found);
      });
    }
  }

  const keywordStrings: string[] = [
    ...(primaryKw ? [primaryKw.keyword] : []),
    ...secondaryKws.map(k => k.keyword),
    ...longtailKws.map(k => k.keyword),
    "Joy Digital",
    "Custom Web Development",
    "Next.js Agency"
  ];

  const title = pageMapping?.title_template || defaultTitle || "Custom Web Development & Engineering Services | Joy Digital";
  const description = pageMapping?.meta_description || defaultDescription || "Joy Digital engineers high-performance custom Next.js web applications, headless CMS, and full-stack digital solutions for global enterprises.";

  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: keywordStrings,
    alternates: {
      canonical,
      languages: {
        "x-default": canonical,
        "en-us": `${baseUrl}/us${pagePath === "/" ? "" : pagePath}`,
        "en-gb": `${baseUrl}/uk${pagePath === "/" ? "" : pagePath}`,
        "en-ae": `${baseUrl}/ae${pagePath === "/" ? "" : pagePath}`,
        "en-in": `${baseUrl}/in${pagePath === "/" ? "" : pagePath}`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Joy Digital Agency",
      title,
      description,
      images: [
        {
          url: `${baseUrl}/assets/images/hero-banner.webp`,
          width: 1200,
          height: 630,
          alt: primaryKw?.keyword || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/assets/images/hero-banner.webp`],
      creator: "@joydigital",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };

  const isHomepage = pagePath === "/" || pagePath === "";
  const faqs: FaqItem[] = pageMapping?.faq_schema ? pageMapping.faq_schema.map(f => ({ question: f.question, answer: f.answer })) : [];

  const graphSchema = buildPageGraphSchema({
    url: canonical,
    title,
    description,
    isHomepage,
    includeLocalBusiness: true,
    service: {
      name: pageMapping?.h1 || title,
      description: description,
      serviceType: primaryKw?.keyword || "Web Engineering",
    },
    faqs: faqs.length > 0 ? faqs : undefined,
  });

  return {
    metadata,
    graphSchema,
    jsonLdSchemas: [graphSchema],
    pageMapping,
    assignedKeywords: {
      primary: primaryKw,
      secondary: secondaryKws,
      longtail: longtailKws,
    },
  };
}
