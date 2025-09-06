import { Metadata } from 'next';
import { GhostService, Category } from '@/lib/ghost';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '分類瀏覽 - 望周知',
  description: '依照不同分類瀏覽台灣在地優質資源',
};

const categoryConfig: { [key: string]: { 
  icon: string; 
  color: string; 
  description: string;
} } = {
  '數位學習': { 
    icon: '📚', 
    color: '#E57373',
    description: '免費的線上課程、電子書籍、數位雜誌等學習資源'
  },
  '政府服務': { 
    icon: '🏛️', 
    color: '#64B5F6',
    description: '各級政府機關提供的便民服務與線上申辦系統'
  },
  '社會福利': { 
    icon: '🤝', 
    color: '#81C784',
    description: '社會福利資源、補助計畫、弱勢關懷等相關服務'
  },
  '技能培訓': { 
    icon: '💡', 
    color: '#FFB74D',
    description: '職業訓練、技能認證、專業進修等培訓機會'
  },
  '數位工具': { 
    icon: '🌐', 
    color: '#BA68C8',
    description: '免費軟體、線上工具、數位服務等實用資源'
  },
  '預設': { 
    icon: '📋', 
    color: '#78909C',
    description: '其他優質資源'
  }
};

export default async function CategoriesPage() {
  const allCategories = await GhostService.getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-red-400">望周知</Link>
              <span className="ml-3 text-sm text-gray-600">希望每個人都能知道</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-400 font-medium">首頁</Link>
              <Link href="/resources" className="text-gray-700 hover:text-blue-400 font-medium">所有資源</Link>
              <Link href="/categories" className="text-blue-400 font-medium">分類瀏覽</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">資源分類瀏覽</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              我們將台灣的優質資源依據不同領域進行分類，讓您能快速找到所需的服務與協助
            </p>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">所有分類</h2>
            <p className="text-lg text-gray-600">探索我們完整的資源分類</p>
          </div>
          
          {allCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allCategories.map((category: Category) => {
                const config = categoryConfig[category.name] || categoryConfig['預設'];
                
                return (
                  <Link 
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block h-full"
                  >
                    <div className="bg-white rounded-xl border border-gray-200 p-6 h-full hover:shadow-lg transition-all hover:border-blue-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div 
                          className="p-3 rounded-lg mr-4"
                          style={{ backgroundColor: `${config.color}20` }}
                        >
                          <span className="text-2xl">{config.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">
                            {category.name}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {category.count} 個資源
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                        {category.description || config.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-sm font-medium"
                          style={{ color: config.color }}
                        >
                          查看所有資源 →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">暫無分類</h3>
              <p className="text-gray-600">目前還沒有建立任何分類</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
