# Game Prototype Lab Philosophy

这里验证玩法是否有趣。Game Tech Prototype 属于 game-dev-lab，验证技术、机制的实现方案是否可行；Game Prototype 属于这里，验证玩家体验。

## 1. Fun First
玩法验证优先于技术完整性。关注：好不好玩、是否想继续操作、是否产生好奇心、是否存在有意义的决策、能否自然延伸出新玩法。

## 2. One Question Per Experiment Mode

每个 Experiment / Experiment Mode 只回答一个核心玩法问题。

默认情况下，一个 Prototype 可以只承载一个 Experiment；但若多个 Experiment 本身就是高度相关的竞争方案，并且绝大多数测试条件应保持一致，可以让它们共享同一个 Prototype，以不同 Mode 切换进行直接对照。

允许合并到同一 Prototype 的前提：

- 共享同一测试场景、角色、基础操作和绝大多数参数是合理的。
- Mode 之间只改变明确的 Core Variable，或改变该 Experiment 明确定义的规则。
- 每个 Mode 对应独立 Experiment，Hypothesis、Question、Status、Result 仍分别记录。
- 切换 Mode 必须重置测试场景，避免上一模式状态污染下一模式。
- Mode 按已选择的 Experiment 逐个实现，不因为创建了实验场就一次做完所有候选方案。

不够具体：验证完整挖矿游戏是否好玩。

足够具体：验证“越深入收益越高，同时风险越高”是否产生继续向下探索的冲动。

## 3. Fast and Disposable
快速创建、快速修改、允许失败、允许直接删除。各 Prototype 独立，默认禁止相互引用代码。删除一个 Prototype 不能破坏其他 Prototype。一个 Prototype 内为了公平对照而共享场景代码，不等于建立跨 Prototype 的共享框架。

## 4. Hardcode Is Allowed
允许写死参数、重复代码、临时实现，只要不严重妨碍当前实验。先重复，后抽象。

## 5. No Premature Architecture
不要为未来可能存在的需求建立通用系统。当前不建立 shared、engine、framework、core、ecs、gameplay 等框架目录，不抽象 InputManager、EntityManager、GameObject、Component、SceneManager 或 PrototypeBase。

不预建统一 Game Loop、输入、物理、存档、音频、UI、插件系统、自动发现、后台或数据库。只有多个真实 Prototype 的重复代码明显降低效率后，才考虑 shared。Lab 本身必须比 Prototype 更简单。

Experiment Modes 也不是建立通用 Rule Engine、Mode Framework 或配置平台的理由。只在当前 Prototype 内用最简单的条件分支、枚举或局部函数实现需要的对照模式。

## 6. Prototype Is Not a Product
不要求完整 UI、设置、存档、音效、教程、错误处理或内容，除非它们就是当前实验的一部分。

## 7. Kill Bad Ideas
不好玩就记录结果，停止开发，继续下一个实验。不要因投入时间而继续堆功能。

## 8. Promote Good Ideas
Prototype / Experiment Mode → 小规模继续验证 → Vertical Slice → 独立 Game Repository。原始实验和结果留在 Lab，作为实验记录。

## 9. Experiment != Final Design
实验是待回答的问题，不是已经确定的设计。Prototype 是可玩验证手段。不要把系统设计当成试玩结果，不预先确定刷新方式、尸体影响模型等最终方案；两个独立有趣的机制组合后也必须作为独立 Experiment 验证。

## 10. Competing Ideas Should Be Tested
竞争方案应公平对照，不预设采用倾向。尽量保持地图、怪物、能力、资源和操作一致，只改变核心变量。

若两个或多个竞争实验有约 80%～90% 的场景与操作本来就应该相同，优先考虑在同一 Prototype 内作为独立 Experiment Mode 对照；否则保持独立 Prototype。判断依据是实验有效性，不是为了省代码。

Mode 切换语义应当是：

```text
Switch Mode
→ Reset Test Scene
→ Apply Experiment Rule
→ Start Fresh
```

组合规则仍必须有自己的 Experiment。例如 EXP-007 Campfire Respawn、EXP-008 Blood Moon Respawn 与 EXP-009 Campfire + Blood Moon Respawn 即使共享同一 Respawn Lab，也仍是三个独立实验，不能把 A + B 的结果混入 A 或 B。

