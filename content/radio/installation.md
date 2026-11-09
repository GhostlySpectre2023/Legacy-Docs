# Installation

Install the Tactical Radio, import the SQL, add the items and switch off the pma-voice radio.

## Requirements

OneSync, `ox_lib`, `oxmysql`, `ox_inventory`, `pma-voice` and Qbox (`qbx_core`) or QBCore. `ox_target` is optional.

## Steps

1. Download `tac_radio` from [portal.cfx.re](https://portal.cfx.re) under **Granted Assets** and place it in your `resources` folder.
2. Import `sql/install.sql` into your database.
3. Add the items from `integrations/ox_inventory_items.lua` to `ox_inventory/data/items.lua`.
4. Copy the 22 icons from `integrations/images/` into `ox_inventory/web/images/`.
5. Add this to your `server.cfg`:

```cfg
setr voice_enableRadios 0        # pma-voice's own radio off; tac_radio does radio
ensure oxmysql
ensure ox_lib
ensure qbx_core                  # or qb-core
ensure pma-voice
ensure ox_inventory
ensure ox_target                 # optional
ensure tac_radio
add_ace group.admin tacradio.admin allow
```

6. Remove or disable any other radio resource that uses pma-voice radio channels.
7. Start the server and run the self-test in the server console:

```bash
tacradio_selftest
```

> [!WARNING]
> If `voice_enableRadios` is still `1`, the console prints a warning on start-up. Both radio systems would then fight over the radio key and voice targets.

## Database

`sql/install.sql` needs MySQL 5.7+ or MariaDB 10.3+ and creates these tables:

| Table | Contents |
|---|---|
| `tac_radio_nets` | Admin-created nets and frequency locks |
| `tac_radio_keys` | Encryption keys, generations and expiry |
| `tac_radio_repeaters` | Placed repeaters and buoys |
| `tac_radio_vehicles` | Radios installed in vehicles, by plate |
| `tac_radio_profiles` | Saved radio profiles per character |
| `tac_radio_logs` | Transmission metadata |
| `tac_radio_audit` | Admin audit trail |

## Items

The item list contains 22 items. All radios and usable equipment use the same client export:

```lua
['radio_prc152'] = {
    label = 'AN/PRC-152 Radio', weight = 1000, stack = false, close = true,
    description = '...',
    client = { export = 'tac_radio.useItem' },
},
```

| Group | Items |
|---|---|
| Short range radios | `radio_prc152`, `radio_prc148`, `radio_police`, `radio_ems`, `radio_civ`, `radio_marine` |
| Long range radios | `radio_backpack` |
| Special | `radio_diver`, `radio_scanner` |
| Power | `radio_battery`, `radio_battery_rechargeable`, `radio_charger` |
| Accessories | `radio_antenna_long`, `radio_headset`, `radio_earpiece`, `radio_shoulder_mic` |
| Tools | `radio_cryptokey`, `radio_programmer`, `radio_repairkit` |
| Infrastructure | `radio_repeater`, `radio_relay_buoy`, `radio_vehicle_kit` |

Copy the full definitions from `integrations/ox_inventory_items.lua`; don't retype them.

> [!WARNING]
> Do not rename the `tac_radio` folder. The item export `tac_radio.useItem` and `exports.tac_radio` use the folder name.

## Admin access

Admins are players with the ACE from `Config.Admin.ace` (`tacradio.admin`) or one of the groups in `Config.Admin.groups` (`admin`, `god`).

## Escrow

Everything not listed as open on the [Overview page](#/radio) is encrypted with Cfx.re Asset Escrow. The NUI in `html/` is never encrypted. Use a recent server artifact and make sure your license key belongs to the Cfx.re account that bought the resource.
