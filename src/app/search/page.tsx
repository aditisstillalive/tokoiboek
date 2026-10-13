'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/sheets';
import { getProductThumbnailUrl } from '@/lib/image-mapping';
import Fuse from 'fuse.js';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fuse, setFuse] = useState<Fuse<Product> | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/products.json');
        const data = await res.json();
        
        const fuseInstance = new Fuse<Product>(data, {
          keys: ['namaProduk', 'kategori'],
          threshold: 0.3,
          includeScore: true,
        });
        setFuse(fuseInstance);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const performSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim() && fuse) {
      const searchResults = fuse.search(searchQuery).map(r => r.item);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [fuse]);

  useEffect(() => {
    searchParams.then(params => {
      if (params.q) {
        performSearch(params.q);
      }
    });
  }, [searchParams, performSearch]);

  return (
    <div className="container py-8 lg:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-primary font-medium">Hasil Pencarian</span>
      </nav>

      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={(e) => { e.preventDefault(); performSearch(query); }}>
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk..."
              className="input w-full pl-12 pr-4 py-3 text-lg"
              autoFocus
              aria-label="Search products"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </form>
      </div>

      {query && (
        <p className="text-gray-600 mb-6">
          {results.length > 0 
            ? `Ditemukan ${results.length} produk untuk &ldquo;${query}&rdquo;`
            : `Tidak ada produk ditemukan untuk &ldquo;${query}&rdquo;`
          }
        </p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6" aria-busy="true">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="product-card animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-t-lg" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-5 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6" role="list">
          {results.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="product-card group block" aria-label={product.namaProduk}>
              <div className="relative overflow-hidden">
                <Image
                  src={getProductThumbnailUrl(product.asset || '', 400) || '/placeholder-product.svg'}
                  alt={product.namaProduk}
                  fill
                  className="product-image transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16.66vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23f5f5f5' width='1' height='1'/%3E%3C/svg%3E"
                />
                {product.status === 'Aman' && (
                  <span className="absolute top-3 left-3 badge badge-aman">Aman</span>
                )}
                {product.status === 'Tipis' && (
                  <span className="absolute top-3 left-3 badge badge-tipis">Tipis</span>
                )}
              </div>
              <div className="product-info">
                <p className="product-category">{product.kategori}</p>
                <h3 className="product-name">{product.namaProduk}</h3>
                <p className="product-price">{formatPrice(product.hargaJualRekomendasi)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <svg className="mx-auto text-gray-300 mb-4" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada hasil</h2>
          <p className="text-gray-600 mb-6">Coba kata kunci yang berbeda atau lihat semua produk.</p>
          <Link href="/collections/all" className="btn btn-primary">Lihat Semua Produk</Link>
        </div>
      ) : (
        <div className="text-center py-16">
          <svg className="mx-auto text-gray-300 mb-4" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cari Produk</h2>
          <p className="text-gray-600">Masukkan kata kunci di atas untuk mencari produk.</p>
        </div>
      )}
    </div>
  );
}