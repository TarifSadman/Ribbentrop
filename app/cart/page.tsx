"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/lib/cart-context";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Page Header */}
      <div className="bg-[var(--card)] py-12 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
            Shopping Cart
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Review and manage your items
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="bg-[var(--card)] rounded-lg p-12 text-center border border-[var(--border)]">
            <svg
              className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
              Your cart is empty
            </h2>
            <p className="text-[var(--muted-foreground)] mb-8">
              Add some items to get started
            </p>
            <Link
              href="/products"
              className="btn-primary inline-flex items-center justify-center p-3"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-[var(--card)] rounded-lg shadow-sm overflow-hidden border border-[var(--border)]">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-6 border-b border-[var(--border)] last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-[var(--muted)] rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      {/* Name and Price */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.id}`}>
                          <h3 className="text-base sm:text-lg font-semibold text-[var(--foreground)] hover:text-[var(--primary)] line-clamp-2 transition">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-3 sm:gap-0 sm:border sm:border-[var(--border)] sm:rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base text-[var(--muted-foreground)] hover:bg-[var(--secondary)] rounded sm:rounded-none transition"
                        >
                          −
                        </button>
                        <span className="px-3 sm:px-4 py-1 sm:py-2 text-[var(--foreground)] font-medium text-center min-w-[40px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base text-[var(--muted-foreground)] hover:bg-[var(--secondary)] rounded sm:rounded-none transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right sm:text-left flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-2">
                        <span className="text-sm sm:text-base font-semibold text-[var(--foreground)]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs sm:text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  href="/products"
                  className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 font-medium transition"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[var(--card)] rounded-lg shadow-sm p-6 sticky top-6 border border-[var(--border)]">
                <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-[var(--border)]">
                  <div className="flex justify-between text-[var(--muted-foreground)]">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--muted-foreground)]">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-[var(--muted-foreground)]">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-[var(--foreground)]">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-[var(--accent)]">
                    ${(totalPrice * 1.1).toFixed(2)}
                  </span>
                </div>

                <button className="w-full btn-primary py-3 px-6 rounded-lg transition mb-3 font-semibold">
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3 px-6 rounded-lg transition"
                >
                  Clear Cart
                </button>

                <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-2 text-sm text-[var(--muted-foreground)]">
                  <p>✓ Free shipping on orders over $100</p>
                  <p>✓ 30-day money-back guarantee</p>
                  <p>✓ Secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
