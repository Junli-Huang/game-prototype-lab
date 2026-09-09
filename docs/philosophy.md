# Game Prototype Lab Philosophy

这里验证玩法是否有趣。Game Tech Prototype 属于 game-dev-lab，验证技术、机制的实现方案是否可行；Game Prototype 属于这里，验证玩家体验。

## 1. Fun First
玩法验证优先于技术完整性。关注：好不好玩、是否想继续操作、是否产生好奇心、是否存在有意义的决策、能否自然延伸出新玩法。

## 2. One Question Per Prototype
每个 Prototype 尽量只回答一个核心玩法问题。

不够具体：验证完整挖矿游戏是否好玩。

足够具体：验证“越深入收益越高，同时风险越高”是否产生继续向下探索的冲动。

## 3. Fast and Disposable
快速创建、快速修改、允许失败、允许直接删除。各 Prototype 独立，默认禁止相互引用代码。删除一个实验不能破坏其他实验。

## 4. Hardcode Is Allowed
允许写死参数、重复代码、临时实现，只要不严重妨碍当前实验。先重复，后抽象。

## 5. No Premature Architecture
不要为未来可能存在的需求建立通用系统。当前不建立 shared、engine、framework、core、ecs、gameplay 等框架目录，不抽象 InputManager、EntityManager、GameObject、Component、SceneManager 或 PrototypeBase。

不预建统一 Game Loop、输入、物理、存档、音频、UI、插件系统、自动发现、后台或数据库。只有多个真实 Prototype 的重复代码明显降低效率后，才考虑 shared。Lab 本身必须比 Prototype 更简单。

## 6. Prototype Is Not a Product
不要求完整 UI、设置、存档、音效、教程、错误处理或内容，除非它们就是当前实验的一部分。

## 7. Kill Bad Ideas
不好玩就记录结果，停止开发，继续下一个实验。不要因投入时间而继续堆功能。

## 8. Promote Good Ideas
Prototype → 小规模继续验证 → Vertical Slice → 独立 Game Repository。原始 Prototype 留在 Lab，作为实验记录。

## 状态与决策

| 状态 | 含义 |
| --- | --- |
| IDEA | 还只是想法 |
| BUILDING | 正在快速实现 |
| TESTING | 已经可以试玩 |
| INTERESTING | 核心机制明显有趣 |
| MAYBE | 有潜力，但目前不够明确 |
| DEAD | 实验失败，停止开发 |
| PROMOTED | 已孵化为正式项目 |

状态记入 README 的 Result，并同步首页元信息。Result 另记录试玩结论；未试玩可写 Untested，失败可写 Not Interesting，无需维护第二套状态枚举。

生命周期：Idea → Build → Play → Evaluate → Kill / Iterate / Promote。每次评估更新 Notes，明确下一步 Continue / Kill / Promote。

## 技术服务于实验
默认 TypeScript + Canvas 2D / DOM + 浏览器原生 API。实时实验自行使用 requestAnimationFrame；主 Canvas、尺寸、缩放和循环由各实验决定。

不使用 Unity、GDevelop、React、Vue 或大型引擎搭建初始骨架。未来某个实验确实需要 WebGL、Three.js、Matter.js、PixiJS 或 Phaser 时可以单独采用，先说明它如何帮助更快试玩当前玩法。不要为了未来需求升级整个 Lab。
