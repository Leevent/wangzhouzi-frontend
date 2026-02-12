import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">
              關於{siteConfig.name}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              我們致力於整合台灣在地優質資源，讓每個人都能享有平等的資訊獲取機會，共同建設更美好的社會。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">快速連結</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">聯絡資訊</h3>
            <div className="text-gray-300 space-y-2">
              <p>📧 {siteConfig.contact.email}</p>
              <p>📞 歡迎透過 GitHub 聯繫</p>
              <p>📍 {siteConfig.contact.location}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {siteConfig.copyrightYear} {siteConfig.name} - 台灣在地優質資源平台. 讓優質資源被看見。
          </p>
        </div>
      </div>
    </footer>
  );
}
