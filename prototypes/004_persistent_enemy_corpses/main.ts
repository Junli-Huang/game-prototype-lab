import './style.css';
import playerUrl from './assets/player_idle.svg';
import slashUrl from './assets/player_attack_slash.svg';
import scoutAliveUrl from './assets/enemy_scout_alive.svg';
import scoutDeadUrl from './assets/enemy_scout_dead.svg';
import bruteAliveUrl from './assets/enemy_brute_alive.svg';
import bruteDeadUrl from './assets/enemy_brute_dead.svg';

type Condition = 'clean' | 'persistent';
type EnemyType = 'scout' | 'brute';
type Point = { x: number; y: number };
type Enemy = Point & { id: number; type: EnemyType; hp: number; alive: boolean; deathAt: number };
type Rect = { x: number; y: number; w: number; h: number };

const canvas = document.querySelector<HTMLCanvasElement>('#world')!;
const context = canvas.getContext('2d')!;
const conditionName = document.querySelector<HTMLElement>('#condition-name')!;
const defeatedElement = document.querySelector<HTMLElement>('#defeated')!;
const objectiveElement = document.querySelector<HTMLElement>('#objective')!;
const revisitedElement = document.querySelector<HTMLElement>('#revisited')!;
const messageElement = document.querySelector<HTMLElement>('#message')!;
const summaryElement = document.querySelector<HTMLElement>('#summary')!;
const summaryTitle = document.querySelector<HTMLElement>('#summary-title')!;
const summaryData = document.querySelector<HTMLElement>('#summary-data')!;
const reflection = document.querySelector<HTMLElement>('#reflection')!;

const WORLD = { w: 1120, h: 680 };
const PLAYER_RADIUS = 18;
const SPEED = 190;
const ATTACK_RADIUS = 86;
const start: Point = { x: 105, y: 575 };
const qaStart: Point = new URLSearchParams(location.search).get('qa') === 'combat-a' ? { x: 270, y: 255 } : start;
const zones = [
  { name: 'Amber Court', short: 'A', x: 270, y: 190, color: '#655531' },
  { name: 'Moss Hall', short: 'B', x: 805, y: 180, color: '#385c4b' },
  { name: 'Rust Yard', short: 'C', x: 855, y: 515, color: '#68423a' },
] as const;
const route = [
  { name: 'Clear Amber Court', x: 270, y: 190, kind: 'clear', zone: 0 },
  { name: 'Clear Moss Hall', x: 805, y: 180, kind: 'clear', zone: 1 },
  { name: 'Clear Rust Yard', x: 855, y: 515, kind: 'clear', zone: 2 },
  { name: 'Revisit Amber Court', x: 270, y: 190, kind: 'revisit', zone: 0 },
  { name: 'Revisit Moss Hall', x: 805, y: 180, kind: 'revisit', zone: 1 },
  { name: 'Return Home', x: start.x, y: start.y, kind: 'home', zone: -1 },
] as const;
const walls: Rect[] = [
  { x: 0, y: 0, w: 1120, h: 35 }, { x: 0, y: 645, w: 1120, h: 35 },
  { x: 0, y: 0, w: 35, h: 680 }, { x: 1085, y: 0, w: 35, h: 680 },
  { x: 460, y: 35, w: 38, h: 180 }, { x: 460, y: 305, w: 38, h: 230 },
  { x: 160, y: 330, w: 300, h: 36 }, { x: 605, y: 320, w: 340, h: 36 },
  { x: 620, y: 480, w: 36, h: 165 }, { x: 965, y: 110, w: 36, h: 210 },
];
const spawns = [
  { x: 245, y: 170, type: 'scout' as const }, { x: 315, y: 220, type: 'brute' as const },
  { x: 770, y: 155, type: 'scout' as const }, { x: 850, y: 215, type: 'scout' as const },
  { x: 815, y: 495, type: 'brute' as const }, { x: 900, y: 545, type: 'scout' as const },
];

function image(url: string): HTMLImageElement { const item = new Image(); item.src = url; return item; }
const images = {
  player: image(playerUrl), slash: image(slashUrl),
  scoutAlive: image(scoutAliveUrl), scoutDead: image(scoutDeadUrl),
  bruteAlive: image(bruteAliveUrl), bruteDead: image(bruteDeadUrl),
};

let condition: Condition = 'clean';
let player: Point = { ...qaStart };
let enemies: Enemy[] = [];
let routeIndex = 0;
let defeated = 0;
let revisited = 0;
let finished = false;
let attackUntil = 0;
let lastTime = performance.now();
let messageUntil = 0;
const keys = new Set<string>();

