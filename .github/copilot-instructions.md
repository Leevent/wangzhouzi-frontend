# AI Agent Instructions for iwantyouknow Web Project

本文件提供了在此程式碼庫中工作所需的關鍵資訊和上下文。

## 專案概述

這是一個使用 Next.js App Router 建構的資源分享平台，整合了 Ghost CMS 作為後端內容管理系統。專案的主要目標是提供一個易於使用的介面來展示和分享各類免費資源。

## 核心架構

### 資料流
- Ghost CMS API (`src/lib/ghost.ts`) → Next.js 頁面 → 使用者介面
- 所有內容查詢都通過 `GhostService` 類別處理
- 使用 SSR 進行首次渲染，確保 SEO 友好

### 關鍵元件
- `src/lib/ghost.ts`: Ghost CMS 整合的核心服務
- `src/config/categories.ts`: 資源分類的中央配置
- `src/app/**/page.tsx`: Next.js App Router 頁面組件

## 開發工作流程

### 環境設定
```bash
# 安裝依賴
npm install

# 開發環境運行
npm run dev

# 建置生產版本
npm run build
```

### 必要環境變數
- `GHOST_API_URL`: Ghost CMS API 端點
- `GHOST_CONTENT_API_KEY`: Ghost API 存取金鑰

## 專案慣例

### 資源分類
- 所有資源分類都在 `src/config/categories.ts` 中定義
- 每個分類都必須包含：icon、color 和 description
- 使用 `預設` 作為未分類資源的歸類

### 型別定義
- 資源相關型別定義在 `src/lib/ghost.ts` 中
- 使用 TypeScript 介面確保型別安全

### 頁面路由
- `/`: 首頁，展示精選資源
- `/category/[slug]`: 分類頁面
- `/resource/[slug]`: 單一資源詳情頁面
- `/resources`: 所有資源列表
- `/search`: 搜尋頁面

## 整合要點

### Ghost CMS 整合
- 使用 `@tryghost/content-api` 套件進行 API 調用
- 所有 Ghost 相關操作都封裝在 `GhostService` 類別中
- Content API 使用 v5.0 版本

### SEO 優化
- 使用 Next.js 的 SSR 功能
- 每個頁面都應該包含適當的 meta 標籤
- 圖片應使用 Next.js Image 組件優化載入

## 常見任務

### 新增資源分類
1. 在 `src/config/categories.ts` 中新增分類定義
2. 確保提供所有必要欄位（icon、color、description）
3. 更新相關頁面組件以支援新分類

### 修改頁面佈局
1. 檢查 `src/app/layout.tsx` 中的全局佈局
2. 根據需要在特定頁面中覆寫佈局

如有任何不清楚或需要補充的部分，請告訴我。