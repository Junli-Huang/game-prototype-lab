# Prototype 001 — Backpack Lab

## Experiments / Modes

| Mode | Experiment | Status | Core Variable |
| --- | --- | --- | --- |
| Spatial Placement | [EXP-001](../../docs/experiment-backlog.md#exp-001-spatial-backpack-placement) | MAYBE | 有限二维空间中的摆放、旋转与取舍 |
| Equipment vs Loot | [EXP-003](../../docs/experiment-backlog.md#exp-003-equipment-vs-loot-space) | TESTING | 同一 Loot 序列下，开局 Locked Equipment 占 3 格或 11 格 |

当前默认 Mode：EXP-003 Equipment vs Loot Space；默认 Loadout：Light。Experiment Mode 或 Loadout 切换均开始完整的新 Session。

## EXP-001 — Spatial Backpack Placement（历史记录）

## Experiment ID

[EXP-001](../../docs/experiment-backlog.md#exp-001-spatial-backpack-placement) · Inventory。

## Status

MAYBE — Player 已完成首次试玩；机制表现为“还可以，有点意思”，目前有潜力但结果尚不够强，暂不标记 INTERESTING。

## Gameplay Hypothesis

如果不同物品具有不同尺寸，并且玩家必须在有限二维背包空间中实际摆放、旋转、重新整理和取舍，那么背包管理本身会产生有意义的决策乐趣。

## Question

当有限背包逐渐被不同尺寸物品占据时，玩家是否会主动重新整理和取舍，并觉得这一过程有趣？

## Core Variable

有限二维空间、不同矩形尺寸、自由摆放和旋转。地图、战斗等均不参与；每次使用相同价值与物品顺序。

## Core Loop

拿起 → 摆放 / 旋转 → 重排已有物品 → 保留或丢弃 → 下一件。

## Minimum Scope

6 列 × 8 行共 48 格、12 种物品、拖拽、R 旋转、重排、丢弃、固定序列、价值统计、可辨认图标和 Restart。没有目标分数或胜负判定。

## Non-goals

不做人物、地图、探索、怪物、战斗、装备属性或使用、商店、制作、基地、种植、尸体、时间、篝火、红月、成长、存档、随机 Loot、自动整理、升级、正式美术或完整音效系统。枪药仅代表尺寸、价值与视觉身份。

## Visual Fidelity

Level: V1 — Representative。

Reason: 需要辨认物品并判断留舍，不只看不同颜色矩形。

Required Feedback: 本实验内手绘简易 SVG 图标、名称/尺寸/价值、跟随指针、绿色合法占格与红色非法占格预览、明确丢弃区域与文本反馈。不引入资源或动画框架，无外部资源依赖。

## Controls

- 从 [线上入口](https://junli-huang.github.io/game-prototype-lab/prototypes/001_spatial_backpack/) 或 Launcher 进入。
- 鼠标左键拖拽待处理物品或背包中已有物品。
- 拖动时 R 旋转 90°；Esc、窗口失焦或指针取消均回到原位置与朝向。
- 松手吸附整格；越界、重叠或非目标区域释放均回原处。
- 拖入“决定放下”区域即丢弃，不可回收。
- 当前物品放入或丢弃后点击“下一件物品”。处理完第 12 件显示 Session Complete、保留清单、总价值与丢弃清单。
- 可以继续整理已有物品；“重新开始”清空所有状态，恢复相同序列。
- 主要操作目标为桌面鼠标 + 键盘。小屏布局可阅读，但不承诺无键盘的完整旋转体验。

## 固定序列与参数

| 顺序 | 物品 | 初始尺寸 | Value | 累计面积 |
| --- | --- | --- | --- | --- |
| 1 | 急救药 | 1×1 | 15 | 1 |
| 2 | 罐装肉 | 1×2 | 25 | 3 |
| 3 | 维修工具 | 2×2 | 50 | 7 |
| 4 | 绷带 | 2×1 | 20 | 9 |
| 5 | 废旧电池 | 2×2 | 35 | 13 |
| 6 | 干燥种子 | 2×2 | 30 | 17 |
| 7 | 机械零件 | 2×3 | 65 | 23 |
| 8 | 未知组织 | 2×3 | 80 | 29 |
| 9 | 旧式步枪 | 1×4 | 70 | 33 |
| 10 | 黑色遗物 | 3×3 | 120 | 42 |
| 11 | 木板 | 1×3 | 18 | 45 |
| 12 | 密封仪器 | 3×5 | 190 | 60 |

前期空间充足，长枪与遗物进入时逐步拥挤；总面积 60 > 48，无法保留所有物品，必须拒绝新物品或丢弃已有物品。若玩家提前丢弃，最后一件未必再次迫使丢弃，这是主动取舍的结果。

自由摆放无法保证第 10 件进入时必然没有 3×3 空位；不强制初始布局或阻止玩家预留。前 10 件可以通过整理共存，但不向玩家提供最优解。已通过离线可行性检查确认前 10 件可共存，不在页面提供布局答案。

## Implementation Notes

### Rotation Visual Consistency 修复

物品旋转时占格与内部图标方向同步，价格与 UI 信息保持正向。物品保存 0° / 90° 朝向；拖拽中使用临时朝向，仅合法放置时提交。Tray 和背包物品共用此规则，重新拖起保留已保存朝向。Esc、pointercancel、blur、非法放置均恢复原位置、宽高及图标朝向，详情尺寸也恢复。

内部 `.item-art` 使用短边安全范围内的正方形，SVG 保持比例，仅旋转视觉层，不旋转 `.item` 或 `.price`。

修复验收：1×4、2×3、3×5 的连续切换、Ghost 朝向、成功放置保存、已有物品重新拖起、四类取消回退均通过实际事件逻辑的临时 Node 检查（模拟 DOM）；TypeScript 与生产构建通过。线上交互另行核验，不将修复视为玩法结论。

所有状态位于当前页面会话；刷新不保存。以 DOM 布局和 Pointer Events 实现，每件矩形按格计算重叠，不新增依赖。非法操作不改模型，成功释放后才提交位置与朝向。

已完成最小范围，部署使用现有 GitHub Actions / Vite MPA。

技术验收（2026-09-10）：

- TypeScript 检查与 Vite MPA 构建通过，生成首页和独立子页面。
- 线上 Chrome 实际拖拽：全部 12 件逐件放入、丢弃、Next、Session Complete、Restart 通过；已有物品重排与重叠拒绝通过。
- 临时 Node 检查运行实际 main.ts 的事件逻辑（模拟 DOM，不安装测试框架）：12 件旋转后的宽高和占格、越界回退、重叠拒绝、取消、价值更新、完整序列与重开均通过。此检查不代替鼠标与键盘组合的人工手感评价。
- 已确认前 10 件存在可同时容纳的布局，12 件总占格超过容量。
- 独立 Pages 地址已可访问。未发现阻碍已验收流程的 Bug。
- 本地开发服务器可启动；云浏览器无法访问 localhost，因此实际交互验收使用 Pages。

## Result

MAYBE — 2026-09-10 首次 Player 试玩反馈：“还可以，有点意思。”这说明当前空间摆放机制至少产生了一定正向体验，但信息不足以判断为明显有趣，因此保守记录为 MAYBE。

- 试玩者、日期、版本与条件：项目所有者；2026-09-10；当前线上 Prototype #001。
- Observed: Player 完成实际试玩，并给出轻度正向评价；暂未记录更细的操作行为观察。
- Interesting Moment: TBD — 本次未单独记录具体时刻。
- Boring Moment: TBD — 本次未单独记录具体时刻。
- Decisions: TBD — 本次未单独记录具体取舍行为。
- Unexpected: TBD — 本次未记录预期外玩法。
- Next: 暂停 #001 功能扩展，保留为 MAYBE；进入新的独立 Prototype 继续验证其他玩法假设，未来需要时可回到与背包关联的 EXP-002 / EXP-003 做组合关系实验。

## EXP-003 — Equipment vs Loot Space

### Status / Result

TESTING / Result: Untested。技术验收不构成 Player 玩法结论。

### Hypothesis / Question

如果固定出门装备和之后获得的 Loot 占用同一个 6×8 背包，那么 Heavy Loadout 应比 Light Loadout 更明显地增加战利品保留与重排压力。问题是：“准备更多”与“为战利品留更多空间”是否会自然形成有意义的取舍？本实验不提供装备属性，不能回答装备强度或战斗平衡问题。

### Controlled Conditions

Light / Heavy 共用现有 #001 的 6×8 棋盘、拖拽、R 旋转、越界/重叠拒绝、取消回退、丢弃、价值统计与 Session Summary，并引用完全相同的七件固定 Loot 序列：罐装肉、废旧电池、机械零件、未知组织、黑色遗物、木板、密封仪器；尺寸、顺序和 Value 均相同，总面积 45。唯一变量是开局 Locked Equipment 占格。

| Loadout | Fixed Equipment | Cells |
| --- | --- | ---: |
| Light | Compact Sidearm 1×2 at (0,0); Field Medkit 1×1 at (1,0) | 3 / 48 |
| Heavy | Old Rifle 1×4 at (0,0); Field Armor 2×3 at (1,0); Field Medkit 1×1 at (3,0) | 11 / 48 |

装备占用普通格并参与同一重叠判断，但不注册 pointerdown 拖拽入口，因此不能移动、旋转或丢弃；Value 固定为 0，没有攻击、防御、治疗或其它效果。Light 的 3 + 45 = 48，离线穷举确认存在容纳全部 Loot 的合法摆法但页面不展示答案；Heavy 的 11 + 45 = 56，必然不能保留全部 Loot。

### Assets / Asset Handoff

以下 Ready SVG 由页面以显式 `new URL(..., import.meta.url)` 直接加载，没有 CSS 重画、inline SVG 复制、AssetManager 或共享资源系统：

| Asset | Path | Use |
| --- | --- | --- |
| Compact Sidearm | `assets/equipment_sidearm.svg` | Light 1×2 Locked Equipment |
| Field Medkit | `assets/equipment_field_medkit.svg` | 两个 Loadout 的 1×1 Locked Equipment |
| Old Rifle | `assets/equipment_old_rifle.svg` | Heavy 1×4 Locked Equipment |
| Field Armor | `assets/equipment_field_armor.svg` | Heavy 2×3 Locked Equipment |

### EXP-003 Technical Acceptance

- EXP-003 默认启动 Light；Experiment Mode、Light / Heavy 和 Restart 均完整清空 Loot、丢弃列表、序号、价值、Summary 与临时拖拽状态，再应用目标初始条件。
- Light / Heavy 都引用同一个七件 Loot 数组；Equipment 面积分别为 3 / 48、11 / 48，固定位置与 Work Item 一致。
- Locked Equipment 使用 Ready SVG，参与 Loot 合法性判断但不可操作；Loot 继续使用原拖拽、旋转、回退、重排与丢弃路径。
- Summary 独立报告 Loadout、Equipment Area、Loot Kept、Loot Value Kept 与 Loot Discarded，不提供分数或正确 Loadout。
- EXP-001 Mode 仍使用原 12 件、60 格固定序列和原 MAYBE Result；切回时不含 Equipment，操作说明恢复为“物品”。
- `npm run build` 通过；GitHub Pages 实现提交 `de466e7` 部署成功。线上默认进入 EXP-003 Light，标题、状态、占格统计与 1 / 7 当前 Loot 正确。
- 线上核对 Light 的 Sidearm / Medkit 与 Heavy 的 Rifle / Armor / Medkit：名称、尺寸、位置和 3 / 48、11 / 48 均正确；四个构建后 SVG 地址分别返回 HTTP 200，画面可见。
- 线上实际将装备拖向丢弃区，位置、数量、进度与丢弃列表不变；将当前 Loot 放到装备占格会被拒绝并完整回到 Tray。
- Light 与 Heavy 均逐件完成同一顺序：罐装肉、废旧电池、机械零件、未知组织、黑色遗物、木板、密封仪器；两个条件都到达 7 / 7 并显示各自 Loadout / Equipment Area / Loot Kept / Value / Discarded Summary。
- 切回 Spatial Placement 后确认 EXP-001 · MAYBE、无 Locked Equipment、Loadout 控件隐藏、原第一件急救药与 1 / 12 进度恢复。未填写 EXP-003 Player 玩法结论。

### Non-goals / Next

没有新增装备属性、使用、随机 Loot、重量、堆叠、自动整理、探索、战斗、共享 Inventory / Asset Framework 或 EXP-002。下一步仅等待 Player 依次试玩 Light 与 Heavy；当前不填写 Observed、Interesting Moment、Boring Moment、Decisions 或 Unexpected。

## Historical Notes / Handoff

EXP-001 已完成最小实现和首次 Player 试玩。当前结论是“有一定趣味，但证据不足以标记 INTERESTING”。不要为了提高评价继续给 #001 增加装备、探索、非矩形物品或自动整理等功能；这些问题应作为独立 Experiment 验证。
