import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Compass,
  Play,
  Pause,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { FLOOR_LEVELS } from '../utils/mallData';
import { BrandMark } from './BrandMark';

const _raycaster = new THREE.Raycaster();
const _pointer = new THREE.Vector2();
const _lookTarget = new THREE.Vector3();

const FLOOR_HEIGHT = 5.6;
const EYE_HEIGHT = 1.78;
const MIN_Z = -96;
const MAX_Z = 10;
const START_Z = 6;
const DEFAULT_FOV = 62;
const MIN_FOV = 38;
const MAX_FOV = 74;

function detectSoftwareWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function createTerrazzoTexture(maxAniso) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ece2d3';
  ctx.fillRect(0, 0, 512, 512);

  // Architectural stone grid seams
  ctx.strokeStyle = 'rgba(130, 114, 96, 0.22)';
  ctx.lineWidth = 2;
  for (let i = 0; i <= 512; i += 128) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Subtle terrazzo speckles
  const specks = ['#d8c7b2', '#cbbba6', '#b7a491', '#f6efe4'];
  for (let i = 0; i < 650; i++) {
    ctx.fillStyle = specks[i % specks.length];
    const x = (i * 73) % 512;
    const y = (i * 137) % 512;
    const r = (i % 3) + 1;
    ctx.fillRect(x, y, r, r);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 34);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAniso;
  return tex;
}

function createShopSignTexture(brandName, category, accentHex, maxAniso) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  // Rich satin architectural fascia
  const grad = ctx.createLinearGradient(0, 0, 512, 160);
  grad.addColorStop(0, '#1e162c');
  grad.addColorStop(1, '#2f2442');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 160);

  // Crisp top & bottom accent hairline
  ctx.fillStyle = accentHex || '#f27c54';
  ctx.fillRect(0, 0, 512, 8);
  ctx.fillRect(0, 152, 512, 8);

  // Brand title
  ctx.fillStyle = '#faf5ee';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const fontSize = brandName.length > 18 ? 32 : brandName.length > 12 ? 38 : 44;
  ctx.font = `600 ${fontSize}px "Plus Jakarta Sans", Arial, sans-serif`;
  ctx.fillText(brandName, 256, 68, 468);

  // Category subtitle
  ctx.fillStyle = '#d4c8e8';
  ctx.font = '500 18px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText(category.toUpperCase(), 256, 118, 450);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAniso;
  return tex;
}

