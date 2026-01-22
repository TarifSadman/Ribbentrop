"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartIcon from "./CartIcon";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center gap-4">
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
  );
}
