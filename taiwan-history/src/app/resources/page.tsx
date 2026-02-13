import { Metadata } from 'next';
import { externalResources, resourceStats } from '@/config/external-resources';
import { PageHeader, ResourceCard } from '@/components/ui';

export const metadata: Metadata = {
  title: '數位資源',
  description: '精選台灣歷史數位典藏、老照片、地方志、原住民族文化等珍貴資源',
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="台灣歷史數位資源"
        description="探索台灣的過去與文化，收錄數位典藏、老照片、地方志書等珍貴資源"
      >
        <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
          <span>{resourceStats.totalCategories} 個分類</span>
          <span>{resourceStats.totalResources} 個資源</span>
          <span>更新於 {resourceStats.lastUpdated}</span>
        </div>
      </PageHeader>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 分類導航 */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {externalResources.map((category) => (
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
            {externalResources.map((category) => (
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
                    <ResourceCard key={index} resource={resource} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 說明區塊 */}
          <div className="mt-16 bg-amber-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              發現更多台灣歷史資源？
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              如果您知道其他珍貴的台灣歷史數位資源，歡迎與我們分享。
              讓更多人能夠認識台灣的歷史與文化。
            </p>
            <a
              href="mailto:contact@example.com"
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