function buildShopStorefront({
  brand,
  floor,
  side,
  zPos,
  yBase,
  maxAniso,
  sharedMaterials,
  clickableMeshes
}) {
  const group = new THREE.Group();
  const xWall = side * 10.6;
  group.position.set(xWall, yBase, zPos);
  group.rotation.y = side === -1 ? Math.PI / 2 : -Math.PI / 2;

  // Storefront backing alcove box
  const alcoveW = 9.2;
  const alcoveH = 4.2;
  const alcoveD = 3.2;

  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(alcoveW, alcoveH, 0.25),
    sharedMaterials.interiorWarm
  );
  backWall.position.set(0, alcoveH / 2, -alcoveD);
  group.add(backWall);

  const floorSlab = new THREE.Mesh(
    new THREE.BoxGeometry(alcoveW, 0.14, alcoveD),
    sharedMaterials.shopFloor
  );
  floorSlab.position.set(0, 0.07, -alcoveD / 2);
  group.add(floorSlab);

  // Brass / anodized framing pillars
  const leftPillar = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, alcoveH, 0.5),
    sharedMaterials.brass
  );
  leftPillar.position.set(-alcoveW / 2 + 0.18, alcoveH / 2, -0.15);
  group.add(leftPillar);

  const rightPillar = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, alcoveH, 0.5),
    sharedMaterials.brass
  );
  rightPillar.position.set(alcoveW / 2 - 0.18, alcoveH / 2, -0.15);
  group.add(rightPillar);

  // Interior merchandise plinths & illuminated rack bars (realistic empty interior)
  const plinth1 = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.85, 1.0),
    sharedMaterials.travertine
  );
  plinth1.position.set(-1.9, 0.48, -1.6);
  group.add(plinth1);

  const plinth2 = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 1.15, 1.0),
    sharedMaterials.travertine
  );
  plinth2.position.set(1.9, 0.62, -1.8);
  group.add(plinth2);

  // Glowing interior light strip
  const coveLight = new THREE.Mesh(
    new THREE.BoxGeometry(alcoveW - 1.2, 0.12, 0.2),
    sharedMaterials.warmGlow
  );
  coveLight.position.set(0, alcoveH - 0.9, -1.5);
  group.add(coveLight);

  // Shopfront glass pane (subtle reflection, clear view inside)
  const glassPane = new THREE.Mesh(
    new THREE.PlaneGeometry(alcoveW - 0.8, alcoveH - 1.2),
    sharedMaterials.shopGlass
  );
  glassPane.position.set(0, (alcoveH - 1.1) / 2 + 0.05, -0.1);
  group.add(glassPane);

  // Crisp illuminated brand fascia signboard
  const signTex = createShopSignTexture(
    brand.name,
    brand.category,
    floor.accentColor,
    maxAniso
  );
  const signMat = new THREE.MeshStandardMaterial({
    map: signTex,
    emissive: new THREE.Color('#ffffff'),
    emissiveMap: signTex,
    emissiveIntensity: 0.45,
    roughness: 0.35,
    metalness: 0.1
  });
  const signMesh = new THREE.Mesh(new THREE.BoxGeometry(alcoveW - 0.3, 1.15, 0.28), signMat);
  signMesh.position.set(0, alcoveH - 0.58, 0.05);
  group.add(signMesh);

  // Simplified invisible proxy hitbox for fast, reliable raycasting
  const hitbox = new THREE.Mesh(
    new THREE.BoxGeometry(alcoveW, alcoveH, 1.4),
    sharedMaterials.hitbox
  );
  hitbox.position.set(0, alcoveH / 2, -0.4);
  hitbox.layers.set(1);
  hitbox.userData.shopInfo = {
    brand,
    floorLabel: floor.label,
    floorId: floor.id,
    floorIndex: FLOOR_LEVELS.findIndex((f) => f.id === floor.id),
    accentColor: floor.accentColor,
    worldFocus: new THREE.Vector3(side * 3.5, yBase + EYE_HEIGHT, zPos + 4.5),
    lookAtPoint: new THREE.Vector3(xWall, yBase + 2.1, zPos)
  };
  group.add(hitbox);
  clickableMeshes.push(hitbox);

  return { group, signMat, signTex };
}

