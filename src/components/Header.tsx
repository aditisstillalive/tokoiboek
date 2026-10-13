'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2" aria-label="Toko Iboek Home">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-primary">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-xl font-bold text-primary hidden sm:block">Toko Iboek</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/collections/all" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Semua Produk
              </Link>
              <Link href="/collections/new-arrival" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                New Arrival
              </Link>
              <Link href="/collections/sale" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Sale
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className={`relative ${searchOpen ? 'md:block hidden' : 'md:block'}`}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>
              
              <form className="flex items-center gap-2" onSubmit={handleSearch}>
                <input
                  type="search"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input w-64 md:w-80 lg:w-96 text-sm placeholder:text-gray-400"
                  aria-label="Search products"
                />
                <button type="submit" className="hidden sm:flex items-center justify-center p-2 text-gray-400 hover:text-primary transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </button>
              </form>
            </div>

            <Link href="/account/signin" className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Masuk
            </Link>

            <Link href="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors" aria-label="Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-down">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input text-sm"
                autoFocus
                aria-label="Search products"
              />
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}