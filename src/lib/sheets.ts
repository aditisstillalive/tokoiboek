import { Product, Category } from './types';

const SHEET_ID = '1AFQBtiMzb-ay-DCaHJXGtpI-JFhgTqi8';
const GID = '2058279069';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

function parseCSV(csv: string): string[][] {
  const lines = csv.trim().split('\n');
  return lines.map(line => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  });
}

function parsePrice(value: string): number {
  const cleaned = value.replace(/[^\d.,]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : Math.round(num);
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(CSV_URL, { next: { revalidate: false } });
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${response.statusText}`);
  }
  const csv = await response.text();
  const rows = parseCSV(csv);
  
  if (rows.length < 2) return [];
  
  const headers = rows[0];
  const namaProdukIndex = headers.findIndex(h => h === 'Nama Produk');
  const kategoriIndex = headers.findIndex(h => h === 'Kategori');
  const hargaJualIndex = headers.findIndex(h => h === 'Harga Jual Rekomendasi');
  const statusIndex = headers.findIndex(h => h === 'Status');
  const marginIndex = headers.findIndex(h => h === 'Margin Bersih');
  const assetIndex = headers.findIndex(h => h === 'asset');
  
  const products: Product[] = rows.slice(1).map((row, i) => ({
    id: String(i + 1),
    namaProduk: row[namaProdukIndex]?.trim() || '',
    kategori: row[kategoriIndex]?.trim() || '',
    hargaJualRekomendasi: parsePrice(row[hargaJualIndex] || '0'),
    status: row[statusIndex]?.trim() || '',
    marginBersih: parseFloat(row[marginIndex]?.replace(',', '.') || '0'),
    asset: row[assetIndex]?.trim() || '',
  })).filter(p => p.namaProduk && p.hargaJualRekomendasi > 0);
  
  return products;
}

export async function fetchCategories(): Promise<Category[]> {
  const products = await fetchProducts();
  const categoryMap = new Map<string, Category>();
  
  for (const product of products) {
    if (!categoryMap.has(product.kategori)) {
      categoryMap.set(product.kategori, {
        name: product.kategori,
        products: [],
      });
    }
    categoryMap.get(product.kategori)!.products.push(product);
  }
  
  return Array.from(categoryMap.values());
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}