# Prototype #001 Assets

Prototype-local visual assets for Backpack Lab experiments.

## EXP-003 Equipment vs Loot Space

Status: Ready

These SVG files are fixed V1 Representative equipment visuals. Work should use them directly rather than redraw them in CSS or inline SVG unless an asset cannot be loaded; record any replacement reason in the Prototype README.

| Asset | Path | Intended Size | Purpose |
| --- | --- | --- | --- |
| Compact Sidearm | `equipment_sidearm.svg` | 1×2 cells | Light Loadout equipment |
| Field Medkit | `equipment_field_medkit.svg` | 1×1 cell | Shared equipment in both loadouts |
| Old Rifle | `equipment_old_rifle.svg` | 1×4 cells | Heavy Loadout equipment |
| Field Armor | `equipment_field_armor.svg` | 2×3 cells | Heavy Loadout equipment |

Conventions:

- SVG `viewBox="0 0 64 64"`.
- No external fonts, images, scripts, filters, or network dependencies.
- Visual identity only; equipment has no combat stats or active effects in EXP-003.
- Rotation may rotate the whole visual with the occupied rectangle, following the existing #001 item rotation behavior.
- Keep these assets Prototype-local; do not create a shared asset library or loader framework.

Existing #001 loot drawings may be reused for EXP-003 loot because they are already Designer-owned prototype visuals. Do not duplicate them as new files merely for asset-system consistency.
