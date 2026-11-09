# Scoreboard

A clean, live scoreboard showing online players, job counters and player IDs above heads for Qbox, QBCore and ESX.

## Overview

`legacy-scoreboard` opens with a single key press (`HOME` by default) and shows everyone on the server with their ID, name, job and ping. Highlighted job counters at the top show at a glance how many police, ambulance, mechanics or any other job you choose are online. While the scoreboard is open, player IDs can be drawn above the heads of nearby players.

All player data is collected on the server and sent to the client only when the scoreboard is opened, with built-in spam protection on the request event.

## Features

- Player list with server ID, character name or FiveM name, job label and ping
- Optional on-duty / off-duty status per player
- Staff badges for admins, based on an ACE permission or framework admin groups
- Configurable job counters with label, icon, colour and an "on duty only" option
- Several jobs can be grouped into one counter
- IDs above heads within a configurable distance, for staff only or for everyone
- Live refresh while the scoreboard is open
- Optional mouse cursor; ESC also closes it
- Players can rebind the key in **Settings > Key Bindings > FiveM**
- English and Dutch locales included

## Supported frameworks

| Framework | Detection |
|---|---|
| Qbox | `qbx_core` (or `legacy_core` on Legacy servers) |
| QBCore | `qb-core` |
| ESX | `es_extended` |
| Standalone | Used when no framework is found: FiveM names, no jobs |

## Dependencies

There are no hard dependencies. A framework is optional but needed for character names, jobs and duty status.

## Version

Current version: **2.0.0**

## Open files

| File | Purpose |
|---|---|
| `config.lua` | All settings |
| `server/bridge.lua` | Framework code: player names, jobs and staff check |
| `locales/*.json` | Texts |
| `html/` | The scoreboard UI |

`client/main.lua` and `server/main.lua` are encrypted with Cfx.re Asset Escrow.
