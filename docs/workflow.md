# Experiment Workflow & Handoff — V0.2.1

本仓库用最小可玩实验回答玩法问题。Game Prototype 不等于 Game Tech Prototype；Experiment 不等于 Final Design。本文是实验执行与交接规范，不是完整游戏设计文档。全部状态和记录用 Markdown 手工维护。

## 1. 新 Work / Chat 从这里开始

开始开发前按顺序阅读：

1. [README](../README.md)：项目定位、启动、构建和部署。
2. [Philosophy](philosophy.md)：实验原则和禁止事项。
3. 本 Workflow：执行、完成和交接方式。
4. [Experiment Backlog](experiment-backlog.md)：候选问题与已有结果。
5. 当前 Experiment 条目，以及已有 Prototype 的 README。

开工前明确当前 Experiment ID、Question、Core Variable、Minimum Scope、Non-goals、Status，并读取已有 Result / Notes。READY 是候选池，无默认实施顺序，也不自动授权把池内所有实验开发完。

用户说“继续这个 Prototype”时，沿着其 README 和关联 Experiment 继续当前问题，不重新设计整个游戏。若没有指定实验且无法从当前记录确定，先明确要做哪一个问题。新玩法想法先判断是当前实验必需修改，还是新 Experiment；后者优先进入 Backlog。

## 2. 角色职责

| 角色 | 负责 | 不自行决定或追求 |
| --- | --- | --- |
| Designer | 课题、可否定的 Hypothesis、变量控制、Minimum Scope、Non-goals、结果分析、下一步实验 | 为完整性增加系统、提前确定最终规则、要求产品化 |
| Work / Developer | 最小可玩实现、变量可观察、基本操作、阻碍实验的 Bug、对应文档、build / Pages 可运行 | 最终设计、新玩法系统、扩大范围、通用框架、合并多个实验 |
| Player / Evaluator | 默认由项目所有者试玩；记录操作意愿、好奇心、决策、有趣与无聊时机、意外行为 | 用功能数量、画面完整度或架构漂亮程度替代体验评价 |

## 3. 从 IDEA 到 BUILDING

IDEA 表示候选想法。Designer 将问题和最小边界定义清楚后可标 READY；选择本次要做的一项后，核对下列六项再进入 BUILDING：

- Experiment ID。
- Hypothesis。
- Question。
- Core Variable。
- Minimum Scope。
- Non-goals。

缺项或含义不清时先补清当前问题，不开始玩法代码，也不要求完整策划案。历史 READY 标签不能代替开工检查。

Hypothesis 描述“如果采用某规则，预期产生某种玩家体验”，且可以被试玩否定。例如：“如果玩家需要在有限二维空间中摆放不同尺寸物品，那么整理与取舍本身会产生有意义的决策乐趣。”仅写“实现空间背包”不够。

Question 原则上只有一个，例如“玩家是否会因为有限空间而主动重新整理背包？”如果同时问背包、战斗、掉落和装备组合是否好玩，优先拆分实验。

## 4. 实现范围与开发原则

Minimum Scope 只包含回答 Question 必需的内容。空间背包可以只做 6×8 格子、不同尺寸物品、拖拽、旋转和丢弃；无需角色移动、战斗、地图、成长、商店或存档。

每个 Prototype README 必须明确 Non-goals，例如不做完整 Inventory System、装备属性、角色成长、存档、美术资产系统。它用于防止范围扩大，不用于规划未来系统。

最小实现、可玩、可观察优先。允许写死参数、重复代码和临时代码；技术债可以接受。不要为了以后方便扩展接口、引入复杂配置或抽象 shared / engine / framework。

类似的移动、敌人、地图和 HUD 可以直接复制，保持各 Prototype 独立。重复两次本身不是抽取理由；只有重复明显阻碍实验速度时才讨论复用。

确实缺少某项功能导致当前实验无法进行时，Work 可以补充最小必要实现，并在 Notes 记录原因和边界。它必须服务当前 Question，不借机新增玩法问题。

### 最低可用表现层

Work 不应默认 Debug 图形一定足够，也不应默认必须制作正式动画。依据 Experiment Question 选择足以支持体验判断的最低成本表现，并在 Prototype README 的 Visual Fidelity 记录 Level、Reason、Required Feedback。

| Level | 参考表现方式 |
| --- | --- |
| V0 — Abstract | 程序绘图、几何图形、Debug UI |
| V1 — Representative | 简单图片、图标、基础音效、程序化动作 |
| V2 — Spatial | Low Poly 3D、基础灯光、简单空间表现 |

这只是开发判断参考，不是版本升级路线、质量评分或正式系统配置。按问题选择，不默认追求 V2；所选层级也不意味着必须使用该行的所有资源。空间、辨识、动作、氛围或声音影响判断时，把必要反馈纳入 Minimum Scope，做到足够判断即停止。

