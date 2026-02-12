import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: '使用指南',
  description: '了解如何使用望周知平台，快速找到您需要的台灣優質資源',
};

const steps = [
  {
    number: '01',
    title: '瀏覽分類',
    description: '從首頁或分類頁面選擇您感興趣的資源類別，如數位學習、政府服務、社會福利等。',
    icon: '📂',
  },
  {
    number: '02',
    title: '搜尋資源',
    description: '使用搜尋功能，輸入關鍵字快速找到您需要的資源。',
    icon: '🔍',
  },
  {
    number: '03',
    title: '查看詳情',
    description: '點擊任何資源卡片，查看完整的介紹和使用方式。',
    icon: '📖',
  },
  {
    number: '04',
    title: '開始使用',
    description: '根據資源頁面的指引，前往官方網站開始使用這些免費服務。',
    icon: '🚀',
  },
];

const faqs = [
  {
    question: '這些資源都是免費的嗎？',
    answer: '是的！我們收錄的所有資源都是完全免費的，包括政府提供的服務和優質的民間資源。',
  },
  {
    question: '如何推薦新的資源？',
    answer: `如果您知道其他優質的免費資源，歡迎透過 ${siteConfig.contact.email} 與我們聯繫，我們會評估後加入平台。`,
  },
  {
    question: '資源資訊有誤怎麼辦？',
    answer: '如果您發現任何資訊有誤或過期，請透過聯絡方式告知我們，我們會盡快更正。',
  },
  {
    question: '如何訂閱最新資訊？',
    answer: '訂閱功能即將推出，敬請期待！您也可以定期造訪我們的部落格獲取最新資訊。',
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">使用指南</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            只需簡單幾步，就能找到您需要的台灣優質資源
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">如何使用</h2>
            <p className="text-lg text-gray-600">簡單四步驟，快速找到您需要的資源</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative p-6 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-blue-400 font-bold text-sm mb-2">
                  STEP {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">常見問題</h2>
            <p className="text-lg text-gray-600">快速解答您的疑問</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            準備好開始探索了嗎？
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            立即瀏覽台灣的優質免費資源
          </p>
          <div className="flex justify-center space-x-4">
            <Button as="link" href="/resources" variant="primary" size="lg">
              探索資源
            </Button>
            <Button as="link" href="/categories" variant="outline" size="lg">
              瀏覽分類
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
