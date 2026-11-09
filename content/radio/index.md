# Tactical Radio

A TFAR-inspired radio system for FiveM with short and long range radios, vehicle intercom, repeaters, encryption and realistic propagation on pma-voice.

## Overview

`tac_radio` replaces the pma-voice radio with a full radio simulation. Every radio is an ox_inventory item with its own faceplate, frequency bands, channel presets, battery and durability. Signal quality depends on distance, terrain, buildings, elevation, weather and interference, and degraded signals sound like it. Restricted nets limit frequencies to jobs, encryption keys control who can listen in, and repeaters extend range across the map. No TeamSpeak is needed.

## Features

### Radios

- **Short range:** AN/PRC-152, AN/PRC-148 MBITR, police and EMS patrol handhelds, PMR446 walkie-talkie, marine VHF, diver comms and a receive-only wideband scanner
- **Long range:** RT-1523 manpack and vehicle sets, mobile radio, AN/ARC-210 and aviation COM panels
- Faceplates based on real-world reference photos, operated with mouse or keyboard
- Two active radios at once with an additional channel and left / right stereo placement

### Communication

- Push-to-talk per radio class, additional channel PTT and emergency override PTT
- Vehicle radios and crew intercom with PTT and voice activation (VOX)
- Installation kits to add a radio to any vehicle
- Speaker, earpiece and headset audio routes; speaker mode is heard by bystanders
- Scanning with scan lists and a priority channel, squelch and TX power settings

### Frequencies and encryption

- Bands per radio model; radios only talk when their bands overlap
- Restricted nets with listen and transmit permissions per job or gang and grade
- Net priorities, emergency guard channels, frequency locks and collisions
- Encryption keys as access control: fill devices, key generations and rotation, expiry, strength and secure repeaters

### Signal and infrastructure

- Propagation model with terrain volumes, interiors, underground, tunnels, elevation, weather and interference zones
- Fixed towers, portable repeaters and diver relay buoys, linked into networks
- Dead zones with no radio coverage

### Equipment

- Batteries, rechargeable packs and chargers
- Damage from hits, explosions, falls and water, plus repair kits
- Extended antenna, headset, earpiece and shoulder mic
- Radio programmer, profiles and radio cloning

### Administration

- Admin panel with nets, keys, repeaters, logs and audit trail
- Coverage visualisation and signal test commands
- Transmission metadata logs (voice is never recorded)
- Performance counters and a self-test

## Supported frameworks

| Framework | Detection |
|---|---|
| Qbox | `qbx_core` (checked first) |
| QBCore | `qb-core` |

ESX is not supported.

## Dependencies

| Resource | Required |
|---|---|
| OneSync | Yes |
| `ox_lib` | Yes |
| `oxmysql` | Yes |
| `ox_inventory` | Yes |
| `pma-voice` | Yes |
| Qbox or QBCore | Yes |
| `ox_target` | Optional, for repeater, tower and backpack sharing interactions |

## Version

Current version: **1.0.0**

## Open files

The following files stay editable after Cfx.re Asset Escrow:

| File | Purpose |
|---|---|
| `config.lua` | All settings |
| `locales/*.lua` | Texts (English and Dutch) |
| `shared/bands.lua` | Frequency bands, restricted nets and default channels |
| `shared/models.lua` | Radio models |
| `shared/vehicles.lua` | Vehicle radios and intercom |
| `server/bridge.lua` | Framework layer |
| `server/editable.lua` | Server hooks: transmit gate, transmission and admin hooks, Discord webhook |
| `client/editable.lua` | Client hooks: notifications and PTT gate |
| `integrations/*.lua` | ox_inventory items |
| `html/` | Faceplates and HUD |

> [!NOTE]
> In-game encryption is a gameplay access-control mechanic, not real cryptography.
