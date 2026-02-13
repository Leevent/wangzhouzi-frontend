import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GhostService, Resource } from '@/lib/ghost';
import { Button } from '@/components/ui';
import { getCategoryStyle } from '@/config/categories';
import { formatDate, sanitizeHtml } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo';

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const resource = await GhostService.getResourceBySlug(slug);
    if (!resource) {
      return { title: '資源不存在' };
    }

    const ogImage = resource.feature_image || `${siteConfig.url}/opengraph-image`;
    const description = resource.excerpt || '台灣優質資源';

    return {
      title: resource.title,
      description,
      openGraph: {
        title: resource.title,
        description,
        url: `${siteConfig.url}/resource/${slug}`,
        type: 'article',
        publishedTime: resource.published_at,
        modifiedTime: resource.updated_at || resource.published_at,
        authors: [siteConfig.author],
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: resource.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: resource.title,
        description,
        images: [ogImage],
      },
      alternates: {
        canonical: `${siteConfig.url}/resource/${slug}`,
      },
    };
  } catch {
    return { title: '資源載入中' };
  }
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const { slug } = await params;
  let resource: Resource | null = null;

  try {
    resource = await GhostService.getResourceBySlug(slug);
  } catch (error) {
    console.error('Error fetching resource:', error);
  }

  if (!resource) {
    notFound();
  }

  const category = resource.primary_tag?.name || '預設';
  const style = getCategoryStyle(category);

  const breadcrumbItems = [
    { name: '首頁', href: '/' },
    { name: '所有資源', href: '/resources' },
    { name: resource.title, href: `/resource/${slug}` },
  ];

  return (
    <>
      <ArticleJsonLd resource={resource} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 主要資訊卡片 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <span className="text-5xl mr-4">{style.icon}</span>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {resource.title}
                      </h1>
                      <div className="flex items-center space-x-4">
                        <span
                          className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full"
                          style={{ backgroundColor: style.color }}
                        >
                          {category}
                        </span>
                        <span className="text-sm text-gray-500">
                          發布於 {formatDate(resource.published_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">資源簡介</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {resource.excerpt || '暫無簡介'}
                  </p>
                </div>
              </div>
            </div>

            {/* 詳細內容卡片 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">詳細資訊</h2>
                {resource.html ? (
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-a:text-blue-600 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(resource.html) }}
                  />
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>暫無詳細內容</p>
                  </div>
                )}
              </div>
            </div>

            {/* 操作按鈕 */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button as="link" href="/resources" variant="primary">
                瀏覽更多資源
              </Button>
              {resource.primary_tag?.slug && (
                <Button as="link" href={`/category/${resource.primary_tag.slug}`} variant="outline">
                  瀏覽{category}分類
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
