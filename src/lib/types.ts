export interface Product {
  id: string;
  namaProduk: string;
  kategori: string;
  hargaJualRekomendasi: number;
  status: string;
  marginBersih: number;
  asset?: string;
}

export interface Category {
  name: string;
  products: Product[];
  image?: string;
}