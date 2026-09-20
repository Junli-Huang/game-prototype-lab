# Current Work Item

**ACTIVE: EXP-042 — Basic Farming Loop**

Formal Work Item:

`docs/work-items/EXP-042-basic-farming-loop.md`

Experiment definition:

`docs/experiments/EXP-042-basic-farming-loop.md`

Prototype:

`prototypes/006_basic_farming_loop/`

Asset handoff:

`docs/asset-handoff-basic-farming-loop.md`

Goal: test whether the minimal `Seed → Plant → Grow → Harvest` loop creates enough satisfaction and voluntary repetition to be worth keeping.

Implementation constraints:

- one compact top-down garden scene;
- one nearby seed source;
- exactly three planting plots;
- one crop type only;
- deterministic short growth;
- supplied 2D assets must be used directly;
- no watering, fertilizer, seasons, economy, crafting, inventory grid, enemies, exploration rewards, EXP-043 effects, or generalized FarmingSystem architecture.

Ready assets:

- `prototypes/006_basic_farming_loop/assets/player_farmer.svg`
- `prototypes/006_basic_farming_loop/assets/seed_pouch.svg`
- `prototypes/006_basic_farming_loop/assets/plot_empty.svg`
- `prototypes/006_basic_farming_loop/assets/crop_planted.svg`
- `prototypes/006_basic_farming_loop/assets/crop_growing.svg`
- `prototypes/006_basic_farming_loop/assets/crop_ready.svg`
- `prototypes/006_basic_farming_loop/assets/produce.svg`

Work is authorized only through the formal Work Item above. On completion, run build + real-browser + GitHub Pages/direct-refresh acceptance, update relevant documentation, then close CURRENT back to no active implementation task. Do not assign a gameplay result before Player testing.
