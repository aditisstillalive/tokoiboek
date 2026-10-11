import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

export const metadata: Metadata = {
  title: {
    default: "Toko Iboek - Produk Berkualitas Harga Terjangkau",
    template: "%s | Toko Iboek",
  },
  description: "Menyediakan berbagai produk berkualitas dengan harga terjangkau. Gratis ongkir, pembayaran aman, dan pengiriman cepat ke seluruh Indonesia.",
  keywords: ["toko online", "belanja online", "produk berkualitas", "harga murah", "gratis ongkir"],
  authors: [{ name: "Toko Iboek" }],
  creator: "Toko Iboek",
  publisher: "Toko Iboek",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://tokoiboek.vercel.app",
    siteName: "Toko Iboek",
    title: "Toko Iboek - Produk Berkualitas Harga Terjangkau",
    description: "Menyediakan berbagai produk berkualitas dengan harga terjangkau. Gratis ongkir, pembayaran aman, dan pengiriman cepat ke seluruh Indonesia.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Toko Iboek",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toko Iboek - Produk Berkualitas Harga Terjangkau",
    description: "Menyediakan berbagai produk berkualitas dengan harga terjangkau.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://store-assets.jubelio.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}