import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            About Ribbentrop
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Learn more about our brand and mission
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Ribbentrop was founded with a simple vision: to bring exceptional quality
              and timeless elegance to everyday life. We believe that superior craftsmanship
              and attention to detail matter.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Each product in our collection is carefully curated and sourced from artisans
              who share our commitment to excellence. We pride ourselves on offering items
              that not only look beautiful but stand the test of time.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Our mission is to help our customers surround themselves with products they
              truly love and can depend on for years to come.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/hero.jpg"
              alt="Ribbentrop Story"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We never compromise on quality. Every product meets our strict standards.
              </p>
            </div>

            {/* Sustainability */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Sustainability
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to eco-friendly practices and responsible sourcing.
              </p>
            </div>

            {/* Customer Care */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Customer Care
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your satisfaction is our priority. We're here to help 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Shop?
          </h2>
          <p className="text-purple-100 mb-8">
            Explore our curated collection and find something you love.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}
