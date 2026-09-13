# Experiment Workflow & Handoff — V0.2.3

本仓库用最小可玩实验回答玩法问题。Game Prototype 不等于 Game Tech Prototype；Experiment 不等于 Final Design。本文是实验执行与交接规范，不是完整游戏设计文档。全部状态和记录用 Markdown 手工维护。

## 1. 新 Work / Chat 从这里开始

开始讨论或实施前，按以下顺序恢复项目状态：

1. [README](../README.md)：项目定位、启动、构建和部署。
2. [Project State](project-state.md)：当前状态快照与最新决策。
3. [Philosophy](philosophy.md)：实验原则和禁止事项。
4. 本 Workflow：执行、完成和交接方式。
5. [Experiment Backlog](experiment-backlog.md)：候选问题与已有结果。
6. [CURRENT](work-items/CURRENT.md)：判断当前是否存在被授权实施的任务。
7. 当前讨论或任务相关的 Prototype README（若已有）。
8. 若 CURRENT 指向正式 Work Item，读取该 Work Item，并继续读取其中明确要求的 Asset Handoff、Prototype `assets/README.md`、设计笔记或其它文件。

`docs/project-state.md` 用于快速恢复“现在做到哪、最新结论是什么、下一步是否已选择”。历史 README / Work Item 中出现的旧状态属于当时记录，不应覆盖 Project State 与 Backlog 中已收口的当前决策。

`docs/work-items/CURRENT.md` 是实施权限的唯一稳定入口：

- CURRENT 指向一个正式 Work Item：Work 才能执行该任务。
- CURRENT 明确为 `No active implementation task`：停止实施；不得从 Backlog、Project State、Prototype README、设计笔记或 READY Pool 自行挑选下一项任务。

开工前明确当前 Experiment ID、Question、Core Variable、Minimum Scope、Non-goals、Status，并读取已有 Result / Notes。若该 Prototype 包含多个 Experiment Mode，还必须明确本次正在开发 / 测试的是哪个 Mode。READY 是候选池，无默认实施顺序，也不自动授权把池内所有实验开发完。

用户说“继续这个 Prototype”时，先确认其 README 当前 Active Experiment / Mode，沿着该问题继续，不重新设计整个游戏。新玩法想法先判断是当前实验必需修改，还是新 Experiment；后者优先记录为候选，不自动实施。

### Repository Freshness

开始执行 CURRENT 前，必须确认读取的是 Work Item 指定目标分支的最新状态；本仓库当前默认目标分支为 `main`。

- 不得依据旧会话缓存、同步前本地副本或历史提交中的 CURRENT 开始实施。
- 使用本地 Git 时，先确认工作树和远端状态，在不覆盖用户已有修改的前提下安全同步，再重新读取 CURRENT。
- 使用 GitHub Connector 等远端读取方式时，重新读取默认分支最新 CURRENT，不沿用旧响应作为实施授权。
- Repository Freshness 定义的是“开始前必须基于最新状态”这一结果要求，不规定唯一 Git 命令流程。

## 2. 角色职责

| 角色 | 负责 | 不自行决定或追求 |
| --- | --- | --- |
| Designer | 课题、可否定的 Hypothesis、变量控制、Minimum Scope、Non-goals、结果分析、下一步实验、是否适合进入同一对照 Prototype | 为完整性增加系统、提前确定最终规则、要求产品化 |
| Work / Developer | 当前正式 Work Item / Experiment / Mode 的最小可玩实现、变量可观察、基本操作、阻碍实验的 Bug、对应文档、build / Pages 可运行 | 最终设计、新玩法系统、扩大范围、通用框架、自行新增 Experiment、Mode 或 Test Condition |
| Player / Evaluator | 默认由项目所有者试玩；记录操作意愿、好奇心、决策、有趣与无聊时机、意外行为 | 用功能数量、画面完整度或架构漂亮程度替代体验评价 |

## 3. 从 IDEA 到 BUILDING

IDEA 表示候选想法。Designer 将问题和最小边界定义清楚后可标 READY；选择本次要做的一项后，核对下列六项再进入 BUILDING：

- Experiment ID。
- Hypothesis。
- Question。
- Core Variable。
- Minimum Scope。
- Non-goals。

如果计划把它作为已有 Prototype 的新 Mode，还需核对：

