import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Shipping */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9-4v2m4-2v2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                On orders over $100. Fast and reliable delivery.
              </p>
            </div>

            {/* Quality Guarantee */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Quality Guarantee
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Premium materials and superior craftsmanship guaranteed.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Dedicated customer service team ready to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
