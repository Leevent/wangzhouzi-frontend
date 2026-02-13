// 台灣歷史時代與主題分類配置

export interface EraStyle {
  icon: string;
  color: string;
  description: string;
  dateRange: string;
  startYear: number;
  endYear: number;
}

export interface TopicStyle {
  icon: string;
  color: string;
  description: string;
}

// 歷史時代分類
export const eraConfig: Record<string, EraStyle> = {
  '史前時代': {
    icon: '🏺',
    color: '#8B4513',
    description: '台灣史前文化遺址與考古發現，包括長濱文化、圓山文化、卑南文化等',
    dateRange: '~1624',
    startYear: -50000,
    endYear: 1624
  },
  '荷西時期': {
    icon: '⚓',
    color: '#FF6B35',
    description: '荷蘭與西班牙殖民時期，大航海時代下的台灣',
    dateRange: '1624-1662',
    startYear: 1624,
    endYear: 1662
  },
  '明鄭時期': {
    icon: '🏯',
    color: '#2E8B57',
    description: '鄭成功與明鄭政權統治時期，反清復明的歷史',
    dateRange: '1662-1683',
    startYear: 1662,
    endYear: 1683
  },
  '清領時期': {
    icon: '🏛️',
    color: '#DAA520',
    description: '清朝統治下的台灣開發、移民社會與漢番關係',
    dateRange: '1683-1895',
    startYear: 1683,
    endYear: 1895
  },
  '日治時期': {
    icon: '🏭',
    color: '#DC143C',
    description: '日本統治時期的現代化建設、社會變遷與文化發展',
    dateRange: '1895-1945',
    startYear: 1895,
    endYear: 1945
  },
  '戰後時期': {
    icon: '🏢',
    color: '#4169E1',
    description: '二戰後台灣的政治發展、經濟奇蹟與民主化歷程',
    dateRange: '1945-今',
    startYear: 1945,
    endYear: 2026
  }
};

// 歷史主題分類
export const topicConfig: Record<string, TopicStyle> = {
  '原住民族': {
    icon: '🎭',
    color: '#8B008B',
    description: '台灣原住民族十六族的文化、語言、傳統與當代發展'
  },
  '地方志書': {
    icon: '📜',
    color: '#CD853F',
    description: '各縣市方志、鄉鎮志與地方歷史文獻'
  },
  '歷史地圖': {
    icon: '🗺️',
    color: '#20B2AA',
    description: '台灣歷史地圖、行政區劃變遷與地理資訊'
  },
  '老照片': {
    icon: '📷',
    color: '#696969',
    description: '珍貴歷史照片、影像資料與視覺記憶'
  },
  '社會人文': {
    icon: '👥',
    color: '#9370DB',
    description: '社會變遷、民俗信仰、日常生活與人文記錄'
  },
  '經濟產業': {
    icon: '🌾',
    color: '#228B22',
    description: '農業、工業、貿易發展與經濟史'
  },
  '政治法律': {
    icon: '⚖️',
    color: '#4682B4',
    description: '政治制度、法律沿革與治理歷史'
  },
  '教育文化': {
    icon: '🎓',
    color: '#FF8C00',
    description: '教育發展、文學藝術、文化運動與知識傳承'
  },
  '建築古蹟': {
    icon: '🏰',
    color: '#A0522D',
    description: '歷史建築、古蹟保存與建築文化資產'
  },
  '交通發展': {
    icon: '🚂',
    color: '#708090',
    description: '鐵路、公路、港口等交通建設史'
  },
  '醫療衛生': {
    icon: '🏥',
    color: '#3CB371',
    description: '醫療發展、公共衛生與疾病防治史'
  },
  '宗教信仰': {
    icon: '🛕',
    color: '#B8860B',
    description: '宗教發展、廟宇文化與民間信仰'
  },
  '預設': {
    icon: '📚',
    color: '#78909C',
    description: '其他台灣歷史相關內容'
  }
};

// 取得時代樣式的輔助函數
export function getEraStyle(eraName: string): EraStyle {
  return eraConfig[eraName] || {
    icon: '📚',
    color: '#78909C',
    description: '台灣歷史',
    dateRange: '',
    startYear: 0,
    endYear: 2026
  };
}

// 取得主題樣式的輔助函數
export function getTopicStyle(topicName: string): TopicStyle {
  return topicConfig[topicName] || topicConfig['預設'];
}

// 取得所有時代列表
export function getAllEras(): Array<{ name: string } & EraStyle> {
  return Object.entries(eraConfig).map(([name, style]) => ({
    name,
    ...style
  }));
}

// 取得所有主題列表
export function getAllTopics(): Array<{ name: string } & TopicStyle> {
  return Object.entries(topicConfig)
    .filter(([name]) => name !== '預設')
    .map(([name, style]) => ({
      name,
      ...style
    }));
}

// 根據年份取得對應時代
export function getEraByYear(year: number): string {
  for (const [name, era] of Object.entries(eraConfig)) {
    if (year >= era.startYear && year <= era.endYear) {
      return name;
    }
  }
  return '戰後時期';
}

// 時代 slug 對應表
export const eraSlugMap: Record<string, string> = {
  'prehistoric': '史前時代',
  'dutch-spanish': '荷西時期',
  'koxinga': '明鄭時期',
  'qing': '清領時期',
  'japanese': '日治時期',
  'postwar': '戰後時期'
};

// 取得時代 slug
export function getEraSlug(eraName: string): string {
  for (const [slug, name] of Object.entries(eraSlugMap)) {
    if (name === eraName) return slug;
  }
  return 'unknown';
}

// 根據 slug 取得時代名稱
export function getEraNameBySlug(slug: string): string {
  return eraSlugMap[slug] || '';
}

export default { eraConfig, topicConfig };