- 与已有 Mode 是否真的适合共享同一测试场景。
- 哪些固定条件必须完全一致。
- Mode 切换是否可以完整 Reset 世界状态。

缺项或含义不清时先补清当前问题，不开始玩法代码。历史 READY 标签不能代替开工检查。

Hypothesis 描述“如果采用某规则，预期产生某种玩家体验”，且可以被试玩否定。Question 原则上只有一个；如果同时问背包、战斗、掉落和装备组合是否好玩，优先拆分 Experiment。

## 4. Experiment、Mode 与 Test Condition

Experiment 是问题；Prototype 是可玩的测试容器。默认一个 Prototype 只承载一个 Experiment，但这不是硬性 1:1 关系。

当多个 Experiment 是同一问题域下的竞争方案，并且约 80%～90% 的地图、角色、基础操作、资源与参数本来就应该保持一致时，可以让它们共享一个 Prototype，以独立 Experiment Mode 进行 A/B 或多方案对照。

适合共享的典型情况：

- Campfire Respawn vs Blood Moon Respawn vs Time Respawn。
- Death Loss: None vs Partial vs Full。
- Corpse Influence: Numeric vs Type Count vs Mixed。
- Safe Zone: Absolute vs Vulnerable 等高度相关规则。

不适合因为“以后可能组合成一款游戏”就共享，例如 Spatial Backpack 与 Fixed Map Exploration。省代码不是合并理由。

多 Mode Prototype 必须满足：

1. 每个 Mode 映射到一个独立 Experiment ID。
2. 每个 Mode 单独拥有 Hypothesis / Question / Core Variable / Status / Result。
3. Mode 切换时执行完整实验 Reset；不能继承上一 Mode 的玩家位置、敌人死亡、背包内容、时间、随机种子进度等会影响结论的状态。
4. 基础条件应尽量共用并固定；若某 Mode 无法保持一致，README 明确记录差异及其对比较的限制。
5. 新 Mode 逐个开发。当前只选择一个 Experiment 时，不因为 Prototype 名称覆盖同类问题就顺手实现其它候选。
6. Mode 共享代码只能存在于当前 Prototype 内，不升级为跨 Prototype Shared Framework。
7. 组合方案仍然是新的独立 Experiment；不能把两个已实现 Mode 同时打开后自动视为组合结论。

`Light / Heavy`、`Low / High`、参数档位、初始占格等，如果没有改变 Experiment Question，只是同一问题下的受控输入，则属于 Test Conditions，不自动成为新的 Experiment Mode。Work 不自行新增 Test Condition。

## 5. 实现范围与开发原则

Minimum Scope 只包含回答当前 Experiment Question 必需的内容。每个 Prototype README 必须明确 Non-goals，用于防止范围扩大，不用于规划未来系统。

最小实现、可玩、可观察优先。允许写死参数、重复代码和临时代码；技术债可以接受。不要为了以后方便扩展接口、引入复杂配置或抽象 shared / engine / framework。

类似的移动、敌人、地图和 HUD 可以直接复制到另一个 Prototype；同一对照 Prototype 内则可以直接共享，因为共享本身就是控制实验条件的一部分。无论哪种情况，都不要因此预建通用 Game Rule System、Mode Framework、Scene Framework、Inventory Framework 或 Asset Framework。

确实缺少某项功能导致当前实验无法进行时，Work 可以补充最小必要实现，并在 Notes 记录原因和边界。它必须服务当前 Question，不借机新增玩法问题。

### 最低可用表现层

Work 不应默认 Debug 图形一定足够，也不应默认必须制作正式动画。依据 Experiment Question 选择足以支持体验判断的最低成本表现，并在 Prototype README 的 Visual Fidelity 记录 Level、Reason、Required Feedback。

| Level | 参考表现方式 |
| --- | --- |
| V0 — Abstract | 程序绘图、几何图形、Debug UI |
| V1 — Representative | 简单图片、图标、基础音效、程序化动作 |
| V2 — Spatial | Low Poly 3D、基础灯光、简单空间表现 |

这只是开发判断参考，不是版本升级路线、质量评分或正式系统配置。空间、辨识、动作、氛围或声音影响判断时，把必要反馈纳入 Minimum Scope，做到足够判断即停止。

