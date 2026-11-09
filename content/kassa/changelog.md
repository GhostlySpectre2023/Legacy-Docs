# Changelog

Version history of Legacy POS (`legacy_kassa`).

## 1.0.0

Released 2026-11-09.

### Added

- Classic touch-screen POS interface
- One config file per shop, reusable menus with per-shop prices, hidden products and stock
- Product options with their own prices (size, milk, toppings)
- Quantity keys 1 to 9 and a keypad for any quantity up to `Config.MaxQty`
- Payment request the customer approves, cash or card, with timeout and range check
- Business account deposit with optional employee commission
- Hold checks, send orders to the kitchen and recall them from any register
- Manager tools: discount, price override, stock, training mode
- 10 reports and a clock in / out per shop
- Server-side validation of prices, permissions, distance and stock
- Qbox, QBCore and ESX support, detected automatically; standalone test mode
- ox_target, qb-target or key press interaction
- 14 languages: en, nl, de, fr, es, pt, it, pl, tr, sv, da, cs, ro, ar
