'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-red-400">{siteConfig.name}</span>
              <span className="ml-3 text-sm text-gray-600 hidden sm:block">
                {siteConfig.slogan}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {siteConfig.navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-blue-500'
                    : 'text-gray-700 hover:text-blue-400'
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Search Button */}
            <Link
              href="/search"
              className="p-2 text-gray-500 hover:text-blue-400 transition-colors"
              aria-label="搜尋"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              href="/search"
              className="p-2 text-gray-500 hover:text-blue-400"
              aria-label="搜尋"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Link>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="開啟選單"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {siteConfig.navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
