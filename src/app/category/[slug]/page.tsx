import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GhostService, Resource, Category } from '@/lib/ghost';
import Link from 'next/link';
import { categoryConfig } from '@/config/categories';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const [categoryResources, allCategories] = await Promise.all([
    GhostService.getResourcesByCategory(params.slug),
    GhostService.getAllCategories()
  ]);
  
  const category = allCategories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    return {
      title: '分類不存在 - 望周知',
      description: '您所查找的分類不存在'
    };
  }

  return {
    title: `${category.name} - 望周知`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [categoryResources, allCategories] = await Promise.all([
    GhostService.getResourcesByCategory(params.slug),
    GhostService.getAllCategories()
  ]);

  const category = allCategories.find(cat => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  const config = categoryConfig[category.name] || categoryConfig['預設'];

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

      <div className="py-16" style={{ background: `linear-gradient(135deg, ${config.color}15 0%, ${config.color}05 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div 
                className="p-6 rounded-2xl"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <span className="text-6xl">{config.icon}</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              {category.description || config.description}
            </p>
            
            <div className="text-center">
              <div className="font-bold text-2xl" style={{ color: config.color }}>
                {categoryResources.length}
              </div>
              <div className="text-gray-600">個資源</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categoryResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryResources.map((resource: Resource) => (
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
                          {category.name}
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
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">{config.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name} 分類暫無資源
              </h3>
              <p className="text-gray-600 mb-6">
                這個分類目前還沒有任何資源，請稍後再來查看
              </p>
              <Link 
                href="/categories"
                className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium"
              >
                瀏覽其他分類
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
