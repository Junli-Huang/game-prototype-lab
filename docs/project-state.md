# Project State — Cold Start Snapshot

Updated: 2026-09-14

This file is the compact current-state handoff for a new Chat / Designer / Reviewer session. It does not replace the detailed Experiment Backlog, Prototype READMEs, Workflow, or historical Work Items.

## Read order for a new Chat

1. `README.md`
2. `docs/project-state.md`
3. `docs/philosophy.md`
4. `docs/workflow.md`
5. `docs/experiment-backlog.md`
6. `docs/work-items/CURRENT.md`
7. Relevant Prototype README
8. Linked experiment / design notes

Before implementation, also read `docs/asset-handoff.md` and the selected Work Item.

## Current implementation task

**ACTIVE: EXP-004 — Fixed Map Exploration + EXP-006 — Shortcut Unlocking**

Formal Work Item:

`docs/work-items/EXP-004-006-fixed-map-shortcut.md`

Prototype:

`prototypes/003_fixed_map_exploration/`

Implementation structure:

- one compact hand-authored 2D top-down fixed map;
- EXP-004 and EXP-006 are separate Experiment Modes on the exact same map;
- EXP-004 tests repeated fixed-map learning only;
- EXP-006 adds exactly one far-side unlockable shortcut and tests its incremental value;
- three fixed targets A → B → C;
- three runs per session;
- no combat, loot, inventory, procedural generation, navigation aids or generalized frameworks.

Work is authorized only through `docs/work-items/CURRENT.md`.

## Prototype #001 — Backpack Lab

Implementation directory: `prototypes/001_spatial_backpack/`

### EXP-001 — Spatial Backpack Placement

Status: `MAYBE`

Player feedback: “还可以，有点意思。”

### EXP-003 — Equipment vs Loot Space

Status: `TESTING / Result: Untested`

Important: do not infer an EXP-003 result from EXP-049.

### EXP-048 — Body Equipment Storage

Status: `MAYBE`

Player feedback: “感觉有使用的价值。”

### EXP-049 — Fixed vs Movable Equipment

Status: `MAYBE / Prefer Movable`

Player feedback: “整体上我更喜欢不带 lock 的。”

Current directional learning: mandatory equipment may consume backpack space, but movable / rotatable required equipment is preferred to fixed locked geometry.

## Prototype #002 — Enemy Respawn Lab

Implementation directory: `prototypes/002_campfire_respawn/`

### EXP-007 — Campfire World Refresh

Status: `MAYBE / Stop`

### EXP-008 — Blood Moon World Refresh

Status: `MAYBE / Stop`

Current learning: World Refresh appears more useful as supporting structure in a richer persistent-world context than as a strong standalone mechanic in the short prototype.

## Prototype #003 — Fixed Map Exploration

Planned implementation directory:

`prototypes/003_fixed_map_exploration/`

### EXP-004 — Fixed Map Exploration

Status: `READY / BUILDING authorized`

Question:

> 在地图完全固定、目标位置不变的情况下，第二次、第三次进入同一区域时，路线记忆和地点熟悉是否会产生明显的成长感？

Definition:

`docs/experiments/EXP-004-fixed-map-exploration.md`

### EXP-006 — Shortcut Unlocking

Status: `READY / BUILDING authorized`

Question:

> 在同一张固定地图中，从远端打开一条通回已知区域的捷径，是否会产生有价值的“这里居然通回来了”体验，并改变后续路线选择？

Definition:

`docs/experiments/EXP-006-shortcut-unlocking.md`

EXP-006 must use the exact EXP-004 map. The first version adds exactly one shortcut and no key / puzzle / combat gate / resource cost.

## Current sequencing

1. Build Prototype #003.
2. Technically accept EXP-004 / EXP-006 without assigning gameplay conclusions.
3. Player plays EXP-004 first for all three runs.
4. Player then plays EXP-006 for all three runs.
5. Record separately:
   - fixed-map familiarity / mastery signal;
   - shortcut recognition / later-use signal.

## Repository handoff rules that must remain true

- Experiment = question; Prototype = playable test container.
- One question per Experiment; related Experiments may share one Prototype for controlled comparison.
- Internal test conditions are not automatically separate Experiment Modes.
- Preserve historical Player results.
- Technical acceptance is not a gameplay conclusion.
- Do not infer EXP-003 status from EXP-049.
- Do not build speculative shared Inventory / Rule / Mode / Asset / World frameworks.
- Work begins only when CURRENT points to a formal Work Item.
