import { getAllProducts } from "@/app/lib/products";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default async function FeaturedProducts() {
  const products = await getAllProducts();
  const featured = products.slice(0, 4);


  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
            Featured Products
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
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
            className="btn-primary inline-flex items-center justify-center"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}