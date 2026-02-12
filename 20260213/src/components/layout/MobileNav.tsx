'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: '首頁',
    href: '/',
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
  },
  {
    name: '資源',
    href: '/resources',
    icon: BookOpenIcon,
    activeIcon: BookOpenIconSolid,
  },
  {
    name: '搜尋',
    href: '/search',
    icon: MagnifyingGlassIcon,
    activeIcon: MagnifyingGlassIconSolid,
  },
  {
    name: '分類',
    href: '/categories',
    icon: Squares2X2Icon,
    activeIcon: Squares2X2IconSolid,
  },
  {
    name: '關於',
    href: '/about',
    icon: UserIcon,
    activeIcon: UserIconSolid,
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = active ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full py-1 transition-colors',
                active ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
