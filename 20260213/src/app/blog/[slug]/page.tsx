import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GhostService, Resource } from '@/lib/ghost';
import { Button, ResourceCard } from '@/components/ui';
import { getBlogCategoryStyle } from '@/config/blog-categories';
import { formatDate, sanitizeHtml } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo';
import { GTMResourceViewTracker } from '@/components/analytics';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await GhostService.getBlogPostBySlug(slug);
    if (!post) {
      return { title: '文章不存在' };
    }

    const ogImage = post.feature_image || `${siteConfig.url}/opengraph-image`;
    const description = post.excerpt || '望周知部落格文章';

    return {
      title: `${post.title} - 部落格`,
      description,
      openGraph: {
        title: post.title,
        description,
        url: `${siteConfig.url}/blog/${slug}`,
        type: 'article',
        publishedTime: post.published_at,
        modifiedTime: post.updated_at || post.published_at,
        authors: [siteConfig.author],
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        images: [ogImage],
      },
      alternates: {
        canonical: `${siteConfig.url}/blog/${slug}`,
      },
    };
  } catch {
    return { title: '文章載入中' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post: Resource | null = null;
  let relatedPosts: Resource[] = [];

  try {
    [post, relatedPosts] = await Promise.all([
      GhostService.getBlogPostBySlug(slug),
      GhostService.getRelatedBlogPosts(slug, 3).catch(() => []),
    ]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
  }

  if (!post) {
    notFound();
  }

  // 取得部落格分類（blog- 開頭的 tag）
  const blogTag = post.tags.find(tag => tag.slug.startsWith('blog-'));
  const categoryName = blogTag?.name?.replace(/^blog-/, '') || '文章';
  const categorySlug = blogTag?.slug || '';
  const style = getBlogCategoryStyle(categorySlug);

  const breadcrumbItems = [
    { name: '首頁', href: '/' },
    { name: '部落格', href: '/blog' },
    ...(blogTag ? [{ name: categoryName, href: `/blog/category/${categorySlug}` }] : []),
    { name: post.title, href: `/blog/${slug}` },
  ];

  return (
    <>
      <ArticleJsonLd resource={post} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <GTMResourceViewTracker
        itemId={post.slug}
        itemName={post.title}
        category={categoryName}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 文章標題區 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <span className="text-5xl mr-4">{style.icon}</span>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                      {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3">
                      {blogTag && (
                        <Link
                          href={`/blog/category/${categorySlug}`}
                          className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: style.color }}
                        >
                          {categoryName}
                        </Link>
                      )}
                      <span className="text-sm text-gray-500">
                        發布於 {formatDate(post.published_at)}
                      </span>
                      {post.reading_time && (
                        <span className="text-sm text-gray-500">
                          約 {post.reading_time} 分鐘閱讀
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {post.excerpt && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {post.excerpt}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 文章內容 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="p-8">
                {post.html ? (
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-a:text-blue-600 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.html) }}
                  />
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>暫無內容</p>
                  </div>
                )}
              </div>
            </div>

            {/* 相關文章 */}
            {relatedPosts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">相關文章</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <ResourceCard
                      key={relatedPost.id}
                      resource={relatedPost}
                      type="blog"
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 操作按鈕 */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button as="link" href="/blog" variant="primary">
                返回部落格
              </Button>
              {blogTag && (
                <Button as="link" href={`/blog/category/${categorySlug}`} variant="outline">
                  瀏覽更多{categoryName}文章
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
