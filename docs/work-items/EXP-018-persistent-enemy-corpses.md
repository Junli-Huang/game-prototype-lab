# EXP-018 Work Item — Persistent Enemy Corpses

Status: ACTIVE IMPLEMENTATION REQUEST

Experiment: `EXP-018 — Persistent Enemy Corpses`

Prototype: `prototypes/004_persistent_enemy_corpses/`

## Goal

Build a controlled 2D top-down comparison answering whether persistent enemy corpses make revisited fixed-map spaces feel more historical, memorable, and changed by prior events.

## Required Conditions

### A — Clean Removal
- enemy dies;
- short death feedback;
- enemy disappears;
- no corpse remains.

### B — Persistent Corpses
- enemy dies;
- swap to supplied corpse asset;
- corpse remains visible until Restart / Condition switch;
- corpse is non-blocking;
- corpse never attacks, moves, despawns, decays, or respawns.

## Fixed Conditions

Both conditions must share:
- exact same fixed map;
- exact same enemy positions, count, and enemy types;
- exact same movement speed;
- exact same attack rules;
- exact same route and landmarks;
- exact same session structure.

## Map / Session

Use one compact fixed map with:
- Start / Home;
- three small combat areas;
- at least one loop / return path;
- at least two earlier combat spaces naturally revisited before the session ends.

The player should have enough traversal to encounter the visual consequence of prior kills.

## Combat

Combat is supporting infrastructure only.
- one simple attack input;
- enemies easy to kill;
- maximum two enemy types;
- no weapon switching, stamina, skills, health-build complexity, loot, or upgrades.

## Assets

Read and follow:
`docs/asset-handoff-persistent-enemy-corpses.md`

Use the ready assets under:
`prototypes/004_persistent_enemy_corpses/assets/`

Do not replace actors with geometric placeholders.

## UI

At minimum show:
- current condition;
- defeated enemy count;
- Restart control / key hint.

End summary:
- condition;
- defeated count;
- whether earlier combat spaces were revisited;
- neutral reflection prompt.

Suggested Persistent prompt:
“再次经过这些区域时，尸体是否让你更强地感觉到这里发生过事？”

Suggested Clean prompt:
“敌人消失后，再次经过这些区域时，你是否仍然明显感觉这里发生过战斗？”

## Non-goals

Do not add corpse loot, inventory, decay, dragging, blocking collision, pollution, scavengers, ecology, respawn, blood simulation, procedural generation, quests, save/load, or generalized frameworks.

Hardcode small prototype logic when simplest.

## Acceptance

1. Prototype #004 exists and launches.
2. Clean Removal and Persistent Corpses are selectable conditions.
3. Both conditions share identical map/enemy setup.
4. Minimal combat can defeat all enemies.
5. Clean Removal leaves no corpse.
6. Persistent Corpses uses supplied dead assets and corpses persist for the session.
7. Corpses are non-blocking.
8. Route revisits at least two previous combat spaces.
9. Restart / condition switch fully resets enemies, corpses, counters, session state, and summary.
10. Player/enemy/corpse use supplied 2D assets.
11. `npm run build` passes.
12. Real-browser interaction and GitHub Pages/direct-refresh are verified.
13. Do not assign a gameplay result before Player testing.
