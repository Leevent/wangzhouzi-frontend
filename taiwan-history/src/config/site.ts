// 網站全域配置 - 台灣歷史網站
export const siteConfig = {
  name: '台灣歷史網',
  nameEn: 'Taiwan History',
  slogan: '探索台灣的過去與文化',
  description: '從史前時代到現代，整合數位典藏、老照片、地方志書等珍貴資源，結合部落格、圖庫、互動式時間軸，讓每個人都能認識台灣的歷史與文化。',
  url: 'https://taiwan-history.example.com',

  // SEO 相關
  keywords: [
    '台灣歷史',
    '台灣史',
    '數位典藏',
    '老照片',
    '地方志',
    '原住民族',
    '日治時期',
    '清領時期',
    '歷史文化',
    '台灣文化'
  ],
  author: '台灣歷史網團隊',

  // 聯絡資訊
  contact: {
    email: 'contact@example.com',
    location: '台灣',
  },

  // 社群連結
  social: {
    github: 'https://github.com',
    facebook: '',
    twitter: '',
  },

  // 導航連結
  navigation: {
    main: [
      { name: '首頁', href: '/' },
      { name: '時間軸', href: '/timeline' },
      { name: '圖庫', href: '/gallery' },
      { name: '地方志', href: '/gazetteers' },
      { name: '數位資源', href: '/resources' },
      { name: '部落格', href: '/blog' },
    ],
    footer: [
      { name: '時間軸', href: '/timeline' },
      { name: '圖庫', href: '/gallery' },
      { name: '地方志', href: '/gazetteers' },
      { name: '數位資源', href: '/resources' },
      { name: '部落格', href: '/blog' },
      { name: '關於我們', href: '/about' },
      { name: '搜尋', href: '/search' },
    ],
  },

  // 版權年份
  copyrightYear: 2026,
};

export default siteConfig;
