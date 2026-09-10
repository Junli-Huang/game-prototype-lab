# Prototype 00X - XXX

> 复制到 `prototypes/00X_xxx/README.md`。本文是实验实施记录 + 试玩记录，不是完整游戏设计文档。
> 开始前阅读 [Workflow](workflow.md)（复制到 Prototype 目录后将链接改为 `../../docs/workflow.md`）。默认一个 Prototype 可只承载一个 Experiment；高度相关的竞争实验也可以作为独立 Experiment Mode 共享同一测试场景。

## Prototype Name

XXX

## Experiments / Modes

当前 Active Experiment：EXP-XXX。

若只有一个 Experiment：直接链接对应 Backlog 条目即可。

若为多 Mode Prototype，列出已实现或已选择的 Mode；不要把未选择的候选实验全部实现：

| Mode | Experiment | Status | Core Variable |
| --- | --- | --- | --- |
| XXX | EXP-XXX | BUILDING | XXX |

Mode 切换必须完整 Reset 测试场景。每个 Mode 的 Hypothesis / Question / Result 独立记录。

## Status

当前 Active Experiment：BUILDING。

可选：IDEA / READY / BUILDING / TESTING / INTERESTING / MAYBE / DEAD / PROMOTED。状态属于 Experiment，不是多 Mode Prototype 的总评分。

## Gameplay Hypothesis

当前 Experiment：如果采用 XXX 规则，预期玩家会产生 XXX 体验。必须可被试玩否定，不只写功能名称。

## Question

当前 Experiment 唯一主要问题：XXX？

## Core Variable

本次改变什么：XXX。

对照 Experiment / Mode（若有）：EXP-XXX / XXX。

保持一致的条件：地图、敌人、能力、资源、操作、参数、初始状态、随机条件等 XXX。

## Mode Reset（若为多 Mode）

切换 Mode 时必须重置：

- 玩家状态：XXX
- 世界 / 敌人状态：XXX
- 资源 / 背包 / 时间：XXX
- 随机种子或序列：XXX

语义：`Switch Mode → Reset Test Scene → Apply Experiment Rule → Start Fresh`。

## Core Loop

玩家做什么：A → B → C → A。

## Minimum Scope

只做回答当前 Question 必需的内容：

- XXX

## Non-goals

本实验明确不做：

- XXX
- 不为未来 Mode 预建 Rule Engine / Mode Framework / Shared Framework。

## Visual Fidelity

Level: V0 / V1 / V2（选择适合当前 Question 的一项，不是越高越好）

Reason: 为什么当前实验需要这个表现层？

Required Feedback:

- 验证体验必需的视觉 / 动作 / 声音反馈：XXX

参考：V0 为程序绘图与抽象 UI；V1 为简单图片、图标、基础音效与程序化动作；V2 为 Low Poly 3D、基础灯光与空间表现。只做当前问题必需的反馈，不要求正式动画或完整资产。

## Controls

- 启动与入口：XXX
- Mode 选择（若有）：XXX
- 核心操作：XXX
- Restart Current Mode：XXX

## Implementation Notes

- 实现目录和版本：XXX
- 当前 Active Experiment / Mode：XXX
- 已实现的其他 Mode（若有）：XXX
- 共享固定条件：XXX
- 当前 Mode 独有规则：XXX
- 固定参数 / 临时实验条件及理由：XXX（不代表最终设计）
- 已完成：XXX
- 阻碍试玩的问题：XXX / 无
- 技术验证（启动、操作、变量、Mode Reset、build、Pages）：待验证
- 部署地址与状态：尚未部署

## Result — EXP-XXX / Mode XXX

试玩结论：Untested。尚未试玩时保留 TBD，不将技术验收当成体验结果。

- 试玩者、日期、版本、Mode 与条件：TBD
- Observed：TBD
- Interesting Moment：TBD
- Boring Moment：TBD
- Decisions：TBD
- Unexpected：TBD
- Next：TBD（Kill / Iterate / Promote / 选择新的对照 Experiment）

多 Mode Prototype 为每个 Experiment 分别保留 Result 小节，不写一个笼统的 Prototype 总结覆盖各模式结论。

试玩后依据实际结果更新该 Experiment Status，并手工同步 Backlog 和首页。DEAD 是有效结果；PROMOTED 不表示最终游戏一定采用。

## Notes / Handoff

- Prototype / 实现目录：XXX
- 当前 Active Experiment ID / Mode / Question / Status：XXX
- 其他已实现 Mode 与状态：XXX
- 当前进度与未解决事项：XXX
- 共享固定条件与 Mode 独有变量：XXX
- Mode Reset / Restart 规则：XXX
- 下一步及理由：XXX
- 若 Iterate：为什么改、改变哪个变量、预期回答什么？
- 若新增对照：对应 Experiment ID，为什么适合进入同一 Prototype？
- 若产生不相关新问题：对应 Candidate Experiment ID / 链接，不塞入当前 Prototype。
- 保留之前的试玩版本、Mode、条件与观察，避免覆盖历史结论。
