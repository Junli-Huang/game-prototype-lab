# EXP-013 — Time-Based Enemies

Status: TESTING / Untested

Category: Time / Ecology

Selected: 2026-09-16

## Question

> 当同一张固定地图在 Day / Night 两个时段出现不同敌人分布时，玩家是否会开始学习“什么时候去哪里”，并主动选择进入区域的时间？

## Hypothesis

A fixed world may gain meaningful temporal knowledge if enemy presence changes predictably with time.

The expected value is not visual day/night spectacle. The expected value is learned world timing:

- “这个区域白天安全。”
- “那个区域晚上危险。”
- “我可以等到另一个时段再过去。”

## Core Variable

Predictable enemy distribution changes between two time states.

Everything else should remain fixed:

- same map geometry;
- same route and objectives;
- same player movement speed;
- same attack rules;
- same enemy combat stats within each enemy type;
- same landmarks;
- same rewards / destination value;
- no resource or map-access changes.

## Test Structure

Use one fixed 2D top-down map with two compact zones that trade enemy presence across time.

### Day

- Zone A contains enemies.
- Zone B is safe / empty.

### Night

- Zone A becomes safe / empty.
- Zone B contains enemies.

The distribution should be deterministic and immediately reproducible.

## Time Control

The prototype should expose an explicit low-cost way to change time so the Player can intentionally test timing decisions.

Recommended first-pass interaction:

- `Wait` / `Rest` button or interaction toggles Day ↔ Night;
- changing time is deliberate, not automatic countdown pressure;
- clear HUD shows current time state;
- transition should be readable but simple.

Do not build a real clock, calendar, sunrise/sunset simulation, or long wait timer.

## What to Observe

Positive signals:

- Player learns which zone is safer in each time state;
- Player intentionally waits / changes time before entering a zone;
- Player expresses a plan such as “白天去 B，晚上再去 A”;
- timing becomes part of route knowledge rather than background decoration;
- the same fixed map feels different because of predictable temporal rules.

Weak / negative signals:

- Player ignores time and simply fights through both states;
- Wait is pressed mechanically with no meaningful planning;
- enemy redistribution feels arbitrary rather than learnable;
- time changes only visual mood, not decisions;
- one state is obviously always superior, eliminating choice.

## Movement-Speed Discipline

Movement speed materially affected Prototype #003 experience. Keep one fixed movement speed for all EXP-013 conditions and do not tune speed during the test.

## Non-goals

Do not add:

- full day/night lighting simulation;
- real-time clock or calendar;
- Blood Moon;
- Campfire World Refresh;
- enemy respawn systems;
- time-based resources;
- time-based map access;
- weather;
- loot economy;
- quests;
- NPC schedules;
- stealth bonuses;
- enemy stat buffs by time;
- save/load;
- generalized Time / Ecology framework.

## Result

Untested — implemented and technically accepted on 2026-09-16. No gameplay conclusion is assigned before Player testing.

Player test flow: inspect both zones during Day, return Home and switch to Night, inspect both zones again, then consider whether learned timing affected route choice.
