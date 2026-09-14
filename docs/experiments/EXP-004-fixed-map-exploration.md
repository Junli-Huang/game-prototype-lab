# EXP-004 — Fixed Map Exploration

Status: READY / Selected

Category: Exploration

Selected: 2026-09-14

## Question

> 在地图完全固定、目标位置不变的情况下，玩家第二次、第三次进入同一区域时，是否会因为记住路线与地点关系而产生明显的“我更熟悉这里了”的成长感？

## Core Variable

Repeated traversal of the same fixed map.

This experiment tests map learning only. It does not test combat mastery, loot knowledge, time-based ecology, procedural generation, shortcut unlocking, or inventory pressure.

## Prototype

Use a new standalone prototype:

`prototypes/003_fixed_map_exploration/`

The same prototype may also host EXP-006 as a separate Experiment Mode because the shortcut comparison requires the exact same map geometry.

## Minimum Test

- 2D top-down fixed map.
- One fixed Start / Home point.
- Three fixed landmarks / target points: A, B, C.
- Player completes the same three-target route three times in one session.
- Target order remains fixed across runs.
- Map geometry, landmarks, movement speed and objectives remain unchanged.
- Show current run number and current target.
- At the end of each run, immediately allow another run from Start.

No minimap route line, navigation arrow, breadcrumb trail, fog-of-war reveal system, objective teleport, randomized target order, or procedural layout.

## Map Design Requirements

The map must be small enough for one run to take roughly 45–90 seconds after basic familiarity, but complex enough that route memory matters.

Use a compact connected layout with:

- at least two loops;
- at least one visually distinctive central landmark;
- at least one dead-end or misleading branch;
- at least two meaningful route choices between areas;
- readable local visual identity for the three target areas.

Do not make the map a maze of identical corridors. The experiment is about learning a place, not memorizing arbitrary turns.

## What to Observe

Positive signals:

- later runs feel noticeably easier or more confident without stat upgrades;
- the player stops hesitating at junctions;
- the player starts choosing routes from memory rather than searching;
- the player describes landmarks or relative positions naturally;
- repeated traversal feels like gaining knowledge rather than repeating chores.

Negative signals:

- run 2/3 feels like pure repetition with no sense of mastery;
- the map is solved immediately and has nothing left to learn;
- the player relies on UI guidance rather than spatial memory;
- landmarks are too weak to support a mental map.

## Non-goals

Do not add:

- combat;
- enemies;
- loot;
- backpack / inventory;
- character stats or upgrades;
- procedural generation;
- random target order;
- shortcut unlocking in EXP-004 mode;
- time-of-day systems;
- persistence across browser sessions;
- generalized world / quest / navigation frameworks.

## Result

TBD — not implemented / not played.
