"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/lib/products";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-[var(--card)] rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer h-full border border-[var(--border)]">
        <div className="relative h-48 w-full overflow-hidden bg-[var(--muted)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {product.inStock === false && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-[var(--primary)] font-semibold uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--card-foreground)] line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)] line-clamp-2">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-[var(--accent)]">
              ${product.price.toFixed(2)}
            </span>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </Link>
  );
}
