// 部落格分類樣式配置

export interface BlogCategoryStyle {
  icon: string;
  color: string;
  name: string;
  description: string;
}

// 部落格分類對應表
// slug 格式：blog-{分類名稱}
const blogCategoryStyles: Record<string, BlogCategoryStyle> = {
  'blog-教學': {
    icon: '📖',
    color: '#4CAF50',
    name: '教學',
    description: '教學文章與實用指南',
  },
  'blog-心得': {
    icon: '💭',
    color: '#2196F3',
    name: '心得',
    description: '使用心得與經驗分享',
  },
  'blog-新聞': {
    icon: '📰',
    color: '#FF9800',
    name: '新聞',
    description: '最新消息與動態報導',
  },
  'blog-資源介紹': {
    icon: '🔗',
    color: '#9C27B0',
    name: '資源介紹',
    description: '優質資源推薦與介紹',
  },
};

// 預設樣式
const defaultBlogCategoryStyle: BlogCategoryStyle = {
  icon: '📝',
  color: '#78909C',
  name: '文章',
  description: '部落格文章',
};

/**
 * 根據部落格分類 slug 取得樣式
 * @param slug - 部落格分類的 slug（如：blog-教學）
 */
export function getBlogCategoryStyle(slug: string): BlogCategoryStyle {
  return blogCategoryStyles[slug] || defaultBlogCategoryStyle;
}

/**
 * 根據分類名稱取得樣式
 * @param name - 分類名稱（如：教學）
 */
export function getBlogCategoryStyleByName(name: string): BlogCategoryStyle {
  const slug = `blog-${name}`;
  return blogCategoryStyles[slug] || defaultBlogCategoryStyle;
}

/**
 * 取得所有部落格分類樣式
 */
export function getAllBlogCategoryStyles(): Record<string, BlogCategoryStyle> {
  return blogCategoryStyles;
}

/**
 * 取得部落格分類列表（用於導航）
 */
export function getBlogCategoryList(): Array<{ slug: string; name: string; icon: string }> {
  return Object.entries(blogCategoryStyles).map(([slug, style]) => ({
    slug,
    name: style.name,
    icon: style.icon,
  }));
}
