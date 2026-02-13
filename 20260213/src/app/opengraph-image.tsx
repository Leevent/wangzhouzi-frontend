import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const runtime = 'edge';

export const alt = `${siteConfig.name} - 台灣在地優質資源平台`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 50%, #1E40AF 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 背景裝飾 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)',
          }}
        />

        {/* 主要內容 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.2)',
              marginBottom: '32px',
              fontSize: '64px',
            }}
          >
            📢
          </div>

          {/* 網站名稱 */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '16px',
              textShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            {siteConfig.name}
          </div>

          {/* Slogan */}
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '24px',
            }}
          >
            {siteConfig.slogan}
          </div>

          {/* 分隔線 */}
          <div
            style={{
              width: '120px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '2px',
              marginBottom: '24px',
            }}
          />

          {/* 描述 */}
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.85)',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.5,
            }}
          >
            發掘台灣在地的優質資源與服務
          </div>
        </div>

        {/* 底部標籤 */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '16px',
          }}
        >
          {['免費資源', '政府服務', '數位學習', '社會福利'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 20px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                color: 'white',
                fontSize: '18px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
