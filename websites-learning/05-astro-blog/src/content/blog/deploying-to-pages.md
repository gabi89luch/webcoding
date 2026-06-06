---
title: "Deploying to GitHub Pages with one workflow"
description: "How a single GitHub Actions file can ship all five sites from one repo."
date: 2025-01-20
author: "Alex Carter"
---

Monorepo + GitHub Pages + multiple static sites = a clean `.github/workflows/deploy.yml` that builds everything into one output and pushes the result to the `gh-pages` branch.

The trick: each site builds to its own subfolder, then a small script copies them together so the live site looks like:

```
/
  /01-vanilla-portfolio/
  /02-react-todo/
  /03-vue-weather/
  /04-svelte-memory/
  /05-astro-blog/
```

Set the `base` path in each framework's config to match the repo name, and you're done.
