# Result Record — EXP-007 / EXP-008 World Refresh Profile R2

Date: 2026-09-11

Prototype: `#002 — Enemy Respawn Lab`

Compared experiments:

- EXP-007 — Campfire World Refresh
- EXP-008 — Blood Moon World Refresh

Test condition:

```text
Refresh Profile
Enemies: ON
Common Resources: ON
```

Both experiments used the same map, enemies, common resources, player rules, pickup rules, and Refresh Profile. Only the World Refresh trigger differed:

```text
EXP-007
Rest → Heal + World Refresh

EXP-008
Rest → Heal only
Blood Moon → World Refresh
```

## Player feedback

Player feedback after comparative play:

> “体验下来没有明显的感觉。”

Do not infer unreported behavior such as rushing, waiting, farming, deliberate route timing, or dislike of the timer.

## Interpretation

The R2 implementation passed technical review. The lack of a strong response is therefore treated as a gameplay signal rather than an implementation failure.

Adding ordinary renewable opportunities to the refresh event did not produce a clearly stronger experience than the prior enemy-only condition.

Observed signal:

- no clear positive feeling reported;
- no clear negative feeling reported;
- no specific meaningful timing / planning decision reported;
- no evidence that Campfire-triggered refresh was clearly preferable;
- no evidence that Blood-Moon-triggered refresh was clearly preferable.

## Result

Conservative result:

```text
EXP-007 R2: MAYBE
EXP-008 R2: MAYBE
```

Reason:

The result is neutral / weak rather than clearly negative. These refresh mechanisms may depend strongly on a broader gameplay context, so this test does not justify calling the mechanisms universally DEAD.

However, under the current small fixed-route Prototype, neither refresh trigger demonstrated strong standalone gameplay value.

## Comparison with R1

EXP-007 R1 historical feedback remains preserved:

> “没有好坏的感受，就一般。”

R2 added Common Resources to the World Refresh profile while keeping the experiment controlled. The new feedback remained similarly neutral.

This increases confidence that simply adding ordinary renewable rewards is not enough, in this Prototype, to make the refresh trigger itself feel meaningfully interesting.

## Next

Stop expanding Prototype #002.

Do NOT create an R3 by adding more treasure, more enemies, longer routes, special rewards, ecology, or additional refresh categories merely to rescue the result.

Working interpretation for future design discussion:

> World Refresh may be more valuable as a supporting structure inside a richer route / ecology / world-state loop than as a standalone core source of fun.

EXP-007 / EXP-008 may be revisited later only when a different gameplay context creates a new experiment question.

This result record does not automatically select EXP-009, EXP-010, or EXP-016 as the next experiment.
