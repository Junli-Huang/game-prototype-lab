# Prototype #004 — Persistent Enemy Corpses Lab

Selected experiment: `EXP-018 — Persistent Enemy Corpses`

Status: MAYBE / Context-dependent

## Question

Does leaving defeated enemy corpses in a fixed world make revisited spaces feel more memorable, historical, and changed by the Player's prior actions?

## Conditions

- `Clean Removal`
- `Persistent Corpses`

Only corpse persistence changes between conditions.

## Ready Assets

Use assets in `assets/`:
- `player_idle.svg`
- `player_attack_slash.svg`
- `enemy_scout_alive.svg`
- `enemy_scout_dead.svg`
- `enemy_brute_alive.svg`
- `enemy_brute_dead.svg`

Asset rules and intent:
`../../docs/asset-handoff-persistent-enemy-corpses.md`

## Implementation Boundary

- 2D top-down fixed map
- three compact combat areas
- route revisits previous combat spaces
- maximum two easy enemy types
- one simple attack
- no loot / inventory / decay / ecology / respawn / corpse collision / save system

## Implemented Test

- One fixed map shared by both conditions.
- Six enemies across Amber Court, Moss Hall, and Rust Yard; Scout takes one hit and Brute takes two.
- Fixed route: clear A → B → C, revisit A → B, then return Home.
- `Clean Removal` gives brief death feedback and removes remains.
- `Persistent Corpses` swaps to the supplied dead asset and keeps each corpse until Restart / condition switch.
- Collision checks living enemies only, so corpses are non-blocking.
- Condition switch and Restart reset enemies, corpses, route, counters, revisit state, and summary.

## Player Result

Player feedback:

> “留下来感觉还行。不留的话也可以。主要要看后续的玩法跟进。包括其他设置比如篝火刷新，红月刷新，如果有这些设置，那么进行这些操作的时候，实体是否要进行刷新。感觉上应该要刷新。但这些都是玩法上的探索。”

Result:
`MAYBE / Context-dependent`

Interpretation:
- leaving corpses has some value as visible history;
- removing corpses is also acceptable;
- corpse persistence does not currently show strong standalone gameplay value;
- corpse lifetime should be determined together with surrounding world-refresh rules;
- a future World Refresh may clear / rebuild corpse state, but this is a hypothesis to test rather than a fixed rule.

Do not extend this prototype with decay, pollution, loot, scavengers, or generalized world-lifetime systems merely to rescue the signal.

## Controls

- `WASD` / Arrow Keys — move
- `Space` / `E` — attack the nearest enemy in range
- `R` / Restart — restart the selected condition

Implementation, production build, real-browser interaction, and GitHub Pages/direct-refresh acceptance completed on 2026-09-16. Player comparison is complete.