候选课题、无默认实施顺序的 READY 候选池和观察格式见 [Experiment Backlog](experiment-backlog.md)。每次只选择一个问题，真实记录有趣、无聊、决策与意外行为，再决定是否继续；DEAD 是正常实验结果。

## 11. Visual Fidelity Should Match the Question

Prototype 的表现层应服务于体验判断，允许使用低成本但有辨识度的视觉、动作和声音反馈。Prototype 不等于 Debug Scene，也不等于 Vertical Slice。

不追求正式美术，也不要求一律使用矩形、圆形和 Debug Text。当空间感、物品辨识、动作反馈、氛围、声音、角色生命感或交互可读性会明显影响实验结果时，使用最低成本的代表性资源与表现方式。

允许简单图片、图标、Low Poly 3D、基础灯光、简单音效、轻量动画和程序化变换动画。不要求序列帧、完整骨骼动画、正式角色动画集、完整 VFX 或正式美术资产。

只做到足以让玩家感受到当前玩法，不追求接近成品。具体表现层选择与必要反馈记录在 Prototype README 的 Visual Fidelity 中。

### Toy / Board-game Motion

角色、怪物和交互对象可以优先采用桌游棋子或玩具式动作语言：

| 行为 | 低成本表现 |
| --- | --- |
| 移动 | 整体轻微左右摇摆、前后倾、上下浮动 |
| 停止 | 回正 |
| 攻击 | 整体向前碰一下或顶一下 |
| 受击 | 后仰或弹开 |
| 拾取 | 靠近、轻碰，并给予物体反馈 |
| 交互 | 朝目标倾一下或碰一下 |
| 死亡 | 整体倒下 |

这些动作可通过图片或模型整体的位移、旋转、缩放完成，不依赖序列帧或复杂骨骼。目标是低成本、高可读性、有生命感、统一风格和快速迭代，不要求每个实验做齐所有动作。

若实验问题本身涉及真实动画质量，再相应提高表现精度。不要据此预建 Animation Framework、Character Controller Framework、Tween Framework、通用 VFX、统一 Low Poly Renderer 或美术资源管理系统。

## 状态与决策

| 状态 | 含义 |
| --- | --- |
| IDEA | 还只是想法 |
| READY | 问题定义清楚，可以开发 |
| BUILDING | 正在快速实现 |
| TESTING | 已经可以试玩 |
| INTERESTING | 核心机制明显有趣 |
| MAYBE | 有潜力，但目前不够明确 |
| DEAD | 实验失败，停止开发 |
| PROMOTED | 进入更高层级 Prototype 或正式项目 |

状态属于 Experiment，而不是 Prototype 容器本身。单 Experiment Prototype 可以直接显示该 Experiment 状态；多 Mode Prototype 应分别显示各 Mode 对应 Experiment 的状态，不用人为制造一个覆盖全部模式的总状态。

Experiment 状态维护在 Backlog；有可玩实现后，在 Prototype README 和首页同步对应状态。尚无实现的 IDEA / READY 课题不应伪装成可试玩 Mode。Result 另记录试玩结论；未试玩可写 Untested，失败可写 Not Interesting，无需维护第二套状态枚举。

生命周期：Idea → Build → Play → Evaluate → Kill / Iterate / Promote。每次评估更新 Notes，明确下一步 Continue / Kill / Promote。

## 技术服务于实验
默认 TypeScript + Canvas 2D / DOM + 浏览器原生 API。实时实验自行使用 requestAnimationFrame；主 Canvas、尺寸、缩放和循环由各实验决定。

不使用 Unity、GDevelop、React、Vue 或大型引擎搭建初始骨架。未来某个实验确实需要 WebGL、Three.js、Matter.js、PixiJS 或 Phaser 时可以单独采用，先说明它如何帮助更快试玩当前玩法。不要为了未来需求升级整个 Lab。

## 执行与交接

开发、Review、完成条件及新会话交接遵循 [Workflow](workflow.md)。先确认当前 Experiment / Mode 的问题与变量，再做最小实现；技术验收不等于玩法结论。Prototype README 保存实施和真实试玩记录，所有状态手工同步。
