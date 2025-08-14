import { WikipediaLayout } from "@/components/wikipedia-layout";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <WikipediaLayout>
      <div className="pl-4 pr-4 pt-3 pb-6 bg-wiki-header">
        <div className="text-xs text-wiki-muted mb-2">
          <Link href="/" className="wiki-link">Main Page</Link>
        </div>
        <h1 className="text-2xl font-normal border-b border-wiki-border pb-1 mb-4 text-wiki">
          Page Not Found
        </h1>
        <p className="mb-3 text-wiki text-sm leading-relaxed">
          The page you requested could not be found in our collection of articles.
        </p>
        <p className="mb-3 text-wiki text-sm leading-relaxed">
          You can browse available articles using the sidebar navigation or{" "}
          <Link href="/" className="wiki-link">return to the main page</Link>.
        </p>
        <div className="bg-wiki-bg border border-wiki-border p-3 mt-4">
          <p className="text-xs text-wiki">
            <strong>Search suggestion:</strong> Try using the search box above to find articles by title or content.
          </p>
        </div>
      </div>
    </WikipediaLayout>
  );
}
