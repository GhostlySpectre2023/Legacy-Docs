# FAQ

Common questions and fixes for the Tactical Radio.

## The console warns that pma-voice radios are still enabled

Add `setr voice_enableRadios 0` to your `server.cfg`. Otherwise pma-voice's own radio and tac_radio fight over the radio key and voice targets.

## Nobody hears me on the radio

- Both radios must support a band that covers the frequency. A PMR walkie and a PRC-152 share no bands.
- On a restricted net you need the right job or gang and grade for `transmit` (and the receiver for `listen`). With `Config.RequireOnDuty = true` you must also be on duty.
- If the transmission is encrypted, receivers without the key get noise.
- The receiver may be out of range. Try `/radiosignal <id>` as an admin to see the distance, range and quality.

## I get a busy tone when I press PTT

Someone else is transmitting on that frequency and `Config.Transmit.collisionMode` is `'block'`. Wait for them to finish, or set it to `'collide'`.

## Voice stutters or radio effects disappear

Another resource is overwriting submixes. Make it skip radio talkers with `exports.tac_radio:IsRadioTalker(serverId)`. Only as a last resort set `Config.Voice.reassertMs = 500`, because periodic re-sends can cause stutter.

## Radio range is very short indoors or underground

That is the propagation model. Interiors, underground and tunnels multiply the effective range by the values in `Config.Propagation.environment`. Use a repeater or adjust the values.

## PTT doesn't work while dead or cuffed

Intended. `Config.CanTransmit` in `client/editable.lua` and `Editable.canTransmit` in `server/editable.lua` block it. Edit them to match the state bag names your server uses.

## /radioadmin says no permission

Add the ACE, or give the player one of the groups in `Config.Admin.groups`:

```cfg
add_ace group.admin tacradio.admin allow
```

## The resource won't start

Check that OneSync, `ox_lib`, `oxmysql`, `ox_inventory` and `pma-voice` are all started before `tac_radio`, and that `sql/install.sql` has been imported. Then run `tacradio_selftest` in the server console.

## Using a radio item does nothing

The item must have `client = { export = 'tac_radio.useItem' }` and the folder must be named `tac_radio`.

## Does it work with ESX?

No. The bridge supports Qbox and QBCore.

## My radio stopped working after swimming

Radios that are not `submersible` take water damage. `splash` radios only take damage when fully submerged. Repair them with a `radio_repairkit`.

## The charger doesn't charge

With `Config.Battery.chargerRequiresPower = true` the charger only works in a running vehicle or inside an interior.
