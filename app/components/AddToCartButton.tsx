"use client";

import { useState } from "react";
import { useCart } from "@/app/lib/cart-context";
import { Product } from "@/app/lib/products";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product.inStock) {
    return (
      <button
        disabled
        className="px-4 py-2 rounded-lg font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
      >
        Unavailable
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`px-4 py-2 rounded-lg font-medium transition ${
        added
          ? "bg-green-600 text-white"
          : "bg-purple-600 text-white hover:bg-purple-700"
      }`}
    >
      {added ? "✓ Added!" : "Add to Cart"}
    </button>
  );
}
