# EXP-013 Work Item — Time-Based Enemies

Status: ACTIVE IMPLEMENTATION REQUEST

Experiment: `EXP-013 — Time-Based Enemies`

Prototype: `prototypes/005_time_based_enemies/`

## Goal

Build a small controlled prototype to answer:

> 当同一张固定地图在 Day / Night 两个时段出现不同敌人分布时，玩家是否会开始学习“什么时候去哪里”，并主动选择进入区域的时间？

Do not build a full day/night system. Do not combine this with World Refresh, Blood Moon, resources, or map-access experiments.

## Core Variable

Only enemy distribution changes between Day and Night.

Keep identical across time states:

- map geometry;
- player movement speed;
- player attack rules;
- objective locations;
- destination value / rewards;
- landmarks;
- enemy type combat stats;
- UI structure apart from current-time indication.

## Required Prototype

Create `Prototype #005 — Time-Based Enemies Lab` as a small 2D top-down web prototype.

Use one fixed map with:

- Home / Start;
- Zone A;
- Zone B;
- a route that makes both zones relevant;
- enough space that entering a zone is a visible route choice.

## Day / Night Rules

### Day

- Zone A contains enemies.
- Zone B is safe / empty.

### Night

- Zone A is safe / empty.
- Zone B contains enemies.

Use deterministic fixed spawn sets.

Do not randomize which enemies appear.

## Time Switching

Provide an explicit deliberate control to switch time:

- button or interaction labeled `Wait Until Night` / `Wait Until Day`, or equivalent;
- switching toggles Day ↔ Night immediately after a short readable transition;
- HUD clearly shows current state;
- switching time is available from a clear neutral location, preferably Home / Rest point, unless a global button is simpler and equally readable.

No automatic countdown is required.

Do not create pressure from real-time timing.

## Enemy Handling on Time Change

This experiment is about enemy presence by time, not World Refresh semantics.

For the first pass:

- when time changes, replace the active enemy population with the deterministic population for the new time state;
- do not preserve corpses across time change;
- do not treat this as a conclusion about future Campfire / Blood Moon / World Refresh rules;
- document that this reset behavior is test scaffolding only.

This prevents EXP-018 corpse lifetime from contaminating EXP-013.

## Combat

Keep combat trivial and readable.

- one simple attack input;
- enemies easy to defeat;
- no weapon switching;
- no stamina;
- no status effects;
- no enemy stat changes between Day and Night.

Enemy difficulty should not be the experiment.

## Suggested Session Structure

The Player should be able to discover the rule and then intentionally exploit it.

Recommended flow:

1. Start in Day.
2. Visit or inspect both zones.
3. Return / use Wait to switch to Night.
4. Revisit both zones.
5. Allow free switching afterwards so the Player can deliberately choose a time before entering a zone.

Do not force a scored optimal route.

## HUD / Feedback

Show at minimum:

- current time: `DAY` / `NIGHT`;
- current objective / zone;
- simple Wait control;
- condition explanation should be minimal during play.

Do not reveal the whole answer with text such as “Zone A is dangerous during Day” before the Player can observe it.

## Visual Direction

Use simple 2D assets for player and enemies if existing compatible assets can be reused cleanly from Prototype #004, otherwise create a small Prototype-local set.

Do not spend time on full lighting art.

A lightweight scene tint / sky indicator is allowed only to make Day vs Night unmistakable; enemy distribution remains the tested variable.

## Session Summary

At the end, record descriptive evidence only:

- whether the Player switched time;
- number of switches;
- whether Zone A was entered in Day / Night;
- whether Zone B was entered in Day / Night;
- enemies defeated by time state;
- a reflection prompt about whether the Player started choosing when to enter each zone.

Do not grade or recommend a strategy.

## Non-goals

Do not add:

- full clock / calendar;
- sunrise / sunset simulation;
- Blood Moon;
- Campfire refresh;
- resource respawn;
- corpse persistence experimentation;
- time-based resources;
- time-based doors / routes;
- NPC schedules;
- weather;
- stealth;
- enemy buffs by time;
- loot economy;
- save persistence;
- generalized TimeSystem / EcologySystem / Rule Engine.

## Documentation

On completion:

1. add/update `prototypes/005_time_based_enemies/README.md`;
2. set EXP-013 to `TESTING / Untested` only after technical acceptance;
3. update `docs/project-state.md` and `docs/experiment-backlog.md` consistently;
4. close `docs/work-items/CURRENT.md` only after build + real-browser + Pages/direct-refresh acceptance;
5. do not assign a gameplay conclusion before Player testing.

## Acceptance

Complete when:

1. Prototype #005 exists and runs.
2. Day and Night are clearly distinguishable.
3. Day: Zone A has enemies, Zone B is safe.
4. Night: Zone A is safe, Zone B has enemies.
5. Time change deterministically swaps the active enemy population.
6. Time change does not alter map geometry, movement speed, objective value, or enemy combat stats.
7. Player can deliberately switch time and revisit both zones.
8. Restart resets time, enemies, route/session stats, and summary.
9. No corpse / refresh / resource / map-access side experiment is introduced.
10. `npm run build` passes.
11. Real-browser interaction and GitHub Pages/direct-refresh are verified.
12. No speculative generalized time/ecology architecture is added.
