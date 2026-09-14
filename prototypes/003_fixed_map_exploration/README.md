# Prototype #003 — Fixed Map Exploration Lab

Small 2D top-down controlled comparison for EXP-004 and EXP-006. Both Experiment Modes use the exact same hand-authored map, movement, collision, landmarks, target order, and three-run session structure.

## Experiment Modes

### EXP-004 — Fixed Map Exploration

- Status: `TESTING`
- Result: `Untested`
- Question: does repeating the same A → B → C → Home route create a noticeable sense of map familiarity and confidence?
- Shortcut: sealed and unavailable for the entire session.

### EXP-006 — Shortcut Unlocking

- Status: `TESTING`
- Result: `Untested`
- Question: does opening one far-side connection back toward Home create a valuable spatial-recognition moment and affect later route choice?
- Shortcut: starts closed, opens only from the far / east side with `E`, remains open for Runs 2 and 3, and is traversable both ways. The near side explicitly reports `Locked from this side`; the larger far-side interaction area reports `[E] Unlock Shortcut`.

Technical completion does not assign a gameplay result. Player should complete all three EXP-004 runs first, then all three EXP-006 runs, and report familiarity and shortcut value separately.

## Controls

- `WASD` / Arrow Keys — move
- `E` — unlock the shortcut only from its far side when `[E] Unlock Shortcut` is shown
- `R` / Restart — reset the complete current session
- Experiment Mode buttons — switch mode and reset the complete session

## Fixed Test Conditions

- One fixed 1600 × 1000 world and identical collision geometry in both modes.
- Start / Home and landmark order remain fixed: A · Amber Garden → B · Blue Reservoir → C · Crimson Yard → Home.
- Three runs per session; timing is descriptive evidence only and has no score or grade.
- Camera shows the local area; there is no route arrow, path line, breadcrumb trail, or minimap.
- One central Old Observatory landmark, multiple obstacle loops, route choices, and a tempting dead-end branch.
- Same player speed and target radii in both modes.

## Visual Fidelity

- Level: `V1 — Representative`.
- Reason: distinct color districts, named landmarks, readable walls, a clear player marker, and obvious closed/open gate states are sufficient for the spatial-learning question.
- Required feedback: current run and target, elapsed run time, target arrival, shortcut prompt/state, and descriptive session summary.

## Assets / Asset Handoff

Assets Ready: None.

The fixed map uses local Canvas 2D shapes. No external assets, asset pipeline, or cross-prototype dependencies are used.

## Non-goals

No combat, enemies, health, loot, inventory, procedural generation, random targets, navigation aids, fog of war, fast travel, multiple shortcuts, keys, puzzles, persistence, or generalized World / Door / Quest / Navigation framework.

## Technical Acceptance

- Both modes share one map and reset cleanly on Restart / mode switch.
- EXP-004 never allows shortcut interaction.
- EXP-006 contains exactly one far-side unlockable shortcut and preserves it within the three-run session.
- Each mode records three run times and ends with a non-judgmental reflection prompt.
- Production build and GitHub Pages are verified separately during handoff.
