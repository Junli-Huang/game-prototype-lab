# Experiment Backlog — V0.2.3

Experiment 是要验证的问题；Prototype 是回答该问题的可玩实现。这里仅用 Markdown 手工记录候选课题、状态与结论，已有实现与真实试玩结果链接到对应 Prototype README；不把候选机制视为最终设计。

## 方向背景

候选方向：俯视角、Low Poly、固定大地图、多个箱庭区域、探索搜刮、空间背包、怪物战斗、安全区种植修整、持久尸体、时间与周期生态变化。世界基调是后世克苏鲁 + 废土。

这些是探索方向，不是最终设计。当前不采用每局随机地图、固定撤离点或 Raid → Extract → Reset 结构；关注长期探索、世界记忆、区域生态与玩家对地图规律的学习。

## 状态

| 状态 | 含义 |
| --- | --- |
| IDEA | 只有想法，尚未准备实现 |
| READY | 问题已定义清楚，可以开发 |
| BUILDING | 正在实现 |
| TESTING | 已可试玩 |
| INTERESTING | 结果明显有趣 |
| MAYBE | 有潜力，结果不明确 |
| DEAD | 结果不值得继续 |
| PROMOTED | 进入更高层级 Prototype 或正式项目 |

## First READY Pool

首批 READY Candidate Pool：

- EXP-001
- EXP-007
- EXP-008
- EXP-013
- EXP-017
- EXP-018
- EXP-020
- EXP-021

无默认实施顺序。该池记录最初的 8 个候选；当前 EXP-001 为 MAYBE，EXP-007 / EXP-008 的 R2 条件为 TESTING，另 5 项为 READY，其余 39 项为 IDEA；READY 不意味着已经实现，也不代表最终采用倾向。开工前按 [Workflow](workflow.md) 核对实验定义，选择本次要回答的一个问题。

## 实施与对照原则

- Experiment 是独立问题，Prototype 是测试容器。默认可以 1:1；高度相关的竞争实验可以作为独立 Experiment Mode 共享同一测试场景。每次选择一个问题；在实验 Notes 中记录实现目录，在 Prototype README 中记录 Experiment ID。编号各自独立，不要求 EXP-017 对应 Prototype #017。
- 可以复制一个极小基础场景进行对照，保持 Prototype 代码独立；不因此创建共享框架或让实验之间产生代码依赖。
- 竞争方案尽量保持地图、敌人、玩家能力、资源一致，只改变核心变量。EXP-007/008 对照刷新条件；EXP-020/021 对照数值与类型计数，并保持尸体生成条件一致。
- 不同时加入篝火、红月、时段、尸体污染、背包与种田。组合模型 EXP-009、EXP-022 自身也是独立实验，不因单项有趣便直接采用组合。
- 下列 Minimum Scope 是用于隔离变量的最小实施边界，不是最终游戏规则；具体数值可在开工时记录。先完成独立方案的观察，再评估组合的增量价值。
- “永久”默认指当前实验会话内持续存在，不强制跨刷新存档。若实现安全上限，必须明确展示并写入 Notes，不能悄悄覆盖旧尸体后声称验证了永久留存。
- Result 至少记录实际观察、有趣与无聊出现的时机、玩家决策、预期外玩法及是否继续。没有试玩时保留 TBD，禁止将假设写成结论。
- DEAD 是正常结果；核心问题已被否定就记录、停止、进入下一个实验。

生命周期：Idea → Experiment Backlog → Choose One Question → Build Prototype → Play → Record Result → Compare → Kill / Iterate / Promote。

## 课题索引

分类只用于整理候选实验，不代表最终系统结构。

