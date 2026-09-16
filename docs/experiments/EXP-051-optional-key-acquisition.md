# EXP-051 — Optional Key Acquisition

Status: IDEA

Category: Exploration

Created: 2026-09-16

## Context

EXP-050 showed a limited positive preference for early key access. The Player's stronger follow-up interest was not unconditional possession of the key, but obtaining it through an optional path so that knowledge / exploration can accelerate later traversal.

## Question

> 当默认路线不需要钥匙也能完成，但玩家可以主动偏离默认流程去获取一把钥匙，从而提前打开捷径时，这种“先绕一点、后面更快”的选择是否会产生有意义的路线规划？

## Core Variable

Optional early acquisition of one shortcut key.

This experiment is about the acquisition decision, not about key inventory complexity.

## Minimum Test Structure

Reuse Prototype #003 if possible.

Keep:

- the same fixed map;
- the same shortcut gate;
- the same movement speed;
- the same A → B → C → Home objective structure unless a tiny routing adjustment is strictly necessary;
- the same far-side fallback unlock.

Add exactly one optional key acquisition point.

Suggested semantics:

- Player starts with no key.
- Normal/default route remains fully completable without ever obtaining the key.
- A visible or discoverable optional branch contains one Shortcut Key.
- Acquiring the key requires a modest detour before reaching the shortcut gate from the near side.
- After acquisition, the key can open the same shortcut gate from the near side.
- If ignored, the player proceeds normally and may still unlock the gate from the far side later.

The detour must be meaningful but short. It should create a real choice rather than an obviously mandatory optimal route.

## What to Observe

Positive signals:

- Player notices or remembers the optional key route.
- Player deliberately decides whether the detour is worth taking.
- After learning the map, Player changes route based on expected future travel savings.
- The key feels like knowledge / preparation paying off rather than a generic required collectible.
- Repeated play makes the optional route more meaningful because the Player understands what the key will unlock.

Weak signals:

- Player always takes the key because it is obviously free / optimal.
- Player always ignores it because the detour is clearly not worth it.
- Key placement feels like mandatory scavenger hunting.
- The choice only changes elapsed time but not route planning or world understanding.

## Non-goals

Do not add:

- multiple keys;
- multiple locked doors;
- random key spawn;
- inventory UI;
- key rings;
- combat rewards;
- currency;
- puzzles;
- lockpicking;
- quest chains;
- permanent account progression;
- procedural map generation;
- generalized key / door / quest architecture.

## Result

Untested.

- Observed: TBD
- Interesting Moment: TBD
- Boring Moment: TBD
- Decisions: TBD
- Unexpected: TBD
- Next: TBD
