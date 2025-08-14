import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupSEORoutes } from "./seo-routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Wikipedia clone uses client-side data storage
  // All article data is stored in JSON files in /src/database
  // Set up SEO routes for sitemap and robots.txt
  setupSEORoutes(app);
  
  const httpServer = createServer(app);

  return httpServer;
}
