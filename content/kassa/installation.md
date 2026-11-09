# Installation

Install Legacy POS, add the items and set up your first shop.

## Steps

1. Download `legacy_kassa` from [portal.cfx.re](https://portal.cfx.re) under **Granted Assets**.
2. Place the `legacy_kassa` folder in your `resources` folder.
3. Add it to your `server.cfg` **after** your framework, target, inventory and banking scripts:

```cfg
ensure qbx_core          # or qb-core / es_extended
ensure ox_inventory
ensure ox_target         # or qb-target, optional
ensure Renewed-Banking   # or qb-banking / qb-management / esx_addonaccount
ensure legacy_kassa
```

4. Pick a language in `config.lua` (`Locale = 'en'`).
5. In `shops/`, set the job, business account and register coordinates of the example shops, or delete them.
6. Make sure every `item` name used in `menus/` exists in your inventory (see below).
7. Optional: give admins access to every register:

```cfg
add_ace group.admin legacykassa.admin allow
```

8. Restart your server.

> [!WARNING]
> Keep the folder name `legacy_kassa`. Other resources call it as `exports.legacy_kassa`.

## Items

Products only give an item when they have an `item` field. The example menus use items like `espresso`, `latte`, `croissant` and `pizza_margherita`. Ready-made snippets are in `install/`. Skip items your server already has, such as `water`. Item images are not included.

### ox_inventory

Add the entries you need from `install/ox_inventory_items.lua` to `ox_inventory/data/items.lua`:

```lua
['espresso'] = { label = 'Espresso', weight = 250, stack = true, close = true },
['cappuccino'] = { label = 'Cappuccino', weight = 250, stack = true, close = true },
['croissant'] = { label = 'Croissant', weight = 250, stack = true, close = true },
['pizza_margherita'] = { label = 'Pizza Margherita', weight = 500, stack = true, close = true },
```

### QBCore / qb-inventory

Add the entries from `install/qb_items.lua` to `qb-core/shared/items.lua`:

```lua
['espresso'] = { name = 'espresso', label = 'Espresso', weight = 250, type = 'item', image = 'espresso.png', unique = false, useable = false, shouldClose = true, description = '' },
```

### ESX

Run `install/esx_items.sql`:

```sql
INSERT IGNORE INTO `items` (`name`, `label`, `weight`) VALUES
  ('espresso', 'Espresso', 1),
  ('cappuccino', 'Cappuccino', 1),
  ('latte', 'Latte', 1);
```

## Database

None. Stock, open checks, sales and hours are saved per shop in `data/<shop id>.json` inside the resource.

> [!WARNING]
> Keep the `data` folder. Without it the register cannot save anything. When updating, don't overwrite your existing `data/`, `config.lua`, `shops/` or `menus/`.

## Escrow

The core logic is protected with Cfx.re Asset Escrow. Config, shops, menus, both bridges and the item snippets stay open. Make sure your server runs a recent artifact and that its license key belongs to the Cfx.re account that bought the resource.
