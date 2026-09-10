# Prototype 002 — Campfire Respawn

## Prototype Name

Campfire Respawn · World Refresh

## Experiment ID

[EXP-007](../../docs/experiment-backlog.md#exp-007-campfire-respawn)。本文件是实验实施记录 + 试玩记录；遵循 [Workflow](../../docs/workflow.md)。

## Status

BUILDING — 最小实现及本地技术检查完成，正在验收 Pages 实际操作。

## Gameplay Hypothesis

如果篝火恢复生命，同时让已击败敌人重新出现，那么恢复资源与已清理进度之间会形成取舍，使休息成为有意义的决策。此假设可被试玩否定；回血和刷新功能正常不等于实验成功。

## Question

玩家在受伤之后，是否会权衡剩余生命、已清理的敌人和接下来的路线，再决定是否使用篝火？

## Core Variable

使用篝火 = 玩家恢复 + 所有敌人恢复初始世界状态（包括存活敌人的位置与生命）。

固定地图、出生点、生命、操作与攻击规则。EXP-008/009/010/011/012 是独立候选；本次不选择最终刷新设计。后续竞争实验应尽量复制这些条件，只改变刷新规则。

## Core Loop

离开篝火 → 清理敌人并受伤 → 继续前进或返回 → 休息回满生命，同时重置敌人 → 再次行动。

## Minimum Scope

- 一个固定斜俯视 Low Poly 3D 场景，一条短路线，四个同种固定敌人，终点石碑。
- 玩家移动、生命、面朝方向的简单攻击、受击与死亡返回。
- 棋子式摇摆、前顶、受击后仰、敌人倒地后移除。
- 篝火恢复与全敌人重置，明确显示恢复的代价，Restart。

## Non-goals

不做背包、Loot、装备、武器切换、经验、升级、货币、资源掉落、持久尸体、捡尸、红月、时间、生态、种植、基地、任务、剧情、Boss、复杂战斗、耐力、翻滚、格挡、Parry、传送、存档或程序生成地图。不搭建 Three.js / Camera / Animation 共享框架。

## Visual Fidelity

Level: V2 — Spatial。

Reason: 需要感受到离篝火有多远、清理过哪些空间、回头意味着重走多少路；实际小型 3D 桌游场景支持这种判断。

Required Feedback:

- 土路、边石、枯树、石碑与明显篝火；固定正交斜俯视相机同时展示整条路线。
- 蓝色玩家、锈红敌人；面部与伸出的手臂表示朝向；敌人头顶两点表示剩余 HP。
- 棋子整体摇摆、轻微浮动、停止回正、攻击前顶、受击后仰和短暂变亮；死亡倒地，1.5 秒后移除。
- 休息时 HP 恢复、火焰放大、敌人回到出生点，文字明确显示 “Rested / Enemies returned”。
- 无正式动画、美术资产或声音系统。所有模型由当前 Prototype 的简单几何体组成。

## Controls

根目录 `npm run dev`，从 Launcher 进入，或直接访问 `prototypes/002_campfire_respawn/`。构建与预览仍使用根目录 `npm run build` / `npm run preview`。

- WASD / 方向键：沿画面上下左右移动。
- Space / 场景内鼠标左键：向当前面朝方向攻击；按住可重复攻击。不使用鼠标瞄准。
- E：靠近篝火时休息。无确认框，立即恢复 HP 并重置全部敌人。
- R / Restart 按钮：相同场景重新开始。
- 切换窗口、切换标签、取消指针时释放输入，避免卡住移动或攻击。
- 桌面键鼠实验，需要支持 WebGL 2 的现代浏览器；没有移动触屏操作。

## Implementation Notes

实现目录：`prototypes/002_campfire_respawn/`。`main.ts` 仅负责本实验的 3D、输入与 UI；`simulation.ts` 保存本实验固定规则，便于直接检查恢复与伤害逻辑。没有其他 Prototype 代码依赖。Three.js 从根 npm 安装，但只被 #002 引用，Launcher 与 #001 不加载它。

### 固定参数与临时条件

| 参数 | 值 |
| --- | --- |
| Player HP | 5 |
| Enemy HP / 数量 | 2 / 4 |
| Enemy Damage | 1 |
| Player / Enemy speed | 3 / 1.65 单位每秒 |
| Attack cooldown / range | 0.48 秒 / 1.5 单位，面前半圆，单次最近一个目标 |
| Player hit invulnerability | 0.95 秒 |
| Enemy detection / contact range | 4.1 / 0.83 单位 |
| Enemy hit pause / knockback | 0.22 秒 / 0.38 单位 |
| Enemy body removal | 1.5 秒 |
| Player death return | 1.2 秒 |
| Camp / Player start | (0, 10) / (0, 11)，坐标为 x,z |
| Enemy spawns | A(0,5)、B(-0.9,0)、C(0.9,-1.5)、D(0,-7) |
| End marker | (0,-12) |
| Walkable bounds | x ∈ [-2.6,2.6]，z ∈ [-13,12] |
| Rest distance | 距篝火小于 2 单位 |

上述数值在 `simulation.ts` 顶部或对应规则处直接写死，不是配置系统，也不代表正式设计。篝火附近 z≥8 是固定安全区：敌人停止追击，防止出生点持续接触导致无法休息。视觉边石位于行走边界外，不另做物理引擎。

终点只测量路线到达，不要求全部击杀、不封路；绕过敌人也是可以记录的行为。休息或死亡会清除 Route Cleared 提示，允许再次走同一路线。可熟练无伤或绕行不是自动判为 Bug；需要 Player 判断这种条件是否影响休息取舍的有效性。预期试玩可走几轮约 2–5 分钟，不加计时或强制等待。

### 技术验收

- 本地直接运行实际 `simulation.ts` 的临时断言脚本（未引入测试框架）：移动边界、两击杀敌、攻击冷却、持续接触伤害间隔、死亡敌人等待 10 秒仍不刷新、篝火恢复与全敌人出生位置/生命重置、玩家死亡回篝火、终点、Restart、受伤后击杀并返回休息循环通过。
- `npm run build`：通过 TypeScript 与 Vite MPA 生产构建。
- Pages 部署及实际浏览器操作：待完成。

## Result

Untested — Work 技术验收不作为 Player 玩法结论。

- 试玩者、日期、版本与条件：TBD。
- Observed：TBD。是否犹豫休息？开始考虑回头时 HP 是多少？
- Interesting Moment：TBD。清理越多后，是否越舍不得重置？
- Boring Moment：TBD。重复清理是有趣的代价还是单纯麻烦？
- Decisions：TBD。是否选择低 HP 继续？
- Unexpected：TBD。是否绕过敌人、无伤或以死亡代替休息？
- Next：完成技术验收后等待 Player；再决定 INTERESTING / MAYBE / DEAD。

## Notes / Handoff

2026-09-10：EXP-007 READY → BUILDING，独立实现 #002。当前不扩展功能。完成 Pages 验收后进入 TESTING 并等待 Player 记录体验；不预填有趣结论。若规则有效，后续仍需单独比较 EXP-008 等方案；若问题转为战斗、资源或组合玩法，先进入独立 Experiment。
