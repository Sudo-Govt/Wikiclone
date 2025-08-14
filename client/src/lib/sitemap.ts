import { getAllArticles } from "./articles";

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export function generateSitemap(baseUrl: string = ""): SitemapUrl[] {
  const articles = getAllArticles();
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [
    // Homepage
    {
      loc: baseUrl,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    }
  ];

  // Add article pages
  articles.forEach(article => {
    urls.push({
      loc: `${baseUrl}/article/${article.id}`,
      lastmod: article.lastModified || currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });

  return urls;
}

export function generateSitemapXML(baseUrl: string = ""): string {
  const urls = generateSitemap(baseUrl);
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  urls.forEach(url => {
    xml += `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
}

export function generateRobotsTxt(baseUrl: string = ""): string {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow search engines to index all content
Allow: /article/
Allow: /search

# Block any admin or private areas (if they exist)
Disallow: /admin/
Disallow: /private/
`;
}