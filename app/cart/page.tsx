"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/lib/cart-context";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and manage your items
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-lg p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"
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
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Add some items to get started
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-6 border-b border-gray-200 dark:border-slate-700 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-max">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  href="/products"
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    ${(totalPrice * 1.1).toFixed(2)}
                  </span>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition mb-3">
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full border-2 border-red-600 text-red-600 dark:border-red-400 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 font-semibold py-3 px-6 rounded-lg transition"
                >
                  Clear Cart
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700 space-y-2 text-sm text-gray-600 dark:text-gray-400">
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
