import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: '地方志書',
  description: '台灣各縣市方志、鄉鎮志與地方歷史文獻',
};

// 台灣各縣市資料
const regions = [
  { name: '台北市', slug: 'taipei', icon: '🏙️' },
  { name: '新北市', slug: 'new-taipei', icon: '🌆' },
  { name: '桃園市', slug: 'taoyuan', icon: '✈️' },
  { name: '台中市', slug: 'taichung', icon: '🏛️' },
  { name: '台南市', slug: 'tainan', icon: '🏯' },
  { name: '高雄市', slug: 'kaohsiung', icon: '🚢' },
  { name: '基隆市', slug: 'keelung', icon: '⚓' },
  { name: '新竹市', slug: 'hsinchu-city', icon: '💻' },
  { name: '新竹縣', slug: 'hsinchu-county', icon: '🏔️' },
  { name: '苗栗縣', slug: 'miaoli', icon: '🍊' },
  { name: '彰化縣', slug: 'changhua', icon: '🌾' },
  { name: '南投縣', slug: 'nantou', icon: '⛰️' },
  { name: '雲林縣', slug: 'yunlin', icon: '🌱' },
  { name: '嘉義市', slug: 'chiayi-city', icon: '🚂' },
  { name: '嘉義縣', slug: 'chiayi-county', icon: '🌲' },
  { name: '屏東縣', slug: 'pingtung', icon: '🌴' },
  { name: '宜蘭縣', slug: 'yilan', icon: '🌧️' },
  { name: '花蓮縣', slug: 'hualien', icon: '🏞️' },
  { name: '台東縣', slug: 'taitung', icon: '🎈' },
  { name: '澎湖縣', slug: 'penghu', icon: '🐚' },
  { name: '金門縣', slug: 'kinmen', icon: '🏰' },
  { name: '連江縣', slug: 'lienchiang', icon: '🏝️' },
];

export default function GazetteersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="地方志書"
        description="台灣各縣市方志、鄉鎮志與地方歷史文獻"
      />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 地圖區域 (簡化版) */}
          <div className="bg-white rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">選擇地區</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {regions.map((region) => (
                <Link
                  key={region.slug}
                  href={`/gazetteers/${region.slug}`}
                  className="bg-gray-50 rounded-lg p-4 text-center hover:bg-amber-50 hover:shadow-md transition-all group"
                >
                  <span className="text-2xl mb-2 block">{region.icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-amber-600">
                    {region.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* 外部資源連結 */}
          <div className="bg-white rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">數位化地方志資源</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="http://county.ntl.edu.tw/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 rounded-lg p-6 hover:bg-amber-50 hover:shadow-md transition-all group"
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">📚</span>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-amber-600 mb-1">
                      臺灣方志
                      <span className="ml-2 text-gray-400">↗</span>
                    </h3>
                    <p className="text-sm text-amber-600 mb-2">國立臺灣圖書館</p>
                    <p className="text-sm text-gray-600">
                      收錄台灣各縣市方志、鄉鎮志的數位化版本，可線上閱覽或下載
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://tm.ncl.edu.tw/topic/1"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 rounded-lg p-6 hover:bg-amber-50 hover:shadow-md transition-all group"
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">📖</span>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-amber-600 mb-1">
                      臺灣記憶 - 鄉土文獻
                      <span className="ml-2 text-gray-400">↗</span>
                    </h3>
                    <p className="text-sm text-amber-600 mb-2">國家圖書館</p>
                    <p className="text-sm text-gray-600">
                      國家圖書館收錄的台灣各地鄉土文獻與地方志書數位化資源
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* 說明 */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">
              各縣市詳細地方志資料整理中，目前可透過上方連結瀏覽外部資源
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
