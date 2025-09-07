import { Metadata } from 'next';
import { GhostService, Resource, Category } from '@/lib/ghost';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '所有資源 - 望周知',
  description: '瀏覽所有台灣在地優質資源',
};

const categoryConfig: { [key: string]: { icon: string; color: string } } = {
  '數位學習': { icon: '📚', color: '#E57373' },
  '政府服務': { icon: '🏛️', color: '#64B5F6' },
  '社會福利': { icon: '🤝', color: '#81C784' },
  '技能培訓': { icon: '💡', color: '#FFB74D' },
  '數位工具': { icon: '🌐', color: '#BA68C8' },
  '圖書館資源': { icon: '📖', color: '#A5D6A7' },
  '開放式課程': { icon: '🎓', color: '#FFCC80' },
  '創業經營': { icon: '💼', color: '#F8BBD9' },
  '預設': { icon: '📋', color: '#78909C' }
};

export default async function ResourcesPage() {
  const [allResources, allCategories] = await Promise.all([
    GhostService.getAllResources(),
    GhostService.getAllCategories()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 導航列 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-red-400">望周知</Link>
              <span className="ml-3 text-sm text-gray-600">希望每個人都能知道</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-400 font-medium">
                首頁
              </Link>
              <Link href="/resources" className="text-blue-400 font-medium">
                所有資源
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-blue-400 font-medium">
                分類瀏覽
              </Link>
              <a 
                href="https://iwantyouknow.zeabur.app/ghost" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                管理後台
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 頁面標題 */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              所有資源
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              發現台灣各類優質資源，從數位學習到政府服務，讓每個人都能享受台灣的優質服務
            </p>
          </div>
        </div>
      </div>

      {/* 分類篩選 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-blue-400 text-white rounded-full font-medium">
              全部資源 ({allResources.length})
            </div>
            {allCategories.map((category: Category) => {
              const config = categoryConfig[category.name] || categoryConfig['預設'];
              return (
                <Link 
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium flex items-center"
                >
                  <span className="mr-2">{config.icon}</span>
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
              {allResources.map((resource: Resource) => {
                const category = resource.primary_tag?.name || '預設';
                const config = categoryConfig[category] || categoryConfig['預設'];
                
                return (
                  <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{config.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">
                            {resource.title}
                          </h3>
                          <span 
                            className="inline-block px-2 py-1 text-xs font-medium text-white rounded"
                            style={{ backgroundColor: config.color }}
                          >
                            {category}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {resource.excerpt}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {new Date(resource.published_at).toLocaleDateString('zh-TW')}
                        </span>
                        <Link 
                          href={`/resource/${resource.slug}`}
                          className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors font-medium text-sm"
                        >
                          查看詳情
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              &copy; 2025 望周知 - 台灣在地優質資源平台. 讓優質資源被看見。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}