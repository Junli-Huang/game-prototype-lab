# Current Work Item

No active implementation task.

Completed on 2026-09-16:

- Prototype #005 implements one fixed map where Day places enemies in Zone A and Night places enemies in Zone B.
- Home exposes deliberate Day / Night switching without a countdown; switching deterministically replaces the active enemy population.
- Map geometry, destinations, movement speed, attack rules, landmarks, and destination value remain fixed.
- Supplied player, attack, Day enemy, Night enemy, and time-state assets are used directly.
- Restart resets time to Day, enemy population, objectives, counters, zone-entry evidence, and summary.
- Production build, real-browser interaction, GitHub Pages, launcher entry, and direct refresh were technically accepted.
- EXP-013 remains `TESTING / Untested`; no gameplay result was inferred.

Next action belongs to the Player: inspect both zones during Day, switch at Home, inspect both during Night, and report whether learned timing affected route choice.
