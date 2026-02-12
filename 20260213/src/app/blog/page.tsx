import { Metadata } from 'next';
import { GhostService, Resource } from '@/lib/ghost';
import { ResourceCard, PageHeader, Button } from '@/components/ui';

export const metadata: Metadata = {
  title: '部落格',
  description: '望周知部落格 - 分享台灣優質資源的使用心得與最新資訊',
};

export default async function BlogPage() {
  let blogPosts: Resource[] = [];

  try {
    blogPosts = await GhostService.getBlogPosts().catch(() => []);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="部落格"
        description="分享台灣優質資源的使用心得與最新資訊"
      />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <ResourceCard key={post.id} resource={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                部落格即將推出
              </h3>
              <p className="text-gray-600 mb-6">
                我們正在準備精彩的內容，敬請期待！
              </p>
              <Button as="link" href="/resources" variant="primary">
                先瀏覽資源
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
