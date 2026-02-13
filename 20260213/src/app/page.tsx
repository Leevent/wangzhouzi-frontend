import { Metadata } from 'next';
import Link from 'next/link';
import { GhostService, Resource, Category } from '@/lib/ghost';
import { ResourceCard, CategoryCard, Button } from '@/components/ui';
import HeroSearch from '@/components/ui/HeroSearch';
import { siteConfig } from '@/config/site';
import { getAllEras, getAllTopics } from '@/config/history-categories';
import { historyResourceStats } from '@/config/taiwan-history-resources';

export const metadata: Metadata = {
  title: `${siteConfig.name} - 探索台灣歷史與文化`,
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

  const eras = getAllEras();
  const topics = getAllTopics();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Hero Section - 台灣歷史主視覺 */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {siteConfig.name}
          </h1>
          <p className="text-lg md:text-xl text-amber-600 font-semibold mb-3">
            {siteConfig.slogan}
          </p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            從史前時代到現代，整合數位典藏、老照片、地方志書等珍貴資源，
            結合部落格、圖庫、互動式時間軸，讓每個人都能認識台灣的過去與文化。
          </p>

          {/* 大型搜尋框 */}
          <HeroSearch placeholder="搜尋歷史事件、人物、地點..." />

          {/* 快速入口 */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Button as="link" href="/timeline" variant="primary">
              探索時間軸
            </Button>
            <Button as="link" href="/history-resources" variant="outline">
              歷史數位資源
            </Button>
          </div>
        </div>
      </section>

      {/* 時代導覽 */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              依時代探索
            </h2>
            <p className="text-gray-600">
              從史前到現代，一覽台灣歷史脈絡
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {eras.map((era) => (
              <Link
                key={era.name}
                href={`/timeline/${era.name === '史前時代' ? 'prehistoric' :
                       era.name === '荷西時期' ? 'dutch-spanish' :
                       era.name === '明鄭時期' ? 'koxinga' :
                       era.name === '清領時期' ? 'qing' :
                       era.name === '日治時期' ? 'japanese' : 'postwar'}`}
                className="group"
              >
                <div
                  className="rounded-xl p-5 text-center hover:shadow-lg transition-all transform hover:-translate-y-1"
                  style={{ backgroundColor: `${era.color}20` }}
                >
                  <span className="text-3xl mb-3 block">{era.icon}</span>
                  <h3 className="font-bold text-gray-900 mb-1">{era.name}</h3>
                  <p className="text-xs text-gray-500">{era.dateRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 統計資訊 */}
      <section className="py-10 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-amber-500 mb-1">
                6
              </div>
              <div className="text-sm md:text-base text-gray-600">歷史時代</div>
            </div>
            <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-orange-500 mb-1">
                {historyResourceStats.totalResources}+
              </div>
              <div className="text-sm md:text-base text-gray-600">數位資源</div>
            </div>
            <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-red-500 mb-1">
                {topics.length}
              </div>
              <div className="text-sm md:text-base text-gray-600">主題分類</div>
            </div>
            <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-green-500 mb-1">
                100%
              </div>
              <div className="text-sm md:text-base text-gray-600">免費使用</div>
            </div>
          </div>
        </div>
      </section>

      {/* 主題分類 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              歷史主題
            </h2>
            <p className="text-gray-600">
              依主題深入探索台灣歷史的不同面向
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics.slice(0, 8).map((topic) => (
              <Link
                key={topic.name}
                href={`/topics/${topic.name}`}
                className="bg-gray-50 rounded-xl p-4 hover:bg-amber-50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center">
                  <span
                    className="text-2xl mr-3 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${topic.color}30` }}
                  >
                    {topic.icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{topic.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button as="link" href="/topics" variant="outline">
              查看所有主題
            </Button>
          </div>
        </div>
      </section>

      {/* 功能區塊 */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              探索方式
            </h2>
            <p className="text-gray-600">
              多元互動的方式認識台灣歷史
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/timeline" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all h-full">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600">
                  互動時間軸
                </h3>
                <p className="text-gray-600 text-sm">
                  從史前到現代，以時間軸方式瀏覽重要歷史事件
                </p>
              </div>
            </Link>

            <Link href="/gallery" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all h-full">
                <div className="text-4xl mb-4">📷</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600">
                  歷史圖庫
                </h3>
                <p className="text-gray-600 text-sm">
                  珍貴老照片、歷史地圖、文物影像典藏
                </p>
              </div>
            </Link>

            <Link href="/gazetteers" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all h-full">
                <div className="text-4xl mb-4">📜</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600">
                  地方志書
                </h3>
                <p className="text-gray-600 text-sm">
                  各縣市方志、鄉鎮志，深入了解地方歷史
                </p>
              </div>
            </Link>

            <Link href="/history-resources" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all h-full">
                <div className="text-4xl mb-4">🗄️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600">
                  數位典藏
                </h3>
                <p className="text-gray-600 text-sm">
                  連結各大機構的數位典藏與研究資源
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 特色資源 */}
      {featuredResources.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                精選文章
              </h2>
              <p className="text-gray-600">
                深入探討台灣歷史與文化的專題文章
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} variant="featured" />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button as="link" href="/blog" variant="primary">
                閱讀更多文章
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            一起探索台灣的歷史與文化
          </h2>
          <p className="text-base md:text-lg text-white opacity-90 max-w-2xl mx-auto mb-6">
            如果您有珍貴的歷史資料、老照片、或知道其他優質資源，歡迎與我們分享。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/about"
              className="bg-white text-amber-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              了解更多
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-amber-600 transition-colors font-semibold"
            >
              聯絡我們
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
