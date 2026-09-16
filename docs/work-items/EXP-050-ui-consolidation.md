# EXP-050 Review Fix — Consolidate Key Test Into Shortcut Mode

Status: ACTIVE IMPLEMENTATION REQUEST

Experiment: EXP-050 — Keyed Shortcut Access

Prototype: `prototypes/003_fixed_map_exploration/`

## Goal

Simplify Prototype #003 UI and test structure without changing the underlying experiment logic.

EXP-050 remains a separate Experiment record and keeps its own gameplay question, but it should no longer appear as a third top-level Experiment Mode.

Instead, expose the EXP-050 comparison as Test Conditions inside the existing Shortcut experience.

## Target UI Structure

Top-level Experiment Modes must become:

1. `EXP-004 · Fixed Map`
2. `EXP-006 · Shortcut`

Remove the third top-level button / mode:

`EXP-050 · Keyed Shortcut`

When `EXP-006 · Shortcut` is selected, show a Test Condition control:

- `No Key`
- `Start With Key`

The Test Condition UI may include a small label such as:

`Shortcut Access · EXP-050 comparison`

Do not present EXP-050 as a third peer Mode.

## Experiment Semantics

This is a UI / test-structure consolidation only.

Preserve the distinction:

- EXP-006 asks whether an unlockable shortcut adds value compared with the fixed-map baseline.
- EXP-050 asks whether starting with a key and therefore having early near-side access changes route planning.

EXP-050 remains documented as a separate Experiment even though its conditions are surfaced under the Shortcut Mode UI.

Do not merge or rewrite the historical EXP-006 result into EXP-050.

## Shortcut Test Conditions

### No Key

Preserve existing EXP-006 baseline behavior:

- shortcut starts closed;
- near / start side cannot open it;
- near side shows `Locked from this side`;
- far side shows `[E] Unlock Shortcut`;
- pressing `E` from the far side opens the gate;
- gate remains open for the rest of the current three-run session.

### Start With Key

Preserve current EXP-050 behavior:

- Run 1 begins with exactly one Shortcut Key;
- HUD clearly shows `Shortcut Key: 1`;
- near side shows `[E] Use Key — Unlock Shortcut`;
- pressing `E` from the near side opens the same gate;
- consume exactly one key and update HUD to `Shortcut Key: 0`;
- the gate remains open for the rest of the session;
- if the Player does not use the key, far-side unlocking still works normally and does not consume the key.

No automatic gate opening.

## Fixed Map Mode

`EXP-004 · Fixed Map` must remain clean and must not show:

- key-condition controls;
- key HUD;
- key prompts;
- EXP-050 labels.

Its sealed-passage behavior remains unchanged.

## Reset Rules

Switching any of the following must start a clean session:

- Fixed Map ↔ Shortcut Mode;
- No Key ↔ Start With Key;
- Restart.

Reset at minimum:

- player position;
- current run;
- current target;
- timers;
- shortcut open state;
- key count;
- key-used state;
- gate-opened-by state;
- later-shortcut-use tracking;
- summary state;
- transient interaction prompts / messages.

## Summary / Experiment Labeling

When Shortcut + No Key is played:

- the visible top-level Mode remains `EXP-006 · Shortcut`;
- summary may identify `Test Condition: No Key`.

When Shortcut + Start With Key is played:

- the visible top-level Mode remains `EXP-006 · Shortcut`;
- summary must clearly identify `Test Condition: Start With Key`;
- include EXP-050 comparison data already implemented: key used, gate first opened by Near-side Key / Far-side Unlock / Never, later shortcut use, and run times.

It is acceptable to show a secondary note such as `EXP-050 comparison` in the summary. Do not restore a third Mode just for labeling.

## Movement Speed

Do not change movement speed in this Work Item.

The Player already reported that speed materially affects experience. Keep the exact same movement speed across:

- EXP-004;
- Shortcut + No Key;
- Shortcut + Start With Key.

No sprint, acceleration, dash, stamina, or tuning changes.

## Non-goals

Do not add:

- map changes;
- new doors;
- key pickups;
- inventory UI;
- multiple keys;
- puzzles;
- combat;
- loot;
- save persistence;
- generalized experiment / rule / door / key framework;
- new gameplay conclusions.

Prefer the smallest refactor necessary. Reuse the current gate/key logic rather than rebuilding it.

## Documentation

On completion:

1. Update `prototypes/003_fixed_map_exploration/README.md` to describe two top-level Modes and the Shortcut Test Conditions.
2. Update `docs/experiments/EXP-050-keyed-shortcut-access.md` to explain that EXP-050 is exposed as Test Conditions under the Shortcut Mode UI.
3. Preserve EXP-006 current Player result: `MAYBE`, positive but limited signal.
4. Preserve EXP-050 as `TESTING / Untested` until Player compares the two conditions.
5. Update `docs/project-state.md` and `docs/experiment-backlog.md` only as needed for structural consistency.
6. Close `docs/work-items/CURRENT.md` after build, browser, and Pages acceptance.

## Acceptance

Complete when:

1. Only two top-level Mode buttons exist: EXP-004 Fixed Map and EXP-006 Shortcut.
2. Shortcut Mode exposes `No Key` and `Start With Key` Test Conditions.
3. EXP-004 does not expose any key controls or HUD.
4. No Key behavior matches the existing far-side-only shortcut unlock.
5. Start With Key behavior matches the existing near-side key unlock and consumes one key.
6. Far-side unlock still works in Start With Key if the Player saves the key.
7. Mode / Condition / Restart resets are complete and deterministic.
8. Summary clearly records the selected condition and existing EXP-050 comparison data.
9. EXP-006 and EXP-050 documentation remain distinct and historically accurate.
10. Movement speed and map geometry are unchanged.
11. `npm run build` passes.
12. Real-browser behavior, deployed GitHub Pages, and direct refresh are verified.
13. No speculative architecture or unrelated feature work is added.
