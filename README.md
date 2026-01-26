# Ribbentrop | Headless Shopify Storefront

Ribbentrop is a high-performance, premium e-commerce storefront built with a headless architecture. It leverages the power of **Next.js 14+** and **TypeScript** to provide a lightning-fast shopping experience, seamlessly integrated with the **Shopify Storefront API**.

## 🚀 Key Features

- **Headless Architecture**: Complete decoupling of the frontend (Next.js) and backend (Shopify) for maximum flexibility and performance.
- **Dynamic Shopify Sync**: Real-time fetching of products and collections directly from Shopify via GraphQL.
- **Advanced Filtering**: Navigate products effortlessly with collection-based and type-based filtering.
- **Real-time Search**: A fast, client-side search engine for discovering products instantly.
- **Premium UI/UX**: Modern, responsive design using Tailwind CSS with glassmorphism, smooth animations, and optimized image delivery.
- **Persistent Cart**: A custom-built shopping cart using React Context API and LocalStorage for a seamless checkout journey.
- **Performance Optimized**: Built with Server-Side Rendering (SSR) and optimized for SEO and core web vitals.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API**: [Shopify Storefront API](https://shopify.dev/docs/api/storefront) (GraphQL)
- **State Management**: React Context API
- **Deployment**: Optimized for Vercel

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ribbentrop.git
cd ribbentrop
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your Shopify credentials:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-access-token
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront.

## 📁 Project Structure

- `app/lib/shopify-prods.ts`: Core Shopify API integration and GraphQL queries.
- `app/lib/cart-context.tsx`: Global state management for the shopping cart.
- `app/products/`: Dynamic routing for product listing and detail pages.
- `app/components/`: Reusable UI components (ProductCard, Header, CartIcon, etc.).
- `app/globals.css`: Global styles and design system tokens.

## 📄 License
This project is open-source and available under the MIT License.
