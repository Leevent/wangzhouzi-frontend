import { Metadata } from 'next';
import { GhostService, Resource, Category } from '@/lib/ghost';
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
      </main>
    </div>
  );
}
