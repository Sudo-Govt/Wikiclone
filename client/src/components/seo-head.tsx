import { useEffect } from "react";
import type { SEOData } from "@/lib/seo";

interface SEOHeadProps {
  seoData: SEOData;
}

export function SEOHead({ seoData }: SEOHeadProps) {
  useEffect(() => {
    // Update title
    document.title = seoData.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords.join(', '));
    
    // Open Graph tags
    updateMetaTag('og:title', seoData.title, 'property');
    updateMetaTag('og:description', seoData.description, 'property');
    updateMetaTag('og:type', seoData.ogType, 'property');
    updateMetaTag('og:url', seoData.canonicalUrl, 'property');
    updateMetaTag('og:site_name', 'Wikipedia', 'property');
    updateMetaTag('og:locale', 'en_US', 'property');
    
    if (seoData.ogImage) {
      updateMetaTag('og:image', seoData.ogImage, 'property');
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', seoData.title, 'name');
    updateMetaTag('twitter:description', seoData.description, 'name');

    // Update canonical URL
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', seoData.canonicalUrl);

    // Update structured data
    if (seoData.structuredData) {
      // Remove existing structured data
      const existing = document.querySelector('script[type="application/ld+json"]');
      if (existing) {
        existing.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(seoData.structuredData, null, 2);
      document.head.appendChild(script);
    }
  }, [seoData]);

  return null; // This component doesn't render anything visible
}