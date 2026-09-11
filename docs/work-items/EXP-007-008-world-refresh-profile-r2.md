# Work Item — EXP-007 / EXP-008 World Refresh Profile R2

Prototype: `#002 — Enemy Respawn Lab`

Implementation directory: `prototypes/002_campfire_respawn/`

Comparison modes:

- `EXP-007 — Campfire World Refresh`
- `EXP-008 — Blood Moon World Refresh`

This is a controlled comparison revision. Preserve all historical EXP-007 / EXP-008 implementation notes and Player results; do not overwrite the previous enemy-only EXP-007 result.

## Why this revision exists

The previous comparison only refreshed enemies. This revision broadens the meaning of `World Refresh` so the event can restore both danger and ordinary opportunity.

The comparison question remains:

> 当同一批世界内容需要刷新时，由玩家主动 Rest 触发，与由世界周期 Blood Moon 触发，会产生怎样不同的行动节奏与决策体验？

Do not turn this into a loot-system experiment. Common Resources are deliberately simple and equal-value.

## Controlled comparison

Keep unchanged between the two modes:

- Same map and three narrow passages.
- Same player HP, movement, combat and death rules.
- Same four enemies, spawn points and combat parameters.
- Same common resource types, positions, pickup rule and value.
- Same Refresh Profile.
- Same end marker.
- Same Restart and Mode Reset semantics.

Only the trigger differs.

### EXP-007 — Campfire World Refresh

```text
Rest
→ Player HP Full
→ Apply Refresh Profile
```

### EXP-008 — Blood Moon World Refresh

```text
Rest
→ Player HP Full only

Blood Moon
→ Apply Refresh Profile
```

Blood Moon timer behavior remains the existing 30-second synchronized world event.

## Refresh Profile

Add a small visible `World Refresh Content` / `Refresh Profile` panel.

Current implemented options:

```text
[x] Enemies
[x] Common Resources
```

Default checked / highlighted means the Designer-recommended test condition.

Recommended Profile:

```text
Enemies: ON
Common Resources: ON
```

### Option behavior

- The user may change these options before or between test sessions.
- Changing an option must immediately start a fresh test session / full reset so one session never mixes refresh conditions.
- Current option values stay the same when switching EXP-007 / EXP-008 so the two modes remain directly comparable.
- `Restart` restarts the current Mode using the currently selected Refresh Profile.
- Do not persist settings across browser reload unless trivial existing state already does so; persistence is not required.

Do not build a generic settings/config framework.

## Future / non-implemented categories

The design concept may later include categories such as:

```text
Unique Treasure
Corpses
Special Enemies
World Changes
```

Do NOT create functioning toggles for content that does not exist in #002.

If useful for explanation, they may appear only as disabled / `Not in this prototype` text, but the preferred minimal UI is to show only implemented options.

## Common Resources

Add exactly three fixed Common Resource points to the existing route.

Use one of each:

1. Herb
2. Supply Cache
3. Ore Node

They are visually different but mechanically identical in this experiment.

### Resource rule

Each resource point:

```text
available
→ Player touches / approaches it
→ collect once
→ resource disappears / becomes clearly inactive
→ Common Resources collected +1
```

No interaction button is required unless collision pickup is unreliable.

All three resources have the same abstract value:

```text
1 Common Resource
```

Do not add inventories, item use, healing, crafting, weight, rarity, random loot or economy.

The visible distinction exists only to make the world feel like it contains different ordinary opportunities.

### HUD

Add a simple counter:

```text
Common Resources: 0 / 3
```

Counter is session collection count. When a resource is refreshed, it becomes collectable again; collecting it again increases the counter again.

Do not cap the total at 3 if multiple world cycles occur. A clearer form is acceptable, e.g.:

```text
Resources Collected: 4
Available Now: 2 / 3
```

Prefer the minimum UI that makes refresh behavior observable.

## Refresh semantics

When `Enemies = ON`:

- Apply the existing all-enemy reset behavior.
- Dead and surviving enemies return to original spawn / HP / alive state.

When `Enemies = OFF`:

- World Refresh does not alter enemy state.

When `Common Resources = ON`:

- All three resource points become available again.

When `Common Resources = OFF`:

- Collected resource points stay collected through World Refresh.

A Mode switch or explicit Restart is still a full experiment reset and restores the initial scene regardless of Refresh Profile. The Profile only controls what a `World Refresh` event restores.

## Resource positions

Place the three resources at fixed readable positions along the existing route, preferably one associated with each broad route section / passage region.

Constraints:

- Do not block player movement.
- Do not change enemy encounter geometry.
- Do not place them so far off-route that EXP-007 / EXP-008 becomes an exploration-navigation experiment.
- Both modes use exactly the same positions.

The exact coordinates may be chosen from the current scene geometry and recorded in Prototype README.

## Assets Ready

All assets are Prototype-local and already committed.

### Herb

Path:

`prototypes/002_campfire_respawn/assets/common_herb.gltf`

Use: ordinary renewable resource point.

Work: load directly; do not recreate procedurally.

### Supply Cache

Path:

