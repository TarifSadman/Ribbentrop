"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getAllProducts, getAllCollections, getProductsByCollection, type Product, type Collection } from "@/app/lib/products";

import ProductCard from "@/app/components/ProductCard";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCollection = searchParams.get("collection");

  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");

  const filterCollection = initialCollection || "all";

  // Initial load of collections
  useEffect(() => {
    async function fetchInitialData() {
      const cols = await getAllCollections();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollections(cols);
    }
    fetchInitialData();
  }, []);

  // Fetch products based on selected collection or all
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      let data: Product[] = [];

      if (filterCollection !== "all") {
        data = await getProductsByCollection(filterCollection);
      } else {
        data = await getAllProducts();
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProducts(data);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
    fetchProducts();
  }, [filterCollection]);

  let displayProducts = [...products];

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

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
            <div className="bg-[var(--card)] rounded-lg p-6 shadow-sm border border-[var(--border)] sticky top-24">
              {/* Collection Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-4 border-b border-[var(--border)] pb-2 uppercase tracking-tighter">
                  Collections
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="collection"
                      value="all"
                      checked={filterCollection === "all"}
                      onChange={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete("collection");
                        router.push(`/products?${params.toString()}`);
                      }}
                      className="w-4 h-4 text-[var(--primary)] accent-[var(--primary)]"
                    />
                    <span className="ml-3 text-[var(--foreground)] font-medium group-hover:text-[var(--primary)] transition">
                      All Products
                    </span>
                  </label>
                  {collections.map((col) => (
                    <label
                      key={col.id}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="collection"
                        value={col.handle}
                        checked={filterCollection === col.handle}
                        onChange={(e) => {
                          const params = new URLSearchParams(searchParams.toString());
                          params.set("collection", e.target.value);
                          router.push(`/products?${params.toString()}`);
                        }}
                        className="w-4 h-4 text-[var(--primary)] accent-[var(--primary)]"
                      />
                      <span className="ml-3 text-[var(--foreground)] font-medium group-hover:text-[var(--primary)] transition">
                        {col.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="pt-4 border-t border-[var(--border)]">
                <h3 className="text-sm font-bold text-[var(--muted-foreground)] mb-4 uppercase tracking-wider">
                  Sort Items
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
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
