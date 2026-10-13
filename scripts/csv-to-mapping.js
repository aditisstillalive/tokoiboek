#!/usr/bin/env node
// Convert CSV image mapping to JSON
// Usage: node scripts/csv-to-mapping.js

const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../image-mapping-template.csv');
const outputPath = path.join(__dirname, '../src/lib/image-mapping.ts');

if (!fs.existsSync(csvPath)) {
  console.error('CSV file not found:', csvPath);
  process.exit(1);
}

const csv = fs.readFileSync(csvPath, 'utf-8');
const lines = csv.trim().split('\n');
const headers = lines[0].split(',');

const mapping = {};
let count = 0;

for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(',');
  const asset = cols[0]?.trim();
  const fileId = cols[1]?.trim();
  
  if (asset && fileId) {
    mapping[asset] = fileId;
    count++;
  }
}

const output = `// Image mapping for Google Drive files
// Auto-generated from image-mapping-template.csv
// Run: npm run sync:images

export const imageMapping: Record<string, string> = ${JSON.stringify(mapping, null, 2)};

export const DRIVE_IMAGE_BASE = 'https://drive.google.com/uc?export=view&id=';
export const BLOB_IMAGE_BASE = 'https://blob.vercel-storage.com/products/';

export function getProductImageUrl(asset: string, options?: { width?: number; format?: 'webp' | 'avif' | 'auto' }): string | null {
  const fileId = imageMapping[asset];
  if (!fileId) {
    return null;
  }

  // In production, use Vercel Blob with optimization
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
    const filename = \`\${asset}.jpg\`;
    let url = \`\${BLOB_IMAGE_BASE}\${filename}\`;
    const params = new URLSearchParams();
    if (options?.width) params.set('w', String(options.width));
    if (options?.format && options.format !== 'auto') params.set('f', options.format);
    if (params.toString()) url += \`?\${params.toString()}\`;
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
`;

fs.writeFileSync(outputPath, output);
console.log('Generated ' + outputPath + ' with ' + count + ' mappings');
console.log('Edit image-mapping-template.csv to add more mappings, then run: npm run sync:images');