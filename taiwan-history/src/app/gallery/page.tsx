import { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { getAllEras } from '@/config/history-categories';

export const metadata: Metadata = {
  title: '歷史圖庫',
  description: '珍貴老照片、歷史地圖、文物影像典藏',
};

export default function GalleryPage() {
  const eras = getAllEras();

  // 示範用的圖片集合
  const collections = [
    {
      id: 'old-photos',
      name: '老照片',
      icon: '📷',
      description: '各時代的珍貴歷史照片',
      count: 0,
    },
    {
      id: 'maps',
      name: '歷史地圖',
      icon: '🗺️',
      description: '台灣各時期地圖與行政區劃',
      count: 0,
    },
    {
      id: 'documents',
      name: '文獻圖像',
      icon: '📜',
      description: '歷史文獻、契約、公文掃描',
      count: 0,
    },
    {
      id: 'architecture',
      name: '建築古蹟',
      icon: '🏛️',
      description: '歷史建築與古蹟影像',
      count: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="歷史圖庫"
        description="珍貴老照片、歷史地圖、文物影像典藏"
      />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 集合分類 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">圖片集合</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer border border-gray-100"
                >
                  <span className="text-4xl mb-3 block">{collection.icon}</span>
                  <h3 className="font-bold text-gray-900 mb-1">{collection.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{collection.description}</p>
                  <span className="text-xs text-amber-600">即將推出</span>
                </div>
              ))}
            </div>
          </div>

          {/* 依時代瀏覽 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">依時代瀏覽</h2>
            <div className="flex flex-wrap gap-3">
              {eras.map((era) => (
                <button
                  key={era.name}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-amber-50 hover:border-amber-300 transition-colors flex items-center"
                  style={{ borderColor: era.color }}
                >
                  <span className="mr-2">{era.icon}</span>
                  {era.name}
                </button>
              ))}
            </div>
          </div>

          {/* 空白狀態 */}
          <div className="bg-white rounded-xl p-12 text-center">
            <span className="text-6xl mb-4 block">📷</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">圖庫建置中</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              我們正在整理珍貴的歷史影像資料，很快就會與您見面。
              您也可以先瀏覽外部數位典藏資源。
            </p>
            <a
              href="/resources#photo-archives"
              className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
              瀏覽外部老照片資源
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