`prototypes/002_campfire_respawn/assets/supply_cache.gltf`

Use: ordinary renewable resource point.

Work: load directly; do not recreate procedurally. The visible medkit is visual only and must not heal the Player.

### Ore Node

Path:

`prototypes/002_campfire_respawn/assets/ore_node.gltf`

Use: ordinary renewable resource point.

Work: load directly; do not recreate procedurally.

### Existing Blood Moon

Path:

`prototypes/002_campfire_respawn/assets/blood_moon.gltf`

Keep existing EXP-008 use unchanged.

Detailed conventions are in:

`prototypes/002_campfire_respawn/assets/README.md`

## Naming / documentation

Because refresh now includes more than enemies, update user-facing experiment names where appropriate:

```text
EXP-007 Campfire World Refresh
EXP-008 Blood Moon World Refresh
```

Experiment IDs stay unchanged.

Do not rename the implementation directory.

Prototype remains:

`Enemy Respawn Lab`

A future container rename may be considered separately; do not do it in this task.

## Historical Result handling

EXP-007 already has a Player result from the enemy-only revision:

> “没有好坏的感受，就一般。”

Do not delete or rewrite it.

Record it explicitly as the prior / R1 test condition, for example:

```text
R1 — Enemies only
Result: MAYBE
Player feedback: “没有好坏的感受，就一般。”
```

R2 uses the recommended profile:

```text
Enemies ON
Common Resources ON
```

R2 Player Result must remain `Untested` until the Player actually replays it.

EXP-008 existing enemy-only technical implementation/history also remains recorded; R2 gameplay conclusion is Untested.

After implementation, both R2 modes are ready for comparative Player testing. Do not invent a new gameplay conclusion from technical validation.

## Minimum Scope

Implement only:

- `Refresh Profile` with `Enemies` and `Common Resources` toggles.
- Recommended defaults ON / ON.
- Full reset whenever profile settings change.
- Three fixed common resource points.
- Direct use of the three Ready glTF resource assets.
- Simple touch/proximity pickup.
- Minimal observable resource HUD.
- Apply Refresh Profile from Campfire in EXP-007.
- Apply the same Refresh Profile from Blood Moon in EXP-008.
- Rename user-facing EXP-007 / EXP-008 labels from `Respawn` to `World Refresh` where appropriate.
- Preserve historical R1 results and document R2 as Untested.
- Build / Pages verification.

Stop there.

## Non-goals

Do not add:

- Inventory or spatial backpack integration.
- Healing herbs / consumable effects.
- Crafting.
- Currency or prices.
- Random resource values.
- Loot tables.
- Resource rarity.
- Unique treasure implementation.
- Corpses.
- Special enemy refresh categories.
- Resource growth timers independent of World Refresh.
- Day/night or ecology systems.
- Generic Reset/Rule/Profile framework.
- Shared asset systems.
- EXP-009 / EXP-010 / EXP-014 / EXP-016 implementation.

## Technical acceptance

Verify at minimum:

1. Default Profile is `Enemies ON / Common Resources ON`.
2. Changing either profile option performs a full fresh-session reset.
3. Switching Campfire / Blood Moon Mode also performs a full reset while retaining the selected Profile.
4. All three resource glTF files load successfully.
5. Herb / Supply / Ore are visually distinguishable and do not block movement.
6. Each resource can be collected once while available.
7. Common Resources ON restores all collected resource points on World Refresh.
8. Common Resources OFF leaves collected points collected on World Refresh.
9. Enemies ON keeps existing enemy refresh behavior.
10. Enemies OFF leaves enemies unchanged on World Refresh.
11. EXP-007 Rest still heals Player and then applies the selected Profile.
12. EXP-008 Rest heals only and does not trigger World Refresh.
13. EXP-008 Blood Moon applies the same selected Profile.
14. EXP-008 timer, warning, Blood Moon asset, Trial Failed and post-event damage grace remain correct.
15. Explicit Restart restores the initial scene using the currently selected Profile settings.
16. R1 historical EXP-007 result remains intact in docs.
17. R2 gameplay Result remains Untested after technical validation.
18. `npm run build` passes.
19. GitHub Pages works.

## Player test after implementation

Recommended first comparison uses:

```text
Enemies ON
Common Resources ON
```

Play both modes naturally.

Observe whether adding ordinary opportunities changes the meaning of refresh:

- Does Campfire refresh feel more like voluntarily starting a new world cycle rather than only paying a penalty?
- Does Blood Moon create a stronger urge to collect resources before the cycle changes?
- Does the Player ever wait for refresh because resources will return?
- Does the risk + opportunity reset create planning, or merely encourage repetitive farming?
- Which trigger produces the clearer / more interesting rhythm under the same Profile?

Do not require the Player to optimize or intentionally demonstrate these behaviors.

## Stop condition

Stop development once both Modes can be replayed under the same selectable Refresh Profile and the Player can visibly experience:

```text
Enemies / resources become consumed
→ World Refresh trigger occurs
→ only enabled Profile categories return
→ continue playing
```

Do not add more content before Player comparison.
