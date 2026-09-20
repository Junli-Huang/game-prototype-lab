# EXP-042 — Basic Farming Loop

Status: TESTING / Untested

Category: Farming

Selected: 2026-09-20

## Question

> 最基础的“获得种子 → 种下 → 等待成长 → 收获”循环，本身是否会产生值得保留的满足感与再次种植意愿？

## Hypothesis

A tiny farming loop may be satisfying even before it is connected to economy, crafting, exploration buffs, or a larger base system.

The expected value is not optimization depth. The expected value is the simple ownership-and-return feeling:

- “这是我种下的。”
- “它长出来了。”
- “我想把下一颗也种下去。”

## Core Variable

The basic farming loop itself:

```text
Seed
→ Plant
→ Grow
→ Harvest
```

The first implementation should make this loop readable and repeatable without adding another progression system.

## Test Structure

Create one compact 2D top-down base/garden scene with:

- one small seed source / pickup point;
- three planting plots;
- one crop type;
- three readable crop states: planted, growing, ready;
- one harvested item / harvest counter;
- a short growth duration suitable for a prototype session.

The Player should physically approach a plot and interact with it.

## Seed Rule

The historical Backlog idea says exploration obtains seeds. For this first isolated test, keep acquisition intentionally tiny:

- provide a nearby seed pickup/cache;
- picking it up is only setup for the farming loop;
- do not build a real exploration route, enemy encounter, loot table, or inventory system;
- the Player may hold a simple integer seed count.

A later experiment can test whether exploration feeding farming is valuable.

## Interaction

Recommended:

- WASD / Arrow Keys — move;
- E — context action;
- seed source: E obtains one seed;
- empty plot + seed: E plants;
- crop advances automatically through fixed timed stages;
- ready crop: E harvests;
- harvested plot becomes empty and can be planted again.

Keep interaction direct and legible.

## Growth Timing

Use a short deterministic prototype duration.

Recommended total growth time: roughly 8–12 seconds.

Example:

```text
Planted: 0–4 s
Growing: 4–8 s
Ready: 8+ s
```

Exact timing can be tuned only for readability, not for economy balancing.

Do not require watering, fertilizing, sleeping, calendar days, or real-time waiting.

## What to Observe

Positive signals:

- planting creates a small sense of ownership;
- visible growth makes the Player want to check the plot again;
- harvesting feels satisfying despite the minimal reward;
- the Player voluntarily repeats the loop;
- having several plots creates a light rhythm without becoming chores.

Weak / negative signals:

- growth is merely waiting with no anticipation;
- harvest feels like clicking a timer;
- the Player completes one crop and has no desire to repeat;
- multiple plots immediately feel like repetitive maintenance;
- satisfaction comes only from UI numbers rather than planting/growth/harvest feedback.

## Visual Requirement

Use Prototype-local 2D assets.

Do not represent the crop only as circles / colored rectangles.

Required visual states:

- Player;
- seed pickup;
- empty soil plot;
- planted seed / sprout;
- growing crop;
- ready crop;
- harvested produce icon.

The map/background may remain simple.

## Non-goals

Do not add:

- multiple crop species;
- watering;
- fertilizer;
- crop quality;
- seasons;
- weather;
- day/night;
- crop failure;
- pests;
- economy / selling;
- crafting;
- hunger;
- healing value;
- exploration buffs;
- EXP-043 Farming Supports Exploration;
- inventory grid;
- storage chests;
- NPCs;
- quests;
- save/load;
- generalized FarmingSystem / CropSystem / inventory architecture.

## Result

Untested — implemented and technically accepted on 2026-09-20. No gameplay conclusion is assigned before Player testing.

Player test: complete at least two harvests, then decide whether the basic loop itself creates a desire to keep planting.
