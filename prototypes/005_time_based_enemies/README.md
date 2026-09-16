# Prototype #005 — Time-Based Enemies Lab

Experiment: `EXP-013 — Time-Based Enemies`

Status: `TESTING / Untested`

## Question

Does a predictable Day / Night enemy distribution teach the Player “when to go where” and lead to deliberate timing choices?

## Controlled Rule

- Day: Zone A contains three Day Stalkers; Zone B is safe.
- Night: Zone A is safe; Zone B contains three Night Wraiths.
- The map, destinations, movement speed, attack range, enemy health, and objective value remain identical.
- Waiting is deliberate, has no countdown pressure, and is available only at Home.
- A time change replaces the active enemy population and clears old bodies. This is test scaffolding only, not a World Refresh conclusion.

## Session

1. Inspect Zone A and Zone B during Day.
2. Return Home and choose `Wait Until Night`.
3. Revisit Zone A and Zone B during Night.
4. Return Home for a descriptive summary.

The summary records time switches, zone entry by time state, and enemies defeated by time state. It does not grade a route.

## Controls

- `WASD` / Arrow Keys — move
- `Space` / `E` — attack the nearest enemy in range
- `Q` / Wait button — switch Day / Night while at Home
- `R` / Restart — reset the complete session to Day

## Assets

Uses all Prototype-local player, slash, Day Stalker, Night Wraith, Day icon, and Night icon SVG assets directly.

## Non-goals

No clock, calendar, automatic timer, resources, loot, map access changes, corpse persistence, Blood Moon, Campfire refresh, NPC schedules, weather, enemy buffs, save system, or generalized time/ecology framework.

Implementation, production build, real-browser interaction, and GitHub Pages/direct-refresh acceptance completed on 2026-09-16. No gameplay result is assigned before Player testing.
