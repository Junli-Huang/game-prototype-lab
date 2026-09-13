# EXP-048 — Body Equipment Storage

Status: READY / Selected next experiment

Category: Inventory

Selected: 2026-09-13

## Context

EXP-001 established a light positive signal for spatial backpack placement (`MAYBE`). EXP-003 then tested the pressure created when Locked Equipment consumes backpack cells; it is implemented and still awaiting Player gameplay evaluation.

EXP-048 continues the Inventory line without adding access speed, combat effects, durability, or exposure risk.

The experiment-level change is:

> Some compatible items may be stored on explicit body carry locations outside the backpack interior instead of consuming backpack grid cells.

This is a storage-location experiment, not a traditional RPG equipment-power experiment.

## Gameplay Hypothesis

If the player has a small number of explicit body carry locations in addition to the 6×8 spatial backpack, choosing where an item is carried may become a meaningful allocation decision rather than merely adding free capacity.

## Question

> 当玩家身体本身也成为有限携带空间，而且部分物品可以选择放入背包或挂到身体位置时，“物品放在哪里”是否会产生新的、有意义的空间分配决策？

The important signal is not whether the player enjoys receiving extra capacity. The experiment should observe whether limited body locations themselves become scarce resources that the player deliberately allocates.

## Core Variable

Availability of explicit body storage locations outside the backpack interior.

Everything else should stay as close as practical to the existing Backpack Lab interaction model.

## Proposed Prototype / Mode

Reuse `prototypes/001_spatial_backpack/` as another independent Experiment Mode in **Backpack Lab** because EXP-001, EXP-003, and EXP-048 share the same spatial inventory interaction and can form a controlled comparison.

Proposed mode list after implementation:

1. EXP-001 — Spatial Placement
2. EXP-003 — Equipment vs Loot
3. EXP-048 — Body Equipment Storage

Sharing this Prototype is for comparison fidelity, not for creating a reusable inventory framework.

## Test Conditions

Use two Test Conditions inside EXP-048. They are not separate Experiment Modes.

### Condition A — Backpack Only

All test items must be carried inside the existing 6×8 backpack.

### Condition B — Body Slots Available

The exact same item sequence is used, but compatible items may instead be placed on a limited body carry location.

Initial location set:

- Back
- Waist
- Chest

Initial compatibility examples:

- Old Rifle → Backpack or Back
- Compact Sidearm → Backpack or Waist
- Field Medkit → Backpack or Chest

Exact item dimensions, sequence, counts, and starting state must be frozen in the implementation Work Item before coding begins.

## Minimum Scope

- Keep the existing 6×8 backpack grid and core drag / place / rotate / discard interaction where applicable.
- Add a minimal readable body-area representation with explicit Back / Waist / Chest locations.
- Compatible test items can be moved either into the backpack or onto their legal body location in the Body Slots condition.
- Body locations have limited capacity; placing an item there consumes that location.
- The Backpack Only condition receives the same item sequence but cannot use body locations.
- Switching Test Condition or Experiment Mode starts a completely fresh session.
- Final summary should distinguish backpack-carried items, body-carried items, and discarded items without declaring one condition correct.

## Visual Direction

Do not default to a conventional RPG equipment menu with generic rectangular `Helmet / Armor / Weapon / Boots` slots.

Prefer a minimal body silhouette or spatial body-area diagram where Back / Chest / Waist are visually understandable as **carry locations**.

The visual question is whether location itself is legible. It should not imply character stats or gear rarity.

## What to Observe

Strong evidence would include spontaneous decisions such as:

- reserving a body location for a larger or more awkward item;
- keeping an item in the backpack even though it could be mounted externally;
- moving an item between backpack and body because another compatible item competes for the same location;
- describing body locations as scarce carry space rather than automatic free capacity.

A weak / negative signal would be:

> If an item can go on the body, always put it there immediately, with no meaningful reason to consider keeping the slot free.

In that case Body Equipment Storage may currently function only as free expansion rather than a meaningful allocation system.

## Non-goals

Do **not** add any of the following in EXP-048:

- attack / defense / healing effects;
- weapon firing or combat;
- equipment stats, rarity, builds, classes, armor values, or buffs;
- access speed, draw speed, quick slots, or hotkeys as a gameplay variable;
- durability, quantity loss, breakage, damage, contamination, exposure, or dropping from hits;
- weight, encumbrance, stamina, character movement penalties;
- detailed anatomical simulation;
- external backpack mounts as a separate system;
- hand-carried items;
- a general Inventory / Equipment / Slot / Rule framework for future experiments.

Those remain separate candidate questions. The sequencing principle remains:

`space → access → exposure / risk`

## Result

TBD — not implemented / not played.

- Observed: TBD
- Interesting Moment: TBD
- Boring Moment: TBD
- Decisions: TBD
- Unexpected: TBD
- Next: TBD

## Implementation Gate

EXP-048 is selected and READY, but there is currently **no active implementation task**.

Before Work begins, Designer / Chat must:

1. freeze the concrete item sequence and dimensions;
2. freeze body-slot capacities and legal item-location mappings;
3. decide whether any Ready visual assets are needed;
4. write `docs/work-items/EXP-048-body-equipment-storage.md` with Scope / Non-goals / Acceptance;
5. update `docs/work-items/CURRENT.md` to point to that Work Item.

Until then, Work must not infer implementation details from this experiment definition.
