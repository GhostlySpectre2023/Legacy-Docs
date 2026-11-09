# Support

How to get help with a Legacy Scripts resource, and what to include so we can solve it quickly.

## Before you open a ticket

Most problems are solved in a few minutes with these checks:

1. Read the **FAQ** page of the product you are using.
2. Check that every dependency listed on the product's **Overview** page is installed and started.
3. Check your `ensure` order: the resource must start after your framework, inventory and other dependencies.
4. Make sure you are on the latest version from the Cfx.re portal (Granted Assets).
5. Restart the full server, not only the resource, after installing items or SQL.

## Opening a ticket

Support is handled through tickets in the **Legacy Scripts** Discord.

1. Join the Legacy Scripts Discord server.
2. Open a ticket in the support channel.
3. Fill in the information below in your first message.

## What to include

| Information | Where to find it |
|---|---|
| Tebex transaction ID | Your Tebex receipt e-mail, starts with `tbx-` |
| Resource and version | `version` line in the resource's `fxmanifest.lua` |
| Framework and version | Qbox, QBCore or ESX, plus its version |
| Inventory / target / voice | For example ox_inventory, qb-target, pma-voice |
| Server artifact build | Shown at the top of the server console on start-up |
| Client errors | Press **F8** in game and copy any red lines |
| Server errors | Copy the red lines from the server console or txAdmin live console |
| What you expected and what happened | A short description, plus a clip or screenshot if possible |

> [!TIP]
> Copy errors as text rather than taking a photo of your screen. Text can be searched and the full error, including the file and line number, is visible.

## What we can and cannot help with

- **We help with:** installation, configuration, bugs, compatibility with the frameworks and scripts listed in the docs.
- **We cannot help with:** heavily modified copies of a resource, leaked or redistributed versions, or writing custom features for your server.

> [!WARNING]
> Our resources are licensed for one server per purchase. Sharing, reselling or reuploading them is not allowed, and tickets for leaked copies are closed.
