# EXP-048 Review Fix 01 — Baseline Order & Technical Acceptance

Status: ACTIVE REVIEW / FIX REQUEST

Experiment: EXP-048 — Body Equipment Storage

Prototype: `prototypes/001_spatial_backpack/`

## Context

EXP-048 has been implemented and the Player has completed an initial hands-on try. Player feedback:

> “感觉有使用的价值。”

Record this as a **positive but still limited gameplay signal**. The experiment should be tracked as `MAYBE` rather than `INTERESTING` until stronger evidence exists about meaningful allocation decisions.

During code review, two implementation-process issues were identified. This Work Item fixes those issues only. It must not change the frozen nine-item parameters, Body Slot rules, values, compatibility mapping, or experiment scope.

## Fix 1 — Default to the Baseline Condition

Current implementation defaults EXP-048 to `Body Slots Available`.

Change the default EXP-048 Test Condition to:

`Backpack Only`

Reason:

- EXP-048 is a controlled comparison between a baseline (`Backpack Only`) and the treatment (`Body Slots Available`).
- The first-open experience should not expose the treatment before the baseline.
- This avoids priming future Player tests with Body Slot knowledge before the baseline condition.

Requirements:

- TypeScript initial `condition` must be `backpack-only`.
- HTML initial selected state must mark `Backpack Only` selected and `Body Slots Available` unselected.
- Body panel must be hidden on initial EXP-048 load while `Backpack Only` is active.
- The first session started by the page must therefore be EXP-048 / Backpack Only.
- Switching to `Body Slots Available` must still fully reset the session.

Do not remove either Test Condition.

## Fix 2 — Complete Technical Acceptance Before Closing Work

The original EXP-048 Work Item required more than a successful local TypeScript/build step. Complete and record technical acceptance for the actual browser interaction and deployed Pages path.

At minimum verify in a real browser:

### EXP-048 / Backpack Only

- all nine items use the frozen sequence, dimensions and values;
- Body storage is unavailable;
- drag / rotate / backpack placement / rearrange / discard / next-item progression work;
- Restart fully resets session state.

### EXP-048 / Body Slots Available

Verify all of the following:

- Body locations are exactly Back / Chest / Waist;
- compatible Tray item → legal Body Slot works;
- compatible Backpack item → legal Body Slot works;
- Body item → Backpack works when legal space exists;
- Body item → Discard works;
- incompatible Body Slot drop is rejected without changing model state;
- occupied Body Slot drop is rejected without changing model state;
- Body item does not exist simultaneously in Backpack and Body;
- switching Test Condition fully resets backpack, body, discarded, current item, value, summary, drag and orientation state;
- switching Experiment Mode fully resets the session and preserves historical EXP-001 / EXP-003 behavior;
- Restart fully resets the active EXP-048 condition.

### Build / Deployment

- `npm run build` passes;
- GitHub Pages deployment for the resulting main-branch build is valid;
- the deployed Backpack Lab page loads and exposes EXP-048 correctly;
- directly loading / refreshing the Prototype URL remains valid.

If browser or Pages verification finds a concrete bug, fix the minimum code necessary and document the fix. Do not add new gameplay or architecture.

## Player Result Discipline

Do not overwrite or reinterpret the current Player feedback during this review-fix task.

Current gameplay result to preserve:

- Status: `MAYBE`
- Player feedback: “感觉有使用的价值。”
- Interpretation: positive signal that Body Equipment Storage has practical / gameplay value, but evidence is not yet strong enough to mark `INTERESTING`.

The original test-order flaw means future controlled comparison should begin from `Backpack Only`, but the existing feedback remains valid as an initial hands-on observation and must remain in history.

Do not fabricate finer-grained Observed / Decisions / Interesting Moment details that the Player did not report.

## Non-goals

Do not change:

- 6×8 backpack;
- the nine-item sequence;
- item dimensions;
- item values;
- Back / Chest / Waist capacities;
- compatibility mapping;
- total area pressure;
- Body Slot interaction semantics;
- EXP-001 or EXP-003 rules;
- access speed;
- combat;
- durability / condition;
- exposure risk;
- weight / encumbrance;
- additional body locations;
- multiple legal slots per item;
- external backpack mounts;
- hand-carried items;
- general Inventory / Slot / Rule frameworks.

## Documentation Updates

On completion:

1. Update `prototypes/001_spatial_backpack/README.md` with the review fix and browser / Pages acceptance evidence.
2. Update `docs/experiments/EXP-048-body-equipment-storage.md` so Result reflects the preserved Player feedback and current `MAYBE` status.
3. Update `docs/project-state.md` with EXP-048 `MAYBE` and the completed technical acceptance state.
4. Update `docs/experiment-backlog.md` to keep EXP-048 status synchronized as `MAYBE`.
5. Restore `docs/work-items/CURRENT.md` to `No active implementation task` after all acceptance items are complete.

## Acceptance

This review-fix task is complete when:

1. EXP-048 opens by default in `Backpack Only`.
2. Initial UI selected state and Body Panel visibility match that default.
3. Switching to `Body Slots Available` performs a full reset.
4. The browser interaction matrix above is manually verified.
5. `npm run build` passes.
6. GitHub Pages deployment and direct Prototype access are verified.
7. No frozen EXP-048 gameplay parameter changed.
8. EXP-048 Player Result remains historically accurate and is recorded as `MAYBE` with the exact feedback “感觉有使用的价值。”
9. Documentation and CURRENT are synchronized only after technical acceptance is complete.
