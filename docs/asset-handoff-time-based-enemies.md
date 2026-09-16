# Asset Handoff — EXP-013 Time-Based Enemies

Prototype: `prototypes/005_time_based_enemies/`

## Goal

Provide a small Prototype-local 2D asset set so Day / Night enemy identity is immediately readable without falling back to pure circles / rectangles.

This is still a gameplay experiment, not an art-production task. Assets should be simple, top-down, readable, and consistent with Prototype #004 fidelity.

## Ready Assets

Use these files directly from `prototypes/005_time_based_enemies/assets/`:

- `player_idle.svg`
- `player_attack_slash.svg`
- `enemy_day_stalker.svg`
- `enemy_night_wraith.svg`
- `time_day.svg`
- `time_night.svg`

## Visual Intent

### Player

Neutral explorer/scavenger silhouette. It must stay visually stable across Day and Night so the time-state comparison is not contaminated by player appearance changes.

### Day Enemy — Stalker

- warm / earthy silhouette
- grounded physical creature
- compact but aggressive outline
- should read clearly as the Day population

### Night Enemy — Wraith

- colder / spectral silhouette
- visibly different shape language from the Day enemy
- should read clearly as the Night population

Enemy combat stats should remain equivalent unless the experiment spec explicitly says otherwise. The art difference communicates identity, not difficulty.

### Day / Night Icons

Use only as HUD / Rest-point anchors. They may accompany a lightweight scene tint, but do not turn this into a lighting experiment.

## Rules

1. Do not substitute pure geometric placeholders for player or enemies.
2. Keep sprite scale consistent between Day and Night enemies.
3. Do not add animation requirements beyond a minimal attack slash / hit feedback.
4. Do not add glow, stealth, buffs, or combat behavior implied by the Wraith art.
5. Day / Night readability may use a mild background tint, but enemy distribution is the tested variable.
6. Do not create a generalized asset manager.

## Non-goals

- full sprite sheets
- directional animation sets
- 3D models
- full day/night lighting assets
- weather VFX
- Blood Moon assets
- resource / loot art
