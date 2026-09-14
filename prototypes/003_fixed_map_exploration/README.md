# Prototype #003 — Fixed Map Exploration Lab

Small 2D top-down controlled comparison for EXP-004, EXP-006, and EXP-050. All Experiment Modes use the exact same hand-authored map, movement, collision, landmarks, target order, and three-run session structure.

## Experiment Modes

### EXP-004 — Fixed Map Exploration

- Status: `TESTING`
- Result: `Untested`
- Question: does repeating the same A → B → C → Home route create a noticeable sense of map familiarity and confidence?
- Shortcut: sealed and unavailable for the entire session.

### EXP-006 — Shortcut Unlocking

- Status: `MAYBE`
- Result: Player reported that movement speed materially affected the experience and that the gate felt better. This is a positive but limited shortcut signal.
- Question: does opening one far-side connection back toward Home create a valuable spatial-recognition moment and affect later route choice?
- Shortcut: starts closed, opens only from the far / east side with `E`, remains open for Runs 2 and 3, and is traversable both ways. The near side explicitly reports `Locked from this side`; the larger far-side interaction area reports `[E] Unlock Shortcut`.

### EXP-050 — Keyed Shortcut Access

- Status: `TESTING`
- Result: `Untested`
- Question: does starting with one key lead the player to open the known shortcut early and change route planning?
- `No Key`: matches EXP-006 far-side-only unlock behavior.
- `Start With Key`: begins with exactly one key; near side shows `[E] Use Key — Unlock Shortcut`, consumes the key on use, and keeps the gate open for the session. The player may ignore it and still unlock normally from the far side without consuming the key.

Technical completion does not assign an EXP-050 gameplay result. Player should compare No Key, then Start With Key.

## Controls

- `WASD` / Arrow Keys — move
- `E` — use the currently displayed gate interaction in EXP-006 / EXP-050
- `R` / Restart — reset the complete current session
- Experiment Mode buttons — switch mode and reset the complete session

## Fixed Test Conditions

- One fixed 1600 × 1000 world and identical collision geometry in both modes.
- Start / Home and landmark order remain fixed: A · Amber Garden → B · Blue Reservoir → C · Crimson Yard → Home.
- Three runs per session; timing is descriptive evidence only and has no score or grade.
- Camera shows the local area; there is no route arrow, path line, breadcrumb trail, or minimap.
- One central Old Observatory landmark, multiple obstacle loops, route choices, and a tempting dead-end branch.
- Same fixed movement speed (`90` world units / second) and target radii in every mode and condition. Player feedback identifies movement speed as a known experiential confound; it is not tuned inside EXP-050.

## Visual Fidelity

- Level: `V1 — Representative`.
- Reason: distinct color districts, named landmarks, readable walls, a clear player marker, and obvious closed/open gate states are sufficient for the spatial-learning question.
- Required feedback: current run and target, elapsed run time, target arrival, shortcut prompt/state, and descriptive session summary.

## Assets / Asset Handoff

Assets Ready: None.

The fixed map uses local Canvas 2D shapes. No external assets, asset pipeline, or cross-prototype dependencies are used.

## Non-goals

No combat, enemies, health, loot, inventory UI, procedural generation, random targets, navigation aids, fog of war, fast travel, multiple shortcuts, multiple keys, key drops, puzzles, persistence, or generalized World / Door / Key / Quest / Navigation framework.

## Technical Acceptance

- Both modes share one map and reset cleanly on Restart / mode switch.
- EXP-004 never allows shortcut interaction.
- EXP-006 contains exactly one far-side unlockable shortcut and preserves it within the three-run session.
- EXP-050 No Key matches EXP-006; Start With Key can consume one key to open from the near side or preserve it and unlock from the far side.
- Mode, condition, and Restart changes fully reset the gate, key, run, timer, prompt, and summary state.
- Each mode records three run times and ends with a non-judgmental reflection prompt.
- Production build and GitHub Pages are verified separately during handoff.
