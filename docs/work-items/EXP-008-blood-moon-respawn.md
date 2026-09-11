# Work Item — EXP-008 Blood Moon Respawn

Prototype: `#002 — Enemy Respawn Lab`

Implementation directory: `prototypes/002_campfire_respawn/`

Current comparison baseline: `EXP-007 Campfire Respawn — MAYBE`

Target status: `EXP-008 READY → BUILDING → TESTING`

## Goal

Add EXP-008 as the second controlled Experiment Mode inside Prototype #002. Do not create a new Prototype.

Question:

> 一个明确可预期的全局 Blood Moon 周期，是否会让玩家产生“赶在刷新前做什么 / 什么时候行动”的节奏感？

Hypothesis:

如果敌人不是由玩家 Rest 主动刷新，而是在一个明确预告的全局 Blood Moon 周期中统一刷新，那么玩家可能会围绕世界周期调整推进、返回和战斗时机，从而形成比 Campfire Respawn 更明显的行动节奏。

## Controlled comparison

Keep unchanged from EXP-007:

- Same map and three narrow passages.
- Same player HP, movement, attack and hit rules.
- Same four enemies, spawn points, HP, damage, speed and collision behavior.
- Same end marker.
- Same Trial Failed death semantics.
- Same Restart semantics apart from resetting current Mode-specific state.

Change only the enemy respawn trigger.

### EXP-007 Campfire Respawn

```text
Rest
→ Player HP Full
→ All Enemies Reset
```

### EXP-008 Blood Moon Respawn

```text
Rest
→ Player HP Full
→ Enemies unchanged

Blood Moon
→ All Enemies Reset
```

Do not alter EXP-007 gameplay while adding EXP-008.

## Distinction from EXP-010 Time Respawn

EXP-008 is a synchronized global world event.

Do NOT implement:

```text
Enemy dies
→ wait N seconds
→ that enemy respawns
```

That belongs to EXP-010.

EXP-008 semantics:

```text
Global Blood Moon cycle
→ all enemies reset together at one shared event time
```

## Blood Moon cycle

Use a compressed fixed cycle for the prototype:

```text
30 seconds
```

At Mode start / Restart:

```text
Blood Moon in 30s
```

Countdown reaches 0:

- Reset every enemy to original spawn.
- Restore every enemy to max HP and alive state.
- Reset surviving enemies too, not only dead enemies.
- Clear Route Cleared state.
- Do NOT heal or reposition Player.
- Start the next 30-second Blood Moon cycle.

Blood Moon timer stops when Player is in Trial Failed state.

## Rest in EXP-008

Campfire remains available.

Rest does only:

```text
Player HP → Max
```

Rest must NOT:

- Respawn enemies.
- Reset enemy positions or HP.
- Reset, pause or modify the Blood Moon timer.

## Mode selector

Prototype #002 now has two implemented modes.

Add the simplest possible selector:

```text
Respawn Mode
[ Campfire ] [ Blood Moon ]
```

Default to Blood Moon while EXP-008 is the active experiment.

Switching Mode must execute:

```text
Switch Mode
→ Full Reset
→ Apply selected rule
→ Start Fresh
```

Reset at least:

- Player position / HP.
- Enemy states.
- Combat cooldown / invulnerability.
- Route Cleared.
- Messages.
- Blood Moon timer.
- Any other Mode-specific state.

Do not build a generic Mode Framework.

## Visual feedback

Visual Fidelity stays `V2 — Spatial`.

Countdown must always be visible, for example:

```text
Blood Moon in 23s
```

Final 10 seconds should become clearly more noticeable.

Allowed lightweight procedural feedback:

- Gradually stronger red environment tint in final 10 seconds.
- Blood Moon becomes visually stronger / larger / more prominent.
- Short red pulse when the event fires.
- Message: `Blood Moon · Enemies returned`.

Do not build DayNightSystem, WeatherSystem, SkySystem or post-processing framework.

## Assets Ready

### Blood Moon

Path:

