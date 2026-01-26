"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductById, getAllProducts, type Product, getTagColor } from "@/app/lib/products";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/app/lib/cart-context";
import Loader from "@/app/components/Loader";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const prod = await getProductById(id);

      if (prod) {
        setProduct(prod);
        // Fetch related products
        const allProds = await getAllProducts();
        const related = allProds
          .filter((p) => p.category === prod.category && p.id !== prod.id)
          .slice(0, 3);
        setRelatedProducts(related);
      }

      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );

    setIsAddingToCart(false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (isLoading) {
    return <Loader />;
  }

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

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {isAddingToCart && <Loader />}

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary)]/80 mb-8 font-medium transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="currentColor" />
          </svg>
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[var(--card)] rounded-lg p-8 shadow-sm mb-12 border border-[var(--border)]">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-full aspect-square bg-[var(--muted)] rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.tags.map((tag, index) => {
                    const colors = getTagColor(tag);
                    return (
                      <span
                        key={index}
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">

                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-[var(--accent)]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-[var(--muted-foreground)]">(42 reviews)</span>
              </div>

              <p className="text-lg text-[var(--foreground)]/80 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
                  Key Features:
                </h3>
                <ul className="space-y-2 text-[var(--muted-foreground)]">
                  <li>• Premium quality materials</li>
                  <li>• Expert craftsmanship</li>
                  <li>• Lifetime warranty included</li>
                  <li>• Eco-friendly production</li>
                </ul>
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="border-t border-[var(--border)] pt-6">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-[var(--accent)]">
                  ${product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <>
                    <span className="text-xl text-[var(--muted-foreground)] line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                      {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>


              {product.inStock ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[var(--foreground)] font-medium">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-[var(--border)] rounded-lg bg-[var(--background)]">
                      <button
                        onClick={() =>
                          setQuantity(Math.max(1, quantity - 1))
                        }
                        className="px-3 py-2 text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-[var(--foreground)] font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3 px-6 rounded-lg transition text-base cursor-pointer ${isAdded ? "bg-green-600 text-white" : "btn-primary"
                      }`}
                  >
                    {isAdded ? "Added to Cart!" : `Add to Cart (${quantity})`}
                  </button>
                  <a
                    href="https://m.me/101975388289954"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 font-semibold py-3 px-6 rounded-lg transition"
                  >
                    Buy Now
                  </a>
                </div>
              ) : (
                <button className="w-full bg-gray-300 text-gray-500 cursor-not-allowed font-semibold py-3 px-6 rounded-lg">
                  Out of Stock
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-2 text-sm text-[var(--muted-foreground)]">
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
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-[var(--border)]"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[var(--muted)]">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[var(--card-foreground)] line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-2xl font-bold text-[var(--accent)] mt-2">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                    <Link
                      href={`/products/${relatedProduct.id}`}
                      className="mt-4 block btn-primary py-2 px-4 rounded-lg text-center transition"
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
