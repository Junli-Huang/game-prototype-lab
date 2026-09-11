# Work Item — EXP-003 Equipment vs Loot Space

Prototype container: existing `prototypes/001_spatial_backpack/`

Experiments / Modes after this task:

- `EXP-001 — Spatial Backpack Placement` — historical MAYBE, preserve unchanged.
- `EXP-003 — Equipment vs Loot Space` — new active experiment.

This is a controlled extension of the existing backpack Prototype, not a new inventory framework.

## Goal

Test one question:

> 当出门装备和战利品占用同一个有限空间时，“准备更多”与“给战利品留更多空间”之间是否会自然形成取舍？

The experiment does NOT test weapon power, combat balance, equipment stats, exploration, or loot randomness.

## Hypothesis

If fixed expedition equipment occupies the same 6×8 spatial backpack as later loot, then a heavier loadout should make loot retention and rearrangement decisions more consequential than a light loadout.

## Why this belongs in Prototype #001

EXP-003 should reuse the existing #001 backpack because the following are intentionally identical:

- 6×8 spatial board.
- Drag / drop.
- 90° rotation.
- Overlap / bounds validation.
- Item visuals and value display.
- Discard area.
- Fixed item sequence.
- Session summary.

Do not create a second backpack implementation merely to isolate the Experiment ID.

At the same time, EXP-001 and EXP-003 keep independent Hypothesis / Question / Result records.

## Prototype naming

Because #001 now contains more than one backpack experiment, user-facing Prototype name may become:

`Backpack Lab`

Do NOT rename the implementation directory:

`prototypes/001_spatial_backpack/`

Add an Experiment Mode selector similar in spirit to #002, but local and minimal:

```text
Experiment Mode
[Spatial Placement] [Equipment vs Loot]
```

While EXP-003 is the active Work Item, default to `Equipment vs Loot`.

Mode switch performs a full fresh-session reset.

## EXP-001 preservation

The current EXP-001 gameplay, fixed 12-item sequence, implementation behavior, and Player Result must remain intact.

Historical result remains:

> “还可以，有点意思。”

Do not reinterpret or overwrite EXP-001 because EXP-003 shares its container.

## EXP-003 controlled conditions

EXP-003 has two fixed Loadout conditions:

```text
Loadout
[Light] [Heavy]
```

Default recommended condition: `Light` first.

Switching Light / Heavy performs a complete EXP-003 reset.

Both conditions use:

- the same 6×8 backpack;
- the same loot sequence;
- the same loot values;
- the same drag / rotation / discard rules;
- the same session summary;
- the same equipment-lock rule.

Only starting equipment occupancy changes.

## Equipment rule

Equipment is already packed when the EXP-003 session begins.

Equipment:

- occupies normal backpack cells;
- blocks loot placement like any other occupied cell;
- is visually distinguishable from loot;
- cannot be dragged;
- cannot be rotated;
- cannot be discarded;
- has no sell value in this experiment;
- has no gameplay effect other than occupying space.

This locking is deliberate experimental isolation. Do not add equip/unequip interactions.

### Light Loadout

Fixed equipment:

| Equipment | Size | Fixed position | Asset |
| --- | ---: | --- | --- |
| Compact Sidearm | 1×2 | x=0, y=0 | `assets/equipment_sidearm.svg` |
| Field Medkit | 1×1 | x=1, y=0 | `assets/equipment_field_medkit.svg` |

Total occupied area: **3 / 48** cells.

Label in UI:

`Light Loadout · Equipment 3 / 48`

### Heavy Loadout

Fixed equipment:

| Equipment | Size | Fixed position | Asset |
| --- | ---: | --- | --- |
| Old Rifle | 1×4 | x=0, y=0 | `assets/equipment_old_rifle.svg` |
| Field Armor | 2×3 | x=1, y=0 | `assets/equipment_field_armor.svg` |
| Field Medkit | 1×1 | x=3, y=0 | `assets/equipment_field_medkit.svg` |

Total occupied area: **11 / 48** cells.

Label in UI:

`Heavy Loadout · Equipment 11 / 48`

Do not add abstract attack / defense / preparedness numbers. The experiment is about spatial cost, not stat comparison.

## Assets Ready

Ready assets are already committed under:

`prototypes/001_spatial_backpack/assets/`

Use directly:

- `equipment_sidearm.svg`
- `equipment_field_medkit.svg`
- `equipment_old_rifle.svg`
- `equipment_field_armor.svg`

Read:

`prototypes/001_spatial_backpack/assets/README.md`

Do not redraw these as CSS shapes or new inline SVG unless a Ready file is unusable; record the reason if replacement is necessary.

Existing #001 Designer-owned loot drawings may be reused for the loot below. Do not duplicate them into new asset files just to create an asset framework.

## Fixed Loot sequence

Use exactly seven loot items, in this order:

| Order | Loot | Size | Value | Existing visual identity |
| ---: | --- | ---: | ---: | --- |
| 1 | 罐装肉 | 1×2 | 25 | `can` |
| 2 | 废旧电池 | 2×2 | 35 | `battery` |
| 3 | 机械零件 | 2×3 | 65 | `gear` |
| 4 | 未知组织 | 2×3 | 80 | `organ` |
| 5 | 黑色遗物 | 3×3 | 120 | `relic` |
| 6 | 木板 | 1×3 | 18 | `plank` |
| 7 | 密封仪器 | 3×5 | 190 | `device` |

Total loot area: **45 cells**.

This is deliberate:

