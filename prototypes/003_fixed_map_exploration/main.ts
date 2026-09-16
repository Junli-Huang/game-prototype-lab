import './style.css';

type Mode = 'fixed' | 'shortcut';
type KeyCondition = 'no-key' | 'with-key';
type GateOpenedBy = 'Near-side Key' | 'Far-side Unlock' | 'Never';
type Point = { x: number; y: number };
type Rect = { x: number; y: number; w: number; h: number };

const canvas = document.querySelector<HTMLCanvasElement>('#world')!;
const context = canvas.getContext('2d')!;
const runElement = document.querySelector<HTMLElement>('#run')!;
const targetElement = document.querySelector<HTMLElement>('#target')!;
const timerElement = document.querySelector<HTMLElement>('#timer')!;
const experimentElement = document.querySelector<HTMLElement>('#experiment')!;
const ruleElement = document.querySelector<HTMLElement>('#rule')!;
const messageElement = document.querySelector<HTMLElement>('#message')!;
const promptElement = document.querySelector<HTMLElement>('#prompt')!;
const summaryElement = document.querySelector<HTMLElement>('#summary')!;
const summaryTitle = document.querySelector<HTMLElement>('#summary-title')!;
const timesElement = document.querySelector<HTMLOListElement>('#times')!;
const shortcutResult = document.querySelector<HTMLElement>('#shortcut-result')!;
const reflectionElement = document.querySelector<HTMLElement>('#reflection')!;
const conditionsElement = document.querySelector<HTMLElement>('#conditions')!;
const keyStateElement = document.querySelector<HTMLElement>('#key-state')!;
const keyCountElement = document.querySelector<HTMLElement>('#key-count')!;

const WORLD = { w: 1600, h: 1000 };
const PLAYER_RADIUS = 15;
const SPEED = 90;
const start: Point = { x: 180, y: 820 };
const targets = [
  { name: 'A · Amber Garden', short: 'A', x: 260, y: 205, color: '#e5b34f' },
  { name: 'B · Blue Reservoir', short: 'B', x: 1300, y: 205, color: '#65bada' },
  { name: 'C · Crimson Yard', short: 'C', x: 1160, y: 735, color: '#d96f65' },
  { name: 'Home', short: 'H', x: start.x, y: start.y, color: '#8fd0a1' },
] as const;

// Fixed, hand-authored collision geometry shared by both modes.
const walls: Rect[] = [
  { x: 0, y: 0, w: 1600, h: 55 }, { x: 0, y: 945, w: 1600, h: 55 },
  { x: 0, y: 0, w: 55, h: 1000 }, { x: 1545, y: 0, w: 55, h: 1000 },
  { x: 760, y: 120, w: 48, h: 535 }, { x: 760, y: 755, w: 48, h: 125 },
  { x: 105, y: 455, w: 485, h: 48 },
  { x: 420, y: 165, w: 48, h: 190 },
  { x: 215, y: 610, w: 360, h: 48 },
  { x: 925, y: 395, w: 465, h: 48 },
  { x: 1035, y: 590, w: 48, h: 110 },
  { x: 1280, y: 520, w: 210, h: 48 },
  { x: 1370, y: 690, w: 48, h: 190 },
  { x: 808, y: 820, w: 650, h: 40 },
  // A tempting dead-end spur near the upper route.
  { x: 575, y: 250, w: 145, h: 42 }, { x: 575, y: 250, w: 42, h: 145 },
];
const gate: Rect = { x: 760, y: 655, w: 48, h: 100 };
const landmark = { x: 875, y: 505, radius: 74 };

let mode: Mode = 'fixed';
let keyCondition: KeyCondition = 'no-key';
const qaGateSide = new URLSearchParams(location.search).get('qa');
const qaStart: Point = qaGateSide === 'gate-near'
  ? { x: gate.x - 70, y: gate.y + gate.h / 2 }
  : qaGateSide === 'gate-far'
    ? { x: gate.x + gate.w + 70, y: gate.y + gate.h / 2 }
    : start;
let player: Point = { ...qaStart };
let run = 1;
let targetIndex = 0;
let runStartedAt = performance.now();
let runTimes: number[] = [];
let shortcutOpen = false;
let shortcutUsedLater = false;
let shortcutKey = 0;
let keyUsed = false;
let gateOpenedBy: GateOpenedBy = 'Never';
let finished = false;
let lastTime = performance.now();
let messageUntil = 0;
let previousPlayerX = player.x;
const keys = new Set<string>();

