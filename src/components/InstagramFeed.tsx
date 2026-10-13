'use client';

import Image from 'next/image';

const instagramImages = Array.from({ length: 12 }, (_, i) => `/instagram-${(i % 6) + 1}.jpg`);

export function InstagramFeed() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="instagram-heading">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="instagram-heading" className="section-title">Ikuti Augie di Instagram</h2>
            <p className="text-gray-600">Tag @augie.id untuk diputar di sini!</p>
          </div>
          <a
            href="https://instagram.com/augie.id"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-sm"
          >
            Lihat di Instagram
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2" role="list">
          {instagramImages.map((image, index) => (
            <article key={index} className="relative aspect-square overflow-hidden rounded-lg group" role="listitem">
              <Image
                src={image}
                alt={`Instagram post ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16.66vw"
                placeholder="blur"
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23f5f5f5' width='1' height='1'/%3E%3C/svg%3E"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="text-white">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}