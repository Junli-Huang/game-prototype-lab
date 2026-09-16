# Current Work Item

**ACTIVE: EXP-013 — Time-Based Enemies**

Formal Work Item:

`docs/work-items/EXP-013-time-based-enemies.md`

Experiment definition:

`docs/experiments/EXP-013-time-based-enemies.md`

Asset handoff:

`docs/asset-handoff-time-based-enemies.md`

Prototype:

`prototypes/005_time_based_enemies/`

Ready Prototype-local assets:

- `prototypes/005_time_based_enemies/assets/player_idle.svg`
- `prototypes/005_time_based_enemies/assets/player_attack_slash.svg`
- `prototypes/005_time_based_enemies/assets/enemy_day_stalker.svg`
- `prototypes/005_time_based_enemies/assets/enemy_night_wraith.svg`
- `prototypes/005_time_based_enemies/assets/time_day.svg`
- `prototypes/005_time_based_enemies/assets/time_night.svg`

Goal: test whether predictable Day / Night enemy-distribution changes make the Player learn “什么时候去哪里” and deliberately choose when to enter a zone.

Implementation constraints:

- Day: Zone A has enemies, Zone B is safe.
- Night: Zone A is safe, Zone B has enemies.
- same fixed map, objectives, movement speed, attack rules, landmarks and destination value;
- explicit deliberate Day ↔ Night switching, no real-time clock pressure;
- use the supplied 2D player/enemy/time assets directly; do not substitute pure geometric actor placeholders;
- time change may replace the active enemy population as test scaffolding, but this must not be treated as a conclusion about Campfire / Blood Moon / World Refresh semantics;
- do not add resources, map-access changes, corpse-persistence experiments, Blood Moon, Campfire refresh, NPC schedules, weather, or generalized Time / Ecology frameworks.

Work is authorized only through the formal Work Item above. On completion, run build + real-browser + GitHub Pages/direct-refresh acceptance, update relevant documentation, then close CURRENT back to no active implementation task. Do not assign a gameplay result before Player testing.
