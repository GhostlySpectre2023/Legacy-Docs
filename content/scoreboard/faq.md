# FAQ

Common questions and fixes for the scoreboard.

## Everyone shows their FiveM name instead of their character name

- Check that `Config.UseCharacterNames = true`.
- The framework was not detected. Make sure `ensure legacy-scoreboard` comes **after** your framework in `server.cfg`, or set `Config.Framework` to `qbx`, `qb` or `esx`.
- Players still in character selection always show their FiveM name until their character is loaded.

## Nobody has a job / the job counters stay at 0

- The scoreboard is running in standalone mode because no framework was found. Fix the `ensure` order or set `Config.Framework`.
- The job names in `Config.HighlightedJobs` must match the job **name** (for example `police`), not the label.
- If `countOnDutyOnly = true`, only players who are on duty are counted.

## Pressing HOME does nothing

`Config.KeyBind` is only the default key. If a player has changed or cleared the binding, they need to set it again in **Settings > Key Bindings > FiveM** under the scoreboard entry. Changing `Config.KeyBind` later does not override an existing player binding.

## I can't see IDs above heads

- `Config.ShowIdsAboveHeads` must be `true`.
- With `Config.ShowIdsToEveryone = false`, only staff see them. Check that you have the ACE from `Config.StaffAce`.
- IDs are only drawn while the scoreboard is open and within `Config.IdDrawDistance` metres.

## Staff badges are missing

Staff is detected with `IsPlayerAceAllowed(src, Config.StaffAce)`, plus the `admin` / `god` permission on QBCore and the `admin` / `superadmin` group on ESX. On Qbox only the ACE counts:

```cfg
add_ace group.admin command allow
add_principal identifier.license:xxxxxxxx group.admin
```

## The texts show up as keys or are empty

`Config.Locale` must match a file in `locales/`. The included files are `en` and `nl`. A typo such as `'EN'` or `'english'` loads no texts.

## The data does not update while open

`Config.RefreshInterval` controls live updates. `0` turns them off; any value above `0` is the interval in milliseconds.
