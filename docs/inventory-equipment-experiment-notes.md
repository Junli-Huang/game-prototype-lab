# Inventory / Equipment Experiment Notes

Status: Design chain with EXP-048 selected; remaining items are candidates only.

Purpose: preserve the Inventory / Equipment design direction while keeping each experiment isolated. EXP-048 has now been promoted out of the candidate pool into a selected READY experiment; later ideas remain unselected.

## Current tested foundation

### EXP-001 — Spatial Backpack Placement

Question already tested:

> 有限二维背包、不同尺寸物品、摆放 / 旋转 / 重排 / 丢弃，本身是否能产生有意义的整理与取舍？

Current result: MAYBE.

### EXP-003 — Equipment vs Loot Space

Experiment-level change relative to EXP-001:

> Session 开始时，背包中已有一部分 Locked Equipment，占据原本可用于 Loot 的空间。

Low / High occupancy are only Test Conditions inside EXP-003. They are not separate experiments or character builds.

EXP-003 deliberately does not implement equipment effects, body slots, external mounts, durability, combat, or access speed.

---

# Selected next experiment

## EXP-048 — Body Equipment Storage

Status: **READY / Selected**.

Formal definition:

`docs/experiments/EXP-048-body-equipment-storage.md`

### Core idea

Player inventory is no longer only the backpack interior. The body itself provides a small number of explicit carry locations outside the backpack grid.

Initial locations selected for the first test:

- Back
- Waist
- Chest

Initial compatibility examples:

- Old Rifle → Backpack or Back
- Compact Sidearm → Backpack or Waist
- Field Medkit → Backpack or Chest

### Question

> 当玩家身体本身也成为有限携带空间，而且部分物品可以选择放入背包或挂到身体位置时，“物品放在哪里”是否会产生新的、有意义的空间分配决策？

### Isolation

EXP-048 tests only **where items may be stored**.

Do not add combat effectiveness, durability, damage, draw speed, quick access, weight, or exposure risk in this experiment.

The intended comparison is Backpack Only vs Body Slots Available using the same item sequence. These are Test Conditions inside EXP-048, not separate Experiment Modes.

EXP-048 should reuse Backpack Lab only because the comparison benefits from the same spatial-inventory interaction. Do not turn the reuse into a general Inventory / Equipment framework.

### Implementation gate

EXP-048 is selected but not yet authorized for Work implementation.

Before creating the Work Item, freeze:

- exact item sequence and dimensions;
- body-slot capacities;
- legal item-location mappings;
- any Ready visual assets.

`docs/work-items/CURRENT.md` remains No active task until the formal Work Item is ready.

---

# Remaining candidate experiment chain

The following ideas remain candidates and should generally be explored in the order **space → access → exposure / risk**, rather than implemented together.

## Candidate B — Spatial / Anatomical Mount Points

### Core idea

Body slots become more spatial and less abstract.

Instead of only three simple carry locations, individual regions may have attachment capacity, inspired by games such as *Death Stranding*:

```text
Back
Waist
Left / Right Hip
Chest
Left / Right Arm
Left / Right Leg
Backpack Exterior
```

Item shape / class may determine legal mount positions.

### Candidate question

> 相比简单 Body Equipment Storage，具有更明确身体部位与挂载位置的系统，是否会让“物品放在哪里”本身变成更有趣且可理解的空间决策？

### Important isolation

This is about **location readability and spatial allocation**, not damage or quick access yet.

Do not assume EXP-048 must evolve into this. Promote it only if a separate experiment is justified by the EXP-048 result.

---

## Candidate C — External Backpack Mounts

### Core idea

The backpack has an interior and a small number of exterior attachment points.

An externally mounted item does not consume normal interior grid space, but uses a limited mount point.

Examples:

- long tool;
- rifle;
- rolled equipment;
- medkit;
- utility pouch.

### Candidate question

