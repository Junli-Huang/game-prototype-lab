# Project State — Cold Start Snapshot

Updated: 2026-09-13

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

There is **no active implementation task**.

The next experiment has now been selected: **EXP-048 — Body Equipment Storage**.

Experiment definition:

`docs/experiments/EXP-048-body-equipment-storage.md`

EXP-048 is READY / Selected, but implementation is intentionally gated until the concrete item sequence, body-slot capacities, legal mappings, and any required assets are frozen in a formal Work Item. `docs/work-items/CURRENT.md` must remain `No active implementation task` until that Work Item exists.

## Prototype #001 — Backpack Lab

Implementation directory:

`prototypes/001_spatial_backpack/`

### EXP-001 — Spatial Backpack Placement

Status: `MAYBE`

Player feedback:

> “还可以，有点意思。”

Interpretation: light positive signal, not strong enough for INTERESTING. Preserve the historical result; do not add features merely to improve its rating.

### EXP-003 — Equipment vs Loot Space

Status: `TESTING / Result: Untested`

Implemented and technically accepted. Waiting for Player gameplay evaluation.

Experiment-level change relative to EXP-001:

> A session starts with some backpack cells already occupied by **Locked Equipment** that cannot be moved, rotated, or discarded.

Important terminology:

- `Low / High Starting Equipment Occupancy` are **Test Conditions inside EXP-003**.
- Existing UI may still say `Light / Heavy`; these labels are not separate Experiment Modes, classes, builds, or gameplay systems.
- Both conditions receive the same fixed Loot sequence. Only starting locked-equipment occupancy differs.

Do not infer equipment power, combat, body slots, durability, or access-speed conclusions from EXP-003.

### EXP-048 — Body Equipment Storage

Status: `READY / Selected next experiment`

Not implemented yet.

Core change relative to EXP-003:

> Compatible items may be stored on a small number of explicit body carry locations outside the backpack interior instead of consuming backpack grid cells.

Planned first body locations:

- Back
- Waist
- Chest

Planned comparison inside EXP-048:

- Backpack Only
- Body Slots Available

These are Test Conditions inside one Experiment, not separate Experiment Modes.

The experiment tests **storage location only**. Do not add access speed, combat power, quick slots, durability, exposure risk, weight, or general inventory architecture.

Detailed definition:

`docs/experiments/EXP-048-body-equipment-storage.md`

## Prototype #002 — Enemy Respawn Lab

Implementation directory:

`prototypes/002_campfire_respawn/`

### EXP-007 — Campfire World Refresh

R1 enemy-only result: `MAYBE`.

Player feedback:

> “没有好坏的感受，就一般。”

R2 used the shared recommended Refresh Profile:

- Enemies: ON
- Common Resources: ON

R2 Player feedback:

> “体验下来没有明显的感觉。”

Current conclusion: `MAYBE / Stop`.

### EXP-008 — Blood Moon World Refresh

R2 used the same Refresh Profile as EXP-007; only the World Refresh trigger differed.

R2 Player feedback:

> “体验下来没有明显的感觉。”

Current conclusion: `MAYBE / Stop`.

### #002 decision

Do **not** continue with R3 by adding treasure, more enemies, ecology, or extra reset categories merely to make the experiment feel stronger.

Current learning:

> World Refresh appears more likely to be a supporting structure whose value depends on a broader gameplay context than a mechanism that creates a strong standalone experience in this short prototype.

EXP-007 / EXP-008 may be reconsidered later inside a richer route / ecology / persistent-world context, but #002 is currently stopped.

Detailed R2 outcome is preserved in:

`docs/work-items/EXP-007-008-world-refresh-profile-r2-result.md`

## Inventory / Equipment design direction

The Inventory line is now continuing with **EXP-048 — Body Equipment Storage**.

Design history and later candidates remain recorded in:

`docs/inventory-equipment-experiment-notes.md`

Current sequencing:

1. EXP-048 — Body Equipment Storage — **selected / READY**.
2. Spatial / Anatomical Mount Points — later candidate.
3. External Backpack Mounts — later candidate.
4. Access Speed by Location — later candidate.
5. Hand-Carried Items — later candidate.
6. External Item Exposure — later candidate.
7. Quantity / Condition Loss — later candidate.

Recommended sequencing principle remains:

`space → access → exposure / risk`

Do not combine body slots + quick access + durability + combat damage in EXP-048.

## Next discussion

The next step is **EXP-048 parameter definition, not implementation yet**.

Before writing the Work Item, freeze:

- exact item sequence and dimensions;
- body-slot capacities;
- legal item-to-location mappings;
- whether simple body/location visual assets should be prepared in advance.

After those are fixed, write `docs/work-items/EXP-048-body-equipment-storage.md` and update `CURRENT.md` to authorize Work.

## Repository handoff rules that must remain true

- Experiment = question; Prototype = playable test container.
- One question per Experiment, not necessarily one Prototype per Experiment.
- Internal test conditions are not automatically separate Experiment Modes.
- Preserve historical Player results; revisions add new conditions/results rather than rewriting old observations.
- Technical acceptance is not a gameplay conclusion.
- Ready visual assets are Prototype-local under `assets/`; Work should use them directly instead of recreating them unless unusable.
- Do not build shared Inventory / Rule / Mode / Asset frameworks for speculative reuse.
- A selected READY Experiment is still not implementation authorization; Work begins only when CURRENT points to a formal Work Item.

## Known documentation caveat

Some older detailed files may still use historical labels such as `TESTING`, `Respawn`, or `Light / Heavy` in implementation-history sections. Treat this snapshot plus the latest explicit Result records as the current decision state; historical text should remain available when it documents what was actually tested at that time.
