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

// List of all videos to generate with enhanced, clearly noticeable motion
const VIDEO_DEFINITIONS = [
  {
    name: 'video_atrium_light',
    duration: 5,
    title: 'Grand Sunlit Atrium & Ascending Escalator Light',
    generator: `
      // Grand Sunlit Atrium & Ascending Escalator Light - ENHANCED MOTION
      ctx.fillStyle = '#f8f6f0';
      ctx.fillRect(0, 0, w, h);

      let bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#fcfaf5');
      bgGrad.addColorStop(0.5, '#f4ece1');
      bgGrad.addColorStop(1, '#ebe0d0');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Skylight truss geometry with continuous visible gliding
      ctx.strokeStyle = 'rgba(210, 185, 150, 0.35)';
      ctx.lineWidth = 2;
      let trussShift = (t * 55) % 140;
      for (let i = -w; i < w * 2; i += 140) {
        ctx.beginPath();
        ctx.moveTo(i + trussShift, 0);
        ctx.lineTo(i + trussShift + 320, h);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i - trussShift + 320, 0);
        ctx.lineTo(i - trussShift, h);
        ctx.stroke();
      }

      // Symmetrical ascending escalators with CLEARLY VISIBLE upward travel
      const cx = w / 2;
      for (let side of [-1, 1]) {
        let escX = cx + side * 240;
        let gradBeam = ctx.createLinearGradient(escX, h, escX + side * 100, 0);
        gradBeam.addColorStop(0, 'rgba(235, 160, 80, 0.45)');
        gradBeam.addColorStop(0.5, 'rgba(255, 230, 180, 0.35)');
        gradBeam.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        ctx.fillStyle = gradBeam;
        ctx.beginPath();
        ctx.moveTo(escX - 70, h);
        ctx.lineTo(escX + 70, h);
        ctx.lineTo(escX + side * 120 + 50, 0);
        ctx.lineTo(escX + side * 120 - 50, 0);
        ctx.closePath();
        ctx.fill();

        // High-contrast ascending step plates moving smoothly up
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 3.5;
        const totalSteps = 16;
        for (let step = 0; step < totalSteps; step++) {
          let progress = ((t * 0.75 + step / totalSteps) % 1);
          let sy = h - progress * h;
          let sx = escX + (side * 120) * (1 - progress);
          let stepWidth = 60 + (1 - progress) * 20;

          ctx.beginPath();
          ctx.moveTo(sx - stepWidth / 2, sy);
          ctx.lineTo(sx + stepWidth / 2, sy);
          ctx.stroke();

          // Step edge glow
          ctx.fillStyle = 'rgba(255, 240, 190, 0.7)';
          ctx.fillRect(sx - stepWidth / 2, sy - 1.5, stepWidth, 3);
        }

        // Ascending luminous light capsule (elevator/escalator beacon)
        let beaconProg = ((t * 0.5 + (side === 1 ? 0.5 : 0)) % 1);
        let by = h - beaconProg * h;
        let bx = escX + (side * 120) * (1 - beaconProg);
        let bGrad = ctx.createRadialGradient(bx, by, 4, bx, by, 45);
        bGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        bGrad.addColorStop(0.3, 'rgba(245, 185, 95, 0.75)');
        bGrad.addColorStop(1, 'rgba(245, 185, 95, 0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(bx, by, 45, 0, Math.PI * 2);
        ctx.fill();
      }

      // Volumetric sunbeams actively sweeping horizontally across the scene
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let b = 0; b < 3; b++) {
        let sweepOffset = Math.sin(t * 1.2 + b * 1.8) * 160;
        let beamX = (w * 0.25) + b * 300 + sweepOffset;
        let sBeam = ctx.createLinearGradient(beamX, 0, beamX + 260, h);
        sBeam.addColorStop(0, 'rgba(255, 245, 220, 0.45)');
        sBeam.addColorStop(0.5, 'rgba(255, 235, 180, 0.22)');
        sBeam.addColorStop(1, 'rgba(255, 220, 150, 0)');
        ctx.fillStyle = sBeam;
        ctx.beginPath();
        ctx.moveTo(beamX - 120, 0);
        ctx.lineTo(beamX + 160, 0);
        ctx.lineTo(beamX + 360, h);
        ctx.lineTo(beamX + 80, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Ambient golden dust motes visibly drifting upward and spiraling
      for (let p = 0; p < 50; p++) {
        let px = ((p * 127 + Math.sin(t * 1.5 + p) * 60) % w);
        let py = h - ((p * 81 + t * 90) % h);
        let size = 2 + (p % 4);
        let alpha = 0.35 + Math.sin(t * 3 + p) * 0.3;
        ctx.fillStyle = 'rgba(245, 195, 110, ' + alpha + ')';
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
      // Architectural Levels & Glass Balconies - ENHANCED VISIBLE TRAVEL
      let bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#f5f7fa');
      bgGrad.addColorStop(0.5, '#eef2f7');
      bgGrad.addColorStop(1, '#e4ebf2');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Five architectural floor levels
      const levels = 5;
      for (let i = 0; i < levels; i++) {
        let y = (h / (levels + 1)) * (i + 1);

        // Balcony slab
        let slabGrad = ctx.createLinearGradient(0, y - 10, 0, y + 26);
        slabGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        slabGrad.addColorStop(0.4, 'rgba(225, 232, 240, 0.85)');
        slabGrad.addColorStop(1, 'rgba(195, 205, 218, 0.75)');
        ctx.fillStyle = slabGrad;
        ctx.beginPath();
        ctx.roundRect(40, y, w - 80, 22, 8);
        ctx.fill();

        // Glass railing reflection
        let glassGrad = ctx.createLinearGradient(0, y - 42, 0, y);
        glassGrad.addColorStop(0, 'rgba(215, 235, 250, 0.45)');
        glassGrad.addColorStop(0.7, 'rgba(180, 210, 235, 0.25)');
        glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0.6)');
        ctx.fillStyle = glassGrad;
        ctx.fillRect(45, y - 40, w - 90, 40);

        // FAST VISIBLE horizontal light pulse racing across each floor
        let speed = (i % 2 === 0 ? 320 : -280);
        let sweepX = ((t * speed + i * 260) % (w + 200)) - 100;
        if (sweepX < -100) sweepX += (w + 200);

        let hlGrad = ctx.createLinearGradient(sweepX - 100, 0, sweepX + 100, 0);
        hlGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        hlGrad.addColorStop(0.4, 'rgba(255, 240, 190, 0.9)');
        hlGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.95)');
        hlGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = hlGrad;
        ctx.fillRect(sweepX - 100, y - 40, 200, 40);
      }

      // TWO Glass Elevator Capsules moving with PROMINENT vertical travel
      for (let colIdx = 0; colIdx < 2; colIdx++) {
        let colX = colIdx === 0 ? w * 0.28 : w * 0.72;
        let liftY = ((t * 120 + colIdx * 350) % (h * 0.8)) + h * 0.1;
        if (colIdx === 1) liftY = (h * 0.9) - ((t * 110) % (h * 0.8));

        // Vertical elevator track
        ctx.strokeStyle = 'rgba(180, 210, 235, 0.45)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(colX - 25, 0); ctx.lineTo(colX - 25, h);
        ctx.moveTo(colX + 25, 0); ctx.lineTo(colX + 25, h);
        ctx.stroke();

        // Elevator Car Capsule
        let carGrad = ctx.createLinearGradient(colX - 25, liftY - 35, colX + 25, liftY + 35);
        carGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        carGrad.addColorStop(0.5, 'rgba(240, 245, 252, 0.85)');
        carGrad.addColorStop(1, 'rgba(210, 225, 245, 0.9)');
        ctx.fillStyle = carGrad;
        ctx.beginPath();
        ctx.roundRect(colX - 25, liftY - 35, 50, 70, 12);
        ctx.fill();

        ctx.strokeStyle = 'rgba(215, 160, 75, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Glowing interior light radiating from elevator
        let glow = ctx.createRadialGradient(colX, liftY, 5, colX, liftY, 65);
        glow.addColorStop(0, 'rgba(255, 240, 180, 0.9)');
        glow.addColorStop(0.4, 'rgba(245, 180, 70, 0.45)');
        glow.addColorStop(1, 'rgba(245, 180, 70, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(colX, liftY, 65, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_brand_boutique',
    duration: 5,
    title: 'Curated Boutique Silk & Lookbook Atelier',
    generator: `
      // Luxury Fashion Atelier - CLEARLY FLOWING SILK RIBBONS & SWAYING HANGERS
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#fcf7f3');
      bg.addColorStop(0.5, '#f7eee7');
      bg.addColorStop(1, '#eee1d8');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Flowing silk ribbons with CONTINUOUS TRANSLATION across screen
      for (let r = 0; r < 4; r++) {
        ctx.save();
        ctx.beginPath();
        let yBase = h * 0.2 + r * 150;
        let flowShift = t * 180 * (r % 2 === 0 ? 1 : -1);

        ctx.moveTo(0, yBase);
        for (let x = 0; x <= w; x += 25) {
          let wave = Math.sin((x + flowShift) * 0.005 + r * 1.5) * 80 +
                     Math.cos((x - flowShift * 0.5) * 0.008) * 40;
          ctx.lineTo(x, yBase + wave);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        let silkGrad = ctx.createLinearGradient(0, yBase - 60, w, yBase + 160);
        if (r % 2 === 0) {
          silkGrad.addColorStop(0, 'rgba(235, 165, 150, 0.35)');
          silkGrad.addColorStop(0.5, 'rgba(250, 210, 195, 0.48)');
          silkGrad.addColorStop(1, 'rgba(225, 150, 135, 0.2)');
        } else {
          silkGrad.addColorStop(0, 'rgba(215, 175, 210, 0.3)');
          silkGrad.addColorStop(0.5, 'rgba(240, 215, 235, 0.42)');
          silkGrad.addColorStop(1, 'rgba(200, 155, 195, 0.18)');
        }
        ctx.fillStyle = silkGrad;
        ctx.fill();
        ctx.restore();
      }

      // Wardrobe rail with VISIBLE SWINGING hangers
      ctx.strokeStyle = 'rgba(195, 145, 120, 0.45)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, h * 0.32);
      ctx.lineTo(w * 0.9, h * 0.32);
      ctx.stroke();

      for (let i = 0; i < 9; i++) {
        let hx = w * 0.16 + i * (w * 0.68 / 8);
        let sway = Math.sin(t * 2.8 + i * 0.75) * 0.22;
        ctx.save();
        ctx.translate(hx, h * 0.32);
        ctx.rotate(sway);

        ctx.strokeStyle = 'rgba(185, 135, 110, 0.65)';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(0, -14, 12, Math.PI, 0, false);
        ctx.moveTo(0, -2);
        ctx.lineTo(-32, 28);
        ctx.lineTo(32, 28);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 230, 160, 0.8)';
        ctx.beginPath();
        ctx.arc(0, -2, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Studio light orbs visibly drifting diagonally
      for (let b = 0; b < 28; b++) {
        let bx = ((b * 157 + t * 65) % (w + 100)) - 50;
        let by = ((b * 93 + Math.sin(t * 2 + b) * 55 + t * 35) % h);
        let bGrad = ctx.createRadialGradient(bx, by, 0, bx, by, 50 + (b % 30));
        bGrad.addColorStop(0, 'rgba(255, 240, 220, 0.55)');
        bGrad.addColorStop(1, 'rgba(255, 240, 220, 0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(bx, by, 50 + (b % 30), 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_shopping_active',
    duration: 5,
    title: 'Dynamic Geometric Threads & Activewear Weave',
    generator: `
      // Clean Athletic Threads & Activewear Weave - HIGH VELOCITY CONTINUOUS WAVE
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#f2f8f7');
      bg.addColorStop(0.5, '#e6f3f1');
      bg.addColorStop(1, '#d8ece9');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const count = 18;
      ctx.lineWidth = 3;
      for (let i = 0; i < count; i++) {
        let progress = i / count;
        let yBase = progress * h;
        let phase = progress * Math.PI * 2;
        let speed = (i % 2 === 0 ? 1 : -1) * 350;

        ctx.strokeStyle = i % 2 === 0
          ? 'rgba(14, 165, 150, ' + (0.35 + Math.sin(t * 2 + i) * 0.2) + ')'
          : 'rgba(14, 165, 233, ' + (0.32 + Math.cos(t * 2 + i) * 0.18) + ')';

        ctx.beginPath();
        for (let x = 0; x <= w; x += 15) {
          let wave = Math.sin((x + t * speed) * 0.007 + phase) * 65 +
                     Math.cos((x - t * speed * 0.5) * 0.012) * 30;
          if (x === 0) ctx.moveTo(x, yBase + wave);
          else ctx.lineTo(x, yBase + wave);
        }
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 2.5;
      let diagShift = (t * 240) % 120;
      for (let d = -w; d < w * 2; d += 120) {
        let dx = d + diagShift;
        ctx.beginPath();
        ctx.moveTo(dx, 0);
        ctx.lineTo(dx + 300, h);
        ctx.stroke();
      }

      for (let p = 0; p < 18; p++) {
        let px = ((p * 140 + t * 280) % (w + 100)) - 50;
        let py = ((p * 115 + Math.sin(px * 0.008 + t * 3) * 75) % h);
        let rad = ctx.createRadialGradient(px, py, 3, px, py, 35);
        rad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        rad.addColorStop(0.3, 'rgba(20, 184, 166, 0.7)');
        rad.addColorStop(1, 'rgba(20, 184, 166, 0)');
        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(px, py, 35, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_shopping_couture',
    duration: 5,
    title: 'Festive Couture, Handbag Silhouettes & Gemstone Facets',
    generator: `
      // Luxury Ethnic Couture & Gemstone Facets - PROMINENT FLOATING & ROTATION
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#faf4fa');
      bg.addColorStop(0.5, '#f4eaf2');
      bg.addColorStop(1, '#ebdde8');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      for (let g = 0; g < 3; g++) {
        let gx = (w * 0.3) + g * (w * 0.28) + Math.sin(t * 1.5 + g * 2) * 80;
        let gy = (h * 0.35) + (g % 2) * 160 + Math.cos(t * 1.8 + g) * 60;
        let gRot = t * (0.8 + g * 0.4);
        let gSize = 120 + g * 25;

        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(gRot);

        for (let f = 0; f < 8; f++) {
          let a1 = (f / 8) * Math.PI * 2;
          let a2 = ((f + 1) / 8) * Math.PI * 2;
          let rOut = gSize;

          let fGrad = ctx.createLinearGradient(0, 0, Math.cos(a1) * rOut, Math.sin(a1) * rOut);
          fGrad.addColorStop(0, 'rgba(216, 180, 254, 0.5)');
          fGrad.addColorStop(0.5, 'rgba(251, 207, 232, 0.4)');
          fGrad.addColorStop(1, 'rgba(254, 240, 138, 0.55)');

          ctx.fillStyle = fGrad;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a1) * rOut, Math.sin(a1) * rOut);
          ctx.lineTo(Math.cos(a2) * rOut, Math.sin(a2) * rOut);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }
        ctx.restore();
      }

      for (let v = 0; v < 3; v++) {
        let vx = w * 0.08 + v * 90;
        ctx.beginPath();
        ctx.moveTo(vx, 0);
        ctx.bezierCurveTo(vx + 140 + Math.sin((t * 2 + v)) * 60, h * 0.35,
                          vx - 80 + Math.cos((t * 2 + v)) * 50, h * 0.7,
                          vx + 100, h);
        ctx.lineTo(0, h);
        ctx.lineTo(0, 0);
        ctx.closePath();

        let vGrad = ctx.createLinearGradient(0, 0, vx + 120, 0);
        vGrad.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
        vGrad.addColorStop(1, 'rgba(236, 72, 153, 0.25)');
        ctx.fillStyle = vGrad;
        ctx.fill();
      }

      for (let s = 0; s < 45; s++) {
        let sx = ((s * 149 + Math.sin(t * 2 + s) * 45) % w);
        let sy = h - ((s * 73 + t * 95) % h);
        let spark = Math.sin(t * 4 + s) * 0.5 + 0.5;
        ctx.fillStyle = 'rgba(245, 205, 110, ' + (spark * 0.85 + 0.15) + ')';
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5 + spark * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_dining_terrace',
    duration: 5,
    title: 'Sunlit Dining Terrace & Rising Aroma Steam',
    generator: `
      // Warm Terrace Dining & PROMINENT RISING AROMA STEAM
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#fef9ee');
      bg.addColorStop(0.5, '#fbf0dc');
      bg.addColorStop(1, '#f3e2c3');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let b = 0; b < 4; b++) {
        let bx = w * 0.12 + b * 260 + Math.sin(t * 1.4 + b) * 110;
        let bGrad = ctx.createLinearGradient(bx, 0, bx + 220, h);
        bGrad.addColorStop(0, 'rgba(255, 235, 175, 0.55)');
        bGrad.addColorStop(0.5, 'rgba(255, 215, 140, 0.28)');
        bGrad.addColorStop(1, 'rgba(255, 190, 100, 0.05)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.moveTo(bx - 80, 0);
        ctx.lineTo(bx + 180, 0);
        ctx.lineTo(bx + 380, h);
        ctx.lineTo(bx + 120, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      for (let s = 0; s < 7; s++) {
        let steamX = w * 0.18 + s * 160;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 5;
        ctx.beginPath();

        for (let y = h + 50; y >= -50; y -= 20) {
          let progress = (h - y) / h;
          let wave = Math.sin((h - y) * 0.015 - t * 4 + s * 1.5) * (35 + progress * 25);
          if (y >= h + 40) ctx.moveTo(steamX + wave, y);
          else ctx.lineTo(steamX + wave, y);
        }
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 245, 220, 0.4)';
        ctx.lineWidth = 9;
        ctx.stroke();
      }

      for (let p = 0; p < 45; p++) {
        let px = ((p * 137 + Math.sin(t * 2 + p) * 35) % w);
        let py = h - ((p * 63 + t * 130) % (h + 80));
        let pGrad = ctx.createRadialGradient(px, py, 1, px, py, 6);
        pGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        pGrad.addColorStop(0.5, 'rgba(245, 185, 75, 0.7)');
        pGrad.addColorStop(1, 'rgba(245, 185, 75, 0)');
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_gourmet_flame',
    duration: 5,
    title: 'Gourmet Grill Embers & Appetizing Warmth',
    generator: `
      // Warm Gourmet Flame-Grilled Hearth - FAST VISIBLE RISING EMBERS & HEAT WAVES
      let bg = ctx.createRadialGradient(w / 2, h * 0.7, 50, w / 2, h * 0.5, w * 0.75);
      bg.addColorStop(0, '#5a1d0d');
      bg.addColorStop(0.4, '#381209');
      bg.addColorStop(0.8, '#200a06');
      bg.addColorStop(1, '#120503');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      for (let wIdx = 0; wIdx < 8; wIdx++) {
        let wy = h - ((t * 110 + wIdx * 90) % (h * 1.1));
        let heatGrad = ctx.createLinearGradient(0, wy, w, wy);
        heatGrad.addColorStop(0, 'rgba(255, 140, 20, 0.1)');
        heatGrad.addColorStop(0.5, 'rgba(255, 190, 60, 0.5)');
        heatGrad.addColorStop(1, 'rgba(255, 140, 20, 0.1)');
        ctx.fillStyle = heatGrad;
        ctx.fillRect(60, wy, w - 120, 6);
      }

      for (let e = 0; e < 65; e++) {
        let speedY = 140 + (e % 5) * 50;
        let ex = ((e * 89 + Math.sin(t * 3 + e) * 80) % (w - 80)) + 40;
        let ey = h - ((e * 41 + t * speedY) % (h + 50));
        let size = 2.5 + (e % 4.5);

        let emberGrad = ctx.createRadialGradient(ex, ey, 1, ex, ey, size * 3);
        emberGrad.addColorStop(0, 'rgba(255, 255, 200, 1)');
        emberGrad.addColorStop(0.3, 'rgba(255, 150, 40, 0.85)');
        emberGrad.addColorStop(1, 'rgba(220, 50, 10, 0)');
        ctx.fillStyle = emberGrad;
        ctx.beginPath();
        ctx.arc(ex, ey, size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      let pulseGlow = 0.45 + Math.sin(t * 3.5) * 0.15;
      let hearthGlow = ctx.createRadialGradient(w / 2, h, 10, w / 2, h, h * 0.65);
      hearthGlow.addColorStop(0, 'rgba(255, 160, 30, ' + pulseGlow + ')');
      hearthGlow.addColorStop(0.6, 'rgba(220, 60, 10, 0.25)');
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
      // Warm Stone Hearth - CONTINUOUS OUTWARD RADIANT HEAT RIPPLES & FLOUR PARTICLES
      let bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 80, w * 0.5, h * 0.5, w * 0.7);
      bg.addColorStop(0, '#fbf4ea');
      bg.addColorStop(0.5, '#f4e5cf');
      bg.addColorStop(0.85, '#e8d2b4');
      bg.addColorStop(1, '#d8bc98');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const ox = w * 0.5;
      const oy = h * 0.55;

      for (let rip = 0; rip < 5; rip++) {
        let ripRad = ((t * 90 + rip * 70) % 350) + 60;
        let ripAlpha = Math.max(0, (1 - ripRad / 400) * 0.5);

        ctx.strokeStyle = 'rgba(235, 140, 50, ' + ripAlpha + ')';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(ox, oy, ripRad, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 190, 80, ' + (ripAlpha * 0.3) + ')';
        ctx.fill();
      }

      let archPulse = Math.sin(t * 3) * 15;
      for (let r = 240; r >= 140; r -= 35) {
        let archGrad = ctx.createRadialGradient(ox, oy, r - 30, ox, oy, r + archPulse);
        archGrad.addColorStop(0, 'rgba(255, 180, 80, 0.5)');
        archGrad.addColorStop(0.7, 'rgba(230, 130, 40, 0.3)');
        archGrad.addColorStop(1, 'rgba(180, 90, 30, 0)');
        ctx.fillStyle = archGrad;
        ctx.beginPath();
        ctx.arc(ox, oy, r + archPulse, Math.PI * 0.85, Math.PI * 2.15, false);
        ctx.fill();
      }

      for (let f = 0; f < 55; f++) {
        let angle = t * 1.5 + f * 0.4;
        let radius = ((f * 17 + t * 45) % 280) + 40;
        let fx = ox + Math.cos(angle) * radius;
        let fy = oy + Math.sin(angle) * (radius * 0.6) - (t * 40) % 60;

        let fSize = 2 + (f % 3.5);
        ctx.fillStyle = f % 6 === 0
          ? 'rgba(70, 160, 60, 0.75)'
          : 'rgba(255, 235, 180, 0.85)';
        ctx.beginPath();
        ctx.arc(fx, fy, fSize, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_cinema_beam',
    duration: 5,
    title: 'Anamorphic Cinema Laser Projector Beam',
    generator: `
      // Pure Cinematic Laser Projector Beam - PROMINENT SWEEPING LIGHT CONE
      let bg = ctx.createRadialGradient(w * 0.85, h * 0.2, 50, w * 0.5, h * 0.5, w * 0.8);
      bg.addColorStop(0, '#2d1838');
      bg.addColorStop(0.4, '#1b0d26');
      bg.addColorStop(0.8, '#100618');
      bg.addColorStop(1, '#08020d');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const srcX = w * 0.92;
      const srcY = h * 0.15;
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      let sweepAngle = Math.sin(t * 1.8) * 90;
      let targetCenterY = h * 0.55 + sweepAngle;

      for (let b = 0; b < 4; b++) {
        let spread = 320 + b * 130;
        let beamGrad = ctx.createLinearGradient(srcX, srcY, 0, targetCenterY);
        beamGrad.addColorStop(0, 'rgba(255, 240, 180, 0.95)');
        beamGrad.addColorStop(0.3, 'rgba(240, 180, 80, 0.6)');
        beamGrad.addColorStop(0.7, 'rgba(190, 100, 200, 0.35)');
        beamGrad.addColorStop(1, 'rgba(90, 40, 140, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(srcX, srcY);
        ctx.lineTo(0, targetCenterY - spread / 2);
        ctx.lineTo(0, targetCenterY + spread / 2);
        ctx.closePath();
        ctx.fill();
      }

      let streakWidth = 800 + Math.sin(t * 4) * 200;
      let streakGrad = ctx.createLinearGradient(srcX - streakWidth / 2, srcY, srcX + streakWidth / 2, srcY);
      streakGrad.addColorStop(0, 'rgba(90, 180, 255, 0)');
      streakGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
      streakGrad.addColorStop(1, 'rgba(90, 180, 255, 0)');
      ctx.fillStyle = streakGrad;
      ctx.fillRect(srcX - streakWidth / 2, srcY - 3, streakWidth, 6);

      let bulb = ctx.createRadialGradient(srcX, srcY, 2, srcX, srcY, 90);
      bulb.addColorStop(0, 'rgba(255, 255, 255, 1)');
      bulb.addColorStop(0.2, 'rgba(255, 230, 150, 0.9)');
      bulb.addColorStop(0.6, 'rgba(240, 140, 50, 0.45)');
      bulb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bulb;
      ctx.beginPath();
      ctx.arc(srcX, srcY, 90, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      for (let p = 0; p < 75; p++) {
        let px = ((p * 113 + t * 90) % w);
        let py = ((p * 67 + Math.sin(t * 2.5 + p) * 60) % h);
        let inBeam = (py > px * 0.25 && py < px * 0.9 + 250);
        let alpha = inBeam ? (0.55 + Math.sin(t * 4 + p) * 0.35) : 0.1;
        ctx.fillStyle = inBeam
          ? 'rgba(255, 245, 200, ' + alpha + ')'
          : 'rgba(200, 180, 220, ' + alpha + ')';
        ctx.beginPath();
        ctx.arc(px, py, 2.5 + (p % 3.5), 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_cinema_popcorn',
    duration: 5,
    title: 'Crimson Red Popping Popcorn Animation',
    generator: `
      // Crimson Red Background with DYNAMIC POPCORN BURSTING TOWARD VIEWER
      let bg = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.75);
      bg.addColorStop(0, '#c7232a');
      bg.addColorStop(0.5, '#a0141b');
      bg.addColorStop(0.85, '#780a0f');
      bg.addColorStop(1, '#500508');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const popCount = 65;
      for (let i = 0; i < popCount; i++) {
        let angle = (i * 137.5) * (Math.PI / 180);
        let speed = 160 + (i % 9) * 60;
        let birthDelay = (i % 12) * 0.38;
        let age = (t + 5 - birthDelay) % 4.0;

        let dist = speed * Math.pow(age, 1.7);
        let px = w / 2 + Math.cos(angle) * dist;
        let py = h / 2 + Math.sin(angle) * dist + (age * age * 45);

        let scale = 0.5 + age * 1.4;
        let rot = age * 4.5 + i;

        if (px >= -120 && px <= w + 120 && py >= -120 && py <= h + 120) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(rot);
          ctx.scale(scale, scale);

          let alpha = Math.min(1, age * 4);
          if (age > 3.2) alpha = Math.max(0, (4.0 - age) / 0.8);

          ctx.fillStyle = 'rgba(235, 185, 75, ' + (alpha * 0.95) + ')';
          ctx.beginPath();
          ctx.arc(0, 0, 16, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(255, 253, 245, ' + alpha + ')';
          for (let lobe = 0; lobe < 6; lobe++) {
            let lAngle = (lobe / 6) * Math.PI * 2;
            let lx = Math.cos(lAngle) * 13;
            let ly = Math.sin(lAngle) * 13;
            ctx.beginPath();
            ctx.arc(lx, ly, 12 + (lobe % 4), 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = 'rgba(245, 175, 40, ' + (alpha * 0.9) + ')';
          ctx.beginPath();
          ctx.arc(3, 2, 7, 0, Math.PI * 2);
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
      // Luxury Auditorium Plush Velvet - CONTINUOUS RUNNING AISLE LIGHTS & SOUND WAVES
      let bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#260e19');
      bg.addColorStop(0.5, '#180710');
      bg.addColorStop(1, '#0f0309');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      for (let sw = 0; sw < 4; sw++) {
        let swRad = ((t * 80 + sw * 90) % 360) + 50;
        let swAlpha = (1 - swRad / 420) * 0.35;
        ctx.strokeStyle = 'rgba(225, 45, 85, ' + swAlpha + ')';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.4, swRad, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let row = 0; row < 5; row++) {
        let ry = h * 0.4 + row * 85;
        let rScale = 0.7 + row * 0.12;

        ctx.strokeStyle = 'rgba(225, 60, 95, ' + (0.25 + row * 0.08) + ')';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(w / 2, ry - 320, 460 * rScale, Math.PI * 0.28, Math.PI * 0.72, false);
        ctx.stroke();
      }

      for (let aisle of [w * 0.2, w * 0.8]) {
        let aisleGrad = ctx.createLinearGradient(aisle - 20, 0, aisle + 20, 0);
        aisleGrad.addColorStop(0, 'rgba(255, 180, 50, 0)');
        aisleGrad.addColorStop(0.5, 'rgba(255, 180, 50, 0.45)');
        aisleGrad.addColorStop(1, 'rgba(255, 180, 50, 0)');
        ctx.fillStyle = aisleGrad;
        ctx.fillRect(aisle - 20, h * 0.35, 40, h * 0.65);

        for (let s = 0; s < 10; s++) {
          let sProgress = ((t * 0.8 + s / 10) % 1);
          let sy = h * 0.38 + sProgress * (h * 0.6);
          let brightness = Math.sin(sProgress * Math.PI) * 0.9 + 0.1;

          ctx.fillStyle = 'rgba(255, 230, 140, ' + brightness + ')';
          ctx.beginPath();
          ctx.arc(aisle, sy, 5.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(255, 180, 50, ' + (brightness * 0.5) + ')';
          ctx.beginPath();
          ctx.arc(aisle, sy, 14, 0, Math.PI * 2);
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
      // Clean Spatial 3D Walkthrough Grid - FAST FORWARD PERSPECTIVE MOTION
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#f2f8fa');
      bg.addColorStop(0.5, '#e4f1f4');
      bg.addColorStop(1, '#d5e7ec');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const horizonY = h * 0.42;
      const vpX = w / 2;

      ctx.strokeStyle = 'rgba(13, 148, 136, 0.35)';
      ctx.lineWidth = 1.5;
      for (let x = -w * 0.6; x <= w * 1.6; x += 70) {
        ctx.beginPath();
        ctx.moveTo(vpX, horizonY);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let z = 1; z <= 14; z++) {
        let p = ((t * 0.65 + z / 14) % 1);
        let y = horizonY + Math.pow(p, 2.1) * (h - horizonY);
        let alpha = p * 0.65;
        ctx.strokeStyle = 'rgba(13, 148, 136, ' + alpha + ')';
        ctx.lineWidth = 1 + p * 2.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.save();
      ctx.strokeStyle = 'rgba(215, 160, 80, 0.45)';
      ctx.lineWidth = 1.8;
      let domeSpin = t * 0.35;
      for (let arc = 70; arc <= 380; arc += 65) {
        ctx.beginPath();
        ctx.ellipse(vpX, horizonY, arc, arc * 0.62, 0, Math.PI, 0, false);
        ctx.stroke();
      }
      for (let ray = 0; ray < 10; ray++) {
        let angle = Math.PI + (ray / 9) * Math.PI + Math.sin(domeSpin) * 0.15;
        ctx.beginPath();
        ctx.moveTo(vpX, horizonY);
        ctx.lineTo(vpX + Math.cos(angle) * 380, horizonY + Math.sin(angle) * 240);
        ctx.stroke();
      }
      ctx.restore();

      for (let n = 0; n < 16; n++) {
        let nProg = ((t * 0.5 + n / 16) % 1);
        let ny = horizonY + Math.pow(nProg, 2) * (h - horizonY);
        let nx = vpX + ((n % 2 === 0 ? 1 : -1) * (50 + nProg * (w * 0.42)));
        let nSize = 3 + nProg * 6;

        ctx.fillStyle = 'rgba(20, 184, 166, ' + (nProg * 0.85 + 0.15) + ')';
        ctx.beginPath();
        ctx.arc(nx, ny, nSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(20, 184, 166, ' + (nProg * 0.5) + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(nx, ny, nSize * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_transit_vista',
    duration: 5,
    title: 'Clean Minimalist Transit Vectors & Approach Boulevard',
    generator: `
      // Clean Arrival Boulevard - HIGH-SPEED TRANSIT VECTORS & PASSING LIGHTS
      let bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#f4f8fb');
      bg.addColorStop(0.45, '#e9f0f6');
      bg.addColorStop(1, '#dde6ef');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const vpY = h * 0.38;
      const vpX = w * 0.5;

      let roadGrad = ctx.createLinearGradient(0, vpY, 0, h);
      roadGrad.addColorStop(0, 'rgba(220, 230, 240, 0.4)');
      roadGrad.addColorStop(1, 'rgba(195, 210, 228, 0.8)');
      ctx.fillStyle = roadGrad;
      ctx.beginPath();
      ctx.moveTo(vpX - 45, vpY);
      ctx.lineTo(vpX + 45, vpY);
      ctx.lineTo(w * 0.88, h);
      ctx.lineTo(w * 0.12, h);
      ctx.closePath();
      ctx.fill();

      for (let side of [-1, 1]) {
        for (let l = 0; l < 10; l++) {
          let p = ((t * 0.85 + l / 10) % 1);
          let y1 = vpY + Math.pow(p, 2) * (h - vpY);
          let y2 = vpY + Math.pow(Math.min(1, p + 0.12), 2) * (h - vpY);
          let x1 = vpX + side * (55 + p * (w * 0.32));
          let x2 = vpX + side * (55 + (p + 0.12) * (w * 0.32));

          ctx.strokeStyle = side === 1
            ? 'rgba(245, 150, 40, ' + (p * 0.9) + ')'
            : 'rgba(56, 189, 248, ' + (p * 0.9) + ')';
          ctx.lineWidth = 5 * p + 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      for (let p = 0; p < 8; p++) {
        let prog = ((t * 0.65 + p / 8) % 1);
        let py = vpY + Math.pow(prog, 1.9) * (h - vpY);
        let pxLeft = vpX - (75 + prog * (w * 0.37));
        let pxRight = vpX + (75 + prog * (w * 0.37));
        let hPost = 65 * prog;

        ctx.strokeStyle = 'rgba(175, 190, 215, ' + (prog * 0.85) + ')';
        ctx.lineWidth = 2.5 * prog + 1;
        ctx.beginPath();
        ctx.moveTo(pxLeft, py); ctx.lineTo(pxLeft, py - hPost);
        ctx.moveTo(pxRight, py); ctx.lineTo(pxRight, py - hPost);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 240, 180, ' + (prog * 0.9) + ')';
        ctx.beginPath();
        ctx.arc(pxLeft, py - hPost, 4 * prog + 1, 0, Math.PI * 2);
        ctx.arc(pxRight, py - hPost, 4 * prog + 1, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  },
  {
    name: 'video_facilities_lobby',
    duration: 5,
    title: 'Serene Minimalist Visitor Lobby & Glass Pavilion',
    generator: `
      // Bright Interior Lobby - CLEARLY MOVING SUNBEAMS & SWAYING BOTANICALS
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#fdfdfd');
      bg.addColorStop(0.5, '#f5f7fa');
      bg.addColorStop(1, '#eaf0f6');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(200, 215, 230, 0.45)';
      ctx.lineWidth = 2;
      for (let x = 60; x < w; x += 150) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, h * 0.72);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, h * 0.72); ctx.lineTo(w, h * 0.72);
      ctx.stroke();

      let floorGrad = ctx.createLinearGradient(0, h * 0.72, 0, h);
      floorGrad.addColorStop(0, 'rgba(240, 244, 250, 0.95)');
      floorGrad.addColorStop(1, 'rgba(215, 225, 238, 0.85)');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, h * 0.72, w, h * 0.28);

      for (let d = 0; d < 4; d++) {
        let dx = ((t * 80 + d * 320) % (w + 200)) - 100;
        let dayGrad = ctx.createLinearGradient(dx, h * 0.72, dx + 140, h);
        dayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
        dayGrad.addColorStop(1, 'rgba(255, 245, 220, 0.2)');
        ctx.fillStyle = dayGrad;
        ctx.beginPath();
        ctx.moveTo(dx, h * 0.72);
        ctx.lineTo(dx + 110, h * 0.72);
        ctx.lineTo(dx + 220, h);
        ctx.lineTo(dx + 90, h);
        ctx.closePath();
        ctx.fill();
      }

      for (let plantSide of [0, 1]) {
        let rootX = plantSide === 0 ? w * 0.08 : w * 0.92;
        let dir = plantSide === 0 ? 1 : -1;

        ctx.save();
        let stemSway = Math.sin(t * 2 + plantSide) * 35;
        ctx.strokeStyle = 'rgba(150, 180, 165, 0.55)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(rootX, h);
        ctx.quadraticCurveTo(rootX + dir * 30 + stemSway * 0.5, h * 0.65, rootX + dir * 90 + stemSway, h * 0.45);
        ctx.stroke();

        for (let leaf = 0; leaf < 8; leaf++) {
          let leafY = h * 0.88 - leaf * 38;
          let leafX = rootX + dir * (leaf * 12) + stemSway * (leaf / 8);
          let lSway = Math.sin(t * 2.8 + leaf * 0.6) * 12;

          ctx.fillStyle = 'rgba(160, 195, 180, 0.55)';
          ctx.beginPath();
          ctx.ellipse(leafX + lSway, leafY, 24, 10, dir * Math.PI * 0.22, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
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
    res.send('<h1>ALL ENHANCED VIDEOS COMPLETED!</h1><script>document.title="ALL_DONE";</script>');
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
    videoBitsPerSecond: 6500000
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
    '-crf', '19',
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
      console.log('ALL ENHANCED VIDEOS GENERATED SUCCESSFULLY!');
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
  console.log(`Generating ${VIDEO_DEFINITIONS.length} improved motion background videos...`);

  chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-gpu',
    `http://localhost:${PORT}`
  ]);
});
