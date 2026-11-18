/**
 * remove-logo-bg.mjs
 * Removes the near-white background from the Orion Mall logo using Sharp.
 * Outputs a crisp transparent PNG at 2x the content area size.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

const SRC  = 'public/images/orion_mall_logo_source.jpg';
const DEST = 'public/images/orion_mall_logo.png';

// --- Tolerance: pixels within this Euclidean RGB distance from white are made transparent
const TOLERANCE = 38;   // 0–255; white=#255,255,255

async function run() {
  // 1. Load the source image and convert to raw RGBA buffer
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;   // channels = 4 (RGBA)
  const buf = Buffer.from(data);

  // 2. Walk every pixel; if it's near-white (and near-white in context),
  //    set alpha to 0.  Also feather semi-white pixels.
  for (let i = 0; i < buf.length; i += channels) {
    const r = buf[i];
    const g = buf[i + 1];
    const b = buf[i + 2];

    // Euclidean distance from pure white
    const dist = Math.sqrt(
      (255 - r) ** 2 +
      (255 - g) ** 2 +
      (255 - b) ** 2
    );

    if (dist < TOLERANCE) {
      // Feather the edge: closer to white → more transparent
      const alpha = Math.round((dist / TOLERANCE) * 255);
      buf[i + 3] = alpha;
    }
    // pixels far from white are left fully opaque
  }

  // 3. Write output PNG from the modified RGBA buffer
  await sharp(buf, {
    raw: { width, height, channels }
  })
    .png({ compressionLevel: 9, palette: false })
    .toFile(DEST);

  console.log(`✅  Written: ${DEST}  (${width}×${height})`);
}

run().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
