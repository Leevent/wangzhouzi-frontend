 // src/lib/ghost.ts
import GhostContentAPI from '@tryghost/content-api';

// 建立 Ghost API 連接
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL!,
  key: process.env.GHOST_CONTENT_API_KEY!,
  version: 'v5.0'
});

// 資源類型定義
export interface Resource {
  id: string;
  title: string;
  excerpt: string;
  html: string;
  slug: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  published_at: string;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  primary_tag?: {
    id: string;
    name: string;
    slug: string;
  };
  feature_image?: string;
}

// Ghost 服務類別
export class GhostService {
  // 獲取所有文章（資源）
  static async getAllResources(): Promise<Resource[]> {
    try {
      const posts = await api.posts.browse({
        limit: 'all',
        include: 'tags',
        filter: 'visibility:public',
        order: 'published_at DESC'
      });
      
      return posts as Resource[];
    } catch (error) {
      console.error('Error fetching resources:', error);
      return [];
    }
  }

  // 根據分類獲取資源
  static async getResourcesByCategory(categorySlug: string): Promise<Resource[]> {
    try {
      const posts = await api.posts.browse({
        limit: 'all',
        include: 'tags',
        filter: `tag:${categorySlug}+visibility:public`,
        order: 'published_at DESC'
      });
      
      return posts as Resource[];
    } catch (error) {
      console.error('Error fetching resources by category:', error);
      return [];
    }
  }

  // 獲取特色資源
  static async getFeaturedResources(limit: number = 6): Promise<Resource[]> {
    try {
      const posts = await api.posts.browse({
        limit,
        include: 'tags',
        filter: 'featured:true+visibility:public',
        order: 'published_at DESC'
      });
      
      return posts as Resource[];
    } catch (error) {
      console.error('Error fetching featured resources:', error);
      return [];
    }
  }

  // 獲取所有分類標籤
  static async getAllCategories() {
    try {
      const tags = await api.tags.browse({
        limit: 'all',
        filter: 'visibility:public',
        order: 'name ASC'
      });
      
      return tags.map(tag => ({
        id: tag.id!,
        name: tag.name!,
        slug: tag.slug!,
        description: tag.description || '',
        count: tag.count?.posts || 0
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  // 搜尋資源
  static async searchResources(query: string): Promise<Resource[]> {
    try {
      const posts = await api.posts.browse({
        limit: 'all',
        include: 'tags',
        filter: `title:~'${query}',excerpt:~'${query}'+visibility:public`,
        order: 'published_at DESC'
      });
      
      return posts as Resource[];
    } catch (error) {
      console.error('Error searching resources:', error);
      return [];
    }
  }

  // 獲取單一資源詳情
  static async getResourceBySlug(slug: string): Promise<Resource | null> {
    try {
      const post = await api.posts.read(
        { slug },
        { include: 'tags' }
      );
      
      return post as Resource;
    } catch (error) {
      console.error('Error fetching resource:', error);
      return null;
    }
  }
}

export default api;