function collides(x: number, y: number): boolean {
  const activeWalls = mode === 'fixed' || !shortcutOpen ? [...walls, gate] : walls;
  return activeWalls.some((wall) =>
    x + PLAYER_RADIUS > wall.x && x - PLAYER_RADIUS < wall.x + wall.w &&
    y + PLAYER_RADIUS > wall.y && y - PLAYER_RADIUS < wall.y + wall.h,
  ) || Math.hypot(x - landmark.x, y - landmark.y) < landmark.radius + PLAYER_RADIUS;
}

function setMessage(text: string, duration = 1800): void {
  messageElement.textContent = text;
  messageUntil = performance.now() + duration;
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${(seconds % 60).toFixed(1).padStart(4, '0')}`;
}

function resetSession(): void {
  player = { ...qaStart };
  previousPlayerX = player.x;
  run = 1;
  targetIndex = 0;
  runTimes = [];
  shortcutOpen = false;
  shortcutUsedLater = false;
  shortcutKey = mode === 'shortcut' && keyCondition === 'with-key' ? 1 : 0;
  keyUsed = false;
  gateOpenedBy = 'Never';
  finished = false;
  runStartedAt = performance.now();
  summaryElement.hidden = true;
  promptElement.hidden = true;
  messageElement.textContent = '';
  updateHud();
  canvas.focus();
}

function setMode(nextMode: Mode): void {
  mode = nextMode;
  document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((button) => {
    button.classList.toggle('selected', button.dataset.mode === mode);
  });
  experimentElement.textContent = mode === 'fixed'
    ? 'EXP-004 Fixed Map Exploration'
    : 'EXP-006 Shortcut Unlocking';
  ruleElement.textContent = mode === 'fixed'
    ? '同一固定地图 · A → B → C → Home · 无捷径'
    : keyCondition === 'with-key'
      ? '同一固定地图 · 持有一把起始钥匙，也可保留至远端开门'
      : '同一固定地图 · 远端可开启一条捷径';
  conditionsElement.hidden = mode !== 'shortcut';
  keyStateElement.hidden = mode !== 'shortcut';
  resetSession();
}

function setKeyCondition(nextCondition: KeyCondition): void {
  keyCondition = nextCondition;
  document.querySelectorAll<HTMLButtonElement>('[data-condition]').forEach((button) => {
    button.classList.toggle('selected', button.dataset.condition === keyCondition);
  });
  ruleElement.textContent = keyCondition === 'with-key'
    ? '同一固定地图 · 持有一把起始钥匙，也可保留至远端开门'
    : '同一固定地图 · 远端可开启一条捷径';
  resetSession();
}

function updateHud(): void {
  runElement.textContent = `${run} / 3`;
  targetElement.textContent = targets[targetIndex].name;
  keyCountElement.textContent = String(shortcutKey);
}

function completeRun(now: number): void {
  runTimes.push((now - runStartedAt) / 1000);
  if (run === 3) {
    finished = true;
    showSummary();
    return;
  }
  run += 1;
  player = { ...start };
  previousPlayerX = player.x;
  targetIndex = 0;
  runStartedAt = now;
  setMessage(`Run ${run - 1} complete · Run ${run} begins`, 2200);
  updateHud();
}

function checkTarget(now: number): void {
  const target = targets[targetIndex];
  if (Math.hypot(player.x - target.x, player.y - target.y) > 35) return;
  if (targetIndex < targets.length - 1) {
    setMessage(`${target.short} reached · Next: ${targets[targetIndex + 1].name}`);
    targetIndex += 1;
    updateHud();
  } else {
    completeRun(now);
  }
}

function canOpenShortcut(): boolean {
  return mode !== 'fixed' && !shortcutOpen && player.x > gate.x + gate.w &&
    player.x < gate.x + gate.w + 120 && player.y > gate.y - 45 && player.y < gate.y + gate.h + 45;
}

function isNearShortcutSide(): boolean {
  return mode !== 'fixed' && !shortcutOpen && player.x < gate.x &&
    player.x > gate.x - 120 && player.y > gate.y - 45 && player.y < gate.y + gate.h + 45;
}

function updateShortcutPrompt(): void {
  if (canOpenShortcut()) {
    promptElement.textContent = '[E] Unlock Shortcut';
    promptElement.hidden = false;
    return;
  }
  if (isNearShortcutSide()) {
    promptElement.textContent = shortcutKey > 0
      ? '[E] Use Key — Unlock Shortcut'
      : 'Locked from this side';
    promptElement.hidden = false;
    return;
  }
  promptElement.hidden = true;
}

function openShortcut(): void {
  if (canOpenShortcut()) {
    gateOpenedBy = 'Far-side Unlock';
  } else if (mode === 'shortcut' && shortcutKey > 0 && isNearShortcutSide()) {
    shortcutKey = 0;
    keyUsed = true;
    gateOpenedBy = 'Near-side Key';
    updateHud();
  } else {
    return;
  }
  shortcutOpen = true;
  promptElement.hidden = true;
  setMessage('Shortcut opened · This connection stays open for Runs 2 and 3', 3000);
}

function showSummary(): void {
  summaryTitle.textContent = mode === 'fixed'
    ? 'EXP-004 · Fixed Map Exploration'
    : 'EXP-006 · Shortcut Unlocking';
  timesElement.replaceChildren(...runTimes.map((seconds, index) => {
    const item = document.createElement('li');
    item.textContent = `Run ${index + 1}: ${formatTime(seconds)}`;
    return item;
  }));
  shortcutResult.hidden = mode === 'fixed';
  shortcutResult.textContent = `Test Condition: ${keyCondition === 'with-key' ? 'Start With Key' : 'No Key'} · EXP-050 comparison · Key used: ${keyUsed ? 'Yes' : 'No'} · First opened: ${gateOpenedBy} · Used in Run 2/3: ${shortcutUsedLater ? 'Yes' : 'No'}`;
  reflectionElement.textContent = mode === 'fixed'
    ? '回想一下：后两次路线是否更熟悉、更有把握？哪里开始不再犹豫？'
    : keyCondition === 'with-key'
      ? '回想一下：持有钥匙是否让你主动提前开门，并改变路线规划？'
      : '回想一下：开门时是否产生“这里居然通回来了”的空间认识？后两次是否主动使用了它？';
  summaryElement.hidden = false;
}

function update(dt: number, now: number): void {
  if (finished) return;
  let dx = 0;
  let dy = 0;
  if (keys.has('KeyA') || keys.has('ArrowLeft')) dx -= 1;
  if (keys.has('KeyD') || keys.has('ArrowRight')) dx += 1;
  if (keys.has('KeyW') || keys.has('ArrowUp')) dy -= 1;
  if (keys.has('KeyS') || keys.has('ArrowDown')) dy += 1;
  if (dx || dy) {
    const length = Math.hypot(dx, dy);
    dx = dx / length * SPEED * dt;
    dy = dy / length * SPEED * dt;
    const nextX = player.x + dx;
    const nextY = player.y + dy;
    if (!collides(nextX, player.y)) player.x = nextX;
    if (!collides(player.x, nextY)) player.y = nextY;
  }
  if (mode !== 'fixed' && shortcutOpen && run > 1 &&
      player.y > gate.y - 20 && player.y < gate.y + gate.h + 20 &&
      player.x > gate.x - 20 && player.x < gate.x + gate.w + 20) {
    shortcutUsedLater = true;
  }
  previousPlayerX = player.x;
  updateShortcutPrompt();
  checkTarget(now);
  timerElement.textContent = formatTime((now - runStartedAt) / 1000);
  if (messageElement.textContent && now > messageUntil) messageElement.textContent = '';
}

function resizeCanvas(): void {
  const ratio = Math.min(devicePixelRatio, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function draw(now: number): void {
  const viewWidth = canvas.clientWidth;
  const viewHeight = canvas.clientHeight;
  const cameraX = Math.max(0, Math.min(WORLD.w - viewWidth, player.x - viewWidth / 2));
  const cameraY = Math.max(0, Math.min(WORLD.h - viewHeight, player.y - viewHeight / 2));
  context.clearRect(0, 0, viewWidth, viewHeight);
  context.save();
  context.translate(-cameraX, -cameraY);

  context.fillStyle = '#263330';
  context.fillRect(0, 0, WORLD.w, WORLD.h);
  context.strokeStyle = '#30423e';
  context.lineWidth = 1;
  for (let x = 0; x <= WORLD.w; x += 50) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, WORLD.h); context.stroke(); }
  for (let y = 0; y <= WORLD.h; y += 50) { context.beginPath(); context.moveTo(0, y); context.lineTo(WORLD.w, y); context.stroke(); }

  // Local identities: each area is readable without a route marker.
  context.fillStyle = '#604f2c'; context.fillRect(90, 105, 300, 200);
  context.fillStyle = '#284c5a'; context.fillRect(1180, 105, 280, 210);
  context.fillStyle = '#58312f'; context.fillRect(1100, 650, 345, 225);
  context.fillStyle = '#2f523b'; context.fillRect(85, 735, 300, 155);

  context.fillStyle = '#111817';
  for (const wall of walls) context.fillRect(wall.x, wall.y, wall.w, wall.h);
  context.strokeStyle = '#52635e'; context.lineWidth = 3;
  for (const wall of walls) context.strokeRect(wall.x, wall.y, wall.w, wall.h);

  // The central observatory is recognizable from several approaches and blocks movement.
  context.beginPath(); context.arc(landmark.x, landmark.y, landmark.radius, 0, Math.PI * 2);
  context.fillStyle = '#56615e'; context.fill(); context.strokeStyle = '#aab3aa'; context.lineWidth = 8; context.stroke();
  context.beginPath(); context.arc(landmark.x, landmark.y, 26, 0, Math.PI * 2);
  context.fillStyle = '#d4c587'; context.fill();
  context.fillStyle = '#d9ddd7'; context.font = '600 13px system-ui'; context.textAlign = 'center';
  context.fillText('OLD OBSERVATORY', landmark.x, landmark.y + 105);

  const gateClosed = mode === 'fixed' || !shortcutOpen;
  if (gateClosed) {
    context.fillStyle = mode === 'fixed' ? '#3f4745' : '#8d603c';
    context.fillRect(gate.x, gate.y, gate.w, gate.h);
    context.strokeStyle = mode === 'fixed' ? '#66716e' : '#e1ad69'; context.lineWidth = 5;
    for (let y = gate.y + 12; y < gate.y + gate.h; y += 18) {
      context.beginPath(); context.moveTo(gate.x + 5, y); context.lineTo(gate.x + gate.w - 5, y); context.stroke();
    }
  } else {
    context.strokeStyle = '#8ed0a1'; context.lineWidth = 4;
    context.strokeRect(gate.x + 4, gate.y + 4, gate.w - 8, gate.h - 8);
    context.fillStyle = '#9bd8ad'; context.fillText('OPEN', gate.x + 24, gate.y - 10);
  }
  context.fillStyle = '#bbc5c0'; context.font = '12px system-ui';
  context.fillText(mode === 'fixed' ? 'SEALED PASSAGE' : 'SHORTCUT GATE', gate.x + 24, gate.y + gate.h + 20);

  for (let index = 0; index < targets.length; index += 1) {
    const target = targets[index];
    const active = index === targetIndex;
    context.beginPath(); context.arc(target.x, target.y, active ? 29 + Math.sin(now / 180) * 3 : 25, 0, Math.PI * 2);
    context.fillStyle = target.color; context.globalAlpha = active ? 1 : .6; context.fill(); context.globalAlpha = 1;
    context.fillStyle = '#17201e'; context.font = '700 18px system-ui'; context.fillText(target.short, target.x, target.y + 6);
    context.fillStyle = '#f0eadf'; context.font = '600 12px system-ui'; context.fillText(target.name, target.x, target.y + 48);
  }

  context.beginPath(); context.arc(player.x, player.y, PLAYER_RADIUS, 0, Math.PI * 2);
  context.fillStyle = '#f4ede0'; context.fill(); context.strokeStyle = '#78c5b7'; context.lineWidth = 4; context.stroke();
  context.beginPath(); context.moveTo(player.x, player.y - 13); context.lineTo(player.x - 6, player.y); context.lineTo(player.x + 6, player.y); context.closePath();
  context.fillStyle = '#315e57'; context.fill();
  context.restore();
}

function frame(now: number): void {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  update(dt, now);
  draw(now);
  requestAnimationFrame(frame);
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) event.preventDefault();
  keys.add(event.code);
  if (event.code === 'KeyE') openShortcut();
  if (event.code === 'KeyR') resetSession();
});
window.addEventListener('keyup', (event) => keys.delete(event.code));
window.addEventListener('blur', () => keys.clear());
document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((button) => {
  button.addEventListener('click', () => setMode(button.dataset.mode as Mode));
});
document.querySelectorAll<HTMLButtonElement>('[data-condition]').forEach((button) => {
  button.addEventListener('click', () => setKeyCondition(button.dataset.condition as KeyCondition));
});
document.querySelector<HTMLButtonElement>('#restart')!.addEventListener('click', resetSession);
document.querySelector<HTMLButtonElement>('#summary-restart')!.addEventListener('click', resetSession);
canvas.addEventListener('pointerdown', () => canvas.focus());

resizeCanvas();
resetSession();
requestAnimationFrame(frame);
