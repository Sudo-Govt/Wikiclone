import { WikipediaLayout } from "@/components/wikipedia-layout";
import { ArticleContent } from "@/components/article-content";
import { getArticleById, getAllArticles } from "@/lib/articles";
import { Link } from "wouter";

export default function Home() {
  // Use Wikipedia article as the main page
  const mainArticle = getArticleById("wikipedia");
  const allArticles = getAllArticles();

  if (!mainArticle) {
    return (
      <WikipediaLayout>
        <div className="pl-4 pr-4 pt-3 pb-6 bg-wiki-header">
          <h1 className="text-2xl font-normal border-b border-wiki-border pb-1 mb-4 text-wiki text-center">
            Welcome to Wikipedia
          </h1>
          <div className="text-center mb-6">
            <p className="text-sm text-wiki-muted mb-2">
              the <Link href="/article/wikipedia" className="wiki-link">free encyclopedia</Link> that anyone can edit.
            </p>
            <p className="text-xs text-wiki-muted">
              <strong>{allArticles.length}</strong> articles in English
            </p>
          </div>
          
          <div className="bg-wiki-bg border border-wiki-border p-4 mb-6 rounded">
            <div className="text-center">
              <p className="text-sm text-wiki mb-2">
                <strong>Note:</strong> This is a demonstration clone containing only {allArticles.length} articles. For the full Wikipedia experience, visit{" "}
                <a href="https://wikipedia.org" className="wiki-link" target="_blank" rel="noopener noreferrer">
                  wikipedia.org
                </a>
                .
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-wiki-bg border border-wiki-border p-4">
              <h2 className="text-base font-bold mb-3 text-wiki border-b border-wiki-border pb-1">Featured Articles</h2>
              <ul className="text-xs space-y-1">
                {allArticles.slice(0, 5).map((article) => (
                  <li key={article.id}>
                    <Link href={`/article/${article.id}`} className="wiki-link">
                      {article.title}
                    </Link>
                    <p className="text-wiki-muted text-xs mt-1">{article.summary.substring(0, 100)}...</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-wiki-bg border border-wiki-border p-4">
              <h2 className="text-base font-bold mb-3 text-wiki border-b border-wiki-border pb-1">Science & Technology</h2>
              <ul className="text-xs space-y-1">
                {['artificial-intelligence', 'quantum-physics', 'internet', 'solar-system', 'human-dna'].map((id) => {
                  const article = getArticleById(id);
                  return article ? (
                    <li key={id}>
                      <Link href={`/article/${id}`} className="wiki-link">
                        {article.title}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>

            <div className="bg-wiki-bg border border-wiki-border p-4">
              <h2 className="text-base font-bold mb-3 text-wiki border-b border-wiki-border pb-1">History & Culture</h2>
              <ul className="text-xs space-y-1">
                {['world-war-ii', 'ancient-rome', 'renaissance', 'democracy', 'literature'].map((id) => {
                  const article = getArticleById(id);
                  return article ? (
                    <li key={id}>
                      <Link href={`/article/${id}`} className="wiki-link">
                        {article.title}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>

            <div className="bg-wiki-bg border border-wiki-border p-4">
              <h2 className="text-base font-bold mb-3 text-wiki border-b border-wiki-border pb-1">Notable People</h2>
              <ul className="text-xs space-y-1">
                {['albert-einstein'].map((id) => {
                  const article = getArticleById(id);
                  return article ? (
                    <li key={id}>
                      <Link href={`/article/${id}`} className="wiki-link">
                        {article.title}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>

            <div className="bg-wiki-bg border border-wiki-border p-4">
              <h2 className="text-base font-bold mb-3 text-wiki border-b border-wiki-border pb-1">Arts & Media</h2>
              <ul className="text-xs space-y-1">
                {['photography', 'music-theory', 'literature'].map((id) => {
                  const article = getArticleById(id);
                  return article ? (
                    <li key={id}>
                      <Link href={`/article/${id}`} className="wiki-link">
                        {article.title}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>

            <div className="bg-wiki-bg border border-wiki-border p-4">
              <h2 className="text-base font-bold mb-3 text-wiki border-b border-wiki-border pb-1">Environment</h2>
              <ul className="text-xs space-y-1">
                {['climate-change', 'biodiversity', 'ocean-ecosystems', 'geography'].map((id) => {
                  const article = getArticleById(id);
                  return article ? (
                    <li key={id}>
                      <Link href={`/article/${id}`} className="wiki-link">
                        {article.title}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
        </div>
      </WikipediaLayout>
    );
  }

  return (
    <WikipediaLayout>
      <ArticleContent article={mainArticle} />
    </WikipediaLayout>
  );
}
