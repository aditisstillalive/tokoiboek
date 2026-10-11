import { Metadata } from 'next';
import Link from 'next/link';
import { fetchProducts } from '@/lib/sheets';
import { ProductGrid } from '@/components/ProductGrid';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Best Seller',
  description: 'Produk best seller Toko Iboek. Produk-produk paling laris dan diminati pelanggan dengan kualitas terjamin.',
};

export default async function BestSellerPage() {
  const products = await fetchProducts();
  const bestSellers = products.filter(p => p.status === 'Aman').slice(0, 20);

  return (
    <>
      <section className="py-8 lg:py-12 bg-muted border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/collections/all" className="hover:text-primary transition-colors">Semua Produk</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">Best Seller</span>
          </nav>
          <h1 className="section-title">Best Seller</h1>
          <p className="text-gray-600 max-w-2xl">
            Produk paling laris dan favorit pelanggan
          </p>
        </div>
      </section>

      <ProductGrid products={bestSellers} />
    </>
  );
}