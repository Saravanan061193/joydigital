export const SITE_URL = "https://joydigital.in";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const LOCALBUSINESS_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const BUSINESS_INFO = {
  name: "Joy Digital",
  legalName: "Joy Digital Growth Agency",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/images/logo.webp`,
  image: `${SITE_URL}/assets/images/hero-banner.webp`,
  description: "Grow your business with Joy Digital. We build high-converting, fast Next.js websites and data-driven SEO solutions for global clients.",
  telephone: "+91-9080026133",
  email: "saravanan061193@gmail.com",
  address: {
    "@type": "PostalAddress",
    "streetAddress": "RUBY SHOBHA CASTLE, 10D, Old Perungalathur",
    "addressLocality": "Tambaram, Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600063",
    "addressCountry": "IN"
  },
  geo: {
    "@type": "GeoCoordinates",
    "latitude": 12.9256049,
    "longitude": 80.0885059
  },
  areaServed: [
    { "@type": "City", "name": "Madurai" },
    { "@type": "City", "name": "Chennai" },
    { "@type": "State", "name": "Tamil Nadu" },
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Worldwide" }
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61590372457559",
    "https://www.youtube.com/@Joydigital2026",
    "https://www.linkedin.com/in/saravanan-l-34a861154/"
  ],
  services: [
    "Custom Website Development",
    "Website Design",
    "Web Development",
    "SEO Services",
    "Local SEO",
    "Digital Marketing",
    "Logo Design"
  ]
};

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function getOrganizationEntity() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    "name": BUSINESS_INFO.name,
    "legalName": BUSINESS_INFO.legalName,
    "url": BUSINESS_INFO.url,
    "logo": {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      "url": BUSINESS_INFO.logo,
      "caption": "Joy Digital Logo"
    },
    "image": BUSINESS_INFO.image,
    "description": BUSINESS_INFO.description,
    "telephone": BUSINESS_INFO.telephone,
    "email": BUSINESS_INFO.email,
    "address": BUSINESS_INFO.address,
    "areaServed": BUSINESS_INFO.areaServed,
    "sameAs": BUSINESS_INFO.sameAs,
    "knowsAbout": BUSINESS_INFO.services
  };
}

export function getLocalBusinessEntity() {
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": LOCALBUSINESS_ID,
    "name": BUSINESS_INFO.name,
    "url": BUSINESS_INFO.url,
    "logo": BUSINESS_INFO.logo,
    "image": BUSINESS_INFO.image,
    "telephone": BUSINESS_INFO.telephone,
    "email": BUSINESS_INFO.email,
    "address": BUSINESS_INFO.address,
    "geo": BUSINESS_INFO.geo,
    "areaServed": BUSINESS_INFO.areaServed,
    "sameAs": BUSINESS_INFO.sameAs,
    "parentOrganization": { "@id": ORGANIZATION_ID }
  };
}

export function getWebSiteEntity() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    "url": BUSINESS_INFO.url,
    "name": BUSINESS_INFO.name,
    "publisher": { "@id": ORGANIZATION_ID }
  };
}

export function getWebPageEntity(params: {
  url: string;
  name: string;
  description: string;
  isHomepage?: boolean;
  hasBreadcrumb?: boolean;
  hasFaq?: boolean;
}) {
  const pageId = params.isHomepage ? `${SITE_URL}/#webpage` : `${params.url}#webpage`;
  
  const entity: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": pageId,
    "url": params.url,
    "name": params.name,
    "description": params.description,
    "isPartOf": { "@id": WEBSITE_ID },
    "about": { "@id": ORGANIZATION_ID }
  };

  if (params.hasBreadcrumb && !params.isHomepage) {
    entity.breadcrumb = { "@id": `${params.url}#breadcrumb` };
  }

  return entity;
}

export function getBreadcrumbEntity(params: {
  url: string;
  items: BreadcrumbItem[];
}) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${params.url}#breadcrumb`,
    "itemListElement": params.items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.item.startsWith("http") ? item.item : `${SITE_URL}${item.item.startsWith("/") ? "" : "/"}${item.item}`
    }))
  };
}

export function getServiceEntity(params: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: Array<Record<string, string>>;
}) {
  return {
    "@type": "Service",
    "@id": `${params.url}#service`,
    "name": params.name,
    "description": params.description,
    "url": params.url,
    "serviceType": params.serviceType || params.name,
    "provider": { "@id": ORGANIZATION_ID },
    "areaServed": params.areaServed || BUSINESS_INFO.areaServed
  };
}

