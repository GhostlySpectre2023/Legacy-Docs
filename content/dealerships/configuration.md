# Configuration

A walk through `config/config.lua`, the trucking config and the open hook files.

## Config files

| File | Purpose |
|---|---|
| `config/config.lua` | Main settings (shared) |
| `config/config-trucking.lua` | Trucking mission for stock deliveries |
| `config/config-cl.lua` | Client events and hooks |
| `config/config-sv.lua` | Server events and hooks |
| `server/sv-webhooks.lua` | Discord webhook URLs |

## Localisation

```lua
Config.Locale = "en"
Config.NumberAndDateFormat = "en-US"
Config.Currency = "$%s"
Config.SpeedUnit = "kph"
Config.DistanceUnit = "km"
```

| Option | Description |
|---|---|
| `Config.Locale` | Language from `locales/`: `ar`, `cn`, `cs`, `de`, `en`, `es`, `fr`, `hu`, `it`, `ja`, `lt`, `nl`, `no`, `pl`, `pt`, `sv`, `tr` |
| `Config.NumberAndDateFormat` | Locale used to format numbers and dates in the UI, for example `nl-NL` |
| `Config.Currency` | Currency format, `%s` is the amount. `"$%s"` shows `$1,000`, `"%s coins"` shows `1,000 coins` |
| `Config.SpeedUnit` | Speed unit for vehicle stats |
| `Config.DistanceUnit` | Distance unit |

## Framework and integrations

```lua
Config.Framework = "auto" -- or "QBCore", "Qbox", "ESX"
Config.FuelSystem = "none"
Config.VehicleKeys = "qb-vehiclekeys"
Config.Notifications = "auto" -- or "default", "okokNotify", "ox_lib", "ps-ui"
```

| Option | Values |
|---|---|
| `Config.Framework` | `auto`, `QBCore`, `Qbox`, `ESX` |
| `Config.FuelSystem` | `LegacyFuel`, `ps-fuel`, `lj-fuel`, `ox_fuel`, `cdn-fuel`, `hyon_gas_station`, `okokGasStation`, `nd_fuel`, `myFuel`, `ti_fuel`, `Renewed-Fuel`, `rcore_fuel`, `qs-fuelstations`, `none` |
| `Config.VehicleKeys` | `qb-vehiclekeys`, `MrNewbVehicleKeys`, `jaksam-vehicles-keys`, `qs-vehiclekeys`, `mk_vehiclekeys`, `wasabi_carlock`, `cd_garage`, `okokGarage`, `t1ger_keys`, `Renewed`, `tgiann-hotwire`, `none` |
| `Config.Notifications` | `auto`, `default`, `okokNotify`, `ox_lib`, `ps-ui` |

> [!WARNING]
> The default for `Config.VehicleKeys` is `qb-vehiclekeys`. Change it to your keys resource, or to `none`, if you don't run qb-vehiclekeys.

## Interactions

```lua
Config.InteractionMethod = "textui" -- or "textui", "target", "3dtextui", "radial"
Config.DrawText = "auto" -- or "jg-textui", "qb-DrawText", "okokTextUI", "ox_lib", "ps-ui"
Config.Target = "auto" -- or "ox_target"
Config.DrawText3d = "auto" -- or "sleepless_interact"
Config.RadialMenu = "auto" -- or "ox_lib"
```

| Option | Description |
|---|---|
| `Config.InteractionMethod` | How players interact with dealership points: `textui`, `target`, `3dtextui` or `radial` |
| `Config.DrawText` | Text UI resource when using `textui` |
| `Config.Target` | Target resource when using `target` |
| `Config.DrawText3d` | 3D text resource when using `3dtextui` |
| `Config.RadialMenu` | Radial menu resource when using `radial` |

## Framework jobs

```lua
Config.UseFrameworkJobs = true
```

When `true`, dealership employees come from your framework's job system and job grades are mapped to permissions. When `false`, the built-in employee system and `Config.EmployeePermissions` are used.

## Text UI prompts

