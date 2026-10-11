import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProducts } from '@/lib/sheets';
import { ProductDetail } from '@/components/ProductDetail';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const products = await fetchProducts();
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return { title: 'Produk Tidak Ditemukan' };
  }

  return {
    title: `${product.namaProduk} - ${formatPrice(product.hargaJualRekomendasi)}`,
    description: `${product.namaProduk} dari kategori ${product.kategori}. Harga: ${formatPrice(product.hargaJualRekomendasi)}. Beli sekarang di Toko Iboek!`,
    openGraph: {
      title: product.namaProduk,
      description: `${product.kategori} - ${formatPrice(product.hargaJualRekomendasi)}`,
      type: 'website',
      images: ['/placeholder-product.svg'],
    },
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const products = await fetchProducts();
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}