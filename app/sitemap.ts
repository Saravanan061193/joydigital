import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://joydigital.in';
  const todayStr = new Date().toISOString().split('T')[0];

  // Target country subdirectory codes
  const countries = ['us', 'uk', 'ae', 'in'];
  
  // Localized routes
  const localizedPaths = ['', '/seo-services', '/website-development', '/contact'];

  // Global static routes that are unified (no country subfolders)
  const unifiedStaticPaths = [
    '/about',
    '/portfolio',
    '/case-studies',
    '/blog',
    '/free-audit',
    '/privacy-policy',
    '/terms-and-conditions',
    '/cookie-policy',
    '/website-design-company-in-madurai',
    '/web-development-company-in-madurai',
    '/seo-services-in-madurai',
    '/digital-marketing-agency-in-madurai',
    '/google-business-profile-optimization',
    '/ecommerce-website-development',
    '/custom-software-development',
  ];

  // 1. Generate sitemap records for unified static routes
  const unifiedRoutes = unifiedStaticPaths.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: todayStr,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 2. Helper to get languages alternate mapping for a localized route
  const getAlternates = (routePath: string) => {
    const langs: Record<string, string> = {
      'x-default': `${baseUrl}${routePath}`,
      'en-us': `${baseUrl}/us${routePath}`,
      'en-gb': `${baseUrl}/uk${routePath}`,
      'en-ae': `${baseUrl}/ae${routePath}`,
      'en-in': `${baseUrl}/in${routePath}`,
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

  // 4. Fetch blog posts dynamically (unified root level)
  const blogPosts = getAllPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || todayStr,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 5. Define case studies (unified root level)
  const caseStudySlugs = [
    'madurai-clinic-leads',
    'ecommerce-sales-increase',
    'saas-landing-optimization',
  ];
  const caseStudiesRoutes = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/case-studies/${slug}`,
    lastModified: todayStr,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...regionalRoutes,
    ...unifiedRoutes,
    ...blogRoutes,
    ...caseStudiesRoutes
  ];
}

