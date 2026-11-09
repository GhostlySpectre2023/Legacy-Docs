# TACNET Handheld

A rugged tactical handheld and tablet with blue force tracking, shared markers, routes, messaging, UAV and helmet camera feeds.

## Overview

`tac_handheld` adds two devices to your server: a rugged Android-style **Tactical Handheld** and a **Tactical Tablet** with an F-key row. Players join a shared net and see each other live on a tactical map, place markers, plan routes and message each other. The tablet adds a virtual UAV feed and helmet camera feeds of teammates.

The device's battery, net, PIN, callsign and fireteam are saved on the item itself, so a looted device keeps its net.

## Features

### Devices

- Tactical Handheld with a hardware rail (power, zoom, center, night, back, resize)
- Tactical Tablet with an F-key row, plus UAV and helmet cam feeds
- Compact and large size, switched with one key (`G` by default)
- Features can be enabled per device, for example a GPS-only device

### Blue force tracking

- Live positions of everyone on your net as NATO-style friendly symbols in their fireteam colour
- Members in one vehicle show as a single vehicle symbol with all callsigns
- Friendly vehicle tracking
- Casualty status: OK, WIA (downed) and KIA

### Map

- MAP (dark), DAY and TAC (grid only) modes
- 1 km and 100 m grid with grid numbers, 6-digit grid reference, heading and time
- Grid, distance and bearing for the cursor or a target
- NAV to any unit, marker, route or point, with a nav line and GPS waypoint

### Markers, routes and messaging

- 12 shared, time-stamped marker types, including enemy with direction of travel
- TIC and MEDEVAC markers send a priority alert to the whole net
- Shared routes of up to 30 points, coloured per fireteam
- All-stations and direct messages, unread badges and notifications while closed
- Squad lead: assign fireteams, hand over lead, clear markers

### Tablet feeds

- UAV: launch, retask, change altitude, recall; slew, zoom, DAY / NV / thermal and MARK TGT
- Helmet cam: watch the view of any teammate carrying a helmet camera

### General

- Battery that drains while on, shown as the durability bar, replaced with a battery item
- Night mode (red, NVG-friendly) and brightness
- Important actions are checked on the server
- 14 languages for the whole UI and every notification

## Supported frameworks

| Framework | Detection |
|---|---|
| Qbox | `qbx_core` |
| QBCore | `qb-core` |
| ESX | `es_extended` |

## Dependencies

| Resource | Required |
|---|---|
| `ox_lib` | Yes |
| `ox_inventory` | Yes, item metadata stores battery, serial and saved settings |
| Qbox, QBCore or ESX | Yes |
| OneSync | Yes |

## Version

Current version: **1.0.0**

## Open files

| File | Purpose |
|---|---|
| `config.lua` | All settings |
| `locales/*.lua` | Texts |
| `bridge/*.lua` | Framework and notifications |
| `html/` | The device UI |

`client.lua` and `server.lua` are encrypted with Cfx.re Asset Escrow.
