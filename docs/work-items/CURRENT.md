# Current Work Item

No active implementation task.

Completed on 2026-09-16:

- Prototype #005 implements one fixed map where Day places enemies in Zone A and Night places enemies in Zone B.
- Home exposes deliberate Day / Night switching without a countdown; switching deterministically replaces the active enemy population.
- Map geometry, destinations, movement speed, attack rules, landmarks, and destination value remain fixed.
- Supplied player, attack, Day enemy, Night enemy, and time-state assets are used directly.
- Restart resets time to Day, enemy population, objectives, counters, zone-entry evidence, and summary.
- Production build, real-browser interaction, GitHub Pages, launcher entry, and direct refresh were technically accepted.
- Player completed the experiment.
- EXP-013 result: `MAYBE / Context-dependent`.
- Player feedback: “感觉这个设定可以用在某些游戏里。还行。”
- Main learning: predictable time-based enemy distribution is a usable world rule, but its value appears dependent on surrounding route, risk, resource, objective, or ecology systems rather than being a strong standalone mechanic.

Next action: choose a different experiment. Do not automatically expand EXP-013 into a full day/night system or select another Backlog item without explicit selection.
