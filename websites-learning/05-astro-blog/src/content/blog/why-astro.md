---
title: "Why I picked Astro for my blog"
description: "A quick look at content collections, islands, and zero-JS by default."
date: 2024-11-04
author: "Alex Carter"
---

Astro lets you write content in Markdown and ship almost no JavaScript to the browser. That makes it perfect for blogs, documentation, and marketing sites.

## What I like

- **Markdown first.** Drop a `.md` file in `src/content/blog/` and it's a page.
- **Type-safe frontmatter.** Schemas in `src/content/config.js` catch typos at build time.
- **Islands architecture.** Add a `client:load` directive only where you need interactivity.

## A code sample

```ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date()
  })
});

export const collections = { blog };
```

That's the whole schema. No boilerplate, no runtime overhead — and the site still works on GitHub Pages.
