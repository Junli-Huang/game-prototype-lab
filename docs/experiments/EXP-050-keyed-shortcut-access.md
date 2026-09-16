# EXP-050 — Keyed Shortcut Access

Status: MAYBE / Prefer Early Key Access

Category: Exploration

Selected: 2026-09-14

## Context

EXP-006 produced a limited positive Player signal: the shortcut gate felt better than the no-shortcut baseline. The Player also reported that character movement speed materially affected the experience, so movement speed remained fixed during this experiment.

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

## Movement-Speed Discipline

Player feedback indicates movement speed is a major experiential variable.

For EXP-050:

- movement speed remained identical between conditions;
- no sprint, stamina, acceleration, dash or movement upgrades were added;
- movement speed remains a known experience confound for later dedicated review.

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

MAYBE — Player completed the comparison and reported that having a key felt better.

Player feedback:

> “体验上 有钥匙会更好，不过在游戏里，我觉得要是可以放在某个地方，或者某种方式获得。这样游戏的时候，默认流程外，可以通过提前获得钥匙来达到加速通过。”

Interpretation:

- Early key access has a positive but still limited gameplay signal.
- The stronger design direction is not to grant the key unconditionally at session start.
- The key appears more interesting as an optional traversal advantage that the player can acquire outside the default route.
- This suggests a follow-up question about whether deviating from the default route to obtain a key creates a meaningful tradeoff: spend time / exploration now in exchange for faster traversal later.
- Do not treat this as evidence for a full key / lock / inventory system.

Observed:

- `Start With Key` felt better than `No Key`.
- Player immediately proposed moving the key from unconditional starting equipment into the world or another acquisition path.

Interesting Moment: the possibility of using prior preparation / exploration to bypass part of the normal traversal.

Boring Moment: TBD.

Decisions: current prototype did not yet test the decision to acquire the key; the key was simply granted by the test condition.

Unexpected: the Player's strongest follow-up interest shifted from possession of the key to the route and method by which the key is obtained.

Next: preserve EXP-050 as `MAYBE / Prefer Early Key Access`; test optional key acquisition separately rather than expanding EXP-050.
