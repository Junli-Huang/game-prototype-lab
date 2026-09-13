# EXP-049 — Fixed vs Movable Equipment

Status: READY / Selected

Category: Inventory

Selected: 2026-09-13

## Context

EXP-003 currently represents starting equipment as Locked Equipment inside the 6×8 backpack. The Player reported that the locked / non-movable behavior feels poor.

Rather than assuming that Locked Equipment is simply wrong, EXP-049 isolates that behavior as its own experiment.

This preserves the distinction:

- EXP-003 asks whether mandatory starting equipment consuming backpack area creates meaningful loot-space pressure.
- EXP-049 asks whether making that mandatory equipment spatially fixed creates additional meaningful planning, or merely adds friction.

EXP-003 historical implementation and result records must remain available and must not be rewritten as if it had tested movable equipment.

## Question

> 在相同装备数量、尺寸、初始位置与 Loot 序列下，装备是否允许在背包中移动 / 旋转，会不会改变背包整理的乐趣与决策质量？

## Core Variable

Equipment mobility only.

Everything else must remain identical between the two Test Conditions.

## Test Conditions

Use the existing EXP-003 **High Occupancy / Heavy** starting equipment set for both conditions.

### A — Movable Required Equipment

- Old Rifle — 1×4
- Field Armor — 2×3
- Field Medkit — 1×1
- Total required equipment area: 11 / 48
- Equipment begins in the same starting positions as the current Heavy condition.
- Equipment is mandatory and cannot be discarded.
- Equipment may be moved inside the backpack.
- Equipment may be rotated where geometry allows.

### B — Locked Required Equipment

Use the exact same three equipment items, starting positions, dimensions, and Loot sequence.

Difference:

- Equipment cannot move.
- Equipment cannot rotate.
- Equipment cannot be discarded.

This condition represents the current Locked Equipment behavior.

## Fixed Loot Sequence

Use the same seven-item Loot sequence already used by EXP-003 Heavy:

1. Canned Meat / 罐装肉 — 1×2 — Value 25
2. Old Battery / 废旧电池 — 2×2 — Value 35
3. Mechanical Parts / 机械零件 — 2×3 — Value 65
4. Unknown Tissue / 未知组织 — 2×3 — Value 80
5. Black Relic / 黑色遗物 — 3×3 — Value 120
6. Wood Plank / 木板 — 1×3 — Value 18
7. Sealed Instrument / 密封仪器 — 3×5 — Value 190

Do not change order, dimensions, values, backpack size, equipment area, or starting layout between conditions.

## Why High Occupancy Only

Do not create the full Low / High × Movable / Locked matrix in this experiment.

High Occupancy is used because:

- spatial pressure is stronger;
- the effect of fixed obstacles is easier to observe;
- it isolates mobility without multiplying the number of formal comparisons.

If EXP-049 later shows a meaningful signal, Low Occupancy can be considered as a follow-up condition rather than being prebuilt now.

## Interaction

Both conditions:

- use the existing 6×8 backpack;
- use drag / grid snapping / overlap rejection / bounds rejection;
- allow Loot rearrangement / rotation / discard;
- keep Required Equipment non-discardable;
- use the same next-item progression, restart, value summary, and session-complete behavior.

Movable condition additionally allows Required Equipment to be dragged and rotated.

Required Equipment should remain visually distinct from Loot and clearly labeled as required / non-discardable. Do not represent mobility as an equipment stat or character ability.

## What to Observe

Strong signal for Movable:

- the player actively rearranges required equipment to solve later packing pressure;
- equipment placement itself becomes part of spatial planning;
- the player reports less arbitrary frustration while retaining meaningful tradeoffs.

Strong signal for Locked:

- fixed obstacles create interesting route / packing constraints rather than mere annoyance;
- the player plans around fixed geometry and finds that planning enjoyable.

Weak / negative Locked signal:

- the player mainly experiences the fixed equipment as artificial obstruction;
- the same meaningful decisions remain when equipment is movable, but with less friction.

Do not infer superiority from retained Value alone; Player experience and observed decisions are primary.

## Non-goals

Do not add:

- equipment combat effects;
- access speed;
- body slots;
- external mounts;
- durability / damage / exposure;
- weight / encumbrance;
- equipment replacement;
- auto-sort;
- auto-pack;
- random Loot;
- additional occupancy levels;
- shared inventory framework refactors.

## Result

TBD — not implemented / not played.

- Observed: TBD
- Interesting Moment: TBD
- Boring Moment: TBD
- Decisions: TBD
- Unexpected: TBD
- Next: TBD

## Prototype

Implement as a fourth Experiment Mode in:

`prototypes/001_spatial_backpack/`

Proposed mode list:

1. EXP-001 — Spatial Placement
2. EXP-003 — Equipment vs Loot
3. EXP-048 — Body Equipment Storage
4. EXP-049 — Fixed vs Movable Equipment

Sharing Backpack Lab is for controlled comparison fidelity only. Do not build a generalized mode / inventory framework for speculative reuse.
