# Configuration

A walk through `config.lua` for the TACNET handheld and tablet.

## General

```lua
-- 'auto' detects qbx_core, qb-core or es_extended. Or set 'qbx', 'qb' or 'esx'.
Config.Framework = 'auto'

-- Language: en, nl, de, fr, es, pt, it, pl, tr, sv, da, cs, ro, ar (files in locales/)
Config.Locale = 'en'
```

## Devices

Each entry maps an ox_inventory item to a device. Features a device doesn't list are hidden and blocked on the server.

```lua
Config.Devices = {
    tac_handheld = {
        skin = 'android',
        scale = 0.5,
        scaleLarge = 1.0,
        features = { map = true, team = true, marks = true, routes = true, messages = true },
    },
    tac_tablet = {
        skin = 'tablet',
        scale = 0.6,
        scaleLarge = 1.0,
        features = { map = true, team = true, marks = true, routes = true, messages = true, uav = true, hcam = true },
    },
}
```

| Field | Description |
|---|---|
| `skin` | `'android'` (rugged handheld) or `'tablet'` (rugged tablet with F-keys) |
| `scale` | Size on screen. `1.0` is full size on a 1080p screen and scales with resolution |
| `scaleLarge` | Size after pressing `Config.ResizeKey` |
| `features` | `map`, `team`, `marks`, `routes`, `messages`, `uav`, `hcam` |

> [!TIP]
> Add your own device by adding an entry with a new item name, for example a GPS-only device with `features = { map = true, team = true }`. Remember to add the item to ox_inventory with `client = { export = 'tac_handheld.useDevice' }`.

## Battery

```lua
Config.BatteryItem = 'handheld_battery'

Config.Battery = {
    enabled = true,
    drainPerMinute = 1.0,  -- % per minute while the device is on (100 = ~1h40)
    lowWarning = 15,
}
```

The charge is stored on the device item (`metadata.charge`, 0 to 100) and shown as the durability bar.

| Option | Description |
|---|---|
| `Config.BatteryItem` | Item that replaces the battery |
| `Config.Battery.enabled` | `false` disables battery drain |
| `Config.Battery.drainPerMinute` | Percent per minute while the device is on |
| `Config.Battery.lowWarning` | Percentage at which a low battery warning is shown |

## Behaviour

```lua
Config.UpdateInterval = 1500
Config.WalkWhileOpen = true
Config.StayOnScreen = true
Config.ResizeKey = 'g'

Config.Keybind = {
    enabled = true,
    default = 'F7',
}
```

| Option | Default | Description |
|---|---|---|
| `Config.UpdateInterval` | `1500` | Milliseconds between position updates sent to a net |
| `Config.WalkWhileOpen` | `true` | Walk while the device is open; camera and weapons stay locked |
| `Config.StayOnScreen` | `true` | Keep the device on screen after ESC. It disappears when switched off |
| `Config.ResizeKey` | `'g'` | Key that switches between `scale` and `scaleLarge`, as a `KeyboardEvent.key` name such as `'g'`, `'Tab'` or `'F8'` |
| `Config.Keybind.enabled` | `true` | Register a key that opens the device you carry |
| `Config.Keybind.default` | `'F7'` | Default key. Players can rebind it in **Settings > Key Bindings > FiveM** |

## Prop

```lua
Config.Prop = {
    enabled = true,
    model = 'prop_cs_tablet',
    dict = 'amb@code_human_in_bus_passenger_idles@female@tablet@base',
    anim = 'base',
    bone = 60309,
    offset = vec3(0.03, 0.002, -0.0),
    rotation = vec3(10.0, 160.0, 0.0),
}
```

The tablet prop and animation played while the screen is open.

## Nets

```lua
Config.Net = {
    maxNameLength = 16,
    maxPinLength = 6,
    maxCallsignLength = 12,
    maxMarks = 60,          -- per net, the oldest is removed first
    maxMarkLabel = 24,
    markCooldown = 1000,    -- ms between marks per player
    maxRoutes = 12,
    maxRoutePoints = 30,
    maxMessages = 80,       -- kept per net
    maxMessageLength = 160,
    messageCooldown = 750,
    maxTrackedVehicles = 8,
    keepEmptyMinutes = 30,  -- an empty net keeps its marks/routes this long
    showCasualties = true,  -- WIA (last stand) / KIA (dead) in the team list
}
```

Limits for nets, markers, routes and messages. `showCasualties` shows WIA and KIA status in the team list.

## Fireteams

