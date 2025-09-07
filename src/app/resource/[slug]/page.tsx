import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GhostService, Resource } from '@/lib/ghost';
import Link from 'next/link';
import { categoryConfig } from '@/config/categories';

interface ResourcePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const resource = await GhostService.getResourceBySlug(params.slug);
  
  if (!resource) {
    return {
      title: '資源不存在 - 望周知',
      description: '您所查找的資源不存在'
    };
  }

  return {
    title: `${resource.title} - 望周知`,
    description: resource.excerpt,
  };
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const resource = await GhostService.getResourceBySlug(params.slug);

  if (!resource) {
    notFound();
  }

  const category = resource.primary_tag?.name || '預設';
  const config = categoryConfig[category] || categoryConfig['預設'];

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
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <span className="text-5xl mr-4">{config.icon}</span>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {resource.title}
                    </h1>
                    <div className="flex items-center space-x-4">
                      <span 
                        className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full"
                        style={{ backgroundColor: config.color }}
                      >
                        {category}
                      </span>
                      <span className="text-sm text-gray-500">
                        發布於 {new Date(resource.published_at).toLocaleDateString('zh-TW')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">資源簡介</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {resource.excerpt}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">詳細資訊</h2>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-a:text-blue-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: resource.html || '' }}
              />
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <Link
              href="/resources"
              className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium"
            >
              瀏覽更多資源
            </Link>
            <Link
              href={`/category/${resource.primary_tag?.slug || ''}`}
              className="border-2 border-blue-400 text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-400 hover:text-white transition-colors font-medium"
            >
              瀏覽{category}分類
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition-colors"
          aria-label="回到頂部"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>
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
