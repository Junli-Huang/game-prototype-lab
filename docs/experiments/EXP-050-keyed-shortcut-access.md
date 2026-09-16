# EXP-050 — Keyed Shortcut Access

Status: TESTING / Untested

Category: Exploration

Selected: 2026-09-14

## Context

EXP-006 produced a limited positive Player signal: the shortcut gate felt better than the no-shortcut baseline. The Player also reported that character movement speed materially affected the experience, so movement speed must remain fixed during this experiment and be treated as a known confound rather than silently tuned mid-test.

The Player proposed a follow-up: if the player already has a key early, the same gate could be opened from the near side and provide immediate access to the shortcut.

## Question

> 如果玩家在探索初期就持有一把能打开已知捷径门的钥匙，是否会主动选择提前打通近路，并因此改变路线规划与世界掌握感？

## Core Variable

Early shortcut access through one starting key.

Everything else remains identical to Prototype #003 / EXP-006:

- same fixed map;
- same gate position;
- same A → B → C → Home target order;
- same movement speed;
- same collision geometry;
- same three-run session structure;
- same visual landmarks.

## Test Conditions

Prototype #003 exposes these conditions inside the top-level `EXP-006 · Shortcut` mode. EXP-050 remains a separate Experiment record and comparison question; it is not presented as a third peer mode in the prototype UI.

### A — No Key

Baseline behavior from EXP-006:

- gate cannot be opened from the near / start side;
- player must reach the far side and use `E` to unlock it;
- once unlocked, it remains open for the rest of the session.

### B — Start With Key

- player begins Run 1 with exactly one Shortcut Key;
- approaching the gate from the near / start side shows `[E] Use Key — Unlock Shortcut`;
- pressing `E` opens the same gate immediately;
- the key is consumed when used;
- the opened gate remains open for the rest of the session;
- if the player chooses not to use the key, the gate can still be unlocked from the far side exactly as in EXP-006.

Do not add additional keys or additional locked doors.

## What to Observe

Positive signal:

- player recognizes that early key access changes the route;
- player deliberately chooses whether to spend the key before reaching the far side;
- early opening changes later path planning, not merely travel time;
- the key creates a useful sense that prior preparation / world knowledge changes traversal.

Weak signal:

- player always presses `E` automatically with no meaningful thought;
- the key is perceived only as a generic skip button;
- route choice does not materially change;
- the gate is so obviously beneficial that there is no decision at all.

## Movement-Speed Discipline

Player feedback indicates movement speed is a major experiential variable.

For EXP-050:

- do not change movement speed between conditions;
- do not add sprint, stamina, acceleration, dash or movement upgrades;
- record the current speed as a known experience confound;
- any future movement-speed comparison should be a separate experiment or tuning task.

## Non-goals

Do not add:

- inventory UI;
- key rings;
- multiple key types;
- multiple doors;
- random key placement;
- puzzles;
- combat;
- loot;
- currency costs;
- lockpicking;
- consumable-resource economy;
- persistent save data;
- generalized Door / Key / Inventory framework.

## Result

Untested — implemented and technically accepted on 2026-09-14. No gameplay conclusion is assigned before Player comparison.

Player test order: `No Key`, then `Start With Key`. Record whether the key was used, when the gate first opened, and whether the shortcut changed later route planning.
