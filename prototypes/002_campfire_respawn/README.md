# Prototype 002 — Enemy Respawn Lab

## Prototype Name

Enemy Respawn Lab

## Experiments / Modes

| Mode | Experiment | Status | Core Variable |
| --- | --- | --- | --- |
| Campfire World Refresh | [EXP-007](../../docs/experiment-backlog.md#exp-007-campfire-world-refresh) | R2 TESTING | Rest → 恢复玩家 + 应用同一 Refresh Profile |
| Blood Moon World Refresh | [EXP-008](../../docs/experiment-backlog.md#exp-008-blood-moon-world-refresh) | R2 TESTING | Blood Moon → 应用同一 Refresh Profile；Rest → 只恢复玩家 |

当前默认 Mode：EXP-008 Blood Moon World Refresh。本文件保存各实验独立的实施与试玩记录，遵循 [Workflow](../../docs/workflow.md)。

## Status

当前已实现 Mode：EXP-007 / EXP-008 — R2 TESTING / Result: Untested。EXP-007 的敌人-only R1 Player 结果仍为 MAYBE，完整保留在下方历史记录中。
当前没有 BUILDING 中的 Experiment。两个 Mode 均可试玩，切换会完整重置测试场景。

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
- 玩家移动、生命、面朝方向的简单攻击、受击与死亡结束尝试。
- 棋子式摇摆、前顶、受击后仰、敌人倒地后移除。
- 篝火恢复与全敌人重置，明确显示恢复的代价，Restart。

## EXP-007 Baseline Non-goals

EXP-007 本身不加入红月或时间刷新；其余仍不做背包、Loot、装备、武器切换、经验、升级、货币、资源掉落、持久尸体、捡尸、生态、种植、基地、任务、剧情、Boss、复杂战斗、耐力、翻滚、格挡、Parry、传送、存档或程序生成地图。不搭建 Three.js / Camera / Animation 共享框架。

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
- Respawn Mode：Campfire / Blood Moon 按钮；切换后完整重置并从头开始。
- E：靠近篝火时休息。Campfire Mode 恢复 HP 并重置全部敌人；Blood Moon Mode 只恢复 HP，不改变敌人或倒计时。
- R / Restart 按钮：相同场景重新开始。
- 切换窗口、切换标签、取消指针时释放输入，避免卡住移动或攻击。
- 桌面键鼠实验，优先使用支持 WebGL 2 的现代浏览器；没有移动触屏操作。禁用 WebGL 时自动使用兼容画面，页面会注明“无阴影”。

## Implementation Notes

实现目录：`prototypes/002_campfire_respawn/`。`main.ts` 仅负责本 Prototype 的 3D、输入与 UI；`simulation.ts` 保存两个受控对照 Mode 的固定规则。Mode 只是局部联合类型和条件分支，没有通用 Mode Framework。没有其他 Prototype 代码依赖。Three.js 从根 npm 安装，但只被 #002 引用，Launcher 与 #001 不加载它。WebGL 不可用时按需加载 Three.js 官方 SVGRenderer，以相同 3D 几何、相机和规则进行软件投影；兼容画面没有阴影。

## EXP-008 — Blood Moon Respawn

### Hypothesis / Question

如果敌人由明确预告的全局 Blood Moon 周期统一刷新，玩家可能会围绕周期调整推进、返回和战斗时机。问题是：30 秒可预期周期能否产生“赶在刷新前做什么 / 什么时候行动”的节奏感？

### Core Variable / Fixed Comparison

只改变刷新触发：Campfire Mode 为 Rest → 回满 HP + 全敌人重置；Blood Moon Mode 为 Rest → 只回满 HP，Blood Moon → 全敌人重置。地图、窄道、玩家、四敌人、战斗、终点、Trial Failed 与 Restart 全部沿用 EXP-007。

30 秒倒计时在 Mode 开始、切换或 Restart 时重置。最后 10 秒红色环境提示逐渐增强；事件发生时全部敌人同时回出生点、满 HP、复活，存活敌人也重置，Route Cleared 清除。玩家 HP 与位置不变，并获得 0.7 秒接触伤害保护。随后立即开始下一个 30 秒周期。Trial Failed 时玩法和倒计时都冻结。

### Visual Fidelity / Asset Handoff

Level: V2 — Spatial，沿用基线场景。直接加载 Ready 资源 [`assets/blood_moon.gltf`](assets/blood_moon.gltf) 作为周期视觉锚点；格式为 embedded glTF 2.0、Y-up、中心 pivot、无外部依赖。只对整个模型做位置、旋转与缩放，未重新程序建模。完整资产说明见 [`assets/README.md`](assets/README.md)。

### Non-goals

不做昼夜、日历、真实月相、随机时机、敌人 Buff、特殊敌人或 Loot、天气、生态、Boss、音乐、通用世界事件、EXP-009 / EXP-010 / EXP-016、AssetManager、Mode Framework 或 Rule Engine。

### Result — EXP-008

Untested — 技术验收不作为 Player 玩法结论。

- 试玩者、日期、版本与条件：TBD。
- Observed / Interesting Moment / Boring Moment / Decisions / Unexpected：TBD。
- Next：等待 Player 正式试玩，之后独立记录 EXP-008 结果并与 EXP-007 比较。

### Technical Acceptance — EXP-008

- 直接对实际 `simulation.ts` 执行规则断言：EXP-007 Rest 基线、Mode 完整重置、EXP-008 heal-only Rest、事件前死亡敌人保持死亡、事件同步重置死亡与存活敌人、玩家 HP / 位置不被事件重置、新 30 秒周期、Trial Failed 冻结、Restart 当前 Mode 全重置，全部通过。
- Blood Moon 事件后的接触伤害保护固定为 0.7 秒，只用于避免传送重置造成同帧伤害。
- Ready 资源 `assets/blood_moon.gltf` 保持原文件，已通过 glTF JSON / embedded buffer 结构检查并由 `GLTFLoader` 直接纳入页面；未增加替代几何体或资产系统。
- `npm run build`：TypeScript 与 Vite MPA 生产构建通过；#001 与 #002 均保留构建入口。
- GitHub Actions / Pages 部署成功（实现提交 `e25dd56`）。线上默认进入 EXP-008；Ready Blood Moon glTF 在场景中正常显示，30 秒倒计时可见，最后 10 秒具有 `urgent` 警告，事件后倒计时进入下一周期。
- 线上实际操作确认：Blood Moon Mode 在篝火按 E 显示 heal-only 提示且倒计时没有重置；切到 Campfire 显示 EXP-007 / MAYBE、隐藏 Blood Moon 计时与模型并执行完整 Reset；切回 Blood Moon 显示 EXP-008 / TESTING 且从 30 秒开始。
- 远程 Chrome 禁用 WebGL，以上实际画面验收使用原有 SVGRenderer 兼容分支；WebGL 分支与 GLTFLoader 通过 TypeScript / Vite 构建和代码路径检查，但 GPU 阴影画面仍需 Player 桌面浏览器确认。
- 验收后停止功能开发。EXP-008 保持 TESTING / Result: Untested；EXP-007 历史玩法与 MAYBE Result 未改。

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
| Player death | Trial Failed，停止当前尝试；R / Restart 重试 |
| Camp / Player start | (0, 10) / (0, 11)，坐标为 x,z |
| Enemy spawns | A(0,5)、B(-0.25,0)、C(0.25,-1.5)、D(0,-7) |
| End marker | (0,-12) |
| Walkable bounds | x ∈ [-2.6,2.6]，z ∈ [-13,12] |
| Rest distance | 距篝火小于 2 单位 |

上述数值在 `simulation.ts` 顶部或对应规则处直接写死，不是配置系统，也不代表正式设计。篝火附近 z≥8 是固定安全区：敌人停止追击，防止出生点持续接触导致无法休息。视觉边石位于行走边界外，不另做物理引擎。

终点只测量路线到达，不检查击杀数量。三段固定岩壁窄道让活敌实际阻挡推进；击杀后实体阻挡解除，原路可安全返回。休息清除 Route Cleared 并重置全部敌人。死亡进入 Trial Failed，冻结当前尝试，不自动回血或传送；只有 Restart 才恢复初始场景。预期试玩可走几轮约 2–5 分钟，不加计时或强制等待。

### 初版技术验收（2026-09-10，死亡返回与绕行记录已被下方修正取代）

- 本地直接运行实际 `simulation.ts` 的临时断言脚本（未引入测试框架）：移动边界、两击杀敌、攻击冷却、持续接触伤害间隔、死亡敌人等待 10 秒仍不刷新、篝火恢复与全敌人出生位置/生命重置、玩家死亡回篝火、终点、Restart、受伤后击杀并返回休息循环通过。
- 固定步进操控检查：直走并持续攻击可在 HP 2/5 时抵达终点（两只敌人仍存活），说明当前参数允许受伤但继续行动；这不是 Player 玩法观察或难度结论。
- `npm run dev` / `npm run preview`：首页、#001、#002 均返回 200，#002 相对路径 JS/CSS 资源正常。
- `npm run build`：通过 TypeScript 与 Vite MPA 生产构建。
- GitHub Actions 构建与 Pages 部署：成功。线上 [独立入口](https://junli-huang.github.io/game-prototype-lab/prototypes/002_campfire_respawn/) 可直接访问。
- 2026-09-10 远程 Chrome 实际操作 / 实时画面：固定相机完整展示路线；W/S 移动、鼠标攻击、敌人受击/死亡、存活计数减少、逐次扣血、玩家死亡返回并恢复世界、Restart 按钮均已确认。完整循环记录：HP 4/5、Enemies 3/4 返回篝火 → E → HP 5/5、Enemies 4/4，出现明确 Rested / Enemies returned 提示。
- 验证边界：远程浏览器禁用 WebGL，以上画面与操作验收使用 SVG 兼容分支。WebGL 主分支通过类型检查、构建与代码检查，但 GPU 渲染/阴影仍需在 Player 桌面浏览器确认；终点触发、敌人不自行复活、精确冷却与重置位置由实际规则模块断言覆盖。
- 输入与帧率：短按攻击立即生效，移动短按保留到下一帧；每帧累计时间最多 0.25 秒，以不超过 1/60 秒的小步推进，避免低帧率下的碰撞跳过或伤害频率变化。

## Result — EXP-007 / Campfire Respawn

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

试玩条件：2026-09-11 当前线上验收修正版（三段窄道、Trial Failed）；Player 未报告浏览器或渲染分支，不作推测。

## World Refresh Profile R2（2026-09-11）

R2 是 EXP-007 / EXP-008 的受控对照修订。两个 Mode 使用同一地图、玩家与战斗参数、敌人与出生点、三件 Common Resource、Refresh Profile、终点、Trial Failed、Mode Reset 与 Restart；唯一变量仍是 World Refresh Trigger。

| Mode | Player restore | World Refresh trigger |
| --- | --- | --- |
| EXP-007 Campfire World Refresh | Rest → HP Full | Rest |
| EXP-008 Blood Moon World Refresh | Rest → HP Full | 30 秒 Blood Moon |

Refresh Profile 默认采用 Designer 建议条件：`Enemies = ON`、`Common Resources = ON`。改变任一选项会立即完整重置当前测试；Mode 切换与 Restart 也完整重置场景，但保留当前 Profile。World Refresh 只恢复已开启类别；Route Cleared 在两种触发下统一清除。资源刷新后有 0.6 秒拾取保护，避免事件发生在资源点上时同帧重新拾取。

三件资源均为 `1 Common Resource`，接近后收集一次并隐藏，不产生治疗、物品、制作或经济效果。Supply Cache 的 medkit 只作视觉识别。资源总收集数允许跨多次刷新累加。

| Resource | Ready glTF | Fixed x,z |
| --- | --- | --- |
| Common Herb | `assets/common_herb.gltf` | (1.5, 8.1) |
| Supply Cache | `assets/supply_cache.gltf` | (-1.5, -3.9) |
| Ore Node | `assets/ore_node.gltf` | (1.5, -9.8) |

三个模型均由 `GLTFLoader` 从 Prototype 本地 Ready 资源直接加载，只调整整个模型的位置、比例与轻微朝向，没有程序重建资源、AssetManager 或共享资源系统。位置不参与碰撞，不改变三段窄道与敌人遭遇几何。

### R2 Result

Untested — 本次实现与技术验收不填写 Player 玩法结论。EXP-007 R1 的 MAYBE 与原始反馈“没有好坏的感受，就一般。”保留不变，不作为 R2 结论。

### R2 Technical Acceptance

- 实际 `simulation.ts` 断言通过：默认 ON / ON；选项改变完整 Reset；Mode 与 Restart 保留 Profile；Restart / Mode Reset 无条件恢复全部初始资源与敌人。
- EXP-007 Rest 和 EXP-008 Blood Moon 调用同一 `applyWorldRefresh`；Enemies 与 Common Resources 分别验证 ON 时恢复、OFF 时保持。EXP-008 Rest 只恢复 HP，不改变敌人、资源或倒计时。
- 三个资源各可接近收集一次并隐藏；刷新后可再次收集，累计数继续增加。三个固定位置不参与碰撞。
- Blood Moon 30 秒周期、最后 10 秒警告、月亮视觉、事件后 0.7 秒接触伤害保护、Trial Failed 与 Restart 保持原行为。
- `common_herb.gltf`、`supply_cache.gltf`、`ore_node.gltf` 与既有 `blood_moon.gltf` 均通过 glTF 2.0 / embedded buffer 结构检查，并由页面直接加载。
- `npm run build` 通过。Pages 部署与线上实际页面验收记录在本节后续提交中。

## Notes / Handoff

2026-09-10：EXP-007 READY → BUILDING → TESTING，独立实现 #002，仅承载当前 EXP-007。已完成最小循环、文档、规则与 Pages 兼容画面验收；验证边界见上文。停止功能开发，等待 Player 记录体验，不预填有趣结论。若规则有效，后续仍需单独比较 EXP-008 等方案；若问题转为战斗、资源或组合玩法，先进入独立 Experiment。

## 2026-09-11 验收修正 — EXP-007

当时状态：TESTING / Result: Untested（技术验收历史）。本次是实验条件修正，不构成玩法结果。

- 保留 Player HP 5、Enemy HP 2、Damage 1、攻击冷却 0.48 秒、无敌时间 0.95 秒、移动速度及 Rest 全重置规则。
- 三段固定岩壁：z=[3,7]、[-3,2]、[-9,-5]；实际通道宽 1.4，计入半径 0.4 后棋子中心横向范围 ±0.3。活敌与玩家中心间距至少 0.8，死亡立即解除阻挡。玩家沿墙滑动，不穿墙；敌人仅在对应窄道内追击/受击后退，不能被引到宽处绕过。B/C 横坐标收至 ±0.25，其他出生坐标不变。没有门、钥匙或击杀数量判胜。
- 死亡：Trial Failed，停止玩法推进，保留失败现场，仅完成倒下反馈。E 和攻击无效；R / Restart 完整重置玩家、敌人、提示、冷却与终点。
- 本次实际规则模块检查通过：五种横向起点配合左右移动不攻击均无法通过第一段；死亡后等待 10 秒不复活、敌人冻结；Restart 恢复全部出生点/HP；自然接触受伤后击杀 A，得到 HP 3/5、敌人 3/4、前方还有路线；原路返回 E 后 HP 5/5、敌人 4/4；直走连续攻击可到达终点（HP 1/5）。这是技术操控证据，不是难度或趣味结论。
- 本地 npm run build 通过；GitHub Actions / Pages 部署成功（实现提交 34ae220）。线上已核对修正版资源、三段岩壁与棋子显示，并实际不攻击前进至第一段受阻、逐次扣血到 Trial Failed，随后点击 Restart 恢复 HP 5/5、Enemies 4/4 和篝火初始位置。远程环境只验证 SVG 兼容画面，WebGL 阴影需桌面试玩确认。
- 当时下一步：等待 Player 正式试玩；现已完成，结果见上方 Result。

## 2026-09-11 试玩收口与容器定位

当时 EXP-007 已记录 MAYBE 并停止调整。Prototype #002 显示名称改为 Enemy Respawn Lab，目录与 Pages URL 保留 `prototypes/002_campfire_respawn/`；当时页面直接进入 Campfire Respawn Mode，尚无 Mode Selector。

当时 EXP-008 Blood Moon Respawn、EXP-009 Campfire + Blood Moon Respawn、EXP-010 Time Respawn、EXP-011 Permanent Enemy Death、EXP-012 Ecological Replacement 仅为候选对照 Experiment，均未在本容器实现；此后 EXP-008 已作为独立 Mode 实现，其他候选仍未实现。

本次只更新真实试玩记录、显示名称和状态，不修改地图、玩法、参数或资产。Asset Handoff 适用于后续新资产，现有程序几何不返工。#001 继续保持原样，EXP-001 为 MAYBE。
