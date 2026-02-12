// 網站全域配置 - 統一管理所有網站資訊
export const siteConfig = {
  name: '望周知',
  slogan: '希望每個人都能知道',
  description: '發掘台灣在地的優質資源與服務！從免費數位圖書館到正規大學課程，從政府便民服務到社會福利資源，讓每個人都能輕鬆享受台灣的優質服務。',
  url: 'https://oldcity-frontend.zeabur.app',
  apiUrl: 'https://iwantyouknow.zeabur.app',

  // SEO 相關
  keywords: ['台灣', '資源', '政府服務', '教育', '免費資源', '數位學習', '社會福利'],
  author: '望周知團隊',

  // 聯絡資訊
  contact: {
    email: 'contact@leevent.co',
    location: '台灣',
  },

  // 社群連結
  social: {
    github: 'https://github.com',
  },

  // 導航連結
  navigation: {
    main: [
      { name: '首頁', href: '/' },
      { name: '所有資源', href: '/resources' },
      { name: '分類瀏覽', href: '/categories' },
      { name: '推薦資源', href: '/external-resources' },
      { name: '關於我們', href: '/about' },
    ],
    footer: [
      { name: '所有資源', href: '/resources' },
      { name: '分類瀏覽', href: '/categories' },
      { name: '推薦資源', href: '/external-resources' },
      { name: '部落格', href: '/blog' },
      { name: '關於我們', href: '/about' },
      { name: '使用指南', href: '/guide' },
    ],
  },

  // 版權年份
  copyrightYear: 2026,
};

export default siteConfig;
