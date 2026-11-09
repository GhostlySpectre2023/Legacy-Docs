# Installation

Install TACNET, add the ox_inventory items and optionally install map tiles.

## Steps

1. Download `tac_handheld` from [portal.cfx.re](https://portal.cfx.re) under **Granted Assets**.
2. Place the `tac_handheld` folder in your `resources` folder.
3. Add it to your `server.cfg` **after** ox_lib, your framework and ox_inventory:

```cfg
ensure ox_lib
ensure qbx_core          # or qb-core / es_extended
ensure ox_inventory
ensure tac_handheld
```

4. Add the items (below) and copy the images from `install/images/` to `ox_inventory/web/images/`.
5. Recommended: install the map tiles (below).
6. Restart your server.

> [!WARNING]
> Do not rename the folder. The item exports use the name `tac_handheld`.

## Items

Add this to `ox_inventory/data/items.lua`. The same snippet is in `install/ox_inventory_items.lua`.

```lua
['tac_handheld'] = {
    label = 'Tactical Handheld',
    weight = 600,
    stack = false,
    close = true,
    consume = 0,
    description = 'Rugged handheld with blue force tracking, markers and messaging',
    client = { export = 'tac_handheld.useDevice' },
},

['tac_tablet'] = {
    label = 'Tactical Tablet',
    weight = 1500,
    stack = false,
    close = true,
    consume = 0,
    description = 'Rugged tablet with BFT, UAV and helmet camera feeds',
    client = { export = 'tac_handheld.useDevice' },
},

['handheld_battery'] = {
    label = 'Device Battery',
    weight = 200,
    stack = true,
    close = true,
    consume = 0,
    description = 'Replaces the battery of a tactical handheld or tablet',
    client = { export = 'tac_handheld.useBattery' },
},

['uav_drone'] = {
    label = 'UAV',
    weight = 4000,
    stack = false,
    description = 'Small surveillance drone, launched from a tactical tablet',
},

['helmet_cam'] = {
    label = 'Helmet Camera',
    weight = 250,
    stack = false,
    description = 'Streams your view to tactical tablets on your net',
},
```

| Item | Purpose |
|---|---|
| `tac_handheld` | The handheld device |
| `tac_tablet` | The tablet device |
| `handheld_battery` | Replaces a device battery |
| `uav_drone` | Needed to launch a UAV from the tablet |
| `helmet_cam` | Carried by a player whose view can be watched |

Give yourself a device to test:

```bash
/giveitem [id] tac_tablet 1
```

> [!NOTE]
> ox_inventory is required on every framework, including QBCore and ESX. The device stores its battery and saved net settings in item metadata.

## Map tiles

The GTA V map imagery is not included because it is Rockstar's artwork. Without tiles the device shows a tactical grid and "NO IMAGERY".

1. Download the **Map Styles** archive linked in the README of [gta-v-map-leaflet](https://github.com/RiceaRaul/gta-v-map-leaflet) and extract it. You need the `styleGrid` folder (zoom folders `0` to `5`).
2. From the `tac_handheld` folder, run in PowerShell:

```bash
powershell -ExecutionPolicy Bypass -File .\install\convert_tiles.ps1 -Source "C:\path\to\styleGrid"
```

This converts about 260 MB of PNG to about 13 MB of JPG and places it in `html/tiles/styleGrid/{z}/{x}/{y}.jpg`.

3. Restart the resource. The **MAP** button cycles MAP (dark), DAY (light) and TAC (grid only).

## Database

None. All device data is stored in ox_inventory item metadata.

## Escrow

`client.lua` and `server.lua` are encrypted with Cfx.re Asset Escrow. `config.lua`, `locales/`, `bridge/` and `html/` stay open. Use a recent server artifact and make sure your license key belongs to the Cfx.re account that bought the resource.
