import { useParams } from "wouter";
import { WikipediaLayout } from "@/components/wikipedia-layout";
import { ArticleContent } from "@/components/article-content";
import { getArticleById } from "@/lib/articles";
import { useEffect } from "react";
import { generateArticleSEO, updatePageSEO } from "@/lib/seo";

export default function Article() {
  const params = useParams<{ id: string }>();
  const article = getArticleById(params.id);

  // Update SEO for article pages
  useEffect(() => {
    if (article) {
      const baseUrl = window.location.origin;
      const seoData = generateArticleSEO(article, baseUrl);
      updatePageSEO(seoData);
    }
  }, [article]);

  if (!article) {
    return (
      <WikipediaLayout>
        <div className="p-6">
          <div className="text-sm text-gray-500 mb-4">
            <a href="/" className="wiki-link">Main Page</a>
          </div>
          <h1 className="text-3xl font-normal border-b border-wiki-border pb-2 mb-6">
            Article Not Found
          </h1>
          <p className="mb-4">
            The article you requested could not be found in our database of 20 articles.
          </p>
          <p className="mb-4">
            You can browse available articles using the sidebar navigation or{" "}
            <a href="/" className="wiki-link">return to the main page</a>.
          </p>
        </div>
      </WikipediaLayout>
    );
  }

  return (
    <WikipediaLayout>
      <div className="bg-white">
        {/* Article Header with Navigation */}
        <div className="border-b border-gray-200 px-4 py-2">
          {/* Article Title Bar */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-100 border border-blue-300 flex items-center justify-center text-xs">
                📄
              </div>
              <h1 className="text-2xl font-normal text-black">{article.title}</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-600">🌐 169 languages</span>
            </div>
          </div>
          
          {/* Wikipedia Article Tabs */}
          <div className="flex items-center justify-between border-b border-gray-200 -mx-4 px-4">
            <div className="flex space-x-6">
              <div className="border-b-2 border-black pb-2">
                <span className="text-sm text-black font-medium">Article</span>
              </div>
              <div className="pb-2">
                <a href="#" className="text-sm text-blue-600 hover:underline">Talk</a>
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="border-b-2 border-black pb-2">
                <span className="text-sm text-black font-medium">Read</span>
              </div>
              <div className="pb-2">
                <a href="#" className="text-sm text-blue-600 hover:underline">View source</a>
              </div>
              <div className="pb-2">
                <a href="#" className="text-sm text-blue-600 hover:underline">View history</a>
              </div>
              <div className="pb-2">
                <select className="text-sm text-blue-600 bg-transparent border-none">
                  <option>Tools</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* "From Wikipedia, the free encyclopedia" */}
        <div className="px-4 py-3 border-b border-gray-200">
          <p className="text-sm text-gray-600 italic">From Wikipedia, the free encyclopedia</p>
        </div>

        <ArticleContent article={article} />
      </div>
    </WikipediaLayout>
  );
}
