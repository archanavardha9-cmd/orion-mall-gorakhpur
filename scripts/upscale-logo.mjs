/**
 * upscale-logo.mjs – upscale the transparent PNG to 2× for HiDPI sharpness
 */
import sharp from 'sharp';

const SRC  = 'public/images/orion_mall_logo.png';
const DEST = 'public/images/orion_mall_logo.png';  // overwrite in-place

async function run() {
  const meta = await sharp(SRC).metadata();
  const W2 = meta.width  * 2;
  const H2 = meta.height * 2;

  await sharp(SRC)
    .resize(W2, H2, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(DEST + '.tmp.png');

  // Replace original with upscaled
  const { renameSync } = await import('fs');
  renameSync(DEST + '.tmp.png', DEST);

  console.log(`✅  Upscaled to ${W2}×${H2} and saved: ${DEST}`);
}

run().catch(e => { console.error(e.message); process.exit(1); });
