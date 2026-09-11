# Prototype #002 Assets

这些资源属于 `Prototype #002 — Enemy Respawn Lab`，默认只在本 Prototype 内使用。全部为原型级 Low Poly 资源；Work 直接加载，不为同一对象重新程序建模。

## blood_moon.gltf

Status: Ready

Purpose: EXP-008 Blood Moon World Refresh 的全局周期事件视觉锚点。

Path: `prototypes/002_campfire_respawn/assets/blood_moon.gltf`

Format: embedded glTF 2.0，单文件，无外部贴图 / bin 依赖。

Model notes:

- Low Poly icosahedron sphere。
- Origin / Pivot: 模型中心 `(0,0,0)`。
- Nominal radius: 约 `1`，由 Work 在场景中统一 scale。
- Up axis: Y-up；球体无固定 forward。
- Material: 深红色 + emissive。
- Intended use: Blood Moon 周期事件标识；可整体做 scale / position / rotation / opacity 或外围光照变化。

## common_herb.gltf

Status: Ready

Purpose: Common Resource / 普通可再生资源点之一。只承担“可拾取、可随 World Refresh 恢复”的视觉身份，不带独立回血效果。

Path: `prototypes/002_campfire_respawn/assets/common_herb.gltf`

Format: embedded glTF 2.0，单文件，无外部贴图 / bin 依赖。

Model notes:

- Low Poly 叶簇 + 小型土基座。
- Up axis: Y-up。
- Ground reference: 原点附近为地面中心，模型最低点约 `Y=0`。
- Approx size: 宽约 `1.25`、高约 `1.2` world units；Work 可整体 scale。
- 无固定 forward。
- Intended use: 普通资源点，靠近 / 接触拾取后隐藏；World Refresh 时按 Refresh Profile 恢复。

## supply_cache.gltf

Status: Ready

Purpose: Common Resource / 普通补给点。与 Herb / Ore 在实验规则上价值相同，仅提供不同地点视觉身份。

Path: `prototypes/002_campfire_respawn/assets/supply_cache.gltf`

Format: embedded glTF 2.0，单文件，无外部贴图 / bin 依赖。

Model notes:

- Low Poly 橄榄色补给箱，内含简化医疗包 / 补给块 / 水壶形状。
- Up axis: Y-up。
- Ground reference: 原点附近为底部中心，最低点约 `Y=0`。
- Approx size: `1.26 × 0.79 × 0.92` world units；Work 可整体 scale。
- 无玩法属性差异；不要因为视觉包含医疗包而赋予回血。
- Intended use: 普通资源点，拾取后隐藏；World Refresh 时按 Refresh Profile 恢复。

## ore_node.gltf

Status: Ready

Purpose: Common Resource / 普通矿石资源点。与 Herb / Supply Cache 在实验规则上价值相同。

Path: `prototypes/002_campfire_respawn/assets/ore_node.gltf`

Format: embedded glTF 2.0，单文件，无外部贴图 / bin 依赖。

Model notes:

- Low Poly 灰色岩簇 + 暖色矿晶。
- Up axis: Y-up。
- Ground reference: 原点附近为地面中心；少量几何低于 `Y=0`，Work 放置时可做轻微 Y 偏移。
- Approx size: 宽约 `1.30`、高约 `1.17` world units；Work 可整体 scale。
- Intended use: 普通资源点，拾取后隐藏；World Refresh 时按 Refresh Profile 恢复。

## Asset Handoff Rules

- Work 默认直接使用上述 Ready 文件。
- 允许 position / rotation / scale / tint / whole-object motion。
- 如果某文件无法加载或明显阻碍当前 Experiment Question，采用最低成本 fallback，并在 Prototype README 记录原因。
- 不建立 AssetManager / global asset registry / shared asset library。
- 本轮 Common Resources 的三种模型只提供视觉差异，规则价值统一；不要额外加入回血、制作、货币、稀有度或随机 Loot。
