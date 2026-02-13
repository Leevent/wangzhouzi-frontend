# 望周知 - 系統更新日誌

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
GHOST_API_URL=https://iwantyouknow.zeabur.app
GHOST_CONTENT_API_KEY=<新產生的 API Key>
```

---

## 待辦事項

- [ ] 確認 Zeabur 部署成功
- [ ] 測試 Ghost CMS 連接
- [ ] 新增更多外部資源
- [ ] SEO 優化
- [ ] Google Analytics 整合
- [ ] 效能監控設置

---

## 版本歷史

| 日期 | 版本 | 說明 |
|------|------|------|
| 2026-02-13 | v2.0.0 | 專案重構、架構優化、安全修復 |
| 2025-09-07 | v1.0.0 | 專案初始化 |
