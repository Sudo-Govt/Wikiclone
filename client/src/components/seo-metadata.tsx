// SEO Metadata component using DOM manipulation
import { useEffect } from "react";
import type { SEOData } from "@/lib/seo";

interface SEOMetadataProps {
  seoData: SEOData;
}

export function SEOMetadata({ seoData }: SEOMetadataProps) {
  useEffect(() => {
    // Update document title
    document.title = seoData.title;
    
    // Helper function to update meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords.join(', '));
    
    // Open Graph tags
    updateMetaTag('og:title', seoData.title, 'property');
    updateMetaTag('og:description', seoData.description, 'property');
    updateMetaTag('og:type', seoData.ogType, 'property');
    updateMetaTag('og:url', seoData.canonicalUrl, 'property');
    
    // Twitter tags
    updateMetaTag('twitter:title', seoData.title, 'name');
    updateMetaTag('twitter:description', seoData.description, 'name');
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seoData.canonicalUrl);
    
    // Update structured data
    if (seoData.structuredData) {
      const existing = document.querySelectorAll('script[type="application/ld+json"]:not([id="default-structured-data"])');
      existing.forEach(script => script.remove());

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(seoData.structuredData, null, 2);
      document.head.appendChild(script);
    }
  }, [seoData]);

  return null; // This component doesn't render anything
}