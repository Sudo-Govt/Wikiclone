import { useParams } from "wouter";
import { WikipediaLayout } from "@/components/wikipedia-layout";
import { ArticleContent } from "@/components/article-content";
import { getArticleById } from "@/lib/articles";

export default function Article() {
  const params = useParams<{ id: string }>();
  const article = getArticleById(params.id);

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
      <ArticleContent article={article} />
    </WikipediaLayout>
  );
}
