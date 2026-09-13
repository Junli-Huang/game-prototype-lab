# Current Work Item

Active implementation sequence:

1. `docs/work-items/EXP-048-review-fix-01.md`
2. `docs/work-items/EXP-049-fixed-vs-movable-equipment.md`

Work / Developer is authorized to execute both Work Items in one continuous Work session, in the exact order above.

## Step 1 — EXP-048 Review Fix 01

- Change EXP-048 default Test Condition to `Backpack Only`.
- Complete the required real-browser interaction matrix and GitHub Pages verification.
- Preserve the frozen nine-item parameters and all EXP-001 / EXP-003 historical behavior.
- Preserve Player feedback exactly as “感觉有使用的价值。” and keep EXP-048 at `MAYBE`.

Do not close CURRENT after Step 1 if Step 2 can proceed in the same Work session.

## Step 2 — EXP-049 Fixed vs Movable Equipment

Implement EXP-049 as defined in:

`docs/work-items/EXP-049-fixed-vs-movable-equipment.md`

Key isolation:

- both conditions use the existing EXP-003 Heavy / High Occupancy equipment set;
- both conditions use the same seven-item Loot sequence;
- only Required Equipment mobility changes;
- Movable Required Equipment may move / rotate but cannot be discarded;
- Locked Required Equipment preserves the current fixed behavior;
- do not build Low / High × Movable / Locked as a four-condition matrix.

## Completion

After both Work Items pass their Acceptance requirements:

1. EXP-048 remains `MAYBE` with the preserved Player feedback.
2. EXP-049 becomes `TESTING / Result: Untested` until actual Player comparison.
3. Synchronize Prototype README, `docs/project-state.md`, `docs/experiment-backlog.md`, and relevant experiment docs.
4. Verify `npm run build` and deployed GitHub Pages / direct Prototype refresh.
5. Restore this file to `No active implementation task`.
6. Do not automatically select another Experiment.
