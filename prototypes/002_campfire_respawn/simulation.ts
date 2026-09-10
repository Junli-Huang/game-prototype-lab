// Fixed conditions for EXP-007 only. No shared gameplay system.
export const PLAYER_HP = 5;
export const ENEMY_HP = 2;
export const ENEMY_DAMAGE = 1;
export const MOVE_SPEED = 3;
export const ENEMY_SPEED = 1.65;
export const ATTACK_COOLDOWN = 0.48;
export const INVULNERABILITY = 0.95;
export const CAMP = { x: 0, z: 10 };
export const END = { x: 0, z: -12 };
export const SPAWNS = [{ x: 0, z: 5 }, { x: -0.9, z: 0 }, { x: 0.9, z: -1.5 }, { x: 0, z: -7 }];
export type Pawn = { x: number; z: number; hp: number; facing: number; hit: number; swing: number; moving: boolean; deadFor: number };
const pawn = (x: number, z: number, hp: number): Pawn => ({ x, z, hp, facing: Math.PI, hit: 0, swing: 0, moving: false, deadFor: 0 });
export const state = {
  player: pawn(CAMP.x, CAMP.z + 1, PLAYER_HP),
  enemies: SPAWNS.map(p => pawn(p.x, p.z, ENEMY_HP)),
  invulnerable: 0, cooldown: 0, firePulse: 0, cleared: false,
  message: '向北出发。休息会恢复生命，也会重置所有敌人。', messageFor: 6,
};
export function announce(message: string, seconds = 3) { state.message = message; state.messageFor = seconds; }
export function nearCamp() { return Math.hypot(state.player.x - CAMP.x, state.player.z - CAMP.z) < 2; }
function resetEnemies() { state.enemies = SPAWNS.map(p => pawn(p.x, p.z, ENEMY_HP)); }
export function restart() {
  Object.assign(state.player, pawn(CAMP.x, CAMP.z + 1, PLAYER_HP));
  resetEnemies(); state.invulnerable = 0; state.cooldown = 0; state.firePulse = 0; state.cleared = false;
  announce('向北出发。休息会恢复生命，也会重置所有敌人。', 6);
}
export function rest() {
  if (state.player.hp <= 0 || !nearCamp()) return false;
  state.player.hp = PLAYER_HP; state.player.hit = 0; state.invulnerable = 0;
  resetEnemies(); state.firePulse = 1; state.cleared = false;
  announce('Rested · 生命恢复 — Enemies returned · 所有敌人已重置', 4);
  return true;
}
function clamp(p: Pawn) { p.x = Math.max(-2.6, Math.min(2.6, p.x)); p.z = Math.max(-13, Math.min(12, p.z)); }
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
    e.x += (e.x - p.x) / distance * 0.38; e.z += (e.z - p.z) / distance * 0.38; clamp(e);
    if (!e.hp) { e.deadFor = 0; e.moving = false; }
  }
  return true;
}
export function tick(dt: number, dx: number, dz: number) {
  const p = state.player;
  state.messageFor = Math.max(0, state.messageFor - dt); state.firePulse = Math.max(0, state.firePulse - dt);
  state.cooldown = Math.max(0, state.cooldown - dt); state.invulnerable = Math.max(0, state.invulnerable - dt);
  for (const actor of [p, ...state.enemies]) { actor.hit = Math.max(0, actor.hit - dt); actor.swing = Math.max(0, actor.swing - dt); }
  if (p.hp <= 0) {
    p.moving = false; p.deadFor += dt;
    if (p.deadFor >= 1.2) {
      Object.assign(p, pawn(CAMP.x, CAMP.z + 1, PLAYER_HP)); resetEnemies();
      state.invulnerable = 0; state.cooldown = 0; state.firePulse = 1; state.cleared = false;
      announce('回到篝火 · 生命恢复，所有敌人回到初始状态', 4);
    }
    return;
  }
  const length = Math.hypot(dx, dz);
  p.moving = length > 0;
  if (length) { p.x += dx / length * MOVE_SPEED * dt; p.z += dz / length * MOVE_SPEED * dt; p.facing = Math.atan2(dx, dz); clamp(p); }
  for (const e of state.enemies) {
    e.moving = false;
    if (!e.hp) { e.deadFor += dt; continue; }
    const ex = p.x - e.x, ez = p.z - e.z, distance = Math.hypot(ex, ez);
    // A small fixed refuge prevents enemies from camping the respawn point.
    if (distance < 4.1 && p.z < 8 && e.hit === 0) {
      e.facing = Math.atan2(ex, ez);
      if (distance > 0.66) { e.x += ex / distance * ENEMY_SPEED * dt; e.z += ez / distance * ENEMY_SPEED * dt; e.moving = true; clamp(e); }
      if (distance < 0.83 && state.invulnerable === 0) {
        p.hp = Math.max(0, p.hp - ENEMY_DAMAGE); p.hit = 0.24; e.swing = 0.2; state.invulnerable = INVULNERABILITY;
        if (!p.hp) { p.deadFor = 0; announce('倒下了 · 即将返回篝火', 2); break; }
      }
    }
  }
  if (p.hp > 0 && !state.cleared && Math.hypot(p.x - END.x, p.z - END.z) < 1.2) {
    state.cleared = true; announce('Route Cleared · 已到达路线终点。可返回篝火，或 R 重新试玩。', 7);
  }
}
