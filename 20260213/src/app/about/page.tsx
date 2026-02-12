import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: '關於我們',
  description: '了解望周知平台的使命願景，我們致力於整合台灣在地優質資源',
};

const teamValues = [
  {
    icon: '🎯',
    title: '精準整合',
    description: '嚴格篩選，只推薦真正優質且實用的台灣在地資源',
  },
  {
    icon: '🤝',
    title: '平等共享',
    description: '讓每個人都能平等地獲取優質資源，縮小數位落差',
  },
  {
    icon: '💡',
    title: '持續創新',
    description: '不斷優化平台體驗，讓資源發現變得更簡單',
  },
  {
    icon: '🌟',
    title: '社會價值',
    description: '創造正面的社會影響，讓台灣變得更美好',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            關於<span className="text-red-400">{siteConfig.name}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            我們相信<strong>每個人都應該平等地享有優質資源</strong>。
            透過整合台灣在地的優質服務，我們希望縮小資訊落差，
            讓每個人都能輕鬆發現並使用這些珍貴的資源。
          </p>
          <div className="flex justify-center space-x-4">
            <Button as="link" href="/resources" variant="primary" size="lg">
              探索資源
            </Button>
            <Button as="link" href="/guide" variant="outline" size="lg">
              使用指南
            </Button>
          </div>
        </div>
      </section>

      {/* 使命與願景 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">我們的使命</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              透過技術的力量，讓台灣的優質資源被更多人看見和使用
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 我們的使命</h3>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>整合分散的優質資源</strong>：台灣有許多優質的免費資源，但往往分散在各個網站，民眾不易發現。我們將這些資源集中整理，讓大家能夠輕鬆找到。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>促進資訊平等</strong>：我們相信每個人都應該平等地獲得優質資源的資訊。不論您的背景如何，都能在這裡找到需要的協助。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>建立共享社群</strong>：透過平台，我們希望建立一個資源共享的社群，讓大家能夠互相推薦和分享有用的資源。
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 我們的願景</h3>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>成為台灣資源的入口網站</strong>：讓「{siteConfig.name}」成為大家想要找台灣優質資源時的第一個選擇。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>推動數位包容</strong>：協助數位弱勢族群也能輕鬆使用這些資源，縮小數位落差。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>促進社會進步</strong>：透過資源的有效利用，讓台灣社會變得更加美好和進步。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心價值 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心價值</h2>
            <p className="text-lg text-gray-600">
              我們堅持的四大核心價值，指引著平台的發展方向
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-400 to-red-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            一起讓台灣變得更美好
          </h2>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto mb-8">
            如果您知道其他優質的台灣資源，或有任何改善建議，
            歡迎與我們分享。讓我們攜手建設一個更好的資源共享平台。
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/resources"
              className="bg-white text-blue-400 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              立即探索
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-400 transition-colors font-semibold"
            >
              聯絡我們
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
