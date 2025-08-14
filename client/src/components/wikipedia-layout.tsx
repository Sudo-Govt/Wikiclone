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
    <div className="min-h-screen bg-wiki-header font-wiki text-wiki">
      {/* Header */}
      <header className="bg-wiki-header border-b border-wiki-border shadow-sm">
        <div className="max-w-none px-3">
          <div className="flex items-center h-12">
            {/* Logo and Title */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-1 h-8 w-8 mr-2"
                onClick={toggleSidebar}
                data-testid="button-menu-toggle"
              >
                {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
              <a href="https://wikipedia.org" className="flex items-center mr-4" data-testid="link-wikipedia-home">
                <svg className="w-8 h-8 mr-2" viewBox="0 0 103 94" fill="none">
                  <path d="M51.5 22.5c-3.7 0-7.5 2.7-7.5 7.5v42c0 4.8 3.8 7.5 7.5 7.5s7.5-2.7 7.5-7.5V30c0-4.8-3.8-7.5-7.5-7.5z" fill="#000"/>
                  <path d="M38.5 30l-12 42h6l9-32 9 32h6l-12-42h-6zm26 0l-12 42h6l9-32 9 32h6l-12-42h-6z" fill="#000"/>
                  <text x="51.5" y="90" textAnchor="middle" fontSize="12" fill="#000" fontFamily="serif">WIKIPEDIA</text>
                </svg>
                <span className="text-base font-normal hidden sm:block">Wikipedia</span>
              </a>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <div className="flex border border-wiki-border rounded">
                <Input
                  type="search"
                  placeholder="Search Wikipedia"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 border-0 rounded-none rounded-l h-8 text-sm focus:ring-0 focus:border-blue-500"
                  data-testid="input-search"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 border-0 border-l border-wiki-border rounded-none rounded-r bg-wiki-bg hover:bg-gray-200"
                  data-testid="button-search"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-wiki-border shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={`/article/${result.id}`}
                      className="block px-3 py-2 text-sm hover:bg-gray-100 wiki-link border-b border-gray-100 last:border-b-0"
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
            <div className="flex items-center ml-4 text-xs">
              <a href="https://en.wikipedia.org/w/index.php?title=Special:CreateAccount" className="wiki-link mr-3 hidden sm:block" data-testid="link-create-account">
                Create account
              </a>
              <a href="https://en.wikipedia.org/w/index.php?title=Special:UserLogin" className="wiki-link mr-3" data-testid="link-login">
                Log in
              </a>
              <Button variant="ghost" size="sm" className="p-1 h-6 w-6" data-testid="button-user-menu">
                <div className="w-3 h-3 border border-gray-400 rounded-sm bg-gray-200"></div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
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
          className={`w-11/12 sm:w-56 bg-wiki-nav-bg border-r border-wiki-border min-h-screen fixed lg:relative lg:translate-x-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-20`}
          data-testid="sidebar-navigation"
        >
          <div className="px-3 py-2">
            <div className="mb-4">
              <h3 className="text-xs font-bold mb-2 text-wiki-text border-b border-wiki-border pb-1">Navigation</h3>
              <ul className="text-xs leading-relaxed">
                <li>
                  <Link href="/" className="block py-0.5 wiki-link" data-testid="link-main-page">
                    Main page
                  </Link>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Special:Contents" className="block py-0.5 wiki-link" data-testid="link-contents">
                    Contents
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Wikipedia:Featured_articles" className="block py-0.5 wiki-link" data-testid="link-featured-articles">
                    Featured content
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Portal:Current_events" className="block py-0.5 wiki-link" data-testid="link-current-events">
                    Current events
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Special:Random" className="block py-0.5 wiki-link" data-testid="link-random-article">
                    Random article
                  </a>
                </li>
                <li>
                  <a href="https://donate.wikimedia.org" className="block py-0.5 wiki-link" data-testid="link-donate">
                    Donate to Wikipedia
                  </a>
                </li>
                <li>
                  <a href="https://shop.wikimedia.org" className="block py-0.5 wiki-link" data-testid="link-shop">
                    Wikipedia store
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-bold mb-2 text-wiki-text border-b border-wiki-border pb-1">Interaction</h3>
              <ul className="text-xs leading-relaxed">
                <li>
                  <a href="https://en.wikipedia.org/wiki/Help:Contents" className="block py-0.5 wiki-link" data-testid="link-help">
                    Help
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Wikipedia:About" className="block py-0.5 wiki-link" data-testid="link-about">
                    About Wikipedia
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Wikipedia:Community_portal" className="block py-0.5 wiki-link" data-testid="link-community">
                    Community portal
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Special:RecentChanges" className="block py-0.5 wiki-link" data-testid="link-recent-changes">
                    Recent changes
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Wikipedia:Contact_us" className="block py-0.5 wiki-link" data-testid="link-contact">
                    Contact page
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-bold mb-2 text-wiki-text border-b border-wiki-border pb-1">Tools</h3>
              <ul className="text-xs leading-relaxed">
                <li>
                  <a href="https://en.wikipedia.org/wiki/Special:WhatLinksHere" className="block py-0.5 wiki-link" data-testid="link-what-links-here">
                    What links here
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Special:RecentChangesLinked" className="block py-0.5 wiki-link" data-testid="link-related-changes">
                    Related changes
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Special:SpecialPages" className="block py-0.5 wiki-link" data-testid="link-special-pages">
                    Special pages
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Special:PermanentLink" className="block py-0.5 wiki-link" data-testid="link-permanent-link">
                    Permanent link
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Special:Information" className="block py-0.5 wiki-link" data-testid="link-page-info">
                    Page information
                  </a>
                </li>
                <li>
                  <a href="https://www.wikidata.org" className="block py-0.5 wiki-link" data-testid="link-wikidata">
                    Wikidata item
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-bold mb-2 text-wiki-text border-b border-wiki-border pb-1">Print/export</h3>
              <ul className="text-xs leading-relaxed">
                <li>
                  <a href="#" className="block py-0.5 wiki-link" data-testid="link-printable">
                    Printable version
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-bold mb-2 text-wiki-text border-b border-wiki-border pb-1">In other projects</h3>
              <ul className="text-xs leading-relaxed">
                <li>
                  <a href="https://commons.wikimedia.org" className="block py-0.5 wiki-link" data-testid="link-commons">
                    Wikimedia Commons
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold mb-2 text-wiki-text border-b border-wiki-border pb-1">Available Articles</h3>
              <ul className="text-xs leading-relaxed max-h-48 overflow-y-auto">
                {articles.map((article) => (
                  <li key={article.id}>
                    <Link
                      href={`/article/${article.id}`}
                      className="block py-0.5 wiki-link"
                      data-testid={`link-article-${article.id}`}
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 ml-0 bg-wiki-header">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-wiki-header border-t border-wiki-border mt-8">
        <div className="px-3 py-4">
          <div className="text-xs text-wiki-muted space-y-3">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
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
              <a href="https://m.wikipedia.org" className="wiki-link" data-testid="link-mobile">
                Mobile view
              </a>
            </div>
            <div className="text-wiki-muted leading-relaxed">
              <p className="mb-2">
                Text is available under the{" "}
                <a href="https://creativecommons.org/licenses/by-sa/3.0/" className="wiki-link" data-testid="link-license">
                  Creative Commons Attribution-ShareAlike License 4.0
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
              <div className="flex items-center gap-4 text-xs">
                <a href="https://wikimediafoundation.org" className="wiki-link" data-testid="link-wikimedia">
                  <img src="https://en.wikipedia.org/static/images/footer/wikimedia-button.png" alt="Wikimedia Foundation" className="h-4" />
                </a>
                <a href="https://www.mediawiki.org" className="wiki-link" data-testid="link-mediawiki">
                  <img src="https://en.wikipedia.org/static/images/footer/poweredby_mediawiki_88x31.png" alt="Powered by MediaWiki" className="h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
