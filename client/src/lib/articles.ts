import { Article } from "@shared/schema";

// Import all article JSON files
import article1 from "../database/article1.json";
import article2 from "../database/article2.json";
import article3 from "../database/article3.json";
import article4 from "../database/article4.json";
import article5 from "../database/article5.json";
import article6 from "../database/article6.json";
import article7 from "../database/article7.json";
import article8 from "../database/article8.json";
import article9 from "../database/article9.json";
import article10 from "../database/article10.json";
import article11 from "../database/article11.json";
import article12 from "../database/article12.json";
import article13 from "../database/article13.json";
import article14 from "../database/article14.json";
import article15 from "../database/article15.json";
import article16 from "../database/article16.json";
import article17 from "../database/article17.json";
import article18 from "../database/article18.json";
import article19 from "../database/article19.json";
import article20 from "../database/article20.json";
import article21 from "../database/article21.json";

const articlesData = [
  article1, article2, article3, article4, article5,
  article6, article7, article8, article9, article10,
  article11, article12, article13, article14, article15,
  article16, article17, article18, article19, article20,
  article21
] as Article[];

export function getAllArticles(): Article[] {
  return articlesData;
}

export function getArticleById(id: string): Article | undefined {
  return articlesData.find(article => article.id === id);
}

export function searchArticles(query: string): Article[] {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return articlesData.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.summary.toLowerCase().includes(lowercaseQuery) ||
    article.content.some(section => 
      section.text?.toLowerCase().includes(lowercaseQuery)
    )
  );
}

export function getRelatedArticles(articleId: string): Article[] {
  const article = getArticleById(articleId);
  if (!article) return [];
  
  return article.relatedArticles
    .map(id => getArticleById(id))
    .filter((art): art is Article => art !== undefined);
}
