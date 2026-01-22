"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length
    );
    setIsAutoPlay(false);
  };

  return (
    <section className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gray-900 group">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Ribbon Hero ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/70 to-black/60" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-start z-10">
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

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100 rotate-180"
        aria-label="Previous slide"
      >
        <Image
          src="/chevron-right.svg"
          alt="Previous"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <Image
          src="/chevron-right.svg"
          alt="Next"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Autoplay Resume Message */}
      {!isAutoPlay && (
        <button
          onClick={() => setIsAutoPlay(true)}
          className="absolute top-6 right-6 z-20 bg-black/50 hover:bg-black/75 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Resume Autoplay
        </button>
      )}
    </section>
  );
}
