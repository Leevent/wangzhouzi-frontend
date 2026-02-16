import GhostContentAPI from '@tryghost/content-api';

// Ghost API 連接配置
// 注意：API 金鑰必須透過環境變數設定，不可硬編碼
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL || 'https://iwantyouknow.zeabur.app',
  key: process.env.GHOST_CONTENT_API_KEY || '',
  version: 'v5.0'
});

// ============================================
// 類型定義
// ============================================

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
  tags: Tag[];
  primary_tag?: Tag;
  feature_image?: string;
  reading_time?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// ============================================
// 後備資料（API 失敗時使用）
// ============================================

const FALLBACK_RESOURCES: Resource[] = [
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

const FALLBACK_CATEGORIES: Category[] = [
  { id: '1', name: '數位學習', slug: 'digital-learning', description: '免費線上課程和學習資源', count: 1 },
  { id: '2', name: '技能培訓', slug: 'skills-training', description: '職業訓練和技能認證', count: 1 },
  { id: '3', name: '社會福利', slug: 'social-welfare', description: '社福資源和補助申請', count: 1 },
  { id: '4', name: '政府服務', slug: 'government-services', description: '政府便民服務', count: 0 }
];

// 部落格分類後備資料
const FALLBACK_BLOG_CATEGORIES: Category[] = [
  { id: 'b1', name: '教學', slug: 'blog-教學', description: '教學文章與指南', count: 0 },
  { id: 'b2', name: '心得', slug: 'blog-心得', description: '使用心得與分享', count: 0 },
  { id: 'b3', name: '新聞', slug: 'blog-新聞', description: '最新消息與動態', count: 0 },
  { id: 'b4', name: '資源介紹', slug: 'blog-資源介紹', description: '優質資源推薦', count: 0 }
];

// ============================================
// Ghost API 服務
// ============================================

export class GhostService {
  // 獲取所有資源（排除部落格文章）
  static async getAllResources(): Promise<Resource[]> {
    try {
      const posts = await api.posts.browse({
        limit: 'all',
        include: 'tags',
        filter: 'tag:-hash-blog+visibility:public',
        order: 'published_at DESC'
      });
      return posts as Resource[];
    } catch (error) {
      console.error('Error fetching resources:', error);
      return FALLBACK_RESOURCES;
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

  // 獲取所有資源分類（排除部落格分類）
  static async getAllCategories(): Promise<Category[]> {
    try {
      const tags = await api.tags.browse({
        limit: 'all',
        filter: 'visibility:public',
        order: 'name ASC'
      });

      const allResources = await this.getAllResources();

      // 過濾掉 blog 相關的 tag
      return tags
        .filter(tag => !tag.slug?.startsWith('blog-') && tag.slug !== 'hash-blog')
        .map(tag => ({
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
      return FALLBACK_CATEGORIES;
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
      const allResources = await this.getAllResources();
      const lowerQuery = query.toLowerCase();
      return allResources.filter(resource =>
        resource.title.toLowerCase().includes(lowerQuery) ||
        resource.excerpt.toLowerCase().includes(lowerQuery)
      );
    }
  }

  // 獲取單一資源
  static async getResourceBySlug(slug: string): Promise<Resource | null> {
    try {
      const post = await api.posts.read({ slug }, { include: 'tags' });
      return post as Resource;
    } catch (error) {
      console.error('Error fetching resource:', error);
      const allResources = await this.getAllResources();
      return allResources.find(resource => resource.slug === slug) || null;
    }
  }

  // 獲取所有部落格文章（使用 #blog internal tag）
  static async getBlogPosts(): Promise<Resource[]> {
    try {
      const posts = await api.posts.browse({
        limit: 'all',
        include: 'tags',
        filter: 'tag:hash-blog+visibility:public',
        order: 'published_at DESC'
      });
      return posts as Resource[];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  // 獲取部落格分類
  static async getBlogCategories(): Promise<Category[]> {
    try {
      const tags = await api.tags.browse({
        limit: 'all',
        filter: 'visibility:public',
        order: 'name ASC'
      });

      const blogPosts = await this.getBlogPosts();

      // 只取 blog- 開頭的 tag
      return tags
        .filter(tag => tag.slug?.startsWith('blog-'))
        .map(tag => ({
          id: tag.id!,
          name: tag.name!.replace(/^blog-/, ''), // 移除 blog- 前綴顯示
          slug: tag.slug!,
          description: tag.description || '',
          count: blogPosts.filter(post =>
            post.tags.some(t => t.slug === tag.slug)
          ).length
        }));
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      return FALLBACK_BLOG_CATEGORIES;
    }
  }

  // 依分類獲取部落格文章
  static async getBlogPostsByCategory(categorySlug: string): Promise<Resource[]> {
    try {
      const posts = await api.posts.browse({
        limit: 'all',
        include: 'tags',
        filter: `tag:hash-blog+tag:${categorySlug}+visibility:public`,
        order: 'published_at DESC'
      });
      return posts as Resource[];
    } catch (error) {
      console.error('Error fetching blog posts by category:', error);
      // 後備：從所有部落格文章中過濾
      const allBlogPosts = await this.getBlogPosts();
      return allBlogPosts.filter(post =>
        post.tags.some(tag => tag.slug === categorySlug)
      );
    }
  }

  // 獲取單篇部落格文章
  static async getBlogPostBySlug(slug: string): Promise<Resource | null> {
    try {
      const post = await api.posts.read({ slug }, { include: 'tags' });
      // 確認是部落格文章（有 #blog tag）
      const resource = post as Resource;
      const isBlogPost = resource.tags.some(tag => tag.slug === 'hash-blog');
      return isBlogPost ? resource : null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      const allBlogPosts = await this.getBlogPosts();
      return allBlogPosts.find(post => post.slug === slug) || null;
    }
  }

  // 獲取相關部落格文章
  static async getRelatedBlogPosts(slug: string, limit: number = 4): Promise<Resource[]> {
    try {
      const currentPost = await this.getBlogPostBySlug(slug);
      if (!currentPost) return [];

      // 找到部落格分類（blog- 開頭的 tag）
      const blogCategory = currentPost.tags.find(tag => tag.slug.startsWith('blog-'));
      if (!blogCategory) {
        // 沒有分類，返回最新的部落格文章
        const allBlogPosts = await this.getBlogPosts();
        return allBlogPosts.filter(post => post.slug !== slug).slice(0, limit);
      }

      const relatedPosts = await api.posts.browse({
        limit: limit + 1,
        include: 'tags',
        filter: `tag:hash-blog+tag:${blogCategory.slug}+visibility:public+slug:-${slug}`,
        order: 'published_at DESC'
      });

      return (relatedPosts as Resource[]).slice(0, limit);
    } catch (error) {
      console.error('Error fetching related blog posts:', error);
      return [];
    }
  }

  // 獲取相關資源
  static async getRelatedResources(slug: string, limit: number = 4): Promise<Resource[]> {
    try {
      const currentResource = await this.getResourceBySlug(slug);
      if (!currentResource) return [];

      const primaryTag = currentResource.primary_tag?.slug;
      if (!primaryTag) return [];

      const relatedPosts = await api.posts.browse({
        limit: limit + 1,
        include: 'tags',
        filter: `tag:${primaryTag}+visibility:public+slug:-${slug}`,
        order: 'published_at DESC'
      });

      return (relatedPosts as Resource[]).slice(0, limit);
    } catch (error) {
      console.error('Error fetching related resources:', error);
      return [];
    }
  }
}

export default api;
