"use client";

import { useState } from "react";
import { useCart } from "@/app/lib/cart-context";
import { Product } from "@/app/lib/products";

interface AddToCartButtonProps {
  product: Product;
}

import Loader from "./Loader";

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setIsLoading(true);
    // Simulate network delay for better UX
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

    setIsLoading(false);
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
    <>
      {isLoading && <Loader />}
      <button
        onClick={handleAddToCart}
        className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${added ? "bg-green-600 text-white" : "btn-primary"
          }`}
      >
        {added ? "✓ Added!" : "Add to Cart"}
      </button>
    </>
  );
}
