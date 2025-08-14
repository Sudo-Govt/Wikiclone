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
          <div key={index} className="float-right ml-4 mb-4 w-80 bg-wiki-bg border border-wiki-border text-xs">
            <div className="text-center font-bold py-2 bg-wiki-nav-bg border-b border-wiki-border text-wiki">{article.title}</div>
            <div className="p-3">
              {content.data && Object.entries(content.data).map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 py-1 last:border-b-0">
                  <div className="flex">
                    <div className="font-medium text-wiki w-1/3 pr-2">{key}</div>
                    <div className="text-wiki w-2/3">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'paragraph':
        return (
          <p key={index} className="mb-3 text-wiki leading-relaxed" data-testid={`text-paragraph-${index}`}>
            {content.text}
          </p>
        );

      case 'heading':
        const HeadingTag = `h${Math.min(content.level || 2, 6)}` as keyof JSX.IntrinsicElements;
        const headingClass = content.level === 2 
          ? "text-lg font-bold mt-6 mb-3 border-b border-wiki-border pb-1 text-wiki clear-both"
          : content.level === 3
          ? "text-base font-bold mt-5 mb-2 text-wiki"
          : "text-sm font-bold mt-4 mb-2 text-wiki";
        
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
          <ul key={index} className="list-disc ml-5 mb-3 space-y-1 text-wiki" data-testid={`list-${index}`}>
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
    <div className="pl-4 pr-4 pt-3 pb-6 bg-wiki-header">
      {/* Breadcrumb - Wikipedia style */}
      <div className="text-xs text-wiki-muted mb-2" data-testid="breadcrumb">
        <Link href="/" className="wiki-link" data-testid="link-breadcrumb-home">
          Main Page
        </Link>
      </div>

      {/* Article Title */}
      <h1 className="text-2xl font-normal border-b border-wiki-border pb-1 mb-4 text-wiki leading-normal" data-testid="text-article-title">
        {article.title}
      </h1>

      {/* Article tabs (mimicking Wikipedia) */}
      <div className="border-b border-wiki-border mb-4">
        <ul className="flex text-xs">
          <li className="mr-6">
            <span className="inline-block py-1 border-b-2 border-transparent text-wiki font-medium">
              Article
            </span>
          </li>
          <li className="mr-6">
            <a href="#" className="inline-block py-1 border-b-2 border-transparent wiki-link hover:border-wiki-border">
              Talk
            </a>
          </li>
        </ul>
      </div>

      {/* Article Content */}
      <div className="prose prose-wiki max-w-none text-sm leading-relaxed">
        {/* Table of Contents */}
        {article.content.filter(c => c.type === 'heading').length > 3 && (
          <div className="bg-wiki-bg border border-wiki-border p-3 mb-4 float-left mr-4 w-64" data-testid="table-of-contents">
            <div className="text-center text-sm font-bold mb-2 pb-1 border-b border-wiki-border text-wiki">Contents</div>
            <ol className="text-xs space-y-1">
              {article.content
                .filter(c => c.type === 'heading')
                .map((heading, index) => (
                  <li key={index} className={heading.level === 2 ? "font-medium" : "ml-3"}>
                    <span className="text-wiki-muted mr-1">{index + 1}</span>
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
          <div className="clear-both">
            <h2 className="text-lg font-bold mt-6 mb-3 border-b border-wiki-border pb-1 text-wiki" data-testid="heading-see-also">
              See also
            </h2>
            <ul className="list-disc ml-5 mb-4 space-y-1 text-wiki" data-testid="list-related-articles">
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
          </div>
        )}

        {/* References */}
        {article.references.length > 0 && (
          <div className="clear-both">
            <h2 id="references" className="text-lg font-bold mt-6 mb-3 border-b border-wiki-border pb-1 text-wiki" data-testid="heading-references">
              References
            </h2>
            <ol className="text-xs space-y-1 mb-4" data-testid="section-references">
              {article.references.map((ref) => (
                <li key={ref.id} className="text-wiki" data-testid={`reference-${ref.id}`}>
                  <span className="text-wiki-muted">^ </span>
                  {ref.text}
                  {ref.url && (
                    <a href={ref.url} className="wiki-link ml-1" data-testid={`link-reference-${ref.id}`}>
                      [Link]
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Categories */}
        {article.categories.length > 0 && (
          <div className="mt-6 pt-3 border-t border-wiki-border clear-both" data-testid="section-categories">
            <div className="text-xs text-wiki">
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
