#!/usr/bin/env node
// List files in Google Drive folder using service account
// Usage: node scripts/list-drive-sa.js

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

async function listDriveFiles() {
  const credentialsPath = path.join(__dirname, '../scripts/drive-service-account.json');
  const driveFolderId = '1n8DG0aJvcAoApx1F6dmJYNVJ3CBec9HT';

  if (!fs.existsSync(credentialsPath)) {
    console.error('Service account key not found at:', credentialsPath);
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  console.log(`Listing files in Drive folder: ${driveFolderId}`);
  let allFiles = [];
  let pageToken = null;

  do {
    try {
      const response = await drive.files.list({
        q: `'${driveFolderId}' in parents and trashed=false`,
        fields: 'nextPageToken, files(id, name, mimeType, size)',
        pageSize: 1000,
        pageToken,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      });

      allFiles = allFiles.concat(response.data.files || []);
      pageToken = response.data.nextPageToken;
    } catch (err) {
      console.error('Error listing files:', err.message);
      if (err.message.includes('File not found') || err.message.includes('404')) {
        console.error('\nFolder not accessible. Share folder with service account:');
        console.error('  pmaas-730@pmaas-497111.iam.gserviceaccount.com');
        console.error('\nOpen: https://drive.google.com/drive/folders/1n8DG0aJvcAoApx1F6dmJYNVJ3CBec9HT');
        console.error('Share → Add the email above → Viewer');
      }
      process.exit(1);
    }
  } while (pageToken);

  console.log(`Found ${allFiles.length} total files`);

  // Filter for images
  const imageFiles = allFiles.filter(f => f.mimeType?.startsWith('image/'));
  console.log(`Found ${imageFiles.length} image files`);

  // Output CSV for matching
  const csvPath = path.join(__dirname, '../drive-files.csv');
  const csvContent = ['file_id,name,mimeType', ...imageFiles.map(f => `${f.id},${f.name},${f.mimeType}`)].join('\n');
  fs.writeFileSync(csvPath, csvContent);
  console.log(`\nSaved to ${csvPath}`);
  console.log('\nFirst 20:');
  imageFiles.slice(0, 20).forEach(f => console.log(`  ${f.id}, ${f.name}`));
}

listDriveFiles().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});