# API

Exports and events provided by the Skydive Altimeter.

## Client exports

### useAltimeter

Toggles the altimeter on or off. The server access check (job, grade, duty and item) still runs.

```lua
exports.skydive_altimeter:useAltimeter()
```

This is the export used by the ox_inventory item:

```lua
client = {
    export = 'skydive_altimeter.useAltimeter',
},
```

## Client events

### skydive_altimeter:toggle

Toggles the altimeter on the client. The server triggers it after a successful item use on qb-inventory and ESX.

```lua
TriggerClientEvent('skydive_altimeter:toggle', source)
```

> [!NOTE]
> Both the export and the event run the same toggle. When switching on, the client always asks the server through `skydive_altimeter:canUse` first, so neither can bypass the job and item check.

## Callbacks

| Callback | Side | Returns |
|---|---|---|
| `skydive_altimeter:canUse` | Server (ox_lib) | `true`, or `false` and a locale key |

```lua
local ok, reason = lib.callback.await('skydive_altimeter:canUse', false)
```
