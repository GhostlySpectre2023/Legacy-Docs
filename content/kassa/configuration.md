# Configuration

General settings in `config.lua`, plus how to build shops, menus and custom buttons.

## config.lua

```lua
Config = {
    Locale = 'en',              -- locales/<name>.json: en nl de fr es pt it pl tr sv da cs ro ar
    Framework = 'auto',         -- auto | esx | qb | qbx | standalone
    Interaction = 'auto',       -- auto | ox_target | qb-target | key

    -- decimals = 0 if your server only uses whole amounts (ESX rounds money itself).
    Currency = { symbol = '$', decimals = 2 },

    MaxUseDistance = 4.0,       -- max distance between employee and register
    CustomerRange = 6.0,        -- max distance between customer and register
    PaymentTimeout = 45,        -- seconds the customer has to answer
    ShowCustomerNames = false,  -- false: customers show as "Customer [id]"

    MaxLines = 40,
    MaxQty = 99,                -- highest quantity on one line
    MaxSalesPerShop = 2000,     -- older sales drop out of the reports

    ReceiptItem = nil,          -- e.g. 'receipt': gives the customer a receipt item after paying
}
```

| Option | Default | Description |
|---|---|---|
| `Locale` | `'en'` | Language file from `locales/` |
| `Framework` | `'auto'` | `auto`, `esx`, `qb`, `qbx` or `standalone` |
| `Interaction` | `'auto'` | `auto` uses ox_target, then qb-target, then a key press. Or force `ox_target`, `qb-target` or `key` |
| `Currency.symbol` | `'$'` | Currency symbol |
| `Currency.decimals` | `2` | Decimals in prices. Use `0` on ESX |
| `MaxUseDistance` | `4.0` | Maximum distance between employee and register |
| `CustomerRange` | `6.0` | Maximum distance between customer and register |
| `PaymentTimeout` | `45` | Seconds the customer has to answer the payment request |
| `ShowCustomerNames` | `false` | Show character names in the customer list, or `Customer [id]` |
| `MaxLines` | `40` | Maximum lines on one check |
| `MaxQty` | `99` | Highest quantity on one line |
| `MaxSalesPerShop` | `2000` | Sales kept per shop; older sales drop out of the reports |
| `ReceiptItem` | `nil` | Item name to give the customer as a receipt, for example `'receipt'` |

### Manager actions

```lua
ManagerActions = {
    override_price = true,
    discount = true,
    change_stock = true,
    training = true,
    report_today = true,
    report_items = true,
    report_yesterday = true,
    report_week = true,
    report_payments = true,
    report_employees = true,
    report_recent = true,
    report_stock = true,
    report_clock = true,
},
```

Actions set to `true` need manager rights (`access.managerGrade`). A shop can override this per action with `permissions`, for example `permissions = { discount = 1 }` lets grade 1 and up give discounts.

## Adding a shop

Every file in `shops/` is one shop. Copy `shops/coffee_shop.lua` to add another:

```lua
Kassa.RegisterShop({
    id = 'coffee_shop',             -- letters, digits, _ and -; also the name of the data file
    label = 'Downtown Coffee',
    menu = 'cafe',                  -- a menu from menus/, or a menu table

    access = {
        jobs = { coffeeshop = 0 },  -- job = minimum grade to use the register. Empty = everyone
        managerGrade = 3,
        requireDuty = true,
    },
    society = 'coffeeshop',         -- business account that receives the money
    commission = 5,                 -- % of every sale paid to the employee's bank

    tax = { rate = 9, mode = 'added' }, -- 'added' = on top of the price, 'included' = inside the price
    payments = { cash = true, card = true },

    orderTypes = {                  -- up to 3 are shown on screen
        { id = 'here', label = 'Eat in' },
        { id = 'carry', label = 'Takeaway' },
    },
    coupons = {
        { id = 'WELCOME', label = 'Welcome 10%', percent = 10 },
        { id = 'COFFEE2', label = '$2 off', amount = 2 },
    },

    registers = {                   -- one entry per register
        { coords = vec3(-628.0, 239.0, 81.9), radius = 1.2 },
    },
})
```

### Shop fields

