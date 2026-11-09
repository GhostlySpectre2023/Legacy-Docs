# Installation

Install the loading screen in three steps.

## Steps

1. Place the `legacy_loadingscreen` folder in your server's `resources` folder.
2. Add it to your `server.cfg`:

```cfg
ensure legacy_loadingscreen
```

3. Restart the server.

> [!WARNING]
> Only one loading screen can be active. Remove or stop any other resource that uses `loadscreen` in its `fxmanifest.lua`.

## Adding photos and music

| Content | Folder | Then set in `config.js` |
|---|---|---|
| Background photos (1920x1080 or larger) | `html/img/` | `achtergronden` |
| Background video (webm or mp4, no sound) | `html/img/` | `achtergrondVideo` |
| Music (mp3) | `html/audio/` | `muziek.nummers` |
| Team photos | `html/team/` | `team` |
| Job icons | `html/rollen/` | `banen` |

The `fxmanifest.lua` already includes every `jpg`, `jpeg`, `png`, `webp`, `webm` and `mp4` in `html/img/` and every `mp3` in `html/audio/`, so new files are picked up automatically.

> [!TIP]
> Keep a background video small (around 20 MB at 1080p at most). Players download it before the loading screen can show it.

> [!WARNING]
> Only use music you have the rights to.

## Previewing without a server

Open `html/index.html` through a local web server, or double-click the file. Outside FiveM the loading is simulated, so you can see your changes straight away.

## Database and items

None.
