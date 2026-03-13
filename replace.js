import fs from 'fs';
import path from 'path';

const FILES = [
  'components/Features.tsx',
  'components/ConfigureBuild.tsx',
  'components/AIQuote.tsx',
  'data/dealerships.ts'
];

// Let's grab the best looking images (jpgs/pngs above certain sizes)
const IMAGES = [
  '/images/real/scraped-19.jpeg',
  '/images/real/scraped-2.png',
  '/images/real/scraped-20.jpeg',
  '/images/real/scraped-21.jpeg',
  '/images/real/scraped-22.jpeg',
  '/images/real/scraped-23.jpeg',
  '/images/real/scraped-24.jpeg',
  '/images/real/scraped-30.jpeg',
  '/images/real/scraped-32.jpeg',
  '/images/real/scraped-4.png',
  '/images/real/scraped-5.png',
  '/images/real/scraped-6.png'
];

for (const file of FILES) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace unsplash urls
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?q=80&w=\d+&auto=format&fit=crop/g, () => {
    return IMAGES[Math.floor(Math.random() * IMAGES.length)];
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Replaced unsplash URLs in ${file}`);
}
