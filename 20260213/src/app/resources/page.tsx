import { Metadata } from 'next';
import Link from 'next/link';
import { GhostService, Resource, Category } from '@/lib/ghost';
import { ResourceCard, PageHeader } from '@/components/ui';
import { getCategoryStyle } from '@/config/categories';

export const metadata: Metadata = {
  title: '所有資源',
  description: '瀏覽所有台灣在地優質資源，從數位學習到政府服務，應有盡有',
};

export default async function ResourcesPage() {
  let allResources: Resource[] = [];
  let allCategories: Category[] = [];

  try {
    [allResources, allCategories] = await Promise.all([
      GhostService.getAllResources().catch(() => []),
      GhostService.getAllCategories().catch(() => []),
    ]);
  } catch (error) {
    console.error('Error fetching resources:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="所有資源"
        description="發現台灣各類優質資源，從數位學習到政府服務，讓每個人都能享受台灣的優質服務"
      />

      {/* 分類篩選 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-blue-400 text-white rounded-full font-medium">
              全部資源 ({allResources.length})
            </span>
            {allCategories.map((category) => {
              const style = getCategoryStyle(category.name);
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium flex items-center"
                >
                  <span className="mr-2">{style.icon}</span>
                  {category.name} ({category.count})
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 資源列表 */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">暫無資源</h3>
              <p className="text-gray-600 mb-6">目前還沒有發布任何資源，請稍後再來查看。</p>
              <Link
                href="/"
                className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium"
              >
                返回首頁
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
