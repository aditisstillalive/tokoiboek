#!/usr/bin/env node
// Sync images from Google Drive to Vercel Blob
// Usage: node scripts/sync-drive-images.js
// Requires: GOOGLE_SERVICE_ACCOUNT_KEY, GOOGLE_DRIVE_FOLDER_ID, BLOB_READ_WRITE_TOKEN

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const { put, del, list } = require('@vercel/blob');

async function syncDriveImages() {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const driveFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (!serviceAccountKey || !driveFolderId || !blobToken) {
    console.error('Missing required environment variables:');
    console.error('  GOOGLE_SERVICE_ACCOUNT_KEY');
    console.error('  GOOGLE_DRIVE_FOLDER_ID');
    console.error('  BLOB_READ_WRITE_TOKEN');
    process.exit(1);
  }

  // Parse service account key
  let credentials;
  try {
    credentials = JSON.parse(serviceAccountKey);
  } catch (e) {
    console.error('Invalid GOOGLE_SERVICE_ACCOUNT_KEY JSON:', e.message);
    process.exit(1);
  }

  // Initialize Google Drive API
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  // List files in the Drive folder
  console.log(`Listing files in Drive folder: ${driveFolderId}`);
  const response = await drive.files.list({
    q: `'${driveFolderId}' in parents and trashed=false`,
    fields: 'files(id, name, mimeType, size)',
    pageSize: 1000,
  });

  const files = response.data.files || [];
  console.log(`Found ${files.length} files in Drive folder`);

  // Filter for images only
  const imageFiles = files.filter(f => f.mimeType?.startsWith('image/'));
  console.log(`Found ${imageFiles.length} image files`);

  // List existing blobs to avoid re-uploading
  console.log('Listing existing Vercel Blob files...');
  const { blobs } = await list({ token: blobToken });
  const existingBlobs = new Map(blobs.map(b => [b.pathname, b.url]));
  console.log(`Found ${existingBlobs.size} existing blobs`);

  // Upload new images
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of imageFiles) {
    const filename = file.name;
    const blobPath = `products/${filename}`;

    if (existingBlobs.has(blobPath)) {
      console.log(`Skipping ${filename} (already exists)`);
      skipped++;
      continue;
    }

    try {
      // Download file from Drive
      const fileResponse = await drive.files.get({
        fileId: file.id,
        alt: 'media',
      }, { responseType: 'arraybuffer' });

      const buffer = Buffer.from(fileResponse.data);

      // Upload to Vercel Blob
      await put(blobPath, buffer, {
        access: 'public',
        token: blobToken,
        addRandomSuffix: false,
      });

      console.log(`Uploaded ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
      uploaded++;
    } catch (error) {
      console.error(`Failed to upload ${filename}:`, error.message);
      failed++;
    }
  }

  console.log('\n--- Sync Summary ---');
  console.log(`Uploaded: ${uploaded}`);
  console.log(`Skipped:  ${skipped}`);
  console.log(`Failed:   ${failed}`);
  console.log(`Total:    ${imageFiles.length}`);

  if (failed > 0) {
    process.exit(1);
  }
}

syncDriveImages().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});