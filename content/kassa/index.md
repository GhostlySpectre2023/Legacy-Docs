# Kassa (Legacy POS)

A modular touch-screen cash register where every shop is one config file and the customer approves every payment.

## Overview

`legacy_kassa` gives every business on your server a classic POS screen. Employees ring up orders, pick cash or card and select the customer. The customer gets a payment request with the products and amount and chooses to pay or decline. The server recalculates the total, checks distance, stock and permissions, takes the money and deposits it on the business account.

Menus are reusable templates: several shops can share one menu and still have their own prices, hidden products and stock.

## Features

- Classic POS screen with receipt, totals, quantity keys, categories and coloured function keys
- One file per shop: menu, prices, tax, coupons, order types, theme colour and registers
- Reusable menus with per-shop price changes, hidden products and stock
- Product options (milk, size, toppings) with their own price
- Customer-approved payments by cash or card, with a timeout and range check
- Money goes to the business account, with an optional commission for the employee
- Hold checks and send orders to the kitchen, recall them from any register in the shop
- Eat in, takeaway and delivery order types with an optional fee
- Coupons with a percentage or fixed amount
- Manager tools: discount, price override, stock and training mode
- 10 reports: today, yesterday, 7 days, per product, per employee, per payment method, recent checks, stock and hours
- Clock in and out per shop
- Custom buttons that trigger your own client events
- Optional receipt item for the customer
- Server-side validation of prices, permissions, distance and stock
- 14 languages: en, nl, de, fr, es, pt, it, pl, tr, sv, da, cs, ro, ar

## Supported frameworks

| Framework | Detection |
|---|---|
| Qbox | `qbx_core` |
| QBCore | `qb-core` |
| ESX | `es_extended` |
| Standalone | Test mode: payments do not use real money |

## Compatibility

| Type | Supported |
|---|---|
| Interaction | ox_target, qb-target, or a key press (E) as fallback |
| Inventory | ox_inventory, qb-inventory, ESX default inventory |
| Business accounts | Renewed-Banking, qb-banking, qb-management (Qbox / QBCore), esx_addonaccount (ESX) |
| Notifications | ox_lib, QBCore, ESX or the native GTA feed |

## Dependencies

| Resource | Required |
|---|---|
| Qbox, QBCore or ESX | Yes (standalone is for testing only) |
| OneSync | Yes, the server checks distances |
| ox_target / qb-target | Optional |
| An inventory | Optional, to hand out products |
| A business account script | Optional, to receive the money |

## Version

Current version: **1.0.0**

## Open files

| File | Purpose |
|---|---|
| `config.lua` | General settings |
| `shops/*.lua` | Shops |
| `menus/*.lua` | Menus |
| `server/bridge.lua` | Money, business account, items and framework |
| `client/bridge.lua` | Notifications and target / key press |
| `install/*.lua` | Item snippets |
| `locales/*.json`, `html/` | Texts and the screen |

The core logic is protected with Cfx.re Asset Escrow.
