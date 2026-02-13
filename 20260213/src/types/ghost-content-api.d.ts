// Type declarations for @tryghost/content-api
declare module '@tryghost/content-api' {
  export interface GhostContentAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  export interface PostOrPage {
    id: string;
    uuid: string;
    title: string;
    slug: string;
    html: string;
    comment_id: string;
    feature_image: string | null;
    featured: boolean;
    visibility: string;
    created_at: string;
    updated_at: string;
    published_at: string;
    custom_excerpt: string | null;
    codeinjection_head: string | null;
    codeinjection_foot: string | null;
    custom_template: string | null;
    canonical_url: string | null;
    tags?: Tag[];
    authors?: Author[];
    primary_author?: Author;
    primary_tag?: Tag;
    url: string;
    excerpt: string;
    reading_time: number;
    access: boolean;
    og_image: string | null;
    og_title: string | null;
    og_description: string | null;
    twitter_image: string | null;
    twitter_title: string | null;
    twitter_description: string | null;
    meta_title: string | null;
    meta_description: string | null;
    email_subject: string | null;
  }

  export interface Tag {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    feature_image: string | null;
    visibility: string;
    og_image: string | null;
    og_title: string | null;
    og_description: string | null;
    twitter_image: string | null;
    twitter_title: string | null;
    twitter_description: string | null;
    meta_title: string | null;
    meta_description: string | null;
    codeinjection_head: string | null;
    codeinjection_foot: string | null;
    canonical_url: string | null;
    accent_color: string | null;
    url: string;
  }

  export interface Author {
    id: string;
    name: string;
    slug: string;
    profile_image: string | null;
    cover_image: string | null;
    bio: string | null;
    website: string | null;
    location: string | null;
    facebook: string | null;
    twitter: string | null;
    meta_title: string | null;
    meta_description: string | null;
    url: string;
  }

  export interface BrowseParams {
    limit?: number | 'all';
    page?: number;
    order?: string;
    filter?: string;
    include?: string;
    fields?: string;
  }

  export interface ReadParams {
    id?: string;
    slug?: string;
    include?: string;
    fields?: string;
  }

  export interface PostsAPI {
    browse(options?: BrowseParams): Promise<PostOrPage[]>;
    read(data: ReadParams, options?: BrowseParams): Promise<PostOrPage>;
  }

  export interface PagesAPI {
    browse(options?: BrowseParams): Promise<PostOrPage[]>;
    read(data: ReadParams, options?: BrowseParams): Promise<PostOrPage>;
  }

  export interface TagsAPI {
    browse(options?: BrowseParams): Promise<Tag[]>;
    read(data: ReadParams, options?: BrowseParams): Promise<Tag>;
  }

  export interface AuthorsAPI {
    browse(options?: BrowseParams): Promise<Author[]>;
    read(data: ReadParams, options?: BrowseParams): Promise<Author>;
  }

  export default class GhostContentAPI {
    constructor(options: GhostContentAPIOptions);
    posts: PostsAPI;
    pages: PagesAPI;
    tags: TagsAPI;
    authors: AuthorsAPI;
  }
}
