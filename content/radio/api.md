# API

Commands, exports and editable hooks of the Tactical Radio.

## Player commands

| Command | Description |
|---|---|
| `/radio` | Open your active short-range radio |
| `/lr` | Open your active long-range radio |
| `/intercom [arg]` | `arg` is a channel number (1 to 3), `off`, or `vox` to toggle voice activation. Without an argument it cycles to the next channel |
| `/radio_uninstall` | Remove the installed radio from your vehicle |

## Admin commands

| Command | Where | Description |
|---|---|---|
| `/radioadmin` | In game | Open the administration panel |
| `/radiocoverage [source] [radius] [step]` | In game | Show coverage. `source` is `sr` (default), `lr` or a repeater ID. Radius 100 to 6000 m (default 1500), step 25 to 500 m (default 100) |
| `/radiosignal <id> [class]` | In game | Signal test between you and another player. `class` is `sr` (default) or `lr` |
| `tacradio_selftest` | Server console | Run the built-in self-test |
| `tacradio_perf` | Server console or admin | Print performance counters |

## Faceplate controls

Using a radio item opens its faceplate. Click keys and knobs with the mouse; the scroll wheel turns knobs.

| Key | Action |
|---|---|
| Digits | Enter digits |
| Enter | ENT |
| Backspace | CLR |
| Arrows | Navigate |
| PgUp / PgDn | Channel up / down |
| + / - | Volume |
| M | Menu |
| F | Frequency |
| C | Cipher |
| S | Scan |
| P | Power |
| I | Info |
| Esc | Close |

Enter frequencies in MHz with a dot (`152.025`) or in kHz without (`152025`).

## Server exports

```lua
-- All radios a player carries
local radios = exports.tac_radio:GetPlayerRadios(source)

-- Is the player transmitting, and on which frequency
local transmitting, freq = exports.tac_radio:IsTransmitting(source)

-- Active frequency of the player's short-range ('sr') or long-range ('lr') radio
local srFreq = exports.tac_radio:GetActiveFrequency(source, 'sr')

-- Players listening on a frequency, as { [serverId] = true }
local listeners = exports.tac_radio:GetListeners(155.100)

-- Stop a player's current transmission
exports.tac_radio:StopTransmission(source, 'cuffed')

-- Lock or unlock a frequency
exports.tac_radio:LockFrequency(155.100, 'Reserved for event')
exports.tac_radio:UnlockFrequency(155.100)

-- Give a player a crypto fill for a key
exports.tac_radio:IssueCryptoKey(source, keyId)
```

Example: stop transmissions when a player is cuffed.

```lua
AddEventHandler('my_police:server:cuffed', function(target)
    local transmitting = exports.tac_radio:IsTransmitting(target)
    if transmitting then
        exports.tac_radio:StopTransmission(target, 'cuffed')
    end
end)
```

## Client exports

### IsRadioTalker

Returns `true` while the given player is heard through the radio. Other voice resources that set submixes on players should skip radio talkers:

```lua
if exports.tac_radio:IsRadioTalker(serverId) then return end
```

### useItem

The ox_inventory export used by every radio item:

```lua
client = { export = 'tac_radio.useItem' },
```

## Server hooks

`server/editable.lua` stays open.

```lua
-- Extra gate before a transmission starts. Return false, 'locale_key' to deny.
-- dev.mid is the model id (prc152, rt1523, ...), kind is 'sr' | 'lr' | 'ic'.
function Editable.canTransmit(src, dev, kind)
    local state = Player(src).state
    if state.isDead or state.isCuffed then return false, 'radio_off' end
    return true
end

-- Discord webhook for emergency transmissions
Editable.webhook = ''   -- 'https://discord.com/api/webhooks/...'

-- Called when a transmission ends.
-- info = { citizenid, serial, freq, kind, encrypted, emergency, seconds, receivers }
function Editable.onTransmissionEnd(src, info) end

-- Called after an admin action from the panel
function Editable.onAdminAction(src, op, args) end
```

By default `onTransmissionEnd` posts emergency transmissions to `Editable.webhook` when it is set. Voice content is never available.

## Client hooks

`client/editable.lua` stays open.

```lua
-- Notifications shown by the radio
function Editable.notify(msg, kind)
    lib.notify({ title = 'Radio', description = msg, type = kind or 'inform' })
end

-- Return false to block push-to-talk (dead, cuffed, in a minigame, ...)
function Config.CanTransmit()
    local ped = PlayerPedId()
    if IsPedDeadOrDying(ped, true) then return false end
    if LocalPlayer.state.isDead or LocalPlayer.state.isCuffed then return false end
    if LocalPlayer.state.invBusy then return false end
    return true
end
```

## Framework bridge

`server/bridge.lua` is the only framework-specific file. It provides the player's identifier, name and groups (`{ [group] = grade }` for job, gang and every Qbox group), notifications, and player loaded and job update hooks.
