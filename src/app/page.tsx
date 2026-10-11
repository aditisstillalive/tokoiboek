import { HeroBanner } from '@/components/HeroBanner';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CollectionSection } from '@/components/CollectionSection';
import { ProductGrid } from '@/components/ProductGrid';
import { InstagramFeed } from '@/components/InstagramFeed';
import { fetchCategories, fetchProducts } from '@/lib/sheets';

export const revalidate = 3600;

export default async function Home() {
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
  ]);

  const featuredProducts = products.slice(0, 8);
  const newArrivals = products.slice(0, 4);
  const saleProducts = products.filter(p => p.status === 'Aman').slice(0, 4);

  return (
    <>
      <HeroBanner />
      <FeaturesSection />
      <CollectionSection
        title="Koleksi Kami"
        categories={categories}
        viewAllHref="/collections/all"
      />
      <ProductGrid
        title="Produk Terbaru"
        products={newArrivals}
        viewAllHref="/collections/new-arrival"
      />
      <ProductGrid
        title="Best Seller"
        products={saleProducts}
        viewAllHref="/collections/best-seller"
      />
      <InstagramFeed />
    </>
  );
}