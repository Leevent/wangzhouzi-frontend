import { Metadata } from 'next';
import { externalResources, resourceStats } from '@/config/external-resources';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: '推薦資源',
  description: '精選國內外優質免費數位資源，包含圖書館、電子報、科技媒體與開放式課程',
};

export default function ExternalResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="推薦資源"
        description="精選國內外優質免費數位資源，讓您的學習之路更加豐富"
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
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors font-medium flex items-center"
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
                      className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all group"
                    >
                      <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-500 transition-colors">
                        {resource.name}
                        <span className="ml-2 text-gray-400 group-hover:text-blue-400">↗</span>
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 說明區塊 */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              知道更多好資源嗎？
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              如果您知道其他優質的免費資源，歡迎與我們分享。
              我們會評估後加入推薦清單，讓更多人受益。
            </p>
            <a
              href="mailto:contact@leevent.co"
              className="inline-block bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium"
            >
              推薦資源
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