```text
prototypes/002_campfire_respawn/assets/blood_moon.gltf
```

Asset notes:

```text
prototypes/002_campfire_respawn/assets/README.md
```

Status: `Ready`

Use: visual anchor for the Blood Moon world event.

Work instructions:

- Load and use this model directly.
- Do not rebuild the Blood Moon with Three.js primitives unless the asset cannot load or materially blocks the experiment.
- Whole-object position / rotation / scale / opacity and environment lighting changes are allowed.

Do not remake Player / Enemy / Campfire assets for this task. Existing #002 visuals are part of the comparison baseline.

## Respawn safety

If the Blood Moon fires during combat, avoid same-frame unavoidable contact damage caused only by teleport/reset.

A short technical contact-damage grace of roughly `0.5–0.8s` after the event is acceptable.

This is implementation protection, not a gameplay buff.

## Death / Restart

Keep EXP-007 Trial Failed semantics:

```text
HP = 0
→ Trial Failed
→ current attempt freezes
```

Blood Moon timer freezes too.

Restart current Mode performs a full reset. In Blood Moon Mode, timer returns to `30s`.

## Minimum Scope

Implement only:

- Blood Moon Mode.
- Simple Campfire / Blood Moon selector.
- 30-second global cycle.
- Visible countdown.
- Stronger warning in final 10 seconds.
- Synchronized all-enemy reset at Blood Moon.
- Heal-only Rest in Blood Moon Mode.
- `blood_moon.gltf` loading and presentation.
- Full Mode Reset.
- README / Backlog / Launcher state synchronization.

Stop there.

## Non-goals

Do not add:

- Day / night system.
- Calendar.
- Real moon phases.
- Random Blood Moon timing.
- Blood Moon enemy buffs.
- Special enemies.
- Special loot.
- Weather.
- Ecology changes.
- Blood Moon boss.
- Music system.
- Generic world-event system.
- EXP-009.
- EXP-010.
- EXP-016 Blood Moon Ecology.
- AssetManager / Mode Framework / Rule Engine.

## Technical acceptance

Verify at minimum:

1. Campfire Mode still behaves exactly as EXP-007.
2. Mode switching performs a full reset.
3. Blood Moon Mode Rest heals only and does not respawn enemies.
4. Dead enemies remain dead before the Blood Moon event.
5. Blood Moon resets all enemies simultaneously.
6. Surviving enemies also return to original spawn / max HP.
7. Blood Moon does not reset Player HP or position.
8. Timer starts a new 30-second cycle after the event.
9. Trial Failed freezes timer and gameplay.
10. Restart resets current Mode correctly.
11. `blood_moon.gltf` loads successfully.
12. WebGL and existing fallback path remain usable.
13. `npm run build` passes.
14. GitHub Pages works.

## Documentation / status

At start:

```text
EXP-008 READY → BUILDING
```

After technical acceptance:

```text
EXP-008 BUILDING → TESTING
Result: Untested
```

Keep:

```text
EXP-007 = MAYBE
```

Prototype README should then list at least:

| Mode | Experiment | Status |
| --- | --- | --- |
| Campfire Respawn | EXP-007 | MAYBE |
| Blood Moon Respawn | EXP-008 | TESTING |

Do not overwrite EXP-007 historical Result.

## Player evaluation later

Do not pre-fill gameplay conclusions. Future Player playtest should observe:

- Whether the Player watches the countdown.
- Whether approaching Blood Moon changes movement or combat timing.
- Whether Player rushes before the event.
- Whether Player waits for the event before leaving camp.
- Whether the synchronized reset feels like useful rhythm or merely interruption.
- Whether Blood Moon Respawn produces a stronger reaction than Campfire Respawn.

## Stop condition

Enter TESTING once the Player can experience:

```text
Clear enemies
→ see Blood Moon approaching
→ choose whether to continue / return / wait
→ Blood Moon fires
→ all enemies return together
→ continue playing
```

Do not add more features after this loop is technically valid.
