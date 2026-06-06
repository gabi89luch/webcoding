import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example.github.io",
  base: "/websites-learning/05-astro-blog/",
  markdown: {
    shikiConfig: { theme: "github-dark" }
  }
});
