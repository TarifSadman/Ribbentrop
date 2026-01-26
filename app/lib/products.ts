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
  inStock: boolean;
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



