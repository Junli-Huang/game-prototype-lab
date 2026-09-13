# EXP-048 — Body Equipment Storage

Status: MAYBE

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

## Prototype / Mode

Reuse `prototypes/001_spatial_backpack/` as another independent Experiment Mode in **Backpack Lab** because EXP-001, EXP-003, and EXP-048 share the same spatial inventory interaction and can form a controlled comparison.

Mode list after implementation:

1. EXP-001 — Spatial Placement
2. EXP-003 — Equipment vs Loot
3. EXP-048 — Body Equipment Storage

Sharing this Prototype is for comparison fidelity, not for creating a reusable inventory framework.

## Test Conditions

Use two Test Conditions inside EXP-048. They are not separate Experiment Modes.

### Condition A — Backpack Only

All nine test items must be carried inside the existing 6×8 backpack or discarded.

### Condition B — Body Slots Available

The exact same nine-item sequence is used, but compatible items may instead be placed on a limited body carry location.

Body locations:

- Back — capacity 1 item
- Waist — capacity 1 item
- Chest — capacity 1 item

Each compatible item has exactly one legal body location in this experiment.

## Fixed Item Sequence

| # | Item | Backpack Size | Area | Value | Legal Body Location |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | Compact Sidearm | 1×2 | 2 | 30 | Waist |
| 2 | Canned Food | 1×2 | 2 | 20 | — |
| 3 | Field Medkit | 2×3 | 6 | 45 | Chest |
| 4 | Mechanical Parts | 3×4 | 12 | 65 | — |
| 5 | Old Rifle | 1×5 | 5 | 75 | Back |
| 6 | Ammo Pouch | 2×3 | 6 | 40 | Waist |
| 7 | Utility Pouch | 2×2 | 4 | 35 | Chest |
| 8 | Field Tool | 2×4 | 8 | 55 | Back |
| 9 | Sealed Instrument | 5×5 | 25 | 180 | — |

Total item area: **70** cells.

Body-location competition:

- Waist: Compact Sidearm vs Ammo Pouch
- Chest: Field Medkit vs Utility Pouch
- Back: Old Rifle vs Field Tool

Maximum area removable from the backpack by using all three body locations for their largest compatible items is **20** cells. Therefore at least **50** cells of item area remain against a **48-cell** backpack. Body Slots Available still preserves storage pressure instead of becoming unconditional free capacity.

Do not expose the optimal allocation arithmetic in the UI.

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
- multiple legal body locations for one item;
- a general Inventory / Equipment / Slot / Rule framework for future experiments.

Those remain separate candidate questions. The sequencing principle remains:

`space → access → exposure / risk`

## Result

MAYBE — 2026-09-13 initial Player hands-on feedback: “感觉有使用的价值。”

Interpretation: this is a positive signal that Body Equipment Storage has practical / gameplay value, but the evidence is still too limited to mark the experiment `INTERESTING`.

- Observed: Player reported that the mechanism feels useful / has value.
- Interesting Moment: TBD — not separately reported.
- Boring Moment: TBD — not separately reported.
- Decisions: TBD — no specific allocation decision was separately reported.
- Unexpected: TBD.
- Next: preserve MAYBE; complete the review-fix / technical-acceptance task before using future Backpack Only → Body Slots Available comparisons as cleaner controlled evidence.

## Implementation

The concrete parameters are frozen in:

`docs/work-items/EXP-048-body-equipment-storage.md`

The implementation is present in Backpack Lab. A code review found that the page currently defaults to the treatment condition (`Body Slots Available`) rather than the baseline (`Backpack Only`), and that browser / Pages technical acceptance was not fully closed before CURRENT was cleared.

The active corrective task is:

`docs/work-items/EXP-048-review-fix-01.md`

This review fix must not change the frozen gameplay parameters or reinterpret the Player result above.
