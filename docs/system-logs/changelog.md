# 望周知 - 系統更新日誌

## 2026-02-13 - SEO 優化與第三方追蹤整合

### SEO 基礎建設
- 新增動態 `sitemap.ts` - 自動生成所有靜態與動態頁面的 sitemap
- 新增 `robots.ts` - 搜尋引擎爬蟲規則配置
- 更新 `layout.tsx` - 完整 metadata、viewport、canonical URL

### JSON-LD 結構化數據
| 組件 | 用途 |
|------|------|
| WebsiteJsonLd | 網站基本資訊、搜尋功能標記 |
| OrganizationJsonLd | 組織資訊、聯絡方式 |
| ArticleJsonLd | 文章結構化數據（資源頁面） |
| BreadcrumbJsonLd | 麵包屑導航標記 |

### 社群分享縮圖
- 新增動態 OG Image 生成 (`opengraph-image.tsx`) - 1200x630
- 新增動態 Twitter Card 圖片 (`twitter-image.tsx`)
- 新增動態 Favicon (`icon.tsx`) - 32x32
- 新增動態 Apple Touch Icon (`apple-icon.tsx`) - 180x180
- 新增 PWA Manifest (`site.webmanifest`)

### 第三方追蹤整合
| 服務 | 環境變數 | 狀態 |
|------|----------|------|
| Google Tag Manager | `NEXT_PUBLIC_GTM_ID=GTM-MXKTN5FK` | ✅ 已設定 |
| Google Analytics 4 | `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-2T53LRQDLP` | ✅ 已設定 |
| Google Ads | `NEXT_PUBLIC_GOOGLE_ADS_ID` | 待設定 |

### 新增檔案
```
20260213/
├── src/app/
│   ├── sitemap.ts              # 動態 Sitemap
│   ├── robots.ts               # Robots.txt
│   ├── opengraph-image.tsx     # OG 圖片生成
│   ├── twitter-image.tsx       # Twitter 卡片圖片
│   ├── icon.tsx                # 動態 Favicon
│   └── apple-icon.tsx          # Apple Touch Icon
├── src/components/
│   ├── analytics/
│   │   ├── GoogleTagManager.tsx
│   │   ├── GoogleAnalytics.tsx
│   │   ├── GoogleAds.tsx
│   │   └── index.ts
│   └── seo/
│       ├── WebsiteJsonLd.tsx
│       ├── OrganizationJsonLd.tsx
│       ├── ArticleJsonLd.tsx
│       ├── BreadcrumbJsonLd.tsx
│       └── index.ts
├── public/
│   └── site.webmanifest        # PWA 配置
└── .env.local.example          # 環境變數範例
```

### 驗證清單
- [x] Build 成功
- [x] Git commit & push 完成
- [ ] Zeabur 環境變數設定
- [ ] Sitemap 驗證 (`/sitemap.xml`)
- [ ] Robots 驗證 (`/robots.txt`)
- [ ] OG 圖片測試 (Facebook Debugger)
- [ ] GTM 預覽模式驗證

---

## 2026-02-13 - 專案重構與優化

### 專案定位恢復
- **原始定位**：台灣在地優質免費資源平台
- **標語**：希望每個人都能知道
- **目標用戶**：台灣居民尋找免費數位資源、政府服務、社會福利

