import { z } from "zod";

export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.array(z.object({
    type: z.enum(['paragraph', 'heading', 'list', 'table', 'infobox', 'image']),
    level: z.number().optional(), // for headings
    text: z.string().optional(),
    items: z.array(z.string()).optional(), // for lists
    src: z.string().optional(), // for images
    alt: z.string().optional(), // for images
    caption: z.string().optional(), // for images
    data: z.record(z.string()).optional(), // for infobox/table data
  })),
  categories: z.array(z.string()),
  references: z.array(z.object({
    id: z.string(),
    text: z.string(),
    url: z.string().optional(),
  })),
  relatedArticles: z.array(z.string()),
  lastModified: z.string(),
});

export type Article = z.infer<typeof articleSchema>;
