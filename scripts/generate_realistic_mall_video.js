import express from 'express';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicVideosDir = path.join(projectRoot, 'public', 'videos');
const tempDir = path.join(projectRoot, 'tmp_mall_render');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const FFMPEG_PATH = 'C:\\Users\\hp\\.vscode\\extensions\\kilocode.kilo-code-7.8.28-win32-x64\\bin\\ffmpeg.exe';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 3780;

const app = express();
app.use(express.raw({ type: 'video/webm', limit: '150mb' }));
app.use('/node_modules', express.static(path.join(projectRoot, 'node_modules')));

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Realistic 3D Shopping Mall Video Generator</title>
  <style>
    body { margin: 0; background: #000; overflow: hidden; }
    canvas { width: 1280px; height: 720px; display: block; }
  </style>
</head>
<body>
<canvas id="c" width="1280" height="720"></canvas>

<script type="importmap">
{
  "imports": {
    "three": "/node_modules/three/build/three.module.js"
  }
}
</script>

<script type="module">
import * as THREE from 'three';

const canvas = document.getElementById('c');
const w = 1280;
const h = 720;
const duration = 5.0; // 5 seconds smooth travel
const fps = 30;
const totalFrames = duration * fps;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setSize(w, h);
renderer.setPixelRatio(1);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x16101c); // Deep twilight ambient

// Camera
const camera = new THREE.PerspectiveCamera(52, w / h, 0.1, 200);

// Lighting: Elegant architectural lighting
const ambientLight = new THREE.AmbientLight(0xf2e8dd, 0.85);
scene.add(ambientLight);

// Skylight directional light
const sunLight = new THREE.DirectionalLight(0xfff3e3, 1.8);
sunLight.position.set(12, 38, -10);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 100;
sunLight.shadow.camera.left = -25;
sunLight.shadow.camera.right = 25;
sunLight.shadow.camera.top = 40;
sunLight.shadow.camera.bottom = -40;
sunLight.shadow.bias = -0.0005;
scene.add(sunLight);

// Secondary soft fill from atrium opposite side
const fillLight = new THREE.DirectionalLight(0xd8c8b8, 0.7);
fillLight.position.set(-14, 25, 20);
scene.add(fillLight);

// Procedural textures for realistic materials
function createTileTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d');
  
  // Base polished stone
  ctx.fillStyle = '#261e2b';
  ctx.fillRect(0, 0, 512, 512);
  
  // Large floor grid panels
  ctx.strokeStyle = '#3e3245';
  ctx.lineWidth = 4;
  for (let x = 0; x <= 512; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 0); ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y <= 512; y += 128) {
    ctx.beginPath();
    ctx.moveTo(0, y); ctx.lineTo(512, y);
    ctx.stroke();
  }
  
  // Subtle marble vein accents
  ctx.strokeStyle = 'rgba(235, 215, 195, 0.08)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 512, 0);
    ctx.bezierCurveTo(Math.random() * 512, 170, Math.random() * 512, 340, Math.random() * 512, 512);
    ctx.stroke();
  }
  
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 18);
  return tex;
}

