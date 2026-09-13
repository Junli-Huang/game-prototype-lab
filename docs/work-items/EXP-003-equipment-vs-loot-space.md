# Work Item — EXP-003 Equipment vs Loot Space

Prototype container: existing `prototypes/001_spatial_backpack/`

Experiments in this Prototype:

- `EXP-001 — Spatial Backpack Placement` — historical MAYBE, preserve unchanged.
- `EXP-003 — Equipment vs Loot Space` — TESTING / Result: Untested.

This is a controlled extension of the existing backpack Prototype, not a new inventory framework.

## Terminology correction

EXP-003 itself is the Experiment.

The experiment-level change relative to EXP-001 is:

> Session 开始时，背包中已经存在一部分不可移动、不可旋转、不可丢弃的 Locked Equipment，占用原本可用于 Loot 的空间。

`Light / Heavy` are NOT separate Experiment Modes and do not represent separate gameplay systems, character classes, builds, or experiments.

They are two fixed **Test Conditions inside EXP-003**, used only to vary the amount of Starting Equipment Occupancy while every later Loot condition remains identical.

Preferred design terminology:

```text
EXP-003 Equipment vs Loot Space

Starting Equipment Occupancy
[Low] [High]
```

The existing UI may continue to display `Light / Heavy` as short labels if changing it is unnecessary, but documentation and interpretation must treat them only as internal test conditions:

```text
Light = Low Starting Equipment Occupancy
Heavy = High Starting Equipment Occupancy
```

Do not interpret the test as “Light Build vs Heavy Build”.

## Goal

Test one question:

> 当背包在出发前已经被 Locked Equipment 占据一部分空间时，这种“预先承诺的空间成本”是否会改变之后对 Loot 的整理、保留和丢弃决策？

The experiment does NOT test weapon power, combat balance, equipment stats, preparation strength, exploration, or loot randomness.

## Hypothesis

If part of the same 6×8 backpack is already occupied by fixed expedition equipment before Loot arrives, then increasing that locked starting occupancy may make later Loot retention and rearrangement decisions more consequential.

The important concept is **Starting Locked Equipment Occupancy**, not the semantic identity of a “light” or “heavy” loadout.

## Why this belongs in Prototype #001

EXP-003 reuses the existing #001 backpack because the following are intentionally identical:

- 6×8 spatial board.
- Drag / drop.
- 90° rotation.
- Overlap / bounds validation.
- Loot visuals and value display.
- Discard area.
- Fixed item sequence.
- Session summary.

Do not create a second backpack implementation merely to isolate the Experiment ID.

EXP-001 and EXP-003 keep independent Hypothesis / Question / Result records.

## Prototype / Experiment Mode

The Prototype may expose the local selector:

```text
Experiment Mode
[Spatial Placement] [Equipment vs Loot]
```

This selector distinguishes EXP-001 from EXP-003.

Inside EXP-003, Low / High Starting Equipment Occupancy is only a **Test Condition selector**, not another Experiment Mode layer.

A change of Experiment Mode or EXP-003 Test Condition starts a fresh session.

## EXP-001 preservation

The current EXP-001 gameplay, fixed 12-item sequence, implementation behavior, and Player Result remain intact.

Historical result remains:

> “还可以，有点意思。”

Do not reinterpret or overwrite EXP-001 because EXP-003 shares its container.

## EXP-003 Test Conditions

Both Test Conditions use:

- the same 6×8 backpack;
- the same Loot sequence;
- the same Loot values;
- the same drag / rotation / rearrangement / discard rules;
- the same session summary;
- the same equipment-lock rule.

Only **Starting Locked Equipment Occupancy** changes.

### Low Starting Equipment Occupancy

Existing short UI label: `Light`.

Fixed equipment:

| Equipment | Size | Fixed position | Asset |
| --- | ---: | --- | --- |
| Compact Sidearm | 1×2 | x=0, y=0 | `assets/equipment_sidearm.svg` |
| Field Medkit | 1×1 | x=1, y=0 | `assets/equipment_field_medkit.svg` |

Total occupied area: **3 / 48** cells.

### High Starting Equipment Occupancy

Existing short UI label: `Heavy`.