```lua
Config.OpenShowroomPrompt = "[E] Open Showroom"
Config.OpenShowroomKeyBind = 38
Config.ViewInShowroomPrompt = "[E] View in Showroom"
Config.ViewInShowroomKeyBind = 38
Config.OpenManagementPrompt = "[E] Dealership Management"
Config.OpenManagementKeyBind = 38
Config.SellVehiclePrompt = "[E] Sell Vehicle"
Config.SellVehicleKeyBind = 38
```

The prompt text and the control ID for each interaction. `38` is the `E` key.

## Vehicle spawning

```lua
Config.SpawnVehiclesWithServerSetter = false
```

When `true`, vehicles are created on the server instead of the client. Leave this `false` unless you know you need it; it can be less reliable on busy servers.

## Finance

```lua
Config.FinancePayments = 12
Config.FinanceDownPayment = 0.1 -- 0.1 means 10%
Config.FinanceInterest = 0.1 -- 0.1 means 10%
Config.FinancePaymentInterval = 12 -- in hours
Config.FinancePaymentFailedHoursUntilRepo = 1 -- in hours
Config.MaxFinancedVehiclesPerPlayer = 5
Config.FinanceProcessOfflinePlayers = true
```

| Option | Description |
|---|---|
| `Config.FinancePayments` | Number of payments |
| `Config.FinanceDownPayment` | Down payment as a fraction of the price (`0.1` = 10%) |
| `Config.FinanceInterest` | Interest as a fraction (`0.1` = 10%) |
| `Config.FinancePaymentInterval` | Hours between payments |
| `Config.FinancePaymentFailedHoursUntilRepo` | Hours after a failed payment before the vehicle is repossessed |
| `Config.MaxFinancedVehiclesPerPlayer` | Maximum number of financed vehicles per player |
| `Config.FinanceProcessOfflinePlayers` | Take payments from the bank of offline players in the database |

> [!NOTE]
> Finance is switched on or off per dealership in the admin panel. These options only control how finance works.

## Vehicle images, plates and stats

```lua
Config.ShowVehicleImages = true
Config.PlateFormat = "1AA111AA"
Config.HideVehicleStats = false
```

`Config.PlateFormat` is a pattern for new plates: `1` becomes a random digit, `A` a random letter, `^` makes the next character literal, and any other character is kept as is. For example `"LS^A111"` gives `LSA` followed by three random digits.

## Test drives

```lua
Config.TestDrivePlate = "TEST1111"
Config.TestDriveTimeSeconds = 120
Config.TestDriveNotInBucket = false
Config.DealershipMaxActiveTestDrives = 5
```

| Option | Description |
|---|---|
| `Config.TestDrivePlate` | Plate pattern for test drive vehicles (same rules as `PlateFormat`) |
| `Config.TestDriveTimeSeconds` | Test drive length in seconds |
| `Config.TestDriveNotInBucket` | `true` = test drive in the normal world so everyone can see it. By default the player is placed in a private routing bucket |
| `Config.DealershipMaxActiveTestDrives` | Maximum simultaneous direct test drives per dealership |

## Display vehicles

```lua
Config.DisplayVehiclesPlate = "DEALER"
Config.DisplayVehiclesHidePurchasePrompt = false
```

Plate used on showroom display vehicles, and whether to hide the purchase prompt on them.

## Stock purchases

```lua
Config.TruckingMissionForOrderDeliveries = true
Config.DealerPurchasePrice = 0.8 -- 0.8 = Dealers pay 80% of vehicle price
Config.VehicleOrderTime = 1 -- in mins
Config.ManagerCanChangePriceOfVehicles = true
```

| Option | Description |
|---|---|
| `Config.TruckingMissionForOrderDeliveries` | Orders must be delivered by an employee with a trucking mission |
| `Config.DealerPurchasePrice` | Fraction of the vehicle price an owned dealership pays for stock |
| `Config.VehicleOrderTime` | Minutes until an order is ready |
| `Config.ManagerCanChangePriceOfVehicles` | Managers may change vehicle prices in their dealership |

## Blips and categories

