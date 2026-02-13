import { Metadata } from 'next';
import { taiwanHistoryResources, historyResourceStats, getResourceTypeIcon, getAccessTypeLabel } from '@/config/taiwan-history-resources';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: '台灣歷史數位資源',
  description: '精選台灣歷史數位典藏、老照片、地方志、原住民族文化等珍貴資源，探索台灣的過去與文化',
  keywords: ['台灣歷史', '數位典藏', '老照片', '地方志', '原住民族', '日治時期'],
};

export default function HistoryResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="台灣歷史數位資源"
        description="探索台灣的過去與文化，收錄數位典藏、老照片、地方志書等珍貴資源"
      >
        <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
          <span>{historyResourceStats.totalCategories} 個分類</span>
          <span>{historyResourceStats.totalResources} 個資源</span>
          <span>更新於 {historyResourceStats.lastUpdated}</span>
        </div>
      </PageHeader>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 分類導航 */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {taiwanHistoryResources.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-amber-50 hover:border-amber-300 transition-colors font-medium flex items-center"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </a>
              ))}
            </div>
          </div>

          {/* 資源分類列表 */}
          <div className="space-y-16">
            {taiwanHistoryResources.map((category) => (
              <section key={category.id} id={category.id}>
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                    {category.nameEn && (
                      <p className="text-sm text-gray-400">{category.nameEn}</p>
                    )}
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-amber-300 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-amber-600 transition-colors flex-1">
                          {resource.name}
                          <span className="ml-2 text-gray-400 group-hover:text-amber-500">↗</span>
                        </h3>
                        <span className="text-lg ml-2" title={resource.resourceType}>
                          {getResourceTypeIcon(resource.resourceType)}
                        </span>
                      </div>
                      {resource.nameEn && (
                        <p className="text-xs text-gray-400 mb-2">{resource.nameEn}</p>
                      )}
                      {resource.institution && (
                        <p className="text-sm text-amber-600 mb-2">{resource.institution}</p>
                      )}
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          {resource.language.map((lang, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-gray-100 rounded">
                              {lang === 'zh-TW' ? '中文' : lang === 'ja' ? '日文' : '英文'}
                            </span>
                          ))}
                        </span>
                        <span className={`px-2 py-0.5 rounded ${
                          resource.accessType === 'free'
                            ? 'bg-green-100 text-green-700'
                            : resource.accessType === 'partial'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {getAccessTypeLabel(resource.accessType)}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 時代導覽區塊 */}
          <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              依時代探索台灣歷史
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: '史前時代', icon: '🏺', color: 'bg-amber-100', years: '~1624' },
                { name: '荷西時期', icon: '⚓', color: 'bg-orange-100', years: '1624-1662' },
                { name: '明鄭時期', icon: '🏯', color: 'bg-green-100', years: '1662-1683' },
                { name: '清領時期', icon: '🏛️', color: 'bg-yellow-100', years: '1683-1895' },
                { name: '日治時期', icon: '🏭', color: 'bg-red-100', years: '1895-1945' },
                { name: '戰後時期', icon: '🏢', color: 'bg-blue-100', years: '1945-今' },
              ].map((era) => (
                <div
                  key={era.name}
                  className={`${era.color} rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <span className="text-2xl mb-2 block">{era.icon}</span>
                  <h4 className="font-semibold text-gray-900 text-sm">{era.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{era.years}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 說明區塊 */}
          <div className="mt-12 bg-amber-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              發現更多台灣歷史資源？
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              如果您知道其他珍貴的台灣歷史數位資源，歡迎與我們分享。
              讓更多人能夠認識台灣的歷史與文化。
            </p>
            <a
              href="mailto:contact@leevent.co"
              className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
              推薦資源
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
