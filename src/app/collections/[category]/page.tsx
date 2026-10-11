import { Metadata } from 'next';
import { fetchCategories, fetchProducts, formatPrice } from '@/lib/sheets';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryCard } from '@/components/CategoryCard';
import { Category } from '@/lib/types';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

function decodeCategoryName(encoded: string): string {
  return decodeURIComponent(encoded).replace(/-/g, ' ');
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = decodeCategoryName(category);
  return {
    title: `${categoryName} - Koleksi Produk`,
    description: `Lihat semua produk dalam kategori ${categoryName} di Toko Iboek. Harga terjangkau, kualitas terjamin.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryName = decodeCategoryName(category);

  const [categories, allProducts] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
  ]);

  const currentCategory = categories.find(
    c => c.name.toLowerCase() === categoryName.toLowerCase()
  );

  const categoryProducts = allProducts.filter(
    p => p.kategori.toLowerCase() === categoryName.toLowerCase()
  );

  const otherCategories = categories.filter(
    c => c.name.toLowerCase() !== categoryName.toLowerCase()
  );

  if (!currentCategory) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Kategori tidak ditemukan</h1>
        <p className="text-gray-600 mb-8">Kategori "{categoryName}" tidak tersedia.</p>
        <Link href="/collections/all" className="btn btn-primary">
          Lihat Semua Koleksi
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="py-8 lg:py-12 bg-muted border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/collections/all" className="hover:text-primary transition-colors">Semua Produk</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">{currentCategory.name}</span>
          </nav>
          <h1 className="section-title">{currentCategory.name}</h1>
          <p className="text-gray-600 max-w-2xl">
            {currentCategory.products.length} produk tersedia dalam kategori ini
          </p>
        </div>
      </section>

      <ProductGrid products={categoryProducts} />

      <section className="py-16 lg:py-24" aria-labelledby="other-categories-heading">
        <div className="container">
          <h2 id="other-categories-heading" className="section-title">Koleksi Lainnya</h2>
          <div className="grid-3" role="list">
            {otherCategories.slice(0, 6).map((cat, index) => (
              <CategoryCard key={cat.name} category={cat} priority={index < 3} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/collections/all" className="btn btn-secondary">
              Lihat Semua Kategori
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}