Fixed equipment:

| Equipment | Size | Fixed position | Asset |
| --- | ---: | --- | --- |
| Old Rifle | 1×4 | x=0, y=0 | `assets/equipment_old_rifle.svg` |
| Field Armor | 2×3 | x=1, y=0 | `assets/equipment_field_armor.svg` |
| Field Medkit | 1×1 | x=3, y=0 | `assets/equipment_field_medkit.svg` |

Total occupied area: **11 / 48** cells.

These item identities exist to make the locked cells visually understandable. Their weapon / armor / medical meanings have no mechanical effect in EXP-003.

## Equipment rule

Equipment is already packed when the EXP-003 session begins.

Equipment:

- occupies normal backpack cells;
- blocks Loot placement like any other occupied cell;
- is visually distinguishable from Loot;
- cannot be dragged;
- cannot be rotated;
- cannot be discarded;
- has no sell value;
- has no combat, healing, defense, durability, access-speed, body-slot, or other gameplay effect.

This locking is deliberate experimental isolation. Do not add equip / unequip interactions.

## Assets Ready

Ready assets are under:

`prototypes/001_spatial_backpack/assets/`

Use directly:

- `equipment_sidearm.svg`
- `equipment_field_medkit.svg`
- `equipment_old_rifle.svg`
- `equipment_field_armor.svg`

Read:

`prototypes/001_spatial_backpack/assets/README.md`

Existing #001 Designer-owned Loot drawings may be reused. Do not duplicate them into new asset files merely to create an asset framework.

## Fixed Loot sequence

Both EXP-003 Test Conditions receive exactly the same seven Loot items, in the same order:

| Order | Loot | Size | Value | Existing visual identity |
| ---: | --- | ---: | ---: | --- |
| 1 | 罐装肉 | 1×2 | 25 | `can` |
| 2 | 废旧电池 | 2×2 | 35 | `battery` |
| 3 | 机械零件 | 2×3 | 65 | `gear` |
| 4 | 未知组织 | 2×3 | 80 | `organ` |
| 5 | 黑色遗物 | 3×3 | 120 | `relic` |
| 6 | 木板 | 1×3 | 18 | `plank` |
| 7 | 密封仪器 | 3×5 | 190 | `device` |

Total Loot area: **45 cells**.

This is deliberate:

```text
Low occupancy: 3 + 45 = 48
```

All Loot can fit in principle if arranged successfully.

```text
High occupancy: 11 + 45 = 56 > 48
```

All Loot cannot fit; some Loot must be refused or discarded.

Do not display an optimal packing solution.

## EXP-003 loop

```text
Start EXP-003 Test Condition
→ Backpack already contains Locked Equipment
→ Receive fixed Loot one item at a time
→ Place / rotate / rearrange Loot
→ Keep or discard Loot
→ Continue until all 7 Loot items are processed
→ Session summary
```

The player may rearrange previously kept Loot, but not Equipment.

## Player test interpretation

Recommended comparison:

1. Complete Low Starting Equipment Occupancy naturally.
2. Start a fresh session under High Starting Equipment Occupancy.
3. Receive exactly the same Loot sequence again.

Observe, without coaching optimization:

- Does more initial locked occupancy cause more rearrangement or rejection?
- Does the player evaluate Loot by value versus occupied shape differently?
- Does the pre-committed space feel like a meaningful cost or merely an obvious capacity reduction?
- Does the player resent the locked cells, accept them as preparation cost, or barely notice them?

Do not infer that the player prefers “light equipment” or “heavy equipment”; no equipment benefits exist in this experiment.

## Future separation

Body slots, limb attachment points, backpack exterior mounts, quick-access placement, hand-carried items, exposure risk, durability, damage, quantity loss, and equipment effectiveness are NOT part of EXP-003.

Those are separate candidate experiments and must not be retrofitted into EXP-003 merely because Locked Equipment now exists.

See:

`docs/inventory-equipment-experiment-notes.md`

## Result / Stop condition

Current state:

```text
EXP-003 — TESTING
Result: Untested
```

Stop at the existing implementation. Do not add more inventory mechanics before Player feedback.

EXP-001 remains MAYBE with its historical Player result unchanged.
