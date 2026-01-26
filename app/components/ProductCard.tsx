"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/lib/products";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-[var(--card)] rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--border)] overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--muted)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow-md">
                -{discount}%
              </span>
            )}
            {product.inStock === false && (
              <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold shadow-md border border-white/20 text-center">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4 sm:p-5">
          <div className="flex-grow">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] mb-1 opacity-80">
              {product.category}
            </p>
            <h3 className="text-base sm:text-lg font-bold text-[var(--card-foreground)] leading-snug group-hover:text-[var(--primary)] transition-colors line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]">
              {product.name}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--muted-foreground)] line-clamp-2 leading-relaxed h-[2.5rem] sm:h-[3rem]">
              {product.description}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between pt-4 border-t border-[var(--border)]/50">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black text-[var(--foreground)]">
                  ${product.price.toFixed(2)}
                </span>
                {discount > 0 && (
                  <span className="text-xs text-[var(--muted-foreground)] line-through">
                    ${product.compareAtPrice?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </Link>
  );
}

