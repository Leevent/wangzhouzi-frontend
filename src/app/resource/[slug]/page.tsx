import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GhostService, Resource } from '@/lib/ghost';
import Link from 'next/link';

const categoryConfig: { [key: string]: { icon: string; color: string } } = {
  '數位學習': { icon: '📚', color: '#E57373' },
  '政府服務': { icon: '🏛️', color: '#64B5F6' },
  '社會福利': { icon: '🤝', color: '#81C784' },
  '技能培訓': { icon: '💡', color: '#FFB74D' },
  '數位工具': { icon: '🌐', color: '#BA68C8' },
  '預設': { icon: '📋', color: '#78909C' }
};

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

  // 獲取相關資源
  const relatedResources = category !== '預設' 
    ? await GhostService.getResourcesByCategory(resource.primary_tag?.slug || '')
    : [];
  
  const filteredRelatedResources = relatedResources
    .filter(r => r.id !== resource.id)
    .slice(0, 3);

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
              <Link href="/blog" className="text-gray-700 hover:text-blue-400 font-medium">部落格</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-400 font-medium">關於我們</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 麵包屑導航 */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">首頁</Link>
              </li>
              <li>
                <span className="text-gray-400 mx-2">/</span>
                <Link href="/resources" className="text-gray-500 hover:text-gray-700">所有資源</Link>
              </li>
              {resource.primary_tag && (
                <li>
                  <span className="text-gray-400 mx-2">/</span>
                  <Link 
                    href={`/category/${resource.primary_tag.slug}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {resource.primary_tag.name}
                  </Link>
                </li>
              )}
              <li>
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-900 font-medium">{resource.title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 資源標題區域 */}
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
                      {resource.reading_time && (
                        <span className="text-sm text-gray-500">
                          約 {resource.reading_time} 分鐘閱讀
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">資源簡介</h2>
                <p className="text-gray-800 leading-relaxed text-lg">
                  {resource.excerpt}
                </p>
              </div>
            </div>
          </div>

          {/* 詳細內容區域 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">詳細資訊</h2>
              <div 
                className="prose prose-lg max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-p:text-gray-800 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-li:text-gray-800 prose-li:leading-relaxed
                prose-ul:text-gray-800 prose-ol:text-gray-800
                prose-blockquote:text-gray-700 prose-blockquote:border-blue-300
                prose-code:text-blue-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: resource.html }}
              />
            </div>
          </div>

          {/* 標籤區域 */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">相關標籤</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map(tag => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 相關資源 */}
          {filteredRelatedResources.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">相關資源</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredRelatedResources.map((relatedResource: Resource) => {
                  const relatedCategory = relatedResource.primary_tag?.name || '預設';
                  const relatedConfig = categoryConfig[relatedCategory] || categoryConfig['預設'];
                  
                  return (
                    <article key={relatedResource.id} className="group">
                      <Link href={`/resource/${relatedResource.slug}`} className="block">
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-blue-300">
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-2">{relatedConfig.icon}</span>
                            <span 
                              className="inline-block px-2 py-1 text-xs font-medium text-white rounded"
                              style={{ backgroundColor: relatedConfig.color }}
                            >
                              {relatedCategory}
                            </span>
                          </div>
                          
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {relatedResource.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {relatedResource.excerpt}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              {new Date(relatedResource.published_at).toLocaleDateString('zh-TW')}
                            </span>
                            <span className="text-blue-400 font-medium text-sm">
                              查看詳情 →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* 操作按鈕 */}
          <div className="flex justify-center space-x-4 mt-8">
            <Link
              href="/resources"
              className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium"
            >
              瀏覽更多資源
            </Link>
            <Link
              href={`/category/${resource.primary_tag?.slug || ''}`}
              className="border-2 border-blue-400 text-blue-400 px-6 py-3 rounded-lg hover:bg-