// src/app/page.tsx
import { Metadata } from 'next';
import { GhostService } from '@/lib/ghost';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '望周知 - 台灣在地優質資源平台',
  description: '希望每個人都能知道台灣的優質資源與服務',
  keywords: ['台灣', '資源', '政府服務', '教育', '民間組織'],
};

// 分類對應的圖示和顏色
const categoryConfig: { [key: string]: { icon: string; color: string; description: string } } = {
  '數位學習': { icon: '📚', color: '#E57373', description: '免費線上課程、電子書、數位雜誌' },
  '政府服務': { icon: '🏛️', color: '#64B5F6', description: '各級政府提供的便民服務' },
  '社會福利': { icon: '🤝', color: '#81C784', description: '社福資源、補助計畫' },
  '技能培訓': { icon: '💡', color: '#FFB74D', description: '職訓、認證、進修機會' },
  '數位工具': { icon: '🌐', color: '#BA68C8', description: '免費軟體、線上工具' },
  '預設': { icon: '📋', color: '#78909C', description: '其他優質資源' }
};

export default async function HomePage() {
  // 從 Ghost 獲取資料
  const [featuredResources, allCategories, allResources] = await Promise.all([
    GhostService.getFeaturedResources(3),
    GhostService.getAllCategories(),
    GhostService.getAllResources()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 導航列 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-400">望周知</h1>
              <span className="ml-3 text-sm text-gray-600">希望每個人都能知道</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-400 font-medium">
                首頁
              </Link>
              <Link href="/resources" className="text-gray-700 hover:text-blue-400 font-medium">
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

      {/* 主要內容 */}
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-100 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              望周知
            </h1>
            <p className="text-xl text-red-400 font-semibold mb-6">
              希望每個人都能知道
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              發掘台灣在地的優質資源與服務！從<strong>免費數位圖書館</strong>到<strong>正規大學課程</strong>，
              從<strong>政府便民服務</strong>到<strong>社會福利資源</strong>，
              我們整理這些珍貴資源，讓每個人都能輕鬆享受台灣的優質服務。
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/resources" 
                className="bg-blue-400 text-white px-8 py-3 rounded-lg hover:bg-blue-500 transition-colors font-semibold"
              >
                探索資源
              </Link>
              <Link 
                href="/categories" 
                className="border-2 border-red-400 text-red-400 px-8 py-3 rounded-lg hover:bg-red-400 hover:text-white transition-colors font-semibold"
              >
                瀏覽分類
              </Link>
            </div>
          </div>
        </section>

        {/* 統計資訊 */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {allResources.length}
                </div>
                <div className="text-gray-600">優質資源</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-red-400 mb-2">
                  {allCategories.length}
                </div>
                <div className="text-gray-600">資源分類</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  100%
                </div>
                <div className="text-gray-600">免費使用</div>
              </div>
            </div>
          </div>
        </section>

        {/* 特色資源 */}
        {featuredResources.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  本週推薦資源
                </h2>
                <p className="text-lg text-gray-600">
                  精選台灣優質的免費資源，馬上開始使用！
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredResources.map((resource) => {
                  const category = resource.primary_tag?.name || '預設';
                  const config = categoryConfig[category] || categoryConfig['預設'];
                  
                  return (
                    <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <span className="text-3xl mr-3">{config.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
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
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {resource.excerpt}
                        </p>
                        
                        <Link 
                          href={`/resource/${resource.slug}`}
                          className="inline-block bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors font-medium"
                        >
                          查看詳情
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 資源分類 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                資源分類
              </h2>
              <p className="text-lg text-gray-600">
                我們整理了台灣各類優質資源，讓您能快速找到所需的服務與協助
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCategories.map((category) => {
                const config = categoryConfig[category.name] || categoryConfig['預設'];
                
                return (
                  <Link 
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all hover:border-blue-300"
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">{config.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {category.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {category.count} 個資源
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description || config.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 最新資源 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                最新資源
              </h2>
              <p className="text-lg text-gray-600">
                最新加入的優質資源，持續更新中
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allResources.slice(0, 4).map((resource) => {
                const category = resource.primary_tag?.name || '預設';
                const config = categoryConfig[category] || categoryConfig['預設'];
                
                return (
                  <div key={resource.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-lg flex-1">
                        {resource.title}
                      </h3>
                      <span 
                        className="ml-3 px-2 py-1 text-xs font-medium text-white rounded"
                        style={{ backgroundColor: config.color }}
                      >
                        {category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {resource.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(resource.published_at).toLocaleDateString('zh-TW')}
                      </span>
                      <Link 
                        href={`/resource/${resource.slug}`}
                        className="text-blue-400 hover:text-blue-500 font-medium text-sm"
                      >
                        查看詳情 →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/resources"
                className="inline-block bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium"
              >
                查看所有資源
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-400">關於望周知</h3>
              <p className="text-gray-300 leading-relaxed">
                我們致力於整合台灣在地優質資源，讓每個人都能享有平等的資訊獲取機會，共同建設更美好的社會。
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-400">快速連結</h3>
              <ul className="space-y-2">
                <li><Link href="/resources" className="text-gray-300 hover:text-white">所有資源</Link></li>
                <li><Link href="/categories" className="text-gray-300 hover:text-white">分類瀏覽</Link></li>
                <li><a href="https://iwantyouknow.zeabur.app/ghost" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">管理後台</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-400">聯絡資訊</h3>
              <p className="text-gray-300">
                📧 contact@wangzhouzi.tw<br/>
                📞 歡迎透過 GitHub 聯繫<br/>
                📍 台灣
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              &copy; 2025 望周知 - 台灣在地優質資源平台. 讓優質資源被看見。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}