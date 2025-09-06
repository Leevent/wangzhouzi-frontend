import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '使用指南 - 望周知',
  description: '學習如何有效使用望周知平台，快速找到您需要的台灣優質資源',
};

export default function GuidePage() {
  const quickSteps = [
    {
      step: '1',
      title: '選擇瀏覽方式',
      description: '您可以透過分類瀏覽、關鍵字搜尋，或直接查看所有資源',
      icon: '🎯'
    },
    {
      step: '2',
      title: '找到感興趣的資源',
      description: '點擊資源卡片，查看詳細資訊和使用說明',
      icon: '🔍'
    },
    {
      step: '3',
      title: '開始使用資源',
      description: '跟隨詳細頁面的指引，開始享受台灣的優質服務',
      icon: '✨'
    }
  ];

  const faqs = [
    {
      question: '這些資源都是免費的嗎？',
      answer: '是的！我們只收錄完全免費使用的台灣優質資源。所有推薦的服務都不需要付費即可使用。'
    },
    {
      question: '如何判斷資源的可信度？',
      answer: '我們的資源都經過嚴格篩選，主要來源包括政府機關、知名大學、公認的非營利組織等具有公信力的機構。'
    },
    {
      question: '資源資訊會定期更新嗎？',
      answer: '是的，我們會定期檢查和更新資源狀態，確保提供的資訊是最新且有效的。如果您發現過時資訊，歡迎聯絡我們。'
    },
    {
      question: '可以推薦新的資源嗎？',
      answer: '當然可以！如果您知道優質的台灣免費資源，歡迎透過聯絡方式向我們推薦。我們會仔細評估後加入平台。'
    }
  ];

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
              <Link href="/about" className="text-gray-700 hover:text-blue-400 font-medium">關於我們</Link>
              <span className="text-blue-400 font-medium">使用指南</span>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📖 使用指南
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            學習如何有效使用望周知平台，快速找到您需要的台灣優質資源。
            無論您是新手還是進階用戶，這裡都有實用的操作技巧。
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/resources" 
              className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium"
            >
              立即開始探索
            </Link>
            <Link 
              href="/categories" 
              className="border-2 border-blue-400 text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-400 hover:text-white transition-colors font-medium"
            >
              瀏覽分類
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 三步驟快速開始</h2>
            <p className="text-lg text-gray-600">
              只需要三個簡單步驟，就能開始使用台灣的優質資源
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">❓ 常見問題</h2>
            <p className="text-lg text-gray-600">
              解答您可能遇到的問題
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <details className="group">
                  <summary className="cursor-pointer p-6 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 text-lg">{faq.question}</h3>
                      <span className="text-blue-400 group-open:rotate-180 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-400 to-green-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            需要更多協助？
          </h2>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto mb-8">
            如果您在使用過程中遇到任何問題，或有任何建議，
            歡迎隨時聯絡我們。我們很樂意為您提供協助。
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="mailto:contact@wangzhouzi.tw" 
              className="bg-white text-blue-400 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              聯絡我們
            </a>
            <Link 
              href="/about" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-400 transition-colors font-semibold"
            >
              關於我們
            </Link>
          </div>
        </div>
      </section>

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
