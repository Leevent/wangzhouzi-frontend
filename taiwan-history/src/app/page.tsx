import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { getAllEras, getAllTopics } from '@/config/history-categories';
import { resourceStats } from '@/config/external-resources';
import { Button, EraCard, TopicCard } from '@/components/ui';

export default function HomePage() {
  const eras = getAllEras();
  const topics = getAllTopics();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {siteConfig.name}
          </h1>
          <p className="text-xl md:text-2xl text-amber-600 font-semibold mb-4">
            {siteConfig.slogan}
          </p>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            從史前時代到現代，整合數位典藏、老照片、地方志書等珍貴資源，
            結合部落格、圖庫、互動式時間軸，讓每個人都能認識台灣的歷史與文化。
          </p>

          {/* 搜尋框 */}
          <div className="max-w-xl mx-auto mb-8">
            <form action="/search" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="搜尋歷史事件、人物、地點..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* CTA 按鈕 */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button as="link" href="/timeline" size="lg">
              探索時間軸
            </Button>
            <Button as="link" href="/resources" variant="outline" size="lg">
              數位資源
            </Button>
          </div>
        </div>
      </section>

      {/* 時代導覽 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              依時代探索
            </h2>
            <p className="text-gray-600">
              從史前到現代，一覽台灣歷史脈絡
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {eras.map((era) => (
              <EraCard key={era.name} {...era} />
            ))}
          </div>
        </div>
      </section>

      {/* 統計資訊 */}
      <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-1">
                6
              </div>
              <div className="text-sm md:text-base text-gray-600">歷史時代</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">
                {resourceStats.totalResources}+
              </div>
              <div className="text-sm md:text-base text-gray-600">數位資源</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-red-500 mb-1">
                {topics.length}
              </div>
              <div className="text-sm md:text-base text-gray-600">主題分類</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-1">
                100%
              </div>
              <div className="text-sm md:text-base text-gray-600">免費使用</div>
            </div>
          </div>
        </div>
      </section>

      {/* 歷史主題 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              歷史主題
            </h2>
            <p className="text-gray-600">
              依主題深入探索台灣歷史的不同面向
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics.slice(0, 8).map((topic) => (
              <TopicCard key={topic.name} {...topic} />
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              探索方式
            </h2>
            <p className="text-gray-600">
              多元互動的方式認識台灣歷史
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/timeline" className="group">
              <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all h-full border border-gray-100">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600">
                  互動時間軸
                </h3>
                <p className="text-gray-600">
                  從史前到現代，以時間軸方式瀏覽重要歷史事件
                </p>
              </div>
            </Link>

            <Link href="/gallery" className="group">
              <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all h-full border border-gray-100">
                <div className="text-5xl mb-4">📷</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600">
                  歷史圖庫
                </h3>
                <p className="text-gray-600">
                  珍貴老照片、歷史地圖、文物影像典藏
                </p>
              </div>
            </Link>

            <Link href="/gazetteers" className="group">
              <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all h-full border border-gray-100">
                <div className="text-5xl mb-4">📜</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600">
                  地方志書
                </h3>
                <p className="text-gray-600">
                  各縣市方志、鄉鎮志，深入了解地方歷史
                </p>
              </div>
            </Link>

            <Link href="/resources" className="group">
              <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all h-full border border-gray-100">
                <div className="text-5xl mb-4">🗄️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600">
                  數位典藏
                </h3>
                <p className="text-gray-600">
                  連結各大機構的數位典藏與研究資源
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            一起探索台灣的歷史與文化
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            如果您有珍貴的歷史資料、老照片、或知道其他優質資源，歡迎與我們分享。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="bg-white text-amber-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              了解更多
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-amber-600 transition-colors font-semibold"
            >
              聯絡我們
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
