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
const PORT = 3690;

const TARGET_HERO_VIDEOS = [
  // 1. HOMEPAGE HERO: Completely New 3D Animated Shopping Mall Video
  {
    name: 'video_atrium_light',
    duration: 5,
    title: '3D Shopping Mall Grand Central Atrium & Multi-Floor Galleria',
    generator: `
      // --- 3D ANIMATED SHOPPING MALL INTERIOR (Grand Central Atrium) ---
      // Camera dolly & subtle 3D rotational tilt
      const camPanX = Math.sin(t * 0.9) * 45;
      const camZoom = 1 + Math.sin(t * 0.6) * 0.04;
      const vpX = w / 2 + camPanX;
      const vpY = h * 0.42;

      ctx.save();
      // Base deep architectural ambient: rich twilight bronze & charcoal plum (NEVER washed out)
      let bgGrad = ctx.createRadialGradient(vpX, vpY, 40, w / 2, h / 2, w * 0.85);
      bgGrad.addColorStop(0, '#2e1f38');
      bgGrad.addColorStop(0.35, '#22152b');
      bgGrad.addColorStop(0.7, '#180d20');
      bgGrad.addColorStop(1, '#0e0714');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // --- 1. OVERHEAD GEOMETRIC SKYLIGHT DOME & STEEL TRUSSES ---
      ctx.save();
      const domeR = 420;
      let domeGrad = ctx.createRadialGradient(vpX, vpY * 0.35, 20, vpX, vpY * 0.35, domeR);
      domeGrad.addColorStop(0, 'rgba(255, 220, 160, 0.45)');
      domeGrad.addColorStop(0.4, 'rgba(215, 145, 65, 0.25)');
      domeGrad.addColorStop(0.85, 'rgba(120, 60, 150, 0.12)');
      domeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = domeGrad;
      ctx.beginPath();
      ctx.ellipse(vpX, vpY * 0.35, domeR, domeR * 0.45, 0, Math.PI, 0, false);
      ctx.fill();

      // Steel skylight rib geometry with perspective depth
      ctx.strokeStyle = 'rgba(245, 185, 110, 0.45)';
      ctx.lineWidth = 2;
      for (let arc = 80; arc <= domeR; arc += 70) {
        ctx.beginPath();
        ctx.ellipse(vpX, vpY * 0.35, arc, arc * 0.42, 0, Math.PI, 0, false);
        ctx.stroke();
      }
      for (let a = 0; a <= 10; a++) {
        let rad = Math.PI + (a / 10) * Math.PI;
        ctx.beginPath();
        ctx.moveTo(vpX, vpY * 0.35);
        ctx.lineTo(vpX + Math.cos(rad) * domeR, (vpY * 0.35) + Math.sin(rad) * (domeR * 0.45));
        ctx.stroke();
      }
      ctx.restore();

      // --- 2. MULTI-FLOOR GALLERIA BALCONIES (Curving 3D Levels 00 to 04) ---
      const numTiers = 4;
      for (let tier = 1; tier <= numTiers; tier++) {
        let tierProg = tier / numTiers;
        let tierY = vpY + Math.pow(tierProg, 1.4) * (h * 0.52);
        let tierW = w * (0.55 + tierProg * 0.55);

        // Balcony slab fascia (curved galleria architecture)
        let slabGrad = ctx.createLinearGradient(0, tierY - 14, 0, tierY + 22);
        slabGrad.addColorStop(0, 'rgba(210, 155, 95, 0.85)');
        slabGrad.addColorStop(0.3, 'rgba(75, 45, 95, 0.95)');
        slabGrad.addColorStop(0.8, 'rgba(38, 20, 52, 1)');
        slabGrad.addColorStop(1, 'rgba(15, 8, 22, 1)');
        ctx.fillStyle = slabGrad;

        ctx.beginPath();
        ctx.moveTo(vpX - tierW / 2, tierY);
        ctx.bezierCurveTo(vpX - tierW * 0.25, tierY + 28, vpX + tierW * 0.25, tierY + 28, vpX + tierW / 2, tierY);
        ctx.lineTo(vpX + tierW / 2, tierY + 20);
        ctx.bezierCurveTo(vpX + tierW * 0.25, tierY + 48, vpX - tierW * 0.25, tierY + 48, vpX - tierW / 2, tierY + 20);
        ctx.closePath();
        ctx.fill();

        // Glowing illuminated LED edge strip along balcony
        ctx.strokeStyle = 'rgba(255, 205, 125, 0.85)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(vpX - tierW / 2, tierY);
        ctx.bezierCurveTo(vpX - tierW * 0.25, tierY + 28, vpX + tierW * 0.25, tierY + 28, vpX + tierW / 2, tierY);
        ctx.stroke();

        // Laminated glass balustrade with illuminated handrail
        let glassGrad = ctx.createLinearGradient(0, tierY - 32, 0, tierY);
        glassGrad.addColorStop(0, 'rgba(210, 235, 255, 0.35)');
        glassGrad.addColorStop(0.7, 'rgba(160, 195, 230, 0.12)');
        glassGrad.addColorStop(1, 'rgba(255, 220, 160, 0.45)');
        ctx.fillStyle = glassGrad;
        ctx.beginPath();
        ctx.moveTo(vpX - tierW / 2, tierY - 32);
        ctx.bezierCurveTo(vpX - tierW * 0.25, tierY - 6, vpX + tierW * 0.25, tierY - 6, vpX + tierW / 2, tierY - 32);
        ctx.lineTo(vpX + tierW / 2, tierY);
        ctx.bezierCurveTo(vpX + tierW * 0.25, tierY + 28, vpX - tierW * 0.25, tierY + 28, vpX - tierW / 2, tierY);
        ctx.closePath();
        ctx.fill();

        // Handrail edge
        ctx.strokeStyle = 'rgba(255, 230, 175, 0.75)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(vpX - tierW / 2, tierY - 32);
        ctx.bezierCurveTo(vpX - tierW * 0.25, tierY - 6, vpX + tierW * 0.25, tierY - 6, vpX + tierW / 2, tierY - 32);
        ctx.stroke();

        // STOREFRONT BOUTIQUE VITRINES along each floor level
        const numShops = 6;
        for (let s = 0; s < numShops; s++) {
          let sProg = (s + 0.5) / numShops;
          let sx = (vpX - tierW * 0.44) + sProg * (tierW * 0.88);
          let sy = tierY - 26;

          // Warm storefront vitrine glow
          let shopGlow = ctx.createRadialGradient(sx, sy, 3, sx, sy, 36);
          let shopHue = s % 2 === 0 ? 'rgba(255, 195, 100,' : 'rgba(240, 140, 75,';
          shopGlow.addColorStop(0, shopHue + '0.75)');
          shopGlow.addColorStop(0.6, shopHue + '0.28)');
          shopGlow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = shopGlow;
          ctx.beginPath();
          ctx.arc(sx, sy, 36, 0, Math.PI * 2);
          ctx.fill();

          // Storefront marquee frame
          ctx.fillStyle = 'rgba(40, 22, 54, 0.85)';
          ctx.strokeStyle = 'rgba(255, 215, 140, 0.55)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(sx - 24, sy - 14, 48, 22, 3);
          ctx.fill();
          ctx.stroke();

          // Illuminated brand letters indication
          ctx.fillStyle = 'rgba(255, 240, 200, 0.95)';
          ctx.fillRect(sx - 16, sy - 4, 32, 3);
        }
      }

      // --- 3. DUAL SYMMETRICAL CRISSCROSSING ESCALATORS WITH MOVING STEPS ---
      for (let side of [-1, 1]) {
        let escTopX = vpX + side * 140;
        let escTopY = vpY + 55;
        let escBotX = vpX + side * 420;
        let escBotY = h + 20;

        // Escalator truss body
        let escBodyGrad = ctx.createLinearGradient(escTopX, escTopY, escBotX, escBotY);
        escBodyGrad.addColorStop(0, '#2d1b38');
        escBodyGrad.addColorStop(0.5, '#452656');
        escBodyGrad.addColorStop(1, '#1b0e24');
        ctx.fillStyle = escBodyGrad;

        ctx.beginPath();
        ctx.moveTo(escTopX - 35, escTopY);
        ctx.lineTo(escTopX + 35, escTopY);
        ctx.lineTo(escBotX + 65, escBotY);
        ctx.lineTo(escBotX - 65, escBotY);
        ctx.closePath();
        ctx.fill();

        // Illuminated glass side balustrade
        ctx.strokeStyle = 'rgba(255, 200, 115, 0.85)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(escTopX - 35, escTopY - 18);
        ctx.lineTo(escBotX - 65, escBotY - 18);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(escTopX + 35, escTopY - 18);
        ctx.lineTo(escBotX + 65, escBotY - 18);
        ctx.stroke();

        // MOVING ESCALATOR STEP PLATES (continuous smooth upward transit)
        const totalSteps = 22;
        for (let st = 0; st < totalSteps; st++) {
          let stepProg = ((t * 0.85 + st / totalSteps) % 1);
          let sy = escBotY - stepProg * (escBotY - escTopY);
          let sx = escBotX - stepProg * (escBotX - escTopX);
          let stepW = 55 + (1 - stepProg) * 45;

          // Step glowing front plate
          ctx.strokeStyle = 'rgba(255, 235, 175, 0.95)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(sx - stepW / 2, sy);
          ctx.lineTo(sx + stepW / 2, sy);
          ctx.stroke();

          // Step tread surface
          ctx.fillStyle = 'rgba(245, 170, 75, 0.65)';
          ctx.fillRect(sx - stepW / 2, sy - 2, stepW, 3.5);
        }

        // Escalator Handrail traveling indicator
        let handrailShift = (t * 220) % 60;
        ctx.strokeStyle = 'rgba(255, 245, 210, 0.95)';
        ctx.lineWidth = 4;
        ctx.setLineDash([18, 24]);
        ctx.lineDashOffset = -handrailShift;
        ctx.beginPath();
        ctx.moveTo(escTopX - 35, escTopY - 20);
        ctx.lineTo(escBotX - 65, escBotY - 20);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // --- 4. PANORAMIC GLASS CAPSULE ELEVATOR (Gliding along vertical tower) ---
      const liftTowerX = vpX + 280 + Math.sin(t * 0.7) * 20;
      // Tower vertical cable track
      ctx.strokeStyle = 'rgba(220, 160, 90, 0.45)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(liftTowerX - 22, vpY - 40); ctx.lineTo(liftTowerX - 22, h);
      ctx.moveTo(liftTowerX + 22, vpY - 40); ctx.lineTo(liftTowerX + 22, h);
      ctx.stroke();

      // Lift position moving smoothly up and down across floors
      let liftY = (vpY + 20) + (Math.sin(t * 1.1) * 0.5 + 0.5) * (h * 0.58);

      // Lift capsule glow aura
      let liftGlow = ctx.createRadialGradient(liftTowerX, liftY, 5, liftTowerX, liftY, 80);
      liftGlow.addColorStop(0, 'rgba(255, 245, 205, 0.95)');
      liftGlow.addColorStop(0.35, 'rgba(245, 170, 60, 0.75)');
      liftGlow.addColorStop(0.7, 'rgba(220, 90, 25, 0.35)');
      liftGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = liftGlow;
      ctx.beginPath();
      ctx.arc(liftTowerX, liftY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Glass capsule body
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.strokeStyle = 'rgba(255, 210, 120, 1)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(liftTowerX - 22, liftY - 32, 44, 64, 16);
      ctx.fill();
      ctx.stroke();

      // Interior warm illuminated core
      ctx.fillStyle = 'rgba(255, 225, 140, 1)';
      ctx.beginPath();
      ctx.roundRect(liftTowerX - 14, liftY - 22, 28, 44, 10);
      ctx.fill();

      // --- 5. POLISHED GROUND FLOOR ATRIUM PAVEMENT WITH GLOSSY REFLECTIONS ---
      let floorY = h * 0.76;
      let floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
      floorGrad.addColorStop(0, 'rgba(42, 22, 58, 0.9)');
      floorGrad.addColorStop(0.5, 'rgba(24, 11, 34, 0.98)');
      floorGrad.addColorStop(1, 'rgba(12, 5, 18, 1)');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, floorY, w, h - floorY);

      // Floor polished reflection tiles
      ctx.strokeStyle = 'rgba(240, 175, 95, 0.28)';
      ctx.lineWidth = 1.2;
      for (let tile = -w * 0.4; tile <= w * 1.4; tile += 85) {
        ctx.beginPath();
        ctx.moveTo(vpX, floorY);
        ctx.lineTo(tile, h);
        ctx.stroke();
      }
      for (let tz = 1; tz <= 5; tz++) {
        let ty = floorY + (tz / 5) * (h - floorY);
        ctx.beginPath();
        ctx.moveTo(0, ty);
        ctx.lineTo(w, ty);
        ctx.stroke();
      }

      // --- 6. SWEEPING VOLUMETRIC SUNLIGHT GOD-RAYS ---
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let b = 0; b < 3; b++) {
        let beamSweep = Math.sin(t * 1.3 + b * 2.1) * 160;
        let bX = vpX - 180 + b * 220 + beamSweep;
        let beamGrad = ctx.createLinearGradient(bX, 0, bX + 240, h);
        beamGrad.addColorStop(0, 'rgba(255, 225, 150, 0.45)');
        beamGrad.addColorStop(0.4, 'rgba(240, 165, 75, 0.22)');
        beamGrad.addColorStop(0.8, 'rgba(180, 80, 45, 0.08)');
        beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = beamGrad;

        ctx.beginPath();
        ctx.moveTo(bX - 60, 0);
        ctx.lineTo(bX + 80, 0);
        ctx.lineTo(bX + 320, h);
        ctx.lineTo(bX + 60, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // --- 7. AMBIENT GOLDEN FLOATING MOTES IN 3D DEPTH ---
      for (let p = 0; p < 45; p++) {
        let px = ((p * 137 + Math.sin(t * 1.8 + p) * 60 + camPanX) % w);
        let py = h - ((p * 83 + t * 95) % (h + 40));
        let pSize = 2 + (p % 3.5);
        let alpha = 0.4 + Math.sin(t * 3 + p) * 0.35;

        let mGrad = ctx.createRadialGradient(px, py, 0.5, px, py, pSize * 2.5);
        mGrad.addColorStop(0, 'rgba(255, 255, 235, 0.95)');
        mGrad.addColorStop(0.4, 'rgba(245, 175, 65, ' + alpha + ')');
        mGrad.addColorStop(1, 'rgba(245, 175, 65, 0)');
        ctx.fillStyle = mGrad;
        ctx.beginPath();
        ctx.arc(px, py, pSize * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    `
  },

  // 2. VISIT PAGE HERO: Enhanced Architectural Promenade & Arrival Plaza (Rich Colors, Zero Washout)
  {
    name: 'video_floor_promenade',
    duration: 5,
    title: 'Enhanced Rhythmic Architectural Floors & Arrival Promenade',
    generator: `
      // --- ARCHITECTURAL LEVELS & ARRIVAL PLAZA (Rich Twilight Dusk & Slate Bronze) ---
      let bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#1c2430');
      bgGrad.addColorStop(0.45, '#281d32');
      bgGrad.addColorStop(0.85, '#181122');
      bgGrad.addColorStop(1, '#0e0a16');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Deep perspective arrival avenue horizon
      const horizonY = h * 0.32;
      const vpX = w / 2;

      // Five prominent architectural galleria floor levels
      const levels = 5;
      for (let i = 0; i < levels; i++) {
        let y = horizonY + ((h - horizonY) / (levels + 0.8)) * (i + 1);

        // Balcony cantilever slab with rich dark granite & warm copper fascia
        let slabGrad = ctx.createLinearGradient(0, y - 10, 0, y + 26);
        slabGrad.addColorStop(0, 'rgba(215, 155, 85, 0.85)');
        slabGrad.addColorStop(0.35, 'rgba(65, 45, 80, 0.95)');
        slabGrad.addColorStop(0.8, 'rgba(32, 22, 42, 1)');
        slabGrad.addColorStop(1, 'rgba(15, 10, 20, 1)');
        ctx.fillStyle = slabGrad;
        ctx.beginPath();
        ctx.roundRect(40, y, w - 80, 24, 8);
        ctx.fill();

        // Architectural floor LED edge runner
        ctx.strokeStyle = 'rgba(245, 185, 105, 0.85)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(w - 40, y);
        ctx.stroke();

        // Balcony laminated glass railing
        let glassGrad = ctx.createLinearGradient(0, y - 42, 0, y);
        glassGrad.addColorStop(0, 'rgba(160, 215, 245, 0.45)');
        glassGrad.addColorStop(0.6, 'rgba(110, 165, 210, 0.15)');
        glassGrad.addColorStop(1, 'rgba(245, 185, 95, 0.55)');
        ctx.fillStyle = glassGrad;
        ctx.fillRect(45, y - 42, w - 90, 42);

        // Top glass handrail edge
        ctx.strokeStyle = 'rgba(255, 225, 160, 0.75)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(45, y - 42);
        ctx.lineTo(w - 45, y - 42);
        ctx.stroke();

        // FAST PROMINENT LIGHT BEAM PULSE RACING ACROSS PROMENADE
        let speed = (i % 2 === 0 ? 360 : -320);
        let sweepX = ((t * speed + i * 280) % (w + 260)) - 130;
        if (sweepX < -130) sweepX += (w + 260);

        let hlGrad = ctx.createLinearGradient(sweepX - 120, 0, sweepX + 120, 0);
        hlGrad.addColorStop(0, 'rgba(255, 200, 100, 0)');
        hlGrad.addColorStop(0.5, 'rgba(255, 235, 185, 0.95)');
        hlGrad.addColorStop(1, 'rgba(255, 200, 100, 0)');
        ctx.fillStyle = hlGrad;
        ctx.fillRect(sweepX - 120, y - 42, 240, 44);
      }

      // TWO GLOWING DUAL GLASS PANORAMIC ELEVATORS GLIDING SMOOTHLY
      for (let colIdx = 0; colIdx < 2; colIdx++) {
        let colX = colIdx === 0 ? w * 0.26 : w * 0.74;
        let liftY = ((t * 140 + colIdx * 380) % (h * 0.75)) + h * 0.14;
        if (colIdx === 1) liftY = (h * 0.88) - ((t * 130) % (h * 0.75));

        // Vertical elevator track
        ctx.strokeStyle = 'rgba(215, 160, 95, 0.65)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(colX - 26, 0); ctx.lineTo(colX - 26, h);
        ctx.moveTo(colX + 26, 0); ctx.lineTo(colX + 26, h);
        ctx.stroke();

        // Elevator glowing beacon
        let lGrad = ctx.createRadialGradient(colX, liftY, 4, colX, liftY, 65);
        lGrad.addColorStop(0, 'rgba(255, 245, 215, 1)');
        lGrad.addColorStop(0.4, 'rgba(240, 155, 50, 0.85)');
        lGrad.addColorStop(0.8, 'rgba(210, 75, 20, 0.35)');
        lGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = lGrad;
        ctx.beginPath();
        ctx.arc(colX, liftY, 65, 0, Math.PI * 2);
        ctx.fill();

        // Capsule frame
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.strokeStyle = 'rgba(245, 180, 80, 1)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(colX - 22, liftY - 28, 44, 56, 12);
        ctx.fill();
        ctx.stroke();
      }

      // Ground arrival vectors guiding toward entrance
      for (let v = 0; v < 8; v++) {
        let vProg = ((t * 0.75 + v / 8) % 1);
        let vy = h - vProg * 140;
        let vAlpha = vProg * 0.85;
        ctx.strokeStyle = 'rgba(245, 165, 65, ' + vAlpha + ')';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(w * 0.35 - vProg * 80, vy);
        ctx.lineTo(w * 0.65 + vProg * 80, vy);
        ctx.stroke();
      }
    `
  },

  // 3. EXPLORE PAGE HERO: Enhanced 3D Spatial Walkthrough & Geodesic Dome (Rich Teal/Onyx Depth)
  {
    name: 'video_explore_spatial',
    duration: 5,
    title: 'Enhanced 3D Spatial Mall Walkthrough & Geodesic Skylight Dome',
    generator: `
      // --- SPATIAL 3D WALKTHROUGH GRID (Deep Teal, Emerald & Rich Charcoal Depth) ---
      let bg = ctx.createRadialGradient(w / 2, h * 0.42, 30, w / 2, h / 2, w * 0.78);
      bg.addColorStop(0, '#15323a');
      bg.addColorStop(0.4, '#0e2329');
      bg.addColorStop(0.75, '#091519');
      bg.addColorStop(1, '#050c0e');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const horizonY = h * 0.42;
      const vpX = w / 2;

      // 1. FAST FORWARD PERSPECTIVE FLOOR GRID WITH HIGH CONTRAST
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.45)';
      ctx.lineWidth = 2;
      for (let x = -w * 0.7; x <= w * 1.7; x += 65) {
        ctx.beginPath();
        ctx.moveTo(vpX, horizonY);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal grid lines rushing forward in smooth 3D perspective
      for (let z = 1; z <= 16; z++) {
        let p = ((t * 0.8 + z / 16) % 1);
        let y = horizonY + Math.pow(p, 2.2) * (h - horizonY);
        let alpha = p * 0.95;
        ctx.strokeStyle = 'rgba(45, 212, 191, ' + alpha + ')';
        ctx.lineWidth = 1 + p * 3.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        // Glowing floor waypoint accents along central axis
        if (z % 3 === 0) {
          ctx.fillStyle = 'rgba(255, 205, 95, ' + (p * 0.9) + ')';
          ctx.beginPath();
          ctx.arc(vpX, y, 3 + p * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. GEODESIC ARCHITECTURAL DOME SKYLIGHT OVERHEAD WITH ROTATING BRONZE STRUTS
      ctx.save();
      let domeSpin = t * 0.45;
      const domeR = 400;

      // Dome ambient radiance
      let domeGlow = ctx.createRadialGradient(vpX, horizonY, 20, vpX, horizonY, domeR);
      domeGlow.addColorStop(0, 'rgba(245, 190, 85, 0.42)');
      domeGlow.addColorStop(0.5, 'rgba(20, 184, 166, 0.25)');
      domeGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = domeGlow;
      ctx.beginPath();
      ctx.ellipse(vpX, horizonY, domeR, domeR * 0.65, 0, Math.PI, 0, false);
      ctx.fill();

      // Geodesic concentric rings
      ctx.strokeStyle = 'rgba(245, 180, 75, 0.65)';
      ctx.lineWidth = 2;
      for (let arc = 60; arc <= domeR; arc += 60) {
        ctx.beginPath();
        ctx.ellipse(vpX, horizonY, arc, arc * 0.62, 0, Math.PI, 0, false);
        ctx.stroke();
      }

      // Rotating radial architectural trusses
      for (let ray = 0; ray < 14; ray++) {
        let angle = Math.PI + (ray / 13) * Math.PI + Math.sin(domeSpin + ray * 0.4) * 0.12;
        ctx.strokeStyle = ray % 2 === 0 ? 'rgba(45, 212, 191, 0.6)' : 'rgba(245, 180, 75, 0.65)';
        ctx.lineWidth = ray % 2 === 0 ? 1.8 : 2.4;
        ctx.beginPath();
        ctx.moveTo(vpX, horizonY);
        ctx.lineTo(vpX + Math.cos(angle) * domeR, horizonY + Math.sin(angle) * (domeR * 0.62));
        ctx.stroke();
      }
      ctx.restore();

      // 3. 3D SPATIAL FLOOR BEACONS GLIDING PAST IN PERSPECTIVE
      for (let n = 0; n < 18; n++) {
        let nProg = ((t * 0.6 + n / 18) % 1);
        let ny = horizonY + Math.pow(nProg, 2.1) * (h - horizonY);
        let side = n % 2 === 0 ? 1 : -1;
        let nx = vpX + side * (60 + nProg * (w * 0.45));
        let nSize = 4 + nProg * 8;

        // Spatial beacon glowing halo
        let bGrad = ctx.createRadialGradient(nx, ny, 1, nx, ny, nSize * 2.8);
        bGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        bGrad.addColorStop(0.35, 'rgba(45, 212, 191, 0.9)');
        bGrad.addColorStop(0.7, 'rgba(245, 170, 60, 0.45)');
        bGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(nx, ny, nSize * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Vertical floor guide beam
        ctx.strokeStyle = 'rgba(45, 212, 191, ' + (nProg * 0.75) + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(nx, ny - 35 * nProg);
        ctx.stroke();
      }
    `
  },

  // 4. SHOPPING PAGE HERO: Enhanced Luxury Fashion Atelier & Silk Draping (Rich Warm Mahogany/Plum)
  {
    name: 'video_brand_boutique',
    duration: 5,
    title: 'Enhanced Curated Fashion Atelier, Silk Ribbons & Couture Wardrobe',
    generator: `
      // --- LUXURY FASHION ATELIER (Rich Mahogany, Deep Burgundy & Rose Gold) ---
      let bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#2e1419');
      bg.addColorStop(0.45, '#3d1c22');
      bg.addColorStop(0.8, '#241014');
      bg.addColorStop(1, '#15080c');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Warm couture boutique ambient horizon
      let atelierGlow = ctx.createRadialGradient(w * 0.5, h * 0.45, 40, w * 0.5, h * 0.45, w * 0.65);
      atelierGlow.addColorStop(0, 'rgba(250, 160, 110, 0.45)');
      atelierGlow.addColorStop(0.4, 'rgba(215, 80, 95, 0.28)');
      atelierGlow.addColorStop(0.8, 'rgba(140, 45, 80, 0.12)');
      atelierGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = atelierGlow;
      ctx.fillRect(0, 0, w, h);

      // 1. FLOWING SILK RIBBONS WITH SATURATED BURGUNDY, MAGENTA & GOLD SATIN
      for (let r = 0; r < 5; r++) {
        ctx.save();
        ctx.beginPath();
        let yBase = h * 0.16 + r * 135;
        let flowShift = t * 190 * (r % 2 === 0 ? 1 : -1);

        ctx.moveTo(0, yBase);
        for (let x = 0; x <= w; x += 20) {
          let wave = Math.sin((x + flowShift) * 0.0055 + r * 1.6) * 85 +
                     Math.cos((x - flowShift * 0.45) * 0.0085) * 45;
          ctx.lineTo(x, yBase + wave);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        let silkGrad = ctx.createLinearGradient(0, yBase - 70, w, yBase + 180);
        if (r % 3 === 0) {
          silkGrad.addColorStop(0, 'rgba(235, 115, 95, 0.42)');
          silkGrad.addColorStop(0.5, 'rgba(255, 185, 135, 0.55)');
          silkGrad.addColorStop(1, 'rgba(180, 50, 70, 0.25)');
        } else if (r % 3 === 1) {
          silkGrad.addColorStop(0, 'rgba(210, 75, 130, 0.38)');
          silkGrad.addColorStop(0.5, 'rgba(250, 150, 190, 0.48)');
          silkGrad.addColorStop(1, 'rgba(160, 40, 110, 0.22)');
        } else {
          silkGrad.addColorStop(0, 'rgba(245, 185, 85, 0.45)');
          silkGrad.addColorStop(0.5, 'rgba(255, 220, 150, 0.58)');
          silkGrad.addColorStop(1, 'rgba(195, 115, 45, 0.28)');
        }
        ctx.fillStyle = silkGrad;
        ctx.fill();

        // Luminous silk crest edge highlight
        ctx.strokeStyle = 'rgba(255, 235, 200, 0.65)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
      }

      // 2. POLISHED BRASS & WARM TIMBER WARDROBE RAILS WITH SWINGING HANGERS
      ctx.strokeStyle = 'rgba(245, 185, 115, 0.75)';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(w * 0.08, h * 0.34);
      ctx.lineTo(w * 0.92, h * 0.34);
      ctx.stroke();

      // Rail mounting brackets
      for (let br = 0; br < 3; br++) {
        let bx = w * 0.12 + br * (w * 0.76 / 2);
        ctx.fillStyle = 'rgba(215, 155, 85, 0.9)';
        ctx.fillRect(bx - 6, 0, 12, h * 0.34);
      }

      // Swinging designer hangers along the brass rail
      for (let i = 0; i < 11; i++) {
        let hx = w * 0.14 + i * (w * 0.72 / 10);
        let sway = Math.sin(t * 3.1 + i * 0.8) * 0.24;
        ctx.save();
        ctx.translate(hx, h * 0.34);
        ctx.rotate(sway);

        // Hanger hook & triangle
        ctx.strokeStyle = 'rgba(250, 200, 130, 0.85)';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.arc(0, -15, 13, Math.PI, 0, false);
        ctx.moveTo(0, -2);
        ctx.lineTo(-34, 30);
        ctx.lineTo(34, 30);
        ctx.closePath();
        ctx.stroke();

        // Hanger gold accent sphere
        ctx.fillStyle = 'rgba(255, 240, 180, 0.95)';
        ctx.beginPath();
        ctx.arc(0, -2, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Subtle fabric silhouette suspended from hanger
        ctx.fillStyle = i % 2 === 0 ? 'rgba(215, 95, 105, 0.35)' : 'rgba(195, 140, 85, 0.35)';
        ctx.beginPath();
        ctx.moveTo(-28, 30);
        ctx.lineTo(-32, 110);
        ctx.lineTo(32, 110);
        ctx.lineTo(28, 30);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // 3. DRIFTING GOLDEN FASHION ATELIER MOTES
      for (let b = 0; b < 35; b++) {
        let bx = ((b * 163 + t * 75) % (w + 100)) - 50;
        let by = ((b * 97 + Math.sin(t * 2.2 + b) * 55 + t * 40) % h);
        let bSize = 2 + (b % 3.5);
        let bAlpha = 0.45 + Math.sin(t * 3.2 + b) * 0.35;

        let bGrad = ctx.createRadialGradient(bx, by, 0.5, bx, by, bSize * 2.6);
        bGrad.addColorStop(0, 'rgba(255, 250, 230, 0.95)');
        bGrad.addColorStop(0.4, 'rgba(245, 180, 75, ' + bAlpha + ')');
        bGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(bx, by, bSize * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    `
  }
];

