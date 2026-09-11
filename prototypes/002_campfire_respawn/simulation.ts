// Fixed comparison conditions for EXP-007 and EXP-008 only. No shared gameplay system.
export const PLAYER_HP = 5;
export const ENEMY_HP = 2;
export const ENEMY_DAMAGE = 1;
export const MOVE_SPEED = 3;
export const ENEMY_SPEED = 1.65;
export const ATTACK_COOLDOWN = 0.48;
export const INVULNERABILITY = 0.95;
export const BLOOD_MOON_CYCLE = 30;
export type RespawnMode = 'campfire' | 'blood-moon';
export const CAMP = { x: 0, z: 10 };
export const END = { x: 0, z: -12 };
export const SPAWNS = [{ x: 0, z: 5 }, { x: -0.25, z: 0 }, { x: 0.25, z: -1.5 }, { x: 0, z: -7 }];
// Fixed rock passages, not encounter gates. Bounds include pawn radius.
export const PASSAGES = [{ min: 3, max: 7 }, { min: -3, max: 2 }, { min: -9, max: -5 }];
const BODY_DISTANCE = 0.8;
export function walkable(x: number, z: number) {
  return Math.abs(x) <= 2.6 && z >= -13 && z <= 12 &&
    PASSAGES.every(g => z < g.min - 0.4 || z > g.max + 0.4 || Math.abs(x) <= 0.3);
}
export type Pawn = { x: number; z: number; hp: number; facing: number; hit: number; swing: number; moving: boolean; deadFor: number };
const pawn = (x: number, z: number, hp: number): Pawn => ({ x, z, hp, facing: Math.PI, hit: 0, swing: 0, moving: false, deadFor: 0 });
export const state = {
  mode: 'blood-moon' as RespawnMode,
  player: pawn(CAMP.x, CAMP.z + 1, PLAYER_HP),
  enemies: SPAWNS.map(p => pawn(p.x, p.z, ENEMY_HP)),
  invulnerable: 0, cooldown: 0, firePulse: 0, bloodMoonPulse: 0, bloodMoonIn: BLOOD_MOON_CYCLE, cleared: false,
  message: 'Blood Moon in 30s · 休息只恢复生命。', messageFor: 6,
};
export function announce(message: string, seconds = 3) { state.message = message; state.messageFor = seconds; }
export function nearCamp() { return Math.hypot(state.player.x - CAMP.x, state.player.z - CAMP.z) < 2; }
function resetEnemies() { state.enemies = SPAWNS.map(p => pawn(p.x, p.z, ENEMY_HP)); }
function openingMessage() {
  return state.mode === 'campfire'
    ? '向北出发。休息会恢复生命，也会重置所有敌人。'
    : 'Blood Moon in 30s · 休息只恢复生命。';
}
export function restart(mode: RespawnMode = state.mode) {
  state.mode = mode;
  Object.assign(state.player, pawn(CAMP.x, CAMP.z + 1, PLAYER_HP));
  resetEnemies(); state.invulnerable = 0; state.cooldown = 0; state.firePulse = 0; state.bloodMoonPulse = 0;
  state.bloodMoonIn = BLOOD_MOON_CYCLE; state.cleared = false;
  announce(openingMessage(), 6);
}
export function switchMode(mode: RespawnMode) { restart(mode); }
export function rest() {
  if (state.player.hp <= 0 || !nearCamp()) return false;
  state.player.hp = PLAYER_HP;
  state.firePulse = 1;
  if (state.mode === 'campfire') {
    state.player.hit = 0; state.invulnerable = 0;
    resetEnemies(); state.cleared = false;
    announce('Rested · 生命恢复 — Enemies returned · 所有敌人已重置', 4);
  } else {
    announce('Rested · 生命恢复 — 敌人与 Blood Moon 倒计时不变', 4);
  }
  return true;
}
function clampEnemy(e: Pawn) {
  const i = state.enemies.indexOf(e), g = PASSAGES[i === 0 ? 0 : i === 3 ? 2 : 1];
  e.x = Math.max(-0.3, Math.min(0.3, e.x));
  e.z = Math.max(g.min + 0.4, Math.min(g.max - 0.4, e.z));
}
function movePlayer(dx: number, dz: number) {
  const p = state.player;
  const allowed = (x: number, z: number) => walkable(x, z) && state.enemies.every(e =>
    e.hp <= 0 || Math.hypot(x - e.x, z - e.z) >= BODY_DISTANCE);
  if (allowed(p.x + dx, p.z)) p.x += dx;
  if (allowed(p.x, p.z + dz)) p.z += dz;
}
export function attack() {
  const p = state.player;
  if (p.hp <= 0 || state.cooldown > 0) return false;
  state.cooldown = ATTACK_COOLDOWN; p.swing = 0.22;
  const candidates = state.enemies.filter(e => {
    const dx = e.x - p.x, dz = e.z - p.z, distance = Math.hypot(dx, dz);
    return e.hp > 0 && distance < 1.5 && (distance < 0.5 || (dx * Math.sin(p.facing) + dz * Math.cos(p.facing)) / distance > 0.05);
  }).sort((a, b) => Math.hypot(a.x - p.x, a.z - p.z) - Math.hypot(b.x - p.x, b.z - p.z));
  const e = candidates[0];
  if (e) {
    e.hp--; e.hit = 0.22;
    const distance = Math.hypot(e.x - p.x, e.z - p.z) || 1;
    e.x += (e.x - p.x) / distance * 0.38; e.z += (e.z - p.z) / distance * 0.38; clampEnemy(e);
    if (!e.hp) { e.deadFor = 0; e.moving = false; }
  }
  return true;
}
export function tick(dt: number, dx: number, dz: number) {
  const p = state.player;
  if (p.hp <= 0) { p.moving = false; p.deadFor = Math.min(0.3, p.deadFor + dt); return; }
  state.messageFor = Math.max(0, state.messageFor - dt); state.firePulse = Math.max(0, state.firePulse - dt);
  state.bloodMoonPulse = Math.max(0, state.bloodMoonPulse - dt);
  if (state.mode === 'blood-moon') {
    state.bloodMoonIn -= dt;
    if (state.bloodMoonIn <= 0) {
      resetEnemies(); state.cleared = false; state.invulnerable = Math.max(state.invulnerable, 0.7);
      state.bloodMoonPulse = 1.2;
      do state.bloodMoonIn += BLOOD_MOON_CYCLE; while (state.bloodMoonIn <= 0);
      announce('Blood Moon · Enemies returned · 所有敌人同时重置', 4);
    }
  }
  state.cooldown = Math.max(0, state.cooldown - dt); state.invulnerable = Math.max(0, state.invulnerable - dt);
  for (const actor of [p, ...state.enemies]) { actor.hit = Math.max(0, actor.hit - dt); actor.swing = Math.max(0, actor.swing - dt); }
  const length = Math.hypot(dx, dz);
  p.moving = length > 0;
  if (length) { movePlayer(dx / length * MOVE_SPEED * dt, dz / length * MOVE_SPEED * dt); p.facing = Math.atan2(dx, dz); }
  for (const e of state.enemies) {
    e.moving = false;
    if (!e.hp) { e.deadFor += dt; continue; }
    const ex = p.x - e.x, ez = p.z - e.z, distance = Math.hypot(ex, ez);
    // A small fixed refuge prevents enemies from camping the respawn point.
    if (distance < 4.1 && p.z < 8 && e.hit === 0) {
      e.facing = Math.atan2(ex, ez);
      if (distance > BODY_DISTANCE) { const step = Math.min(ENEMY_SPEED * dt, distance - BODY_DISTANCE); e.x += ex / distance * step; e.z += ez / distance * step; e.moving = true; clampEnemy(e); }
      if (distance < 0.83 && state.invulnerable === 0) {
        p.hp = Math.max(0, p.hp - ENEMY_DAMAGE); p.hit = 0.24; e.swing = 0.2; state.invulnerable = INVULNERABILITY;
        if (!p.hp) { p.deadFor = 0; p.moving = false; state.cleared = false; state.enemies.forEach(e => e.moving = false); announce('Trial Failed · 本次尝试结束。R / Restart — Retry', 4); break; }
      }
    }
  }
  if (p.hp > 0 && !state.cleared && Math.hypot(p.x - END.x, p.z - END.z) < 1.2) {
    state.cleared = true; announce('Route Cleared · 已到达路线终点。可返回篝火，或 R 重新试玩。', 7);
  }
}
