import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://joydigital.in';
  
  const todayStr = new Date().toISOString().split('T')[0];

  // Define static pages
  const staticRoutes = [
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: todayStr,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Fetch blog posts dynamically
  const blogPosts = getAllPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || todayStr,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Define case studies
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
  
  return [...staticRoutes, ...blogRoutes, ...caseStudiesRoutes];
}