### 專案結構優化
```
web-iwantyouknow/
├── .claude/              # Claude 設定 + skill.md
├── .github/              # GitHub 設定
├── .vscode/              # VS Code 設定
├── docs/
│   └── system-logs/
│       └── changelog.md  # 本檔案
├── 20260213/             # 主專案（優化版）
│   ├── src/
│   │   ├── app/          # 頁面
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── resources/
│   │   │   ├── categories/
│   │   │   ├── category/[slug]/
│   │   │   ├── resource/[slug]/
│   │   │   ├── external-resources/
│   │   │   ├── search/
│   │   │   ├── blog/
│   │   │   ├── guide/
│   │   │   └── about/
│   │   ├── components/
│   │   │   ├── layout/   # 統一布局元件
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── MobileNav.tsx
│   │   │   └── ui/       # UI 元件
│   │   │       ├── Button.tsx
│   │   │       ├── ResourceCard.tsx
│   │   │       ├── CategoryCard.tsx
│   │   │       ├── HeroSearch.tsx
│   │   │       ├── PageHeader.tsx
│   │   │       ├── Skeleton.tsx
│   │   │       └── ScrollToTop.tsx
│   │   ├── config/
│   │   │   ├── site.ts           # 網站配置
│   │   │   ├── categories.ts     # 分類配置
│   │   │   └── external-resources.ts # 外部資源配置
│   │   ├── lib/
│   │   │   ├── ghost.ts          # Ghost API 服務
│   │   │   └── utils.ts          # 工具函式
│   │   └── types/
│   │       └── ghost-content-api.d.ts
│   ├── public/
│   ├── free-resources.json       # 資源資料
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── UI-RECOMMENDATIONS.md
│   └── CHAOS-TEST-REPORT.md
└── taiwan-history/       # 台灣歷史專案（獨立）
```

### 主要變更

#### 1. 架構優化
- 統一 Layout 模式，消除 Nav/Footer 重複代碼 (~90% 減少)
- 建立可重用 UI 元件庫
- 新增響應式底部導航 (MobileNav)
- 新增骨架屏載入效果 (Skeleton)

#### 2. 安全修復
- 移除硬編碼 Ghost API Key
- API Key 必須透過環境變數設定
- 舊 API Key 已重新產生

#### 3. 專案分離
- 台灣歷史內容移至獨立 `taiwan-history/` 專案
- 恢復「望周知」原始免費資源平台定位
- 移除台灣歷史相關配置檔案

#### 4. 資料夾清理
- 刪除空檔案 (dir, git, nul)
- 刪除無關 HTML 檔案
- 刪除舊版專案 (src/, .next/)
- 移動 skill.md 至 .claude/
- 移動 free-resources.json 至 20260213/

### 技術棧
| 項目 | 版本 |
|------|------|
| Next.js | 15 |
| React | 19 |
| Tailwind CSS | 4 |
| TypeScript | 5 |
| Ghost CMS | v5 API |

### 部署資訊
| 項目 | 值 |
|------|-----|
| 平台 | Zeabur |
| 部署方式 | GitHub 連動 |
| Root Directory | 20260213 |
| 前端 URL | https://oldcity-frontend.zeabur.app |
| Ghost URL | https://iwantyouknow.zeabur.app |

### 環境變數
```
# Ghost CMS
GHOST_API_URL=https://iwantyouknow.zeabur.app
GHOST_CONTENT_API_KEY=<API Key>

# 第三方追蹤 (v2.1.0 新增)
NEXT_PUBLIC_GTM_ID=GTM-MXKTN5FK
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-2T53LRQDLP
NEXT_PUBLIC_GOOGLE_ADS_ID=<待設定>
```

---

## 待辦事項

- [ ] 確認 Zeabur 部署成功
- [ ] 測試 Ghost CMS 連接
- [ ] 新增更多外部資源
- [x] SEO 優化 (sitemap, robots, JSON-LD)
- [x] Google Analytics 整合 (GA4 + GTM)
- [ ] 效能監控設置
- [ ] Zeabur 環境變數設定 (GTM_ID, GA_MEASUREMENT_ID)
- [ ] Google Search Console 提交 sitemap

---

## 版本歷史

| 日期 | 版本 | 說明 |
|------|------|------|
| 2026-02-13 | v2.1.0 | SEO 優化、GTM/GA4 整合、社群分享縮圖 |
| 2026-02-13 | v2.0.0 | 專案重構、架構優化、安全修復 |
| 2025-09-07 | v1.0.0 | 專案初始化 |
