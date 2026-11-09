# Configuration

Everything is set in `html/js/config.js`. The keys are Dutch; this page explains each one.

> [!WARNING]
> `config.js` is JavaScript. Mind the commas between entries: a missing or extra comma stops the whole loading screen from working.

## Texts

```js
kicker: "Nederlandse FiveM roleplay",
titel: "Jouw verhaal begint in {Legacy}",
overKicker: "Over de server",
overTitel: "Dit is {Legacy}",
tekst: "Een serieuze maar gezellige roleplay server waar jij bepaalt wie je bent. ...",
chips: ["Volledig Nederlandstalig", "Eigen banen en scripts", "Whitelist via Discord"],
gemaaktDoor: "GhostlySpectre",
```

| Key | Meaning |
|---|---|
| `kicker` | Small line above the title, under the lotus |
| `titel` | Main title |
| `overKicker` | Small line above the title on the Home tab |
| `overTitel` | Title on the Home tab |
| `tekst` | Intro text on the Home tab |
| `chips` | Short labels shown on the Home tab |
| `gemaaktDoor` | "Made by" credit. `""` hides it |

Put a word between `{curly braces}` to show it in pink, like on the website.

## Opening countdown

```js
opening: "2026-10-30T17:00:00+01:00",
```

Shows a countdown at the top. It disappears automatically after the date. `""` means no countdown. Use the ISO format with your time zone offset.

## Socials

```js
socials: [
  { type: "discord", naam: "Discord", tekst: "discord.gg/...",         link: "https://discord.gg/..." },
  { type: "tiktok",  naam: "TikTok",  tekst: "@nl_legacyroleplay",     link: "https://www.tiktok.com/@nl_legacyroleplay" },
  { type: "website", naam: "Website", tekst: "legacyroleplaynl.nl",    link: "https://legacyroleplaynl.nl" }
],
```

| Field | Meaning |
|---|---|
| `type` | `discord`, `tiktok`, `twitch`, `youtube`, `instagram`, `kick`, `x` or `website` |
| `naam` | Name |
| `tekst` | Text shown |
| `link` | Opened in the player's browser on click |

Remove a line to hide it. Socials appear in the order you list them.

## Statistics

```js
statistieken: [
  { waarde: "128", label: "Spelersplekken" },
  { waarde: "100+", label: "Eigen scripts" }
],
```

Up to 3 figures on the Home tab. `waarde` is the value, `label` the caption.

## Tabs

```js
tabbladen: ["home", "regels", "team", "faq", "banen", "starten"],
tabWisselMs: 14000,
website: "https://legacyroleplaynl.nl",
```

| Key | Meaning |
|---|---|
| `tabbladen` | Which tabs to show, in order: `home`, `regels` (rules), `team`, `faq`, `banen` (jobs), `starten` (how to start). Remove one to hide it |
| `tabWisselMs` | Tabs switch automatically every this many milliseconds until the player clicks. `0` = off |
| `website` | Link shown under each tab |

### Rules

```js
regels: [
  { categorie: "Algemeen", items: [
    "Respecteer iedereen, in en buiten het spel. ...",
    "Je bent minimaal 16 jaar oud."
  ] }
],
```

Each entry is a category (`categorie`) with a list of rules (`items`).

### Team

```js
team: [
  { naam: "GhostlySpectre", rol: "management", titel: "Management & Project-Leider", avatar: "team/ghostlyspectre.png" }
],
```

| Field | Meaning |
|---|---|
| `naam` | Name |
| `rol` | `management`, `developer`, `staff` or `support`. Sets the colour |
| `titel` | Job title |
| `avatar` | Image in `html/team/` |

### FAQ

```js
faq: [
  { vraag: "Hoe join ik Legacy Roleplay?", antwoord: "Join onze Discord, ..." }
],
```

`vraag` is the question, `antwoord` the answer.

### Jobs

```js
banen: [
  { icoon: "rollen/rol_politie.png", naam: "Politie", tekst: "Handhaaf de orde in de stad." }
],
```

`icoon` is an image in `html/rollen/`, `naam` the job name and `tekst` a short description.

### How to start

```js
stappen: [
  { titel: "Join de Discord", tekst: "Alle informatie, aankondigingen en support vind je in onze Discord." }
],
```

Numbered steps with a `titel` (title) and `tekst` (text).

## Background

```js
achtergrondVideo: "",
achtergronden: [
  // "img/stad-nacht.jpg",
  // "img/haven.jpg"
],
fotoDuurMs: 8000,
```

| Key | Meaning |
|---|---|
| `achtergrondVideo` | Background video in `html/img/` (webm or mp4, no sound). `""` = no video |
| `achtergronden` | Background photos in `html/img/`. They cross-fade |
| `fotoDuurMs` | How long each photo stays, in milliseconds |

Without a video or photos you get the dark background with pink glow, a blurred lotus and floating lights, like the website.

## Music

```js
muziek: {
  autoStart: true,
  volume: 0.3,
  nummers: [
    { titel: "Legacy Roleplay Theme", artiest: "Legacy Roleplay", bestand: "audio/LegacyRoleplayTheme.mp3" }
  ],
  radio: [
    // { naam: "Mijn zender", stream: "https://voorbeeld.nl/stream.mp3", land: "NL" }
  ]
},
```

| Key | Meaning |
|---|---|
| `autoStart` | Try to start playing straight away; otherwise the player presses play |
| `volume` | `0.0` to `1.0` |
| `nummers` | Tracks: `titel` (title), `artiest` (artist), `bestand` (file in `html/audio/`) |
| `radio` | Extra radio stations: `naam` (name), `stream` (https URL), `land` (`NL` or `BE`) |

Stations with `land` appear on the NL or BE tab; without it they get their own "Radio" tab. The player picks from the list (with tabs and search) or skips with the "next" button, and the choice is remembered.

The built-in Dutch and Belgian stations are in `html/js/radiozenders.js`:

```js
{ naam: "NPO Radio 1", stream: "https://icecast.omroep.nl/radio1-bb-mp3", land: "NL", populair: true },
```

`populair: true` puts a station at the top of the list. Remove a line to remove a station. Only use https streams.

## Tips

```js
tips: [
  "Blijf in je rol: je personage weet niet wat jij op Discord leest.",
  "Solliciteer voor de whitelist via de website of onze Discord."
],
tipDuurMs: 7000,
```

Rotating tips and how long each one is shown, in milliseconds.

## Status texts

```js
status: [
  { vanaf: 0.0,  tekst: "Verbinden met Legacy Roleplay" },
  { vanaf: 0.15, tekst: "Bestanden downloaden" },
  { vanaf: 0.45, tekst: "Voertuigen en personages laden" },
  { vanaf: 0.75, tekst: "Scripts opstarten" },
  { vanaf: 0.95, tekst: "Bijna in de stad" }
]
```

The text above the progress bar. `vanaf` is how far loading is (`0` = start, `1` = done) from which the `tekst` is shown.

## Colours

The colours are defined at the top of `html/css/style.css` and match the website.
