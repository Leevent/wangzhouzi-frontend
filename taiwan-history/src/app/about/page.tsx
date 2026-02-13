import { Metadata } from 'next';
import { PageHeader } from '@/components/ui';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: '關於我們',
  description: '關於台灣歷史網 - 探索台灣的過去與文化',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="關於我們"
        description="探索台灣的過去與文化"
      />

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 使命 */}
          <section className="bg-white rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">我們的使命</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {siteConfig.name} 致力於整合台灣歷史數位資源，讓每個人都能輕鬆地探索台灣的過去與文化。
              我們相信，了解歷史是認識自我、理解當下的重要途徑。
            </p>
            <p className="text-gray-600 leading-relaxed">
              透過整合各大機構的數位典藏、老照片、地方志書等珍貴資源，
              結合部落格、圖庫、互動式時間軸等現代網頁技術，
              我們希望讓台灣歷史更加生動、易於親近。
            </p>
          </section>

          {/* 功能介紹 */}
          <section className="bg-white rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">網站功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <span className="text-3xl mr-4">📅</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">互動時間軸</h3>
                  <p className="text-sm text-gray-600">
                    從史前時代到現代，以時間軸方式瀏覽台灣歷史重要事件
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-3xl mr-4">📷</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">歷史圖庫</h3>
                  <p className="text-sm text-gray-600">
                    珍貴老照片、歷史地圖、文物影像典藏
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-3xl mr-4">📜</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">地方志書</h3>
                  <p className="text-sm text-gray-600">
                    各縣市方志、鄉鎮志，深入了解地方歷史
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-3xl mr-4">🗄️</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">數位典藏</h3>
                  <p className="text-sm text-gray-600">
                    連結各大機構的數位典藏與研究資源
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 資料來源 */}
          <section className="bg-white rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">資料來源</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              本站整合來自以下機構的數位資源：
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>國立臺灣大學圖書館</li>
              <li>國立臺灣歷史博物館</li>
              <li>中央研究院臺灣史研究所</li>
              <li>國史館臺灣文獻館</li>
              <li>國家圖書館</li>
              <li>國立臺灣圖書館</li>
              <li>原住民族委員會</li>
              <li>文化部</li>
            </ul>
          </section>

          {/* 聯絡方式 */}
          <section className="bg-amber-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">聯絡我們</h2>
            <p className="text-gray-600 mb-6">
              如果您有任何建議、發現錯誤，或想要分享珍貴的歷史資料，歡迎與我們聯繫。
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
              {siteConfig.contact.email}
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
