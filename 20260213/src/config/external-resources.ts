// 外部推薦資源配置
// 這些是經過篩選的優質免費資源，可作為望周知的延伸閱讀

export interface ExternalResource {
  name: string;
  url: string;
  description: string;
  tags: string[];
}

export interface ResourceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  resources: ExternalResource[];
}

export const externalResources: ResourceCategory[] = [
  {
    id: 'taiwan-library',
    name: '台灣圖書館數位資源',
    icon: '📚',
    description: '國家圖書館、公共圖書館電子書平台等',
    resources: [
      {
        name: '國家圖書館電子資源',
        url: 'https://erm.ncl.edu.tw/',
        description: '國家圖書館提供的電子書、電子期刊、資料庫等數位資源入口',
        tags: ['電子書', '資料庫', '國家圖書館']
      },
      {
        name: 'HyRead ebook 國家圖書館',
        url: 'https://ncl.ebook.hyread.com.tw/',
        description: '國家圖書館 HyRead 電子書平台，提供超過22萬種電子書與雜誌',
        tags: ['電子書', '電子雜誌', '免費借閱']
      },
      {
        name: '國立公共資訊圖書館電子書',
        url: 'https://qebook.ntl.edu.tw/',
        description: '國資圖電子書服務平台，持任一縣市借閱證即可免費借閱',
        tags: ['電子書', '公共圖書館', '免費借閱']
      },
      {
        name: '台灣雲端書庫',
        url: 'https://www.ebookservice.tw/',
        description: '遠流出版開發的公共圖書館電子書平台，提供新書與雜誌借閱',
        tags: ['電子書', '電子雜誌', '公共圖書館']
      },
      {
        name: '華藝電子書 iRead ebooks',
        url: 'https://www.airitibooks.com/',
        description: '台灣最大學術電子書平台，收錄繁體中文學術與休閒書籍',
        tags: ['電子書', '學術資源', '繁體中文']
      },
      {
        name: 'udn 讀書館',
        url: 'https://reading.udn.com/',
        description: '聯合報系電子書與雜誌平台，與各縣市圖書館合作提供借閱',
        tags: ['電子書', '電子雜誌', '新聞媒體']
      },
      {
        name: '擴大電子書計次借閱網',
        url: 'https://ebook.moc.gov.tw/',
        description: '文化部推動的電子書計次借閱服務，整合多家電子書平台',
        tags: ['電子書', '政府資源', '計次借閱']
      }
    ]
  },
  {
    id: 'international-library',
    name: '國際公共圖書館計畫',
    icon: '🌍',
    description: 'Internet Archive、Project Gutenberg、OpenLibrary 等國際數位圖書館',
    resources: [
      {
        name: 'Internet Archive',
        url: 'https://archive.org/',
        description: '全球最大數位圖書館，收錄超過3500萬本書籍、影音與網頁檔案',
        tags: ['電子書', '影音', '網頁存檔', '公共領域']
      },
      {
        name: 'Project Gutenberg',
        url: 'https://www.gutenberg.org/',
        description: '最古老的數位圖書館（1971年創立），提供超過7萬本免費公版電子書',
        tags: ['電子書', '公共領域', '經典文學']
      },
      {
        name: 'Open Library',
        url: 'https://openlibrary.org/',
        description: '開放式圖書館目錄，可免費閱讀、借閱超過300萬本書籍',
        tags: ['電子書', '借閱', '開放目錄']
      },
      {
        name: 'Standard Ebooks',
        url: 'https://standardebooks.org/',
        description: '提供精美排版的公版電子書，採用嚴格的出版標準',
        tags: ['電子書', '公共領域', '精美排版']
      },
      {
        name: 'LibriVox',
        url: 'https://librivox.org/',
        description: '志工朗讀的免費有聲書平台，收錄超過2萬部公版作品錄音',
        tags: ['有聲書', '公共領域', '志工朗讀']
      },
      {
        name: 'Europeana',
        url: 'https://www.europeana.eu/',
        description: '歐洲數位文化遺產平台，提供數百萬件藝術品、書籍、音樂資料',
        tags: ['文化遺產', '藝術', '歐洲']
      },
      {
        name: 'HathiTrust Digital Library',
        url: 'https://www.hathitrust.org/',
        description: '學術圖書館合作建置的數位典藏，收錄超過1700萬冊數位化書籍',
        tags: ['學術資源', '數位典藏', '大學圖書館']
      },
      {
        name: 'Library of Congress Digital Collections',
        url: 'https://www.loc.gov/collections/',
        description: '美國國會圖書館數位典藏，包含珍貴歷史文件、照片與影音',
        tags: ['歷史文獻', '數位典藏', '美國']
      }
    ]
  },
  {
    id: 'newsletters',
    name: '優質商業/科技電子報',
    icon: '📧',
    description: '中英文商業與科技趨勢電子報訂閱',
    resources: [
      {
        name: 'Morning Brew',
        url: 'https://www.morningbrew.com/',
        description: '全球超過400萬訂閱的商業日報，輕鬆易讀的商業新聞摘要',
        tags: ['商業', '英文', '每日電子報']
      },
      {
        name: '科技島讀',
        url: 'https://daodu.tech/',
        description: '周欽華主編，從台灣角度分析矽谷與國際科技商業策略',
        tags: ['科技', '中文', '台灣觀點']
      },
      {
        name: 'The Hustle',
        url: 'https://thehustle.co/',
        description: 'HubSpot 旗下商業電子報，以幽默風格報導科技商業新聞',
        tags: ['商業', '英文', '科技創業']
      },
      {
        name: 'Stratechery',
        url: 'https://stratechery.com/',
        description: 'Ben Thompson 撰寫的科技策略分析，深度解讀科技產業趨勢',
        tags: ['科技策略', '英文', '深度分析']
      },
      {
        name: 'Benedict Evans Newsletter',
        url: 'https://www.ben-evans.com/',
        description: '前 a16z 合夥人的科技趨勢週報，約15萬訂閱者',
        tags: ['科技趨勢', '英文', '週報']
      },
      {
        name: 'TLDR Newsletter',
        url: 'https://tldr.tech/',
        description: '每日科技新聞摘要，五分鐘掌握重要科技資訊',
        tags: ['科技', '英文', '每日摘要']
      },
      {
        name: 'CB Insights Newsletter',
        url: 'https://www.cbinsights.com/newsletter',
        description: '科技產業研究與創投趨勢分析電子報',
        tags: ['創投', '英文', '產業研究']
      },
      {
        name: 'TechNews 科技新報電子報',
        url: 'https://technews.tw/',
        description: '台灣科技新聞媒體，提供電子報訂閱服務',
        tags: ['科技', '中文', '台灣']
      }
    ]
  },
  {
    id: 'tech-media',
    name: '科技部落格與媒體',
    icon: '💻',
    description: '國內外科技新聞與部落格平台',
    resources: [
      {
        name: 'TechCrunch',
        url: 'https://techcrunch.com/',
        description: '全球領先科技媒體，專注新創公司與科技產業深度報導',
        tags: ['科技新聞', '英文', '新創']
      },
      {
        name: 'Wired',
        url: 'https://www.wired.com/',
        description: '探討科技如何影響文化、經濟與政治的深度科技雜誌',
        tags: ['科技文化', '英文', '深度報導']
      },
      {
        name: 'The Verge',
        url: 'https://www.theverge.com/',
        description: 'Vox Media 旗下科技媒體，結合產品評測與文化評論',
        tags: ['科技', '英文', '產品評測']
      },
      {
        name: 'Ars Technica',
        url: 'https://arstechnica.com/',
        description: '深度科技分析媒體，以專業級解析著稱',
        tags: ['科技', '英文', '深度分析']
      },
      {
        name: '數位時代',
        url: 'https://www.bnext.com.tw/',
        description: '台灣重要科技商業媒體，報導數位轉型與創新創業',
        tags: ['科技', '中文', '台灣']
      },
      {
        name: 'INSIDE 硬塞的網路趨勢觀察',
        url: 'https://www.inside.com.tw/',
        description: '台灣網路趨勢與創業媒體，報導網路產業動態',
        tags: ['網路趨勢', '中文', '台灣']
      },
      {
        name: 'TechOrange 科技報橘',
        url: 'https://techorange.com/',
        description: '關注 AI、資安、ESG 等科技議題的台灣科技媒體',
        tags: ['科技', '中文', '台灣']
      },
      {
        name: 'iThome',
        url: 'https://www.ithome.com.tw/',
        description: '台灣最大 IT 專業媒體，報導企業 IT 與軟體開發資訊',
        tags: ['IT', '中文', '台灣']
      },
      {
        name: 'Hacker News',
        url: 'https://news.ycombinator.com/',
        description: 'Y Combinator 經營的科技與創業社群新聞網站',
        tags: ['科技', '英文', '創業社群']
      },
      {
        name: 'Product Hunt',
        url: 'https://www.producthunt.com/',
        description: '新產品發布與發現平台，科技新創展示舞台',
        tags: ['產品發布', '英文', '新創']
      }
    ]
  },
  {
    id: 'open-courses',
    name: '開放式課程平台',
    icon: '🎓',
    description: 'MOOCs 與大學開放式課程',
    resources: [
      {
        name: 'Coursera',
        url: 'https://www.coursera.org/',
        description: '與全球頂尖大學合作的線上課程平台，提供免費旁聽與付費證書',
        tags: ['MOOCs', '大學課程', '證書']
      },
      {
        name: 'edX',
        url: 'https://www.edx.org/',
        description: '哈佛與 MIT 創辦的開放課程平台，提供各領域免費課程',
        tags: ['MOOCs', '大學課程', '免費']
      },
      {
        name: 'MIT OpenCourseWare',
        url: 'https://ocw.mit.edu/',
        description: '麻省理工學院開放超過2500門課程教材，完全免費取用',
        tags: ['開放課程', 'MIT', '免費教材']
      },
      {
        name: 'Stanford Online',
        url: 'https://online.stanford.edu/free-courses',
        description: '史丹佛大學免費線上課程，涵蓋工程、醫學、人文等領域',
        tags: ['開放課程', 'Stanford', '免費']
      },
      {
        name: '臺大開放式課程',
        url: 'https://ocw.aca.ntu.edu.tw/',
        description: '台灣大學開放式課程，提供中文基礎與專業課程教材',
        tags: ['開放課程', '台灣大學', '中文']
      },
      {
        name: '清華大學開放式課程',
        url: 'https://ocw.nthu.edu.tw/',
        description: '清華大學開放課程，涵蓋工程、自然科學與人文社會領域',
        tags: ['開放課程', '清華大學', '中文']
      },
      {
        name: 'ewant 育網開放教育平台',
        url: 'https://www.ewant.org/',
        description: '台灣第一個 MOOCs 平台，集結各大專院校通識與專業課程',
        tags: ['MOOCs', '台灣', '通識課程']
      },
      {
        name: '中華開放教育平台',
        url: 'https://www.openedu.tw/',
        description: '政府推動的開放教育平台，提供磨課師課程與學習認證',
        tags: ['MOOCs', '台灣', '政府推動']
      },
      {
        name: 'Class Central',
        url: 'https://www.classcentral.com/',
        description: '全球 MOOCs 搜尋引擎與評論網站，整合各平台課程資訊',
        tags: ['搜尋引擎', 'MOOCs', '課程評論']
      },
      {
        name: 'Open Culture',
        url: 'https://www.openculture.com/freeonlinecourses',
        description: '彙整超過1700門頂尖大學免費線上課程',
        tags: ['課程彙整', '免費', '多元領域']
      }
    ]
  },
  {
    id: 'digital-learning',
    name: '數位學習資源',
    icon: '💡',
    description: 'Khan Academy、維基百科等免費學習工具與平台',
    resources: [
      {
        name: 'Khan Academy 可汗學院',
        url: 'https://www.khanacademy.org/',
        description: '非營利教育平台，提供數學、科學等免費互動課程與練習',
        tags: ['免費教育', '互動學習', 'K-12']
      },
      {
        name: '可汗學院中文版',
        url: 'https://zh.khanacademy.org/',
        description: '可汗學院中文翻譯版，由台灣志工團隊協助翻譯',
        tags: ['免費教育', '中文', '互動學習']
      },
      {
        name: '維基百科',
        url: 'https://zh.wikipedia.org/',
        description: '全球最大免費百科全書，由志工協作編輯的知識庫',
        tags: ['百科全書', '免費', '協作編輯']
      },
      {
        name: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/',
        description: '完全免費的程式設計學習平台，提供超過500小時課程與專案',
        tags: ['程式設計', '免費', '專案導向']
      },
      {
        name: 'Codecademy',
        url: 'https://www.codecademy.com/',
        description: '互動式程式學習平台，提供免費入門課程',
        tags: ['程式設計', '互動學習', '入門']
      },
      {
        name: 'Duolingo',
        url: 'https://www.duolingo.com/',
        description: '遊戲化語言學習 App，提供40多種語言免費課程',
        tags: ['語言學習', '免費', '遊戲化']
      },
      {
        name: 'Wolfram Alpha',
        url: 'https://www.wolframalpha.com/',
        description: '計算知識引擎，可解答數學、科學、統計等問題',
        tags: ['計算引擎', '數學', '科學']
      },
      {
        name: 'TED-Ed',
        url: 'https://ed.ted.com/',
        description: 'TED 教育頻道，提供動畫教學影片與課程教材',
        tags: ['教育影片', '動畫', '免費']
      },
      {
        name: 'CK-12',
        url: 'https://www.ck12.org/',
        description: '免費 K-12 數位教科書與學習資源平台',
        tags: ['教科書', 'K-12', '免費']
      }
    ]
  }
];

// 統計資訊
export const resourceStats = {
  totalCategories: externalResources.length,
  totalResources: externalResources.reduce((sum, cat) => sum + cat.resources.length, 0),
  lastUpdated: '2026-02-13'
};

export default externalResources;
