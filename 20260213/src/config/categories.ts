// 分類配置 - 統一管理所有分類的視覺呈現
export interface CategoryStyle {
  icon: string;
  color: string;
  description: string;
}

export const categoryConfig: Record<string, CategoryStyle> = {
  '數位學習': {
    icon: '📚',
    color: '#E57373',
    description: '免費的線上課程、電子書籍、數位雜誌等學習資源'
  },
  '政府服務': {
    icon: '🏛️',
    color: '#64B5F6',
    description: '各級政府機關提供的便民服務與線上申辦系統'
  },
  '社會福利': {
    icon: '🤝',
    color: '#81C784',
    description: '社會福利資源、補助計畫、弱勢關懷等相關服務'
  },
  '技能培訓': {
    icon: '💡',
    color: '#FFB74D',
    description: '職業訓練、技能認證、專業進修等培訓機會'
  },
  '數位工具': {
    icon: '🌐',
    color: '#BA68C8',
    description: '免費軟體、線上工具、數位服務等實用資源'
  },
  '圖書館資源': {
    icon: '📖',
    color: '#A5D6A7',
    description: '圖書館數位資源、免費借閱服務'
  },
  '開放式課程': {
    icon: '🎓',
    color: '#FFCC80',
    description: '大學開放式課程、免費學習平台'
  },
  '創業經營': {
    icon: '💼',
    color: '#F8BBD9',
    description: '創業資源、經營管理、商業服務'
  },
  '職業訓練': {
    icon: '🛠️',
    color: '#90CAF9',
    description: '政府職業訓練、進修課程、就業輔導'
  },
  '預設': {
    icon: '📋',
    color: '#78909C',
    description: '其他優質資源'
  }
};

// 取得分類樣式的輔助函數
export function getCategoryStyle(categoryName: string): CategoryStyle {
  return categoryConfig[categoryName] || categoryConfig['預設'];
}

export default categoryConfig;
