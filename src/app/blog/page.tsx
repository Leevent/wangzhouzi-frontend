import { Metadata } from 'next';
import { GhostService } from '@/lib/ghost';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '部落格 - 望周知',
  description: '閱讀關於台灣資源、數位服務使用心得和最新消息的文章',
};

export default async function BlogPage() {
  const [featuredPosts, allPosts] = await Promise.all([
    GhostService.getAllBlogPosts().then(posts => posts.filter(post => post.featured).slice(0, 3)),
    GhostService.getAllBlogPosts()
  ]);

  const recentPosts = allPosts.slice(0, 6);

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
              <Link href="/categories" className="text-gray-700 hover:text-blue-400 font-medium">分類瀏覽</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-400 font-medium">關於我們</Link>
              <span className="text-blue-400 font-medium">部落格</span>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📝 望周知部落格
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            分享台灣優質資源的使用心得、深度分析和最新消息。
            讓我們一起探索台灣數位服務的美好，分享實用的使用技巧。
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="#recent-posts" 
              className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium"
            >
              閱讀最新文章
            </Link>
            <Link 
              href="/resources" 
              className="border-2 border-purple-400 text-purple-400 px-6 py-3 rounded-lg hover:bg-purple-400 hover:text-white transition-colors font-medium"
            >
              探索資源
            </Link>
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ⭐ 精選文章
              </h2>
              <p className="text-lg text-gray-600">
                編輯推薦的優質文章
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <article key={post.id} className={`group ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 h-full">
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          {post.primary_tag && (
                            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm font-medium mr-3">
                              {post.primary_tag.name}
                            </span>
                          )}
                          <span className="bg-red-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                            精選
                          </span>
                          <span className="text-sm text-gray-500 ml-auto">
                            {new Date(post.published_at).toLocaleDateString('zh-TW')}
                          </span>
                        </div>
                        
                        <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-blue-400 font-medium text-sm">
                            閱讀更多 →
                          </span>
                          {post.reading_time && (
                            <span className="text-xs text-gray-500">
                              約 {post.reading_time} 分鐘閱讀
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="recent-posts" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              📚 最新文章
            </h2>
            <p className="text-lg text-gray-600">
              最新發布的文章和使用心得
            </p>
          </div>
          
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          {post.primary_tag && (
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                              {post.primary_tag.name}
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            {new Date(post.published_at).toLocaleDateString('zh-TW')}
                          </span>
                        </div>
                        
                        <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-blue-400 font-medium text-sm">
                            閱讀更多 →
                          </span>
                          {post.reading_time && (
                            <span className="text-xs text-gray-500">
                              {post.reading_time} 分鐘
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                還沒有文章
              </h3>
              <p className="text-gray-600 mb-6">
                我們正在準備精彩的內容，請稍後再來查看
              </p>
              <Link 
                href="/resources"
                className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium"
              >
                先去探索資源
              </Link>
            </div>
          )}
        </div>
      </section>

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
