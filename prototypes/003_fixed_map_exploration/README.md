# Prototype #003 — Fixed Map Exploration Lab

Small 2D top-down controlled comparison for EXP-004, EXP-006, and the EXP-050 comparison. The UI has two top-level Experiment Modes; EXP-050 is exposed as Test Conditions inside Shortcut. Both modes use the exact same hand-authored map, movement, collision, landmarks, target order, and three-run session structure.

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
- Shortcut exposes two Test Conditions: `No Key` and `Start With Key`.
- `No Key`: starts closed, opens only from the far / east side with `E`, remains open for Runs 2 and 3, and is traversable both ways. The near side explicitly reports `Locked from this side`; the larger far-side interaction area reports `[E] Unlock Shortcut`.
- `Start With Key`: begins with exactly one key; near side shows `[E] Use Key — Unlock Shortcut`, consumes the key on use, and keeps the gate open for the session. The player may ignore it and still unlock normally from the far side without consuming the key.

### EXP-050 comparison — Keyed Shortcut Access

- Status: `TESTING`
- Result: `Untested`
- Question: does starting with one key lead the player to open the known shortcut early and change route planning?
- EXP-050 remains a distinct Experiment record, but is not a third top-level mode. Its `No Key` / `Start With Key` comparison is surfaced by the Test Condition control inside `EXP-006 · Shortcut`.

Technical completion does not assign an EXP-050 gameplay result. Player should compare No Key, then Start With Key.

## Controls

- `WASD` / Arrow Keys — move
- `E` — use the currently displayed gate interaction in Shortcut mode
- `R` / Restart — reset the complete current session
- Experiment Mode or Test Condition buttons — switch selection and reset the complete session

## Fixed Test Conditions

- One fixed 1600 × 1000 world and identical collision geometry in both top-level modes.
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

- Both top-level modes share one map and reset cleanly on Restart / mode / condition switch.
- EXP-004 never allows shortcut interaction.
- EXP-006 Shortcut contains exactly one gate and exposes No Key / Start With Key Test Conditions.
- EXP-050 remains separately documented; its No Key condition matches the EXP-006 baseline, while Start With Key can consume one key to open from the near side or preserve it and unlock from the far side.
- Mode, condition, and Restart changes fully reset the gate, key, run, timer, prompt, and summary state.
- Each mode records three run times and ends with a non-judgmental reflection prompt.
- Production build and GitHub Pages are verified separately during handoff.
