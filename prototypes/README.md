# Prototypes

- [001_spatial_backpack](001_spatial_backpack/README.md)：当前承载 EXP-001 Spatial Backpack Placement，状态 MAYBE。
- [Prototype #002 — Enemy Respawn Lab](002_campfire_respawn/README.md)：EXP-007 / EXP-008 World Refresh Profile R2 均为 TESTING / Untested；两者使用同一刷新内容，只比较 Campfire Rest 与 Blood Moon Trigger。EXP-007 的 R1 MAYBE 历史结果保留。

Prototype 是可玩的测试容器；Experiment 是独立问题。默认一个 Prototype 可以只承载一个 Experiment；高度相关、需要公平对照的竞争实验也可以作为独立 Experiment Mode 共享同一 Prototype。

不同 Prototype 默认禁止相互引用代码；同一 Prototype 内若为了受控比较共享场景与基础逻辑，只能服务该 Prototype 的 Experiment Modes，不升级为跨 Prototype Shared / Rule / Mode Framework。新增、扩展与删除步骤见根 README 和 Workflow。
