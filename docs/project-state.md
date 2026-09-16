# Project State — Cold Start Snapshot

Updated: 2026-09-16

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

Before implementation, also read `docs/asset-handoff.md`, any experiment-specific asset handoff, and the selected Work Item.

## Current implementation task

No active implementation task.

EXP-013 has completed implementation and Player testing. Result: `MAYBE / Context-dependent`. The Time-Based Enemies rule felt usable and suitable for some games, but did not produce a strong standalone positive signal. Its value likely depends on surrounding route, resource, risk, objective, or ecology systems.

Do not automatically expand EXP-013 into a full day/night system. The project is ready to select a different experiment.

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

## Prototype #002 — Enemy Respawn Lab

Implementation directory: `prototypes/002_campfire_respawn/`

### EXP-007 — Campfire World Refresh
Status: `MAYBE / Stop`

### EXP-008 — Blood Moon World Refresh
Status: `MAYBE / Stop`

Current learning: World Refresh appears more useful as supporting structure in a richer persistent-world context than as a strong standalone mechanic in the short prototype.

EXP-018 adds a related observation: corpse lifetime may be one of the world states governed by future refresh semantics. This is not yet a rule; Campfire / Blood Moon / other refresh behavior should be tested in concrete gameplay contexts.

## Prototype #003 — Fixed Map Exploration

Implementation directory: `prototypes/003_fixed_map_exploration/`

### EXP-004 — Fixed Map Exploration
Status: `TESTING / Result: Untested`

### EXP-006 — Shortcut Unlocking
Status: `MAYBE`
Player feedback: “角色的移动速度是影响我体验的重要感受。其他的话，门这个东西，我觉得的确是好点。”

### EXP-050 — Keyed Shortcut Access
Status: `MAYBE / Prefer Early Key Access`
Player feedback: early key access felt better, but the preferred game direction is for the key to be obtained somewhere / somehow outside the default flow so earlier exploration or preparation can accelerate later traversal.

Follow-up EXP-051 Optional Key Acquisition exists as IDEA only and is paused.

## Prototype #004 — Persistent Enemy Corpses Lab

Implementation directory:
`prototypes/004_persistent_enemy_corpses/`

### EXP-018 — Persistent Enemy Corpses

Status: `MAYBE / Context-dependent`

Question:
> 当敌人死亡后，尸体持续留在固定地图中，玩家再次经过这些区域时，是否会更强地感受到“这里发生过事”，并因此增强区域记忆、历史痕迹感和世界持续性？

Player feedback:
> “留下来感觉还行。不留的话也可以。主要要看后续的玩法跟进。包括其他设置比如篝火刷新，红月刷新，如果有这些设置，那么进行这些操作的时候，实体是否要进行刷新。感觉上应该要刷新。但这些都是玩法上的探索。”

Current learning:
- Persistent corpses provide some world-history flavor, but not strong standalone value.
- Clean Removal is also acceptable.
- Corpse lifetime should be considered context-dependent.
- Future World Refresh experiments may test whether corpses are cleared/rebuilt alongside refreshed entities.
- Do not infer a universal “corpses should refresh” rule yet.
- Do not build a generalized World State Lifetime framework before concrete experiments justify it.

Definition:
`docs/experiments/EXP-018-persistent-enemy-corpses.md`

## Prototype #005 — Time-Based Enemies Lab

Implementation directory:
`prototypes/005_time_based_enemies/`

### EXP-013 — Time-Based Enemies

Status: `MAYBE / Context-dependent`

Question:
> 当同一张固定地图在 Day / Night 两个时段出现不同敌人分布时，玩家是否会开始学习“什么时候去哪里”，并主动选择进入区域的时间？

Player feedback:
> “感觉这个设定可以用在某些游戏里。还行。”

Current learning:
- Predictable time-based enemy distribution is a usable world rule.
- It did not produce a strong standalone positive signal in the minimal prototype.
- Its value is likely contextual and should be combined only when a future experiment has route, risk, resources, objectives, or ecology that makes timing matter.
- Do not expand into a full day/night system by default.

Definition:
`docs/experiments/EXP-013-time-based-enemies.md`

## Repository handoff rules that must remain true

- Experiment = question; Prototype = playable test container.
- One question per Experiment; related Experiments may share one Prototype for controlled comparison.
- Internal test conditions are not automatically separate Experiment Modes.
- Preserve historical Player results.
- Technical acceptance is not a gameplay conclusion.
- Do not infer EXP-003 status from EXP-049.
- Do not build speculative shared Inventory / Rule / Mode / Asset / World frameworks.
- Work begins only when CURRENT points to a formal Work Item.
