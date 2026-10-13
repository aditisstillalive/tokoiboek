// Image mapping for Google Drive files
// Auto-generated from image-mapping-template.csv
// Run: npm run sync:images

export const imageMapping: Record<string, string> = {
  "bebi_suka-kremesan_hati_ayam_organik_bites": "1MWaIG_3ziMifLCzjeV2GpKHcpDTjJMji"
};

export const DRIVE_IMAGE_BASE = 'https://drive.google.com/uc?export=view&id=';
export const BLOB_IMAGE_BASE = 'https://blob.vercel-storage.com/products/';

export function getProductImageUrl(asset: string, options?: { width?: number; format?: 'webp' | 'avif' | 'auto' }): string | null {
  const fileId = imageMapping[asset];
  if (!fileId) {
    return null;
  }

  // In production, use Vercel Blob with optimization
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
    const filename = `${asset}.jpg`;
    let url = `${BLOB_IMAGE_BASE}${filename}`;
    const params = new URLSearchParams();
    if (options?.width) params.set('w', String(options.width));
    if (options?.format && options.format !== 'auto') params.set('f', options.format);
    if (params.toString()) url += `?${params.toString()}`;
    return url;
  }

  // Development: use direct Google Drive URL
  return DRIVE_IMAGE_BASE + fileId;
}

export function getProductThumbnailUrl(asset: string, width: number = 400): string | null {
  return getProductImageUrl(asset, { width, format: 'webp' });
}

export function getProductFullImageUrl(asset: string, width: number = 1200): string | null {
  return getProductImageUrl(asset, { width, format: 'webp' });
}
