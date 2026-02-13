'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  // 如果沒有設定 GA ID，不渲染任何內容
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// 頁面瀏覽追蹤（用於 SPA 路由變化）
export function trackPageView(url: string, title: string) {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  }
}

// 自訂事件追蹤
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// 搜尋事件追蹤
export function trackSearch(searchTerm: string) {
  trackEvent('search', 'engagement', searchTerm);
}

// 資源點擊追蹤
export function trackResourceClick(resourceSlug: string, resourceTitle: string) {
  trackEvent('view_item', 'resource', resourceTitle);
}

// 外部連結點擊追蹤
export function trackOutboundLink(url: string, linkText: string) {
  trackEvent('click', 'outbound', linkText);
}
