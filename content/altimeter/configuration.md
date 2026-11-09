# Configuration

Every option in `config.lua`, explained.

## General

```lua
-- 'auto' detects qbx_core, qb-core or es_extended
Config.Framework = 'auto'      -- 'auto' | 'qbx' | 'qb' | 'esx'

-- 'auto' uses ox_inventory when it is running, otherwise the framework's usable items
Config.Inventory = 'auto'      -- 'auto' | 'ox_inventory' | 'framework'

-- en, nl, de, fr, es, pt, it, pl, tr, sv, da, cs, ro, ar (see locales/)
Config.Locale = 'en'
Config.Item = 'altimeter'
```

| Option | Default | Description |
|---|---|---|
| `Config.Framework` | `'auto'` | `auto`, `qbx`, `qb` or `esx` |
| `Config.Inventory` | `'auto'` | `auto` uses ox_inventory when it runs, otherwise `framework` usable items |
| `Config.Locale` | `'en'` | Language code |
| `Config.Item` | `'altimeter'` | Item name |

## Job access

```lua
-- false = anyone with the item can use it
Config.JobRestriction = true

-- [job name] = minimum grade (0 = every grade, true also means every grade)
Config.Jobs = {
    police = 0,
    mp = 0,
    -- ambulance = 2,
    -- army = true,
}

-- Allow whole job types (Qbox / QBCore only), [type] = minimum grade
-- e.g. { leo = 0 } gives every police-type job access
Config.JobTypes = {
    -- leo = 0,
}

-- Player must be on duty (ignored on ESX servers without a duty system)
Config.RequireDuty = false
```

A player gets access when **their job is in `Config.Jobs` or their job type is in `Config.JobTypes`**, and their grade is at or above the minimum. With `Config.RequireDuty = true` they must also be on duty. On ESX servers without a duty system the duty check is skipped.

| Option | Default | Description |
|---|---|---|
| `Config.JobRestriction` | `true` | `false` lets anyone with the item use it |
| `Config.Jobs` | `police`, `mp` | Job name to minimum grade. `true` is the same as `0` |
| `Config.JobTypes` | `{}` | Job type to minimum grade (Qbox / QBCore only) |
| `Config.RequireDuty` | `false` | Player must be on duty |

## Altimeter

```lua
-- 'agl' = height above ground (zeroed at the dropzone), 'msl' = height above sea level
Config.Mode = 'agl'

-- How often the altitude is sent to the UI (ms)
Config.UpdateInterval = 100

-- Audible alarm while descending on foot (feet). beeps = number of beeps
Config.Beeps = {
    enabled = true,
    volume = 0.35, -- 0.0 - 1.0
    alarms = {
        { altitude = 4500, beeps = 1 }, -- break off
        { altitude = 3500, beeps = 2 }, -- deploy
        { altitude = 2500, beeps = 4 }, -- hard deck
    },
}
```

| Option | Default | Description |
|---|---|---|
| `Config.Mode` | `'agl'` | `agl` = above ground level, `msl` = above mean sea level |
| `Config.UpdateInterval` | `100` | Milliseconds between UI updates |
| `Config.Beeps.enabled` | `true` | Audible alarm on or off |
| `Config.Beeps.volume` | `0.35` | Volume from `0.0` to `1.0` |
| `Config.Beeps.alarms` | 4500 / 3500 / 2500 ft | List of `{ altitude, beeps }` entries, in feet |

The alarm only sounds while you are descending on foot, not in a vehicle.

## UI

```lua
-- 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center-right' | 'center-left'
Config.Position = 'bottom-right'
Config.Scale = 1.0
Config.DialLabel = 'ALT-30 FT'   -- small text printed on the dial
Config.HideInPauseMenu = true
```

| Option | Default | Description |
|---|---|---|
| `Config.Position` | `'bottom-right'` | Screen position |
| `Config.Scale` | `1.0` | Size of the dial |
| `Config.DialLabel` | `'ALT-30 FT'` | Small text printed on the dial |
| `Config.HideInPauseMenu` | `true` | Hide while the pause menu is open |

## Languages

Available codes: `en`, `nl`, `de`, `fr`, `es`, `pt`, `it`, `pl`, `tr`, `sv`, `da`, `cs`, `ro`, `ar`.

To add a language, copy `locales/en.lua`, rename the file and the table (`Locales.xx`) and translate the texts. Missing keys fall back to English.

## Bridge

`bridge/shared.lua`, `bridge/client.lua` and `bridge/server.lua` stay open. They contain framework detection, the job and item checks and usable item registration, so you can adapt them to a custom framework.
