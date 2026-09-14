# Project State — Cold Start Snapshot

Updated: 2026-09-14

This file is the compact current-state handoff for a new Chat / Designer / Reviewer session. It does not replace the detailed Experiment Backlog, Prototype READMEs, Workflow, or historical Work Items.

## Read order for a new Chat

1. `README.md`
2. `docs/project-state.md` — this file
3. `docs/philosophy.md`
4. `docs/workflow.md`
5. `docs/experiment-backlog.md`
6. `docs/work-items/CURRENT.md`
7. The README of the Prototype relevant to the discussion
8. Any design-note file explicitly linked below

Before implementation, also read `docs/asset-handoff.md` and the selected Work Item.

## Current implementation task

**No active implementation task.**

EXP-048 Review Fix 01 and EXP-049 have completed implementation, real-browser interaction verification, and GitHub Pages acceptance. EXP-048 remains `MAYBE`. EXP-049 has now been Player-compared and is `MAYBE / Prefer Movable`. `docs/work-items/CURRENT.md` is closed until another task is explicitly selected.

## Prototype #001 — Backpack Lab

Implementation directory:

`prototypes/001_spatial_backpack/`

### EXP-001 — Spatial Backpack Placement

Status: `MAYBE`

Player feedback:

> “还可以，有点意思。”

Interpretation: light positive signal, not strong enough for INTERESTING.

### EXP-003 — Equipment vs Loot Space

Status: `TESTING / Result: Untested`

Important correction: EXP-003 must remain untested. A prior documentation sync accidentally changed it to MAYBE, but the Player has not provided an EXP-003 gameplay result.

EXP-003 tests whether mandatory starting equipment consuming backpack area creates meaningful loot-space pressure. Its historical implementation uses Locked Equipment. Do not infer the EXP-049 mobility result as an EXP-003 result.

### EXP-048 — Body Equipment Storage

Status: `MAYBE`

Player feedback:

> “感觉有使用的价值。”

Interpretation: positive but limited signal. Body Equipment Storage appears useful, but current evidence is not strong enough for INTERESTING.

Review Fix 01 changed the default condition to Backpack Only and completed real-browser / Pages acceptance without changing the frozen nine-item parameters.

### EXP-049 — Fixed vs Movable Equipment

Status: `MAYBE / Prefer Movable`

Player feedback after comparing both conditions:

> “整体上我更喜欢不带 lock 的。”

Interpretation:

- Movable Required Equipment is preferred over Locked Required Equipment.
- Locked Required Equipment currently adds more friction than useful spatial planning.
- Default future direction should therefore be movable mandatory equipment unless a later experiment supplies a separate reason for fixed geometry.
- This result does not automatically upgrade movable equipment to INTERESTING; it is a directional comparison result.

Both conditions used the same Heavy 11 / 48 Required Equipment geometry and the same seven-item Loot sequence; only mobility changed.

## Prototype #002 — Enemy Respawn Lab

Implementation directory:

`prototypes/002_campfire_respawn/`

### EXP-007 — Campfire World Refresh

Status: `MAYBE / Stop`

Player feedback:

> “没有好坏的感受，就一般。”

R2 feedback:

> “体验下来没有明显的感觉。”

### EXP-008 — Blood Moon World Refresh

Status: `MAYBE / Stop`

R2 feedback:

> “体验下来没有明显的感觉。”

Current learning:

> World Refresh appears more likely to be a supporting structure whose value depends on broader gameplay context than a mechanism that creates a strong standalone experience in this short prototype.

## Inventory / Equipment design direction

Current tested sequence:

1. EXP-001 — Spatial Backpack Placement — `MAYBE`.
2. EXP-003 — Equipment vs Loot Space — `TESTING / Untested`.
3. EXP-048 — Body Equipment Storage — `MAYBE`.
4. EXP-049 — Fixed vs Movable Equipment — `MAYBE / Prefer Movable`.

Current directional learning:

- Spatial backpack placement has a light positive signal.
- Body storage has practical value.
- When mandatory equipment occupies backpack space, making it movable is preferred to locking it in place.
- Locked geometry should not be the default unless future experiments demonstrate distinct value.

Later candidates remain recorded in:

`docs/inventory-equipment-experiment-notes.md`

Recommended sequencing principle remains:

`space → access → exposure / risk`

Do not combine body slots + quick access + durability + combat damage without a separate experiment.

## Next step

No next implementation task is selected.

Designer / Player discussion should choose the next question before a new Work Item is created. Candidate directions include continuing the Inventory chain (for example access speed / external mounts) or moving to another READY experiment such as time/ecology or persistent-corpse questions.

## Repository handoff rules that must remain true

- Experiment = question; Prototype = playable test container.
- One question per Experiment, not necessarily one Prototype per Experiment.
- Internal test conditions are not automatically separate Experiment Modes.
- Preserve historical Player results; revisions add new conditions/results rather than rewriting old observations.
- Technical acceptance is not a gameplay conclusion.
- Do not infer EXP-003 gameplay status from EXP-049.
- Ready visual assets are Prototype-local under `assets/`; Work should use them directly instead of recreating them unless unusable.
- Do not build shared Inventory / Rule / Mode / Asset frameworks for speculative reuse.
- Work begins only when CURRENT points to a formal Work Item.

## Known documentation caveat

Some older detailed files may still use historical labels such as `TESTING`, `Respawn`, `Light / Heavy`, or may contain the accidental EXP-003 MAYBE sync from the EXP-049 handoff commit. Treat this snapshot plus the latest explicit experiment Result records as the current decision state until those historical documentation inconsistencies are fully normalized.
