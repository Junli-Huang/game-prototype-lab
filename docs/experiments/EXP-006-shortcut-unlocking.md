# EXP-006 — Shortcut Unlocking

Status: TESTING / Untested

Category: Exploration

Selected: 2026-09-14

## Question

> 在同一张已经可以学习的固定地图里，从远端解锁一条能明显缩短返程 / 再次前往路线的捷径，是否会产生强烈且有价值的“这里居然通回来了”体验？

## Core Variable

Availability of one unlockable shortcut.

Everything else must remain identical to EXP-004: map geometry, movement speed, targets, target order and visual landmarks.

## Prototype / Mode

Reuse:

`prototypes/003_fixed_map_exploration/`

EXP-004 and EXP-006 are separate Experiment Modes inside the same Prototype.

## Shortcut Design

Use exactly one shortcut in the first test.

Recommended form: a locked gate / barred door connecting a late-route area back to a corridor near Start.

Rules:

- shortcut begins closed;
- it is visible from at least one side before it can be opened, so the player can form curiosity / recognition;
- it can only be unlocked from the far side after reaching a late-route area;
- unlocking is permanent for the current experiment session;
- after unlocking, it creates a clearly shorter route between the late area and Start / earlier map space;
- opening interaction should be obvious and fast (for example `E` near the gate);
- no key item, puzzle, currency, combat gate, skill check or random requirement.

The shortcut should reconnect known space rather than simply opening a new room.

## Test Structure

Use the same three-target fixed route as EXP-004.

Suggested session flow:

1. Run 1: player traverses the normal route and reaches the far side of the shortcut.
2. Player unlocks the shortcut.
3. Run 2 and Run 3: shortcut remains open.
4. Observe whether the player deliberately incorporates it into later routes and whether opening it produced a meaningful spatial realization.

The shortcut does not need to be mathematically optimal for every leg, but its utility must be legible.

## What to Observe

Positive signals:

- player immediately understands what region the shortcut reconnects to;
- opening it causes a clear recognition moment rather than confusion;
- player intentionally uses it later without prompting;
- the map feels more compact / mastered after unlocking;
- the shortcut changes route planning, not just travel time.

Negative signals:

- shortcut is used only because a UI tells the player to;
- opening it feels like generic convenience with no spatial realization;
- the connection is too obvious before discovery and produces no surprise;
- the player forgets it or never chooses it later;
- it merely removes walking without increasing world understanding.

## Non-goals

Do not add:

- multiple shortcut types;
- elevators + ladders + bridges simultaneously;
- keys / puzzles;
- combat gates;
- resource costs;
- fast travel;
- teleporters;
- procedural maps;
- loot / inventory;
- character upgrades;
- generalized unlock / door / quest framework.

## Result

Untested — implemented in Prototype #003 on 2026-09-14; technical acceptance does not assign a gameplay conclusion.

Player test: after completing EXP-004, play all three EXP-006 runs and report shortcut recognition and deliberate later use separately.
