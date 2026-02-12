import { Metadata } from 'next';
import Link from 'next/link';
import { GhostService, Resource, Category } from '@/lib/ghost';
import { ResourceCard, CategoryCard, Button } from '@/components/ui';
import HeroSearch from '@/components/ui/HeroSearch';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} - 台灣在地優質資源平台`,
  description: siteConfig.description,
};

export default async function HomePage() {
  let featuredResources: Resource[] = [];
  let allCategories: Category[] = [];
  let allResources: Resource[] = [];

  try {
    [featuredResources, allCategories, allResources] = await Promise.all([
      GhostService.getFeaturedResources(3).catch(() => []),
      GhostService.getAllCategories().catch(() => []),
      GhostService.getAllResources().catch(() => []),
    ]);
  } catch (error) {
    console.error('Error fetching homepage data:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Hero Section - 大型搜尋框 */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-red-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {siteConfig.name}
          </h1>
          <p className="text-lg md:text-xl text-red-400 font-semibold mb-3">
            {siteConfig.slogan}
          </p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            發掘台灣在地的優質資源與服務，讓每個人都能輕鬆享受免費的優質服務。
          </p>

          {/* 大型搜尋框 */}
          <HeroSearch placeholder="搜尋電子書、線上課程、政府服務..." />

          {/* 快速入口 */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Button as="link" href="/resources" variant="primary">
              探索所有資源
            </Button>
            <Button as="link" href="/external-resources" variant="outline">
              推薦資源
            </Button>
          </div>
        </div>
      </section>

      {/* 統計資訊 */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div className="p-4 md:p-6">
              <div className="text-2xl md:text-4xl font-bold text-blue-400 mb-1">
                {allResources.length}+
              </div>
              <div className="text-sm md:text-base text-gray-600">優質資源</div>
            </div>
            <div className="p-4 md:p-6">
              <div className="text-2xl md:text-4xl font-bold text-red-400 mb-1">
                {allCategories.length}
              </div>
              <div className="text-sm md:text-base text-gray-600">資源分類</div>
            </div>
            <div className="p-4 md:p-6">
              <div className="text-2xl md:text-4xl font-bold text-green-400 mb-1">
                100%
              </div>
              <div className="text-sm md:text-base text-gray-600">免費使用</div>
            </div>
          </div>
        </div>
      </section>

      {/* 特色資源 */}
      {featuredResources.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                本週推薦資源
              </h2>
              <p className="text-gray-600">
                精選台灣優質的免費資源，馬上開始使用！
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 資源分類 */}
      {allCategories.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                資源分類
              </h2>
              <p className="text-gray-600">
                快速找到所需的服務與協助
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {allCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 最新資源 */}
      {allResources.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                最新資源
              </h2>
              <p className="text-gray-600">
                最新加入的優質資源
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {allResources.slice(0, 4).map((resource) => (
                <ResourceCard key={resource.id} resource={resource} variant="compact" />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button as="link" href="/resources" variant="primary">
                查看所有資源
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-400 to-red-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            一起讓台灣變得更美好
          </h2>
          <p className="text-base md:text-lg text-white opacity-90 max-w-2xl mx-auto mb-6">
            如果您知道其他優質的台灣資源，歡迎與我們分享。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/about"
              className="bg-white text-blue-400 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              了解更多
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-400 transition-colors font-semibold"
            >
              聯絡我們
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
