'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GhostService, Resource } from '@/lib/ghost';
import Link from 'next/link';
import { categoryConfig } from '@/config/categories';

// 搜尋載入組件
function SearchLoading() {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
      <p className="text-gray-600">正在載入搜尋功能...</p>
    </div>
  );
}

// 搜尋內容組件
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const query = searchParams?.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const results = await GhostService.searchResources(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching resources:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔍 搜尋資源
          </h1>
          <p className="text-gray-600">
            在台灣優質資源中找到您需要的服務
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="輸入關鍵字搜尋資源..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-400 text-white rounded-r-lg hover:bg-blue-500 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? '搜尋中...' : '搜尋'}
            </button>
          </div>
        </form>
      </div>

      {hasSearched && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-600">正在搜尋中...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">搜尋結果</h2>
                <span className="text-sm text-gray-600">
                  找到 {searchResults.length} 個結果
                </span>
              </div>
              
              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  {searchResults.map((resource: Resource) => {
                    const category = resource.primary_tag?.name || '預設';
                    const config = categoryConfig[category] || categoryConfig['預設'];
                    
                    return (
                      <div key={resource.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start">
                          <span className="text-3xl mr-4 mt-1">{config.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h3 className="font-semibold text-gray-900 text-lg mr-3">
                                <Link 
                                  href={`/resource/${resource.slug}`}
                                  className="hover:text-blue-600 transition-colors"
                                >
                                  {resource.title}
                                </Link>
                              </h3>
                              <span 
                                className="px-2 py-1 text-xs font-medium text-white rounded"
                                style={{ backgroundColor: config.color }}
                              >
                                {category}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-3 leading-relaxed">
                              {resource.excerpt}
                            </p>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                發布於 {new Date(resource.published_at).toLocaleDateString('zh-TW')}
                              </span>
                              <Link 
                                href={`/resource/${resource.slug}`}
                                className="text-blue-400 hover:text-blue-600 font-medium text-sm"
                              >
                                查看詳情 →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">沒有找到相關資源</h3>
                  <p className="text-gray-600 mb-6">請嘗試其他關鍵字或瀏覽我們的分類頁面</p>
                  <Link 
                    href="/categories"
                    className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium"
                  >
                    瀏覽分類
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

// 簡單搜尋組件（不依賴 URL 參數）
function SimpleSearchContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const results = await GhostService.searchResources(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching resources:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔍 搜尋資源
          </h1>
          <p className="text-gray-600">
            在台灣優質資源中找到您需要的服務
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="輸入關鍵字搜尋資源..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-400 text-white rounded-r-lg hover:bg-blue-500 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? '搜尋中...' : '搜尋'}
            </button>
          </div>
        </form>
      </div>

      {hasSearched && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-600">正在搜尋中...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">搜尋結果</h2>
                <span className="text-sm text-gray-600">
                  找到 {searchResults.length} 個結果
                </span>
              </div>
              
              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  {searchResults.map((resource: Resource) => {
                    const category = resource.primary_tag?.name || '預設';
                    const config = categoryConfig[category] || categoryConfig['預設'];
                    
                    return (
                      <div key={resource.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start">
                          <span className="text-3xl mr-4 mt-1">{config.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h3 className="font-semibold text-gray-900 text-lg mr-3">
                                <Link 
                                  href={`/resource/${resource.slug}`}
                                  className="hover:text-blue-600 transition-colors"
                                >
                                  {resource.title}
                                </Link>
                              </h3>
                              <span 
                                className="px-2 py-1 text-xs font-medium text-white rounded"
                                style={{ backgroundColor: config.color }}
                              >
                                {category}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-3 leading-relaxed">
                              {resource.excerpt}
                            </p>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                發布於 {new Date(resource.published_at).toLocaleDateString('zh-TW')}
                              </span>
                              <Link 
                                href={`/resource/${resource.slug}`}
                                className="text-blue-400 hover:text-blue-600 font-medium text-sm"
                              >
                                查看詳情 →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">沒有找到相關資源</h3>
                  <p className="text-gray-600 mb-6">請嘗試其他關鍵字或瀏覽我們的分類頁面</p>
                  <Link 
                    href="/categories"
                    className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium"
                  >
                    瀏覽分類
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-red-400">望周知</Link>
              <span className="ml-3 text-sm text-gray-600">希望每個人都能知道</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-400 font-medium">首頁</Link>
              <Link href="/resources" className="text-gray-700 hover:text-blue-400 font-medium">所有資源</Link>
              <Link href="/categories" className="text-gray-700 hover:text-blue-400 font-medium">分類瀏覽</Link>
              <span className="text-blue-400 font-medium">搜尋</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<SearchLoading />}>
            <SearchContent />
          </Suspense>
          <noscript>
            <SimpleSearchContent />
          </noscript>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              &copy; 2025 望周知 - 台灣在地優質資源平台. 讓優質資源被看見。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}