# Legacy Docs — docs.legacyroleplaynl.nl

A static documentation site for the Legacy Scripts resources. No build step, no packages:
plain HTML/CSS/JS that renders the Markdown files in `content/`.

```
index.html            the site shell (header, sidebar, search)
404.html              shown for unknown URLs
CNAME                 custom domain for GitHub Pages
assets/               style.css, app.js, markdown.js, fonts, logo
content/nav.json      sidebar + homepage cards (products and their pages)
content/<product>/    one .md file per page (index, installation, configuration, api, faq, changelog)
serve.js              local preview server (node serve.js)
deploy/               nginx config for hosting on your own VPS
```

## Preview locally

```bash
node serve.js
```

Open http://localhost:4321. Opening `index.html` by double-clicking does **not** work — browsers block
loading the `.md` files from disk, so always use a server.

## Add or edit docs

1. Edit or add a Markdown file in `content/<product>/`.
2. New page? Add it to that product's `pages` in `content/nav.json`.
3. New product? Add a new object to `content/nav.json` (slug, title, icon, version, tagline, frameworks, pages)
   and create the folder `content/<slug>/` with at least `index.md`.
   Icons: `home, list, car, cash, parachute, radio, phone, loader`.

Supported Markdown: headings, lists, tables, code blocks (`lua`, `sql`, `json`, `cfg`, `bash` get colours),
links, **bold**, *italic*, `---`, and callouts:

```md
> [!NOTE]
> Text here. Also: [!TIP] and [!WARNING]
```

---

## Put it online + DNS

Pick **one** of the three options. All are free and all give you HTTPS.

### Option A — GitHub Pages (easiest)

1. Create a new GitHub repository (e.g. `legacy-docs`) and upload all files in this folder
   (including `CNAME` and `.nojekyll`).
2. Repository → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. In the same page, *Custom domain* should already show `docs.legacyroleplaynl.nl` (from the `CNAME` file).
4. DNS at your domain provider — add:

   | Type  | Name   | Value                     |
   |-------|--------|---------------------------|
   | CNAME | `docs` | `<your-github-username>.github.io` |

5. Wait until GitHub shows the DNS check as OK, then tick **Enforce HTTPS**.

### Option B — Cloudflare Pages (if your domain is already on Cloudflare)

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Upload assets**, drag this folder in
   (or connect the GitHub repo). Build command: none. Output directory: `/`.
2. Project → **Custom domains → Set up a custom domain** → `docs.legacyroleplaynl.nl`.
   Cloudflare adds the DNS record itself (`CNAME docs → <project>.pages.dev`).

### Option C — your own VPS (same machine as the website)

1. Copy this folder to `/var/www/legacy-docs` on the server.
2. Use `deploy/nginx-docs.legacyroleplaynl.nl.conf` as the Nginx site (instructions are inside the file).
3. DNS:

   | Type | Name   | Value                  |
   |------|--------|------------------------|
   | A    | `docs` | `<IP address of the VPS>` |

4. `sudo certbot --nginx -d docs.legacyroleplaynl.nl` for HTTPS.

No Nginx? `node serve.js` with `PORT=80` also works, but Nginx (or Cloudflare in front) is better for HTTPS.

> If the domain uses Cloudflare DNS and you pick option A or C: set the record to *DNS only* (grey cloud)
> until HTTPS works, then you can switch the proxy (orange cloud) on with SSL mode **Full**.

DNS changes usually work within minutes, but can take up to a few hours.
