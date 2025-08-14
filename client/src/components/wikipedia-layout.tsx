import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { getAllArticles, searchArticles } from "@/lib/articles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WikipediaLayoutProps {
  children: React.ReactNode;
}

export function WikipediaLayout({ children }: WikipediaLayoutProps) {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{id: string, title: string}>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const articles = getAllArticles();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchArticles(query);
      setSearchResults(results.map(a => ({ id: a.id, title: a.title })));
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white font-wiki">
      {/* Header */}
      <header className="bg-white border-b border-wiki-border">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={toggleSidebar}
                data-testid="button-menu-toggle"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
              <a href="https://wikipedia.org" className="flex items-center space-x-2" data-testid="link-wikipedia-home">
                <div className="w-8 h-8 bg-gray-200 rounded border"></div>
                <span className="text-xl font-bold hidden sm:block">Wikipedia</span>
              </a>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4 relative">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search Wikipedia"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pr-10"
                  data-testid="input-search"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                  data-testid="button-search"
                >
                  <Search className="w-5 h-5 text-gray-500" />
                </Button>
              </div>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-wiki-border rounded-b shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={`/article/${result.id}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-wiki-blue"
                      onClick={() => {
                        setShowSearchResults(false);
                        setSearchQuery("");
                      }}
                      data-testid={`link-search-result-${result.id}`}
                    >
                      {result.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <a href="https://en.wikipedia.org/w/index.php?title=Special:CreateAccount" className="text-sm wiki-link hidden sm:block" data-testid="link-create-account">
                Create account
              </a>
              <a href="https://en.wikipedia.org/w/index.php?title=Special:UserLogin" className="text-sm wiki-link" data-testid="link-login">
                Log in
              </a>
              <Button variant="ghost" size="sm" className="p-2" data-testid="button-user-menu">
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto flex relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={toggleSidebar}
            data-testid="overlay-sidebar"
          />
        )}

        {/* Left Sidebar */}
        <aside
          className={`w-64 bg-wiki-nav-bg border-r border-wiki-border min-h-screen fixed lg:relative lg:translate-x-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-20`}
          data-testid="sidebar-navigation"
        >
          <div className="p-4">
            <h3 className="font-bold text-sm mb-3 text-gray-700">Navigation</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/" className="block py-1 wiki-link" data-testid="link-main-page">
                  Main page
                </Link>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Wikipedia:Featured_articles" className="block py-1 wiki-link" data-testid="link-featured-articles">
                  Featured articles
                </a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Special:Random" className="block py-1 wiki-link" data-testid="link-random-article">
                  Random article
                </a>
              </li>
              <li>
                <a href="https://donate.wikimedia.org" className="block py-1 wiki-link" data-testid="link-donate">
                  Donate
                </a>
              </li>
            </ul>

            <h3 className="font-bold text-sm mb-3 mt-6 text-gray-700">Interaction</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="https://en.wikipedia.org/wiki/Help:Contents" className="block py-1 wiki-link" data-testid="link-help">
                  Help
                </a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Wikipedia:About" className="block py-1 wiki-link" data-testid="link-about">
                  About Wikipedia
                </a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Wikipedia:Community_portal" className="block py-1 wiki-link" data-testid="link-community">
                  Community portal
                </a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Special:RecentChanges" className="block py-1 wiki-link" data-testid="link-recent-changes">
                  Recent changes
                </a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Wikipedia:Contact_us" className="block py-1 wiki-link" data-testid="link-contact">
                  Contact page
                </a>
              </li>
            </ul>

            <h3 className="font-bold text-sm mb-3 mt-6 text-gray-700">Available Articles</h3>
            <ul className="space-y-1 text-sm max-h-64 overflow-y-auto">
              {articles.map((article) => (
                <li key={article.id}>
                  <Link
                    href={`/article/${article.id}`}
                    className="block py-1 wiki-link"
                    data-testid={`link-article-${article.id}`}
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 ml-0">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-wiki-bg border-t border-wiki-border mt-12">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="text-sm space-y-4">
            <div className="flex flex-wrap gap-4">
              <a href="https://en.wikipedia.org/wiki/Wikipedia:Privacy_policy" className="wiki-link" data-testid="link-privacy">
                Privacy policy
              </a>
              <a href="https://en.wikipedia.org/wiki/Wikipedia:About" className="wiki-link" data-testid="link-about-footer">
                About Wikipedia
              </a>
              <a href="https://en.wikipedia.org/wiki/Wikipedia:General_disclaimer" className="wiki-link" data-testid="link-disclaimers">
                Disclaimers
              </a>
              <a href="https://en.wikipedia.org/wiki/Wikipedia:Contact_us" className="wiki-link" data-testid="link-contact-footer">
                Contact Wikipedia
              </a>
              <a href="https://en.wikipedia.org/wiki/Wikipedia:Code_of_Conduct" className="wiki-link" data-testid="link-code-conduct">
                Code of Conduct
              </a>
              <a href="https://developer.wikimedia.org" className="wiki-link" data-testid="link-developers">
                Developers
              </a>
              <a href="https://stats.wikimedia.org" className="wiki-link" data-testid="link-statistics">
                Statistics
              </a>
              <a href="https://foundation.wikimedia.org/wiki/Cookie_statement" className="wiki-link" data-testid="link-cookies">
                Cookie statement
              </a>
              <a href="https://wikimediafoundation.org" className="wiki-link" data-testid="link-wikimedia">
                Wikimedia Foundation
              </a>
              <a href="https://www.mediawiki.org" className="wiki-link" data-testid="link-mediawiki">
                Powered by MediaWiki
              </a>
            </div>
            <div className="text-gray-600">
              <p>
                Text is available under the{" "}
                <a href="https://creativecommons.org/licenses/by-sa/3.0/" className="wiki-link" data-testid="link-license">
                  Creative Commons Attribution-ShareAlike License 3.0
                </a>
                ; additional terms may apply. By using this site, you agree to the{" "}
                <a href="https://wikimediafoundation.org/wiki/Terms_of_Use" className="wiki-link" data-testid="link-terms">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="https://wikimediafoundation.org/wiki/Privacy_policy" className="wiki-link" data-testid="link-privacy-footer">
                  Privacy Policy
                </a>
                . Wikipedia® is a registered trademark of the{" "}
                <a href="https://wikimediafoundation.org/" className="wiki-link" data-testid="link-wikimedia-footer">
                  Wikimedia Foundation, Inc.
                </a>
                , a non-profit organization.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
