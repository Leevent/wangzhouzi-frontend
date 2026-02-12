import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GhostService, Resource, Category } from '@/lib/ghost';
import { ResourceCard, PageHeader, Button } from '@/components/ui';
import { getCategoryStyle } from '@/config/categories';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await GhostService.getAllCategories().catch(() => []);
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: '分類不存在' };
  }

  return {
    title: category.name,
    description: category.description || `瀏覽 ${category.name} 分類的所有資源`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  let category: Category | undefined;
  let resources: Resource[] = [];

  try {
    const [categories, categoryResources] = await Promise.all([
      GhostService.getAllCategories().catch(() => []),
      GhostService.getResourcesByCategory(slug).catch(() => []),
    ]);

    category = categories.find((c) => c.slug === slug);
    resources = categoryResources;
  } catch (error) {
    console.error('Error fetching category data:', error);
  }

  if (!category) {
    notFound();
  }

  const style = getCategoryStyle(category.name);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={`${style.icon} ${category.name}`}
        description={category.description || style.description}
      >
        <div className="mt-4">
          <span className="text-gray-500">{resources.length} 個資源</span>
        </div>
      </PageHeader>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">{style.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                此分類暫無資源
              </h3>
              <p className="text-gray-600 mb-6">
                目前這個分類還沒有任何資源，請瀏覽其他分類。
              </p>
              <Button as="link" href="/categories" variant="primary">
                瀏覽其他分類
              </Button>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/categories"
              className="text-blue-400 hover:text-blue-500 font-medium"
            >
              ← 返回所有分類
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
