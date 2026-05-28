import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_URL = 'https://lonestarshedsllc.com/';
const IMAGES_DIR = path.join(__dirname, 'public', 'images', 'real');

async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(path.join(IMAGES_DIR, filename), Buffer.from(buffer));
    console.log(`Downloaded: ${filename}`);
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error.message);
  }
}

async function scrapeImages() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  console.log(`Fetching HTML from ${TARGET_URL}...`);
  try {
    const response = await fetch(TARGET_URL);
    const html = await response.text();

    // Regex to find image URLs
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const backgroundRegex = /url\(['"]?([^'"\)]+)['"]?\)/g;
    
    let matches;
    const imageUrls = new Set();

    while ((matches = imgRegex.exec(html)) !== null) {
      imageUrls.add(matches[1]);
    }

    while ((matches = backgroundRegex.exec(html)) !== null) {
      if(matches[1].match(/\.(jpeg|jpg|png|webp|gif|svg)$/i)) {
        imageUrls.add(matches[1]);
      }
    }

    console.log(`Found ${imageUrls.size} potential image URLs. Downloading...`);

    let count = 1;
    for (let url of imageUrls) {
      // Handle relative URLs
      if (url.startsWith('/')) {
        url = new URL(url, TARGET_URL).href;
      } else if (!url.startsWith('http')) {
        url = new URL(url, TARGET_URL).href;
      }

      const ext = path.extname(new URL(url).pathname) || '.jpg';
      const cleanExt = ext.split('?')[0];
      const filename = `scraped-${count}${cleanExt}`;

      await downloadImage(url, filename);
      count++;
    }

    console.log('Finished downloading images.');
  } catch (err) {
    console.error('Error scraping:', err);
  }
}

scrapeImages();