> 当背包外侧拥有有限挂载位时，玩家是否会把某些大件 / 高频物品移到外部，从而形成“内部空间 vs 外部挂点”的有意义分配？

### Important isolation

First version should not make exterior items more fragile. Otherwise space benefit and exposure cost become inseparable.

---

## Candidate D — Access Speed by Location

### Core idea

Storage location changes access speed.

Possible simple hierarchy:

```text
Hand / Ready
→ immediate

Waist / Chest / External Mount
→ fast

Backpack Interior
→ slow
```

Example:

```text
Medkit in backpack
= safer storage / slower combat access

Medkit on chest
= faster access / consumes quick-access mount
```

### Candidate question

> 当物品位置影响取用速度时，玩家是否会主动把高频 / 应急物品放在身体或外挂位置，而把储备物放进背包？

### Important isolation

Keep item power identical. Test only access cost.

---

## Candidate E — Hand-Carried Items

### Core idea

Hands are another inventory layer.

A carried object can temporarily avoid backpack space but occupies one or both hands and may limit interaction / combat.

### Candidate question

> 把“手上拿着”作为独立容量层，是否会产生值得保留的短期运输与取舍玩法？

Potential tradeoff:

```text
Hand-carried
= immediate / no backpack space
= occupies hands
```

Do not combine with external-item damage in the first test.

---

## Candidate F — External Item Exposure

### Core idea

Items outside the protected backpack interior are exposed to world interaction.

Possible exposure sources:

- enemy hit;
- fall / knockdown;
- explosion;
- fire;
- water;
- contamination / anomaly.

Possible consequences:

- durability loss;
- stack / quantity reduction;
- item condition degradation;
- temporary disable;
- drop to ground.

### Core tradeoff

```text
Backpack Interior
= consumes protected interior space
= relatively safe

Body / External Mount
= saves interior space / can be easier to access
= exposed to world risk
```

### Candidate question

> 当外挂物品会因战斗或环境互动而受损时，“节省空间 / 快速取用”与“保护物品”之间是否能形成自然取舍？

### Important isolation

This candidate should come only after body / external storage has proven understandable. Otherwise a negative result may simply mean the mounting system itself was unclear.

---

## Candidate G — Quantity / Condition Loss Instead of Binary Breakage

### Core idea

Exposure does not have to destroy equipment outright.

Consumables or supplies may lose usable quantity / condition:

```text
Grenades: 3 → 2
Medkit charges: 4 → 3
Ammo / supplies: partial loss
Tool durability: 100 → 80
```

### Candidate question

> 相比“直接损坏 / 消失”，连续的使用量或耐久损失是否更容易产生可接受、可规划的风险？

This should be compared against binary loss rather than assumed superior.

---

# Design relationship

These experiments and candidates may eventually produce a location model such as:

```text
Player Carry Space
├─ Hands
├─ Body Mounts
│  ├─ Back
│  ├─ Waist / Hips
│  ├─ Chest
│  └─ Limbs
└─ Backpack
   ├─ Interior Grid
   └─ Exterior Mounts
```

But this diagram is a **design space**, not a system architecture requirement or a promised final system.

Do not build a universal Inventory / Equipment framework from this note.

Each selected experiment should implement only the minimum locations and rules needed to answer its question.

# Current sequencing recommendation

Current step:

```text
EXP-048 — Does body space create useful allocation decisions?
```

Only after its result should later experiments be selected deliberately:

```text
1. Does more spatial / anatomical mounting add useful decisions?
2. Do external backpack mounts add useful allocation decisions?
3. Does location affect access in an interesting way?
4. Does external exposure create meaningful risk?
5. Only then test durability / quantity-loss details.
```

Do not jump from EXP-048 directly to a combined system containing body slots + quick access + durability + combat damage.

# Status

EXP-048 is selected / READY and has a formal experiment definition.

All other candidates in this document remain **unselected design notes** with no automatic Experiment ID, READY status, Work Item, Prototype change, or implementation authorization.
