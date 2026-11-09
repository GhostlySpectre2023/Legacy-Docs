# Installation

Install the Skydive Altimeter and add the `altimeter` item to your inventory.

## Steps

1. Download `skydive_altimeter` from [portal.cfx.re](https://portal.cfx.re) under **Granted Assets**.
2. Place the `skydive_altimeter` folder in your `resources` folder.
3. Add it to your `server.cfg` **after** ox_lib, your framework and your inventory:

```cfg
ensure ox_lib
ensure qbx_core          # or qb-core / es_extended
ensure ox_inventory      # or your inventory
ensure skydive_altimeter
```

4. Copy `install/altimeter.png` into your inventory's image folder:
   - ox_inventory: `ox_inventory/web/images/`
   - qb-inventory: `qb-inventory/html/images/`
5. Add the item (see below).
6. Set your jobs in `config.lua` and restart the server.

> [!WARNING]
> Do not rename the folder. The ox_inventory item export uses the name `skydive_altimeter`.

## Adding the item

### ox_inventory

Add to `ox_inventory/data/items.lua`:

```lua
['altimeter'] = {
    label = 'Altimeter',
    weight = 300,
    stack = false,
    close = true,
    consume = 0,
    description = 'Analog wrist altimeter for parachute jumps',
    client = {
        export = 'skydive_altimeter.useAltimeter',
    },
},
```

### QBCore / qb-inventory

Add to `qb-core/shared/items.lua`:

```lua
altimeter = { name = 'altimeter', label = 'Altimeter', weight = 300, type = 'item', image = 'altimeter.png', unique = true, useable = true, shouldClose = true, description = 'Analog wrist altimeter for parachute jumps' },
```

### ESX default inventory

```sql
INSERT INTO `items` (`name`, `label`, `weight`) VALUES ('altimeter', 'Altimeter', 1);
```

## Testing

Give yourself the item:

```bash
/giveitem [id] altimeter 1
```

Use the item to switch the altimeter on and use it again to switch it off.

> [!NOTE]
> With `Config.JobRestriction = true` (the default), only the jobs in `Config.Jobs` can use the altimeter. Set it to `false` while testing if your own job is not listed.

## Database

None. The altimeter does not use SQL beyond the ESX item insert above.

## Escrow

`client.lua` and `server.lua` are encrypted with Cfx.re Asset Escrow. `config.lua`, `locales/`, `bridge/` and `html/` stay open. Use a recent server artifact and make sure your license key belongs to the Cfx.re account that bought the resource.
