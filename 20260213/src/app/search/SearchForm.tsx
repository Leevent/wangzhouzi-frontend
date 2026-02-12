'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchFormProps {
  initialQuery: string;
}

export default function SearchForm({ initialQuery }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋資源..."
          className="w-full px-6 py-4 pr-14 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-shadow"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
          aria-label="搜尋"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
