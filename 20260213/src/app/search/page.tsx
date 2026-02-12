import { Metadata } from 'next';
import { Suspense } from 'react';
import { GhostService, Resource } from '@/lib/ghost';
import { ResourceCard, PageHeader } from '@/components/ui';
import SearchForm from './SearchForm';

export const metadata: Metadata = {
  title: '搜尋資源',
  description: '搜尋台灣在地優質資源',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          輸入關鍵字開始搜尋
        </h3>
        <p className="text-gray-600">
          搜尋台灣的優質免費資源，例如：圖書館、課程、福利
        </p>
      </div>
    );
  }

  let results: Resource[] = [];
  try {
    results = await GhostService.searchResources(query);
  } catch (error) {
    console.error('Search error:', error);
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">😕</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          找不到相關資源
        </h3>
        <p className="text-gray-600">
          嘗試使用不同的關鍵字搜尋
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-600 mb-6">
        找到 <strong>{results.length}</strong> 個與「{query}」相關的資源
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query = '' } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="搜尋資源"
        description="輸入關鍵字搜尋台灣在地優質資源"
      />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchForm initialQuery={query} />

          <Suspense
            fallback={
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
                <p className="text-gray-600 mt-4">搜尋中...</p>
              </div>
            }
          >
            <SearchResults query={query} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
