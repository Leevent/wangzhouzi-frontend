import { MetadataRoute } from 'next';
import { GhostService } from '@/lib/ghost';
import { siteConfig } from '@/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // 靜態頁面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/external-resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // 動態資源頁面
  let resourcePages: MetadataRoute.Sitemap = [];
  try {
    const resources = await GhostService.getAllResources();
    resourcePages = resources.map((resource) => ({
      url: `${baseUrl}/resource/${resource.slug}`,
      lastModified: new Date(resource.updated_at || resource.published_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating resource sitemap:', error);
  }

  // 動態分類頁面
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await GhostService.getAllCategories();
    categoryPages = categories.map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error generating category sitemap:', error);
  }

  // 動態部落格文章頁面
  let blogPostPages: MetadataRoute.Sitemap = [];
  try {
    const blogPosts = await GhostService.getBlogPosts();
    blogPostPages = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating blog post sitemap:', error);
  }

  // 動態部落格分類頁面
  let blogCategoryPages: MetadataRoute.Sitemap = [];
  try {
    const blogCategories = await GhostService.getBlogCategories();
    blogCategoryPages = blogCategories.map((category) => ({
      url: `${baseUrl}/blog/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error generating blog category sitemap:', error);
  }

  return [...staticPages, ...resourcePages, ...categoryPages, ...blogPostPages, ...blogCategoryPages];
}
