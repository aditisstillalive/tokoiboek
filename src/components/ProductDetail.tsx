'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/sheets';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specification'>('description');
  const [selectedVariant, setSelectedVariant] = useState<string>('Default');

  // Generate multiple placeholder images with different patterns for demo
  const images = [
    '/product-img-1.svg',
    '/product-img-2.svg',
    '/product-img-3.svg',
    '/product-img-4.svg',
  ];

  const variants = ['Default', 'Kecil', 'Sedang', 'Besar'];

  const handleImageChange = useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  const goToPrev = useCallback(() => {
    setSelectedImage(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setSelectedImage(prev => (prev + 1) % images.length);
  }, [images.length]);

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="container py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
        <span className="mx-2">/</span>
        <Link href="/collections/all" className="hover:text-primary transition-colors">Semua Produk</Link>
        <span className="mx-2">/</span>
        <Link 
          href={`/collections/${product.kategori.toLowerCase().replace(/\s+/g, '-')}`} 
          className="hover:text-primary transition-colors"
        >
          {product.kategori}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-primary font-medium truncate max-w-[200px] block">{product.namaProduk}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image Carousel */}
        <div className="space-y-4">
          {/* Main Image Carousel */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
            <div className="absolute inset-0 bg-white">
              {images.map((img, index) => {
                const isActive = index === selectedImage;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                    aria-hidden={!isActive}
                  >
                    <div className="absolute inset-0 bg-white">
                      <Image
                        src={img}
                        alt={`${product.namaProduk} - Gambar ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23f0f0f0' width='1' height='1'/%3E%3C/svg%3E"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg transition-all duration-300 z-20 group"
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg transition-all duration-300 z-20 group"
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            {/* Status Badge */}
            {product.status === 'Aman' && (
              <span className="absolute top-4 left-4 badge badge-aman z-20">Stok Aman</span>
            )}
            {product.status === 'Tipis' && (
              <span className="absolute top-4 left-4 badge badge-tipis z-20">Stok Tipis</span>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20" aria-label="Image indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedImage
                      ? 'bg-white w-8'
                      : 'bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  aria-current={index === selectedImage ? 'true' : 'false'}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 overflow-x-auto pb-2" role="list" aria-label="Product thumbnails">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shadow-sm ${
                  index === selectedImage
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-transparent hover:border-gray-200'
                }`}
                aria-label={`View image ${index + 1}`}
                aria-current={index === selectedImage ? 'true' : 'false'}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info & Variants */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{product.kategori}</span>
          
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">{product.namaProduk}</h1>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl lg:text-4xl font-bold text-primary">{formatPrice(product.hargaJualRekomendasi)}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-b border-border py-4">
            <span className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              32 terjual
            </span>
            <span className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              Stok: {product.status === 'Aman' ? '125' : 'Terbatas'}
            </span>
          </div>

          {/* Variant Selector */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Varian</label>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Pilih varian">
              {variants.map((variant) => (
                <button
                  key={variant}
                  onClick={() => setSelectedVariant(variant)}
                  role="radio"
                  aria-checked={selectedVariant === variant}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                    selectedVariant === variant
                      ? 'border-primary bg-primary text-white'
                      : 'border-border hover:border-gray-300 bg-white'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="px-4 py-3 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-none focus:outline-none focus:ring-0 bg-transparent"
                  min="1"
                  aria-label="Quantity"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-4 py-3 hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="btn btn-accent w-full py-4 text-lg gap-3 group">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Add to Cart
          </button>

          {/* Buy Now Button */}
          <button className="btn btn-secondary w-full py-4 text-lg gap-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
              <line x1="18" y1="5" x2="18" y2="19"/>
            </svg>
            Beli Sekarang
          </button>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Garansi Resmi
            </span>
            <span className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                <line x1="18" y1="5" x2="18" y2="19"/>
              </svg>
              Pengiriman Cepat
            </span>
            <span className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Pembayaran Aman
            </span>
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <span className="text-sm text-gray-500">Bagikan:</span>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors" aria-label="Share to WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </button>
              <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors" aria-label="Share to Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </button>
              <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors" aria-label="Copy link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description / Specification Tabs */}
      <section className="mt-16 border-t border-border pt-12">
        <div className="flex gap-1 mb-8 border-b border-border" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'description'}
            aria-controls="description-panel"
            id="description-tab"
            onClick={() => setActiveTab('description')}
            className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'description'
                ? 'border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Deskripsi
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'specification'}
            aria-controls="specification-panel"
            id="specification-tab"
            onClick={() => setActiveTab('specification')}
            className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'specification'
                ? 'border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Spesifikasi
          </button>
        </div>

        <div role="tabpanel" id="description-panel" aria-labelledby="description-tab" hidden={activeTab !== 'description'}>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4 leading-relaxed">
              {product.namaProduk} adalah produk berkualitas tinggi dari kategori {product.kategori}. 
              Dirancang dengan standar terbaik untuk memenuhi kebutuhan Anda sehari-hari.
            </p>
            <p className="mb-4 leading-relaxed">
              Harga jual rekomendasi: <strong>{formatPrice(product.hargaJualRekomendasi)}</strong>. 
              Produk ini memiliki margin bersih {Math.round(product.marginBersih * 100)}% dan status stok: <strong>{product.status}</strong>.
            </p>
            <h3 className="font-semibold mb-2">Fitur Utama:</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Bahan berkualitas premium</li>
              <li>Desain modern dan fungsional</li>
              <li>Tahan lama dan nyaman digunakan</li>
              <li>Harga terjangkau dengan kualitas terjamin</li>
            </ul>
            <p className="leading-relaxed">
              Setiap produk melewati kontrol kualitas ketat sebelum dikirimkan ke tangan Anda. 
              Kami berkomitmen memberikan pengalaman berbelanja terbaik dengan produk-produk pilihan.
            </p>
          </div>
        </div>

        <div role="tabpanel" id="specification-panel" aria-labelledby="specification-tab" hidden={activeTab !== 'specification'}>
          <dl className="divide-y divide-border">
            <div className="grid grid-cols-2 gap-4 py-4">
              <dt className="text-gray-500">Nama Produk</dt>
              <dd className="font-medium">{product.namaProduk}</dd>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <dt className="text-gray-500">Kategori</dt>
              <dd className="font-medium">{product.kategori}</dd>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <dt className="text-gray-500">Harga</dt>
              <dd className="font-medium text-primary">{formatPrice(product.hargaJualRekomendasi)}</dd>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <dt className="text-gray-500">Status Stok</dt>
              <dd className="font-medium">
                <span className={product.status === 'Aman' ? 'badge badge-aman' : 'badge badge-tipis'}>
                  {product.status}
                </span>
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <dt className="text-gray-500">Margin Bersih</dt>
              <dd className="font-medium">{Math.round(product.marginBersih * 100)}%</dd>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <dt className="text-gray-500">Ketersediaan</dt>
              <dd className="font-medium">{product.status === 'Aman' ? 'Tersedia (Stok Aman)' : 'Stok Terbatas'}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Related Products */}
      <section className="mt-16" aria-labelledby="related-heading">
        <h2 id="related-heading" className="section-title mb-8">Produk Serupa</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Link key={i} href={`/product/${i}`} className="product-card group block">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/placeholder-product.svg"
                  alt="Produk serupa"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="product-category">Kategori</p>
                <h3 className="product-name">Produk Serupa {i}</h3>
                <p className="product-price">Rp 50.000</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}