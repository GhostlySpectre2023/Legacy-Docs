# API

Commands, exports, events and hooks provided by Legacy Dealerships.

## Commands

| Command | Who | Description |
|---|---|---|
| `/dealeradmin` | Admins | Opens the dealer admin panel. Name set by `Config.DealerAdminCommand` |
| `/myfinance` | Everyone | View and manage your financed vehicles. Name set by `Config.MyFinanceCommand` |
| `/directsale` | Employees | Opens the direct sale tablet (must be inside a dealership). Name set by `Config.DirectSaleCommand` |
| `/ctm` | Everyone | Cancels your current trucking mission |
| `migratev2` | Admins / console | Runs the v1 to v2 migration (`install/migration-v2.sql`) |

Admin means the player has the `command` ACE.

## Server exports

All server exports validate their arguments. On failure most of them return `false` plus an error message.

### Dealerships

```lua
-- All dealership locations
local dealerships = exports['legacy-dealerships']:getDealerships()

-- One dealership by ID
local dealership = exports['legacy-dealerships']:getDealership('pdm')

-- Vehicles available in a dealership's showroom
local vehicles = exports['legacy-dealerships']:getShowroomVehicles('pdm')
```

### Balance

```lua
local balance = exports['legacy-dealerships']:getDealershipBalance('pdm')
exports['legacy-dealerships']:addDealershipBalance('pdm', 5000)
exports['legacy-dealerships']:removeDealershipBalance('pdm', 2500)
```

`amount` must be a positive number.

### Stock and prices

```lua
-- amount is optional and defaults to 1
exports['legacy-dealerships']:incrementStock('pdm', 'sultan', 2)
exports['legacy-dealerships']:decrementStock('pdm', 'sultan', 1)
exports['legacy-dealerships']:setStock('pdm', 'sultan', 10)

-- Price in a dealership, or the catalogue price when dealershipId is omitted
local price = exports['legacy-dealerships']:getVehiclePrice('sultan', 'pdm')
local stock = exports['legacy-dealerships']:getVehicleStock('sultan', 'pdm')
```

The stock exports only update an existing stock row for that dealership and vehicle. `decrementStock` fails when there is not enough stock.

### Sales

```lua
-- limit defaults to 50, maximum 500
local sales = exports['legacy-dealerships']:getSalesHistory('pdm', 100)

-- Sum of all paid amounts
local total = exports['legacy-dealerships']:getTotalSales('pdm')
```

### Employees

```lua
local isEmployee = exports['legacy-dealerships']:isEmployee(source, 'pdm')
local canSell = exports['legacy-dealerships']:hasPermission(source, 'pdm', 'SELL')
local employees = exports['legacy-dealerships']:getEmployees('pdm')
```

