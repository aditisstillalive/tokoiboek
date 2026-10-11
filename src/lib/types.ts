export interface Product {
  id: string;
  namaProduk: string;
  kategori: string;
  hargaJualRekomendasi: number;
  status: string;
  marginBersih: number;
}

export interface Category {
  name: string;
  products: Product[];
  image?: string;
}