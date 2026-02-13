// 台灣歷史外部資源配置
// 整合台灣歷史數位典藏、老照片、地方志、原住民族等數位資源

export interface TaiwanHistoryResource {
  name: string;
  nameEn?: string;
  url: string;
  description: string;
  institution?: string;
  resourceType: 'archive' | 'database' | 'library' | 'map' | 'photo' | 'document';
  tags: string[];
  language: ('zh-TW' | 'ja' | 'en')[];
  accessType: 'free' | 'subscription' | 'partial';
}

export interface ResourceCategory {
  id: string;
  name: string;
  nameEn?: string;
  icon: string;
  description: string;
  resources: TaiwanHistoryResource[];
}

export const externalResources: ResourceCategory[] = [
  {
    id: 'digital-archives',
    name: '數位典藏',
    nameEn: 'Digital Archives',
    icon: '🗄️',
    description: '台灣歷史數位檔案與典藏資源，收錄各時代珍貴史料',
    resources: [
      {
        name: '台灣歷史數位圖書館',
        nameEn: 'Taiwan History Digital Library (THDL)',
        url: 'http://thdl.ntu.edu.tw/',
        description: '台大建置的台灣史一手史料資料庫，收錄「淡新檔案」、「明清臺灣行政檔案」與「古契書」等文獻集，全文資料逾十萬筆',
        institution: '國立臺灣大學',
        resourceType: 'library',
        tags: ['史料', '古文書', '淡新檔案', '清代'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '臺灣史數位資源整合入口網',
        url: 'https://taiwanindex.nmth.gov.tw/',
        description: '整合國立臺灣歷史博物館主題資料庫，支援多組關鍵字布林運算跨站檢索',
        institution: '國立臺灣歷史博物館',
        resourceType: 'database',
        tags: ['整合搜尋', '數位典藏', '跨站檢索'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '中研院臺灣史研究所檔案館',
        nameEn: 'Taiwan Archives Online',
        url: 'https://archives.ith.sinica.edu.tw/',
        description: '收藏日治時期官方檔案、私人文書、照片等珍貴史料，提供數位化影像閱覽',
        institution: '中央研究院臺灣史研究所',
        resourceType: 'archive',
        tags: ['檔案', '日治時期', '學術研究'],
        language: ['zh-TW', 'ja'],
        accessType: 'free'
      },
      {
        name: '國史館臺灣文獻館',
        url: 'https://www.th.gov.tw/',
        description: '典藏清代、日治、戰後各時期台灣文獻與檔案，提供文獻數位化查詢服務',
        institution: '國史館臺灣文獻館',
        resourceType: 'archive',
        tags: ['政府檔案', '清代', '日治', '戰後'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '檔案資源整合查詢平台 ACROSS',
        nameEn: 'Archives Cross boundaries',
        url: 'https://across.archives.gov.tw/',
        description: '國家發展委員會檔案管理局建置的一站式檔案查詢入口，整合多個資料庫',
        institution: '國家發展委員會檔案管理局',
        resourceType: 'database',
        tags: ['整合查詢', '國家檔案', '政府資料'],
        language: ['zh-TW', 'en'],
        accessType: 'free'
      },
      {
        name: '臺灣記憶',
        nameEn: 'Taiwan Memory',
        url: 'https://tm.ncl.edu.tw/',
        description: '國家圖書館建置的台灣記憶數位平台，收錄地方文獻、人物傳記、老照片等',
        institution: '國家圖書館',
        resourceType: 'library',
        tags: ['地方文獻', '人物', '影像', '數位典藏'],
        language: ['zh-TW'],
        accessType: 'free'
      }
    ]
  },
  {
    id: 'photo-archives',
    name: '老照片資料庫',
    nameEn: 'Historical Photo Archives',
    icon: '📷',
    description: '台灣歷史照片與影像典藏，見證各時代的視覺記憶',
    resources: [
      {
        name: '臺灣舊照片資料庫',
        url: 'https://dl.lib.ntu.edu.tw/s/photo',
        description: '台大圖書館典藏的珍貴台灣老照片，包含《臺灣寫真帖》、《臺灣慣習記事》等日治時期出版品插圖',
        institution: '國立臺灣大學圖書館',
        resourceType: 'photo',
        tags: ['老照片', '日治時期', '台大典藏'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '國家文化資料庫',
        url: 'https://nrch.culture.tw/',
        description: '文化部建置，包含超過18萬張台灣老照片，大多有詳細文字詮釋，可供學術研究免費使用',
        institution: '文化部',
        resourceType: 'photo',
        tags: ['老照片', '文化資產', '學術研究'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '臺灣歷史圖像網路資源',
        url: 'https://sites.google.com/site/isformosa/',
        description: '收錄網路上公開提供臺灣歷史圖像的網站清單，包含照片、圖畫、地圖等',
        institution: '民間整理',
        resourceType: 'photo',
        tags: ['圖像', '索引', '地圖', '老照片'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '百年臺灣音聲',
        url: 'https://audio.nmth.gov.tw/',
        description: '國立臺灣歷史博物館數位化歷史音訊資料，收錄百年來的音樂與聲音記錄',
        institution: '國立臺灣歷史博物館',
        resourceType: 'archive',
        tags: ['音聲', '音樂', '歷史錄音'],
        language: ['zh-TW'],
        accessType: 'free'
      }
    ]
  },
  {
    id: 'local-gazetteers',
    name: '地方志書',
    nameEn: 'Local Gazetteers',
    icon: '📜',
    description: '台灣各地方志與縣市志數位資源，記錄地方歷史變遷',
    resources: [
      {
        name: '臺灣方志',
        url: 'http://county.ntl.edu.tw/',
        description: '收錄台灣各縣市方志、鄉鎮志的數位化版本，可線上閱覽或下載',
        institution: '國立臺灣圖書館',
        resourceType: 'library',
        tags: ['方志', '地方史', '縣志', '鄉鎮志'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '臺灣記憶 - 臺灣鄉土文獻',
        url: 'https://tm.ncl.edu.tw/topic/1',
        description: '國家圖書館收錄的台灣各地鄉土文獻與地方志書數位化資源',
        institution: '國家圖書館',
        resourceType: 'document',
        tags: ['鄉土文獻', '地方志', '數位化'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '臺灣文獻叢刊',
        url: 'https://taiwanebook.ncl.edu.tw/',
        description: '收錄清代及日治時期台灣相關文獻，包含方志、遊記、公牘等',
        institution: '國家圖書館',
        resourceType: 'library',
        tags: ['文獻叢刊', '清代', '日治時期'],
        language: ['zh-TW'],
        accessType: 'free'
      }
    ]
  },
  {
    id: 'indigenous',
    name: '原住民族資源',
    nameEn: 'Indigenous Peoples Resources',
    icon: '🎭',
    description: '台灣原住民族十六族的文化、語言與歷史數位資源',
    resources: [
      {
        name: '臺灣原住民族數位典藏入口網',
        url: 'https://digitalarchives.tacp.gov.tw/',
        description: '原住民族文化影音、文獻、文物的數位典藏平台，含傳統聚落、歲時祭儀等',
        institution: '原住民族委員會',
        resourceType: 'archive',
        tags: ['原住民', '文化典藏', '影音', '祭儀'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '臺灣原住民族事典',
        url: 'https://aborgpedia.alcd.center/',
        description: '原住民族百科事典，系統性介紹各族文化、歷史與現況',
        institution: '原住民族語言研究發展基金會',
        resourceType: 'database',
        tags: ['百科', '原住民族', '文化知識'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '原住民族語言線上詞典',
        url: 'https://e-dictionary.ilrdf.org.tw/',
        description: '提供16族原住民族語言詞典查詢，含發音與例句',
        institution: '原住民族語言研究發展基金會',
        resourceType: 'database',
        tags: ['語言', '詞典', '原住民族語'],
        language: ['zh-TW'],
        accessType: 'free'
      }
    ]
  },
  {
    id: 'japanese-era',
    name: '日治時期資源',
    nameEn: 'Japanese Colonial Era Resources',
    icon: '🏛️',
    description: '日治時期 (1895-1945) 專門史料與資料庫',
    resources: [
      {
        name: '臺灣法實證研究資料庫－日治時期',
        url: 'http://tcsd.lib.ntu.edu.tw/',
        description: '日治時期法律、判例、法令的數位化資料庫，蒐集與法律相關的詳細統計記錄',
        institution: '國立臺灣大學',
        resourceType: 'database',
        tags: ['法律', '日治時期', '判例', '統計'],
        language: ['zh-TW', 'ja'],
        accessType: 'free'
      },
      {
        name: '日治時期臺灣圖書全文影像系統',
        url: 'http://stfb.ntl.edu.tw/',
        description: '收錄日治時期在台灣出版的各類書籍數位化全文影像',
        institution: '國立臺灣圖書館',
        resourceType: 'library',
        tags: ['圖書', '日治時期', '全文影像'],
        language: ['zh-TW', 'ja'],
        accessType: 'free'
      },
      {
        name: '臺灣總督府檔案',
        url: 'https://sotokufu.sinica.edu.tw/',
        description: '日治時期臺灣總督府官方檔案數位化資料庫',
        institution: '中央研究院臺灣史研究所',
        resourceType: 'archive',
        tags: ['總督府', '官方檔案', '日治時期'],
        language: ['zh-TW', 'ja'],
        accessType: 'free'
      }
    ]
  },
  {
    id: 'maps-geography',
    name: '歷史地圖',
    nameEn: 'Historical Maps & Geography',
    icon: '🗺️',
    description: '台灣歷史地圖與地理資訊系統，追蹤空間變遷',
    resources: [
      {
        name: '台灣歷史文化地圖',
        url: 'https://thcts.sinica.edu.tw/',
        description: '中研院建置的台灣歷史文化 GIS 系統，整合空間與時間資訊，可疊合不同時期地圖',
        institution: '中央研究院',
        resourceType: 'map',
        tags: ['GIS', '地圖', '空間歷史', '疊圖'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '臺灣百年歷史地圖',
        url: 'https://gissrv4.sinica.edu.tw/gis/twhgis/',
        description: '整合日治時期以來各版台灣地形圖，可進行古今地圖對照',
        institution: '中央研究院',
        resourceType: 'map',
        tags: ['歷史地圖', '地形圖', '古今對照'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '臺灣堡圖影像檢索系統',
        url: 'http://gissrv4.sinica.edu.tw/gis/taipei.aspx',
        description: '日治時期臺灣堡圖數位化影像，可查詢清代至日治地名變遷',
        institution: '中央研究院',
        resourceType: 'map',
        tags: ['堡圖', '日治時期', '地名'],
        language: ['zh-TW', 'ja'],
        accessType: 'free'
      }
    ]
  },
  {
    id: 'qing-dynasty',
    name: '清領時期資源',
    nameEn: 'Qing Dynasty Era Resources',
    icon: '📖',
    description: '清朝統治時期 (1683-1895) 相關史料',
    resources: [
      {
        name: '淡新檔案',
        url: 'http://thdl.ntu.edu.tw/THDL/RetrieveDocs.php',
        description: '清代新竹、淡水廳官方檔案，共計19,000餘件，是研究清代台灣社會的重要史料',
        institution: '國立臺灣大學',
        resourceType: 'archive',
        tags: ['清代', '淡新檔案', '官方文書'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '古契書',
        url: 'http://thdl.ntu.edu.tw/THDL/RetrieveDocs.php',
        description: '清代台灣民間契約文書，涵蓋土地買賣、典當、分家等各類契約',
        institution: '國立臺灣大學',
        resourceType: 'document',
        tags: ['古契書', '契約', '土地', '清代'],
        language: ['zh-TW'],
        accessType: 'free'
      }
    ]
  },
  {
    id: 'academic-research',
    name: '學術研究資源',
    nameEn: 'Academic Research Resources',
    icon: '🎓',
    description: '台灣歷史學術期刊與研究論文',
    resources: [
      {
        name: '臺灣史研究',
        url: 'https://www.ith.sinica.edu.tw/quarterly.php',
        description: '中研院臺灣史研究所出版的學術季刊，收錄台灣史研究論文',
        institution: '中央研究院臺灣史研究所',
        resourceType: 'library',
        tags: ['學術期刊', '台灣史', '論文'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '臺灣文獻季刊',
        url: 'https://www.th.gov.tw/new_site/04publish/publish01.php',
        description: '國史館臺灣文獻館出版的學術季刊',
        institution: '國史館臺灣文獻館',
        resourceType: 'library',
        tags: ['學術期刊', '台灣文獻', '研究'],
        language: ['zh-TW'],
        accessType: 'free'
      },
      {
        name: '臺灣博碩士論文知識加值系統',
        url: 'https://ndltd.ncl.edu.tw/',
        description: '可查詢台灣歷史相關碩博士論文全文',
        institution: '國家圖書館',
        resourceType: 'library',
        tags: ['論文', '碩博士', '學術研究'],
        language: ['zh-TW'],
        accessType: 'free'
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

// 根據資源類型取得圖示
export function getResourceTypeIcon(type: TaiwanHistoryResource['resourceType']): string {
  const icons: Record<TaiwanHistoryResource['resourceType'], string> = {
    archive: '🗄️',
    database: '💾',
    library: '📚',
    map: '🗺️',
    photo: '📷',
    document: '📄'
  };
  return icons[type] || '📋';
}

// 根據存取類型取得標籤
export function getAccessTypeLabel(type: TaiwanHistoryResource['accessType']): string {
  const labels: Record<TaiwanHistoryResource['accessType'], string> = {
    free: '免費',
    subscription: '訂閱制',
    partial: '部分免費'
  };
  return labels[type] || '未知';
}

export default externalResources;
