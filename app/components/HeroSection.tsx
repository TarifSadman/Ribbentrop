import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gray-900">
      {/* Background Image - Rotating through featured images */}
      <Image
        src="/alt-hero.jpg"
        alt="Ribbentrop Hero"
        fill
        className="object-cover opacity-70"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/70 to-black/60" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-start">
        <div className="px-4 sm:px-6 lg:px-8 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Welcome to Ribbentrop
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-xl">
            Discover exceptional quality and timeless elegance in every product.
            Curated for the discerning customer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition border border-white/50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
