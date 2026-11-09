# Getting Started

Everything you need to know to go from a Tebex purchase to a running resource on your server.

## 1. Buy on Tebex

All Legacy Scripts resources are sold through our Tebex store. You need to log in with your **Cfx.re account** during checkout. The resource is linked to that account, so make sure you use the same account that owns your server's license key.

> [!WARNING]
> An escrowed resource only runs on servers whose license key belongs to the Cfx.re account that bought it. Buying with a different account is the most common cause of "You lack the entitlement to run this resource".

## 2. Download from the Cfx.re portal

After the purchase the resource is delivered to your Cfx.re account, not by email.

1. Go to [portal.cfx.re](https://portal.cfx.re) and log in with the account you used on Tebex.
2. Open **Assets** and then **Granted Assets**.
3. Find the resource and download the latest version.
4. Extract the zip and place the folder in your server's `resources` folder.

> [!NOTE]
> Older guides refer to this page as "keymaster". It is the same place: your purchased assets live under Granted Assets in the Cfx.re portal.

## 3. Understand Asset Escrow

Our resources are protected with Cfx.re Asset Escrow. This means:

- The core logic (`client` and `server` Lua files) is encrypted and cannot be read or edited.
- Config files, locales, bridge files and the NUI (`html/`) stay open. Each product's documentation lists exactly which files you can edit.
- `html/` files are never encrypted by escrow, so UI tweaks are always possible.

> [!TIP]
> Keep the resource folder name exactly as delivered. Several resources use their own name for exports and ox_inventory item hooks (for example `exports.legacy_kassa` or `tac_handheld.useDevice`). Renaming the folder breaks those.

## 4. Server requirements

These are general recommendations that apply to all our resources:

- **A recent server artifact.** Escrowed resources need an up-to-date FXServer build. Some resources enforce a minimum build in their `fxmanifest.lua` (for example Dealerships requires build `7290` or newer).
- **OneSync enabled.** Several resources check distances on the server or rely on entity streaming and list `/onesync` as a dependency. Enable it with `set onesync on` in your `server.cfg`, or through txAdmin.
- **ox_lib and oxmysql** are used by a number of our resources. Keep them up to date.
- **Lua 5.4.** All resources use `lua54 'yes'`; no action is needed, but avoid old forks of frameworks that break on Lua 5.4.

## 5. Ensure order

FiveM starts resources in the order they appear in `server.cfg`. Our resources detect your framework, inventory and target scripts at start-up, so they must start **after** those dependencies.

```cfg
# 1. Libraries and database
ensure oxmysql
ensure ox_lib

# 2. Framework
ensure qbx_core        # or qb-core / es_extended

# 3. Inventory, target, voice, banking
ensure ox_inventory
ensure ox_target
ensure pma-voice

# 4. Legacy Scripts resources
ensure legacy-scoreboard
ensure legacy-dealerships
ensure legacy_kassa
```

> [!WARNING]
> If a resource reports that no framework was found, it almost always started before your framework. Move its `ensure` line further down, or set the `Framework` option in its config by hand.

## 6. Updating

1. Download the new version from Granted Assets.
2. Read the product's changelog for config or SQL changes.
3. Back up your edited files (`config.lua`, locales, bridges, shop or menu files).
4. Replace the resource folder and copy your edits back in, merging any new config options.
5. Restart the server, not just the resource, when a changelog mentions SQL or item changes.