export function MallExplorer3D({ onSelectFloorPage }) {
  const mountRef = useRef(null);
  const [activeFloorIdx, setActiveFloorIdx] = useState(0);
  const [selectedShop, setSelectedShop] = useState(null);
  const [autoWalk, setAutoWalk] = useState(true);
  const [hudCollapsed, setHudCollapsed] = useState(false);
  const [zProgress, setZProgress] = useState(0);
  const [webglFallback, setWebglFallback] = useState(false);

  // Refs synced into the animation loop without tearing down WebGL
  const controlStateRef = useRef({
    moveForward: false,
    moveBackward: false,
    turnLeft: false,
    turnRight: false,
    autoWalk: true,
    isResetting: false,
    targetFloorIdx: 0,
    targetZ: null,
    targetYaw: null,
    targetPitch: null,
    targetFov: DEFAULT_FOV
  });

  useEffect(() => {
    controlStateRef.current.autoWalk = autoWalk;
  }, [autoWalk]);

  const jumpToFloor = (idx) => {
    setActiveFloorIdx(idx);
    controlStateRef.current.isResetting = false;
    controlStateRef.current.targetFloorIdx = idx;
    controlStateRef.current.targetZ = 4;
  };

  const adjustZoom = (deltaFov) => {
    controlStateRef.current.isResetting = false;
    controlStateRef.current.targetFov = THREE.MathUtils.clamp(
      controlStateRef.current.targetFov + deltaFov,
      MIN_FOV,
      MAX_FOV
    );
  };

  const resetWalkthrough = () => {
    setActiveFloorIdx(0);
    setSelectedShop(null);
    const cs = controlStateRef.current;
    cs.moveForward = false;
    cs.moveBackward = false;
    cs.turnLeft = false;
    cs.turnRight = false;
    cs.targetFloorIdx = 0;
    cs.targetZ = START_Z;
    cs.targetYaw = 0;
    cs.targetPitch = -0.02;
    cs.targetFov = DEFAULT_FOV;
    cs.isResetting = true;
    cs.autoWalk = true;
    setAutoWalk(true);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebglFallback(true);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 620;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#e9e3f5');
    scene.fog = new THREE.FogExp2('#e9e3f5', 0.0085);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(62, width / height, 0.15, 220);
    camera.position.set(0, EYE_HEIGHT, 6);

    // 3-Point Warm/Cool Architectural Mall Lighting
    const hemiLight = new THREE.HemisphereLight('#f6f2ff', '#d6c3b0', 1.15);
    hemiLight.position.set(0, 32, -40);
    scene.add(hemiLight);

    const sunKey = new THREE.DirectionalLight('#fff2db', 1.45);
    sunKey.position.set(16, 42, 18);
    if (!isSoftwareGl) {
      sunKey.castShadow = true;
      sunKey.shadow.mapSize.set(1024, 1024);
      sunKey.shadow.camera.near = 5;
      sunKey.shadow.camera.far = 140;
      const d = 48;
      sunKey.shadow.camera.left = -d;
      sunKey.shadow.camera.right = d;
      sunKey.shadow.camera.top = d;
      sunKey.shadow.camera.bottom = -d;
      sunKey.shadow.bias = -0.0005;
    }
    scene.add(sunKey);

    const fillBack = new THREE.DirectionalLight('#c9e6ff', 0.55);
    fillBack.position.set(-18, 22, -95);
    scene.add(fillBack);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const terrazzoTex = createTerrazzoTexture(maxAniso);

    const sharedMaterials = {
      terrazzo: new THREE.MeshStandardMaterial({
        map: terrazzoTex,
        roughness: 0.28,
        metalness: 0.06
      }),
      travertine: new THREE.MeshStandardMaterial({
        color: '#dfd0bd',
        roughness: 0.45,
        metalness: 0.05
      }),
      brass: new THREE.MeshStandardMaterial({
        color: '#c9a66b',
        roughness: 0.24,
        metalness: 0.85
      }),
      chrome: new THREE.MeshStandardMaterial({
        color: '#d4dce6',
        roughness: 0.18,
        metalness: 0.92
      }),
      balconyGlass: new THREE.MeshStandardMaterial({
        color: '#c7e8f0',
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: 0.36,
        depthWrite: false
      }),
      shopGlass: new THREE.MeshStandardMaterial({
        color: '#e0f2fe',
        roughness: 0.08,
        metalness: 0.15,
        transparent: true,
        opacity: 0.22,
        depthWrite: false
      }),
      interiorWarm: new THREE.MeshStandardMaterial({
        color: '#f5eadc',
        emissive: '#ffdcb4',
        emissiveIntensity: 0.22,
        roughness: 0.7
      }),
      shopFloor: new THREE.MeshStandardMaterial({
        color: '#ccb9a2',
        roughness: 0.4
      }),
      warmGlow: new THREE.MeshStandardMaterial({
        color: '#fff6e5',
        emissive: '#ffd28a',
        emissiveIntensity: 1.35
      }),
      foliage: new THREE.MeshStandardMaterial({
        color: '#2e7d52',
        roughness: 0.68
      }),
      hitbox: new THREE.MeshBasicMaterial({ visible: false })
    };

    const disposables = [terrazzoTex, ...Object.values(sharedMaterials)];
    const clickableMeshes = [];

    // Ground floor full promenade slab
    const groundFloorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 140),
      sharedMaterials.terrazzo
    );
    groundFloorMesh.rotation.x = -Math.PI / 2;
    groundFloorMesh.position.set(0, 0, -48);
    groundFloorMesh.receiveShadow = true;
    scene.add(groundFloorMesh);

    // Central luminous inlay runner
    const runnerMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 134),
      new THREE.MeshStandardMaterial({
        color: '#f7eee2',
        roughness: 0.18,
        metalness: 0.1
      })
    );
    runnerMesh.rotation.x = -Math.PI / 2;
    runnerMesh.position.set(0, 0.02, -48);
    scene.add(runnerMesh);

    // Build upper floor gallery walkways (left & right wings overlooking central atrium void)
    const activeFloors = FLOOR_LEVELS.slice(0, 5); // Ground to Fourth Floor
    activeFloors.forEach((floor, fIdx) => {
      const yBase = fIdx * FLOOR_HEIGHT;

      if (fIdx > 0) {
        [-7.5, 7.5].forEach((xSide) => {
          const walkway = new THREE.Mesh(
            new THREE.BoxGeometry(6.4, 0.35, 136),
            sharedMaterials.travertine
          );
          walkway.position.set(xSide, yBase - 0.18, -48);
          walkway.receiveShadow = true;
          scene.add(walkway);

          // Glass atrium railing + brass handrail
          const railX = xSide > 0 ? xSide - 3.05 : xSide + 3.05;
          const glassRail = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 1.05, 136),
            sharedMaterials.balconyGlass
          );
          glassRail.position.set(railX, yBase + 0.55, -48);
          scene.add(glassRail);

          const brassTop = new THREE.Mesh(
            new THREE.BoxGeometry(0.14, 0.08, 136),
            sharedMaterials.brass
          );
          brassTop.position.set(railX, yBase + 1.1, -48);
          scene.add(brassTop);
        });
      }

      // Place each approved brand cleanly along left & right wings of its floor
      floor.brands.forEach((brand, bIdx) => {
        const side = bIdx % 2 === 0 ? -1 : 1;
        const pairIndex = Math.floor(bIdx / 2);
        const zPos = -6 - pairIndex * 18;
        const built = buildShopStorefront({
          brand,
          floor,
          side,
          zPos,
          yBase,
          maxAniso,
          sharedMaterials,
          clickableMeshes
        });
        scene.add(built.group);
        disposables.push(built.signMat, built.signTex);
      });
    });

    // Architectural Structural Columns & Overhead Skylight Ribs
    for (let z = 6; z >= -108; z -= 14) {
      [-4.6, 4.6].forEach((xCol) => {
        const col = new THREE.Mesh(
          new THREE.CylinderGeometry(0.32, 0.36, 29, 14),
          sharedMaterials.travertine
        );
        col.position.set(xCol, 14.5, z);
        scene.add(col);
      });

      // Overhead skylight arch truss
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(22, 0.45, 0.65),
        sharedMaterials.chrome
      );
      beam.position.set(0, 29.2, z);
      scene.add(beam);
    }

    // Skylight glass roof canopy
    const skylight = new THREE.Mesh(
      new THREE.PlaneGeometry(22, 140),
      new THREE.MeshStandardMaterial({
        color: '#dff4ff',
        emissive: '#ffffff',
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
      })
    );
    skylight.rotation.x = Math.PI / 2;
    skylight.position.set(0, 29.5, -48);
    scene.add(skylight);

    // End-of-corridor Atrium Monumental Wall & PVR INOX Sky Portal
    const endWall = new THREE.Mesh(
      new THREE.BoxGeometry(24, 30, 1.2),
      sharedMaterials.travertine
    );
    endWall.position.set(0, 15, -116);
    scene.add(endWall);

    // Animated Escalators (rising between floors at z = -28 and z = -72)
    const escalatorSteps = [];
    [0, 1, 2, 3].forEach((lvl) => {
      const yStart = lvl * FLOOR_HEIGHT;
      const zCenter = lvl % 2 === 0 ? -30 : -72;
      const escGroup = new THREE.Group();
      escGroup.position.set(0, yStart, zCenter);

      // Inclined stringer frame
      const len = 10.8;
      const angle = Math.atan2(FLOOR_HEIGHT, 9.2);
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(2.1, 0.45, len),
        sharedMaterials.chrome
      );
      beam.position.set(0, FLOOR_HEIGHT / 2, 0);
      beam.rotation.x = angle;
      escGroup.add(beam);

      // Side glass guards
      [-1.02, 1.02].forEach((gx) => {
        const guard = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 1.0, len),
          sharedMaterials.balconyGlass
        );
        guard.position.set(gx, FLOOR_HEIGHT / 2 + 0.6, 0);
        guard.rotation.x = angle;
        escGroup.add(guard);
      });

      // Moving escalator steps
      for (let s = 0; s < 14; s++) {
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(1.75, 0.14, 0.42),
          sharedMaterials.brass
        );
        escGroup.add(step);
        escalatorSteps.push({
          mesh: step,
          phase: s / 14,
          yStart,
          zCenter
        });
      }
      scene.add(escGroup);
    });

    // Central Panoramic Glass Elevator Shaft (x = 0, z = -50)
    const shaftGroup = new THREE.Group();
    shaftGroup.position.set(0, 0, -50);
    [-1.45, 1.45].forEach((sx) => {
      [-1.45, 1.45].forEach((sz) => {
        const rail = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 28.5, 0.14),
          sharedMaterials.chrome
        );
        rail.position.set(sx, 14.25, sz);
        shaftGroup.add(rail);
      });
    });

    const elevatorCar = new THREE.Group();
    const carBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 2.8, 2.5),
      sharedMaterials.balconyGlass
    );
    const carFloor = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.18, 2.6),
      sharedMaterials.brass
    );
    carFloor.position.y = -1.4;
    const carRoof = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.18, 2.6),
      sharedMaterials.warmGlow
    );
    carRoof.position.y = 1.4;
    elevatorCar.add(carBody, carFloor, carRoof);
    elevatorCar.position.y = 4;
    shaftGroup.add(elevatorCar);
    scene.add(shaftGroup);

    // Indoor Palm Planters along promenade
    for (let pz = 0; pz >= -98; pz -= 16) {
      [-2.8, 2.8].forEach((px) => {
        const planter = new THREE.Group();
        planter.position.set(px, 0, pz);
        const pot = new THREE.Mesh(
          new THREE.CylinderGeometry(0.55, 0.45, 0.72, 12),
          sharedMaterials.travertine
        );
        pot.position.y = 0.36;
        const crown = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.85, 0),
          sharedMaterials.foliage
        );
        crown.position.y = 1.45;
        crown.scale.set(1, 1.25, 1);
        planter.add(pot, crown);
        scene.add(planter);
      });
    }

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Camera state
    let yaw = 0;
    let pitch = -0.02;
    let targetYaw = 0;
    let targetPitch = -0.02;
    let camZ = 6;
    let camY = EYE_HEIGHT;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let movedDuringDrag = false;
    let lastRaycast = 0;

    const canvas = renderer.domElement;

    const onPointerDown = (e) => {
      isDragging = true;
      movedDuringDrag = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      controlStateRef.current.isResetting = false;
      controlStateRef.current.targetYaw = null;
      controlStateRef.current.targetPitch = null;
    };

    const onPointerMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) movedDuringDrag = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        targetYaw += dx * 0.0042;
        targetPitch = THREE.MathUtils.clamp(targetPitch + dy * 0.0032, -0.45, 0.55);
        return;
      }

      // Throttled hover raycast
      const now = performance.now();
      if (now - lastRaycast < 65) return;
      lastRaycast = now;
      const rect = canvas.getBoundingClientRect();
      _pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      _raycaster.layers.set(1);
      _raycaster.setFromCamera(_pointer, camera);
      const hits = _raycaster.intersectObjects(clickableMeshes, false);
      canvas.style.cursor = hits.length > 0 ? 'pointer' : 'grab';
    };

    const onPointerUp = (e) => {
      const wasClick = !movedDuringDrag;
      isDragging = false;
      if (!wasClick) return;

      const rect = canvas.getBoundingClientRect();
      _pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      _raycaster.layers.set(1);
      _raycaster.setFromCamera(_pointer, camera);
      const hits = _raycaster.intersectObjects(clickableMeshes, false);
      if (hits.length > 0) {
        const info = hits[0].object.userData.shopInfo;
        if (info) {
          setSelectedShop(info);
          setAutoWalk(false);
          controlStateRef.current.isResetting = false;
          controlStateRef.current.autoWalk = false;
          controlStateRef.current.targetFloorIdx = info.floorIndex;
          setActiveFloorIdx(info.floorIndex);
          controlStateRef.current.targetZ = THREE.MathUtils.clamp(
            info.worldFocus.z,
            MIN_Z,
            MAX_Z
          );
          const dx = info.lookAtPoint.x - 0;
          const dz = info.lookAtPoint.z - controlStateRef.current.targetZ;
          controlStateRef.current.targetYaw = Math.atan2(-dx, -dz);
          controlStateRef.current.targetPitch = 0.03;
        }
      }
    };

    const onWheel = (e) => {
      e.preventDefault();
      controlStateRef.current.isResetting = false;
      if (e.ctrlKey || e.metaKey) {
        controlStateRef.current.targetFov = THREE.MathUtils.clamp(
          controlStateRef.current.targetFov + e.deltaY * 0.04,
          MIN_FOV,
          MAX_FOV
        );
        return;
      }
      setAutoWalk(false);
      controlStateRef.current.autoWalk = false;
      controlStateRef.current.targetZ = null;
      camZ = THREE.MathUtils.clamp(camZ - e.deltaY * 0.035, MIN_Z, MAX_Z);
    };

    const onKeyDown = (e) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        controlStateRef.current.isResetting = false;
        controlStateRef.current.moveForward = true;
        setAutoWalk(false);
      }
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        controlStateRef.current.isResetting = false;
        controlStateRef.current.moveBackward = true;
        setAutoWalk(false);
      }
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        controlStateRef.current.isResetting = false;
        controlStateRef.current.turnLeft = true;
      }
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        controlStateRef.current.isResetting = false;
        controlStateRef.current.turnRight = true;
      }
    };

    const onKeyUp = (e) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        controlStateRef.current.moveForward = false;
      }
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        controlStateRef.current.moveBackward = false;
      }
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        controlStateRef.current.turnLeft = false;
      }
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        controlStateRef.current.turnRight = false;
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 620;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let frameId = 0;
    let mounted = true;

    function afterDraw(cb) {
      const gl = renderer.getContext();
      if (!gl || !gl.fenceSync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (!mounted) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (!mounted) return;
      const delta = Math.min(0.05, clock.getDelta());
      const elapsed = clock.getElapsedTime();
      const cs = controlStateRef.current;

      // Forward / Backward continuous navigation & smooth reset
      const walkSpeed = 7.5;
      if (cs.isResetting) {
        camZ = THREE.MathUtils.damp(camZ, START_Z, 6.0, delta);
        if (Math.abs(camZ - START_Z) < 0.08 && Math.abs(yaw) < 0.015 && Math.abs(camY - EYE_HEIGHT) < 0.05) {
          camZ = START_Z;
          camY = EYE_HEIGHT;
          yaw = 0;
          pitch = -0.02;
          targetYaw = 0;
          targetPitch = -0.02;
          cs.targetZ = null;
          cs.targetYaw = null;
          cs.targetPitch = null;
          cs.isResetting = false;
        }
      } else if (cs.moveForward) {
        cs.targetZ = null;
        camZ = THREE.MathUtils.clamp(camZ - walkSpeed * delta, MIN_Z, MAX_Z);
      } else if (cs.moveBackward) {
        cs.targetZ = null;
        camZ = THREE.MathUtils.clamp(camZ + walkSpeed * delta, MIN_Z, MAX_Z);
      } else if (cs.autoWalk) {
        cs.targetZ = null;
        camZ -= 3.2 * delta;
        if (camZ <= MIN_Z + 4) {
          camZ = MAX_Z - 2;
        }
      } else if (cs.targetZ !== null) {
        camZ = THREE.MathUtils.damp(camZ, cs.targetZ, 4.5, delta);
        if (Math.abs(camZ - cs.targetZ) < 0.08) cs.targetZ = null;
      }

      if (cs.turnLeft) targetYaw += 1.4 * delta;
      if (cs.turnRight) targetYaw -= 1.4 * delta;

      if (cs.targetYaw !== null) {
        targetYaw = THREE.MathUtils.damp(targetYaw, cs.targetYaw, 5.2, delta);
        if (Math.abs(targetYaw - cs.targetYaw) < 0.01) cs.targetYaw = null;
      }
      if (cs.targetPitch !== null) {
        targetPitch = THREE.MathUtils.damp(targetPitch, cs.targetPitch, 5.2, delta);
        if (Math.abs(targetPitch - cs.targetPitch) < 0.01) cs.targetPitch = null;
      }

      // Smooth elevator transition between floors & zoom FOV damping
      const desiredY = cs.targetFloorIdx * FLOOR_HEIGHT + EYE_HEIGHT;
      camY = THREE.MathUtils.damp(camY, desiredY, 4.8, delta);
      yaw = THREE.MathUtils.damp(yaw, targetYaw, 8.0, delta);
      pitch = THREE.MathUtils.damp(pitch, targetPitch, 8.0, delta);

      if (Math.abs(camera.fov - cs.targetFov) > 0.05) {
        camera.fov = THREE.MathUtils.damp(camera.fov, cs.targetFov, 7.0, delta);
        camera.updateProjectionMatrix();
      } else if (camera.fov !== cs.targetFov) {
        camera.fov = cs.targetFov;
        camera.updateProjectionMatrix();
      }

      // Gentle promenade camera sway when cruising (paused during reset)
      const swayX = cs.autoWalk && !cs.isResetting ? Math.sin(elapsed * 0.45) * 0.55 : 0;
      camera.position.set(swayX, camY, camZ);

      _lookTarget.set(
        camera.position.x - Math.sin(yaw) * 10,
        camera.position.y + Math.sin(pitch) * 10,
        camera.position.z - Math.cos(yaw) * 10
      );
      camera.lookAt(_lookTarget);

      // Animate continuous escalator steps & panoramic glass elevator
      const stepScroll = (elapsed * 0.22) % 1;
      for (let i = 0; i < escalatorSteps.length; i++) {
        const st = escalatorSteps[i];
        const t = (st.phase + stepScroll) % 1;
        st.mesh.position.set(0, t * FLOOR_HEIGHT, (t - 0.5) * -9.2);
      }
      elevatorCar.position.y = 2.0 + (Math.sin(elapsed * 0.35) * 0.5 + 0.5) * (FLOOR_HEIGHT * 3.8);

      const pct = Math.round(((MAX_Z - camZ) / (MAX_Z - MIN_Z)) * 100);
      setZProgress(Math.min(100, Math.max(0, pct)));

      renderer.render(scene, camera);
      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      mounted = false;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
      disposables.forEach((d) => d.dispose && d.dispose());
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
      });
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  const currentFloor = FLOOR_LEVELS[activeFloorIdx] || FLOOR_LEVELS[0];

  if (webglFallback) {
    return (
      <div className="w-full h-[640px] flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-3xl p-8 text-center">
        <div className="space-y-2 max-w-md">
          <h3 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
            3D Walkthrough Unavailable
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Your browser graphics context is unavailable. Use the Shopping and Floor Directory pages to explore all levels.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] min-h-[580px] max-h-[860px] overflow-hidden bg-[#1a1426] border-y border-[var(--border-hairline)] select-none">
      {/* Dedicated WebGL Mount Container (Zero backdrop-blur HUD inside) */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Minimal Top-Left Floor Readout + Prominent Reset Button */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2.5">
        <div className="pointer-events-none flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#181226]/90 border border-white/20 text-white shadow-lg">
          <Compass className="w-4 h-4 text-[#f27c54]" />
          <div className="text-xs">
            <p className="font-semibold tracking-wide">
              {currentFloor.label} · {currentFloor.themeTitle}
            </p>
            <p className="text-white/75 font-mono-tabular">
              Corridor Progress: {zProgress}% · Drag to Look · Click Any Storefront
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetWalkthrough}
          aria-label="Reset 3D view, zoom and camera position"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#d64e34] hover:bg-[#e45c42] border border-white/25 text-xs font-semibold text-white shadow-lg cursor-pointer whitespace-nowrap transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset View</span>
        </button>
      </div>

      {/* Selected Shop Inspector Sheet (Triggered only on click, never blocking idle view) */}
      {selectedShop && (
        <div className="absolute top-4 right-4 z-20 max-w-xs w-full rounded-2xl bg-[#1a1329]/95 border border-white/25 p-5 text-white shadow-2xl space-y-3">
          <div className="flex items-start justify-between gap-2">
            <BrandMark name={selectedShop.brand.name} size="md" />
            <button
              type="button"
              onClick={() => setSelectedShop(null)}
              aria-label="Close storefront details"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-[11px] font-mono-tabular uppercase tracking-wider text-amber-300">
              {selectedShop.floorLabel} · {selectedShop.brand.category}
            </p>
            <h3 className="font-display text-2xl font-semibold mt-0.5">
              {selectedShop.brand.name}
            </h3>
            <p className="text-xs text-stone-200 mt-1.5 leading-relaxed">
              {selectedShop.brand.highlight}
            </p>
          </div>
          {onSelectFloorPage && (
            <button
              type="button"
              onClick={() => onSelectFloorPage(selectedShop.floorId)}
              className="w-full py-2 rounded-lg text-xs font-semibold bg-[#f27c54] text-white hover:opacity-95 cursor-pointer"
            >
              Open Full Floor Page
            </button>
          )}
        </div>
      )}

      {/* Unified Collapsible Bottom Control Dock (Zero Viewport Occlusion, No backdrop-filter) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94vw] max-w-[960px] flex flex-col items-center">
        <button
          type="button"
          onClick={() => setHudCollapsed((c) => !c)}
          className="mb-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-t-xl bg-[#181226]/92 border border-white/20 text-[11px] font-medium text-white cursor-pointer"
        >
          {hudCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Show Walk Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Hide Controls</span>
            </>
          )}
        </button>

        {!hudCollapsed && (
          <div className="w-full rounded-2xl bg-[#181226]/94 border border-white/20 px-4 py-3 text-white shadow-2xl flex flex-wrap items-center justify-between gap-3">
            {/* Walk, Zoom & Reset Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onPointerDown={() => {
                  controlStateRef.current.isResetting = false;
                  setAutoWalk(false);
                  controlStateRef.current.moveForward = true;
                }}
                onPointerUp={() => {
                  controlStateRef.current.moveForward = false;
                }}
                onPointerLeave={() => {
                  controlStateRef.current.moveForward = false;
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#d64e34] hover:bg-[#e15c42] text-xs font-semibold cursor-pointer whitespace-nowrap"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Walk Forward</span>
              </button>

              <button
                type="button"
                onPointerDown={() => {
                  controlStateRef.current.isResetting = false;
                  setAutoWalk(false);
                  controlStateRef.current.moveBackward = true;
                }}
                onPointerUp={() => {
                  controlStateRef.current.moveBackward = false;
                }}
                onPointerLeave={() => {
                  controlStateRef.current.moveBackward = false;
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/14 hover:bg-white/22 text-xs font-medium cursor-pointer whitespace-nowrap"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Walk Back</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  controlStateRef.current.isResetting = false;
                  setAutoWalk((w) => !w);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer whitespace-nowrap ${
                  autoWalk ? 'bg-[#0c8a7b] text-white' : 'bg-white/14 text-white/90'
                }`}
              >
                {autoWalk ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{autoWalk ? 'Auto-Walk On' : 'Auto-Walk'}</span>
              </button>

              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => adjustZoom(-6)}
                  aria-label="Zoom in"
                  className="p-1.5 rounded-lg hover:bg-white/15 cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => adjustZoom(6)}
                  aria-label="Zoom out"
                  className="p-1.5 rounded-lg hover:bg-white/15 cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={resetWalkthrough}
                aria-label="Reset camera to mall entrance"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/90 hover:bg-amber-400 text-[#181226] text-xs font-bold cursor-pointer whitespace-nowrap transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Floor Elevator Selector */}
            <div className="flex items-center gap-1 bg-white/8 p-1 rounded-xl">
              {FLOOR_LEVELS.slice(0, 5).map((fl, idx) => (
                <button
                  key={fl.id}
                  type="button"
                  onClick={() => jumpToFloor(idx)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono-tabular font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    activeFloorIdx === idx
                      ? 'bg-white text-[#181226]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {fl.shortLabel}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
