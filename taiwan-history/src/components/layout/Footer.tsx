import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 關於 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🏛️</span>
              <span className="text-xl font-bold text-white">{siteConfig.name}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {siteConfig.slogan}。從史前時代到現代，整合數位典藏、老照片、地方志書等珍貴資源。
            </p>
          </div>

          {/* 快速連結 */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速連結</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 聯絡資訊 */}
          <div>
            <h3 className="text-white font-semibold mb-4">聯絡我們</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {siteConfig.contact.location}
              </li>
            </ul>
          </div>
        </div>

        {/* 版權 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
