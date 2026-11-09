# API

Exports and events you can use to integrate Legacy POS with other resources.

## Exports

### RegisterShop

Registers a shop from another resource. Call it on **both** the client and the server, with the same definition as a file in `shops/`.

```lua
exports.legacy_kassa:RegisterShop({
    id = 'burger_joint',
    label = 'Burger Joint',
    menu = 'cafe',
    access = { jobs = { burger = 0 }, managerGrade = 3, requireDuty = true },
    society = 'burger',
    registers = { { coords = vec3(0.0, 0.0, 0.0), radius = 1.2 } },
})
```

### RegisterMenu

Registers a menu template that shops can use by name.

```lua
exports.legacy_kassa:RegisterMenu('burgers', {
    modifierGroups = {},
    categories = {
        {
            id = 'burgers', label = 'Burgers', color = 'orange',
            items = {
                { id = 'cheeseburger', label = 'Cheeseburger', price = 6.50, item = 'cheeseburger' },
            },
        },
    },
})
```

> [!NOTE]
> Register a menu before any shop that uses it. A shop that refers to an unknown menu raises an error.

## Events

### legacy_kassa:sale (server)

Fired on the server after every paid sale.

```lua
AddEventHandler('legacy_kassa:sale', function(shopId, sale, cashierSrc, customerSrc)
    -- amounts are stored in cents
    print(('%s sold check %s for %.2f'):format(shopId, sale.no, sale.totals.due / 100))
end)
```

The `sale` table contains:

| Field | Description |
|---|---|
| `no` | Check number |
| `ts` | Unix timestamp |
| `day` | Day of the sale |
| `cashier` | Name of the employee |
| `cashierId` | Identifier of the employee |
| `method` | Payment method (cash or card) |
| `orderType` | Order type ID |
| `totals` | `{ sub, disc, coupon, tax, zone, due }`, see below |
| `lines` | List of `{ item, label, category, qty, total }` |

The `totals` fields, all in cents:

| Field | Description |
|---|---|
| `sub` | Subtotal of all lines |
| `disc` | Manager discount |
| `coupon` | Coupon discount |
| `tax` | Tax amount |
| `zone` | Order type fee, for example a delivery fee |
| `due` | Amount the customer paid |

### Custom button events (client)

A button with `action = 'event:<name>'` triggers a local client event with the shop ID:

```lua
AddEventHandler('my_script:deliveryroute', function(shopId)
    print('Delivery route requested from', shopId)
end)
```

## Admin permission

| ACE | Effect |
|---|---|
| `legacykassa.admin` | Full access to every register in every shop |

```cfg
add_ace group.admin legacykassa.admin allow
```
