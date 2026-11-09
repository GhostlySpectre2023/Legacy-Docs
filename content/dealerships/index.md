# Dealerships

A complete vehicle dealership system with showrooms, finance, test drives, stock orders and player-owned dealership management.

## Overview

`legacy-dealerships` turns any location into a working dealership. Players browse vehicles in a showroom, buy them with cash or bank, finance them over several payments or take a test drive. Owned dealerships are run by players: managers order stock, set prices, hire employees, sell directly to customers and manage the dealership balance. Stock orders can be delivered by an employee with a trucking mission.

Dealership locations are created and edited in-game through the admin panel (`/dealeradmin`), so there is no long list of coordinates in the config.

## Features

- Showroom with camera, vehicle categories, colour selection and vehicle stats
- Self-service and owned dealership types
- Purchases with cash or bank, for personal use or for a society (job or gang)
- Vehicle finance with down payment, interest, payment interval and repossession
- Finance payments processed for offline players (optional)
- Test drives in a private routing bucket with a time limit and a per-dealership limit
- Display vehicles in the showroom with an optional purchase prompt
- Player-owned dealerships: employees, roles, commission, balance, sales history and order history
- Stock ordering at a configurable dealer price, delivered after a timer or through a trucking mission
- Direct sales from employees to customers with a sales tablet
- Coupons with percent or fixed discounts, usage limits, expiry and vehicle or category restrictions
- Sell your vehicle back to a dealership
- Custom currencies (for example VIP coins) through an export
- Discord webhooks for test drives, purchases, finance, dealerships and admin actions
- Admin panel with location editor and import tools for default locations and framework vehicles
- 17 languages included

## Supported frameworks

| Framework | Detection |
|---|---|
| Qbox | `qbx_core` (or `legacy_core` on Legacy servers) |
| QBCore | `qb-core` |
| ESX | `es_extended` |

There is no standalone mode. If none of these is started and `Config.Framework` is `auto`, the resource stops with an error.

## Integrations

| Type | Supported |
|---|---|
| Fuel | LegacyFuel, ps-fuel, lj-fuel, ox_fuel, cdn-fuel, hyon_gas_station, okokGasStation, nd_fuel, myFuel, ti_fuel, Renewed-Fuel, rcore_fuel, qs-fuelstations |
| Vehicle keys | qb-vehiclekeys, MrNewbVehicleKeys, jaksam-vehicles-keys, qs-vehiclekeys, mk_vehiclekeys, wasabi_carlock, cd_garage, okokGarage, t1ger_keys, Renewed, tgiann-hotwire |
| Notifications | default, okokNotify, ox_lib, ps-ui |
| Interaction | text UI, target (ox_target), 3D text UI (sleepless_interact), radial menu (ox_lib) |
| Text UI | jg-textui, qb-DrawText, okokTextUI, ox_lib, ps-ui |

## Dependencies

| Resource | Required |
|---|---|
| `oxmysql` | Yes |
| `ox_lib` | Yes |
| OneSync | Yes |
| Server artifact `7290` or newer | Yes |
| A supported framework | Yes |

## Version

Current version: **2.2.1**

## Open files

The following files stay readable after Cfx.re Asset Escrow:

- `config/` (all config files)
- `framework/` (framework bridge and currencies)
- `shared/`
- `locales/`
- `client/cl-locations.lua`, `client/cl-purchase.lua`
- `server/sv-webhooks.lua`, `server/sv-purchase.lua`, `server/sv-commands.lua`, `server/sv-import-default-locations.lua`
- `web/` (the UI is never encrypted)
