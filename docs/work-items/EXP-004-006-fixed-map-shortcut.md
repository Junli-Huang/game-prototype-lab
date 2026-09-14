# EXP-004 / EXP-006 — Fixed Map Exploration + Shortcut Unlocking Work Item

Status: ACTIVE IMPLEMENTATION REQUEST

Prototype: `prototypes/003_fixed_map_exploration/`

Experiments:

- EXP-004 — Fixed Map Exploration
- EXP-006 — Shortcut Unlocking

## Goal

Build one small 2D top-down exploration prototype that supports two separate Experiment Modes on the exact same fixed map.

The implementation must preserve the distinction:

- EXP-004 asks whether repeated traversal of a fixed map creates spatial-learning / familiarity growth.
- EXP-006 asks whether one unlockable shortcut adds a meaningful spatial realization and route-planning benefit on that same map.

Do not combine the two questions into one gameplay Result.

## Shared Prototype Baseline

Create:

`prototypes/003_fixed_map_exploration/`

Use a lightweight browser implementation consistent with the repo. No engine migration or shared world framework is required.

Shared rules:

- 2D top-down movement;
- fixed map;
- one Start / Home point;
- three fixed target landmarks A → B → C;
- fixed target order;
- three runs per session;
- same movement speed and collision in both Experiment Modes;
- same visual map / landmarks in both Modes;
- Restart resets the complete session;
- switching Experiment Mode resets the complete session.

Controls may use WASD / Arrow Keys. Use `E` only where EXP-006 needs the shortcut interaction.

## Map Layout Requirements

Author one compact hand-made map with:

- at least two loops;
- one strong central landmark visible / recognizable from multiple approaches;
- three target areas with distinct visual identity;
- at least one dead-end or tempting wrong branch;
- at least two meaningful path choices;
- enough geometry that first-run navigation requires attention but does not become an arbitrary maze.

Target intended traversal after familiarity: approximately 45–90 seconds per full A → B → C run.

Prefer clarity over content quantity.

Do not add procedural generation.

## EXP-004 Mode — Fixed Map Exploration

### Rules

- shortcut remains unavailable / closed for the entire mode;
- complete A → B → C, then return / reset to Start for the next run;
- repeat for three runs;
- show current Run 1/3, 2/3, 3/3 and current target;
- after Run 3, show Session Summary.

### Summary

Show at least:

- Experiment: EXP-004;
- three run completion times;
- no score or grade;
- a short prompt asking the Player whether later runs felt more familiar / confident.

Timing is descriptive evidence only; do not infer fun from speed automatically.

## EXP-006 Mode — Shortcut Unlocking

### Shared Map

Use the exact EXP-004 map.

Add exactly one shortcut connection:

- a closed gate / barred door between a late-route area and a corridor near Start / early map;
- visible or recognizable before opening from at least one side;
- can only be opened from the far / late-area side;
- once opened, remains open for Runs 2 and 3 in the current session;
- clearly shortens at least one meaningful return / repeated route;
- reconnects known space rather than opening an unrelated new area.

### Interaction

- show a minimal `E — Open Shortcut` prompt only when in range and on the valid opening side;
- opening is immediate;
- no key, puzzle, currency, combat, item requirement, animation system, or quest system;
- once open, traversable from both directions.

### Run Structure

- Run 1 begins with the shortcut closed.
- The normal A → B → C route must bring the player to the opening side naturally before the first run ends.
- Player may open the shortcut on Run 1.
- Runs 2 and 3 preserve the open shortcut.

Do not force the player through the shortcut after opening. We need to see whether they choose to use it.

### Summary

Show at least:

- Experiment: EXP-006;
- whether shortcut was opened;
- run completion times;
- no score / correctness judgment;
- short prompt asking whether opening the shortcut produced a spatial-recognition moment and whether the Player chose to use it later.

## Visual Direction

Representative, readable prototype visuals only.

Required readability:

- Start / Home recognizable;
- A / B / C visually distinct from one another;
- central landmark visually distinct;
- walls / walkable space immediately readable;
- closed vs open shortcut state obvious;
- player orientation / position clear.

CSS / DOM / Canvas / simple local SVG shapes are acceptable. Do not build an asset pipeline or request polished art.

## Non-goals

Do not implement:

- enemies or combat;
- health;
- loot;
- backpack / inventory;
- farming;
- corpses;
- time of day;
- random targets;
- procedural map generation;
- fog-of-war system;
- navigation arrows / route line / breadcrumb guidance;
- minimap pathfinding;
- fast travel;
- multiple shortcuts;
- keys / puzzles / skill checks;
- persistent save across browser sessions;
- generic World / Door / Quest / Objective / Navigation frameworks for future reuse.

Hardcode the map and experiment logic where useful.

## Documentation

During / after implementation:

1. Create `prototypes/003_fixed_map_exploration/README.md`.
2. Record both Experiment Modes separately.
3. Keep both gameplay Results `TESTING / Untested` after technical completion.
4. Update `docs/project-state.md`.
5. Update `docs/experiment-backlog.md` statuses for EXP-004 and EXP-006.
6. Update root / prototype index only as needed for the new playable entry.
7. On technical completion, close `docs/work-items/CURRENT.md` to no active task.

Do not alter historical Player Results for EXP-001 / 003 / 048 / 049.

## Technical Acceptance

Implementation is accepted when:

1. New Prototype #003 is reachable from the repo launcher / Pages build.
2. EXP-004 and EXP-006 are separate selectable Experiment Modes.
3. Both use the same fixed map geometry, movement, targets and target order.
4. EXP-004 never permits shortcut use.
5. EXP-006 starts closed and supports exactly one far-side unlockable shortcut.
6. EXP-006 shortcut remains open for later runs in the current session.
7. Both modes support three runs and correctly reset between runs without changing the map.
8. Mode switch / Restart fully resets run number, current target, player position, timers and shortcut state.
9. No navigation aid accidentally solves the route-learning problem.
10. Session Summary is descriptive and does not declare a gameplay conclusion.
11. Existing prototypes continue to build and remain reachable.
12. `npm run build` passes.
13. GitHub Pages direct loading / refresh of Prototype #003 works.
14. Documentation is synchronized, while Player Results remain `TESTING / Untested` until actual gameplay feedback.

## Player Test Order After Technical Acceptance

1. Play EXP-004 first for all three runs.
2. Then switch to EXP-006 and play all three runs.
3. Report separately:
   - whether repeated fixed-map traversal created familiarity / mastery;
   - whether opening the shortcut created a memorable spatial realization;
   - whether the shortcut was deliberately used afterward.
