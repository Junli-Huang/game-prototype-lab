import * as THREE from 'three';
import type { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';
import './style.css';
import { state, tick, attack, rest, restart, nearCamp, CAMP, END, SPAWNS, PLAYER_HP, type Pawn } from './simulation';

const canvas = document.querySelector<HTMLCanvasElement>('#world')!;
const host = document.querySelector<HTMLElement>('#scene')!;
const hp = document.querySelector<HTMLElement>('#hp')!;
const hearts = document.querySelector<HTMLElement>('#hearts')!;
const alive = document.querySelector<HTMLElement>('#alive')!;
const message = document.querySelector<HTMLElement>('#message')!;
const prompt = document.querySelector<HTMLElement>('#camp-prompt')!;
const route = document.querySelector<HTMLElement>('#route')!;

async function start() {
  let renderer: THREE.WebGLRenderer | SVGRenderer;
  let surface: HTMLCanvasElement | SVGElement = canvas;
  const context = canvas.getContext('webgl2', { antialias: true });
  if (context) {
    renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  } else {
    // Same 3D geometry and camera, only for browsers without a WebGL context.
    const { SVGRenderer } = await import('three/addons/renderers/SVGRenderer.js');
    renderer = new SVGRenderer(); renderer.setPrecision(2);
    surface = renderer.domElement;
    surface.id = 'world'; surface.setAttribute('tabindex', '0');
    surface.setAttribute('aria-label', canvas.getAttribute('aria-label')!);
    canvas.replaceWith(surface);
    document.querySelector<HTMLElement>('#render-note')!.hidden = false;
  }
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#b5b9ac');
  const camera = new THREE.OrthographicCamera(-12, 12, 11, -11, 0.1, 100);
  camera.position.set(0, 27, 21); camera.lookAt(0, 0, -0.7);
  scene.add(context ? new THREE.HemisphereLight('#e6f1e3', '#6e6553', 2.4) : new THREE.AmbientLight('#e6f1e3', 0.65));
  const sun = new THREE.DirectionalLight('#ffe4b2', context ? 3.2 : 0.85);
  sun.position.set(-9, 20, 8); sun.castShadow = true;
  Object.assign(sun.shadow.camera, { left: -15, right: 15, top: 20, bottom: -20, near: 1, far: 60 });
  sun.shadow.mapSize.set(2048, 2048); sun.shadow.normalBias = 0.03; scene.add(sun);
  const material = (color: string) => new THREE.MeshStandardMaterial({ color, roughness: 1, flatShading: true });
  const soil = material('#847d62'), path = material('#b2a281'), rockMat = material('#7a8073'), bark = material('#615845');
  function mesh(geometry: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = scene) {
    const object = new THREE.Mesh(geometry, mat); object.position.set(x, y, z); object.castShadow = true; object.receiveShadow = true; parent.add(object); return object;
  }
  mesh(new THREE.BoxGeometry(8.5, 0.75, 28.5), soil, 0, -0.43, -0.5).renderOrder = -2;
  mesh(new THREE.BoxGeometry(5.9, 0.06, 26.5), path, 0, -0.02, -0.5).renderOrder = -1;
  // These edge stones mark the simple walkable strip; scenery stays outside it.
  for (let i = 0; i < 26; i++) {
    for (const side of [-1, 1]) {
      const stone = mesh(new THREE.DodecahedronGeometry(0.43 + (i % 3) * 0.05, 0), rockMat, side * 3.23, 0.17, 12.2 - i);
      stone.scale.set(0.85, 0.55, 1); stone.rotation.y = i * 1.7;
    }
  }
  for (const z of [6.5, 1, -5, -9.5]) {
    for (const side of [-1, 1]) {
      const x = side * 3.8;
      const trunk = mesh(new THREE.CylinderGeometry(0.08, 0.17, 1.7, 5), bark, x, 0.75, z); trunk.rotation.z = side * 0.15;
      const branch = mesh(new THREE.CylinderGeometry(0.025, 0.07, 0.85, 4), bark, x - side * 0.22, 1.1, z); branch.rotation.z = side * 0.8;
    }
  }
  for (let i = 0; i < 22; i++) {
    const tile = mesh(new THREE.CylinderGeometry(0.4, 0.46, 0.05, 5), material(i % 2 ? '#aa997b' : '#bcae8d'), Math.sin(i * 1.9) * 1.3, 0.04, 10.2 - i);
    tile.scale.x = 1.5; tile.rotation.y = i;
  }
  const fire = new THREE.Group(); fire.position.set(CAMP.x, 0, CAMP.z); scene.add(fire);
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    mesh(new THREE.DodecahedronGeometry(0.25, 0), rockMat, Math.sin(a) * 0.7, 0.12, Math.cos(a) * 0.7, fire).scale.y = 0.7;
  }
  for (const angle of [-0.7, 0.7]) {
    const log = mesh(new THREE.CylinderGeometry(0.12, 0.15, 1.1, 6), bark, 0, 0.16, 0, fire);
    log.rotation.set(Math.PI / 2, 0, angle);
  }
  const flame = mesh(new THREE.ConeGeometry(0.4, 1.15, 5), new THREE.MeshBasicMaterial({ color: '#ee7f37' }), 0, 0.75, 0, fire);
  mesh(new THREE.ConeGeometry(0.23, 0.8, 5), new THREE.MeshBasicMaterial({ color: '#ffdd83' }), 0, 0.57, 0.13, fire);
  const glow = new THREE.PointLight('#ff9747', context ? 9 : 0, 5, 2); glow.position.set(0, 1.3, 0); fire.add(glow);
  const restRing = mesh(new THREE.RingGeometry(1.25, 1.35, 40), new THREE.MeshBasicMaterial({ color: '#f6d294', transparent: true, opacity: 0.45, side: THREE.DoubleSide }), CAMP.x, 0.06, CAMP.z);
  restRing.rotation.x = -Math.PI / 2;
  mesh(new THREE.CylinderGeometry(0.85, 1.1, 0.22, 6), rockMat, END.x, 0.1, END.z);
  const endMat = new THREE.MeshStandardMaterial({ color: '#acd8be', emissive: '#457c5e', emissiveIntensity: 0.5, flatShading: true });
  mesh(new THREE.BoxGeometry(0.65, 1.8, 0.5), endMat, END.x, 1, END.z).rotation.z = -0.06;
  mesh(new THREE.BoxGeometry(0.1, 0.9, 0.06), new THREE.MeshBasicMaterial({ color: '#ddf7c7' }), END.x, 1.15, END.z + 0.27);

  function createPawn(player: boolean) {
    const root = new THREE.Group(); scene.add(root);
    const body = new THREE.Group(); root.add(body);
    const coat = material(player ? '#397b92' : '#a35942');
    mesh(new THREE.CylinderGeometry(0.27, 0.42, 0.75, 6), coat, 0, 0.5, 0, body);
    mesh(new THREE.IcosahedronGeometry(0.28, 0), material(player ? '#e6cfaa' : '#b4a180'), 0, 1.08, 0, body);
    // Face and a forward-pointing arm make facing visible from the fixed camera.
    mesh(new THREE.BoxGeometry(0.24, 0.09, 0.09), material('#343a36'), 0, 1.09, 0.23, body);
    mesh(new THREE.BoxGeometry(0.13, 0.14, 0.5), coat, 0.32, 0.63, 0.22, body);
    mesh(new THREE.CylinderGeometry(0.4, 0.43, 0.1, 12), material(player ? '#dcebdc' : '#563e31'), 0, 0.08, 0, body);
    const dots = [0, 1].map(i => mesh(new THREE.SphereGeometry(0.07, 6, 4), new THREE.MeshBasicMaterial({ color: '#ffe4ac' }), (i - 0.5) * 0.22, 1.55, 0, root));
    dots.forEach(d => d.visible = !player);
    return { root, body, coat, dots };
  }
  const playerView = createPawn(true), enemyViews = SPAWNS.map(() => createPawn(false));
  function drawPawn(view: ReturnType<typeof createPawn>, p: Pawn, time: number, isPlayer: boolean) {
    view.root.visible = p.hp > 0 || p.deadFor < 1.5;
    view.root.position.set(p.x, 0, p.z); view.root.rotation.y = p.facing;
    const bump = Math.sin(Math.max(0, p.swing) / 0.22 * Math.PI) * 0.28;
    view.body.position.set(0, p.moving ? Math.abs(Math.sin(time * 11)) * 0.07 : 0, bump - (p.hit > 0 ? 0.13 : 0));
    view.body.rotation.set(p.hp === 0 ? -Math.min(1, p.deadFor / 0.3) * Math.PI / 2 : (p.hit > 0 ? -0.25 : p.moving ? 0.1 : 0) + bump, 0, p.moving ? Math.sin(time * 11) * 0.11 : 0);
    view.coat.color.set(p.hit > 0 ? '#f3d3b9' : isPlayer ? '#397b92' : '#a35942');
    view.dots.forEach((d, i) => { d.visible = !isPlayer && p.hp > i; });
  }
  function resize() {
    const w = host.clientWidth, h = host.clientHeight, aspect = w / h;
    // Fit the entire route: no hidden destination or camera controls to learn.
    const halfHeight = Math.max(11.5, 5.6 / aspect);
    camera.left = -halfHeight * aspect; camera.right = halfHeight * aspect;
    camera.top = halfHeight; camera.bottom = -halfHeight; camera.updateProjectionMatrix(); renderer.setSize(w, h);
  }
  new ResizeObserver(resize).observe(host); resize();
  const keys = new Set<string>();
  let mouseAttack = false;
  const clearInput = () => { keys.clear(); mouseAttack = false; };
  window.addEventListener('keydown', event => {
    if ((event.target as HTMLElement)?.closest('button, a')) return;
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'KeyE', 'KeyR', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) event.preventDefault();
    keys.add(event.code);
    if (!event.repeat && event.code === 'Space') attack();
    if (!event.repeat && event.code === 'KeyE') rest();
    if (!event.repeat && event.code === 'KeyR') { clearInput(); restart(); }
  });
  window.addEventListener('keyup', event => keys.delete(event.code));
  window.addEventListener('blur', clearInput);
  document.addEventListener('visibilitychange', clearInput);
  surface.addEventListener('pointerdown', event => { const pointer = event as PointerEvent; if (pointer.button === 0) { surface.focus(); mouseAttack = true; attack(); surface.setPointerCapture(pointer.pointerId); } });
  surface.addEventListener('pointerup', () => { mouseAttack = false; });
  surface.addEventListener('pointercancel', clearInput);
  surface.addEventListener('lostpointercapture', () => { mouseAttack = false; });
  document.querySelector('#restart')!.addEventListener('click', () => { clearInput(); restart(); surface.focus(); });
  let last = performance.now();
  function frame(now: number) {
    const dt = Math.min((now - last) / 1000, 0.04); last = now;
    {
      const dx = Number(keys.has('KeyD') || keys.has('ArrowRight')) - Number(keys.has('KeyA') || keys.has('ArrowLeft'));
      const dz = Number(keys.has('KeyS') || keys.has('ArrowDown')) - Number(keys.has('KeyW') || keys.has('ArrowUp'));
      tick(dt, dx, dz);
      if (keys.has('Space') || mouseAttack) attack();
    }
    const time = now / 1000;
    drawPawn(playerView, state.player, time, true);
    state.enemies.forEach((e, i) => drawPawn(enemyViews[i], e, time + i, false));
    flame.scale.set(1 + state.firePulse * 0.5, 1 + Math.sin(time * 7) * 0.12 + state.firePulse * 0.6, 1);
    flame.rotation.y = time * 0.4; glow.intensity = context ? 9 + Math.sin(time * 9) + state.firePulse * 18 : 0;
    restRing.scale.setScalar(1 + state.firePulse * 0.4);
    hp.textContent = `${state.player.hp} / ${PLAYER_HP}`;
    hp.classList.toggle('low', state.player.hp <= 2);
    hearts.textContent = Array.from({ length: PLAYER_HP }, (_, i) => i < state.player.hp ? '●' : '○').join(' ');
    alive.textContent = `${state.enemies.filter(e => e.hp > 0).length} / ${SPAWNS.length}`;
    message.textContent = state.messageFor > 0 ? state.message : '';
    prompt.hidden = !nearCamp() || state.player.hp === 0;
    route.hidden = !state.cleared;
    renderer.render(scene, camera); requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
start().catch(error => { prompt.hidden = true; document.querySelector<HTMLElement>('#unavailable')!.hidden = false; console.error(error); });
