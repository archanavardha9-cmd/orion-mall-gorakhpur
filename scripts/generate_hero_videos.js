import express from 'express';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicVideosDir = path.join(projectRoot, 'public', 'videos');
const tempDir = path.join(projectRoot, 'tmp_videos');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const FFMPEG_PATH = 'C:\\Users\\hp\\.vscode\\extensions\\kilocode.kilo-code-7.8.28-win32-x64\\bin\\ffmpeg.exe';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 3590;

const HERO_VIDEOS = [
  {
    name: 'video_atrium_light',
    duration: 5,
    title: 'Grand Sunlit Atrium & Ascending Architectural Motion (Home Hero)',
    generator: `
      // --- BACKGROUND: Rich Architectural Warmth & Contrast ---
      let bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#f8f1e5');
      bgGrad.addColorStop(0.35, '#eedcc4');
      bgGrad.addColorStop(0.75, '#dec3a3');
      bgGrad.addColorStop(1, '#caa780');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Radial skylight glow overhead
      let domeGlow = ctx.createRadialGradient(w / 2, 0, 40, w / 2, 0, h * 0.95);
      domeGlow.addColorStop(0, 'rgba(255, 248, 230, 0.9)');
      domeGlow.addColorStop(0.4, 'rgba(250, 225, 175, 0.45)');
      domeGlow.addColorStop(0.8, 'rgba(225, 185, 130, 0.15)');
      domeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = domeGlow;
      ctx.fillRect(0, 0, w, h);

      // --- SKYLIGHT TRUSS GEOMETRY: Gliding with visible movement ---
      ctx.strokeStyle = 'rgba(175, 130, 85, 0.45)';
      ctx.lineWidth = 2.5;
      let trussShift = (t * 70) % 160;
      for (let i = -w; i < w * 2; i += 160) {
        ctx.beginPath();
        ctx.moveTo(i + trussShift, 0);
        ctx.lineTo(i + trussShift + 360, h);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i - trussShift + 360, 0);
        ctx.lineTo(i - trussShift, h);
        ctx.stroke();
      }

      // Skylight horizontal structural rings
      for (let r = 0; r < 5; r++) {
        let ry = (h * 0.15) + r * 65;
        ctx.strokeStyle = 'rgba(195, 150, 105, 0.35)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, ry);
        ctx.bezierCurveTo(w * 0.3, ry + 30, w * 0.7, ry + 30, w, ry);
        ctx.stroke();
      }

      // --- ASCENDING ESCALATORS & BEACONS: Clearly Visible Motion & Contrast ---
      const cx = w / 2;
      for (let side of [-1, 1]) {
        let escX = cx + side * 270;

        // Rich Escalator Shaft with warm golden depth
        let shaftGrad = ctx.createLinearGradient(escX, h, escX + side * 140, 0);
        shaftGrad.addColorStop(0, 'rgba(205, 120, 45, 0.65)');
        shaftGrad.addColorStop(0.4, 'rgba(240, 180, 85, 0.5)');
        shaftGrad.addColorStop(0.8, 'rgba(255, 230, 150, 0.35)');
        shaftGrad.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
        ctx.fillStyle = shaftGrad;
        ctx.beginPath();
        ctx.moveTo(escX - 85, h);
        ctx.lineTo(escX + 85, h);
        ctx.lineTo(escX + side * 140 + 60, 0);
        ctx.lineTo(escX + side * 140 - 60, 0);
        ctx.closePath();
        ctx.fill();

        // High-Contrast Ascending Step Plates with dynamic lighting
        const totalSteps = 18;
        for (let step = 0; step < totalSteps; step++) {
          let progress = ((t * 0.95 + step / totalSteps) % 1);
          let sy = h - progress * h;
          let sx = escX + (side * 140) * (1 - progress);
          let stepWidth = 75 + (1 - progress) * 25;

          // Step glowing plate
          ctx.fillStyle = 'rgba(255, 245, 210, 0.85)';
          ctx.fillRect(sx - stepWidth / 2, sy - 2, stepWidth, 4);

          // Step contrast edge
          ctx.strokeStyle = 'rgba(180, 100, 30, 0.9)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(sx - stepWidth / 2, sy);
          ctx.lineTo(sx + stepWidth / 2, sy);
          ctx.stroke();
        }

        // Ascending Luminous Beacon / Glass Elevator Capsule
        let beaconProg = ((t * 0.65 + (side === 1 ? 0.5 : 0)) % 1);
        let by = h - beaconProg * h;
        let bx = escX + (side * 140) * (1 - beaconProg);

        // Glowing outer aura
        let bGrad = ctx.createRadialGradient(bx, by, 6, bx, by, 65);
        bGrad.addColorStop(0, 'rgba(255, 255, 240, 1)');
        bGrad.addColorStop(0.35, 'rgba(245, 175, 65, 0.85)');
        bGrad.addColorStop(0.7, 'rgba(230, 130, 35, 0.35)');
        bGrad.addColorStop(1, 'rgba(230, 130, 35, 0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(bx, by, 65, 0, Math.PI * 2);
        ctx.fill();

        // Solid capsule core
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.beginPath();
        ctx.arc(bx, by, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- VOLUMETRIC SUNLIGHT SHAFTS: Dynamic sweeping across atrium ---
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let b = 0; b < 4; b++) {
        let sweepOffset = Math.sin(t * 1.5 + b * 1.6) * 200;
        let beamX = (w * 0.18) + b * 280 + sweepOffset;
        let sBeam = ctx.createLinearGradient(beamX, 0, beamX + 320, h);
        sBeam.addColorStop(0, 'rgba(255, 240, 195, 0.6)');
        sBeam.addColorStop(0.4, 'rgba(255, 215, 140, 0.35)');
        sBeam.addColorStop(0.8, 'rgba(245, 185, 95, 0.15)');
        sBeam.addColorStop(1, 'rgba(245, 185, 95, 0)');
        ctx.fillStyle = sBeam;
        ctx.beginPath();
        ctx.moveTo(beamX - 140, 0);
        ctx.lineTo(beamX + 180, 0);
        ctx.lineTo(beamX + 420, h);
        ctx.lineTo(beamX + 100, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // --- AMBIENT GOLDEN FLOATING DUST MOTES: Clearly visible rising & swirling ---
      for (let p = 0; p < 65; p++) {
        let px = ((p * 143 + Math.sin(t * 2 + p) * 75) % w);
        let py = h - ((p * 79 + t * 110) % (h + 60));
        let size = 2.5 + (p % 4.5);
        let alpha = 0.45 + Math.sin(t * 3.5 + p) * 0.35;

        let moteGrad = ctx.createRadialGradient(px, py, 1, px, py, size * 2.5);
        moteGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        moteGrad.addColorStop(0.4, 'rgba(245, 180, 65, ' + alpha + ')');
        moteGrad.addColorStop(1, 'rgba(245, 180, 65, 0)');
        ctx.fillStyle = moteGrad;
        ctx.beginPath();
        ctx.arc(px, py, size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_dining_terrace',
    duration: 5,
    title: 'Sunlit Dining Terrace & Dynamic Rising Aroma Steam (Dining Hero)',
    generator: `
      // --- BACKGROUND: Rich Warm Terrace & Amber Dining Glow ---
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#fdf4e2');
      bg.addColorStop(0.35, '#f7dfb8');
      bg.addColorStop(0.7, '#eac38f');
      bg.addColorStop(1, '#d59e5f');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Warm Sunset Terrace Ambient Horizon
      let terraceGlow = ctx.createRadialGradient(w / 2, h * 0.85, 80, w / 2, h * 0.7, w * 0.8);
      terraceGlow.addColorStop(0, 'rgba(255, 185, 60, 0.65)');
      terraceGlow.addColorStop(0.5, 'rgba(235, 135, 45, 0.35)');
      terraceGlow.addColorStop(0.85, 'rgba(195, 85, 25, 0.15)');
      terraceGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = terraceGlow;
      ctx.fillRect(0, 0, w, h);

      // --- SUNLIT TERRACE LIGHT BEAMS ---
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let b = 0; b < 5; b++) {
        let bx = w * 0.08 + b * 270 + Math.sin(t * 1.6 + b * 1.4) * 130;
        let bGrad = ctx.createLinearGradient(bx, 0, bx + 260, h);
        bGrad.addColorStop(0, 'rgba(255, 240, 180, 0.7)');
        bGrad.addColorStop(0.4, 'rgba(255, 205, 120, 0.4)');
        bGrad.addColorStop(0.8, 'rgba(245, 160, 70, 0.18)');
        bGrad.addColorStop(1, 'rgba(245, 160, 70, 0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.moveTo(bx - 90, 0);
        ctx.lineTo(bx + 200, 0);
        ctx.lineTo(bx + 440, h);
        ctx.lineTo(bx + 140, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // --- RISING CULINARY AROMA STEAM: Prominent, Curved & Curled Motion ---
      for (let s = 0; s < 8; s++) {
        let steamX = w * 0.12 + s * 165;
        let speed = 4.2 + (s % 3) * 0.8;

        // Outer soft glow steam
        ctx.strokeStyle = 'rgba(255, 245, 215, 0.55)';
        ctx.lineWidth = 14;
        ctx.beginPath();
        for (let y = h + 60; y >= -40; y -= 18) {
          let progress = (h - y) / h;
          let wave = Math.sin((h - y) * 0.014 - t * speed + s * 1.6) * (40 + progress * 35) +
                     Math.cos((h - y) * 0.007 + t * 2 + s) * 20;
          if (y >= h + 50) ctx.moveTo(steamX + wave, y);
          else ctx.lineTo(steamX + wave, y);
        }
        ctx.stroke();

        // Inner bright white aroma plume
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 6;
        ctx.beginPath();
        for (let y = h + 60; y >= -40; y -= 18) {
          let progress = (h - y) / h;
          let wave = Math.sin((h - y) * 0.014 - t * speed + s * 1.6) * (40 + progress * 35) +
                     Math.cos((h - y) * 0.007 + t * 2 + s) * 20;
          if (y >= h + 50) ctx.moveTo(steamX + wave, y);
          else ctx.lineTo(steamX + wave, y);
        }
        ctx.stroke();
      }

      // --- WARM AMBIENT LIGHT MOTES & RISING SPICE PARTICLES ---
      for (let p = 0; p < 55; p++) {
        let speedY = 110 + (p % 4) * 35;
        let px = ((p * 151 + Math.sin(t * 2.5 + p) * 55) % (w + 40)) - 20;
        let py = h - ((p * 67 + t * speedY) % (h + 90));
        let size = 2.5 + (p % 4);
        let alpha = 0.55 + Math.sin(t * 3 + p) * 0.35;

        let pGrad = ctx.createRadialGradient(px, py, 1, px, py, size * 2.5);
        pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        pGrad.addColorStop(0.35, 'rgba(255, 185, 60, ' + alpha + ')');
        pGrad.addColorStop(1, 'rgba(255, 140, 30, 0)');
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(px, py, size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle dynamic hearth warmth pulse at bottom
      let pulse = 0.25 + Math.sin(t * 2.5) * 0.1;
      let bottomHearth = ctx.createLinearGradient(0, h - 140, 0, h);
      bottomHearth.addColorStop(0, 'rgba(235, 120, 25, 0)');
      bottomHearth.addColorStop(1, 'rgba(235, 120, 25, ' + pulse + ')');
      ctx.fillStyle = bottomHearth;
      ctx.fillRect(0, h - 140, w, 140);
    `
  }
];

let currentVideoIndex = 0;
let chromeProcess = null;
const app = express();
app.use(express.raw({ type: 'video/webm', limit: '100mb' }));

app.get('/', (req, res) => {
  const currentVideo = HERO_VIDEOS[currentVideoIndex];
  if (!currentVideo) {
    res.send('<h1>ALL HERO VIDEOS COMPLETED!</h1><script>document.title="ALL_DONE";</script>');
    return;
  }

  res.send(`
<!DOCTYPE html>
<html>
<head><title>Rendering ${currentVideo.name}</title></head>
<body style="margin:0; background:#000; overflow:hidden;">
<canvas id="c" width="1280" height="720"></canvas>
<script>
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  const w = 1280;
  const h = 720;
  const duration = ${currentVideo.duration};
  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9',
    videoBitsPerSecond: 7500000
  });
  const chunks = [];

  recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
  recorder.onstop = async () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    console.log('Sending WebM for ${currentVideo.name}, size:', blob.size);
    await fetch('/upload?name=${currentVideo.name}', { method: 'POST', body: blob });
    window.location.reload();
  };

  recorder.start();
  let startTime = performance.now();

  function render(now) {
    let t = (now - startTime) / 1000;
    ctx.clearRect(0, 0, w, h);

    // Generator code for ${currentVideo.name}
    ${currentVideo.generator}

    if (t < duration) {
      requestAnimationFrame(render);
    } else {
      recorder.stop();
    }
  }
  requestAnimationFrame(render);
</script>
</body>
</html>
  `);
});

app.post('/upload', (req, res) => {
  const videoName = req.query.name;
  const webmPath = path.join(tempDir, `${videoName}.webm`);
  const finalMp4Path = path.join(publicVideosDir, `${videoName}.mp4`);

  fs.writeFileSync(webmPath, req.body);
  console.log(`[${currentVideoIndex + 1}/${HERO_VIDEOS.length}] Received ${videoName}.webm (${(req.body.length / 1024 / 1024).toFixed(2)} MB)`);

  const ff = spawn(FFMPEG_PATH, [
    '-y',
    '-i', webmPath,
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    finalMp4Path
  ]);

  ff.on('close', (code) => {
    if (code === 0) {
      const stats = fs.statSync(finalMp4Path);
      console.log(`   -> Successfully updated ${finalMp4Path} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    } else {
      console.error(`   -> FFmpeg error for ${videoName}: code ${code}`);
    }

    currentVideoIndex++;
    res.send('OK');

    if (currentVideoIndex >= HERO_VIDEOS.length) {
      console.log('ALL HERO VIDEOS ENHANCED & GENERATED SUCCESSFULLY!');
      setTimeout(() => {
        if (chromeProcess) chromeProcess.kill();
        server.close();
        process.exit(0);
      }, 1500);
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`Hero Video Generator listening on port ${PORT}`);
  console.log(`Generating ${HERO_VIDEOS.length} enhanced hero videos...`);

  chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-gpu',
    `http://localhost:${PORT}`
  ]);
});
