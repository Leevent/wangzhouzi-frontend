import type { Metadata } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import './globals.css';
import { Navbar, Footer } from '@/components/layout';
import { siteConfig } from '@/config/site';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${notoSansTC.className} antialiased bg-gray-50`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
