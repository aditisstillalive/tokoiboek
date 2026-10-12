// Image mapping for Google Drive files
// Auto-generated from image-mapping-template.csv
// Run: npm run sync:images

export const imageMapping: Record<string, string> = {
  "bebi_suka-kremesan_hati_ayam_organik_bites": "1MWaIG_3ziMifLCzjeV2GpKHcpDTjJMji"
};

export const DRIVE_IMAGE_BASE = 'https://drive.google.com/uc?export=view&id=';

export function getProductImageUrl(asset: string): string | null {
  const fileId = imageMapping[asset];
  if (fileId) {
    return DRIVE_IMAGE_BASE + fileId;
  }
  return null;
}