export function getBlogPostingEntity(params: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorRole?: string;
  authorUrl?: string;
}) {
  return {
    "@type": "BlogPosting",
    "@id": `${params.url}#article`,
    "mainEntityOfPage": { "@id": `${params.url}#webpage` },
    "headline": params.headline,
    "description": params.description,
    "image": params.image || BUSINESS_INFO.image,
    "datePublished": params.datePublished,
    "dateModified": params.dateModified || params.datePublished,
    "author": {
      "@type": "Person",
      "name": params.authorName || "Saravanan L",
      "jobTitle": params.authorRole || "Technical Web Specialist",
      "url": params.authorUrl || `${SITE_URL}/about`
    },
    "publisher": { "@id": ORGANIZATION_ID },
    "url": params.url
  };
}

export function getFaqEntity(params: {
  url: string;
  faqs: FaqItem[];
}) {
  return {
    "@type": "FAQPage",
    "@id": `${params.url}#faq`,
    "mainEntity": params.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function getWebApplicationEntity(params: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
}) {
  return {
    "@type": "WebApplication",
    "@id": `${params.url}#app`,
    "name": params.name,
    "description": params.description,
    "url": params.url,
    "applicationCategory": params.applicationCategory || "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "provider": { "@id": ORGANIZATION_ID }
  };
}

export interface BuildGraphOptions {
  url: string;
  title: string;
  description: string;
  isHomepage?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  service?: {
    name: string;
    description: string;
    serviceType?: string;
  };
  blogPosting?: {
    headline: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    authorName?: string;
    authorRole?: string;
  };
  webApp?: {
    name: string;
    description: string;
    applicationCategory?: string;
  };
  faqs?: FaqItem[];
  includeLocalBusiness?: boolean;
  additionalEntities?: Record<string, unknown>[];
}

export function buildPageGraphSchema(options: BuildGraphOptions) {
  const canonicalUrl = options.url.startsWith("http")
    ? options.url
    : `${SITE_URL}${options.url.startsWith("/") ? "" : "/"}${options.url}`;

  const graph: Record<string, unknown>[] = [
    getWebSiteEntity(),
    getOrganizationEntity(),
  ];

  if (options.isHomepage || options.includeLocalBusiness) {
    graph.push(getLocalBusinessEntity());
  }

  const hasBreadcrumbs = Boolean(options.breadcrumbs && options.breadcrumbs.length > 0 && !options.isHomepage);
  const hasFaqs = Boolean(options.faqs && options.faqs.length > 0);

  graph.push(
    getWebPageEntity({
      url: canonicalUrl,
      name: options.title,
      description: options.description,
      isHomepage: options.isHomepage,
      hasBreadcrumb: hasBreadcrumbs,
      hasFaq: hasFaqs,
    })
  );

  if (hasBreadcrumbs && options.breadcrumbs) {
    graph.push(
      getBreadcrumbEntity({
        url: canonicalUrl,
        items: options.breadcrumbs,
      })
    );
  }

  if (options.service) {
    graph.push(
      getServiceEntity({
        url: canonicalUrl,
        name: options.service.name,
        description: options.service.description,
        serviceType: options.service.serviceType,
      })
    );
  }

  if (options.blogPosting) {
    graph.push(
      getBlogPostingEntity({
        url: canonicalUrl,
        headline: options.blogPosting.headline,
        description: options.blogPosting.description,
        image: options.blogPosting.image,
        datePublished: options.blogPosting.datePublished,
        dateModified: options.blogPosting.dateModified,
        authorName: options.blogPosting.authorName,
        authorRole: options.blogPosting.authorRole,
      })
    );
  }

  if (options.webApp) {
    graph.push(
      getWebApplicationEntity({
        url: canonicalUrl,
        name: options.webApp.name,
        description: options.webApp.description,
        applicationCategory: options.webApp.applicationCategory,
      })
    );
  }

  if (hasFaqs && options.faqs) {
    graph.push(
      getFaqEntity({
        url: canonicalUrl,
        faqs: options.faqs,
      })
    );
  }

  if (options.additionalEntities && options.additionalEntities.length > 0) {
    graph.push(...options.additionalEntities);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
