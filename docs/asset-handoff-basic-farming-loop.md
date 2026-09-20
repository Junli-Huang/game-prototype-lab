# Asset Handoff — EXP-042 Basic Farming Loop

Prototype:

`prototypes/006_basic_farming_loop/`

## Goal

Provide enough authored 2D visual feedback for the Player to read:

```text
empty soil
→ planted
→ growing
→ ready
→ harvested
```

The experiment is about the feel of the farming loop, so crop-state readability matters.

## Ready Prototype-Local Assets

Work should use the supplied files directly from:

`prototypes/006_basic_farming_loop/assets/`

Required:

- `player_farmer.svg`
- `seed_pouch.svg`
- `plot_empty.svg`
- `crop_planted.svg`
- `crop_growing.svg`
- `crop_ready.svg`
- `produce.svg`

## Style

- top-down / slightly top-down readable 2D;
- simple compact silhouettes;
- warm, calm garden tone;
- crop growth states should be distinguishable at gameplay size;
- no detailed animation set is required.

## Implementation Rules

- Do not replace the supplied crop states with pure circles / rectangles.
- Do not create multiple crop variants.
- Do not add animation requirements beyond simple scale/bob/highlight feedback if desired.
- The soil plots may use the supplied SVG as the main authored representation.
- Flat-color background, fences, and simple map geometry are acceptable.
