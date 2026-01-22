import { PRODUCTS } from "@/app/lib/products";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function FeaturedProducts() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Collection
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Handpicked selections showcasing our finest craftsmanship and design
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}