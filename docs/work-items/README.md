# Work Items

本目录保存可以直接交给 Work / Developer 执行的完整需求案。

目标：减少在 Chat 与 Work 之间重复粘贴长需求。Designer / Chat 负责把已经确认的开发需求写入 repo；Work 只需要从稳定入口读取当前任务。

## Stable entry

当前任务入口始终是：

```text
docs/work-items/CURRENT.md
```

`CURRENT.md` 只负责指向当前正式需求文件，并附最少执行说明。Work 不需要从聊天记录里恢复需求。

## Naming

正式需求文件使用：

```text
docs/work-items/EXP-XXX-short-name.md
```

例如：

```text
docs/work-items/EXP-008-blood-moon-respawn.md
```

## Rules

- 一个 work item 对应当前被选择执行的一个 Experiment / 明确修正任务。
- 完整需求写在独立文件；`CURRENT.md` 只做稳定入口，不复制整份需求。
- Work 开工前仍需阅读根 README、Workflow、Backlog 中对应 Experiment、当前 Prototype README，以及需求案要求的 Asset Handoff。
- Work 必须以 work item 中的 Scope / Non-goals / Acceptance 为边界，不自行扩展其它 Experiment。
- Designer / Chat 更新需求时直接修改对应 work item；用户只需让 Work 重新读取 `CURRENT.md`。
- 完成后保留 work item 作为历史记录；下一个任务只更新 `CURRENT.md` 指向，不删除旧需求。
- 不建立 Issue Bot、任务数据库、CLI、自动执行器或复杂状态系统。
