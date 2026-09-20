# EXP-042 Work Item — Basic Farming Loop

Status: ACTIVE IMPLEMENTATION REQUEST

Experiment:

`EXP-042 — Basic Farming Loop`

Prototype:

`prototypes/006_basic_farming_loop/`

Experiment definition:

`docs/experiments/EXP-042-basic-farming-loop.md`

Asset handoff:

`docs/asset-handoff-basic-farming-loop.md`

## Goal

Build the smallest useful farming prototype that answers:

> 最基础的“获得种子 → 种下 → 等待成长 → 收获”循环，本身是否会产生值得保留的满足感与再次种植意愿？

Do not turn this into a farming game.

## Required Scene

Create one compact 2D top-down garden/base scene containing:

- Start / Player;
- one nearby seed cache;
- exactly three planting plots;
- no enemies;
- no exploration route;
- no shops / NPCs.

The Player should be able to move naturally between seed cache and plots.

## Loop

### Get Seed

At the seed cache:

- press E;
- gain exactly one seed per interaction;
- show simple Seed count;
- no inventory UI.

A small cooldown or finite visible starting stock is allowed only if needed to avoid accidental spam. Do not turn seed acquisition into a resource-management experiment.

### Plant

At an empty plot:

- if Seeds > 0, press E to plant;
- consume one seed;
- plot enters `Planted`.

### Grow

Each planted crop advances deterministically:

```text
Planted
→ Growing
→ Ready
```

Target total growth time: approximately 8–12 seconds.

Each plot grows independently.

### Harvest

At a Ready plot:

- press E;
- gain one Produce;
- increment Harvest count;
- plot returns to Empty;
- Player may plant again.

## Required Crop States

Each plot must have explicit state:

- Empty
- Planted
- Growing
- Ready

Use the supplied assets for each visual state.

## HUD

Keep it minimal:

- Seeds
- Harvested
- nearby context prompt

Optional:
- Session Loops completed

Do not show optimization scores, money, crop value, or production-per-minute.

## Session / Reflection

Do not force a complex objective chain.

A simple initial hint is sufficient:

`Pick up a seed, plant it, and harvest when ready.`

After the Player completes at least two harvests, show a lightweight reflection prompt or make a summary button available:

> “这个种下、等待、收获的循环本身，你有没有想继续重复？”

Do not automatically end the session after the first harvest; voluntary repetition is useful evidence.

## Visuals

Use the supplied assets under:

`prototypes/006_basic_farming_loop/assets/`

Map/background may remain simple, but Player, seed pickup, soil plot, crop states, and produce must use authored 2D assets.

## Non-goals

Do not add:

- multiple crops;
- watering;
- fertilizer;
- seasons;
- day/night;
- crop death;
- weather;
- enemies;
- farming tools;
- stamina;
- hunger;
- health benefit;
- economy / selling;
- crafting;
- recipes;
- EXP-043 exploration support;
- grid inventory;
- storage;
- save/load;
- generalized farming architecture.

## Technical Guidance

Prefer explicit local state.

A simple structure such as:

```ts
type PlotState = 'empty' | 'planted' | 'growing' | 'ready'
```

with three hardcoded plot objects is enough.

Do not build a reusable Crop component framework.

## Documentation

On completion:

1. add `prototypes/006_basic_farming_loop/README.md`;
2. set EXP-042 to `TESTING / Untested` after technical acceptance;
3. update `docs/project-state.md` and Backlog consistently;
4. close CURRENT after build + browser + Pages acceptance;
5. do not infer gameplay result before Player feedback.

## Acceptance

Complete when:

1. Prototype #006 exists and launches.
2. Player can obtain seeds.
3. Exactly three plots are present.
4. Seeds can be planted into empty plots.
5. Each plot visibly progresses Planted → Growing → Ready.
6. Growth is deterministic and approximately 8–12 seconds total.
7. Ready crops can be harvested.
8. Harvest returns the plot to Empty and increments Produce/Harvest.
9. The loop can be repeated.
10. Restart resets Player, seeds, harvest count, and every plot.
11. Supplied authored assets are used.
12. No unrelated farming/economy/exploration system is introduced.
13. `npm run build` passes.
14. Real-browser interaction and GitHub Pages/direct-refresh are verified.
