# FAQ

Common questions and fixes for Legacy POS.

## "You cannot use this register"

Your job is not in the shop's `access.jobs`, or your grade is below the minimum. With `access.requireDuty = true` you must also be on duty.

## Money does not reach the business account

No supported account script was found, and the server console says so. On Qbox / QBCore the bridge looks for Renewed-Banking, qb-banking or qb-management (in that order). On ESX it uses esx_addonaccount with the account `society_<society>`, which must exist. To use another banking script, edit `Bridge.AddSociety` in `server/bridge.lua`.

## Amounts are rounded on ESX

ESX rounds money to whole numbers. Set `Currency = { symbol = '$', decimals = 0 }` so the totals on screen match what is taken.

## Nothing happens at the register

- Check `Interaction` in `config.lua`. With `auto` the register uses ox_target, then qb-target, and only falls back to pressing **E** when neither is running.
- Check the `coords` and `radius` of the register in your shop file.
- Make sure `ensure legacy_kassa` comes after your target resource.

## The customer does not show up in the list

The customer must be within `CustomerRange` (6 m by default) of the register.

## The console says "No framework found: standalone mode"

The resource started before your framework, or no supported framework is running. In standalone mode payments do not use real money. Fix the `ensure` order or set `Framework` in `config.lua`.

## The customer did not receive the items

- The product needs an `item` field in the menu, and the item must exist in your inventory.
- `giveItems` must not be `false` in the shop.
- When the customer's inventory is full, both the customer and the employee get a notification.

## A shop does not load

Check the server console:

- `shop.id may only contain letters, digits, _ and -` means the `id` has spaces or other characters.
- `menu "..." does not exist` means the menu name is wrong or the menu was not registered.
- `item id "..." is used twice` means two products in the shop share an ID.

## How do I reset a shop's stock, sales and hours?

Stop the resource and delete `data/<shop id>.json`. Keep the `data` folder itself.

## Can I refund a sale or sell to NPCs?

No. There are no refunds in the register, and NPC sales do not exist because that would create money out of nothing. An employee can select themselves as the customer.
