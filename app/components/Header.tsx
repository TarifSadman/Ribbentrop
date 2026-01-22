"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import CartIcon from "./CartIcon";
import { PRODUCTS } from "@/app/lib/products";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof PRODUCTS>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Real-time search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    setSearchResults(filtered);
  }, [searchQuery]);

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Ribbentrop_Logo.jpg"
                alt="Ribbentrop Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">
                Ribbentrop
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
              >
                Contact
              </Link>
            </nav>

            {/* Search, Cart and Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-6 h-6"
                >
                  <path
                    fill="#199be2"
                    d="M35.983,32.448l-3.536,3.536l7.87,7.87c0.195,0.195,0.512,0.195,0.707,0l2.828-2.828 c0.195-0.195,0.195-0.512,0-0.707L35.983,32.448z"
                  />
                  <radialGradient
                    id="KGt2acGa95QyN2j07oBX6a"
                    cx="20.024"
                    cy="20.096"
                    r="19.604"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset=".693" stopColor="#006185" />
                    <stop offset=".921" stopColor="#35c1f1" />
                  </radialGradient>
                  <polygon
                    fill="url(#KGt2acGa95QyN2j07oBX6a)"
                    points="31.601,28.065 28.065,31.601 32.448,35.983 35.983,32.448"
                  />
                  <linearGradient
                    id="KGt2acGa95QyN2j07oBX6b"
                    x1="8.911"
                    x2="31.339"
                    y1="8.911"
                    y2="31.339"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#a3ffff" />
                    <stop offset=".223" stopColor="#9dfbff" />
                    <stop offset=".53" stopColor="#8bf1ff" />
                    <stop offset=".885" stopColor="#6ee0ff" />
                    <stop offset="1" stopColor="#63daff" />
                  </linearGradient>
                  <circle cx="20" cy="20" r="16" fill="url(#KGt2acGa95QyN2j07oBX6b)" />
                </svg>
              </button>

              <CartIcon />

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              <Link
                href="/"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 rounded"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 rounded"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 rounded"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 rounded"
              >
                Contact
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/30 backdrop-blur-sm"
          onClick={closeSearch}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-6 h-6 flex-shrink-0"
              >
                <path
                  fill="#199be2"
                  d="M35.983,32.448l-3.536,3.536l7.87,7.87c0.195,0.195,0.512,0.195,0.707,0l2.828-2.828 c0.195-0.195,0.195-0.512,0-0.707L35.983,32.448z"
                />
                <radialGradient
                  id="search-grad-a"
                  cx="20.024"
                  cy="20.096"
                  r="19.604"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset=".693" stopColor="#006185" />
                  <stop offset=".921" stopColor="#35c1f1" />
                </radialGradient>
                <polygon
                  fill="url(#search-grad-a)"
                  points="31.601,28.065 28.065,31.601 32.448,35.983 35.983,32.448"
                />
                <linearGradient
                  id="search-grad-b"
                  x1="8.911"
                  x2="31.339"
                  y1="8.911"
                  y2="31.339"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#a3ffff" />
                  <stop offset=".223" stopColor="#9dfbff" />
                  <stop offset=".53" stopColor="#8bf1ff" />
                  <stop offset=".885" stopColor="#6ee0ff" />
                  <stop offset="1" stopColor="#63daff" />
                </linearGradient>
                <circle cx="20" cy="20" r="16" fill="url(#search-grad-b)" />
              </svg>

              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 outline-none text-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-400"
              />

              <button
                onClick={closeSearch}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Search Results */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {searchQuery.trim() === "" ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Start typing to search for products...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No products found for "{searchQuery}"
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white truncate">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {product.category}
                        </div>
                        <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          ${product.price.toFixed(2)}
                        </div>
                      </div>
                      {!product.inStock && (
                        <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                          Out of Stock
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Results Count */}
            {searchQuery.trim() !== "" && searchResults.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 text-sm text-gray-500 dark:text-gray-400">
                Found {searchResults.length} product{searchResults.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}