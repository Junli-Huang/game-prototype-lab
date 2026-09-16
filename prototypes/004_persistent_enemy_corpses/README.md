# Prototype #004 — Persistent Enemy Corpses Lab

Selected experiment: `EXP-018 — Persistent Enemy Corpses`

Status: READY / implementation authorized

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
