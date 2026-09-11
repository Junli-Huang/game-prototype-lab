# Game Prototype Lab

快速游戏玩法实验室。Small experiments for finding fun.

V0.2.3 — Experiment Modes & Asset Handoff。已新增 [Prototype #001：空间背包](prototypes/001_spatial_backpack/README.md)，对应 EXP-001，当前 MAYBE。新增 [Prototype #002：Enemy Respawn Lab](prototypes/002_campfire_respawn/README.md)，当前已实现 EXP-007 Campfire Respawn — MAYBE，正式试玩反馈中性。

- **game-dev-lab / Game Tech Prototype**：验证技术、机制、实现方案是否可行。
- **game-prototype-lab / Game Prototype**：验证某个玩法假设是否有趣。

目标是低成本实现大量玩法实验，观察是否想继续操作、产生好奇心、有意义的决策和新的玩法方向。不是建设通用游戏框架。

## Experiment Backlog

[查看全部 47 个实验课题](docs/experiment-backlog.md)。首批候选中 EXP-001 为 MAYBE，EXP-007 为 MAYBE，6 项为 READY，39 项为 IDEA。任何候选机制都不是最终设计。

Experiment 是待回答的问题；Prototype 是可玩的测试容器。默认一个 Prototype 可以只承载一个 Experiment；高度相关、需要公平对照的竞争 Experiment 也可以共享同一 Prototype，以独立 Experiment Mode 切换测试。

## Workflow

[实验执行与交接规范](docs/workflow.md)：Experiment → Minimum Test Mode → Play → Record → Compare → Kill / Iterate / Promote。

[Prototype Asset Handoff](docs/asset-handoff.md)：Designer / Chat 可以提前把当前实验需要的简单图片、图标或 Low Poly 3D 资源提交到 Prototype 本地 `assets/`；Work 优先直接加载使用，不重复制作已经 Ready 的资源。

新 Work / Chat 开发前优先阅读 README、Philosophy、Workflow、Asset Handoff、Backlog 中对应 Experiment，以及承载它的 Prototype README。确认问题、变量、范围、Non-goals、状态、当前 Active Experiment / Mode 和已有 Assets 后再开工；READY 是无默认实施顺序的候选池。

### Experiment Mode 原则

只有当多个实验的地图、角色、基础操作和绝大多数参数本来就应该保持一致时，才考虑共享一个 Prototype。共享的目的是提高 A/B 对照可信度，不是为了省代码或逐步搭建完整游戏。

多 Mode Prototype 必须遵守：

- 一个 Mode 对应一个独立 Experiment ID。
- 每个 Experiment 的 Hypothesis / Question / Status / Result 分开记录。
- 切换 Mode 必须完整 Reset 测试状态。
- 一次只实现当前选中的 Experiment；不因为预留了实验场就把所有候选 Mode 一次做完。
- 同一 Prototype 内可以共享测试场景代码，但不得升级为跨 Prototype Shared / Rule / Mode Framework。

例如 World Refresh 的 Campfire / Blood Moon / Time / Permanent 等竞争方案，若基础测试条件一致，可以在同一个 Respawn Lab 中逐个增加 Mode；Spatial Backpack 与 Fixed Map Exploration 这类不同问题则应保持不同 Prototype。

### Asset Handoff 原则

低成本表现资源可以由 Designer / Chat 先制作并直接提交仓库，减少 Work 把执行量消耗在重复程序建模、美术占位和视觉调试上。

默认路径：

```text
prototypes/00X_xxx/assets/
```

规则：

- Prototype README 的 `Assets / Asset Handoff` 是 Work 的资源入口。
- 已标记 `Ready` 的资源，Work 默认直接加载，不重新用 Three.js primitive、Canvas 或其它方式制作同一个对象。
- Work 可以对资源做当前实验需要的 position / rotation / scale / tint / whole-object motion。
- 地面、墙体、路径、碰撞边界等简单测试结构可以继续程序生成，不要求全部资产化。
- 资源如果无法加载或确实阻碍 Experiment Question，Work 才做最低成本修正，并记录原因。
- 不预建 AssetManager、全局 Asset Registry、shared assets、统一 Loader Framework。
- 若 Designer / Chat 已提前提交资源，后续开发需求案必须明确写出 `Assets Ready`、实际 repo path、用途以及 Work 应如何使用。

详见 [Asset Handoff](docs/asset-handoff.md)。

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
docs/asset-handoff.md        Prototype-local 美术资源交接规范
docs/prototype-template.md   可复制的实验说明模板
package.json
package-lock.json
vite.config.ts              手工维护的多页面构建入口
tsconfig.json
```

## 创建或扩展一个 Prototype

1. 从 Experiment Backlog 选择一个问题；Designer 明确 Experiment ID、Gameplay Hypothesis、Question、Core Variable、Minimum Scope 与 Non-goals。
2. 若没有合适容器，创建 `prototypes/00X_xxx/`，复制 `docs/prototype-template.md` 为其中的 `README.md` 并填写。
3. 若已有高度相关 Prototype，先按 Workflow 判断是否适合新增 Experiment Mode；只有满足受控对照条件才复用，不相关实验继续创建新 Prototype。
4. 确认 Prototype README 的 `Assets / Asset Handoff`。若 Designer / Chat 已提交 Ready 资源，Work 直接使用对应路径；若 `Assets Ready: None`，才自行采用最低成本程序几何或临时表现。
5. 创建或修改独立 `index.html`、`main.ts`、`style.css`，实现当前 Experiment 的最小玩法。默认 TypeScript + Canvas 2D / DOM；需要空间体验时某个 Prototype 可单独使用 Three.js 等依赖。
6. 在 `src/main.ts` 的 `prototypes` 数组手工维护入口元信息。多 Mode Prototype 的首页可显示容器名称，并在 Prototype 内展示各 Experiment Mode 状态。
7. 新 Prototype 需要在 `vite.config.ts` 的 `build.rollupOptions.input` 手工加入 HTML。这里没有自动发现或自动注册系统。
8. 根目录 `npm run dev` 试玩；然后 `npm run build`、`npm run preview`，确认直接访问子页面和刷新都正常。
9. 更新当前 Experiment 的 Result / Notes / Status；多 Mode 时不能用一个笼统的 Prototype 结果覆盖各 Experiment。

### 资源与删除

- `base: './'` 让构建 JS / CSS 使用相对路径，适配根路径与 GitHub Pages 的 `/game-prototype-lab/`。
- Prototype 内静态资源放在自己的 `assets/`，优先使用 import、相对 URL 或适合当前工具链的直接 loader 路径。
- Ready 资源的路径、用途、格式和必要的 forward / up / pivot / scale 说明写在 Prototype README；开发需求案同时重复这些路径，方便 Work 直接执行。
- Prototype 返回首页可使用 `../../`。
- 删除整个 Prototype 时同步移除首页条目和 Vite input；若仅移除一个 Mode，只移除该 Experiment 的局部实现与记录，不影响同容器其他 Mode。
- 不同 Prototype 之间默认禁止代码依赖和资产依赖。

## 原则与生命周期

Fun First；One Question Per Experiment Mode；Fast and Disposable；Hardcode Is Allowed；No Premature Architecture；Prototype Is Not a Product；Kill Bad Ideas；Promote Good Ideas。

先重复，后抽象。一个 Prototype 内可为了受控比较共享测试场景；不同 Prototype 不预建 shared / engine / ECS / Rule Framework / Mode Framework / Asset Framework 等通用系统。

```text
Idea → Experiment Backlog → Choose One Question → Build Test Mode → Play → Record Result → Compare → Kill / Iterate / Promote
```

状态：IDEA / READY / BUILDING / TESTING / INTERESTING / MAYBE / DEAD / PROMOTED。状态属于 Experiment。详见 [Philosophy](docs/philosophy.md)。有趣的实验小规模继续验证，再做 Vertical Slice，最后迁移独立游戏仓库；原实验保留记录。

## GitHub Pages

[在线首页](https://junli-huang.github.io/game-prototype-lab/)

`.github/workflows/pages.yml` 在 push main 或手工 workflow_dispatch 时执行：

```text
npm ci → npm run build → 上传 dist → GitHub Pages
```

使用 Node.js 24，与本地 `.nvmrc` 一致。仓库 Settings → Pages 的 Source 需为 **GitHub Actions**。
