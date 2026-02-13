import { siteConfig } from '@/config/site';

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/opengraph-image`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.contact.email,
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English'],
    },
    sameAs: [siteConfig.social.github],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TW',
      addressLocality: siteConfig.contact.location,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
