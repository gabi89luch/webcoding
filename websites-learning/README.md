# Websites Learning

Five small websites, five different stacks — designed for hands-on learning and
deployed together as one GitHub Pages site via a single workflow.

The root of this repo is **not** a site. The actual website lives at
`websites-learning/` and is what gets built and deployed.

## The five sites

| # | Folder | Stack | What it is |
|---|---|---|---|
| 01 | `01-vanilla-portfolio/` | HTML / CSS / JavaScript | Personal portfolio, no build step, dark mode + form validation. |
| 02 | `02-react-todo/` | React 18 + Vite | Reactive todo app with filters and `localStorage` persistence. |
| 03 | `03-vue-weather/` | Vue 3 + Vite | Weather dashboard backed by the free Open-Meteo API. |
| 04 | `04-svelte-memory/` | Svelte 5 + Vite | Card-matching memory game with timer, moves, and three difficulties. |
| 05 | `05-astro-blog/` | Astro 4 | Multi-page static blog with Markdown content collections. |

A root `index.html` (in `websites-learning/`) acts as a hub that links to all
five.

## Live URLs (after deploying)

When deployed to `https://<user>.github.io/<repo>/`:

```
/                                  ← hub page
/01-vanilla-portfolio/             ← Site 1
/02-react-todo/                    ← Site 2
/03-vue-weather/                   ← Site 3
/04-svelte-memory/                 ← Site 4
/05-astro-blog/                    ← Site 5
/05-astro-blog/blog/               ← blog list inside Site 5
```

## Run any site locally

Each non-vanilla site is a standard Node project. Pick one and:

```bash
cd websites-learning/02-react-todo   # or any other
npm install
npm run dev
```

The vanilla site has no build step — just open `01-vanilla-portfolio/index.html`
in a browser (or `python3 -m http.server` from that folder).

| Site | Dev command | Default port |
|---|---|---|
| Vanilla | open the HTML file | — |
| React | `npm run dev` | 5173 |
| Vue | `npm run dev` | 5173 |
| Svelte | `npm run dev` | 5173 |
| Astro | `npm run dev` | 4321 |

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, go to **Pages → Source → GitHub Actions**.
3. Push to the `main` branch (or trigger the workflow manually from the
   **Actions** tab). The workflow at
   `.github/workflows/deploy.yml` (at the repo root) will:
   - install + build all four Node-based sites,
   - copy each build output (and the vanilla site as-is) into a single
     `deploy/` folder inside `websites-learning/`,
   - publish that folder to GitHub Pages.

Your site will be live at `https://<user>.github.io/<repo>/`.

> The same workflow file is also kept at
> `websites-learning/.github/workflows/deploy.yml` as a reference copy.
> It will only run if you push the contents of `websites-learning/` as a
> standalone repository (and adjust the paths accordingly).

### Renaming the repo

The build assumes the GitHub repo is named **`websites-learning`**. If you
rename it, update the `base` path in these four files:

- `websites-learning/02-react-todo/vite.config.js`
- `websites-learning/03-vue-weather/vite.config.js`
- `websites-learning/04-svelte-memory/vite.config.js`
- `websites-learning/05-astro-blog/astro.config.mjs`

Replace `/websites-learning/SITE-NAME/` with `/<new-repo>/SITE-NAME/`. The
hub page uses relative links and doesn't need changes.

## Project structure

The deploy workflow that actually runs lives at the **repo root**:
`./.github/workflows/deploy.yml`.

```
.
├── .github/workflows/deploy.yml   # the workflow that runs
└── websites-learning/             # the actual sites + hub
    ├── index.html                # hub page (relative links to each site)
    ├── hub/style.css
    ├── .github/workflows/deploy.yml   # reference copy (see README)
    ├── 01-vanilla-portfolio/
    │   ├── index.html
    │   ├── styles.css
    │   └── script.js
    ├── 02-react-todo/
    │   ├── package.json
    │   ├── vite.config.js
    │   ├── index.html
    │   └── src/
    │       ├── main.jsx
    │       ├── App.jsx
    │       └── styles.css
    ├── 03-vue-weather/
    │   ├── package.json
    │   ├── vite.config.js
    │   ├── index.html
    │   └── src/
    │       ├── main.js
    │       ├── App.vue
    │       ├── style.css
    │       └── composables/useWeather.js
    ├── 04-svelte-memory/
    │   ├── package.json
    │   ├── vite.config.js
    │   ├── svelte.config.js
    │   ├── index.html
    │   └── src/
    │       ├── main.js
    │       ├── App.svelte
    │       ├── app.css
    │       └── lib/Card.svelte
    └── 05-astro-blog/
        ├── package.json
        ├── astro.config.mjs
        ├── tsconfig.json
        ├── public/favicon.svg
        └── src/
            ├── content/config.js
            ├── content/blog/*.md
            ├── layouts/BaseLayout.astro
            ├── components/{Header,Footer}.astro
            ├── styles/global.css
            └── pages/
                ├── index.astro
                └── blog/
                    ├── index.astro
                    └── [slug].astro
```

## Learning order suggestion

1. **Vanilla** — see how the platform works with no tooling.
2. **React** — add a component model and reactivity.
3. **Vue** — try a different reactivity model (proxies + `ref`).
4. **Svelte** — see a compile-time approach with tiny output.
5. **Astro** — see how to compose islands and ship almost no JS.

Read each site top-to-bottom, then change one thing, then break it on purpose.
That's the loop.
