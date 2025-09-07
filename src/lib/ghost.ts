import GhostContentAPI from '@tryghost/content-api';

// 建立 Ghost API 連接
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL || 'https://iwantyouknow.zeabur.app',
  key: process.env.GHOST_CONTENT_API_KEY || '429bdfab434c10e7ff5a4374ab',
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
  reading_time?: number;
}

// 分類類型定義
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
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
      // 返回測試資料，避免頁面崩潰
      return [
        {
          id: '1',
          title: '台灣圖書館數位資源',
          excerpt: '國家圖書館提供豐富的數位圖書、期刊和資料庫，完全免費使用',
          html: '<p>國家圖書館數位資源包含電子書、期刊、論文等豐富內容，提供民眾免費使用。</p>',
          slug: 'taiwan-library-digital-resources',
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: new Date().toISOString(),
          tags: [{ id: '1', name: '數位學習', slug: 'digital-learning' }],
          primary_tag: { id: '1', name: '數位學習', slug: 'digital-learning' }
        },
        {
          id: '2',
          title: '勞動部職業訓練課程',
          excerpt: '政府提供的免費職業訓練課程，包含各種技能培訓和證照輔導',
          html: '<p>勞動部提供多元化的職業訓練課程，協助民眾提升就業技能。</p>',
          slug: 'labor-training-courses',
          featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: new Date().toISOString(),
          tags: [{ id: '2', name: '技能培訓', slug: 'skills-training' }],
          primary_tag: { id: '2', name: '技能培訓', slug: 'skills-training' }
        },
        {
          id: '3',
          title: '衛福部社會福利資源',
          excerpt: '各項社會福利補助申請、長照服務和弱勢關懷資源整合',
          html: '<p>衛福部整合各項社會福利資源，提供民眾便利的申請管道。</p>',
          slug: 'social-welfare-resources',
          featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: new Date().toISOString(),
          tags: [{ id: '3', name: '社會福利', slug: 'social-welfare' }],
          primary_tag: { id: '3', name: '社會福利', slug: 'social-welfare' }
        }
      ];
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
      // 返回相關的測試資料
      const allResources = await this.getAllResources();
      return allResources.filter(resource => 
        resource.primary_tag?.slug === categorySlug || 
        resource.tags.some(tag => tag.slug === categorySlug)
      );
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
      const allResources = await this.getAllResources();
      return allResources.filter(resource => resource.featured).slice(0, limit);
    }
  }

  // 獲取所有分類標籤
  static async getAllCategories(): Promise<Category[]> {
    try {
      const tags = await api.tags.browse({
        limit: 'all',
        filter: 'visibility:public',
        order: 'name ASC'
      });
      
      // 計算每個分類的資源數量
      const allResources = await this.getAllResources();
      
      return tags.map(tag => ({
        id: tag.id!,
        name: tag.name!,
        slug: tag.slug!,
        description: tag.description || '',
        count: allResources.filter(resource => 
          resource.primary_tag?.slug === tag.slug || 
          resource.tags.some(t => t.slug === tag.slug)
        ).length
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      // 返回預設分類並計算實際資源數量
      const allResources = await this.getAllResources();
      return [
        { 
          id: '1', 
          name: '數位學習', 
          slug: 'digital-learning', 
          description: '免費線上課程和學習資源', 
          count: allResources.filter(r => r.primary_tag?.slug === 'digital-learning').length || 1
        },
        { 
          id: '2', 
          name: '技能培訓', 
          slug: 'skills-training', 
          description: '職業訓練和技能認證', 
          count: allResources.filter(r => r.primary_tag?.slug === 'skills-training').length || 1
        },
        { 
          id: '3', 
          name: '社會福利', 
          slug: 'social-welfare', 
          description: '社福資源和補助申請', 
          count: allResources.filter(r => r.primary_tag?.slug === 'social-welfare').length || 1
        },
        { 
          id: '4', 
          name: '政府服務', 
          slug: 'government-services', 
          description: '政府便民服務', 
          count: 0
        }
      ];
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
      // 在測試資料中搜尋
      const allResources = await this.getAllResources();
      return allResources.filter(resource => 
        resource.title.toLowerCase().includes(query.toLowerCase()) ||
        resource.excerpt.toLowerCase().includes(query.toLowerCase())
      );
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
      // 在測試資料中查找
      const allResources = await this.getAllResources();
      return allResources.find(resource => resource.slug === slug) || null;
    }
  }

  // 獲取所有部落格文章
  static async getAllBlogPosts(): Promise<Resource[]> {
    try {
      const posts = await api.posts.browse({
        limit: 'all',
        include: 'tags',
        filter: 'tag:blog+visibility:public',
        order: 'published_at DESC'
      });
      
      return posts as Resource[];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      // 返回測試部落格文章
      return [
        {
          id: 'blog-1',
          title: '如何有效使用台灣數位圖書館資源',
          excerpt: '詳細介紹台灣各大數位圖書館的使用方法和豐富資源，讓您充分利用免費的學習資源。',
          html: '<p>台灣的數位圖書館提供了豐富的學習資源...</p>',
          slug: 'how-to-use-taiwan-digital-libraries',
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: new Date().toISOString(),
          tags: [{ id: 'blog', name: 'blog', slug: 'blog' }],
          primary_tag: { id: 'blog', name: 'blog', slug: 'blog' }
        },
        {
          id: 'blog-2',
          title: '政府數位服務申請完整指南',
          excerpt: '一步步教您如何使用政府數位服務平台，輕鬆完成各種線上申請。',
          html: '<p>政府數位服務讓民眾能夠方便地在線上完成各種申請...</p>',
          slug: 'government-digital-services-guide',
          featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: new Date().toISOString(),
          tags: [{ id: 'blog', name: 'blog', slug: 'blog' }],
          primary_tag: { id: 'blog', name: 'blog', slug: 'blog' }
        }
      ];
    }
  }
}

export default api;