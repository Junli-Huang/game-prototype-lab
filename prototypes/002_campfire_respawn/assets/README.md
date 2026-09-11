# Prototype #002 Assets

## blood_moon.gltf

Status: Ready

Purpose: EXP-008 Blood Moon Respawn 的全局周期事件视觉锚点。

Path: `prototypes/002_campfire_respawn/assets/blood_moon.gltf`

Format: embedded glTF 2.0，单文件，无外部贴图 / bin 依赖。

Model notes:

- Low Poly icosahedron sphere。
- Origin / Pivot: 模型中心 `(0,0,0)`。
- Nominal radius: 约 `1`，由 Work 在场景中统一 scale。
- Up axis: Y-up；球体无固定 forward。
- Material: 深红色 + emissive，使用 `KHR_materials_unlit`。
- Intended use: 放在 EXP-008 场景可见位置，作为 Blood Moon 周期事件标识；可整体做 scale / position / rotation / opacity 或外围光照变化。
- Do not rebuild the Blood Moon with Three.js primitives unless this file cannot load or materially blocks the experiment. If replacement is necessary, record the reason in Prototype README.

本目录仍是 Prototype-local asset handoff，不建立共享 AssetManager / global asset library。
