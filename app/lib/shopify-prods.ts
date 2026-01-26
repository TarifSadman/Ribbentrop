import { Product } from "./products";

// lib/shopify.ts
// Use NEXT_PUBLIC_ prefix so these are available on the client-side (required for "use client" components)
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;



interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  images: {
    edges: Array<{
      node: {
        url: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        price: {
          amount: string;
        };
        compareAtPrice: {
          amount: string;
        } | null;
      };
    }>;
  };
}


interface ShopifyCollectionNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: {
    url: string;
  } | null;
}

function mapShopifyProduct(node: ShopifyProductNode): Product {
  const numericIdMatch = node.id.match(/\d+$/);
  const mappedId = numericIdMatch ? numericIdMatch[0] : node.id;

  return {
    id: mappedId,
    handle: node.handle,
    name: node.title,
    description: (node.description || "").replace(/<[^>]*>/g, ""),
    price: Number(node.variants.edges[0]?.node.price.amount ?? 0),
    compareAtPrice: node.variants.edges[0]?.node.compareAtPrice
      ? Number(node.variants.edges[0].node.compareAtPrice.amount)
      : undefined,
    image: node.images.edges[0]?.node.url ?? "/placeholder.jpg",
    category: node.productType || "General",
    tags: node.tags || [],
    inStock: node.availableForSale,
  };
}


export async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `
          {
            products(first: 20) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  productType
                  tags
                  availableForSale
                  images(first: 1) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        price {
                          amount
                        }
                        compareAtPrice {
                          amount
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
      next: { revalidate: 60 },
    }
  );

  const json = await res.json();

  if (!res.ok || !json.data || !json.data.products) {
    console.error("Shopify Products Error:", json);
    return [];
  }

  return json.data.products.edges.map((edge: { node: ShopifyProductNode }) =>
    mapShopifyProduct(edge.node)
  );
}

export async function getCollections() {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `
          {
            collections(first: 20) {
              edges {
                node {
                  id
                  handle
                  title
                  description
                  image {
                    url
                  }
                }
              }
            }
          }
        `,
      }),
      next: { revalidate: 60 },
    }
  );

  const json = await res.json();
  if (!res.ok || !json.data || !json.data.collections) {
    console.error("Shopify Collections Error:", json);
    return [];
  }

  return json.data.collections.edges.map((edge: { node: ShopifyCollectionNode }) => ({
    id: edge.node.id,
    handle: edge.node.handle,
    title: edge.node.title,
    description: edge.node.description,
    image: edge.node.image?.url || null,
  }));
}

export async function getProductsByCollection(handle: string): Promise<Product[]> {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `
          query CollectionProducts($handle: String!) {
            collection(handle: $handle) {
              products(first: 20) {
                edges {
                  node {
                    id
                    title
                    handle
                    description
                    productType
                    tags
                    availableForSale
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                    variants(first: 1) {
                      edges {
                        node {
                          price {
                            amount
                          }
                          compareAtPrice {
                            amount
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { handle },
      }),
      next: { revalidate: 60 },
    }
  );

  const json = await res.json();
  if (!res.ok || !json.data || !json.data.collection) {
    console.error("Shopify Collection Products Error:", json);
    return [];
  }

  return json.data.collection.products.edges.map((edge: { node: ShopifyProductNode }) =>
    mapShopifyProduct(edge.node)
  );
}


