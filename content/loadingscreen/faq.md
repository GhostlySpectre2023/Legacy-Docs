# FAQ

Common questions and fixes for the loading screen.

## The loading screen is blank or shows nothing at all

Almost always a typo in `html/js/config.js`, such as a missing comma or quote. Open `html/index.html` in a browser and check the developer console for the line with the error.

## The loading screen stays on after I'm in the game

The screen closes when the player is active in the session, on `playerSpawned`, or on `QBCore:Client:OnPlayerLoaded`. If none of these happen, it closes by itself after 5 minutes. Check F8 for lines starting with `[legacy_loadingscreen]` to see what happened.

## Music doesn't start by itself

Browsers can block autoplay. With `muziek.autoStart = true` the screen tries to start playing; if that is blocked, the player presses play in the music player.

## A radio station doesn't play

The stream may be offline or not use https. Remove it from `html/js/radiozenders.js` or replace the URL. Only https streams work.

## My new photo or song doesn't show

Put the file in `html/img/` or `html/audio/` **and** add its file name to `achtergronden` or `muziek.nummers` in `config.js`. Then restart the resource.

## The loading screen takes long to appear

Large background videos and photos must be downloaded before they show. Keep a video under about 20 MB and compress photos.

## Another loading screen shows instead

Only one resource can provide the loading screen. Stop or remove any other resource with `loadscreen` in its manifest.

## Can I see my changes without joining the server?

Yes. Open `html/index.html` in a browser, or through a local web server. Loading is simulated outside FiveM.
