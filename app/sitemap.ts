import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://joydigital.in';
  const todayStr = new Date().toISOString().split('T')[0];

  // Target country subdirectory codes
  const countries = ['us', 'uk', 'ae', 'in', 'ca', 'au'];
  
  // Localized routes
  const localizedPaths = ['', '/seo-services', '/website-development', '/contact'];

  // Global static routes that are unified (no country subfolders)
  const unifiedStaticPaths = [
    '/about',
    '/custom-website-development',
    '/dynamic-website-development',
    '/portfolio',
    '/case-studies',
    '/case-studies/chennai-clinic-leads',
    '/case-studies/ecommerce-sales-increase',
    '/case-studies/saas-landing-optimization',
    '/wordpress-to-nextjs-migration',
    '/shopify-vs-headless-nextjs',
    '/offshore-web-development-partner',
    '/blog',
    '/web-design-services',
    '/local-seo-services',
    '/google-business-profile-setup',
    '/google-business-profile-optimization',
    '/social-media-marketing',
    '/logo-design-services',
    '/custom-software-development',
    '/ecommerce-website-development',
    '/free-website-audit',
    '/privacy-policy',
    '/terms-and-conditions',
    '/cookie-policy',
    '/disclaimer',
    '/refund-policy',
    '/free-tools',
    '/gst-calculator',
    '/invoice-generator',
    '/quotation-generator',
    '/qr-code-generator',
    '/whatsapp-link-generator',
    '/seo-audit-tool',
    '/image-compressor',
    '/website-for-insurance-agents',
    '/website-for-hospitals',
    '/website-for-hotels',
    '/website-for-real-estate',
    '/website-for-tours-and-travels',
    '/website-for-schools',
    '/website-for-ecommerce',
    '/website-for-small-business',
    '/website-for-solar-companies',
    '/website-for-textile-manufacturers',
    '/website-for-manufacturing-companies',
    '/website-for-law-firms',
    '/website-for-consulting-companies',
    '/website-for-logistics-and-shipping',
    '/website-for-export-and-import',
    '/website-for-marketing-agencies',
    '/website-for-luxury-brands',
    '/website-design-company-madurai',
    '/web-development-company-madurai',
    '/website-development-company-madurai',
    '/seo-company-madurai',
    '/seo-services-madurai',
    '/digital-marketing-agency-madurai',
    '/local-seo-madurai',
    '/website-design-company-chennai',
    '/website-design-company-in-chennai',
    '/web-development-company-chennai',
    '/website-development-company-chennai',
    '/affordable-web-design-agency-chennai',
    '/digital-marketing-agency-in-chennai',
    '/seo-company-chennai',
    '/seo-services-chennai',
    '/seo-services-in-chennai',
    '/website-design-company-coimbatore',
    '/seo-company-coimbatore',
  ];

  // 1. Generate sitemap records for unified static routes
  const unifiedRoutes = unifiedStaticPaths.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: todayStr,
    changeFrequency: 'weekly' as const,
    priority: route.startsWith('/case-studies/') ? 0.6 : 0.7,
  }));

  // 2. Helper to get languages alternate mapping for a localized route
  const getAlternates = (routePath: string) => {
    const langs: Record<string, string> = {
      'x-default': `${baseUrl}${routePath}`,
      'en-us': `${baseUrl}/us${routePath}`,
      'en-gb': `${baseUrl}/uk${routePath}`,
      'en-ae': `${baseUrl}/ae${routePath}`,
      'en-in': `${baseUrl}/in${routePath}`,
      'en-ca': `${baseUrl}/ca${routePath}`,
      'en-au': `${baseUrl}/au${routePath}`,
    };
    return { languages: langs };
  };

  // 3. Generate sitemap records for localized routes (Default Global version + Country versions)
  const regionalRoutes: MetadataRoute.Sitemap = [];

  localizedPaths.forEach((routePath) => {
    // A. Add Default/Global version (priority 1.0 for home, 0.8 for services)
    regionalRoutes.push({
      url: `${baseUrl}${routePath}`,
      lastModified: todayStr,
      changeFrequency: 'weekly' as const,
      priority: routePath === '' ? 1.0 : 0.8,
      alternates: getAlternates(routePath),
    });

    // B. Add Country-specific versions
    countries.forEach((country) => {
      regionalRoutes.push({
        url: `${baseUrl}/${country}${routePath}`,
        lastModified: todayStr,
        changeFrequency: 'weekly' as const,
        priority: routePath === '' ? 0.9 : 0.8,
        alternates: getAlternates(routePath),
      });
    });
  });

  // 4. Fetch blog posts dynamically (unified root level, excluding Draft, Archived, or Noindex posts)
  const blogPosts = await getAllPosts();
  const indexableBlogPosts = blogPosts.filter(
    (post) =>
      post.status !== "Draft" &&
      post.status !== "Archived" &&
      !post.robots?.toLowerCase().includes("noindex")
  );

  const blogRoutes = indexableBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.lastUpdatedDate || post.date || todayStr,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...regionalRoutes,
    ...unifiedRoutes,
    ...blogRoutes
  ];
}
