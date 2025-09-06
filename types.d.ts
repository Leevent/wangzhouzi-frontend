declare module '@tryghost/content-api' {
  interface GhostAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  interface GhostPost {
    id: string;
    title: string;
    excerpt: string;
    html: string;
    slug: string;
    featured: boolean;
    created_at: string;
    updated_at: string;
    published_at: string;
    tags?: Array<{
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

  interface GhostTag {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    count?: {
      posts?: number;
    };
  }

  interface GhostAPI {
    posts: {
      browse(options?: any): Promise<GhostPost[]>;
      read(options: any, include?: any): Promise<GhostPost>;
    };
    tags: {
      browse(options?: any): Promise<GhostTag[]>;
    };
  }

  export default class GhostContentAPI {
    constructor(options: GhostAPIOptions);
    posts: GhostAPI['posts'];
    tags: GhostAPI['tags'];
  }
}