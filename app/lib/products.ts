import { getProducts } from "./shopify-prods";

export interface Product {
  id: string;
  handle: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: string;
  tags: string[];
  inStock: boolean;
}

/**
 * Returns a consistent color palette for a tag based on its string value.
 */
export function getTagColor(tag: string): { bg: string; text: string; border: string } {
  const palettes = [
    { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100" },
    { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" },
    { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-100" },
    { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100" },
    { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-100" },
    { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-100" },
    { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-100" },
  ];

  // Simple hash to consistently pick a color
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }

  return palettes[Math.abs(hash) % palettes.length];
}



export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string | null;
}

/**
 * Get all products (from Shopify)
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const shopifyProducts = await getProducts();
    return shopifyProducts;
  } catch (error) {
    console.error("Failed to fetch Shopify products:", error);
    return [];
  }
}

/**
 * Get all collections from Shopify
 */
export async function getAllCollections(): Promise<Collection[]> {
  const { getCollections } = await import("./shopify-prods");
  return await getCollections();
}

/**
 * Get products by collection handle
 */
export async function getProductsByCollection(handle: string): Promise<Product[]> {
  const { getProductsByCollection: getProductsCol } = await import("./shopify-prods");
  return await getProductsCol(handle);
}

/**
 * Get single product by ID (async version for server components or hooks)
 */
export async function getProductById(
  id: string
): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find(product => product.id === id);
}

/**
 * Get products by category (productType)
 */
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter(
    product => product.category.toLowerCase() === category.toLowerCase()
  );
}



