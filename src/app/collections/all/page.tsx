import { Metadata } from 'next';
import Link from 'next/link';
import { fetchProducts } from '@/lib/sheets';
import { ProductGrid } from '@/components/ProductGrid';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Semua Produk',
  description: 'Lihat semua produk Toko Iboek. Ratusan produk berkualitas dengan harga terjangkau. Gratis ongkir, pembayaran aman, pengiriman cepat.',
};

export default async function AllProductsPage() {
  const products = await fetchProducts();

  return (
    <>
      <section className="py-8 lg:py-12 bg-muted border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">Semua Produk</span>
          </nav>
          <h1 className="section-title">Semua Produk</h1>
          <p className="text-gray-600 max-w-2xl">
            {products.length} produk tersedia
          </p>
        </div>
      </section>

      <ProductGrid products={products} />
    </>
  );
}