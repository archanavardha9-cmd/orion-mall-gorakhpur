import fs from 'fs';

// 1. Update src/assets/mediaRegistry.js
const mediaFile = 'src/assets/mediaRegistry.js';
let mediaContent = fs.readFileSync(mediaFile, 'utf8');
const jpgMatches = (mediaContent.match(/\.jpg/g) || []).length;
mediaContent = mediaContent.replace(/\.jpg/g, '.webp');
fs.writeFileSync(mediaFile, mediaContent);
console.log(`Updated ${mediaFile}: replaced ${jpgMatches} .jpg references with .webp`);

// 2. Update src/components/BrandMark.jsx (convert .png logos to .webp)
const brandMarkFile = 'src/components/BrandMark.jsx';
let brandMarkContent = fs.readFileSync(brandMarkFile, 'utf8');
const pngMatches = (brandMarkContent.match(/\.png/g) || []).length;
brandMarkContent = brandMarkContent.replace(/\.png/g, '.webp');
fs.writeFileSync(brandMarkFile, brandMarkContent);
console.log(`Updated ${brandMarkFile}: replaced ${pngMatches} .png references with .webp`);

// 3. Update Header.jsx and Footer.jsx to use orion_mall_logo.webp
for (const file of ['src/components/Header.jsx', 'src/components/Footer.jsx']) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/orion_mall_logo\.png/g, 'orion_mall_logo.webp');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file} to use orion_mall_logo.webp`);
}
