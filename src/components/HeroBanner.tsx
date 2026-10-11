'use client';

import Image from 'next/image';
import Link from 'next/link';

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

const slides: HeroSlide[] = [
  {
    image: '/hero-1.jpg',
    title: 'Gratis Ongkir hingga Rp10.000',
    subtitle: 'Registrasi akun kamu dan dapatkan saldo GoPay, persediaan terbatas!',
    ctaText: 'Belanja Sekarang',
    ctaHref: '/collections/all',
  },
  {
    image: '/hero-2.jpg',
    title: 'Lebih Untung Belanja di Website Resmi',
    subtitle: 'Harga lebih murah dan koleksi lebih lengkap',
    ctaText: 'Lihat Koleksi',
    ctaHref: '/collections/all',
  },
  {
    image: '/hero-3.jpg',
    title: 'Pembayaran Mudah & Aman',
    subtitle: 'Melalui rekber Xendit, pilih cara bayar favoritmu tanpa khawatir',
    ctaText: 'Mulai Belanja',
    ctaHref: '/collections/all',
  },
];

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden" aria-label="Hero banner">
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        {slides.map((slide, index) => (
          <div key={index} className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23f5f5f5' width='1' height='1'/%3E%3C/svg%3E"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="container h-full flex items-center">
              <div className="max-w-2xl text-white animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90 max-w-md">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.ctaHref}
                  className="btn btn-accent text-lg px-8 py-3"
                >
                  {slide.ctaText}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" aria-label="Slide indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-colors"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}