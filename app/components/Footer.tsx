import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-[var(--background)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/Ribbentrop_Logo.jpg"
                alt="Ribbentrop Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-[var(--background)]">Ribbentrop</span>
            </div>
            <p className="text-sm text-[var(--background)]/80">
              Premium quality products for the modern home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[var(--primary)] mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[var(--background)]/80">
              <li>
                <Link href="/" className="hover:text-[var(--primary)] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[var(--primary)] transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--primary)] transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-[var(--primary)] mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-[var(--background)]/80">
              <li>
                <Link href="/contact" className="hover:text-[var(--primary)] transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--primary)] transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--primary)] transition">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-[var(--primary)] mb-4">Newsletter</h4>
            <p className="text-sm text-[var(--background)]/80 mb-4">
              Subscribe for exclusive offers
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-[var(--background)] text-[var(--foreground)] placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-primary rounded-l-none rounded-r-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center text-[var(--background)]/60">
          <p className="text-sm">
            &copy; 2026 Ribbentrop. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <Link href="#" className="hover:text-[var(--primary)] transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[var(--primary)] transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
