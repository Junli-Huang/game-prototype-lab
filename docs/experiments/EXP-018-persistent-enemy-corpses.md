# EXP-018 — Persistent Enemy Corpses

Status: READY / Selected

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

Everything else should remain identical between conditions:

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

TBD — not implemented / not played.
