'use client';

import Script from 'next/script';

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CONVERSION_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;

export function GoogleAds() {
  // 如果沒有設定 Ads ID，不渲染任何內容
  if (!GOOGLE_ADS_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}

// 轉換追蹤
export function trackConversion(conversionLabel?: string) {
  if (typeof window !== 'undefined' && CONVERSION_ID && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'conversion', {
      send_to: conversionLabel || CONVERSION_ID,
    });
  }
}

// 資源瀏覽轉換追蹤
export function trackResourceView(resourceSlug: string, resourceTitle: string) {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'view_item', {
      items: [
        {
          item_id: resourceSlug,
          item_name: resourceTitle,
        },
      ],
    });
  }
}

// 外部連結點擊追蹤（帶轉換）
export function trackExternalLinkClick(url: string, resourceName: string) {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'click', {
      event_category: 'outbound',
      event_label: resourceName,
      transport_type: 'beacon',
    });
  }
}

// 搜尋轉換追蹤
export function trackSearchConversion(searchTerm: string) {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'search', {
      search_term: searchTerm,
    });
  }
}