function createStorefrontDisplayTexture(brandName, category, themeColor) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  
  // Interior store background
  let bgGrad = ctx.createLinearGradient(0, 0, 0, 256);
  bgGrad.addColorStop(0, '#241a26');
  bgGrad.addColorStop(1, '#18101a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 256);
  
  // Warm boutique interior spotlights
  ctx.fillStyle = 'rgba(255, 225, 175, 0.18)';
  for (let x = 80; x < 512; x += 110) {
    ctx.beginPath();
    ctx.arc(x, 40, 60, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Luxury brand illuminated fascia sign board
  ctx.fillStyle = '#0f0814';
  ctx.fillRect(40, 20, 432, 55);
  ctx.strokeStyle = themeColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 20, 432, 55);
  
  // Brand text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(brandName, 256, 48);
  
  // Boutique window display pedestals and mannequins
  ctx.fillStyle = '#3a2d3d';
  // Central plinth
  ctx.fillRect(206, 170, 100, 70);
  ctx.fillStyle = '#4c3b4f';
  // Side plinths
  ctx.fillRect(80, 190, 80, 50);
  ctx.fillRect(352, 190, 80, 50);
  
  // Stylized apparel mannequin silhouettes
  ctx.fillStyle = '#d5c2ad';
  // Center mannequin
  ctx.beginPath();
  ctx.arc(256, 110, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(248, 124, 16, 50);
  
  // Left display
  ctx.fillStyle = '#e8a87c';
  ctx.beginPath();
  ctx.arc(120, 130, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(114, 142, 12, 50);
  
  // Right display
  ctx.fillStyle = '#85cdca';
  ctx.beginPath();
  ctx.arc(392, 130, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(386, 142, 12, 50);
  
  // Window frame border
  ctx.strokeStyle = 'rgba(215, 180, 140, 0.6)';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 504, 248);
  
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

const floorTex = createTileTexture();

// Materials
const floorMat = new THREE.MeshStandardMaterial({
  color: 0x221a28,
  map: floorTex,
  roughness: 0.18,
  metalness: 0.25
});

const balconySlabMat = new THREE.MeshStandardMaterial({
  color: 0x302436,
  roughness: 0.35,
  metalness: 0.15
});

const fasciaTrimMat = new THREE.MeshStandardMaterial({
  color: 0xd4a366, // Warm architectural brass/gold
  roughness: 0.22,
  metalness: 0.75
});

const ledStripMat = new THREE.MeshBasicMaterial({
  color: 0xffe6b8
});

const glassRailMat = new THREE.MeshPhysicalMaterial({
  color: 0xbed6db,
  transparent: true,
  opacity: 0.42,
  roughness: 0.08,
  metalness: 0.1,
  transmission: 0.6,
  ior: 1.52
});

const columnMat = new THREE.MeshStandardMaterial({
  color: 0x3d3042,
  roughness: 0.25,
  metalness: 0.2
});

const trussMat = new THREE.MeshStandardMaterial({
  color: 0x5a483a,
  roughness: 0.4,
  metalness: 0.65
});

// --- 1. GROUND FLOOR ---
const groundFloorGeo = new THREE.PlaneGeometry(36, 140);
const groundFloor = new THREE.Mesh(groundFloorGeo, floorMat);
groundFloor.rotation.x = -Math.PI / 2;
groundFloor.position.set(0, 0, -20);
groundFloor.receiveShadow = true;
scene.add(groundFloor);

// Ground floor central decorative runway inlay
const runwayGeo = new THREE.PlaneGeometry(10, 140);
const runwayMat = new THREE.MeshStandardMaterial({
  color: 0x1c1422,
  roughness: 0.12,
  metalness: 0.4
});
const runway = new THREE.Mesh(runwayGeo, runwayMat);
runway.rotation.x = -Math.PI / 2;
runway.position.set(0, 0.01, -20);
runway.receiveShadow = true;
scene.add(runway);

// Glowing runway border strips
const borderGeo = new THREE.BoxGeometry(0.12, 0.04, 140);
const borderL = new THREE.Mesh(borderGeo, ledStripMat);
borderL.position.set(-5, 0.02, -20);
scene.add(borderL);
const borderR = new THREE.Mesh(borderGeo, ledStripMat);
borderR.position.set(5, 0.02, -20);
scene.add(borderR);

// --- 2. MULTI-LEVEL GALLERIA BALCONIES (Level 1 & Level 2) ---
const levels = [
  { y: 5.5, label: 'L1' },
  { y: 11.0, label: 'L2' },
  { y: 16.5, label: 'L3' }
];

const mallLength = 120;
const atriumHalfWidth = 8.5; // Central opening between balconies

levels.forEach((lvl, lvlIdx) => {
  // Left & Right Walkway Slabs
  [-1, 1].forEach(side => {
    const slabW = 9.0;
    const slabX = side * (atriumHalfWidth + slabW / 2);
    
    // Main balcony floor slab
    const slabGeo = new THREE.BoxGeometry(slabW, 0.6, mallLength);
    const slab = new THREE.Mesh(slabGeo, balconySlabMat);
    slab.position.set(slabX, lvl.y - 0.3, -20);
    slab.receiveShadow = true;
    scene.add(slab);
    
    // Polished upper walking tile
    const walkTileGeo = new THREE.PlaneGeometry(slabW, mallLength);
    const walkTile = new THREE.Mesh(walkTileGeo, floorMat);
    walkTile.rotation.x = -Math.PI / 2;
    walkTile.position.set(slabX, lvl.y + 0.01, -20);
    walkTile.receiveShadow = true;
    scene.add(walkTile);

    // Architectural curved fascia edge along the central atrium
    const fasciaGeo = new THREE.BoxGeometry(0.25, 0.7, mallLength);
    const fascia = new THREE.Mesh(fasciaGeo, fasciaTrimMat);
    fascia.position.set(side * atriumHalfWidth, lvl.y - 0.3, -20);
    scene.add(fascia);

    // Glowing LED continuous trim under balcony soffit
    const coveLightGeo = new THREE.BoxGeometry(0.18, 0.08, mallLength);
    const coveLight = new THREE.Mesh(coveLightGeo, ledStripMat);
    coveLight.position.set(side * atriumHalfWidth, lvl.y - 0.65, -20);
    scene.add(coveLight);

    // Glass Balustrade (Railings)
    const glassRailGeo = new THREE.BoxGeometry(0.06, 1.1, mallLength);
    const glassRail = new THREE.Mesh(glassRailGeo, glassRailMat);
    glassRail.position.set(side * (atriumHalfWidth - 0.08), lvl.y + 0.55, -20);
    scene.add(glassRail);

    // Brass/Bronze Top Handrail
    const handrailGeo = new THREE.CylinderGeometry(0.06, 0.06, mallLength, 12);
    const handrail = new THREE.Mesh(handrailGeo, fasciaTrimMat);
    handrail.rotation.x = Math.PI / 2;
    handrail.position.set(side * (atriumHalfWidth - 0.08), lvl.y + 1.15, -20);
    scene.add(handrail);

    // Balustrade support stanchions every 4 meters
    for (let z = -75; z <= 35; z += 4) {
      const postGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.1, 8);
      const post = new THREE.Mesh(postGeo, fasciaTrimMat);
      post.position.set(side * (atriumHalfWidth - 0.08), lvl.y + 0.55, z);
      scene.add(post);
    }
  });
});

// --- 3. STOREFRONTS ALONG ALL FLOORS ---
const brands = [
  { name: 'ORION FLAGSHIP', cat: 'Luxury Apparel', color: '#f59e0b' },
  { name: 'MAX FASHION', cat: 'Modern Styles', color: '#3b82f6' },
  { name: 'LEVI’S ATELIER', cat: 'Denim & Craft', color: '#ef4444' },
  { name: 'SEPHORA', cat: 'Beauty & Glow', color: '#ec4899' },
  { name: 'ZARA', cat: 'Contemporary', color: '#10b981' },
  { name: 'APPLE PREMIER', cat: 'Innovation Tech', color: '#8b5cf6' },
  { name: 'PVR INOX VIP', cat: 'Cinema Suite', color: '#f59e0b' },
  { name: 'BARBEQUE CO.', cat: 'Culinary Terrace', color: '#f97316' },
  { name: 'HAMLEYS', cat: 'Wonderland', color: '#e11d48' },
  { name: 'SUNGLASS HUT', cat: 'Eyewear Studio', color: '#06b6d4' }
];

let brandIndex = 0;
const allFloorsY = [0, 5.5, 11.0];

allFloorsY.forEach((floorY, fIdx) => {
  [-1, 1].forEach(side => {
    for (let z = -65; z <= 30; z += 14) {
      const brand = brands[brandIndex % brands.length];
      brandIndex++;

      const storeW = 12.5;
      const storeH = 4.4;
      const storeX = side * (atriumHalfWidth + 8.8);
      
      const storeTex = createStorefrontDisplayTexture(brand.name, brand.cat, brand.color);
      const storeMat = new THREE.MeshStandardMaterial({
        map: storeTex,
        roughness: 0.2,
        metalness: 0.1,
        emissive: new THREE.Color(0xffeacc),
        emissiveIntensity: 0.22
      });

      const storeGeo = new THREE.PlaneGeometry(storeW, storeH);
      const store = new THREE.Mesh(storeGeo, storeMat);
      store.position.set(storeX, floorY + storeH / 2, z);
      store.rotation.y = side === 1 ? -Math.PI / 2 : Math.PI / 2;
      scene.add(store);

      // Warm spot fixture above storefront sign
      const spotLight = new THREE.PointLight(0xffdfb0, 1.2, 10, 2);
      spotLight.position.set(side * (atriumHalfWidth + 6.5), floorY + storeH + 0.2, z);
      scene.add(spotLight);
    }
  });
});

// --- 4. GRAND CENTRAL ESCALATORS (Ground to L1, and L1 to L2) ---
function createEscalator(startX, startY, startZ, endX, endY, endZ) {
  const group = new THREE.Group();
  
  const dx = endX - startX;
  const dy = endY - startY;
  const dz = endZ - startZ;
  const length = Math.sqrt(dy * dy + dz * dz);
  const angle = Math.atan2(dy, -dz);

  // Structural Truss Cladding
  const trussWidth = 2.4;
  const trussGeo = new THREE.BoxGeometry(trussWidth, 0.7, length);
  const truss = new THREE.Mesh(trussGeo, fasciaTrimMat);
  truss.position.set(0, 0, 0);
  truss.rotation.x = -angle;
  group.add(truss);

  // Moving Metal Steps Surface (Grooved step plate)
  const stepsGeo = new THREE.BoxGeometry(trussWidth * 0.75, 0.25, length);
  const stepsMat = new THREE.MeshStandardMaterial({
    color: 0x1e1824,
    roughness: 0.3,
    metalness: 0.8
  });
  const steps = new THREE.Mesh(stepsGeo, stepsMat);
  steps.position.set(0, 0.38, 0);
  steps.rotation.x = -angle;
  group.add(steps);

  // Glass Balustrades on both sides
  [-1, 1].forEach(side => {
    const glassSideGeo = new THREE.BoxGeometry(0.05, 0.95, length);
    const glassSide = new THREE.Mesh(glassSideGeo, glassRailMat);
    glassSide.position.set(side * (trussWidth * 0.45), 0.75, 0);
    glassSide.rotation.x = -angle;
    group.add(glassSide);

    // Black Rubber Handrails
    const railGeo = new THREE.CylinderGeometry(0.06, 0.06, length, 10);
    const railMat = new THREE.MeshStandardMaterial({
      color: 0x141018,
      roughness: 0.6,
      metalness: 0.2
    });
    const rail = new THREE.Mesh(railGeo, railMat);
    rail.position.set(side * (trussWidth * 0.45), 1.25, 0);
    rail.rotation.x = -angle + Math.PI / 2;
    group.add(rail);

    // Glowing LED strip under the glass balustrade
    const underLedGeo = new THREE.BoxGeometry(0.04, 0.04, length);
    const underLed = new THREE.Mesh(underLedGeo, ledStripMat);
    underLed.position.set(side * (trussWidth * 0.45), 0.35, 0);
    underLed.rotation.x = -angle;
    group.add(underLed);
  });

  group.position.set((startX + endX) / 2, (startY + endY) / 2, (startZ + endZ) / 2);
  return group;
}

// Escalator Pair 1: Ground to L1
const esc1 = createEscalator(-2.2, 0, 5, -2.2, 5.5, -9);
scene.add(esc1);
const esc2 = createEscalator(2.2, 0, -9, 2.2, 5.5, 5);
scene.add(esc2);

// Escalator Pair 2: L1 to L2
const esc3 = createEscalator(-2.2, 5.5, -16, -2.2, 11.0, -30);
scene.add(esc3);
const esc4 = createEscalator(2.2, 5.5, -30, 2.2, 11.0, -16);
scene.add(esc4);

// --- 5. MONUMENTAL MARBLE COLUMNS WITH BRASS RINGS ---
for (let z = -65; z <= 35; z += 20) {
  [-1, 1].forEach(side => {
    const colX = side * (atriumHalfWidth - 0.2);
    const colGeo = new THREE.CylinderGeometry(0.55, 0.6, 21, 24);
    const col = new THREE.Mesh(colGeo, columnMat);
    col.position.set(colX, 10.5, z);
    col.castShadow = true;
    col.receiveShadow = true;
    scene.add(col);

    // Brass accent collars at floor intersections
    [0.1, 5.5, 11.0, 16.5].forEach(ringY => {
      const ringGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.22, 24);
      const ring = new THREE.Mesh(ringGeo, fasciaTrimMat);
      ring.position.set(colX, ringY, z);
      scene.add(ring);
    });
  });
}

// --- 6. OVERHEAD ATRIUM SKYLIGHT DOME & STEEL TRUSSES ---
const roofHeight = 20.0;
const numArches = 14;
for (let i = 0; i < numArches; i++) {
  const z = -70 + i * 8.5;
  
  // Curved steel arch rib
  const curve = new THREE.EllipseCurve(
    0, roofHeight - 2,
    atriumHalfWidth + 2.5, 5.5,
    0, Math.PI,
    false, 0
  );
  const points = curve.getPoints(24);
  const archGeo = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, p.y, z)));
  const archLine = new THREE.Line(archGeo, new THREE.LineBasicMaterial({ color: 0xd4a366, linewidth: 2 }));
  scene.add(archLine);

  // Longitudinal steel purlins
  if (i < numArches - 1) {
    [-8, -4, 0, 4, 8].forEach(x => {
      const y = roofHeight + (1 - Math.abs(x) / 10) * 3.5;
      const purlinGeo = new THREE.CylinderGeometry(0.06, 0.06, 8.5, 8);
      const purlin = new THREE.Mesh(purlinGeo, trussMat);
      purlin.rotation.x = Math.PI / 2;
      purlin.position.set(x, y, z + 4.25);
      scene.add(purlin);
    });
  }
}

