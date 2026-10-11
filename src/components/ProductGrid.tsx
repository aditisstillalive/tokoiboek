'use client';

import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  viewAllHref?: string;
}

export function ProductGrid({ products, title, viewAllHref }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="py-16 lg:py-24" aria-labelledby={title ? `product-grid-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}>
        <div className="container text-center">
          <p className="text-gray-600">Tidak ada produk tersedia</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24" aria-labelledby={title ? `product-grid-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}>
      <div className="container">
        {(title || viewAllHref) && (
          <div className="flex items-center justify-between mb-8">
            {title && <h2 id={`product-grid-${title.toLowerCase().replace(/\s+/g, '-')}`} className="section-title">{title}</h2>}
            {viewAllHref && (
              <a href={viewAllHref} className="text-sm font-medium text-primary hover:text-primary-hover transition-colors flex items-center gap-1">
                Lihat Semua
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            )}
          </div>
        )}
        <div className="grid-4" role="list">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 4} />
          ))}
        </div>
      </div>
    </section>
  );
}