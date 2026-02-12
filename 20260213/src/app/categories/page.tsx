import { Metadata } from 'next';
import { GhostService, Category } from '@/lib/ghost';
import { CategoryCard, PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: '分類瀏覽',
  description: '按類別瀏覽台灣在地優質資源',
};

export default async function CategoriesPage() {
  let allCategories: Category[] = [];

  try {
    allCategories = await GhostService.getAllCategories().catch(() => []);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="分類瀏覽"
        description="我們整理了台灣各類優質資源，讓您能快速找到所需的服務與協助"
      />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">暫無分類</h3>
              <p className="text-gray-600">目前還沒有建立任何分類。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
