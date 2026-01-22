"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductById, PRODUCTS } from "@/app/lib/products";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Get related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/products"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 mb-8 font-medium"
        >
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-slate-900 rounded-lg p-8 shadow-sm mb-12">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">(42 reviews)</span>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Key Features:
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Premium quality materials</li>
                  <li>• Expert craftsmanship</li>
                  <li>• Lifetime warranty included</li>
                  <li>• Eco-friendly production</li>
                </ul>
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                ${product.price.toFixed(2)}
              </div>

              {product.inStock ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-lg">
                      <button
                        onClick={() =>
                          setQuantity(Math.max(1, quantity - 1))
                        }
                        className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition">
                    Add to Cart ({quantity})
                  </button>
                  <button className="w-full border-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800 font-semibold py-3 px-6 rounded-lg transition">
                    Save for Later
                  </button>
                </div>
              ) : (
                <button className="w-full bg-gray-300 text-gray-500 cursor-not-allowed font-semibold py-3 px-6 rounded-lg">
                  Out of Stock
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>✓ Free shipping on orders over $100</p>
                <p>✓ 30-day money-back guarantee</p>
                <p>✓ Secure checkout</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-slate-800">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                    <Link
                      href={`/products/${relatedProduct.id}`}
                      className="mt-4 block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg text-center transition"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
