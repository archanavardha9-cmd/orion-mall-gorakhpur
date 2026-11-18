import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const srcImagesDir = path.join(projectRoot, 'src', 'assets', 'images');
const logosDir = path.join(projectRoot, 'public', 'images', 'logos');
const publicImagesDir = path.join(projectRoot, 'public', 'images');

async function convertJpgs() {
  console.log('--- Converting src/assets/images/*.jpg to WebP ---');
  const files = fs.readdirSync(srcImagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
  let totalOrigBytes = 0;
  let totalWebpBytes = 0;

  for (const file of files) {
    const inputPath = path.join(srcImagesDir, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(srcImagesDir, `${baseName}.webp`);

    const origStats = fs.statSync(inputPath);
    totalOrigBytes += origStats.size;

    await sharp(inputPath)
      .webp({ quality: 84, effort: 5 })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    totalWebpBytes += newStats.size;

    console.log(`Converted: ${file} (${(origStats.size / 1024).toFixed(0)}KB) -> ${baseName}.webp (${(newStats.size / 1024).toFixed(0)}KB) [-${(((origStats.size - newStats.size) / origStats.size) * 100).toFixed(0)}%]`);
  }

  console.log(`\nJPEGs Total: ${(totalOrigBytes / 1024 / 1024).toFixed(2)} MB -> WebP Total: ${(totalWebpBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total savings: -${(((totalOrigBytes - totalWebpBytes) / totalOrigBytes) * 100).toFixed(1)}%`);
}

async function convertPngLogos() {
  console.log('\n--- Converting public/images/logos/*.png to WebP ---');
  const files = fs.readdirSync(logosDir).filter(f => f.endsWith('.png'));

  for (const file of files) {
    const inputPath = path.join(logosDir, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(logosDir, `${baseName}.webp`);

    await sharp(inputPath)
      .webp({ quality: 90, effort: 5, lossless: true })
      .toFile(outputPath);

    console.log(`Converted logo: ${file} -> ${baseName}.webp`);
  }

  // Also convert Orion Mall Logo to WebP
  const mallLogoPng = path.join(publicImagesDir, 'orion_mall_logo.png');
  if (fs.existsSync(mallLogoPng)) {
    const mallLogoWebp = path.join(publicImagesDir, 'orion_mall_logo.webp');
    await sharp(mallLogoPng)
      .webp({ quality: 92, effort: 5, lossless: true })
      .toFile(mallLogoWebp);
    console.log(`Converted orion_mall_logo.png -> orion_mall_logo.webp`);
  }
}

async function run() {
  await convertJpgs();
  await convertPngLogos();
  console.log('\nAll image conversions complete!');
}

run().catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
