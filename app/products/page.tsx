"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/app/lib/products";
import ProductCard from "@/app/components/ProductCard";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");

  // Sync with URL param
  useEffect(() => {
    if (initialCategory) {
      // Find the matching category from PRODUCTS to ensure case matching if needed, 
      // or just use the param if it matches exactly.
      // The links in Header use "Bags", "Home", "Accessories" which match PRODUCTS data.
      setFilterCategory(initialCategory);
    } else {
      setFilterCategory("all");
    }
  }, [initialCategory]);

  let displayProducts = [...PRODUCTS];

  // Filter by category
  if (filterCategory !== "all") {
    displayProducts = displayProducts.filter(
      (p) => p.category === filterCategory
    );
  }

  // Sort
  switch (sortBy) {
    case "price-low":
      displayProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      displayProducts.sort((a, b) => b.price - a.price);
      break;
    case "name":
      displayProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  const categories = ["all", ...new Set(PRODUCTS.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Page Header */}
      <div className="bg-[var(--card)] py-12 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
            Our Products
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Browse our complete collection of premium items
          </p>
        </div>
      </div>

      {/* Filters and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--card)] rounded-lg p-6 shadow-sm border border-[var(--border)]">
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                  Category
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filterCategory === category}
                        onChange={(e) => {
                          const newCategory = e.target.value;
                          setFilterCategory(newCategory);
                          const params = new URLSearchParams(searchParams);
                          if (newCategory === "all") {
                            params.delete("category");
                          } else {
                            params.set("category", newCategory);
                          }
                          router.push(`/products?${params.toString()}`);
                        }}
                        className="w-4 h-4 text-[var(--primary)] focus:ring-[var(--primary)] rounded cursor-pointer accent-[var(--primary)]"
                      />
                      <span className="ml-3 text-[var(--foreground)] capitalize hover:text-[var(--primary)] transition">
                        {category === "all" ? "All Products" : category && category.replace("-", " ")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                  Sort By
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-[var(--card)] rounded-lg p-12 text-center border border-[var(--border)]">
                <p className="text-[var(--muted-foreground)] text-lg">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-12 text-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