// Glass Skylight Paneling Glow
const skylightMat = new THREE.MeshBasicMaterial({
  color: 0xffefdb,
  transparent: true,
  opacity: 0.18
});
const skylightPlane = new THREE.PlaneGeometry(atriumHalfWidth * 2.2, mallLength);
const skylightMesh = new THREE.Mesh(skylightPlane, skylightMat);
skylightMesh.rotation.x = Math.PI / 2;
skylightMesh.position.set(0, roofHeight + 3.2, -20);
scene.add(skylightMesh);

// Central Suspended Chandelier / Kinetic Light Installation
const chandelierGroup = new THREE.Group();
for (let r = 0; r < 5; r++) {
  const ringR = 1.2 + r * 0.9;
  const ringGeo = new THREE.TorusGeometry(ringR, 0.06, 8, 36);
  const ringMesh = new THREE.Mesh(ringGeo, ledStripMat);
  ringMesh.rotation.x = Math.PI / 2;
  ringMesh.position.y = -r * 1.1;
  chandelierGroup.add(ringMesh);
}
chandelierGroup.position.set(0, 16.5, -12);
scene.add(chandelierGroup);

// --- 7. ANIMATION & CAMERA FLUID GLIDE ---
// Stream & MediaRecorder
const stream = canvas.captureStream(fps);
const recorder = new MediaRecorder(stream, {
  mimeType: 'video/webm;codecs=vp9',
  videoBitsPerSecond: 12000000
});

