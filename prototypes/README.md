# Prototypes

- [Prototype #001 — Backpack Lab](001_spatial_backpack/README.md)：EXP-001 — MAYBE；EXP-003 — TESTING / Untested；EXP-048 — MAYBE；EXP-049 Fixed vs Movable Equipment — MAYBE / Prefer Movable。EXP-049 的 Movable / Locked Required Equipment 是同一 Experiment 内的 Test Conditions。
- [Prototype #002 — Enemy Respawn Lab](002_campfire_respawn/README.md)：EXP-007 / EXP-008 World Refresh Profile R2 均已完成 Player 对照试玩，最新反馈为“体验下来没有明显的感觉”，当前结论均为 MAYBE / Stop。EXP-007 的 R1 MAYBE 历史结果继续保留；#002 当前不继续通过增加内容进行 R3。
- [Prototype #003 — Fixed Map Exploration Lab](003_fixed_map_exploration/README.md)：EXP-004 / EXP-006 使用同一张固定地图分别测试重复路线熟悉感与一条远端捷径的增量价值；均为 TESTING / Untested。

当前没有 Active implementation task。下一步由 Player 依次试玩 EXP-004 三轮、EXP-006 三轮。新 Chat / Work 先读 [`../docs/project-state.md`](../docs/project-state.md) 与 [`../docs/work-items/CURRENT.md`](../docs/work-items/CURRENT.md)，不要从 Backlog 自行选择下一项实现。

Prototype 是可玩的测试容器；Experiment 是独立问题。默认一个 Prototype 可以只承载一个 Experiment；高度相关、需要公平对照的竞争实验也可以作为独立 Experiment Mode 共享同一 Prototype。同一 Experiment 内的参数档位 / 初始条件对照不自动成为独立 Experiment Mode。

不同 Prototype 默认禁止相互引用代码；同一 Prototype 内若为了受控比较共享场景与基础逻辑，只能服务该 Prototype 的 Experiment Modes，不升级为跨 Prototype Shared / Rule / Mode Framework。新增、扩展与删除步骤见根 README 和 Workflow。
