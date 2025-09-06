import Link from 'next/link';

export default function NotFound() {
  const suggestions = [
    {
      title: '🏠 返回首頁',
      description: '回到望周知首頁，探索台灣優質資源',
      href: '/',
      color: 'bg-blue-400 hover:bg-blue-500'
    },
    {
      title: '📚 瀏覽所有資源',
      description: '查看我們收錄的所有台灣優質資源',
      href: '/resources',
      color: 'bg-green-400 hover:bg-green-500'
    },
    {
      title: '🗂️ 分類瀏覽',
      description: '依分類尋找您需要的特定類型資源',
      href: '/categories',
      color: 'bg-purple-400 hover:bg-purple-500'
    },
    {
      title: '🔍 搜尋資源',
      description: '使用關鍵字搜尋特定的資源',
      href: '/search',
      color: 'bg-orange-400 hover:bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
              <Link href="/categories" className="text-gray-700 hover:text-blue-400 font-medium">分類瀏覽</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-400 font-medium">關於我們</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="text-8xl mb-4">🔍</div>
            <div className="text-6xl font-bold text-gray-400 mb-2">404</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              找不到頁面
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              抱歉，您所尋找的頁面可能已經移動、刪除，或者從未存在。
              不過別擔心，讓我們幫您找到需要的資源！
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {suggestions.map((suggestion, index) => (
              <Link
                key={index}
                href={suggestion.href}
                className="group block"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300 transform hover:-translate-y-1">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {suggestion.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {suggestion.description}
                    </p>
                    <div className={`inline-block px-4 py-2 text-white rounded-lg transition-colors font-medium ${suggestion.color}`}>
                      立即前往
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🔍 或者直接搜尋
            </h2>
            <p className="text-gray-600 mb-6">
              輸入關鍵字，我們幫您找到相關的台灣優質資源
            </p>
            <form action="/search" method="GET" className="flex max-w-md mx-auto">
              <input
                type="text"
                name="q"
                placeholder="搜尋資源..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-400 text-white rounded-r-lg hover:bg-blue-500 transition-colors font-medium"
              >
                搜尋
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8">
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
