import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { getCategoryStyle } from '@/config/categories';
import { getBlogCategoryStyle } from '@/config/blog-categories';
import { Resource } from '@/lib/ghost';
import { formatDate } from '@/lib/utils';

interface ResourceCardProps {
  resource: Resource;
  variant?: 'default' | 'featured' | 'compact';
  showExternalLink?: boolean;
  type?: 'resource' | 'blog';
}

function extractExternalUrl(html?: string): string | null {
  const match = html?.match(/href="(https?:\/\/[^\"]+)"/);
  return match ? match[1] : null;
}

export default function ResourceCard({
  resource,
  variant = 'default',
  showExternalLink = true,
  type = 'resource',
}: ResourceCardProps) {
  // 根據類型決定分類和樣式
  const isBlog = type === 'blog';

  // 部落格：找 blog- 開頭的 tag；資源：用 primary_tag
  const blogTag = resource.tags.find(tag => tag.slug.startsWith('blog-'));
  const category = isBlog
    ? (blogTag?.name?.replace(/^blog-/, '') || '文章')
    : (resource.primary_tag?.name || '預設');

  const style = isBlog
    ? getBlogCategoryStyle(blogTag?.slug || '')
    : getCategoryStyle(category);

  // 連結路徑
  const detailPath = isBlog ? `/blog/${resource.slug}` : `/resource/${resource.slug}`;

  const externalUrl = extractExternalUrl(resource.html);

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-base flex-1 line-clamp-1">
            {resource.title}
          </h3>
          <span
            className="ml-2 px-2 py-0.5 text-xs font-medium text-white rounded shrink-0"
            style={{ backgroundColor: style.color }}
          >
            {category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
          {resource.excerpt}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{formatDate(resource.published_at)}</span>
          <div className="flex items-center gap-2">
            {showExternalLink && externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-gtm-content-id={resource.slug}
                data-gtm-content-title={resource.title}
                data-gtm-link-text={resource.title}
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="外部連結"
                title="外部連結"
              >
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            )}
            <Link
              href={detailPath}
              data-gtm-event="select_item"
              data-gtm-item-id={resource.slug}
              data-gtm-item-name={resource.title}
              data-gtm-category={category}
              data-gtm-list-name={variant}
              className="text-blue-400 hover:text-blue-500 font-medium text-sm"
            >
              查看詳情
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-5">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-2">{style.icon}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base line-clamp-1">
                {resource.title}
              </h3>
              <span
                className="inline-block px-2 py-0.5 text-xs font-medium text-white rounded mt-1"
                style={{ backgroundColor: style.color }}
              >
                {category}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
            {resource.excerpt}
          </p>

          <div className="flex items-center gap-2">
            <Link
              href={detailPath}
              data-gtm-event="select_item"
              data-gtm-item-id={resource.slug}
              data-gtm-item-name={resource.title}
              data-gtm-category={category}
              data-gtm-list-name={variant}
              className="flex-1 text-center bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors font-medium text-sm"
            >
              閱讀詳情
            </Link>
            {showExternalLink && externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-gtm-content-id={resource.slug}
                data-gtm-content-title={resource.title}
                data-gtm-link-text={resource.title}
                className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-500 transition-colors"
                aria-label="外部連結"
                title="外部連結"
              >
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-2">{style.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">
              {resource.title}
            </h3>
            <span
              className="inline-block px-2 py-0.5 text-xs font-medium text-white rounded"
              style={{ backgroundColor: style.color }}
            >
              {category}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {resource.excerpt}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{formatDate(resource.published_at)}</span>
          <div className="flex items-center gap-2">
            <Link
              href={detailPath}
              data-gtm-event="select_item"
              data-gtm-item-id={resource.slug}
              data-gtm-item-name={resource.title}
              data-gtm-category={category}
              data-gtm-list-name={variant}
              className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors font-medium text-sm"
            >
              閱讀詳情
            </Link>
            {showExternalLink && externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-gtm-content-id={resource.slug}
                data-gtm-content-title={resource.title}
                data-gtm-link-text={resource.title}
                className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-500 transition-colors"
                aria-label="外部連結"
                title="外部連結"
              >
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
