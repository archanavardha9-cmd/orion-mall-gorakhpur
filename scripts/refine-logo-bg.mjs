/**
 * refine-logo-bg.mjs  – v2
 * Better approach: flood-fill from corners & edges to catch only background white,
 * not any near-white inside the logo symbol itself.
 */
import sharp from 'sharp';

const SRC  = 'public/images/orion_mall_logo_source.jpg';
const DEST = 'public/images/orion_mall_logo.png';

// Tolerance for "is this pixel background white?"
const FLOOD_TOLERANCE = 32;

function colorDist(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2);
}

async function run() {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const buf    = Buffer.from(data);
  const W      = width;
  const H      = height;

  // Seed pixels: all border pixels that are near-white
  const visited = new Uint8Array(W * H);   // 1 = background
  const queue   = [];

  const idx = (x, y) => (y * W + x) * channels;

  function isNearWhite(x, y) {
    const i = idx(x, y);
    return colorDist(buf[i], buf[i+1], buf[i+2], 255, 255, 255) < FLOOD_TOLERANCE;
  }

  function enqueue(x, y) {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const pos = y * W + x;
    if (visited[pos]) return;
    if (!isNearWhite(x, y)) return;
    visited[pos] = 1;
    queue.push([x, y]);
  }

  // Seed from all 4 edges
  for (let x = 0; x < W; x++) { enqueue(x, 0); enqueue(x, H-1); }
  for (let y = 0; y < H; y++) { enqueue(0, y); enqueue(W-1, y); }

  // BFS flood fill
  let head = 0;
  while (head < queue.length) {
    const [x, y] = queue[head++];
    enqueue(x+1, y); enqueue(x-1, y);
    enqueue(x, y+1); enqueue(x, y-1);
  }

  // Set background pixels to transparent, with edge feathering
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const pos = y * W + x;
      if (!visited[pos]) continue;
      const i = idx(x, y);
      const dist = colorDist(buf[i], buf[i+1], buf[i+2], 255, 255, 255);
      // Feather: closer to white = more transparent
      const alpha = Math.round((dist / FLOOD_TOLERANCE) * 180);  // max 180 to avoid fringe
      buf[i + 3] = Math.min(alpha, buf[i+3]);
    }
  }

  // Write PNG
  await sharp(buf, { raw: { width: W, height: H, channels } })
    .png({ compressionLevel: 9 })
    .toFile(DEST);

  console.log(`✅  BFS-refined PNG written: ${DEST}  (${W}×${H})`);
  console.log(`    Background pixels removed: ${visited.reduce((a, v) => a + v, 0)} / ${W*H}`);
}

run().catch(e => { console.error(e.message); process.exit(1); });