function resetSession(): void {
  player = { ...qaStart };
  enemies = spawns.map((spawn, id) => ({ ...spawn, id, hp: spawn.type === 'brute' ? 2 : 1, alive: true, deathAt: 0 }));
  routeIndex = 0; defeated = 0; revisited = 0; finished = false; attackUntil = 0;
  messageElement.textContent = '';
  summaryElement.hidden = true;
  updateHud();
  canvas.focus();
}

function setCondition(next: Condition): void {
  condition = next;
  document.querySelectorAll<HTMLButtonElement>('[data-condition]').forEach((button) => button.classList.toggle('selected', button.dataset.condition === condition));
  resetSession();
}

function updateHud(): void {
  conditionName.textContent = condition === 'clean' ? 'Clean Removal' : 'Persistent Corpses';
  defeatedElement.textContent = `${defeated} / ${enemies.length}`;
  objectiveElement.textContent = route[routeIndex]?.name ?? 'Complete';
  revisitedElement.textContent = `${revisited} / 2`;
}

function setMessage(text: string, duration = 1300): void {
  messageElement.textContent = text;
  messageUntil = performance.now() + duration;
}

function collides(x: number, y: number): boolean {
  const wallHit = walls.some((wall) => x + PLAYER_RADIUS > wall.x && x - PLAYER_RADIUS < wall.x + wall.w && y + PLAYER_RADIUS > wall.y && y - PLAYER_RADIUS < wall.y + wall.h);
  const enemyHit = enemies.some((enemy) => enemy.alive && Math.hypot(x - enemy.x, y - enemy.y) < PLAYER_RADIUS + 23);
  return wallHit || enemyHit;
}

function attack(): void {
  if (finished || performance.now() < attackUntil - 80) return;
  attackUntil = performance.now() + 230;
  const target = enemies.filter((enemy) => enemy.alive && Math.hypot(player.x - enemy.x, player.y - enemy.y) <= ATTACK_RADIUS)
    .sort((a, b) => Math.hypot(player.x - a.x, player.y - a.y) - Math.hypot(player.x - b.x, player.y - b.y))[0];
  if (!target) { setMessage('No enemy in range', 650); return; }
  target.hp -= 1;
  if (target.hp > 0) { setMessage('Brute staggered · hit once more', 850); return; }
  target.alive = false;
  target.deathAt = performance.now();
  defeated += 1;
  setMessage(condition === 'clean' ? 'Enemy defeated · remains cleared' : 'Enemy defeated · corpse remains');
  updateHud();
}

function zoneCleared(index: number): boolean {
  const zone = zones[index];
  return enemies.filter((enemy) => Math.hypot(enemy.x - zone.x, enemy.y - zone.y) < 150).every((enemy) => !enemy.alive);
}

function checkRoute(): void {
  const step = route[routeIndex];
  if (!step || Math.hypot(player.x - step.x, player.y - step.y) > 62) return;
  if (step.kind === 'clear' && !zoneCleared(step.zone)) { setMessage(`Defeat all enemies in ${zones[step.zone].name}`); return; }
  if (step.kind === 'revisit') { revisited += 1; setMessage(`${zones[step.zone].name} revisited`); }
  routeIndex += 1;
  if (routeIndex === route.length) { finished = true; showSummary(); }
  updateHud();
}

function showSummary(): void {
  const label = condition === 'clean' ? 'Clean Removal' : 'Persistent Corpses';
  summaryTitle.textContent = label;
  summaryData.textContent = `Condition: ${label} · Defeated: ${defeated} / ${enemies.length} · Earlier combat spaces revisited: ${revisited} / 2`;
  reflection.textContent = condition === 'clean'
    ? '敌人消失后，再次经过这些区域时，你是否仍然明显感觉这里发生过战斗？'
    : '再次经过这些区域时，尸体是否让你更强地感觉到这里发生过事？';
  summaryElement.hidden = false;
}

