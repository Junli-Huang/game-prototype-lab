# Current Work Item

**ACTIVE: EXP-050 Review Fix — Consolidate Key Test Into Shortcut Mode**

Formal Work Item:

`docs/work-items/EXP-050-ui-consolidation.md`

Prototype:

`prototypes/003_fixed_map_exploration/`

Required structural change:

- keep only two top-level Experiment Modes: `EXP-004 · Fixed Map` and `EXP-006 · Shortcut`;
- remove `EXP-050 · Keyed Shortcut` as a third top-level Mode;
- expose `No Key` / `Start With Key` as Test Conditions inside the Shortcut Mode;
- preserve EXP-050 as a separate Experiment record and keep it `TESTING / Untested` until Player comparison;
- preserve EXP-006 current Player result as `MAYBE`;
- do not change map geometry, gate logic, movement speed, or add new gameplay.

Work is authorized only through the linked Work Item. On completion, run build + real-browser + Pages/direct-refresh acceptance, update relevant documentation, then close CURRENT back to no active implementation task.
