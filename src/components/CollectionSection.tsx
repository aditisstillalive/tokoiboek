'use client';

import { Category } from '@/lib/types';
import { CategoryCard } from './CategoryCard';

interface CollectionSectionProps {
  title: string;
  categories: Category[];
  viewAllHref?: string;
}

export function CollectionSection({ title, categories, viewAllHref }: CollectionSectionProps) {
  return (
    <section className="py-16 lg:py-24" aria-labelledby={`collection-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 id={`collection-${title.toLowerCase().replace(/\s+/g, '-')}`} className="section-title">
            {title}
          </h2>
          {viewAllHref && (
            <a href={viewAllHref} className="text-sm font-medium text-primary hover:text-primary-hover transition-colors flex items-center gap-1">
              Lihat Semua
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          )}
        </div>
        <div className="grid-3" role="list">
          {categories.map((category, index) => (
            <CategoryCard key={category.name} category={category} priority={index < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}