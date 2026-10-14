#!/usr/bin/env node
// Match Drive filenames to product assets
// Usage: node scripts/match-drive-to-assets.js

const fs = require('fs');
const path = require('path');

const driveCsvPath = path.join(__dirname, '../drive-files.csv');
const sheetCsvPath = path.join(__dirname, '../sheet-raw.csv');
const templatePath = path.join(__dirname, '../image-mapping-template.csv');
const outputPath = path.join(__dirname, '../image-mapping-template-updated.csv');

// Read Drive files
const driveCsv = fs.readFileSync(driveCsvPath, 'utf-8');
const driveLines = driveCsv.trim().split('\n');
const driveFiles = [];
for (let i = 1; i < driveLines.length; i++) {
  const [file_id, name] = driveLines[i].split(',');
  if (file_id && name) {
    driveFiles.push({ file_id, name });
  }
}
console.log(`Loaded ${driveFiles.length} Drive files`);

// Read sheet products
const sheetCsv = fs.readFileSync(sheetCsvPath, 'utf-8');
const sheetLines = sheetCsv.trim().split('\n');
const sheetProducts = [];
function parseCSVLine(line) {
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
}
const sheetHeaders = parseCSVLine(sheetLines[0]);
const assetIndex = sheetHeaders.findIndex(h => h === 'asset');
const namaIndex = sheetHeaders.findIndex(h => h === 'Nama Produk');
const kategoriIndex = sheetHeaders.findIndex(h => h === 'Kategori');

for (let i = 1; i < sheetLines.length; i++) {
  const cols = parseCSVLine(sheetLines[i]);
  const asset = cols[assetIndex]?.trim() || '';
  const nama = cols[namaIndex]?.trim() || '';
  const kategori = cols[kategoriIndex]?.trim() || '';
  if (asset && asset !== 'Tipis' && asset !== 'Aman' && asset !== 'Bahaya') {
    sheetProducts.push({ asset, nama, kategori });
  }
}
console.log(`Loaded ${sheetProducts.length} products with assets`);

// Normalize function for matching
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[-_]\d+$/, '') // Remove trailing -1, -2, _1, _2
    .replace(/[_\s]+/g, '_')
    .replace(/[^\w_]/g, '');
}

// Build Drive lookup by normalized name
const driveByNorm = new Map();
for (const f of driveFiles) {
  const norm = normalize(f.name);
  if (!driveByNorm.has(norm)) {
    driveByNorm.set(norm, []);
  }
  driveByNorm.get(norm).push(f);
}

// Match products to Drive files
const matches = [];
const unmatched = [];

for (const p of sheetProducts) {
  const normAsset = normalize(p.asset);
  
  // Try exact match first
  let found = driveByNorm.get(normAsset);
  
  // Try partial match (asset contains drive name or vice versa)
  if (!found) {
    for (const [driveNorm, files] of driveByNorm) {
      if (normAsset.includes(driveNorm) || driveNorm.includes(normAsset)) {
        found = files;
        break;
      }
    }
  }
  
  if (found && found.length > 0) {
    // Pick the first match (or one without -1/-2 suffix)
    const best = found.find(f => !/[-_]\d+$/.test(f.name)) || found[0];
    matches.push({
      asset: p.asset,
      file_id: best.file_id,
      drive_url: `https://drive.google.com/file/d/${best.file_id}/view?usp=drive_link`,
      drive_name: best.name,
      product: p.nama,
    });
  } else {
    unmatched.push(p);
  }
}

console.log(`\nMatched: ${matches.length}`);
console.log(`Unmatched: ${unmatched.length}`);

// Read existing template
const templateCsv = fs.readFileSync(templatePath, 'utf-8');
const templateLines = templateCsv.trim().split('\n');
const templateHeader = templateLines[0];
const templateMap = new Map();
for (let i = 1; i < templateLines.length; i++) {
  const [asset, file_id, drive_url] = templateLines[i].split(',');
  if (asset) templateMap.set(asset, { file_id, drive_url });
}

// Update with matches
let updatedCount = 0;
for (const m of matches) {
  if (!templateMap.has(m.asset) || !templateMap.get(m.asset).file_id) {
    templateMap.set(m.asset, { file_id: m.file_id, drive_url: m.drive_url });
    updatedCount++;
  }
}

console.log(`Updated ${updatedCount} new mappings`);

// Write updated template
const outputLines = [templateHeader];
for (const [asset, data] of templateMap) {
  outputLines.push(`${asset},${data.file_id || ''},${data.drive_url || ''}`);
}
fs.writeFileSync(outputPath, outputLines.join('\n'));
console.log(`\nSaved to ${outputPath}`);

// Show unmatched for manual review
if (unmatched.length > 0) {
  console.log('\n=== UNMATCHED PRODUCTS (need manual mapping) ===');
  unmatched.slice(0, 30).forEach(p => console.log(`  ${p.asset} | ${p.nama} | ${p.kategori}`));
  if (unmatched.length > 30) console.log(`  ... and ${unmatched.length - 30} more`);
}

// Show matches for verification
console.log('\n=== MATCHED (sample) ===');
matches.slice(0, 20).forEach(m => console.log(`  ${m.asset} -> ${m.drive_name} (${m.file_id})`));