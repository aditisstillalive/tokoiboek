#!/usr/bin/env node
// Generate search index for Fuse.js
// Usage: node scripts/generate-search-index.js

const fs = require('fs');
const path = require('path');
const Fuse = require('fuse.js');

const csvPath = path.join(__dirname, '../sheet-raw.csv');
const outputPath = path.join(__dirname, '../public/search-index.json');

if (!fs.existsSync(csvPath)) {
  console.error('CSV file not found:', csvPath);
  process.exit(1);
}

const csv = fs.readFileSync(csvPath, 'utf-8');
const lines = csv.trim().split('\n');

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

const headers = parseCSVLine(lines[0]);
const namaProdukIndex = headers.findIndex(h => h === 'Nama Produk');
const kategoriIndex = headers.findIndex(h => h === 'Kategori');
const hargaJualIndex = headers.findIndex(h => h === 'Harga Jual Rekomendasi');
const statusIndex = headers.findIndex(h => h === 'Status');
const marginIndex = headers.findIndex(h => h === 'Margin Bersih');
const assetIndex = headers.findIndex(h => h === 'asset');
const imgUrlIndex = headers.findIndex(h => h === 'img_url');

function parsePrice(value) {
  const cleaned = value.replace(/[^\d.,]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : Math.round(num);
}

const products = [];

for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  const namaProduk = cols[namaProdukIndex]?.trim() || '';
  const kategori = cols[kategoriIndex]?.trim() || '';
  const hargaJualRekomendasi = parsePrice(cols[hargaJualIndex] || '0');
  const status = cols[statusIndex]?.trim() || '';
  const marginBersih = parseFloat(cols[marginIndex]?.replace(',', '.') || '0');
  const asset = cols[assetIndex]?.trim() || '';
  const imgUrl = cols[imgUrlIndex]?.trim() || '';

  if (namaProduk && hargaJualRekomendasi > 0) {
    products.push({
      id: String(i),
      namaProduk,
      kategori,
      hargaJualRekomendasi,
      status,
      marginBersih,
      asset,
      imgUrl,
    });
  }
}

// Create Fuse.js index
const fuse = new Fuse(products, {
  keys: ['namaProduk', 'kategori'],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
});

// Save index data (products only - Fuse index is created client-side)
const indexData = {
  products,
  generatedAt: new Date().toISOString(),
  totalProducts: products.length,
};

fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));
console.log(`Generated ${outputPath} with ${products.length} products`);

// Also save just products for client-side search
const productsOnlyPath = path.join(__dirname, '../public/products.json');
fs.writeFileSync(productsOnlyPath, JSON.stringify(products, null, 2));
console.log(`Generated ${productsOnlyPath} with ${products.length} products`);