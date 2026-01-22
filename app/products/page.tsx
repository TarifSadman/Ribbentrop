"use client";

import { useState } from "react";
import { PRODUCTS } from "@/app/lib/products";
import ProductCard from "@/app/components/ProductCard";

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");

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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Our Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse our complete collection of premium items
          </p>
        </div>
      </div>

      {/* Filters and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
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
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="ml-3 text-gray-700 dark:text-gray-300 capitalize">
                        {category === "all" ? "All Products" : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Sort By
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              <div className="bg-white dark:bg-slate-900 rounded-lg p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
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
