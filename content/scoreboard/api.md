# API

Commands and key mappings registered by the scoreboard.

## Commands

| Command | Side | Description |
|---|---|---|
| `legacy-scoreboard:toggle` | Client | Opens or closes the scoreboard |

The command is bound to `Config.KeyBind` through a key mapping, so players can rebind it in **Settings > Key Bindings > FiveM**. You can also run it from another client script:

```lua
ExecuteCommand('legacy-scoreboard:toggle')
```

## Exports

The scoreboard has no exports.

## Bridge functions

If you need to change how names, jobs or staff are resolved, edit the open `server/bridge.lua`:

```lua
-- Returns { name, jobName, jobLabel, jobOnDuty } for a connected player
function Bridge.GetPlayer(src) end

-- Returns true when the player counts as staff
function Bridge.IsStaff(src) end
```

> [!NOTE]
> The network events used between client and server are internal and protected by a rate limit of one request per 750 ms per player. Do not trigger them from other resources.
