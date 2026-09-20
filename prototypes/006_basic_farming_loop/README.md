# Prototype #006 — Basic Farming Loop

Selected experiment:

`EXP-042 — Basic Farming Loop`

Status: READY / implementation authorized

## Question

Does the smallest possible farming loop — get seed, plant, wait, harvest — create enough satisfaction and desire to repeat that it is worth keeping?

## Core Loop

```text
Get Seed
→ Plant
→ Grow
→ Harvest
→ Repeat
```

## Scope

- one compact 2D top-down garden scene;
- one nearby seed cache;
- exactly three plots;
- one crop type;
- fixed growth states: Empty / Planted / Growing / Ready;
- short deterministic growth time;
- no economy, crafting, watering, seasons, exploration benefit, or generalized farming architecture.

## Ready Assets

Use files in `assets/`:

- `player_farmer.svg`
- `seed_pouch.svg`
- `plot_empty.svg`
- `crop_planted.svg`
- `crop_growing.svg`
- `crop_ready.svg`
- `produce.svg`

Asset rules:

`../../docs/asset-handoff-basic-farming-loop.md`

## Work Authorization

Formal Work Item:

`../../docs/work-items/EXP-042-basic-farming-loop.md`

Technical completion does not imply a gameplay result.
