import { Metadata } from 'next';
import Link from 'next/link';
import { GhostService, Resource, Category } from '@/lib/ghost';
import { ResourceCard, CategoryCard, Button } from '@/components/ui';
import HeroSearch from '@/components/ui/HeroSearch';
import { siteConfig } from '@/config/site';
import { getCategoryStyle } from '@/config/categories';

export const metadata: Metadata = {
  title: `${siteConfig.name} - 台灣在地優質資源平台`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 via-white to-blue-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {siteConfig.name}
          </h1>
          <p className="text-lg md:text-xl text-red-400 font-semibold mb-3">
            {siteConfig.slogan}
          </p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            發掘台灣在地的優質資源與服務！從<strong>免費數位圖書館</strong>到<strong>正規大學課程</strong>，
            從<strong>政府便民服務</strong>到<strong>社會福利資源</strong>，
            我們整理這些珍貴資源，讓每個人都能輕鬆享受台灣的優質服務。
          </p>

          {/* 搜尋框 */}
          <HeroSearch placeholder="搜尋資源、服務、課程..." />

          {/* 快速入口 */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Button as="link" href="/resources" variant="primary">
              探索資源
            </Button>
            <Button as="link" href="/categories" variant="secondary">
              瀏覽分類
            </Button>
            <Button as="link" href="/external-resources" variant="outline">
              外部資源
            </Button>
          </div>
        </div>
      </section>

      {/* 統計資訊 */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="p-4 md:p-6 bg-gray-50 rounded-xl">
              <div className="text-2xl md:text-4xl font-bold text-blue-400 mb-1">
                {allResources.length || '50+'}
              </div>
              <div className="text-sm md:text-base text-gray-600">優質資源</div>
            </div>
            <div className="p-4 md:p-6 bg-gray-50 rounded-xl">
              <div className="text-2xl md:text-4xl font-bold text-red-400 mb-1">
                {allCategories.length || '10+'}
              </div>
              <div className="text-sm md:text-base text-gray-600">資源分類</div>
            </div>
            <div className="p-4 md:p-6 bg-gray-50 rounded-xl">
              <div className="text-2xl md:text-4xl font-bold text-green-400 mb-1">
                55+
              </div>
              <div className="text-sm md:text-base text-gray-600">外部資源</div>
            </div>
            <div className="p-4 md:p-6 bg-gray-50 rounded-xl">
              <div className="text-2xl md:text-4xl font-bold text-purple-400 mb-1">
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

            <div className="text-center mt-8">
              <Button as="link" href="/resources" variant="primary">
                查看所有資源
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* 資源分類 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              資源分類
            </h2>
            <p className="text-gray-600">
              我們整理了台灣各類優質資源，讓您能快速找到所需的服務與協助
            </p>
          </div>

          {allCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {['數位學習', '技能培訓', '社會福利', '政府服務', '圖書資源', '法律諮詢', '醫療健康', '就業服務'].map((name) => {
                const style = getCategoryStyle(name);
                return (
                  <Link
                    key={name}
                    href={`/category/${name}`}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center">
                      <span
                        className="text-2xl mr-3 w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${style.color}30` }}
                      >
                        {style.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-500 transition-colors">
                          {name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="text-center mt-8">
            <Button as="link" href="/categories" variant="outline">
              查看所有分類
            </Button>
          </div>
        </div>
      </section>

      {/* 最新資源 */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              最新資源
            </h2>
            <p className="text-gray-600">
              最新加入的優質資源，持續更新中
            </p>
          </div>

          {allResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allResources.slice(0, 4).map((resource) => (
                <ResourceCard key={resource.id} resource={resource} variant="compact" />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>資源載入中，請稍候...</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Button as="link" href="/resources" variant="primary">
              查看所有資源
            </Button>
          </div>
        </div>
      </section>

      {/* 功能區塊 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              探索方式
            </h2>
            <p className="text-gray-600">
              多種方式幫您找到需要的資源
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/resources" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all h-full">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-500">
                  所有資源
                </h3>
                <p className="text-gray-600 text-sm">
                  瀏覽完整的資源列表，找到您需要的服務
                </p>
              </div>
            </Link>

            <Link href="/categories" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all h-full">
                <div className="text-4xl mb-4">🏷️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-500">
                  分類瀏覽
                </h3>
                <p className="text-gray-600 text-sm">
                  依類別快速找到相關資源
                </p>
              </div>
            </Link>

            <Link href="/external-resources" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all h-full">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-500">
                  外部資源
                </h3>
                <p className="text-gray-600 text-sm">
                  精選電子報、科技部落格、圖書館等優質外部資源
                </p>
              </div>
            </Link>

            <Link href="/search" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all h-full">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-500">
                  搜尋資源
                </h3>
                <p className="text-gray-600 text-sm">
                  輸入關鍵字快速找到所需資源
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-400 to-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            讓優質資源被更多人知道
          </h2>
          <p className="text-base md:text-lg text-white opacity-90 max-w-2xl mx-auto mb-6">
            我們致力於整合台灣在地優質資源，讓每個人都能享有平等的資訊獲取機會。
            如果您知道其他優質資源，歡迎與我們分享！
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/about"
              className="bg-white text-blue-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              了解更多
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-500 transition-colors font-semibold"
            >
              聯絡我們
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
