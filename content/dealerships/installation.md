# Installation

Step by step installation of Legacy Dealerships, including the database and your first dealership.

## Requirements

- OneSync enabled
- Server artifact `7290` or newer
- `oxmysql` and `ox_lib`
- Qbox, QBCore or ESX

## Steps

1. Download `legacy-dealerships` from [portal.cfx.re](https://portal.cfx.re) under **Granted Assets**.
2. Place the `legacy-dealerships` folder in your `resources` folder.
3. Add it to your `server.cfg` **after** its dependencies, your framework and your fuel, keys and target scripts:

```cfg
ensure oxmysql
ensure ox_lib
ensure qbx_core            # or qb-core / es_extended
ensure ox_target           # if you use Config.InteractionMethod = "target"
ensure legacy-dealerships
```

4. Open `config/config.lua` and set `Config.FuelSystem`, `Config.VehicleKeys` and `Config.InteractionMethod` for your server.
5. Start the server. The database tables are created automatically (see below).
6. Join the server as an admin and run `/dealeradmin` to create your dealerships.

## Database

With `Config.AutoRunSQL = true` (the default) the resource runs the SQL for your framework on every start. All statements use `CREATE TABLE IF NOT EXISTS` and `ADD COLUMN IF NOT EXISTS`, so this is safe to leave on.

If the automatic run fails, the console shows an `[SQL ERROR]` message. Run the file for your framework by hand:

| Framework | File |
|---|---|
| Qbox / QBCore | `install/run-qb.sql` |
| ESX | `install/run-esx.sql` |

The SQL adds a `financed` and `finance_data` column to your vehicles table (`player_vehicles` on Qbox / QBCore, `owned_vehicles` on ESX) and creates these tables:

| Table | Contents |
|---|---|
| `dealership_locations` | Dealership settings, zones and coordinates |
| `dealership_vehicles` | Vehicle catalogue with prices and stock limits |
| `dealership_stock` | Stock and price per dealership |
| `dealership_dispveh` | Display vehicles in showrooms |
| `dealership_orders` | Stock orders and deliveries |
| `dealership_sales` | Sales history |
| `dealership_employees` | Employees of owned dealerships |
| `dealership_coupons` | Coupons |
| `dealership_coupon_usage` | Coupon usage per player |

> [!TIP]
> After the tables exist and you no longer want the SQL to run at every start, set `Config.AutoRunSQL = false`.

## Upgrading from v1

If you used version 1 before, run the migration once from the server console or as an admin:

```bash
migratev2
```

This runs `install/migration-v2.sql` and converts your old display vehicle data. The admin panel also offers an import for old v1 locations.

## Setting up dealerships

1. Run `/dealeradmin` in game (you need the `command` ACE).
2. Create a dealership, or use the import tools to load the default locations.
3. Import vehicles from your framework's shared vehicle data, or add them by hand.
4. Set the showroom, management, purchase spawn, test drive and sell points for each dealership.

> [!NOTE]
> Finance, test drives and selling vehicles are enabled per dealership in the admin panel, not in the config.

## Escrow

The resource is protected with Cfx.re Asset Escrow. Config files, the framework bridge, locales, webhooks and several hook files stay open. Your server license key must belong to the Cfx.re account that bought the resource.