const chunks = [];
recorder.ondataavailable = e => {
  if (e.data.size > 0) chunks.push(e.data);
};

recorder.onstop = async () => {
  const blob = new Blob(chunks, { type: 'video/webm' });
  console.log('Sending WebM video, size:', blob.size);
  await fetch('/upload', { method: 'POST', body: blob });
  document.title = "RENDER_COMPLETE";
};

recorder.start();

let currentFrame = 0;

function renderFrame() {
  const progress = currentFrame / totalFrames; // 0.0 to 1.0
  const t = progress * duration;

  // Camera smooth forward glide through the grand central mall
  // Starts elevated at entrance (z=18, y=3.2), smoothly glides forward to z=-22, y=4.4
  // Smooth ease-in-out curve
  const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
  
  const camX = Math.sin(progress * Math.PI * 1.5) * 0.8;
  const camY = 3.2 + easeProgress * 1.4;
  const camZ = 18.0 - easeProgress * 38.0; // Travel 38 meters forward through the mall!
  
  camera.position.set(camX, camY, camZ);
  
  // Camera looks ahead into the atrium perspective
  const targetX = Math.sin(progress * Math.PI) * 0.4;
  const targetY = 3.8 + Math.sin(progress * Math.PI * 0.8) * 0.5;
  const targetZ = camZ - 28.0;
  camera.lookAt(targetX, targetY, targetZ);

  // Subtle chandelier gentle kinetic rotation
  chandelierGroup.rotation.y = t * 0.35;

  renderer.render(scene, camera);

  currentFrame++;
  if (currentFrame < totalFrames) {
    requestAnimationFrame(renderFrame);
  } else {
    recorder.stop();
  }
}

