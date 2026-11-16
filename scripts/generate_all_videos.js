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
const PORT = 3456;

// List of all videos to generate with their canvas render functions
const VIDEO_DEFINITIONS = [
  {
    name: 'video_atrium_light',
    duration: 5,
    title: 'Grand Sunlit Atrium & Ascending Escalator Light',
    generator: `
      // Grand Sunlit Atrium & Ascending Escalator Light
      ctx.fillStyle = '#f8f6f0';
      ctx.fillRect(0, 0, w, h);

      // Soft architectural daylight gradient
      let bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#fcfaf5');
      bgGrad.addColorStop(0.5, '#f4ece1');
      bgGrad.addColorStop(1, '#ebe0d0');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Skylight truss geometry lines
      ctx.strokeStyle = 'rgba(210, 185, 150, 0.28)';
      ctx.lineWidth = 1.5;
      for (let i = -w; i < w * 2; i += 120) {
        ctx.beginPath();
        ctx.moveTo(i + (t * 25) % 120, 0);
        ctx.lineTo(i + (t * 25) % 120 + 300, h);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i - (t * 25) % 120 + 300, 0);
        ctx.lineTo(i - (t * 25) % 120, h);
        ctx.stroke();
      }

      // Symmetrical ascending escalator light beams
      const cx = w / 2;
      ctx.save();
      for (let side = -1; side <= 1; side += 2) {
        let escX = cx + side * 220;
        let gradBeam = ctx.createLinearGradient(escX, h, escX + side * 80, 0);
        gradBeam.addColorStop(0, 'rgba(235, 160, 80, 0.35)');
        gradBeam.addColorStop(0.5, 'rgba(255, 230, 180, 0.25)');
        gradBeam.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
        ctx.fillStyle = gradBeam;
        ctx.beginPath();
        ctx.moveTo(escX - 60, h);
        ctx.lineTo(escX + 60, h);
        ctx.lineTo(escX + side * 100 + 40, 0);
        ctx.lineTo(escX + side * 100 - 40, 0);
        ctx.closePath();
        ctx.fill();

        // Moving escalator step indicators
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 2.5;
        for (let step = 0; step < 14; step++) {
          let progress = ((t * 0.4 + step / 14) % 1);
          let sy = h - progress * h;
          let sx = escX + (side * 100) * (1 - progress);
          ctx.beginPath();
          ctx.moveTo(sx - 45, sy);
          ctx.lineTo(sx + 45, sy);
          ctx.stroke();
        }
      }
      ctx.restore();

      // Soft sunbeams passing across the atrium
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let b = 0; b < 3; b++) {
        let beamX = (w * 0.2) + b * 320 + Math.sin(t * 0.8 + b) * 80;
        let sBeam = ctx.createLinearGradient(beamX, 0, beamX + 240, h);
        sBeam.addColorStop(0, 'rgba(255, 245, 220, 0.3)');
        sBeam.addColorStop(0.5, 'rgba(255, 240, 200, 0.15)');
        sBeam.addColorStop(1, 'rgba(255, 230, 180, 0)');
        ctx.fillStyle = sBeam;
        ctx.beginPath();
        ctx.moveTo(beamX - 100, 0);
        ctx.lineTo(beamX + 180, 0);
        ctx.lineTo(beamX + 380, h);
        ctx.lineTo(beamX + 100, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Ambient warm dust motes
      for (let p = 0; p < 45; p++) {
        let px = ((p * 137.5 + t * 25) % w);
        let py = ((p * 93.1 + Math.sin(t + p) * 40 + t * 15) % h);
        let size = (p % 4) + 1.5;
        let alpha = 0.25 + Math.sin(t * 2 + p) * 0.2;
        ctx.fillStyle = 'rgba(245, 215, 160, ' + alpha + ')';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_floor_promenade',
    duration: 5,
    title: 'Contemporary Rhythmic Architectural Levels',
    generator: `
      // Architectural Levels & Glass Balconies
      let bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#f5f7fa');
      bgGrad.addColorStop(0.5, '#eef2f7');
      bgGrad.addColorStop(1, '#e4ebf2');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Five architectural floor levels with clean glass balustrades
      const levels = 5;
      for (let i = 0; i < levels; i++) {
        let y = (h / (levels + 1)) * (i + 1);
        let wave = Math.sin(t * 0.6 + i * 0.8) * 15;

        // Balcony slab
        let slabGrad = ctx.createLinearGradient(0, y - 8, 0, y + 24);
        slabGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        slabGrad.addColorStop(0.4, 'rgba(225, 232, 240, 0.85)');
        slabGrad.addColorStop(1, 'rgba(195, 205, 218, 0.75)');
        ctx.fillStyle = slabGrad;
        ctx.beginPath();
        ctx.roundRect(40, y + wave, w - 80, 20, 8);
        ctx.fill();

        // Glass railing reflection
        let glassGrad = ctx.createLinearGradient(0, y + wave - 40, 0, y + wave);
        glassGrad.addColorStop(0, 'rgba(215, 235, 250, 0.45)');
        glassGrad.addColorStop(0.7, 'rgba(180, 210, 235, 0.25)');
        glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0.6)');
        ctx.fillStyle = glassGrad;
        ctx.fillRect(45, y + wave - 36, w - 90, 36);

        // Glass highlight line moving horizontally
        let sweepX = ((t * 180 + i * 140) % (w - 100)) + 50;
        let hlGrad = ctx.createLinearGradient(sweepX - 60, 0, sweepX + 60, 0);
        hlGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        hlGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
        hlGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = hlGrad;
        ctx.fillRect(sweepX - 60, y + wave - 36, 120, 36);
      }

      // Vertical glass elevator light pillars
      for (let col of [w * 0.25, w * 0.75]) {
        let pulseY = ((t * 90) % h);
        let liftGrad = ctx.createLinearGradient(col - 20, 0, col + 20, 0);
        liftGrad.addColorStop(0, 'rgba(200, 225, 245, 0)');
        liftGrad.addColorStop(0.5, 'rgba(200, 225, 245, 0.35)');
        liftGrad.addColorStop(1, 'rgba(200, 225, 245, 0)');
        ctx.fillStyle = liftGrad;
        ctx.fillRect(col - 20, 0, 40, h);

        // Elevator carriage light capsule
        let capGrad = ctx.createRadialGradient(col, pulseY, 5, col, pulseY, 50);
        capGrad.addColorStop(0, 'rgba(255, 245, 210, 0.8)');
        capGrad.addColorStop(0.5, 'rgba(235, 200, 140, 0.3)');
        capGrad.addColorStop(1, 'rgba(235, 200, 140, 0)');
        ctx.fillStyle = capGrad;
        ctx.beginPath();
        ctx.arc(col, pulseY, 50, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_brand_boutique',
    duration: 5,
    title: 'Curated Boutique Silk & Lookbook Atelier',
    generator: `
      // Luxury Fashion Atelier - Flowing Silk Ribbons
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#fcf7f3');
      bg.addColorStop(0.5, '#f7eee7');
      bg.addColorStop(1, '#eee1d8');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Gentle floating silk fabric ribbons
      for (let r = 0; r < 4; r++) {
        ctx.save();
        ctx.beginPath();
        let yOffset = h * 0.25 + r * 140;
        ctx.moveTo(0, yOffset);
        for (let x = 0; x <= w; x += 30) {
          let wave = Math.sin(x * 0.003 + t * 1.2 + r * 1.5) * 60 +
                     Math.cos(x * 0.005 - t * 0.8 + r) * 30;
          ctx.lineTo(x, yOffset + wave);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        let silkGrad = ctx.createLinearGradient(0, yOffset - 50, w, yOffset + 150);
        if (r % 2 === 0) {
          silkGrad.addColorStop(0, 'rgba(235, 175, 160, 0.28)');
          silkGrad.addColorStop(0.5, 'rgba(248, 215, 200, 0.38)');
          silkGrad.addColorStop(1, 'rgba(225, 160, 145, 0.15)');
        } else {
          silkGrad.addColorStop(0, 'rgba(215, 185, 210, 0.25)');
          silkGrad.addColorStop(0.5, 'rgba(240, 220, 235, 0.35)');
          silkGrad.addColorStop(1, 'rgba(200, 165, 195, 0.12)');
        }
        ctx.fillStyle = silkGrad;
        ctx.fill();
        ctx.restore();
      }

      // Minimalist hairline wardrobe rack silhouette
      ctx.strokeStyle = 'rgba(195, 155, 130, 0.35)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(w * 0.15, h * 0.35);
      ctx.lineTo(w * 0.85, h * 0.35);
      ctx.stroke();

      // Stylized clothes hangers swaying gently
      for (let i = 0; i < 9; i++) {
        let hx = w * 0.2 + i * (w * 0.65 / 8);
        let sway = Math.sin(t * 1.4 + i * 0.6) * 0.06;
        ctx.save();
        ctx.translate(hx, h * 0.35);
        ctx.rotate(sway);
        ctx.beginPath();
        ctx.arc(0, -12, 10, Math.PI, 0, false);
        ctx.moveTo(0, -2);
        ctx.lineTo(-28, 25);
        ctx.lineTo(28, 25);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      // Warm studio soft bokeh discs
      for (let b = 0; b < 25; b++) {
        let bx = ((b * 163 + t * 18) % w);
        let by = ((b * 87 + Math.sin(t + b) * 35) % h);
        let bGrad = ctx.createRadialGradient(bx, by, 0, bx, by, 40 + (b % 30));
        bGrad.addColorStop(0, 'rgba(255, 240, 225, 0.45)');
        bGrad.addColorStop(1, 'rgba(255, 240, 225, 0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(bx, by, 40 + (b % 30), 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_shopping_active',
    duration: 5,
    title: 'Dynamic Geometric Threads & Activewear Weave',
    generator: `
      // Clean Athletic Threads & Contemporary Weave
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#f2f8f7');
      bg.addColorStop(0.5, '#e6f3f1');
      bg.addColorStop(1, '#d8ece9');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Flowing interwoven warp and weft lines (textile & activewear motif)
      const count = 18;
      ctx.lineWidth = 2.2;
      for (let i = 0; i < count; i++) {
        let progress = i / count;
        let yBase = progress * h;
        let phase = progress * Math.PI * 2;

        ctx.strokeStyle = i % 2 === 0
          ? 'rgba(20, 184, 166, ' + (0.25 + Math.sin(t + i) * 0.15) + ')'
          : 'rgba(56, 189, 248, ' + (0.22 + Math.cos(t + i) * 0.12) + ')';

        ctx.beginPath();
        for (let x = 0; x <= w; x += 20) {
          let wave = Math.sin(x * 0.004 + t * 1.5 + phase) * 45 +
                     Math.cos(x * 0.008 - t + phase) * 20;
          if (x === 0) ctx.moveTo(x, yBase + wave);
          else ctx.lineTo(x, yBase + wave);
        }
        ctx.stroke();
      }

      // Diagonal athletic precision speed vectors
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 1.5;
      for (let d = -w; d < w * 2; d += 90) {
        let dx = d + (t * 60) % 90;
        ctx.beginPath();
        ctx.moveTo(dx, 0);
        ctx.lineTo(dx + 250, h);
        ctx.stroke();
      }

      // Soft mint kinetic energy orbs
      for (let p = 0; p < 20; p++) {
        let px = ((p * 140 + t * 50) % w);
        let py = ((p * 110 + Math.sin(t * 1.8 + p) * 50) % h);
        let rad = ctx.createRadialGradient(px, py, 2, px, py, 25);
        rad.addColorStop(0, 'rgba(45, 212, 191, 0.45)');
        rad.addColorStop(1, 'rgba(45, 212, 191, 0)');
        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(px, py, 25, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_shopping_couture',
    duration: 5,
    title: 'Festive Couture, Handbag Silhouettes & Gemstone Facets',
    generator: `
      // Luxury Ethnic Couture & Jewelry Facets
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#faf4fa');
      bg.addColorStop(0.5, '#f4eaf2');
      bg.addColorStop(1, '#ebdde8');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Shimmering geometric diamond/gemstone facets
      const cx = w * 0.7;
      const cy = h * 0.5;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.15);

      for (let f = 0; f < 8; f++) {
        let angle = (f / 8) * Math.PI * 2;
        let nextAngle = ((f + 1) / 8) * Math.PI * 2;
        let r1 = 180 + Math.sin(t * 2 + f) * 15;
        let r2 = 90;

        let facetGrad = ctx.createLinearGradient(0, 0, Math.cos(angle) * r1, Math.sin(angle) * r1);
        facetGrad.addColorStop(0, 'rgba(216, 180, 254, 0.35)');
        facetGrad.addColorStop(0.5, 'rgba(251, 207, 232, 0.25)');
        facetGrad.addColorStop(1, 'rgba(254, 240, 138, 0.4)');

        ctx.fillStyle = facetGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
        ctx.lineTo(Math.cos(nextAngle) * r1, Math.sin(nextAngle) * r1);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.restore();

      // Soft velvet draped curves on the left
      for (let v = 0; v < 3; v++) {
        ctx.beginPath();
        let vx = w * 0.1 + v * 80;
        ctx.moveTo(vx, 0);
        ctx.bezierCurveTo(vx + 120 + Math.sin(t + v) * 40, h * 0.3,
                          vx - 60 + Math.cos(t + v) * 30, h * 0.7,
                          vx + 80, h);
        ctx.lineTo(0, h);
        ctx.lineTo(0, 0);
        ctx.closePath();
        let vGrad = ctx.createLinearGradient(0, 0, vx + 100, 0);
        vGrad.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
        vGrad.addColorStop(1, 'rgba(236, 72, 153, 0.18)');
        ctx.fillStyle = vGrad;
        ctx.fill();
      }

      // Golden sparkling starlight particles
      for (let s = 0; s < 35; s++) {
        let sx = ((s * 153 + t * 22) % w);
        let sy = ((s * 91 + Math.sin(t * 2 + s) * 30) % h);
        let spark = Math.sin(t * 3 + s) * 0.5 + 0.5;
        ctx.fillStyle = 'rgba(245, 205, 120, ' + (spark * 0.7) + ')';
        ctx.beginPath();
        ctx.arc(sx, sy, 2 + spark * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_dining_terrace',
    duration: 5,
    title: 'Sunlit Dining Terrace & Gentle Aroma Steam',
    generator: `
      // Warm Terrace Dining & Artisanal Aroma Steam
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#fef9ee');
      bg.addColorStop(0.5, '#fbf0dc');
      bg.addColorStop(1, '#f3e2c3');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Warm morning sunbeams shining down into the dining space
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let b = 0; b < 4; b++) {
        let bx = w * 0.15 + b * 280 + Math.sin(t * 0.7 + b) * 60;
        let bGrad = ctx.createLinearGradient(bx, 0, bx + 180, h);
        bGrad.addColorStop(0, 'rgba(255, 235, 175, 0.45)');
        bGrad.addColorStop(0.5, 'rgba(255, 215, 140, 0.2)');
        bGrad.addColorStop(1, 'rgba(255, 190, 100, 0.05)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.moveTo(bx - 60, 0);
        ctx.lineTo(bx + 140, 0);
        ctx.lineTo(bx + 320, h);
        ctx.lineTo(bx + 100, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Gentle rising aroma steam wisps (culinary warmth)
      for (let s = 0; s < 6; s++) {
        let steamX = w * 0.25 + s * 160;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        for (let y = h; y >= h * 0.2; y -= 15) {
          let progress = (h - y) / h;
          let wave = Math.sin(progress * 8 - t * 2.5 + s) * (20 * progress);
          if (y === h) ctx.moveTo(steamX + wave, y);
          else ctx.lineTo(steamX + wave, y);
        }
        ctx.stroke();
      }

      // Elegant minimal porcelain plate & cloche outline
      ctx.strokeStyle = 'rgba(215, 165, 100, 0.32)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(w * 0.75, h * 0.65, 160, 50, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(w * 0.75, h * 0.65, 110, Math.PI, 0, false);
      ctx.stroke();

      // Floating golden culinary warm sparkles
      for (let p = 0; p < 30; p++) {
        let px = ((p * 145 + t * 15) % w);
        let py = (h - ((p * 77 + t * 45) % h));
        let alpha = 0.2 + Math.sin(t * 2 + p) * 0.25;
        ctx.fillStyle = 'rgba(235, 165, 60, ' + alpha + ')';
        ctx.beginPath();
        ctx.arc(px, py, 2.5 + (p % 3), 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_gourmet_flame',
    duration: 5,
    title: 'Gourmet Grill Embers & Appetizing Warmth',
    generator: `
      // Warm Gourmet Flame-Grilled Hearth Ambience (NO text/logos)
      let bg = ctx.createRadialGradient(w / 2, h * 0.7, 50, w / 2, h * 0.5, w * 0.75);
      bg.addColorStop(0, '#5a1d0d');
      bg.addColorStop(0.4, '#381209');
      bg.addColorStop(0.8, '#200a06');
      bg.addColorStop(1, '#120503');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Horizontal flame-grill seared heat waves
      for (let g = 0; g < 7; g++) {
        let gy = h * 0.45 + g * 50;
        let wave = Math.sin(t * 2 + g * 0.7) * 8;
        let grillGrad = ctx.createLinearGradient(0, gy, w, gy);
        grillGrad.addColorStop(0, 'rgba(255, 140, 20, 0.15)');
        grillGrad.addColorStop(0.5, 'rgba(255, 180, 50, 0.45)');
        grillGrad.addColorStop(1, 'rgba(255, 140, 20, 0.15)');
        ctx.fillStyle = grillGrad;
        ctx.fillRect(80, gy + wave, w - 160, 4);
      }

      // Appetizing glowing golden embers floating upwards
      for (let e = 0; e < 50; e++) {
        let ex = ((e * 97 + Math.sin(t * 1.5 + e) * 50) % (w - 100)) + 50;
        let ey = h - ((e * 43 + t * 75) % (h * 0.9));
        let size = 2 + (e % 4);
        let alpha = 0.4 + Math.sin(t * 3 + e) * 0.4;
        let emberGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, size * 2.5);
        emberGrad.addColorStop(0, 'rgba(255, 230, 120, ' + alpha + ')');
        emberGrad.addColorStop(0.4, 'rgba(255, 130, 30, ' + (alpha * 0.8) + ')');
        emberGrad.addColorStop(1, 'rgba(220, 50, 10, 0)');
        ctx.fillStyle = emberGrad;
        ctx.beginPath();
        ctx.arc(ex, ey, size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Soft warm ambient glow at the bottom center
      let hearthGlow = ctx.createRadialGradient(w / 2, h, 10, w / 2, h, h * 0.6);
      hearthGlow.addColorStop(0, 'rgba(255, 160, 30, 0.45)');
      hearthGlow.addColorStop(0.6, 'rgba(220, 60, 10, 0.2)');
      hearthGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = hearthGlow;
      ctx.fillRect(0, 0, w, h);
    `
  },
  {
    name: 'video_stone_oven',
    duration: 5,
    title: 'Artisanal Stone Hearth & Oven-Fresh Warmth',
    generator: `
      // Warm Stone Hearth & Fresh Dough Baking Warmth (NO text/logos)
      let bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 80, w * 0.5, h * 0.5, w * 0.7);
      bg.addColorStop(0, '#fbf4ea');
      bg.addColorStop(0.5, '#f4e5cf');
      bg.addColorStop(0.85, '#e8d2b4');
      bg.addColorStop(1, '#d8bc98');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Circular stone oven hearth glow arch
      const ox = w * 0.5;
      const oy = h * 0.55;
      for (let r = 260; r >= 140; r -= 40) {
        let archGrad = ctx.createRadialGradient(ox, oy, r - 30, ox, oy, r);
        archGrad.addColorStop(0, 'rgba(255, 180, 80, 0.35)');
        archGrad.addColorStop(0.7, 'rgba(230, 130, 40, 0.2)');
        archGrad.addColorStop(1, 'rgba(180, 90, 30, 0)');
        ctx.fillStyle = archGrad;
        ctx.beginPath();
        ctx.arc(ox, oy, r, Math.PI * 0.9, Math.PI * 2.1, false);
        ctx.fill();
      }

      // Floating golden flour motes and fragrant oregano spice particles
      for (let f = 0; f < 45; f++) {
        let fx = ((f * 131 + Math.sin(t + f) * 35 + t * 15) % w);
        let fy = ((f * 89 + Math.cos(t * 0.8 + f) * 30 + t * 20) % h);
        let fSize = 1.8 + (f % 3);
        let fAlpha = 0.3 + Math.sin(t * 2 + f) * 0.25;
        ctx.fillStyle = f % 5 === 0
          ? 'rgba(100, 160, 90, ' + fAlpha + ')' // dried basil/herb green
          : 'rgba(255, 235, 180, ' + fAlpha + ')'; // flour dust
        ctx.beginPath();
        ctx.arc(fx, fy, fSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stone hearth thermal radiant ripples
      for (let rip = 0; rip < 3; rip++) {
        let ripRad = 160 + ((t * 40 + rip * 70) % 220);
        let ripAlpha = (1 - ripRad / 380) * 0.25;
        ctx.strokeStyle = 'rgba(240, 150, 60, ' + ripAlpha + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ox, oy, ripRad, 0, Math.PI * 2);
        ctx.stroke();
      }
    `
  },
  {
    name: 'video_cinema_beam',
    duration: 5,
    title: 'Anamorphic Cinema Laser Projector Beam',
    generator: `
      // Pure Cinematic Laser Projector Beam & Atmospheric Motes
      let bg = ctx.createRadialGradient(w * 0.85, h * 0.2, 50, w * 0.5, h * 0.5, w * 0.8);
      bg.addColorStop(0, '#2d1838');
      bg.addColorStop(0.4, '#1b0d26');
      bg.addColorStop(0.8, '#100618');
      bg.addColorStop(1, '#08020d');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Volumetric diagonal cinema projector beam
      const srcX = w * 0.92;
      const srcY = h * 0.15;
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let b = 0; b < 4; b++) {
        let spread = 280 + b * 110;
        let beamGrad = ctx.createLinearGradient(srcX, srcY, 0, h * 0.85);
        beamGrad.addColorStop(0, 'rgba(255, 235, 170, 0.85)');
        beamGrad.addColorStop(0.3, 'rgba(235, 170, 80, 0.45)');
        beamGrad.addColorStop(0.7, 'rgba(180, 90, 190, 0.25)');
        beamGrad.addColorStop(1, 'rgba(90, 40, 140, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(srcX, srcY);
        ctx.lineTo(0, h * 0.5 - spread / 2 + Math.sin(t + b) * 20);
        ctx.lineTo(0, h * 0.5 + spread / 2 + Math.sin(t + b) * 20);
        ctx.closePath();
        ctx.fill();
      }

      // Lens flare anamorphic horizontal streak
      let streakGrad = ctx.createLinearGradient(srcX - 350, srcY, srcX + 350, srcY);
      streakGrad.addColorStop(0, 'rgba(90, 180, 255, 0)');
      streakGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      streakGrad.addColorStop(1, 'rgba(90, 180, 255, 0)');
      ctx.fillStyle = streakGrad;
      ctx.fillRect(srcX - 350, srcY - 2.5, 700, 5);

      // Intense projector bulb orb
      let bulb = ctx.createRadialGradient(srcX, srcY, 2, srcX, srcY, 80);
      bulb.addColorStop(0, 'rgba(255, 255, 255, 1)');
      bulb.addColorStop(0.2, 'rgba(255, 230, 150, 0.8)');
      bulb.addColorStop(0.6, 'rgba(240, 140, 50, 0.35)');
      bulb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bulb;
      ctx.beginPath();
      ctx.arc(srcX, srcY, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Atmospheric cinema dust particles dancing in the beam
      for (let p = 0; p < 65; p++) {
        let px = ((p * 119 + t * 45) % w);
        let py = ((p * 73 + Math.sin(t * 1.5 + p) * 40) % h);
        let inBeam = (py > px * 0.3 && py < px * 0.9 + 200);
        let alpha = inBeam ? (0.4 + Math.sin(t * 3 + p) * 0.35) : 0.08;
        ctx.fillStyle = inBeam
          ? 'rgba(255, 240, 190, ' + alpha + ')'
          : 'rgba(200, 180, 220, ' + alpha + ')';
        ctx.beginPath();
        ctx.arc(px, py, 1.8 + (p % 3), 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_cinema_popcorn',
    duration: 5,
    title: 'Crimson Red Popping Popcorn Animation',
    generator: `
      // Crimson Red Background with Bursting Popping Popcorn (USER SPECIAL REQUIREMENT)
      let bg = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.7);
      bg.addColorStop(0, '#c7232a');
      bg.addColorStop(0.5, '#a0141b');
      bg.addColorStop(0.85, '#780a0f');
      bg.addColorStop(1, '#500508');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Bursting animated popcorn kernels flying outward toward camera
      const popCount = 55;
      for (let i = 0; i < popCount; i++) {
        // Pseudo-random deterministic trajectory based on index
        let angle = (i * 137.5) * (Math.PI / 180);
        let speed = 120 + (i % 7) * 45;
        let birthDelay = (i % 10) * 0.45;
        let age = (t + 5 - birthDelay) % 4.5; // looping popcorn life

        let dist = speed * Math.pow(age, 1.6);
        let px = w / 2 + Math.cos(angle) * dist;
        let py = h / 2 + Math.sin(angle) * dist + (age * age * 35); // slight gravity drop

        let scale = 0.4 + age * 0.8;
        let rot = age * 3.5 + i;

        if (px >= -80 && px <= w + 80 && py >= -80 && py <= h + 80) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(rot);
          ctx.scale(scale, scale);

          // Popcorn kernel puffy shape (multiple overlapping fluffy lobes)
          let alpha = Math.min(1, age * 3);
          if (age > 3.8) alpha = Math.max(0, (4.5 - age) / 0.7);

          // Golden-buttery roasted base
          ctx.fillStyle = 'rgba(242, 195, 95, ' + (alpha * 0.95) + ')';
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();

          // White fluffy puffy clouds of popcorn
          ctx.fillStyle = 'rgba(255, 253, 245, ' + alpha + ')';
          for (let lobe = 0; lobe < 5; lobe++) {
            let lAngle = (lobe / 5) * Math.PI * 2;
            let lx = Math.cos(lAngle) * 11;
            let ly = Math.sin(lAngle) * 11;
            ctx.beginPath();
            ctx.arc(lx, ly, 10 + (lobe % 3), 0, Math.PI * 2);
            ctx.fill();
          }

          // Warm butter center accent
          ctx.fillStyle = 'rgba(245, 175, 45, ' + (alpha * 0.85) + ')';
          ctx.beginPath();
          ctx.arc(2, 1, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }
    `
  },
  {
    name: 'video_auditorium_lounge',
    duration: 5,
    title: 'Velvet Auditorium Lounge & Ambient Aisle Light',
    generator: `
      // Luxury Auditorium Plush Velvet Serenity
      let bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#260e19');
      bg.addColorStop(0.5, '#180710');
      bg.addColorStop(1, '#0f0309');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Curved rows of plush cinema seats (minimal geometric silhouettes)
      for (let row = 0; row < 4; row++) {
        let ry = h * 0.45 + row * 90;
        let rScale = 0.75 + row * 0.12;

        ctx.strokeStyle = 'rgba(225, 60, 95, ' + (0.2 + row * 0.08) + ')';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(w / 2, ry - 350, 480 * rScale, Math.PI * 0.28, Math.PI * 0.72, false);
        ctx.stroke();

        // Velvet top edge glow
        let seatGrad = ctx.createLinearGradient(0, ry, 0, ry + 25);
        seatGrad.addColorStop(0, 'rgba(215, 45, 80, ' + (0.25 + row * 0.05) + ')');
        seatGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = seatGrad;
        ctx.fillRect(w * 0.1, ry, w * 0.8, 30);
      }

      // Warm amber aisle floor runner lighting
      for (let aisle of [w * 0.22, w * 0.78]) {
        let aisleGrad = ctx.createLinearGradient(aisle - 15, 0, aisle + 15, 0);
        aisleGrad.addColorStop(0, 'rgba(255, 180, 50, 0)');
        aisleGrad.addColorStop(0.5, 'rgba(255, 180, 50, 0.4)');
        aisleGrad.addColorStop(1, 'rgba(255, 180, 50, 0)');
        ctx.fillStyle = aisleGrad;
        ctx.fillRect(aisle - 15, h * 0.4, 30, h * 0.6);

        // Aisle step lights pulsing softly
        for (let s = 0; s < 6; s++) {
          let sy = h * 0.45 + s * 55;
          let pulse = Math.sin(t * 2 + s * 0.8) * 0.3 + 0.7;
          ctx.fillStyle = 'rgba(255, 215, 120, ' + pulse + ')';
          ctx.beginPath();
          ctx.arc(aisle, sy, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    `
  },
  {
    name: 'video_explore_spatial',
    duration: 5,
    title: 'Spatial 3D Isometric Mall Grid & Architectural Skylight',
    generator: `
      // Clean Spatial 3D Walkthrough Grid & Geometric Skylight Dome
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#f2f8fa');
      bg.addColorStop(0.5, '#e4f1f4');
      bg.addColorStop(1, '#d5e7ec');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Perspective floor grid moving forward smoothly
      const horizonY = h * 0.42;
      const vpX = w / 2;

      // Radial perspective guide rays
      ctx.strokeStyle = 'rgba(13, 148, 136, 0.25)';
      ctx.lineWidth = 1.2;
      for (let x = -w * 0.5; x <= w * 1.5; x += 80) {
        ctx.beginPath();
        ctx.moveTo(vpX, horizonY);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Transverse horizontal grid lines moving toward camera
      for (let z = 1; z <= 12; z++) {
        let p = ((t * 0.35 + z / 12) % 1);
        let y = horizonY + Math.pow(p, 2.2) * (h - horizonY);
        let alpha = p * 0.45;
        ctx.strokeStyle = 'rgba(13, 148, 136, ' + alpha + ')';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Soaring geodesic dome skylight above the horizon
      ctx.save();
      ctx.strokeStyle = 'rgba(215, 170, 95, 0.35)';
      ctx.lineWidth = 1.5;
      for (let arc = 80; arc <= 360; arc += 70) {
        ctx.beginPath();
        ctx.ellipse(vpX, horizonY, arc, arc * 0.65, 0, Math.PI, 0, false);
        ctx.stroke();
      }
      for (let ray = 0; ray < 9; ray++) {
        let angle = Math.PI + (ray / 8) * Math.PI;
        ctx.beginPath();
        ctx.moveTo(vpX, horizonY);
        ctx.lineTo(vpX + Math.cos(angle) * 360, horizonY + Math.sin(angle) * 230);
        ctx.stroke();
      }
      ctx.restore();

      // Soft spatial node pulses
      for (let n = 0; n < 15; n++) {
        let nx = ((n * 167 + t * 30) % w);
        let ny = horizonY + ((n * 73 + t * 45) % (h - horizonY));
        let nSize = 3 + (n % 4);
        ctx.fillStyle = 'rgba(20, 184, 166, 0.6)';
        ctx.beginPath();
        ctx.arc(nx, ny, nSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(20, 184, 166, 0.3)';
        ctx.beginPath();
        ctx.arc(nx, ny, nSize * 2.5, 0, Math.PI * 2);
        ctx.stroke();
      }
    `
  },
  {
    name: 'video_transit_vista',
    duration: 5,
    title: 'Clean Minimalist Transit Vectors & Approach Boulevard',
    generator: `
      // Clean Arrival Boulevard & Smooth Transit Vectors
      let bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#f4f8fb');
      bg.addColorStop(0.45, '#e9f0f6');
      bg.addColorStop(1, '#dde6ef');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Smooth flowing light vectors (boulevard transit flow)
      const vpY = h * 0.38;
      const vpX = w * 0.5;

      // Central approach avenue perspective
      let roadGrad = ctx.createLinearGradient(0, vpY, 0, h);
      roadGrad.addColorStop(0, 'rgba(220, 230, 240, 0.4)');
      roadGrad.addColorStop(1, 'rgba(195, 210, 228, 0.75)');
      ctx.fillStyle = roadGrad;
      ctx.beginPath();
      ctx.moveTo(vpX - 40, vpY);
      ctx.lineTo(vpX + 40, vpY);
      ctx.lineTo(w * 0.85, h);
      ctx.lineTo(w * 0.15, h);
      ctx.closePath();
      ctx.fill();

      // Flowing luminous transit lane stripes
      for (let side of [-1, 1]) {
        for (let l = 0; l < 8; l++) {
          let p = ((t * 0.45 + l / 8) % 1);
          let y1 = vpY + Math.pow(p, 2) * (h - vpY);
          let y2 = vpY + Math.pow(Math.min(1, p + 0.08), 2) * (h - vpY);
          let x1 = vpX + side * (50 + p * (w * 0.3));
          let x2 = vpX + side * (50 + (p + 0.08) * (w * 0.3));

          ctx.strokeStyle = side === 1
            ? 'rgba(245, 160, 60, ' + (p * 0.75) + ')'
            : 'rgba(56, 189, 248, ' + (p * 0.75) + ')';
          ctx.lineWidth = 3.5 * p + 1;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // Clean roadside architectural light posts
      for (let p = 0; p < 6; p++) {
        let prog = ((t * 0.3 + p / 6) % 1);
        let py = vpY + Math.pow(prog, 1.8) * (h - vpY);
        let pxLeft = vpX - (70 + prog * (w * 0.35));
        let pxRight = vpX + (70 + prog * (w * 0.35));
        let hPost = 50 * prog;

        ctx.strokeStyle = 'rgba(180, 195, 215, ' + (prog * 0.7) + ')';
        ctx.lineWidth = 2 * prog + 1;
        ctx.beginPath();
        ctx.moveTo(pxLeft, py);
        ctx.lineTo(pxLeft, py - hPost);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pxRight, py);
        ctx.lineTo(pxRight, py - hPost);
        ctx.stroke();
      }
    `
  },
  {
    name: 'video_facilities_lobby',
    duration: 5,
    title: 'Serene Minimalist Visitor Lobby & Glass Pavilion',
    generator: `
      // Bright Pristine Interior Lobby & Natural Sunlight
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#fdfdfd');
      bg.addColorStop(0.5, '#f5f7fa');
      bg.addColorStop(1, '#eaf0f6');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Floor-to-ceiling glass window mullions with daylight
      ctx.strokeStyle = 'rgba(200, 215, 230, 0.45)';
      ctx.lineWidth = 2;
      for (let x = 60; x < w; x += 160) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h * 0.75);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, h * 0.75);
      ctx.lineTo(w, h * 0.75);
      ctx.stroke();

      // Polished reflective limestone floor reflection
      let floorGrad = ctx.createLinearGradient(0, h * 0.75, 0, h);
      floorGrad.addColorStop(0, 'rgba(240, 244, 250, 0.9)');
      floorGrad.addColorStop(1, 'rgba(215, 225, 238, 0.8)');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, h * 0.75, w, h * 0.25);

      // Shifting tranquil diagonal daylight panels on the floor
      for (let d = 0; d < 4; d++) {
        let dx = w * 0.15 + d * 280 + Math.sin(t * 0.5 + d) * 40;
        let dayGrad = ctx.createLinearGradient(dx, h * 0.75, dx + 120, h);
        dayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        dayGrad.addColorStop(1, 'rgba(255, 250, 235, 0.1)');
        ctx.fillStyle = dayGrad;
        ctx.beginPath();
        ctx.moveTo(dx, h * 0.75);
        ctx.lineTo(dx + 90, h * 0.75);
        ctx.lineTo(dx + 180, h);
        ctx.lineTo(dx + 70, h);
        ctx.closePath();
        ctx.fill();
      }

      // Minimalist ornamental foliage branch silhouette in corner
      ctx.save();
      ctx.strokeStyle = 'rgba(160, 185, 175, 0.35)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(w * 0.08, h);
      ctx.quadraticCurveTo(w * 0.09, h * 0.65, w * 0.16, h * 0.52);
      ctx.stroke();
      for (let leaf = 0; leaf < 7; leaf++) {
        let lx = w * 0.09 + leaf * 10;
        let ly = h * 0.85 - leaf * 38;
        let sway = Math.sin(t * 1.2 + leaf) * 5;
        ctx.fillStyle = 'rgba(180, 205, 195, 0.38)';
        ctx.beginPath();
        ctx.ellipse(lx + sway, ly, 18, 8, Math.PI * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    `
  }
];

const app = express();
app.use(express.raw({ type: 'video/webm', limit: '150mb' }));

let currentVideoIndex = 0;
let chromeProcess = null;

app.get('/', (req, res) => {
  const currentVideo = VIDEO_DEFINITIONS[currentVideoIndex];
  if (!currentVideo) {
    res.send('<h1>ALL VIDEOS COMPLETED!</h1><script>document.title="ALL_DONE";</script>');
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
    videoBitsPerSecond: 6000000
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
  console.log(`[${currentVideoIndex + 1}/${VIDEO_DEFINITIONS.length}] Received ${videoName}.webm (${(req.body.length / 1024 / 1024).toFixed(2)} MB)`);

  const ff = spawn(FFMPEG_PATH, [
    '-y',
    '-i', webmPath,
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    finalMp4Path
  ]);

  ff.on('close', (code) => {
    if (code === 0) {
      const stats = fs.statSync(finalMp4Path);
      console.log(`   -> Successfully created ${finalMp4Path} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    } else {
      console.error(`   -> FFmpeg error for ${videoName}: code ${code}`);
    }

    currentVideoIndex++;
    res.send('OK');

    if (currentVideoIndex >= VIDEO_DEFINITIONS.length) {
      console.log('ALL VIDEOS GENERATED SUCCESSFULLY!');
      setTimeout(() => {
        if (chromeProcess) chromeProcess.kill();
        server.close();
        process.exit(0);
      }, 1500);
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`Master Video Generator listening on port ${PORT}`);
  console.log(`Generating ${VIDEO_DEFINITIONS.length} premium background videos...`);

  chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-gpu',
    `http://localhost:${PORT}`
  ]);
});