let currentVideoIndex = 0;
let chromeProcess = null;
const app = express();
app.use(express.raw({ type: 'video/webm', limit: '100mb' }));

app.get('/', (req, res) => {
  const currentVideo = TARGET_HERO_VIDEOS[currentVideoIndex];
  if (!currentVideo) {
    res.send('<h1>ALL 4 TARGET HERO VIDEOS GENERATED!</h1><script>document.title="ALL_DONE";</script>');
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
    videoBitsPerSecond: 8000000
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
  const currentVideo = TARGET_HERO_VIDEOS[currentVideoIndex];
  const videoName = req.query.name;
  const webmPath = path.join(tempDir, `${videoName}.webm`);
  const finalMp4Path = path.join(publicVideosDir, `${videoName}.mp4`);

  fs.writeFileSync(webmPath, req.body);
  console.log(`[${currentVideoIndex + 1}/${TARGET_HERO_VIDEOS.length}] Received ${videoName}.webm (${(req.body.length / 1024 / 1024).toFixed(2)} MB)`);

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
      console.log(`   -> Successfully created/updated ${finalMp4Path} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    } else {
      console.error(`   -> FFmpeg error for ${videoName}: code ${code}`);
    }

    currentVideoIndex++;
    res.send('OK');

    if (currentVideoIndex >= TARGET_HERO_VIDEOS.length) {
      console.log('ALL 4 TARGET HERO VIDEOS GENERATED SUCCESSFULLY!');
      setTimeout(() => {
        if (chromeProcess) chromeProcess.kill();
        server.close();
        process.exit(0);
      }, 1500);
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`Target Hero Video Generator listening on port ${PORT}`);
  console.log(`Generating ${TARGET_HERO_VIDEOS.length} enhanced/new hero videos...`);

  chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-gpu',
    `http://localhost:${PORT}`
  ]);
});
