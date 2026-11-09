# FAQ

Common questions and fixes for Legacy Dealerships.

## The resource stops with "You need to set the Config.Framework..."

No supported framework was started when the resource loaded. Make sure `ensure legacy-dealerships` is below your framework in `server.cfg`, or set `Config.Framework` to `"Qbox"`, `"QBCore"` or `"ESX"`. Note that these values are case sensitive.

## I see an [SQL ERROR] in the console on start-up

The automatic SQL could not run. Import `install/run-qb.sql` (Qbox / QBCore) or `install/run-esx.sql` (ESX) by hand. If the tables already exist and the message keeps appearing, set `Config.AutoRunSQL = false`.

## The resource won't start: missing dependency or server version

The manifest requires `oxmysql`, `ox_lib`, OneSync and server build `7290` or newer. Start the two libraries before this resource, enable OneSync, and update your server artifact.

## /dealeradmin says I don't have permission

Admin access is checked with the `command` ACE:

```cfg
add_ace group.admin command allow
add_principal identifier.license:xxxxxxxx group.admin
```

## There are no dealerships in game

Dealerships are stored in the database, not in the config. Open `/dealeradmin` and create one, or import the default locations from the admin panel.

## Players don't get keys after buying

Set `Config.VehicleKeys` to the keys resource you use. The default is `qb-vehiclekeys`. Use `"none"` if you don't use a keys script.

## Vehicles have no fuel after spawning

Set `Config.FuelSystem` to your fuel resource. With `"none"` no fuel resource is called.

## Finance and test drives are missing at a dealership

These are enabled per dealership in the admin panel. The config only controls the finance terms and test drive length.

## Vehicle properties don't apply / spawned vehicles are unreliable

If you turned on `Config.SpawnVehiclesWithServerSetter`, set it back to `false`. Server-spawned vehicles can be less reliable on busy servers.

## The console is full of debug messages

`Config.Debug` is `true` in the default config. Set it to `false`.

## The texts are in the wrong language

Set `Config.Locale` to one of the files in `locales/`, for example `"nl"`. Number and date formatting is set separately with `Config.NumberAndDateFormat`, for example `"nl-NL"`.
