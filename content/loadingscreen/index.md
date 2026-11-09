# Loading Screen

The Legacy Roleplay loading screen, styled after legacyroleplaynl.nl, with real load progress, music, radio and information tabs.

## Overview

`legacy_loadingscreen` replaces the default FiveM loading screen with a page in the style of the Legacy Roleplay website: a dark background with a pink glow, the animated lotus, the website's hero text and a progress bar. The progress bar uses the real loading messages that FiveM sends, and the screen fades out smoothly once the player is actually in the world.

Everything you see is set in a single file, `html/js/config.js`.

## Features

- Real loading progress, percentage and status line from FiveM's own loading events
- Smooth fade-out (including the music) when the player is in the world, with a safety timeout
- Music player with your own MP3s, plus Dutch and Belgian radio stations with tabs and search
- Remembers the player's choice of track or station
- Information tabs: Home, Rules, Team, FAQ, Jobs and How to start, rotating automatically until the player clicks
- Social links: Discord, TikTok, Twitch, YouTube, Instagram, Kick, X and website
- Optional countdown to an opening date, which disappears after the date
- Rotating tips and status texts
- Optional background video or rotating background photos
- Mouse cursor enabled so players can use the music player
- Preview in a normal browser, with simulated loading

## Frameworks

Works on any server. The screen closes on the `playerSpawned` event, on `QBCore:Client:OnPlayerLoaded` (Qbox and QBCore), or as soon as the player is active in the session, whichever comes first.

## Dependencies

None.

## Version

Current version: **3.0.0**

## Open files

The loading screen is not escrowed. All files can be edited.

> [!NOTE]
> The config keys are in Dutch (for example `titel`, `regels`, `muziek`), because the resource was built for a Dutch server. The [Configuration page](#/loadingscreen/configuration) explains each key in English.
