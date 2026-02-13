'use client';

import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager() {
  // 如果沒有設定 GTM ID，不渲染任何內容
  if (!GTM_ID) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager - Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  );
}

// GTM noscript iframe - 用於 body 開頭
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

// 推送事件到 dataLayer
export function pushToDataLayer(event: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer =
      (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer || [];
    (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push(event);
  }
}

// 頁面瀏覽事件
export function trackGTMPageView(url: string, title: string) {
  pushToDataLayer({
    event: 'page_view',
    page_path: url,
    page_title: title,
  });
}

// 自訂事件
export function trackGTMEvent(eventName: string, eventParams?: Record<string, unknown>) {
  pushToDataLayer({
    event: eventName,
    ...eventParams,
  });
}

// 電子商務：查看項目
export function trackGTMViewItem(itemId: string, itemName: string, category?: string) {
  pushToDataLayer({
    event: 'view_item',
    ecommerce: {
      items: [{
        item_id: itemId,
        item_name: itemName,
        item_category: category,
      }],
    },
  });
}

// 搜尋事件
export function trackGTMSearch(searchTerm: string) {
  pushToDataLayer({
    event: 'search',
    search_term: searchTerm,
  });
}

// 外部連結點擊
export function trackGTMOutboundClick(url: string, linkText: string) {
  pushToDataLayer({
    event: 'outbound_click',
    link_url: url,
    link_text: linkText,
  });
}
