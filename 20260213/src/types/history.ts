// 台灣歷史網站資料型別定義

// ========================================
// 時間軸相關型別
// ========================================

/**
 * 歷史事件 - 用於時間軸顯示
 */
export interface HistoricalEvent {
  id: string;
  title: string;
  titleEn?: string;
  /** ISO 日期格式 (如 "1895-04-17") 或僅年份 (如 "1895") */
  date: string;
  /** 事件結束日期，用於跨時期事件 */
  endDate?: string;
  /** 時代標識 (如 "qing", "japanese") */
  era: string;
  /** 主題分類 */
  category: string;
  /** 事件簡述 */
  description: string;
  /** 詳細 HTML 內容 */
  htmlContent?: string;
  /** 重要性等級 */
  significance: 'major' | 'moderate' | 'minor';
  /** 發生地點 */
  location?: EventLocation;
  /** 關聯圖片 ID 列表 */
  relatedImages?: string[];
  /** 關聯資源 slug 列表 */
  relatedResources?: string[];
  /** 參考來源 */
  sources: Source[];
  /** 標籤 */
  tags: string[];
}

/**
 * 事件地點資訊
 */
export interface EventLocation {
  name: string;
  /** [緯度, 經度] */
  coordinates?: [number, number];
  /** 現今地名 */
  modernName?: string;
}

// ========================================
// 時代定義
// ========================================

/**
 * 歷史時代
 */
export interface Era {
  id: string;
  name: string;
  nameEn: string;
  startYear: number;
  endYear: number;
  color: string;
  icon: string;
  description: string;
}

// ========================================
// 圖庫相關型別
// ========================================

/**
 * 圖庫圖片
 */
export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  /** 估計拍攝日期 */
  dateEstimate?: string;
  /** 日期精確度 */
  datePrecision: 'exact' | 'year' | 'decade' | 'era' | 'unknown';
  /** 圖片網址 */
  imageUrl: string;
  /** 縮圖網址 */
  thumbnailUrl: string;
  /** 高解析度圖片網址 */
  highResUrl?: string;
  /** 圖片來源 */
  source: Source;
  /** 所屬專輯/集合 */
  collection: string;
  /** 所屬時代 */
  era?: string;
  /** 拍攝/繪製地點 */
  location?: string;
  /** 標籤 */
  tags: string[];
  /** 圖片尺寸 */
  dimensions?: {
    width: number;
    height: number;
  };
  /** 授權資訊 */
  license?: string;
  /** 攝影者/繪者 */
  creator?: string;
  /** 圖中主題 (人物、建築等) */
  subjects?: string[];
}

/**
 * 圖庫專輯/集合
 */
export interface GalleryCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** 封面圖片 */
  coverImage: string;
  /** 圖片數量 */
  imageCount: number;
  /** 所屬時代 */
  era?: string;
  /** 主題 */
  theme?: string;
}

// ========================================
// 地方志書相關型別
// ========================================

/**
 * 地方志書
 */
export interface Gazetteer {
  id: string;
  title: string;
  /** 地區名稱 */
  region: string;
  /** 地區 slug */
  regionSlug: string;
  /** 出版年份 */
  yearPublished?: number;
  /** 編纂時代 */
  era: string;
  description: string;
  /** 數位化版本網址 */
  digitalUrl?: string;
  /** 來源資訊 */
  source: Source;
  /** 章節列表 */
  chapters?: GazetteerChapter[];
  /** 關聯圖片 */
  relatedImages?: string[];
}

/**
 * 志書章節
 */
export interface GazetteerChapter {
  title: string;
  summary: string;
  pageRange?: string;
}

/**
 * 台灣地區
 */
export interface TaiwanRegion {
  id: string;
  name: string;
  slug: string;
  /** 現今行政區 */
  modernName?: string;
  /** 歷史沿革簡述 */
  history?: string;
  /** 地圖座標中心點 */
  center?: [number, number];
  /** 相關志書數量 */
  gazetteerCount?: number;
}

// ========================================
// 來源引用
// ========================================

/**
 * 資料來源
 */
export interface Source {
  name: string;
  url?: string;
  institution?: string;
  accessDate?: string;
  citation?: string;
}

// ========================================
// 部落格相關型別 (擴充現有 Ghost 整合)
// ========================================

/**
 * 歷史部落格文章
 */
export interface HistoryBlogPost {
  id: string;
  title: string;
  excerpt: string;
  html: string;
  slug: string;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  /** 分類 (時代/主題) */
  categories: string[];
  tags: string[];
  /** 關聯時代 */
  relatedEras?: string[];
  coverImage?: string;
  readingTime?: number;
  /** 相關文章 slug */
  relatedPosts?: string[];
}

// ========================================
// 搜尋相關型別
// ========================================

/**
 * 搜尋參數
 */
export interface SearchParams {
  /** 搜尋關鍵字 */
  query?: string;
  /** 時代篩選 */
  era?: string;
  /** 主題篩選 */
  category?: string;
  /** 內容類型 */
  contentType?: ('article' | 'image' | 'gazetteer' | 'event')[];
  /** 起始年份 */
  startYear?: number;
  /** 結束年份 */
  endYear?: number;
  /** 標籤 */
  tags?: string[];
  /** 排序方式 */
  sortBy?: 'relevance' | 'date' | 'title';
  /** 排序方向 */
  sortOrder?: 'asc' | 'desc';
  /** 分頁 */
  page?: number;
  limit?: number;
}

/**
 * 搜尋結果
 */
export interface SearchResult {
  /** 結果類型 */
  type: 'article' | 'image' | 'gazetteer' | 'event';
  id: string;
  title: string;
  excerpt?: string;
  /** 匹配片段 (高亮) */
  snippet?: string;
  url: string;
  thumbnail?: string;
  era?: string;
  date?: string;
  /** 相關度分數 */
  score?: number;
}

/**
 * 搜尋回應
 */
export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  totalPages: number;
  query: string;
  filters: Partial<SearchParams>;
}

// ========================================
// 時間軸狀態管理
// ========================================

/**
 * 時間軸視圖狀態
 */
export interface TimelineState {
  /** 縮放等級 (1-10) */
  zoomLevel: number;
  /** 當前中心年份 */
  centerYear: number;
  /** 選中的時代 */
  selectedEra: string | null;
  /** 選中的主題分類 */
  selectedCategories: string[];
  /** 顯示模式 */
  viewMode: 'horizontal' | 'vertical';
  /** 選中的事件 */
  selectedEvent: HistoricalEvent | null;
  /** 顯示重要性篩選 */
  significanceFilter: ('major' | 'moderate' | 'minor')[];
}

// ========================================
// API 回應型別
// ========================================

/**
 * API 分頁回應
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * API 錯誤回應
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
