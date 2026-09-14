# Current Work Item

Active implementation task:

`docs/work-items/EXP-050-keyed-shortcut-access.md`

Experiment:

`EXP-050 — Keyed Shortcut Access`

Prototype:

`prototypes/003_fixed_map_exploration/`

Player context to preserve:

- EXP-006 Player feedback: “角色的移动速度是影响我体验的重要感受。其他的话，门这个东西，我觉得的确是好点。”
- EXP-006 current status: `MAYBE` — positive but limited shortcut signal.
- Movement speed is a known experiential confound; keep it identical across compared conditions in EXP-050.

Work / Developer:

1. Read current `main` fresh.
2. Execute only `docs/work-items/EXP-050-keyed-shortcut-access.md`.
3. Add EXP-050 as a third Experiment Mode without rewriting EXP-004 / EXP-006 history.
4. Implement `No Key` and `Start With Key` conditions exactly as specified.
5. Keep the same map, gate, target order, movement speed and three-run structure.
6. Preserve clear near-side / far-side gate prompts and verify `E` interaction in a real browser.
7. Restore unrelated status drift if encountered: EXP-002 = `IDEA`; EXP-003 = `TESTING / Untested`.
8. Complete build, browser and GitHub Pages/direct-refresh acceptance.
9. Update documentation and close CURRENT only after all acceptance items pass.
