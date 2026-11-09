# Configuration

A walk through `config.lua` and the other open data files of the Tactical Radio.

## Files

| File | Contains |
|---|---|
| `config.lua` | Voice, keybinds, transmission, audio, propagation, battery, damage, UI, animations, intercom, repeaters, admin and rate limits |
| `shared/bands.lua` | Frequency bands, restricted nets and default channel plans |
| `shared/models.lua` | Radio models and antennas |
| `shared/vehicles.lua` | Built-in vehicle radios and intercom |
| `server/editable.lua` / `client/editable.lua` | Hooks, see the [API page](#/radio/api) |

## General

```lua
Config.Framework = 'auto'
Config.Locale = 'en'            -- 'en' | 'nl'
Config.Debug = false
Config.RequireOnDuty = false
```

| Option | Description |
|---|---|
| `Config.Framework` | `auto` detects `qbx_core` first, then `qb-core` |
| `Config.Locale` | `en` or `nl` |
| `Config.Debug` | Extra console output |
| `Config.RequireOnDuty` | Off-duty players lose their job's rights on restricted nets |

## Voice

```lua
Config.Voice = {
    voiceTarget = 1,
    reassertMs = 0,
    encryptionMismatch = 'noise',
}
```

| Option | Description |
|---|---|
| `voiceTarget` | Mumble voice target shared with pma-voice. Radio receivers are added as player targets |
| `reassertMs` | `0` = only re-apply voice targets and submixes after events that wipe them (recommended). A value above `0` also re-applies on that interval; only use it when another voice resource keeps overwriting submixes |
| `encryptionMismatch` | What a receiver without the right key gets. `'noise'`: voice is not routed at all and the UI plays a data burst (secure). `'garble'`: voice is routed through a heavy distortion submix (sounds like TFAR, but is not access control) |

## Keybinds

Players can rebind all keys in **Settings > Key Bindings > FiveM**. An empty `key` means unbound by default.

```lua
Config.Keybinds = {
    srPTT       = { key = 'CAPITAL', label = 'Radio: short-range PTT (active channel)' },
    srAltPTT    = { key = '',        label = 'Radio: short-range PTT (additional channel)' },
    lrPTT       = { key = 'LMENU',   label = 'Radio: long-range PTT (active channel)' },
    lrAltPTT    = { key = '',        label = 'Radio: long-range PTT (additional channel)' },
    intercomPTT = { key = '',        label = 'Radio: vehicle intercom PTT' },
    emergency   = { key = '',        label = 'Radio: emergency override PTT (if permitted)' },
    openSR      = { key = '',        label = 'Radio: open short-range radio' },
    openLR      = { key = '',        label = 'Radio: open long-range radio' },
    cycleSR     = { key = '',        label = 'Radio: cycle active short-range radio' },
    cycleLR     = { key = '',        label = 'Radio: cycle active long-range radio' },
    srChanUp    = { key = '',        label = 'Radio: short-range channel up' },
    srChanDown  = { key = '',        label = 'Radio: short-range channel down' },
    srVolUp     = { key = '',        label = 'Radio: short-range volume up' },
    srVolDown   = { key = '',        label = 'Radio: short-range volume down' },
    toggleHud   = { key = '',        label = 'Radio: toggle radio HUD' },
}
```

By default CapsLock is short-range PTT and Left Alt is long-range PTT.

## Transmission

```lua
Config.Transmit = {
    routingRefreshMs = 750,
    collisionMode = 'block',
    scanHangMs = 2500,
    defaultTimeout = 60,
    squelchThreshold = 0.12,
    pttCooldownMs = 150,
    emergencyGroups = { police = 0, ambulance = 0, fire = 0, army = 0 },
    logTransmissions = true,
}
```

| Option | Description |
|---|---|
| `routingRefreshMs` | How often the server re-evaluates who receives an ongoing transmission |
| `collisionMode` | `'block'`: a second talker on a busy frequency gets a busy tone. `'collide'`: both transmit and receivers hear both through a collision effect |
| `scanHangMs` | Hang time before a scanning radio may jump to another frequency |
| `defaultTimeout` | Maximum length of one transmission in seconds. A model's `txTimeout` overrides it |
| `squelchThreshold` | Below this signal quality a squelched receiver stays silent |
| `pttCooldownMs` | Minimum gap between PTT presses |
| `emergencyGroups` | Groups and minimum grade allowed to use the emergency override |
| `logTransmissions` | Log who, frequency, device, duration and receiver count. Voice is never recorded |

## Speaker and audio routes

```lua
Config.Speaker = {
    range = 7.0,
    minVolume = 0.15,
}

Config.AudioRoutes = {
    speaker  = { label = 'SPKR', spill = true,  volume = 1.0 },
    earpiece = { label = 'EAR',  spill = false, volume = 0.9, requires = 'radio_earpiece' },
    headset  = { label = 'HDST', spill = false, volume = 1.0, requires = 'radio_headset' },
}
```

In speaker mode bystanders within `range` metres hear the radio. Earpiece and headset need the matching item. Vehicle radios are heard by the occupants only.

## Audio profiles

```lua
Config.Audio = {
    maxSubmixes = 24,
    tiers = { 0.66, 0.33 },
    profiles = {
        sr = { { lo = 300.0, hi = 5000.0, rm = 0.00, fudge = 0.0, vol = 1.0 }, ... },
        -- lr, air, civ, diver, intercom, speaker, garble, collision
    },
    pan = {
        C = { 1.0, 1.0 },
        L = { 1.0, 0.0 },
        R = { 0.0, 1.0 },
    },
    staticGain = 0.35,
}
```

| Option | Description |
|---|---|
| `maxSubmixes` | Submixes are created when needed; beyond this a shared one is used |
| `tiers` | Signal quality thresholds for tier 1 (good), 2 (fair) and 3 (poor) |
| `profiles` | RadioFX parameters per profile and tier: `lo` / `hi` frequency cut-offs, `rm` ring modulation, `fudge` distortion, `vol` volume |
| `pan` | Stereo placement for centre, left and right |
| `staticGain` | Static noise under received voice: `(1 - quality) * staticGain` |

## Propagation

```lua
Config.Propagation = {
    degradeStart = 0.55,
    falloffExponent = 1.6,
    elevationPerMetre = 0.010,
    elevationCap = 3.0,
    environment = {
        interior    = 0.55,
        underground = 0.12,
        tunnel      = 0.25,
        vehicle     = 0.90,
        underwater  = 0.0,
    },
    weatherEnabled = true,
    weather = {
        RAIN = 0.92, THUNDER = 0.78, CLEARING = 0.96, SNOW = 0.90, BLIZZARD = 0.80, XMAS = 0.92, FOGGY = 0.98,
    },
    bands = { HF = 1.6, VHF = 1.0, UHF = 0.85 },
    obstructionBandScale = { HF = 0.5, VHF = 1.0, UHF = 1.25 },
    congestionWindow = 0.050,
    congestionPenalty = 0.05,
}
```

| Option | Description |
|---|---|
| `degradeStart` | Fraction of the effective range where quality starts to drop |
| `falloffExponent` | How fast quality drops after that |
| `elevationPerMetre` / `elevationCap` | Range bonus per metre of antenna height above ground, and its cap |
| `environment` | Range multipliers for interiors, underground, tunnels, inside a vehicle and underwater |
| `weatherEnabled` / `weather` | Range multipliers per weather type |
| `bands` | Range factor per band group. HF carries further, UHF less |
| `obstructionBandScale` | How strongly terrain affects each band group |
| `congestionWindow` / `congestionPenalty` | Each other active transmission within this many MHz lowers quality |

### Terrain, interference and dead zones

```lua
Config.Obstructions = {
    { label = 'Mount Chiliad', x = 501.0, y = 5603.0, radius = 1350.0, peak = 800.0, factor = 0.35 },
    -- ...
}

Config.InterferenceZones = {
    { label = 'Downtown LS', x = 150.0, y = -850.0, radius = 1100.0, factor = 0.75 },
    -- ...
}

Config.DeadZones = {
    -- { label = 'Humane Labs lower level', x = 3525.0, y = 3700.0, z = 20.0, radius = 80.0 },
}
```

- **Obstructions** approximate mountains. A transmission whose line of sight passes through a volume below its `peak` loses range by `factor`.
- **Interference zones** multiply the range by `factor` when either end is inside.
- **Dead zones** have no radio coverage at all.

The default coordinates are approximate GTA V landmarks; tune them for your map.

## Battery

```lua
Config.Battery = {
    tickSeconds = 10,
    warnAt = { 20, 10, 5 },
    chargerRequiresPower = true,
    chargeSeconds = 20,
    returnOldPack = true,
}
```

| Option | Description |
|---|---|
| `tickSeconds` | Battery update interval |
| `warnAt` | Percentages at which a low battery warning is shown |
| `chargerRequiresPower` | The charger only works in a running vehicle or inside an interior |
| `chargeSeconds` | Time to charge |
| `returnOldPack` | Swapping a battery gives the old pack back as a rechargeable with its charge |

## Damage

```lua
Config.Damage = {
    enabled = true,
    hitChance = 0.12, hitDamage = { 8, 25 },
    explosionChance = 0.8, explosionDamage = { 40, 100 },
    fallChance = 0.3, fallDamage = { 5, 20 },
    waterDamagePerTick = 12,
    degradeBelow = 50,
    repairMax = 100,
    allowRepairDestroyed = false,
}
```

| Option | Description |
|---|---|
| `hitChance` / `hitDamage` | Chance that a hit damages each carried radio, and the durability range lost |
| `explosionChance` / `explosionDamage` | Same for explosions |
| `fallChance` / `fallDamage` | Same for falls |
| `waterDamagePerTick` | Durability lost per 10 s underwater for non-submersible radios |
| `degradeBelow` | Below this durability transmissions are degraded |
| `repairMax` | Maximum durability after repair |
| `allowRepairDestroyed` | Allow repairing radios at 0 durability |

## UI

```lua
Config.UI = {
    keepInputWhenOpen = false,
    hud = true,
    hudPosition = 'bottom-right',
    scale = 1.0,
}
```

`keepInputWhenOpen = true` lets players walk with the radio open. `hud` shows a small corner HUD with active radios and TX / RX lamps.

## Animations

```lua
Config.Animations = {
    enabled = true,
    talk = {
        handheld = { dict = 'cellphone@', anim = 'cellphone_call_listen_base', flag = 49, prop = 'prop_cs_hand_radio', bone = 28422, ... },
        shoulder = { dict = 'random@arrests', anim = 'generic_radio_chatter', flag = 49 },
        headset  = { dict = 'random@arrests', anim = 'generic_radio_chatter', flag = 49 },
    },
    inspect = { ... },
    work    = { dict = 'mini@repair', anim = 'fixing_a_ped', flag = 1 },
    skipWhenAiming = true,
    skipInVehicle = true,
}
```

The talk animation is chosen by audio route. `skipWhenAiming` and `skipInVehicle` skip it while aiming or in the driver seat.

## Intercom

```lua
Config.Intercom = {
    enabled = true,
    channels = 3,
    voiceActivation = true,
    voxHangMs = 600,
}
```

Crew intercom channels 1 to `channels`. With `voiceActivation`, talking normally inside the vehicle keys the intercom (VOX).

## Repeaters

```lua
Config.Repeaters = {
    portableModel = 'prop_radiomast02',
    buoyModel = 'prop_dock_bouy_1',
    placeDistance = 4.0,
    drainPerMinute = 0.25,
    fixed = {
        { id = 'tower_chiliad', label = 'Chiliad Tower', coords = vec3(450.6, 5566.4, 795.0), mast = 60.0, range = 9000.0, input = 0, output = 0, network = 'state', groups = { police = 0, ambulance = 0, army = 0 } },
        -- ...
    },
}
```

| Field | Description |
|---|---|
| `portableModel` / `buoyModel` | Props for placed repeaters and relay buoys |
| `placeDistance` | Maximum placement distance |
| `drainPerMinute` | Battery drain of portable repeaters and buoys |
| `fixed` | Always-powered towers. `input` / `output` `0` repeats every frequency the listed `groups` may use (a trunked system), otherwise a specific MHz value |

## Admin and rate limits

```lua
Config.Admin = {
    ace = 'tacradio.admin',
    groups = { admin = 0, god = 0 },
}

Config.RateLimits = {
    default  = { 20, 1 },
    action   = { 12, 1 },
    ptt      = { 8, 1 },
    env      = { 4, 1 },
    damage   = { 6, 1 },
    admin    = { 10, 1 },
}
```

Rate limits are `{ tokens, per seconds }` per event type.

## Bands, nets and default channels

`shared/bands.lua` defines what radios can tune to and who may use which frequencies.

```lua
Bands = {
    { id = 'HF',     group = 'HF',  min = 2.0,    max = 29.999,  step = 0.001,   label = 'HF' },
    { id = 'VHFLO',  group = 'VHF', min = 30.0,   max = 87.975,  step = 0.025,   label = 'VHF-LO (SINCGARS)' },
    -- VHFAIR, VHFHI, UHFMIL, UHF, PMR, DIVER
}

Config.Nets = {
    { id = 'police', label = 'LSPD/BCSO', min = 155.0, max = 155.9875, listen = { police = 0 }, transmit = { police = 0 }, priority = 60 },
    { id = 'guard',  label = 'GUARD (121.5)', min = 121.5, max = 121.5, priority = 100, emergency = true },
    -- ...
}

Config.DefaultChannels = {
    patrol = { { f = 155.000, n = 'DISPATCH' }, { f = 155.100, n = 'TAC-1' }, { f = 155.200, n = 'TAC-2' }, { f = 157.000, n = 'INTEROP' } },
    -- ...
}
```

- A model lists the bands it supports. Two radios can talk when their bands overlap on the frequency in use.
- A net restricts a frequency range. `listen` and `transmit` are `{ group = minimum grade }`; leave them out for public. Frequencies outside every net are public.
- `priority` decides collisions and emergency override; `emergency = true` marks a guard channel.
- `Config.DefaultChannels` are presets pushed into new radios per model.

Nets created in the admin panel are stored in the database and merged with this list.

## Radio models

`shared/models.lua` defines every radio. Key fields:

| Field | Description |
|---|---|
| `cls` | `sr` short range, `lr` long range, `diver`, or `scanner` (receive only) |
| `kind` | `handheld`, `backpack`, `vehicle`, `aircraft`, `diver`, `scanner` |
| `skin` | Faceplate: `prc152`, `prc148`, `rt1523`, `pmr`, `patrol`, `arc210` |
| `bands` | Supported band IDs |
| `range` | Metres at medium power on open, flat ground |
| `power` | Power settings and their range multiplier |
| `antenna` | `stub`, `whip`, `long`, `vehicle` or `mast` |
| `channels` | Number of presets |
| `encryption` / `keySlots` | Can load crypto keys, and how many |
| `battery` / `txDrain` | Standby minutes and extra drain while transmitting |
| `waterproof` | `none`, `splash` or `submersible` |
| `fullDuplex` | Hear others while transmitting |
| `txTimeout` | Seconds before a stuck transmitter is forced off |
| `item` | ox_inventory item (vehicle and aircraft radios have none) |

## Vehicle radios

`shared/vehicles.lua` gives vehicles a built-in radio. The first match wins: a specific model, then the vehicle type (`heli`, `plane`, `boat`, ...), then the vehicle class, then a radio installed with `radio_vehicle_kit`.

```lua
Config.VehicleRadios = {
    models = {
        insurgent = { model = 'rt1523v', seats = { -1, 0, 1 }, intercom = true, intercomSeats = 'all' },
        -- ...
    },
}
```

| Field | Description |
|---|---|
| `model` | Radio model ID from `shared/models.lua` |
| `seats` | Seats that may operate the radio (`-1` driver, `0` front passenger, `1+` rear) or `'all'` |
| `listenSeats` | Who hears the vehicle speaker (default everyone) |
| `intercom` / `intercomSeats` | Crew intercom and who is crew |
| `engineRequired` | Radio is dead while the engine is off |
