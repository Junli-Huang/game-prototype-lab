# Prototype Asset Handoff

本规范用于降低玩法实验中的重复美术制作成本与 Work 执行开销。目标不是建立 Asset Pipeline，而是让 Designer / Chat 可以提前准备当前 Prototype 所需的低成本表现资源，提交到仓库后由 Work 直接加载使用。

## 1. 基本原则

- 资源服务于当前 Experiment Question，不追求正式游戏资产质量。
- Designer / Chat 可以提前制作简单图片、图标、Low Poly 3D 模型等，并直接提交到当前 Prototype。
- Work / Developer 看到已经标记为 Ready 的资源后，默认直接使用，不再用 Three.js 几何体、Canvas 绘制或其他方式重新制作同一个表现对象。
- 只有资源损坏、格式无法加载、尺寸 / 朝向明显错误，或确实阻碍当前实验时，Work 才修改或替换，并在 Prototype README 记录原因。
- 资源复用不是建立共享资产系统的理由。默认仍然 Prototype-local。

## 2. 资源位置

默认放在当前 Prototype 内：

```text
prototypes/00X_xxx/assets/
```

例如：

```text
prototypes/002_campfire_respawn/assets/
├─ player.gltf
├─ enemy.gltf
├─ campfire.gltf
└─ obelisk.gltf
```

不要因为多个 Prototype 可能使用相似的树、石头或角色，就提前建立：

```text
shared/assets/
global-assets/
asset-library/
```

真实重复已经明显妨碍实验速度后，再单独讨论共享。

## 3. 什么值得提前制作

优先为“需要被玩家识别为某个东西”的对象准备资源，例如：

- Player / Enemy / NPC 棋子。
- Campfire、尸体、掉落物、背包物品。
- 特殊交互物、地标、遗物。
- 会影响氛围或辨识度的关键场景物。

简单结构通常不必资产化，例如：

- 地面。
- 测试用墙体。
- 路径。
- 碰撞边界。
- 单纯用于隔离变量的几何阻挡。

这些继续使用当前 Prototype 内的程序几何即可。

## 4. 推荐格式

按最低成本选择：

- 2D：SVG / PNG。
- 3D：glTF / GLB；简单实验优先无贴图或少贴图、简单材质、低面数。
- 若使用文本型 embedded `.gltf`，可以让模型自身携带几何 / buffer 数据，减少多文件依赖。

不要求骨骼、正式动画、PBR 贴图套件或生产级优化，除非当前 Experiment Question 本身需要这些表现。

Toy / Board-game Motion 默认仍由 Work 对整个模型根节点做 position / rotation / scale，不要求模型自带动画。

## 5. Prototype README 必须记录

若当前 Prototype 有预制资源，README 的 `Assets / Asset Handoff` 至少写清：

| 字段 | 内容 |
| --- | --- |
| Asset | 资源名称 |
| Path | 仓库内相对路径 |
| Format | SVG / PNG / glTF / GLB 等 |
| Purpose | 在当前实验里的用途 |
| Notes | 尺寸、朝向、pivot、材质或其它必要说明 |

3D 模型如果相关，还应记录：

- Forward direction。
- Up axis。
- Pivot / origin 大致位置。
- 预期场景缩放，或说明由 Work 在加载后按当前场景统一 scale。

这些只是交接信息，不建立资产元数据系统。

## 6. Work / Developer 的执行规则

开工时先查看 Prototype README 的 `Assets / Asset Handoff`。

如果资源状态为 `Ready`：

1. 确认对应文件存在。
2. 直接加载并用于指定对象。
3. 只做当前实验需要的 position / rotation / scale / tint / whole-object motion。
4. 不重新程序建模同一对象。
5. 不建立 AssetManager、统一 Loader Framework、资源注册表或全局资产目录。

如果现有资源确实无法满足实验：

1. 先判断是不是阻碍 Experiment Question。
2. 只做最低成本修正。
3. 在 README 记录修改原因。
4. 不把“美术更完整”本身作为扩展理由。

## 7. Designer / Chat 的需求案规则

当 Designer / Chat 已经把资源提交到仓库，后续给 Work 的开发需求必须显式写一个 `Assets Ready` 小节，而不是只说“已有美术”。

推荐格式：

```text
Assets Ready

- player.gltf
  Path: prototypes/00X_xxx/assets/player.gltf
  Use: 玩家棋子
  Work: 直接加载；不要重新程序建模

- enemy.gltf
  Path: prototypes/00X_xxx/assets/enemy.gltf
  Use: 敌人棋子
  Work: 直接加载；整体 Transform 实现移动 / 受击 / 死亡
```

若没有提前准备资源，也必须明确：

```text
Assets Ready: None
```

此时 Work 才按 Minimum Scope 使用程序几何或最简单临时表现。

## 8. 来源与授权

优先使用为当前 Prototype 直接制作的资源，减少外部授权问题。

如果资源来自外部来源，Prototype README 必须记录来源与许可；没有确认授权的外部资源不要提交到仓库。

## 9. Handoff

交接到新的 Chat / Work 时，不需要重新讨论“是否应该自己做模型”。先读取：

1. 根 README。
2. Workflow / Philosophy。
3. 本 Asset Handoff。
4. 当前 Prototype README 的 `Assets / Asset Handoff`。

如果 README 标记资源 `Ready`，Work 的默认动作就是使用它们。

核心原则：

> Designer / Chat 可以把实验所需的最低成本表现资源先准备到 repo；Work 专注玩法实现、调试、构建和部署，不重复消耗执行量去制作已经存在的资源。
