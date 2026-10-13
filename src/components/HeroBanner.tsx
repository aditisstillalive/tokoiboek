'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  accentColor: string;
}

const slides: HeroSlide[] = [
  {
    image: '/hero-1.jpg',
    title: 'Gratis Ongkir hingga Rp10.000',
    subtitle: 'Registrasi akun kamu dan dapatkan saldo GoPay, persediaan terbatas!',
    ctaText: 'Belanja Sekarang',
    ctaHref: '/collections/all',
    accentColor: '#e85d2c',
  },
  {
    image: '/hero-2.jpg',
    title: 'Lebih Untung Belanja di Website Resmi',
    subtitle: 'Harga lebih murah dan koleksi lebih lengkap',
    ctaText: 'Lihat Koleksi',
    ctaHref: '/collections/all',
    accentColor: '#1a1a1a',
  },
  {
    image: '/hero-3.jpg',
    title: 'Pembayaran Mudah & Aman',
    subtitle: 'Melalui rekber Xendit, pilih cara bayar favoritmu tanpa khawatir',
    ctaText: 'Mulai Belanja',
    ctaHref: '/collections/all',
    accentColor: '#e85d2c',
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1);

  const goToSlide = useCallback((index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setDirection(index > currentSlide ? 1 : -1);
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 600);
    }
  }, [currentSlide, isAnimating]);

  const goToNext = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <section className="relative overflow-hidden" aria-label="Hero banner">
      <div className="relative h-[450px] md:h-[550px] lg:h-[650px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentSlide
                ? 'opacity-100 z-10 translate-x-0'
                : index === (currentSlide - direction + slides.length) % slides.length
                ? 'opacity-0 z-0 translate-x-[100%]'
                : 'opacity-0 z-0 -translate-x-[100%]'
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                priority={index === 0}
                placeholder="blur"
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23f0f0f0' width='1' height='1'/%3E%3C/svg%3E"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(232,93,44,0.15)_0%,_transparent_70%)] pointer-events-none" />
            </div>

            <div className="container h-full flex items-center">
              <div className="max-w-2xl text-white animate-slide-up">
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-white/20 backdrop-blur-sm border border-white/30 animate-fade-in" style={{ animationDelay: '100ms' }}>
                  {index === 0 && '🎁 Promo Spesial'}
                  {index === 1 && '✨ Best Price Guarantee'}
                  {index === 2 && '🔒 Secure Payment'}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5 leading-tight animate-slide-up" style={{ animationDelay: '200ms' }}>
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-10 opacity-90 max-w-xl animate-slide-up" style={{ animationDelay: '300ms' }}>
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.ctaHref}
                  className="btn btn-accent text-lg px-10 py-4 animate-slide-up group relative overflow-hidden" style={{ animationDelay: '400ms', backgroundColor: slide.accentColor }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {slide.ctaText}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={goToPrev}
          disabled={isAnimating}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 z-20 group"
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 z-20 group"
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5" aria-label="Slide indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`relative w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ease-out ${
              index === currentSlide
                ? 'bg-white w-20 md:w-24'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          >
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}