```text
Light equipment 3 + loot 45 = 48
```

All loot can fit in principle under Light Loadout if arranged successfully.

```text
Heavy equipment 11 + loot 45 = 56 > 48
```

All loot cannot fit under Heavy Loadout; at least some loot must be refused or discarded.

Do not display an optimal packing solution.

## EXP-003 loop

```text
Choose / start fixed Loadout
→ Backpack already contains locked equipment
→ Receive fixed Loot one item at a time
→ Place / rotate / rearrange loot
→ Keep or discard loot
→ Continue until all 7 Loot items are processed
→ Session summary
```

The player may rearrange previously kept Loot, but not Equipment.

## UI requirements

Keep UI minimal.

EXP-003 must visibly show:

- active Experiment: `EXP-003 Equipment vs Loot Space`;
- active Loadout: Light / Heavy;
- equipment occupied cells, visually marked as locked equipment;
- current Loot item and value;
- total occupied cells;
- split occupancy if simple:
  - `Equipment: 3 / 48` or `11 / 48`
  - `Loot: N cells`
- retained Loot value;
- discarded Loot list;
- session summary.

Equipment should have a small stable visual marker such as `LOCKED` / lock icon / `Equipment` tag, but do not clutter every cell.

Do not add tutorial overlays beyond a short explanatory sentence.

## Session summary

At completion, show at minimum:

```text
Loadout: Light / Heavy
Equipment Area: 3 / 11
Loot Kept: <items>
Loot Value Kept: <value>
Loot Discarded: <items>
```

No pass/fail score and no “correct” loadout.

## Player test

Recommended first test:

1. Play Light Loadout naturally to completion.
2. Restart EXP-003 with Heavy Loadout.
3. Play naturally with the same Loot sequence.

Observe, without coaching optimization:

- Did Heavy Loadout make the player reorganize more?
- Did the player start evaluating Loot by value versus occupied shape?
- Was there a noticeable feeling that initial preparation consumed future opportunity?
- Did the player resent locked equipment, or did it create an interesting constraint?
- Did Light vs Heavy feel meaningfully different despite identical Loot?
- Was the decision space interesting, or merely an obvious capacity penalty?

Do not fill Player gameplay conclusions during implementation.

## Minimum Scope

Implement only:

- local Experiment Mode selector for EXP-001 / EXP-003;
- preserve EXP-001 exactly;
- EXP-003 Light / Heavy Loadout selector;
- fixed locked equipment occupancy;
- direct use of Ready equipment SVG assets;
- fixed 7-item Loot sequence;
- reuse existing loot visuals;
- existing placement / rotation / rearrangement / discard behavior for Loot;
- minimal EXP-003 counters and summary;
- complete reset on Experiment Mode or Loadout switch;
- docs/status sync;
- build and Pages verification.

Stop there.

## Non-goals

Do NOT add:

- characters, map, exploration, route, combat, enemies, damage or healing;
- weapon or armor stats;
- equipment effectiveness simulation;
- equip / unequip / equipment dropping;
- random Loot;
- rarity systems;
- weight / encumbrance;
- stackable items;
- shops, crafting or economy;
- item use;
- inventory tabs;
- auto-sort;
- procedural items;
- shared Inventory framework;
- AssetManager / SVG loader framework;
- integration with Prototype #002;
- EXP-002 implementation.

## Backlog / documentation status

Before implementation:

- Set EXP-003 from IDEA to BUILDING when work begins.

After technical completion:

- Set EXP-003 to TESTING.
- Keep EXP-001 MAYBE and its Player Result unchanged.
- Update `prototypes/001_spatial_backpack/README.md` into a multi-Experiment Prototype record, with independent sections/results for EXP-001 and EXP-003.
- Update root / `prototypes/README.md` / Launcher summaries only where current active status requires it.
- Do not write a gameplay Result for EXP-003 beyond `Untested`.

## Technical acceptance

Verify at minimum:

1. Existing EXP-001 mode still starts and behaves as before.
2. EXP-001 historical MAYBE result remains unchanged in docs.
3. EXP-003 is default active mode while it is the selected current experiment.
4. Switching Experiment Mode performs a complete reset.
5. EXP-003 Light / Heavy switch performs a complete reset.
6. Ready equipment SVG files load visibly.
7. Light starts with exactly Sidearm 1×2 + Medkit 1×1 at specified cells.
8. Heavy starts with exactly Rifle 1×4 + Armor 2×3 + Medkit 1×1 at specified cells.
9. Equipment cannot be dragged, rotated or discarded.
10. Equipment cells block Loot placement.
11. Both Loadouts receive the exact same seven Loot items in the same order and values.
12. Loot retains existing drag / R rotate / cancel / overlap / bounds / discard behavior.
13. Light condition has 3 fixed equipment cells and can in principle retain all 45 Loot cells; do not hard-code auto-layout.
14. Heavy condition has 11 fixed equipment cells and therefore cannot retain all 45 Loot cells.
15. Summary reports Loadout, Equipment Area, kept Loot/value and discarded Loot.
16. No equipment stats or combat systems are introduced.
17. `npm run build` passes.
18. GitHub Pages loads both Experiment Modes and direct SVG asset paths successfully.
19. EXP-003 stops at TESTING / Result: Untested.

## Stop condition

Stop once the Player can complete the same Loot sequence under both Light and Heavy starting equipment conditions and directly compare how shared backpack space changes retention/rearrangement pressure.

Do not add any further inventory mechanics before Player feedback.
