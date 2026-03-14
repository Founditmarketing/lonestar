import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://lonestarshedsllc.com/';
const URLS_TO_SCRAPE = [
  'https://lonestarshedsllc.com/',
  'https://lonestarshedsllc.com/inventory/',
  'https://lonestarshedsllc.com/sheds/',
  'https://lonestarshedsllc.com/custom-buildings/',
  'https://lonestarshedsllc.com/gallery/'
];

const IMAGES_DIR = path.join(__dirname, 'public', 'images', 'real');

async function downloadImage(url, filename) {
  try {
    const dest = path.join(IMAGES_DIR, filename);
    if (fs.existsSync(dest)) {
        return; // skip if we already have it
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`Downloaded: ${filename}`);
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error.message);
  }
}

async function scrapeImages() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const allImageUrls = new Set();
  
  for (const url of URLS_TO_SCRAPE) {
      console.log(`Fetching HTML from ${url}...`);
      try {
        const response = await fetch(url);
        if(!response.ok) {
            console.log(`Failed to fetch ${url}. Skipping...`);
            continue;
        }
        const html = await response.text();

        // Regex to find image URLs
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        const backgroundRegex = /url\(['"]?([^'"\)]+)['"]?\)/g;
        const hrefRegex = /href="([^">]+(?:jpg|jpeg|png|webp|gif))"/gi; // Sometimes images are linked
        
        let matches;
        while ((matches = imgRegex.exec(html)) !== null) {
          allImageUrls.add(matches[1]);
        }
        while ((matches = backgroundRegex.exec(html)) !== null) {
          if(matches[1].match(/\.(jpeg|jpg|png|webp|gif|svg)$/i)) {
            allImageUrls.add(matches[1]);
          }
        }
        while ((matches = hrefRegex.exec(html)) !== null) {
          allImageUrls.add(matches[1]);
        }
      } catch (err) {
        console.error(`Error fetching ${url}:`, err);
      }
  }

  console.log(`Found ${allImageUrls.size} potential unique image URLs across pages. Downloading new ones...`);

  // Count existing files to continue numbering
  let count = 34; // We already have 1-33
  
  for (let imgUrl of allImageUrls) {
    // Handle relative URLs
    if (imgUrl.startsWith('/')) {
      imgUrl = new URL(imgUrl, BASE_URL).href;
    } else if (!imgUrl.startsWith('http')) {
      imgUrl = new URL(imgUrl, BASE_URL).href;
    }

    const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
    const cleanExt = ext.split('?')[0];
    
    // ignore small ui elements like icons by looking at URL (heuristic)
    if(imgUrl.includes('logo') || imgUrl.includes('icon') || imgUrl.includes('svg')) continue;

    const filename = `scraped-${count}${cleanExt}`;

    await downloadImage(imgUrl, filename);
    count++;
  }

  console.log('Finished downloading new images.');
}

scrapeImages();
