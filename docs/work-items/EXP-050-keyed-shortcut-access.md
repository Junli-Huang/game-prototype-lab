# EXP-050 Work Item — Keyed Shortcut Access

Status: ACTIVE IMPLEMENTATION REQUEST

Experiment: EXP-050 — Keyed Shortcut Access

Prototype: `prototypes/003_fixed_map_exploration/`

## Goal

Add a third Experiment Mode that reuses the exact Prototype #003 map and gate, testing whether a player who starts with one key will use it to open the shortcut early from the near / start side and thereby change route planning.

Do not redesign the map or movement model.

## Required Implementation

Add Experiment Mode:

`EXP-050 · Keyed Shortcut`

Keep EXP-004 and EXP-006 historically intact.

### Conditions

Provide two Test Conditions inside EXP-050:

1. `No Key`
2. `Start With Key`

Both use the same map, target order, movement speed, collision geometry, gate position, and three-run session structure.

### No Key

Match EXP-006 baseline semantics:

- near side cannot open the gate;
- near side clearly reports `Locked from this side`;
- far side clearly reports `[E] Unlock Shortcut`;
- `E` on far side opens the gate permanently for the current three-run session.

### Start With Key

- begin Run 1 with exactly one Shortcut Key;
- display a simple HUD state such as `Shortcut Key: 1`;
- near-side interaction range shows `[E] Use Key — Unlock Shortcut`;
- pressing `E` from the near side opens the gate;
- consume the key, HUD becomes `Shortcut Key: 0`;
- gate remains open for the rest of the current session;
- if the key is not used, the player may still reach the far side and unlock the gate normally without consuming the key.

No automatic opening. The player must press `E`.

## Interaction Clarity

The user previously experienced an unclear gate interaction. Preserve the corrected UX:

- near side / no key: `Locked from this side`;
- near side / has key: `[E] Use Key — Unlock Shortcut`;
- far side / closed gate: `[E] Unlock Shortcut`;
- opened: readable `OPEN` state and no unlock prompt.

Use a forgiving interaction range. Do not require pixel-perfect positioning.

## Movement Speed

The Player explicitly reported that movement speed materially affects the experience.

For this Work Item:

- keep one fixed movement speed across EXP-004, EXP-006 and both EXP-050 conditions;
- do not tune speed differently between conditions;
- do not add sprint, dash, acceleration, stamina or speed upgrades;
- document movement speed as a known experiential confound for later review.

Do not turn this Work Item into a movement-speed experiment.

## Session Summary

For EXP-050 include at minimum:

- Test Condition;
- whether the key was used;
- when the gate first opened: `Near-side Key`, `Far-side Unlock`, or `Never`;
- whether the shortcut was used in later runs;
- three run times.

Do not grade the player or recommend a condition.

## Non-goals

Do not add:

- inventory UI;
- multiple keys;
- multiple doors;
- key drops;
- random placement;
- puzzles;
- lockpicking;
- combat;
- loot;
- currency;
- save persistence;
- generalized Door / Key / Inventory architecture.

Hardcode the single key and single gate if simplest.

## Documentation

On completion:

1. Update `prototypes/003_fixed_map_exploration/README.md`.
2. Update `docs/experiments/EXP-050-keyed-shortcut-access.md` to `TESTING / Untested` only after technical acceptance.
3. Record the current EXP-006 Player feedback without upgrading beyond the evidence:
   - movement speed materially affected experience;
   - shortcut / gate felt better;
   - EXP-006 = `MAYBE`, positive but limited signal.
4. Keep EXP-004 conclusion conservative; the Player did not provide a clear independent fixed-map familiarity judgment.
5. Restore any accidental unrelated status drift (especially EXP-002 must remain `IDEA`, EXP-003 `TESTING / Untested`).
6. Update `docs/project-state.md` and `docs/experiment-backlog.md` consistently.
7. Close `docs/work-items/CURRENT.md` only after browser + Pages acceptance.

## Acceptance

Complete when:

1. EXP-004 and EXP-006 still work as before.
2. EXP-050 has No Key / Start With Key conditions.
3. No Key reproduces far-side-only unlock behavior.
4. Start With Key can open from near side with `E` and consumes exactly one key.
5. Start With Key can still choose not to use the key and later unlock from far side.
6. Gate state persists across Runs 2 and 3 inside the session.
7. Restart / Mode / Condition switch fully reset key, gate, runs, timer and summary.
8. Interaction prompts are unambiguous on both sides.
9. Movement speed is identical across compared conditions.
10. `npm run build` passes.
11. Real-browser interaction and deployed GitHub Pages/direct-refresh are verified.
12. No speculative architecture or extra gameplay is added.
