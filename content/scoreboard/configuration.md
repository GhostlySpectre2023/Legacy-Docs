# Configuration

Every option in `config.lua`, explained.

## General

```lua
Config.Locale     = 'nl'                -- locales/<name>.json: nl | en
Config.Framework  = 'auto'              -- auto | qbx | qb | esx | standalone
Config.KeyBind    = 'HOME'              -- default key, players can change it in Settings > Key Bindings
Config.ServerName = 'Legacy Roleplay'

Config.EnableCursor    = false          -- true: mouse cursor while open (ESC also closes)
Config.RefreshInterval = 3000           -- ms between live updates while open, 0 = off
```

| Option | Default | Description |
|---|---|---|
| `Config.Locale` | `'nl'` | Language file from `locales/`. Included: `nl`, `en` |
| `Config.Framework` | `'auto'` | `auto` detects Qbox, QBCore or ESX. Set `qbx`, `qb`, `esx` or `standalone` to force one |
| `Config.KeyBind` | `'HOME'` | Default key. Players can rebind it in their FiveM key bindings |
| `Config.ServerName` | `'Legacy Roleplay'` | Server name shown in the scoreboard header |
| `Config.EnableCursor` | `false` | Show the mouse cursor while open |
| `Config.RefreshInterval` | `3000` | Milliseconds between live updates while open. `0` disables live updates |

> [!NOTE]
> `Config.KeyBind` is only the default. Once a player has the key mapping saved, changing this value does not change their existing binding.

## IDs above heads

```lua
Config.ShowIdsAboveHeads = true         -- staff only, unless ShowIdsToEveryone is true
Config.ShowIdsToEveryone = true
Config.IdDrawDistance    = 25.0         -- metres
```

| Option | Default | Description |
|---|---|---|
| `Config.ShowIdsAboveHeads` | `true` | Draw `ID: <server id>` above nearby players while the scoreboard is open |
| `Config.ShowIdsToEveryone` | `true` | `true` = everyone sees the IDs, `false` = staff only |
| `Config.IdDrawDistance` | `25.0` | Maximum distance in metres |

## Player list

```lua
Config.ShowPlayers             = true
Config.UseCharacterNames       = true   -- true: character name, false: FiveM name
Config.ShowPlayerIds           = true
Config.ShowPing                = true
Config.ShowPlayerJob           = true
Config.ShowPlayerJobDutyStatus = false
Config.ShowAdminBadges         = true
Config.StaffAce                = 'command' -- ace that marks someone as staff
```

| Option | Default | Description |
|---|---|---|
| `Config.ShowPlayers` | `true` | Show the player list. Set `false` to only show the counters |
| `Config.UseCharacterNames` | `true` | Character name from the framework, or the FiveM name when `false` |
| `Config.ShowPlayerIds` | `true` | Show the server ID column |
| `Config.ShowPing` | `true` | Show each player's ping |
| `Config.ShowPlayerJob` | `true` | Show the job label |
| `Config.ShowPlayerJobDutyStatus` | `false` | Show on duty / off duty next to the job |
| `Config.ShowAdminBadges` | `true` | Show a staff badge next to staff members |
| `Config.StaffAce` | `'command'` | ACE permission that marks a player as staff |

Players who are still in character selection are shown with their FiveM name and no job.

## Job counters

```lua
-- icon: shield | heart-pulse | wrench | car | flame | gavel | taxi | briefcase | star | user
Config.ShowHighlightedJobs = true
Config.HighlightedJobs = {
    { jobs = { 'police' },    label = 'Politie',    icon = 'shield',      color = '#3b82f6', countOnDutyOnly = false },
    { jobs = { 'ambulance' }, label = 'Ambulance',  icon = 'heart-pulse', color = '#4ade80', countOnDutyOnly = false },
    { jobs = { 'mechanic' },  label = 'Monteurs',   icon = 'wrench',      color = '#fb923c', countOnDutyOnly = false },
    { jobs = { 'cardealer' }, label = 'Autodealers', icon = 'car',        color = '#a970ff', countOnDutyOnly = false },
}
```

Each entry is one counter at the top of the scoreboard:

| Field | Description |
|---|---|
| `jobs` | List of job names that count towards this counter. Several jobs can share one counter |
| `label` | Text shown on the counter |
| `icon` | One of `shield`, `heart-pulse`, `wrench`, `car`, `flame`, `gavel`, `taxi`, `briefcase`, `star`, `user` |
| `color` | Hex colour of the counter |
| `countOnDutyOnly` | `true` = only players who are on duty are counted |

Example: one counter for all police-type jobs.

```lua
{ jobs = { 'police', 'sheriff', 'state' }, label = 'Police', icon = 'shield', color = '#3b82f6', countOnDutyOnly = true },
```

## Locales

Texts live in `locales/en.json` and `locales/nl.json`. To add a language, copy `en.json`, translate the values and set `Config.Locale` to the new file name.

```json
{
  "keymap": "Open scoreboard",
  "eyebrow": "Scoreboard",
  "players": "players",
  "online": "Players online",
  "you": "You",
  "staff": "Staff",
  "onDuty": "on duty",
  "offDuty": "off duty",
  "unemployed": "Unemployed",
  "noPlayers": "No other players online.",
  "close": "to close",
  "live": "Live"
}
```

## Supporting another framework

All framework code is in `server/bridge.lua`, which stays open. It exposes two functions used by the scoreboard:

- `Bridge.GetPlayer(src)` returns `{ name, jobName, jobLabel, jobOnDuty }`
- `Bridge.IsStaff(src)` returns `true` or `false`

Edit only this file to support a custom framework.
