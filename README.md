# Game Prototype Lab

快速游戏玩法实验室。Small experiments for finding fun.

V0.2.1 — Experiment Workflow & Handoff。已新增 [Prototype #001：空间背包](prototypes/001_spatial_backpack/README.md)，对应 EXP-001，当前 MAYBE。新增 [Prototype #002：篝火恢复与刷新](prototypes/002_campfire_respawn/README.md)，对应 EXP-007，当前 BUILDING。

- **game-dev-lab / Game Tech Prototype**：验证技术、机制、实现方案是否可行。
- **game-prototype-lab / Game Prototype**：验证某个玩法假设是否有趣。

目标是低成本实现大量彼此独立的小实验，观察是否想继续操作、产生好奇心、有意义的决策和新的玩法方向。不是建设通用游戏框架。

## Experiment Backlog

[查看全部 47 个实验课题](docs/experiment-backlog.md)。首批候选中 EXP-001 为 MAYBE，EXP-007 为 BUILDING，6 项为 READY，39 项为 IDEA；先选择一个问题，再创建最小 Prototype，试玩后记录和比较结果。任何候选机制都不是最终设计。

## Workflow

[实验执行与交接规范](docs/workflow.md)：Experiment → Minimum Prototype → Play → Record → Compare → Kill / Iterate / Promote。

新 Work / Chat 开发前优先阅读 README、Philosophy、Workflow、Backlog 中对应 Experiment，以及已有 Prototype README。确认问题、变量、范围、Non-goals 和状态后再开工；首批 READY 是无默认实施顺序的候选池。

## Development

环境：Node.js **24 LTS**（见 `.nvmrc`）、npm、现代浏览器。推荐 Chrome / Edge，兼容目标包括 Firefox。只维护 package-lock.json。

```bash
npm install
npm run dev
```

打开 Vite 输出的本地地址，端口以实际输出为准。所有默认 Prototype 从根项目同一个开发服务进入，无需分别安装或启动。

## Build

```bash
npm run build
```

先进行 TypeScript 类型检查，再构建到 `dist/`。产物为纯静态站点。

## Preview

```bash
npm run preview
```

打开终端输出的地址验证生产构建。修改源码后先重新 build。

## 目录结构

```text
.github/workflows/pages.yml  GitHub Actions 构建与部署
index.html                  Launcher
src/main.ts                 手工维护的元信息列表与列表 UI
src/style.css
prototypes/README.md         实验目录说明与独立玩法实验
docs/experiment-backlog.md   实验课题、状态与结论
docs/philosophy.md           开发原则与状态
docs/workflow.md             执行、Review 与会话交接规范
docs/prototype-template.md   可复制的实验说明模板
package.json
package-lock.json
vite.config.ts              手工维护的多页面构建入口
tsconfig.json
```

## 创建一个 Prototype

1. 从 Experiment Backlog 选择一个 READY 问题，记录 Experiment ID；Designer 明确一个 Gameplay Hypothesis。
2. 创建 `prototypes/00X_xxx/`，复制 `docs/prototype-template.md` 为其中的 `README.md` 并填写。
3. 创建独立 `index.html`、`main.ts`、`style.css`，实现最小玩法。HTML 使用 `<script type="module" src="./main.ts"></script>`；TS 使用 `import './style.css'`。默认 TypeScript + Canvas 2D / DOM，直接使用浏览器 API。
4. 在 `src/main.ts` 的 `prototypes` 数组手工加入元信息，例如：

```ts
{
  id: '001',
  name: 'Example',
  status: 'TESTING',
  hypothesis: '填写这个实验唯一的核心玩法假设',
  url: 'prototypes/001_example/',
},
```

5. 在 `vite.config.ts` 的 `build.rollupOptions.input` 手工加入 HTML：

```ts
input: ['index.html', 'prototypes/001_example/index.html'],
```

这一步必需：Vite 开发服务器可访问源码 HTML，不代表生产构建已经包含它。这里没有自动发现或自动注册系统。

6. 根目录 `npm run dev`，从首页试玩；然后 `npm run build`、`npm run preview`，确认直接访问子页面和刷新都正常。
7. 更新 README 的 Result / Notes 和首页状态，决定 Continue / Kill / Promote。

以上只是文档示例，V0.1 至 V0.2.1 均不创建 example 实验。

### 资源与删除

- `base: './'` 让构建 JS / CSS 使用相对路径，适配根路径与 GitHub Pages 的 `/game-prototype-lab/`。
- 首页入口写 `prototypes/001_example/`，不要写 `/prototypes/001_example/`。
- Prototype 内静态资源优先使用 import 或 `new URL('./asset.png', import.meta.url)`，HTML/CSS 使用相对路径，避免 `/assets/...`。
- Prototype 返回首页可使用 `../../`。
- 删除实验时同步移除它的首页条目和 Vite input，再删除目录；其他实验无需修改。实验之间默认禁止代码依赖。

## 原则与生命周期

Fun First；One Question Per Prototype；Fast and Disposable；Hardcode Is Allowed；No Premature Architecture；Prototype Is Not a Product；Kill Bad Ideas；Promote Good Ideas。

先重复，后抽象。每个实验自行管理循环、输入与 Canvas。不预建 shared / engine / ECS 等通用系统，也不预装测试框架、复杂代码质量工具链或管理后台。

```text
Idea → Experiment Backlog → Choose One Question → Build Prototype → Play → Record Result → Compare → Kill / Iterate / Promote
```

状态：IDEA / READY / BUILDING / TESTING / INTERESTING / MAYBE / DEAD / PROMOTED。详见 [Philosophy](docs/philosophy.md)。有趣的实验小规模继续验证，再做 Vertical Slice，最后迁移独立游戏仓库；原实验保留记录。

## GitHub Pages

[在线首页](https://junli-huang.github.io/game-prototype-lab/)

`.github/workflows/pages.yml` 在 push main 或手工 workflow_dispatch 时执行：

```text
npm ci → npm run build → 上传 dist → GitHub Pages
```

使用 Node.js 24，与本地 `.nvmrc` 一致。仓库 Settings → Pages 的 Source 需为 **GitHub Actions**；工作流会尝试启用 Pages，若仓库权限不允许自动启用，需要管理员在该设置页选择。

线上 Prototype 地址示例：`https://junli-huang.github.io/game-prototype-lab/prototypes/001_example/`。部署完成后验收首页、JS/CSS 请求和未来的子页面直接访问。
