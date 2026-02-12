# 望周知 - 台灣在地優質資源平台

> 希望每個人都能知道 - 發掘台灣在地的優質資源與服務

## 專案概述

「望周知」是一個致力於整合台灣在地優質資源的平台，目標是讓每個人都能平等地獲取免費的優質服務資訊。從免費數位圖書館到正規大學課程，從政府便民服務到社會福利資源，我們整理這些珍貴資源，讓使用者能夠輕鬆找到並使用。

## 技術架構

- **前端框架**: Next.js 15 (App Router)
- **UI 框架**: Tailwind CSS 4
- **後端 CMS**: Ghost (Headless CMS)
- **部署平台**: Zeabur

## 專案結構

```
20260213/
├── README.md                    # 專案說明
├── ARCHITECTURE.md              # 架構文件
├── package.json                 # 依賴配置
├── next.config.ts               # Next.js 配置
├── tsconfig.json                # TypeScript 配置
├── postcss.config.mjs           # PostCSS 配置
│
├── public/                      # 靜態資源
│
└── src/
    ├── app/                     # Next.js App Router 頁面
    │   ├── layout.tsx           # 根佈局（統一 Nav + Footer）
    │   ├── page.tsx             # 首頁
    │   ├── globals.css          # 全域樣式
    │   ├── not-found.tsx        # 404 頁面
    │   ├── resources/           # 所有資源頁
    │   ├── categories/          # 分類瀏覽頁
    │   ├── category/[slug]/     # 單一分類頁
    │   ├── resource/[slug]/     # 單一資源詳情頁
    │   ├── search/              # 搜尋頁
    │   ├── blog/                # 部落格頁
    │   ├── about/               # 關於我們
    │   └── guide/               # 使用指南
    │
    ├── components/
    │   ├── layout/              # 佈局元件
    │   │   ├── Navbar.tsx       # 導航列
    │   │   └── Footer.tsx       # 頁尾
    │   │
    │   └── ui/                  # 可重用 UI 元件
    │       ├── index.ts         # 統一匯出
    │       ├── Button.tsx       # 按鈕元件
    │       ├── ResourceCard.tsx # 資源卡片
    │       ├── CategoryCard.tsx # 分類卡片
    │       ├── PageHeader.tsx   # 頁面標題
    │       └── ScrollToTop.tsx  # 回到頂部
    │
    ├── lib/
    │   ├── ghost.ts             # Ghost API 服務
    │   └── utils.ts             # 通用工具函數
    │
    └── config/
        ├── site.ts              # 網站配置
        └── categories.ts        # 分類樣式配置
```

## 快速開始

### 安裝依賴

```bash
npm install
```

### 環境變數

建立 `.env.local` 檔案：

```env
GHOST_API_URL=https://iwantyouknow.zeabur.app
GHOST_CONTENT_API_KEY=your_api_key
```

### 開發模式

```bash
npm run dev
```

### 建置專案

```bash
npm run build
```

## 主要功能

1. **資源瀏覽**: 瀏覽所有台灣在地優質資源
2. **分類篩選**: 按類別快速找到所需資源
3. **搜尋功能**: 關鍵字搜尋資源
4. **響應式設計**: 支援桌面與行動裝置
5. **部落格**: 分享資源使用心得與最新資訊（即將推出）

## 資源分類

- 📚 數位學習
- 🏛️ 政府服務
- 🤝 社會福利
- 💡 技能培訓
- 🌐 數位工具
- 📖 圖書館資源
- 🎓 開放式課程
- 💼 創業經營

## 相關連結

- **前端網站**: https://oldcity-frontend.zeabur.app/
- **後端服務**: https://iwantyouknow.zeabur.app/

## 授權

Copyright © 2026 望周知 - 台灣在地優質資源平台