| ID | Name | Category | Status |
| --- | --- | --- | --- |
| EXP-001 | [Spatial Backpack Placement](#exp-001-spatial-backpack-placement) | Inventory | MAYBE |
| EXP-002 | [Backpack Limits Exploration](#exp-002-backpack-limits-exploration) | Inventory | IDEA |
| EXP-003 | [Equipment vs Loot Space](#exp-003-equipment-vs-loot-space) | Inventory | TESTING |
| EXP-004 | [Fixed Map Exploration](#exp-004-fixed-map-exploration) | Exploration | IDEA |
| EXP-005 | [Box-Level Exploration](#exp-005-box-level-exploration) | Exploration | IDEA |
| EXP-006 | [Shortcut Unlocking](#exp-006-shortcut-unlocking) | Exploration | IDEA |
| EXP-007 | [Campfire World Refresh](#exp-007-campfire-world-refresh) | World Refresh | TESTING |
| EXP-008 | [Blood Moon World Refresh](#exp-008-blood-moon-world-refresh) | World Refresh | TESTING |
| EXP-009 | [Campfire + Blood Moon Respawn](#exp-009-campfire--blood-moon-respawn) | World Refresh | IDEA |
| EXP-010 | [Time Respawn](#exp-010-time-respawn) | World Refresh | IDEA |
| EXP-011 | [Permanent Enemy Death](#exp-011-permanent-enemy-death) | World Refresh | IDEA |
| EXP-012 | [Ecological Replacement](#exp-012-ecological-replacement) | World Refresh | IDEA |
| EXP-013 | [Time-Based Enemies](#exp-013-time-based-enemies) | Time / Ecology | READY |
| EXP-014 | [Time-Based Resources](#exp-014-time-based-resources) | Time / Ecology | IDEA |
| EXP-015 | [Time-Based Map Changes](#exp-015-time-based-map-changes) | Time / Ecology | IDEA |
| EXP-016 | [Blood Moon Ecology](#exp-016-blood-moon-ecology) | Time / Ecology | IDEA |
| EXP-017 | [Persistent Player Corpses](#exp-017-persistent-player-corpses) | Corpse | READY |
| EXP-018 | [Persistent Enemy Corpses](#exp-018-persistent-enemy-corpses) | Corpse | READY |
| EXP-019 | [Corpse Loot Container](#exp-019-corpse-loot-container) | Corpse | IDEA |
| EXP-020 | [Corpse Value Accumulation](#exp-020-corpse-value-accumulation) | Corpse | READY |
| EXP-021 | [Corpse Type Count](#exp-021-corpse-type-count) | Corpse | READY |
| EXP-022 | [Corpse Mixed Influence](#exp-022-corpse-mixed-influence) | Corpse | IDEA |
| EXP-023 | [Local Corpse Influence](#exp-023-local-corpse-influence) | Corpse | IDEA |
| EXP-024 | [Area Corpse Influence](#exp-024-area-corpse-influence) | Corpse | IDEA |
| EXP-025 | [Corpse Decay](#exp-025-corpse-decay) | Corpse | IDEA |
| EXP-026 | [Permanent Corpse State](#exp-026-permanent-corpse-state) | Corpse | IDEA |
| EXP-027 | [Corpse Transformation](#exp-027-corpse-transformation) | Corpse | IDEA |
| EXP-028 | [Scavenger Attraction](#exp-028-scavenger-attraction) | Corpse | IDEA |
| EXP-029 | [Corpse Cleanup](#exp-029-corpse-cleanup) | Corpse | IDEA |
| EXP-030 | [Corpse Exploitation](#exp-030-corpse-exploitation) | Corpse | IDEA |
| EXP-031 | [No Resource Loss on Death](#exp-031-no-resource-loss-on-death) | Death | IDEA |
| EXP-032 | [Partial Inventory Loss](#exp-032-partial-inventory-loss) | Death | IDEA |
| EXP-033 | [Full Inventory Loss](#exp-033-full-inventory-loss) | Death | IDEA |
| EXP-034 | [Multiple Recoverable Corpses](#exp-034-multiple-recoverable-corpses) | Death | IDEA |
| EXP-035 | [Visible Enemy Loot](#exp-035-visible-enemy-loot) | Loot | IDEA |
| EXP-036 | [Random Enemy Loot](#exp-036-random-enemy-loot) | Loot | IDEA |
| EXP-037 | [Persistent Enemy Inventory](#exp-037-persistent-enemy-inventory) | Loot | IDEA |
| EXP-038 | [Absolute Safe Zone](#exp-038-absolute-safe-zone) | Safe Zone | IDEA |
| EXP-039 | [Vulnerable Safe Zone](#exp-039-vulnerable-safe-zone) | Safe Zone | IDEA |
| EXP-040 | [Campfire + Main Base](#exp-040-campfire--main-base) | Safe Zone | IDEA |
| EXP-041 | [Main Base Only](#exp-041-main-base-only) | Safe Zone | IDEA |
| EXP-042 | [Basic Farming Loop](#exp-042-basic-farming-loop) | Farming | IDEA |
| EXP-043 | [Farming Supports Exploration](#exp-043-farming-supports-exploration) | Farming | IDEA |
| EXP-044 | [Corpse-Based Farming](#exp-044-corpse-based-farming) | Farming | IDEA |
| EXP-045 | [Resource Knowledge](#exp-045-resource-knowledge) | World Knowledge | IDEA |
| EXP-046 | [Enemy Ecology Knowledge](#exp-046-enemy-ecology-knowledge) | World Knowledge | IDEA |
| EXP-047 | [World Knowledge Over Character Level](#exp-047-world-knowledge-over-character-level) | World Knowledge | IDEA |

# Inventory

## EXP-001 Spatial Backpack Placement

ID: EXP-001

Name: Spatial Backpack Placement

Category: Inventory

Status: MAYBE

### Hypothesis

如果不同物品具有不同尺寸，并且玩家必须在有限二维背包空间中实际摆放、旋转、重新整理和取舍，那么背包管理本身会产生有意义的决策乐趣。首次 Player 反馈见 Result，尚不足以得出明确结论。

### Core Variable

有限二维空间、不同矩形尺寸、自由摆放与旋转。

### Question

当有限背包逐渐被不同尺寸物品占据时，玩家是否会主动重新整理和取舍，并觉得这一过程有趣？

### Minimum Scope

- 6×8 背包、12 种不同尺寸物品、旋转、拖拽与丢弃；固定同一批物品供反复整理。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

MAYBE — 2026-09-10 首次 Player 试玩：“还可以，有点意思。”当前证据为轻度正向，不足以判断为 INTERESTING。

- Observed（实际观察）：收到轻度正向评价，暂未记录具体整理或取舍行为
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：保留 MAYBE，暂停 #001 功能扩展，继续独立实验

### Notes

- Prototype：[001_spatial_backpack](../prototypes/001_spatial_backpack/README.md)，已完成首次 Player 试玩，保留 MAYBE。
- 试玩日期、条件、参数与对照版本：2026-09-10，项目所有者试玩当时线上 #001；具体反馈见其 README。
- 其他观察：TBD

## EXP-002 Backpack Limits Exploration

ID: EXP-002

Name: Backpack Limits Exploration

Category: Inventory

Status: IDEA

### Hypothesis

候选假设（尚未验证）：背包容量作为探索半径限制。

待验证的体验预期：不设置撤离点的情况下，有限容量可能会自然推动玩家返回。

### Core Variable

背包容量作为探索半径限制。

### Question

不设置撤离点的情况下，有限容量是否会自然推动玩家返回。

### Minimum Scope

- 固定短路线、一个基地与三处资源点；只改变容量，记录返回时机。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-003 Equipment vs Loot Space

ID: EXP-003

Name: Equipment vs Loot Space

Category: Inventory

Status: TESTING

### Hypothesis

候选假设（尚未验证）：出门装备和战利品使用同一个背包空间。

待验证的体验预期：“准备更多”与“留更多空间带东西回来”之间可能能形成取舍。

### Core Variable

出门装备和战利品使用同一个背包空间。

### Question

“准备更多”与“留更多空间带东西回来”之间是否能形成取舍。

### Minimum Scope

- 固定背包和路线；两套不同占格的出门装备、同一批战利品。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

Untested — 技术验收完成后等待 Player 先 Light、后 Heavy 对照试玩；不预填玩法结论。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：[Backpack Lab / Equipment vs Loot Mode](../prototypes/001_spatial_backpack/README.md)，2026-09-11 IDEA → BUILDING → TESTING。
- 固定条件：两个 Loadout 使用同一七件 Loot 序列、尺寸、Value 与操作；只改变开局 Locked Equipment 3 / 48 与 11 / 48。
- Ready SVG、完整参数和技术验收见 Prototype README。EXP-001 的 MAYBE 与原始 Player 反馈保持不变。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

# Exploration

## EXP-004 Fixed Map Exploration

ID: EXP-004

Name: Fixed Map Exploration

Category: Exploration

Status: IDEA

### Hypothesis

候选假设（尚未验证）：固定地图重复探索。

待验证的体验预期：地图不随机的情况下，路线记忆和地点熟悉可能本身具有成长感。

### Core Variable

固定地图重复探索。

### Question

地图不随机的情况下，路线记忆和地点熟悉是否本身具有成长感。

### Minimum Scope

- 一张固定小地图、三个目标点；重复探索三次，记录路线选择。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-005 Box-Level Exploration

ID: EXP-005

Name: Box-Level Exploration

Category: Exploration

Status: IDEA

### Hypothesis

候选假设（尚未验证）：多个高密度箱庭区域互相连接。

待验证的体验预期：箱庭设计可能比大面积开放地图更容易产生持续探索欲。

### Core Variable

多个高密度箱庭区域互相连接。

### Question

箱庭设计是否比大面积开放地图更容易产生持续探索欲。

### Minimum Scope

- 相同目标与资源数量的两张小图：连接箱庭与疏散开放布局；比较继续探索意愿。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-006 Shortcut Unlocking

ID: EXP-006

Name: Shortcut Unlocking

Category: Exploration

Status: IDEA

### Hypothesis

候选假设（尚未验证）：捷径解锁。

例如：

```text
门
梯子
桥
电梯
地下通道

```

待验证的体验预期：“这里居然通回来了”可能能形成强探索反馈。

### Core Variable

捷径解锁。

### Question

“这里居然通回来了”是否能形成强探索反馈。

### Minimum Scope

- 一条环形路线和一扇单向解锁门；比较解锁前后往返体验。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

# World Refresh

## EXP-007 Campfire World Refresh

ID: EXP-007

Name: Campfire World Refresh

Category: World Refresh

Status: TESTING

### Hypothesis

如果篝火恢复生命，同时让已击败敌人重新出现，那么恢复资源与已清理进度之间会形成取舍，使休息成为有意义的决策。正式试玩反馈为中性，尚不足以支持或否定该假设。

规则：

```text
休息
→ 玩家恢复
→ 敌人刷新

```

待验证的体验预期：恢复和敌人重生绑定后，可能会产生“现在要不要休息”的决策。

### Core Variable

使用篝火 = 玩家恢复 + 全部敌人恢复出生位置、生命与存活状态。

### Question

玩家受伤后是否会权衡剩余生命、已清理敌人和接下来的路线，再决定是否使用篝火？

### Minimum Scope

- 一个 V2 Low Poly 小场景、四个固定同种敌人、简单移动/攻击/受击、篝火和终点；休息恢复生命并重置全部敌人。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

R2 Result: Untested — World Refresh Profile R2 等待 Player 对照试玩；技术验收不构成玩法结论。

R1 历史 Result（保留）：

MAYBE — 2026-09-11 Player 正式试玩。

整体反馈：
> “没有好坏的感受，就一般。”

当前没有形成明显正向或负向体验信号，不足以证明 Campfire Respawn 本身产生明显的决策乐趣，但也没有得到明确否定。

- Observed：Player 完成实际试玩，整体体验中性，没有明显觉得好，也没有明显觉得不好。
- Interesting Moment：本次未报告明确的有趣时刻。
- Boring Moment：本次未报告明确的负面或无聊时刻。
- Decisions：本次没有记录足够具体的决策行为，不补充推测。
- Unexpected：本次未记录。
- Next：停止继续调整 EXP-007，保留 MAYBE；后续与其他 Enemy Respawn 规则进行受控比较。

### Notes

- Prototype：[Enemy Respawn Lab](../prototypes/002_campfire_respawn/README.md)，2026-09-10 READY → BUILDING → TESTING；已完成规则、构建与 Pages 兼容画面操作验收。WebGL 阴影画面未在远程环境实测，详见 Prototype README。
- 2026-09-11 验收修正：三段岩壁窄道 + 活敌实体阻挡；死亡改为 Trial Failed，只有 Restart 重试。战斗与 Rest 数值不变，当时保持 TESTING / Untested（技术验收历史）。
- 2026-09-11 Player 正式试玩当前线上修正版：TESTING → MAYBE。停止调整 EXP-007，保留当前可玩版本；固定条件与参数见 Prototype README。
- 2026-09-11 World Refresh Profile R2：MAYBE → TESTING。R1 的 MAYBE 与原始反馈不覆盖；R2 与 EXP-008 使用同一 ON / ON Profile，仅 Rest 触发不同，Result: Untested。
- 其他观察：TBD

## EXP-008 Blood Moon World Refresh

ID: EXP-008

Name: Blood Moon World Refresh

Category: World Refresh

Status: TESTING

### Hypothesis

如果敌人不是由玩家 Rest 主动刷新，而是在一个明确预告的全局 Blood Moon 周期中统一刷新，那么玩家可能会围绕世界周期调整推进、返回和战斗时机，从而形成比 Campfire Respawn 更明显的行动节奏。

### Core Variable

30 秒全局 Blood Moon 周期结束时统一重置全部敌人；Rest 只恢复玩家生命，不改变敌人或倒计时。

### Question

一个明确可预期的全局 Blood Moon 周期，是否会让玩家产生“赶在刷新前做什么 / 什么时候行动”的节奏感？

### Minimum Scope

- 复用 #002 与 EXP-007 相同地图、玩家、敌人、战斗、终点、Trial Failed 与 Restart 条件。
- Blood Moon Mode、简单 Mode Selector、30 秒可见全局周期、最后 10 秒警告、同步敌人重置与 heal-only Rest。
- 直接加载 `prototypes/002_campfire_respawn/assets/blood_moon.gltf` 作为事件视觉锚点。

### Non-goals

- 不制作昼夜、日历、真实月相、随机时间、敌人 Buff / 特殊敌人 / Loot、天气、生态、Boss、音乐或通用世界事件系统。
- 不实现 EXP-009、EXP-010、EXP-016，不建立 AssetManager、Mode Framework 或 Rule Engine。

### Result

R2 Result: Untested — 技术验收完成后等待 Player 与 EXP-007 使用相同 Refresh Profile 对照试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：[Enemy Respawn Lab / Blood Moon Mode](../prototypes/002_campfire_respawn/README.md)。2026-09-11 READY → BUILDING → TESTING。
- 对照基线：同容器 EXP-007 Campfire Respawn — MAYBE；只改变敌人刷新触发。
- World Refresh Profile R2：Enemies / Common Resources 默认 ON；与 EXP-007 完全共享刷新内容，只保留 Blood Moon Trigger 差异。未填写 Player 结论。
- 技术条件与验收记录见 Prototype README；规则断言、构建、GitHub Actions / Pages 及 SVG 兼容画面操作通过。WebGL GPU 画面待 Player 桌面浏览器确认；玩法结论保持 Untested。

## EXP-009 Campfire + Blood Moon Respawn

ID: EXP-009

Name: Campfire + Blood Moon Respawn

Category: World Refresh

Status: IDEA

### Hypothesis

候选假设（尚未验证）：双层刷新机制。

例如：

```text
普通怪：
篝火刷新

特殊怪：
红月刷新

```

待验证的体验预期：两套刷新节奏可能能产生更丰富的世界行为，还是只是增加复杂度。

### Core Variable

双层刷新机制。

### Question

两套刷新节奏是否能产生更丰富的世界行为，还是只是增加复杂度。

### Minimum Scope

- 同一测试场景分普通怪和特殊怪；普通怪随休息刷新，特殊怪随周期刷新。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-010 Time Respawn

ID: EXP-010

Name: Time Respawn

Category: World Refresh

Status: IDEA

### Hypothesis

候选假设（尚未验证）：按游戏时间刷新。

待验证的体验预期：自然时间流逝触发 Respawn 可能比显式刷新节点更符合世界感。

### Core Variable

按游戏时间刷新。

### Question

自然时间流逝触发 Respawn 是否比显式刷新节点更符合世界感。

### Minimum Scope

- 同一测试场景；敌人死亡后经过固定游戏时间刷新。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-011 Permanent Enemy Death

ID: EXP-011

Name: Permanent Enemy Death

Category: World Refresh

Status: IDEA

### Hypothesis

候选假设（尚未验证）：敌人死亡后永久死亡。

待验证的体验预期：世界被玩家逐渐清理可能有趣，以及是否会快速造成内容枯竭。

### Core Variable

敌人死亡后永久死亡。

### Question

世界被玩家逐渐清理是否有趣，以及是否会快速造成内容枯竭。

### Minimum Scope

- 同一测试场景；敌人击败后在本次实验存档内不再出现，重复走访。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-012 Ecological Replacement

ID: EXP-012

Name: Ecological Replacement

Category: World Refresh

Status: IDEA

### Hypothesis

候选假设（尚未验证）：敌人不会直接“复活”。

而是：

```text
迁入
繁殖
占领
生成新的生态角色

```

待验证的体验预期：生态补充可能比传统 Respawn 更有世界连续性。

### Core Variable

敌人不会直接“复活”。

### Question

生态补充是否比传统 Respawn 更有世界连续性。

### Minimum Scope

- 两个相连区域；只实现邻区新个体迁入空缺位置这一种补充方式。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

# Time / Ecology

## EXP-013 Time-Based Enemies

ID: EXP-013

Name: Time-Based Enemies

Category: Time / Ecology

Status: READY

### Hypothesis

候选假设（尚未验证）：不同时段出现不同敌人。

待验证的体验预期：玩家可能会主动选择时间进入区域。

### Core Variable

不同时段出现不同敌人。

### Question

玩家是否会主动选择时间进入区域。

### Minimum Scope

- 一张小图、两个时段、两种敌人；地点和奖励固定，可等待切换时段。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-014 Time-Based Resources

ID: EXP-014

Name: Time-Based Resources

Category: Time / Ecology

Status: IDEA

### Hypothesis

候选假设（尚未验证）：不同时段出现不同资源。

待验证的体验预期：玩家可能会逐渐形成“什么时间去哪里”的知识。

### Core Variable

不同时段出现不同资源。

### Question

玩家是否会逐渐形成“什么时间去哪里”的知识。

### Minimum Scope

- 一张小图、两个时段、两类资源；敌人和通路固定。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-015 Time-Based Map Changes

ID: EXP-015

Name: Time-Based Map Changes

Category: Time / Ecology

Status: IDEA

### Hypothesis

候选假设（尚未验证）：时间改变地图可达性。

例如：

```text
夜晚开放某条路
白天关闭某区域
特殊时间出现入口

```

待验证的体验预期：固定地图可能能通过时间变化获得重新探索价值。

### Core Variable

时间改变地图可达性。

### Question

固定地图是否能通过时间变化获得重新探索价值。

### Minimum Scope

- 一张固定小图、两个时段、一条按时段开闭的通路；其他内容固定。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-016 Blood Moon Ecology

ID: EXP-016

Name: Blood Moon Ecology

Category: Time / Ecology

Status: IDEA

### Hypothesis

候选假设（尚未验证）：红月不只刷新敌人，而是改变生态。

例如：

```text
特殊怪出现
特殊植物出现
异常区域扩大
资源结构变化

```

待验证的体验预期：红月可能能成为真正的世界状态变化，而不是 Reset Timer。

### Core Variable

红月不只刷新敌人，而是改变生态。

### Question

红月是否能成为真正的世界状态变化，而不是 Reset Timer。

### Minimum Scope

- 普通与红月两种状态；只改变一种特殊植物的出现，敌人刷新规则固定。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

# Corpse

## EXP-017 Persistent Player Corpses

ID: EXP-017

Name: Persistent Player Corpses

Category: Corpse

Status: READY

### Hypothesis

候选假设（尚未验证）：玩家每次死亡都会留下尸体。

规则：

```text
新的玩家尸体不会覆盖旧尸体

```

待验证的体验预期：多次死亡痕迹永久存在可能会增强世界记忆和空间记忆。

### Core Variable

玩家每次死亡都会留下尸体。

### Question

多次死亡痕迹永久存在是否会增强世界记忆和空间记忆。

### Minimum Scope

- 一张小图、复活点和主动死亡入口；每次死亡留标记，新尸体不覆盖旧尸体。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-018 Persistent Enemy Corpses

ID: EXP-018

Name: Persistent Enemy Corpses

Category: Corpse

Status: READY

### Hypothesis

候选假设（尚未验证）：敌人死亡后尸体持续存在。

待验证的体验预期：战斗可能能永久留下有意义的世界痕迹。

### Core Variable

敌人死亡后尸体持续存在。

### Question

战斗是否能永久留下有意义的世界痕迹。

### Minimum Scope

- 一张小图和固定敌人；击败后保留尸体，往返观察战斗痕迹。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-019 Corpse Loot Container

ID: EXP-019

Name: Corpse Loot Container

Category: Corpse

Status: IDEA

### Hypothesis

候选假设（尚未验证）：敌人死亡后不直接爆装备。

物品保留在尸体内，由玩家主动搜索。

待验证的体验预期：尸体搜刮可能比直接掉落更有“搜东西”的感觉。

### Core Variable

敌人死亡后不直接爆装备。

### Question

尸体搜刮是否比直接掉落更有“搜东西”的感觉。

### Minimum Scope

- 同一批敌人与奖励；比较主动打开尸体搜刮和地面直接拾取。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-020 Corpse Value Accumulation

ID: EXP-020

Name: Corpse Value Accumulation

Category: Corpse

Status: READY

### Hypothesis

候选假设（尚未验证）：尸体携带环境影响参数。

例如：

```text
Decay
Anomaly
Nutrient

```

区域按数值积累。

待验证的体验预期：连续数值积累能否产生可感知的环境变化。

### Core Variable

尸体携带环境影响参数。

### Question

连续数值积累能否产生可感知的环境变化。

### Minimum Scope

- 固定尸体生成条件；单一 Anomaly 数值相加，区域达到阈值出现可见变化。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-021 Corpse Type Count

ID: EXP-021

Name: Corpse Type Count

Category: Corpse

Status: READY

### Hypothesis

候选假设（尚未验证）：按尸体类型和数量触发规则。

例如：

```text
Human >= 5
Player >= 2
Mutant >= 3

```

待验证的体验预期：类型数量规则可能更容易被玩家理解和主动利用。

### Core Variable

按尸体类型和数量触发规则。

### Question

类型数量规则是否更容易被玩家理解和主动利用。

### Minimum Scope

- 与 EXP-020 相同地图和生成条件；按尸体类型计数达到阈值触发同一变化。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-022 Corpse Mixed Influence

ID: EXP-022

Name: Corpse Mixed Influence

Category: Corpse

Status: IDEA

### Hypothesis

候选假设（尚未验证）：同时使用：

```text
数值积累
+
类型数量

```

待验证的体验预期：混合模型可能值得增加复杂度。

### Core Variable

同时使用：

### Question

混合模型是否值得增加复杂度。

### Minimum Scope

- 沿用 EXP-020/021 场景；同时启用数值与类型门槛，与单模型对照。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-023 Local Corpse Influence

ID: EXP-023

Name: Local Corpse Influence

Category: Corpse

Status: IDEA

### Hypothesis

候选假设（尚未验证）：尸体只影响周围局部半径。

待验证的体验预期：局部影响可能更容易形成因果认知。

### Core Variable

尸体只影响周围局部半径。

### Question

局部影响是否更容易形成因果认知。

### Minimum Scope

- 固定尸体与影响规则；只在尸体周围固定半径内生效。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-024 Area Corpse Influence

ID: EXP-024

Name: Area Corpse Influence

Category: Corpse

Status: IDEA

### Hypothesis

候选假设（尚未验证）：尸体直接影响整个箱庭区域。

待验证的体验预期：区域统计可能比精确空间计算更清晰、更易玩。

### Core Variable

尸体直接影响整个箱庭区域。

### Question

区域统计是否比精确空间计算更清晰、更易玩。

### Minimum Scope

- 与 EXP-023 相同地图和规则；只将作用范围改为整个区域。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-025 Corpse Decay

ID: EXP-025

Name: Corpse Decay

Category: Corpse

Status: IDEA

### Hypothesis

候选假设（尚未验证）：尸体随时间变化。

例如：

```text
Fresh
→ Decaying
→ Rotten
→ Remains

```

待验证的体验预期：尸体时间状态可能能形成“什么时候处理”的决策。

### Core Variable

尸体随时间变化。

### Question

尸体时间状态是否能形成“什么时候处理”的决策。

### Minimum Scope

- 少量固定尸体；Fresh、Decaying、Rotten、Remains 四阶段，固定时长及一个处理收益。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-026 Permanent Corpse State

ID: EXP-026

Name: Permanent Corpse State

Category: Corpse

Status: IDEA

### Hypothesis

候选假设（尚未验证）：尸体不会自然变化。

待验证的体验预期：最简单的持久尸体可能已经足够形成玩法。

### Core Variable

尸体不会自然变化。

### Question

最简单的持久尸体是否已经足够形成玩法。

### Minimum Scope

- 与 EXP-025 相同基础场景；尸体状态不随时间变化。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-027 Corpse Transformation

ID: EXP-027

Name: Corpse Transformation

Category: Corpse

Status: IDEA

### Hypothesis

候选假设（尚未验证）：尸体最终转化成：

```text
菌床
植物
巢穴
怪物
异常物

```

待验证的体验预期：尸体进入生态循环后可能能产生有趣结果。

### Core Variable

尸体最终转化成：

### Question

尸体进入生态循环后是否能产生有趣结果。

### Minimum Scope

- 固定尸体与计时；只实现尸体转为菌床这一种转化。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-028 Scavenger Attraction

ID: EXP-028

Name: Scavenger Attraction

Category: Corpse

Status: IDEA

### Hypothesis

候选假设（尚未验证）：尸体只承担生态诱饵功能。

例如吸引：

```text
食腐动物
怪物
昆虫

```

待验证的体验预期：简单的实体交互可能已经能够产生自然生态变化。

### Core Variable

尸体只承担生态诱饵功能。

### Question

简单的实体交互是否已经能够产生自然生态变化。

### Minimum Scope

- 一张小图、一种尸体、一种食腐动物；接近尸体并停留觅食。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-029 Corpse Cleanup

ID: EXP-029

Name: Corpse Cleanup

Category: Corpse

Status: IDEA

### Hypothesis

候选假设（尚未验证）：玩家可以处理尸体。

候选行为：

```text
拖走
焚烧
掩埋
分解

```

待验证的体验预期：主动处理尸体能否成为决策，而不是重复劳动。

### Core Variable

玩家可以处理尸体。

### Question

主动处理尸体能否成为决策，而不是重复劳动。

### Minimum Scope

- 固定尸体负面影响；只提供拖离区域一种处理动作，记录处理时机。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-030 Corpse Exploitation

ID: EXP-030

Name: Corpse Exploitation

Category: Corpse

Status: IDEA

### Hypothesis

候选假设（尚未验证）：玩家可以主动利用尸体。

例如：

```text
制造诱饵
制造污染
培养特殊植物
诱导特殊怪物

```

待验证的体验预期：玩家可能会把“死亡痕迹”主动转化为工具。

### Core Variable

玩家可以主动利用尸体。

### Question

玩家是否会把“死亡痕迹”主动转化为工具。

### Minimum Scope

- 固定诱饵规则；允许将尸体拖到指定位置吸引怪物，观察主动利用。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

# Death

## EXP-031 No Resource Loss on Death

ID: EXP-031

Name: No Resource Loss on Death

Category: Death

Status: IDEA

### Hypothesis

候选假设（尚未验证）：死亡不掉资源。

只留下：

```text
尸体
世界影响

```

待验证的体验预期：世界变化本身可能已经足以构成死亡代价。

### Core Variable

死亡不掉资源。

### Question

世界变化本身是否已经足以构成死亡代价。

### Minimum Scope

- 固定死亡复活与尸体环境影响；资源完全保留，重复探索。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-032 Partial Inventory Loss

ID: EXP-032

Name: Partial Inventory Loss

Category: Death

Status: IDEA

### Hypothesis

候选假设（尚未验证）：死亡后部分物品进入玩家尸体。

待验证的体验预期：部分损失可能可以制造紧张感，同时避免过度挫败。

### Core Variable

死亡后部分物品进入玩家尸体。

### Question

部分损失是否可以制造紧张感，同时避免过度挫败。

### Minimum Scope

- 相同死亡场景；固定一半背包物品进入对应尸体，可返回回收。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-033 Full Inventory Loss

ID: EXP-033

Name: Full Inventory Loss

Category: Death

Status: IDEA

### Hypothesis

候选假设（尚未验证）：死亡后全部背包物品进入尸体。

待验证的体验预期：高风险死亡规则可能增强探索张力。

### Core Variable

死亡后全部背包物品进入尸体。

### Question

高风险死亡规则是否增强探索张力。

### Minimum Scope

- 与 EXP-032 相同场景；全部背包物品进入对应尸体，可返回回收。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-034 Multiple Recoverable Corpses

ID: EXP-034

Name: Multiple Recoverable Corpses

Category: Death

Status: IDEA

### Hypothesis

候选假设（尚未验证）：所有历史玩家尸体都可以回收。

再次死亡不会让旧尸体消失。

待验证的体验预期：多目标“捡尸路线”可能能产生新的探索规划。

### Core Variable

所有历史玩家尸体都可以回收。

### Question

多目标“捡尸路线”是否能产生新的探索规划。

### Minimum Scope

- 一张含多条路线的小图；多次死亡各自产生可回收物资，旧尸体不被覆盖。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

# Loot

## EXP-035 Visible Enemy Loot

ID: EXP-035

Name: Visible Enemy Loot

Category: Loot

Status: IDEA

### Hypothesis

候选假设（尚未验证）：玩家在敌人活着时就能观察它携带的部分物品。

待验证的体验预期：玩家可能会因为看到目标战利品而主动决定是否战斗。

### Core Variable

玩家在敌人活着时就能观察它携带的部分物品。

### Question

玩家是否会因为看到目标战利品而主动决定是否战斗。

### Minimum Scope

- 固定敌人与携带物品；交战前显示部分战利品，记录选敌行为。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-036 Random Enemy Loot

ID: EXP-036

Name: Random Enemy Loot

Category: Loot

Status: IDEA

### Hypothesis

候选假设（尚未验证）：敌人死亡后随机生成物品。

待验证的体验预期：传统随机掉落可能已经足够满足当前搜刮体验。

### Core Variable

敌人死亡后随机生成物品。

### Question

传统随机掉落是否已经足够满足当前搜刮体验。

### Minimum Scope

- 与 EXP-035 相同敌人与奖励分布；奖励在死亡时抽取，战前不显示。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-037 Persistent Enemy Inventory

ID: EXP-037

Name: Persistent Enemy Inventory

Category: Loot

Status: IDEA

### Hypothesis

候选假设（尚未验证）：敌人本身持有真实 Inventory。

死亡只是让 Inventory 转移到尸体。

待验证的体验预期：实体真实携带物品可能值得其复杂度。

### Core Variable

敌人本身持有真实 Inventory。

### Question

实体真实携带物品是否值得其复杂度。

### Minimum Scope

- 固定敌人、实际携带列表、一次拾取物品行为；死亡后原样转入尸体。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

# Safe Zone

## EXP-038 Absolute Safe Zone

ID: EXP-038

Name: Absolute Safe Zone

Category: Safe Zone

Status: IDEA

### Hypothesis

候选假设（尚未验证）：主基地完全安全。

待验证的体验预期：明确的安全空间可能能形成探索与休整节奏。

### Core Variable

主基地完全安全。

### Question

明确的安全空间是否能形成探索与休整节奏。

### Minimum Scope

- 一条探索路线和基地；基地恢复整理且完全免受敌人影响。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-039 Vulnerable Safe Zone

ID: EXP-039

Name: Vulnerable Safe Zone

Category: Safe Zone

Status: IDEA

### Hypothesis

候选假设（尚未验证）：基地可能受到：

```text
红月
污染
怪物
异常生态

```

影响。

待验证的体验预期：基地进入风险系统后可能更有张力，还是破坏休息感。

### Core Variable

基地可能受到：

### Question

基地进入风险系统后是否更有张力，还是破坏休息感。

### Minimum Scope

- 与 EXP-038 相同条件；只增加一个可预告的怪物侵袭事件。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-040 Campfire + Main Base

ID: EXP-040

Name: Campfire + Main Base

Category: Safe Zone

Status: IDEA

### Hypothesis

候选假设（尚未验证）：两级安全结构。

例如：

```text
篝火：
恢复
整理
轻补给

主基地：
仓库
种植
长期经营

```

待验证的体验预期：两级安全节点可能都有清晰价值。

### Core Variable

两级安全结构。

### Question

两级安全节点是否都有清晰价值。

### Minimum Scope

- 一条路线、一个中途篝火和基地；篝火恢复轻补给，基地仓储长期种植。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-041 Main Base Only

ID: EXP-041

Name: Main Base Only

Category: Safe Zone

Status: IDEA

### Hypothesis

候选假设（尚未验证）：完全取消地图篝火。

玩家只能依赖主基地。

待验证的体验预期：更大的探索跨度可能能加强准备、路线和背包决策。

### Core Variable

完全取消地图篝火。

### Question

更大的探索跨度是否能加强准备、路线和背包决策。

### Minimum Scope

- 与 EXP-040 相同地图及基地；移除中途篝火服务。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

# Farming

## EXP-042 Basic Farming Loop

ID: EXP-042

Name: Basic Farming Loop

Category: Farming

Status: IDEA

### Hypothesis

候选假设（尚未验证）：探索获得种子。

基地：

```text
种植
→ 收获

```

待验证的体验预期：最基础的种植行为可能值得保留。

### Core Variable

探索获得种子。

### Question

最基础的种植行为是否值得保留。

### Minimum Scope

- 探索点获得一种种子；基地两个种植格，种下、等待、收获。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-043 Farming Supports Exploration

ID: EXP-043

Name: Farming Supports Exploration

Category: Farming

Status: IDEA

### Hypothesis

候选假设（尚未验证）：种植物主要提供：

```text
食物
药品
诱饵
特殊探索资源

```

待验证的体验预期：Farming 能否成为 Preparation，而不是独立小游戏。

### Core Variable

种植物主要提供：

### Question

Farming 能否成为 Preparation，而不是独立小游戏。

### Minimum Scope

- 与 EXP-042 相同种植过程；产出一种探索消耗品并在路线中使用。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-044 Corpse-Based Farming

ID: EXP-044

Name: Corpse-Based Farming

Category: Farming

Status: IDEA

### Hypothesis

候选假设（尚未验证）：使用：

```text
尸体
怪物组织
腐化物
异常材料

```

影响种植。

待验证的体验预期：尸体生态可能能与基地长期循环连接起来。

### Core Variable

使用：

### Question

尸体生态是否能与基地长期循环连接起来。

### Minimum Scope

- 同一基础种植过程；只用一种尸体材料改变一种收获结果。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

# World Knowledge

## EXP-045 Resource Knowledge

ID: EXP-045

Name: Resource Knowledge

Category: World Knowledge

Status: IDEA

### Hypothesis

候选假设（尚未验证）：固定资源点和时间规律可以被学习。

待验证的体验预期：玩家知识本身可能能成为成长方式。

### Core Variable

固定资源点和时间规律可以被学习。

### Question

玩家知识本身是否能成为成长方式。

### Minimum Scope

- 固定资源点与两个时段；多次采集，记录是否记住最佳采集路线。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-046 Enemy Ecology Knowledge

ID: EXP-046

Name: Enemy Ecology Knowledge

Category: World Knowledge

Status: IDEA

### Hypothesis

候选假设（尚未验证）：玩家逐渐学习：

```text
什么怪出现在哪里
什么时候出现
被什么吸引
害怕什么
尸体会引来什么

```

待验证的体验预期：生态知识可能能形成长期掌握感。

### Core Variable

玩家逐渐学习：

### Question

生态知识是否能形成长期掌握感。

### Minimum Scope

- 一张小图、一种敌人及一条吸引规律；重复遭遇观察是否主动利用知识。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD

## EXP-047 World Knowledge Over Character Level

ID: EXP-047

Name: World Knowledge Over Character Level

Category: World Knowledge

Status: IDEA

### Hypothesis

候选假设（尚未验证）：弱化等级成长。

强调：

```text
地图知识
生态知识
资源知识
时间知识
装备准备

```

待验证的体验预期：“玩家越来越懂世界”可能可以替代传统等级带来的成长体验。

### Core Variable

弱化等级成长。

### Question

“玩家越来越懂世界”是否可以替代传统等级带来的成长体验。

### Minimum Scope

- 固定角色数值与小地图；保留少量可学习的地图、资源、生态规律，重复挑战。
- 只提供验证此问题所需的操作与可读反馈；固定其他条件。

### Non-goals

- 不制作完整游戏、美术包装、完整装备属性、制作或存档系统。
- 不引入 Minimum Scope 之外的其他实验机制；必要的场景条件保持固定，不作为本实验结论。

### Result

TBD — 尚未试玩。

- Observed（实际观察）：TBD
- 有趣开始的时机：TBD
- 无聊开始的时机：TBD
- 玩家产生的决策：TBD
- Unexpected（预期外玩法）：TBD
- Next（是否继续，Kill / Iterate / Promote）：TBD

### Notes

- Prototype：尚无实现。
- 试玩日期、条件、参数与对照版本：TBD
- 其他观察：TBD
