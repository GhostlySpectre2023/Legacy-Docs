# API

Exports and controls provided by the TACNET handheld.

## Client exports

Both exports are meant for ox_inventory item definitions.

### useDevice

Powers on the device in the given slot and opens it, or opens and closes the screen when it is already on. Switching to another device item powers off the current one first.

```lua
['tac_tablet'] = {
    label = 'Tactical Tablet',
    client = { export = 'tac_handheld.useDevice' },
},
```

### useBattery

Uses one battery item to charge a device in your inventory to 100%. When you carry several devices, the one with the lowest charge is charged. Nothing is used up when all devices are already full.

```lua
['handheld_battery'] = {
    label = 'Device Battery',
    client = { export = 'tac_handheld.useBattery' },
},
```

## Key binding

| Name | Default | Description |
|---|---|---|
| `tac_handheld` | `F7` | Opens the device you carry. Set with `Config.Keybind` |

## Controls while the screen is open

| Key | Action |
|---|---|
| F1 to F6 | Switch views |
| + / - | Zoom |
| N | Night mode |
| G | Small or large (`Config.ResizeKey`) |
| ESC | Back / close |

## Usage reference

| Action | How |
|---|---|
| Turn on / open | Use the item or press F7 |
| Let go of the device | ESC, the back button, or the item / F7 again. The device stays on screen and keeps updating (`Config.StayOnScreen`) |
| Turn off | Press the power button twice |
| Join a net | NET tab, enter a name and optional PIN. The first person on a net sets the PIN and becomes the leader |
| Callsign / fireteam | NET tab, Unit |
| Place a marker | MARK on the map toolbar, then click the map |
| Plan a route | ROUTE, click points, name it, SAVE |
| Navigate | Click a unit, marker, route or point, then NAV |
| Messages | MSG tab, or MSG on a unit |
| UAV (tablet) | UAV tab, launch over your position or a map point, VIEW FEED |
| Helmet cam (tablet) | UAV tab, Helmet cameras, VIEW, or H-CAM on a unit |

> [!NOTE]
> The network events between client and server are internal and validated on the server. There is no public API for other resources beyond the item exports.
