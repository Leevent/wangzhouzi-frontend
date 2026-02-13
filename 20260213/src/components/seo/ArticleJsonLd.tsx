import { Resource } from '@/lib/ghost';
import { siteConfig } from '@/config/site';

interface ArticleJsonLdProps {
  resource: Resource;
}

export function ArticleJsonLd({ resource }: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.excerpt,
    image: resource.feature_image || `${siteConfig.url}/opengraph-image`,
    datePublished: resource.published_at,
    dateModified: resource.updated_at || resource.published_at,
    author: {
      '@type': 'Organization',
      name: siteConfig.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/opengraph-image`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/resource/${resource.slug}`,
    },
    inLanguage: 'zh-TW',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
