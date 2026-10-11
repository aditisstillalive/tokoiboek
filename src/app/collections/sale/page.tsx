import { Metadata } from 'next';
import Link from 'next/link';
import { fetchProducts } from '@/lib/sheets';
import { ProductGrid } from '@/components/ProductGrid';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Sale',
  description: 'Produk sale Toko Iboek. Dapatkan diskon menarik pada produk-produk berkualitas dengan harga spesial.',
};

export default async function SalePage() {
  const products = await fetchProducts();
  const saleProducts = products.filter(p => p.marginBersih < 0.1).slice(0, 20);

  return (
    <>
      <section className="py-8 lg:py-12 bg-muted border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/collections/all" className="hover:text-primary transition-colors">Semua Produk</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">Sale</span>
          </nav>
          <h1 className="section-title">Sale</h1>
          <p className="text-gray-600 max-w-2xl">
            Produk dengan harga spesial dan diskon menarik
          </p>
        </div>
      </section>

      <ProductGrid products={saleProducts} />
    </>
  );
}