角色和交互对象可使用 [Toy / Board-game Motion](philosophy.md#toy--board-game-motion)：摇摆移动、停止回正、攻击轻碰、受击后仰、死亡倒下。无需默认制作序列帧或完整骨骼动画。

涉及 Ready 资源时，按 [Asset Handoff](asset-handoff.md) 与 Prototype `assets/README.md` 执行。Ready 资产默认直接加载；只有资源确实不可用且阻碍当前实验时才做最低成本替代，并记录原因，不重复程序建模同一资源。

## 6. 竞争方案与组合实验

竞争方案尽量保持地图、怪物、角色能力、资源、操作和测试顺序一致，只改变 Core Variable。若使用同一 Prototype 的多个 Mode，这种“共享条件”是为了提高对照可信度，而不是为了构建完整游戏。

建议切换语义：

```text
Switch Mode
→ Reset Test Scene
→ Apply Selected Experiment Rule
→ Start Fresh
```

必要时提供一个明确的 `Restart Current Mode`，确保玩家可以重复同一条件。

A 和 B 都是 INTERESTING，不代表 A + B 是最终方案。组合必须作为独立 Experiment 试玩；已有组合条目沿用，不重复创建。

## 7. 遇到额外设计问题

先记录问题，再用最简单固定方案维持当前实验，必要时将新问题作为 Candidate Experiment / Design Note 记录。除非 Designer 明确选择并创建正式 Work Item，否则不进入实施。

例如尸体腐烂时间与永久存在的选择，在当前不研究腐烂时固定一种条件；在 Notes 写明临时取值、理由及影响。临时条件不等于最终游戏规则。若它适合成为当前 Prototype 的未来对照 Mode，也只记录候选关系，不立即实现。

## 8. 何时停止开发并进入 TESTING

判断标准是“当前 Experiment Mode 是否足够让玩家回答 Question”，不是“整个 Prototype 还能加什么”。以下条件满足即可让当前 Experiment 进入 TESTING：

- 可以从 Launcher 进入并运行承载它的 Prototype。
- 当前 Mode 可选择或为唯一 Mode，且启动条件明确。
- 核心操作可用，Core Variable 生效，结果可观察。
- Mode 切换 / Restart（若存在）能正确 Reset 当前实验条件。
- 没有阻碍试玩的严重 Bug。
- TypeScript 检查与生产构建通过。
- README 已写清操作、固定条件、当前 Mode 和未试玩状态，Backlog 与首页元信息已同步。

不要求把该 Prototype 的其他候选 Mode 一并实现。TESTING 只表示当前 Experiment 可试玩，不表示已经有趣。

### Implementation Complete / Technical Handoff

除非 Work Item 另有明确边界，一次实施任务至少应满足：

1. Scope / Acceptance 已完成。
2. Non-goals 未被突破。
3. 需要类型检查 / 构建的项目，其 TypeScript 检查与 `npm run build` 通过。
4. 必要文档与状态已经同步。
5. 已记录当前环境无法验证的部分。
6. 规则断言、DOM 模拟、构建检查和代码路径检查只按各自证据强度记录，不冒充真实鼠标操作、GPU 画面或 Player 体验。
7. 技术验收没有被写成 Player 玩法结论。

若 Work Item 要求部署 Pages，则 Deployment Complete 还应满足：

1. 修改已进入 Work Item 指定的目标分支；当前默认 `main`。
2. GitHub Actions / Pages 部署成功。
3. Launcher 可以访问。
4. Prototype 独立 URL 可以直接访问和刷新。
5. 当前实验依赖的生产 JS / CSS / SVG / PNG / glTF / GLB 等资源可加载。
6. 涉及可玩行为或交互变化的任务，至少完成一次生产环境关键流程实际操作验证。
7. 无法在当前环境实际验证的渲染或硬件路径必须明确写出边界。

例如远程浏览器禁用 WebGL 时，应区分：

```text
SVGRenderer / compatibility path:
已实际验证。

WebGL / GPU shadow path:
已通过类型检查、构建和代码路径检查，
仍需 Player 桌面浏览器确认。
```

不得概括成“全部视觉效果已经实际验证”。

## 9. Bug 与玩法结果

| 类型 | 例子 | 处理 |
| --- | --- | --- |
| Bug | Mode 切换后残留上一模式敌人状态、拖拽物品消失、页面打不开 | 修复阻碍实验的问题 |
| Gameplay Result | 整理很烦、篝火没有决策、按预期运行的尸体规则造成混乱 | 记录 Result，判断 Iterate 或 DEAD |

不要通过不断增加功能“修复”中性或否定结果。若表现来自实现故障，先修故障；若规则正常但体验不明显或不好，记录真实结果并停止或换语境重新立项。

## 10. 试玩记录与状态

Result 属于 Experiment，不属于 Prototype 总容器。多 Mode Prototype 中必须按 Experiment ID 分别记录：

- 试玩者、日期、版本、Mode 与 Test Conditions。
- Observed。
- Interesting Moment。
- Boring Moment。
- Decisions。
- Unexpected。
- Next。

尚未正式试玩保留 Untested / TBD，不填写虚构观察，不根据 Hypothesis 或技术运行结果推测 Player 行为。不同 Mode 的结果不能合并成一条模糊的“这个 Prototype 很有趣”。

依据真实试玩结果更新 INTERESTING / MAYBE / DEAD，并同步 Backlog、Prototype README、Project State 和需要展示的首页元信息。历史 Player Result 追加新条件，不覆盖旧结果。`Stop`、`Iterate`、`Promote` 等属于 Next / Decision，不新增为 Experiment Status。

## 11. Iterate 与 Promote

每次 Iterate 写清：为什么改、改变哪个变量、预期回答什么。若开始回答另一个问题，则使用新的 Experiment；如果满足受控对照条件，可以将这个新 Experiment 作为同一 Prototype 的新 Mode，而不必创建新目录。

PROMOTED 表示结果值得进入更高层级组合实验或正式 Game Prototype，不表示最终游戏必然采用该功能。

单机制实验 → 受控比较 / 组合玩法 Prototype → Vertical Slice → 独立 Game Repository。原实验保留记录，并记录晋级去向。

## 12. Review

优先检查：

- 当前实现是否足以回答当前 Experiment Question。
- 是否混入多余变量或扩大 Minimum Scope。
- 多 Mode 时是否真正只改变预定变量。
- Test Conditions 是否被误写成独立 Experiment Mode。
- Mode 切换 / Restart 是否完整 Reset 测试状态。
- 是否有阻碍试玩的 Bug。
- 是否出现不必要抽象、Rule Engine、Mode Framework 或跨 Prototype 代码依赖。
- 是否能独立运行，build / Pages 是否正常。
- 各 Experiment 状态、操作说明、临时条件和 Result 是否分别同步且真实。

Review 以实验有效性为主，不以正式产品代码质量作为主要标准。技术验收不能写成实验成功。

## 13. 每次交接与任务收口

在承载当前 Experiment 的 Prototype README 留下：

- Prototype 名称与实现目录。
- 当前 Active Experiment ID / Mode / Question / Status。
- 已实现的其他 Experiment Mode 及各自状态（若有）。
- 当前版本已完成什么、仍有哪些阻碍试玩的问题。
- 多 Mode 共享的固定条件，以及当前 Mode 独有的 Core Variable。
- Mode Reset / Restart 语义。
- 验证方式、部署状态及环境限制。
- 各 Experiment 的实际 Result，或明确尚未试玩。
- 下一步：等待试玩、Iterate、Kill / Stop、Promote，或等待 Designer 选择新 Experiment。

没有 Prototype 时将相关记录留在 Backlog Notes，不为交接创建空玩法目录。避免复制完整 Backlog，使用链接关联。

Active Work Item 完成实现、必要文档与技术 / 部署验收后：

1. 保留原 Work Item 文件作为历史记录。
2. 同步 `docs/project-state.md`、Backlog、Prototype README 及必要的 Launcher / 索引状态。
3. 将 `docs/work-items/CURRENT.md` 收回 `No active implementation task`。
4. 不删除历史 Work Item。
5. 不让 CURRENT 长期继续指向已经完成的任务。
6. 不自动选择下一个 Experiment。

如果 Designer 已经明确选择下一项任务并已经写好新的正式 Work Item，则可以直接让 CURRENT 指向该新 Work Item；Work 不能自行完成这一步的设计选择。

流程：Experiment → Minimum Test Mode → Play → Record → Compare → Kill / Iterate / Promote。

本规范不引入工作流程序、CLI、自动注册、自动状态同步、数据库、Issue Bot、Prototype Generator、Shared Framework 或通用 Mode Framework。
