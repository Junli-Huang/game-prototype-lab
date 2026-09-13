# EXP-048 — Body Equipment Storage Work Item

Status: ACTIVE IMPLEMENTATION REQUEST

Experiment: EXP-048 — Body Equipment Storage

Prototype: `prototypes/001_spatial_backpack/` (Backpack Lab)

## Goal

Implement EXP-048 as a new Experiment Mode inside Backpack Lab to test whether explicit body carry locations create meaningful allocation decisions beyond a single 6×8 spatial backpack.

This is a **storage-location** experiment only.

## Experiment Question

> 当玩家身体本身也成为有限携带空间，而且部分物品可以选择放入背包或挂到身体位置时，“物品放在哪里”是否会产生新的、有意义的空间分配决策？

The implementation must not add access-speed, combat-power, durability, exposure-risk, weight, or character-build variables.

## Experiment Mode

Add a third independent Experiment Mode to Backpack Lab:

1. EXP-001 — Spatial Placement
2. EXP-003 — Equipment vs Loot
3. EXP-048 — Body Equipment Storage

EXP-001 and EXP-003 historical behavior and Player results must remain unchanged.

Switching Experiment Mode must fully reset the current session.

## Test Conditions

EXP-048 contains two **Test Conditions**, not separate Experiment Modes:

### A — Backpack Only

- Existing 6×8 backpack only.
- All nine test items must be placed in the backpack or discarded.
- Body locations are unavailable for storage.

### B — Body Slots Available

- Same 6×8 backpack.
- Same nine items, in the exact same order, dimensions, and values as Condition A.
- Compatible items may be stored either in the backpack or on their one legal body location.
- Body locations are limited resources and can each hold exactly one item.

Switching Test Condition must fully reset the session.

## Body Locations

Exactly three locations:

| Location | Capacity |
| --- | ---: |
| Back | 1 item |
| Chest | 1 item |
| Waist | 1 item |

Do not add left/right variants, legs, arms, hands, backpack exterior, generic quick slots, or extra locations.

Each compatible item has exactly one legal body location in this experiment. Do not allow one item to choose among multiple body locations.

## Fixed Item Sequence

Use this exact sequence in both Test Conditions:

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

The three body-location competitions are therefore:

- Waist: Compact Sidearm vs Ammo Pouch
- Chest: Field Medkit vs Utility Pouch
- Back: Old Rifle vs Field Tool

The maximum area that can be moved out of the backpack by choosing the largest compatible item for every body location is:

- Waist: 6
- Chest: 6
- Back: 8
- Total: **20**

Therefore even under the most space-efficient Body Slots allocation, at least **50 cells** of item area remain for a **48-cell** backpack. Body Slots Available must still preserve some storage pressure and cannot become unconditional free capacity.

Do not surface the 20-cell maximum or an optimal allocation answer in the UI.

## Interaction

Reuse the existing Backpack Lab interaction model where practical:

- drag items;
- rotate backpack items with the existing rotation control;
- grid snapping;
- overlap / bounds rejection;
- rearrange already stored backpack items;
- discard;
- next-item progression;
- restart;
- session summary.

For Condition B:

- a compatible item may be dragged from the current-item tray or backpack onto its legal body location;
- a body-carried item may be moved back into the backpack if space allows;
- a body-carried item may be discarded using the same discard semantics;
- placing a second item onto an occupied body location must be rejected unless the player first moves/removes the existing item;
- body storage does not have orientation or multi-cell packing; one location holds one compatible item;
- an incompatible item dropped on a body location must be rejected without changing model state.

Do not add auto-swap, auto-equip, automatic best-slot selection, or one-click optimization.

## Visual / UX

Use a minimal readable body-area representation rather than a conventional RPG equipment menu.

Required locations must read spatially as:

- Back
- Chest
- Waist

A simple CSS/DOM silhouette or body-area diagram is sufficient. Do not imply armor stats, rarity, character class, or combat equipment power.

The item itself should remain visually identifiable when stored on the body. Reuse current Backpack Lab visual language and existing prototype-local item art where practical.

### Assets Ready

None newly required.

Do not create an AssetManager, shared asset registry, or cross-Prototype asset dependency. Existing Prototype-local visuals may be reused. New minimal icons/labels may be implemented locally only if needed for readability.

## Summary

At Session Complete, show at least:

- Test Condition;
- items kept in Backpack;
- items carried on Body, grouped or labeled by location;
- discarded items;
- total kept Value.

Do not display a correctness grade, recommended condition, optimal body allocation, or target score.

## What the Player Test Should Reveal

The implementation should make it possible to observe whether the player:

- reserves a body location for a later item;
- keeps a compatible item in the backpack despite an available body location;
- reconsiders an earlier body allocation when a competing item appears;
- moves items between Backpack and Body to solve later space pressure;
- treats body locations as scarce carry space rather than automatic free storage.

A weak signal is that every compatible item is immediately mounted whenever its location is free, with no meaningful reconsideration.

Do not encode telemetry or analytics systems just for this experiment. Player observation and post-session notes are sufficient.

## Non-goals

Do not implement:

- attack, defense, healing, firing, combat, or item-use effects;
- equipment stats, rarity, armor values, buffs, character classes, builds;
- access speed, draw speed, quick-use benefits, quick slots, hotkeys as a gameplay variable;
- durability, condition, quantity loss, breakage, contamination, exposure, damage, item drop from hits;
- weight, encumbrance, stamina, movement penalties;
- detailed anatomical simulation;
- multiple legal body locations for one item;
- external backpack mounts;
- hand-carried items;
- body-slot upgrades;
- random item order;
- procedural loot;
- a general Inventory / Equipment / Slot / Rule / Mode framework for speculative reuse.

## Acceptance

Implementation is technically accepted when all of the following are true:

1. Backpack Lab exposes EXP-048 as a distinct Experiment Mode without altering EXP-001 / EXP-003 historical behavior.
2. EXP-048 exposes Backpack Only and Body Slots Available as Test Conditions inside EXP-048.
3. Both conditions use the exact same nine-item sequence, dimensions, values, and order from this Work Item.
4. Body Slots Available has exactly Back / Chest / Waist, one item each, with the exact compatibility mapping above.
5. Backpack Only cannot store anything on body locations.
6. Compatible items can move Backpack ↔ legal Body Location and can be discarded.
7. Incompatible or occupied body-location drops are rejected without corrupting state.
8. Mode / condition switch and Restart fully reset all backpack, body, discarded, current-item, value, summary, drag, and orientation state.
9. Session Summary distinguishes Backpack / Body / Discarded and shows kept Value without declaring an optimum.
10. `npm run build` passes.
11. Existing GitHub Pages multi-page deployment remains valid.
12. Prototype README is updated with EXP-048 implementation details, fixed parameters, controls, technical acceptance, and Result still marked `TESTING / Untested` until Player feedback exists.
13. `docs/project-state.md`, `docs/experiment-backlog.md`, and `docs/work-items/CURRENT.md` are synchronized at implementation completion according to the normal workflow.

## Result Discipline

Technical completion does **not** make EXP-048 INTERESTING or validate the hypothesis.

After implementation, status should become `TESTING / Result: Untested` until the Player actually plays both conditions and provides feedback.

Do not infer a gameplay conclusion from build success, UI correctness, or capacity arithmetic.