角色和交互对象可使用 [Toy / Board-game Motion](philosophy.md#toy--board-game-motion)：摇摆移动、停止回正、攻击轻碰、受击后仰、死亡倒下。无需默认制作序列帧或完整骨骼动画；实验确实研究真实动画质量时再提高精度。

不为这些表现预建动画、角色控制、Tween、VFX、Low Poly 渲染或美术资源管理框架。

## 5. 竞争方案与组合实验

竞争方案尽量保持地图、怪物、角色能力、资源和操作一致，只改变 Core Variable。例如篝火与红月刷新对照刷新条件，尸体数值与类型计数对照影响模型。记录不能保持一致的条件及其对结论的限制。

A 和 B 都是 INTERESTING，不代表 A + B 是最终方案。组合必须作为独立 Experiment 试玩，例如 EXP-007、EXP-008 与 EXP-009。已有组合条目可以沿用，不重复创建同一课题。

## 6. 遇到额外设计问题

先记录问题，再用最简单固定方案维持当前实验，必要时将新问题作为 Candidate Experiment 加入 Backlog，状态为 IDEA。

例如尸体腐烂时间与永久存在的选择，在当前不研究腐烂时可以固定一种条件；在 Notes 写明临时取值、理由及影响。临时条件不等于最终游戏规则，也不能抵触当前 Question 或 Non-goals。若没有任何固定选择能使当前实验成立，先补清实验定义再继续。

新问题进入 Backlog，不顺手成为正式规则。

## 7. 何时停止开发并进入 TESTING

判断标准是“当前版本是否足够让玩家回答 Question”，不是“还能加什么”。以下条件满足即可停止功能开发、进入 TESTING：

- 可以启动，从 Launcher 进入并独立运行。
- 核心操作可用，Core Variable 生效，结果可观察。
- 没有阻碍试玩的严重 Bug。
- TypeScript 检查与生产构建通过；部署后 Pages 入口与资源可访问。
- README 已写清操作、实验条件和未试玩状态，Backlog 与已有首页元信息已手工同步。

不要求完整 UI、美术、动画、音效、设置、存档、教程或完善架构。TESTING 只表示可试玩，不表示已经有趣；Work 的技术验证不能代替 Player 的体验结论。

## 8. Bug 与玩法结果

| 类型 | 例子 | 处理 |
| --- | --- | --- |
| Bug | 拖拽物品消失、卡墙、按规则应刷新的怪物未刷新、页面打不开 | 修复阻碍实验的问题 |
| Gameplay Result | 整理很烦、篝火没有决策、按预期运行的尸体规则造成混乱 | 记录 Result，判断 Iterate 或 DEAD |

不要通过不断增加功能“修复”否定结果。若表现来自实现故障，先修故障；若规则正常但体验不好，承认实验结果。

## 9. 试玩记录与状态

Prototype README 是实验实施记录 + 试玩记录，不是完整游戏设计文档。进入 TESTING 时准备以下字段；未试玩保留 Untested / TBD，不填写虚构观察：

- Observed：实际发生了什么。
- Interesting Moment：什么时候开始有趣。
- Boring Moment：什么时候开始无聊。
- Decisions：玩家做了哪些取舍。
- Unexpected：出现了什么预期外行为。
- Next：是否值得继续，以及下一步。

同时记下试玩者、日期、版本、测试条件及固定参数。举例：为了放入 2×3 物品调整已有物品是 Interesting Moment；空位很多时没有取舍是 Boring Moment；主动留规则形状的空位是 Unexpected。这些只是格式示例，不是本仓库已有结论。

依据真实试玩结果更新 INTERESTING / MAYBE / DEAD。DEAD 是正常且有价值的结果，不为维持成功率无限堆功能。手工同步 Backlog 的 Status / Result / Notes、对应 Prototype README 和已有首页状态。

## 10. Iterate 与 Promote

每次 Iterate 写清：为什么改、改变哪个变量、预期回答什么。问题还不明确但有潜力时可迭代；若开始回答另一个问题，则使用新的 Experiment。保留之前的观察及版本，避免将不同条件的结果混在一起。

PROMOTED 表示结果值得进入更高层级组合实验或正式 Game Prototype，不表示最终游戏必然采用该功能。

单机制实验 → 组合玩法 Prototype → Vertical Slice → 独立 Game Repository。原实验保留记录，并记录晋级去向。

## 11. Review

优先检查：

- 实现是否足以回答当前 Question。
- 是否混入多余变量或扩大 Minimum Scope。
- 是否有阻碍试玩的 Bug。
- 是否出现不必要抽象或实验间代码依赖。
- 是否能独立运行，build / Pages 是否正常。
- 状态、操作说明、临时条件和结果记录是否同步且真实。

Review 以实验有效性为主，不以正式产品代码质量作为主要标准。区分技术验收、玩法观察和推测，不把构建通过写成实验成功。

## 12. 每次交接记录

在对应 Prototype README 的 Notes 手工留下：

- 当前 Experiment ID、Question、Status 和实现目录。
- 当前版本已完成什么、仍有哪些阻碍试玩的问题。
- 核心变量、固定条件和临时设计取值。
- 验证方式与结果；部署地址和状态（若已部署）。
- 实际试玩 Result，或明确尚未试玩。
- 下一步：继续当前范围、等待试玩、Iterate、Kill 或 Promote；新课题记录其 Backlog ID。

没有 Prototype 时将相关记录留在对应 Backlog Notes，不为交接创建空玩法目录。避免复制完整 Backlog，使用链接关联，保持单一条目内容一致。

流程：Experiment → Minimum Prototype → Play → Record → Compare → Kill / Iterate / Promote。

本规范不引入工作流程序、CLI、自动注册、自动状态同步、数据库、Issue Bot、Prototype Generator 或 Shared Framework。
