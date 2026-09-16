# Prototype #004 — Persistent Enemy Corpses Lab

Selected experiment: `EXP-018 — Persistent Enemy Corpses`

Status: TESTING / Untested

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

Technical completion is not a gameplay conclusion.

## Implemented Test

- One fixed map shared by both conditions.
- Six enemies across Amber Court, Moss Hall, and Rust Yard; Scout takes one hit and Brute takes two.
- Fixed route: clear A → B → C, revisit A → B, then return Home.
- `Clean Removal` gives brief death feedback and removes remains.
- `Persistent Corpses` swaps to the supplied dead asset and keeps each corpse until Restart / condition switch.
- Collision checks living enemies only, so corpses are non-blocking.
- Condition switch and Restart reset enemies, corpses, route, counters, revisit state, and summary.

## Controls

- `WASD` / Arrow Keys — move
- `Space` / `E` — attack the nearest enemy in range
- `R` / Restart — restart the selected condition

Implementation, production build, real-browser interaction, and GitHub Pages/direct-refresh acceptance completed on 2026-09-16. EXP-018 remains Untested until Player compares both conditions.