```lua
Config.BlipNameFormat = "Dealership: %s"

Config.Categories = {
  planes = "Planes",
  sportsclassics = "Sports Classics",
  sedans = "Sedans",
  -- ...
}
```

`%s` in the blip name is replaced by the dealership name. `Config.Categories` maps category IDs to the labels shown in the showroom.

## Employee permissions

Only used when `Config.UseFrameworkJobs = false`. With framework jobs you map job grades to the same permissions in the admin panel.

```lua
Config.EmployeePermissions = {
  ["Manager"] = {
    "ADMIN", -- Full access
  },
  ["Supervisor"] = {
    "MANAGE_INVENTORY",
    "VIEW_RECORDS",
    "SELL",
    "DELIVER",
  },
  ["Sales"] = {
    "SELL",
    "VIEW_RECORDS",
    "DELIVER",
  },
}
```

| Permission | Allows |
|---|---|
| `ADMIN` | Everything (owners and server admins always have this) |
| `MANAGE_EMPLOYEES` | Hire and fire employees, change roles |
| `MANAGE_INVENTORY` | Order vehicles, manage stock and display vehicles, set prices |
| `MANAGE_FINANCES` | Deposit and withdraw from the dealership balance, change commission and label |
| `SELL` | Direct sales and test drives |
| `DELIVER` | Deliver trucking orders |
| `VIEW_RECORDS` | View sales and order history |

## Commands

```lua
Config.MyFinanceCommand = "myfinance"
Config.DirectSaleCommand = "directsale"
Config.DealerAdminCommand = "dealeradmin"
```

Rename the player and admin commands. See the [API page](#/dealerships/api) for what each command does.

## Advanced options

```lua
Config.EntityStreamingDistance = 100.0
Config.RemoveGeneratorsAroundDealership = true
Config.AutoRunSQL = true
Config.ReturnToPreviousRoutingBucket = false
Config.HideWatermark = false
Config.Debug = true
```

| Option | Description |
|---|---|
| `Config.EntityStreamingDistance` | Distance in metres at which display vehicles and peds spawn and despawn |
| `Config.RemoveGeneratorsAroundDealership` | Removes ambient parked cars around dealerships |
| `Config.AutoRunSQL` | Run the install SQL on every start |
| `Config.ReturnToPreviousRoutingBucket` | Return the player to their previous routing bucket after the showroom or a test drive, instead of bucket 0 |
| `Config.HideWatermark` | Hide the watermark in the UI |
| `Config.Debug` | Print debug messages to the console |

> [!TIP]
> `Config.Debug` is `true` in the default config. Set it to `false` on a live server to keep your console clean.

## Trucking mission

`config/config-trucking.lua` controls the stock delivery mission.

```lua
TruckingConfig.TruckModel = "hauler"
TruckingConfig.TrailerSmallVehicle = "DYNAMIC_TR2"
TruckingConfig.TrailerLargeVehicle = "docktrailer"

TruckingConfig.TruckProperties = {
  -- colour = "#FF5733"
}

TruckingConfig.TrailerAttachment = {
  maxDistance = 3.0,
  maxAngle = 45.0,
  requireFront = true
}
```

| Option | Description |
|---|---|
| `TruckModel` | Truck cab that is spawned |
| `TrailerSmallVehicle` | Trailer for smaller vehicles |
| `TrailerLargeVehicle` | Trailer for large vehicles |
| `TruckProperties` / `CargoProperties` | Optional vehicle properties such as `colour` |
| `Markers` | Marker type, size and colour for the spawn, pickup and drop-off points |
| `TrailerAttachment` | Maximum distance and angle to attach the trailer, and whether you must be at its front |
| `Blips` | Blip sprite and colour for each mission point |

## Webhooks

Set your Discord webhook URLs in `server/sv-webhooks.lua`. Leave a value empty to disable it.

```lua
Webhooks.TestDrive = ""
Webhooks.Purchase = ""
Webhooks.Finance = ""
Webhooks.Dealership = ""
Webhooks.Admin = ""
```

## Hooks

The open files `config/config-cl.lua` and `config/config-sv.lua` contain events and functions you can fill in. See the [API page](#/dealerships/api) for the full list.
