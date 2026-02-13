import { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { getAllEras, getAllTopics } from '@/config/history-categories';

export const metadata: Metadata = {
  title: '搜尋',
  description: '搜尋台灣歷史文章、圖片、地方志書等資源',
};

export default function SearchPage() {
  const eras = getAllEras();
  const topics = getAllTopics();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="搜尋"
        description="搜尋台灣歷史文章、圖片、地方志書等資源"
      />

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 搜尋框 */}
          <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
            <div className="relative">
              <input
                type="text"
                placeholder="輸入關鍵字搜尋..."
                className="w-full px-6 py-4 pr-12 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 進階篩選 */}
          <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">進階篩選</h2>

            {/* 內容類型 */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">內容類型</h3>
              <div className="flex flex-wrap gap-2">
                {['全部', '文章', '圖片', '地方志書', '外部資源'].map((type) => (
                  <button
                    key={type}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 時代篩選 */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">歷史時代</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  全部時代
                </button>
                {eras.map((era) => (
                  <button
                    key={era.name}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors flex items-center"
                  >
                    <span className="mr-1">{era.icon}</span>
                    {era.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 主題篩選 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">主題分類</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  全部主題
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic.name}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors flex items-center"
                  >
                    <span className="mr-1">{topic.icon}</span>
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 搜尋結果區域 (空狀態) */}
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">開始搜尋</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              輸入關鍵字來搜尋台灣歷史相關的文章、圖片、地方志書等資源。
              您也可以使用上方的篩選功能來縮小搜尋範圍。
            </p>
            <div className="text-sm text-gray-400">
              <p>搜尋功能開發中，敬請期待！</p>
            </div>
          </div>

          {/* 熱門搜尋 */}
          <div className="mt-8 text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-3">熱門搜尋</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {['日治時期', '原住民族', '台北', '老照片', '清代契約', '鐵道'].map((keyword) => (
                <button
                  key={keyword}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-amber-50 hover:border-amber-300 transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
