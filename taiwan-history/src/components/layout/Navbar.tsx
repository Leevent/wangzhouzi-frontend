'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🏛️</span>
              <span className="text-xl font-bold text-gray-900">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {siteConfig.navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/search"
              className="ml-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="搜尋"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              aria-label="開啟選單"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-1">
              {siteConfig.navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/search"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                搜尋
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
