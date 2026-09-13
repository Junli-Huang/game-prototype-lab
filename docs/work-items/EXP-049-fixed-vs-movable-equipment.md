# EXP-049 — Fixed vs Movable Equipment Work Item

Status: ACTIVE IMPLEMENTATION REQUEST

Experiment: EXP-049 — Fixed vs Movable Equipment

Prototype: `prototypes/001_spatial_backpack/`

## Goal

Implement EXP-049 as a fourth Experiment Mode in Backpack Lab to isolate one question:

> Under the same High Occupancy required-equipment loadout and the same Loot sequence, does allowing required equipment to move / rotate create better spatial decisions than locking it in place?

This task may be executed in the same Work session immediately after `EXP-048-review-fix-01.md`.

## Dependency / Execution Order

Work must execute in this order:

1. Complete `docs/work-items/EXP-048-review-fix-01.md` including browser / Pages acceptance.
2. Then implement this EXP-049 Work Item.
3. Do not begin EXP-049 by changing or weakening the EXP-048 review-fix acceptance requirements.

## Experiment Mode

Add a fourth Experiment Mode:

1. EXP-001 — Spatial Placement
2. EXP-003 — Equipment vs Loot
3. EXP-048 — Body Equipment Storage
4. EXP-049 — Fixed vs Movable Equipment

Switching Experiment Mode starts a completely fresh Session.

## Test Conditions

EXP-049 has exactly two Test Conditions.

### A — Movable Required Equipment

Use the existing EXP-003 Heavy / High Occupancy required-equipment set:

| Equipment | Size | Starting Position |
| --- | ---: | --- |
| Old Rifle | 1×4 | existing Heavy start |
| Field Armor | 2×3 | existing Heavy start |
| Field Medkit | 1×1 | existing Heavy start |

Total area: 11 / 48.

Rules:

- Required Equipment cannot be discarded.
- Required Equipment can be dragged to another legal backpack position.
- Required Equipment can be rotated using the same rotation interaction as backpack Loot.
- Required Equipment must obey normal bounds and overlap rules.
- Required Equipment remains visually distinct and marked REQUIRED / equivalent wording.

### B — Locked Required Equipment

Use the exact same equipment set, sizes, starting positions, and Loot sequence.

Rules:

- Required Equipment cannot move.
- Required Equipment cannot rotate.
- Required Equipment cannot be discarded.

This should reproduce the current EXP-003 Heavy Locked behavior as closely as practical.

## Fixed Loot Sequence

Both conditions use exactly the existing EXP-003 Heavy Loot sequence:

1. 罐装肉 — 1×2 — Value 25
2. 废旧电池 — 2×2 — Value 35
3. 机械零件 — 2×3 — Value 65
4. 未知组织 — 2×3 — Value 80
5. 黑色遗物 — 3×3 — Value 120
6. 木板 — 1×3 — Value 18
7. 密封仪器 — 3×5 — Value 190

Do not change order, dimensions, values, backpack size, or starting equipment geometry between conditions.

## Important Isolation Rule

The only intended variable is Required Equipment mobility.

Do not also change:

- occupancy amount;
- starting positions;
- equipment dimensions;
- Loot sequence;
- Loot rules;
- backpack size;
- discard rules for Loot;
- summary semantics.

Do not implement the full Low / High × Movable / Locked matrix.

## Interaction Requirements

Reuse existing Backpack Lab behavior where practical.

Movable Required Equipment must:

- be draggable from its current backpack location;
- use grid snapping;
- reject overlaps and out-of-bounds placement;
- rotate with `R` while being dragged;
- return to its original state on cancelled / invalid placement;
- never enter the discard list;
- never enter Body Slots;
- remain present throughout the Session.

Locked Required Equipment must remain non-interactive for move / rotate and non-discardable.

If a Required Equipment item is dragged over the discard zone in Movable mode, reject the discard and return it to the original backpack position with clear feedback.

## UX

EXP-049 controls should clearly show:

- `Movable Required Equipment`
- `Locked Required Equipment`

Do not use labels that imply combat strength, character class, or gear quality.

The page should explain briefly that all Required Equipment must be carried in both conditions; only mobility differs.

## Summary

At Session Complete show at least:

- active Test Condition;
- Required Equipment retained;
- Loot kept;
- Loot discarded;
- Loot kept Value.

Do not grade the player or recommend one condition.

## Preserve History

Do not rewrite EXP-003 as though its original Locked Equipment implementation had been Movable.

EXP-003 remains historical evidence for the equipment-area experiment.

EXP-049 is a new experiment because it isolates a different question: fixed obstacle geometry versus movable mandatory equipment.

## Non-goals

Do not add:

- Body Slots or any EXP-048 mechanics into EXP-049;
- access speed;
- combat / stats / healing / firing;
- durability / exposure / damage;
- weight / stamina;
- auto-sort / auto-pack;
- random Loot;
- more occupancy levels;
- multiple equipment loadouts;
- shared Inventory / Equipment / Rule frameworks.

## Acceptance

EXP-049 is technically accepted when:

1. Backpack Lab exposes EXP-049 as a distinct fourth Experiment Mode.
2. EXP-049 has exactly two Test Conditions: Movable Required Equipment and Locked Required Equipment.
3. Both conditions use the same Heavy required-equipment set, starting positions, dimensions, total area 11 / 48, and seven-item Loot sequence.
4. Movable Required Equipment can be moved and rotated within the backpack but cannot be discarded.
5. Locked Required Equipment cannot move, rotate, or be discarded.
6. Invalid move / overlap / bounds / discard attempts do not corrupt state.
7. Switching condition, mode, or Restart fully resets Required Equipment positions/orientation, Loot, discarded list, current item, summary, and drag state.
8. EXP-001, EXP-003, and EXP-048 historical behavior remains available.
9. `npm run build` passes.
10. Backpack Lab works on the deployed GitHub Pages path and on direct refresh.
11. Prototype README, project-state, Backlog, and CURRENT are synchronized.
12. EXP-049 gameplay result remains `TESTING / Untested` until the Player actually compares both conditions.

## Completion

After technical acceptance:

- set EXP-049 to `TESTING / Result: Untested`;
- preserve EXP-048 Player Result as `MAYBE` with feedback “感觉有使用的价值。”;
- update documentation;
- close `docs/work-items/CURRENT.md` back to `No active implementation task`;
- do not automatically select EXP-050 or another Backlog item.
