import { Metadata } from 'next';
import Link from 'next/link';
import { GhostService, Resource, Category } from '@/lib/ghost';
import { ResourceCard, PageHeader, Button, BlogCategoryCard } from '@/components/ui';
import { BreadcrumbJsonLd, CollectionPageJsonLd } from '@/components/seo';
import { getBlogCategoryStyle } from '@/config/blog-categories';

export const metadata: Metadata = {
  title: '部落格',
  description: '望周知部落格 - 分享台灣優質資源的使用心得與最新資訊',
};

export default async function BlogPage() {
  let blogPosts: Resource[] = [];
  let blogCategories: Category[] = [];

  try {
    [blogPosts, blogCategories] = await Promise.all([
      GhostService.getBlogPosts().catch(() => []),
      GhostService.getBlogCategories().catch(() => []),
    ]);
  } catch (error) {
    console.error('Error fetching blog data:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbJsonLd
        items={[
          { name: '首頁', href: '/' },
          { name: '部落格', href: '/blog' },
        ]}
      />
      <CollectionPageJsonLd
        name="部落格"
        description="望周知部落格 - 分享台灣優質資源的使用心得與最新資訊"
        url="/blog"
        items={blogPosts.slice(0, 10).map((post) => ({
          name: post.title,
          url: `/blog/${post.slug}`,
          description: post.excerpt,
          image: post.feature_image,
        }))}
      />
      <PageHeader
        title="部落格"
        description="分享台灣優質資源的使用心得與最新資訊"
      />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 分類篩選標籤 */}
          {blogCategories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">文章分類</h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="px-4 py-2 bg-blue-400 text-white rounded-full text-sm font-medium hover:bg-blue-500 transition-colors"
                >
                  全部文章
                </Link>
                {blogCategories.map((category) => {
                  const style = getBlogCategoryStyle(category.slug);
                  return (
                    <Link
                      key={category.id}
                      href={`/blog/category/${category.slug}`}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center gap-2"
                    >
                      <span>{style.icon}</span>
                      <span>{category.name}</span>
                      <span className="text-gray-400">({category.count})</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* 文章列表 */}
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <ResourceCard key={post.id} resource={post} type="blog" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                部落格即將推出
              </h3>
              <p className="text-gray-600 mb-6">
                我們正在準備精彩的內容，敬請期待！
              </p>
              <Button as="link" href="/resources" variant="primary">
                先瀏覽資源
              </Button>
            </div>
          )}

          {/* 分類區塊 */}
          {blogCategories.length > 0 && blogPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                探索文章分類
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {blogCategories.map((category) => (
                  <BlogCategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
