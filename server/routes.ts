import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Wikipedia clone uses client-side data storage
  // All article data is stored in JSON files in /src/database
  // No backend API routes needed for this implementation
  
  const httpServer = createServer(app);

  return httpServer;
}
