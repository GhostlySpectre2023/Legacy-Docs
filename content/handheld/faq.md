# FAQ

Common questions and fixes for the TACNET handheld and tablet.

## The map is a grid with "NO IMAGERY"

No tiles were found. Install the map tiles as described on the [Installation page](#/handheld/installation) and check that the folder is `html/tiles/styleGrid/{z}/{x}/{y}.jpg`.

## Nothing happens when I use the item

Check that the folder is named `tac_handheld` and that the item uses `client = { export = 'tac_handheld.useDevice' }`. The device item name must also be a key in `Config.Devices`.

## "No supported framework found" in the console

The resource started before your framework. Move `ensure tac_handheld` below your framework, or set `Config.Framework`.

## The resource won't start: ox_inventory is missing

ox_inventory is a hard dependency on every framework, because battery, serial and saved settings are stored in item metadata. qb-inventory and the ESX inventory are not supported.

## The device is too big or too small

Change `scale` and `scaleLarge` per device in `Config.Devices`. `1.0` is full size on a 1080p screen and scales with the resolution.

## My teammates don't see me

You both need to be on the **same net** with the device **on**. ESC keeps it on and on screen; pressing the power button twice turns it off.

## The helmet cam says NO SIGNAL

The wearer is too far away (not streamed in) or doesn't carry a `helmet_cam`. The feed works up to `Config.HelmetCam.maxDistance`, default 400 m.

## Why does the UAV work at any distance but the helmet cam doesn't?

FiveM can't put live video in a web page, so feeds use a scripted game camera. The UAV is virtual: every client calculates the same orbit from the server state, so it works anywhere. The helmet cam is attached to the wearer, so the wearer must be streamed in for you.

## I can't launch a UAV

You need a tablet and, unless `Config.UAV.item = false`, a `uav_drone` in your inventory.

## The device won't turn on

The battery is empty. Use a `handheld_battery` item to charge it to 100%.

## The battery drains too fast

Lower `Config.Battery.drainPerMinute`, or set `Config.Battery.enabled = false`.

## "You lack the entitlement to run this resource"

Your server license key must belong to the Cfx.re account that bought the asset. Download it again from portal.cfx.re with the right account and use a recent server artifact.
