# Work Items

本目录保存可以直接交给 Work / Developer 执行的完整需求案。

目标：减少在 Chat 与 Work 之间重复粘贴长需求。Designer / Chat 负责把已经确认的开发需求写入 repo；Work 只需要从稳定入口读取当前任务。

## Stable entry

当前实施权限入口始终是：

```text
docs/work-items/CURRENT.md
```

`CURRENT.md` 有两种合法状态：

1. 指向一个正式 Work Item：允许 Work 执行该任务。
2. 明确写出 `No active implementation task`：当前没有被授权的实施任务。

当 CURRENT 无 Active Work Item 时，Work 必须停止实施，不得从 Backlog、Project State、Prototype README、设计笔记或 READY Pool 自行选择下一项任务。

CURRENT 只负责当前任务指向与最少执行说明，不复制完整需求。Work 不需要从聊天记录恢复需求。

## Repository Freshness

开始读取和执行 CURRENT 前，必须先确认当前读取的是目标分支最新状态；本仓库默认目标分支为 `main`。

要求：

- 不依据旧会话缓存、同步前本地文件或历史提交中的 CURRENT 开始实施。
- 使用本地 Git 时，先识别工作树中已有修改，在不覆盖、回滚或删除用户修改的前提下安全同步远端最新状态，然后重新读取 CURRENT。
- 使用 GitHub Connector 等远端方式时，重新读取默认分支最新 CURRENT，而不是复用旧响应。
- Freshness 定义结果要求，不强制唯一 Git 命令序列。

## Naming

正式需求文件使用：

```text
docs/work-items/EXP-XXX-short-name.md
```

明确的 Review / Result 收口文件可以追加清晰后缀，例如：

```text
docs/work-items/EXP-007-008-world-refresh-profile-r2-result.md
docs/work-items/EXP-XXX-review-fix-01.md
```

历史 Work Item 不因完成而删除，也不因为文件仍存在就代表它仍是 Active task。

## Rules

- 一个 Work Item 对应当前被选择执行的一个 Experiment / 明确修正任务。
- 完整需求写在独立文件；`CURRENT.md` 只做稳定入口。
- Work 开工前按 `docs/workflow.md` 的冷启动顺序恢复项目状态，并读取 CURRENT 指向的正式 Work Item。
- Work 必须以 Work Item 中的 Scope / Non-goals / Acceptance 为边界，不自行扩展其它 Experiment、Mode 或 Test Condition。
- Work Item 涉及 Ready Assets 时，读取 `docs/asset-handoff.md` 与对应 Prototype `assets/README.md`，直接使用指定 Ready 资源；只有资源确实不可用时才做最低成本替代并记录原因。
- Designer / Chat 更新尚未执行完的需求时，直接修改对应 Work Item；Work 必须重新读取最新 CURRENT 与 Work Item 后继续。
- 完成一轮实现 / 试玩 / Review 后同步 `docs/project-state.md`，避免新 Chat 依赖旧对话恢复当前决策。
- 不建立 Issue Bot、任务数据库、CLI、自动执行器或复杂状态系统。

## Completion and CURRENT close-out

Active Work Item 完成 Scope、Acceptance、必要文档和要求的技术 / 部署验收后：

1. 保留原 Work Item 文件，作为历史记录。
2. 同步 `docs/project-state.md`、Backlog、Prototype README，以及任务要求的 Launcher / 索引状态。
3. 将 `docs/work-items/CURRENT.md` 恢复为：

```text
No active implementation task
```

4. 不删除历史 Work Item。
5. 不让 CURRENT 继续指向已经完成的任务。
6. 不自动选择下一个 Experiment。

只有当 Designer 已经明确选择下一项任务，并且新的正式 Work Item 已写好时，CURRENT 才可以直接改为指向该新任务。

技术完成、部署完成和 Player 玩法结论的详细区分以 `docs/workflow.md` 为准；本目录不重复维护第二套验收规范。
