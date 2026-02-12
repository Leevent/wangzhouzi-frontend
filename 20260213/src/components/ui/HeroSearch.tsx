'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface HeroSearchProps {
  placeholder?: string;
}

export default function HeroSearch({ placeholder = '搜尋免費資源...' }: HeroSearchProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // 熱門搜尋建議
  const suggestions = ['電子書', '線上課程', '職業訓練', '圖書館'];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-14 pr-32 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm hover:shadow-md"
            aria-label="搜尋資源"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors font-medium"
          >
            搜尋
          </button>
        </div>
      </form>

      {/* 熱門搜尋 */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="text-sm text-gray-500">熱門搜尋：</span>
        {suggestions.map((term) => (
          <button
            key={term}
            onClick={() => router.push(`/search?q=${encodeURIComponent(term)}`)}
            className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-500 transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
