# Prototype #006 — Basic Farming Loop

Selected experiment:

`EXP-042 — Basic Farming Loop`

Status: TESTING / Untested

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

## Implemented Test

- One compact garden, one seed cache, exactly three independent plots, and one crop type.
- `E` takes exactly one seed, plants by consuming one seed, or harvests a Ready crop.
- Each plot advances deterministically: Planted at 0 seconds, Growing at 4 seconds, Ready at 8 seconds.
- Harvest adds one Produce and one Harvested count, then returns that plot to Empty for immediate repetition.
- After two harvests, an optional reflection panel becomes available without ending the session.
- Restart resets player position, seeds, harvest/produce counts, all plots, prompts, and reflection state.

## Controls

- `WASD` / Arrow Keys — move
- `E` — contextual interaction
- `R` / Restart — reset the session

Implementation, production build, real-browser interaction, and GitHub Pages/direct-refresh acceptance completed on 2026-09-20. EXP-042 remains Untested until Player feedback.