function update(dt: number, now: number): void {
  if (!finished) {
    let dx = 0; let dy = 0;
    if (keys.has('KeyA') || keys.has('ArrowLeft')) dx -= 1;
    if (keys.has('KeyD') || keys.has('ArrowRight')) dx += 1;
    if (keys.has('KeyW') || keys.has('ArrowUp')) dy -= 1;
    if (keys.has('KeyS') || keys.has('ArrowDown')) dy += 1;
    if (dx || dy) {
      const length = Math.hypot(dx, dy);
      const nextX = player.x + dx / length * SPEED * dt;
      const nextY = player.y + dy / length * SPEED * dt;
      if (!collides(nextX, player.y)) player.x = nextX;
      if (!collides(player.x, nextY)) player.y = nextY;
    }
    checkRoute();
  }
  if (messageElement.textContent && now > messageUntil) messageElement.textContent = '';
}

function drawSprite(sprite: HTMLImageElement, x: number, y: number, size = 58, alpha = 1): void {
  context.globalAlpha = alpha;
  context.drawImage(sprite, x - size / 2, y - size / 2, size, size);
  context.globalAlpha = 1;
}

function draw(now: number): void {
  context.clearRect(0, 0, WORLD.w, WORLD.h);
  context.fillStyle = '#26312d'; context.fillRect(0, 0, WORLD.w, WORLD.h);
  context.strokeStyle = '#32403a'; context.lineWidth = 1;
  for (let x = 0; x < WORLD.w; x += 40) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, WORLD.h); context.stroke(); }
  for (let y = 0; y < WORLD.h; y += 40) { context.beginPath(); context.moveTo(0, y); context.lineTo(WORLD.w, y); context.stroke(); }
  zones.forEach((zone) => {
    context.beginPath(); context.arc(zone.x, zone.y, 112, 0, Math.PI * 2); context.fillStyle = zone.color; context.fill();
    context.fillStyle = '#e9e3ce'; context.font = '700 14px system-ui'; context.textAlign = 'center'; context.fillText(`${zone.short} · ${zone.name}`, zone.x, zone.y - 88);
  });
  context.fillStyle = '#315a47'; context.fillRect(55, 530, 115, 85);
  context.fillStyle = '#dbe9dd'; context.font = '700 13px system-ui'; context.fillText('HOME', start.x, 625);
  context.fillStyle = '#111816'; walls.forEach((wall) => context.fillRect(wall.x, wall.y, wall.w, wall.h));
  context.strokeStyle = '#53625c'; context.lineWidth = 3; walls.forEach((wall) => context.strokeRect(wall.x, wall.y, wall.w, wall.h));
  const step = route[routeIndex];
  if (step) { context.beginPath(); context.arc(step.x, step.y, 70 + Math.sin(now / 180) * 4, 0, Math.PI * 2); context.strokeStyle = '#e6ca79'; context.lineWidth = 4; context.stroke(); }
  enemies.forEach((enemy) => {
    if (enemy.alive) drawSprite(enemy.type === 'scout' ? images.scoutAlive : images.bruteAlive, enemy.x, enemy.y, enemy.type === 'brute' ? 70 : 60);
    else if (condition === 'persistent') drawSprite(enemy.type === 'scout' ? images.scoutDead : images.bruteDead, enemy.x, enemy.y, enemy.type === 'brute' ? 72 : 64, .9);
    else if (now - enemy.deathAt < 280) drawSprite(enemy.type === 'scout' ? images.scoutDead : images.bruteDead, enemy.x, enemy.y, 62, 1 - (now - enemy.deathAt) / 280);
  });
  drawSprite(images.player, player.x, player.y, 62);
  if (now < attackUntil) drawSprite(images.slash, player.x + 34, player.y - 8, 72, Math.max(0, (attackUntil - now) / 230));
}

function frame(now: number): void {
  const dt = Math.min((now - lastTime) / 1000, .05); lastTime = now;
  update(dt, now); draw(now); requestAnimationFrame(frame);
}

window.addEventListener('keydown', (event) => {
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(event.code)) event.preventDefault();
  keys.add(event.code);
  if ((event.code === 'Space' || event.code === 'KeyE') && !event.repeat) attack();
  if (event.code === 'KeyR') resetSession();
});
window.addEventListener('keyup', (event) => keys.delete(event.code));
window.addEventListener('blur', () => keys.clear());
document.querySelectorAll<HTMLButtonElement>('[data-condition]').forEach((button) => button.addEventListener('click', () => setCondition(button.dataset.condition as Condition)));
document.querySelector<HTMLButtonElement>('#restart')!.addEventListener('click', resetSession);
document.querySelector<HTMLButtonElement>('#summary-restart')!.addEventListener('click', resetSession);
canvas.addEventListener('pointerdown', () => canvas.focus());

resetSession();
requestAnimationFrame(frame);
