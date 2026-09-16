# Asset Handoff — Persistent Enemy Corpses

Experiment: `EXP-018 — Persistent Enemy Corpses`

Prototype: `prototypes/004_persistent_enemy_corpses/`

## Goal

Use simple 2D top-down assets so the Player can immediately distinguish living enemies from dead remains and read “this place has history now” without relying on abstract geometry.

## Visual Direction

- View: top-down 2D
- Fidelity: V1 — Representative
- Readability over detail
- Slightly grounded exploration / survival tone
- No heavy gore
- Distinct silhouettes

## Ready Assets

The following Prototype-local SVG assets are ready and should be used directly:

- `assets/player_idle.svg`
- `assets/enemy_scout_alive.svg`
- `assets/enemy_scout_dead.svg`
- `assets/enemy_brute_alive.svg`
- `assets/enemy_brute_dead.svg`
- `assets/player_attack_slash.svg`

Do not recreate them unless they are technically unusable.

## Usage Rules

1. Alive and dead states must be distinguishable immediately.
2. Dead bodies remain visually readable after several corpses accumulate.
3. Corpses should be non-blocking in EXP-018.
4. Do not require animation sheets for the first pass.
5. Directional variants are not required.
6. The map may still use Canvas / CSS shapes and flat-color zones.
7. Actor and corpse identity should come from the supplied assets, not circles / rectangles.

## Asset Intent

### Player

`player_idle.svg`
- compact explorer / scavenger silhouette;
- readable backpack / body orientation;
- neutral enough not to introduce narrative assumptions.

### Scout

`enemy_scout_alive.svg`
- small, common hostile silhouette.

`enemy_scout_dead.svg`
- collapsed version with the same identity and palette family.

### Brute

`enemy_brute_alive.svg`
- visibly heavier silhouette than Scout.

`enemy_brute_dead.svg`
- wider grounded corpse silhouette, clearly inert.

### Attack

`player_attack_slash.svg`
- lightweight readable attack feedback only;
- no need for a full animation system.

## Non-goals

Do not add or request:

- 3D models;
- full animation sets;
- eight-direction sprite packs;
- painted background art;
- gore-heavy effects;
- blood simulation;
- VFX pipeline work;
- shared asset framework.
