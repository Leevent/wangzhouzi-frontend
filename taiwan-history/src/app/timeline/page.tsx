import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, EraCard } from '@/components/ui';
import { getAllEras } from '@/config/history-categories';

export const metadata: Metadata = {
  title: '歷史時間軸',
  description: '從史前時代到現代，以互動式時間軸探索台灣歷史重要事件',
};

export default function TimelinePage() {
  const eras = getAllEras();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="台灣歷史時間軸"
        description="從史前時代到現代，探索台灣歷史的重要事件與發展"
      />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 時代選擇 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">選擇時代</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {eras.map((era) => (
                <EraCard key={era.name} {...era} />
              ))}
            </div>
          </div>

          {/* 時間軸預覽 */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">時間軸概覽</h2>

            <div className="relative">
              {/* 時間軸線 */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-amber-200 transform md:-translate-x-1/2"></div>

              {/* 時代節點 */}
              <div className="space-y-8">
                {eras.map((era, index) => (
                  <div
                    key={era.name}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* 節點 */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-white transform md:-translate-x-1/2 z-10"
                         style={{ backgroundColor: era.color }}></div>

                    {/* 內容 */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}>
                      <Link
                        href={`/timeline/${era.name === '史前時代' ? 'prehistoric' :
                               era.name === '荷西時期' ? 'dutch-spanish' :
                               era.name === '明鄭時期' ? 'koxinga' :
                               era.name === '清領時期' ? 'qing' :
                               era.name === '日治時期' ? 'japanese' : 'postwar'}`}
                        className="block bg-gray-50 rounded-lg p-4 hover:bg-amber-50 transition-colors group"
                      >
                        <div className="flex items-center gap-2 mb-2"
                             style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                          <span className="text-2xl">{era.icon}</span>
                          <span className="font-bold text-gray-900 group-hover:text-amber-600">
                            {era.name}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">{era.dateRange}</p>
                        <p className="text-sm text-gray-600">{era.description}</p>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 說明 */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">
              互動式時間軸功能開發中，敬請期待！
            </p>
            <p className="text-sm text-gray-400">
              未來將支援縮放、事件篩選、詳細資訊等互動功能
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
