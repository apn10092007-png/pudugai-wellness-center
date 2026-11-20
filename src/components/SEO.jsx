import { useEffect } from 'react';
import { BUSINESS_CONFIG } from '../config/business';

const SITE_URL = 'https://pwconline.site';
const DEFAULT_IMAGE = '/pwc-og-image.jpg';

export default function SEO({
  title = 'Pudugai Wellness Center (PWC) | Nutrition & Weight Loss in Pudukkottai & Peravurani',
  description = 'Personalized health, nutrition, and lifestyle wellness coaching across Pudukkottai and Peravurani with Coach Thangapandian S and Coach Thenmozhi.',
  path = '/',
  image = DEFAULT_IMAGE,
  noIndex = false,
  breadcrumbs = null,
}) {
  useEffect(() => {
    const canonical = new URL(path, SITE_URL).href;
    const imageUrl = new URL(image, SITE_URL).href;

    // 1. Title
    document.title = title;

    // Helper to get or create a meta tag
    const setMeta = (key, value, attribute = 'name') => {
      let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    // 2. Standard Meta
    setMeta('description', description);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // 3. Open Graph Metadata
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', BUSINESS_CONFIG.name, 'property');
    setMeta('og:locale', 'en_IN', 'property');
    setMeta('og:image', imageUrl, 'property');

    // 4. Twitter Card Metadata
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', imageUrl);

    // 5. Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonical;

    // 6. JSON-LD Structured Data
    if (!noIndex) {
      const graph = [
        {
          '@type': 'HealthAndBeautyBusiness',
          '@id': `${SITE_URL}/#localbusiness`,
          name: BUSINESS_CONFIG.name,
          alternateName: BUSINESS_CONFIG.shortName,
          url: SITE_URL,
          logo: `${SITE_URL}/assets/pwc-logo.jpeg`,
          image: imageUrl,
          telephone: `+91${BUSINESS_CONFIG.phoneRaw}`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'E Main Rd, T Nagar, Buvaneswari Nagar',
            addressLocality: 'Pudukkottai',
            addressRegion: 'Tamil Nadu',
            postalCode: '622001',
            addressCountry: 'IN',
          },
          sameAs: [
            BUSINESS_CONFIG.instagram,
            BUSINESS_CONFIG.googleMaps,
            'https://maps.app.goo.gl/DFpxMGuHuTudNYFb6',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: BUSINESS_CONFIG.name,
          description: description,
          inLanguage: 'en-IN',
        },
      ];

      // Add BreadcrumbList when breadcrumbs are provided and not root
      if (breadcrumbs && breadcrumbs.length > 1) {
        graph.push({
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((b, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: b.name,
            item: new URL(b.path, SITE_URL).href,
          })),
        });
      }

      const schema = {
        '@context': 'https://schema.org',
        '@graph': graph,
      };

      let schemaTag = document.getElementById('pwc-schema');
      if (!schemaTag) {
        schemaTag = document.createElement('script');
        schemaTag.id = 'pwc-schema';
        schemaTag.type = 'application/ld+json';
        document.head.appendChild(schemaTag);
      }
      schemaTag.textContent = JSON.stringify(schema);
    } else {
      const schemaTag = document.getElementById('pwc-schema');
      if (schemaTag) {
        schemaTag.remove();
      }
    }
  }, [title, description, path, image, noIndex, breadcrumbs]);

  return null;
}
