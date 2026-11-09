# Skydive Altimeter

A realistic analog skydiving altimeter with an audible alarm, equipped from your inventory.

## Overview

`skydive_altimeter` shows a live analog dial with your altitude during every jump. Use the item to switch it on and a wrist altimeter appears on screen. While you descend on foot it beeps at break-off, deploy and hard deck, just like a real audible altimeter. Access can be limited to specific jobs, grades and job types, and every check runs on the server.

## Features

- Analog dial in thousands of feet: the needle makes one turn every 12,000 ft, the outer ring reads 0 to 11 and the inner ring 12 to 23
- Red and black zones mark the deployment and danger range
- Audible alarm while descending, with configurable altitudes, number of beeps and volume
- Height above ground (zeroed at the dropzone) or above sea level
- Job restriction: minimum grade per job, whole job types and an optional duty requirement
- Server-side check of job, grade, duty and item ownership
- Turns off automatically when the item is removed or the job changes
- Hides in the pause menu; six screen positions and adjustable scale
- 14 languages included

## Supported frameworks

| Framework | Detection |
|---|---|
| Qbox | `qbx_core` |
| QBCore | `qb-core` |
| ESX | `es_extended` |

## Supported inventories

| Inventory | How the item is used |
|---|---|
| ox_inventory | Client export `skydive_altimeter.useAltimeter` on the item |
| qb-inventory | Usable item registered through QBCore |
| ESX default inventory | Usable item registered through ESX |

## Dependencies

| Resource | Required |
|---|---|
| `ox_lib` | Yes |
| Qbox, QBCore or ESX | Yes |
| ox_inventory, qb-inventory or the ESX inventory | Yes (one) |

## Version

Current version: **1.0.0**

## Open files

| File | Purpose |
|---|---|
| `config.lua` | All settings |
| `locales/*.lua` | Texts |
| `bridge/*.lua` | Framework and inventory bridge |
| `html/` | The dial UI |

`client.lua` and `server.lua` are encrypted with Cfx.re Asset Escrow.
