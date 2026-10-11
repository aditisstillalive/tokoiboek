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

const categoryGradients: Record<string, string> = {
  'Bebi Suka': 'from-amber-400 via-orange-500 to-red-500',
  'Benourish': 'from-emerald-400 via-teal-500 to-cyan-600',
  'Berkah Chicken': 'from-amber-500 via-orange-600 to-red-600',
};

const categoryIcons: Record<string, React.ReactNode> = {
  'Bebi Suka': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/90">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 6v6l4 2"/>
      <circle cx="8" cy="14" r="1"/>
      <circle cx="16" cy="14" r="1"/>
    </svg>
  ),
  'Benourish': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/90">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 6v6l4 2"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  ),
  'Berkah Chicken': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/90">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M14 9a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4z"/>
      <path d="M12 16v-4"/>
      <path d="M9 13h6"/>
    </svg>
  ),
};

export function CategoryCard({ category, priority = false }: CategoryCardProps) {
  const imageUrl = categoryImages[category.name] || '/placeholder-category.jpg';
  const gradient = categoryGradients[category.name] || 'from-gray-400 via-gray-500 to-gray-600';
  const icon = categoryIcons[category.name] || categoryIcons['Bebi Suka'];
  
  return (
    <Link 
      href={`/collections/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
      className="category-card relative group block aspect-square overflow-hidden"
      aria-label={category.name}
    >
      <div className="absolute inset-0 bg-gradient-to-br relative">
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23f0f0f0' width='1' height='1'/%3E%3C/svg%3E"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-500`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center relative z-10">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20">
            {icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
            {category.name}
          </h3>
          <p className="text-white/80 text-sm md:text-base font-medium">
            {category.products.length} Produk
          </p>
        </div>
        
        <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm font-medium border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          Lihat Koleksi
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block ml-1 translate-y-0.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}