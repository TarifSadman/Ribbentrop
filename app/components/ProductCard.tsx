"use client";

import Image from "next/image";
import Link from "next/link";
import { Product, getTagColor } from "@/app/lib/products";
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
            {product.tags && product.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mb-2 min-h-[1.25rem]">
                {product.tags.slice(0, 2).map((tag, index) => {
                  const colors = getTagColor(tag);
                  return (
                    <span
                      key={index}
                      className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            ) : (
              <div className="min-h-[1.25rem] mb-2" /> // Keep spacing consistent
            )}
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
              {discount > 0 && (
                <span className="text-[10px] font-bold text-slate-400 line-through mb-0.5">
                  ${product.compareAtPrice?.toFixed(2)}
                </span>
              )}
              <span className="text-lg font-bold text-[var(--foreground)]">
                ${product.price.toFixed(2)}
              </span>
            </div>


            <AddToCartButton product={product} />
          </div>

        </div>
      </div>
    </Link>
  );
}

