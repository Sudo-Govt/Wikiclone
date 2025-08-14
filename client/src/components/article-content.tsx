import { Article } from "@shared/schema";
import { Link } from "wouter";
import { getArticleById, getRelatedArticles } from "@/lib/articles";

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const relatedArticles = getRelatedArticles(article.id);

  const renderContent = (content: Article['content'][0], index: number) => {
    switch (content.type) {
      case 'infobox':
        return (
          <div key={index} className="float-right ml-4 mb-4 w-80 bg-wiki-bg border border-wiki-border p-4 text-sm">
            <div className="text-center font-bold mb-2">{article.title}</div>
            <div className="text-xs text-gray-600">
              {content.data && Object.entries(content.data).map(([key, value]) => (
                <div key={key} className="mb-1">
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          </div>
        );

      case 'paragraph':
        return (
          <p key={index} className="mb-4" data-testid={`text-paragraph-${index}`}>
            {content.text}
          </p>
        );

      case 'heading':
        const HeadingTag = `h${Math.min(content.level || 2, 6)}` as keyof JSX.IntrinsicElements;
        const headingClass = content.level === 2 
          ? "text-xl font-bold mt-8 mb-4 border-b border-gray-300 pb-1"
          : content.level === 3
          ? "text-lg font-semibold mt-6 mb-3"
          : "text-base font-semibold mt-4 mb-2";
        
        return (
          <HeadingTag 
            key={index} 
            className={headingClass}
            id={content.text?.toLowerCase().replace(/\s+/g, '-')}
            data-testid={`heading-${content.level}-${index}`}
          >
            {content.text}
          </HeadingTag>
        );

      case 'list':
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4" data-testid={`list-${index}`}>
            {content.items?.map((item, itemIndex) => (
              <li key={itemIndex} data-testid={`list-item-${index}-${itemIndex}`}>
                {item}
              </li>
            ))}
          </ul>
        );

      case 'image':
        return (
          <img 
            key={index}
            src={content.src}
            alt={content.alt || ''}
            className="w-full max-w-md float-left mr-4 mb-4 border border-wiki-border"
            data-testid={`image-${index}`}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4" data-testid="breadcrumb">
        <Link href="/" className="wiki-link" data-testid="link-breadcrumb-home">
          Main Page
        </Link>
      </div>

      {/* Article Title */}
      <h1 className="text-3xl font-normal border-b border-wiki-border pb-2 mb-6" data-testid="text-article-title">
        {article.title}
      </h1>

      {/* Article Content */}
      <div className="prose prose-wiki max-w-none">
        {/* Table of Contents */}
        {article.content.filter(c => c.type === 'heading').length > 0 && (
          <div className="bg-wiki-bg border border-wiki-border p-4 mb-6" data-testid="table-of-contents">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-300 pb-1">Contents</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              {article.content
                .filter(c => c.type === 'heading')
                .map((heading, index) => (
                  <li key={index}>
                    <a 
                      href={`#${heading.text?.toLowerCase().replace(/\s+/g, '-')}`}
                      className="wiki-link"
                      data-testid={`link-toc-${index}`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
            </ol>
          </div>
        )}

        {/* Main Content */}
        {article.content.map((content, index) => renderContent(content, index))}

        {/* See also section */}
        {relatedArticles.length > 0 && (
          <>
            <h2 className="text-xl font-bold mt-8 mb-4 border-b border-gray-300 pb-1" data-testid="heading-see-also">
              See also
            </h2>
            <ul className="list-disc list-inside space-y-1 mb-6" data-testid="list-related-articles">
              {relatedArticles.map((relatedArticle) => (
                <li key={relatedArticle.id}>
                  <Link 
                    href={`/article/${relatedArticle.id}`} 
                    className="wiki-link"
                    data-testid={`link-related-${relatedArticle.id}`}
                  >
                    {relatedArticle.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* References */}
        {article.references.length > 0 && (
          <>
            <h2 id="references" className="text-xl font-bold mt-8 mb-4 border-b border-gray-300 pb-1" data-testid="heading-references">
              References
            </h2>
            <div className="text-sm space-y-2" data-testid="section-references">
              {article.references.map((ref) => (
                <div key={ref.id} data-testid={`reference-${ref.id}`}>
                  {ref.id}. {ref.text}
                  {ref.url && (
                    <a href={ref.url} className="wiki-link ml-1" data-testid={`link-reference-${ref.id}`}>
                      [Link]
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Categories */}
        {article.categories.length > 0 && (
          <div className="mt-8 pt-4 border-t border-wiki-border" data-testid="section-categories">
            <div className="text-sm">
              <strong>Categories:</strong>{" "}
              {article.categories.map((category, index) => (
                <span key={category}>
                  <a 
                    href={`https://en.wikipedia.org/wiki/Category:${category.replace(/\s+/g, '_')}`}
                    className="wiki-link"
                    data-testid={`link-category-${index}`}
                  >
                    {category}
                  </a>
                  {index < article.categories.length - 1 && " | "}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
