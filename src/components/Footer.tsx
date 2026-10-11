import Link from 'next/link';

export function Footer() {
  const paymentMethods = [
    { name: 'J&T', icon: '🚚' },
    { name: 'JNE Express', icon: '🚚' },
    { name: 'GoSend', icon: '🛵' },
    { name: 'Grab Express', icon: '🛵' },
    { name: 'COD', icon: '💰' },
  ];

  const footerLinks = {
    Informasi: [
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Kontak', href: '/contact' },
      { label: 'Syarat & Ketentuan', href: '/terms' },
      { label: 'Kebijakan Privasi', href: '/privacy' },
    ],
    Bantuan: [
      { label: 'Cara Belanja', href: '/help/shopping' },
      { label: 'Pengiriman', href: '/help/shipping' },
      { label: 'Pengembalian', href: '/help/returns' },
      { label: 'FAQ', href: '/help/faq' },
    ],
    'Media Sosial': [
      { label: 'Instagram', href: 'https://instagram.com', external: true },
      { label: 'Facebook', href: 'https://facebook.com', external: true },
      { label: 'TikTok', href: 'https://tiktok.com', external: true },
      { label: 'WhatsApp', href: 'https://wa.me', external: true },
    ],
  };

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="Toko Iboek Home">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none" className="text-primary">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-2xl font-bold text-primary">Toko Iboek</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-6">
              Menyediakan produk berkualitas dengan harga terjangkau. Kepuasan pelanggan adalah prioritas utama kami.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 8.5c0 2.5-2 4.5-3.5 4.5s-3.5-2-3.5-4.5S12 4 13.5 4s3.5 2 3.5 4.5z"/>
                  <path d="M17.5 17.5c0 1.7-1.3 3-2.5 3s-2.5-1.3-2.5-3S14 14.8 15 14.8s2.5 1.3 2.5 3z"/>
                  <path d="M12 3v7M12 14v7M4.5 17.5c0 1.7 1.3 3 2.5 3s2.5-1.3 2.5-3S8.5 14.8 7.5 14.8s-2.5 1.3-2.5 3z"/>
                </svg>
              </a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Informasi</h3>
            <nav className="space-y-3">
              {footerLinks.Informasi.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-600 hover:text-primary transition-colors block">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Bantuan</h3>
            <nav className="space-y-3">
              {footerLinks.Bantuan.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-600 hover:text-primary transition-colors block">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Media Sosial</h3>
            <nav className="space-y-3">
              {footerLinks['Media Sosial'].map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-primary transition-colors block">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Metode Pembayaran</h4>
              <p className="text-sm text-gray-600 mb-4">Melalui rekber Xendit, kamu bisa pilih cara bayar yang kamu suka tanpa perlu khawatir</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white border border-border rounded text-sm font-medium">Virtual Account</span>
                <span className="px-3 py-1 bg-white border border-border rounded text-sm font-medium">E-Wallet</span>
                <span className="px-3 py-1 bg-white border border-border rounded text-sm font-medium">Credit Card</span>
                <span className="px-3 py-1 bg-white border border-border rounded text-sm font-medium">Convenience Store</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Ekspedisi</h4>
              <div className="flex flex-wrap items-center gap-4">
                {paymentMethods.map((method) => (
                  <div key={method.name} className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-lg text-sm font-medium">
                    <span>{method.icon}</span>
                    {method.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Toko Iboek. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Powered by Toko Iboek
          </p>
        </div>
      </div>
    </footer>
  );
}