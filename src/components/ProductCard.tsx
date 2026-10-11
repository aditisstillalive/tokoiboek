'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/sheets';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const imageUrl = `/placeholder-product.svg`;
  
  return (
    <Link href={`/product/${product.id}`} className="product-card group" aria-label={product.namaProduk}>
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.namaProduk}
          fill
          className="product-image transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
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
  );
}