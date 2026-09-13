# Work Items

本目录保存可以直接交给 Work / Developer 执行的完整需求案。

目标：减少在 Chat 与 Work 之间重复粘贴长需求。Designer / Chat 负责把已经确认的开发需求写入 repo；Work 只需要从稳定入口读取当前任务。

## Stable entry

当前任务入口始终是：

```text
docs/work-items/CURRENT.md
```

`CURRENT.md` 有两种合法状态：

1. 指向一个当前正式 Work Item；
2. 明确写出 `No active implementation task`。

第二种状态表示当前处于试玩 / Review / 设计讨论阶段。Work 不得从 Backlog、Project State 或设计笔记自行挑选一个任务开始实现。

新 Chat 可先读取 `docs/project-state.md` 了解当前整体状态，再读取 `CURRENT.md` 判断当前是否存在实施任务。

## Naming

正式需求文件使用：

```text
docs/work-items/EXP-XXX-short-name.md
```

例如：

```text
docs/work-items/EXP-008-blood-moon-respawn.md
```

Review / Result 收口文件可以在名称中追加明确后缀，例如：

```text
docs/work-items/EXP-007-008-world-refresh-profile-r2-result.md
```

它们是历史记录，不代表仍是 Active task。

## Rules

- 一个 work item 对应当前被选择执行的一个 Experiment / 明确修正任务。
- 完整需求写在独立文件；`CURRENT.md` 只做稳定入口，不复制整份需求。
- Work 开工前仍需阅读根 README、`docs/project-state.md`、Workflow、Backlog 中对应 Experiment、当前 Prototype README，以及需求案要求的 Asset Handoff。
- Work 必须以 work item 中的 Scope / Non-goals / Acceptance 为边界，不自行扩展其它 Experiment。
- Designer / Chat 更新需求时直接修改对应 work item；用户只需让 Work 重新读取 `CURRENT.md`。
- 完成后保留 work item 作为历史记录；下一个任务只更新 `CURRENT.md` 指向，不删除旧需求。
- 完成一轮实现 / 试玩 / Review 后同步 `docs/project-state.md`，避免新 Chat 依赖旧对话恢复当前决策。
- 不建立 Issue Bot、任务数据库、CLI、自动执行器或复杂状态系统。
