import type { Article } from "@/../../shared/schema";

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogType: string;
  ogImage?: string;
  structuredData?: object;
}

export function generateArticleSEO(article: Article, baseUrl: string = ""): SEOData {
  const description = article.content
    .filter(c => c.type === 'paragraph')
    .slice(0, 2)
    .map(c => c.text)
    .join(' ')
    .substring(0, 160)
    .replace(/\s+/g, ' ')
    .trim();

  const keywords = [
    ...article.categories,
    ...article.title.split(' ').filter(word => word.length > 3),
    'Wikipedia',
    'encyclopedia',
    'knowledge'
  ];

  return {
    title: `${article.title} - Wikipedia`,
    description: description || `Learn about ${article.title} on Wikipedia, the free encyclopedia.`,
    keywords,
    canonicalUrl: `${baseUrl}/article/${article.id}`,
    ogType: 'article',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": description,
        "author": {
          "@type": "Organization",
          "name": "Wikipedia Contributors"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Wikipedia",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/favicon.svg`
          }
        },
        "dateModified": article.lastModified,
        "datePublished": article.lastModified,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/article/${article.id}`
        },
        "inLanguage": "en",
        "isAccessibleForFree": true,
        "genre": article.categories,
        "keywords": keywords.join(', ')
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Wikipedia",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": article.title,
            "item": `${baseUrl}/article/${article.id}`
          }
        ]
      }
    ]
  };
}

export function generateHomeSEO(baseUrl: string = ""): SEOData {
  return {
    title: "Wikipedia, the free encyclopedia",
    description: "Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.",
    keywords: ["Wikipedia", "encyclopedia", "free", "knowledge", "education", "reference"],
    canonicalUrl: baseUrl,
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Wikipedia",
      "alternateName": "Wikipedia, the free encyclopedia",
      "description": "Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.",
      "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Wikimedia Foundation",
        "url": "https://wikimediafoundation.org/"
      }
    }
  };
}

export function updatePageSEO(seoData: SEOData) {
  // Update title
  document.title = seoData.title;

  // Update or create meta tags
  updateMetaTag('description', seoData.description);
  updateMetaTag('keywords', seoData.keywords.join(', '));
  
  // Open Graph tags
  updateMetaTag('og:title', seoData.title, 'property');
  updateMetaTag('og:description', seoData.description, 'property');
  updateMetaTag('og:type', seoData.ogType, 'property');
  updateMetaTag('og:url', seoData.canonicalUrl, 'property');
  
  if (seoData.ogImage) {
    updateMetaTag('og:image', seoData.ogImage, 'property');
  }

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', seoData.title, 'name');
  updateMetaTag('twitter:description', seoData.description, 'name');

  // Canonical URL
  updateCanonicalUrl(seoData.canonicalUrl);

  // Structured Data
  if (seoData.structuredData) {
    updateStructuredData(seoData.structuredData);
  }
}

function updateMetaTag(name: string, content: string, attribute: string = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

function updateCanonicalUrl(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  
  link.setAttribute('href', url);
}

function updateStructuredData(data: object | object[]) {
  // Remove existing structured data
  const existing = document.querySelectorAll('script[type="application/ld+json"]');
  existing.forEach(script => script.remove());

  // Add new structured data
  if (Array.isArray(data)) {
    data.forEach(item => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(item, null, 2);
      document.head.appendChild(script);
    });
  } else {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
  }
}