// Start rendering
requestAnimationFrame(renderFrame);
</script>
</body>
</html>
  `);
});

app.post('/upload', (req, res) => {
  const webmPath = path.join(tempDir, 'mall_hero_render.webm');
  const finalMp4Path = path.join(publicVideosDir, 'video_atrium_light.mp4');

  fs.writeFileSync(webmPath, req.body);
  console.log(`Received WebM: ${(req.body.length / 1024 / 1024).toFixed(2)} MB`);

  console.log('Encoding with FFmpeg to high-quality MP4...');
  const ff = spawn(FFMPEG_PATH, [
    '-y',
    '-i', webmPath,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '17',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    finalMp4Path
  ]);

  ff.on('close', (code) => {
    if (code === 0) {
      const stats = fs.statSync(finalMp4Path);
      console.log(`Successfully generated new 3D shopping mall video: ${finalMp4Path} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      res.send('OK');
      setTimeout(() => {
        if (chromeProcess) chromeProcess.kill();
        server.close();
        process.exit(0);
      }, 1000);
    } else {
      console.error('FFmpeg failed with code:', code);
      res.status(500).send('FFmpeg error');
    }
  });
});

let chromeProcess = null;

const server = app.listen(PORT, () => {
  console.log(`Realistic 3D Mall Video Generator listening on port ${PORT}`);
  console.log('Launching headless Chrome to render 3D mall scene...');

  chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-gpu-sandbox',
    '--use-gl=angle',
    `http://localhost:${PORT}`
  ]);
});
