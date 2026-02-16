import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GhostService, Resource, Category } from '@/lib/ghost';
import { ResourceCard, PageHeader, Button } from '@/components/ui';
import { getBlogCategoryStyle } from '@/config/blog-categories';
import { BreadcrumbJsonLd, CollectionPageJsonLd } from '@/components/seo';

interface BlogCategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await GhostService.getBlogCategories().catch(() => []);
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: '分類不存在' };
  }

  return {
    title: `${category.name} - 部落格`,
    description: category.description || `瀏覽「${category.name}」分類的所有部落格文章`,
  };
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { slug } = await params;
  let category: Category | undefined;
  let posts: Resource[] = [];

  try {
    const [categories, categoryPosts] = await Promise.all([
      GhostService.getBlogCategories().catch(() => []),
      GhostService.getBlogPostsByCategory(slug).catch(() => []),
    ]);

    category = categories.find((c) => c.slug === slug);
    posts = categoryPosts;
  } catch (error) {
    console.error('Error fetching blog category data:', error);
  }

  if (!category) {
    notFound();
  }

  const style = getBlogCategoryStyle(category.slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbJsonLd
        items={[
          { name: '首頁', href: '/' },
          { name: '部落格', href: '/blog' },
          { name: category.name, href: `/blog/category/${slug}` },
        ]}
      />
      <CollectionPageJsonLd
        name={`${category.name} - 部落格`}
        description={category.description || `瀏覽「${category.name}」分類的所有部落格文章`}
        url={`/blog/category/${slug}`}
        items={posts.slice(0, 10).map((post) => ({
          name: post.title,
          url: `/blog/${post.slug}`,
          description: post.excerpt,
          image: post.feature_image,
        }))}
      />
      <PageHeader
        title={`${style.icon} ${category.name}`}
        description={category.description || style.description}
      >
        <div className="mt-4">
          <span className="text-gray-500">{posts.length} 篇文章</span>
        </div>
      </PageHeader>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <ResourceCard key={post.id} resource={post} type="blog" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">{style.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                此分類暫無文章
              </h3>
              <p className="text-gray-600 mb-6">
                目前這個分類還沒有任何文章，請瀏覽其他分類。
              </p>
              <Button as="link" href="/blog" variant="primary">
                返回部落格
              </Button>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="text-blue-400 hover:text-blue-500 font-medium"
            >
              ← 返回部落格首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
