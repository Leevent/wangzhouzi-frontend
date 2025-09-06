import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GhostService, Resource } from '@/lib/ghost';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await GhostService.getResourceBySlug(params.slug);
  
  if (!post) {
    return {
      title: '文章不存在 - 望周知部落格',
      description: '您所查找的文章不存在'
    };
  }

  return {
    title: `${post.title} - 望周知部落格`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await GhostService.getResourceBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // 獲取相關文章
  const relatedPosts = post.primary_tag 
    ? await GhostService.getResourcesByCategory(post.primary_tag.slug)
    : [];
  
  const filteredRelatedPosts = relatedPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  // 計算預估閱讀時間
  const wordCount = post.html.replace(/<[^>]*>/g, '').length;
  const readingTime = Math.ceil(wordCount / 500);

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
              <Link href="/blog" className="text-blue-400 font-medium">部落格</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">首頁</Link>
              </li>
              <li>
                <span className="text-gray-400 mx-2">/</span>
                <Link href="/blog" className="text-gray-500 hover:text-gray-700">部落格</Link>
              </li>
              {post.primary_tag && (
                <li>
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-500">{post.primary_tag.name}</span>
                </li>
              )}
              <li>
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-900 font-medium">{post.title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <div className="text-center mb-8">
              {post.primary_tag && (
                <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {post.primary_tag.name}
                </span>
              )}
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
                <span>
                  發布於 {new Date(post.published_at).toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {post.updated_at !== post.published_at && (
                  <span>
                    更新於 {new Date(post.updated_at).toLocaleDateString('zh-TW')}
                  </span>
                )}
                <span>
                  約 {readingTime} 分鐘閱讀
                </span>
              </div>
            </div>
          </header>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">相關標籤</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {filteredRelatedPosts.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">相關文章</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredRelatedPosts.map((relatedPost: Resource) => (
                  <article key={relatedPost.id} className="group">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <div>
                        {relatedPost.primary_tag && (
                          <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium mb-2">
                            {relatedPost.primary_tag.name}
                          </span>
                        )}
                        
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {new Date(relatedPost.published_at).toLocaleDateString('zh-TW')}
                          </span>
                          <span className="text-blue-400 font-medium text-sm">
                            閱讀更多 →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition-colors"
          aria-label="回到頂部"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>
        
        <Link
          href="/blog"
          className="bg-purple-400 text-white p-3 rounded-full shadow-lg hover:bg-purple-500 transition-colors"
          aria-label="回到部落格"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </Link>
      </div>

      <footer className="bg-gray-800 text-white py-12">
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
