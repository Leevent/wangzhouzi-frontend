import { Metadata } from 'next';
import { GhostService } from '@/lib/ghost';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '網站地圖 - 望周知',
  description: '望周知網站的完整頁面索引，快速找到您需要的頁面',
};

export default async function SitemapPage() {
  const [allResources, allCategories, blogPosts] = await Promise.all([
    GhostService.getAllResources(),
    GhostService.getAllCategories(),
    GhostService.getAllBlogPosts()
  ]);

  const sitemapSections = [
    {
      title: '主要頁面',
      icon: '🏠',
      links: [
        { name: '首頁', href: '/', description: '望周知首頁，台灣優質資源入口' },
        { name: '所有資源', href: '/resources', description: '瀏覽所有收錄的台灣優質資源' },
        { name: '分類瀏覽', href: '/categories', description: '依分類瀏覽不同類型的資源' },
        { name: '搜尋', href: '/search', description: '使用關鍵字搜尋資源' },
      ]
    },
    {
      title: '資訊頁面',
      icon: 'ℹ️',
      links: [
        { name: '關於我們', href: '/about', description: '了解望周知的使命與願景' },
        { name: '使用指南', href: '/guide', description: '學習如何有效使用平台' },
        { name: '部落格', href: '/blog', description: '閱讀最新文章和使用心得' },
      ]
    },
    {
      title: '其他頁面',
      icon: '📄',
      links: [
        { name: '網站地圖', href: '/sitemap', description: '當前頁面 - 網站完整結構' },
        { name: '管理後台', href: 'https://iwantyouknow.zeabur.app/ghost', description: 'Ghost CMS 管理後台' },
      ]
    }
  ];

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
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-blue-50 via-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🗺️ 網站地圖
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            望周知網站的完整頁面索引。您可以在這裡快速找到任何頁面，
            或了解我們網站的整體結構。
          </p>
          
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">{allResources.length}</div>
              <div className="text-sm text-gray-600">個資源</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{allCategories.length}</div>
              <div className="text-sm text-gray-600">個分類</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{blogPosts.length}</div>
              <div className="text-sm text-gray-600">篇文章</div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {sitemapSections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{section.icon}</span>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                
                <div className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <div key={linkIndex} className="group">
                      <Link 
                        href={link.href}
                        className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all border border-transparent"
                        {...(link.href.startsWith('http') && {
                          target: "_blank",
                          rel: "noopener noreferrer"
                        })}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {link.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {link.description}
                            </p>
                          </div>
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {allCategories.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">🗂️</span>
                <h2 className="text-2xl font-bold text-gray-900">資源分類</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="group block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all border border-transparent"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.count} 個資源
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none"
stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                   </div>
                 </Link>
               ))}
             </div>
           </div>
         )}

         {allResources.length > 0 && (
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
             <div className="flex items-center justify-between mb-6">
               <div className="flex items-center">
                 <span className="text-2xl mr-3">📚</span>
                 <h2 className="text-2xl font-bold text-gray-900">最新資源</h2>
               </div>
               <Link 
                 href="/resources"
                 className="text-blue-400 hover:text-blue-600 font-medium text-sm"
               >
                 查看全部 →
               </Link>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {allResources.slice(0, 8).map((resource) => (
                 <Link
                   key={resource.id}
                   href={`/resource/${resource.slug}`}
                   className="group block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all border border-transparent"
                 >
                   <div className="flex justify-between items-start">
                     <div className="flex-1">
                       <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                         {resource.title}
                       </h3>
                       <p className="text-sm text-gray-600 line-clamp-2">
                         {resource.excerpt}
                       </p>
                       <div className="flex items-center mt-2">
                         {resource.primary_tag && (
                           <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                             {resource.primary_tag.name}
                           </span>
                         )}
                         <span className="text-xs text-gray-500 ml-2">
                           {new Date(resource.published_at).toLocaleDateString('zh-TW')}
                         </span>
                       </div>
                     </div>
                     <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                   </div>
                 </Link>
               ))}
             </div>
           </div>
         )}
       </div>
     </div>

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
