'use client';

import { Component, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ProductErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ProductErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="container py-16 lg:py-24 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-500">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Terjadi Kesalahan</h1>
            <p className="text-gray-600 mb-6">
              Maaf, tidak dapat memuat halaman produk ini. Produk mungkin tidak ditemukan atau terjadi kesalahan sistem.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/collections/all" className="btn btn-primary">
                Lihat Semua Produk
              </Link>
              <Link href="/" className="btn btn-secondary">
                Kembali ke Beranda
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left p-4 bg-gray-100 rounded-lg text-sm">
                <summary className="font-medium cursor-pointer mb-2">Detail Error (Development)</summary>
                <pre className="whitespace-pre-wrap text-red-600">{this.state.error.message}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}