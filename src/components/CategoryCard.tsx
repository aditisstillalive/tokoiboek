'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
  priority?: boolean;
}

const categoryImages: Record<string, string> = {
  'Bebi Suka': '/category-bebi-suka.jpg',
  'Benourish': '/category-benourish.jpg',
  'Berkah Chicken': '/category-berkah-chicken.jpg',
};

export function CategoryCard({ category, priority = false }: CategoryCardProps) {
  const imageUrl = categoryImages[category.name] || '/placeholder-category.jpg';
  
  return (
    <Link href={`/collections/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="category-card relative group" aria-label={category.name}>
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={category.name}
          fill
          className="category-image transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23f5f5f5' width='1' height='1'/%3E%3C/svg%3E"
        />
        <div className="category-overlay">
          <span className="category-name">{category.name}</span>
        </div>
        <div className="absolute bottom-3 right-3 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
          {category.products.length} Produk
        </div>
      </div>
    </Link>
  );
}