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
                <p className="text-gray-900 leading-relaxed text-lg">
                  {resource.excerpt}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">詳細資訊</h2>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: resource.html }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
