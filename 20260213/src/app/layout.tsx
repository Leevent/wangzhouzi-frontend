import type { Metadata, Viewport } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { ScrollToTop } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { GoogleAnalytics, GoogleAds, GoogleTagManager, GoogleTagManagerNoScript } from '@/components/analytics';
import { WebsiteJsonLd, OrganizationJsonLd } from '@/components/seo';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-tc',
});

export const viewport: Viewport = {
  themeColor: '#3B82F6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - 台灣在地優質資源平台`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,

  // Web App Manifest
  manifest: '/site.webmanifest',

  // Open Graph 完整配置
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'zh_TW',
    type: 'website',
  },

  // Twitter Card 配置
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },

  // Robots 配置
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 驗證（需設定環境變數）
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  // 其他
  category: 'education',
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <GoogleTagManager />
        <WebsiteJsonLd />
        <OrganizationJsonLd />
      </head>
      <body className={`${notoSansTC.variable} font-sans antialiased bg-gray-50`}>
        <GoogleTagManagerNoScript />
        <GoogleAnalytics />
        <GoogleAds />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
        </div>
        <MobileNav />
        <ScrollToTop />
      </body>
    </html>
  );
}
