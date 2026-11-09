# FAQ

Common questions and fixes for the Skydive Altimeter.

## "You lack the entitlement to run this resource"

Your server's license key must belong to the Cfx.re account that bought the asset. Download it again from portal.cfx.re with the right account and use a recent server artifact.

## Using the item does nothing

- **ox_inventory:** check that the item has `client = { export = 'skydive_altimeter.useAltimeter' }` and that the folder is called `skydive_altimeter`.
- **qb-inventory / ESX:** the item must be usable (`useable = true` on QBCore).
- Check that `ensure skydive_altimeter` comes **after** your inventory.

## "You are not trained to use this altimeter."

Your job is not in `Config.Jobs` or `Config.JobTypes`, or your grade is too low. With `Config.RequireDuty = true` you must also be on duty. Set `Config.JobRestriction = false` to let anyone with the item use it.

## No sound

Check `Config.Beeps.enabled` and `Config.Beeps.volume`. The beeps only play while you are on foot and falling, not in a vehicle.

## The needle shows the wrong altitude

`'agl'` measures from the ground under you, `'msl'` from sea level. Pick the mode in `Config.Mode` that fits how your server uses it.

## "No supported framework found" in the console

The resource could not find `qbx_core`, `qb-core` or `es_extended`. Start it after your framework, or set `Config.Framework` by hand.

## The altimeter switched off by itself

That is intended. It turns off when the item is removed from your inventory, when your job changes to one without access, and when your character logs out.

## Job types don't work on ESX

`Config.JobTypes` is for Qbox and QBCore only. On ESX use `Config.Jobs`.
