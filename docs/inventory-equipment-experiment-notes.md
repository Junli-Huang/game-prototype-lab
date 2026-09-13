# Inventory / Equipment Experiment Notes

Status: Design candidates only. These are not yet assigned Experiment IDs and are not implementation requests.

Purpose: preserve the current design direction so the next experiment can be chosen deliberately without folding multiple questions into EXP-003.

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

# Candidate experiment chain

The following ideas should generally be explored in the order **space → access → exposure / risk**, rather than implemented together.

## Candidate A — Body Equipment Slots

### Core idea

Player inventory is no longer only the backpack interior. The body itself provides spatially distinct equipment locations.

Possible locations:

- waist / belt;
- back;
- chest;
- arms / legs;
- backpack exterior attachment points.

Possible item compatibility examples:

- handgun → waist / thigh;
- long gun → back;
- grenade → chest / belt;
- medkit → chest / belt;
- tool → limb / belt / backpack exterior.

### Candidate question

> 当部分物品可以装备到身体槽位、从而不占背包内部空间时，玩家是否会主动区分“随身装备”和“储存 Loot”，并产生有意义的位置选择？

### Important isolation

First version should test only **where items may be stored**.

Do not add combat effectiveness, durability, damage, draw speed, or exposure risk in the same first test.

---

## Candidate B — Spatial / Anatomical Mount Points

### Core idea

Body slots become more spatial and less abstract.

Instead of generic equipment slots, individual regions can have attachment capacity, inspired by games such as *Death Stranding*:

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

> 相比抽象 Equipment Slots，具有明确身体部位与挂载位置的系统，是否会让“物品放在哪里”本身变成有趣且可理解的空间决策？

### Important isolation

This is about **location readability and spatial allocation**, not damage or quick access yet.

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

First version should not yet make exterior items more fragile. Otherwise space benefit and exposure cost become inseparable.

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

These candidates can eventually produce a location model such as:

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

But this diagram is a **design space**, not a system architecture requirement.

Do not build a universal Inventory / Equipment framework from this note.

Each selected experiment should implement only the minimum locations and rules needed to answer its question.

# Current sequencing recommendation

When choosing future experiments, prefer:

```text
1. Does body / external space create useful allocation decisions?
2. Does location affect access in an interesting way?
3. Does external exposure create meaningful risk?
4. Only then test durability / quantity-loss details.
```

Do not jump directly from EXP-003 to a combined system containing body slots + quick access + durability + combat damage.

# Status

All candidates above remain **unselected design notes**.

No official Experiment ID, READY status, Work Item, Prototype, or implementation is created by this document.
