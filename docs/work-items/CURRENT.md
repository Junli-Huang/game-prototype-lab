# Current Work Item

**ACTIVE: EXP-018 — Persistent Enemy Corpses**

Formal Work Item:

`docs/work-items/EXP-018-persistent-enemy-corpses.md`

Experiment definition:

`docs/experiments/EXP-018-persistent-enemy-corpses.md`

Prototype:

`prototypes/004_persistent_enemy_corpses/`

Asset handoff:

`docs/asset-handoff-persistent-enemy-corpses.md`

Ready Prototype-local assets:

- `prototypes/004_persistent_enemy_corpses/assets/player_idle.svg`
- `prototypes/004_persistent_enemy_corpses/assets/player_attack_slash.svg`
- `prototypes/004_persistent_enemy_corpses/assets/enemy_scout_alive.svg`
- `prototypes/004_persistent_enemy_corpses/assets/enemy_scout_dead.svg`
- `prototypes/004_persistent_enemy_corpses/assets/enemy_brute_alive.svg`
- `prototypes/004_persistent_enemy_corpses/assets/enemy_brute_dead.svg`

Implementation must compare exactly two conditions:

1. `Clean Removal`
2. `Persistent Corpses`

Only corpse persistence should differ. Use the supplied 2D actor/corpse assets; do not substitute pure geometric placeholders. Keep corpses non-blocking and do not add loot, decay, pollution, scavengers, ecology, respawn, inventory, or generalized frameworks.

Work is authorized only through the formal Work Item above. On completion, run build + real-browser + GitHub Pages/direct-refresh acceptance, update relevant documentation, then close CURRENT back to no active implementation task. Do not assign a gameplay result before Player testing.
