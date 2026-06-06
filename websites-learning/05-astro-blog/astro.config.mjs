import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://gabi89luch.github.io",
  base: "/webcoding/05-astro-blog/",
  markdown: {
    shikiConfig: { theme: "github-dark" }
  }
});
