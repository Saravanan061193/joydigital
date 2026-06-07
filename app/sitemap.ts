import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://joydigital.in';
  
  // Define static pages
  const routes = [
    '',
    '/website-development',
    '/web-design-services',
    '/seo-services',
    '/local-seo-services',
    '/social-media-marketing',
    '/logo-design-services',
    '/google-business-profile-setup',
    '/about',
    '/portfolio',
    '/case-studies',
    '/blog',
    '/contact',
    '/seo-services-usa',
    '/seo-services-uk',
    '/seo-services-uae',
    '/website-development-usa',
    '/website-development-uk',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
  
  return routes;
}
