# Installation

Install the scoreboard in a few minutes: no SQL and no items are needed.

## Steps

1. Download `legacy-scoreboard` from [portal.cfx.re](https://portal.cfx.re) under **Granted Assets**.
2. Place the `legacy-scoreboard` folder in your `resources` folder.
3. Add it to your `server.cfg` **after** your framework:

```cfg
ensure qbx_core          # or qb-core / es_extended
ensure legacy-scoreboard
```

4. Open `config.lua` and set at least `Config.Locale` and `Config.ServerName`.
5. Adjust `Config.HighlightedJobs` to the job names used on your server.
6. Restart your server.

## Staff permissions

Staff badges and staff-only IDs above heads use `Config.StaffAce`, which is `command` by default. Anyone with that ACE counts as staff:

```cfg
add_ace group.admin command allow
```

On top of the ACE, the bridge also treats these players as staff:

| Framework | Staff when |
|---|---|
| QBCore | `HasPermission(src, 'admin')` or `HasPermission(src, 'god')` |
| ESX | Group is `admin` or `superadmin` |
| Qbox / standalone | Only the ACE is checked |

## Database and items

None. The scoreboard does not use SQL or inventory items.

> [!NOTE]
> The resource is protected with Cfx.re Asset Escrow. `config.lua`, `server/bridge.lua`, `locales/` and `html/` stay open; the main client and server files are encrypted. Make sure your server runs a recent artifact and that its license key belongs to the Cfx.re account that bought the resource.