```lua
Config.Fireteams = {
    { id = 'main',   color = '#e6ece4' },
    { id = 'red',    color = '#e0433a' },
    { id = 'green',  color = '#4fc76a' },
    { id = 'blue',   color = '#3a8fe0' },
    { id = 'yellow', color = '#e8c53a' },
}
```

Names come from the locale (`ft_<id>`). Add `label = '...'` to override.

## Marker types

```lua
Config.MarkTypes = {
    { id = 'hostile',     color = '#e0433a', icon = 'diamond' },
    { id = 'tic',         color = '#ff2d2d', icon = 'burst',     alert = true },
    { id = 'friendly',    color = '#3a8fe0', icon = 'rect' },
    { id = 'medical',     color = '#f2f2f2', icon = 'cross' },
    { id = 'ccp',         color = '#f2f2f2', icon = 'ccp' },
    { id = 'medevac',     color = '#ff6a6a', icon = 'heli',      alert = true },
    { id = 'checkpoint',  color = '#e8c53a', icon = 'flag' },
    { id = 'rally',       color = '#4fc76a', icon = 'triangle' },
    { id = 'waypoint',    color = '#e8c53a', icon = 'circle' },
    { id = 'trp',         color = '#ff9b2e', icon = 'trp' },
    { id = 'resupply',    color = '#c98bff', icon = 'supply' },
    { id = 'firesupport', color = '#ff9b2e', icon = 'artillery' },
}
```

| Field | Description |
|---|---|
| `id` | Marker ID. The name comes from the locale (`mark_<id>`) unless you set `label` |
| `color` | Hex colour |
| `icon` | `diamond`, `burst`, `rect`, `cross`, `ccp`, `heli`, `flag`, `triangle`, `circle`, `trp`, `supply`, `artillery` |
| `alert` | `true` sends a priority notification to everyone on the net |

## Map

```lua
Config.Map = {
    modes = {
        { id = 'map', label = 'MAP', tiles = 'tiles/styleGrid/{z}/{x}/{y}.jpg', filter = 'grayscale(1) invert(1) brightness(0.62) contrast(1.25) sepia(0.35) hue-rotate(40deg)' },
        { id = 'day', label = 'DAY', tiles = 'tiles/styleGrid/{z}/{x}/{y}.jpg', filter = 'grayscale(1) brightness(0.8) contrast(1.15)' },
        { id = 'tac', label = 'TAC', tiles = false },
        -- { id = 'sat',   label = 'SAT',   tiles = 'tiles/styleSatelite/{z}/{x}/{y}.jpg' },
        -- { id = 'atlas', label = 'ATLAS', tiles = 'tiles/styleAtlas/{z}/{x}/{y}.jpg' },
    },
    minZoom = 2,
    maxZoom = 7,
    maxNativeZoom = 5,
    startZoom = 5,
    gridSize = 1000,
    gridOrigin = vec2(-4000.0, -4000.0),
}
```

| Option | Description |
|---|---|
| `modes` | Map modes. `tiles` is a URL relative to `html/` or a full URL; `false` = grid only. `filter` is an optional CSS filter |
| `minZoom` / `maxZoom` | Zoom limits |
| `maxNativeZoom` | Highest zoom level the tiles exist for |
| `startZoom` | Zoom when the map opens |
| `gridSize` | Metres between major grid lines. 100 m lines appear when zoomed in |
| `gridOrigin` | Origin for the 6-digit grid (3 digits easting, 3 digits northing at 100 m) |

Tiles must use the standard GTA V 256 px layout, where one tile at zoom 0 covers the whole map.

## UAV (tablet)

```lua
Config.UAV = {
    item = 'uav_drone',     -- needed to launch (false = anyone with a tablet)
    consumeItem = false,
    duration = 900,         -- seconds in the air
    altitude = 280,         -- metres above sea level at launch
    minAltitude = 120,
    maxAltitude = 900,
    orbitRadius = 200,
    orbitSeconds = 120,     -- one full orbit
    speed = 45,             -- m/s when retasked
}
```

The UAV is virtual: it orbits a point and any net member with a tablet can watch the feed. Set `item = false` to let anyone with a tablet launch it, or `consumeItem = true` to use up the item on launch.

## Helmet camera (tablet)

```lua
Config.HelmetCam = {
    item = 'helmet_cam',
    maxDistance = 400.0,
}
```

`item` is what the **wearer** needs in their inventory (`false` = everyone). The wearer must be streamed in for the feed to work, so keep `maxDistance` within your OneSync scope.

## Notifications

Notifications go through `bridge/client.lua` and `bridge/server.lua` and use ox_lib by default. Change them there to use another notification system.