Permission names are listed on the [Configuration page](#/dealerships/configuration).

### Finance

```lua
-- identifier = citizenid (Qbox / QBCore) or identifier (ESX)
local vehicles = exports['legacy-dealerships']:getPlayerFinancedVehicles(identifier)
local count = exports['legacy-dealerships']:getPlayerFinanceCount(identifier)
local row = exports['legacy-dealerships']:getFinanceByPlate('ABC123')

-- Make the next payment for an online player
local ok, err = exports['legacy-dealerships']:makeFinancePayment(source, 'ABC123')
```

### Coupons

```lua
local coupon, err = exports['legacy-dealerships']:createCoupon('pdm', {
    code = 'SUMMER10',          -- optional, a unique code is generated when omitted
    discount_type = 'percent',  -- 'percent' or 'fixed'
    discount_value = 10,
    max_uses = 100,
    per_player_limit = 1,
    expiry_date = nil,          -- timestamp in milliseconds
    vehicle_restrictions = nil, -- list of spawn codes
    category_restrictions = nil,-- list of categories
    allow_finance = true,
})

local result = exports['legacy-dealerships']:validateCoupon('SUMMER10', 'pdm', 'sultan', 'sports', false)
if result.valid then
    -- coupon can be used
else
    print(result.message)
end
```

### Plates

```lua
-- seed follows the same pattern as Config.PlateFormat
local plate = exports['legacy-dealerships']:generatePlate('1AA111AA')
```

### Currencies

Register an extra payment method, for example VIP coins:

```lua
exports['legacy-dealerships']:registerCurrency({
    id = 'vip_coins',
    label = 'VIP Coins',
    format = '%s coins',
    conversionRate = 10000,   -- 1 coin is worth 10,000 in base currency
    allowFinance = false,
    fetchBalance = function(src) return 0 end,
    addBalance = function(src, amount) return true end,
    removeBalance = function(src, amount) return true end,
})

local all = exports['legacy-dealerships']:getCurrencies()
local bank = exports['legacy-dealerships']:getCurrency('bank')
```

| Field | Description |
|---|---|
| `id` | Unique ID |
| `label` | Display name |
| `format` | Display format, `%s` is the amount |
| `conversionRate` | Value of one unit in base currency. Ignored when `flatCost` is set |
| `flatCost` | Optional fixed cost per transaction, regardless of price |
| `allowFinance` | Can be used for finance. Must be `false` when `flatCost` is set |
| `fetchBalance`, `addBalance`, `removeBalance` | Functions that read and change the player's balance |
| `fetchBalanceOffline`, `removeBalanceOffline` | Optional, used to process finance for offline players |

The `bank` and `cash` currencies are registered by default.

### Shared

```lua
local Locale = exports['legacy-dealerships']:locale()
local Config = exports['legacy-dealerships']:config()
```

## Client exports

```lua
-- Open a dealership showroom, optionally with a vehicle and colour pre-selected
exports['legacy-dealerships']:openShowroom('pdm')

-- Leave the showroom
exports['legacy-dealerships']:exitShowroom()

-- Hide the dealership text UI
exports['legacy-dealerships']:ForceHideTextUI()
```

`openShowroom(dealershipId, defaultVehicle, defaultColour)` returns `false` when a showroom is already open or the player is in a test drive.

## Events

### Client (`config/config-cl.lua`)

```lua
-- After a vehicle is purchased
RegisterNetEvent("legacy-dealerships:client:purchase-vehicle:config", function(vehicle, plate, purchaseType, amount, paymentMethod, financed)
end)

-- When a test drive starts
RegisterNetEvent("legacy-dealerships:client:start-test-drive:config", function(vehicle, plate)
end)

-- When a vehicle is sold to the dealership; this handler also deletes the vehicle
RegisterNetEvent("legacy-dealerships:client:sell-vehicle:config", function(vehicle, plate)
  JGDeleteVehicle(vehicle)
end)
```

### Server (`config/config-sv.lua`)

```lua
-- After a vehicle is purchased
RegisterNetEvent("legacy-dealerships:server:purchase-vehicle:config", function(vehNetId, plate, purchaseType, amount, paymentMethod, financed)
  local src = source
  local vehicle = NetworkGetEntityFromNetworkId(vehNetId)
end)

-- When a finance loan is paid in full
RegisterNetEvent("legacy-dealerships:server:vehicle-finance-complete", function(playerId, plate)
end)

-- When a finance loan is defaulted on
RegisterNetEvent("legacy-dealerships:server:vehicle-finance-defaulted", function(playerId, plate, amountOwed)
end)
```

`purchaseType` is `"personal"` or `"society"`, `paymentMethod` is `"bank"` or `"cash"`.

## Hooks

Return `false` from these functions to block the action.

```lua
-- Client: before the showroom opens
function ShowroomPreCheck(dealershipId)
  return true
end

-- Server: before a player sells a vehicle to the dealership
function SellVehiclePreCheck(dealershipId, plate, model, price)
  return true
end

-- Server: before a purchase goes ahead
function PurchaseVehiclePreCheck(playerId, dealershipId, plate, model, purchaseType, amountToPay, paymentMethod, society, societyType, financed, noOfPayments, downPayment, isDirectSale, sellerPlayerId)
  return true
end
```

Example: only allow people with a driving licence to buy.

```lua
function PurchaseVehiclePreCheck(playerId, dealershipId, plate, model, purchaseType, amountToPay, paymentMethod, society, societyType, financed)
  local hasLicence = exports.ox_inventory:Search(playerId, 'count', 'driver_license') > 0
  return hasLicence
end
```
