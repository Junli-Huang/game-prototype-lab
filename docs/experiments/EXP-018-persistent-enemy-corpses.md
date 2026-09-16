# EXP-018 — Persistent Enemy Corpses

Status: MAYBE / Context-dependent

Category: Corpse Persistence

Selected: 2026-09-16

## Question

> 当敌人死亡后，尸体持续留在固定地图中，玩家再次经过这些区域时，是否会更强地感受到“这里发生过事”，并因此增强区域记忆、历史痕迹感和世界持续性？

## Hypothesis

Persistent enemy corpses may make a fixed world feel changed by prior events instead of visually resetting after combat.

The expected value is not combat depth. The expected value is world memory:

- “这里之前打过。”
- “这个区域留下了我的行动痕迹。”
- “世界没有立即把过去擦掉。”

## Core Variable

Whether defeated enemies leave persistent corpses.

Everything else remains identical between conditions:

- same fixed map;
- same enemy spawn positions;
- same enemy count and types;
- same player movement;
- same attack rules;
- same route / revisit structure;
- same landmarks.

## Test Conditions

### A — Clean Removal

- defeated enemy gives short death feedback;
- enemy then disappears;
- revisited areas contain no corpse.

### B — Persistent Corpses

- defeated enemy changes to a corpse representation;
- corpse remains visible for the rest of the session;
- corpse does not move, attack, despawn, or respawn;
- corpse is non-blocking in the first test.

## Minimum Scope

- one small fixed top-down 2D map;
- Start / Home plus three compact combat areas;
- a route that naturally revisits at least two previous combat spaces;
- maximum two enemy types;
- easy enemies whose purpose is to create spatial history, not test combat skill;
- one minimal attack input;
- 2D authored assets for player, live enemies, and corpses.

## Visual Requirement

This experiment should not use pure circles / rectangles as the main actor representation.

Use Prototype-local 2D assets under:

`prototypes/004_persistent_enemy_corpses/assets/`

The map itself may still use simple shapes / flat-color zones.

## What to Observe

Positive signals:

- revisited areas feel visibly changed by prior combat;
- corpses help the Player remember where events occurred;
- the Player experiences a stronger “I was here before” feeling;
- the world feels more persistent / historical;
- remains become spatial memory cues without needing UI markers.

Weak / negative signals:

- corpses are merely clutter;
- revisiting feels effectively the same as Clean Removal;
- Player barely notices them;
- the feeling comes entirely from combat or map landmarks rather than corpse persistence.

## Non-goals

Do not add:

- corpse loot;
- inventory;
- corpse dragging;
- corpse collision as a route blocker;
- corpse decay;
- pollution;
- scavengers;
- ecology;
- respawn logic;
- blood simulation;
- quests;
- save / load;
- procedural maps;
- complex combat;
- generalized ECS / corpse / combat architecture.

## Result

MAYBE / Context-dependent — Player completed both conditions on 2026-09-16.

Player feedback:

> “留下来感觉还行。不留的话也可以。主要要看后续的玩法跟进。包括其他设置比如篝火刷新，红月刷新，如果有这些设置，那么进行这些操作的时候，实体是否要进行刷新。感觉上应该要刷新。但这些都是玩法上的探索。”

Interpretation:

- Persistent corpses provide a mild positive world-history signal, but not enough independent value to become a standalone core mechanic.
- Clean Removal is also acceptable; the comparison did not produce a strong preference.
- Corpse lifetime should therefore be treated as context-dependent world-state behavior rather than a universally permanent rule.
- A strong default candidate for future persistent-world prototypes is: defeated enemies may leave corpses during the current world state, while a meaningful World Refresh event may clear/rebuild those remains together with refreshed entities.
- This is a design direction, not a proven rule. Campfire refresh, Blood Moon refresh, selective persistence, and cross-refresh corpse accumulation remain separate gameplay questions.

## Follow-up Learning

The more general design question is no longer only “should corpses persist?” but:

> Different world entities may need different lifetimes and different responses to World Refresh events.

Potential future distinctions include:

- short-lived state: ordinary enemy corpses;
- refreshable state: ordinary enemies / common resources;
- longer-lived state: unlocked shortcuts / construction;
- explicitly persistent history: special corpses, bosses, player-created changes, or other selected events.

Do not build a generalized World State Lifetime framework from this result alone. Validate concrete gameplay cases first.