| Field | Description |
|---|---|
| `id` | Unique ID, letters, digits, `_` and `-` only. Also the name of the data file |
| `label` | Shop name. Defaults to the `id` |
| `menu` | Name of a menu in `menus/`, or a menu table |
| `menuChanges` | Optional per-shop changes to the menu (see below) |
| `access.jobs` | `{ [job] = minimum grade }`. Empty means everyone can use the register |
| `access.managerGrade` | Grade from which an employee counts as manager |
| `access.requireDuty` | Employee must be on duty |
| `permissions` | `{ [action] = minimum grade }`, overrides `Config.ManagerActions` for this shop |
| `disabled` | List of actions this shop does not have, for example `{ 'report_week' }` |
| `society` | Business account that receives the money |
| `commission` | Percentage of every sale paid to the employee's bank. Default `0` |
| `giveItems` | Customer receives the items after paying. Default `true` |
| `tax` | `{ rate = 9, mode = 'added' }` or `mode = 'included'`. Default no tax |
| `payments` | `{ cash = true, card = true }` |
| `orderTypes` | Up to 3 order types. An entry can have a `fee`, for example a delivery fee |
| `coupons` | `{ id, label, percent }` or `{ id, label, amount }` |
| `theme` | Colours: `{ frame = '#c9740c', receipt = '#dedede', panel = '#0b0b0d' }` |
| `registers` | List of `{ coords = vec3(...), radius = 1.2 }`. Several registers are allowed |
| `layout` | Optional custom buttons (see below) |

### Per-shop menu changes

```lua
menuChanges = {
    prices = { latte = 6.00 },
    hide = { 'cookie' },     -- product or category id
    stock = { muffin = 10 },
    addCategories = { --[[ extra categories ]] },
},
```

The right column holds 9 buttons: the coupon button (when the shop has coupons) plus the categories. A category with many products gets pages automatically.

## Adding a menu

A menu is a template that several shops can use. Add a file to `menus/`:

```lua
Kassa.RegisterMenu('cafe', {
    modifierGroups = {
        milk = {
            label = 'Milk',
            single = true,
            options = {
                { id = 'light', label = 'Light milk' },
                { id = 'oat', label = 'Oat milk', price = 0.50 },
                { id = 'soy', label = 'Soy milk', price = 0.50 },
            },
        },
        extra = {
            label = 'Extra',
            options = {
                { id = 'shot', label = 'Extra shot', price = 1.00 },
                { id = 'syrup', label = 'Vanilla syrup', price = 0.75 },
            },
        },
    },
    categories = {
        {
            id = 'warm', label = 'Hot drinks', color = 'blue',
            items = {
                { id = 'espresso', label = 'Espresso', price = 3.00, item = 'espresso', modifiers = { 'extra' } },
                { id = 'latte', label = 'Latte', price = 4.50, item = 'latte', modifiers = { 'milk', 'extra' } },
            },
        },
        {
            id = 'bakery', label = 'Bakery', color = 'orange',
            items = {
                { id = 'croissant', label = 'Croissant', price = 5.00, item = 'croissant', stock = 25 },
            },
        },
    },
})
```

| Field | Description |
|---|---|
| `modifierGroups` | Option groups. `single = true` allows one choice; options can have a `price` |
| `categories[].color` | `blue`, `red`, `grey`, `purple`, `green`, `orange`, `teal`, `light` |
| `items[].item` | Inventory item the customer receives. Leave out for no item |
| `items[].stock` | Starting stock. Leave out for unlimited |
| `items[].modifiers` | Modifier groups that apply to this product |
| `items[].ask` | `true` shows the options as soon as the product is rung up |

> [!WARNING]
> Product IDs must be unique within a shop. A duplicate ID stops the shop from loading with an error in the console.

## Custom buttons

With `layout` you replace the buttons of a shop: `top`, `manager` or `user`. `manager` and `user` fill a grid 4 wide and 11 high. Use `false` for an empty spot.

```lua
layout = {
    user = {
        { action = 'clock_toggle', color = 'purple', label = 'btn_clock_toggle' },
        { action = 'event:my_script:deliveryroute', color = 'green', text = 'Delivery route' },
    },
},
```

- `action = 'event:<name>'` triggers a client event with the shop ID as its argument.
- `label` is a key from `locales/`, `text` is literal text.
- Colours: `blue`, `red`, `grey`, `purple`, `green`, `orange`, `teal`.

## Permissions

| Role | Can |
|---|---|
| Employee | Ring up, hold, send to kitchen, settle, clock in / out, own sales |
| Manager (`managerGrade`) | Everything above, plus discount, price override, stock, reports and training mode |
| Admin (ACE `legacykassa.admin`) | Everything, in every shop |

## Locales

14 languages are in `locales/`: en, nl, de, fr, es, pt, it, pl, tr, sv, da, cs, ro, ar. Edit the JSON files to change texts, or copy one to add a language.

## Bridges

- `server/bridge.lua` handles players, money, business accounts and items. Edit it to support another framework, banking or inventory script.
- `client/bridge.lua` handles notifications and how a register is opened (target or key press).
