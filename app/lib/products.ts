// Sample product data - replace with your actual products
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Premium Leather Handbag",
    description: "Exquisite crafted leather handbag with premium materials and timeless design",
    price: 129.99,
    image: "/demo handbag.jpg",
    category: "Bags",
    inStock: true,
  },
  {
    id: 2,
    name: "Luxury Home Decor Set",
    description: "Elegant home decor collection for modern living spaces",
    price: 189.99,
    image: "/hero.jpg",
    category: "Home-Decor",
    inStock: true,
  },
  {
    id: 3,
    name: "Premium Product Collection",
    description: "Limited edition piece for discerning customers with exclusive features",
    price: 199.99,
    image: "/demo product.jpg",
    category: "Exclusive",
    inStock: true,
  },
  {
    id: 4,
    name: "Best Seller Deluxe",
    description: "Customer favorite with outstanding reviews and exceptional quality",
    price: 99.99,
    image: "/demo product2.jpg",
    category: "Featured",
    inStock: true,
  },
  {
    id: 5,
    name: "Modern Glass Collection",
    description: "Contemporary glass collection with elegant styling",
    price: 149.99,
    image: "/demo image22.jpg",
    category: "Home-Decor",
    inStock: true,
  },
  {
    id: 6,
    name: "Signature Collection Item",
    description: "Elegant design meets superior craftsmanship and attention to detail",
    price: 159.99,
    image: "/alt-hero.jpg",
    category: "Exclusive",
    inStock: false,
  },
  {
    id: 7,
    name: "Modern Accessory Premium",
    description: "Contemporary accessory perfect for the modern lifestyle",
    price: 79.99,
    image: "/dummy img3.jpg",
    category: "Accessories",
    inStock: true,
  },
  {
    id: 8,
    name: "Classic Collection Edition",
    description: "Timeless design that never goes out of style, handcrafted quality",
    price: 139.99,
    image: "/demo handbag.jpg",
    category: "Featured",
    inStock: true,
  },
  {
    id: 9,
    name: "Designer Series",
    description: "Premium designer collection crafted with precision",
    price: 249.99,
    image: "/hero.jpg",
    category: "Exclusive",
    inStock: true,
  },
  {
    id: 10,
    name: "Artisan Crafted Piece",
    description: "Handmade artisan piece with unique character and quality",
    price: 169.99,
    image: "/demo product.jpg",
    category: "Bags",
    inStock: true,
  },
  {
    id: 11,
    name: "Luxury Essential",
    description: "Essential luxury item for everyday use",
    price: 119.99,
    image: "/demo image22.jpg",
    category: "Accessories",
    inStock: true,
  },
  {
    id: 12,
    name: "Premium Collection Finale",
    description: "Culmination of our finest designs and craftsmanship",
    price: 189.99,
    image: "/pexels-prod.jpg",
    category: "Featured",
    inStock: true,
  },
  {
    id: 13,
    name: "Exclusive Luxury Bundle",
    description: "Premium bundle featuring our most sought-after items",
    price: 279.99,
    image: "/pex-prodss.jpg",
    category: "Exclusive",
    inStock: true,
  },
  {
    id: 14,
    name: "Premium Crafted Collection",
    description: "Expertly crafted collection for the discerning taste",
    price: 159.99,
    image: "/pexels-prod.jpg",
    category: "Home-Decor",
    inStock: true,
  },
  {
    id: 15,
    name: "Signature Style Piece",
    description: "Statement piece that elevates any collection",
    price: 199.99,
    image: "/pex-prodss.jpg",
    category: "Bags",
    inStock: true,
  },
  {
    id: 16,
    name: "Ultimate Luxury Edition",
    description: "The pinnacle of our collection with unmatched quality",
    price: 349.99,
    image: "/demo product2.jpg",
    category: "Exclusive",
    inStock: false,
  },
];

export const getProductById = (id: number): Product | undefined => {
  return PRODUCTS.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return PRODUCTS.filter((product) => product.category === category);
};
