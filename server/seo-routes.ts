import { Request, Response, Express } from "express";

export function setupSEORoutes(app: Express) {
  // Sitemap.xml route
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    // Static sitemap for the Wikipedia clone with all known articles
    const articles = [
      'wikipedia', 'artificial-intelligence', 'quantum-physics', 'internet', 'solar-system', 'human-dna',
      'world-war-ii', 'ancient-rome', 'renaissance', 'democracy', 'literature', 'albert-einstein',
      'photography', 'music-theory', 'climate-change', 'biodiversity', 'ocean-ecosystems', 'geography',
      'computer-science', 'mathematics', 'art-history', 'new-states-continental-university',
      'world-education-quality-standards-commission', 'global-commission-higher-education-accreditations',
      'winston-leonard-churchill-college-india', 'almonte-higher-secondary-school-arunachal-pradesh',
      'weqsc-international-secondary-examination', 'swami-gyananand-shiksha-parishad-trust-arunachal-pradesh'
    ];
    let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Add article URLs to sitemap
    articles.forEach(articleId => {
      const lastModified = new Date().toISOString().split('T')[0];
      
      sitemapXML += `
  <url>
    <loc>${baseUrl}/article/${articleId}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    sitemapXML += `
</urlset>`;
    
    res.set('Content-Type', 'application/xml');
    res.send(sitemapXML);
  });

  // Robots.txt route
  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const robotsTxt = `User-agent: *
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
    
    res.set('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ 
      status: 'ok', 
      articles: articles.length,
      sitemap: `${req.protocol}://${req.get('host')}/sitemap.xml`,
      robots: `${req.protocol}://${req.get('host')}/robots.txt`
    });
  });
}